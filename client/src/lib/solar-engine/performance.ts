/**
 * Performance Engine
 * Computes the effective performance factor accounting for system losses and shading.
 */

import type { ShadingLevel, PerformanceResult } from "./types";
import { PERFORMANCE_RATIO, SHADING_ADJUSTMENT } from "@/data/solar/system-assumptions";

export function calculatePerformance(
  pvoutKWhPerKWpPerYear: number,
  shading: ShadingLevel
): PerformanceResult {
  const shadingAdjustment = SHADING_ADJUSTMENT[shading] ?? SHADING_ADJUSTMENT.unknown;
  const effectivePerformanceFactor = PERFORMANCE_RATIO * shadingAdjustment;
  // PVOUT from Global Solar Atlas is at standard conditions (no system losses).
  // Multiply by effective performance factor to get real-world yield.
  const adjustedAnnualYieldKWhPerKWp = pvoutKWhPerKWpPerYear * effectivePerformanceFactor;

  return {
    performanceRatio: PERFORMANCE_RATIO,
    shadingAdjustment,
    effectivePerformanceFactor,
    adjustedAnnualYieldKWhPerKWp,
  };
}
