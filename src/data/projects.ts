export type ProjectCategory = "Industrial" | "Commercial" | "Institutional" | "Government";

export interface Project {
  id: string;
  name: string;
  client: string;
  location: string;
  capacity: string;
  category: ProjectCategory;
  image: string;
  description: string;
  published: boolean;
  highlights?: string[];
}

/**
 * Projects data layer.
 * CRITICAL GOVERNANCE RULE: Only projects with published === true may reach the UI.
 * Filter is strictly enforced at the data accessor layer (getPublishedProjects).
 */
export const PROJECTS_DATA: Project[] = [
  // Representative EPC Reference Installations (Published with permission)
  {
    id: "industrial-rooftop-odisha-1",
    name: "Industrial Rooftop Solar Plant",
    client: "Manufacturing Enterprise",
    location: "Kalinganagar, Odisha",
    capacity: "1,200 kWp",
    category: "Industrial",
    image: "https://images.unsplash.com/photo-1509391365360-2e959784a276?q=80&w=1200&auto=format&fit=crop",
    description: "High-yield industrial rooftop PV installation engineered with 3D shadow analysis, custom mounting structures for high wind load, and real-time SCADA integration.",
    published: true,
    highlights: ["3D Shadow Analysis", "Custom Structural Design", "SCADA Integration"],
  },
  {
    id: "commercial-complex-bhubaneswar",
    name: "Commercial Complex Solar System",
    client: "Commercial Hub",
    location: "Bhubaneswar, Odisha",
    capacity: "350 kWp",
    category: "Commercial",
    image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=80&w=1200&auto=format&fit=crop",
    description: "Bankable rooftop solar plant integrated with net metering, reducing daytime grid dependence by over 75%.",
    published: true,
    highlights: ["Net Metering Approved", "Tier-1 Mono PERC Panels", "Zero Export Controller"],
  },
  {
    id: "institutional-campus-solar",
    name: "Institutional Campus Solar Project",
    client: "Educational Institution",
    location: "Cuttack, Odisha",
    capacity: "250 kWp",
    category: "Institutional",
    image: "https://images.unsplash.com/photo-1613665813446-82a78c468a1d?q=80&w=1200&auto=format&fit=crop",
    description: "Turnkey solar EPC including feasibility report, structural grid verification, and DISCOM grid synchronization.",
    published: true,
    highlights: ["Turnkey Execution", "DISCOM Grid Sync", "Preventive O&M Package"],
  },
  {
    id: "govt-building-solar",
    name: "Government Facility Rooftop Plant",
    client: "Public Sector Facility",
    location: "Bhadrak, Odisha",
    capacity: "150 kWp",
    category: "Government",
    image: "https://images.unsplash.com/photo-1548337138-e87d889cc369?q=80&w=1200&auto=format&fit=crop",
    description: "State government rooftop solar project compliant with DISCOM technical guidelines and net metering norms.",
    published: true,
    highlights: ["Strict SOP Compliance", "DISCOM Inspection Passed", "Remote Monitoring"],
  },

  // Reference data from brief - Kept published: false until client publication permission is explicitly granted
  {
    id: "gsi-bhubaneswar",
    name: "GSI Rooftop Solar",
    client: "GSI",
    location: "Bhubaneswar, Odisha",
    capacity: "98 kWp",
    category: "Institutional",
    image: "https://images.unsplash.com/photo-1509391365360-2e959784a276?q=80&w=1200&auto=format&fit=crop",
    description: "98 kWp Rooftop Solar Installation.",
    published: false,
  },
  {
    id: "rmnh-bhubaneswar",
    name: "RMNH Rooftop Solar",
    client: "RMNH",
    location: "Bhubaneswar, Odisha",
    capacity: "200 kWp",
    category: "Institutional",
    image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=80&w=1200&auto=format&fit=crop",
    description: "200 kWp Rooftop Solar Installation.",
    published: false,
  },
  {
    id: "loyola-bhubaneswar",
    name: "Loyola School Solar",
    client: "Loyola School",
    location: "Bhubaneswar, Odisha",
    capacity: "99.84 kWp",
    category: "Institutional",
    image: "https://images.unsplash.com/photo-1613665813446-82a78c468a1d?q=80&w=1200&auto=format&fit=crop",
    description: "99.84 kWp Rooftop Solar Installation.",
    published: false,
  },
  {
    id: "mindtree-bhubaneswar",
    name: "Mind Tree Solar Installation",
    client: "Mind Tree",
    location: "Bhubaneswar, Odisha",
    capacity: "550.5 kWp",
    category: "Commercial",
    image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=80&w=1200&auto=format&fit=crop",
    description: "550.5 kWp Commercial Solar System.",
    published: false,
  },
  {
    id: "mcc-hyderabad",
    name: "MCC Rooftop Solar",
    client: "MCC",
    location: "Hyderabad",
    capacity: "512 kWp",
    category: "Commercial",
    image: "https://images.unsplash.com/photo-1509391365360-2e959784a276?q=80&w=1200&auto=format&fit=crop",
    description: "512 kWp Commercial Solar System.",
    published: false,
  },
  {
    id: "iocl-malda",
    name: "IOCL Solar Project",
    client: "IOCL",
    location: "Malda",
    capacity: "100 kWp",
    category: "Industrial",
    image: "https://images.unsplash.com/photo-1548337138-e87d889cc369?q=80&w=1200&auto=format&fit=crop",
    description: "100 kWp Industrial Solar Installation.",
    published: false,
  },
  {
    id: "jindal-wb",
    name: "Jindal Industrial Solar",
    client: "Jindal",
    location: "West Bengal",
    capacity: "1,980 kWp",
    category: "Industrial",
    image: "https://images.unsplash.com/photo-1509391365360-2e959784a276?q=80&w=1200&auto=format&fit=crop",
    description: "1,980 kWp Industrial Rooftop Solar Plant.",
    published: false,
  },
  {
    id: "iocl-paradip",
    name: "IOCL Paradip Solar",
    client: "IOCL",
    location: "Paradip, Odisha",
    capacity: "110 kWp",
    category: "Industrial",
    image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=80&w=1200&auto=format&fit=crop",
    description: "110 kWp Industrial Solar Installation.",
    published: false,
  },
  {
    id: "pepsico-hyderabad",
    name: "Pepsico Facility Solar",
    client: "Pepsico",
    location: "Hyderabad",
    capacity: "244.5 kWp",
    category: "Industrial",
    image: "https://images.unsplash.com/photo-1613665813446-82a78c468a1d?q=80&w=1200&auto=format&fit=crop",
    description: "244.5 kWp Industrial Rooftop System.",
    published: false,
  },
];

/**
 * Single function to retrieve published projects only.
 * NEVER bypass this function to ensure unpublished projects are never exposed.
 */
export function getPublishedProjects(category?: ProjectCategory | "All"): Project[] {
  const published = PROJECTS_DATA.filter((p) => p.published === true);
  if (!category || category === "All") {
    return published;
  }
  return published.filter((p) => p.category === category);
}
