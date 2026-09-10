/**
 * Fivefold Solar Calculator — Odisha OERC Tariff Data
 *
 * Source: OERC (Odisha Electricity Regulatory Commission) Retail Tariff Order
 * Applicable tariff year: FY 2024-25
 * Authority: https://www.orierc.org
 * Last verified: 2024-09
 *
 * HOW TO UPDATE:
 * 1. Download the latest OERC Retail Tariff Order from https://www.orierc.org
 * 2. Update the slab values below
 * 3. Update lastVerified date
 * 4. Increment CALCULATOR_ENGINE_VERSION in system-assumptions.ts
 *
 * IMPORTANT: These are the standard OERC published tariffs.
 * Actual bills may vary due to:
 * - Fixed charges (monthly, not per unit)
 * - Electricity duty / taxes
 * - Meter rent
 * - TOD (Time of Day) tariff for HT consumers
 * - Agricultural concessions
 * - Power factor surcharges (HT/EHT)
 */

export interface TariffSlab {
  fromUnits: number;
  toUnits: number | null; // null = no upper limit
  rateINRPerKWh: number;
}

export interface TariffCategory {
  id: string;
  label: string;
  description: string;
  slabs: TariffSlab[];
  fixedChargeINRPerMonth: number;
  /** Electricity duty rate (fraction of energy charge) */
  electricityDutyRate: number;
  source: string;
  effectiveFrom: string;
  lastVerified: string;
}

/**
 * LT-II Domestic Tariff (Residential)
 * Applicable to: Household consumers on LT connection
 * Source: OERC Retail Supply Tariff Order, FY 2024-25
 */
const LT_II_DOMESTIC: TariffCategory = {
  id: "lt_domestic",
  label: "LT Domestic",
  description: "Residential household consumers on low-tension connection",
  slabs: [
    { fromUnits: 0,   toUnits: 50,   rateINRPerKWh: 2.25 },
    { fromUnits: 51,  toUnits: 100,  rateINRPerKWh: 3.15 },
    { fromUnits: 101, toUnits: 200,  rateINRPerKWh: 5.20 },
    { fromUnits: 201, toUnits: 300,  rateINRPerKWh: 6.65 },
    { fromUnits: 301, toUnits: null, rateINRPerKWh: 7.65 },
  ],
  fixedChargeINRPerMonth: 65,
  electricityDutyRate: 0.05,
  source: "OERC Retail Tariff Order FY 2024-25",
  effectiveFrom: "2024-04-01",
  lastVerified: "2024-09",
};

/**
 * LT-III Commercial Tariff
 * Applicable to: Shops, offices, commercial establishments on LT
 */
const LT_III_COMMERCIAL: TariffCategory = {
  id: "lt_commercial",
  label: "LT Commercial",
  description: "Shops, offices, commercial establishments on LT connection",
  slabs: [
    { fromUnits: 0,   toUnits: 100,  rateINRPerKWh: 5.50 },
    { fromUnits: 101, toUnits: null, rateINRPerKWh: 7.60 },
  ],
  fixedChargeINRPerMonth: 85,
  electricityDutyRate: 0.06,
  source: "OERC Retail Tariff Order FY 2024-25",
  effectiveFrom: "2024-04-01",
  lastVerified: "2024-09",
};

/**
 * LT-IV Industrial / Small Industry
 * Applicable to: Small industries, workshops on LT
 */
const LT_IV_INDUSTRIAL: TariffCategory = {
  id: "lt_industrial",
  label: "LT Industrial (Small)",
  description: "Small industries and workshops on LT connection",
  slabs: [
    { fromUnits: 0,   toUnits: null, rateINRPerKWh: 6.80 },
  ],
  fixedChargeINRPerMonth: 120,
  electricityDutyRate: 0.06,
  source: "OERC Retail Tariff Order FY 2024-25",
  effectiveFrom: "2024-04-01",
  lastVerified: "2024-09",
};

/**
 * LT Public Institutions (hospitals, schools, government offices)
 */
const LT_INSTITUTIONAL: TariffCategory = {
  id: "lt_institutional",
  label: "LT Institutional",
  description: "Hospitals, educational institutions, government offices on LT",
  slabs: [
    { fromUnits: 0,   toUnits: null, rateINRPerKWh: 5.80 },
  ],
  fixedChargeINRPerMonth: 85,
  electricityDutyRate: 0.05,
  source: "OERC Retail Tariff Order FY 2024-25",
  effectiveFrom: "2024-04-01",
  lastVerified: "2024-09",
};

export const ODISHA_TARIFFS: Record<string, TariffCategory> = {
  residential: LT_II_DOMESTIC,
  commercial: LT_III_COMMERCIAL,
  industrial: LT_IV_INDUSTRIAL,
  institutional: LT_INSTITUTIONAL,
};

/**
 * Default export value (net metering settlement) per unit exported to grid.
 * Under Odisha net metering: surplus units settled at APPC (Avg Power Purchase Cost).
 * APPC for Odisha FY 2024-25 ≈ ₹4.20/kWh (approximate)
 *
 * Source: OERC Net Metering Regulations 2023
 * Last verified: 2024-09
 */
export const NET_METERING_EXPORT_RATE_INR_PER_KWH = 4.20;

/**
 * Compute the effective average tariff from monthly consumption (kWh) and property type.
 * Returns weighted average energy rate across slabs (not including fixed charges).
 */
export function computeEffectiveTariff(
  monthlyConsumptionKWh: number,
  propertyType: string
): { effectiveTariffINRPerKWh: number; estimatedMonthlyBillINR: number } {
  const category = ODISHA_TARIFFS[propertyType] ?? ODISHA_TARIFFS.residential;
  let energyCharge = 0;
  let remaining = monthlyConsumptionKWh;

  for (const slab of category.slabs) {
    if (remaining <= 0) break;
    const slabSize =
      slab.toUnits !== null
        ? slab.toUnits - slab.fromUnits + 1
        : Infinity;
    const unitsInSlab = Math.min(remaining, slabSize);
    energyCharge += unitsInSlab * slab.rateINRPerKWh;
    remaining -= unitsInSlab;
  }

  const dutyCharge = energyCharge * category.electricityDutyRate;
  const totalBill = category.fixedChargeINRPerMonth + energyCharge + dutyCharge;
  const effectiveTariff =
    monthlyConsumptionKWh > 0 ? (energyCharge + dutyCharge) / monthlyConsumptionKWh : 0;

  return {
    effectiveTariffINRPerKWh: effectiveTariff,
    estimatedMonthlyBillINR: totalBill,
  };
}

/**
 * Estimate monthly consumption from a bill amount using the tariff slab structure.
 * Iteratively works through slabs to find the consumption matching the bill.
 *
 * NOTE: Bills include fixed charges, duties, and other levies that are NOT per-unit.
 * The function strips fixed charges first, then backs into consumption.
 * Result is an ESTIMATE and should be flagged as such.
 */
export function estimateConsumptionFromBill(
  monthlyBillINR: number,
  propertyType: string
): { estimatedMonthlyKWh: number; confidence: "low" | "medium" } {
  const category = ODISHA_TARIFFS[propertyType] ?? ODISHA_TARIFFS.residential;

  // Strip out fixed charge estimate
  const variableBill = Math.max(0, monthlyBillINR - category.fixedChargeINRPerMonth);

  // Adjust for electricity duty (un-grossed)
  const netEnergyCharge = variableBill / (1 + category.electricityDutyRate);

  let unitsConsumed = 0;
  let remainingCharge = netEnergyCharge;

  for (const slab of category.slabs) {
    if (remainingCharge <= 0) break;
    const slabSize =
      slab.toUnits !== null
        ? slab.toUnits - slab.fromUnits + 1
        : Infinity;
    const slabCost = slabSize * slab.rateINRPerKWh;

    if (remainingCharge <= slabCost) {
      unitsConsumed += remainingCharge / slab.rateINRPerKWh;
      remainingCharge = 0;
    } else {
      unitsConsumed += slabSize;
      remainingCharge -= slabCost;
    }
  }

  return {
    estimatedMonthlyKWh: Math.max(0, unitsConsumed),
    // Bill→consumption is always an estimate; flat rate makes it medium, slab makes it low
    confidence: "medium",
  };
}
