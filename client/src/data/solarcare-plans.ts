export interface SolarCarePlan {
  id: string;
  name: string;
  duration: string;
  description: string;
}

/**
 * Authoritative SolarCare AMC Plans for Fivefold Renewable.
 * Source: Client-approved Fivefold Website Details (3) document (Pages 10–11).
 * 
 * Note: AMC scope and pricing must be confirmed with Fivefold Renewable before publication.
 */
export const SOLARCARE_PLANS: SolarCarePlan[] = [
  {
    id: "essential",
    name: "SolarCare Essential",
    duration: "1 Year",
    description: "Routine preventive maintenance and inspection support.",
  },
  {
    id: "plus",
    name: "SolarCare Plus",
    duration: "3 Years",
    description: "Extended maintenance support with enhanced monitoring and priority service.",
  },
  {
    id: "premium",
    name: "SolarCare Premium",
    duration: "5 Years",
    description: "Comprehensive preventive maintenance, cleaning, diagnostics and priority support.",
  },
  {
    id: "elite",
    name: "SolarCare Elite",
    duration: "10 Years",
    description: "Long-term maintenance support with technical consultation, health audits and dedicated service support.",
  },
];

// Backwards-compatible export for any existing references
export const SOLARCARE_COMPARISON_PLANS: SolarCarePlan[] = SOLARCARE_PLANS;
