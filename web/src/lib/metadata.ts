import type { Metadata } from "next";

/**
 * Centralized Metadata Configuration
 * 
 * This file contains all metadata configurations for the Meridian Labs website.
 * It provides consistent SEO optimization across all pages with proper titles,
 * descriptions, and social media tags.
 */

const baseUrl = "https://meridiansolutions.com";

/**
 * Base metadata configuration shared across all pages
 */
export const baseMetadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
      default: "Meridian Labs - Innovative Service Agency",
  template: "%s | Meridian Labs",
  },
  description:
    "Complete digital growth solutions for local businesses. Website development, SEO, PPC, and marketing campaigns that turn your digital presence into your strongest sales channel. Get more leads, customers, and revenue with our proven modern approach.",
  keywords: [
    "local business marketing",
    "website development",
    "local SEO",
    "Business Profile optimisation",
    "digital marketing agency",
    "small business websites",
    "local search marketing",
    "conversion optimisation",
    "business growth",
    "digital presence",
    "PPC advertising",
    "social media marketing",
    "content marketing",
    "digital health check",
    "lead generation",
    "customer acquisition"
  ],
  authors: [{ name: "Meridian Labs" }],
  creator: "Meridian Labs",
  publisher: "Meridian Labs",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: { 
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png"
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
  verification: {
    google: "your-google-verification-code",
  },
  category: "Digital Marketing Agency",
};

/**
 * Homepage metadata
 */
export const homeMetadata: Metadata = {
  ...baseMetadata,
  alternates: {
    canonical: baseUrl,
  },
  openGraph: {
    title: "Meridian Labs - Innovative Service Agency",
    description:
      "Complete digital growth solutions for local businesses. Website development, SEO, PPC, and marketing campaigns that turn your digital presence into your strongest sales channel. Proven results for local businesses.",
    url: baseUrl,
    siteName: "Meridian Labs",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Meridian Labs - Complete Digital Growth Solutions for Local Businesses",
        type: "image/png",
      },
      {
        url: "/og-square.png",
        width: 600,
        height: 600,
        alt: "Meridian Labs Logo",
        type: "image/png",
      }
    ],
    locale: "en_GB",
    type: "website",
    countryName: "United Kingdom",
    emails: ["hello@meridianlabsgroup.xyz"],
    phoneNumbers: ["+447541516344"],
    ttl: 604800, // 7 days cache
  },
  twitter: {
    card: "summary_large_image",
    title: "Meridian Labs - Innovative Service Agency",
    description:
      "Complete digital growth solutions for local businesses. Website development, SEO, PPC, and marketing campaigns. Get more leads, customers, and revenue with our proven approach.",
    images: ["/og.png"],
    creator: "@meridiansolutions",
    site: "@meridiansolutions",
  },
};

/**
 * Privacy Policy metadata
 */
export const privacyPolicyMetadata: Metadata = {
  ...baseMetadata,
  title: "Privacy Policy",
  description: "Learn how Meridian Labs collects, uses, and protects your personal information. Our privacy policy outlines data practices, security measures, and your rights regarding personal data.",
  keywords: [
    "privacy policy",
    "data protection",
    "personal information",
    "GDPR compliance",
    "data security",
    "Meridian Labs privacy",
    "user data protection",
    "privacy rights"
  ],
  openGraph: {
    title: "Privacy Policy | Meridian Labs",
    description: "Learn how Meridian Labs collects, uses, and protects your personal information. Our privacy policy outlines data practices, security measures, and your rights.",
    url: `${baseUrl}/privacy-policy`,
  },
  twitter: {
    title: "Privacy Policy | Meridian Labs",
    description: "Learn how Meridian Labs collects, uses, and protects your personal information. Our privacy policy outlines data practices, security measures, and your rights.",
  },
  alternates: {
    canonical: `${baseUrl}/privacy-policy`,
  },
};

/**
 * Terms of Service metadata
 */
export const termsOfServiceMetadata: Metadata = {
  ...baseMetadata,
  title: "Terms of Service",
  description: "Read Meridian Labs's terms of service and conditions for using our digital marketing services. Learn about our service agreements, payment terms, and user responsibilities.",
  keywords: [
    "terms of service",
    "terms and conditions",
    "service agreement",
    "digital marketing terms",
    "Meridian Labs terms",
    "user agreement",
    "service conditions",
    "legal terms"
  ],
  openGraph: {
    title: "Terms of Service | Meridian Labs",
    description: "Read Meridian Labs's terms of service and conditions for using our digital marketing services. Learn about our service agreements, payment terms, and user responsibilities.",
    url: `${baseUrl}/terms-of-service`,
  },
  twitter: {
    title: "Terms of Service | Meridian Labs",
    description: "Read Meridian Labs's terms of service and conditions for using our digital marketing services. Learn about our service agreements, payment terms, and user responsibilities.",
  },
  alternates: {
    canonical: `${baseUrl}/terms-of-service`,
  },
};

/**
 * Helper function to generate metadata for any page
 */
export function generatePageMetadata(
  title: string,
  description: string,
  path: string,
  keywords: string[] = []
): Metadata {
  return {
    ...baseMetadata,
    title,
    description,
    keywords: [...baseMetadata.keywords!, ...keywords],
    openGraph: {
      title: `${title} | Meridian Labs`,
      description,
      url: `${baseUrl}${path}`,
    },
    twitter: {
      title: `${title} | Meridian Labs`,
      description,
    },
    alternates: {
      canonical: `${baseUrl}${path}`,
    },
  };
}
