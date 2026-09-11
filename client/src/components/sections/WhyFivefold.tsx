"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { AccordionGallery, type AccordionGalleryItem } from "@/components/ui/AccordionGallery";

import stock1Img from "@/assets/Images/Five_Fold_stock_1.png";
import stock2Img from "@/assets/Images/Five_fold_stock_2.png";
import heroBgImg from "@/assets/Images/hero section background.png";
import systemSizingImg from "@/assets/Images/Second Section/System_Sizing.png";

export interface EngineeringCardData {
  num: string;
  title: string;
  heading: string;
  description: string;
  link: string;
  image: typeof stock1Img;
  alt: string;
}

export const ENGINEERING_CARDS: EngineeringCardData[] = [
  {
    num: "01",
    title: "Pre-Construction",
    heading: "01 / Pre-Construction",
    description: "Feasibility, 3D shadow path analysis, and bankable DPR engineering.",
    link: "/engineering",
    image: stock1Img,
    alt: "Pre-construction feasibility and 3D shadow path analysis",
  },
  {
    num: "02",
    title: "Execution",
    heading: "02 / Execution",
    description: "Precision civil installation, Tier-1 procurement, and DISCOM net-metering.",
    link: "/engineering",
    image: systemSizingImg,
    alt: "Precision solar execution and component installation",
  },
  {
    num: "03",
    title: "Turnkey Execution",
    heading: "03 / Turnkey Execution",
    description: "End-to-end EPC delivery and synchronized grid commissioning.",
    link: "/services",
    image: stock2Img,
    alt: "Turnkey EPC execution and grid commissioning",
  },
  {
    num: "04",
    title: "Quality & Traceability",
    heading: "04 / Quality & Traceability",
    description: "Factory flash data audits, thermal imaging QA, and 25-year assurance.",
    link: "/solarcare",
    image: heroBgImg,
    alt: "Quality testing and 25-year performance monitoring",
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
              The difference between installing panels and engineering power plants.
            </h2>
            <p
              data-reveal="paragraph"
              className="font-sans text-[#526673] text-xs sm:text-base lg:text-lg leading-relaxed max-w-2xl pt-0.5"
            >
              Engineering discipline built for reliable, long-term solar performance.
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
            overlayColor="#173B53"
            textColor="#ffffff"
            height={500}
            radius={24}
            gap={14}
            trigger="hover"
            grayscale={true}
            duration={0.6}
            tilt={4}
            parallax={0.35}
          />
        </div>

        {/* 2. MOBILE VIEW: Clean Vertical Stack Showing All Cards */}
        <div className="flex flex-col gap-4 sm:gap-5 lg:hidden w-full">
          {ENGINEERING_CARDS.map((card, idx) => (
            <motion.div
              key={card.num}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.55, delay: idx * 0.06, ease: "easeOut" }}
              className="w-full"
            >
              <Link
                href={card.link}
                className="group relative block w-full h-[220px] xs:h-[240px] sm:h-[270px] rounded-2xl overflow-hidden bg-[#173B53] border border-[#DCE2E2]/60 shadow-[0_8px_24px_-12px_rgba(23,59,83,0.18)] transition-all duration-300 active:scale-[0.99]"
              >
                {/* Photographic Cover Image */}
                <Image
                  src={card.image}
                  alt={card.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Subtle Photographic Bottom Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#173B53]/92 via-[#173B53]/35 to-transparent pointer-events-none" />

                {/* Card Content Anchored at Bottom */}
                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 z-10 flex items-start gap-3 pointer-events-none">
                  {/* Small Blue Vertical Accent Line */}
                  <span className="w-[3.5px] self-stretch min-h-[38px] bg-[#1684C7] rounded-full shrink-0 shadow-[0_0_10px_rgba(22,132,199,0.7)] mt-0.5" />

                  {/* Level 1 Title & Level 2 Description */}
                  <div className="space-y-0.5 sm:space-y-1 min-w-0">
                    <h3 className="font-heading font-bold text-white text-base xs:text-lg sm:text-xl tracking-tight leading-snug truncate">
                      {card.heading}
                    </h3>
                    <p className="font-sans text-white/90 text-xs sm:text-sm font-normal leading-relaxed line-clamp-2">
                      {card.description}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default WhyFivefold;
