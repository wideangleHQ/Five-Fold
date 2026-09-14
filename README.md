# Fivefold Renewable — Website

Next.js 14 frontend + NestJS 10 backend monorepo for the Fivefold Renewable website and lead API.

## Repository Structure

```
client/   ← Next.js 14 (React website) — port 3000
server/   ← NestJS 10 (Lead API) — port 3001
docs/     ← mdBook project handbook
```

## Quick Start

```bash
# Install dependencies
npm install --prefix client
npm install --prefix server

# Start both dev servers
npm run dev:client    # http://localhost:3000
npm run dev:server    # http://localhost:3001/api/health
```

## Architecture

```
client/ (Next.js)
    │
    │ HTTPS POST /api/leads
    ▼
server/ (NestJS on Railway)
    │
    ├─── Supabase via Prisma   (lead persistence — source of truth)
    └─── Resend email API      (notification → info@fivefold.co.in)
```

Every valid lead submission persists to Supabase **first**, then triggers a notification email to `info@fivefold.co.in` via Resend. Email failure never loses a lead.

## API

| Endpoint | Description |
|---|---|
| `GET /api/health` | Server health check |
| `POST /api/leads` | Submit a lead enquiry |

## Environment Variables

Copy `server/.env.example` → `server/.env` and fill in:

| Variable | Purpose |
|---|---|
| `DATABASE_URL` | Pooled Supabase Postgres connection (Prisma) |
| `DIRECT_URL` | Direct Supabase Postgres connection (`prisma migrate`) |
| `RESEND_API_KEY` | Resend API key — **server-only, never in client** |
| `LEAD_NOTIFICATION_EMAIL` | Notification recipient (e.g. `info@fivefold.co.in`) |
| `LEAD_FROM_EMAIL` | Verified sender address |

## Security

- Server secrets (`DATABASE_URL`, `RESEND_API_KEY`) are never placed in `client/` or `NEXT_PUBLIC_*` variables
- Rate limiting: 5 requests/hour per IP on `POST /api/leads`
- `helmet()` security headers on all responses
- Honeypot field (`_gotcha`) for bot protection
- 16 KB request body limit

## Implementation Status

| Phase | Description | Status |
|---|---|---|
| 0 | Client/server monorepo + NestJS foundation | ✅ Complete |
| 1 | `POST /api/leads` + Prisma/Supabase persistence | ✅ Complete |
| 2 | Rate limiting, honeypot, security headers | ✅ Complete |
| 3 | Resend email notification to `info@fivefold.co.in` | 🔲 Planned |
| 4 | Frontend form integration (replace `setTimeout`) | 🔲 Planned |
| 5 | Solar Calculator lead submission | 🔲 Planned |
| 6 | Production deployment (Railway) | 🔲 Planned |

## Documentation

See `docs/src/` for the full project handbook, including:
- `10-lead-submission-architecture.md` — API spec, data model, security, deployment
- `08-features-and-tech.md` — technology stack and project scope
- `03-smart-solar-calculator.md` — calculator engine specification
