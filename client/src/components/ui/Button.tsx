"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "amber";
  size?: "sm" | "md" | "lg";
  href?: string;
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", href, children, ...props }, ref) => {
    const baseStyles =
      "group inline-flex items-center justify-center font-sans font-semibold rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#173B53] focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer";

    const variants = {
      primary:
        "bg-[#173B53] hover:bg-[#0f2738] text-white shadow-xs border border-transparent font-semibold",
      secondary:
        "bg-[#0f2738] hover:bg-[#173B53] text-white shadow-xs border border-transparent font-semibold",
      outline:
        "border border-[#DCE2E2] bg-white text-[#173B53] hover:bg-[#173B53] hover:border-[#173B53] hover:text-white font-semibold",
      ghost:
        "bg-transparent text-[#173B53] hover:bg-[#F6F3EC] hover:text-[#1684C7] font-medium",
      amber:
        "bg-[#1684C7] hover:bg-[#126fa8] text-white font-bold shadow-xs border border-transparent",
    };

    const sizes = {
      sm: "px-3.5 py-1.5 text-xs sm:text-sm gap-1.5",
      md: "px-5 py-2.5 text-sm sm:text-base gap-2",
      lg: "px-6 py-3 text-base sm:text-lg font-semibold gap-2.5",
    };

    const combinedClassName = cn(baseStyles, variants[variant], sizes[size], className);

    if (href) {
      return (
        <Link href={href} className={combinedClassName}>
          {children}
        </Link>
      );
    }

    return (
      <button ref={ref} className={combinedClassName} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

