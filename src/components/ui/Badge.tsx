import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "green" | "dark" | "amber" | "neutral";
  children: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = "green",
  children,
  className,
  ...props
}) => {
  const variants = {
    green: "bg-[#20435F]/10 text-[#20435F] border-[#20435F]/20 font-sans font-semibold",
    dark: "bg-[#0C3046] text-white border-[#0C3046]/30 font-sans font-semibold",
    amber: "bg-[#00A9D6]/15 text-[#006f8c] border-[#00A9D6]/30 font-sans font-semibold",
    neutral: "bg-slate-100 text-brand-charcoal border-slate-200 font-sans font-semibold",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center tracking-wide text-xs px-2.5 py-1 rounded-full border uppercase font-sans font-semibold",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};
