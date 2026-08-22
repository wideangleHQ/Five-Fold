import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Header } from "@/components/navigation/Header";
import { Footer } from "@/components/layout/Footer";
import { ScrollRevealInitializer } from "@/components/ui/ScrollRevealInitializer";
import { ProgressiveBlur } from "@/components/ui/ProgressiveBlur";
import { constructMetadata, generateOrganizationSchema } from "@/lib/seo";

// Load local Inter font files from src/assets/fonts/Inter
const inter = localFont({
  src: [
    { path: "../assets/fonts/Inter/Inter-Regular.woff2", weight: "400", style: "normal" },
    { path: "../assets/fonts/Inter/Inter-Medium.woff2", weight: "500", style: "normal" },
    { path: "../assets/fonts/Inter/Inter-SemiBold.woff2", weight: "600", style: "normal" },
    { path: "../assets/fonts/Inter/Inter-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-inter",
  display: "swap",
});

// Load local Manrope font files from src/assets/fonts/manrope
const manrope = localFont({
  src: [
    { path: "../assets/fonts/manrope/Manrope-Regular.ttf", weight: "400", style: "normal" },
    { path: "../assets/fonts/manrope/Manrope-Medium.ttf", weight: "500", style: "normal" },
    { path: "../assets/fonts/manrope/Manrope-SemiBold.ttf", weight: "600", style: "normal" },
    { path: "../assets/fonts/manrope/Manrope-Bold.ttf", weight: "700", style: "normal" },
    { path: "../assets/fonts/manrope/Manrope-ExtraBold.ttf", weight: "800", style: "normal" },
  ],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = constructMetadata();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = generateOrganizationSchema();

  return (
    <html lang="en" className={`${inter.variable} ${manrope.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col font-sans bg-white text-brand-charcoal antialiased pb-0 mb-0">
        <ScrollRevealInitializer />
        <ProgressiveBlur position="top" height="100px" blurAmount="6px" />
        <ProgressiveBlur position="bottom" height="100px" blurAmount="6px" />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
