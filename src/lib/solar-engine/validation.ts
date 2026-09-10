import type { CalculatorInput, ValidationResult } from "./types";

export function validateCalculatorInput(input: CalculatorInput): ValidationResult {
  const errors: { field: string; message: string }[] = [];
  const warnings: string[] = [];

  // Input mode and consumption
  if (input.inputMode === "bill") {
    if (input.monthlyBillINR === null || input.monthlyBillINR <= 0) {
      errors.push({ field: "monthlyBillINR", message: "Monthly electricity bill must be a positive number." });
    } else if (input.monthlyBillINR < 50) {
      warnings.push("Monthly bill seems very low. Please verify the amount.");
    } else if (input.monthlyBillINR > 500000) {
      warnings.push("Monthly bill is very high. Ensure this is a monthly figure, not annual.");
    }
  } else if (input.inputMode === "consumption") {
    if (input.monthlyConsumptionKWh === null || input.monthlyConsumptionKWh <= 0) {
      errors.push({ field: "monthlyConsumptionKWh", message: "Monthly consumption must be a positive number (kWh/units)." });
    } else if (input.monthlyConsumptionKWh < 10) {
      warnings.push("Monthly consumption appears very low. Verify this is in kWh (units), not kWp.");
    } else if (input.monthlyConsumptionKWh > 100000) {
      errors.push({ field: "monthlyConsumptionKWh", message: "Monthly consumption value is unrealistically high. Please check the unit." });
    }
  } else if (input.inputMode === "appliances") {
    if (!input.appliances) {
      errors.push({ field: "appliances", message: "Appliance list is required for appliance-based estimation." });
    }
  }

  // Location
  if (!input.location || input.location.trim().length < 3) {
    warnings.push("Location not specified. Using Odisha state average solar data.");
  }

  // Roof area
  if (input.roofAreaM2 !== null) {
    if (input.roofAreaM2 <= 0) {
      errors.push({ field: "roofAreaM2", message: "Rooftop area must be a positive number." });
    } else if (input.roofAreaM2 < 5) {
      warnings.push("Rooftop area is very small. Minimum practical area for solar is around 10 m².");
    } else if (input.roofAreaM2 > 10000) {
      warnings.push("Rooftop area is very large. Verify this is in square metres, not square feet.");
    }
  }

  // Target offset
  if (input.targetOffset <= 0 || input.targetOffset > 1) {
    errors.push({ field: "targetOffset", message: "Target offset must be between 1% and 100%." });
  }

  // Sanctioned load (optional but warn if negative)
  if (input.sanctionedLoadKW !== null && input.sanctionedLoadKW <= 0) {
    errors.push({ field: "sanctionedLoadKW", message: "Sanctioned load must be a positive number if specified." });
  }

  return { valid: errors.length === 0, errors, warnings };
}

/** Guard against NaN/Infinity/negative in a numeric result. */
export function safeNumber(value: number, fallback: number = 0): number {
  if (!isFinite(value) || isNaN(value) || value < 0) return fallback;
  return value;
}

/** Round to a given number of decimal places. */
export function round(value: number, decimals: number = 2): number {
  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
}

/** Round system capacity to nearest 0.5 kWp (commercial standard). */
export function roundToCommercialKWp(kWp: number): number {
  return Math.ceil(kWp * 2) / 2;
}
