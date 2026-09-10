/**
 * Confidence Engine
 * Assigns a confidence level to the calculation based on input quality.
 */

import type { CalculatorInput, ConfidenceResult } from "./types";

export function calculateConfidence(
  input: CalculatorInput,
  locationMatched: boolean
): ConfidenceResult {
  const reasons: string[] = [];
  let score = 100;

  // Input mode deductions
  if (input.inputMode === "bill") {
    score -= 20;
    reasons.push(
      "Consumption estimated from electricity bill. Bills include fixed charges and taxes " +
        "that are not directly proportional to energy use."
    );
  } else if (input.inputMode === "appliances") {
    score -= 35;
    reasons.push(
      "Consumption estimated from appliance list. Rated wattage differs from actual operating power."
    );
  }

  // Location
  if (!input.location || input.location.trim().length < 3) {
    score -= 15;
    reasons.push("Location not specified. Using Odisha state average solar resource data.");
  } else if (!locationMatched) {
    score -= 8;
    reasons.push("Location could not be matched to a district. Using Odisha state average.");
  }

  // Roof area
  if (input.roofAreaM2 === null) {
    score -= 10;
    reasons.push("Rooftop area not provided. Roof feasibility not assessed.");
  }

  // Shading
  if (input.shading === "unknown") {
    score -= 5;
    reasons.push("Shading not specified. Using conservative default assumption.");
  } else if (input.shading === "high") {
    score -= 5;
    reasons.push("High shading reported. Site assessment strongly recommended before system design.");
  }

  // Daytime usage
  if (input.daytimeUsage === "unknown") {
    score -= 5;
    reasons.push("Daytime usage profile not specified. Using moderate self-consumption assumption.");
  }

  // Sanctioned load unknown
  if (input.sanctionedLoadKW === null) {
    score -= 5;
    reasons.push("Sanctioned load not provided. Regulatory limit based on typical value for property type.");
  }

  const clampedScore = Math.max(0, Math.min(100, score));

  const level =
    clampedScore >= 75 ? "high" : clampedScore >= 50 ? "medium" : "low";

  return { level, score: clampedScore, reasons };
}
