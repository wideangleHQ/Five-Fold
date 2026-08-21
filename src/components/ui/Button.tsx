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
      "inline-flex items-center justify-center font-sans font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#20435F] focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.99]";

    const variants = {
      primary:
        "bg-[#20435F] hover:bg-[#0C3046] text-white shadow-xs border border-transparent font-semibold",
      secondary:
        "bg-[#0C3046] hover:bg-[#082333] text-white shadow-xs border border-transparent font-semibold",
      outline:
        "border border-slate-300 bg-white text-[#111615] hover:bg-[#20435F] hover:border-[#20435F] hover:text-white font-semibold",
      ghost:
        "bg-transparent text-[#111615] hover:bg-slate-100 hover:text-[#20435F] font-medium",
      amber:
        "bg-[#00A9D6] hover:bg-[#0094bd] text-white font-bold shadow-xs border border-transparent",
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
