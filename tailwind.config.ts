import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: "#20435F",
          "navy-dark": "#0C3046",
          cyan: "#00A9D6",
          green: "#20435F",
          "green-hover": "#0C3046",
          "green-dark": "#0C3046",
          "off-white": "#F7F8F5",
          charcoal: "#111615",
          amber: "#00A9D6",
          "hero-gray": "#F2F2F2",
          slate: "#2D3748",
          muted: "#64748B",
          border: "#E2E8F0",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        heading: ["var(--font-manrope)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
