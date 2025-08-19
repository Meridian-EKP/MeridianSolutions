"use client";

/**
 * Terms of Service Page
 * 
 * This page contains the terms of service for MeridianDigital, outlining the terms
 * and conditions for using our services and website.
 */

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <div className="relative pt-24 pb-12 border-b border-white/10 bg-gradient-to-b from-gray-900 to-gray-800/50">
        <div className="mx-auto w-full max-w-4xl px-6 md:px-10">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-accent hover:text-accent/80 transition-colors mb-8"
          >
            <ArrowLeft className="size-4" />
            Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Terms of Service
          </h1>
          <p className="text-gray-400 text-lg">Last updated: {new Date().toLocaleDateString('en-GB')}</p>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto w-full max-w-4xl px-6 md:px-10 py-16">
        <div className="space-y-12">
          
          <section className="bg-gray-800/40 rounded-2xl p-8 md:p-12 border border-white/10">
            <h2 className="text-2xl font-bold mb-6 text-white">1. Acceptance of Terms</h2>
            <div className="space-y-6 text-gray-300 leading-relaxed">
              <p className="text-lg">
                By accessing and using the MeridianDigital website and services, you accept and agree 
                to be bound by the terms and provision of this agreement. If you do not agree to 
                abide by the above, please do not use this service.
              </p>
            </div>
          </section>

          <section className="bg-gray-800/40 rounded-2xl p-8 md:p-12 border border-white/10">
            <h2 className="text-2xl font-bold mb-6 text-white">2. Description of Service</h2>
            <div className="space-y-6 text-gray-300 leading-relaxed">
              <p className="text-lg">
                MeridianDigital provides digital marketing services including but not limited to:
              </p>
              <ul className="list-disc list-inside space-y-3 ml-4 text-lg">
                <li>Website design and development</li>
                <li>Search engine optimisation (SEO)</li>
                <li>Pay-per-click (PPC) advertising</li>
                <li>Social media marketing</li>
                <li>Content marketing and strategy</li>
                <li>Digital health checks and consultations</li>
              </ul>
            </div>
          </section>

          <section className="bg-gray-800/40 rounded-2xl p-8 md:p-12 border border-white/10">
            <h2 className="text-2xl font-bold mb-6 text-white">3. User Responsibilities</h2>
            <div className="space-y-6 text-gray-300 leading-relaxed">
              <p className="text-lg">When using our services, you agree to:</p>
              <ul className="list-disc list-inside space-y-3 ml-4 text-lg">
                <li>Provide accurate and complete information</li>
                <li>Maintain the security of your account information</li>
                <li>Use our services for lawful purposes only</li>
                <li>Not interfere with or disrupt our services</li>
                <li>Respect intellectual property rights</li>
                <li>Comply with all applicable laws and regulations</li>
              </ul>
            </div>
          </section>

          <section className="bg-gray-800/40 rounded-2xl p-8 md:p-12 border border-white/10">
            <h2 className="text-2xl font-bold mb-6 text-white">4. Payment Terms</h2>
            <div className="space-y-6 text-gray-300 leading-relaxed">
              <p className="text-lg">
                Payment terms for our services are as follows:
              </p>
              <ul className="list-disc list-inside space-y-3 ml-4 text-lg">
                <li>All fees are payable in advance unless otherwise agreed</li>
                <li>Prices are subject to change with 30 days' notice</li>
                <li>Late payments may result in service suspension</li>
                <li>Refunds are provided according to our refund policy</li>
                <li>All fees are exclusive of applicable taxes</li>
              </ul>
            </div>
          </section>

          <section className="bg-gray-800/40 rounded-2xl p-8 md:p-12 border border-white/10">
            <h2 className="text-2xl font-bold mb-6 text-white">5. Intellectual Property</h2>
            <div className="space-y-6 text-gray-300 leading-relaxed">
              <p className="text-lg">
                All content on this website, including text, graphics, logos, and software, 
                is the property of MeridianDigital and is protected by copyright laws. 
                You may not reproduce, distribute, or create derivative works without our 
                express written consent.
              </p>
            </div>
          </section>

          <section className="bg-gray-800/40 rounded-2xl p-8 md:p-12 border border-white/10">
            <h2 className="text-2xl font-bold mb-6 text-white">6. Limitation of Liability</h2>
            <div className="space-y-6 text-gray-300 leading-relaxed">
              <p className="text-lg">
                MeridianDigital shall not be liable for any indirect, incidental, special, 
                consequential, or punitive damages, including but not limited to loss of profits, 
                data, or use, incurred by you or any third party, whether in an action in contract 
                or tort, even if we have been advised of the possibility of such damages.
              </p>
            </div>
          </section>

          <section className="bg-gray-800/40 rounded-2xl p-8 md:p-12 border border-white/10">
            <h2 className="text-2xl font-bold mb-6 text-white">7. Service Availability</h2>
            <div className="space-y-6 text-gray-300 leading-relaxed">
              <p className="text-lg">
                We strive to maintain high availability of our services, but we do not guarantee 
                uninterrupted access. We reserve the right to modify, suspend, or discontinue 
                any part of our services at any time with reasonable notice.
              </p>
            </div>
          </section>

          <section className="bg-gray-800/40 rounded-2xl p-8 md:p-12 border border-white/10">
            <h2 className="text-2xl font-bold mb-6 text-white">8. Termination</h2>
            <div className="space-y-6 text-gray-300 leading-relaxed">
              <p className="text-lg">
                Either party may terminate this agreement with written notice. Upon termination:
              </p>
              <ul className="list-disc list-inside space-y-3 ml-4 text-lg">
                <li>Your access to our services will cease</li>
                <li>You will remain liable for any outstanding payments</li>
                <li>We will return or destroy any confidential information</li>
                <li>Provisions that survive termination will remain in effect</li>
              </ul>
            </div>
          </section>

          <section className="bg-gray-800/40 rounded-2xl p-8 md:p-12 border border-white/10">
            <h2 className="text-2xl font-bold mb-6 text-white">9. Governing Law</h2>
            <div className="space-y-6 text-gray-300 leading-relaxed">
              <p className="text-lg">
                These terms shall be governed by and construed in accordance with the laws of 
                the United Kingdom. Any disputes arising from these terms shall be subject to 
                the exclusive jurisdiction of the courts of the United Kingdom.
              </p>
            </div>
          </section>

          <section className="bg-gray-800/40 rounded-2xl p-8 md:p-12 border border-white/10">
            <h2 className="text-2xl font-bold mb-6 text-white">10. Changes to Terms</h2>
            <div className="space-y-6 text-gray-300 leading-relaxed">
              <p className="text-lg">
                We reserve the right to modify these terms at any time. Changes will be effective 
                immediately upon posting on this page. Your continued use of our services after 
                changes are posted constitutes acceptance of the new terms.
              </p>
            </div>
          </section>

          <section className="bg-gray-800/40 rounded-2xl p-8 md:p-12 border border-white/10">
            <h2 className="text-2xl font-bold mb-6 text-white">11. Contact Information</h2>
            <div className="space-y-6 text-gray-300 leading-relaxed">
              <p className="text-lg">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <div className="bg-gray-700/50 rounded-xl p-8 border border-white/10">
                <p className="font-bold text-white text-xl mb-4">MeridianDigital</p>
                <div className="space-y-3">
                  <p className="text-lg">
                    Email: <a href="mailto:edkemppotter@gmail.com" className="text-accent hover:text-accent/80 font-medium">edkemppotter@gmail.com</a>
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
              These terms of service are effective as of the date listed above. Please review 
              these terms regularly as they may be updated from time to time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
