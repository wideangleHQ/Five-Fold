import { describe, it, expect } from "vitest";
import { SITE_CONFIG } from "@/config/site";
import { generateMetadata } from "@/app/page";
import { existsSync, readFileSync } from "fs";
import { join } from "path";

const SRC = join(__dirname, "../..");

describe("Temporary Website Maintenance Mode", () => {
  it("centralized configuration has maintenanceMode flag", () => {
    expect(SITE_CONFIG).toBeDefined();
    expect(typeof SITE_CONFIG.maintenanceMode).toBe("boolean");
  });

  it("sets appropriate SEO metadata for homepage in maintenance mode", async () => {
    const meta = await generateMetadata();
    if (SITE_CONFIG.maintenanceMode) {
      expect(meta.title).toContain("Under Maintenance");
      expect(meta.description).toContain("scheduled maintenance");
    } else {
      expect(meta.title).toContain("Fivefold Renewable");
    }
  });

  it("app/page.tsx preserves all original homepage sections", () => {
    const pageContent = readFileSync(join(SRC, "app/page.tsx"), "utf8");
    const requiredSections = [
      "<Hero />",
      "<TrustMetrics />",
      "<SolarDecisionPlatform />",
      "<ServicesGrid />",
      "<GovernmentScheme />",
      "<ProjectsTeaser />",
      "<WhyFivefold />",
      "<SolarCareTeaser />",
      "<TestimonialsSection />",
      "<FaqSection />",
      "<FinalCta />",
    ];

    for (const section of requiredSections) {
      expect(pageContent).toContain(section);
    }
  });

  it("protects all other existing routes without modification", () => {
    const routes = [
      "app/about/page.tsx",
      "app/contact/page.tsx",
      "app/residential-solar/page.tsx",
      "app/commercial-solar/page.tsx",
      "app/industrial-solar/page.tsx",
      "app/engineering/page.tsx",
      "app/solarcare/page.tsx",
      "app/warranty/page.tsx",
      "app/faq/page.tsx",
      "app/smart-solar-calculator/page.tsx",
      "app/government-schemes/page.tsx",
    ];

    for (const route of routes) {
      expect(existsSync(join(SRC, route))).toBe(true);
      const content = readFileSync(join(SRC, route), "utf8");
      // Ensure no maintenance mode redirect or interception was placed inside other pages
      expect(content).not.toMatch(/SITE_CONFIG\.maintenanceMode/);
      expect(content).not.toMatch(/MaintenancePage/);
    }
  });

  it("no HTTP or middleware redirects were created", () => {
    // Ensure no middleware.ts redirecting to /maintenance was created
    const middlewarePath = join(SRC, "middleware.ts");
    if (existsSync(middlewarePath)) {
      const middlewareContent = readFileSync(middlewarePath, "utf8");
      expect(middlewareContent).not.toMatch(/\/maintenance/);
    }
  });
});

