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
      "inline-flex items-center justify-center font-sans font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-green focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.99]";

    const variants = {
      primary:
        "bg-[#1F7A45] hover:bg-[#155E34] text-white shadow-xs border border-transparent font-semibold",
      secondary:
        "bg-[#0B3D2E] hover:bg-[#07281e] text-white shadow-xs border border-transparent font-semibold",
      outline:
        "border border-slate-300 bg-white text-[#111615] hover:bg-[#1F7A45] hover:border-[#1F7A45] hover:text-white font-semibold",
      ghost:
        "bg-transparent text-[#111615] hover:bg-slate-100 hover:text-[#1F7A45] font-medium",
      amber:
        "bg-[#E9B949] hover:bg-[#d4a234] text-[#111615] font-semibold shadow-xs border border-transparent",
    };

    const sizes = {
      sm: "px-3.5 py-1.5 text-xs sm:text-sm",
      md: "px-5 py-2.5 text-sm sm:text-base",
      lg: "px-6 py-3 text-base sm:text-lg font-semibold",
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
