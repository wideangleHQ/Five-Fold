import { Hero } from "@/components/hero/Hero";
import { SolarDecisionPlatform } from "@/components/sections/SolarDecisionPlatform";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { GovernmentScheme } from "@/components/sections/GovernmentScheme";
import { ProjectsTeaser } from "@/components/sections/ProjectsTeaser";
import { SolarCareTeaser } from "@/components/sections/SolarCareTeaser";
import { WhyFivefold } from "@/components/sections/WhyFivefold";
import { FaqSection } from "@/components/sections/FaqSection";
import { FinalCta } from "@/components/sections/FinalCta";

export default function HomePage() {
  return (
    <>
      {/* 01 — HERO & CREDENTIALS TRANSITION */}
      <Hero />

      {/* 02 — FIND YOUR SOLAR SOLUTION (SOLAR DECISION PLATFORM) */}
      <SolarDecisionPlatform />

      {/* 03 — RESIDENTIAL / COMMERCIAL / INDUSTRIAL SOLUTIONS GRID */}
      <ServicesGrid />

      {/* 04 — GOVERNMENT SCHEME */}
      <GovernmentScheme />

      {/* 05 — PROJECTS & CREDENTIALS */}
      <ProjectsTeaser />

      {/* 06 — ENGINEERING (INCL. ENGINEERING PRECISION) */}
      <WhyFivefold />

      {/* 07 — SOLARCARE AMC PLANS (HORIZONTAL PLAN COMPARISON) */}
      <SolarCareTeaser />

      {/* 08 — FAQ */}
      <FaqSection />

      {/* 09 — FINAL CONSULTATION CTA */}
      <FinalCta />
    </>
  );
}
