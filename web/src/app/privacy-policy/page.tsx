"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Footer from "@/components/Footer";

/**
 * Privacy Policy Page
 * 
 * This page contains the privacy policy for The Meridian Agency, outlining how we collect,
 * use, and protect user data in compliance with relevant privacy regulations.
 */

export default function PrivacyPolicy() {
  const lastUpdated = "15/09/2025";
  
  return (
    <div className="page-container relative overflow-x-clip min-h-screen">
      {/* Mobile: Fixed Back Button - Top Left (stays visible while scrolling) */}
      <Link
        href="/"
        className="fixed top-24 left-6 z-[100] md:hidden inline-flex items-center gap-2 px-4 py-3 rounded-full transition-all duration-300 group"
        style={{ 
          position: 'fixed',
          background: 'rgba(255, 255, 255, 0.03)',
          backdropFilter: 'blur(4px) saturate(180%)',
          WebkitBackdropFilter: 'blur(4px) saturate(180%)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.05) inset',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.border = '1px solid rgba(94, 231, 255, 0.3)';
          e.currentTarget.style.boxShadow = '0 8px 32px rgba(94, 231, 255, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.05) inset';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.border = '1px solid rgba(255, 255, 255, 0.08)';
          e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.05) inset';
        }}
      >
        <ArrowLeft className="size-4 text-accent group-hover:-translate-x-1 transition-transform duration-300" />
        <span className="text-sm font-medium text-white">Back</span>
      </Link>

      {/* Desktop: Back Button */}
      <div className="hidden md:block mx-auto w-full max-w-screen-2xl px-6 md:px-10 pt-24 md:pt-32 pb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-muted hover:text-accent transition-colors duration-300 group"
        >
          <ArrowLeft className="size-4 group-hover:-translate-x-1 transition-transform duration-300" />
          <span>Back to Home</span>
        </Link>
      </div>

      {/* Header */}
      <div className="relative pt-40 md:pt-8 pb-12 border-b border-white/10 bg-gradient-to-b from-black to-black/70">
        <div className="mx-auto w-full max-w-4xl px-6 md:px-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Privacy Policy
          </h1>
          <p className="text-gray-400 text-lg">Last updated: {lastUpdated}</p>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto w-full max-w-4xl px-6 md:px-10 py-16">
        <div className="space-y-12">
          
          <section className="glass-no-shine rounded-2xl p-8 md:p-12 border border-white/10">
            <h2 className="text-2xl font-bold mb-6 text-white">1. Information We Collect</h2>
            <div className="space-y-6 text-gray-300 leading-relaxed">
              <p className="text-lg">
                We collect information you provide directly to us, such as when you:
              </p>
              <ul className="list-disc list-inside space-y-3 ml-4 text-lg">
                <li>Fill out our contact form or request a digital health check</li>
                <li>Subscribe to our newsletter or marketing communications</li>
                <li>Engage with our website or social media channels</li>
                <li>Contact us for support or inquiries</li>
              </ul>
              <p className="text-lg">
                This information may include your name, email address, phone number, business name, 
                and any other information you choose to provide.
              </p>
            </div>
          </section>

          <section className="glass-no-shine rounded-2xl p-8 md:p-12 border border-white/10">
            <h2 className="text-2xl font-bold mb-6 text-white">2. How We Use Your Information</h2>
            <div className="space-y-6 text-gray-300 leading-relaxed">
              <p className="text-lg">We use the information we collect to:</p>
              <ul className="list-disc list-inside space-y-3 ml-4 text-lg">
                <li>Provide and improve our digital marketing services</li>
                <li>Respond to your inquiries and provide customer support</li>
                <li>Send you marketing communications (with your consent)</li>
                <li>Analyse website usage and improve user experience</li>
                <li>Comply with legal obligations</li>
              </ul>
            </div>
          </section>

          <section className="glass-no-shine rounded-2xl p-8 md:p-12 border border-white/10">
            <h2 className="text-2xl font-bold mb-6 text-white">3. Information Sharing</h2>
            <div className="space-y-6 text-gray-300 leading-relaxed">
              <p className="text-lg">
                We do not sell, trade, or otherwise transfer your personal information to third parties 
                without your consent, except in the following circumstances:
              </p>
              <ul className="list-disc list-inside space-y-3 ml-4 text-lg">
                <li>With your explicit consent</li>
                <li>To comply with legal requirements or court orders</li>
                <li>To protect our rights, property, or safety</li>
                <li>With trusted service providers who assist us in operating our business</li>
              </ul>
            </div>
          </section>

          <section className="glass-no-shine rounded-2xl p-8 md:p-12 border border-white/10">
            <h2 className="text-2xl font-bold mb-6 text-white">4. Data Security</h2>
            <div className="space-y-6 text-gray-300 leading-relaxed">
              <p className="text-lg">
                We implement appropriate security measures to protect your personal information 
                against unauthorized access, alteration, disclosure, or destruction. However, 
                no method of transmission over the internet is 100% secure, and we cannot 
                guarantee absolute security.
              </p>
            </div>
          </section>

          <section className="glass-no-shine rounded-2xl p-8 md:p-12 border border-white/10">
            <h2 className="text-2xl font-bold mb-6 text-white">5. Cookies and Tracking</h2>
            <div className="space-y-6 text-gray-300 leading-relaxed">
              <p className="text-lg">
                We use cookies and similar tracking technologies to enhance your browsing experience, 
                analyse website traffic, and understand where our visitors are coming from. 
                You can control cookie settings through your browser preferences.
              </p>
            </div>
          </section>

          <section className="glass-no-shine rounded-2xl p-8 md:p-12 border border-white/10">
            <h2 className="text-2xl font-bold mb-6 text-white">6. Your Rights</h2>
            <div className="space-y-6 text-gray-300 leading-relaxed">
              <p className="text-lg">You have the right to:</p>
              <ul className="list-disc list-inside space-y-3 ml-4 text-lg">
                <li>Access the personal information we hold about you</li>
                <li>Request correction of inaccurate information</li>
                <li>Request deletion of your personal information</li>
                <li>Withdraw consent for marketing communications</li>
                <li>Lodge a complaint with relevant data protection authorities</li>
              </ul>
            </div>
          </section>

          <section className="bg-gray-800/40 rounded-2xl p-8 md:p-12 border border-white/10">
            <h2 className="text-2xl font-bold mb-6 text-white">7. Contact Us</h2>
            <div className="space-y-6 text-gray-300 leading-relaxed">
              <p className="text-lg">
                If you have any questions about this Privacy Policy or our data practices, 
                please contact us at:
              </p>
              <div className="glass-no-shine rounded-xl p-8 border border-white/10">
                <p className="font-bold text-white text-xl mb-4">The Meridian Agency</p>
                <div className="space-y-3">
                  <p className="text-lg">
                Email: <a href="mailto:Hello@TheMeridianAgency.xyz" className="text-accent hover:text-accent/80 font-medium">Hello@TheMeridianAgency.xyz</a>
                  </p>
                  <p className="text-lg">
                    Phone: <a href="tel:+447541516344" className="text-accent hover:text-accent/80 font-medium">(+44) 7541 516 344</a>
                  </p>
                </div>
              </div>
            </div>
          </section>

          <div className="pt-8 border-t border-white/10">
            <p className="text-gray-400 text-base leading-relaxed">
              This privacy policy is effective as of the date listed above and may be updated 
              from time to time. We will notify you of any material changes by posting the 
              new policy on this page.
            </p>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
