import { describe, it, expect } from "vitest";
import { calculateConsumption } from "../consumption";
import type { CalculatorInput } from "../types";

const BASE: CalculatorInput = {
  inputMode: "consumption",
  propertyType: "residential",
  monthlyBillINR: null,
  monthlyConsumptionKWh: null,
  appliances: null,
  roofAreaM2: null,
  location: "Bhubaneswar",
  shading: "unknown",
  daytimeUsage: "unknown",
  targetOffset: 1.0,
  sanctionedLoadKW: null,
};

const appl = (quantities: Record<string, number>, otherWatts = 0, otherHoursPerDay = 2) => ({
  quantities, otherWatts, otherHoursPerDay,
});

describe("calculateConsumption", () => {
  it("returns direct consumption when inputMode is consumption", () => {
    const result = calculateConsumption({ ...BASE, inputMode: "consumption", monthlyConsumptionKWh: 300 });
    expect(result.monthlyConsumptionKWh).toBe(300);
    expect(result.annualConsumptionKWh).toBe(3600);
    expect(result.averageDailyKWh).toBeCloseTo(10, 1);
    expect(result.isEstimated).toBe(false);
  });

  it("estimates consumption from bill via OERC slabs", () => {
    const result = calculateConsumption({ ...BASE, inputMode: "bill", monthlyBillINR: 1000 });
    expect(result.monthlyConsumptionKWh).toBeGreaterThan(0);
    expect(result.isEstimated).toBe(true);
    expect(result.annualConsumptionKWh).toBeCloseTo(result.monthlyConsumptionKWh * 12, 0);
  });

  it("returns zero for zero bill", () => {
    const result = calculateConsumption({ ...BASE, inputMode: "bill", monthlyBillINR: 0 });
    expect(result.monthlyConsumptionKWh).toBe(0);
  });

  it("never returns negative consumption", () => {
    const result = calculateConsumption({ ...BASE, inputMode: "consumption", monthlyConsumptionKWh: -50 });
    expect(result.monthlyConsumptionKWh).toBe(0);
  });

  // Appliance mode: Units/day = Qty × W × h / 1000; Units/month = Units/day × 30.
  // Wattage ranges feed the engine at their midpoint and expose the full range.

  it("4 ceiling fans (60–75 W, 10 h): midpoint 81 units/month, range 72–90", () => {
    const r = calculateConsumption({ ...BASE, inputMode: "appliances", appliances: appl({ ceiling_fan: 4 }) });
    expect(r.monthlyConsumptionKWh).toBeCloseTo(81, 8);
    expect(r.monthlyConsumptionRangeKWh!.min).toBeCloseTo(72, 8);
    expect(r.monthlyConsumptionRangeKWh!.max).toBeCloseTo(90, 8);
    expect(r.isEstimated).toBe(true);
  });

  it("single LED bulb: 1.62 units/month, 0.054 units/day", () => {
    const r = calculateConsumption({ ...BASE, inputMode: "appliances", appliances: appl({ led_bulb: 1 }) });
    expect(r.monthlyConsumptionKWh).toBeCloseTo(1.62, 8);
    expect(r.averageDailyKWh).toBeCloseTo(0.054, 8);
  });

  it("multiple appliances: monthly is the daily total × 30 (not 30 × 30)", () => {
    const r = calculateConsumption({ ...BASE, inputMode: "appliances", appliances: appl({ ceiling_fan: 4, led_bulb: 10 }) });
    const dailyMid = (2.94 + 3.54) / 2;
    expect(r.monthlyConsumptionKWh).toBeCloseTo(dailyMid * 30, 8);
    expect(r.averageDailyKWh).toBeCloseTo(dailyMid, 8);
  });

  it("empty or invalid appliance input gives 0, never NaN", () => {
    for (const q of [{}, { ceiling_fan: -2 }, { ceiling_fan: NaN }]) {
      const r = calculateConsumption({ ...BASE, inputMode: "appliances", appliances: appl(q as Record<string, number>) });
      expect(r.monthlyConsumptionKWh).toBe(0);
    }
  });
});
