export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category?: "General" | "Engineering" | "Subsidy" | "Maintenance";
}

export const FAQS_DATA: FAQItem[] = [
  {
    id: "faq-1",
    question: "How much can I save on electricity bills with rooftop solar?",
    answer: "Solar system savings depend on your tariff category, connected load, daytime energy consumption, and available roof space. Solar power substantially reduces grid consumption during peak daytime hours. For a precise calculation tailored to your facility, request an engineering site evaluation.",
    category: "General",
  },
  {
    id: "faq-2",
    question: "Do you provide government subsidy assistance (PM Surya Ghar Scheme)?",
    answer: "Yes, Fivefold provides complete end-to-end documentation, vendor registration verification, and portal application support for PM Surya Ghar Muft Bijli Yojana. Please note that subsidy eligibility and disbursements are subject to prevailing Central and DISCOM government guidelines.",
    category: "Subsidy",
  },
  {
    id: "faq-3",
    question: "How long does installation and commissioning take?",
    answer: "Residential rooftop systems typically take 3 to 7 days for physical installation following feasibility sign-off. Commercial and industrial systems range from 2 to 6 weeks depending on MW capacity, structural complexity, DISCOM approvals, and net metering synchronization.",
    category: "General",
  },
  {
    id: "faq-4",
    question: "Do solar panels generate power during cloudy or rainy weather?",
    answer: "Yes, solar photovoltaic panels utilize diffuse ambient light to generate power even on overcast or rainy days in Odisha. While peak output is highest under direct sunlight, systems continue producing power, and grid-connected net metering ensures uninterrupted electricity supply.",
    category: "Engineering",
  },
  {
    id: "faq-5",
    question: "What routine maintenance does a solar plant require?",
    answer: "Solar systems require regular panel cleaning to prevent dust buildup (soiling losses), periodic inspection of mounting structures, cable connections, inverter health telemetry, and earthing resistance testing. Fivefold offers structured SolarCare O&M plans for long-term health.",
    category: "Maintenance",
  },
  {
    id: "faq-6",
    question: "Do you assist with DISCOM net metering and grid approvals in Odisha?",
    answer: "Yes. Fivefold manages the entire regulatory workflow, including application filing, technical feasibility submission to DISCOM (TPCODL, TPNODL, TPSODL, TPWODL), grid inspection setup, bi-directional net meter installation, and commissioning sign-off.",
    category: "Engineering",
  },
];
