# Architecture

## The pieces

```
Browser
   |
   v
Next.js (App Router, TypeScript)
   |
   +-- Tailwind CSS -- styling
   +-- Local content data (TS/JSON) -- projects, services, FAQs, locations
   +-- Framer Motion -- card/hover/nav/accordion interactions
   +-- GSAP + ScrollTrigger -- hero transition, engineering timeline,
   |                           project reveal, animated counters
   +-- Contact form -- destination not yet decided (see below)
```

This is a static, content-driven marketing site, not an application with
users, auth, or a database. Resist adding any of those unless a real
requirement shows up — see [Client confirmations](client_confirmations.md) for
the current list of open questions, none of which need a backend.

The one place this could change is the contact/lead form. It needs to land
somewhere — email, a spreadsheet, or a CRM — and that destination is not
decided. Whatever it is, keep it isolated behind a single server action or API
route so the rest of the site stays static.

## Why no CMS

Content in this project is small, fixed by an approved brief, and changes
rarely (project list, service copy, FAQ, SolarCare tiers). A CMS is more
moving parts than the problem needs. Keep content as typed local data under
`src/data/` — see [Data and content model](data_and_content_model.md) — so it
is easy to edit in a pull request and still gets full TypeScript checking. If
the client later wants self-service content editing, that is a real
requirement and worth a proper page, not a default to build in from day one.

## Rendering flow

```
Route (app/**/page.tsx)
   |
   v
Section components (Hero, WhyFivefold, EngineeringCapability, ...)
   |
   v
Reusable UI components (Card, Button, Accordion, ...)
   |
   v
Content data (src/data/*.ts)
```

Section components own layout and copy for one homepage or page section each.
UI components are presentational and take props — they should not import from
`src/data` directly, so they stay reusable across pages.

## Folder layout

```
src/
├── app/
│   ├── page.tsx              home
│   ├── about/
│   ├── engineering/
│   ├── services/
│   ├── projects/
│   ├── solarcare/
│   ├── schemes/
│   ├── contact/
│   ├── privacy/
│   └── terms/
├── components/
│   ├── layout/                header, footer, page shell
│   ├── navigation/             desktop nav, mobile menu, sticky behaviour
│   ├── hero/
│   ├── sections/                one component per homepage section
│   ├── projects/                grid, filter, card, detail
│   ├── forms/                   contact/lead form
│   ├── calculator/               solar savings calculator
│   └── ui/                       button, card, accordion, container
├── data/
│   ├── projects.ts
│   ├── services.ts
│   ├── faqs.ts
│   ├── locations.ts
│   └── solarcare-plans.ts
├── lib/
│   ├── utils.ts
│   ├── calculator.ts             isolated calculation logic, see
│   │                              [Solar calculator](solar_calculator.md)
│   └── seo.ts
└── public/
    ├── images/
    ├── projects/
    └── brand/
```

Keep `src/lib/calculator.ts` free of JSX and free of any component import. It
should be plain functions that take inputs and return numbers, so it can be
unit tested and audited without spinning up a component tree — the numbers it
produces are customer-facing estimates and worth getting right in one place.

## Client/server boundary

Everything on this site can render as a React Server Component by default. The
only components that need `"use client"` are ones with interaction state:
mobile navigation, the accordion, the project filter, the calculator, form
inputs, and anything driven by Framer Motion or GSAP. Keep that boundary as
low in the tree as possible — a section component that is 90% static copy
should not become a client component just because one button inside it has an
`onClick`; extract that button into its own client component instead.

## Performance targets

```
Lighthouse Performance:    90+
Lighthouse Accessibility:  95+
Lighthouse Best Practices: 95+
Lighthouse SEO:            95+
```

The project portfolio and homepage imagery are the main risk to these numbers.
Use `next/image`, serve WebP/AVIF, lazy-load everything below the fold, and do
not let a project's hero photo ship uncompressed — see
[Project portfolio](projects.md) for the image rule tied to publication
permission, which is a separate concern from compression.
