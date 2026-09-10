/**
 * Fivefold Solar Calculation Engine — Orchestration Entry Point
 *
 * Usage:
 *   import { calculateSolarRequirement } from "@/lib/solar-engine";
 *   const result = calculateSolarRequirement(input);
 *
 * Pipeline:
 *   INPUT VALIDATION
 *   → CONSUMPTION ENGINE
 *   → SOLAR RESOURCE ENGINE
 *   → PERFORMANCE ENGINE
 *   → ROOF FEASIBILITY ENGINE (preliminary, for roof cap)
 *   → REGULATORY ENGINE (for regulatory cap)
 *   → SYSTEM SIZING ENGINE (applies caps)
 *   → SUBSIDY ENGINE
 *   → GENERATION ENGINE
 *   → FINANCIAL ENGINE
 *   → CONFIDENCE ENGINE
 *   → RESULT ASSEMBLY
 */

import { CALCULATOR_ENGINE_VERSION, AREA_M2_PER_KWP, USABLE_ROOF_RATIO, SELF_CONSUMPTION_RATIO } from "@/data/solar/system-assumptions";
import { NET_METERING_EXPORT_RATE_INR_PER_KWH } from "@/data/solar/tariffs";
import { computeEffectiveTariff } from "@/data/solar/tariffs";

import { validateCalculatorInput, safeNumber } from "./validation";
import { calculateConsumption } from "./consumption";
import { calculateSolarResource } from "./solar-resource";
import { calculatePerformance } from "./performance";
import { calculateSizing } from "./sizing";
import { calculateRoofFeasibility, estimateRequiredRoofAreaM2 } from "./roof-feasibility";
import { calculateRegulatory } from "./regulatory";
import { calculateSubsidy } from "./subsidy";
import { calculateGeneration } from "./generation";
import { calculateFinancials } from "./savings";
import { calculateConfidence } from "./confidence";

import type { CalculatorInput, SolarCalculationResult } from "./types";

export type { CalculatorInput, SolarCalculationResult } from "./types";
export type { PropertyType, ShadingLevel, DaytimeUsage, InputMode } from "./types";

const DISCLAIMER =
  "This calculator provides an indicative preliminary solar requirement. " +
  "Final system capacity, generation, structural feasibility, electrical design, " +
  "net-metering eligibility, subsidy eligibility, and financial outcomes are subject to " +
  "site assessment, applicable OERC/DISCOM regulations, government scheme guidelines, " +
  "and final engineering design. Results must not be treated as a formal quotation or guarantee.";

export function calculateSolarRequirement(input: CalculatorInput): SolarCalculationResult {
  const allWarnings: string[] = [];

  // 1. Validate
  const validation = validateCalculatorInput(input);
  allWarnings.push(...validation.warnings);

  // 2. Consumption
  const consumption = calculateConsumption(input);
  if (consumption.monthlyConsumptionKWh <= 0) {
    allWarnings.push("Estimated consumption is zero or negative. Please verify your input.");
  }

  // 3. Solar resource
  const solarResource = calculateSolarResource(input.location);
  if (!solarResource.locationMatched) {
    allWarnings.push(
      `Location "${input.location}" could not be matched to a district. Using Odisha state average.`
    );
  }

  // 4. Performance
  const performance = calculatePerformance(solarResource.pvoutKWhPerKWpPerYear, input.shading);

  // 5. Roof feasibility (pass through for max capacity from roof)
  const roofMaxKWp =
    input.roofAreaM2 !== null
      ? safeNumber((input.roofAreaM2 * USABLE_ROOF_RATIO) / AREA_M2_PER_KWP)
      : null;

  // 6. Regulatory constraint
  const regulatoryPreCheck = calculateRegulatory(input, Infinity); // use Infinity to get max first
  const regulatoryMaxKWp = regulatoryPreCheck.maxPermissibleKWp;

  // 7. System sizing (applies both constraints)
  const sizing = calculateSizing(
    consumption.annualConsumptionKWh,
    input.targetOffset,
    performance.adjustedAnnualYieldKWhPerKWp,
    roofMaxKWp,
    regulatoryMaxKWp
  );

  const finalSystemKWp = sizing.roundedSystemKWp;

  // 8. Roof feasibility (now with final system capacity for warning accuracy)
  const roofFeasibility = calculateRoofFeasibility(input.roofAreaM2, finalSystemKWp);
  allWarnings.push(...roofFeasibility.warnings);

  // 9. Regulatory (re-run with actual system size for accurate warnings)
  const regulatory = calculateRegulatory(input, finalSystemKWp);
  allWarnings.push(...regulatory.warnings);

  // 10. Subsidy
  const subsidy = calculateSubsidy(input.propertyType, finalSystemKWp);
  allWarnings.push(...subsidy.warnings);

  // 11. Generation
  const generation = calculateGeneration(
    finalSystemKWp,
    performance.adjustedAnnualYieldKWhPerKWp,
    solarResource.monthlyFractions,
    input.daytimeUsage
  );

  // 12. Financial
  const financials = calculateFinancials(
    finalSystemKWp,
    consumption.annualConsumptionKWh,
    generation.selfConsumedKWh,
    generation.exportedKWh,
    subsidy.totalSubsidyINR,
    input.propertyType
  );

  // 13. Confidence
  const confidence = calculateConfidence(input, solarResource.locationMatched);

  // ─── Assumption summary for UI ───────────────────────────────────────────
  const { effectiveTariffINRPerKWh } = computeEffectiveTariff(
    consumption.monthlyConsumptionKWh,
    input.propertyType
  );

  const selfConsumptionRatioUsed =
    SELF_CONSUMPTION_RATIO[input.daytimeUsage] ?? SELF_CONSUMPTION_RATIO.unknown;

  // ─── Debug trace ─────────────────────────────────────────────────────────
  const debug = {
    annualConsumptionKWh: consumption.annualConsumptionKWh,
    targetEnergyKWh: sizing.targetAnnualEnergyKWh,
    pvoutKWhPerKWpPerYear: solarResource.pvoutKWhPerKWpPerYear,
    performanceFactor: performance.performanceRatio,
    shadingFactor: performance.shadingAdjustment,
    adjustedAnnualYieldKWhPerKWp: performance.adjustedAnnualYieldKWhPerKWp,
    preliminarySystemKWp: sizing.preliminarySystemKWp,
    roofLimitedCapacityKWp: roofMaxKWp,
    regulatoryLimitedCapacityKWp: regulatoryMaxKWp,
    finalRecommendedSystemKWp: finalSystemKWp,
    annualGenerationKWh: generation.annualGenerationKWh,
    selfConsumedKWh: generation.selfConsumedKWh,
    exportedKWh: generation.exportedKWh,
    effectiveTariffINRPerKWh,
  };

  return {
    engineVersion: CALCULATOR_ENGINE_VERSION,
    calculatedAt: new Date().toISOString(),

    // Top-line
    recommendedSystemKWp: finalSystemKWp,
    estimatedAnnualGenerationKWh: generation.annualGenerationKWh,
    estimatedMonthlyGenerationKWh: generation.monthlyGenerationKWh,
    estimatedRoofAreaRequiredM2: estimateRequiredRoofAreaM2(finalSystemKWp),
    annualConsumptionKWh: consumption.annualConsumptionKWh,
    targetOffset: input.targetOffset,
    estimatedAnnualSavingsINR: financials.estimatedAnnualSavingsINR,
    estimatedCO2ReductionTonnesPerYear: financials.estimatedCO2ReductionTonnesPerYear,

    // Financial
    grossSystemCostINR: financials.grossSystemCostINR,
    potentialSubsidyINR: subsidy.totalSubsidyINR,
    estimatedNetInvestmentINR: financials.estimatedNetInvestmentINR,
    estimatedPaybackYears: financials.estimatedPaybackYears,

    // Stages
    consumption,
    solarResource,
    performance,
    sizing,
    roofFeasibility,
    regulatory,
    subsidy,
    generation,
    financials,
    confidence,

    assumptions: {
      solarResourcePVOUT: solarResource.pvoutKWhPerKWpPerYear,
      performanceRatio: performance.performanceRatio,
      shadingAdjustment: performance.shadingAdjustment,
      effectiveTariffINRPerKWh,
      selfConsumptionRatio: selfConsumptionRatioUsed,
      exportRateINRPerKWh: NET_METERING_EXPORT_RATE_INR_PER_KWH,
      roofPlanningFactorM2PerKWp: AREA_M2_PER_KWP,
      usableRoofRatio: USABLE_ROOF_RATIO,
    },

    warnings: Array.from(new Set(allWarnings)), // deduplicate
    engineeringReviewRequired: true,
    disclaimer: DISCLAIMER,
    debug,
  };
}
