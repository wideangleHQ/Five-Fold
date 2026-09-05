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
    <section className="py-16 sm:py-20 lg:py-24 bg-white text-[#111615] border-b border-slate-200/80 font-sans">
      <Container>

        {/* Section Header */}
        <div data-reveal="group" className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 sm:mb-12">
          <div className="space-y-3 max-w-2xl">
            <span
              data-reveal="text"
              className="text-xs font-mono font-semibold uppercase tracking-wider text-[#20435F] block"
            >
              • SOLARCARE AMC PLANS
            </span>
            <h2
              data-reveal="heading"
              className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#111615] tracking-tight leading-tight"
            >
              Horizontal Plan Comparison
            </h2>
            <p
              data-reveal="paragraph"
              className="font-sans text-slate-600 text-sm sm:text-base leading-relaxed"
            >
              Annual maintenance contracts engineered to protect asset performance, ensure safety compliance, and maximize generation yield over 25+ years.
            </p>
          </div>

          <div data-reveal="button" className="lg:text-right shrink-0">
            <Link
              href="/solarcare"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#20435F] hover:text-[#0C3046] transition-colors group"
            >
              <span>Explore comprehensive O&M specs</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Scope Selector Pills */}
        <div data-reveal="cards-container" className="flex flex-wrap items-center gap-2 mb-8">
          <span className="font-mono text-xs font-semibold text-slate-500 mr-2">Highlight Scope:</span>
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
                  ? "bg-[#20435F] text-white shadow-sm"
                  : "bg-[#F7F8F5] text-slate-600 border border-slate-200 hover:border-slate-300"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Horizontal Connected Plans Comparison Track */}
        <div data-reveal="cards-container" className="relative">
          {/* Mobile scroll indicator note */}
          <p className="text-[11px] font-mono text-slate-600 mb-3 block lg:hidden">
            ← Swipe horizontally to compare plans →
          </p>

          <div className="flex lg:grid lg:grid-cols-4 gap-4 lg:gap-0 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-4 lg:pb-0 rounded-2xl lg:border lg:border-slate-200/90 lg:bg-[#F7F8F5] lg:divide-x lg:divide-slate-200/90">
            {SOLARCARE_PLANS.map((plan) => {
              const isSelected = plan.id === selectedPlanId;
              return (
                <div
                  key={plan.id}
                  data-reveal="card"
                  onClick={() => setSelectedPlanId(plan.id)}
                  className={cn(
                    "w-[85vw] max-w-[320px] sm:w-[300px] lg:w-full shrink-0 snap-center transition-all duration-300 flex flex-col justify-between p-6 sm:p-7 relative cursor-pointer group",
                    "rounded-2xl lg:rounded-none border border-slate-200/90 lg:border-0",
                    isSelected
                      ? "bg-white shadow-lg lg:shadow-none lg:bg-white z-10 ring-2 ring-[#20435F] lg:ring-0"
                      : "bg-[#F7F8F5] hover:bg-white/80"
                  )}
                >
                  {/* Subtle Top Accent for Active Plan on Desktop */}
                  {isSelected && (
                    <div className="hidden lg:block absolute top-0 left-0 right-0 h-1 bg-[#20435F]" />
                  )}

                  <div className="space-y-5">
                    {/* Header: Name, Duration, Recommendation */}
                    <div className="space-y-1.5 border-b border-slate-200/70 pb-4">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="font-heading text-xl font-extrabold text-[#111615] tracking-tight">
                          {plan.name}
                        </h3>
                        {plan.badge && (
                          <span
                            className={cn(
                              "text-[10px] font-mono font-semibold uppercase tracking-wider px-2 py-0.5 rounded",
                              isSelected
                                ? "bg-[#20435F] text-white"
                                : "bg-slate-200/80 text-slate-700"
                            )}
                          >
                            {plan.badge}
                          </span>
                        )}
                      </div>
                      <p className="font-mono text-xs font-bold text-[#20435F]">
                        {plan.duration}
                      </p>
                      <p className="font-sans text-[11px] text-slate-500 font-medium">
                        {plan.recommendedFor}
                      </p>
                    </div>

                    {/* Short Core Description */}
                    <p className="font-sans text-xs text-slate-600 leading-relaxed min-h-[42px]">
                      {plan.description}
                    </p>

                    {/* Key Included Services */}
                    <div className="space-y-2.5 pt-1">
                      <p className="font-mono text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                        Included Services
                      </p>
                      <ul className="space-y-2">
                        {plan.features.slice(0, 5).map((feat, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-xs text-slate-700 leading-snug">
                            <Check className="h-3.5 w-3.5 text-[#20435F] shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* CTA / Action */}
                  <div className="pt-6 mt-6 border-t border-slate-200/70">
                    <Link
                      href={`/contact?plan=${plan.id}`}
                      className={cn(
                        "w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs font-sans font-semibold transition-all group/btn",
                        isSelected
                          ? "bg-[#20435F] hover:bg-[#0C3046] text-white shadow-sm"
                          : "border border-slate-300 hover:border-[#20435F] text-[#111615] hover:text-[#20435F] bg-white"
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

      </Container>
    </section>
  );
};

