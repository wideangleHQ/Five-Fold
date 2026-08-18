# SEO

## Approved copy

Meta title:

> Fivefold Renewable | Solar EPC & Rooftop Solar Company in Odisha

Meta description: use the description from the approved content brief
directly rather than rewriting it — it was written with the target keywords
below in mind.

## Target keywords

```
Rooftop Solar Odisha
Solar Company Bhubaneswar
Solar Installation Odisha
Solar EPC Company Odisha
PM Surya Ghar Odisha
Residential Solar Odisha
Commercial Solar Bhubaneswar
Industrial Solar Odisha
Solar Maintenance Odisha
Solar AMC Odisha
Net Metering Odisha
```

Write for these naturally across page copy and headings. Do not stuff them
into the same paragraph or repeat them past the point of reading naturally —
the brief calls this out explicitly as something to avoid.

## Structured data

```
Organization schema     — site-wide
LocalBusiness schema    — homepage / contact page
Service schema          — /services and each service section
FAQ schema              — wherever the FAQ accordion renders
Breadcrumb schema       — all non-home pages
```

## Per-page basics

Every page needs its own title, description, canonical URL, Open Graph tags,
and Twitter card tags — not just the homepage. `src/lib/seo.ts` should be the
single place that builds this metadata so every route uses the same shape
instead of hand-rolling it per page.

## Sitemap and robots

Standard `sitemap.xml` and `robots.txt`, generated from the same route list as
[Pages and content](pages_and_content.md). The project sitemap specifically
should only include `published: true` projects — see
[Project portfolio](projects.md); an unpublished project leaking into the
sitemap defeats the publication-permission rule as surely as it appearing on
the grid would.

## Images

Every image needs real alt text describing the image, not the filename or a
keyword-stuffed phrase. Project images in particular should describe the
installation, not just repeat "solar panels Odisha."
