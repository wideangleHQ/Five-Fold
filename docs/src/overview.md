# Start here

You are reading the build handbook for the Fivefold Renewable website, a
corporate and lead-generation site for Fivefold Renewable Pvt. Ltd., a solar
EPC company operating out of Odisha. If you have just joined this project,
read this page, then [Local setup](setup.md), then
[Architecture](architecture.md). After that you can jump to whichever page
covers the section you are building.

There is no repository yet at the time this handbook was written. Everything
here is a build spec, not a description of shipped code — the equivalent of a
Phase 2 page in a handbook that also has a Phase 1. When a repository exists,
each page should be rewritten to describe what the code actually does, and any
place where the code disagrees with this spec should be called out rather than
silently resolved. Until then, treat every page here as the agreed target, not
as observed fact.

## What the site does

Most solar sites in this market read as "we install panels." The brief this
project is built from is explicit that Fivefold should not read that way. The
positioning line that drives every section on the site is:

> We do not sell drawings. We engineer bankable solar plants.

Concretely, the site has to do three jobs at once: establish Fivefold as an
engineering-led EPC rather than a generic installer, carry enough project and
credential evidence to make that credible, and convert residential, commercial,
and industrial visitors into consultation requests. The homepage is the
primary vehicle for all three — see [Pages and content](pages_and_content.md)
for the section-by-section breakdown.

## Two kinds of requirement in this handbook

Requirements in this project come from two places, and they do not always
agree.

The **PDF content document** is the approved, typed source of truth for
business content: credentials, service descriptions, project list, process
steps, contact details, SEO copy.

The **handwritten notes** are a set of change requests layered on top of the
PDF: a tagline change, a homepage colour change, an imagery change, a request
for a savings calculator, an FAQ section, and a government scheme section, plus
a few contact numbers that are not clearly legible.

Where the two disagree, or where a handwritten item is not yet resolved into
final copy, this handbook does not silently pick one. It says so, and the item
goes in [Client confirmations](client_confirmations.md). That page is the
shortest path to understanding what is still open.

## Status

Nothing is built. This handbook exists to make the first build pass fast:
[Architecture](architecture.md) fixes the stack and folder layout,
[Pages and content](pages_and_content.md) fixes the route list, and each
feature page fixes the decisions that are already made so nobody relitigates
them mid-build. The priority order for a short build window is Homepage,
Projects, Services, Engineering, Contact, and the Solar Calculator — those six
carry almost all of the commercial value. SolarCare, Warranty, FAQ, and the
remaining supporting pages follow in a second pass without touching the design
system.

## Vocabulary

**EPC** — Engineering, Procurement, and Construction. The positioning Fivefold
wants: not an installer, an EPC contractor.

**DPR** — Detailed Project Report, one of the pre-construction engineering
deliverables referenced in [Components](components.md) and
[Pages and content](pages_and_content.md).

**AMC** — Annual Maintenance Contract. Sold on this site as **SolarCare**, in
four tiers — see [Pages and content](pages_and_content.md).

**PM Surya Ghar** — PM Surya Ghar Muft Bijli Yojana, the government rooftop
solar subsidy scheme the site has a dedicated section for. Treated as a
disclaimer-heavy section throughout this handbook — see
[Client confirmations](client_confirmations.md).

**kWp** — kilowatt-peak, the unit every project in the portfolio is sized in.

## How to read the rest of this book

Each page describes one part of the build: what it contains, how it is
structured, and what is still open. File paths, where given, are proposed
locations under a Next.js App Router project — see
[Architecture](architecture.md) for the full layout.
