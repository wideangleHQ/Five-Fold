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

const EMPTY_APPLIANCES = {
  fans: 0, lights: 0, acs: 0, refrigerators: 0, waterPumps: 0,
  washingMachines: 0, computers: 0, geysers: 0, tvs: 0,
  otherWatts: 0, otherHoursPerDay: 2,
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

  // ── Reference chart validation ────────────────────────────────────────────
  // Formula: Units/day = Qty × Watts × Hours / 1000; Units/month = Units/day × 30
  // Source: Household Electrical Load & Consumption List chart

  it("Test 1 — LED Bulb: 1 × 9W × 6h/day = 0.054 units/day = 1.62 units/month", () => {
    const result = calculateConsumption({
      ...BASE,
      inputMode: "appliances",
      appliances: { ...EMPTY_APPLIANCES, lights: 1 },
    });
    // 1 × 9 × 6 × 30 / 1000 = 1.62
    expect(result.monthlyConsumptionKWh).toBeCloseTo(1.62, 2);
    expect(result.averageDailyKWh).toBeCloseTo(0.054, 3);
  });

  it("Test 2 — Ceiling Fan: 4 × 70W × 10h/day = 2.8 units/day = 84 units/month", () => {
    // This is the explicit reference example:
    // "4 ceiling fans × 70 W × 10 hours/day / 1000 = 2.8 kWh/day = 84 units/month"
    const result = calculateConsumption({
      ...BASE,
      inputMode: "appliances",
      appliances: { ...EMPTY_APPLIANCES, fans: 4 },
    });
    expect(result.monthlyConsumptionKWh).toBeCloseTo(84, 0);
    expect(result.averageDailyKWh).toBeCloseTo(2.8, 1);
  });

  it("Test 3 — zero quantity produces zero consumption", () => {
    const result = calculateConsumption({
      ...BASE,
      inputMode: "appliances",
      appliances: { ...EMPTY_APPLIANCES },
    });
    expect(result.monthlyConsumptionKWh).toBe(0);
  });

  it("Test 4 — multiple appliances: total is sum of each", () => {
    // fans: 4 × 70W × 10h × 30d / 1000 = 84
    // lights: 10 × 9W × 6h × 30d / 1000 = 16.2
    // total: 100.2 kWh/month
    const result = calculateConsumption({
      ...BASE,
      inputMode: "appliances",
      appliances: { ...EMPTY_APPLIANCES, fans: 4, lights: 10 },
    });
    expect(result.monthlyConsumptionKWh).toBeCloseTo(100.2, 1);
  });

  it("Test 5 — monthly is daily × 30, not recalculated separately", () => {
    const result = calculateConsumption({
      ...BASE,
      inputMode: "appliances",
      appliances: { ...EMPTY_APPLIANCES, fans: 2 },
    });
    // 2 × 70 × 10 × 30 / 1000 = 42
    expect(result.monthlyConsumptionKWh).toBeCloseTo(42, 1);
    expect(result.averageDailyKWh).toBeCloseTo(result.monthlyConsumptionKWh / 30, 4);
  });

  it("Test 6 — otherWatts: 0 watts or 0 hours produces 0 contribution", () => {
    const result = calculateConsumption({
      ...BASE,
      inputMode: "appliances",
      appliances: { ...EMPTY_APPLIANCES, otherWatts: 0, otherHoursPerDay: 4 },
    });
    expect(result.monthlyConsumptionKWh).toBe(0);

    const result2 = calculateConsumption({
      ...BASE,
      inputMode: "appliances",
      appliances: { ...EMPTY_APPLIANCES, otherWatts: 500, otherHoursPerDay: 0 },
    });
    expect(result2.monthlyConsumptionKWh).toBe(0);
  });
});
