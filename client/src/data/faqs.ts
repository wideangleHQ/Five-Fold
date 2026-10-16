import { COMPANY_CONTACT } from "@/lib/company";
import { inr, subsidyAtCapacity } from "@/data/government-schemes";

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

/**
 * Authoritative Frequently Asked Questions (FAQ) for Fivefold Renewable.
 * Source: Client-approved Fivefold Website Details (3) document.
 */
export const FAQS_DATA: FAQItem[] = [
  {
    id: "faq-1",
    question: "How much can I save with rooftop solar?",
    answer:
      "Your savings depend on electricity consumption, system capacity, tariff, rooftop conditions and system generation. A properly designed solar system can significantly reduce your dependence on grid electricity and monthly electricity expenses.",
  },
  {
    id: "faq-2",
    question: "Do you provide subsidy assistance?",
    answer:
      "Yes. Fivefold assists eligible residential customers with the applicable PM Surya Ghar Muft Bijli Yojana process and related documentation.",
  },
  {
    id: "faq-3",
    question: "How long does solar installation take?",
    answer:
      "Installation timelines depend on system size, site conditions, approvals, material availability and project requirements.",
  },
  {
    id: "faq-4",
    question: "Do solar panels work during cloudy weather?",
    answer:
      "Yes. Solar panels can continue generating electricity during cloudy conditions, although generation may be lower than under clear-sky conditions.",
  },
  {
    id: "faq-5",
    question: "What maintenance does a solar system require?",
    answer:
      "Regular cleaning, preventive inspection and performance monitoring help maintain system efficiency and reliability.",
  },
  {
    id: "faq-6",
    question: "Do you provide net metering support?",
    answer:
      "Yes. Fivefold provides support for the applicable net metering process.",
  },
  {
    id: "faq-7",
    question: "What is a rooftop solar system?",
    answer:
      "A rooftop solar system uses photovoltaic panels on your roof or terrace to convert sunlight into electricity. An inverter converts it to the AC power your building uses, and the system is connected to your existing electrical supply.",
  },
  {
    id: "faq-8",
    question: "How does a grid-connected rooftop solar system work?",
    answer:
      "The panels generate electricity during the day and your building uses it first. Surplus can be exported to the grid, and when generation is low you draw from the grid as usual. Export is recorded through a net meter installed by your DISCOM.",
  },
  {
    id: "faq-9",
    question: "What is the difference between on-grid, off-grid and hybrid solar systems?",
    answer:
      "An on-grid system works together with the DISCOM grid and does not need batteries. An off-grid system works independently with batteries. A hybrid system is grid-connected and also has batteries for backup. PM Surya Ghar subsidy applies to grid-connected residential systems.",
  },
  {
    id: "faq-10",
    question: "How much rooftop space is needed for solar panels?",
    answer:
      "As a planning figure, about 10 square metres of shadow-free roof is needed per kW of solar capacity. Usable area is smaller than the total roof because of water tanks, staircases, parapets and walkways, so a site assessment gives the actual figure.",
  },
  {
    id: "faq-11",
    question: "How do I decide the right solar capacity for my property?",
    answer:
      "Capacity depends on your monthly electricity consumption, usable roof area, shading, sanctioned load and how much of your consumption you want solar to offset. Our Smart Solar Calculator gives a preliminary estimate, which our engineers then verify on site.",
  },
  {
    id: "faq-12",
    question: "What information is needed to estimate a solar system?",
    answer:
      "Your recent electricity bills or monthly units, your location, the approximate shadow-free roof area and any shading from buildings or trees. You can also estimate consumption from your appliances in the Smart Solar Calculator.",
  },
  {
    id: "faq-13",
    question: "How does the rooftop assessment work?",
    answer:
      "Our engineers check the roof structure, usable area, orientation and shading, and review the electrical connection and transformer load. These findings are used to size and design the system before approvals or installation begin.",
  },
  {
    id: "faq-14",
    question: "What factors affect solar generation?",
    answer:
      "Location and sunlight, roof orientation and tilt, shading, panel and inverter quality, dust and cleaning, temperature and system design all affect generation. Output also varies by season, so estimates are indicative rather than guaranteed.",
  },
  {
    id: "faq-15",
    question: "What factors determine the cost of a rooftop solar installation?",
    answer:
      "System capacity, panel and inverter selection, roof type and mounting structure, cable and electrical work, DISCOM and net metering requirements and site access all influence cost. A site assessment is needed for an accurate quotation.",
  },
  {
    id: "faq-16",
    question: "Is financing available for solar installations?",
    answer:
      "Banks offer finance for residential rooftop solar, including under PM Surya Ghar. Availability, interest rate and terms are decided by the lender, so please confirm them with your bank. Our team can explain the process during your consultation.",
  },
  {
    id: "faq-17",
    question: "How can I estimate my potential electricity bill savings?",
    answer:
      "Use the Smart Solar Calculator on this website. It estimates system size, annual generation and savings from your consumption and location. Actual savings depend on your tariff, usage pattern and system performance.",
  },
  {
    id: "faq-18",
    question: "Are there government subsidies for eligible residential rooftop solar systems?",
    answer: `Yes. Under PM Surya Ghar: Muft Bijli Yojana, eligible households receive central assistance of ₹30,000 per kW for the first 2 kW and ₹18,000 for the third kW, which is ${inr(subsidyAtCapacity(3).central)} at 3 kW. There is no additional central assistance above 3 kW. Odisha has also announced additional state assistance for eligible households.`,
  },
  {
    id: "faq-19",
    question: "Who may qualify for PM Surya Ghar assistance?",
    answer:
      "Residential households that own a house with a suitable roof, have a valid residential electricity connection, install a grid-connected system through a registered vendor using domestic-content modules, and have not already availed a solar subsidy. The government scheme rules decide final eligibility.",
  },
  {
    id: "faq-20",
    question: "Is additional Odisha State assistance available?",
    answer: `Odisha has announced additional state assistance for households installing rooftop solar under PM Surya Ghar: ₹25,000 for each of the first 2 kW and ₹10,000 for the third kW, up to ${inr(subsidyAtCapacity(3).state)}. We could not verify the official notification, so please confirm current availability and process with OREDA or your DISCOM.`,
  },
  {
    id: "faq-21",
    question: "How can I verify my eligibility and apply for the subsidy?",
    answer:
      "Register on the official portal (pmsuryaghar.gov.in) with your DISCOM and consumer number, apply, choose a registered vendor, complete installation, net metering and DISCOM inspection, obtain the commissioning certificate and submit your bank details. Fivefold can guide you through each step.",
  },
  {
    id: "faq-22",
    question: "Does every solar installation qualify for a subsidy?",
    answer:
      "No. PM Surya Ghar subsidy is for eligible residential households. Commercial, industrial and institutional installations are not covered by it, and a residential system must also meet the scheme requirements. Approval and disbursement are decided by the authorities.",
  },
  {
    id: "faq-23",
    question: "Can solar panels be installed on an existing building?",
    answer:
      "Usually yes, subject to a structural and shading assessment. Different roof types can often be used with a suitable mounting structure; the site assessment confirms what is practical for your building.",
  },
  {
    id: "faq-24",
    question: "What is SolarCare maintenance (AMC) support?",
    answer:
      "SolarCare is the Fivefold maintenance programme for installed solar systems, covering preventive inspection, cleaning and performance monitoring. Details of the available plans are on the SolarCare page.",
  },
  {
    id: "faq-25",
    question: "What happens if my solar system develops a fault?",
    answer:
      "Contact Fivefold and our team will help diagnose the issue. Faults can come from the inverter, wiring, panels or the grid connection, and equipment warranties are provided by the respective manufacturers.",
  },
  {
    id: "faq-26",
    question: "How can I contact Fivefold for a site assessment or consultation?",
    answer: `Use the Contact Us page, call ${COMPANY_CONTACT.phoneDisplay} or ${COMPANY_CONTACT.secondaryPhoneDisplay}, or message us on WhatsApp using the button on every page. Our team will arrange a consultation and site assessment.`,
  },
];
