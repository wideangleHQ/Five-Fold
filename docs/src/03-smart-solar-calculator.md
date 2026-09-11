# 03 — Smart Solar Calculator

**Page route:** `/solar-calculator` (alias: `/smart-solar-calculator`)  
**Component:** `client/src/components/calculator/SolarCalculator.tsx`  
**Engine:** `client/src/lib/solar-engine/` (version tracked in `client/src/data/solar/system-assumptions.ts`)  
**Purpose:** Lead generation through a self-service indicative solar estimate, Odisha-specific.

---

## Calculator Purpose

The calculator is a **preliminary engineering estimator**, not a PVsyst-level design tool.

It provides an **indicative solar system requirement** based on:
- District-specific Odisha solar irradiance (PVOUT) from Global Solar Atlas / ISRO VEDAS
- OERC net metering regulations (2023)
- PM Surya Ghar subsidy structure (MNRE 2024)
- Odisha DISCOM identification (TPCODL / TPNODL / TPWODL / TPSODL)
- OERC tariff slabs (FY 2024-25)

**Level 1 — Website preliminary estimate** (this calculator)  
↓ **Level 2** — Fivefold preliminary engineering assessment  
↓ **Level 3** — Site survey, shadow analysis, professional simulation

---

## Supported Input Modes

### Mode A — Direct Consumption (Highest Confidence)
User enters monthly kWh (units) from their electricity bill.  
Confidence penalty: 0 points.

### Mode B — Monthly Bill Amount (Medium Confidence)
User enters monthly bill in INR. Engine estimates consumption via OERC tariff slab back-calculation.  
Confidence penalty: 20 points.  
Important: bills include fixed charges, electricity duty, and taxes that are NOT proportional to energy use.

### Mode C — Appliance Estimation (Lower Confidence)
User specifies appliance counts. Engine uses BEE standard wattage ratings × typical hours/day.  
Confidence penalty: 35 points.  
Rated power ≠ actual operating power; treat as rough estimate.

---

## User Flow (4 Steps)

### Step 01 — Property Type
Residential / Commercial / Industrial / Institutional  
Drives: tariff category, regulatory cap, subsidy eligibility, cost per kWp

### Step 02 — Electricity Consumption
Select input mode, enter relevant data (bill / kWh / appliances)

### Step 03 — Rooftop and Location
- Location (city/district) — matched to Odisha solar resource data
- Rooftop area (sq ft, optional) — converted to m², 70% usable factor applied
- Shading level (low / medium / high / unknown)
- Daytime usage profile — drives self-consumption ratio
- Target solar offset (40–100%)

### Step 04 — Results
Displays: system capacity, generation, savings, subsidy breakdown, payback, DISCOM, assumptions, confidence, warnings, and disclaimer.

---

## Calculation Pipeline

```
USER INPUT
    ↓
INPUT VALIDATION          (client/src/lib/solar-engine/validation.ts)
    ↓
CONSUMPTION ENGINE        (client/src/lib/solar-engine/consumption.ts)
    ↓ monthlyConsumptionKWh, annualConsumptionKWh
SOLAR RESOURCE ENGINE     (client/src/lib/solar-engine/solar-resource.ts)
    ↓ pvoutKWhPerKWpPerYear, monthlyFractions
PERFORMANCE ENGINE        (client/src/lib/solar-engine/performance.ts)
    ↓ adjustedAnnualYieldKWhPerKWp (PVOUT × PR × shadingFactor)
ROOF FEASIBILITY ENGINE   (client/src/lib/solar-engine/roof-feasibility.ts)
    ↓ maxFeasibleCapacityKWp (from roof area)
REGULATORY ENGINE         (client/src/lib/solar-engine/regulatory.ts)
    ↓ maxPermissibleKWp (OERC rules + DISCOM)
SYSTEM SIZING ENGINE      (client/src/lib/solar-engine/sizing.ts)
    ↓ recommendedSystemKWp = clamp(targetEnergy / adjustedYield, roof, regulatory)
SUBSIDY ENGINE            (client/src/lib/solar-engine/subsidy.ts)
    ↓ centralSubsidyINR (PM Surya Ghar slabs)
GENERATION ENGINE         (client/src/lib/solar-engine/generation.ts)
    ↓ annualGenerationKWh, monthlyGenerationKWh[], selfConsumed/exported split
FINANCIAL ENGINE          (client/src/lib/solar-engine/savings.ts)
    ↓ grossCost, netInvestment, annualSavings, paybackYears
CONFIDENCE ENGINE         (client/src/lib/solar-engine/confidence.ts)
    ↓ level (high/medium/low), score, reasons[]
RESULT ASSEMBLY           (client/src/lib/solar-engine/index.ts)
    ↓ SolarCalculationResult (full structured result)
```

---

## Key Formulas

### System Sizing
```
requiredKWp = (annualConsumptionKWh × targetOffset) / adjustedAnnualYieldKWhPerKWp
adjustedAnnualYield = pvoutKWhPerKWpPerYear × performanceRatio × shadingFactor
```

### Annual Generation
```
annualGenerationKWh = recommendedKWp × adjustedAnnualYieldKWhPerKWp
monthlyGenerationKWh[i] = annualGenerationKWh × monthlyFractions[i]
```

### Financial
```
annualSavings = (selfConsumedKWh × effectiveTariff) + (exportedKWh × APPC_rate)
netInvestment = grossSystemCost - totalSubsidy
paybackYears = netInvestment / annualSavings
```

---

## Solar Resource Methodology

**Source:** Global Solar Atlas (https://globalsolaratlas.info) + ISRO VEDAS for India  
**Metric:** PVOUT (kWh/kWp/year) at optimal fixed tilt (~15° for Odisha)  
**Coverage:** 24 Odisha districts, 4 DISCOM zones  
**Fallback:** Odisha state average (1480 kWh/kWp/year) when location is unmatched  
**Data file:** `client/src/data/solar/solar-resource.ts`  
**Monthly profile:** 12-month GHI fraction array per district (sum = 1.0)

PVOUT ranges:
- Western Odisha (Sambalpur, Nuapada): 1530–1560 kWh/kWp/year (highest)
- Central/Coastal (Bhubaneswar, Cuttack): 1470–1490 kWh/kWp/year
- Northern (Balasore, Bhadrak): 1450–1465 kWh/kWp/year

---

## Performance Assumptions

**Aggregate Performance Ratio: 0.77**  
Derived from individual loss factors (`client/src/data/solar/system-assumptions.ts`):

| Factor | Value |
|--------|-------|
| Inverter efficiency | 96% |
| Temperature derating (Odisha summer 60–65°C) | 91% |
| Soiling (seasonal dust + monsoon wash) | 96% |
| Wiring / connection losses | 98% |
| Module mismatch | 98% |
| System availability | 99% |
| **Combined PR** | **≈77%** |

Source: IEA PVPS Task 13; MNRE handbook 2023

Shading adjustments (applied on top of PR):
- Low: 98% | Medium: 92% | High: 82% | Unknown: 93%

---

## Roof Feasibility

- **10 m² per kWp** planning density (MNRE rooftop assessment guidelines)
- **70% usable area ratio** applied to total stated roof area (obstructions, clearances, pathways)
- If roof area < required: warning shown, capacity reduced to roof-limited value
- If roof area unknown: feasibility = "unknown", no reduction applied

---

## Odisha Regulatory Logic

**Framework:** OERC Net Metering Regulations 2023  
**Data file:** `client/src/data/solar/regulatory.ts`

System size caps:
| Property Type | Net Metering Cap |
|--------------|-----------------|
| Residential | min(sanctioned load, 10 kWp) |
| Commercial | min(sanctioned load, 50 kWp) |
| Industrial | min(sanctioned load, 100 kWp) |
| Institutional | min(sanctioned load, 50 kWp) |

---

## DISCOM Logic

**Data file:** `client/src/data/solar/discom.ts`  
DISCOM resolved via keyword matching on user location string:
- TPCODL: Bhubaneswar, Cuttack, Khordha, Nayagarh, Puri, Angul, Dhenkanal
- TPNODL: Balasore, Bhadrak, Jajpur, Keonjhar, Mayurbhanj, Sundargarh, Jharsuguda
- TPWODL: Sambalpur, Bargarh, Bolangir, Nuapada, Kalahandi, Kandhamal
- TPSODL: Ganjam/Berhampur, Gajapati, Koraput, Rayagada, Malkangiri

If DISCOM cannot be identified: warning shown, no false DISCOM-specific rule applied.

---

## Subsidy / Assistance Logic

**Data file:** `client/src/data/solar/subsidies.ts`

### PM Surya Ghar (Residential Only, MNRE 2024)
| System Size | Central Subsidy |
|------------|----------------|
| Up to 2 kWp | ₹30,000/kWp (max ₹60,000) |
| 2–3 kWp | +₹18,000/kWp (max ₹78,000 total) |
| Above 3 kWp | Fixed ₹78,000 |

Not applicable to Commercial / Industrial / Institutional.

### C&I Tax Benefit
40% Accelerated Depreciation (IT Act Section 32) for commercial/industrial.  
Actual benefit depends on entity's applicable tax rate — not calculated by the engine.

---

## Financial Calculation

**Data file:** `client/src/data/solar/tariffs.ts`  
**Tariff source:** OERC Retail Tariff Order FY 2024-25

- **Effective tariff:** Computed from OERC slab structure at user's consumption level
- **Export rate (APPC):** ₹4.20/kWh (OERC Net Metering Regulations 2023)
- **Self-consumption ratio:** Based on daytime usage profile (35–80%)
- **System cost benchmark:** ₹52,000–65,000/kWp (Fivefold procurement data + MNRE 2024)

---

## Confidence Levels

| Level | Score | Meaning |
|-------|-------|---------|
| High | ≥75 | Direct kWh input + location + roof + shading + daytime usage all provided |
| Medium | 50–74 | Some fields estimated or missing |
| Low | <50 | Bill/appliance-based consumption + multiple unknowns |

Score is internal only. UI shows: High / Medium / Low with explanatory reasons.  
Never shown as a fake percentage to users.

---

## Limitations

The calculator does NOT replace:
- Professional shadow analysis (PVsyst, Helioscope, or on-site survey)
- Structural roof load assessment
- Electrical design and load flow study
- DISCOM technical feasibility study
- Formal net metering application and approval
- Subsidy eligibility verification with the relevant authority

All results are clearly labelled as **preliminary estimates**.

---

## How to Update Regulatory / Subsidy Values

1. Open the relevant data file (see Data Files section below)
2. Update the value(s) with new figures from the authoritative source
3. Update `effectiveFrom` and `lastVerified` fields
4. Increment `CALCULATOR_ENGINE_VERSION` in `client/src/data/solar/system-assumptions.ts`
5. Re-run tests: `npm test`
6. Re-run build: `npm run build`

**Never** update regulatory values from solar industry blogs. Use:
- OERC orders: https://www.orierc.org
- MNRE PM Surya Ghar: https://solarrooftop.gov.in
- Odisha state schemes: https://oreda.in
- CEA grid emission factors: https://cea.nic.in

---

## Data Files

| File | Contents |
|------|----------|
| `client/src/data/solar/solar-resource.ts` | PVOUT by district, monthly fractions, location keyword map |
| `client/src/data/solar/tariffs.ts` | OERC tariff slabs, bill→consumption estimator, effective tariff calculator |
| `client/src/data/solar/subsidies.ts` | PM Surya Ghar slabs, subsidy calculator |
| `client/src/data/solar/regulatory.ts` | OERC net metering rules, system size caps |
| `client/src/data/solar/discom.ts` | District→DISCOM mapping, DISCOM info |
| `client/src/data/solar/system-assumptions.ts` | Performance ratio, loss factors, area density, appliance watts, CO2 factor |

---

## How to Debug the Engine

The result object includes a `debug` field with all intermediate values:

```typescript
const result = calculateSolarRequirement(input);
console.log(result.debug);
// {
//   annualConsumptionKWh,
//   targetEnergyKWh,
//   pvoutKWhPerKWpPerYear,
//   performanceFactor,
//   shadingFactor,
//   adjustedAnnualYieldKWhPerKWp,
//   preliminarySystemKWp,
//   roofLimitedCapacityKWp,
//   regulatoryLimitedCapacityKWp,
//   finalRecommendedSystemKWp,
//   annualGenerationKWh,
//   selfConsumedKWh,
//   exportedKWh,
//   effectiveTariffINRPerKWh,
// }
```

Each engine function can also be called independently:
```typescript
import { calculateConsumption } from "@/lib/solar-engine/consumption";
import { calculateSolarResource } from "@/lib/solar-engine/solar-resource";
import { calculateSizing } from "@/lib/solar-engine/sizing";
// ... etc
```

---

## Calculator Engine Version

Current version: defined in `client/src/data/solar/system-assumptions.ts` → `CALCULATOR_ENGINE_VERSION`  
Returned in every `SolarCalculationResult.engineVersion`.  
Increment when formulas, data, or regulatory rules change (SemVer: major.minor.patch).

---

## Testing Strategy

Tests: `client/src/lib/solar-engine/__tests__/`  
Framework: Vitest 2.x  
Run: `npm test`

| Test File | Coverage |
|-----------|----------|
| `consumption.test.ts` | Direct kWh, bill→estimate, appliance estimation, zero/negative guards |
| `solar-resource.test.ts` | District matching, state average fallback, monthly fractions sum, aliases |
| `sizing.test.ts` | Core sizing formula, roof constraint, regulatory constraint, target offset, minimum size |
| `subsidy.test.ts` | PM Surya Ghar slab boundaries (1/2/3/>3 kWp), non-residential exclusion |
| `generation.test.ts` | Annual generation, monthly distribution, self-consumption split, zero guard |
| `savings.test.ts` | Gross/net cost, payback, zero-savings edge case, CO2, commercial vs residential cost |
| `regulatory.test.ts` | Sanctioned load caps, OERC regulatory cap, DISCOM resolution |
| `engine.test.ts` | Full integration: residential, commercial, small/large systems, roof constraints, unknown location, bill input |

---

## Regulatory Disclaimer

```
This calculator provides an indicative preliminary solar requirement.
Final system capacity, generation, structural feasibility, electrical design,
net-metering eligibility, subsidy eligibility and financial outcomes are
subject to site assessment, applicable OERC/DISCOM regulations,
government scheme guidelines and final engineering design.
Results must not be treated as a formal quotation or guarantee.
```
