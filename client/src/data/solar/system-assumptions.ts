/**
 * Fivefold Solar Calculator — System & Performance Assumptions
 *
 * All values must be documented with source and last-verified date.
 * Update this file (not the engine) when assumptions change.
 */

export const CALCULATOR_ENGINE_VERSION = "2.0.0";

/**
 * Performance ratio components (each a fractional loss factor).
 * Combined into an aggregate PERFORMANCE_RATIO.
 *
 * Source: IEA PVPS Task 13, MNRE solar yield guidelines for India
 * Last verified: 2024-06
 */
export const LOSS_FACTORS = {
  /** DC/AC inverter conversion efficiency losses */
  inverter: 0.96,
  /** Temperature derating — Odisha summer peak module temp ~60–65°C */
  temperature: 0.91,
  /** Dust and soiling on modules (Odisha — seasonal dust, monsoon wash) */
  soiling: 0.96,
  /** Wiring and connection resistive losses */
  wiring: 0.98,
  /** Module mismatch within strings */
  mismatch: 0.98,
  /** System availability (downtime, maintenance) */
  availability: 0.99,
} as const;

/**
 * Aggregate performance ratio derived from loss factors above.
 * PR = inverter × temperature × soiling × wiring × mismatch × availability
 * ≈ 0.96 × 0.91 × 0.96 × 0.98 × 0.98 × 0.99 ≈ 0.772
 *
 * Rounded to 0.77 — conservative for preliminary estimates in Eastern India.
 * Source: MNRE handbook on solar energy 2023, typical Indian rooftop values 0.72–0.80
 */
export const PERFORMANCE_RATIO = 0.77;

/**
 * Shading adjustment multipliers applied to the performance ratio.
 * These are preliminary adjustments; final shading must be from shadow analysis.
 *
 * Source: NREL PVWatts guidance on shading derating
 * Last verified: 2024-06
 */
export const SHADING_ADJUSTMENT: Record<string, number> = {
  low: 0.98,      // <5% shading — open rooftop, minimal obstructions
  medium: 0.92,   // 5–20% shading — some nearby structures/trees
  high: 0.82,     // >20% shading — significant shading; site survey essential
  unknown: 0.93,  // conservative default when shading is unspecified
};

/**
 * Area required per kWp installed (shadow-free rooftop, sq metres).
 * Accounts for inter-row spacing, maintenance walkways, and edge clearances.
 * Does NOT account for tanks, staircases, HVAC, parapets — apply usable area ratio separately.
 *
 * Source: MNRE Model Solar Rooftop Guidelines, BIS standard for rooftop solar
 * Typical: 8–12 m² per kWp depending on panel orientation and wiring layout
 * Last verified: 2024-06
 */
export const AREA_M2_PER_KWP = 10; // conservative — use 10 m² / kWp

/**
 * Fraction of total stated rooftop area that is typically usable for panels
 * after accounting for obstructions (tanks, staircases, parapets, HVAC, clearances).
 * Applied when user inputs total roof area rather than shadow-free panel area.
 *
 * Source: MNRE rooftop assessment guidelines; typical 65–75% usable in Indian urban rooftops
 * Last verified: 2024-06
 */
export const USABLE_ROOF_RATIO = 0.70;

/**
 * Daytime self-consumption ratios by usage profile.
 * Fraction of solar generation consumed directly (avoids export).
 *
 * "high" — daytime-heavy users (commercial, home offices, AC-heavy residential)
 * "medium" — moderate daytime usage
 * "low" — mostly evening/night consumers (export-heavy)
 *
 * Source: IEA PVPS Task 14 — self-consumption studies for grid-connected rooftop PV
 * Last verified: 2024-06
 */
export const SELF_CONSUMPTION_RATIO: Record<string, number> = {
  high: 0.80,
  medium: 0.60,
  low: 0.35,
  unknown: 0.55,
};

/**
 * Default installed cost per kWp (INR) for preliminary financial estimates.
 * Includes modules, inverter, mounting, wiring, installation, net-metering application.
 * Excludes subsidy.
 *
 * Residential on-grid: ₹55,000–75,000/kWp in Odisha (2024)
 * Commercial on-grid: ₹50,000–65,000/kWp
 *
 * Source: Fivefold internal procurement data + MNRE benchmark cost 2024
 * Last verified: 2024-09
 */
export const SYSTEM_COST_INR_PER_KWP: Record<string, number> = {
  residential: 65000,
  commercial: 58000,
  industrial: 52000,
  institutional: 55000,
};

/**
 * Standard panel wattage for sizing area calculations (Wp).
 * Modern bifacial mono-PERC panels used in Odisha projects.
 */
export const STANDARD_PANEL_WATTAGE_WP = 540;

/**
 * Annual module degradation rate (fraction per year).
 * Used for long-term savings projections.
 * Source: manufacturer datasheets — LR/JA Solar, typical 0.5%/yr linear degradation
 */
export const ANNUAL_DEGRADATION_RATE = 0.005;

/**
 * CO2 grid emission factor for Odisha/Eastern Region (kg CO2/kWh).
 * Source: Central Electricity Authority (CEA) CO2 baseline database, India, 2023
 * Grid emission factor for Eastern Region: 0.82 kg CO2/kWh
 * Last verified: 2024-06
 */
export const CO2_FACTOR_KG_PER_KWH = 0.82;

/**
 * Appliance power consumption — typical operating wattage (Watts).
 *
 * Source: Household Electrical Load & Consumption List reference chart.
 * Formula: Units/day = Quantity × Wattage × UsageHours / 1000
 *
 * For appliances with compressor cycling (refrigerator, inverter AC) the wattage
 * here is the effective average operating wattage, not the rated peak, so that
 *   wattage × APPLIANCE_HOURS_PER_DAY[key] / 1000
 * produces the reference's approximate units/day midpoint.
 *
 * Last verified against reference chart: 2026-10
 */
export const APPLIANCE_WATTS: Record<string, number> = {
  // Ceiling Fan: 60–75 W range, reference example uses 70 W
  fan: 70,
  // LED Bulb: 9 W fixed
  light: 9,
  // Inverter AC — effective average operating wattage (not peak rated):
  //   1 Ton: 700–1,200 W rated → ~900 W effective @ 8h gives ~7.2 units/day (ref: 5–8)
  ac_1ton: 900,
  //   1.5 Ton: 800–1,800 W rated → ~1,000 W effective @ 8h gives 8 units/day (ref: 6–10)
  ac_1_5ton: 1000,
  //   2 Ton: 1,300–2,200 W rated → ~1,300 W effective @ 8h gives 10.4 units/day (ref: 9–14)
  ac_2ton: 1300,
  // Refrigerator: 150–300 W rated, compressor cycles ~33% duty.
  //   200 W effective @ 8h run-equivalent = 1.6 units/day (ref: 1–2)
  refrigerator: 200,
  // Water Pump 1 HP: 750–1,500 W → 900 W midpoint @ 1h = 0.90 units/day (ref: 0.75–1.10)
  waterPump: 900,
  // Washing Machine: 400–800 W → 600 W midpoint @ 1h = 0.60 units/day (ref: 0.4–0.8)
  washingMachine: 600,
  // Geyser: 2,000–3,000 W → 2,500 W midpoint @ 0.5h = 1.25 units/day (ref: 1–1.5)
  geyser: 2500,
  // Laptop: 45–90 W → 70 W midpoint @ 6h = 0.42 units/day (ref: 0.27–0.54)
  computer: 70,
  // LED TV 43": 70–100 W → 85 W midpoint @ 5h = 0.425 units/day (ref: 0.35–0.50)
  tv: 85,
};

/**
 * Typical daily usage hours per appliance (hours/day).
 *
 * Source: Household Electrical Load & Consumption List reference chart.
 * For cycling appliances (refrigerator, AC), these are effective run-equivalent
 * hours rather than "plugged-in" hours — paired with the effective wattage in
 * APPLIANCE_WATTS so that watts × hours / 1000 ≈ reference units/day midpoint.
 *
 * Last verified against reference chart: 2026-10
 */
export const APPLIANCE_HOURS_PER_DAY: Record<string, number> = {
  fan: 10,           // Ceiling Fan: 10h (reference)
  light: 6,          // LED Bulb: 6h (reference)
  ac_1ton: 8,        // Inverter AC: 8h (reference)
  ac_1_5ton: 8,      // Inverter AC: 8h (reference)
  ac_2ton: 8,        // Inverter AC: 8h (reference)
  refrigerator: 8,   // Effective run hours (compressor cycling, ~33% duty of 24h)
  waterPump: 1,      // Water Pump: 1h (reference)
  washingMachine: 1, // Washing Machine: 1h (reference)
  geyser: 0.5,       // Geyser: 30 min (reference)
  computer: 6,       // Laptop: 6h (reference)
  tv: 5,             // LED TV: 5h (reference)
};
