# Components

This page documents the component groups worth understanding before touching
the codebase, not every presentational primitive. Once components exist, keep
this page in sync with what they actually take as props.

## Navigation

Sticky header. Transparent over the hero, solid white with a shadow once the
page scrolls. Persistent "Get a Free Consultation" CTA on desktop; on mobile,
that CTA becomes a sticky bottom bar and the menu itself opens full-screen.
This is a client component — see the client/server boundary note in
[Architecture](architecture.md).

## Hero

One hero per page. Homepage hero is two-column: headline, short description,
primary CTA, secondary CTA (`Explore Our Projects`) on the left; a large,
non-stock solar/rooftop visual on the right. Avoid generic panel-field stock
photography — see [Design system](design_system.md) for the visual direction
this is meant to avoid.

## Engineering capability groups

Four groups, each a list of items rather than free text — build as a grid, not
a paragraph:

**Pre-construction engineering** — Feasibility Reports, Shadow Analysis, 3D
Layout, Capacity Estimation, PVsyst Yield Simulation, Bankable DPR, Financial
Modelling, Constructibility & Risk Review.

**Detailed execution engineering** — Execution Planning, Structural
Engineering, Detailed Engineering, Drawings, Permits, Installation,
Commissioning, Performance Assurance.

**Procurement and quality** — Tier-1 Components, Manufacturer/Supplier
Network, Execution SOP, Third-Party QA, Compliance, Testing, Documentation,
Traceability.

**Advanced EPC** — Turnkey Rooftop EPC, Material Benchmarking, QA,
Installation, Commissioning, Government/DISCOM Support, Performance Assurance.

## Service cards

Four cards, one per service, each expanding into its own scope on
`/services`:

| Card | Target | Included |
| --- | --- | --- |
| Residential Rooftop Solar | Homeowners | Site assessment, system design, installation, government scheme assistance, commissioning, technical support |
| Commercial Solar | Offices, retail, hotels, hospitals, educational institutions | — |
| Industrial Solar | Factories, warehouses, manufacturing | Messaging built around generation + reliability + engineering + long-term performance |
| Solar System Maintenance | All segments | Preventive maintenance, inspection, panel cleaning, monitoring, generation analysis, inverter checks, diagnostics, technical support |

## Projects grid and card

Filter bar (`All / Industrial / Commercial / Institutional / Government`)
above a card grid. Each card shows project image, client, location, capacity;
clicking opens a detail modal or page. The card and the filter must both
respect the `published` flag described in
[Project portfolio](projects.md) — a project that fails that check should
never reach the grid's data source, not just be hidden in the UI.

## Solar calculator

See [Solar calculator](solar_calculator.md) for inputs, outputs, and where the
calculation logic lives. The component itself should be a thin form + result
display; it should not contain calculation logic inline.

## FAQ accordion

Single-open or multi-open accordion, content sourced from `src/data/faqs.ts`.
Pair with FAQ structured data — see [SEO](seo.md).

## Footer

Five columns: Company (About, Engineering, Services, Projects), Solutions
(Residential, Commercial, Industrial, Maintenance), Support (SolarCare,
Warranty, FAQ, Government Schemes), Contact (phone, email, address, hours),
Legal (Privacy, Terms, Disclaimer).
