"use client";

import React from "react";
import { Container } from "@/components/ui/Container";
import { PRIMARY_SERVICE_AREAS, MULTI_REGION_EXPERIENCE_SUMMARY } from "@/data/locations";
import { MapPin, Globe, CheckCircle2 } from "lucide-react";

export const ServiceAreas: React.FC = () => {
  return (
    <section className="py-20 sm:py-24 bg-white text-brand-charcoal border-t border-slate-200">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Text */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-brand-green">
              Regional Footprint
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-charcoal tracking-tight">
              Primary Focus in Odisha, Multi-State Engineering Capability
            </h2>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              Headquartered in Bhubaneswar, Fivefold provides rapid site evaluation and execution teams across key industrial and commercial districts in Odisha.
            </p>

            <div className="p-4 rounded-xl bg-brand-green-dark text-white space-y-2">
              <div className="flex items-center gap-2 font-heading font-bold text-brand-amber text-sm sm:text-base">
                <Globe className="h-5 w-5" />
                <span>Pan-India Engineering Consultation</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300">
                {MULTI_REGION_EXPERIENCE_SUMMARY}
              </p>
            </div>
          </div>

          {/* Right District Grid */}
          <div className="lg:col-span-6">
            <div className="p-6 sm:p-8 rounded-2xl bg-brand-off-white border border-slate-200 shadow-sm space-y-6">
              <h3 className="font-heading text-xl font-bold text-brand-charcoal pb-3 border-b border-slate-200 flex items-center gap-2">
                <MapPin className="h-5 w-5 text-brand-green" />
                <span>Key Odisha Service Hubs</span>
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {PRIMARY_SERVICE_AREAS.map((area, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-xs flex flex-col justify-between"
                  >
                    <div className="flex items-center gap-1.5 text-xs font-bold text-brand-green">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      <span>{area.isPrimaryHub ? "HQ Hub" : "Active District"}</span>
                    </div>
                    <div className="font-heading text-base font-extrabold text-brand-charcoal mt-2">
                      {area.name}
                    </div>
                    <div className="text-[11px] text-slate-500">{area.district} District</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
