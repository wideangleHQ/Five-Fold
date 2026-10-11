/**
 * Consumption Engine
 * Converts user input (bill / kWh / appliances) into normalized monthly and annual consumption.
 */

import type { CalculatorInput, ConsumptionResult } from "./types";
import { estimateConsumptionFromBill } from "@/data/solar/tariffs";
import { safeNumber } from "./validation";
import { calculateApplianceLoad } from "./appliance-load";
import { DAYS_PER_MONTH } from "@/data/solar/appliances";

export function calculateConsumption(input: CalculatorInput): ConsumptionResult {
  let monthlyConsumptionKWh = 0;
  let isEstimated = false;
  let estimationMethod = "";
  let applianceRange: { min: number; max: number } | undefined;

  if (input.inputMode === "consumption" && input.monthlyConsumptionKWh !== null) {
    monthlyConsumptionKWh = safeNumber(input.monthlyConsumptionKWh);
    isEstimated = false;
    estimationMethod = "Direct monthly consumption (kWh) — highest confidence";

  } else if (input.inputMode === "bill" && input.monthlyBillINR !== null) {
    const result = estimateConsumptionFromBill(input.monthlyBillINR, input.propertyType);
    monthlyConsumptionKWh = safeNumber(result.estimatedMonthlyKWh);
    isEstimated = true;
    estimationMethod =
      "Estimated from monthly bill via OERC tariff slab back-calculation. " +
      "Bill includes fixed charges and taxes not directly proportional to consumption. " +
      "Actual consumption may vary.";

  } else if (input.inputMode === "appliances" && input.appliances) {
    const load = calculateApplianceLoad(
      input.appliances.quantities,
      input.appliances.otherWatts,
      input.appliances.otherHoursPerDay,
    );
    monthlyConsumptionKWh = safeNumber(load.monthlyMidUnits);
    applianceRange = load.monthlyUnits;
    isEstimated = true;
    estimationMethod =
      "Estimated from your appliance list: Units/day = Quantity × Wattage × Usage hours ÷ 1000, " +
      "Units/month = Units/day × 30 (1 kWh = 1 Unit). Wattage ranges use their midpoint; " +
      "refrigerator and inverter-AC use approximate figures because of compressor cycling. " +
      "Indicative only — not actual consumption.";
  }

  const annualConsumptionKWh = monthlyConsumptionKWh * 12;
  const averageDailyKWh = monthlyConsumptionKWh / DAYS_PER_MONTH;

  return {
    monthlyConsumptionKWh: safeNumber(monthlyConsumptionKWh),
    annualConsumptionKWh: safeNumber(annualConsumptionKWh),
    averageDailyKWh: safeNumber(averageDailyKWh),
    isEstimated,
    estimationMethod,
    ...(applianceRange && {
      monthlyConsumptionRangeKWh: {
        min: safeNumber(applianceRange.min),
        max: safeNumber(applianceRange.max),
      },
    }),
  };
}
