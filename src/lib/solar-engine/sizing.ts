/**
 * System Sizing Engine
 * Determines the required system capacity from energy requirement and resource.
 * Applies roof and regulatory constraints in sequence.
 */

import type { CalculatorInput, SizingResult } from "./types";
import { safeNumber, roundToCommercialKWp } from "./validation";

export function calculateSizing(
  annualConsumptionKWh: number,
  targetOffset: number,
  adjustedAnnualYieldKWhPerKWp: number,
  roofMaxKWp: number | null,
  regulatoryMaxKWp: number,
): SizingResult {
  const targetAnnualEnergyKWh = safeNumber(annualConsumptionKWh * targetOffset);

  // Core sizing formula: required_kWp = target_energy / adjusted_yield_per_kWp
  const preliminarySystemKWp =
    adjustedAnnualYieldKWhPerKWp > 0
      ? safeNumber(targetAnnualEnergyKWh / adjustedAnnualYieldKWhPerKWp)
      : 0;

  // Apply roof constraint
  const roofConstrainedKWp =
    roofMaxKWp !== null
      ? Math.min(preliminarySystemKWp, roofMaxKWp)
      : preliminarySystemKWp;

  // Apply regulatory constraint
  const regulatoryConstrainedKWp = Math.min(roofConstrainedKWp, regulatoryMaxKWp);
  const recommendedSystemKWp = Math.max(0.5, regulatoryConstrainedKWp);
  const roundedSystemKWp = roundToCommercialKWp(recommendedSystemKWp);

  return {
    targetAnnualEnergyKWh,
    preliminarySystemKWp,
    roofConstrainedKWp,
    regulatoryConstrainedKWp,
    recommendedSystemKWp,
    roundedSystemKWp,
  };
}
