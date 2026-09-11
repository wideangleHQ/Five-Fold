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
          navy: "#173B53",
          "navy-dark": "#0f2738",
          cyan: "#1684C7",
          accent: "#1684C7",
          green: "#173B53",
          "green-hover": "#0f2738",
          "green-dark": "#0f2738",
          "off-white": "#F6F3EC",
          "light-bg": "#F6F3EC",
          surface: "#FFFFFF",
          charcoal: "#173B53",
          "secondary-text": "#526673",
          amber: "#1684C7",
          "hero-gray": "#F6F3EC",
          slate: "#526673",
          muted: "#526673",
          border: "#DCE2E2",
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
