"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SOLARCARE_PLANS } from "@/data/solarcare-plans";
import { cn } from "@/lib/utils";

export const SolarCareTeaser: React.FC = () => {
  const [selectedPlanId, setSelectedPlanId] = useState<string>("plus");
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    if (filter === "home") setSelectedPlanId("plus");
    else if (filter === "commercial") setSelectedPlanId("premium");
    else if (filter === "industrial") setSelectedPlanId("elite");
    else if (filter === "basic") setSelectedPlanId("essential");
  };

  return (
    <section className="py-12 sm:py-16 lg:py-6 lg:min-h-[100svh] flex flex-col justify-center bg-white text-[#173B53] font-sans">
      <div className="w-full max-w-7xl lg:max-w-[1780px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-6 sm:py-8">

        {/* Section Header */}
        <div data-reveal="group" className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-6 sm:mb-8">
          <div className="space-y-2 max-w-2xl">
            <span
              data-reveal="text"
              className="text-xs font-mono font-semibold uppercase tracking-wider text-[#1684C7] block"
            >
              • SOLARCARE AMC PLANS
            </span>
            <h2
              data-reveal="heading"
              className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#173B53] tracking-tight leading-tight"
            >
              Horizontal Plan Comparison
            </h2>
            <p
              data-reveal="paragraph"
              className="font-sans text-[#526673] text-sm sm:text-base leading-relaxed"
            >
              Annual maintenance contracts engineered to protect asset performance, ensure safety compliance, and maximize generation yield over 25+ years.
            </p>
          </div>

          <div data-reveal="button" className="lg:text-right shrink-0">
            <Link
              href="/solarcare"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#173B53] hover:text-[#1684C7] transition-colors group"
            >
              <span>Explore comprehensive O&M specs</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Scope Selector Pills */}
        <div data-reveal="cards-container" className="flex flex-wrap items-center gap-2 mb-6">
          <span className="font-mono text-xs font-semibold text-[#526673] mr-2">Highlight Scope:</span>
          {[
            { id: "all", label: "All Plans" },
            { id: "basic", label: "Entry (1 Year)" },
            { id: "home", label: "Residential (3 Years)" },
            { id: "commercial", label: "Commercial (5 Years)" },
            { id: "industrial", label: "Industrial (10 Years)" },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => handleFilterChange(tab.id)}
              className={cn(
                "px-3 py-1.5 rounded-full text-xs font-sans font-semibold transition-all focus:outline-none",
                activeFilter === tab.id
                  ? "bg-[#173B53] text-white shadow-sm"
                  : "bg-[#F6F3EC] text-[#526673] border border-[#DCE2E2] hover:border-[#173B53]/40"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Horizontal Connected Plans Comparison Track */}
        <div data-reveal="cards-container" className="relative">
          {/* Mobile scroll indicator note */}
          <p className="text-[11px] font-mono text-[#526673] mb-3 block lg:hidden">
            ← Swipe horizontally to compare plans →
          </p>

          <div className="flex lg:grid lg:grid-cols-4 gap-4 lg:gap-0 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-4 lg:pb-0 rounded-2xl lg:border lg:border-[#DCE2E2] lg:bg-[#F6F3EC] lg:divide-x lg:divide-[#DCE2E2]">
            {SOLARCARE_PLANS.map((plan) => {
              const isSelected = plan.id === selectedPlanId;
              return (
                <div
                  key={plan.id}
                  data-reveal="card"
                  onClick={() => setSelectedPlanId(plan.id)}
                  className={cn(
                    "w-[85vw] max-w-[320px] sm:w-[300px] lg:w-full shrink-0 snap-center transition-all duration-300 flex flex-col justify-between p-5 sm:p-6 lg:p-5 xl:p-6 relative cursor-pointer group",
                    "rounded-2xl lg:rounded-none border border-[#DCE2E2] lg:border-0",
                    isSelected
                      ? "bg-white shadow-lg lg:shadow-none lg:bg-white z-10 ring-2 ring-[#173B53] lg:ring-0"
                      : "bg-[#F6F3EC] hover:bg-white/80"
                  )}
                >
                  {/* Subtle Top Accent for Active Plan on Desktop */}
                  {isSelected && (
                    <div className="hidden lg:block absolute top-0 left-0 right-0 h-1 bg-[#173B53]" />
                  )}

                  <div className="space-y-4">
                    {/* Header: Name, Duration, Recommendation */}
                    <div className="space-y-1 border-b border-[#DCE2E2] pb-3.5">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="font-heading text-lg xl:text-xl font-extrabold text-[#173B53] tracking-tight">
                          {plan.name}
                        </h3>
                        {plan.badge && (
                          <span
                            className={cn(
                              "text-[10px] font-mono font-semibold uppercase tracking-wider px-2 py-0.5 rounded",
                              isSelected
                                ? "bg-[#173B53] text-white"
                                : "bg-[#DCE2E2] text-[#173B53]"
                            )}
                          >
                            {plan.badge}
                          </span>
                        )}
                      </div>
                      <p className="font-mono text-xs font-bold text-[#1684C7]">
                        {plan.duration}
                      </p>
                      <p className="font-sans text-[11px] text-[#526673] font-medium">
                        {plan.recommendedFor}
                      </p>
                    </div>

                    {/* Short Core Description */}
                    <p className="font-sans text-xs text-[#526673] leading-relaxed min-h-[36px]">
                      {plan.description}
                    </p>

                    {/* Key Included Services */}
                    <div className="space-y-2 pt-0.5">
                      <p className="font-mono text-[10px] uppercase font-bold text-[#526673]/60 tracking-wider">
                        Included Services
                      </p>
                      <ul className="space-y-1.5">
                        {plan.features.slice(0, 4).map((feat, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-xs text-[#173B53] leading-snug">
                            <Check className="h-3.5 w-3.5 text-[#1684C7] shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* CTA / Action */}
                  <div className="pt-4 mt-4 border-t border-[#DCE2E2]">
                    <Link
                      href={`/contact?plan=${plan.id}`}
                      className={cn(
                        "w-full inline-flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-lg text-xs font-sans font-semibold transition-all group/btn",
                        isSelected
                          ? "bg-[#173B53] hover:bg-[#0f2738] text-white shadow-sm"
                          : "border border-[#DCE2E2] hover:border-[#173B53] text-[#173B53] hover:text-[#173B53] bg-white"
                      )}
                    >
                      <span>Enquire for {plan.name}</span>
                      <ArrowRight className="h-3.5 w-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};

