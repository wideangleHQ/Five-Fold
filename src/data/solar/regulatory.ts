/**
 * Fivefold Solar Calculator — Odisha Regulatory Rules
 *
 * Sources:
 * - OERC (Odisha Electricity Regulatory Commission) Net Metering Regulations 2023
 * - OERC Grid Interactive Solar Rooftop PV Regulations
 * - Odisha DISCOM interconnection guidelines
 * Authority: https://www.orierc.org
 *
 * HOW TO UPDATE:
 * 1. Download latest OERC regulations from https://www.orierc.org
 * 2. Update rules below with new values and effectiveFrom date
 * 3. Set lastVerified to update date
 * 4. Increment CALCULATOR_ENGINE_VERSION in system-assumptions.ts
 */

export interface RegulatoryRule {
  parameter: string;
  value: number | string | boolean;
  unit?: string;
  source: string;
  effectiveFrom: string;
  lastVerified: string;
  notes: string;
}

/**
 * Net Metering rules for LT residential consumers (Odisha)
 * Source: OERC Net Metering Regulations 2023 / DISCOM implementation guidelines
 */
export const ODISHA_NET_METERING_RULES: Record<string, RegulatoryRule> = {
  maxSystemKWpResidential: {
    parameter: "Maximum rooftop PV system size (LT Domestic)",
    value: 10,
    unit: "kWp",
    source: "OERC Net Metering Regulations 2023, Clause 4",
    effectiveFrom: "2023-01-01",
    lastVerified: "2024-09",
    notes:
      "Individual LT domestic consumer: system capacity not to exceed sanctioned load " +
      "or 10 kWp, whichever is lower. Higher capacity requires additional technical assessment.",
  },
  maxSystemRelativeToSanctionedLoad: {
    parameter: "Max system capacity relative to sanctioned load",
    value: 1.0,
    unit: "fraction",
    source: "OERC Net Metering Regulations 2023",
    effectiveFrom: "2023-01-01",
    lastVerified: "2024-09",
    notes:
      "System kWp should not exceed the consumer's sanctioned load kW. " +
      "For LT domestic with 5kW sanction, max rooftop = 5 kWp or 10 kWp (whichever lower) = 5 kWp.",
  },
  settlementPeriod: {
    parameter: "Net metering settlement period",
    value: "Monthly",
    source: "OERC Net Metering Regulations 2023",
    effectiveFrom: "2023-01-01",
    lastVerified: "2024-09",
    notes:
      "Net energy units settled at end of billing period. Surplus generation carried forward " +
      "or settled at APPC rate as per DISCOM billing cycle.",
  },
  exportRateType: {
    parameter: "Export energy settlement rate",
    value: "APPC",
    source: "OERC Net Metering Regulations 2023",
    effectiveFrom: "2023-01-01",
    lastVerified: "2024-09",
    notes:
      "Surplus exported energy settled at Average Power Purchase Cost (APPC) for the year. " +
      "APPC is typically lower than the retail tariff.",
  },
  biDirectionalMeterRequired: {
    parameter: "Bi-directional meter requirement",
    value: true,
    source: "OERC Net Metering Regulations 2023",
    effectiveFrom: "2023-01-01",
    lastVerified: "2024-09",
    notes:
      "Bi-directional (net energy) meter mandatory for all grid-interactive rooftop systems. " +
      "Installed by DISCOM at consumer's cost.",
  },
  maxSystemKWpCommercial: {
    parameter: "Maximum rooftop PV system size (LT Commercial)",
    value: 50,
    unit: "kWp",
    source: "OERC Net Metering Regulations 2023, Clause 4",
    effectiveFrom: "2023-01-01",
    lastVerified: "2024-09",
    notes:
      "LT commercial consumers: up to 50 kWp under net metering. " +
      "Above 50 kWp may require HT connection and separate interconnection study.",
  },
  maxSystemKWpIndustrial: {
    parameter: "Maximum rooftop PV system size (LT Industrial)",
    value: 100,
    unit: "kWp",
    source: "OERC Net Metering Regulations 2023, Clause 4",
    effectiveFrom: "2023-01-01",
    lastVerified: "2024-09",
    notes:
      "LT industrial consumers: up to 100 kWp. Larger systems require separate interconnection study.",
  },
  applicationProcess: {
    parameter: "Net metering application process",
    value: "DISCOM online portal or office submission",
    source: "OERC Net Metering Regulations 2023",
    effectiveFrom: "2023-01-01",
    lastVerified: "2024-09",
    notes:
      "Consumer applies to DISCOM (TPCODL/TPNODL/TPWODL/TPSODL) for net metering approval. " +
      "Technical feasibility study conducted by DISCOM. Approval typically 30–60 days.",
  },
};

/**
 * System size regulatory caps by property type (kWp).
 * Used to flag when recommended system exceeds net-metering limits.
 */
export const REGULATORY_SYSTEM_CAP_KWP: Record<string, number> = {
  residential: 10,
  commercial: 50,
  industrial: 100,
  institutional: 50,
};

/**
 * Typical sanctioned load by property type (kW) — used when user doesn't know their sanctioned load.
 * Used for preliminary regulatory constraint check only.
 * Actual sanctioned load must be verified from electricity bill.
 */
export const TYPICAL_SANCTIONED_LOAD_KW: Record<string, number> = {
  residential: 5,   // typical 1-phase domestic
  commercial: 15,   // small commercial
  industrial: 30,   // small industrial
  institutional: 20,
};

/**
 * Determine the maximum permissible system size under Odisha regulations.
 * Returns the binding constraint and reason.
 */
export function getMaxPermissibleSystemKWp(
  propertyType: string,
  sanctionedLoadKW: number | null
): {
  maxKWp: number;
  bindingConstraint: string;
  warnings: string[];
} {
  const warnings: string[] = [];
  const regulatoryCap = REGULATORY_SYSTEM_CAP_KWP[propertyType] ?? 10;
  const typicalLoad =
    sanctionedLoadKW ??
    TYPICAL_SANCTIONED_LOAD_KW[propertyType] ??
    5;

  if (sanctionedLoadKW === null) {
    warnings.push(
      `Sanctioned load not provided. Using typical ${typicalLoad} kW for ${propertyType}. ` +
      `Verify from your electricity bill to confirm the actual permitted system size.`
    );
  }

  // Under OERC rules: system ≤ min(sanctioned load, regulatory cap)
  const maxKWp = Math.min(typicalLoad, regulatoryCap);

  const bindingConstraint =
    typicalLoad <= regulatoryCap
      ? `Sanctioned load limit (${typicalLoad} kWp)`
      : `OERC regulatory cap for ${propertyType} (${regulatoryCap} kWp)`;

  return { maxKWp, bindingConstraint, warnings };
}
