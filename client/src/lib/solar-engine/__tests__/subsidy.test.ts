import { describe, it, expect } from "vitest";
import { calculateSubsidy } from "../subsidy";
import { computePMSuryaGharSubsidy, computeOdishaStateSubsidy } from "@/data/solar/subsidies";

describe("PM Surya Ghar subsidy slabs", () => {
  it("1 kWp → ₹30,000", () => {
    const { centralSubsidyINR } = computePMSuryaGharSubsidy(1);
    expect(centralSubsidyINR).toBe(30000);
  });

  it("2 kWp → ₹60,000", () => {
    const { centralSubsidyINR } = computePMSuryaGharSubsidy(2);
    expect(centralSubsidyINR).toBe(60000);
  });

  it("3 kWp → ₹78,000", () => {
    const { centralSubsidyINR } = computePMSuryaGharSubsidy(3);
    expect(centralSubsidyINR).toBe(78000);
  });

  it("5 kWp → capped at ₹78,000", () => {
    const { centralSubsidyINR } = computePMSuryaGharSubsidy(5);
    expect(centralSubsidyINR).toBe(78000);
  });

  it("10 kWp → capped at ₹78,000", () => {
    const { centralSubsidyINR } = computePMSuryaGharSubsidy(10);
    expect(centralSubsidyINR).toBe(78000);
  });

  it("0 kWp → not eligible", () => {
    const { eligible } = computePMSuryaGharSubsidy(0);
    expect(eligible).toBe(false);
  });
});

describe("calculateSubsidy engine", () => {
  it("residential 3 kWp gets ₹78,000 central subsidy", () => {
    const result = calculateSubsidy("residential", 3);
    expect(result.centralSubsidyINR).toBe(78000);
    expect(result.subsidyEligible).toBe(true);
    expect(result.applicableSchemes.length).toBeGreaterThan(0);
  });

  it("commercial gets no central subsidy but AD scheme", () => {
    const result = calculateSubsidy("commercial", 50);
    expect(result.centralSubsidyINR).toBe(0);
    expect(result.applicableSchemes.some((s) => s.includes("Accelerated Depreciation"))).toBe(true);
  });

  it("industrial gets no central subsidy", () => {
    const result = calculateSubsidy("industrial", 100);
    expect(result.centralSubsidyINR).toBe(0);
  });

  it("subsidy is never negative", () => {
    const result = calculateSubsidy("residential", 0.5);
    expect(result.totalSubsidyINR).toBeGreaterThanOrEqual(0);
  });
});

describe("Odisha state additional subsidy", () => {
  it.each([[1, 25000], [2, 50000], [3, 60000], [5, 60000], [10, 60000], [0, 0]])(
    "%s kWp → ₹%s",
    (kwp, expected) => {
      expect(computeOdishaStateSubsidy(kwp).stateSubsidyINR).toBe(expected);
    },
  );

  it("residential 3 kWp: central ₹78,000 + state ₹60,000 = ₹1,38,000", () => {
    const r = calculateSubsidy("residential", 3);
    expect(r.centralSubsidyINR).toBe(78000);
    expect(r.stateSubsidyINR).toBe(60000);
    expect(r.totalSubsidyINR).toBe(138000);
    expect(r.applicableSchemes.some((s) => s.includes("Odisha"))).toBe(true);
  });

  it("commercial and industrial get no state top-up", () => {
    expect(calculateSubsidy("commercial", 3).stateSubsidyINR).toBe(0);
    expect(calculateSubsidy("industrial", 3).stateSubsidyINR).toBe(0);
  });
});
