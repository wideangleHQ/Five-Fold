/**
 * Regulatory Engine
 * Applies OERC net metering rules and DISCOM identification.
 */

import type { CalculatorInput, RegulatoryResult } from "./types";
import { getMaxPermissibleSystemKWp } from "@/data/solar/regulatory";
import { resolveDISCOM, ODISHA_DISCOMS } from "@/data/solar/discom";

export function calculateRegulatory(
  input: CalculatorInput,
  recommendedSystemKWp: number
): RegulatoryResult {
  const warnings: string[] = [];

  const { discom, matched: discomMatched } = resolveDISCOM(input.location);
  const discomInfo = ODISHA_DISCOMS[discom];

  if (!discomMatched) {
    warnings.push(
      "Could not identify your DISCOM from the location provided. " +
        "Net metering application should be submitted to the DISCOM serving your area. " +
        "Contact Fivefold for DISCOM identification assistance."
    );
  }

  const {
    maxKWp: maxPermissibleKWp,
    bindingConstraint,
    warnings: regulatoryWarnings,
  } = getMaxPermissibleSystemKWp(input.propertyType, input.sanctionedLoadKW);

  warnings.push(...regulatoryWarnings);

  const isRegulatoryBinding = recommendedSystemKWp > maxPermissibleKWp;

  if (isRegulatoryBinding) {
    warnings.push(
      `Recommended capacity (${recommendedSystemKWp.toFixed(1)} kWp) exceeds the maximum ` +
        `permissible under OERC net metering rules (${maxPermissibleKWp.toFixed(1)} kWp — ` +
        `limited by ${bindingConstraint}). ` +
        `A higher sanctioned load or separate regulatory assessment may be required.`
    );
  }

  return {
    applicableFramework: "OERC Net Metering Regulations 2023",
    discom,
    discomName: discomInfo?.fullName ?? "Unknown DISCOM",
    discomMatched,
    netMeteringEligible: true, // assume eligible unless disqualifying condition found
    maxPermissibleKWp,
    isRegulatoryBinding,
    warnings,
  };
}
