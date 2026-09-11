export interface SolarCarePlan {
  id: string;
  name: string;
  duration: string;
  price?: string; // Optional - no prices hardcoded until client confirms pricing
  badge?: string;
  description: string;
  features: string[];
  recommendedFor: string;
}

export const SOLARCARE_PLANS: SolarCarePlan[] = [
  {
    id: "essential",
    name: "Essential",
    duration: "1 Year Coverage",
    description: "Foundational maintenance package ensuring basic system health and routine cleaning schedule.",
    features: [
      "2 Scheduled Preventive Maintenance Visits / Year",
      "Quarterly Module Cleaning Protocol",
      "Visual Electrical & Structure Inspection",
      "Inverter Health & Diagnostics Check",
      "Basic Phone & Email Technical Support",
    ],
    recommendedFor: "Residential Systems (< 10 kWp)",
  },
  {
    id: "plus",
    name: "Plus",
    duration: "3 Years Coverage",
    badge: "Popular for Homes",
    description: "Comprehensive multi-year maintenance with remote generation diagnostics and priority support.",
    features: [
      "3 Scheduled Preventive Maintenance Visits / Year",
      "Bi-Monthly Module Cleaning Schedule",
      "Thermal Imaging Hotspot Inspection",
      "Remote Performance & Generation Telemetry Analysis",
      "Priority Dispatch for Technical Faults",
      "DISCOM Net Metering Compliance Inspection",
    ],
    recommendedFor: "Large Residential & Small Commercial",
  },
  {
    id: "premium",
    name: "Premium",
    duration: "5 Years Coverage",
    badge: "Recommended Commercial",
    description: "Full-scale O&M management featuring predictive maintenance, earthing audits, and component warranty claims.",
    features: [
      "4 Scheduled Preventive Maintenance Visits / Year",
      "Monthly Professional Panel Cleaning Protocol",
      "Full Thermal & String IV-Curve Diagnostic Audit",
      "Earthing Resistance & Lightning Protection Testing",
      "OEM Inverter & Module Warranty Claim Handling",
      "Monthly Detailed Energy Generation Performance Report",
    ],
    recommendedFor: "Commercial Facilities & Institutions",
  },
  {
    id: "elite",
    name: "Elite",
    duration: "10 Years Coverage",
    badge: "Industrial Standard",
    description: "Enterprise 10-year asset lifecycle protection with dedicated site engineer oversight and SCADA integration.",
    features: [
      "Custom High-Frequency Preventive Maintenance Calendar",
      "Bi-Weekly Professional De-ionized Module Wash",
      "Continuous SCADA & IoT Telemetry Monitoring",
      "Comprehensive Substation & Transformer Inspection",
      "Dedicated Asset Lifecycle Optimization Engineer",
      "Guaranteed Response SLA for Unplanned Downtime",
    ],
    recommendedFor: "Industrial Enterprises & MW-Scale Plants",
  },
];
