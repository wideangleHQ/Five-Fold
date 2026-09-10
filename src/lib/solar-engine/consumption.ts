/**
 * Consumption Engine
 * Converts user input (bill / kWh / appliances) into normalized monthly and annual consumption.
 */

import type { CalculatorInput, ConsumptionResult } from "./types";
import { estimateConsumptionFromBill } from "@/data/solar/tariffs";
import { APPLIANCE_WATTS } from "@/data/solar/system-assumptions";
import { safeNumber } from "./validation";

const DAYS_PER_MONTH = 30;

/**
 * Estimate monthly consumption from appliance list.
 * kWh = (power_kW × hours_per_day × days_per_month) per appliance.
 * This is the lowest-confidence mode because rated power ≠ actual operating power.
 */
function estimateFromAppliances(appliances: NonNullable<CalculatorInput["appliances"]>): number {
  const items: Array<{ watts: number; count: number; hoursPerDay: number }> = [
    { watts: APPLIANCE_WATTS.fan,           count: appliances.fans,           hoursPerDay: 12 },
    { watts: APPLIANCE_WATTS.light,         count: appliances.lights,         hoursPerDay: 8  },
    { watts: APPLIANCE_WATTS.ac_1_5ton,     count: appliances.acs,            hoursPerDay: 8  },
    { watts: APPLIANCE_WATTS.refrigerator,  count: appliances.refrigerators,  hoursPerDay: 24 },
    { watts: APPLIANCE_WATTS.waterPump,     count: appliances.waterPumps,     hoursPerDay: 4  },
    { watts: APPLIANCE_WATTS.washingMachine,count: appliances.washingMachines,hoursPerDay: 1  },
    { watts: APPLIANCE_WATTS.computer,      count: appliances.computers,      hoursPerDay: 8  },
    { watts: APPLIANCE_WATTS.geyser,        count: appliances.geysers,        hoursPerDay: 1  },
    { watts: APPLIANCE_WATTS.tv,            count: appliances.tvs,            hoursPerDay: 6  },
    { watts: appliances.otherWatts,         count: 1,                         hoursPerDay: appliances.otherHoursPerDay },
  ];

  const totalWattHoursPerDay = items.reduce(
    (sum, item) => sum + item.watts * item.count * item.hoursPerDay,
    0
  );
  const monthlyKWh = (totalWattHoursPerDay / 1000) * DAYS_PER_MONTH;
  return safeNumber(monthlyKWh);
}

export function calculateConsumption(input: CalculatorInput): ConsumptionResult {
  let monthlyConsumptionKWh = 0;
  let isEstimated = false;
  let estimationMethod = "";

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
    monthlyConsumptionKWh = estimateFromAppliances(input.appliances);
    isEstimated = true;
    estimationMethod =
      "Estimated from appliance list using BEE standard wattage ratings. " +
      "Actual consumption depends on usage patterns and appliance efficiency. " +
      "Treat as a rough estimate.";
  }

  const annualConsumptionKWh = monthlyConsumptionKWh * 12;
  const averageDailyKWh = monthlyConsumptionKWh / DAYS_PER_MONTH;

  return {
    monthlyConsumptionKWh: safeNumber(monthlyConsumptionKWh),
    annualConsumptionKWh: safeNumber(annualConsumptionKWh),
    averageDailyKWh: safeNumber(averageDailyKWh),
    isEstimated,
    estimationMethod,
  };
}
