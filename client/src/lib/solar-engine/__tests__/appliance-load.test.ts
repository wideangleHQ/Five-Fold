import { describe, it, expect } from "vitest";
import { APPLIANCES, type ApplianceSpec } from "@/data/solar/appliances";
import { calculateApplianceLoad, dailyUnitsForAppliance, sanitize } from "../appliance-load";

const byId = (id: string) => APPLIANCES.find((a) => a.id === id)!;

describe("appliance catalogue", () => {
  it("contains all 35 appliances from the reference list with unique ids", () => {
    expect(APPLIANCES).toHaveLength(35);
    expect(new Set(APPLIANCES.map((a) => a.id)).size).toBe(35);
  });
});

describe("dailyUnitsForAppliance", () => {
  it("reference example: 4 fans × 70 W × 10 h = 2.8 units/day, 84 units/month", () => {
    const fan70: ApplianceSpec = { id: "x", name: "x", group: "Other", wattsMin: 70, wattsMax: 70, hoursPerDay: 10 };
    const d = dailyUnitsForAppliance(fan70, 4);
    expect(d.min).toBeCloseTo(2.8, 10);
    expect(d.min * 30).toBeCloseTo(84, 10);
  });

  it("LED bulb: 9 W × 6 h = 0.054 units/day", () => {
    expect(dailyUnitsForAppliance(byId("led_bulb"), 1).min).toBeCloseTo(0.054, 10);
  });

  it("LED tube light: 20 W × 6 h = 0.12 units/day", () => {
    expect(dailyUnitsForAppliance(byId("led_tube"), 1).min).toBeCloseTo(0.12, 10);
  });

  it("ceiling fan range 60–75 W: 4 fans → 2.4–3.0 units/day", () => {
    const d = dailyUnitsForAppliance(byId("ceiling_fan"), 4);
    expect(d.min).toBeCloseTo(2.4, 10);
    expect(d.max).toBeCloseTo(3.0, 10);
  });

  it("Wi-Fi router 8–15 W × 24 h → 0.192–0.36 units/day", () => {
    const d = dailyUnitsForAppliance(byId("wifi_router"), 1);
    expect(d.min).toBeCloseTo(0.192, 10);
    expect(d.max).toBeCloseTo(0.36, 10);
  });

  it("refrigerator and inverter ACs use the table's approximate units, not rated watts × 24 h", () => {
    expect(dailyUnitsForAppliance(byId("refrigerator"), 1)).toEqual({ min: 1, max: 2 });
    expect(dailyUnitsForAppliance(byId("ac_1_5t"), 2)).toEqual({ min: 12, max: 20 });
  });

  it("zero, negative, NaN and Infinity quantities contribute nothing", () => {
    for (const q of [0, -3, NaN, Infinity]) {
      expect(dailyUnitsForAppliance(byId("ceiling_fan"), q)).toEqual({ min: 0, max: 0 });
    }
  });
});

describe("calculateApplianceLoad", () => {
  it("sums daily units across appliances and multiplies by 30 exactly once", () => {
    const load = calculateApplianceLoad({ ceiling_fan: 4, led_bulb: 10 });
    // fans 2.4–3.0 + bulbs 10 × 0.054 = 0.54
    expect(load.dailyUnits.min).toBeCloseTo(2.94, 10);
    expect(load.dailyUnits.max).toBeCloseTo(3.54, 10);
    expect(load.monthlyUnits.min).toBeCloseTo(2.94 * 30, 8);
    expect(load.monthlyUnits.max).toBeCloseTo(3.54 * 30, 8);
    expect(load.monthlyMidUnits).toBeCloseTo(((2.94 + 3.54) / 2) * 30, 8);
  });

  it("no appliances → 0, never NaN", () => {
    const load = calculateApplianceLoad({});
    expect(load.monthlyMidUnits).toBe(0);
    expect(Number.isNaN(load.monthlyUnits.min)).toBe(false);
  });

  it("'other' appliance: watts × hours / 1000, invalid values ignored, hours capped at 24", () => {
    expect(calculateApplianceLoad({}, 500, 2).dailyUnits.min).toBeCloseTo(1, 10);
    expect(calculateApplianceLoad({}, -500, 2).monthlyMidUnits).toBe(0);
    expect(calculateApplianceLoad({}, 1000, 99).dailyUnits.min).toBeCloseTo(24, 10);
  });

  it("sanitize handles malformed input", () => {
    expect(sanitize("abc")).toBe(0);
    expect(sanitize(undefined)).toBe(0);
    expect(sanitize("12")).toBe(12);
  });
});
