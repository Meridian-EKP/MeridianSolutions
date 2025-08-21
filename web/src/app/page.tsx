"use client";

/**
 * Main Home Page Component
 * 
 * This component renders the complete MeridianDigital website homepage including:
 * - Hero section with parallax background
 * - About section with interactive cycle cards
 * - Services section with expandable cards
 * - Case studies showcase
 * - Testimonials carousel
 * - Contact form and CTA sections
 * 
 * Key Features:
 * - Directional shine effects on cycle cards
 * - Expandable service cards with detailed information
 * - Responsive design with glassmorphism effects
 * - Accessibility features (keyboard navigation, ARIA labels)
 */

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";
import { ArrowRight, Sparkles, Quote, Globe, MapPin, Share2, Search, Target, Megaphone, X, CheckCircle } from "lucide-react";

import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const yParallax = useTransform(scrollYProgress, [0, 1], ["0px", "-120px"]);
  
  // State for expanded service card
  const [expandedService, setExpandedService] = useState<number | null>(null);
  
  // State for hovered cycle card
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  
  // State for shine direction - tracks which direction the shine effect should animate for each card
  const [shineDirection, setShineDirection] = useState<{[key: number]: string}>({});
  
  /**
   * Determines the direction of the shine effect based on mouse entry/exit point
   * 
   * This function calculates which edge of the card the mouse entered/exited from
   * and returns the appropriate CSS class for the directional shine animation.
   * 
   * @param e - Mouse event containing clientX and clientY coordinates
   * @param element - The card element to calculate relative positions
   * @param isEntering - Boolean indicating if this is an entry (true) or exit (false) event
   * @returns CSS class name for the directional shine animation
   */
  const getShineDirection = (e: React.MouseEvent, element: HTMLElement, isEntering: boolean) => {
    // Get the card's position and dimensions relative to the viewport
    const rect = element.getBoundingClientRect();
    const x = e.clientX - rect.left; // Mouse X position relative to card left edge
    const y = e.clientY - rect.top;  // Mouse Y position relative to card top edge
    const w = rect.width;  // Card width
    const h = rect.height; // Card height
    
    // Calculate distances from each edge to determine closest edge
    const distFromTop = y;                    // Distance from top edge
    const distFromBottom = h - y;             // Distance from bottom edge
    const distFromLeft = x;                   // Distance from left edge
    const distFromRight = w - x;              // Distance from right edge
    
    // Find which edge is closest (where mouse entered/exited)
    const minDist = Math.min(distFromTop, distFromBottom, distFromLeft, distFromRight);
    
    if (isEntering) {
      // Entrance: shine goes FROM the entry edge to the opposite side
      if (minDist === distFromTop) return 'shine-top-to-bottom';
      if (minDist === distFromBottom) return 'shine-bottom-to-top';
      if (minDist === distFromLeft) return 'shine-left-to-right';
      if (minDist === distFromRight) return 'shine-right-to-left';
    } else {
      // Exit: shine goes TO the exit edge (reverse direction)
      // Note: Exit animations are currently disabled per user request
      if (minDist === distFromTop) return 'shine-bottom-to-top'; // towards top
      if (minDist === distFromBottom) return 'shine-top-to-bottom'; // towards bottom
      if (minDist === distFromLeft) return 'shine-right-to-left'; // towards left
      if (minDist === distFromRight) return 'shine-left-to-right'; // towards right
    }
    
    return 'shine-left-to-right'; // fallback direction
  };
  
  // Cycle cards data with detailed information
  const cycleCards = [
    {
      id: 1,
      title: "Discover",
      subtitle: "Analyse & Strategy",
      detailedTitle: "Deep Market Analysis",
      detailedContent: "We analyse your market, competitors, and customer behaviour to identify the best opportunities for growth and develop a data-driven strategy."
    },
    {
      id: 2,
      title: "Design", 
      subtitle: "Build & Optimise",
      detailedTitle: "Custom Development",
      detailedContent: "Our team creates beautiful, high-performance websites and digital assets optimised for conversions and user experience."
    },
    {
      id: 3,
      title: "Deploy",
      subtitle: "Launch & Monitor", 
      detailedTitle: "Strategic Launch",
      detailedContent: "We launch your digital presence with precision, implementing tracking systems and monitoring performance to ensure everything works perfectly."
    },
    {
      id: 4,
      title: "Dominate",
      subtitle: "Scale & Grow",
      detailedTitle: "Continuous Growth",
      detailedContent: "Through ongoing optimisation, data analysis, and strategic adjustments, we help you dominate your local market and scale sustainably."
    }
  ];
  
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

  // Removed all scroll animations for clean, bug-free experience

  /**
   * Generates deterministic accent styles for service cards
   * 
   * This function creates unique, visually appealing background patterns for each service card
   * using a deterministic pseudo-random number generator. This ensures each card gets a
   * consistent, unique pattern every time while maintaining visual variety.
   * 
   * @param idx - Index of the service card (0-based)
   * @returns CSS properties object with background gradient
   */
  const accentStyleFor = (idx: number): React.CSSProperties => {
    /**
     * Deterministic pseudo-random number generator
     * Uses sine function with large multiplier for pseudo-random distribution
     * Returns value between 0 and 1
     */
    const rand = (n: number) => {
      const x = Math.sin((idx + 1) * (n + 1) * 12.9898) * 43758.5453;
      return x - Math.floor(x);
    };
    
    // Helper functions for generating CSS values
    const pct = (n: number) => `${Math.round(rand(n) * 100)}%`; // Percentage for positioning
    const sz = (n: number, min: number, max: number) => `${Math.round(min + rand(n) * (max - min))}px`; // Size within range
    
    // Three-color palette for visual variety
    const c1 = 'var(--accent-blue-2)';  // Light blue
    const c2 = '#00ff95';               // Bright green
    const c3 = 'var(--accent-pink-2)';  // Light pink
    
    /**
     * Creates a radial gradient string with specified parameters
     * @param w - Width of the gradient
     * @param h - Height of the gradient
     * @param atX - X position (percentage)
     * @param atY - Y position (percentage)
     * @param col - Color of the gradient
     * @param stop - Where the gradient stops (default 60%)
     */
    const g = (
      w: string,
      h: string,
      atX: string,
      atY: string,
      col: string,
      stop = '60%'
    ) => `radial-gradient(${w} ${h} at ${atX} ${atY}, ${col}, transparent ${stop})`;
    
    // Generate three overlapping radial gradients for complex visual effect
    const bg = [
      g(sz(1, 240, 340), sz(2, 180, 280), pct(3), pct(4), c1),      // Large blue gradient
      g(sz(5, 220, 320), sz(6, 160, 260), pct(7), pct(8), c2, '65%'), // Medium green gradient
      g(sz(9, 240, 340), sz(10, 180, 260), pct(11), pct(12), c3, '62%'), // Large pink gradient
    ].join(',');
    
    return { background: bg };
  };

  return (
    <div id="top" className="page-container relative overflow-x-clip">
      {/* HERO */}
      <section ref={heroRef} className="relative min-h-[100svh] flex items-center pt-20">
        <div className="absolute inset-0 pointer-events-none">
          <motion.div style={{ y: yParallax }} className="h-full w-full">
            <div className="absolute inset-0 gradient-mesh" aria-hidden />
          </motion.div>
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 md:px-10">
          <div className="max-w-3xl">
            <p className="text-accent tracking-widest uppercase text-xs md:text-sm flex items-center gap-2">
              <Sparkles className="size-4" /> MeridianDigital
            </p>
            <h1 className="mt-4 text-4xl md:text-6xl lg:text-7xl font-semibold leading-[1.05]">
              We Build Digital Solutions That Bring You Results
            </h1>
            <p className="mt-6 text-muted max-w-2xl text-base md:text-lg">
              Create complete digital strategies that turn your digital presence into your strongest sales channel. Get more leads, customers, and revenue with our proven modern approach.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
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
        <div className="mx-auto w-full max-w-7xl px-6 md:px-10">
          <div className="grid md:grid-cols-2 gap-10 items-start">
          <div className="about-content space-y-6">
            <h2 className="text-2xl md:text-4xl font-semibold">Why Meridian?</h2>
            <div className="glass-no-shine rounded-3xl p-6 md:p-10 border border-white/10 transition-transform duration-300 hover:scale-105">
              <div className="relative z-10">
                <p className="text-muted">
                  MeridianDigital specialises in turning local businesses into digital leaders. We don't just build websites—we create complete growth ecosystems that attract, convert, and retain your ideal customers.
                </p>
                <p className="mt-4 text-muted">
                  Every project combines cutting-edge technology with proven marketing psychology to deliver measurable results. Our clients typically see 40-60% increases in qualified leads within 90 days.
                </p>
                
                <div className="mt-6 pt-6 border-t border-white/10">
                  <h3 className="text-lg font-semibold text-accent mb-3">You Stay in Control</h3>
                  <p className="text-muted">
                    Your business, your vision, your decisions. We believe in complete transparency and collaboration throughout every project. You maintain full control over what gets implemented, when it happens, and how your brand is represented.
                  </p>
                  <p className="mt-3 text-muted">
                    Monthly strategy sessions ensure we're always aligned with your goals. We discuss progress, review performance data, and adjust our approach based on your feedback and changing business needs.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="about-image">
            <div className="grid grid-cols-2 gap-4">
              {cycleCards.map((card, index) => {
                const accentClass = ['accent-a', 'accent-b', 'accent-c', 'accent-d'][index];
                const gradientClass = [
                  'from-accent to-accent-2',
                  'from-accent-2 to-accent-3',
                  'from-accent-3 to-accent',
                  'from-accent to-accent-2'
                ][index];
                
                return (
                  <div 
                    key={card.id}
                    className="card rounded-2xl p-8 text-center cursor-pointer h-[300px] flex flex-col justify-center transform-none relative overflow-hidden border border-white/5 bg-gradient-to-br from-white/[0.02] to-white/[0.08] backdrop-blur-xl hover:bg-white/[0.06] transition-all duration-300"
                    onMouseEnter={(e) => {
                      setHoveredCard(card.id);
                      const direction = getShineDirection(e, e.currentTarget as HTMLElement, true);
                      console.log(`Mouse entered card ${card.id} - Direction: ${direction}`);
                      setShineDirection(prev => ({ ...prev, [card.id]: direction }));
                    }}
                    onMouseLeave={(e) => {
                      setHoveredCard(null);
                      // Remove exit animation - just clear the shine direction
                      setShineDirection(prev => ({ ...prev, [card.id]: '' }));
                    }}
                  >
                    <div className={`card-accents ${accentClass}`} aria-hidden />
                    <div className={`card-sheen ${shineDirection[card.id] || ''}`} aria-hidden />
                    <div className="relative z-10">
                                                        {hoveredCard === card.id ? (
                                    // Detailed view on hover - Clean and minimal
                                    <div className="animate-fade-in text-left">
                                      <div className="mb-6">
                                        <span className="text-xs font-mono text-accent/60 uppercase tracking-widest">Step {card.id}</span>
                                      </div>
                                      <h3 className="text-xl font-medium text-white mb-4 leading-tight">{card.detailedTitle}</h3>
                                      <p className="text-muted leading-relaxed">{card.detailedContent}</p>
                                    </div>
                                  ) : (
                                    // Default view - Minimal and modern
                                    <div className="animate-fade-in">
                                      {/* Clean number */}
                                      <div className="mb-8">
                                        <span className="text-6xl font-light text-accent/40 leading-none">{card.id}</span>
                                      </div>
                                      
                                      {/* Clean title */}
                                      <div className="space-y-3">
                                        <h3 className="text-lg font-medium text-white">{card.title}</h3>
                                        <p className="text-sm text-muted/80">{card.subtitle}</p>
                                      </div>
                                    </div>
                                  )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          </div>
        </div>
      </section>

            {/* SERVICES */}
      <section id="services" className="relative py-24 md:py-32">
        <div className="mx-auto w-full max-w-7xl px-6 md:px-10">
          <div className="max-w-3xl">
            <h2 className="text-2xl md:text-4xl font-semibold">Complete Digital Growth Solutions</h2>
            <p className="mt-3 text-muted text-lg">Everything your local business needs to dominate your market and drive consistent growth.</p>
          </div>
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6 services-grid">
          {[
            { 
              title: "Website Development", 
              desc: "Professional websites designed for performance, conversions, and business growth.",
              fullDesc: "Custom-built using modern frameworks with mobile-first design, SEO optimisation, and conversion psychology.",
              detailedDesc: "We create stunning, high-performance websites that don't just look amazing—they drive real business results. Every site is built with conversion psychology, advanced SEO, and lightning-fast loading speeds.\n\nOur websites are fully responsive, accessible, and optimised for search engines from day one. You'll get a complete digital presence that turns visitors into customers and grows with your business.",
              pricing: "From £2,497",
              benefits: ["Mobile-first responsive design", "Advanced SEO optimisation", "Conversion psychology integration", "Lightning-fast loading speeds", "6 months free support"],
              icon: Globe
            },
            { 
              title: "Google Business Profile", 
              desc: "Complete Google Business Profile management for maximum local visibility.",
              fullDesc: "Complete GBP optimisation, review management, and local ranking strategies that get you found first.",
              detailedDesc: "Transform your Google Business Profile into a powerful lead generation machine. We optimise every element to dominate local search results and convert map searches into paying customers.\n\nOur comprehensive GBP strategy includes review management, post scheduling, local keyword optimisation, and ongoing monitoring to ensure you stay ahead of competitors.",
              pricing: "From £497/month",
              benefits: ["Complete profile optimisation", "Review management system", "Local ranking strategies", "Monthly performance reports", "Ongoing competitor monitoring"],
              icon: MapPin
            },
            { 
              title: "Social Media Management", 
              desc: "Professional social media management that builds brand authority and engagement.",
              fullDesc: "Platform-specific content strategies, community management, and local audience targeting that converts.",
              detailedDesc: "Build authority and drive meaningful engagement with strategic social media management. We create platform-specific content that resonates with your local audience and converts followers into customers.\n\nFrom content creation to community management, we handle everything while maintaining your authentic brand voice and driving measurable business results.",
              pricing: "From £797/month",
              benefits: ["Platform-specific content strategy", "Daily content creation & posting", "Community management", "Local audience targeting", "Monthly analytics reports"],
              icon: Share2
            },
            { 
              title: "Local SEO", 
              desc: "Comprehensive local search optimisation to dominate your market area.",
              fullDesc: "Technical SEO, local citations, keyword targeting, and ongoing optimisation for sustainable growth.",
              detailedDesc: "Dominate local search results with our comprehensive Local SEO strategy. We target high-intent local keywords and optimise your entire digital presence to attract customers who are ready to buy.\n\nOur proven approach includes technical SEO, local citations, Google My Business optimisation, and ongoing content strategy to ensure sustainable, long-term growth.",
              pricing: "From £697/month",
              benefits: ["Local keyword research & targeting", "Technical SEO optimisation", "Local citation building", "Google My Business optimisation", "Monthly ranking reports"],
              icon: Search
            },
            { 
              title: "Growth Consulting", 
              desc: "Expert business consulting with actionable strategies for sustainable growth.",
              fullDesc: "Comprehensive audits, competitive analysis, and custom growth plans tailored to your market.",
              detailedDesc: "Get expert guidance with our comprehensive growth consulting service. We analyse your entire business, identify untapped opportunities, and create a custom roadmap for rapid, sustainable expansion.\n\nOur data-driven approach includes competitive analysis, market research, and actionable strategies that deliver measurable results within 90 days.",
              pricing: "From £297/session",
              benefits: ["Comprehensive business audit", "Custom growth roadmap", "Competitive analysis", "Market opportunity identification", "90-day action plan"],
              icon: Target
            },
            { 
              title: "Marketing Campaigns", 
              desc: "Multi-channel marketing campaigns designed for maximum return on investment.",
              fullDesc: "Multi-channel campaigns with advanced tracking, A/B testing, and continuous optimisation.",
              detailedDesc: "Launch high-impact marketing campaigns that deliver immediate, measurable results. We create multi-channel strategies with advanced tracking and continuous optimisation to maximise your ROI.\n\nFrom PPC advertising to email marketing, we handle the entire campaign lifecycle while providing transparent reporting and ongoing optimisation for sustained growth.",
              pricing: "From £997/month",
              benefits: ["Multi-channel campaign strategy", "Advanced tracking & analytics", "A/B testing & optimisation", "Monthly performance reviews", "Dedicated campaign manager"],
              icon: Megaphone
            },
                    ].map((card, i) => (
            <div
              key={card.title}
              className={`service-card group relative rounded-2xl card overflow-hidden cursor-pointer transition-all duration-300 ease-out ${
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
              
              {/* Main card content with fixed padding */}
              <div className="relative z-10 p-6">
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
                      See more <ArrowRight className="size-4" />
                    </div>
                  </>
                )}
              </div>

              {/* Expandable content - outside main card content, at true bottom */}
              <div className={`service-card-content ${expandedService === i ? 'expanded' : 'collapsed'}`}>
                <div className="px-6 pb-6 space-y-2">
                  {/* Detailed description - Skip first two paragraphs */}
                  <div className="space-y-2">
                    {card.detailedDesc.split('\n\n').slice(2).map((paragraph, idx) => (
                      <p key={idx} className="text-muted leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
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
                </div>
              </div>

              {/* Investment Box - Outside expandable content to prevent animation issues */}
              {expandedService === i && (
                <div className="px-6 pb-4">
                  <div className="p-4 rounded-xl bg-white/5 border border-accent/20">
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-semibold text-accent">Investment</span>
                      <span className="text-lg font-bold">{card.pricing}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* CTA Button - Outside expandable content to prevent animation issues */}
              {expandedService === i && (
                <div className="px-6 pb-6 pt-4 border-t border-white/10">
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
              )}
            </div>
          ))}
        </div>
        </div>
      </section>

      {/* CASE STUDIES */}
      <section id="work" className="relative py-24 md:py-32">
        <div className="mx-auto w-full max-w-7xl px-6 md:px-10">
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



      {/* CTA */}
      <section id="contact" className="relative pt-24 md:pt-32 pb-32 md:pb-48 min-h-screen flex items-center">
        <div className="mx-auto w-full max-w-5xl px-6 md:px-10 text-center">
          <div className="glass-no-shine rounded-3xl p-10 md:p-16 transition-transform duration-300 hover:scale-105">
            <h2 className="text-2xl md:text-4xl font-semibold">Ready to Dominate Your Local Market?</h2>
            <p className="mt-4 text-white max-w-3xl mx-auto text-lg">
              Get your free digital health check and discover exactly how to turn your digital presence into your most powerful growth engine. 
              <span className="font-medium"> No obligation, just actionable insights.</span>
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#contact-form" className="btn-primary inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-base font-medium">
                Get Your Free Digital Health Check
                <ArrowRight className="size-5" />
              </a>
              <a href="tel:+447541516344" className="glass inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-base font-medium border border-white/10 hover:border-white/20 transition">
                Call Now: (+44) 7541 516 344
              </a>
            </div>
            <p className="mt-4 text-sm text-muted">✓ 30-minute strategy session ✓ Custom growth roadmap ✓ No sales pressure</p>
          </div>
        </div>
      </section>

      {/* PAGE BREAK */}
      <div className="relative py1">
        <div className="mx-auto w-full max-w-7xl px-6 md:px-10">
          <div className="relative">
            {/* Main accent line */}
            <div className="h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent"></div>
            {/* Subtle glow effect */}
            <div className="absolute inset-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent blur-sm"></div>
          </div>
        </div>
      </div>

      {/* CONTACT FORM */}
      <section id="contact-form" className="relative pt-24 md:pt-32 pb-32 md:pb-48 bg-black/20 min-h-screen">
        <div className="mx-auto w-full max-w-7xl px-6 md:px-10">
          <ContactForm />
        </div>
      </section>

      <Footer />
    </div>
  );
}
