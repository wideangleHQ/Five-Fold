/**
 * Financial Engine
 * Calculates savings, payback, and CO2 reduction.
 *
 * Savings = self-consumed savings (retail tariff avoided) + export value (APPC rate)
 * Payback = net investment / annual savings
 */

import type { PropertyType, FinancialResult } from "./types";
import { computeEffectiveTariff } from "@/data/solar/tariffs";
import { NET_METERING_EXPORT_RATE_INR_PER_KWH, ODISHA_TARIFFS } from "@/data/solar/tariffs";
import { SYSTEM_COST_INR_PER_KWP, CO2_FACTOR_KG_PER_KWH } from "@/data/solar/system-assumptions";
import { safeNumber } from "./validation";

export function calculateFinancials(
  systemKWp: number,
  annualConsumptionKWh: number,
  selfConsumedKWh: number,
  exportedKWh: number,
  subsidyINR: number,
  propertyType: PropertyType
): FinancialResult {
  // Effective tariff at the user's consumption level
  const monthlyConsumptionKWh = annualConsumptionKWh / 12;
  const { effectiveTariffINRPerKWh } = computeEffectiveTariff(
    monthlyConsumptionKWh,
    propertyType
  );

  // Fall back to top slab if tariff computation yields zero
  const tariffCategory = ODISHA_TARIFFS[propertyType] ?? ODISHA_TARIFFS.residential;
  const topSlab = tariffCategory.slabs[tariffCategory.slabs.length - 1];
  const usedTariff =
    effectiveTariffINRPerKWh > 0 ? effectiveTariffINRPerKWh : topSlab.rateINRPerKWh;

  const selfConsumptionSavingsINR = safeNumber(selfConsumedKWh * usedTariff);
  const exportValueINR = safeNumber(exportedKWh * NET_METERING_EXPORT_RATE_INR_PER_KWH);
  const estimatedAnnualSavingsINR = selfConsumptionSavingsINR + exportValueINR;

  const costPerKWp = SYSTEM_COST_INR_PER_KWP[propertyType] ?? SYSTEM_COST_INR_PER_KWP.residential;
  const grossSystemCostINR = safeNumber(systemKWp * costPerKWp);
  const estimatedNetInvestmentINR = safeNumber(Math.max(0, grossSystemCostINR - subsidyINR));

  const estimatedPaybackYears =
    estimatedAnnualSavingsINR > 0
      ? safeNumber(estimatedNetInvestmentINR / estimatedAnnualSavingsINR)
      : null;

  const paybackWithoutSubsidyYears =
    estimatedAnnualSavingsINR > 0
      ? safeNumber(grossSystemCostINR / estimatedAnnualSavingsINR)
      : null;

  const estimatedCO2ReductionTonnesPerYear = safeNumber(
    ((selfConsumedKWh + exportedKWh) * CO2_FACTOR_KG_PER_KWH) / 1000
  );

  return {
    grossSystemCostINR,
    potentialSubsidyINR: subsidyINR,
    estimatedNetInvestmentINR,
    selfConsumptionSavingsINR,
    exportValueINR,
    estimatedAnnualSavingsINR,
    estimatedPaybackYears,
    estimatedCO2ReductionTonnesPerYear,
    paybackWithoutSubsidyYears,
  };
}
