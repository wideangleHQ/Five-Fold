import React from "react";
import { Metadata } from "next";
import { constructMetadata } from "@/lib/seo";
import { GovernmentSchemesView } from "@/components/schemes/GovernmentSchemesView";

export const metadata: Metadata = constructMetadata({
  title: "Government Solar Schemes & Subsidies | Fivefold Renewable",
  description: "Discover PM Surya Ghar Muft Bijli Yojana, RTS Phase II, and DISCOM Net Metering assistance for residential and commercial solar in Odisha.",
  canonical: "/government-schemes",
});

export default function GovernmentSchemesPage() {
  return <GovernmentSchemesView />;
}

