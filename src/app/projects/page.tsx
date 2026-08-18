import { Metadata } from "next";
import { constructMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/Container";
import { ProjectsTeaser } from "@/components/sections/ProjectsTeaser";
import { FinalCta } from "@/components/sections/FinalCta";
import { Layers } from "lucide-react";

export const metadata: Metadata = constructMetadata({
  title: "Solar Project Portfolio | Odisha Industrial & Rooftop Solar",
  description: "Browse Fivefold's verified solar EPC installations across industrial rooftops, commercial complexes, and institutions in Odisha and Eastern India.",
  path: "/projects",
});

export default function ProjectsPage() {
  return (
    <div className="pt-24 sm:pt-32">
      {/* Page Hero */}
      <section className="py-16 sm:py-20 bg-brand-charcoal text-white relative overflow-hidden">
        <Container>
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-amber/40 bg-brand-amber/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-brand-amber">
              <Layers className="h-4 w-4" />
              Verified Credentials
            </div>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
              Solar Project Portfolio
            </h1>
            <p className="text-slate-300 text-lg sm:text-xl font-light leading-relaxed">
              Explore our track record of high-yield rooftop and ground-mounted solar installations engineered across industrial, commercial, and institutional sectors.
            </p>
          </div>
        </Container>
      </section>

      {/* Projects Grid */}
      <ProjectsTeaser />

      {/* Final CTA */}
      <FinalCta />
    </div>
  );
}
