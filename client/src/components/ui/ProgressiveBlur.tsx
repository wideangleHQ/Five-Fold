"use client";

import React from "react";

export type ProgressiveBlurProps = {
  className?: string;
  backgroundColor?: string;
  position?: "top" | "bottom";
  height?: string;
  blurAmount?: string;
};

export const ProgressiveBlur: React.FC<ProgressiveBlurProps> = ({
  className = "",
  backgroundColor = "transparent",
  position = "top",
  height = "100px",
  blurAmount = "6px",
}) => {
  const isTop = position === "top";
  return (
    <div
      className={`pointer-events-none fixed left-0 w-full z-40 ${className}`}
      style={{
        [isTop ? "top" : "bottom"]: 0,
        height,
        background: isTop
          ? `linear-gradient(to top, transparent, ${backgroundColor})`
          : `linear-gradient(to bottom, transparent, ${backgroundColor})`,
        maskImage: isTop
          ? `linear-gradient(to bottom, black 0%, transparent 100%)`
          : `linear-gradient(to top, black 0%, transparent 100%)`,
        WebkitMaskImage: isTop
          ? `linear-gradient(to bottom, black 0%, transparent 100%)`
          : `linear-gradient(to top, black 0%, transparent 100%)`,
        WebkitBackdropFilter: `blur(${blurAmount})`,
        backdropFilter: `blur(${blurAmount})`,
      }}
    />
  );
};
