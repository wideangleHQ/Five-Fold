import { Metadata } from "next";
import { constructMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/Container";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { FinalCta } from "@/components/sections/FinalCta";
import { Wrench } from "lucide-react";

export const metadata: Metadata = constructMetadata({
  title: "Solar EPC Services | Residential, Commercial & Industrial Solar",
  description: "Fivefold Renewable provides turnkey rooftop solar installation, commercial solar plants, industrial MW-scale solar EPC, and SolarCare AMC maintenance.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <div className="pt-24 sm:pt-32">
      {/* Page Hero */}
      <section className="py-16 sm:py-20 bg-brand-charcoal text-white relative overflow-hidden">
        <Container>
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-green/40 bg-brand-green/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-brand-green">
              <Wrench className="h-4 w-4" />
              Turnkey EPC Offerings
            </div>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
              Solar EPC Services
            </h1>
            <p className="text-slate-300 text-lg sm:text-xl font-light leading-relaxed">
              Comprehensive solar engineering, procurement, installation, DISCOM net metering, and maintenance solutions tailored for home, commercial, and industrial clients in Odisha.
            </p>
          </div>
        </Container>
      </section>

      {/* Services Cards */}
      <ServicesGrid />

      {/* Final CTA */}
      <FinalCta />
    </div>
  );
}
