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
    <div className="min-h-screen bg-black/20">
      {/* Header */}
      <div className="relative pt-24 pb-8 border-b border-accent/20">
        <div className="mx-auto w-full max-w-4xl px-6 md:px-10">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-accent hover:text-accent/80 transition-colors mb-6"
          >
            <ArrowLeft className="size-4" />
            Back to Home
          </Link>
          <h1 className="text-3xl md:text-4xl font-semibold mb-4">Terms of Service</h1>
          <p className="text-muted">Last updated: {new Date().toLocaleDateString('en-GB')}</p>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto w-full max-w-4xl px-6 md:px-10 py-12">
        <div className="glass-no-shine rounded-3xl p-8 md:p-12 space-y-8">
          
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-accent">1. Acceptance of Terms</h2>
            <div className="space-y-4 text-muted">
              <p>
                By accessing and using the MeridianDigital website and services, you accept and agree 
                to be bound by the terms and provision of this agreement. If you do not agree to 
                abide by the above, please do not use this service.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-accent">2. Description of Service</h2>
            <div className="space-y-4 text-muted">
              <p>
                MeridianDigital provides digital marketing services including but not limited to:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Website design and development</li>
                <li>Search engine optimisation (SEO)</li>
                <li>Pay-per-click (PPC) advertising</li>
                <li>Social media marketing</li>
                <li>Content marketing and strategy</li>
                <li>Digital health checks and consultations</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-accent">3. User Responsibilities</h2>
            <div className="space-y-4 text-muted">
              <p>When using our services, you agree to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Provide accurate and complete information</li>
                <li>Maintain the security of your account information</li>
                <li>Use our services for lawful purposes only</li>
                <li>Not interfere with or disrupt our services</li>
                <li>Respect intellectual property rights</li>
                <li>Comply with all applicable laws and regulations</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-accent">4. Payment Terms</h2>
            <div className="space-y-4 text-muted">
              <p>
                Payment terms for our services are as follows:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>All fees are payable in advance unless otherwise agreed</li>
                <li>Prices are subject to change with 30 days' notice</li>
                <li>Late payments may result in service suspension</li>
                <li>Refunds are provided according to our refund policy</li>
                <li>All fees are exclusive of applicable taxes</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-accent">5. Intellectual Property</h2>
            <div className="space-y-4 text-muted">
              <p>
                All content on this website, including text, graphics, logos, and software, 
                is the property of MeridianDigital and is protected by copyright laws. 
                You may not reproduce, distribute, or create derivative works without our 
                express written consent.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-accent">6. Limitation of Liability</h2>
            <div className="space-y-4 text-muted">
              <p>
                MeridianDigital shall not be liable for any indirect, incidental, special, 
                consequential, or punitive damages, including but not limited to loss of profits, 
                data, or use, incurred by you or any third party, whether in an action in contract 
                or tort, even if we have been advised of the possibility of such damages.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-accent">7. Service Availability</h2>
            <div className="space-y-4 text-muted">
              <p>
                We strive to maintain high availability of our services, but we do not guarantee 
                uninterrupted access. We reserve the right to modify, suspend, or discontinue 
                any part of our services at any time with reasonable notice.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-accent">8. Termination</h2>
            <div className="space-y-4 text-muted">
              <p>
                Either party may terminate this agreement with written notice. Upon termination:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Your access to our services will cease</li>
                <li>You will remain liable for any outstanding payments</li>
                <li>We will return or destroy any confidential information</li>
                <li>Provisions that survive termination will remain in effect</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-accent">9. Governing Law</h2>
            <div className="space-y-4 text-muted">
              <p>
                These terms shall be governed by and construed in accordance with the laws of 
                the United Kingdom. Any disputes arising from these terms shall be subject to 
                the exclusive jurisdiction of the courts of the United Kingdom.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-accent">10. Changes to Terms</h2>
            <div className="space-y-4 text-muted">
              <p>
                We reserve the right to modify these terms at any time. Changes will be effective 
                immediately upon posting on this page. Your continued use of our services after 
                changes are posted constitutes acceptance of the new terms.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-accent">11. Contact Information</h2>
            <div className="space-y-4 text-muted">
              <p>
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <p className="font-medium text-white mb-2">MeridianDigital</p>
                <p>Email: <a href="mailto:edkemppotter@gmail.com" className="text-accent hover:text-accent/80">edkemppotter@gmail.com</a></p>
                <p>Phone: <a href="tel:+447541516344" className="text-accent hover:text-accent/80">(+44) 7541 516 344</a></p>
              </div>
            </div>
          </section>

          <div className="pt-8 border-t border-white/10">
            <p className="text-sm text-muted/60">
              These terms of service are effective as of the date listed above. Please review 
              these terms regularly as they may be updated from time to time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
