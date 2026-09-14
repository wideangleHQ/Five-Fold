"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Check, ArrowRight, ShieldCheck } from "lucide-react";
import { SOLARCARE_COMPARISON_PLANS } from "@/data/solarcare-plans";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export const SolarCareTeaser: React.FC = () => {
  // Store selected tier per plan
  const [selectedTiers, setSelectedTiers] = useState<Record<string, string>>({
    essential: "essential-1yr",
    plus: "plus-3yr",
    pro: "pro-5yr",
  });

  const handleTierSelect = (planId: string, tierId: string) => {
    setSelectedTiers((prev) => ({ ...prev, [planId]: tierId }));
  };

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
              Annual maintenance contracts engineered to protect asset performance, ensure safety compliance, and maximize generation yield over 25+ years.
            </p>
          </div>

          <div data-reveal="button" className="lg:text-right shrink-0">
            <Link
              href="/solarcare"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#173B53] hover:text-[#1684C7] transition-colors group"
            >
              <span>Explore complete technical specs</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>

        {/* 3-Column Plan Comparison Grid */}
        <div
          data-reveal="cards-container"
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-7 xl:gap-8 items-stretch"
        >
          {SOLARCARE_COMPARISON_PLANS.map((plan) => {
            const isFeatured = plan.id === "plus";
            const currentTierId = selectedTiers[plan.id] || plan.tiers[0]?.id;

            return (
              <div
                key={plan.id}
                data-reveal="card"
                className={cn(
                  "h-full flex flex-col justify-between rounded-3xl p-6 sm:p-7 lg:p-8 transition-all duration-300 relative",
                  isFeatured
                    ? "bg-[#173B53] text-white border border-[#173B53] shadow-[0_16px_40px_-12px_rgba(23,59,83,0.28)] ring-1 ring-[#173B53]"
                    : "bg-white text-[#173B53] border border-[#DCE2E2] shadow-[0_4px_20px_-4px_rgba(23,59,83,0.06)] hover:border-[#173B53]/30"
                )}
              >
                {/* Top Content: Title, Description, Audience, Divider, Feature List */}
                <div className="space-y-5">
                  {/* Card Header */}
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between gap-2">
                      <h3
                        className={cn(
                          "font-heading text-2xl sm:text-3xl font-extrabold tracking-tight",
                          isFeatured ? "text-white" : "text-[#173B53]"
                        )}
                      >
                        {plan.name}
                      </h3>
                      {plan.badge && (
                        <span
                          className={cn(
                            "text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shrink-0 shadow-xs",
                            isFeatured
                              ? "bg-[#1684C7] text-white"
                              : "bg-[#F6F3EC] text-[#173B53] border border-[#DCE2E2]"
                          )}
                        >
                          {plan.badge}
                        </span>
                      )}
                    </div>

                    <p
                      className={cn(
                        "font-sans text-xs sm:text-sm leading-relaxed min-h-[44px]",
                        isFeatured ? "text-slate-200" : "text-[#526673]"
                      )}
                    >
                      {plan.description}
                    </p>

                    <div className="pt-0.5">
                      <span
                        className={cn(
                          "inline-block font-mono text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-md",
                          isFeatured
                            ? "bg-white/10 text-sky-200"
                            : "bg-[#F6F3EC] text-[#173B53]"
                        )}
                      >
                        {plan.recommendedFor}
                      </span>
                    </div>
                  </div>

                  {/* Clean Divider */}
                  <div
                    className={cn(
                      "border-t",
                      isFeatured ? "border-white/15" : "border-[#DCE2E2]"
                    )}
                  />

                  {/* Feature Section Header */}
                  <div className="space-y-3.5">
                    <p
                      className={cn(
                        "font-mono text-xs font-bold uppercase tracking-wider",
                        isFeatured ? "text-white" : "text-[#173B53]"
                      )}
                    >
                      {plan.featureHeader}
                    </p>

                    {/* Features List */}
                    <ul className="space-y-2.5">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm leading-snug">
                          <span
                            className={cn(
                              "h-4 w-4 rounded-full flex items-center justify-center shrink-0 mt-0.5",
                              isFeatured
                                ? "bg-[#1684C7]/30 text-white"
                                : "bg-[#173B53]/10 text-[#173B53]"
                            )}
                          >
                            <Check className="h-2.5 w-2.5 stroke-[3]" />
                          </span>
                          <span className={isFeatured ? "text-slate-100" : "text-[#173B53]/90"}>
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Flexible Spacer to lock bottom CTAs to identical height */}
                <div className="flex-1 min-h-[24px]" />

                {/* Bottom Section: Duration / Scope Tier Options & CTA */}
                <div
                  className={cn(
                    "pt-5 space-y-4 border-t mt-5",
                    isFeatured ? "border-white/15" : "border-[#DCE2E2]"
                  )}
                >
                  {/* Selectable Duration Tiers */}
                  <div className="space-y-2">
                    {plan.tiers.map((tier) => {
                      const isTierActive = tier.id === currentTierId;
                      return (
                        <button
                          key={tier.id}
                          type="button"
                          onClick={() => handleTierSelect(plan.id, tier.id)}
                          className={cn(
                            "w-full flex items-center justify-between p-3 rounded-xl text-left transition-all border cursor-pointer focus:outline-none",
                            isFeatured
                              ? isTierActive
                                ? "bg-white/15 border-[#1684C7] text-white shadow-xs"
                                : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10"
                              : isTierActive
                              ? "bg-[#F6F3EC] border-[#173B53] text-[#173B53] shadow-xs"
                              : "bg-white border-[#DCE2E2] text-[#526673] hover:border-[#173B53]/40"
                          )}
                        >
                          <div className="space-y-0.5 min-w-0 pr-2">
                            <div
                              className={cn(
                                "font-heading text-xs font-bold tracking-tight truncate",
                                isFeatured ? "text-white" : "text-[#173B53]"
                              )}
                            >
                              {tier.name}
                            </div>
                            <div
                              className={cn(
                                "font-sans text-[11px] leading-tight truncate",
                                isFeatured ? "text-slate-300" : "text-[#526673]"
                              )}
                            >
                              {tier.subtitle}
                            </div>
                          </div>

                          {/* Radio Indicator */}
                          <div
                            className={cn(
                              "h-4 w-4 rounded-full border flex items-center justify-center shrink-0 transition-colors",
                              isFeatured
                                ? isTierActive
                                  ? "border-[#1684C7] bg-[#1684C7]"
                                  : "border-white/30 bg-transparent"
                                : isTierActive
                                ? "border-[#173B53] bg-[#173B53]"
                                : "border-[#DCE2E2] bg-transparent"
                            )}
                          >
                            {isTierActive && (
                              <div className="h-1.5 w-1.5 rounded-full bg-white" />
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Card Bottom CTA */}
                  <div>
                    <Button
                      href={`/contact?plan=${plan.id}&tier=${currentTierId}`}
                      variant={isFeatured ? "amber" : "outline"}
                      size="md"
                      className={cn(
                        "w-full justify-center h-11 text-xs sm:text-sm font-semibold rounded-xl transition-all shadow-xs",
                        isFeatured
                          ? "bg-[#1684C7] hover:bg-[#126fa8] text-white border-0"
                          : "bg-white hover:bg-[#173B53] text-[#173B53] hover:text-white border-[#173B53]"
                      )}
                    >
                      <span>Enquire for {plan.name}</span>
                      <ArrowRight className="h-4 w-4 ml-1.5" />
                    </Button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
