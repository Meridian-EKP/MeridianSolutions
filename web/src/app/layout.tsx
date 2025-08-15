import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import ClientShell from "@/components/ClientShell";
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
  metadataBase: new URL("https://meridiandigital.example"),
  title: {
    default: "MeridianDigital — The Future of Local Digital Presence",
    template: "%s | MeridianDigital",
  },
  description:
    "Sleek, futuristic digital services for local businesses: web development, Google Business Profile, social, SEO, and campaigns.",
  openGraph: {
    title: "MeridianDigital — The Future of Local Digital Presence",
    description:
      "Sleek, futuristic digital services for local businesses: web development, Google Business Profile, social, SEO, and campaigns.",
    url: "https://meridiandigital.example",
    siteName: "MeridianDigital",
    images: [{ url: "/og.png", width: 1200, height: 630 }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MeridianDigital — The Future of Local Digital Presence",
    description:
      "Sleek, futuristic digital services for local businesses: web development, Google Business Profile, social, SEO, and campaigns.",
    images: ["/og.png"],
  },
  icons: { icon: "/favicon.ico" },
  robots: {
    index: true,
    follow: true,
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
      </body>
    </html>
  );
}
