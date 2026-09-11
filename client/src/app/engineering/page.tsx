import { Metadata } from "next";
import { constructMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/Container";
import { SignatureEngineering } from "@/components/sections/SignatureEngineering";
import { EngineeringCapabilities } from "@/components/sections/EngineeringCapabilities";
import { HowWeWorkTimeline } from "@/components/sections/HowWeWorkTimeline";
import { FinalCta } from "@/components/sections/FinalCta";
import { Compass } from "lucide-react";

export const metadata: Metadata = constructMetadata({
  title: "Engineering Capabilities | PVsyst Yield & Structural Design",
  description: "Explore Fivefold's pre-construction engineering, PVsyst yield simulations, 3D shadow analysis, structural wind-load designs, and turnkey execution.",
  path: "/engineering",
});

export default function EngineeringPage() {
  return (
    <div className="pt-24 sm:pt-32">
      {/* Page Hero */}
      <section className="py-16 sm:py-20 bg-brand-charcoal text-white relative overflow-hidden">
        <Container>
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-amber/40 bg-brand-amber/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-brand-amber">
              <Compass className="h-4 w-4" />
              Technical Rigor & EPC Standards
            </div>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
              Engineering Determines Performance
            </h1>
            <p className="text-slate-300 text-lg sm:text-xl font-light leading-relaxed">
              Solar plants underperform when engineering is treated as a formality. Discover our 4-phase pre-construction, structural, and procurement engineering workflow.
            </p>
          </div>
        </Container>
      </section>

      {/* Signature Editorial Section */}
      <SignatureEngineering />

      {/* 4 Core Groups */}
      <EngineeringCapabilities />

      {/* How We Work 8-Step Timeline */}
      <HowWeWorkTimeline />

      {/* Final CTA */}
      <FinalCta />
    </div>
  );
}
