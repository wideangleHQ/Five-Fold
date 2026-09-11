"use client";

import React, { useState } from "react";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { SchemeModal } from "@/components/schemes/SchemeModal";

import stock1Img from "@/assets/Images/Five_Fold_stock_1.png";
import stock2Img from "@/assets/Images/Five_fold_stock_2.png";
import heroBgImg from "@/assets/Images/hero section background.png";

interface SchemeData {
  id: string;
  num: string;
  name: string;
  descriptor: string;
  ctaHref: string;
  image: StaticImageData;
}

const SCHEMES: SchemeData[] = [
  {
    id: "surya-ghar",
    num: "01",
    name: "PM Surya Ghar",
    descriptor: "Residential subsidy up to Rs 78,000 direct credit",
    ctaHref: "/government-schemes",
    image: stock1Img,
  },
  {
    id: "ci-tax",
    num: "02",
    name: "C&I Tax Benefits",
    descriptor: "40% Accelerated Depreciation for commercial projects",
    ctaHref: "/contact",
    image: stock2Img,
  },
  {
    id: "discom",
    num: "03",
    name: "DISCOM Liaison",
    descriptor: "End-to-end Odisha grid approvals and net metering",
    ctaHref: "/government-schemes",
    image: heroBgImg,
  },
];

export const GovernmentScheme: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="py-12 sm:py-16 lg:py-6 lg:min-h-[100svh] flex flex-col justify-center bg-white font-sans relative">
      {/* Container aligned with sections above: lg:px-8 xl:px-12 on laptop */}
      <div className="w-full max-w-7xl lg:max-w-[1780px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-6 sm:py-8">
        
        {/* Section Header: Eyebrow + Heading + Subcopy on Left, Check Eligibility CTA on Right */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-10 lg:mb-10"
        >
          <div className="space-y-2.5 max-w-3xl text-left">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#1684C7] block">
              • FINANCIAL SUPPORT
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#173B53] tracking-tight leading-[1.1]">
              Which scheme applies to your project?
            </h2>
            <p className="font-sans text-[#526673] text-sm sm:text-base leading-relaxed max-w-2xl">
              Government support and financial incentives designed to make solar accessible.
            </p>
          </div>

          <div className="shrink-0">
            <Button
              onClick={() => setIsModalOpen(true)}
              variant="primary"
              className="bg-[#173B53] hover:bg-[#0f2738] text-white px-6 py-3.5 text-sm font-sans font-semibold rounded-xl inline-flex items-center gap-2 transition-all group shadow-sm hover:shadow"
            >
              <span>Check Eligibility</span>
              <ArrowRight className="h-4 w-4 text-[#1684C7] group-hover:translate-x-0.5 transition-transform" />
            </Button>
          </div>
        </motion.div>

        {/* 3 Scheme Cards Grid (Desktop 3-col, Tablet/Mobile responsive stack) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-6 lg:gap-8 items-stretch">
          {SCHEMES.map((scheme, index) => (
            <motion.div
              key={scheme.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
              className="group bg-white rounded-3xl border border-[#DCE2E2] overflow-hidden p-4 sm:p-5 flex flex-col justify-between shadow-[0_4px_20px_-4px_rgba(23,59,83,0.05)] hover:shadow-[0_16px_32px_-8px_rgba(23,59,83,0.1)] hover:border-[#1684C7]/30 transition-all duration-300"
            >
              <div>
                {/* Image Container */}
                <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-slate-100 mb-5 sm:mb-6">
                  <Image
                    src={scheme.image}
                    alt={scheme.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover object-center group-hover:scale-[1.03] transition-transform duration-500 ease-out"
                  />
                </div>

                {/* Typography & Content */}
                <div className="space-y-2 px-1 text-left">
                  <span className="font-mono text-xs text-[#1684C7] font-bold tracking-[0.2em] uppercase block">
                    {scheme.num}
                  </span>
                  <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#173B53] tracking-tight leading-snug">
                    {scheme.name}
                  </h3>
                  <p className="font-sans text-sm text-[#526673] leading-relaxed">
                    {scheme.descriptor}
                  </p>
                </div>
              </div>

              {/* Action Link */}
              <div className="pt-6 px-1 text-left">
                <Link
                  href={scheme.ctaHref}
                  className="inline-flex items-center gap-2 text-sm font-sans font-semibold text-[#173B53] group-hover:text-[#1684C7] transition-colors"
                >
                  <span>Explore scheme</span>
                  <ArrowRight className="h-4 w-4 text-[#1684C7] group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <SchemeModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
};
