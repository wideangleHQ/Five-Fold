# 02 — Site Map & Website Flow

## Purpose

Define the website's information architecture and user journeys.

This document defines **what the website needs to communicate and how users move through it**. It does not prescribe a component-heavy visual implementation.

Visual decisions must follow `09-design-guidelines.md`.

---

## Primary Navigation

HOME
├── Smart Solar Calculator
├── Government Schemes
├── Solutions
│   ├── Residential Solar
│   ├── Commercial Solar
│   └── Industrial Solar
├── Engineering
├── Projects
├── SolarCare
├── Warranty & Support
├── About
├── FAQ
└── Contact / Enquiry

## Header

Keep navigation simple and task-oriented.

Primary destinations:
- Smart Calculator
- Schemes
- Solutions
- Projects
- SolarCare
- Contact

Primary conversion action:
**Find My Solar Solution**

Do not create competing primary actions.

The header must remain visually minimal and consistent across the website.

---

# PAGE 01 — HOME

## Hero

Core message:

**Powering Odisha with Smarter Solar Energy**

Supporting positioning:

**Engineering-Led Solar EPC Solutions Since 2016**

The Hero should establish Fivefold's positioning immediately.

Primary action:
**Find My Solar Solution**

Secondary action:
**Talk to an Engineer**

Keep the first viewport visually quiet and focused.

Do not overload the Hero with statistics, feature lists, multiple buttons or explanatory copy.

---

## Homepage Story

The homepage should communicate the following story in order:

1. Fivefold's engineering credibility
2. Solar solutions for different customer needs
3. Help finding the right solar requirement
4. Evidence through real projects
5. Engineering capability
6. Government assistance
7. Long-term SolarCare / support
8. Why Fivefold
9. FAQ
10. Final enquiry

This is the user journey.

The visual implementation should NOT turn every item into a separate card grid.

Sections may be combined, visually overlapped or presented through strong editorial compositions where appropriate.

---

## Credentials

Communicate the verified Fivefold proof points:

- 10+ years
- 20+ MW installed
- 30+ projects
- 800+ MW engineering experience
- 10+ states

Prioritize large numbers and whitespace.

Do not add decorative icons or badges simply to display these metrics.

---

## Solutions Section (Interactive Solution Panel)

Immediately follows the Solar Solution Platform section. Introduces the four primary customer segments through an interactive full-width panel with contextual navigation and clear routing.

### Solutions Journey
- **01 / RESIDENTIAL**
  - **Headline:** `Solar designed for better living.`
  - **Description:** `Generate your own electricity with a professionally engineered rooftop solar system for your home.`
  - **CTA:** `Plan My Home Solar →` (`/residential-solar`)
  - **SEO Intent:** Residential rooftop solar, home solar, rooftop solar Odisha, residential solar Odisha
- **02 / COMMERCIAL**
  - **Headline:** `Efficient solar for smarter businesses.`
  - **Description:** `Turn available commercial rooftop space into a reliable solar asset designed around energy requirements, system performance and long-term returns.`
  - **CTA:** `Plan My Business Solar →` (`/commercial-solar`)
  - **SEO Intent:** Commercial solar, commercial rooftop solar, solar for businesses, commercial solar Bhubaneswar/Odisha
- **03 / INDUSTRIAL**
  - **Headline:** `Solar engineered for industry.`
  - **Description:** `High-capacity solar solutions for factories, warehouses and manufacturing facilities, engineered for performance, reliability and long-term operation.`
  - **CTA:** `Plan My Industrial Solar →` (`/industrial-solar`)
  - **SEO Intent:** Industrial solar, industrial rooftop solar, solar EPC Odisha
- **04 / INSTITUTIONAL**
  - **Headline:** `Reliable solar for institutions.`
  - **Description:** `Engineered solar solutions for educational, healthcare and institutional facilities, designed around energy requirements, available space and long-term performance.`
  - **CTA:** `Plan My Institutional Solar →` (`/contact`)
  - **SEO Intent:** Institutional solar, solar for educational institutions, solar for hospitals

### Content Restrictions & Compliance
- **No Unsupported Claims:** Do NOT use `40% Accelerated Depreciation` or generic tax benefits on the homepage solutions slide unless separately verified and approved.
- **No Guaranteed Returns:** Financial savings, returns, subsidy values, and tax benefits must never be presented as guaranteed. Focus on engineering reliability, system performance, and long-term operation.

---

## Solar Solution Platform (Smart Solar Finder Entry Point)

The section immediately following the Hero acts as a structured entry point into solar evaluation, capacity estimation, and scheme support.

- **Eyebrow:** `SOLAR SOLUTION PLATFORM`
- **Heading:** `Find the Right Solar Solution for Your Needs.`
- **Supporting Text:** `Explore your energy requirements, system sizing and applicable solar scheme support.`

### Platform Cards:
1. **Card 01 — Energy Requirement:**
   `Tell us about your property, energy consumption and available rooftop space for a suitable solar system.`
2. **Card 02 — System Sizing:**
   `Estimate the right system capacity based on your energy requirements, rooftop space and site conditions.`
3. **Card 03 — Schemes & Savings:**
   `Understand applicable government scheme support, potential savings and net metering assistance for your solar project.`

---

## Projects / Portfolio Section

Showcases verified solar EPC installations across 27 client credentials with interactive category filtering.

- **Eyebrow:** `• PORTFOLIO`
- **Heading:** `Real Projects. Measurable Impact.`
- **Filter Tabs:** `All | Industrial | Commercial | Institutional | Government`
- **Dataset:** 27 verified client installations (7 Industrial, 8 Commercial, 6 Institutional, 6 Government)
- **Card Content:** Category · Location, Client Project Name, Capacity in kWp
- **Primary CTA:** `View all projects →` (`/projects`)
- **Governance:** Project credentials published subject to client-name/publication permissions.

---

## Engineering Section (Engineering Precision)

Introduces Fivefold's engineering-led differentiation through a three-stage interactive accordion framework.

- **Eyebrow:** `• ENGINEERING PRECISION`
- **Heading:** `Engineering That Drives Performance.`
- **Supporting Text:** `We engineer every solar project around generation, reliability, constructibility and long-term performance.`

### Engineering Stages:
1. **01 / PRE-CONSTRUCTION:**
   - **Subtitle:** `Assess the site, model the system and prepare the project for execution.`
   - **Capabilities:** Feasibility Reports & Shadow Analysis, 3D Layout & Capacity Estimations, PVsyst Yield Simulations, Bankable DPR Preparation, Financial Modelling, Constructibility & Risk Review.
2. **02 / EXECUTION:**
   - **Subtitle:** `Turn approved engineering into a controlled, precise and compliant installation.`
   - **Capabilities:** Detailed Execution Planning, Structural Engineering, Detailed Engineering & Drawings, Permit & Approval Support, Procurement, Installation & Commissioning, Net Metering Support, Performance Assurance.
3. **03 / QUALITY & TRACEABILITY:**
   - **Subtitle:** `Quality-controlled components, testing and documentation from procurement to commissioning.`
   - **Capabilities:** Tier-1 Components, Strong Procurement Networks with Direct Manufacturers & Suppliers, Pre-Defined Execution SOPs, Third-Party Quality Assurance, Compliance & Testing Processes, Documentation & Traceability.

### Content Restrictions & SEO:
- **No Conflated Bankability Claims:** Do not use `25–30 year bankability` or guarantee long-term generation/returns.
- **SEO Intent:** Solar engineering, Solar EPC Odisha, rooftop solar engineering, PVsyst yield simulations, solar quality assurance.

---

## Why Fivefold Section (Differentiation & Value Proposition)

Explains **why Fivefold's engineering-led approach matters** and how it stays accountable across the entire system lifecycle, without duplicating the detailed engineering process from the preceding section.

- **Component:** `client/src/components/sections/WhyFivefold.tsx`
- **Eyebrow:** `• WHY FIVEFOLD`
- **Heading:** `We Engineer More Than Solar.`
- **Supporting Text:** `From engineering and procurement to installation and long-term support, we stay accountable for the performance of your solar system.`

### Four Core Differentiators:
1. **01 / ENGINEERING — Engineering First**
   - **Description:** `Feasibility, site analysis, system design and performance modelling before construction begins.`
   - **Link:** `/engineering`
2. **02 / EXECUTION — End-to-End Execution**
   - **Description:** `From procurement and installation to commissioning, we manage the project through every critical stage.`
   - **Link:** `/engineering`
3. **03 / PERFORMANCE — Built for Performance**
   - **Description:** `Systems designed around generation, reliability, constructibility and long-term performance.`
   - **Link:** `/services`
4. **04 / QUALITY & SUPPORT — Quality & Long-Term Support**
   - **Description:** `Quality assurance, monitoring, maintenance and technical support throughout the system lifecycle.`
   - **Link:** `/solarcare`

### Content Strategy & Restrictions:
- **Differentiation vs Process:** This section explains *why that approach matters* (accountability, performance, lifecycle care) rather than acting as a duplicate engineering checklist.
- **No Unverified Claims:** Focus on generation, reliability, constructibility, and long-term performance without claiming guaranteed generation or ROI.
- **SEO Intent:** Solar EPC company Odisha, engineering-led solar EPC, rooftop solar company Odisha, solar O&M, long-term solar support.

---

## Government Schemes

Introduce government assistance without presenting a large information block.

Primary action:

**Check Eligibility**

Detailed scheme discovery belongs to the Government Schemes experience.

---

## SolarCare

Introduce long-term support as part of the Fivefold proposition.

Do not show every plan detail on the homepage.

Use a concise visual teaser leading to SolarCare.

---

## Final CTA

End the homepage with a clear conversion moment.

Primary:
**Find My Solar Solution**

Secondary:
**Talk to an Engineer**

Avoid multiple competing actions.

---

# PAGE 02 — SMART SOLAR CALCULATOR

See `03-smart-solar-calculator.md`.

The calculator is a decision tool, not merely a form.

---

# PAGE 03 — GOVERNMENT SCHEMES

See `04-government-schemes.md`.

The experience should help visitors understand possible options without overwhelming them with policy information.

---

# PAGE 04 — RESIDENTIAL SOLAR

Audience:
Homeowners

Communicate the existing residential offering:

- Rooftop systems
- Site assessment
- System design
- Installation
- Government scheme assistance
- Net metering
- Commissioning
- Long-term technical support

Primary action:
**Calculate My Home Solar Requirement**

Keep the visible story concise.

---

# PAGE 05 — COMMERCIAL SOLAR

Audience:
Offices, retail outlets, hotels, hospitals, educational institutions and commercial buildings.

Core journey:

Energy Requirement → Available Space → System Design → Investment → Generation → Long-Term Returns

Primary action:
**Plan Solar for My Business**

Present the journey visually rather than as a dense information list.

---

# PAGE 06 — INDUSTRIAL SOLAR

Audience:
Factories, manufacturing facilities, warehouses and large industrial facilities.

Communicate:

- System optimisation
- Generation performance
- Structural requirements
- Electrical engineering
- Reliability
- Long-term performance

Primary action:
**Discuss My Industrial Project**

Prioritize engineering credibility over sales language.

---

# PAGE 07 — ENGINEERING

See `06-engineering-projects-solarcare.md`.

Present the engineering capability as a visual journey, not a static technical list.

---

# PAGE 08 — PROJECTS

See `06-engineering-projects-solarcare.md`.

Present projects as evidence and case-study material.

---

# PAGE 09 — SOLARCARE

See `06-engineering-projects-solarcare.md`.

Present SolarCare as long-term asset support.

---

# PAGE 10 — WARRANTY & SUPPORT

Communicate warranty and technical support clearly.

Avoid sales-heavy presentation.

---

# PAGE 11 — ABOUT

See `07-about-faq-contact.md`.

Tell the company story visually and concisely.

---

# PAGE 12 — FAQ

Use concise, scannable answers.

The FAQ should solve user uncertainty rather than become a content-heavy section.

---

# PAGE 13 — CONTACT / ENQUIRY

Use the existing structured enquiry flow.

The form should remain focused and easy to complete.

---

# FLOW PRINCIPLES

The site should continuously move users toward one of three actions:

1. Understand Fivefold
2. Find the right solar solution
3. Talk to Fivefold

Do not add interactions merely because they are technically possible.

Every major section should have a clear purpose.

Every interaction must support understanding, trust or conversion.

---

# VISUAL IMPLEMENTATION RULE

This document defines the **information architecture and user flow**.

It does NOT require:

- cards
- icon grids
- dashboards
- badges
- multiple UI panels
- decorative diagrams
- excessive pop-ups

The visual composition is governed by `09-design-guidelines.md`.
