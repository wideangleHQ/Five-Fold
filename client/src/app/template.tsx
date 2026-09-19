"use client";

import React from "react";
import { FivefoldPreloader } from "@/components/ui/FivefoldPreloader";

export default function Template({ children }: { children: React.ReactNode }) {
  // In Next.js App Router, template.tsx creates a new instance for each route segment on navigation.
  // This causes the FivefoldPreloader to mount and play its animation on every route change.
  return (
    <>
      <FivefoldPreloader />
      {children}
    </>
  );
}
