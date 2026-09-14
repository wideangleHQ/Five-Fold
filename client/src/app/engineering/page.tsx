import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Compass,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Cpu,
  Layers,
  Wrench,
  Activity,
  Gauge,
  FileText,
  Search,
  SunMedium,
  TrendingUp,
  AlertTriangle,
  PackageCheck,
  ClipboardCheck,
  Binary,
  GitBranch,
  Building2,
  MapPin,
  PhoneCall,
  Zap,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { constructMetadata } from "@/lib/seo";
import { EngineeringJourneyInteractive } from "@/components/engineering/EngineeringJourneyInteractive";
import {
  PRE_CONSTRUCTION_STEPS,
  EXECUTION_STEPS,
  QUALITY_STEPS,
} from "@/data/engineering";
import { PerformanceFormula } from "@/components/engineering/PerformanceFormula";
import heroBgImg from "@/assets/Images/hero section background.png";

export const metadata: Metadata = constructMetadata({
  title: "Engineering Capability | Solar Performance Starts Before Installation",
  description:
    "Fivefold engineers solar systems for performance, reliability and long-term operation. Explore our 3-phase engineering methodology: Pre-Construction, Execution, and Quality.",
  path: "/engineering",
});

// Approved engineering proof projects
const PROOF_PROJECTS = [
  {
    client: "GSI",
    location: "Bhubaneswar",
    capacity: "98 kWp",
    type: "Institutional",
    engineeringHighlight: "Custom Rooftop Layout & DISCOM Compliance",
  },
  {
    client: "RMNH",
    location: "Bhubaneswar",
    capacity: "200 kWp",
    type: "Institutional",
    engineeringHighlight: "3D Shadow Analysis & Net Metering Integration",
  },
  {
    client: "Loyola School",
    location: "Bhubaneswar",
    capacity: "99.84 kWp",
    type: "Institutional",
    engineeringHighlight: "Structural Wind-Load Verification & High-Safety BoM",
  },
  {
    client: "Mind Tree",
    location: "Bhubaneswar",
    capacity: "550.5 kWp",
    type: "Commercial",
    engineeringHighlight: "PVsyst Yield Simulation & Zero-Export Control",
  },
];

export default function EngineeringPage() {
  return (
    <div className="pt-20 sm:pt-24 lg:pt-28 pb-0 bg-[#F6F3EC] text-[#173B53] font-sans">
      
      {/* ========================================================================= */}
      {/* 01 — ENGINEERING HERO                                                     */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white border-b border-[#DCE2E2] relative overflow-hidden">
        <div className="w-full max-w-7xl lg:max-w-[1780px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div data-reveal="group" className="max-w-4xl space-y-5 sm:space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <span
                data-reveal="eyebrow"
                className="text-xs font-mono font-bold uppercase tracking-wider text-[#1684C7] block"
              >
                • ENGINEERING CAPABILITY
              </span>
              <span className="hidden sm:inline-block text-[#DCE2E2]">•</span>
              <span
                data-reveal="eyebrow"
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F6F3EC] border border-[#DCE2E2] text-xs font-mono font-semibold text-[#173B53]"
              >
                <Compass className="h-3.5 w-3.5 text-[#1684C7]" />
                Technical Rigor & EPC Standards
              </span>
            </div>

            <h1
              data-reveal="heading"
              className="font-heading text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-[#173B53] tracking-tight leading-[1.06]"
            >
              Engineering Before Installation.
            </h1>

            <p
              data-reveal="paragraph"
              className="font-sans text-[#526673] text-base sm:text-lg lg:text-xl leading-relaxed max-w-3xl pt-1"
            >
              Fivefold approaches every solar project through engineering first — understanding the site, analysing energy requirements, designing the system, validating performance and executing with quality and traceability.
            </p>

            <div
              data-reveal="paragraph"
              className="p-4 sm:p-5 rounded-xl bg-[#F6F3EC] border-l-4 border-[#1684C7] text-xs sm:text-sm font-medium text-[#173B53] max-w-2xl"
            >
              From feasibility to performance assurance, every project is engineered with purpose.
            </div>

            <div data-reveal="cta" className="flex flex-wrap items-center gap-3.5 pt-3">
              <Button href="/contact" variant="primary" size="md">
                <span>Discuss My Project</span>
                <ArrowRight className="ml-1.5 h-4 w-4" />
              </Button>
              <Button href="/projects" variant="outline" size="md">
                <span>Explore Our Projects</span>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 02 — THE ENGINEERING DIFFERENCE                                           */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-20 lg:py-24 bg-[#F6F3EC] border-b border-[#DCE2E2]">
        <div className="w-full max-w-7xl lg:max-w-[1780px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          
          <div data-reveal="group" className="max-w-3xl space-y-4 mb-12 sm:mb-16">
            <h2
              data-reveal="heading"
              className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#173B53] tracking-tight leading-[1.12]"
            >
              Solar Performance Starts Before Installation.
            </h2>
            <p
              data-reveal="paragraph"
              className="font-sans text-[#526673] text-base sm:text-lg leading-relaxed"
            >
              A solar system is not defined only by the panels installed on a roof. Its performance depends on how well the site is understood, how accurately the system is designed, how risks are evaluated and how carefully the project is executed. Fivefold brings these decisions together through an engineering-led process.
            </p>
          </div>

          {/* 3 Editorial Principles */}
          <div
            data-reveal="cards-container"
            className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8"
          >
            {/* Principle 01 */}
            <div
              data-reveal="card"
              className="bg-white border border-[#DCE2E2] rounded-2xl p-7 sm:p-8 flex flex-col justify-between shadow-sm relative overflow-hidden group hover:border-[#1684C7] transition-all duration-300"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-[#1684C7] tracking-wider uppercase bg-[#F6F3EC] px-3 py-1 rounded-full">
                    PRINCIPLE 01
                  </span>
                  <Search className="h-5 w-5 text-[#8A9EA7] group-hover:text-[#1684C7] transition-colors" />
                </div>
                <h3 className="font-heading text-xl sm:text-2xl font-bold text-[#173B53] tracking-tight">
                  Understand the Site
                </h3>
                <p className="font-sans text-sm sm:text-base text-[#526673] leading-relaxed">
                  Every project begins with understanding the physical site, energy requirement and operating conditions.
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-[#DCE2E2]/60 font-mono text-xs text-[#8A9EA7]">
                Spatial & Solar Assessment
              </div>
            </div>

            {/* Principle 02 */}
            <div
              data-reveal="card"
              className="bg-white border border-[#DCE2E2] rounded-2xl p-7 sm:p-8 flex flex-col justify-between shadow-sm relative overflow-hidden group hover:border-[#1684C7] transition-all duration-300"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-[#1684C7] tracking-wider uppercase bg-[#F6F3EC] px-3 py-1 rounded-full">
                    PRINCIPLE 02
                  </span>
                  <Cpu className="h-5 w-5 text-[#8A9EA7] group-hover:text-[#1684C7] transition-colors" />
                </div>
                <h3 className="font-heading text-xl sm:text-2xl font-bold text-[#173B53] tracking-tight">
                  Engineer the System
                </h3>
                <p className="font-sans text-sm sm:text-base text-[#526673] leading-relaxed">
                  System configuration, layout, generation modelling and project economics are evaluated before execution.
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-[#DCE2E2]/60 font-mono text-xs text-[#8A9EA7]">
                Simulation & Bankable DPR
              </div>
            </div>

            {/* Principle 03 */}
            <div
              data-reveal="card"
              className="bg-white border border-[#DCE2E2] rounded-2xl p-7 sm:p-8 flex flex-col justify-between shadow-sm relative overflow-hidden group hover:border-[#1684C7] transition-all duration-300"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-[#1684C7] tracking-wider uppercase bg-[#F6F3EC] px-3 py-1 rounded-full">
                    PRINCIPLE 03
                  </span>
                  <CheckCircle2 className="h-5 w-5 text-[#8A9EA7] group-hover:text-[#1684C7] transition-colors" />
                </div>
                <h3 className="font-heading text-xl sm:text-2xl font-bold text-[#173B53] tracking-tight">
                  Deliver for Performance
                </h3>
                <p className="font-sans text-sm sm:text-base text-[#526673] leading-relaxed">
                  Engineering, procurement, installation, commissioning and quality assurance work together to create a dependable system.
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-[#DCE2E2]/60 font-mono text-xs text-[#8A9EA7]">
                Traceable Field Execution
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 03 — THE PROJECT ENGINEERING JOURNEY                                      */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white border-b border-[#DCE2E2]">
        <div className="w-full max-w-7xl lg:max-w-[1780px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          
          <div data-reveal="group" className="max-w-3xl space-y-4 mb-12 sm:mb-16">
            <h2
              data-reveal="heading"
              className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#173B53] tracking-tight leading-[1.12]"
            >
              From Site Assessment to Performance Assurance.
            </h2>
            <p
              data-reveal="paragraph"
              className="font-sans text-[#526673] text-base sm:text-lg leading-relaxed"
            >
              A structured engineering journey connects every critical decision — from the first feasibility assessment to final commissioning and long-term performance.
            </p>
          </div>

          {/* Interactive Centrepiece */}
          <EngineeringJourneyInteractive />

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 04 — PRE-CONSTRUCTION                                                     */}
      {/* ========================================================================= */}
      <section
        id="pre-construction"
        className="py-16 sm:py-20 lg:py-24 bg-[#F6F3EC] border-b border-[#DCE2E2] scroll-mt-24"
      >
        <div className="w-full max-w-7xl lg:max-w-[1780px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          
          <div data-reveal="group" className="max-w-3xl space-y-4 mb-12 sm:mb-16">
            <span
              data-reveal="eyebrow"
              className="text-xs font-mono font-bold uppercase tracking-wider text-[#1684C7] block"
            >
              01 — PRE-CONSTRUCTION
            </span>
            <h2
              data-reveal="heading"
              className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#173B53] tracking-tight leading-[1.12]"
            >
              Understand Before We Build.
            </h2>
            <p
              data-reveal="paragraph"
              className="font-sans text-[#526673] text-base sm:text-lg leading-relaxed"
            >
              The strongest solar projects begin with decisions made before installation. Fivefold evaluates the site, system requirements, expected generation, project economics and potential risks before execution begins.
            </p>
          </div>

          {/* 7 Sequence Steps */}
          <div
            data-reveal="cards-container"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6"
          >
            {PRE_CONSTRUCTION_STEPS.map((step, idx) => {
              const IconComp = step.icon;
              return (
                <div
                  key={step.num}
                  data-reveal="card"
                  className={`bg-white border border-[#DCE2E2] rounded-2xl p-6 flex flex-col justify-between shadow-sm hover:border-[#1684C7] transition-all duration-300 ${
                    idx === PRE_CONSTRUCTION_STEPS.length - 1 ? "sm:col-span-2 lg:col-span-3 xl:col-span-1" : ""
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-extrabold text-[#1684C7] bg-[#F6F3EC] px-2.5 py-1 rounded-md">
                        {step.num}
                      </span>
                      <IconComp className="h-5 w-5 text-[#8A9EA7]" />
                    </div>
                    <div>
                      <h3 className="font-heading text-lg font-bold text-[#173B53] tracking-tight">
                        {step.name}
                      </h3>
                      <span className="font-mono text-[11px] text-[#8A9EA7] block mt-0.5">
                        {step.tagline}
                      </span>
                    </div>
                    <p className="font-sans text-xs sm:text-sm text-[#526673] leading-relaxed pt-1">
                      {step.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 05 — ENGINEERING & EXECUTION                                              */}
      {/* ========================================================================= */}
      <section
        id="execution"
        className="py-16 sm:py-20 lg:py-24 bg-white border-b border-[#DCE2E2] scroll-mt-24"
      >
        <div className="w-full max-w-7xl lg:max-w-[1780px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          
          <div data-reveal="group" className="max-w-3xl space-y-4 mb-12 sm:mb-16">
            <span
              data-reveal="eyebrow"
              className="text-xs font-mono font-bold uppercase tracking-wider text-[#1684C7] block"
            >
              02 — EXECUTION
            </span>
            <h2
              data-reveal="heading"
              className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#173B53] tracking-tight leading-[1.12]"
            >
              Engineering Becomes Execution.
            </h2>
            <p
              data-reveal="paragraph"
              className="font-sans text-[#526673] text-base sm:text-lg leading-relaxed"
            >
              Once the system is engineered, the project moves from design to disciplined execution. Each stage is connected to the engineering decisions made during planning.
            </p>
          </div>

          {/* 5 Connected Execution Steps */}
          <div
            data-reveal="cards-container"
            className="grid grid-cols-1 md:grid-cols-5 gap-4 lg:gap-5"
          >
            {EXECUTION_STEPS.map((step, idx) => {
              const IconComp = step.icon;
              return (
                <div
                  key={step.num}
                  data-reveal="card"
                  className="bg-[#F6F3EC] border border-[#DCE2E2] rounded-2xl p-6 flex flex-col justify-between relative group hover:bg-white hover:border-[#1684C7] transition-all duration-300"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-extrabold text-[#1684C7] bg-white px-2.5 py-1 rounded-md border border-[#DCE2E2]">
                        0{idx + 1}
                      </span>
                      <IconComp className="h-5 w-5 text-[#8A9EA7] group-hover:text-[#1684C7] transition-colors" />
                    </div>
                    <div>
                      <h3 className="font-heading text-base sm:text-lg font-bold text-[#173B53] tracking-tight">
                        {step.name}
                      </h3>
                      <span className="font-mono text-[10.5px] text-[#8A9EA7] block mt-0.5">
                        {step.tagline}
                      </span>
                    </div>
                    <p className="font-sans text-xs sm:text-sm text-[#526673] leading-relaxed">
                      {step.desc}
                    </p>
                  </div>

                  <div className="mt-6 pt-3 border-t border-[#DCE2E2]/60 flex items-center justify-between text-[11px] font-mono text-[#8A9EA7]">
                    <span>Stage Handover</span>
                    <ArrowRight className="h-3.5 w-3.5 text-[#1684C7]" />
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 06 — QUALITY & TRACEABILITY                                               */}
      {/* ========================================================================= */}
      <section
        id="quality"
        className="py-16 sm:py-20 lg:py-24 bg-[#F6F3EC] border-b border-[#DCE2E2] scroll-mt-24"
      >
        <div className="w-full max-w-7xl lg:max-w-[1780px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          
          <div data-reveal="group" className="max-w-3xl space-y-4 mb-12 sm:mb-16">
            <span
              data-reveal="eyebrow"
              className="text-xs font-mono font-bold uppercase tracking-wider text-[#1684C7] block"
            >
              03 — QUALITY
            </span>
            <h2
              data-reveal="heading"
              className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#173B53] tracking-tight leading-[1.12]"
            >
              Quality Is Part of the Engineering.
            </h2>
            <p
              data-reveal="paragraph"
              className="font-sans text-[#526673] text-base sm:text-lg leading-relaxed"
            >
              A well-designed system still depends on the quality of its components, execution and documentation. Fivefold&apos;s engineering approach carries through to quality control and traceability.
            </p>
          </div>

          {/* 5 Quality Pillars */}
          <div
            data-reveal="cards-container"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 lg:gap-5"
          >
            {QUALITY_STEPS.map((step) => {
              const IconComp = step.icon;
              return (
                <div
                  key={step.num}
                  data-reveal="card"
                  className="bg-white border border-[#DCE2E2] rounded-2xl p-6 flex flex-col justify-between shadow-sm hover:border-[#1684C7] transition-all duration-300"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-extrabold text-[#1684C7] bg-[#F6F3EC] px-2.5 py-1 rounded-md">
                        {step.num}
                      </span>
                      <IconComp className="h-5 w-5 text-[#8A9EA7]" />
                    </div>
                    <div>
                      <h3 className="font-heading text-base sm:text-lg font-bold text-[#173B53] tracking-tight">
                        {step.name}
                      </h3>
                      <span className="font-mono text-[10.5px] text-[#8A9EA7] block mt-0.5">
                        {step.tagline}
                      </span>
                    </div>
                    <p className="font-sans text-xs sm:text-sm text-[#526673] leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 07 — PERFORMANCE & VALIDATION                                             */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-20 lg:py-24 bg-[#173B53] text-white relative overflow-hidden border-b border-[#0D2232]">
        <div className="w-full max-w-7xl lg:max-w-[1780px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          
          <div data-reveal="group" className="max-w-3xl space-y-4 mb-12 sm:mb-16">
            <span
              data-reveal="eyebrow"
              className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 block"
            >
              • PERFORMANCE & VALIDATION
            </span>
            <h2
              data-reveal="heading"
              className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.12]"
            >
              Designed for Performance. Built for the Real Site.
            </h2>
            <p
              data-reveal="paragraph"
              className="font-sans text-slate-300 text-base sm:text-lg leading-relaxed"
            >
              Engineering is valuable when it connects design intent with real-world performance.
            </p>
          </div>

          {/* Connected Formula Visual */}
          <PerformanceFormula />

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 08 — ENGINEERING AT SCALE                                                 */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-20 lg:py-24 bg-[#F6F3EC] border-b border-[#DCE2E2]">
        <div className="w-full max-w-7xl lg:max-w-[1780px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          
          <div data-reveal="group" className="max-w-3xl space-y-4 mb-12 sm:mb-16">
            <h2
              data-reveal="heading"
              className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#173B53] tracking-tight leading-[1.12]"
            >
              Experience That Scales From Site to System.
            </h2>
            <p
              data-reveal="paragraph"
              className="font-sans text-[#526673] text-base sm:text-lg leading-relaxed"
            >
              Fivefold&apos;s engineering experience spans rooftop solar projects across commercial, industrial and institutional applications.
            </p>
          </div>

          {/* 5 Approved Fivefold Credentials */}
          <div
            data-reveal="cards-container"
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6"
          >
            {/* Metric 1 */}
            <div
              data-reveal="card"
              className="bg-white border border-[#DCE2E2] rounded-2xl p-6 sm:p-7 text-left space-y-2 shadow-sm hover:border-[#1684C7] transition-all"
            >
              <div className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#173B53] tracking-tight">
                10+
              </div>
              <div className="font-heading text-sm sm:text-base font-bold text-[#1684C7]">
                Years
              </div>
              <div className="font-sans text-xs sm:text-sm text-[#526673] pt-1">
                Renewable Energy Experience
              </div>
            </div>

            {/* Metric 2 */}
            <div
              data-reveal="card"
              className="bg-white border border-[#DCE2E2] rounded-2xl p-6 sm:p-7 text-left space-y-2 shadow-sm hover:border-[#1684C7] transition-all"
            >
              <div className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#173B53] tracking-tight">
                20+
              </div>
              <div className="font-heading text-sm sm:text-base font-bold text-[#1684C7]">
                MW
              </div>
              <div className="font-sans text-xs sm:text-sm text-[#526673] pt-1">
                Installed
              </div>
            </div>

            {/* Metric 3 */}
            <div
              data-reveal="card"
              className="bg-white border border-[#DCE2E2] rounded-2xl p-6 sm:p-7 text-left space-y-2 shadow-sm hover:border-[#1684C7] transition-all"
            >
              <div className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#173B53] tracking-tight">
                30+
              </div>
              <div className="font-heading text-sm sm:text-base font-bold text-[#1684C7]">
                Projects
              </div>
              <div className="font-sans text-xs sm:text-sm text-[#526673] pt-1">
                Delivered
              </div>
            </div>

            {/* Metric 4 */}
            <div
              data-reveal="card"
              className="bg-white border border-[#DCE2E2] rounded-2xl p-6 sm:p-7 text-left space-y-2 shadow-sm hover:border-[#1684C7] transition-all"
            >
              <div className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#173B53] tracking-tight">
                800+
              </div>
              <div className="font-heading text-sm sm:text-base font-bold text-[#1684C7]">
                MW
              </div>
              <div className="font-sans text-xs sm:text-sm text-[#526673] pt-1">
                Engineering Experience
              </div>
            </div>

            {/* Metric 5 */}
            <div
              data-reveal="card"
              className="col-span-2 md:col-span-1 bg-white border border-[#DCE2E2] rounded-2xl p-6 sm:p-7 text-left space-y-2 shadow-sm hover:border-[#1684C7] transition-all"
            >
              <div className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#173B53] tracking-tight">
                10+
              </div>
              <div className="font-heading text-sm sm:text-base font-bold text-[#1684C7]">
                States
              </div>
              <div className="font-sans text-xs sm:text-sm text-[#526673] pt-1">
                Engineering Reach
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 09 — PROJECT PROOF                                                        */}
      {/* ========================================================================= */}
      <section
        id="project-proof"
        className="py-16 sm:py-20 lg:py-24 bg-white border-b border-[#DCE2E2] scroll-mt-24"
      >
        <div className="w-full max-w-7xl lg:max-w-[1780px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          
          <div data-reveal="group" className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
            <div className="max-w-3xl space-y-3">
              <h2
                data-reveal="heading"
                className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#173B53] tracking-tight leading-[1.12]"
              >
                Engineering in the Real World.
              </h2>
              <p
                data-reveal="paragraph"
                className="font-sans text-[#526673] text-base sm:text-lg leading-relaxed"
              >
                The engineering approach is reflected in projects delivered across institutional, commercial and industrial environments.
              </p>
            </div>
            
            <div data-reveal="cta" className="flex-shrink-0">
              <Button href="/projects" variant="outline" size="md">
                <span>View All Projects</span>
                <ArrowRight className="ml-1.5 h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* 4 Approved Case References */}
          <div
            data-reveal="cards-container"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {PROOF_PROJECTS.map((proj) => (
              <div
                key={proj.client}
                data-reveal="card"
                className="bg-[#F6F3EC] border border-[#DCE2E2] rounded-2xl p-6 sm:p-7 flex flex-col justify-between group hover:bg-white hover:border-[#1684C7] shadow-sm transition-all duration-300"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-[#1684C7] uppercase bg-white px-2.5 py-1 rounded-md border border-[#DCE2E2]">
                      {proj.type}
                    </span>
                    <Building2 className="h-4 w-4 text-[#8A9EA7]" />
                  </div>

                  <div>
                    <h3 className="font-heading text-xl font-bold text-[#173B53] tracking-tight">
                      {proj.client}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-[#8A9EA7] font-sans mt-1">
                      <MapPin className="h-3.5 w-3.5 text-[#1684C7]" />
                      <span>{proj.location}</span>
                      <span>·</span>
                      <span className="font-mono font-bold text-[#173B53]">{proj.capacity}</span>
                    </div>
                  </div>

                  <p className="font-sans text-xs text-[#526673] leading-relaxed pt-2 border-t border-[#DCE2E2]/60">
                    {proj.engineeringHighlight}
                  </p>
                </div>

                <div className="mt-6 pt-3 flex items-center justify-between text-xs font-mono text-[#1684C7] group-hover:translate-x-0.5 transition-transform">
                  <span>Engineered EPC</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 10 — FINAL CTA                                                            */}
      {/* ========================================================================= */}
      <section className="bg-[#F6F3EC] py-12 sm:py-16 lg:py-20 font-sans relative z-10">
        <div className="w-full max-w-7xl lg:max-w-[1780px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="relative rounded-[2.5rem] sm:rounded-[3.5rem] bg-[#173B53] text-white overflow-hidden shadow-2xl border border-[#173B53] py-16 sm:py-20 lg:py-24">
            
            {/* Background image overlay */}
            <div className="absolute inset-0 z-0">
              <Image
                src={heroBgImg}
                alt="Solar plant background"
                fill
                sizes="100vw"
                className="object-cover object-center opacity-15"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#173B53]/50 to-[#173B53]/95" />
            </div>

            <Container className="relative z-10 text-center max-w-3xl mx-auto space-y-6 sm:space-y-8">
              <div data-reveal="group" className="space-y-6 sm:space-y-8">
                <h2
                  data-reveal="heading"
                  className="font-heading text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.05]"
                >
                  Have a Complex Solar Requirement?
                </h2>

                <p
                  data-reveal="paragraph"
                  className="font-sans text-slate-200 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto leading-relaxed"
                >
                  Talk to Fivefold about your site, energy requirement and project objectives. Our team can help take the requirement from assessment to engineered solution.
                </p>

                <div data-reveal="cta" className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-2">
                  <Button
                    href="/contact"
                    variant="primary"
                    className="w-full sm:w-auto bg-white hover:bg-slate-100 text-[#173B53] px-8 py-4 text-sm font-sans font-semibold rounded-lg shadow-md transition-all"
                  >
                    <span>Discuss My Project</span>
                  </Button>

                  <a
                    href="tel:+917008101078"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg border border-white/30 hover:border-white/60 text-white font-sans text-sm font-semibold transition-all"
                  >
                    <PhoneCall className="h-4 w-4 text-cyan-400" />
                    <span>Get a Free Consultation</span>
                  </a>
                </div>
              </div>
            </Container>

          </div>
        </div>
      </section>

    </div>
  );
}
