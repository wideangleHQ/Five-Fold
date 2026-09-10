/**
 * Solar Savings Calculator — Backward-Compatibility Shim
 *
 * The v1 interface is preserved here for any code that imports it directly.
 * New code should import from "@/lib/solar-engine" instead.
 *
 * The implementation now delegates to the production engine.
 */

import { calculateSolarRequirement } from "@/lib/solar-engine";
import { sqFtToM2 } from "@/lib/solar-engine/roof-feasibility";

export interface CalculatorInputs {
  monthlyBill: number;
  monthlyConsumption?: number;
  location: string;
  roofType: string;
  roofAreaSqFt: number;
}

export interface CalculatorOutputs {
  recommendedCapacityKw: number;
  estimatedAnnualGenerationKwh: number;
  estimatedAnnualSavingsInr: number;
  estimatedCo2ReductionTons: number;
  estimatedPaybackYears: number;
  isDraftEstimate: true;
  disclaimer: string;
}

export function calculateSolarEstimate(inputs: CalculatorInputs): CalculatorOutputs {
  const result = calculateSolarRequirement({
    inputMode: inputs.monthlyConsumption ? "consumption" : "bill",
    propertyType: "residential",
    monthlyBillINR: inputs.monthlyBill || null,
    monthlyConsumptionKWh: inputs.monthlyConsumption ?? null,
    appliances: null,
    roofAreaM2: inputs.roofAreaSqFt > 0 ? sqFtToM2(inputs.roofAreaSqFt) : null,
    location: inputs.location,
    shading: "unknown",
    daytimeUsage: "unknown",
    targetOffset: 1.0,
    sanctionedLoadKW: null,
  });

  return {
    recommendedCapacityKw: result.recommendedSystemKWp,
    estimatedAnnualGenerationKwh: Math.round(result.estimatedAnnualGenerationKWh),
    estimatedAnnualSavingsInr: Math.round(result.estimatedAnnualSavingsINR),
    estimatedCo2ReductionTons: Math.round(result.estimatedCO2ReductionTonnesPerYear * 10) / 10,
    estimatedPaybackYears: result.estimatedPaybackYears ?? 5,
    isDraftEstimate: true,
    disclaimer: result.disclaimer,
  };
}
