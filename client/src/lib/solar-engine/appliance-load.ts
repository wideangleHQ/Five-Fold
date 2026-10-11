/**
 * Appliance load calculator — the one authoritative implementation of
 *   Units/day   = Quantity × Wattage × Usage hours / 1000   (1 kWh = 1 Unit)
 *   Units/month = Units/day × 30
 * Everything is kept at full precision; round only when displaying.
 */

import { APPLIANCES, DAYS_PER_MONTH, type ApplianceSpec } from "@/data/solar/appliances";

export interface Range {
  min: number;
  max: number;
}

export interface ApplianceLoad {
  dailyUnits: Range;
  monthlyUnits: Range;
  /** Midpoint of the monthly range — the value fed to solar sizing. */
  monthlyMidUnits: number;
}

/** Non-finite, negative or non-numeric input becomes 0 so it never reaches sizing. */
export function sanitize(value: unknown): number {
  const n = typeof value === "number" ? value : Number(value);
  return Number.isFinite(n) && n > 0 ? n : 0;
}

/** Units/day for one appliance spec (a range when the wattage is a range). */
export function dailyUnitsForAppliance(spec: ApplianceSpec, quantity: number): Range {
  const qty = Math.floor(sanitize(quantity));
  if (qty === 0) return { min: 0, max: 0 };
  if (spec.cycling && spec.unitsPerDay) {
    return { min: qty * spec.unitsPerDay.min, max: qty * spec.unitsPerDay.max };
  }
  return {
    min: (qty * spec.wattsMin * spec.hoursPerDay) / 1000,
    max: (qty * spec.wattsMax * spec.hoursPerDay) / 1000,
  };
}

export function calculateApplianceLoad(
  quantities: Record<string, number>,
  otherWatts = 0,
  otherHoursPerDay = 0,
): ApplianceLoad {
  let min = 0;
  let max = 0;
  for (const spec of APPLIANCES) {
    const d = dailyUnitsForAppliance(spec, quantities[spec.id] ?? 0);
    min += d.min;
    max += d.max;
  }
  const other = (sanitize(otherWatts) * Math.min(sanitize(otherHoursPerDay), 24)) / 1000;
  min += other;
  max += other;

  const monthlyMin = min * DAYS_PER_MONTH;
  const monthlyMax = max * DAYS_PER_MONTH;
  return {
    dailyUnits: { min, max },
    monthlyUnits: { min: monthlyMin, max: monthlyMax },
    monthlyMidUnits: (monthlyMin + monthlyMax) / 2,
  };
}
