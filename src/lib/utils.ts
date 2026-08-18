import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatKw(kw: number): string {
  return `${kw.toLocaleString("en-IN")} kWp`;
}
