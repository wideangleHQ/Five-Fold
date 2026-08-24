"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Info, ChevronDown } from "lucide-react";
import { SchemeModal } from "@/components/schemes/SchemeModal";

// Import approved local image assets
import stock1Img from "@/assets/Images/Five_Fold_stock_1.png";
import stock2Img from "@/assets/Images/Five_fold_stock_2.png";
import skyImg from "@/assets/Images/Five_fold_sky.png";

const SCHEMES = [
  {
    id: "surya-ghar",
    num: "01",
    name: "PM SURYA GHAR",
    category: "Residential",
    benefitShort: "Up to ₹78,000 Direct Credit",
    fullTitle: "PM Surya Ghar: Muft Bijli Yojana",
    description:
      "Central government rooftop solar scheme providing up to ₹78,000 direct subsidy credited into your bank account. Fivefold handles all portal filings.",
    image: stock1Img,
    ctaText: "Check Eligibility",
    ctaHref: "/government-schemes",
  },
  {
    id: "c-and-i",
    num: "02",
    name: "C&I TAX BENEFITS",
    category: "Commercial & Industrial",
    benefitShort: "40% Accelerated Depreciation",
    fullTitle: "C&I Tax Benefits & DISCOM Net Metering",
    description:
      "Industrial & commercial enterprises benefit from 40% Accelerated Depreciation, GST input tax offsets, and DISCOM grid-export banking.",
    image: stock2Img,
    ctaText: "Discuss Commercial Project",
    ctaHref: "/contact",
  },
  {
    id: "discom-liaison",
    num: "03",
    name: "DISCOM SUPPORT",
    category: "Odisha Grid Liaison",
    benefitShort: "End-to-End Approval",
    fullTitle: "Odisha DISCOM Liaison & Net Metering",
    description:
      "Complete technical liaison, bi-directional solar meter installation, and statutory safety approvals across TPCODL, TPNODL, TPSODL, and TPWODL.",
    image: skyImg,
    ctaText: "Check DISCOM Eligibility",
    ctaHref: "/government-schemes",
  },
];

export const GovernmentScheme: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeSchemeId, setActiveSchemeId] = useState<string | null>(null);

  const toggleScheme = (id: string) => {
    setActiveSchemeId(activeSchemeId === id ? null : id);
  };

  return (
    <section className="py-20 sm:py-28 lg:py-32 bg-[#F7F8F5] text-[#111615] font-sans border-b border-slate-200/80">
      <Container>
        {/* Section Header with Generous Whitespace */}
        <div data-reveal="text" className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 lg:mb-20">
          <div className="space-y-3 max-w-2xl">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#20435F] block">
              • GOVERNMENT SUPPORT &amp; SCHEMES
            </span>
            <h2 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#111615] tracking-tight leading-[1.08]">
              Which solar scheme applies to your project?
            </h2>
          </div>

          <div className="shrink-0 pt-2 md:pt-0">
            <Button
              onClick={() => setIsModalOpen(true)}
              variant="primary"
              className="bg-[#20435F] hover:bg-[#0C3046] text-white px-7 py-3.5 text-xs sm:text-sm font-sans font-semibold rounded-xl inline-flex items-center gap-2 transition-all shadow-md group"
            >
              <span>Check Eligibility</span>
              <ArrowRight className="h-4 w-4 text-[#00A9D6] group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>

        {/* Minimal Editorial Scheme Showcase (3 Schemes) */}
        <div data-reveal="cards-container" className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {SCHEMES.map((scheme) => {
            const isExpanded = activeSchemeId === scheme.id;
            return (
              <div
                key={scheme.id}
                data-reveal="card"
                className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-5">
                  {/* Scheme Number & Category Descriptor */}
                  <div className="flex items-center justify-between font-mono text-xs font-bold text-[#20435F]">
                    <span>{scheme.num}</span>
                    <span className="text-slate-500 font-sans font-medium">{scheme.category}</span>
                  </div>

                  {/* Large Dominant Image */}
                  <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-slate-900 border border-slate-200/80 group">
                    <Image
                      src={scheme.image}
                      alt={scheme.fullTitle}
                      fill
                      priority
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-95"
                    />
                  </div>

                  {/* Scheme Name */}
                  <h3 className="font-heading text-xl sm:text-2xl font-extrabold text-[#111615] tracking-tight">
                    {scheme.name}
                  </h3>

                  {/* Progressive Disclosure: Details revealed on interaction */}
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden space-y-4 pt-2 border-t border-slate-100"
                      >
                        <h4 className="font-heading text-sm font-bold text-[#20435F]">
                          {scheme.fullTitle}
                        </h4>
                        <p className="font-sans text-xs sm:text-sm text-slate-600 leading-relaxed">
                          {scheme.description}
                        </p>
                        <div className="text-xs font-mono font-semibold text-[#00A9D6] bg-sky-50 px-3 py-1.5 rounded-lg border border-sky-100 inline-block">
                          Key Benefit: {scheme.benefitShort}
                        </div>
                        <div className="pt-2">
                          <Button
                            href={scheme.ctaHref}
                            variant="outline"
                            className="w-full justify-between border-slate-200 hover:border-[#20435F] text-[#111615] text-xs font-sans font-semibold rounded-lg py-2 px-3.5"
                          >
                            <span>{scheme.ctaText}</span>
                            <ArrowRight className="h-3.5 w-3.5 text-[#00A9D6]" />
                          </Button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Minimal Interactive Trigger */}
                <div className="pt-5 mt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="font-sans text-xs text-slate-500 font-medium">
                    {scheme.benefitShort}
                  </span>
                  <button
                    type="button"
                    onClick={() => toggleScheme(scheme.id)}
                    className="text-xs font-mono font-bold text-[#20435F] hover:text-[#0C3046] inline-flex items-center gap-1 transition-colors"
                  >
                    <span>{isExpanded ? "Collapse" : "Explore"}</span>
                    <ChevronDown
                      className={`h-4 w-4 transition-transform duration-300 ${
                        isExpanded ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Statutory Disclaimer */}
        <div className="mt-8 text-center">
          <p className="font-sans text-[11px] text-slate-400 inline-flex items-center gap-1.5 justify-center max-w-3xl mx-auto">
            <Info className="h-3.5 w-3.5 text-slate-400 shrink-0" />
            <span>
              Indicative estimates only. Final scheme eligibility, subsidy disbursal amounts, and DISCOM grid interconnection approvals remain strictly governed by prevailing Central Government (MNRE) and Odisha DISCOM guidelines.
            </span>
          </p>
        </div>
      </Container>

      {/* Scheme Discovery Modal */}
      <SchemeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
};

