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
  Calculator,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { constructMetadata } from "@/lib/seo";

// Approved local assets
import stock1Img from "@/assets/Images/Five_Fold_stock_1.png";
import heroBgImg from "@/assets/Images/hero section background.png";

export const metadata: Metadata = constructMetadata({
  title: "About Us | Engineering-Led Solar EPC",
  description:
    "Learn about Fivefold Renewable, an engineering-led solar EPC company with 10+ years of experience, 20+ MW installed, and 800+ MW design and consultation reach.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <div className="pt-20 sm:pt-24 lg:pt-28 pb-0 bg-[#F6F3EC] text-[#173B53] font-sans">
      
      {/* ========================================================================= */}
      {/* 01 — HERO                                                                 */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white border-b border-[#DCE2E2] relative overflow-hidden">
        <div className="w-full max-w-7xl lg:max-w-[1780px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div data-reveal="group" className="max-w-4xl space-y-5 sm:space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <span
                data-reveal="eyebrow"
                className="text-xs font-mono font-bold uppercase tracking-wider text-[#1684C7] block"
              >
                • ABOUT FIVEFOLD
              </span>
              <span className="hidden sm:inline-block text-[#DCE2E2]">•</span>
              <span
                data-reveal="eyebrow"
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F6F3EC] border border-[#DCE2E2] text-xs font-mono font-semibold text-[#173B53]"
              >
                <ShieldCheck className="h-3.5 w-3.5 text-[#1684C7]" />
                10+ Years of Renewable Energy Experience
              </span>
            </div>

            <h1
              data-reveal="heading"
              className="font-heading text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-[#173B53] tracking-tight leading-[1.06]"
            >
              Engineering Solar for a Smarter Future.
            </h1>

            <p
              data-reveal="paragraph"
              className="font-sans text-[#526673] text-base sm:text-lg lg:text-xl leading-relaxed max-w-3xl pt-1"
            >
              Fivefold Renewable is an engineering-led solar EPC company focused on designing, delivering and supporting reliable solar energy systems.
            </p>

            <div data-reveal="cta" className="flex flex-wrap items-center gap-3.5 pt-3">
              <Button href="/engineering" variant="primary" size="md">
                <span>Explore Our Capabilities</span>
                <ArrowRight className="ml-1.5 h-4 w-4" />
              </Button>
              <Button href="/contact" variant="outline" size="md">
                <span>Talk to an Expert</span>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 02 — WHO WE ARE (EDITORIAL SPLIT LAYOUT)                                  */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-20 lg:py-24 bg-[#F6F3EC]">
        <div className="w-full max-w-7xl lg:max-w-[1780px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
            
            {/* Left Column: Heading */}
            <div data-reveal="group" className="lg:col-span-5 space-y-3">
              <span
                data-reveal="eyebrow"
                className="text-xs font-mono font-bold uppercase tracking-wider text-[#1684C7] block"
              >
                • WHO WE ARE
              </span>
              <h2
                data-reveal="heading"
                className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#173B53] tracking-tight leading-[1.1]"
              >
                More Than Solar Installation.
              </h2>
            </div>

            {/* Right Column: Editorial Paragraphs */}
            <div data-reveal="group" className="lg:col-span-7 space-y-5 text-[#526673] text-base sm:text-lg leading-relaxed">
              <p data-reveal="paragraph">
                Fivefold Renewable brings together solar engineering, EPC execution and long-term technical support to create practical solar solutions for residential, commercial and industrial requirements.
              </p>
              <p data-reveal="paragraph">
                Our approach begins with understanding the requirement, evaluating the site and engineering the right system before moving into execution and long-term support.
              </p>
              
              <div data-reveal="card" className="pt-2">
                <div className="inline-flex items-center gap-2 p-3.5 rounded-2xl bg-white border border-[#DCE2E2] shadow-xs text-xs sm:text-sm font-semibold text-[#173B53]">
                  <span className="w-2 h-2 rounded-full bg-[#1684C7]" />
                  <span>Turnkey EPC Execution &amp; Long-Term Performance Focus</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 03 — THE FIVEFOLD JOURNEY (VISUAL TIMELINE PROGRESSION)                   */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white border-y border-[#DCE2E2]">
        <div className="w-full max-w-7xl lg:max-w-[1780px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          
          <div data-reveal="group" className="max-w-3xl mb-12 sm:mb-16 space-y-2.5">
            <span
              data-reveal="eyebrow"
              className="text-xs font-mono font-bold uppercase tracking-wider text-[#1684C7] block"
            >
              • THE FIVEFOLD JOURNEY
            </span>
            <h2
              data-reveal="heading"
              className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#173B53] tracking-tight leading-[1.1]"
            >
              Built on Experience.
            </h2>
            <p
              data-reveal="paragraph"
              className="font-sans text-[#526673] text-sm sm:text-base lg:text-lg leading-relaxed pt-0.5"
            >
              Years of renewable energy experience have shaped an engineering-first approach to solar.
            </p>
          </div>

          {/* Connected Progressive Timeline Grid */}
          <div
            data-reveal="cards-container"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 lg:gap-4 relative"
          >
            {[
              {
                step: "01",
                stat: "2016",
                label: "Solar journey begins",
                detail: "Founded with an engineering-first ethos",
              },
              {
                step: "02",
                stat: "10+ Years",
                label: "Renewable energy experience",
                detail: "Continuous technical leadership",
              },
              {
                step: "03",
                stat: "20+ MW",
                label: "Rooftop installations",
                detail: "Industrial & commercial assets",
              },
              {
                step: "04",
                stat: "30+ Projects",
                label: "Turnkey delivery",
                detail: "Industrial & institutional scale",
              },
              {
                step: "05",
                stat: "800+ MW",
                label: "Design & consultation",
                detail: "Cumulative engineering experience",
              },
              {
                step: "06",
                stat: "10+ States",
                label: "Engineering reach",
                detail: "Multi-region execution footprint",
              },
            ].map((milestone, idx) => (
              <div
                key={idx}
                data-reveal="card"
                className="p-5 sm:p-6 rounded-2xl bg-[#F6F3EC] border border-[#DCE2E2] flex flex-col justify-between space-y-4 hover:border-[#173B53]/40 transition-all duration-300 group"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-[#1684C7]">
                    {milestone.step}
                  </span>
                  <span className="w-2 h-2 rounded-full bg-[#1684C7]/40 group-hover:bg-[#1684C7] transition-colors" />
                </div>
                
                <div className="space-y-1">
                  <div className="font-heading text-2xl xl:text-3xl font-extrabold text-[#173B53] tracking-tight">
                    {milestone.stat}
                  </div>
                  <div className="font-sans text-xs sm:text-sm font-semibold text-[#173B53] leading-snug">
                    {milestone.label}
                  </div>
                  <div className="font-sans text-[11px] text-[#526673] leading-tight pt-1">
                    {milestone.detail}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 04 — EXPERIENCE / CREDENTIALS (LARGE EDITORIAL TYPOGRAPHY & DIVIDERS)     */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-20 lg:py-24 bg-[#F6F3EC]">
        <div className="w-full max-w-7xl lg:max-w-[1780px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          
          <div data-reveal="group" className="max-w-3xl mb-12 sm:mb-16 space-y-2.5">
            <span
              data-reveal="eyebrow"
              className="text-xs font-mono font-bold uppercase tracking-wider text-[#1684C7] block"
            >
              • CREDENTIALS &amp; PROOF
            </span>
            <h2
              data-reveal="heading"
              className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#173B53] tracking-tight leading-[1.1]"
            >
              Experience You Can Measure.
            </h2>
            <p
              data-reveal="paragraph"
              className="font-sans text-[#526673] text-sm sm:text-base lg:text-lg leading-relaxed pt-0.5"
            >
              Our experience spans solar installations, project execution, design, engineering and technical consultation across multiple project types and scales.
            </p>
          </div>

          {/* Clean Editorial Stats Grid with Thin Dividers */}
          <div
            data-reveal="cards-container"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-0 border-y border-[#DCE2E2] divide-y sm:divide-y-0 sm:divide-x divide-[#DCE2E2] bg-white rounded-3xl overflow-hidden shadow-xs"
          >
            {[
              {
                number: "10+",
                unit: "Years",
                title: "Renewable Energy Experience",
                desc: "A decade of engineering discipline",
              },
              {
                number: "20+",
                unit: "MW Installed",
                title: "Industrial & Commercial Rooftop Solar",
                desc: "High-yield power generation assets",
              },
              {
                number: "30+",
                unit: "Projects",
                title: "Industrial & Institutional",
                desc: "Delivered on schedule & budget",
              },
              {
                number: "800+",
                unit: "MW Consultation",
                title: "Design • Engineering • Consultation",
                desc: "Cumulative technical oversight",
              },
              {
                number: "10+",
                unit: "States",
                title: "Engineering Reach",
                desc: "Regional footprint across India",
              },
            ].map((stat, idx) => (
              <div
                key={idx}
                data-reveal="card"
                className="p-6 sm:p-7 lg:p-8 flex flex-col justify-between space-y-4 hover:bg-[#F6F3EC]/50 transition-colors"
              >
                <div>
                  <div className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#173B53] tracking-tight">
                    {stat.number}
                  </div>
                  <div className="font-mono text-xs font-bold text-[#1684C7] uppercase tracking-wider pt-1">
                    {stat.unit}
                  </div>
                </div>

                <div className="space-y-1 border-t border-[#DCE2E2]/60 pt-4">
                  <div className="font-heading text-xs sm:text-sm font-bold text-[#173B53] leading-snug">
                    {stat.title}
                  </div>
                  <div className="font-sans text-[11px] text-[#526673] leading-tight">
                    {stat.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 05 — ENGINEERING-LED PHILOSOPHY (DEEP BRAND PRESENCE: ~30% RATIO)         */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-20 lg:py-24 bg-[#173B53] text-white relative overflow-hidden">
        <div className="w-full max-w-7xl lg:max-w-[1780px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
          
          <div data-reveal="group" className="max-w-3xl mb-12 sm:mb-16 space-y-3">
            <span
              data-reveal="eyebrow"
              className="text-xs font-mono font-bold uppercase tracking-wider text-[#1684C7] block"
            >
              • OUR PHILOSOPHY
            </span>
            <h2
              data-reveal="heading"
              className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.08]"
            >
              Engineering Before Installation.
            </h2>
            <p
              data-reveal="paragraph"
              className="font-sans text-slate-200 text-sm sm:text-base lg:text-lg leading-relaxed pt-0.5"
            >
              We believe a solar system should be designed around the real requirements of the site, the customer and its long-term performance.
            </p>
          </div>

          {/* 3 Concise Principles */}
          <div
            data-reveal="cards-container"
            className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch"
          >
            {[
              {
                num: "01",
                label: "Understand",
                headline: "Start with the requirement.",
                body: "Energy use, available space and site conditions shape the solution.",
                icon: Compass,
              },
              {
                num: "02",
                label: "Engineer",
                headline: "Design for performance.",
                body: "Technical planning and system optimisation guide every major decision.",
                icon: Cpu,
              },
              {
                num: "03",
                label: "Deliver",
                headline: "Build for the long term.",
                body: "Execution, commissioning and ongoing support complete the journey.",
                icon: ShieldCheck,
              },
            ].map((principle) => {
              const Icon = principle.icon;
              return (
                <div
                  key={principle.num}
                  data-reveal="card"
                  className="p-6 sm:p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-300 flex flex-col justify-between space-y-6"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-[#1684C7] px-2.5 py-1 rounded-md bg-white/10">
                        {principle.num} — {principle.label}
                      </span>
                      <Icon className="h-5 w-5 text-[#1684C7]" />
                    </div>

                    <h3 className="font-heading text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug">
                      {principle.headline}
                    </h3>

                    <p className="font-sans text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {principle.body}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-white/10 flex items-center gap-2 text-xs font-mono font-semibold text-slate-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1684C7]" />
                    <span>Principle {principle.num} of 03</span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 06 — HOW WE WORK (HIGH-LEVEL PROCESS VISUALIZATION)                       */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white border-b border-[#DCE2E2]">
        <div className="w-full max-w-7xl lg:max-w-[1780px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          
          <div data-reveal="group" className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 sm:mb-16">
            <div className="max-w-2xl space-y-2.5">
              <span
                data-reveal="eyebrow"
                className="text-xs font-mono font-bold uppercase tracking-wider text-[#1684C7] block"
              >
                • HOW WE WORK
              </span>
              <h2
                data-reveal="heading"
                className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#173B53] tracking-tight leading-[1.1]"
              >
                From Requirement to Reliable Energy.
              </h2>
              <p
                data-reveal="paragraph"
                className="font-sans text-[#526673] text-sm sm:text-base lg:text-lg leading-relaxed pt-0.5"
              >
                From the first assessment to long-term technical support, our approach connects engineering and execution into one continuous process.
              </p>
            </div>

            <div data-reveal="button" className="lg:text-right shrink-0">
              <Link
                href="/engineering"
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#173B53] hover:text-[#1684C7] transition-colors group"
              >
                <span>Explore Engineering Capability</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Clean 5-Step Process Sequence */}
          <div
            data-reveal="cards-container"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4"
          >
            {[
              {
                step: "01",
                action: "Understand",
                target: "Requirement",
                desc: "Load profiling & goals",
              },
              {
                step: "02",
                action: "Assess",
                target: "Site",
                desc: "Roof & shadow analysis",
              },
              {
                step: "03",
                action: "Engineer",
                target: "System",
                desc: "PVsyst yield & SLD drawings",
              },
              {
                step: "04",
                action: "Execute",
                target: "Project",
                desc: "Tier-1 procurement & build",
              },
              {
                step: "05",
                action: "Support",
                target: "Long Term",
                desc: "SolarCare O&M & telemetry",
              },
            ].map((st, idx) => (
              <div
                key={idx}
                data-reveal="card"
                className="p-5 sm:p-6 rounded-2xl bg-[#F6F3EC] border border-[#DCE2E2] flex flex-col justify-between space-y-4 hover:bg-white hover:border-[#173B53]/40 transition-all duration-300"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-[#1684C7] bg-white px-2 py-0.5 rounded border border-[#DCE2E2]">
                    {st.step}
                  </span>
                  {idx < 4 && (
                    <span className="hidden lg:block text-[#DCE2E2] font-mono text-xs">→</span>
                  )}
                </div>

                <div className="space-y-1">
                  <div className="font-heading text-lg font-bold text-[#173B53] leading-tight">
                    {st.action}
                  </div>
                  <div className="font-sans text-xs font-semibold text-[#1684C7]">
                    {st.target}
                  </div>
                  <div className="font-sans text-[11px] text-[#526673] pt-1">
                    {st.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 07 — WHY FIVEFOLD (CONCISE 4 VALUE STATEMENTS)                             */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-20 lg:py-24 bg-[#F6F3EC]">
        <div className="w-full max-w-7xl lg:max-w-[1780px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          
          <div data-reveal="group" className="max-w-3xl mb-12 sm:mb-16 space-y-2.5">
            <span
              data-reveal="eyebrow"
              className="text-xs font-mono font-bold uppercase tracking-wider text-[#1684C7] block"
            >
              • WHY FIVEFOLD
            </span>
            <h2
              data-reveal="heading"
              className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#173B53] tracking-tight leading-[1.1]"
            >
              Why Fivefold?
            </h2>
            <p
              data-reveal="paragraph"
              className="font-sans text-[#526673] text-sm sm:text-base lg:text-lg leading-relaxed pt-0.5"
            >
              Four foundational principles that define our engineering approach and delivery standards.
            </p>
          </div>

          {/* 4 Value Statements Grid */}
          <div
            data-reveal="cards-container"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[
              {
                icon: Cpu,
                title: "Engineering-led",
                text: "Technical thinking comes before installation.",
              },
              {
                icon: Activity,
                title: "Proven experience",
                text: "10+ years of renewable energy experience across multiple project types.",
              },
              {
                icon: Layers,
                title: "End-to-end capability",
                text: "From assessment and engineering to execution and support.",
              },
              {
                icon: ShieldCheck,
                title: "Long-term focus",
                text: "Solutions designed with reliability and performance in mind.",
              },
            ].map((val, idx) => {
              const Icon = val.icon;
              return (
                <div
                  key={idx}
                  data-reveal="card"
                  className="p-6 sm:p-7 rounded-3xl bg-white border border-[#DCE2E2] shadow-xs flex flex-col justify-between space-y-4 hover:border-[#173B53]/40 transition-all duration-300"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F6F3EC] text-[#1684C7] border border-[#DCE2E2]">
                    <Icon className="h-5 w-5" />
                  </div>

                  <div className="space-y-1.5">
                    <h3 className="font-heading text-lg font-bold text-[#173B53]">
                      {val.title}
                    </h3>
                    <p className="font-sans text-xs sm:text-sm text-[#526673] leading-relaxed">
                      {val.text}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 08 — FINAL CTA (CONVERSION-FOCUSED)                                       */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white border-t border-[#DCE2E2]">
        <div className="w-full max-w-7xl lg:max-w-[1780px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="rounded-3xl bg-[#173B53] text-white p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-xl border border-[#173B53]">
            
            {/* Background Texture Overlay */}
            <div className="absolute inset-0 z-0 opacity-15 pointer-events-none">
              <Image
                src={heroBgImg}
                alt="Solar installation background"
                fill
                sizes="100vw"
                className="object-cover object-center"
              />
            </div>

            <div data-reveal="group" className="relative z-10 max-w-3xl space-y-6">
              <span
                data-reveal="eyebrow"
                className="text-xs font-mono font-bold uppercase tracking-wider text-[#1684C7] block"
              >
                • GET STARTED
              </span>

              <h2
                data-reveal="heading"
                className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.08]"
              >
                Let&apos;s Build Solar That Performs.
              </h2>

              <p
                data-reveal="paragraph"
                className="font-sans text-slate-200 text-sm sm:text-base lg:text-lg leading-relaxed"
              >
                Tell us what you&apos;re planning. We&apos;ll help you understand the right path for your solar requirement.
              </p>

              <div data-reveal="cta" className="flex flex-wrap items-center gap-4 pt-2">
                <Button href="/contact" variant="amber" size="md">
                  <span>Talk to an Expert</span>
                  <ArrowRight className="ml-1.5 h-4 w-4" />
                </Button>

                <Button
                  href="/solar-calculator"
                  variant="outline"
                  size="md"
                  className="bg-transparent border-white/30 text-white hover:bg-white hover:text-[#173B53]"
                >
                  <Calculator className="mr-1.5 h-4 w-4" />
                  <span>Calculate My Solar Requirement</span>
                </Button>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
