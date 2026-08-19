import React from "react";
import { Container } from "@/components/ui/Container";

const METRICS = [
  { value: "10+ Years", label: "Renewable Energy" },
  { value: "20+ MW", label: "Installed" },
  { value: "30+ Projects", label: "Delivered" },
  { value: "800+ MW", label: "Engineering Experience" },
  { value: "10+ States", label: "Engineering Reach" },
];

export const TrustMetrics: React.FC = () => {
  return (
    <section className="bg-[#0B3D2E] text-white py-10 border-b border-emerald-900/60 font-sans">
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-emerald-800/80">
          {METRICS.map((metric, index) => (
            <div key={metric.label} className={`pt-4 md:pt-0 ${index > 0 ? "md:pl-4" : ""}`}>
              <div className="font-heading text-2xl sm:text-3xl font-extrabold text-white">
                {metric.value}
              </div>
              <div className="font-sans text-xs text-slate-300 font-medium mt-1">
                {metric.label}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
