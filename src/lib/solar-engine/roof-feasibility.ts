/**
 * Roof Feasibility Engine
 * Estimates usable roof capacity and flags constraints.
 */

import type { RoofFeasibilityResult } from "./types";
import { AREA_M2_PER_KWP, USABLE_ROOF_RATIO } from "@/data/solar/system-assumptions";
import { safeNumber } from "./validation";

export function calculateRoofFeasibility(
  totalRoofAreaM2: number | null,
  recommendedSystemKWp: number
): RoofFeasibilityResult {
  const warnings: string[] = [];

  if (totalRoofAreaM2 === null) {
    return {
      status: "unknown",
      estimatedUsableAreaM2: null,
      maxFeasibleCapacityKWp: null,
      isRoofBinding: false,
      warnings: [
        "Rooftop area not provided. Roof feasibility cannot be assessed. " +
          "A site assessment is recommended to verify that sufficient shadow-free area is available.",
      ],
    };
  }

  const estimatedUsableAreaM2 = safeNumber(totalRoofAreaM2 * USABLE_ROOF_RATIO);
  const maxFeasibleCapacityKWp = safeNumber(estimatedUsableAreaM2 / AREA_M2_PER_KWP);

  const isRoofBinding = maxFeasibleCapacityKWp < recommendedSystemKWp;

  if (isRoofBinding) {
    warnings.push(
      `Estimated usable rooftop area (${estimatedUsableAreaM2.toFixed(0)} m²) supports up to ` +
        `${maxFeasibleCapacityKWp.toFixed(1)} kWp, which is less than the recommended ` +
        `${recommendedSystemKWp.toFixed(1)} kWp. ` +
        `A site assessment is required to determine the maximum feasible system size.`
    );
  }

  if (totalRoofAreaM2 < 10) {
    warnings.push("Rooftop area appears very small for a solar installation. Minimum practical area is ~10 m².");
  }

  const status =
    maxFeasibleCapacityKWp <= 0
      ? "insufficient"
      : isRoofBinding
      ? "constrained"
      : "feasible";

  return {
    status,
    estimatedUsableAreaM2,
    maxFeasibleCapacityKWp,
    isRoofBinding,
    warnings,
  };
}

/** Convert square feet to square metres. */
export function sqFtToM2(sqFt: number): number {
  return sqFt * 0.0929;
}

/** Estimate roof area in m² required for a given system capacity. */
export function estimateRequiredRoofAreaM2(systemKWp: number): number {
  return systemKWp * AREA_M2_PER_KWP;
}
