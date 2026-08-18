# 03 — Smart Solar Calculator

**Page title:** Find Your Solar Requirement  
**Purpose:** Lead generation through a self-service indicative estimate.

The calculator asks simple questions instead of technical solar terminology.

## User Flow (4 Steps)

### Step 01 — Property Type
- Residential
- Commercial
- Industrial
- Institutional

### Step 02 — Electricity Usage
Customer can enter any of:
- Monthly electricity bill
- Monthly electricity consumption (units)
- Approximate usage

### Step 03 — Appliance-Based Estimation (Optional)
- Number of Fans
- Number of Lights
- ACs
- Refrigerators
- Pumps
- Computers
- Other major appliances

### Step 04 — Rooftop Information
- Approximate rooftop area
- Available rooftop area
- Location

## Result Panel (Indicative Only)

Displayed clearly as an **estimate**:

- Recommended Solar Capacity
- Estimated Generation
- Potential Savings
- Suggested Solar Solution
- Applicable Scheme / Assistance

**Mandatory disclaimer:**  
Final system sizing remains subject to professional site assessment and engineering.

## CTA after results

“Want an accurate assessment? Talk to our solar engineers”  
→ Opens the structured enquiry form (pre-filled with calculator data where possible).

## Implementation Notes

- Calculation logic should live in a dedicated module (e.g. `src/lib/calculator.ts`)
- Formulas (irradiance, tariff assumptions, degradation, payback) require engineering sign-off before production
- Never present the numbers as a formal quote or guaranteed outcome
