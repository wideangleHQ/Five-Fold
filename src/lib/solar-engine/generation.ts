/**
 * Generation Engine
 * Computes annual and monthly solar generation, and self-consumption/export split.
 */

import type { DaytimeUsage, GenerationResult } from "./types";
import { SELF_CONSUMPTION_RATIO } from "@/data/solar/system-assumptions";
import { safeNumber } from "./validation";

export function calculateGeneration(
  systemKWp: number,
  adjustedAnnualYieldKWhPerKWp: number,
  monthlyFractions: readonly number[],
  daytimeUsage: DaytimeUsage
): GenerationResult {
  const annualGenerationKWh = safeNumber(systemKWp * adjustedAnnualYieldKWhPerKWp);

  // Distribute annual generation across months using location-specific fractions
  const monthlyGenerationKWh = monthlyFractions.map((fraction) =>
    safeNumber(annualGenerationKWh * fraction)
  );

  const averageMonthlyGenerationKWh = safeNumber(annualGenerationKWh / 12);

  const selfConsumptionRatio =
    SELF_CONSUMPTION_RATIO[daytimeUsage] ?? SELF_CONSUMPTION_RATIO.unknown;
  const selfConsumedKWh = safeNumber(annualGenerationKWh * selfConsumptionRatio);
  const exportedKWh = safeNumber(annualGenerationKWh - selfConsumedKWh);

  return {
    annualGenerationKWh,
    monthlyGenerationKWh,
    averageMonthlyGenerationKWh,
    selfConsumedKWh,
    exportedKWh,
    selfConsumptionRatio,
  };
}
