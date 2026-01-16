"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { getServiceBySlug } from "@/constants/services";
import Footer from "@/components/Footer";

interface ServicePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function ServicePage({ params }: ServicePageProps) {
  const { slug } = use(params);
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const Icon = service.icon;

  return (
    <div className="page-container relative overflow-x-clip min-h-screen">
      {/* Mobile: Fixed Back Button - Top Left (stays visible while scrolling) */}
      <Link
        href="/#services"
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
          href="/#services"
          className="inline-flex items-center gap-2 text-muted hover:text-accent transition-colors duration-300 group"
        >
          <ArrowLeft className="size-4 group-hover:-translate-x-1 transition-transform duration-300" />
          <span>Back to Services</span>
        </Link>
      </div>

      {/* Service Content */}
      <section className="relative pt-40 md:pt-8 pb-24 md:pb-32">
        <div className="mx-auto w-full max-w-screen-2xl px-6 md:px-10">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-12">
              <div className="inline-flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-white/5 border border-cyan-400/30">
                  <Icon className="size-8 text-accent" />
                </div>
                <h1 className="text-3xl md:text-5xl font-semibold">{service.title}</h1>
              </div>
              <p className="text-xl text-muted mt-4">{service.fullDesc}</p>
            </div>

            {/* Detailed Description */}
            <div className="glass-no-shine rounded-3xl p-8 md:p-12 border border-white/10 mb-8">
              <div className="space-y-4 text-muted leading-relaxed">
                {service.detailedDesc.split('\n\n').map((paragraph, idx) => (
                  <p key={idx} className="text-base md:text-lg">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* What's Included */}
            <div className="glass-no-shine rounded-3xl p-8 md:p-12 border border-white/10 mb-8">
              <h2 className="text-2xl md:text-3xl font-semibold mb-6 flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-accent"></span>
                What&apos;s Included
              </h2>
              <ul className="space-y-4">
                {service.benefits.map((benefit, idx) => (
                  <li 
                    key={idx} 
                    className="flex items-start gap-4 text-muted"
                  >
                    <CheckCircle className="size-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span className="text-base md:text-lg">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Investment Options */}
            <div className="glass-no-shine rounded-3xl p-8 md:p-12 border border-white/10 mb-8">
              <h2 className="text-2xl md:text-3xl font-semibold mb-6 flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-accent"></span>
                Investment Options
              </h2>
              <div className="text-muted text-base md:text-lg leading-relaxed whitespace-pre-line">
                {service.pricing}
              </div>
            </div>

            {/* CTA Button */}
            <div className="text-center">
              <Link
                href="/#contact-form"
                className="btn-gradient-animated inline-flex items-center gap-2 rounded-full px-8 py-4 text-base md:text-lg font-medium"
              >
                Book Now - {service.title}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

