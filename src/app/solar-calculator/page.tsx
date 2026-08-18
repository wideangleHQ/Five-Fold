import React from "react";
import { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SolarCalculator } from "@/components/calculator/SolarCalculator";
import { constructMetadata } from "@/lib/seo";

export const metadata: Metadata = constructMetadata({
  title: "Smart Solar Calculator | Fivefold Renewable",
  description: "Calculate your estimated rooftop solar capacity, annual electricity generation, savings, and government subsidy eligibility in Odisha.",
  canonical: "/solar-calculator",
});

export default function SolarCalculatorPage() {
  return (
    <div className="pt-28 pb-16 lg:pt-36 lg:pb-24 bg-slate-50 min-h-screen">
      <Container>
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-green/10 text-brand-green text-xs font-semibold uppercase tracking-wider">
            Interactive Decision Engine
          </div>
          <h1 className="font-heading text-3xl sm:text-5xl font-extrabold text-slate-900">
            Smart Solar Calculator
          </h1>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Answer a few quick questions about your property and electricity bills to generate an indicative solar estimate tailored to Odisha solar irradiance models.
          </p>
        </div>

        <SolarCalculator />
      </Container>
    </div>
  );
}
