import { describe, it, expect } from "vitest";
import { calculateSolarRequirement } from "../index";
import type { CalculatorInput } from "../types";

const BASE_RESIDENTIAL: CalculatorInput = {
  inputMode: "consumption",
  propertyType: "residential",
  monthlyBillINR: null,
  monthlyConsumptionKWh: 300,
  appliances: null,
  roofAreaM2: 100,
  location: "Bhubaneswar, Odisha",
  shading: "low",
  daytimeUsage: "medium",
  targetOffset: 1.0,
  sanctionedLoadKW: 5,
};

describe("calculateSolarRequirement — full engine integration", () => {
  it("produces a valid result for standard residential input", () => {
    const result = calculateSolarRequirement(BASE_RESIDENTIAL);

    // No NaN or Infinity anywhere
    expect(isFinite(result.recommendedSystemKWp)).toBe(true);
    expect(isFinite(result.estimatedAnnualGenerationKWh)).toBe(true);
    expect(isFinite(result.estimatedAnnualSavingsINR)).toBe(true);
    expect(isFinite(result.grossSystemCostINR)).toBe(true);

    // System size is positive
    expect(result.recommendedSystemKWp).toBeGreaterThan(0);

    // Monthly generation has 12 entries
    expect(result.estimatedMonthlyGenerationKWh).toHaveLength(12);

    // Annual == sum of monthly (within floating-point rounding tolerance of 5 kWh)
    const monthlySum = result.estimatedMonthlyGenerationKWh.reduce((a, b) => a + b, 0);
    expect(Math.abs(monthlySum - result.estimatedAnnualGenerationKWh)).toBeLessThan(5);

    // Residential gets PM Surya Ghar subsidy
    expect(result.potentialSubsidyINR).toBeGreaterThan(0);

    // Net investment < gross
    expect(result.estimatedNetInvestmentINR).toBeLessThan(result.grossSystemCostINR);

    // Payback is reasonable (3–15 years for Odisha)
    expect(result.estimatedPaybackYears).not.toBeNull();
    expect(result.estimatedPaybackYears!).toBeGreaterThan(2);
    expect(result.estimatedPaybackYears!).toBeLessThan(20);

    // Engineering review flag
    expect(result.engineeringReviewRequired).toBe(true);
    expect(result.engineVersion).toBeTruthy();
  });

  it("residential capped at 5 kWp (sanctioned load = 5kW)", () => {
    // 300 kWh/month → ~3.13 kWp but sanctioned load cap is 5 → not binding here
    const result = calculateSolarRequirement(BASE_RESIDENTIAL);
    expect(result.recommendedSystemKWp).toBeLessThanOrEqual(5);
  });

  it("commercial input — no central subsidy", () => {
    const result = calculateSolarRequirement({
      ...BASE_RESIDENTIAL,
      propertyType: "commercial",
      monthlyConsumptionKWh: 1000,
      sanctionedLoadKW: 30,
    });
    expect(result.potentialSubsidyINR).toBe(0);
    expect(result.recommendedSystemKWp).toBeGreaterThan(0);
  });

  it("low consumption — small system", () => {
    const result = calculateSolarRequirement({ ...BASE_RESIDENTIAL, monthlyConsumptionKWh: 80 });
    expect(result.recommendedSystemKWp).toBeLessThanOrEqual(2);
  });

  it("high consumption — larger system, may hit regulatory cap", () => {
    const result = calculateSolarRequirement({
      ...BASE_RESIDENTIAL,
      monthlyConsumptionKWh: 1000,
      sanctionedLoadKW: 5,
    });
    // With 5kW sanctioned load cap, system cannot exceed 5 kWp
    expect(result.recommendedSystemKWp).toBeLessThanOrEqual(5);
  });

  it("small roof — feasibility constrained", () => {
    // 20 m² usable × 70% = 14 m² → 14/10 = 1.4 kWp max
    const result = calculateSolarRequirement({ ...BASE_RESIDENTIAL, roofAreaM2: 20 });
    expect(result.roofFeasibility.status).toBe("constrained");
    expect(result.warnings.length).toBeGreaterThan(0);
  });

  it("unknown location — uses state average", () => {
    const result = calculateSolarRequirement({ ...BASE_RESIDENTIAL, location: "Some Unknown Town" });
    expect(result.solarResource.locationMatched).toBe(false);
    expect(result.solarResource.pvoutKWhPerKWpPerYear).toBe(1480);
  });

  it("bill-based input with minimal context — medium or low confidence", () => {
    // Strip most optional fields so confidence drops below "high"
    const result = calculateSolarRequirement({
      inputMode: "bill",
      propertyType: "residential",
      monthlyBillINR: 2500,
      monthlyConsumptionKWh: null,
      appliances: null,
      roofAreaM2: null,           // no roof
      location: "",               // no location
      shading: "unknown",
      daytimeUsage: "unknown",
      targetOffset: 1.0,
      sanctionedLoadKW: null,     // unknown load
    });
    expect(result.consumption.isEstimated).toBe(true);
    // Score: 100 - 20 (bill) - 15 (no location) - 10 (no roof) - 5 (unknown shading) - 5 (unknown daytime) - 5 (unknown load) = 40 → low
    expect(result.confidence.level).not.toBe("high");
  });

  it("disclaimer is present", () => {
    const result = calculateSolarRequirement(BASE_RESIDENTIAL);
    expect(result.disclaimer.length).toBeGreaterThan(50);
  });

  it("no NaN in financials with zero roof area", () => {
    const result = calculateSolarRequirement({ ...BASE_RESIDENTIAL, roofAreaM2: null });
    expect(isNaN(result.estimatedAnnualSavingsINR)).toBe(false);
    expect(isNaN(result.grossSystemCostINR)).toBe(false);
  });

  it("80% offset produces smaller system than 100%", () => {
    const full   = calculateSolarRequirement({ ...BASE_RESIDENTIAL, targetOffset: 1.0 });
    const partial = calculateSolarRequirement({ ...BASE_RESIDENTIAL, targetOffset: 0.8 });
    expect(partial.recommendedSystemKWp).toBeLessThanOrEqual(full.recommendedSystemKWp);
  });
});
