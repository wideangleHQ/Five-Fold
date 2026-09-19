"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { AccordionGallery, type AccordionGalleryItem } from "@/components/ui/AccordionGallery";

import preConstructionImg from "@/assets/Images/Why Fivefold/Pre Construction.png";
import executionImg from "@/assets/Images/Why Fivefold/Execution.png";
import turnkeyExecutionImg from "@/assets/Images/Why Fivefold/Turnkey Execution.png";
import qualityTraceabilityImg from "@/assets/Images/Why Fivefold/Quality & Traceability.png";

export interface EngineeringCardData {
  num: string;
  eyebrow: string;
  title: string;
  heading: string;
  description: string;
  link: string;
  image: typeof preConstructionImg;
  alt: string;
}

export const ENGINEERING_CARDS: EngineeringCardData[] = [
  {
    num: "01",
    eyebrow: "01 / ENGINEERING",
    title: "Engineering First",
    heading: "01 / Engineering First",
    description: "Feasibility, site analysis, system design and performance modelling before construction begins.",
    link: "/engineering",
    image: preConstructionImg,
    alt: "Engineering First — Feasibility, site analysis and performance modelling",
  },
  {
    num: "02",
    eyebrow: "02 / EXECUTION",
    title: "End-to-End Execution",
    heading: "02 / End-to-End Execution",
    description: "From procurement and installation to commissioning, we manage the project through every critical stage.",
    link: "/engineering",
    image: executionImg,
    alt: "End-to-End Execution — Procurement, installation and commissioning",
  },
  {
    num: "03",
    eyebrow: "03 / PERFORMANCE",
    title: "Built for Performance",
    heading: "03 / Built for Performance",
    description: "Systems designed around generation, reliability, constructibility and long-term performance.",
    link: "/services",
    image: turnkeyExecutionImg,
    alt: "Built for Performance — Generation, reliability and constructibility",
  },
  {
    num: "04",
    eyebrow: "04 / QUALITY & SUPPORT",
    title: "Quality & Long-Term Support",
    heading: "04 / Quality & Long-Term Support",
    description: "Quality assurance, monitoring, maintenance and technical support throughout the system lifecycle.",
    link: "/solarcare",
    image: qualityTraceabilityImg,
    alt: "Quality & Long-Term Support — QA, monitoring and maintenance",
  },
];

const DESKTOP_GALLERY_ITEMS: AccordionGalleryItem[] = ENGINEERING_CARDS.map((card) => ({
  image: card.image,
  num: card.num,
  title: card.title,
  label: card.heading,
  description: card.description,
  link: card.link,
  alt: card.alt,
}));

export const WhyFivefold: React.FC = () => {
  return (
    <section className="py-12 sm:py-16 lg:py-12 flex flex-col justify-center bg-white text-[#173B53] font-sans transition-colors duration-500">
      <div className="w-full max-w-7xl lg:max-w-[1780px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-4 sm:py-6 lg:py-8">
        
        {/* Section Header */}
        <div data-reveal="group" className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-6 sm:mb-8 lg:mb-10">
          <div className="max-w-3xl space-y-2 sm:space-y-2.5">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#1684C7] block">
              • WHY FIVEFOLD
            </span>
            <h2
              data-reveal="heading"
              className="font-heading text-2xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight leading-[1.08] text-[#173B53]"
            >
              We Engineer More Than Solar.
            </h2>
            <p
              data-reveal="paragraph"
              className="font-sans text-[#526673] text-xs sm:text-base lg:text-lg leading-relaxed max-w-2xl pt-0.5"
            >
              From engineering and procurement to installation and long-term support, we stay accountable for the performance of your solar system.
            </p>
          </div>

          <div className="shrink-0 pt-1 lg:pt-0">
            <Link
              href="/engineering"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#173B53] hover:text-[#1684C7] transition-colors group"
            >
              <span>Explore engineering standards</span>
              <ArrowRight className="h-4 w-4 text-[#1684C7] group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>

        {/* 1. DESKTOP / LAPTOP / TABLET VIEW: Interactive Horizontal Gallery */}
        <div data-reveal="card" className="hidden lg:block w-full">
          <AccordionGallery
            items={DESKTOP_GALLERY_ITEMS}
            defaultIndex={2}
            expandRatio={0.46}
            accentColor="#1684C7"
            overlayColor="#0f172a"
            textColor="#ffffff"
            height={500}
            radius={20}
            gap={14}
            trigger="hover"
            grayscale={false}
            duration={0.6}
            tilt={4}
            parallax={0.35}
          />
        </div>

        {/* 2. MOBILE VIEW: Clean Vertical Stack Showing All Cards */}
        <div data-reveal="cards-container" className="flex flex-col gap-4 sm:gap-5 lg:hidden w-full">
          {ENGINEERING_CARDS.map((card) => (
            <div
              key={card.num}
              data-reveal="card"
              className="w-full"
            >
              <Link
                href={card.link}
                className="group relative block w-full h-[220px] xs:h-[240px] sm:h-[270px] rounded-2xl overflow-hidden bg-slate-900 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.25)] transition-all duration-300 active:scale-[0.99]"
              >
                {/* Photographic Cover Image */}
                <Image
                  src={card.image}
                  alt={card.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Smooth Photographic Bottom Black Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 via-40% to-transparent pointer-events-none" />

                {/* Card Content Anchored at Bottom */}
                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 z-10 flex items-start gap-3 pointer-events-none">
                  {/* Small Blue Vertical Accent Line */}
                  <span className="w-[3.5px] self-stretch min-h-[38px] bg-[#1684C7] rounded-full shrink-0 shadow-[0_0_10px_rgba(22,132,199,0.7)] mt-0.5" />

                  {/* Level 1 Eyebrow & Title & Level 2 Description */}
                  <div className="space-y-0.5 sm:space-y-1 min-w-0">
                    <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider text-[#00A9D6] block">
                      {card.eyebrow}
                    </span>
                    <h3 className="font-heading font-bold text-white text-base xs:text-lg sm:text-xl tracking-tight leading-snug">
                      {card.title}
                    </h3>
                    <p className="font-sans text-white/90 text-xs sm:text-sm font-normal leading-relaxed line-clamp-2">
                      {card.description}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default WhyFivefold;
