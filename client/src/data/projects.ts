export type ProjectCategory = "Industrial" | "Commercial" | "Institutional" | "Government";

export interface Project {
  id: string;
  name: string;
  location: string;
  capacity: string;
  category: ProjectCategory;
  image?: string;
  published: boolean;
  publishApproved: boolean;
  description?: string;
}

/**
 * Authoritative Projects Dataset for Fivefold Renewable.
 * Source: Client-approved Fivefold Website Details (2) document (Pages 8–10).
 * 
 * CRITICAL GOVERNANCE RULES:
 * 1. Only records with published === true AND publishApproved === true are rendered.
 * 2. Capacities, locations, and client project names must match verified client credentials.
 * 3. Separate locations (e.g. H.T. Media Ranchi/Patna/Mohali, MCC Moosapet/Jalandhar) are preserved as distinct records.
 */
export const PROJECTS_DATA: Project[] = [
  // 1. Initial Representative Set (Deterministic Showcase)
  {
    id: "jindal-jangalpur-wb",
    name: "Jindal, India",
    location: "Jangalpur, West Bengal",
    capacity: "1,980 kWp",
    category: "Industrial",
    published: true,
    publishApproved: true,
  },
  {
    id: "pepsico-hyderabad",
    name: "Pepsico, Hyderabad",
    location: "Hyderabad",
    capacity: "244.5 kWp",
    category: "Commercial",
    published: true,
    publishApproved: true,
  },
  {
    id: "loyola-school-bhubaneswar",
    name: "Loyola School",
    location: "Bhubaneswar, Odisha",
    capacity: "99.84 kWp",
    category: "Institutional",
    published: true,
    publishApproved: true,
  },
  {
    id: "iocl-paradip-odisha",
    name: "IOCL, Paradip",
    location: "Odisha",
    capacity: "110 kWp",
    category: "Government",
    published: true,
    publishApproved: true,
  },

  // 2. Industrial Projects
  {
    id: "ajanta-pharma-guwahati",
    name: "Ajanta Pharma",
    location: "Guwahati, Assam",
    capacity: "955 kWp",
    category: "Industrial",
    published: true,
    publishApproved: true,
  },
  {
    id: "roca-alwar-rajasthan",
    name: "ROCA",
    location: "Alwar, Rajasthan",
    capacity: "843.2 kWp",
    category: "Industrial",
    published: true,
    publishApproved: true,
  },
  {
    id: "seigwerk-bhiwadi",
    name: "Seigwerk",
    location: "Bhiwadi, Rajasthan",
    capacity: "542 kWp",
    category: "Industrial",
    published: true,
    publishApproved: true,
  },
  {
    id: "toshiba-india-patancheru",
    name: "Toshiba India",
    location: "Patancheru, Telangana",
    capacity: "473 kWp",
    category: "Industrial",
    published: true,
    publishApproved: true,
  },
  {
    id: "sage-metal-ghaziabad",
    name: "Sage Metal",
    location: "Sahibabad, Ghaziabad",
    capacity: "347 kWp",
    category: "Industrial",
    published: true,
    publishApproved: true,
  },
  {
    id: "pigeon-india-noida",
    name: "Pigeon India",
    location: "Noida, Uttar Pradesh",
    capacity: "310 kWp",
    category: "Industrial",
    published: true,
    publishApproved: true,
  },

  // 3. Commercial Projects
  {
    id: "mcc-moosapet-hyderabad",
    name: "MCC, Moosapet",
    location: "Hyderabad",
    capacity: "512 kWp",
    category: "Commercial",
    published: true,
    publishApproved: true,
  },
  {
    id: "ht-media-patna",
    name: "H.T. Media",
    location: "Patna, Bihar",
    capacity: "311 kWp",
    category: "Commercial",
    published: true,
    publishApproved: true,
  },
  {
    id: "ht-media-mohali",
    name: "H.T. Media",
    location: "Mohali, Chandigarh",
    capacity: "177 kWp",
    category: "Commercial",
    published: true,
    publishApproved: true,
  },
  {
    id: "ht-media-ranchi",
    name: "H.T. Media",
    location: "Ranchi, Jharkhand",
    capacity: "143 kWp",
    category: "Commercial",
    published: true,
    publishApproved: true,
  },
  {
    id: "mcc-jalandhar-punjab",
    name: "MCC",
    location: "Jalandhar, Punjab",
    capacity: "100 kWp",
    category: "Commercial",
    published: true,
    publishApproved: true,
  },
  {
    id: "decathlon-omr-chennai",
    name: "Decathlon – OMR",
    location: "Chennai",
    capacity: "90 kWp",
    category: "Commercial",
    published: true,
    publishApproved: true,
  },
  {
    id: "decathlon-nashik",
    name: "Decathlon – Nashik",
    location: "Nashik",
    capacity: "65 kWp",
    category: "Commercial",
    published: true,
    publishApproved: true,
  },

  // 4. Institutional Projects
  {
    id: "mind-tree-bhubaneswar",
    name: "Mind Tree",
    location: "Bhubaneswar, Odisha",
    capacity: "550.5 kWp",
    category: "Institutional",
    published: true,
    publishApproved: true,
  },
  {
    id: "seit-koraput",
    name: "SEIT",
    location: "Koraput",
    capacity: "550.5 kWp",
    category: "Institutional",
    published: true,
    publishApproved: true,
  },
  {
    id: "nalco-research-centre-dhenkanal",
    name: "Nalco Research Centre",
    location: "Dhenkanal, Odisha",
    capacity: "512 kWp",
    category: "Institutional",
    published: true,
    publishApproved: true,
  },
  {
    id: "rmnh-bhubaneswar",
    name: "RMNH",
    location: "Bhubaneswar, Odisha",
    capacity: "200 kWp",
    category: "Institutional",
    published: true,
    publishApproved: true,
  },
  {
    id: "gsi-bhubaneswar",
    name: "GSI",
    location: "Bhubaneswar, Odisha",
    capacity: "98 kWp",
    category: "Institutional",
    published: true,
    publishApproved: true,
  },

  // 5. Government Projects
  {
    id: "geological-survey-india-bhubaneswar",
    name: "Geological Survey of India",
    location: "Bhubaneswar, Odisha",
    capacity: "200 kWp",
    category: "Government",
    published: true,
    publishApproved: true,
  },
  {
    id: "iocl-malda-wb",
    name: "IOCL, Malda",
    location: "West Bengal",
    capacity: "100 kWp",
    category: "Government",
    published: true,
    publishApproved: true,
  },
  {
    id: "iocl-raniganj-wb",
    name: "IOCL, Raniganj",
    location: "West Bengal",
    capacity: "100 kWp",
    category: "Government",
    published: true,
    publishApproved: true,
  },
  {
    id: "202-cobra-battalion-bhubaneswar",
    name: "202 Cobra Battalion",
    location: "Bhubaneswar, Odisha",
    capacity: "99.84 kWp",
    category: "Government",
    published: true,
    publishApproved: true,
  },
  {
    id: "cpwd-nirman-bhawan-bhubaneswar",
    name: "CPWD – Nirman Bhawan",
    location: "Bhubaneswar, Odisha",
    capacity: "98 kWp",
    category: "Government",
    published: true,
    publishApproved: true,
  },
];

/**
 * Retrieves published & approved project credentials.
 * Strictly enforces governance filtering so unapproved/unpublished projects are never exposed.
 */
export function getPublishedProjects(category?: ProjectCategory | "All"): Project[] {
  const published = PROJECTS_DATA.filter((p) => p.published === true && p.publishApproved === true);
  if (!category || category === "All") {
    return published;
  }
  return published.filter((p) => p.category === category);
}
