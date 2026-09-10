/**
 * Subsidy Engine
 * Determines applicable government assistance for the recommended system.
 */

import type { PropertyType, SubsidyResult } from "./types";
import { computePMSuryaGharSubsidy, ACCELERATED_DEPRECIATION } from "@/data/solar/subsidies";

export function calculateSubsidy(
  propertyType: PropertyType,
  systemKWp: number
): SubsidyResult {
  const warnings: string[] = [];
  const applicableSchemes: string[] = [];
  let centralSubsidyINR = 0;
  let breakdown = "";

  if (propertyType === "residential") {
    const result = computePMSuryaGharSubsidy(systemKWp);
    centralSubsidyINR = result.centralSubsidyINR;
    breakdown = result.breakdown;
    applicableSchemes.push("PM Surya Ghar Muft Bijli Yojana (Central Subsidy)");
    warnings.push(
      "Central subsidy is disbursed post installation, inspection, and DISCOM approval. " +
        "Subject to scheme fund availability and beneficiary eligibility verification."
    );
  } else {
    breakdown = "Central subsidy (PM Surya Ghar) is applicable to residential consumers only.";
    const adRate = ACCELERATED_DEPRECIATION.rate * 100;
    applicableSchemes.push(`${adRate}% Accelerated Depreciation (IT Act Section 32)`);
    warnings.push(
      `${adRate}% Accelerated Depreciation benefit available for ${propertyType} entities. ` +
        "Actual benefit depends on applicable income tax rate. Consult a tax advisor."
    );
  }

  // State subsidy: Odisha does not currently publish a verified additional state cash subsidy
  // for individual consumers beyond PM Surya Ghar. Flag for verification.
  const stateSubsidyINR = 0;
  if (propertyType === "residential") {
    warnings.push(
      "Odisha state-level additional assistance: verify current scheme status with OREDA " +
        "(https://oreda.in) as state-specific supplements change periodically."
    );
  }

  const totalSubsidyINR = centralSubsidyINR + stateSubsidyINR;

  return {
    centralSubsidyINR,
    stateSubsidyINR,
    totalSubsidyINR,
    subsidyEligible: centralSubsidyINR > 0 || applicableSchemes.length > 0,
    applicableSchemes,
    breakdown,
    warnings,
  };
}
