"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";
import { ArrowRight, Sparkles, Quote, Globe, MapPin, Share2, Search, Target, Megaphone, X, CheckCircle } from "lucide-react";
import { TestimonialCarousel } from "@/components/TestimonialCarousel";
import ContactForm from "@/components/ContactForm";
import { useStaggeredScrollAnimation, useFadeInAnimation } from "@/hooks/useScrollAnimation";

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const yParallax = useTransform(scrollYProgress, [0, 1], ["0px", "-120px"]);
  
  // State for expanded service card
  const [expandedService, setExpandedService] = useState<number | null>(null);
  
  // Handle service card expansion
  const toggleServiceExpansion = (index: number) => {
    setExpandedService(expandedService === index ? null : index);
  };
  
  // Handle keyboard navigation
  const handleServiceKeyDown = (event: React.KeyboardEvent, index: number) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggleServiceExpansion(index);
    }
    if (event.key === 'Escape' && expandedService === index) {
      setExpandedService(null);
    }
  };

  // Animation refs for different sections
  const heroAnimRef = useStaggeredScrollAnimation([
    { selector: ".hero-badge", options: { delay: 0.1, duration: 0.5, yOffset: 25 } },
    { selector: ".hero-title", options: { delay: 0.2, duration: 0.6, yOffset: 30 } },
    { selector: ".hero-subtitle", options: { delay: 0.3, duration: 0.5, yOffset: 25 } },
    { selector: ".hero-buttons", options: { delay: 0.4, duration: 0.5, yOffset: 25 } }
  ]);

  const aboutAnimRef = useStaggeredScrollAnimation([
    { selector: ".about-content", options: { delay: 0, duration: 0.5, yOffset: 30 } },
    { selector: ".about-image", options: { delay: 0.15, duration: 0.5, yOffset: 30 } }
  ]);

  const servicesAnimRef = useStaggeredScrollAnimation([
    { selector: ".services-header", options: { delay: 0, duration: 0.5, yOffset: 30 } },
    { selector: ".service-card", options: { delay: 0.1, duration: 0.5, yOffset: 30, stagger: 0.06 } }
  ]);

  const caseStudiesAnimRef = useStaggeredScrollAnimation([
    { selector: ".case-studies-header", options: { delay: 0, duration: 0.5, yOffset: 30 } },
    { selector: ".case-study-card", options: { delay: 0.1, duration: 0.5, yOffset: 30, stagger: 0.08 } }
  ]);

  const testimonialsAnimRef = useFadeInAnimation({ delay: 0, duration: 0.5, yOffset: 30 });

  const ctaAnimRef = useStaggeredScrollAnimation([
    { selector: ".cta-title", options: { delay: 0, duration: 0.5, yOffset: 30 } },
    { selector: ".cta-subtitle", options: { delay: 0.15, duration: 0.5, yOffset: 25 } },
    { selector: ".cta-buttons", options: { delay: 0.3, duration: 0.5, yOffset: 25 } },
    { selector: ".cta-features", options: { delay: 0.45, duration: 0.5, yOffset: 20 } }
  ]);

  const contactAnimRef = useFadeInAnimation({ delay: 0, duration: 0.5, yOffset: 30 });

  // Deterministic accent generator so each service card has a unique formation
  const accentStyleFor = (idx: number): React.CSSProperties => {
    const rand = (n: number) => {
      const x = Math.sin((idx + 1) * (n + 1) * 12.9898) * 43758.5453;
      return x - Math.floor(x);
    };
    const pct = (n: number) => `${Math.round(rand(n) * 100)}%`;
    const sz = (n: number, min: number, max: number) => `${Math.round(min + rand(n) * (max - min))}px`;
    // Three-color palette (blue, green, pink)
    const c1 = 'var(--accent-blue-2)';
    const c2 = '#00ff95';
    const c3 = 'var(--accent-pink-2)';
    const g = (
      w: string,
      h: string,
      atX: string,
      atY: string,
      col: string,
      stop = '60%'
    ) => `radial-gradient(${w} ${h} at ${atX} ${atY}, ${col}, transparent ${stop})`;
    const bg = [
      g(sz(1, 240, 340), sz(2, 180, 280), pct(3), pct(4), c1),
      g(sz(5, 220, 320), sz(6, 160, 260), pct(7), pct(8), c2, '65%'),
      g(sz(9, 240, 340), sz(10, 180, 260), pct(11), pct(12), c3, '62%'),
    ].join(',');
    return { background: bg };
  };

  return (
    <div className="relative overflow-x-clip">
      {/* HERO */}
      <section ref={heroRef} className="relative min-h-[100svh] flex items-center">
        <div className="absolute inset-0 pointer-events-none">
          <motion.div style={{ y: yParallax }} className="h-full w-full">
            <div className="absolute inset-0 gradient-mesh" aria-hidden />
          </motion.div>
        </div>

        <div ref={heroAnimRef} className="relative z-10 mx-auto w-full max-w-7xl px-6 md:px-10">
          <div className="max-w-3xl">
            <p className="hero-badge text-accent tracking-widest uppercase text-xs md:text-sm flex items-center gap-2">
              <Sparkles className="size-4" /> MeridianDigital
            </p>
            <h1 className="hero-title mt-4 text-4xl md:text-6xl lg:text-7xl font-semibold leading-[1.05]">
              Transform Your Local Business Into a Digital Powerhouse
            </h1>
            <p className="hero-subtitle mt-6 text-muted max-w-2xl text-base md:text-lg">
              We build conversion-driven websites and data-powered local marketing systems that turn your digital presence into your strongest sales channel. Get more leads, customers, and revenue with our proven modern approach.
            </p>
            <div className="hero-buttons mt-8 flex flex-wrap gap-4">
              <a href="#contact-form" className="btn-primary glow-ring inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm md:text-base font-medium">
                Get Your Free Digital Health Check
                <ArrowRight className="size-4" />
              </a>
              <a href="#services" className="glass inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm md:text-base font-medium border border-white/10 hover:border-white/20 transition">
                See Our Services
          </a>
        </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="relative py-24 md:py-32">
        <div ref={aboutAnimRef} className="mx-auto w-full max-w-7xl px-6 md:px-10 grid md:grid-cols-2 gap-10 items-center">
          <div className="about-content">
            <div className="card card-shine rounded-2xl p-6 md:p-8 overflow-hidden">
              <div className="card-accents" style={{
                background: [
                  'radial-gradient(300px 220px at 12% 22%, color-mix(in oklab, var(--accent-blue-2) 55%, transparent), transparent 60%)',
                  'radial-gradient(260px 200px at 88% 20%, color-mix(in oklab, var(--accent-pink-2) 55%, transparent), transparent 60%)',
                  'radial-gradient(320px 220px at 45% 98%, color-mix(in oklab, #00ff95 55%, transparent), transparent 65%)'
                ].join(',')
              }} aria-hidden />
              <div className="card-sheen" aria-hidden />
              <div className="relative z-10">
                <h2 className="text-2xl md:text-4xl font-semibold">Why Choose Us?</h2>
                <p className="mt-4 text-muted">
                  MeridianDigital specialises in turning local businesses into digital leaders. We don't just build websites—we create complete growth ecosystems that attract, convert, and retain your ideal customers.
                </p>
                <p className="mt-3 text-muted">
                  Every project combines cutting-edge technology with proven marketing psychology to deliver measurable results. Our clients typically see 40-60% increases in qualified leads within 90 days.
                </p>
              </div>
            </div>
          </div>
          <div className="about-image">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden glow-ring shine-effect">
              <Image src="/window.svg" alt="About" fill className="object-cover opacity-80 mix-blend-screen" />
            </div>
          </div>
        </div>
      </section>

            {/* SERVICES */}
      <section id="services" className="relative py-24 md:py-32">
        <div ref={servicesAnimRef} className="mx-auto w-full max-w-7xl px-6 md:px-10">
          <div className="services-header max-w-3xl">
            <h2 className="text-2xl md:text-4xl font-semibold">Complete Digital Growth Solutions</h2>
            <p className="mt-3 text-muted text-lg">Everything your local business needs to dominate your market and drive consistent growth.</p>
          </div>
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6 services-grid">
          {[
            { 
              title: "Website Development", 
              desc: "Lightning-fast, conversion-optimised websites that turn visitors into customers.",
              fullDesc: "Custom-built using modern frameworks with mobile-first design, SEO optimisation, and conversion psychology.",
              detailedDesc: "We create stunning, high-performance websites that don't just look amazing—they drive real business results. Every site is built with conversion psychology, advanced SEO, and lightning-fast loading speeds.\n\nOur websites are fully responsive, accessible, and optimised for search engines from day one. You'll get a complete digital presence that turns visitors into customers and grows with your business.",
              pricing: "From £2,497",
              benefits: ["Mobile-first responsive design", "Advanced SEO optimisation", "Conversion psychology integration", "Lightning-fast loading speeds", "6 months free support"],
              icon: Globe
            },
            { 
              title: "Google Business Profile", 
              desc: "Dominate local search results and convert map searches into paying customers.",
              fullDesc: "Complete GBP optimisation, review management, and local ranking strategies that get you found first.",
              detailedDesc: "Transform your Google Business Profile into a powerful lead generation machine. We optimise every element to dominate local search results and convert map searches into paying customers.\n\nOur comprehensive GBP strategy includes review management, post scheduling, local keyword optimisation, and ongoing monitoring to ensure you stay ahead of competitors.",
              pricing: "From £497/month",
              benefits: ["Complete profile optimisation", "Review management system", "Local ranking strategies", "Monthly performance reports", "Ongoing competitor monitoring"],
              icon: MapPin
            },
            { 
              title: "Social Media Management", 
              desc: "Strategic content that builds authority and drives local engagement.",
              fullDesc: "Platform-specific content strategies, community management, and local audience targeting that converts.",
              detailedDesc: "Build authority and drive meaningful engagement with strategic social media management. We create platform-specific content that resonates with your local audience and converts followers into customers.\n\nFrom content creation to community management, we handle everything while maintaining your authentic brand voice and driving measurable business results.",
              pricing: "From £797/month",
              benefits: ["Platform-specific content strategy", "Daily content creation & posting", "Community management", "Local audience targeting", "Monthly analytics reports"],
              icon: Share2
            },
            { 
              title: "Local SEO", 
              desc: "Rank #1 for high-intent local searches in your area.",
              fullDesc: "Technical SEO, local citations, keyword targeting, and ongoing optimisation for sustainable growth.",
              detailedDesc: "Dominate local search results with our comprehensive Local SEO strategy. We target high-intent local keywords and optimise your entire digital presence to attract customers who are ready to buy.\n\nOur proven approach includes technical SEO, local citations, Google My Business optimisation, and ongoing content strategy to ensure sustainable, long-term growth.",
              pricing: "From £697/month",
              benefits: ["Local keyword research & targeting", "Technical SEO optimisation", "Local citation building", "Google My Business optimisation", "Monthly ranking reports"],
              icon: Search
            },
            { 
              title: "Growth Consulting", 
              desc: "Data-driven strategies and roadmaps for rapid business expansion.",
              fullDesc: "Comprehensive audits, competitive analysis, and custom growth plans tailored to your market.",
              detailedDesc: "Get expert guidance with our comprehensive growth consulting service. We analyse your entire business, identify untapped opportunities, and create a custom roadmap for rapid, sustainable expansion.\n\nOur data-driven approach includes competitive analysis, market research, and actionable strategies that deliver measurable results within 90 days.",
              pricing: "From £297/session",
              benefits: ["Comprehensive business audit", "Custom growth roadmap", "Competitive analysis", "Market opportunity identification", "90-day action plan"],
              icon: Target
            },
            { 
              title: "Marketing Campaigns", 
              desc: "High-ROI campaigns that generate immediate results.",
              fullDesc: "Multi-channel campaigns with advanced tracking, A/B testing, and continuous optimisation.",
              detailedDesc: "Launch high-impact marketing campaigns that deliver immediate, measurable results. We create multi-channel strategies with advanced tracking and continuous optimisation to maximise your ROI.\n\nFrom PPC advertising to email marketing, we handle the entire campaign lifecycle while providing transparent reporting and ongoing optimisation for sustained growth.",
              pricing: "From £997/month",
              benefits: ["Multi-channel campaign strategy", "Advanced tracking & analytics", "A/B testing & optimisation", "Monthly performance reviews", "Dedicated campaign manager"],
              icon: Megaphone
            },
                    ].map((card, i) => (
            <div
              key={card.title}
              className={`service-card group relative rounded-2xl card card-shine overflow-hidden cursor-pointer transition-all duration-300 ease-out ${
                expandedService === i 
                  ? 'ring-2 ring-accent/50 shadow-2xl shadow-accent/20' 
                  : 'hover:scale-[1.01]'
              }`}
              onClick={() => toggleServiceExpansion(i)}
              onKeyDown={(e) => handleServiceKeyDown(e, i)}
              tabIndex={0}
              role="button"
              aria-expanded={expandedService === i}
              aria-label={`${card.title} service details`}
            >
              <div className="card-accents" style={accentStyleFor(i)} aria-hidden />
              <div className="card-sheen" aria-hidden />
              
              <div className="relative z-10 p-6 flex flex-col flex-1">
                {/* Header */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 group-hover:border-accent/30 transition-colors">
                    <card.icon className="size-6 text-accent" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg md:text-xl font-semibold">{card.title}</h3>
                  </div>
                  {expandedService === i ? (
                    <button 
                      className="p-2 rounded-lg bg-white/5 border border-white/10 hover:border-accent/30 transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        setExpandedService(null);
                      }}
                      aria-label="Close expanded view"
                    >
                      <X className="size-4" />
                    </button>
                  ) : null}
                </div>

                {/* Collapsed content */}
                {expandedService !== i && (
                  <>
                    <div className="relative min-h-[3rem]">
                      <p className="text-muted opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {card.fullDesc}
                      </p>
                    </div>
                    <div className="mt-5 inline-flex items-center gap-2 text-accent group-hover:translate-x-1 transition-transform">
                      Learn more <ArrowRight className="size-4" />
                    </div>
                  </>
                )}

                {/* Expanded content */}
                {expandedService === i && (
                  <div className="space-y-6"
                       style={{ 
                         animation: 'fadeIn 0.4s ease-out'
                       }}>
                    {/* Detailed description */}
                    <div className="space-y-3">
                      {card.detailedDesc.split('\n\n').map((paragraph, idx) => (
                        <p key={idx} className="text-muted leading-relaxed">
                          {paragraph}
                        </p>
                      ))}
                    </div>

                    {/* Pricing */}
                    <div className="p-4 rounded-xl bg-white/5 border border-accent/20">
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-semibold text-accent">Investment</span>
                        <span className="text-2xl font-bold">{card.pricing}</span>
                      </div>
                    </div>

                    {/* Benefits */}
                    <div className="space-y-3">
                      <h4 className="font-semibold text-accent">What's Included:</h4>
                      <ul className="space-y-2">
                        {card.benefits.map((benefit, idx) => (
                          <li key={idx} className="flex items-center gap-3 text-muted">
                            <CheckCircle className="size-4 text-green-400 flex-shrink-0" />
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* CTA Button */}
                    <div className="pt-4 border-t border-white/10">
                      <button 
                        className="w-full btn-primary rounded-xl py-3 px-6 font-medium transition-all duration-500 ease-out hover:scale-[1.01] hover:shadow-lg hover:shadow-accent/30"
                        onClick={(e) => {
                          e.stopPropagation();
                          // Scroll to contact form
                          document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                      >
                        Book Now - {card.title}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        </div>
      </section>

      {/* CASE STUDIES */}
      <section id="work" className="relative py-24 md:py-32">
        <div ref={caseStudiesAnimRef} className="mx-auto w-full max-w-7xl px-6 md:px-10">
          <div className="case-studies-header max-w-3xl">
            <h2 className="text-2xl md:text-4xl font-semibold">Real Results for Real Businesses</h2>
            <p className="mt-3 text-muted text-lg">See how we've transformed local businesses into market leaders with measurable growth.</p>
          </div>
          <div className="mt-10 grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Local Fitness Studio",
                industry: "Health & Fitness",
                result: "+127% Online Bookings",
                description: "Complete digital transformation including website redesign, local SEO, and Google Business Profile optimisation.",
                metrics: ["40% increase in website traffic", "3x more Google reviews", "127% more online class bookings"]
              },
              {
                title: "Family Restaurant",
                industry: "Food & Dining",
                result: "+89% Delivery Orders",
                description: "Multi-platform presence with optimised ordering system, social media strategy, and reputation management.",
                metrics: ["89% increase in delivery orders", "50% more social media engagement", "4.8-star average rating"]
              },
              {
                title: "Professional Services",
                industry: "Legal Services",
                result: "+156% Qualified Leads",
                description: "Authority-building website, content marketing strategy, and local search dominance campaign.",
                metrics: ["156% more qualified leads", "Top 3 ranking for 12 keywords", "300% increase in consultation requests"]
              }
                        ].map((study, i) => (
              <div
                key={study.title}
                className="case-study-card group relative rounded-2xl p-6 card overflow-hidden cursor-pointer hover:scale-[1.08] hover:shadow-2xl hover:shadow-accent/20 transition-all duration-300 hover:-translate-y-2"
              >
                <div className="card-accents" style={accentStyleFor(i)} aria-hidden />
                <div className="card-sheen" aria-hidden />
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs uppercase tracking-wider text-accent">{study.industry}</span>
                    <span className="text-lg font-bold text-green-400">{study.result}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{study.title}</h3>
                  <p className="text-muted text-sm mb-4">{study.description}</p>
                  <div className="space-y-2 mb-6">
                    {study.metrics.map((metric, idx) => (
                      <div key={idx} className="flex items-center text-sm">
                        <div className="w-2 h-2 rounded-full bg-accent mr-3"></div>
                        <span className="text-muted">{metric}</span>
                      </div>
                    ))}
                  </div>
                  <button className="w-full py-2 px-4 rounded-lg bg-white/5 border border-white/10 hover:border-accent/30 transition-colors text-sm font-medium btn-secondary">
                    View Full Case Study
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

            {/* TESTIMONIALS */}
      <section id="testimonials" className="relative py-24 md:py-32">
        <div ref={testimonialsAnimRef} className="mx-auto w-full max-w-7xl px-6 md:px-10">
          <div className="max-w-3xl">
            <h2 className="text-2xl md:text-4xl font-semibold">What Our Clients Say</h2>
            <p className="mt-3 text-muted text-lg">Don't just take our word for it—hear from local business owners who've experienced real growth.</p>
          </div>
          <div className="mt-10">
            <TestimonialCarousel />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="relative py-24 md:py-32">
        <div ref={ctaAnimRef} className="mx-auto w-full max-w-5xl px-6 md:px-10 text-center">
          <div className="glass rounded-3xl p-10 md:p-16 glow-ring">
            <h2 className="cta-title text-2xl md:text-4xl font-semibold">Ready to Dominate Your Local Market?</h2>
            <p className="cta-subtitle mt-4 text-white max-w-3xl mx-auto text-lg">
              Get your free digital health check and discover exactly how to turn your digital presence into your most powerful growth engine. 
              <span className="font-medium"> No obligation, just actionable insights.</span>
            </p>
            <div className="cta-buttons mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#contact-form" className="btn-primary inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-base font-medium">
                Get Your Free Digital Health Check
                <ArrowRight className="size-5" />
              </a>
              <a href="tel:+1234567890" className="glass inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-base font-medium border border-white/10 hover:border-white/20 transition">
                Call Now: (123) 456-7890
              </a>
            </div>
            <p className="cta-features mt-4 text-sm text-muted">✓ 30-minute strategy session ✓ Custom growth roadmap ✓ No sales pressure</p>
          </div>
        </div>
      </section>

      {/* CONTACT FORM */}
      <section id="contact-form" className="relative py-24 md:py-32 bg-black/20">
        <div ref={contactAnimRef} className="mx-auto w-full max-w-7xl px-6 md:px-10">
          <ContactForm />
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative border-t border-white/10 py-10">
        <div className="mx-auto w-full max-w-7xl px-6 md:px-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-sm text-muted">© {new Date().getFullYear()} MeridianDigital</div>
          <nav className="flex items-center gap-6 text-sm">
            <a className="hover:text-accent transition shine-effect px-2 py-1 rounded" href="#about">About</a>
            <a className="hover:text-accent transition shine-effect px-2 py-1 rounded" href="#services">Services</a>
            <a className="hover:text-accent transition shine-effect px-2 py-1 rounded" href="#work">Work</a>
            <a className="hover:text-accent transition shine-effect px-2 py-1 rounded" href="#testimonials">Testimonials</a>
            <a className="hover:text-accent transition shine-effect px-2 py-1 rounded" href="#contact">Contact</a>
          </nav>
        </div>
      </footer>
    </div>
  );
}
