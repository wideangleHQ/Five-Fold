import { Metadata } from "next";
import { constructMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/Container";
import { SolarCareTeaser } from "@/components/sections/SolarCareTeaser";
import { WarrantySection } from "@/components/sections/WarrantySection";
import { LongTermPerformance } from "@/components/sections/LongTermPerformance";
import { FinalCta } from "@/components/sections/FinalCta";
import { ShieldCheck } from "lucide-react";

export const metadata: Metadata = constructMetadata({
  title: "SolarCare AMC & O&M | Solar Plant Maintenance Plans",
  description: "SolarCare Annual Maintenance Contracts (AMC) by Fivefold Renewable. 1, 3, 5, and 10-year solar plant operation and maintenance coverage.",
  path: "/solarcare",
});

export default function SolarCarePage() {
  return (
    <div className="pt-24 sm:pt-32">
      {/* Page Hero */}
      <section className="py-16 sm:py-20 bg-brand-charcoal text-white relative overflow-hidden">
        <Container>
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-green/40 bg-brand-green/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-brand-green">
              <ShieldCheck className="h-4 w-4" />
              Annual Maintenance Contracts
            </div>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
              SolarCare AMC Plans
            </h1>
            <p className="text-slate-300 text-lg sm:text-xl font-light leading-relaxed">
              Long-term asset operation, scheduled preventive maintenance, thermal imaging diagnostics, and panel cleaning protocols to safeguard generation yield over 25+ years.
            </p>
          </div>
        </Container>
      </section>

      {/* SolarCare Plan Tiers */}
      <SolarCareTeaser />

      {/* 25-Year Lifecycle Continuum */}
      <LongTermPerformance />

      {/* Component Warranty Guarantees */}
      <WarrantySection />

      {/* Final CTA */}
      <FinalCta />
    </div>
  );
}
