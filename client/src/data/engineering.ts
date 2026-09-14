import {
  Search,
  SunMedium,
  Layers,
  BarChart3,
  FileText,
  TrendingUp,
  AlertTriangle,
  Cpu,
  PackageCheck,
  Wrench,
  Gauge,
  CheckCircle2,
  ShieldCheck,
  ClipboardCheck,
  Binary,
  GitBranch,
} from "lucide-react";

export interface EngineeringStepItem {
  num: string;
  name: string;
  tagline: string;
  desc: string;
  icon: any;
}

export const PRE_CONSTRUCTION_STEPS: EngineeringStepItem[] = [
  {
    num: "01",
    name: "Feasibility",
    tagline: "Site & Energy Suitability",
    desc: "Understand whether the site, energy requirement and project conditions support the proposed solar system.",
    icon: Search,
  },
  {
    num: "02",
    name: "Shadow Analysis",
    tagline: "Year-Round Solar Window",
    desc: "Evaluate potential shading conditions that may influence system layout and generation.",
    icon: SunMedium,
  },
  {
    num: "03",
    name: "3D Layout",
    tagline: "Spatial & Structural Placement",
    desc: "Develop the physical system layout around available space, equipment positioning and site conditions.",
    icon: Layers,
  },
  {
    num: "04",
    name: "PVsyst",
    tagline: "Yield & Loss Simulation",
    desc: "Model expected system performance and generation based on the proposed design.",
    icon: BarChart3,
  },
  {
    num: "05",
    name: "DPR",
    tagline: "Detailed Project Report",
    desc: "Bring the technical and project requirements together into a structured Detailed Project Report.",
    icon: FileText,
  },
  {
    num: "06",
    name: "Financial Modelling",
    tagline: "CAPEX & Return Economics",
    desc: "Evaluate the relationship between system investment, generation and expected project returns.",
    icon: TrendingUp,
  },
  {
    num: "07",
    name: "Risk Review",
    tagline: "Mitigation & Technical Verification",
    desc: "Identify important technical, site and execution risks before moving into implementation.",
    icon: AlertTriangle,
  },
];

export const EXECUTION_STEPS: EngineeringStepItem[] = [
  {
    num: "01",
    name: "Engineering",
    tagline: "Design to Shop Drawings",
    desc: "Translate the approved design into an executable project.",
    icon: Cpu,
  },
  {
    num: "02",
    name: "Procurement",
    tagline: "Tier-1 Component Coordination",
    desc: "Coordinate the required components and project requirements around the engineered system.",
    icon: PackageCheck,
  },
  {
    num: "03",
    name: "Installation",
    tagline: "Field Deployment & Assembly",
    desc: "Execute the physical installation according to the project design and site requirements.",
    icon: Wrench,
  },
  {
    num: "04",
    name: "Commissioning",
    tagline: "System Checks & Energisation",
    desc: "Complete system checks and prepare the installed system for operation.",
    icon: Gauge,
  },
  {
    num: "05",
    name: "Performance Assurance",
    tagline: "Operational Benchmark Testing",
    desc: "Verify that the completed system is aligned with the intended design and performance objectives.",
    icon: CheckCircle2,
  },
];

export const QUALITY_STEPS: EngineeringStepItem[] = [
  {
    num: "01",
    name: "Tier-1 Components",
    tagline: "Verified Bill of Materials",
    desc: "Component selection aligned with project requirements and system design.",
    icon: ShieldCheck,
  },
  {
    num: "02",
    name: "QA",
    tagline: "Multi-Stage Checkpoints",
    desc: "Quality checks throughout the project lifecycle.",
    icon: ClipboardCheck,
  },
  {
    num: "03",
    name: "Testing",
    tagline: "Pre-Handover Verification",
    desc: "Verify critical aspects of the completed installation before handover.",
    icon: Gauge,
  },
  {
    num: "04",
    name: "Documentation",
    tagline: "Comprehensive Technical Records",
    desc: "Maintain the technical record required to understand and support the project.",
    icon: Binary,
  },
  {
    num: "05",
    name: "Traceability",
    tagline: "Connected Decision Trail",
    desc: "Create a clear connection between project decisions, components, testing and documentation.",
    icon: GitBranch,
  },
];
