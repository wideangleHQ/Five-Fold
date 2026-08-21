"use client";

import React, { useState } from "react";
import { Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SOLARCARE_PLANS } from "@/data/solarcare-plans";

export const SolarCareTeaser: React.FC = () => {
  const [size, setSize] = useState<string>("< 10 kWp");
  const [age, setAge] = useState<string>("< 1 Year");
  const [condition, setCondition] = useState<string>("Good");
  const [recommendedPlanId, setRecommendedPlanId] = useState<string>("plus");

  const handleRecommend = () => {
    if (size === "200+ kWp" || condition === "Underperforming") {
      setRecommendedPlanId("elite");
    } else if (size === "50-200 kWp" || age === "5+ Years") {
      setRecommendedPlanId("premium");
    } else if (size === "10-50 kWp" || age === "1-3 Years") {
      setRecommendedPlanId("plus");
    } else {
      setRecommendedPlanId("essential");
    }
  };

  return (
    <section className="py-16 sm:py-24 bg-white text-[#111615] border-b border-slate-200 font-sans">
      <Container>
        {/* Title */}
        <div className="max-w-3xl mb-12 space-y-3">
          <span className="text-xs font-sans font-semibold uppercase tracking-wider text-[#20435F] block">
            Long-Term Asset Performance
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#111615] tracking-tight leading-tight">
            SolarCare AMC Plans
          </h2>
          <p className="font-sans text-slate-600 text-sm sm:text-base leading-relaxed">
            Long-term maintenance designed to keep your solar system performing.
          </p>
        </div>

        {/* Interactive Recommendation Bar */}
        <div className="p-6 rounded-2xl bg-[#F7F8F5] border border-slate-200 mb-12 space-y-4">
          <div className="text-xs font-sans font-bold uppercase tracking-wider text-[#111615]">
            Plan Calculator &amp; Recommendation
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1.5">System Size</label>
              <select
                value={size}
                onChange={(e) => { setSize(e.target.value); handleRecommend(); }}
                className="w-full p-2.5 rounded-lg border border-slate-300 bg-white font-medium text-[#111615] focus:outline-none focus:border-[#00A9D6]"
              >
                <option value="< 10 kWp">&lt; 10 kWp (Home)</option>
                <option value="10-50 kWp">10 - 50 kWp (Small Commercial)</option>
                <option value="50-200 kWp">50 - 200 kWp (Commercial)</option>
                <option value="200+ kWp">200+ kWp (Industrial MW)</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1.5">System Age</label>
              <select
                value={age}
                onChange={(e) => { setAge(e.target.value); handleRecommend(); }}
                className="w-full p-2.5 rounded-lg border border-slate-300 bg-white font-medium text-[#111615] focus:outline-none focus:border-[#00A9D6]"
              >
                <option value="< 1 Year">&lt; 1 Year (New System)</option>
                <option value="1-3 Years">1 - 3 Years</option>
                <option value="3-5 Years">3 - 5 Years</option>
                <option value="5+ Years">5+ Years (Existing Asset)</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1.5">Plant Condition</label>
              <select
                value={condition}
                onChange={(e) => { setCondition(e.target.value); handleRecommend(); }}
                className="w-full p-2.5 rounded-lg border border-slate-300 bg-white font-medium text-[#111615] focus:outline-none focus:border-[#00A9D6]"
              >
                <option value="Good">Good / Standard Generation</option>
                <option value="Needs Inspection">Needs Cleaning &amp; Audit</option>
                <option value="Underperforming">Underperforming / Faults</option>
              </select>
            </div>
          </div>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SOLARCARE_PLANS.map((plan) => {
            const isRecommended = plan.id === recommendedPlanId;
            return (
              <div
                key={plan.id}
                className={`p-6 rounded-2xl border transition-all flex flex-col justify-between space-y-6 ${
                  isRecommended
                    ? "border-[#20435F] bg-[#F7F8F5] shadow-sm"
                    : "border-slate-200 bg-white"
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-sans font-semibold text-slate-500 uppercase tracking-wider">
                      {plan.duration}
                    </span>
                    {isRecommended && (
                      <span className="text-[10px] font-semibold uppercase px-2.5 py-0.5 rounded-full bg-[#00A9D6] text-white">
                        Recommended
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="font-heading text-xl sm:text-2xl font-bold text-[#111615]">
                      {plan.name}
                    </h3>
                    <p className="font-sans text-xs text-slate-600 mt-1 leading-relaxed">
                      {plan.description}
                    </p>
                  </div>

                  <ul className="space-y-2 pt-3 border-t border-slate-200/80">
                    {plan.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                        <Check className="h-3.5 w-3.5 text-[#20435F] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Button
                  href="/contact"
                  variant={isRecommended ? "primary" : "outline"}
                  size="sm"
                  className={`w-full py-2.5 text-xs font-semibold rounded-lg ${
                    isRecommended ? "bg-[#20435F] hover:bg-[#0C3046] text-white" : ""
                  }`}
                >
                  <span>Find the Right AMC Plan</span>
                </Button>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};

