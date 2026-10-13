import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { COMPANY_CONTACT, TAGLINE, WHATSAPP_DEFAULT_MESSAGE, whatsappUrl } from "@/lib/company";
import { FAQS_DATA } from "@/data/faqs";
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

  it("no stale company phone numbers remain in the source", () => {
    const stale = /7008101078|70081 01078|7008133792|70081 33792/;
    const offenders = walk(SRC).filter((f) => stale.test(readFileSync(f, "utf8")));
    expect(offenders).toEqual([]);
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
  it("does not publish ISO claims without certificate evidence", () => {
    const offenders = walk(SRC).filter((f) => /ISO\s?(9001|45001)/i.test(readFileSync(f, "utf8")));
    expect(offenders).toEqual([]);
  });

  it("does not introduce a reviews/testimonials feature", () => {
    const offenders = walk(SRC).filter((f) => /testimonial|googleReview|starRating/i.test(readFileSync(f, "utf8")));
    expect(offenders).toEqual([]);
  });
});
