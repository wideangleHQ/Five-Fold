# 10 — Lead Submission & Server Integration Architecture

**Status:** Phase 1 Implemented — Phase 3 (WhatsApp) and Phase 4 (Frontend Integration) Planned  
**Purpose:** Authoritative technical specification for the centralized lead submission system.

This document defines how the Fivefold website collects, submits, persists, and notifies leads. The existing UI is not changed by this architecture — the submission mechanism changes behind it.

---

## Current Implementation State

**Phase 0 (complete):** Repository restructured into `client/` + `server/` monorepo. NestJS foundation with environment configuration, CORS, global validation, and `GET /api/health`. See `11-repository-architecture.md`.

**Phase 1 (complete):** `POST /api/leads` is implemented in `server/src/leads/`. DTO validation, server-side normalization, and Supabase persistence are all active. The Supabase `leads` table schema is in `server/supabase/migrations/001_create_leads_table.sql`.

**`client/src/components/forms/ContactForm.tsx`** still simulates submission with a `setTimeout` call — no real API call is made yet. Connecting the form is Phase 4.

**WhatsApp notification is not yet implemented.** That is Phase 3.

Items marked **Planned** below are not yet implemented.

---

## Architecture Overview

```
client/ (Next.js — React website)
          |
          | HTTPS POST /api/leads  (JSON)
          v
server/ (NestJS — Lead API on Railway)
          |
          +------------------------+
          |                        |
          v                        v
     Supabase                WhatsApp Business
     Database                Cloud API
     (source of truth)       (notification only)
          |                        |
          v                        v
   Lead History            Fivefold Team
   (persistent)            (operational alert)
```

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
- Persisting the validated lead to Supabase as the **source of truth**
- Triggering a WhatsApp Business notification after successful persistence
- Returning a safe, minimal response to the frontend
- Keeping all private credentials strictly server-side

The server must **never**:

- Expose database error messages to the public response
- Expose WhatsApp API errors to the public response
- Return internal stack traces, access tokens, or infrastructure details

### Supabase Database

Supabase is the **source of truth** for all submitted leads.

Supabase is responsible for:

- Persistent lead storage with created_at timestamps
- Lead history queryable by Fivefold team
- Submission metadata and source tracking
- Future reporting and CRM compatibility

Supabase is not a cache. A lead that exists in Supabase is the canonical record regardless of whether any notification succeeded.

### WhatsApp Business Cloud API

WhatsApp is an **immediate operational notification channel** only.

WhatsApp is responsible for:

- Alerting the Fivefold team in real time when a new lead is submitted

WhatsApp is **not** the database. If WhatsApp notification fails, the lead is not lost — it exists in Supabase. The team must check Supabase for leads if notifications are disrupted.

Official WhatsApp Business Cloud API is the only acceptable integration. Unofficial WhatsApp Web automation or third-party scrapers must not be used.

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
│   │   ├── leads.service.ts          # normalize → Supabase insert
│   │   ├── leads.controller.spec.ts
│   │   ├── leads.service.spec.ts
│   │   └── dto/
│   │       └── create-lead.dto.ts    # class-validator DTO
│   │
│   ├── integrations/                 # Phase 1
│   │   └── supabase/
│   │       ├── supabase.module.ts
│   │       └── supabase.service.ts   # Service-role Supabase client
│   │
│   └── common/
│       └── filters/
│           └── http-exception.filter.ts   # Safe error responses
│
├── supabase/
│   └── migrations/
│       └── 001_create_leads_table.sql     # Run in Supabase SQL editor
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
└── integrations/
    └── whatsapp/                     # Phase 3
        ├── whatsapp.module.ts
        └── whatsapp.service.ts
```

Each module has one clear responsibility. NestJS's module system enforces this boundary.

| File | Responsibility |
|------|---------------|
| `main.ts` | Bootstrap: port, global prefix, CORS, global ValidationPipe. |
| `app.module.ts` | Root module — imports all feature modules. |
| `health/health.controller.ts` | `GET /api/health`. Confirms server is running. |
| `leads/leads.controller.ts` | `POST /api/leads`. Validates DTO, delegates to service. (Planned — Phase 1) |
| `leads/leads.service.ts` | Orchestrates: validate → Supabase insert → WhatsApp notify → respond. (Planned) |
| `leads/dto/create-lead.dto.ts` | class-validator DTO — server-side schema for incoming lead payload. (Planned) |
| `integrations/supabase/supabase.service.ts` | Supabase client with service-role key. Lead insert. Error wrapping. (Planned — Phase 3) |
| `integrations/whatsapp/whatsapp.service.ts` | WhatsApp Cloud API call. Never throws on failure — WhatsApp failure does not fail the lead. (Planned — Phase 3) |
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
- Consistent WhatsApp notification format
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
- WhatsApp API error messages
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

## Supabase Integration

### Credential separation

| Credential | Who holds it |
|---|---|
| `SUPABASE_URL` | Server only (NestJS server (Railway) secret) |
| `SUPABASE_SERVICE_ROLE_KEY` | Server only (NestJS server (Railway) secret) |
| Supabase anon key (if used for public data) | May be in frontend `.env.local` / `NEXT_PUBLIC_` |

The service-role key bypasses Supabase Row Level Security. It must **never** be placed in a `NEXT_PUBLIC_` environment variable or anywhere accessible to the browser.

If the frontend currently uses Supabase directly for public read operations (project data, content, etc.), that usage is separate and may legitimately use the anon key with appropriate RLS policies. This document covers only lead submission and does not affect or remove any future public Supabase functionality.

### Insert operation

`services/supabase.ts` should:

1. Initialize the Supabase client with `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`
2. Accept a normalized lead object
3. Insert it into the `leads` table
4. Return the inserted row (to get the generated `id`)
5. Wrap Supabase errors and throw a typed internal error (never the raw Supabase error)

```typescript
// Conceptual shape — implementation detail
async function insertLead(lead: NormalizedLead): Promise<{ id: string }> {
  const { data, error } = await supabase
    .from('leads')
    .insert(lead)
    .select('id')
    .single();

  if (error) throw new LeadInsertError(error.message);
  return { id: data.id };
}
```

---

## WhatsApp Service

`services/whatsapp.ts` is responsible for sending an internal notification to the Fivefold team.

### Notification message format

```
🔔 NEW FIVEFOLD ENQUIRY

Name: {name}
Phone: {phone}
Location: {city}, {state}

Interest: {leadType}
Source: {source}

{conditional calculator block:}
Monthly Consumption: {monthlyConsumptionKwh} kWh
Recommended System: {recommendedSystemKwp} kWp
Est. Annual Savings: ₹{estimatedAnnualSavings}
Subsidy: ₹{potentialSubsidyInr}

{message if present:}
Note: {message}

Submitted: {created_at ISO timestamp}
```

Omit sections with null values rather than showing "null" or "undefined" to the team.

### Implementation requirements

- Use only the official WhatsApp Business Cloud API (`graph.facebook.com/v*/messages`)
- Credentials used: `WHATSAPP_ACCESS_TOKEN`, `WHATSAPP_PHONE_NUMBER_ID`
- The function must **never throw** in a way that fails the overall lead submission if WhatsApp fails
- Log the WhatsApp error internally (safe log, no credentials in log)
- Return a typed result indicating whether notification succeeded or failed

```typescript
// Conceptual shape
async function sendLeadNotification(lead: NormalizedLead): Promise<{ sent: boolean; error?: string }> {
  try {
    // ... call WhatsApp API
    return { sent: true };
  } catch (err) {
    return { sent: false, error: 'WhatsApp notification failed' };
  }
}
```

The `routes/leads.ts` handler calls `sendLeadNotification` after Supabase insert succeeds, but a failed notification does not cause the lead submission response to return `success: false`.

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
Send WhatsApp notification (success)
      ↓
Return { success: true, leadId: "..." }
```

### Supabase succeeds, WhatsApp fails

```
Receive request
      ↓
Validate (pass)
      ↓
Insert to Supabase (success) ← lead safely stored
      ↓
Send WhatsApp notification (fails)
      ↓
Log notification failure internally (no credentials in log)
      ↓
Return { success: true, leadId: "..." }
```

The lead exists in Supabase. The team can check Supabase for leads if WhatsApp is disrupted. This is the correct behaviour — WhatsApp is a convenience channel, not the source of truth.

### Supabase fails

```
Receive request
      ↓
Validate (pass)
      ↓
Insert to Supabase (fails)
      ↓
Do NOT attempt WhatsApp notification
      ↓
Return HTTP 500: { success: false, message: "Unable to submit your enquiry." }
```

Do not report a successful submission if the lead was not persisted. Do not send a WhatsApp notification for a lead that was not stored.

### Validation fails

```
Receive request
      ↓
Validate (fail)
      ↓
Return HTTP 400: { success: false, message: "...", fields: [...] }
```

No Supabase call. No WhatsApp call.

### Future reliability

If WhatsApp notification failure rate becomes a problem at scale, a retry queue (e.g. BullMQ with Redis, or a Supabase-backed retry table) may be introduced. This is **outside the initial implementation**. The initial architecture logs failures for manual follow-up rather than adding queue infrastructure prematurely.

---

## Environment Variables

All secrets are managed as Railway environment variables set in the Railway dashboard. They are never committed to the repository, never in `.env` files tracked by git, and never accessible to the browser.

### Server (`server/.env` locally, Railway dashboard in production)

| Variable | Purpose |
|---|---|
| `NODE_ENV` | `development` or `production` |
| `PORT` | Server listen port (default: 3001) |
| `CLIENT_URL` | Allowed CORS origin |
| `SUPABASE_URL` | Supabase project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service-role key (bypasses RLS) — never in client |
| `WHATSAPP_ACCESS_TOKEN` | WhatsApp Business Cloud API token — never in client |
| `WHATSAPP_PHONE_NUMBER_ID` | WhatsApp Cloud API phone number ID — never in client |
| `WHATSAPP_BUSINESS_ACCOUNT_ID` | WhatsApp Business Account ID — never in client |
| `WHATSAPP_VERIFY_TOKEN` | WhatsApp webhook verify token — never in client |

Local: copy `server/.env.example` → `server/.env` and fill in real values.  
Production: set each variable in the Railway project dashboard. Never commit `.env`.

### Client (`client/.env.local` locally, Vercel/Railway env vars in production)

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_API_URL` | URL of the NestJS server (e.g. `https://api.fivefoldrenewable.com`) |
| `NEXT_PUBLIC_SUPABASE_URL` | Only if future public read operations are added |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Only if future public read operations are added |

`NEXT_PUBLIC_API_URL` is not a secret — it is embedded in the browser bundle. The service-role key is never placed here under any circumstance.

Local: copy `client/.env.local.example` → `client/.env.local` and set `NEXT_PUBLIC_API_URL=http://localhost:3001`.

### Secret rotation

When rotating:
1. Generate new credentials from the relevant provider (Supabase, WhatsApp)
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
          +-------------------------+
          v                         v
  Supabase project             WhatsApp Business
  (Supabase Cloud)             Cloud API
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
          +-------------------------+
          v                         v
  Supabase project             WhatsApp (can be skipped
  (dev project or prod)        in development)
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
- WhatsApp result: success/fail, no credential or message content
- Rate limit events: IP (hashed), timestamp

### What to never log

- WhatsApp access tokens
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
| Email notification | WhatsApp is sufficient for initial operations |
| AI lead classification | Not on the critical submission path |
| Retry queue | Manual Supabase query covers failed WhatsApp notifications |
| Lead admin dashboard | Supabase dashboard is sufficient initially |
| Follow-up automation | Out of scope |
| Docker / Kubernetes | Unnecessary at initial scale |
| Redis / external cache | In-memory rate limiting sufficient at initial volume |
| Message broker | No async processing required at initial scale |
| Separate per-segment endpoints | A single endpoint with `source` field covers all cases |

### Future extensibility

The architecture can naturally extend to:

- A lead admin dashboard querying the `leads` table
- Email notifications alongside WhatsApp
- AI classification of incoming leads by type/quality
- CRM sync (Zoho, HubSpot, or custom) triggered by Supabase webhooks
- Analytics queries over the `leads` table
- Retry queue for failed WhatsApp notifications

These are additions, not redesigns. The initial implementation does not need to anticipate them structurally.

---

## Checklist: Implementation Sequence

### Phase 1 — Supabase Lead API (complete)

- [x] Create Supabase `leads` table — run `server/supabase/migrations/001_create_leads_table.sql` in Supabase SQL editor
- [x] Configure Supabase Row Level Security: deny all public access; service-role bypasses RLS
- [x] `server/src/integrations/supabase/supabase.service.ts` — service-role client
- [x] `server/src/leads/dto/create-lead.dto.ts` — DTO validation (name, phone required; all calculator fields optional)
- [x] `server/src/leads/leads.service.ts` — normalize + Supabase insert
- [x] `server/src/leads/leads.controller.ts` — `POST /api/leads`
- [x] Unit tests pass (7 tests)
- [ ] Fill in `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` in `server/.env` (manual — requires Supabase project)
- [ ] Run migration against your Supabase project

### Phase 2 — Security / Rate Limiting (planned)

- [ ] Rate limiting (ThrottlerModule or custom guard)
- [ ] Bot protection / CAPTCHA consideration
- [ ] Input sanitization review

### Phase 3 — WhatsApp Notification (planned)

- [ ] `server/src/integrations/whatsapp/whatsapp.service.ts`
- [ ] Wire into `LeadsService.create()` after Supabase insert
- [ ] WhatsApp message template
- [ ] Handle WhatsApp failure gracefully (lead is NOT lost)

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
