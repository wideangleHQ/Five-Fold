# 08 — Interactive Features & Technology

This document defines functionality and technical requirements.

Functional requirements must NOT be interpreted as instructions to create visible UI elements for every feature.

---

# INTERACTIVE FEATURES

## 01 — Smart Solar Finder / Calculator

Customer enters basic requirements and receives an indicative solution.

Purpose:
Help visitors understand their potential solar requirement.

The calculator should feel simple and guided.

See `03-smart-solar-calculator.md`.

---

## 02 — Government Scheme Finder

Question-based discovery of possible government scheme options.

Purpose:
Help visitors understand what may apply to them.

See `04-government-schemes.md`.

---

## 03 — Product / Solution Recommendation

Use available customer inputs to suggest a suitable Fivefold solution category.

Recommendations must remain indicative where applicable.

---

## 04 — Contextual Interactions

Information such as schemes, benefits, FAQs, AMC details and enquiry paths may appear contextually.

Use contextual interaction only when it improves clarity.

Do not create pop-ups simply to add interaction.

---

## 05 — Project Explorer

Allow project filtering by:

- Type
- Location
- Capacity

The visual implementation should remain editorial and lightweight.

---

## 06 — Dynamic Results

User inputs dynamically update recommendations.

Results must be clear and concise.

Do not turn dynamic results into a dashboard unless the user journey genuinely requires it.

---

## 07 — Lead Capture

Every major decision-making journey should provide a clear path to contact Fivefold.

Lead capture should feel like a natural next step.

Do not add unnecessary forms or repeated CTAs.

---

# INTERACTION PRINCIPLES

Every interactive element must serve at least one of:

1. Understanding
2. Decision-making
3. Conversion

If it does none of these, do not implement it.

Motion is not a feature by itself.

---

# TECHNOLOGY STACK

## Frontend

React.js

Used for:

- fast interactions
- component-based architecture
- smooth transitions
- dynamic user flows
- scalable structure

## Database

Supabase (planned — not yet integrated)

Intended for:

- customer enquiries and lead storage
- calculator submissions
- contact forms
- project and content data where required

See `10-lead-submission-architecture.md` for the full data model and integration specification.

## Hosting

**Frontend (client/):** Vercel or Railway (Next.js application)  
**Backend (server/):** Railway or similar Node.js platform (NestJS application)

See `10-lead-submission-architecture.md` for the backend architecture specification.  
See `11-repository-architecture.md` for the full monorepo structure and development setup.

## Architecture

**Implemented (Phase 0):**

```
client/   ← Next.js (React website)
            └─ ContactForm: setTimeout simulation (real API connection is Phase 4)
            └─ SolarCalculator: fully client-side

server/   ← NestJS (Lead API foundation)
            └─ GET /api/health → { status: "ok" }
            └─ CORS, global validation, env config
```

**Full planned architecture:**

```
client/ (Next.js)
    │
    │ HTTPS POST /api/leads
    ▼
server/ (NestJS on Railway)
    │
    ├─── Supabase      (lead persistence — Phase 1)
    └─── WhatsApp API  (notification — Phase 3)
```

The website UI is unchanged. Form submission will eventually replace the current simulation with a real call to `POST /api/leads` without changing any visible design.

See `10-lead-submission-architecture.md` and `11-repository-architecture.md` for the complete specification.

---

# HOSTING & RECURRING COST

Estimated infrastructure cost to be borne by the client:

≈ ₹3,000/- per month

This estimate reflects frontend hosting (Vercel or Railway) and Supabase. The NestJS server can operate on Railway's free/starter tier at initial lead volumes. Actual charges may vary with usage, traffic and service-plan changes.

---

# PROJECT SCOPE

Included:

- Custom UI/UX implementation
- React.js / Next.js development
- Responsive website
- Page-wise development
- Interactive user journeys
- Smart Solar Calculator (fully client-side, complete)
- Government Scheme Finder
- Lead-generation forms
- Dynamic recommendation logic
- Repository restructuring: client/server monorepo (complete — Phase 0)
- NestJS server foundation with health endpoint (complete — Phase 0)
- Supabase lead integration (planned — Phase 1, see `10-lead-submission-architecture.md`)
- Lead API: POST /api/leads (planned — Phase 1)
- WhatsApp Business notification (planned — Phase 3)
- Frontend hosting deployment (Vercel or Railway)
- Backend hosting deployment (Railway or similar Node.js platform)
- Project showcase
- Interactive FAQ
- SolarCare presentation
- Contact / enquiry system
- Basic SEO-ready structure
- Performance-focused development

---

# BUILD PRIORITY

## Phase 1 — Highest Commercial Value

1. Home
2. Smart Solar Calculator
3. Contact / Enquiry
4. Solutions
5. Government Scheme Finder

## Phase 2

6. Projects
7. Engineering
8. SolarCare
9. Warranty & Support
10. FAQ
11. About

---

# IMPORTANT DISTINCTION

This document defines:

**WHAT THE PLATFORM DOES**

It does NOT define:

**HOW MANY CARDS, ICONS, PANELS OR VISUAL EFFECTS SHOULD APPEAR.**

Visual implementation must follow:

`09-design-guidelines.md`

Functional richness must not result in visual clutter.
