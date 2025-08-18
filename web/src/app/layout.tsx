import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import ClientShell from "@/components/ClientShell";
import StructuredData from "@/components/StructuredData";
import Navigation from "@/components/Navigation";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
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
    "Google Business Profile optimisation",
    "digital marketing agency",
    "small business websites",
    "local search marketing",
    "conversion optimisation",
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
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} antialiased bg-background text-foreground`}
      >
        <div className="gradient-mesh" aria-hidden />
        <Navigation />
        <div className="relative">
          {/* Place the glow field under content but above base gradient */}
          <div className="absolute inset-0 overflow-hidden">
            <ClientShell>{null}</ClientShell>
          </div>
          <main className="relative z-10 main-content">
            {children}
          </main>
        </div>
                            <script dangerouslySetInnerHTML={{
                      __html: `
                        // Force scroll to top on page load/refresh
                        if (typeof window !== 'undefined') {
                          // Immediately scroll to top
                          window.scrollTo(0, 0);
                          document.documentElement.scrollTop = 0;
                          document.body.scrollTop = 0;
                          
                          // Before page unload
                          window.addEventListener('beforeunload', function () {
                            window.scrollTo(0, 0);
                            document.documentElement.scrollTop = 0;
                            document.body.scrollTop = 0;
                          });
                          
                          // When page loads
                          window.addEventListener('load', function () {
                            window.scrollTo(0, 0);
                            document.documentElement.scrollTop = 0;
                            document.body.scrollTop = 0;
                            
                            // Multiple fallbacks to ensure it works
                            setTimeout(() => {
                              window.scrollTo(0, 0);
                              document.documentElement.scrollTop = 0;
                              document.body.scrollTop = 0;
                            }, 50);
                            
                            setTimeout(() => {
                              window.scrollTo(0, 0);
                              document.documentElement.scrollTop = 0;
                              document.body.scrollTop = 0;
                            }, 200);
                          });
                          
                          // DOM content loaded
                          document.addEventListener('DOMContentLoaded', function() {
                            window.scrollTo(0, 0);
                            document.documentElement.scrollTop = 0;
                            document.body.scrollTop = 0;
                          });
                          
                          // React hydration might interfere, so also do it after a delay
                          setTimeout(() => {
                            window.scrollTo(0, 0);
                            document.documentElement.scrollTop = 0;
                            document.body.scrollTop = 0;
                          }, 500);
                        }
                      `
                    }} />
        <StructuredData />
      </body>
    </html>
  );
}
