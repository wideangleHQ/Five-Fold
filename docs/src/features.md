# Features

## "Engineering Determines Performance"

This is meant to be the signature section of the site, not just another
content block — it is what separates Fivefold's narrative from a standard
installer page. The argument it makes: solar plants underperform when
engineering is treated as a formality, and Fivefold's differentiation is
generation, reliability, constructibility, and long-term return, not just
installed capacity.

Build it as a large editorial reveal, not a bullet list:

```
ENGINEERING
DETERMINES
PERFORMANCE.

   Feasibility
      |
    Design
      |
  Engineering
      |
  Procurement
      |
   Execution
      |
   Monitoring
      |
  Optimization
```

## How we work

Eight-stage process timeline, horizontal on desktop and vertical on mobile,
revealed progressively on scroll:

```
01 Site Assessment
02 Energy Requirement Assessment
03 Solar System Design
04 Proposal & Documentation
05 Procurement & Installation
06 Net Metering Support
07 Testing & Commissioning
08 Performance & After-Sales Support
```

## Long-term performance / lifecycle

Positioned as a second differentiator, distinct from the engineering section
above: Fivefold stays involved after commissioning rather than handing off and
disappearing.

```
DESIGN -> INSTALL -> COMMISSION -> MONITOR -> MAINTAIN -> OPTIMIZE
                                                     |
                                        25-30 YEAR PERFORMANCE
```

Backing list: O&M, remote monitoring, preventive maintenance, performance
diagnostics, energy analysis, panel cleaning, inverter health, earthing
inspection, lightning protection, structure inspection, cable inspection,
technical support, warranty assistance, asset optimisation.

## Solar calculator

See [Solar calculator](solar_calculator.md).

## Government scheme section

PM Surya Ghar Muft Bijli Yojana: eligibility guidance, documentation,
installation, application assistance, net metering. This section carries a
disclaimer that eligibility, subsidy amount, and availability are subject to
prevailing government guidelines — do not hardcode a subsidy figure here or
anywhere else on the site. See
[Client confirmations](client_confirmations.md).

## Motion

Framer Motion handles UI-level interaction: card entrance, hover, navigation,
accordion, page transitions. GSAP + ScrollTrigger is reserved for the handful
of sections where motion is doing real work — hero image transition, the
engineering process timeline, project reveal, and the animated trust-metric
counters. Everything else should not move just because it can; the brief is
explicit that the goal is "premium," not "everything moves."
