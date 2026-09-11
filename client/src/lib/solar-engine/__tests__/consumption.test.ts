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

describe("calculateConsumption", () => {
  it("returns direct consumption when inputMode is consumption", () => {
    const result = calculateConsumption({ ...BASE, inputMode: "consumption", monthlyConsumptionKWh: 300 });
    expect(result.monthlyConsumptionKWh).toBe(300);
    expect(result.annualConsumptionKWh).toBe(3600);
    expect(result.averageDailyKWh).toBeCloseTo(10, 1);
    expect(result.isEstimated).toBe(false);
  });

  it("estimates consumption from bill via OERC slabs", () => {
    // Bill of ₹1000 for residential — should yield a positive estimate
    const result = calculateConsumption({ ...BASE, inputMode: "bill", monthlyBillINR: 1000 });
    expect(result.monthlyConsumptionKWh).toBeGreaterThan(0);
    expect(result.isEstimated).toBe(true);
    expect(result.annualConsumptionKWh).toBeCloseTo(result.monthlyConsumptionKWh * 12, 0);
  });

  it("returns zero for zero bill", () => {
    const result = calculateConsumption({ ...BASE, inputMode: "bill", monthlyBillINR: 0 });
    expect(result.monthlyConsumptionKWh).toBe(0);
  });

  it("estimates from appliances correctly", () => {
    const result = calculateConsumption({
      ...BASE,
      inputMode: "appliances",
      appliances: {
        fans: 4,         // 4 × 75W × 12h × 30d / 1000 = 108 kWh
        lights: 10,      // 10 × 10W × 8h × 30d / 1000 = 24 kWh
        acs: 0, refrigerators: 0, waterPumps: 0, washingMachines: 0,
        computers: 0, geysers: 0, tvs: 0, otherWatts: 0, otherHoursPerDay: 2,
      },
    });
    // fans: 4 * 75 * 12 * 30 / 1000 = 108; lights: 10 * 10 * 8 * 30 / 1000 = 24
    expect(result.monthlyConsumptionKWh).toBeCloseTo(132, 0);
    expect(result.isEstimated).toBe(true);
  });

  it("never returns negative consumption", () => {
    const result = calculateConsumption({ ...BASE, inputMode: "consumption", monthlyConsumptionKWh: -50 });
    expect(result.monthlyConsumptionKWh).toBe(0);
  });
});
