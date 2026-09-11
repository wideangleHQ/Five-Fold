# 11 — Repository Architecture

**Status:** Implemented — Phase 0 complete  
**Purpose:** Documents the full-stack monorepo structure established in the architecture setup phase.

This document describes the repository layout, development environment, port allocation, and the boundaries between the client and server.

---

## Repository Layout

```
Fivefold_Website/                 ← repository root
│
├── client/                       ← Next.js frontend (React website)
│   ├── src/
│   │   ├── app/                  ← Next.js App Router pages
│   │   ├── components/           ← React components
│   │   ├── lib/                  ← Utilities, Solar Calculator engine
│   │   └── data/                 ← Static data, solar resource data
│   ├── public/                   ← Static assets, hero animation frames
│   ├── package.json
│   ├── next.config.js
│   ├── tsconfig.json
│   ├── tailwind.config.ts
│   ├── postcss.config.js
│   ├── vitest.config.ts
│   └── .env.local.example        ← Copy to .env.local for local dev
│
├── server/                       ← NestJS API backend
│   ├── src/
│   │   ├── main.ts               ← Application entry point
│   │   ├── app.module.ts         ← Root module
│   │   ├── health/               ← GET /api/health
│   │   └── common/               ← Shared filters, guards, pipes
│   ├── test/                     ← E2E tests
│   ├── package.json
│   ├── tsconfig.json
│   ├── tsconfig.build.json
│   ├── nest-cli.json
│   ├── .env.example              ← Copy to .env for local dev
│   └── .env                      ← Local secrets (gitignored)
│
├── docs/                         ← mdBook project handbook
│   └── src/                      ← Markdown source files
│
├── package.json                  ← Root orchestrator scripts
├── .gitignore
├── CLAUDE.md                     ← AI agent project instructions
└── DESIGN.md                     ← Visual design system
```

---

## Package Manager

**npm** (all three package.json files use npm).

Each workspace manages its own `node_modules/` and `package-lock.json`. There is no shared hoisted node_modules at the root — client and server dependencies are independent.

---

## Development Setup

### First-time setup

```bash
# Install client dependencies
npm install --prefix client

# Install server dependencies
npm install --prefix server
```

Or using the root convenience script:

```bash
npm run install:all
```

### Running in development

**Client** (Next.js, port 3000):
```bash
npm run dev:client
# or directly: npm run dev --prefix client
```

**Server** (NestJS, port 3001):
```bash
npm run dev:server
# or directly: npm run start:dev --prefix server
```

Both can run simultaneously — they use different ports.

### Root convenience scripts

| Script | What it does |
|---|---|
| `npm run dev:client` | Starts Next.js dev server on port 3000 |
| `npm run dev:server` | Starts NestJS dev server on port 3001 with hot reload |
| `npm run build:client` | Production build for Next.js |
| `npm run build:server` | Production build for NestJS |
| `npm run test:client` | Runs Vitest tests for the solar engine and client code |
| `npm run test:server` | Runs Jest tests for NestJS |
| `npm run install:all` | Installs dependencies for both client and server |

---

## Port Allocation

| Service | Local Port | Purpose |
|---|---|---|
| Client (Next.js) | `3000` | Fivefold website |
| Server (NestJS) | `3001` | Lead API |

The client communicates with the server at `http://localhost:3001/api/*` during development. This is configured via the `NEXT_PUBLIC_API_URL` environment variable in `client/.env.local`.

---

## Environment Variables

Environment variables are separated by concern. Server secrets never reach the browser.

### Client (`client/.env.local`)

| Variable | Example | Notes |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | `http://localhost:3001` | URL of the NestJS server. `NEXT_PUBLIC_` prefix embeds it in the browser bundle — safe, it is not a secret. |

Copy `client/.env.local.example` → `client/.env.local` for local development.

### Server (`server/.env`)

| Variable | Notes |
|---|---|
| `NODE_ENV` | `development` or `production` |
| `PORT` | NestJS listen port (default: 3001) |
| `CLIENT_URL` | Allowed CORS origin (e.g. `http://localhost:3000`) |
| `SUPABASE_URL` | Supabase project URL — server-side only |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service-role key — server-side only, never browser |
| `WHATSAPP_ACCESS_TOKEN` | WhatsApp Cloud API token — server-side only, never browser |
| `WHATSAPP_PHONE_NUMBER_ID` | WhatsApp phone number ID — server-side only |
| `WHATSAPP_BUSINESS_ACCOUNT_ID` | WhatsApp business account ID — server-side only |
| `WHATSAPP_VERIFY_TOKEN` | WhatsApp webhook verify token — server-side only |

Copy `server/.env.example` → `server/.env` and fill in real values.

**Critical rule:** `SUPABASE_SERVICE_ROLE_KEY`, `WHATSAPP_ACCESS_TOKEN`, and all server credentials must never appear in `client/.env.local` or any `NEXT_PUBLIC_` variable. They would be embedded in the browser bundle and exposed publicly.

---

## Client Architecture

The client is a **Next.js 14** application using the App Router.

```
client/src/
├── app/                    ← Route segments (Next.js App Router)
│   ├── page.tsx            ← Home page
│   ├── contact/page.tsx    ← Contact / enquiry page
│   ├── solar-calculator/   ← Solar Calculator page
│   └── ...                 ← Other pages
│
├── components/
│   ├── calculator/         ← SolarCalculator UI component
│   ├── forms/              ← ContactForm (currently simulated submission)
│   ├── hero/               ← Hero with scroll animation
│   ├── layout/             ← Header, Footer
│   ├── navigation/         ← Mobile menu, sticky CTA
│   ├── sections/           ← Homepage sections
│   ├── schemes/            ← Government Scheme Finder UI
│   └── ui/                 ← Shared UI primitives
│
├── lib/
│   ├── solar-engine/       ← Fully client-side Solar Calculator engine
│   │   ├── index.ts        ← Main export: calculateSolarRequirement()
│   │   ├── types.ts        ← CalculatorInput, SolarCalculationResult
│   │   └── ...             ← Individual engine modules
│   └── utils.ts
│
└── data/
    ├── solar/              ← Solar resource data, tariffs, subsidies
    └── ...                 ← Other static data
```

See `03-smart-solar-calculator.md` for the Solar Calculator engine architecture.

### Future API abstraction

When form submission is connected to the server (Phase 4), the pattern should be:

```
client/src/services/leads.ts    ← centralized API communication
  └── submitLead(data)          ← called by UI components
```

This keeps API URLs and fetch logic out of individual form components.

---

## Server Architecture

The server is a **NestJS 10** application using TypeScript.

```
server/src/
├── main.ts                 ← Bootstrap: port, CORS, global pipes
├── app.module.ts           ← Root module, imports all feature modules
│
├── health/
│   ├── health.module.ts
│   └── health.controller.ts  ← GET /api/health → { status: "ok" }
│
└── common/
    └── filters/
        └── http-exception.filter.ts  ← Safe error responses to client
```

### Implemented in Phase 0

- Global API prefix `/api`
- Global `ValidationPipe` (whitelist, forbidNonWhitelisted, transform)
- CORS configured to `CLIENT_URL` environment variable
- `GET /api/health` endpoint
- `HttpExceptionFilter` — safe error responses (no stack traces to clients)
- `@nestjs/config` — environment variable management

### Planned future modules

These modules will be added in subsequent phases. They do not exist yet.

```
server/src/
├── leads/                  ← Phase 1: POST /api/leads
│   ├── leads.module.ts
│   ├── leads.controller.ts
│   ├── leads.service.ts    ← Orchestrates: validate → Supabase → WhatsApp
│   └── dto/
│       └── create-lead.dto.ts
│
├── integrations/
│   ├── supabase/           ← Phase 3: Supabase persistence service
│   └── whatsapp/           ← Phase 3: WhatsApp notification service
```

---

## How Client and Server Communicate

```
Browser
  │
  │  HTTPS POST /api/leads   (JSON)
  ▼
NestJS (server)
  │
  ├── Validate DTO           (class-validator)
  ├── Insert to Supabase     (planned)
  └── WhatsApp notification  (planned)
```

The client submits structured JSON to `POST /api/leads`. The server validates, persists, and notifies without exposing credentials or internal errors to the browser.

During development, the client points to `http://localhost:3001`. In production, it points to `https://api.fivefoldrenewable.com` (or the deployed server URL).

---

## Deployment Architecture

### Development

```
localhost:3000  (Next.js — npm run dev:client)
localhost:3001  (NestJS  — npm run dev:server)
```

### Production (planned)

```
https://www.fivefoldrenewable.com    ← Client (Vercel or Railway)
https://api.fivefoldrenewable.com    ← Server (Railway or similar Node.js host)
```

Client and server deploy independently. A server deployment does not require a client redeployment, and vice versa.

**Hosting selection criteria for the server:** The NestJS server is a standard Node.js process and requires a platform that supports Node.js runtime (not serverless edge workers). Selection should be based on: Node.js support, free/low-cost tier, no excessive cold-start penalty, environment secret management, HTTPS, and regional proximity to Odisha for low latency. Railway is the current default candidate.

See `10-lead-submission-architecture.md` for the full backend architecture specification.

---

## What Changed in Phase 0

| Before | After |
|---|---|
| Frontend files at repository root (`src/`, `public/`, `package.json`, etc.) | Frontend files under `client/` |
| No backend | NestJS server scaffold under `server/` |
| No root `package.json` | Root `package.json` with convenience scripts |
| Single deployment target | Independent client/server deployment |
| `ContactForm` uses `setTimeout` simulation | Still simulated — connection is Phase 4 |

**The website UI is unchanged.** The restructuring is repository organization only. Every page, component, animation, GSAP behavior, and the Solar Calculator work exactly as before — they are now located at `client/src/...` instead of `src/...`.

---

## Git History

All frontend files were moved from `src/` to `client/src/` using `git add -A` (git detects renames automatically when file content is identical). Git history is preserved for all renamed files.
