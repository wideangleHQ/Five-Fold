/**
 * Solar Resource Engine
 * Resolves location-specific PVOUT data for Odisha.
 */

import type { SolarResourceResult } from "./types";
import { resolveSolarResource } from "@/data/solar/solar-resource";

export function calculateSolarResource(location: string): SolarResourceResult {
  const { resource, matched, matchedKey } = resolveSolarResource(location);

  return {
    pvoutKWhPerKWpPerYear: resource.pvoutKWhPerKWpPerYear,
    monthlyFractions: resource.monthlyFractions,
    locationMatched: matched,
    locationName: matched && matchedKey ? resource.district : "Odisha (state average)",
    source: resource.source,
  };
}
