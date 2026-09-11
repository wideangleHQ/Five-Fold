/**
 * Fivefold Solar Calculator — Government Subsidy / Assistance Data
 *
 * PM Surya Ghar Muft Bijli Yojana (MNRE, 2024)
 * + Odisha State Additional Assistance (where verified)
 *
 * Sources:
 * - PM Surya Ghar: MNRE Circular dated 13 Feb 2024
 *   https://solarrooftop.gov.in
 * - Odisha State: OREDA / Government of Odisha scheme documentation
 *
 * HOW TO UPDATE:
 * 1. Visit https://solarrooftop.gov.in for latest central subsidy slabs
 * 2. Check OREDA (https://oreda.in) for state-specific additions
 * 3. Update slabs below with new amounts and effectiveFrom date
 * 4. Set lastVerified to today's date
 * 5. Increment CALCULATOR_ENGINE_VERSION in system-assumptions.ts
 *
 * IMPORTANT DISCLAIMER:
 * Subsidy amounts are subject to fund availability, scheme continuity,
 * beneficiary eligibility, and DISCOM approval. These figures are
 * indicative only. Actual disbursement is subject to scheme guidelines.
 */

export interface SubsidySlab {
  fromKWp: number;
  toKWp: number | null; // null = no upper cap in this slab
  /** INR per kWp for this slab (applies to units within this slab range) */
  rateINRPerKWp: number | null;
  /** Fixed total subsidy for this slab (overrides rate calculation when set) */
  fixedAmountINR: number | null;
  notes: string;
}

export interface SubsidyScheme {
  id: string;
  name: string;
  authority: string;
  applicableTo: string[];         // property types eligible
  maxSystemKWp: number;           // max system size eligible for this scheme
  slabs: SubsidySlab[];
  source: string;
  effectiveFrom: string;
  lastVerified: string;
  notes: string;
}

/**
 * PM Surya Ghar — Central Subsidy
 * Applicable: Residential consumers (domestic category) only
 * Individual households: up to 3 kWp at full rate, max ₹78,000
 * Group Housing / RWA: ₹18,000/kWp up to 500 kWp (for common areas)
 *
 * Slab structure (MNRE, 2024):
 * 0–2 kWp  → ₹30,000/kWp (total: up to ₹60,000)
 * 2–3 kWp  → ₹18,000/kWp for the marginal kW (total: ₹60,000 + ₹18,000 = ₹78,000 max)
 * >3 kWp   → Fixed ₹78,000 (no additional subsidy above 3 kWp for individual homes)
 */
export const PM_SURYA_GHAR: SubsidyScheme = {
  id: "pm_surya_ghar_individual",
  name: "PM Surya Ghar Muft Bijli Yojana (Individual Residential)",
  authority: "MNRE — Ministry of New and Renewable Energy, Government of India",
  applicableTo: ["residential"],
  maxSystemKWp: 10, // scheme supports up to 10 kWp but subsidy caps at 3 kWp value
  slabs: [
    {
      fromKWp: 0,
      toKWp: 2,
      rateINRPerKWp: 30000,
      fixedAmountINR: null,
      notes: "₹30,000/kWp for first 2 kWp — max ₹60,000",
    },
    {
      fromKWp: 2,
      toKWp: 3,
      rateINRPerKWp: 18000,
      fixedAmountINR: null,
      notes: "₹18,000/kWp for 2–3 kWp increment — additional ₹18,000",
    },
    {
      fromKWp: 3,
      toKWp: null,
      rateINRPerKWp: null,
      fixedAmountINR: 78000,
      notes: "Fixed ₹78,000 maximum for systems above 3 kWp",
    },
  ],
  source: "MNRE PM Surya Ghar Scheme Guidelines, Feb 2024 circular",
  effectiveFrom: "2024-02-13",
  lastVerified: "2024-09",
  notes:
    "Applicable only to individual residential households. Joint application with DISCOM net metering. " +
    "Funds released directly to beneficiary bank account post installation and inspection.",
};

/**
 * PM Surya Ghar — Group Housing / RWA / Cooperative Housing
 */
export const PM_SURYA_GHAR_RWA: SubsidyScheme = {
  id: "pm_surya_ghar_rwa",
  name: "PM Surya Ghar — Group Housing / RWA",
  authority: "MNRE — Ministry of New and Renewable Energy, Government of India",
  applicableTo: ["residential"],
  maxSystemKWp: 500,
  slabs: [
    {
      fromKWp: 0,
      toKWp: 500,
      rateINRPerKWp: 18000,
      fixedAmountINR: null,
      notes: "₹18,000/kWp for common area generation in group housing, up to 500 kWp",
    },
  ],
  source: "MNRE PM Surya Ghar Scheme Guidelines, Feb 2024 circular",
  effectiveFrom: "2024-02-13",
  lastVerified: "2024-09",
  notes: "Applicable to Resident Welfare Associations and group housing societies. " +
    "Separate application process via DISCOM.",
};

/**
 * Compute PM Surya Ghar central subsidy for individual residential.
 * Returns the subsidy amount and breakdown.
 */
export function computePMSuryaGharSubsidy(systemKWp: number): {
  centralSubsidyINR: number;
  breakdown: string;
  eligible: boolean;
  cappedAt: number;
} {
  if (systemKWp <= 0) {
    return { centralSubsidyINR: 0, breakdown: "No system", eligible: false, cappedAt: 0 };
  }

  const slabs = PM_SURYA_GHAR.slabs;
  let totalSubsidy = 0;
  let breakdown = "";

  // Slab 1: 0–2 kWp at ₹30,000/kWp
  const slab1Units = Math.min(systemKWp, 2);
  const slab1Amount = slab1Units * (slabs[0].rateINRPerKWp ?? 0);
  totalSubsidy += slab1Amount;
  breakdown += `${slab1Units.toFixed(2)} kWp × ₹30,000 = ₹${slab1Amount.toLocaleString("en-IN")}`;

  // Slab 2: 2–3 kWp at ₹18,000/kWp
  if (systemKWp > 2) {
    const slab2Units = Math.min(systemKWp - 2, 1);
    const slab2Amount = slab2Units * (slabs[1].rateINRPerKWp ?? 0);
    totalSubsidy += slab2Amount;
    breakdown += ` + ${slab2Units.toFixed(2)} kWp × ₹18,000 = ₹${slab2Amount.toLocaleString("en-IN")}`;
  }

  // Cap at ₹78,000
  const cappedSubsidy = Math.min(totalSubsidy, 78000);
  if (totalSubsidy > 78000) {
    breakdown += ` (capped at ₹78,000)`;
  }

  return {
    centralSubsidyINR: cappedSubsidy,
    breakdown,
    eligible: true,
    cappedAt: 78000,
  };
}

/**
 * All available schemes indexed by scheme ID.
 * Extend this when new state or central schemes are added.
 */
export const ALL_SCHEMES: Record<string, SubsidyScheme> = {
  pm_surya_ghar_individual: PM_SURYA_GHAR,
  pm_surya_ghar_rwa: PM_SURYA_GHAR_RWA,
};

/**
 * Determine which schemes are applicable given property type and system size.
 */
export function getApplicableSchemes(
  propertyType: string,
  systemKWp: number
): SubsidyScheme[] {
  return Object.values(ALL_SCHEMES).filter(
    (scheme) =>
      scheme.applicableTo.includes(propertyType) &&
      systemKWp <= scheme.maxSystemKWp
  );
}

/**
 * C&I tax benefit — Accelerated Depreciation (not a subsidy, but a financial benefit).
 * Applicable to commercial, industrial consumers.
 * Rate: 40% AD in Year 1 under Income Tax Act Section 32
 *
 * Source: Income Tax Act 1961, Schedule II; CBDT notification on solar equipment
 * Last verified: 2024-09
 */
export const ACCELERATED_DEPRECIATION = {
  rate: 0.40,
  applicableTo: ["commercial", "industrial"],
  description:
    "40% Accelerated Depreciation allowed on solar plant investment in Year 1 (IT Act Section 32)",
  source: "Income Tax Act 1961, CBDT circular on solar equipment classification",
  lastVerified: "2024-09",
  notes:
    "Actual tax benefit depends on the entity's applicable income tax rate. " +
    "Consult a tax advisor for entity-specific benefit calculation.",
};
