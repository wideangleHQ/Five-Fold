# Decision log

Short-form record of decisions already made, so they don't get relitigated
mid-build. Add to this list rather than editing history — if a decision is
later reversed, add a new entry that supersedes the old one and say so.

**No CMS.** Content is small, fixed by an approved brief, and changes rarely.
Local typed data under `src/data/` instead — see
[Data and content model](data_and_content_model.md).

**Projects stay data-driven, gated by `published`.** The client-permission
requirement in the brief is not optional UI polish; it is enforced at the data
layer so no future screen can accidentally leak an unpublished project — see
[Project portfolio](projects.md).

**No subsidy amounts, ever, hardcoded.** The source document itself says
eligibility and amount are subject to prevailing government guidelines. Every
mention on the site routes through that same disclaimer instead of a number —
see [Client confirmations](client_confirmations.md).

**Calculator logic lives in `src/lib/calculator.ts`, isolated from
components.** Keeps it testable and auditable independent of the UI — see
[Solar calculator](solar_calculator.md).

**Motion budget: Framer Motion for UI, GSAP for a short list of high-value
sections only.** The brief's own words: "premium, not everything moves" — see
[Features](features.md).

**Hosting and domain: not decided yet, deliberately.** Recorded as an open
question rather than defaulted to Vercel, because the production domain
question (replace `www.fivefoldsolar.com` vs. launch elsewhere) has not been
answered — see [Deployment](deployment.md).
