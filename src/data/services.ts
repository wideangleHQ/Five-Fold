export interface ServiceItem {
  id: string;
  number: string;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  targetAudience: string;
  image: string;
  includedFeatures: string[];
  ctaText: string;
}

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: "residential-solar",
    number: "01",
    slug: "residential-rooftop-solar",
    title: "Residential Rooftop Solar",
    shortDescription: "Turn your rooftop into a clean power plant. Slash household electricity bills with custom-engineered solar solutions.",
    fullDescription: "Custom-engineered rooftop solar solutions for Odisha homeowners. We provide comprehensive site assessment, 3D shadow mapping, DISCOM net metering approval, Tier-1 hardware installation, and government subsidy assistance (PM Surya Ghar).",
    targetAudience: "Homeowners & Residential Societies",
    image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=80&w=1000&auto=format&fit=crop",
    includedFeatures: [
      "Roof Load & Shadow Feasibility Assessment",
      "Tier-1 Mono-PERC / Bifacial Panels",
      "PM Surya Ghar Scheme Documentation & Portal Application",
      "DISCOM Inspection & Net Metering Synchronization",
      "Comprehensive System Warranty Support",
    ],
    ctaText: "Explore Residential Solar",
  },
  {
    id: "commercial-solar",
    number: "02",
    slug: "commercial-solar",
    title: "Commercial Solar Solutions",
    shortDescription: "Reduce operational expenses for offices, hospitals, hotels, and schools with high-yield commercial solar systems.",
    fullDescription: "Bankable solar installations designed for commercial properties. Offset daytime peak energy tariffs, accelerate tax depreciation benefits (Section 32 of IT Act), and achieve environmental sustainability compliance.",
    targetAudience: "Offices, Retail Hubs, Hospitals, Hotels & Educational Institutions",
    image: "https://images.unsplash.com/photo-1613665813446-82a78c468a1d?q=80&w=1000&auto=format&fit=crop",
    includedFeatures: [
      "Load Profile & Energy Consumption Analytics",
      "Bankable Detailed Project Report (DPR)",
      "Zero Export Controller & Grid Protection Interlocks",
      "Custom Mounting & Roof Penetration Seals",
      "Remote Performance Monitoring Dashboard",
    ],
    ctaText: "Request Commercial Proposal",
  },
  {
    id: "industrial-solar",
    number: "03",
    slug: "industrial-solar",
    title: "Industrial Solar EPC",
    shortDescription: "Engineering-led MW-scale solar EPC for factories and manufacturing plants, optimized for generation, safety, and 25+ year lifespan.",
    fullDescription: "High-capacity rooftop and ground-mounted solar plants engineered specifically for manufacturing and industrial facilities. Built on rigorous PVsyst yield simulation, high-wind structural engineering, third-party QA, and zero-downtime execution.",
    targetAudience: "Factories, Processing Plants, Warehouses & Industrial Estates",
    image: "https://images.unsplash.com/photo-1509391365360-2e959784a276?q=80&w=1000&auto=format&fit=crop",
    includedFeatures: [
      "PVsyst 3D Yield Simulation & Loss Diagram",
      "Structural Steel & Wind-Load Resistance Analysis",
      "HT/LT Substation Interconnection & Grid Approval",
      "Third-Party Quality Assurance & Cable Traceability",
      "Preventive & Predictive Asset Lifecyle O&M",
    ],
    ctaText: "Talk to Industrial Solar Engineers",
  },
  {
    id: "solar-maintenance",
    number: "04",
    slug: "solar-system-maintenance",
    title: "Solar System Maintenance",
    shortDescription: "Comprehensive O&M and SolarCare AMC to protect system yield, inverter health, earthing, and maximum solar ROI.",
    fullDescription: "Professional operation & maintenance services for existing solar power plants. Our engineering team conducts thermal imaging diagnostics, string performance audits, panel cleaning protocols, and electrical safety inspections.",
    targetAudience: "All Solar System Owners (Residential, Commercial, Industrial)",
    image: "https://images.unsplash.com/photo-1548337138-e87d889cc369?q=80&w=1000&auto=format&fit=crop",
    includedFeatures: [
      "Preventive Maintenance Inspection Protocols",
      "Thermal Imaging Hotspot Diagnostics",
      "De-ionized Panel Cleaning & Soil Remediation",
      "Inverter Health & Earthing Resistance Checks",
      "Lightning Protection & Cable Integrity Audits",
    ],
    ctaText: "Explore SolarCare Plans",
  },
];
