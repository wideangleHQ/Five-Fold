import React from "react";
import { Metadata } from "next";
import { Factory, ShieldCheck, Cpu, ArrowRight, Zap, CheckCircle2, FileText } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { constructMetadata } from "@/lib/seo";

export const metadata: Metadata = constructMetadata({
  title: "Industrial Rooftop Solar EPC | Fivefold Renewable",
  description: "High-capacity megawatt-scale industrial solar power plants for factories & manufacturing units in Odisha. Engineering-led 25-30 year bankable assets.",
  canonical: "/industrial-solar",
});

const INDUSTRIAL_PILLARS = [
  { title: "System Optimisation", desc: "PVsyst 3D solar yield simulation and custom inverter ratio balancing for high thermal environments." },
  { title: "Structural Engineering", desc: "Custom aluminum and hot-dip galvanized mounting structures verified for regional coastal wind loads." },
  { title: "Electrical Engineering", desc: "Harmonic analysis, protection relay coordination, HT/LT substation synchronization & zero-export controls." },
  { title: "Generation Performance", desc: "Tier-1 Mono PERC bifacial modules engineered for maximum specific yield per square meter." },
  { title: "SCADA & Telemetry", desc: "Real-time string-level monitoring, automated fault alerts, and centralized operational dashboards." },
  { title: "Long-Term Reliability", desc: "Lifecycle maintenance protocols ensuring bankable 25–30 year asset degradation curves." },
];

export default function IndustrialSolarPage() {
  return (
    <div className="pt-28 pb-16 lg:pt-36 lg:pb-24 bg-white min-h-screen">
      <Container>
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-green text-white text-xs font-semibold uppercase tracking-wider">
            <Factory className="h-4 w-4 text-emerald-400" />
            <span>Industrial EPC Engineering</span>
          </div>
          <h1 className="font-heading text-3xl sm:text-5xl font-extrabold text-slate-900">
            Industrial Solar Solutions
          </h1>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Megawatt-scale rooftop and ground-mounted solar power plants engineered for manufacturing plants, steel mills, warehouses, and heavy industrial facilities across India.
          </p>
          <div className="pt-2 flex justify-center">
            <Button href="/contact" variant="primary" size="lg">
              <span>Discuss My Industrial Project</span>
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Engineering Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {INDUSTRIAL_PILLARS.map((pillar) => (
            <div key={pillar.title} className="p-6 rounded-2xl border border-slate-200 bg-slate-50 space-y-3">
              <div className="flex items-center gap-2 text-brand-green font-bold text-sm">
                <CheckCircle2 className="h-5 w-5 text-brand-green shrink-0" />
                <span>{pillar.title}</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Quote Block */}
        <div className="p-8 rounded-2xl bg-slate-900 text-white border border-slate-800 space-y-4 text-center">
          <div className="text-xs font-mono font-bold uppercase text-emerald-400">
            Engineering Positioning
          </div>
          <p className="font-heading text-xl sm:text-2xl font-bold text-white max-w-2xl mx-auto">
            &ldquo;We do not sell drawings. We engineer bankable solar plants.&rdquo;
          </p>
          <p className="text-xs text-slate-300 max-w-xl mx-auto">
            Our industrial plants are backed by rigorous pre-construction DPRs, structural safety audits, and guaranteed performance ratios.
          </p>
        </div>
      </Container>
    </div>
  );
}
