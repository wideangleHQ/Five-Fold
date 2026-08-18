# Solar calculator

## Purpose

Lead generation through a self-service estimate, not a certified financial
tool. Everything about this feature should be built with that distinction in
mind — the number on screen has to be useful enough to keep someone engaged,
and conservative enough that nobody mistakes it for a quote.

## Inputs

```
Monthly Electricity Bill
Average Monthly Consumption
Location
Roof Type
Available Roof Area
```

## Outputs

```
Recommended Solar Capacity
Estimated Annual Generation
Estimated Annual Savings
Estimated CO2 Reduction
Estimated Payback Period
```

## Where the logic lives

Calculation logic belongs in `src/lib/calculator.ts` as plain functions, not
inline in the component — see [Architecture](architecture.md). The actual
formulas (irradiance assumptions per location, tariff assumptions, degradation
curve, payback formula) are not yet defined and need either an internal
engineering sign-off or a documented external methodology before this ships.
Do not invent numbers here to fill the gap; leave the formula undecided and
flag it rather than guessing a plausible-looking one.

## The estimate disclaimer is not optional

Every surface that shows a calculator output — the result panel, any
summary email, any place a number from this tool gets reused elsewhere on the
site — must carry language making clear these are estimates, not guaranteed
generation or financial outcomes. This is the same discipline the rest of the
site applies to the "up to 90%" savings claim and the subsidy amounts; see
[Client confirmations](client_confirmations.md).

## CTA

"Get My Solar Estimate" leads into "Want an accurate assessment? Talk to our
solar engineers," which is the actual lead-capture moment — the calculator's
job is to get someone far enough to want that conversation, not to be the
final answer.
