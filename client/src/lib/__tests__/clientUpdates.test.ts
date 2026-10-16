import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { COMPANY_CONTACT, TAGLINE, WHATSAPP_DEFAULT_MESSAGE, whatsappUrl } from "@/lib/company";
import { FAQS_DATA } from "@/data/faqs";
import { GOOGLE_REVIEWS } from "@/data/reviews";
import { TRUST_METRICS } from "@/components/sections/TrustMetrics";
import { CERTIFICATIONS, CERTIFIED_ENTITY, CERTIFYING_BODY } from "@/data/certifications";
import {
  APPLICATION_STEPS,
  CENTRAL_ELIGIBILITY,
  NOT_COVERED,
  OFFICIAL_LINKS,
  subsidyAtCapacity,
} from "@/data/government-schemes";

const SRC = join(__dirname, "..", "..");
const read = (p: string) => readFileSync(join(SRC, p), "utf8");

function walk(dir: string, out: string[] = []): string[] {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) walk(full, out);
    else if (/\.(ts|tsx)$/.test(name) && !full.includes("__tests__")) out.push(full);
  }
  return out;
}

describe("company contact configuration", () => {
  it("uses the approved number for display, tel: and WhatsApp", () => {
    expect(COMPANY_CONTACT.phoneHref).toBe("tel:7008133793");
    expect(COMPANY_CONTACT.phoneDisplay).toBe("+91 70081 33793");
    expect(COMPANY_CONTACT.whatsappNumber).toBe("917008133793");
  });

  it("builds a wa.me URL with the international number and an encoded message", () => {
    const url = whatsappUrl();
    expect(url.startsWith("https://wa.me/917008133793?text=")).toBe(true);
    expect(url).not.toContain("+");
    expect(decodeURIComponent(url.split("?text=")[1])).toBe(WHATSAPP_DEFAULT_MESSAGE);
    expect(decodeURIComponent(whatsappUrl("Hi & bye").split("?text=")[1])).toBe("Hi & bye");
  });

  it("the two approved numbers live only in the shared config; the old 33792 number is gone", () => {
    expect(COMPANY_CONTACT.secondaryPhoneHref).toBe("tel:7008101078");
    expect(COMPANY_CONTACT.secondaryPhoneDisplay).toBe("+91 70081 01078");
    const company = join(SRC, "lib/company.ts");
    const stale = /7008133792|70081 33792/;
    expect(walk(SRC).filter((f) => stale.test(readFileSync(f, "utf8")))).toEqual([]);
    const second = /7008101078|70081 01078/;
    expect(walk(SRC).filter((f) => f !== company && second.test(readFileSync(f, "utf8")))).toEqual([]);
  });

  it("both numbers appear on the contact page, mobile menu, final CTA and structured data", () => {
    for (const f of ["app/contact/page.tsx", "components/navigation/MobileMenu.tsx", "components/sections/FinalCta.tsx"]) {
      expect(read(f)).toMatch(/COMPANY_CONTACT\.phoneHref/);
      expect(read(f)).toMatch(/COMPANY_CONTACT\.secondaryPhoneHref/);
    }
    expect(read("lib/seo.ts")).toMatch(/contactPhoneAlt/);
    expect(FAQS_DATA.find((f) => /site assessment or consultation/.test(f.question))!.answer).toContain(COMPANY_CONTACT.secondaryPhoneDisplay);
  });

  it("the footer shows both numbers as tel: links", () => {
    const footer = read("components/layout/Footer.tsx");
    expect(footer).toMatch(/COMPANY_CONTACT\.phoneHref/);
    expect(footer).toMatch(/COMPANY_CONTACT\.secondaryPhoneHref/);
  });
});

describe("WhatsApp button and Contact Us access", () => {
  it("is rendered once, in the shared root layout, with safe link attributes", () => {
    const layout = read("app/layout.tsx");
    expect(layout.match(/<WhatsAppButton\s*\/>/g)).toHaveLength(1);
    const btn = read("components/ui/WhatsAppButton.tsx");
    expect(btn).toMatch(/aria-label="Enquire on WhatsApp"/);
    expect(btn).toMatch(/rel="noopener noreferrer"/);
    expect(btn).toMatch(/whatsappUrl\(\)/);
  });

  it("the header and mobile menu link to the existing contact page", () => {
    expect(read("components/navigation/Header.tsx")).toMatch(/href="\/contact"/);
    expect(read("components/navigation/MobileMenu.tsx")).toMatch(/href="\/contact"/);
  });
});

describe("FAQ content", () => {
  const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();

  it("has at least 20 distinct, non-empty questions and answers", () => {
    expect(FAQS_DATA.length).toBeGreaterThanOrEqual(20);
    expect(new Set(FAQS_DATA.map((f) => norm(f.question))).size).toBe(FAQS_DATA.length);
    expect(new Set(FAQS_DATA.map((f) => norm(f.answer))).size).toBe(FAQS_DATA.length);
    expect(new Set(FAQS_DATA.map((f) => f.id)).size).toBe(FAQS_DATA.length);
    for (const f of FAQS_DATA) {
      expect(f.question.trim().length).toBeGreaterThan(10);
      expect(f.answer.trim().length).toBeGreaterThan(40);
    }
  });

  it("subsidy answers use the same figures as the schemes page", () => {
    const three = subsidyAtCapacity(3);
    expect(three.central).toBe(78000);
    expect(three.state).toBe(60000);
    const all = FAQS_DATA.map((f) => f.answer).join(" ");
    expect(all).toContain("₹78,000");
    expect(all).toContain("₹60,000");
  });

  it("contact answer carries the approved number", () => {
    const contact = FAQS_DATA.find((f) => /site assessment or consultation/.test(f.question))!;
    expect(contact.answer).toContain(COMPANY_CONTACT.phoneDisplay);
  });
});

describe("government scheme content", () => {
  it("capacity table matches the verified central and Odisha structure", () => {
    expect(subsidyAtCapacity(1)).toMatchObject({ central: 30000, state: 25000, combined: 55000 });
    expect(subsidyAtCapacity(2)).toMatchObject({ central: 60000, state: 50000, combined: 110000 });
    expect(subsidyAtCapacity(3)).toMatchObject({ central: 78000, state: 60000, combined: 138000 });
  });

  it("official links are https and on the expected official domains", () => {
    const hosts = OFFICIAL_LINKS.map((l) => new URL(l.href));
    for (const u of hosts) expect(u.protocol).toBe("https:");
    expect(hosts.map((u) => u.hostname).sort()).toEqual(
      ["oredaodisha.com", "pmsuryaghar.gov.in", "rts.odisha.gov.in", "solarrooftop.gov.in"].sort(),
    );
  });

  it("eligibility and process lists are populated and restrict to residential", () => {
    expect(CENTRAL_ELIGIBILITY.length).toBeGreaterThanOrEqual(4);
    expect(APPLICATION_STEPS.length).toBeGreaterThanOrEqual(6);
    expect(NOT_COVERED).toMatch(/not eligible/i);
  });

  it("the schemes page renders the sections and offers contact actions", () => {
    const view = read("components/schemes/GovernmentSchemesView.tsx");
    expect(view).toMatch(/PM Surya Ghar and Odisha State Subsidy/);
    expect(view).toMatch(/rel="noopener noreferrer"/);
    expect(view).toMatch(/COMPANY_CONTACT\.contactPath/);
    expect(view).toMatch(/whatsappUrl/);
  });
});

describe("tagline", () => {
  it("is exactly 'Invest in Green. Benefit for Life.' as the hero headline, plus About and closing CTA", () => {
    expect(TAGLINE).toBe("Invest in Green. Benefit for Life.");
    for (const f of ["app/about/page.tsx", "components/sections/FinalCta.tsx"]) {
      expect(read(f)).toMatch(/\{TAGLINE\}/);
    }
    const hero = read("components/hero/Hero.tsx");
    const h1 = hero.slice(hero.indexOf("<h1"), hero.indexOf("</h1>")).replace(/<[^>]+>|\{" "\}/g, " ").replace(/\s+/g, " ").trim();
    expect(h1).toBe(TAGLINE);
    expect(hero).not.toMatch(/Powering Odisha|Smarter Solar Energy|hero-tagline/);
  });
});

describe("scope exclusions and unverified claims", () => {
  it("ISO claims match the supplied certificates and are valid", () => {
    expect(CERTIFICATIONS.map((c) => c.standard)).toEqual(["ISO 9001:2015", "ISO 45001:2018"]);
    expect(CERTIFICATIONS.map((c) => c.certificateNo)).toEqual(["26EQRP12", "26EORN15"]);
    expect(CERTIFIED_ENTITY).toBe("Fivefold Renewable Private Limited");
    expect(CERTIFYING_BODY).toBe("Assurance Quality Certification LLC");
    for (const c of CERTIFICATIONS) {
      expect(new Date(c.expiry).getTime()).toBeGreaterThan(new Date(c.issued).getTime());
      expect(c.imageAlt).toContain(c.standard);
    }
  });

  it("ISO standards are only claimed where the certificates support it", () => {
    const allowed = ["data/certifications.ts", "app/about/page.tsx"].map((p) => join(SRC, p));
    const offenders = walk(SRC).filter((f) => !allowed.includes(f) && /ISO\s?(9001|45001)/i.test(readFileSync(f, "utf8")));
    expect(offenders).toEqual([]);
  });

  it("shows the seven supplied Google reviews above the FAQ, with alt text", () => {
    expect(GOOGLE_REVIEWS).toHaveLength(7);
    for (const r of GOOGLE_REVIEWS) expect(r.alt.length).toBeGreaterThan(40);
    const home = read("app/page.tsx");
    const at = home.indexOf("<TestimonialsSection />");
    expect(at).toBeGreaterThan(0);
    expect(at).toBeLessThan(home.indexOf("<FaqSection />"));
  });

  it("review images are not draggable, not linked, and the context menu is blocked", () => {
    const c = read("components/sections/TestimonialsSection.tsx");
    expect(c).toMatch(/draggable=\{false\}/);
    expect(c).toMatch(/pointer-events-none/);
    expect(c).toMatch(/onContextMenu=\{\(e\) => e\.preventDefault\(\)\}/);
    expect(c).not.toMatch(/<a[\s>]/);
    expect(c).not.toMatch(/next\/link/);
    expect(c).toMatch(/rounded-2xl/);
  });

  it("is a continuous right-to-left marquee, not a slideshow", () => {
    const c = read("components/sections/TestimonialsSection.tsx");
    expect(c).toMatch(/review-marquee/);
    expect(c).not.toMatch(/setInterval|useState/);
    const css = read("app/globals.css");
    expect(css).toMatch(/@keyframes review-marquee[\s\S]*translateX\(-50%\)/);
    expect(css).toMatch(/animation: review-marquee [\d.]+s linear infinite/);
  });
});

describe("static hero", () => {
  const hero = read("components/hero/Hero.tsx");

  it("uses Hero Section Bg.png as its background", () => {
    expect(hero).toMatch(/@\/assets\/Images\/Hero Section Bg\.png/);
  });

  it("has no scroll-driven animation, pinning, canvas or image sequence", () => {
    expect(hero).not.toMatch(/ScrollTrigger|scrollTrigger|sticky|<canvas|getContext|heroFrames|HERO_FRAME|scrub|pin:/);
    expect(hero).not.toMatch(/h-\[280vh\]/);
  });
});

describe("statistics strip", () => {
  it("shows the five verified figures, matching the About page", () => {
    expect(TRUST_METRICS.map((m) => `${m.value} ${m.unit} ${m.label}`.replace(/\s+/g, " ").trim())).toEqual([
      "10+ Years of Experience",
      "20+ MW Installed Capacity",
      "30+ Projects Delivered",
      "800+ MW Engineering Experience",
      "10+ States Engineering Reach Across India",
    ]);
    const about = read("app/about/page.tsx");
    for (const stat of ["10+ Years", "20+ MW", "30+ Projects", "800+ MW", "10+ States"]) expect(about).toContain(stat);
  });

  it("renders directly below the hero and reuses the existing scroll-reveal infrastructure", () => {
    const home = read("app/page.tsx");
    expect(home.indexOf("<Hero />")).toBeLessThan(home.indexOf("<TrustMetrics />"));
    expect(home.indexOf("<TrustMetrics />")).toBeLessThan(home.indexOf("<SolarDecisionPlatform />"));
    const c = read("components/sections/TrustMetrics.tsx");
    expect(c).toMatch(/data-reveal="cards-container"/);
    expect(c).toMatch(/lg:grid-cols-5/);
    expect(c).not.toMatch(/shadow|gradient|rounded/);
  });

  it("counts the numbers up once on entering view, honouring reduced motion and cleaning up", () => {
    const c = read("components/sections/TrustMetrics.tsx");
    expect(c).toMatch(/IntersectionObserver/);
    expect(c).toMatch(/gsap\.to\(counter/);
    expect(c).toMatch(/prefers-reduced-motion/);
    expect(c).toMatch(/io\.disconnect\(\);\s+tween\?\.kill\(\)/);
    expect(c).toMatch(/minWidth/);
  });
});
