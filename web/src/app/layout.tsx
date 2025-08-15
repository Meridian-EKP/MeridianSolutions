import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import ClientShell from "@/components/ClientShell";
import StructuredData from "@/components/StructuredData";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://meridiandigital.com"),
  title: {
    default: "MeridianDigital - Transform Your Local Business Into a Digital Powerhouse",
    template: "%s | MeridianDigital",
  },
  description:
    "Conversion-driven websites and data-powered local marketing systems that turn your digital presence into your strongest sales channel. Get more leads, customers, and revenue with our proven modern approach.",
  keywords: [
    "local business marketing",
    "website development",
    "local SEO",
    "Google Business Profile optimization",
    "digital marketing agency",
    "small business websites",
    "local search marketing",
    "conversion optimization",
    "business growth",
    "digital presence"
  ],
  openGraph: {
    title: "MeridianDigital - Transform Your Local Business Into a Digital Powerhouse",
    description:
      "Conversion-driven websites and data-powered local marketing systems that turn your digital presence into your strongest sales channel. Proven results for local businesses.",
    url: "https://meridiandigital.com",
    siteName: "MeridianDigital",
    images: [{ 
      url: "/og.png", 
      width: 1200, 
      height: 630,
      alt: "MeridianDigital - Local Business Digital Marketing Agency"
    }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MeridianDigital - Transform Your Local Business Into a Digital Powerhouse",
    description:
      "Conversion-driven websites and data-powered local marketing systems. Get more leads, customers, and revenue with our proven approach.",
    images: ["/og.png"],
    creator: "@meridiandigital",
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
  alternates: {
    canonical: "https://meridiandigital.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <div className="gradient-mesh" aria-hidden />
        <div className="relative">
          {/* Place the glow field under content but above base gradient */}
          <div className="absolute inset-0 overflow-visible">
            <ClientShell>{null}</ClientShell>
          </div>
          <div className="relative z-10">
            {children}
          </div>
        </div>
        <StructuredData />
      </body>
    </html>
  );
}
