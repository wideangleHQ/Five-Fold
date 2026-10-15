import { Hero } from "@/components/hero/Hero";
import { TrustMetrics } from "@/components/sections/TrustMetrics";
import { SolarDecisionPlatform } from "@/components/sections/SolarDecisionPlatform";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { GovernmentScheme } from "@/components/sections/GovernmentScheme";
import { ProjectsTeaser } from "@/components/sections/ProjectsTeaser";
import { SolarCareTeaser } from "@/components/sections/SolarCareTeaser";
import { WhyFivefold } from "@/components/sections/WhyFivefold";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { FinalCta } from "@/components/sections/FinalCta";

export default function HomePage() {
  return (
    <>
      {/* 01 — HERO & CREDENTIALS TRANSITION */}
      <Hero />

      {/* 01b — IMPACT STATISTICS STRIP */}
      <TrustMetrics />

      {/* 02 — FIND YOUR SOLAR SOLUTION (SOLAR DECISION PLATFORM) */}
      <SolarDecisionPlatform />

      {/* 03 — RESIDENTIAL / COMMERCIAL / INDUSTRIAL SOLUTIONS GRID */}
      <ServicesGrid />

      {/* 04 — GOVERNMENT SCHEME */}
      <GovernmentScheme />

      {/* 05 — PROJECTS & CREDENTIALS */}
      <ProjectsTeaser />

      {/* 06 — ENGINEERING */}
      <WhyFivefold />

      {/* 07 — SOLARCARE AMC PLANS (HORIZONTAL PLAN COMPARISON) */}
      <SolarCareTeaser />

      {/* 08 — CUSTOMER REVIEWS */}
      <TestimonialsSection />

      {/* 09 — FAQ */}
      <FaqSection />

      {/* 10 — FINAL CONSULTATION CTA */}
      <FinalCta />
    </>
  );
}
