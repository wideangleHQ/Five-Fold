/**
 * Fivefold Solar Engine — Type Definitions
 * All units are explicit in variable names to prevent unit confusion.
 */

import type { OdishaDISCOM } from "@/data/solar/discom";

// ─── Input Types ────────────────────────────────────────────────────────────

export type PropertyType = "residential" | "commercial" | "industrial" | "institutional";
export type ShadingLevel = "low" | "medium" | "high" | "unknown";
export type DaytimeUsage = "low" | "medium" | "high" | "unknown";
export type InputMode = "bill" | "consumption" | "appliances";
export type ConfidenceLevel = "high" | "medium" | "low";

export interface ApplianceInput {
  fans: number;
  lights: number;
  acs: number;           // 1.5-ton ACs
  refrigerators: number;
  waterPumps: number;
  washingMachines: number;
  computers: number;
  geysers: number;
  tvs: number;
  /** Any additional wattage the user specifies */
  otherWatts: number;
  /** Hours per day the "other" appliances run */
  otherHoursPerDay: number;
}

export interface CalculatorInput {
  /** How the user is specifying consumption */
  inputMode: InputMode;
  /** Property type — drives tariff, subsidy eligibility, regulatory caps */
  propertyType: PropertyType;
  /** Monthly electricity bill in INR (used when inputMode = "bill") */
  monthlyBillINR: number | null;
  /** Monthly consumption in kWh (used when inputMode = "consumption") */
  monthlyConsumptionKWh: number | null;
  /** Appliance list (used when inputMode = "appliances") */
  appliances: ApplianceInput | null;
  /** Total rooftop area available in sq metres (converted from user input) */
  roofAreaM2: number | null;
  /** Location string (city/district name or pincode) */
  location: string;
  /** Shading condition of the rooftop */
  shading: ShadingLevel;
  /** Fraction of electricity used during daytime (affects self-consumption) */
  daytimeUsage: DaytimeUsage;
  /** Target solar offset as fraction (0.6 = 60%, 1.0 = 100%) */
  targetOffset: number;
  /** Sanctioned load in kW from electricity bill (null if unknown) */
  sanctionedLoadKW: number | null;
}

// ─── Engine Result Types ─────────────────────────────────────────────────────

export interface ConsumptionResult {
  monthlyConsumptionKWh: number;
  annualConsumptionKWh: number;
  averageDailyKWh: number;
  /** Was consumption estimated from bill (less accurate) or directly provided? */
  isEstimated: boolean;
  estimationMethod: string;
}

export interface SolarResourceResult {
  pvoutKWhPerKWpPerYear: number;
  /** Monthly generation fractions (indices 0=Jan…11=Dec) */
  monthlyFractions: readonly number[];
  locationMatched: boolean;
  locationName: string;
  source: string;
}

export interface PerformanceResult {
  performanceRatio: number;
  shadingAdjustment: number;
  effectivePerformanceFactor: number;
  /** Adjusted annual yield considering PR and shading */
  adjustedAnnualYieldKWhPerKWp: number;
}

export interface SizingResult {
  targetAnnualEnergyKWh: number;
  preliminarySystemKWp: number;
  /** After applying roof area constraint */
  roofConstrainedKWp: number;
  /** After applying regulatory (OERC) constraint */
  regulatoryConstrainedKWp: number;
  /** Final recommended capacity */
  recommendedSystemKWp: number;
  /** Standard commercial rounded value (to nearest 0.5 kWp) */
  roundedSystemKWp: number;
}

export interface RoofFeasibilityResult {
  status: "feasible" | "constrained" | "insufficient" | "unknown";
  /** Estimated usable roof area after subtracting obstructions */
  estimatedUsableAreaM2: number | null;
  /** Max system capacity the roof can support */
  maxFeasibleCapacityKWp: number | null;
  /** Is the recommended system limited by roof? */
  isRoofBinding: boolean;
  warnings: string[];
}

export interface RegulatoryResult {
  applicableFramework: string;
  discom: OdishaDISCOM;
  discomName: string;
  discomMatched: boolean;
  netMeteringEligible: boolean;
  maxPermissibleKWp: number;
  isRegulatoryBinding: boolean;
  warnings: string[];
}

export interface SubsidyResult {
  centralSubsidyINR: number;
  stateSubsidyINR: number;
  totalSubsidyINR: number;
  subsidyEligible: boolean;
  applicableSchemes: string[];
  breakdown: string;
  warnings: string[];
}

export interface GenerationResult {
  annualGenerationKWh: number;
  monthlyGenerationKWh: number[];
  averageMonthlyGenerationKWh: number;
  /** kWh generated that is consumed directly (not exported) */
  selfConsumedKWh: number;
  /** kWh exported to the grid */
  exportedKWh: number;
  selfConsumptionRatio: number;
}

export interface FinancialResult {
  grossSystemCostINR: number;
  potentialSubsidyINR: number;
  estimatedNetInvestmentINR: number;
  /** Annual savings from self-consumed solar (retail tariff saved) */
  selfConsumptionSavingsINR: number;
  /** Annual value of grid export at APPC rate */
  exportValueINR: number;
  estimatedAnnualSavingsINR: number;
  estimatedPaybackYears: number | null;
  estimatedCO2ReductionTonnesPerYear: number;
  /** Simple payback without subsidy (for comparison) */
  paybackWithoutSubsidyYears: number | null;
}

export interface ConfidenceResult {
  level: ConfidenceLevel;
  score: number; // 0–100 internal score (not shown to users as fake precision)
  reasons: string[];
}

// ─── Full Calculation Result ─────────────────────────────────────────────────

export interface SolarCalculationResult {
  engineVersion: string;
  calculatedAt: string; // ISO datetime

  // Top-line results
  recommendedSystemKWp: number;
  estimatedAnnualGenerationKWh: number;
  estimatedMonthlyGenerationKWh: number[];
  estimatedRoofAreaRequiredM2: number;
  annualConsumptionKWh: number;
  targetOffset: number;
  estimatedAnnualSavingsINR: number;
  estimatedCO2ReductionTonnesPerYear: number;

  // Financial
  grossSystemCostINR: number;
  potentialSubsidyINR: number;
  estimatedNetInvestmentINR: number;
  estimatedPaybackYears: number | null;

  // Detail stages (for debugging and UI display)
  consumption: ConsumptionResult;
  solarResource: SolarResourceResult;
  performance: PerformanceResult;
  sizing: SizingResult;
  roofFeasibility: RoofFeasibilityResult;
  regulatory: RegulatoryResult;
  subsidy: SubsidyResult;
  generation: GenerationResult;
  financials: FinancialResult;
  confidence: ConfidenceResult;

  // Assumptions surfaced to the user
  assumptions: {
    solarResourcePVOUT: number;
    performanceRatio: number;
    shadingAdjustment: number;
    effectiveTariffINRPerKWh: number;
    selfConsumptionRatio: number;
    exportRateINRPerKWh: number;
    roofPlanningFactorM2PerKWp: number;
    usableRoofRatio: number;
  };

  /** Aggregated warnings from all stages */
  warnings: string[];
  /** Always true — calculator is preliminary only */
  engineeringReviewRequired: true;
  /** Disclaimer text to display */
  disclaimer: string;

  // Internal debug data (not shown in production UI)
  debug: DebugTrace;
}

export interface DebugTrace {
  annualConsumptionKWh: number;
  targetEnergyKWh: number;
  pvoutKWhPerKWpPerYear: number;
  performanceFactor: number;
  shadingFactor: number;
  adjustedAnnualYieldKWhPerKWp: number;
  preliminarySystemKWp: number;
  roofLimitedCapacityKWp: number | null;
  regulatoryLimitedCapacityKWp: number;
  finalRecommendedSystemKWp: number;
  annualGenerationKWh: number;
  selfConsumedKWh: number;
  exportedKWh: number;
  effectiveTariffINRPerKWh: number;
}

// ─── Validation ──────────────────────────────────────────────────────────────

export interface ValidationError {
  field: string;
  message: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: ValidationError[];
  warnings: string[];
}
