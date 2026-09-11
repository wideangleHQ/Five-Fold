import { describe, it, expect } from "vitest";
import { calculateSolarResource } from "../solar-resource";

describe("calculateSolarResource", () => {
  it("matches Bhubaneswar correctly", () => {
    const result = calculateSolarResource("Bhubaneswar, Odisha");
    expect(result.locationMatched).toBe(true);
    expect(result.pvoutKWhPerKWpPerYear).toBe(1490);
    expect(result.monthlyFractions).toHaveLength(12);
  });

  it("matches Sambalpur (western Odisha, higher PVOUT)", () => {
    const result = calculateSolarResource("Sambalpur");
    expect(result.locationMatched).toBe(true);
    expect(result.pvoutKWhPerKWpPerYear).toBeGreaterThan(1500);
  });

  it("returns state average for unknown location", () => {
    const result = calculateSolarResource("Unknown Town XYZ");
    expect(result.locationMatched).toBe(false);
    expect(result.pvoutKWhPerKWpPerYear).toBe(1480);
  });

  it("monthly fractions sum to approximately 1.0", () => {
    const result = calculateSolarResource("Bhubaneswar");
    const sum = result.monthlyFractions.reduce((a, b) => a + b, 0);
    expect(sum).toBeCloseTo(1.0, 2);
  });

  it("handles alias BBSR", () => {
    const result = calculateSolarResource("BBSR");
    expect(result.locationMatched).toBe(true);
    expect(result.pvoutKWhPerKWpPerYear).toBe(1490);
  });

  it("handles Berhampur as alias for Ganjam", () => {
    const result = calculateSolarResource("Berhampur, Ganjam");
    expect(result.locationMatched).toBe(true);
    expect(result.pvoutKWhPerKWpPerYear).toBe(1490);
  });
});
