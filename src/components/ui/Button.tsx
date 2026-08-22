"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onAnimationStart" | "onDrag" | "onDragStart" | "onDragEnd" | "style"> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "amber";
  size?: "sm" | "md" | "lg";
  href?: string;
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", href, children, ...props }, ref) => {
    const baseStyles =
      "group inline-flex items-center justify-center font-sans font-semibold rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#20435F] focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer";

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
      sm: "px-3.5 py-1.5 text-xs sm:text-sm gap-1.5",
      md: "px-5 py-2.5 text-sm sm:text-base gap-2",
      lg: "px-6 py-3 text-base sm:text-lg font-semibold gap-2.5",
    };

    const combinedClassName = cn(baseStyles, variants[variant], sizes[size], className);

    const springTransition = {
      type: "spring",
      stiffness: 400,
      damping: 25,
      mass: 0.8,
    };

    if (href) {
      return (
        <motion.div
          whileHover={{ scale: 1.025, y: -1 }}
          whileTap={{ scale: 0.98 }}
          transition={springTransition}
          className="inline-block"
        >
          <Link href={href} className={combinedClassName}>
            {children}
          </Link>
        </motion.div>
      );
    }

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.025, y: -1 }}
        whileTap={{ scale: 0.98 }}
        transition={springTransition}
        className={combinedClassName}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);

Button.displayName = "Button";
