# Data and content model

All site content is local, typed data under `src/data/` — see
[Architecture](architecture.md) for why this project does not use a CMS.
Nothing below is implemented yet; treat these as the shapes to build to, and
correct this page once real types exist.

## Projects

```ts
type Project = {
  name: string;
  location: string;
  capacity: string;   // e.g. "550.5 kWp" — display string, not a bare number
  category: "Industrial" | "Commercial" | "Institutional" | "Government";
  image?: string;
  description?: string;
  published: boolean; // publication-permission gate, see Project portfolio
};
```

`published` is not a UI convenience flag. It is the single source of truth for
whether a project may appear anywhere on the site — see
[Project portfolio](projects.md) for the rule it enforces and why it exists.

## Services

Four fixed records (Residential, Commercial, Industrial, Maintenance) — see
[Components](components.md) for their content. Exact field shape: not yet
defined; likely `{ slug, title, audience, description, bullets: string[] }`.

## FAQs

Question/answer pairs, seeded from the approved content brief:

- How much can I save with rooftop solar?
- Do you provide subsidy assistance?
- How long does installation take?
- Do solar panels work during cloudy weather?
- What maintenance does a solar system require?
- Do you provide net metering support?

Shape: `{ question: string; answer: string }[]`. Answers touching savings or
subsidy amounts must stay consistent with the disclaimers in
[Client confirmations](client_confirmations.md) — do not let an FAQ answer
quietly commit to a number the rest of the site is deliberately vague about.

## Locations

Current service areas: Bhubaneswar, Cuttack, Bhadrak, Balasore, Jajpur,
Nayagarh, alongside 10+ states of execution experience claimed elsewhere on
the site. Shape: `string[]` is probably sufficient unless the service-area map
needs coordinates.

## SolarCare plans

```
Essential — 1 Year
Plus      — 3 Years
Premium   — 5 Years
Elite     — 10 Years
```

No `price` field goes in this data until the client confirms pricing — see
[Client confirmations](client_confirmations.md). Build the type with price as
optional from the start rather than adding it later, so the SolarCare page
doesn't assume it exists.
