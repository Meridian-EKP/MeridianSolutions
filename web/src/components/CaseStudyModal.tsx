"use client";

import { useEffect, useRef } from 'react';
import { X, ChevronRight } from 'lucide-react';

interface CaseStudy {
  id: number;
  title: string;
  industry: string;
  result: string;
  description: string;
  metrics: string[];
  beforePoints: string[];
  afterPoints: string[];
  detailedDescription: string;
}

interface CaseStudyModalProps {
  caseStudy: CaseStudy | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function CaseStudyModal({ caseStudy, isOpen, onClose }: CaseStudyModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);



  if (!isOpen || !caseStudy) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pt-24 pb-8 md:pt-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm backdrop-enter"
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Modal */}
              <div 
          ref={modalRef}
        className="relative w-full max-w-4xl max-h-[85vh] md:max-h-[90vh] overflow-y-auto rounded-3xl bg-black/40 border border-cyan-400/30 backdrop-blur-xl shadow-2xl shadow-accent/20 modal-enter"
          onClick={(e) => e.stopPropagation()}
        >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/40 border border-white/20 hover:border-accent/60 hover:bg-accent/10 transition-all duration-300 cursor-pointer"
          aria-label="Close modal"
        >
          <X className="size-5 text-accent" />
        </button>

        {/* Mobile Content - Simplified */}
        <div className="md:hidden p-6">
          {/* Before/After Comparison */}
          <div className="mb-10">
            <h3 className="text-lg font-semibold mb-6">What Changed</h3>
            <div className="grid grid-cols-1 gap-6">
              {/* Before Box */}
              <div className="relative p-5 rounded-2xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-white/10 backdrop-blur-sm">
                <div className="flex items-center mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-400 mr-3"></div>
                  <h4 className="text-base font-semibold text-red-400">Before</h4>
                </div>
                <div className="space-y-3">
                  {caseStudy.beforePoints.map((point, index) => (
                    <div key={index} className="flex items-start">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-400/60 mr-3 mt-2 flex-shrink-0"></div>
                      <span className="text-muted text-sm leading-relaxed">{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* After Box */}
              <div className="relative p-5 rounded-2xl bg-gradient-to-br from-accent/20 to-purple-600/20 border border-cyan-400/30 backdrop-blur-sm">
                <div className="flex items-center mb-4">
                  <div className="w-3 h-3 rounded-full bg-green-400 mr-3"></div>
                  <h4 className="text-base font-semibold text-green-400">After</h4>
                </div>
                <div className="space-y-3">
                  {caseStudy.afterPoints.map((point, index) => (
                    <div key={index} className="flex items-start">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-400/60 mr-3 mt-2 flex-shrink-0"></div>
                      <span className="text-white text-sm leading-relaxed">{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-8">
            <a 
              href="#contact-form" 
              onClick={onClose}
              className="btn-primary inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium cursor-pointer w-full"
            >
              Book Your Free Digital Health Check
              <ChevronRight className="size-4" />
            </a>
          </div>
        </div>

        {/* Desktop Content - Full */}
        <div className="hidden md:block p-8">
          {/* Header */}
          <div className="mb-6">
            {/* Industry Badge */}
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-accent/10 text-base font-medium text-accent mb-4">
              <div className="w-2 h-2 rounded-full bg-accent mr-3"></div>
              {caseStudy.industry}
            </div>
            
            <h2 className="text-3xl font-semibold mb-3">{caseStudy.title}</h2>
            
            {/* Qualitative Outcome */}
            <div className="mb-4">
              <span className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent leading-tight">
                {caseStudy.result}
              </span>
            </div>
            
            <p className="text-muted text-lg">{caseStudy.detailedDescription}</p>
          </div>

          {/* Before/After Comparison */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-6">What Changed</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Before Box */}
              <div className="relative p-6 rounded-2xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-white/10 backdrop-blur-sm">
                <div className="flex items-center mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-400 mr-3"></div>
                  <h4 className="text-lg font-semibold text-red-400">Before</h4>
                </div>
                <div className="space-y-3">
                  {caseStudy.beforePoints.map((point, index) => (
                    <div key={index} className="flex items-start">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-400/60 mr-3 mt-2 flex-shrink-0"></div>
                      <span className="text-muted text-sm leading-relaxed">{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* After Box */}
              <div className="relative p-6 rounded-2xl bg-gradient-to-br from-accent/20 to-purple-600/20 border border-cyan-400/30 backdrop-blur-sm">
                <div className="flex items-center mb-4">
                  <div className="w-3 h-3 rounded-full bg-green-400 mr-3"></div>
                  <h4 className="text-lg font-semibold text-green-400">After</h4>
                </div>
                <div className="space-y-3">
                  {caseStudy.afterPoints.map((point, index) => (
                    <div key={index} className="flex items-start">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-400/60 mr-3 mt-2 flex-shrink-0"></div>
                      <span className="text-white text-sm leading-relaxed">{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Key Improvements and CTA */}
          <div className="flex flex-col md:flex-row gap-6 items-start">
            {/* Key Improvements */}
            <div className="flex-1">
              <h3 className="text-xl font-semibold mb-4">Key Improvements</h3>
              <div className="grid gap-3">
                {caseStudy.metrics.map((metric, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-accent mr-3"></div>
                    <span className="text-muted">{metric}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="md:self-end">
              <a 
                href="#contact-form" 
                onClick={onClose}
                className="btn-primary inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium cursor-pointer"
              >
                Book Your Free Digital Health Check
                <ChevronRight className="size-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
