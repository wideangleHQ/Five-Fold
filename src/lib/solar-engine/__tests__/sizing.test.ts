import { describe, it, expect } from "vitest";
import { calculateSizing } from "../sizing";

describe("calculateSizing", () => {
  const YIELD = 1148.6; // 1490 * 0.77 ≈ adjusted yield for Bhubaneswar

  it("calculates correct system size for known consumption", () => {
    // 3600 kWh/yr, 100% offset, yield=1148.6 → 3600/1148.6 ≈ 3.13 → rounds to 3.5
    const result = calculateSizing(3600, 1.0, YIELD, null, 10);
    expect(result.preliminarySystemKWp).toBeCloseTo(3.13, 1);
    expect(result.roundedSystemKWp).toBe(3.5);
  });

  it("applies roof constraint when roof limits capacity", () => {
    // Roof supports only 2.0 kWp
    const result = calculateSizing(3600, 1.0, YIELD, 2.0, 10);
    expect(result.roofConstrainedKWp).toBe(2.0);
    expect(result.recommendedSystemKWp).toBeLessThanOrEqual(2.0);
  });

  it("applies regulatory constraint", () => {
    // Regulatory cap of 3 kWp
    const result = calculateSizing(10000, 1.0, YIELD, null, 3);
    expect(result.regulatoryConstrainedKWp).toBeLessThanOrEqual(3);
  });

  it("handles 80% target offset", () => {
    const result100 = calculateSizing(3600, 1.0, YIELD, null, 10);
    const result80  = calculateSizing(3600, 0.8, YIELD, null, 10);
    expect(result80.preliminarySystemKWp).toBeCloseTo(result100.preliminarySystemKWp * 0.8, 1);
  });

  it("minimum system size is 0.5 kWp", () => {
    // Very low consumption
    const result = calculateSizing(100, 1.0, YIELD, null, 10);
    expect(result.recommendedSystemKWp).toBeGreaterThanOrEqual(0.5);
  });

  it("returns 0 target energy when consumption is 0", () => {
    const result = calculateSizing(0, 1.0, YIELD, null, 10);
    expect(result.targetAnnualEnergyKWh).toBe(0);
  });
});
