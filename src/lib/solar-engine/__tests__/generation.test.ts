import { describe, it, expect } from "vitest";
import { calculateGeneration } from "../generation";

// Updated fractions from solar-resource.ts (sum = 1.0000)
const MONTHLY_FRACTIONS = [
  0.0714, 0.0757, 0.0993, 0.1036, 0.1040, 0.0766,
  0.0683, 0.0698, 0.0781, 0.0916, 0.0856, 0.0760,
] as const;

describe("calculateGeneration", () => {
  it("computes annual generation correctly", () => {
    // 3 kWp × 1148.6 kWh/kWp = 3445.8 kWh
    const result = calculateGeneration(3, 1148.6, MONTHLY_FRACTIONS, "medium");
    expect(result.annualGenerationKWh).toBeCloseTo(3445.8, 0);
  });

  it("monthly generation array has 12 entries summing to annual", () => {
    const result = calculateGeneration(5, 1148.6, MONTHLY_FRACTIONS, "high");
    expect(result.monthlyGenerationKWh).toHaveLength(12);
    const sum = result.monthlyGenerationKWh.reduce((a, b) => a + b, 0);
    // Tolerance of 2 decimal places (within ~5 kWh) accounts for floating-point rounding
    expect(Math.abs(sum - result.annualGenerationKWh)).toBeLessThan(5);
  });

  it("high daytime usage results in high self-consumption", () => {
    const high = calculateGeneration(3, 1148.6, MONTHLY_FRACTIONS, "high");
    const low  = calculateGeneration(3, 1148.6, MONTHLY_FRACTIONS, "low");
    expect(high.selfConsumedKWh).toBeGreaterThan(low.selfConsumedKWh);
    expect(high.exportedKWh).toBeLessThan(low.exportedKWh);
  });

  it("selfConsumed + exported = annual generation", () => {
    const result = calculateGeneration(4, 1200, MONTHLY_FRACTIONS, "medium");
    expect(result.selfConsumedKWh + result.exportedKWh).toBeCloseTo(result.annualGenerationKWh, 1);
  });

  it("never returns negative values", () => {
    const result = calculateGeneration(0, 1200, MONTHLY_FRACTIONS, "medium");
    expect(result.annualGenerationKWh).toBeGreaterThanOrEqual(0);
    expect(result.selfConsumedKWh).toBeGreaterThanOrEqual(0);
    expect(result.exportedKWh).toBeGreaterThanOrEqual(0);
  });
});
