import type { Metadata } from "next";
import { SITE_CONFIG } from "@/config/site";
import { MaintenancePage } from "@/components/maintenance/MaintenancePage";
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
import { constructMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  if (SITE_CONFIG.maintenanceMode) {
    return constructMetadata({
      title: "We Are Under Maintenance",
      description:
        "Our website is currently undergoing scheduled maintenance. We'll be back online shortly.",
    });
  }
  return constructMetadata();
}

/**
 * Preserved original homepage implementation.
 * Restored immediately when `SITE_CONFIG.maintenanceMode === false`.
 */
function DefaultHomePage() {
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

/**
 * Root Homepage Route (/)
 *
 * Controlled by `SITE_CONFIG.maintenanceMode` in `@/config/site.ts`.
 * - When `true`: Displays the minimal "We Are Under Maintenance" landing page.
 * - When `false`: Immediately displays the full default Fivefold homepage.
 *
 * No redirects, no middleware rewrites, no URL changes. Returns HTTP 200.
 */
export default function HomePage() {
  if (SITE_CONFIG.maintenanceMode) {
    return <MaintenancePage />;
  }

  return <DefaultHomePage />;
}
