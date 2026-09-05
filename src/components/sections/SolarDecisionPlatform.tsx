"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ArrowRight } from "lucide-react";

import solarImg from "@/assets/Images/Five_Fold_stock_1.png";

const STEPS = [
  {
    num: "01",
    label: "Energy Requirement",
    desc: "Tell us about your property, usage and available rooftop space.",
  },
  {
    num: "02",
    label: "System Sizing",
    desc: "Get an indicative recommendation based on your requirements.",
  },
  {
    num: "03",
    label: "Schemes & Savings",
    desc: "Understand applicable government schemes and potential savings.",
  },
];

export const SolarDecisionPlatform: React.FC = () => {
  return (
    <section className="py-20 sm:py-28 lg:py-32 bg-white font-sans border-b border-slate-200/80">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">

          {/* Left: editorial numbered steps */}
          <div className="lg:col-span-6 space-y-12 sm:space-y-14">
            <div data-reveal="text" className="space-y-3">
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#111615] tracking-tight leading-[1.1]">
                Find the right solar solution for your needs.
              </h2>
              <p className="font-sans text-slate-500 text-sm sm:text-base leading-relaxed max-w-md">
                Smart calculations to help you choose correctly.
              </p>
            </div>

            {/* Numbered steps - editorial list, no cards */}
            <div data-reveal="cards-container" className="space-y-0 divide-y divide-slate-100">
              {STEPS.map((step) => (
                <div
                  key={step.num}
                  data-reveal="card"
                  className="flex items-start gap-6 py-6 sm:py-7"
                >
                  <span className="font-mono text-3xl sm:text-4xl font-bold text-slate-200 leading-none shrink-0 w-12 text-right">
                    {step.num}
                  </span>
                  <div className="space-y-1 pt-1">
                    <h3 className="font-heading text-base sm:text-lg font-bold text-[#111615] tracking-tight">
                      {step.label}
                    </h3>
                    <p className="font-sans text-xs sm:text-sm text-slate-500 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <Link
                href="/solar-calculator"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-lg bg-[#20435F] hover:bg-[#0C3046] text-white text-sm font-sans font-semibold transition-all shadow-md group"
              >
                <span>Find My Solar Solution</span>
                <ArrowRight className="h-4 w-4 text-[#00A9D6] group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <p className="mt-3 font-sans text-[11px] text-slate-400">
                Indicative estimates only. Subject to professional site assessment.
              </p>
            </div>
          </div>

          {/* Right: dominant solar image */}
          <div data-reveal="image-container" className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden bg-slate-900 aspect-[4/5] lg:aspect-[3/4] w-full">
              <Image
                src={solarImg}
                alt="Fivefold solar installation"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0C3046]/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/15">
                  <span className="font-sans text-xs font-semibold text-white">Precision insights. Maximum savings.</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
};
