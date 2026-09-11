import React from "react";
import { Metadata } from "next";
import Image from "next/image";
import { ShieldCheck, Award, CheckCircle2, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { TrustMetrics } from "@/components/sections/TrustMetrics";
import { WhyFivefold } from "@/components/sections/WhyFivefold";
import { constructMetadata } from "@/lib/seo";

export const metadata: Metadata = constructMetadata({
  title: "About Fivefold Renewable | Engineering-Led Solar EPC",
  description: "Learn about Fivefold Renewable, an engineering-led solar EPC company headquartered in Bhubaneswar, Odisha with 10+ years of experience.",
  canonical: "/about",
});

const TIMELINE_METRICS = [
  { val: "Who We Are", desc: "Fivefold Renewable Pvt. Ltd. — Engineering-led Solar EPC founded in 2016 in Bhubaneswar, Odisha." },
  { val: "10+ Years", desc: "A decade of continuous leadership in industrial, commercial, and residential solar engineering." },
  { val: "20+ MW", desc: "Installed capacity of bankable rooftop and ground-mounted PV plants." },
  { val: "30+ Projects", desc: "Industrial and institutional rooftop plants operating at peak yield across India." },
  { val: "800+ MW", desc: "Cumulative solar design, PVsyst simulation, and engineering consultation experience." },
  { val: "10+ States", desc: "Engineering consultation reach extending across Odisha, West Bengal, Telangana, and beyond." },
];

export default function AboutPage() {
  return (
    <div className="pt-28 pb-16 lg:pt-36 lg:pb-24 bg-white min-h-screen">
      <Container>
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 text-white text-xs font-semibold uppercase tracking-wider">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <span>Company Profile</span>
          </div>
          <h1 className="font-heading text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight">
            Engineering-Led Solar EPC Since 2016
          </h1>
          <p className="text-slate-600 text-lg sm:text-xl font-light leading-relaxed max-w-2xl mx-auto">
            We do not fill roof space with solar modules. We engineer, analyse, and design solar plants to perform for 25–30 years.
          </p>
        </div>

        {/* Narrative Flow Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {TIMELINE_METRICS.map((item, idx) => (
            <div key={item.val} className="p-6 rounded-2xl border border-slate-200 bg-slate-50 space-y-3">
              <div className="text-xs font-mono font-bold text-brand-green uppercase">
                0{idx + 1}
              </div>
              <h2 className="font-heading text-2xl font-extrabold text-slate-900">
                {item.val}
              </h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Photography & Engineering Philosophy */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
          <div className="lg:col-span-6 relative h-[380px] rounded-2xl overflow-hidden border border-slate-200 shadow-md">
            <Image
              src="https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=80&w=1200&auto=format&fit=crop"
              alt="Fivefold Engineering Team On Site"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          <div className="lg:col-span-6 space-y-4">
            <span className="text-xs font-mono font-bold text-brand-green uppercase">
              Engineering-Led Philosophy
            </span>
            <h3 className="font-heading text-3xl font-bold text-slate-900">
              &ldquo;We do not sell drawings. We engineer bankable solar plants.&rdquo;
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Founded to bridge the gap between architectural drawings and electrical reality, Fivefold combines 3D shadow modeling, PVsyst yield simulations, wind-load structural engineering, and DISCOM grid compliance to deliver solar plants with long-term bankability.
            </p>
            <div className="pt-2">
              <Button href="/contact" variant="primary" size="md">
                <span>Talk to Our Engineering Team</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Why Fivefold */}
        <WhyFivefold />
      </Container>
    </div>
  );
}
