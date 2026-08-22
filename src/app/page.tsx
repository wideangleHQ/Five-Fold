import { Hero } from "@/components/hero/Hero";
import { SolarDecisionPlatform } from "@/components/sections/SolarDecisionPlatform";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { EngineeringCapabilities } from "@/components/sections/EngineeringCapabilities";
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

      {/* 04 — RESIDENTIAL / COMMERCIAL / INDUSTRIAL SOLUTIONS GRID */}
      <ServicesGrid />

      {/* 05 — ENGINEERING ADVANTAGE */}
      <EngineeringCapabilities />

      {/* 06 — GOVERNMENT SCHEME */}
      <GovernmentScheme />

      {/* 07 — PROJECTS & CREDENTIALS */}
      <ProjectsTeaser />

      {/* 08 — SOLARCARE / LONG-TERM SUPPORT */}
      <SolarCareTeaser />

      {/* 09 — WHY FIVEFOLD */}
      <WhyFivefold />

      {/* 10 — FAQ */}
      <FaqSection />

      {/* 11 — FINAL CONSULTATION CTA */}
      <FinalCta />
    </>
  );
}
