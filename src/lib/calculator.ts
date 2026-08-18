/**
 * Solar Savings Calculator Logic
 * 
 * IMPORTANT: Underlying calculation methodology (irradiance, tariff, degradation, payback formula)
 * is pending final engineering sign-off from Fivefold Renewable.
 * 
 * All outputs generated here are marked as draft preliminary estimates.
 */

export interface CalculatorInputs {
  monthlyBill: number; // in INR
  monthlyConsumption?: number; // in kWh
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

/**
 * Computes preliminary conservative solar estimates based on monthly bill or roof area.
 * Keeps all calculation logic isolated from UI components.
 */
export function calculateSolarEstimate(inputs: CalculatorInputs): CalculatorOutputs {
  const { monthlyBill, roofAreaSqFt } = inputs;
  
  // Conservative indicative benchmark logic (Draft Only)
  // ~₹8 per unit indicative tariff rate in Odisha C&I / Residential average
  const estimatedUnitsPerMonth = monthlyBill > 0 ? monthlyBill / 7.5 : (roofAreaSqFt * 0.8);
  
  // 1 kWp system produces approx 120 kWh (units) per month in Odisha climate
  const capacityFromBill = estimatedUnitsPerMonth / 120;
  
  // 1 kWp requires approx 80-100 sq ft of shadow-free roof space
  const capacityFromRoof = roofAreaSqFt > 0 ? roofAreaSqFt / 90 : capacityFromBill;
  
  // Recommended capacity is constrained by both roof area and energy consumption
  const recommendedCapacityKw = Math.max(1, Math.min(Math.round(capacityFromBill * 10) / 10, Math.round(capacityFromRoof * 10) / 10 || 10));
  
  // Annual Generation ~ 1400 kWh per kWp annually (conservative for Eastern India)
  const estimatedAnnualGenerationKwh = Math.round(recommendedCapacityKw * 1400);
  
  // Estimated annual savings = annual generation * average unit rate
  const estimatedAnnualSavingsInr = Math.round(estimatedAnnualGenerationKwh * 7.5);
  
  // CO2 reduction: approx 0.82 kg CO2 per kWh of solar energy generated
  const estimatedCo2ReductionTons = Math.round((estimatedAnnualGenerationKwh * 0.82 / 1000) * 10) / 10;
  
  // Simple payback estimation window (indicative 4-5.5 years for commercial/industrial, 5-6 years residential)
  const estimatedPaybackYears = 4.5;

  return {
    recommendedCapacityKw,
    estimatedAnnualGenerationKwh,
    estimatedAnnualSavingsInr,
    estimatedCo2ReductionTons,
    estimatedPaybackYears,
    isDraftEstimate: true,
    disclaimer: "These figures are preliminary draft estimates based on standard regional solar irradiance models. Final plant capacity, yield simulations (PVsyst), shadow analysis, and financial returns require engineering evaluation.",
  };
}
