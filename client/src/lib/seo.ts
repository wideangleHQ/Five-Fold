import { Metadata } from "next";

export const SITE_CONFIG = {
  name: "Fivefold Renewable",
  legalName: "Fivefold Renewable Pvt. Ltd.",
  description:
    "Fivefold Renewable is an engineering-led Solar EPC company in Odisha providing rooftop and ground-mounted solar solutions for industrial, commercial, and residential clients.",
  url: "https://fivefoldsolar.com",
  ogImage: "/images/og-default.jpg",
  contactPhone: "+91 70081 01078",
  contactPhoneAlt: "+91 70081 33792",
  contactEmail: "info@fivefoldsolar.com",
  address: "Plot No. SCR 2, Lane No. 6, Anant Vihar Phase-3, Pokhariput, Bhubaneswar – 751020, Odisha, India",
};

export function constructMetadata({
  title,
  description = SITE_CONFIG.description,
  path = "",
  canonical,
  image = SITE_CONFIG.ogImage,
}: {
  title?: string;
  description?: string;
  path?: string;
  canonical?: string;
  image?: string;
} = {}): Metadata {
  const fullTitle = title
    ? `${title} | Fivefold Renewable`
    : "Fivefold Renewable | Solar EPC & Rooftop Solar Company in Odisha";

  const resolvedPath = canonical || path || "";
  const canonicalUrl = `${SITE_CONFIG.url}${resolvedPath}`;

  return {
    title: fullTitle,
    description,
    metadataBase: new URL(SITE_CONFIG.url),
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: fullTitle,
      description,
      url: canonicalUrl,
      siteName: SITE_CONFIG.name,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: "Fivefold Renewable - Engineering-Led Solar EPC",
        },
      ],
      locale: "en_IN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_CONFIG.legalName,
    alternateName: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    logo: `${SITE_CONFIG.url}/brand/logo.png`,
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: SITE_CONFIG.contactPhone,
        contactType: "customer service",
        areaServed: "IN",
        availableLanguage: ["en", "or", "hi"],
      },
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: "Plot No. SCR 2, Lane No. 6, Anant Vihar Phase-3, Pokhariput",
      addressLocality: "Bhubaneswar",
      addressRegion: "Odisha",
      postalCode: "751020",
      addressCountry: "IN",
    },
  };
}
