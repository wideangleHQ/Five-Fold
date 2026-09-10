import { describe, it, expect } from "vitest";
import { calculateFinancials } from "../savings";

describe("calculateFinancials", () => {
  it("computes gross cost and net investment", () => {
    // 3 kWp residential: ₹65,000/kWp = ₹1,95,000 gross; subsidy ₹78,000 → net ₹1,17,000
    const result = calculateFinancials(3, 3600, 2073, 1372, 78000, "residential");
    expect(result.grossSystemCostINR).toBe(195000);
    expect(result.estimatedNetInvestmentINR).toBe(117000);
  });

  it("payback years is positive and finite", () => {
    const result = calculateFinancials(3, 3600, 2073, 1372, 78000, "residential");
    expect(result.estimatedPaybackYears).not.toBeNull();
    expect(result.estimatedPaybackYears!).toBeGreaterThan(0);
    expect(isFinite(result.estimatedPaybackYears!)).toBe(true);
  });

  it("returns null payback when savings are zero", () => {
    const result = calculateFinancials(3, 3600, 0, 0, 0, "residential");
    expect(result.estimatedPaybackYears).toBeNull();
  });

  it("CO2 reduction is positive", () => {
    const result = calculateFinancials(3, 3600, 2073, 1372, 78000, "residential");
    expect(result.estimatedCO2ReductionTonnesPerYear).toBeGreaterThan(0);
  });

  it("net investment cannot be negative (subsidy does not exceed cost)", () => {
    // subsidy > system cost edge case
    const result = calculateFinancials(0.5, 600, 200, 100, 500000, "residential");
    expect(result.estimatedNetInvestmentINR).toBeGreaterThanOrEqual(0);
  });

  it("commercial uses lower cost per kWp than residential", () => {
    const residential = calculateFinancials(10, 12000, 8000, 4000, 0, "residential");
    const commercial  = calculateFinancials(10, 12000, 8000, 4000, 0, "commercial");
    expect(commercial.grossSystemCostINR).toBeLessThan(residential.grossSystemCostINR);
  });
});
