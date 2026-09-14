# 10 — Lead Submission & Server Integration Architecture

**Status:** Phase 2 Implemented (Security / Abuse Protection / Reliability) — Phase 3 (Resend Email Notification) and Phase 4 (Frontend Integration) Planned  
**Purpose:** Authoritative technical specification for the centralized lead submission system.

This document defines how the Fivefold website collects, submits, persists, and notifies leads. The existing UI is not changed by this architecture — the submission mechanism changes behind it.

---

## Current Implementation State

**Phase 0 (complete):** Repository restructured into `client/` + `server/` monorepo. NestJS foundation with environment configuration, CORS, global validation, and `GET /api/health`. See `11-repository-architecture.md`.

**Phase 1 (complete):** `POST /api/leads` is implemented in `server/src/leads/`. DTO validation, server-side normalization, and persistence are all active. Persistence goes through Prisma (`server/src/prisma/`) against the Supabase Postgres database. The table schema is in `server/supabase/migrations/001_create_leads_table.sql`; `server/prisma/schema.prisma` mirrors it.

**Phase 2 (complete):** `POST /api/leads` is hardened for public exposure — stricter DTO bounds, request body size limiting, in-memory rate limiting, a honeypot field, multi-origin CORS, security headers (`helmet`), safe/never-leaking error responses, explicit (non-arbitrary) database record construction, and request-correlated logging. See **Security & Reliability (Phase 2)** below for the full list of what changed and what remains manual (e.g. filling in real database credentials).

**`client/src/components/forms/ContactForm.tsx`** still simulates submission with a `setTimeout` call — no real API call is made yet. Connecting the form is Phase 4.

**Resend email notification is not yet implemented.** That is Phase 3. Every valid lead submission will trigger a notification email to `info@fivefold.co.in` via Resend.

Items marked **Planned** below are not yet implemented. Items under **Phase 2** below are implemented now; everything else in this document describing rate limiting, honeypot, CORS, etc. as "planned" is superseded by that section — those features exist today.

---

## Security & Reliability (Phase 2)

### IMPLEMENTED

| Area | What was done |
|---|---|
| DTO validation | `CreateLeadDto` bounds every field (`MaxLength`, `Min`/`Max` on all four calculator numerics with sanity caps, `IsEnum` on `leadType`/`source`). `class-validator`'s `IsNumber()` already rejects `NaN`/`Infinity` by default — verified by e2e test. |
| Unexpected properties | Global `ValidationPipe` already used `whitelist: true` + `forbidNonWhitelisted: true` (Phase 1) — verified still correct and still rejects extra fields with 400. |
| Request body size | `express.json({ limit: '16kb' })` (configurable via `BODY_SIZE_LIMIT`) replaces Nest's default 100kb parser. Oversized bodies return `413` with a safe JSON body, via `body-limit-error.middleware.ts`. |
| Rate limiting | `@nestjs/throttler`, in-memory, applied only to `LeadsController` via `ThrottlerGuard` (health and any future routes are unaffected). Default: 5 requests / hour per client, configurable via `LEADS_RATE_LIMIT_MAX` / `LEADS_RATE_LIMIT_TTL_MS`. Exceeding it returns `429`. |
| Spam / bot protection | Honeypot field `_gotcha` added to `CreateLeadDto` (optional, whitelisted so it doesn't trip `forbidNonWhitelisted`). If present and non-empty, `LeadsService.create()` logs it and returns a normal-looking `{ success: true }` without touching the database. **Frontend support required in a later phase:** add a visually-hidden `_gotcha` input to `ContactForm.tsx` (and any other lead form) that real users never fill. Not done in Phase 2 — no UI changes were made. |
| CORS | `CLIENT_URL` now accepts a comma-separated list of allowed origins (apex + `www` + local dev), still rejects `*`. |
| HTTP security headers | `helmet()` applied globally in `main.ts`. |
| Error handling | `HttpExceptionFilter` now uses `@Catch()` (was `@Catch(HttpException)`) so *any* uncaught error — not just `HttpException` — is normalized to the safe `{ success: false, statusCode, message }` shape. No stack traces, database error text, or credentials are ever returned. |
| Explicit database records | `LeadsService.create()` builds an explicit field-by-field `data` object for `prisma.lead.create()` (no arbitrary request body is ever passed through to Prisma). |
| Secret separation | `DATABASE_URL`/`DIRECT_URL` and WhatsApp variables are server-only, never `NEXT_PUBLIC_`. Verified no leak paths were introduced. |
| Logging | Lead creation, database failures, honeypot hits, rate-limit hits (429), and validation failures (400, debug level) are logged with a request-correlation ID. Never logs tokens, keys, or full payloads. |
| Correlation IDs | `request-id.middleware.ts` assigns a `crypto.randomUUID()` per request, exposed as the `X-Request-Id` response header and threaded through to `LeadsService` logs. Lightweight — no distributed tracing added. |
| Phone normalization | Formatting characters (`spaces`, `-`, `()`, `.`) are stripped server-side before validation/storage; an already-valid international number is not corrupted by forcing a `+91` prefix. |
| `leadType` / `source` validation | Unchanged from Phase 1: both are `class-validator` enums — arbitrary browser-supplied values are rejected with 400. |
| Reliability: database misconfiguration | `PrismaService.onModuleInit()` no longer throws (and crashes the whole app, including `/api/health`) when `DATABASE_URL` is unset or invalid — this bug exists in both the original Supabase-SDK version and the Prisma migration, since both eagerly connected at startup. It now logs a warning and defers the failure to the first actual query, which is already wrapped in a safe `500` response by `LeadsService`. |

### NOT YET IMPLEMENTED

- Resend email notification to `info@fivefold.co.in` (Phase 3)
- Frontend form integration — `ContactForm.tsx` still simulates submission (Phase 4)
- The honeypot's hidden form field on the frontend (server-side handling exists; no form currently sends `_gotcha`)
- Solar Calculator → lead payload wiring (Phase 5)
- Production deployment / Railway domain configuration (Phase 6)
- CRM
- AI lead classification

### Manual setup required

- Fill in real `DATABASE_URL` / `DIRECT_URL` in `server/.env` (or the hosting platform's env vars) — lead persistence fails safely with a `500` until this is done, but the server now starts and `/api/health` works regardless.
- `LEADS_RATE_LIMIT_MAX` / `LEADS_RATE_LIMIT_TTL_MS` / `BODY_SIZE_LIMIT` are read from the real process environment at startup (see `server/.env.example`) — export them in the shell or hosting dashboard, not only in a local `.env` file consumed by `@nestjs/config`, since module-level `ThrottlerModule.forRoot()` config is evaluated before `.env` is loaded.
- If/when multiple production origins are needed, set `CLIENT_URL` to a comma-separated list.

---

## Architecture Overview

```
client/ (Next.js — React website)
          |
          | HTTPS POST /api/leads  (JSON)
          v
server/ (NestJS — Lead API on Railway)
          |
          v
     Prisma ORM
          |
          +---------------------------+
          |                           |
          v                           v
     Supabase                   Resend API
     PostgreSQL                 (transactional email)
     (source of truth)          (notification only)
          |                           |
          v                           v
   Lead History             info@fivefold.co.in
   (persistent)             (business notification)
```

Prisma is the application's database access layer; Supabase remains the PostgreSQL database/infrastructure — leads are no longer queried through the Supabase JS SDK.

**Notification flow:** After a lead is persisted to Supabase, the server sends a single notification email to `info@fivefold.co.in` via Resend. Email is the business notification layer only — Supabase is the source of truth. A lead is never lost if email delivery fails.

This architecture is intentionally minimal. There are three layers and one centralized endpoint. Each layer has a single clear responsibility.

---

## Layer Responsibilities

### Frontend

The frontend is responsible for:

- Rendering existing forms without change
- Collecting user input through existing UI components
- Performing basic client-side validation for UX (required fields, format hints)
- Sending a single structured HTTPS POST to `/api/leads`
- Displaying existing success and error states to the user

The frontend must **never**:

- Store WhatsApp access tokens or secrets
- Directly call WhatsApp Cloud API
- Use Supabase service-role credentials
- Contain any server-only credential in client bundles or `NEXT_PUBLIC_` environment variables
- Treat client-side validation as the actual security boundary

Client-side validation is user experience, not security. The server validates independently.

### Lead API Server

The server is responsible for:

- Receiving lead submissions via HTTPS POST
- Validating all input server-side (independent of frontend validation)
- Sanitizing and normalizing values
- Rate limiting requests per source IP
- Persisting the validated lead via Prisma to Supabase PostgreSQL as the **source of truth**
- Sending a notification email to `info@fivefold.co.in` via Resend after successful persistence
- Returning a safe, minimal response to the frontend
- Keeping all private credentials strictly server-side

The server must **never**:

- Expose database error messages to the public response
- Expose Resend API errors to the public response
- Return internal stack traces, access tokens, or infrastructure details

### Supabase Database

Supabase is the **source of truth** for all submitted leads.

Supabase is responsible for:

- Persistent lead storage with created_at timestamps
- Lead history queryable by Fivefold team
- Submission metadata and source tracking
- Future reporting and CRM compatibility

Supabase is not a cache. A lead that exists in Supabase is the canonical record regardless of whether any notification succeeded.

### Resend Email Service

Resend is a **business notification channel** only.

Resend is responsible for:

- Delivering a structured notification email to `info@fivefold.co.in` when a new lead is submitted

Resend is **not** the database. If email delivery fails, the lead is not lost — it exists in Supabase. The team must check Supabase for leads if notifications are disrupted.

The `RESEND_API_KEY` is a server-only secret. It must never appear in a `NEXT_PUBLIC_` environment variable, in the React client bundle, or in any browser-accessible configuration. All email delivery originates from the NestJS server — the client never communicates with Resend directly.

---

## Hosting Decision

**Target deployment platform: Railway (Node.js — NestJS)**

The NestJS server is a standard Node.js process. It requires a hosting platform that supports a persistent Node.js runtime — not a serverless edge worker (which would not support NestJS's decorator-based module system and reflection metadata).

| Goal | How Railway meets it |
|------|----------------------|
| Low latency | Deploy to a region close to Odisha/India |
| Node.js support | Full Node.js runtime, no compatibility constraints |
| Simple deployment | `git push` triggers build and deploy |
| Low operational overhead | Managed platform, no OS or Docker management required |
| Free/low-cost initial operation | Railway's Hobby plan is suitable at initial lead volumes |
| HTTPS by default | Railway terminates TLS automatically |
| Secret management | Environment variables set in Railway dashboard, never in git |

**This is the initial preferred platform, not an irreversible commitment.** Other Node.js-compatible platforms (Render, Fly.io, Heroku, AWS Elastic Beanstalk, etc.) are valid alternatives. The NestJS application is platform-agnostic as long as the host supports Node.js and persistent environment variable storage.

---

## Server Module Structure

The server lives at `server/` in the repository root. It is a self-contained NestJS application. It does not import anything from `client/`.

**Implemented (Phase 0 + Phase 1):**

```
server/
├── src/
│   ├── main.ts                       # Bootstrap: port, CORS, global pipes, exception filter
│   ├── app.module.ts                 # Root module
│   │
│   ├── health/
│   │   ├── health.module.ts
│   │   └── health.controller.ts      # GET /api/health → { status: "ok" }
│   │
│   ├── leads/                        # Phase 1
│   │   ├── leads.module.ts
│   │   ├── leads.controller.ts       # POST /api/leads
│   │   ├── leads.service.ts          # normalize → Prisma create
│   │   ├── leads.controller.spec.ts
│   │   ├── leads.service.spec.ts
│   │   └── dto/
│   │       └── create-lead.dto.ts    # class-validator DTO
│   │
│   ├── prisma/                       # Prisma migration
│   │   ├── prisma.module.ts          # @Global — one shared PrismaClient
│   │   └── prisma.service.ts         # extends PrismaClient, lifecycle hooks
│   │
│   └── common/
│       └── filters/
│           └── http-exception.filter.ts   # Safe error responses
│
├── supabase/
│   └── migrations/
│       └── 001_create_leads_table.sql     # Run in Supabase SQL editor
│
├── prisma/
│   └── schema.prisma                      # Mirrors the Supabase leads table
│
├── test/
│   ├── app.e2e-spec.ts               # E2E: health endpoint
│   └── jest-e2e.json
│
├── package.json
├── tsconfig.json
├── tsconfig.build.json
├── nest-cli.json
├── .env.example                      # Committed — variable names, no real secrets
└── .env                              # Gitignored — real values for local dev
```

**Planned additions (subsequent phases):**

```
server/src/
└── email/                            # Phase 3
    ├── email.module.ts               # EmailModule — imported by AppModule
    └── email.service.ts              # EmailService — sends via Resend SDK
```

Each module has one clear responsibility. NestJS's module system enforces this boundary.

| File | Responsibility |
|------|---------------|
| `main.ts` | Bootstrap: port, global prefix, CORS, global ValidationPipe. |
| `app.module.ts` | Root module — imports all feature modules. |
| `health/health.controller.ts` | `GET /api/health`. Confirms server is running. |
| `leads/leads.controller.ts` | `POST /api/leads`. Validates DTO, delegates to service. |
| `leads/leads.service.ts` | Orchestrates: validate → Prisma create → email notify → respond. (Email notify planned Phase 3) |
| `leads/dto/create-lead.dto.ts` | class-validator DTO — server-side schema for incoming lead payload. |
| `prisma/prisma.service.ts` | Shared `PrismaClient` instance with NestJS lifecycle hooks (`$connect`/`$disconnect`). |
| `email/email.service.ts` | Sends notification via Resend SDK. Never throws on failure — email failure does not fail the lead. (Planned — Phase 3) |
| `common/filters/http-exception.filter.ts` | Safe error shape to clients. No stack traces or secrets in responses. |
| `nest-cli.json` | NestJS CLI build configuration. |
| `.env.example` | Committed — variable names with empty values. |
| `.env` | Gitignored — real credentials for local development. |

This is a deliberately small module. Do not add directories or layers before the need is proven.

---

## Centralized Lead Endpoint

**`POST /api/leads`**

All lead submissions from all pages flow through a single endpoint. There are no separate endpoints per page or per customer segment.

### Why a single endpoint

- Consistent validation and sanitization across all form sources
- Consistent Supabase insertion logic
- Consistent email notification format
- Easier analytics: all leads queryable in one place
- Easier future CRM integration: one data model, not eight
- Simpler maintenance: one handler to update when business requirements change

The page or form a lead originated from is captured in the `source` field, not the URL.

### Do not create separate endpoints for

- Residential
- Commercial
- Industrial
- Contact
- Solar Calculator
- Schemes
- SolarCare
- Warranty

All of these produce a lead that follows the same canonical model with optional fields populated based on context.

---

## Lead Data Model

### Proposed `leads` Table

This is the **proposed target schema**. The actual Supabase table must be created during implementation. At time of writing, no Supabase integration exists in the codebase and no `leads` table has been created.

```
leads
──────────────────────────────────────────────────────────────────────
Column                   Type        Nullable   Notes
──────────────────────────────────────────────────────────────────────
id                       uuid        NOT NULL   Generated by Supabase
created_at               timestamptz NOT NULL   Server-side default
name                     text        NOT NULL
phone                    text        NOT NULL   Normalized on server
email                    text        NULLABLE   Not always collected
city                     text        NOT NULL   City / district / location
state                    text        NULLABLE   Default "Odisha" if not supplied
lead_type                text        NOT NULL   residential|commercial|industrial|
                                                institutional|solarcare|warranty|
                                                other
source                   text        NOT NULL   See Source Tracking section
message                  text        NULLABLE   Free-text requirement / notes
electricity_info         text        NULLABLE   Optional consumption hint from ContactForm
monthly_consumption_kwh  numeric     NULLABLE   Calculator-specific
recommended_system_kwp   numeric     NULLABLE   Calculator-specific
estimated_annual_savings numeric     NULLABLE   Calculator-specific (INR)
potential_subsidy_inr    numeric     NULLABLE   Calculator-specific (INR)
scheme                   text        NULLABLE   Scheme name if applicable
status                   text        NOT NULL   Default: 'new'
──────────────────────────────────────────────────────────────────────
```

### Field classification

**Required fields** (every submission):
- `name`, `phone`, `city`, `lead_type`, `source`

**Optional core fields** (collected by most forms):
- `email`, `state`, `message`

**Calculator-specific fields** (populated only when `source = 'solar-calculator'`):
- `monthly_consumption_kwh` — from `SolarCalculationResult.consumption.monthlyConsumptionKWh`
- `recommended_system_kwp` — from `SolarCalculationResult.recommendedSystemKWp`
- `estimated_annual_savings` — from `SolarCalculationResult.estimatedAnnualSavingsINR`
- `potential_subsidy_inr` — from `SolarCalculationResult.potentialSubsidyINR`

**Operational metadata** (server-side):
- `id`, `created_at`, `status`

**ContactForm-specific fields**:
- `electricity_info` — the optional freetext field "Monthly Bill / Consumption Info" in `ContactForm.tsx`

### Naming note

The Supabase table uses `snake_case` column names per PostgreSQL convention. The JSON API payload uses `camelCase`. The server maps between them at the persistence boundary.

### Schema extensibility

Different forms collect different data. The model uses `NULLABLE` columns for optional context rather than creating per-source tables. If a column is not relevant for a given `source`, it is stored as `NULL`. Do not add a new column for every theoretically possible field — add columns when a form actually collects the data.

---

## Lead Source Tracking

The `source` field is mandatory. It identifies which page or form produced the lead.

| Source value | Originating form |
|---|---|
| `contact` | Contact page general enquiry form |
| `solar-calculator` | Solar Calculator consultation request |
| `residential` | Residential Solar page CTA |
| `commercial` | Commercial Solar page CTA |
| `industrial` | Industrial Solar page CTA |
| `schemes` | Government Schemes eligibility enquiry |
| `solarcare` | SolarCare / AMC enquiry |
| `warranty` | Warranty & Support enquiry |
| `consultation` | "Talk to an Engineer" CTA (any page) |

Source values are lowercase, hyphenated strings. This list is extensible — add new values as new forms or pages are introduced.

Source tracking allows Fivefold to understand which parts of the website generate the most qualified leads.

---

## Solar Calculator Integration

The Solar Calculator (`src/components/calculator/SolarCalculator.tsx`) performs all calculations client-side. The server must not replicate or replace the calculation engine.

The calculator's responsibility ends when it produces a `SolarCalculationResult`. The lead submission's responsibility begins when the user chooses to enquire based on that result.

### Planned flow

```
User completes Solar Calculator
          ↓
Calculator produces SolarCalculationResult (client-side)
          ↓
UI displays result (System size, savings, payback, subsidy)
          ↓
User clicks "Get a Consultation" / "Talk to an Engineer"
          ↓
UI presents contact form (name, phone, city — pre-filled where possible)
          ↓
Frontend constructs lead payload with calculator fields attached
          ↓
POST /api/leads
          ↓
Server validates, persists, notifies
```

The existing UI for the calculator result display must not change. The enquiry CTA is a natural progression, not a separate disruptive step.

### Mapping calculator fields to the lead payload

When a lead originates from the Solar Calculator, the frontend maps `SolarCalculationResult` fields into the lead payload using these mappings:

| Lead payload field | `SolarCalculationResult` source |
|---|---|
| `leadType` | `calculatorInput.propertyType` |
| `source` | `"solar-calculator"` (hardcoded) |
| `monthlyConsumptionKwh` | `result.consumption.monthlyConsumptionKWh` |
| `recommendedSystemKwp` | `result.recommendedSystemKWp` |
| `estimatedAnnualSavings` | `result.estimatedAnnualSavingsINR` |
| `potentialSubsidyInr` | `result.potentialSubsidyINR` |
| `city` | `calculatorInput.location` |

The implementation should use the exact TypeScript field names from `src/lib/solar-engine/types.ts` rather than guessing. Canonical source: `SolarCalculationResult` and `CalculatorInput` in that file.

### Example Solar Calculator lead payload

```json
{
  "name": "Rajesh Mohanty",
  "phone": "+917008101078",
  "city": "Bhubaneswar",
  "leadType": "residential",
  "source": "solar-calculator",
  "monthlyConsumptionKwh": 450,
  "recommendedSystemKwp": 3.0,
  "estimatedAnnualSavings": 28000,
  "potentialSubsidyInr": 78000
}
```

---

## API Contract

### `POST /api/leads`

**Request headers:**

```
Content-Type: application/json
```

**Minimal request body (all forms):**

```json
{
  "name": "Rajesh Mohanty",
  "phone": "+917008101078",
  "city": "Bhubaneswar",
  "leadType": "residential",
  "source": "contact",
  "email": "rajesh@example.com",
  "message": "Interested in rooftop solar for my home."
}
```

**Extended body (Solar Calculator):**

```json
{
  "name": "Rajesh Mohanty",
  "phone": "+917008101078",
  "city": "Bhubaneswar",
  "leadType": "residential",
  "source": "solar-calculator",
  "monthlyConsumptionKwh": 450,
  "recommendedSystemKwp": 3.0,
  "estimatedAnnualSavings": 28000,
  "potentialSubsidyInr": 78000
}
```

**Payload field reference:**

| Field | Type | Required | Notes |
|---|---|---|---|
| `name` | string | Yes | Trimmed. 1–100 chars. |
| `phone` | string | Yes | Validated format. Normalized. |
| `city` | string | Yes | Trimmed. 1–100 chars. |
| `leadType` | string | Yes | Enum: residential / commercial / industrial / institutional / solarcare / warranty / other |
| `source` | string | Yes | Enum: see Source Tracking section |
| `email` | string | No | Validated format when present. |
| `state` | string | No | Defaults to "Odisha" if not supplied. |
| `message` | string | No | Max 1000 chars. |
| `electricityInfo` | string | No | ContactForm optional freetext field. |
| `monthlyConsumptionKwh` | number | No | Calculator only. Positive number. |
| `recommendedSystemKwp` | number | No | Calculator only. Positive number. |
| `estimatedAnnualSavings` | number | No | Calculator only. Non-negative. |
| `potentialSubsidyInr` | number | No | Calculator only. Non-negative. |
| `scheme` | string | No | Scheme name if applicable. |

**Success response — HTTP 200:**

```json
{
  "success": true,
  "leadId": "a1b2c3d4-e5f6-7890-abcd-ef1234567890"
}
```

**Validation error — HTTP 400:**

```json
{
  "success": false,
  "message": "Required fields missing.",
  "fields": ["phone"]
}
```

**Server error — HTTP 500:**

```json
{
  "success": false,
  "message": "Unable to submit your enquiry. Please try again or call us directly."
}
```

**What the response must never expose:**

- Supabase error details
- Resend API error messages
- Access tokens, API keys, or secrets
- Database schema details
- Internal stack traces
- Infrastructure names or IDs

The 500 message should always be a safe, user-facing string — never a raw exception message.

### HTTP status code summary

| Code | Meaning |
|---|---|
| 200 | Lead accepted and persisted |
| 400 | Validation error in client payload |
| 429 | Rate limit exceeded |
| 500 | Server error (Supabase unavailable, unexpected error) |

---

## Server-Side Validation

Every request is validated server-side regardless of any client-side validation that occurred. Client-side validation is UX; server-side validation is the security boundary.

### Required field validation

Reject requests missing: `name`, `phone`, `city`, `leadType`, `source`.

### String validation

- `name`: trim, 1–100 characters after trimming
- `phone`: trim, match Indian phone format (10 digits or `+91` prefix), normalize to `+91XXXXXXXXXX`
- `email`: valid RFC 5322 format when present
- `city`: trim, 1–100 characters
- `message`: max 1000 characters
- `electricityInfo`: max 500 characters

### Enum validation

- `leadType`: must be one of the documented enum values. Reject unknown values.
- `source`: must be one of the documented enum values. Reject unknown values.

### Numeric validation

- `monthlyConsumptionKwh`: positive number when present
- `recommendedSystemKwp`: positive number, max 10,000 (sanity cap)
- `estimatedAnnualSavings`: non-negative number
- `potentialSubsidyInr`: non-negative number

### Normalization

Before inserting into Supabase:
- Trim whitespace from all string fields
- Normalize phone to `+91XXXXXXXXXX` format
- Convert empty optional strings to `null`
- Default `state` to `"Odisha"` when not supplied

### Unknown fields

Ignore or strip unknown payload fields. Do not reject the request for extra fields, but do not persist them.

### Payload size limit

Reject requests larger than 16 KB. This prevents payload-stuffing attacks.

---

## Spam and Abuse Protection

### Rate limiting

Limit repeated submissions from the same source IP. Initial threshold: 5 requests per hour per IP. Exceeding the threshold returns HTTP 429.

NestJS server (Railway)s KV or Durable Objects can back the rate-limit counter. The implementation in `utils/rate-limit.ts` should be simple and free-tier compatible.

### Honeypot field

The frontend form may include a hidden field (e.g. `_gotcha`) that human users will not see or fill. If the server receives this field with a non-empty value, treat the submission as a bot and return HTTP 200 (to avoid signaling the bot detection) without persisting or notifying.

Implementation: add `_gotcha: string` to the payload type, check it in `validation/lead.ts`.

### Origin / CORS policy

Configure the Worker to only allow requests from:
- `https://www.fivefoldrenewable.com`
- `https://fivefoldrenewable.com`
- `http://localhost:3000` (development only, controlled by environment)

CORS is a browser-level control and not an authentication mechanism. A sufficiently motivated attacker can bypass it with a non-browser client. But it is still correct to configure it as an additional layer.

### Payload size

Enforce a 16 KB limit on request body size. Reject larger payloads with HTTP 413.

### Request validation

Reject requests with:
- Missing `Content-Type: application/json`
- Malformed JSON body
- Missing required fields

---

## Database Access — Prisma over Supabase PostgreSQL

Application persistence goes through Prisma, not the Supabase JS SDK. Supabase remains the PostgreSQL database/infrastructure; Prisma is the ORM that talks to it.

```
LeadsController → LeadsService → PrismaService → PostgreSQL (Supabase)
```

`server/prisma/schema.prisma` describes the `leads` table (mirroring `server/supabase/migrations/001_create_leads_table.sql`, mapping `snake_case` columns to camelCase model fields with `@map`). `server/src/prisma/prisma.service.ts` wraps `PrismaClient` with NestJS lifecycle hooks (`$connect` on module init, `$disconnect` on shutdown) and is provided globally via `PrismaModule`.

### Credential separation

| Credential | Who holds it |
|---|---|
| `DATABASE_URL` (pooled connection) | Server only (NestJS server (Railway) secret) |
| `DIRECT_URL` (direct connection, used by `prisma migrate`) | Server only (NestJS server (Railway) secret) |
| Supabase anon key (if used for public data) | May be in frontend `.env.local` / `NEXT_PUBLIC_` |

The Postgres connection string carries the same authority as the old service-role key and must **never** be placed in a `NEXT_PUBLIC_` environment variable or anywhere accessible to the browser.

If the frontend currently uses Supabase directly for public read operations (project data, content, etc.), that usage is separate and may legitimately use the anon key with appropriate RLS policies. This document covers only lead submission and does not affect or remove any future public Supabase functionality.

### Insert operation

`leads.service.ts`:

1. Builds an explicit, whitelisted object from the validated DTO — never passes the raw request body to Prisma
2. Calls `this.prisma.lead.create({ data, select: { id: true } })`
3. Returns the generated `id`
4. Wraps any Prisma/database error and throws a safe `InternalServerErrorException` (never the raw Prisma error)

```typescript
// Conceptual shape — actual implementation in leads.service.ts
async function insertLead(lead: NormalizedLead): Promise<{ id: string }> {
  try {
    return await prisma.lead.create({ data: lead, select: { id: true } });
  } catch (error) { throw new LeadInsertError((error as Error).message);
  return { id: data.id };
}
```

---

## Email Service (Resend)

`server/src/email/email.service.ts` is responsible for sending a structured notification email to the Fivefold team.

### Recipient and sender

| Variable | Value |
|---|---|
| `LEAD_NOTIFICATION_EMAIL` | `info@fivefold.co.in` — the business recipient |
| `LEAD_FROM_EMAIL` | The verified sender domain address (e.g. `leads@fivefoldrenewable.com`) |
| `Reply-To` | The submitting customer's email address (when provided) |

### Notification email content

The email subject line is dynamic (e.g. `New Residential Enquiry — Rajesh Mohanty`).

The HTML body is a structured, readable summary:

```
New Lead — {leadType} from {source}

Name:     {name}
Phone:    {phone}
Email:    {email or —}
Location: {city}, {state}
Source:   {source}

[Calculator results block — only when source = solar-calculator:]
Monthly Consumption:  {monthlyConsumptionKwh} kWh
Recommended System:   {recommendedSystemKwp} kWp
Est. Annual Savings:  ₹{estimatedAnnualSavingsInr}
Subsidy Estimate:     ₹{potentialSubsidyInr}

[Message — only when present:]
Note: {message}

Submitted: {createdAt ISO timestamp}
Lead ID:   {leadId}
```

Omit sections with null values rather than showing "null" or "—" to the team. All user-supplied content rendered in the HTML body must be HTML-escaped to prevent XSS from malicious form input reaching the email client.

### Implementation requirements

- Use the `resend` npm package in `server/` only — never in `client/`
- `RESEND_API_KEY` is a server-only secret: never in `NEXT_PUBLIC_*`, never in the React bundle, never in browser-accessible configuration
- `EmailService` must **never throw** in a way that fails the lead submission if email delivery fails
- Log email failures internally (safe log, no API key in log)
- Track email delivery status on the lead record (`emailStatus: pending | sent | failed`)
- Return a typed result indicating whether delivery succeeded or failed

```typescript
// Conceptual shape — actual implementation in email/email.service.ts
async function sendLeadNotification(lead: Lead): Promise<{ sent: boolean; error?: string }> {
  try {
    await resend.emails.send({ from, to, subject, html, replyTo });
    return { sent: true };
  } catch (err) {
    return { sent: false, error: 'Email notification failed' };
  }
}
```

`LeadsService.create()` calls `EmailService.sendLeadNotification()` after the Prisma insert succeeds. A failed email delivery does not cause the lead submission response to return `success: false` — the lead is already safely stored in Supabase.

---

## Failure Handling

This section defines the reliability contract.

### Primary scenario: both succeed

```
Receive request
      ↓
Validate (pass)
      ↓
Insert to Supabase (success)
      ↓
Send email notification via Resend (success)
      ↓
Return { success: true, leadId: "..." }
```

### Supabase succeeds, email fails

```
Receive request
      ↓
Validate (pass)
      ↓
Insert to Supabase (success) ← lead safely stored
      ↓
Send email notification via Resend (fails)
      ↓
Log email failure internally (no API key in log)
      ↓
Update lead emailStatus = "failed" in database
      ↓
Return { success: true, leadId: "..." }
```

The lead exists in Supabase. The team can check Supabase for leads if email is disrupted. This is the correct behaviour — email is a convenience notification channel, not the source of truth.

### Supabase fails

```
Receive request
      ↓
Validate (pass)
      ↓
Insert to Supabase (fails)
      ↓
Do NOT attempt email notification
      ↓
Return HTTP 500: { success: false, message: "Unable to submit your enquiry." }
```

Do not report a successful submission if the lead was not persisted. Do not send an email notification for a lead that was not stored.

### Validation fails

```
Receive request
      ↓
Validate (fail)
      ↓
Return HTTP 400: { success: false, message: "...", fields: [...] }
```

No Supabase call. No email call.

### Future reliability

If email notification failure rate becomes a problem at scale, a retry queue (e.g. BullMQ with Redis, or a Supabase-backed retry table) may be introduced. This is **outside the initial implementation**. The initial architecture tracks `emailStatus` on the lead record for manual follow-up rather than adding queue infrastructure prematurely.

---

## Environment Variables

All secrets are managed as Railway environment variables set in the Railway dashboard. They are never committed to the repository, never in `.env` files tracked by git, and never accessible to the browser.

### Server (`server/.env` locally, Railway dashboard in production)

| Variable | Purpose |
|---|---|
| `NODE_ENV` | `development` or `production` |
| `PORT` | Server listen port (default: 3001) |
| `CLIENT_URL` | Allowed CORS origin |
| `DATABASE_URL` | Pooled Supabase Postgres connection string (Prisma runtime queries) — never in client |
| `DIRECT_URL` | Direct Supabase Postgres connection string (`prisma migrate`) — never in client |
| `RESEND_API_KEY` | Resend API key for transactional email — never in client, never in `NEXT_PUBLIC_*` |
| `LEAD_NOTIFICATION_EMAIL` | Recipient address for lead notifications (e.g. `info@fivefold.co.in`) — server only |
| `LEAD_FROM_EMAIL` | Verified sender address (e.g. `leads@fivefoldrenewable.com`) — server only |

Local: copy `server/.env.example` → `server/.env` and fill in real values.  
Production: set each variable in the Railway project dashboard. Never commit `.env`.

### Client (`client/.env.local` locally, Vercel/Railway env vars in production)

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_API_URL` | URL of the NestJS server (e.g. `https://api.fivefoldrenewable.com`) — not a secret, embedded in bundle |
| `NEXT_PUBLIC_SUPABASE_URL` | Only if future public read operations are added |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Only if future public read operations are added |

`RESEND_API_KEY`, `LEAD_NOTIFICATION_EMAIL`, and `LEAD_FROM_EMAIL` are server-only and must **never** appear as `NEXT_PUBLIC_*` variables or in the React client bundle under any circumstance.

`NEXT_PUBLIC_API_URL` is not a secret — it is embedded in the browser bundle. The service-role key is never placed here under any circumstance.

Local: copy `client/.env.local.example` → `client/.env.local` and set `NEXT_PUBLIC_API_URL=http://localhost:3001`.

### Secret rotation

When rotating:
1. Generate new credentials from the relevant provider (Supabase, Resend)
2. Update the value in Railway dashboard (or local `.env`)
3. Redeploy the server
4. Verify the new credentials work in production
5. Revoke the old credentials from the provider dashboard

---

## Deployment Architecture

### Production

```
https://www.fivefoldrenewable.com  (Next.js — Vercel or Railway)
          |
          | HTTPS POST /api/leads
          v
https://api.fivefoldrenewable.com  (NestJS server (Railway))
          |
          +---------------------------+
          v                           v
  Supabase project               Resend API
  (Supabase Cloud)               → info@fivefold.co.in
```

The domain `api.fivefoldrenewable.com` is the **proposed target production domain**. At time of writing it is not configured. Initial deployment will use Railway's generated default URL (e.g. `https://fivefold-server-production.up.railway.app`).

### Development

```
http://localhost:3000           (Next.js dev server: npm run dev)
          |
          | POST to NEXT_PUBLIC_API_URL
          v
http://localhost:3001           (NestJS server local: npm run dev:server)
          |
          +---------------------------+
          v                           v
  Supabase project               Resend API
  (dev project or prod)          (can be skipped in dev by
                                  omitting RESEND_API_KEY)
```

Use a separate Supabase project or a separate `leads` table with a `environment: 'dev'` flag during development to avoid polluting production lead data.

### Environments

| Environment | Frontend | API | Database |
|---|---|---|---|
| Local development | `localhost:3000` | `localhost:3001` | Supabase dev project |
| Preview / staging | Vercel preview URL | Railway preview URL | Supabase dev project |
| Production | `www.fivefoldrenewable.com` | `api.fivefoldrenewable.com` | Supabase production project |

---

## Frontend Integration Points

This section documents where the frontend integration will be made when the server is ready. **No frontend changes should be made until the server is deployed and tested.**

### ContactForm.tsx

File: `client/src/components/forms/ContactForm.tsx`

Current state: `handleSubmit` uses a `setTimeout` simulation.

Planned change: Replace the `setTimeout` block with an actual `fetch` call to `${NEXT_PUBLIC_API_URL}/api/leads`.

The form fields already collected match the lead payload:

| Form field | Lead payload field |
|---|---|
| `interest` (button selector) | `leadType` and inferred `source` |
| `name` | `name` |
| `phone` | `phone` |
| `email` | `email` |
| `location` | `city` |
| `requirement` | `message` |
| `electricityInfo` | `electricityInfo` |

The form's visual design, layout, validation UI, and success state display must **not change** during this integration. Only the `handleSubmit` implementation changes.

### Interest-to-LeadType mapping

The ContactForm's interest selector produces display strings. The frontend must map these to canonical `leadType` values before submitting:

| Interest display string | `leadType` value | `source` value |
|---|---|---|
| "Residential Solar" | `residential` | `contact` |
| "Commercial Solar" | `commercial` | `contact` |
| "Industrial Solar" | `industrial` | `contact` |
| "Government Scheme Assistance" | `residential` or `commercial` | `schemes` |
| "SolarCare / AMC" | `solarcare` | `solarcare` |
| "Maintenance" | `solarcare` | `contact` |
| "Other" | `other` | `contact` |

### Solar Calculator enquiry

When the Solar Calculator produces a result and the user clicks a consultation CTA:
- Pre-fill `city` from `calculatorInput.location`
- Pre-fill `leadType` from `calculatorInput.propertyType`
- Attach calculator result fields from `SolarCalculationResult`
- Set `source = "solar-calculator"`

The consultation form UI itself is not redesigned for this integration.

---

## Observability

Observability in the initial implementation should be lightweight and free.

### What to log

- Request received: timestamp, source IP (hashed or truncated), `source` field value
- Validation result: pass/fail, which fields failed
- Supabase result: success/fail, lead ID on success
- Email result: success/fail, no API key or message content in log
- Rate limit events: IP (hashed), timestamp

### What to never log

- Resend API key
- Supabase service-role key
- Full request payload containing personal data
- User phone numbers or email addresses in plain text logs
- Internal error stack traces in public responses

### Log destination

NestJS server logs are available via Railway's log view in production and via the terminal when running locally (`npm run dev:server`). No additional paid observability platform is required at initial scale.

Use the `leadId` (returned from Supabase insert) as the correlation identifier in logs so a specific lead can be traced across Supabase insert and WhatsApp notification events.

---

## What This Architecture Intentionally Excludes

The following are explicitly outside the initial implementation. Do not add them unless scale or specific requirements demand it.

| Feature | Why excluded from v1 |
|---|---|
| CRM system | Supabase serves as the lead store; Fivefold team can query it directly initially |
| AI lead classification | Not on the critical submission path |
| Retry queue | `emailStatus` field on lead record enables manual follow-up; queue is premature |
| Lead admin dashboard | Supabase dashboard is sufficient initially |
| Follow-up automation | Out of scope |
| Docker / Kubernetes | Unnecessary at initial scale |
| Redis / external cache | In-memory rate limiting sufficient at initial volume |
| Message broker | No async processing required at initial scale |
| Separate per-segment endpoints | A single endpoint with `source` field covers all cases |

### Future extensibility

The architecture can naturally extend to:

- A lead admin dashboard querying the `leads` table
- WhatsApp notification alongside email
- AI classification of incoming leads by type/quality
- CRM sync (Zoho, HubSpot, or custom) triggered by Supabase webhooks
- Analytics queries over the `leads` table
- Retry queue for failed email deliveries

These are additions, not redesigns. The initial implementation does not need to anticipate them structurally.

---

## Checklist: Implementation Sequence

### Phase 1 — Supabase Lead API (complete)

- [x] Create Supabase `leads` table — run `server/supabase/migrations/001_create_leads_table.sql` in Supabase SQL editor
- [x] Configure Supabase Row Level Security: deny all public access; only the Postgres connection Prisma uses (or a service-role key) bypasses RLS
- [x] `server/prisma/schema.prisma` — mirrors the `leads` table; `server/src/prisma/prisma.service.ts` — shared `PrismaClient`
- [x] `server/src/leads/dto/create-lead.dto.ts` — DTO validation (name, phone required; all calculator fields optional)
- [x] `server/src/leads/leads.service.ts` — normalize + Prisma create
- [x] `server/src/leads/leads.controller.ts` — `POST /api/leads`
- [x] Unit tests pass (7 tests)
- [ ] Fill in `DATABASE_URL` and `DIRECT_URL` in `server/.env` (manual — requires Supabase project connection strings)
- [ ] Baseline the existing table into Prisma migration history (`prisma migrate resolve --applied <migration>`) so future `prisma migrate deploy` runs don't try to recreate it
- [ ] Run migration against your Supabase project

### Phase 2 — Security / Rate Limiting (complete)

- [x] Rate limiting (`@nestjs/throttler`, in-memory, `LeadsController` only)
- [x] Bot protection — honeypot field (`_gotcha`); visible CAPTCHA deliberately not added
- [x] Input sanitization / DTO bounds review
- [x] Request body size limit (413)
- [x] Multi-origin CORS
- [x] `helmet()` security headers
- [x] Safe error handling for any uncaught exception, not just `HttpException`
- [x] Request-correlation IDs in logs
- [x] Fixed: `/api/health` no longer depends on a valid database config to boot (`PrismaService.onModuleInit()` no longer throws on connect failure)
- [ ] Add the hidden `_gotcha` field to `ContactForm.tsx` (frontend — out of scope this phase)

### Phase 3 — Resend Email Notification (planned)

- [ ] Install `resend` package in `server/`
- [ ] Add `emailStatus`, `emailSentAt`, `emailAttempts`, `emailError` columns to `server/prisma/schema.prisma` + migration
- [ ] `server/src/email/email.module.ts` and `email.service.ts`
- [ ] Wire `EmailService` into `LeadsService.create()` after Supabase insert
- [ ] HTML email template: dynamic subject, structured body, Reply-To = customer email, all user content HTML-escaped
- [ ] Handle email failure gracefully — lead is NOT lost; update `emailStatus = "failed"` on the record
- [ ] Add `RESEND_API_KEY`, `LEAD_NOTIFICATION_EMAIL`, `LEAD_FROM_EMAIL` to `server/.env.example`
- [ ] Tests: email sent on success, email failure does not break lead creation, HTML escaping

### Phase 4 — Frontend Form Integration (planned)

- [ ] Update `client/src/components/forms/ContactForm.tsx` to replace `setTimeout` with `fetch` to `POST /api/leads`
- [ ] Map form `interest` selector to `leadType` and `source`
- [ ] End-to-end test: submit form → verify Supabase row

### Phase 5 — Calculator Integration (planned)

- [ ] Solar Calculator CTA submits result context alongside contact details
- [ ] Attach `recommendedSystemKwp`, `estimatedAnnualSavingsInr`, `potentialSubsidyInr`, `monthlyConsumptionKwh` from `SolarCalculationResult`

### Phase 6 — Production Deployment (planned)

- [ ] Set production secrets in Railway dashboard
- [ ] Deploy server to Railway (connect repo, push to main branch)
- [ ] Configure production domain `api.fivefoldrenewable.com` in Railway custom domain settings
- [ ] End-to-end production test
