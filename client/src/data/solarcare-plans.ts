export interface SolarCarePlanTier {
  id: string;
  name: string;
  duration: string;
  subtitle: string;
}

export interface SolarCarePlan {
  id: string;
  name: string;
  duration: string;
  badge?: string;
  description: string;
  featureHeader: string;
  features: string[];
  recommendedFor: string;
  tiers: SolarCarePlanTier[];
}

export const SOLARCARE_COMPARISON_PLANS: SolarCarePlan[] = [
  {
    id: "essential",
    name: "Essential",
    duration: "1 Year Coverage",
    description: "Ideal for residential rooftops and small installations requiring standard maintenance and routine upkeep.",
    featureHeader: "Key Features",
    features: [
      "2 Scheduled preventive maintenance visits / year",
      "Quarterly module cleaning protocol",
      "Visual electrical & mounting structure check",
      "Inverter health & error log diagnostics",
      "Standard phone & email technical support",
    ],
    recommendedFor: "Residential Systems (< 10 kWp)",
    tiers: [
      {
        id: "essential-1yr",
        name: "Standard Annual",
        duration: "1 Year Coverage",
        subtitle: "Routine preventive maintenance & cleaning",
      },
      {
        id: "essential-2yr",
        name: "Extended Term",
        duration: "2 Years Coverage",
        subtitle: "Bi-annual health check & yield optimization",
      },
    ],
  },
  {
    id: "plus",
    name: "Plus",
    duration: "3 Years Coverage",
    badge: "MOST POPULAR",
    description: "For residential properties and businesses that need telemetry diagnostics, thermal scans, and priority support.",
    featureHeader: "Everything in Essential, with",
    features: [
      "3 Scheduled preventive maintenance visits / year",
      "Bi-monthly professional module cleaning",
      "Thermal imaging hotspot inspection",
      "Remote SCADA telemetry & yield analysis",
      "Priority dispatch for technical faults",
      "DISCOM net-metering compliance inspection",
    ],
    recommendedFor: "Large Residential & Commercial Hubs",
    tiers: [
      {
        id: "plus-3yr",
        name: "Recommended 3-Year",
        duration: "3 Years Coverage",
        subtitle: "Telemetry analysis & priority dispatch SLA",
      },
      {
        id: "plus-5yr",
        name: "Comprehensive 5-Year",
        duration: "5 Years Coverage",
        subtitle: "Extended multi-year generation assurance",
      },
    ],
  },
  {
    id: "pro",
    name: "Pro Enterprise",
    duration: "5–10 Years Coverage",
    badge: "ENTERPRISE & MW",
    description: "For commercial facilities and MW-scale industrial plants requiring dedicated asset engineers and strict SLAs.",
    featureHeader: "Everything in Plus, with",
    features: [
      "4+ High-frequency preventive visits / year",
      "Monthly de-ionized water module wash",
      "Full string IV-curve & EL diagnostic audit",
      "Substation, transformer & earthing testing",
      "Dedicated asset lifecycle optimization engineer",
      "Guaranteed response SLA for downtime",
    ],
    recommendedFor: "Industrial Facilities & MW-Scale Plants",
    tiers: [
      {
        id: "pro-5yr",
        name: "Enterprise 5-Year",
        duration: "5 Years Coverage",
        subtitle: "Turnkey C&I operations & warranty claims",
      },
      {
        id: "pro-10yr",
        name: "Lifecycle 10-Year",
        duration: "10 Years Coverage",
        subtitle: "Full SCADA integration & 25-yr performance",
      },
    ],
  },
];

// Backwards-compatible export for any legacy consumers
export const SOLARCARE_PLANS: SolarCarePlan[] = SOLARCARE_COMPARISON_PLANS;
