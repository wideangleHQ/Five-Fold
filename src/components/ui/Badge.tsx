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
    green: "bg-brand-green/10 text-brand-green border-brand-green/20 font-sans font-semibold",
    dark: "bg-brand-green-dark text-white border-brand-green-dark/30 font-sans font-semibold",
    amber: "bg-brand-amber/15 text-amber-900 border-brand-amber/30 font-sans font-semibold",
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
