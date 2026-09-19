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
];
