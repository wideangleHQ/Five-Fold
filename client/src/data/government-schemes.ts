import { computePMSuryaGharSubsidy, computeOdishaStateSubsidy } from "@/data/solar/subsidies";

/** Content verified 2026-10-13 against MNRE / PIB material and the Odisha cabinet decision of 3 Jan 2025. */
export const SCHEME_CONTENT_VERIFIED_ON = "13 October 2026";

export const OFFICIAL_LINKS = [
  { label: "PM Surya Ghar: Muft Bijli Yojana (official portal)", href: "https://pmsuryaghar.gov.in" },
  { label: "National Portal for Rooftop Solar (MNRE)", href: "https://solarrooftop.gov.in" },
  { label: "Odisha Rooftop Solar portal", href: "https://rts.odisha.gov.in" },
  { label: "OREDA — Odisha Renewable Energy Development Agency", href: "https://oredaodisha.com" },
] as const;

export const CENTRAL_ELIGIBILITY = [
  "Residential household owning a house with a roof, terrace or elevated area suitable for rooftop solar.",
  "A valid residential electricity connection from the local DISCOM; the application uses your consumer account number.",
  "A grid-connected system installed through a vendor registered on the national portal.",
  "Solar modules must meet the Domestic Content Requirement (DCR), otherwise subsidy is not released.",
  "The household has not already availed a subsidy for solar panels; assistance is given once per installation.",
] as const;

export const ODISHA_ELIGIBILITY = [
  "Residential households installing rooftop solar under PM Surya Ghar: Muft Bijli Yojana.",
  "The state assistance is in addition to the central subsidy for eligible installations.",
  "Availability, funding and procedure are set by the Government of Odisha, OREDA and your DISCOM.",
] as const;

export const NOT_COVERED =
  "These subsidies are for residential households. Commercial, industrial and institutional installations are not eligible for PM Surya Ghar subsidy; they may benefit from other measures such as accelerated depreciation.";

export const APPLICATION_STEPS = [
  "Register on the national portal with your state, DISCOM and consumer account number.",
  "Log in and apply for rooftop solar for your connection.",
  "After feasibility approval, choose a registered vendor and agree the system design and rates.",
  "The vendor installs the system; submit the plant details and apply for the net meter.",
  "The DISCOM installs the net meter and inspects the plant.",
  "Obtain the commissioning certificate from the portal.",
  "Submit your bank details and a cancelled cheque on the portal so the subsidy can be credited.",
] as const;

export const ODISHA_STATUS_NOTE =
  "Announced by the Odisha Cabinet on 3 January 2025. We could not retrieve the official notification text, so please confirm current amounts, availability and process with OREDA or your DISCOM before applying.";

export const SCHEME_DISCLAIMER =
  "Subsidy amounts, eligibility and procedures are set by the Government of India and the Government of Odisha and may change. Approval and disbursement are decided by the authorities and are not guaranteed by Fivefold. Subsidy is a part of, not the whole of, project cost, and a technical site assessment is needed to confirm suitability.";

export const SUBSIDY_CAPACITIES_KWP = [1, 2, 3] as const;

export function subsidyAtCapacity(kwp: number) {
  const central = computePMSuryaGharSubsidy(kwp).centralSubsidyINR;
  const state = computeOdishaStateSubsidy(kwp).stateSubsidyINR;
  return { kwp, central, state, combined: central + state };
}

export const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;
