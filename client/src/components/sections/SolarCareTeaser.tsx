"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SOLARCARE_PLANS } from "@/data/solarcare-plans";
import { Button } from "@/components/ui/Button";

export const SolarCareTeaser: React.FC = () => {
  return (
    <section className="py-14 sm:py-18 lg:py-20 bg-[#F6F3EC] text-[#173B53] font-sans relative">
      <div className="w-full max-w-7xl lg:max-w-[1780px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        
        {/* Section Header */}
        <div data-reveal="group" className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 sm:mb-12 lg:mb-14">
          <div className="space-y-2.5 max-w-2xl">
            <span
              data-reveal="eyebrow"
              className="text-xs font-mono font-bold uppercase tracking-wider text-[#1684C7] block"
            >
              • SOLARCARE AMC PLANS
            </span>
            <h2
              data-reveal="heading"
              className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#173B53] tracking-tight leading-[1.08]"
            >
              SolarCare Asset Management Plans
            </h2>
            <p
              data-reveal="paragraph"
              className="font-sans text-[#526673] text-sm sm:text-base lg:text-lg leading-relaxed pt-0.5"
            >
              Structured maintenance support designed to help protect solar system performance throughout its operating life.
            </p>
          </div>

          <div data-reveal="button" className="lg:text-right shrink-0">
            <Link
              href="/solarcare"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#173B53] hover:text-[#1684C7] transition-colors group"
            >
              <span>Explore complete technical specs</span>
              <ArrowRight className="h-4 w-4 text-[#1684C7] group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>

        {/* 4-Column Plan Comparison Grid */}
        <div
          data-reveal="cards-container"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 xl:gap-7 items-stretch"
        >
          {SOLARCARE_PLANS.map((plan) => (
            <div
              key={plan.id}
              data-reveal="card"
              className="h-full flex flex-col justify-between rounded-3xl p-6 sm:p-7 transition-all duration-300 relative bg-white text-[#173B53] border border-[#DCE2E2] shadow-[0_4px_20px_-4px_rgba(23,59,83,0.06)] hover:border-[#173B53]/40 hover:shadow-lg group"
            >
              {/* Card Top: Duration Pill, Title, Description */}
              <div className="space-y-4 flex-1 flex flex-col">
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-block font-mono text-[11px] sm:text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[#F6F3EC] text-[#1684C7] border border-[#DCE2E2]">
                    {plan.duration}
                  </span>
                </div>

                <div className="space-y-2 flex-1 flex flex-col">
                  <h3 className="font-heading text-xl sm:text-2xl font-extrabold tracking-tight text-[#173B53]">
                    {plan.name}
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-[#526673] leading-relaxed flex-1">
                    {plan.description}
                  </p>
                </div>
              </div>

              {/* Card Bottom CTA */}
              <div className="pt-6 mt-6 border-t border-[#DCE2E2]">
                <Button
                  href={`/contact?plan=${plan.id}`}
                  variant="outline"
                  size="md"
                  className="w-full justify-center h-11 text-xs sm:text-sm font-semibold rounded-xl transition-all bg-white hover:bg-[#173B53] text-[#173B53] hover:text-white border-[#173B53]"
                >
                  <span className="truncate">Enquire for {plan.name}</span>
                  <ArrowRight className="h-4 w-4 ml-1.5 shrink-0 group-hover:translate-x-0.5 transition-transform" />
                </Button>
              </div>

            </div>
          ))}
        </div>

        {/* Informational Subtext */}
        <div className="pt-8 text-center sm:text-left">
          <p className="font-sans text-xs text-[#526673] leading-relaxed">
            * AMC scope, custom inclusions, and pricing are confirmed directly with Fivefold Renewable before project onboarding.
          </p>
        </div>

      </div>
    </section>
  );
};
