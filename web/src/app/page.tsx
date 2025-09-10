"use client";

/**
 * Main Home Page Component
 * 
 * This component renders the complete MeridianSolutions website homepage including:
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
import { useRef, useState, useEffect } from "react";
import { ArrowRight, Globe, MapPin, Share2, Search, Target, Megaphone, X, CheckCircle, ChevronDown } from "lucide-react";

import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import CaseStudyModal from "@/components/CaseStudyModal";
import MobileStarfield from "@/components/MobileStarfield";
import DesktopStarfield from "@/components/DesktopStarfield";

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const yParallax = useTransform(scrollYProgress, [0, 1], ["0px", "-120px"]);
  
     // State for expanded service card
   const [expandedService, setExpandedService] = useState<number | null>(null);
   
   // State for expanded about section (mobile only)
   const [expandedAbout, setExpandedAbout] = useState<number>(0);
   
   // State for hovered cycle card
   const [hoveredCard, setHoveredCard] = useState<number | null>(null);
   
   // State for shine direction - tracks which direction the shine effect should animate for each card
   const [shineDirection, setShineDirection] = useState<{[key: number]: string}>({});
  
  // State for case study modal
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<{
    id: number;
    title: string;
    industry: string;
    result: string;
    description: string;
    metrics: string[];
    beforePoints: string[];
    afterPoints: string[];
    detailedDescription: string;
  } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  

  
  // Set initial position to the middle of the duplicated content for infinite scroll
  useEffect(() => {
    const container = document.getElementById('case-studies-carousel');
    if (!container) return;

    // Start in the middle so user can scroll in both directions
    const cardWidth = container.scrollWidth / 27;
    container.scrollLeft = cardWidth * 9; // Start in the middle set
  }, []);
  
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
  
  // Handle service card expansion with smooth height animation
  const toggleServiceExpansion = (index: number) => {
    if (expandedService === index) {
      // Collapsing - wait for height animation to complete before removing content
      const cardElement = document.querySelector(`[data-service-index="${index}"]`);
      if (cardElement) {
        // Add collapsing class to start height animation
        cardElement.classList.add('collapsing');
        
        // Wait for height animation to complete before removing content
        setTimeout(() => {
          setExpandedService(null);
          cardElement.classList.remove('collapsing');
        }, 600); // Match the CSS transition duration
      } else {
        setExpandedService(null);
      }
    } else {
      // Expanding - smooth transition
      setExpandedService(index);
    }
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
       <section ref={heroRef} className="relative h-[calc(100vh-12rem-20px)] md:h-[70vh] flex items-start md:items-center pt-8 md:pt-20 starfield-border rounded-3xl mx-4 md:mx-10 lg:mx-[150px] mt-32 md:my-10 lg:my-[150px] mb-4 md:mb-10 lg:mb-[150px] overflow-hidden bg-black/20">
        {/* Mobile Starfield Background - Only visible on mobile */}
        <MobileStarfield 
          className="absolute top-2 left-2 right-2 bottom-16 z-0 rounded-3xl overflow-hidden md:hidden"
          particleCount={50}
          flareCount={2}
          color="#5ee7ff"
          linkChance={20}
          renderParticles={true}
          renderFlares={true}
          renderLinks={true}
          flicker={true}
        />
        
        {/* Desktop Starfield Background - Only visible on desktop */}
        <DesktopStarfield 
          className="absolute inset-0 z-0 rounded-3xl overflow-hidden hidden md:block"
          particleCount={50}
          flareCount={2}
          color="#5ee7ff"
          linkChance={20}
          renderParticles={true}
          renderFlares={true}
          renderLinks={true}
          flicker={true}
        />
        <div className="absolute inset-0 pointer-events-none">
          <motion.div style={{ y: yParallax }} className="h-full w-full">
            <div className="absolute inset-0 gradient-mesh" aria-hidden />
          </motion.div>
        </div>

        <div className="relative z-10 mx-auto w-full max-w-screen-2xl px-6 md:px-10">
          <div className="max-w-3xl">
            <h1 className="mt-8 md:mt-4 text-4xl md:text-6xl lg:text-7xl font-semibold leading-[1.05]">
              We Build Digital Solutions That Bring You Results
            </h1>
            <p className="mt-6 text-muted max-w-2xl text-base md:text-lg">
              Create complete digital strategies that turn your digital presence into your strongest sales channel. Get more leads, customers, and revenue with our proven modern approach.
            </p>
            
            {/* Desktop buttons - original positioning */}
            <div className="mt-8 hidden md:flex flex-wrap gap-4">
              <a href="#contact-form" className="btn-primary glow-ring inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm md:text-base font-medium">
                Get Your Free Digital Health Check
                <ArrowRight className="size-4" />
              </a>
              <a href="#services" className="glass inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm md:text-base font-medium border border-cyan-400/30 hover:border-cyan-400/50 transition">
                See Our Services
              </a>
            </div>
          </div>
        </div>
        
        {/* Mobile buttons - positioned with full flexibility */}
        <div className="absolute bottom-8 left-6 right-6 z-20 md:hidden">
          <div className="flex flex-wrap gap-4 justify-start ml-4">
            <a href="#contact-form" className="btn-primary glow-ring inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium">
              Get Your Free Digital Health Check
              <ArrowRight className="size-4" />
            </a>
            <a href="#services" className="glass inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium border border-cyan-400/30 hover:border-cyan-400/50 transition">
              See Our Services
            </a>
          </div>
        </div>
      </section>



             {/* ABOUT */}
       <section id="about" className="relative py-24 md:py-32">
         <div className="mx-auto w-full max-w-screen-2xl px-6 md:px-10">
           <div className="grid md:grid-cols-2 gap-10 items-start">
           <div className="about-content space-y-6">
             <h2 className="text-2xl md:text-4xl font-semibold">Why Meridian?</h2>
             <div className="glass-no-shine rounded-3xl p-6 md:p-10 border border-white/10 transition-transform duration-300 hover:scale-105">
               <div className="relative z-10">
                 {/* Collapsed content for mobile */}
                 <div className="md:hidden">
                   <p className="text-muted">
                     MeridianSolutions specialises in turning local businesses into digital leaders. We don&apos;t just build websites—we create complete growth ecosystems that attract, convert, and retain your ideal customers.
                   </p>
                                       <div className="mt-4 flex items-center">
                                              <button 
                          onClick={() => {
                            if (expandedAbout >= 1) {
                              // If expanded, collapse everything
                              setExpandedAbout(0);
                            } else {
                              // If collapsed, expand to first level
                              setExpandedAbout(1);
                            }
                          }}
                          className="text-accent hover:text-accent/80 transition-all duration-300 group cursor-pointer"
                          aria-label="Expand or collapse about section"
                        >
                          <span className={`inline-block transition-transform duration-300 ${expandedAbout >= 1 ? 'rotate-90' : 'rotate-0'}`}>
                            ❯
                          </span>
                        </button>
                    </div>
                 </div>
                 
                                   {/* First expanded view for mobile */}
                  <div className={`md:hidden ${expandedAbout >= 1 ? 'block' : 'hidden'}`}>
                    <div className="mt-6">
                      <h3 className="text-lg font-semibold text-accent mb-3">Your Personal Package</h3>
                      <p className="text-muted">
                        We craft custom digital packages tailored to your specific business needs and budget. Rather than forcing you into rigid service tiers, we analyse your goals, market position, and resources to design a strategic solution that maximizes your ROI. Our flexible approach ensures you only pay for what you need while getting the exact tools and strategies required to dominate your local market.
                      </p>
                      <div className="mt-4 flex items-center">
                                                                           <button 
                            onClick={() => {
                              if (expandedAbout >= 2) {
                                // If fully expanded, collapse to first level
                                setExpandedAbout(1);
                              } else {
                                // If not fully expanded, expand to second level
                                setExpandedAbout(2);
                              }
                            }}
                            className="text-accent hover:text-accent/80 transition-all duration-300 group cursor-pointer"
                            aria-label="Expand or collapse about section further"
                          >
                            <span className={`inline-block transition-transform duration-300 ${expandedAbout >= 2 ? 'rotate-90' : 'rotate-0'}`}>
                              ❯
                            </span>
                          </button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Second expanded view for mobile */}
                  <div className={`md:hidden ${expandedAbout >= 2 ? 'block' : 'hidden'}`}>
                    <div className="mt-6">
                      <h3 className="text-lg font-semibold text-accent mb-3">You Stay in Control</h3>
                      <p className="text-muted">
                        Your business, your vision, your decisions. We believe in complete transparency and collaboration throughout every project. You maintain full control over what gets implemented, when it happens, and how your brand is represented.
                      </p>
                      <p className="mt-3 text-muted">
                        Monthly strategy sessions ensure we&apos;re always aligned with your goals. We discuss progress, review performance data, and adjust our approach based on your feedback and changing business needs.
                      </p>
                      <div className="mt-4 flex items-center">
                                                                           <button 
                            onClick={() => {
                              setExpandedAbout(0);
                              // Smooth scroll to about section when collapsing from bottom
                              document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
                            }}
                            className="text-accent hover:text-accent/80 transition-all duration-300 group cursor-pointer"
                            aria-label="Collapse entire card"
                          >
                            <span className="inline-block transition-transform duration-300 -rotate-90">
                              ❯
                            </span>
                          </button>
                      </div>
                    </div>
                  </div>
                 
                 {/* Desktop view - always visible */}
                 <div className="hidden md:block">
                   <p className="text-muted">
                     MeridianSolutions specialises in turning local businesses into digital leaders. We don&apos;t just build websites—we create complete growth ecosystems that attract, convert, and retain your ideal customers.
                   </p>
                   <p className="mt-4 text-muted">
                     We craft custom digital packages tailored to your specific business needs and budget. Rather than forcing you into rigid service tiers, we analyse your goals, market position, and resources to design a strategic solution that maximizes your ROI. Our flexible approach ensures you only pay for what you need while getting the exact tools and strategies required to dominate your local market.
                   </p>
                   
                   <div className="mt-6 pt-6 border-t border-white/10">
                     <h3 className="text-lg font-semibold text-accent mb-3">You Stay in Control</h3>
                     <p className="text-muted">
                       Your business, your vision, your decisions. We believe in complete transparency and collaboration throughout every project. You maintain full control over what gets implemented, when it happens, and how your brand is represented.
                     </p>
                     <p className="mt-3 text-muted">
                       Monthly strategy sessions ensure we&apos;re always aligned with your goals. We discuss progress, review performance data, and adjust our approach based on your feedback and changing business needs.
                     </p>
                   </div>
                 </div>
               </div>
             </div>
           </div>
          <div className="about-image">
            <div className="grid grid-cols-2 gap-4">
              {cycleCards.map((card, index) => {
                const accentClass = ['accent-a', 'accent-b', 'accent-c', 'accent-d'][index];
                
                return (
                  <div 
                    key={card.id}
                    className="cycle-card relative"
                    onMouseEnter={(e) => {
                      setHoveredCard(card.id);
                      const direction = getShineDirection(e, e.currentTarget as HTMLElement, true);
                      console.log(`Mouse entered card ${card.id} - Direction: ${direction}`);
                      setShineDirection(prev => ({ ...prev, [card.id]: direction }));
                    }}
                    onMouseLeave={() => {
                      setHoveredCard(null);
                      // Remove exit animation - just clear the shine direction
                      setShineDirection(prev => ({ ...prev, [card.id]: '' }));
                    }}
                  >
                    <div className={`card-accents ${accentClass}`} aria-hidden />
                    <div className={`card-sheen ${shineDirection[card.id] || ''}`} aria-hidden />
                    
                    <div className="relative z-10">
                      {/* Desktop view - hover effects */}
                      <div className="hidden md:block">
                        {hoveredCard === card.id ? (
                          // Detailed view on hover - Clean and minimal
                          <div className="animate-fade-in text-left">
                            <div className="mb-6">
                              <span className="cycle-card-step">Step {card.id}</span>
                            </div>
                            <h3 className="cycle-card-detailed-title">{card.detailedTitle}</h3>
                            <p className="cycle-card-detailed-content">{card.detailedContent}</p>
                          </div>
                        ) : (
                          // Default view - Minimal and modern
                          <div className="animate-fade-in">
                            {/* Clean number */}
                            <div className="mb-8">
                              <span className="cycle-card-number">{card.id}</span>
                            </div>
                            
                            {/* Clean title */}
                            <div className="space-y-3">
                              <h3 className="cycle-card-title">{card.title}</h3>
                              <p className="cycle-card-subtitle">{card.subtitle}</p>
                            </div>
                          </div>
                        )}
                      </div>
                      
                      {/* Mobile view - default view only */}
                      <div className="md:hidden">
                        <div className="animate-fade-in">
                          {/* Clean number */}
                          <div className="mb-6">
                            <span className="cycle-card-number">{card.id}</span>
                          </div>
                          
                          {/* Clean title */}
                          <div className="space-y-2">
                            <h3 className="cycle-card-title">{card.title}</h3>
                            <p className="cycle-card-subtitle">{card.subtitle}</p>
                          </div>
                        </div>
                      </div>
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
      <section id="services" className="relative pt-12 md:pt-32 pb-24 md:pb-32">
        <div className="mx-auto w-full max-w-screen-2xl px-6 md:px-10">
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
              pricing: "• Basic brochure site: from £500 • Mid-tier site: from £1,200 • E-commerce site: from £2,500",
              benefits: ["Mobile-first responsive design", "Advanced SEO optimisation", "Conversion psychology integration", "Lightning-fast loading speeds", "6 months free support"],
              icon: Globe
            },
            { 
              title: "Business Profile Optimisation", 
              desc: "Complete Business Profile management for maximum local visibility.",
              fullDesc: "Complete GBP optimisation, review management, and local ranking strategies that get you found first.",
              detailedDesc: "Transform your Business Profile into a powerful lead generation machine. We optimise every element to dominate local search results and convert map searches into paying customers.\n\nOur comprehensive Business Profile strategy includes review management, post scheduling, local keyword optimisation, and ongoing monitoring to ensure you stay ahead of competitors.",
              pricing: "One-time setup from £200 • Ongoing from £100/month",
              benefits: ["Complete profile optimisation", "Review management system", "Local ranking strategies", "Monthly performance reports", "Ongoing competitor monitoring"],
              icon: MapPin
            },
            { 
              title: "Social Media Setup & Management", 
              desc: "Professional social media management that builds brand authority and engagement.",
              fullDesc: "Platform-specific content strategies, community management, and local audience targeting that converts.",
              detailedDesc: "Build authority and drive meaningful engagement with strategic social media management. We create platform-specific content that resonates with your local audience and converts followers into customers.\n\nFrom content creation to community management, we handle everything while maintaining your authentic brand voice and driving measurable business results.",
              pricing: "Setup from £250 • Management from £250/month per platform",
              benefits: ["Platform-specific content strategy", "Daily content creation & posting", "Community management", "Local audience targeting", "Monthly analytics reports"],
              icon: Share2
            },
            { 
              title: "Local SEO", 
              desc: "Comprehensive local search optimisation to dominate your market area.",
              fullDesc: "Technical SEO, local citations, keyword targeting, and ongoing optimisation for sustainable growth.",
              detailedDesc: "Dominate local search results with our comprehensive Local SEO strategy. We target high-intent local keywords and optimise your entire digital presence to attract customers who are ready to buy.\n\nOur proven approach includes technical SEO, local citations, Google My Business optimisation, and ongoing content strategy to ensure sustainable, long-term growth.",
              pricing: "Initial setup from £400 • Ongoing from £250/month",
              benefits: ["Local keyword research & targeting", "Technical SEO optimisation", "Local citation building", "Google My Business optimisation", "Monthly ranking reports"],
              icon: Search
            },
            { 
              title: "Consulting & Strategy", 
              desc: "Expert business consulting with actionable strategies for sustainable growth.",
              fullDesc: "Comprehensive audits, competitive analysis, and custom growth plans tailored to your market.",
              detailedDesc: "Get expert guidance with our comprehensive growth consulting service. We analyse your entire business, identify untapped opportunities, and create a custom roadmap for rapid, sustainable expansion.\n\nOur data-driven approach includes competitive analysis, market research, and actionable strategies that deliver measurable results within 90 days.",
              pricing: "Hourly from £75 • Monthly retainers from £300/month",
              benefits: ["Comprehensive business audit", "Custom growth roadmap", "Competitive analysis", "Market opportunity identification", "90-day action plan"],
              icon: Target
            },
            { 
              title: "Marketing Campaigns", 
              desc: "Multi-channel marketing campaigns designed for maximum return on investment.",
              fullDesc: "Multi-channel campaigns with advanced tracking, A/B testing, and continuous optimisation.",
              detailedDesc: "Launch high-impact marketing campaigns that deliver immediate, measurable results. We create multi-channel strategies with advanced tracking and continuous optimisation to maximise your ROI.\n\nFrom PPC advertising to email marketing, we handle the entire campaign lifecycle while providing transparent reporting and ongoing optimisation for sustained growth.",
              pricing: "Setup from £300 per campaign • Management from £250/month",
              benefits: ["Multi-channel campaign strategy", "Advanced tracking & analytics", "A/B testing & optimisation", "Monthly performance reviews", "Dedicated campaign manager"],
              icon: Megaphone
            },
                    ].map((card, i) => (
            <div
              key={card.title}
              data-service-index={i}
              className={`service-card group relative rounded-2xl card overflow-hidden cursor-pointer transition-all duration-400 ease-out ${
                expandedService === i 
                  ? 'expanded ring-2 ring-accent/50 shadow-2xl shadow-accent/20' 
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
              
              {/* Main card content with tighter padding */}
              <div className="relative z-10 p-5 flex flex-col">
                {/* Header */}
                <div className="flex items-start gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-white/5 border border-cyan-400/30 group-hover:border-accent/30 transition-colors">
                    <card.icon className="size-5 text-accent" />
                  </div>
                  <div className="flex-1 flex items-center justify-between">
                    <h3 className="text-base md:text-lg font-semibold">{card.title}</h3>
                    {/* Mobile: Show expand arrow inline with title - always visible, rotates smoothly */}
                    <div className="md:hidden text-accent transition-all duration-300">
                      <span className={`inline-block transition-transform duration-300 ${
                        expandedService === i ? 'rotate-90' : 'rotate-0'
                      }`}>
                        ❯
                      </span>
                    </div>
                  </div>
                </div>

                {/* Collapsed content */}
                {expandedService !== i && (
                  <>
                    {/* Desktop: Show description on hover */}
                    <div className="hidden md:block relative min-h-[3rem] flex-1">
                      <p className="text-muted opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-base leading-relaxed">
                        {card.fullDesc}
                      </p>
                    </div>
                    
                    {/* Desktop: Show expand arrow on hover - always visible, rotates smoothly */}
                    <div className="hidden md:block mt-auto pt-2 flex items-center">
                      <div className="text-accent group-hover:text-accent/80 transition-all duration-300">
                        <span className={`inline-block transition-transform duration-300 ${
                          expandedService === i ? 'rotate-90' : 'rotate-0'
                        }`}>
                          ❯
                        </span>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Expandable content - outside main card content, at true bottom */}
              {expandedService === i && (
                <div className="px-5 pb-5 space-y-2 pt-0">
                  {/* Detailed description - Skip first two paragraphs */}
                  <div className="space-y-2">
                    {card.detailedDesc.split('\n\n').slice(2).map((paragraph, idx) => (
                      <p 
                        key={idx} 
                        className="text-muted leading-relaxed"
                        style={{
                          transitionDelay: `${idx * 0.1}s`
                        }}
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>

                  {/* Benefits */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-accent flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-accent"></span>
                      What&apos;s Included
                    </h4>
                    <ul className="space-y-2">
                      {card.benefits.map((benefit, idx) => (
                        <li 
                          key={idx} 
                          className="flex items-center gap-3 text-muted"
                          style={{
                            transitionDelay: `${(idx + 3) * 0.1}s`
                          }}
                        >
                          <CheckCircle className="size-4 text-green-400 flex-shrink-0" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Investment Section - Integrated design without box */}
              {expandedService === i && (
                <div 
                  className="px-5 pb-4 pt-0"
                  style={{
                    transitionDelay: '0.2s'
                  }}
                >
                  <div className="space-y-2">
                    <h4 className="font-semibold text-accent flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-accent"></span>
                      Investment Options
                    </h4>
                    <div className="text-muted leading-relaxed whitespace-pre-line">
                      {card.pricing}
                    </div>
                  </div>
                </div>
              )}

              {/* CTA Button - Outside expandable content to prevent animation issues */}
              {expandedService === i && (
                <div 
                  className="px-5 pb-5 pt-2 border-t border-white/10"
                  style={{
                    transitionDelay: '0.3s'
                  }}
                >
                  <button 
                    className="w-full btn-primary rounded-xl py-3 px-6 font-medium transition-all duration-500 ease-out hover:scale-[1.01] hover:shadow-lg hover:shadow-accent/30 cursor-pointer"
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
      <section id="work" className="relative pt-24 md:pt-32 pb-8 md:pb-32">
        <div className="mx-auto w-full max-w-screen-2xl px-6 md:px-10">
          <div className="case-studies-header max-w-3xl">
            <h2 className="text-2xl md:text-4xl font-semibold">Transformations That Drive Results</h2>
            <p className="mt-3 text-muted text-lg">Here are some concept projects that demonstrate how we can transform your business’s online presence.</p>
          </div>
          {/* Carousel Container */}
          <div 
            className="mt-10"
            onMouseEnter={() => {
              document.documentElement.style.overflow = 'hidden';
              document.body.style.overflow = 'hidden';
            }}
            onMouseLeave={() => {
              document.documentElement.style.overflow = 'auto';
              document.body.style.overflow = 'auto';
            }}
          >
            {/* Carousel Scroll Container */}
            <div 
              id="case-studies-carousel"
              className="flex gap-6 overflow-x-auto overflow-y-hidden scrollbar-hide snap-x snap-mandatory scroll-smooth cursor-grab active:cursor-grabbing prevent-page-scroll"
              style={{ 
                scrollbarWidth: 'none', 
                msOverflowStyle: 'none',
                scrollBehavior: 'smooth'
              }}
              tabIndex={0}
              onMouseDown={(e) => {
                const container = e.currentTarget;
                let isDown = false;
                const startX = e.pageX - container.offsetLeft;
                const scrollLeft = container.scrollLeft;

                const handleMouseMove = (e: MouseEvent) => {
                  if (!isDown) return;
                  e.preventDefault();
                  const x = e.pageX - container.offsetLeft;
                  const walk = (x - startX) * 2;
                  container.scrollLeft = scrollLeft - walk;
                };

                const handleMouseUp = () => {
                  isDown = false;
                  container.classList.remove('cursor-grabbing');
                  container.classList.add('cursor-grab');
                };

                isDown = true;
                container.classList.remove('cursor-grab');
                container.classList.add('cursor-grabbing');

                document.addEventListener('mousemove', handleMouseMove);
                document.addEventListener('mouseup', handleMouseUp);
              }}
              onKeyDown={(e) => {
                const container = e.currentTarget;
                const cardWidth = container.scrollWidth / 27; // 27 cards (9 × 3) for circular scroll
                
                if (e.key === 'ArrowRight') {
                  e.preventDefault();
                  container.scrollBy({ left: cardWidth, behavior: 'smooth' });
                } else if (e.key === 'ArrowLeft') {
                  e.preventDefault();
                  container.scrollBy({ left: -cardWidth, behavior: 'smooth' });
                }
              }}
              onWheel={(e) => {
                // Completely prevent the default wheel behavior
                e.preventDefault();
                e.stopPropagation();
                
                const container = e.currentTarget;
                const cardWidth = container.scrollWidth / 27; // 27 cards (9 × 3) for circular scroll
                
                // Only handle horizontal scrolling
                if (e.deltaY !== 0) {
                  if (e.deltaY > 0) {
                    // Scroll right
                    container.scrollBy({ left: cardWidth, behavior: 'smooth' });
                  } else {
                    // Scroll left
                    container.scrollBy({ left: -cardWidth, behavior: 'smooth' });
                  }
                }
              }}

            >
              {(() => {
                const caseStudies = [
                  {
                    id: 1,
                    title: "Café Bloom",
                    industry: "Local Coffee Shop",
                                         result: "From generic to irresistable",
                    description: "Complete digital transformation including website redesign, local SEO, and Business Profile optimisation.",
                    metrics: ["Menu now accessible online", "Online ordering integrated", "Social media buzz created"],
                    beforePoints: ["Outdated one-page site", "No menu online", "No online ordering", "Weak social media"],
                    afterPoints: ["Interactive digital menu", "Online ordering system", "Instagram feed integration", "Modern responsive design"],
                    detailedDescription: "Café Bloom transformed from a local coffee shop with minimal online presence to a digital-first business with seamless online ordering and local SEO dominance."
                  },
                  {
                    id: 2,
                    title: "FlowPro Plumbing",
                    industry: "Plumbing & Heating",
                    result: "From invisible to fully booked locally",
                    description: "Multi-platform presence with optimised ordering system, social media strategy, and reputation management.",
                    metrics: ["Website now mobile-friendly", "Business Profile optimised", "Clear call-to-actions driving bookings"],
                    beforePoints: ["No Business Profile", "No reviews", "Hard to contact", "Poor mobile usability"],
                    afterPoints: ["Optimised Business Profile", "Mobile-friendly service pages", "'Call Now' booking buttons", "Customer reviews highlighted"],
                                          detailedDescription: "FlowPro Plumbing went from struggling to get calls to dominating local search results with an optimised online presence and streamlined booking system."
                  },
                  {
                    id: 3,
                    title: "Pulse Gym",
                    industry: "Fitness Studio",
                    result: "From outdated to modern fitness hub",
                    description: "Authority-building website, content marketing strategy, and local search dominance campaign.",
                    metrics: ["Easy class scheduling online", "Mobile-first design", "Trust built with reviews and testimonials"],
                    beforePoints: ["Clunky outdated site", "Class timetable as PDF", "No online booking", "No testimonials"],
                    afterPoints: ["Mobile-first design", "Class scheduling system", "Integrated booking", "Member testimonials"],
                    detailedDescription: "Pulse Gym evolved from a basic website to a comprehensive fitness platform with online booking, class schedules, and community engagement features."
                  },
                  {
                    id: 4,
                    title: "Bella's Kitchen",
                    industry: "Family Restaurant",
                    result: "From word-of-mouth only to digital dining destination",
                    description: "Complete digital presence overhaul with patient portal integration and local SEO dominance.",
                    metrics: ["Optimised online ordering system", "Engaging social media presence", "Positive reputation management"],
                    beforePoints: ["Static page with PDF menu", "No delivery system", "No social proof"],
                    afterPoints: ["Mobile-friendly menu", "Online ordering system", "Reputation management", "Customer review highlights"],
                    detailedDescription: "Bella's Kitchen expanded from dine-in only to a multi-channel restaurant with delivery integration, social media presence, and online ordering."
                  },
                  {
                    id: 5,
                    title: "Glow Hair Studio",
                    industry: "Hair & Beauty Salon",
                    result: "From walk-ins only to fully booked online",
                    description: "Stylish website redesign with online booking system and social media integration.",
                    metrics: ["Seamless online booking system", "Stylish modern web design", "Instagram integration"],
                    beforePoints: ["Only Facebook page", "No proper website", "No online booking"],
                    afterPoints: ["Modern stylish website", "Online appointment calendar", "Instagram gallery integration"],
                    detailedDescription: "Glow Hair Studio modernized their booking process with an integrated online system and social media presence that showcases their work."
                  },
                  {
                    id: 6,
                    title: "Thompson Legal",
                    industry: "Law Firm",
                    result: "From outdated to authoritative and trusted",
                    description: "Professional website with service scheduling and customer review management system.",
                    metrics: ["Professional website redesign", "Content built for trust and credibility", "Dominant local search presence"],
                    beforePoints: ["Outdated WordPress site", "Heavy text", "Poor SEO", "No authority signals"],
                    afterPoints: ["Professional redesign", "Service pages optimised for local SEO", "Credibility-building blog", "Team profiles"],
                    detailedDescription: "Thompson Legal transformed their online presence from a basic website to an authoritative legal resource that generates qualified leads consistently."
                  },
                  {
                    id: 7,
                    title: "SmileBright Dental",
                    industry: "Dental Clinic",
                    result: "From confusing to patient-friendly",
                    description: "Modern ordering system with loyalty programme and social media marketing strategy.",
                    metrics: ["Simple online appointment forms", "Clear service pages", "Improved local discoverability"],
                    beforePoints: ["Cluttered site", "No appointment form", "Jargon-heavy", "No patient reviews"],
                    afterPoints: ["Clean patient-first design", "Easy appointment form", "Clear service listings", "Testimonial integration"],
                    detailedDescription: "SmileBright Dental streamlined their patient onboarding process with online forms and local SEO optimisation that attracts new patients."
                  },
                  {
                    id: 8,
                    title: "BuildRight Contractors",
                    industry: "Construction Service",
                    result: "From no portfolio to professional showcase",
                    description: "E-commerce integration with inventory management and local community marketing.",
                    metrics: ["Projects displayed visually", "Modern lead capture system", "Strong local search presence"],
                    beforePoints: ["No portfolio online", "Plain contact page", "No SEO"],
                    afterPoints: ["Visual project gallery", "Lead capture form", "Optimised local service pages", "Trust-focused design"],
                    detailedDescription: "BuildRight Contractors built a modern portfolio website that showcases their work and converts visitors into qualified leads."
                  },
                  {
                    id: 9,
                    title: "Bloom & Co.",
                    industry: "Florist / Gift Shop",
                    result: "From shop-only sales to online success",
                    description: "Professional website with property listings and lead generation optimisation.",
                    metrics: ["E-commerce shop added", "Social media sales channels connected", "Expanded customer reach online"],
                    beforePoints: ["Shop-only sales", "No e-commerce", "No social integration"],
                    afterPoints: ["E-commerce website", "Online catalog with checkout", "Instagram + Facebook shop integration"],
                    detailedDescription: "Bloom & Co. expanded from a local florist to an online gift shop with e-commerce integration and social media sales channels."
                  }
                ];
                
                // Create a circular carousel by duplicating the cards 3 times for seamless looping
                const caseStudiesForCarousel = [...caseStudies, ...caseStudies, ...caseStudies];
                
                                return caseStudiesForCarousel.map((study, i) => (
                                     <div
                     key={`${study.title}-${i}`}
                     className="case-study-card group relative rounded-2xl p-6 card overflow-hidden hover:shadow-2xl hover:shadow-accent/20 transition-all duration-300 flex-shrink-0 w-full md:w-96 lg:w-[420px] snap-center select-none flex flex-col h-[400px]"
                   >
                     <div className="card-accents" style={accentStyleFor(i)} aria-hidden />
                     <div className="card-sheen" aria-hidden />
                     <div className="relative z-10 flex flex-col h-full">
                        {/* Industry Badge */}
                        <div className="inline-flex items-center px-3 py-1 rounded-full bg-accent/10 text-sm font-medium text-accent mb-4">
                          <div className="w-1.5 h-1.5 rounded-full bg-accent mr-2"></div>
                          {study.industry}
                        </div>
                        
                        {/* Qualitative Outcome */}
                        <div className="mb-4">
                          <span className="text-lg font-semibold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent leading-tight">
                            {study.result}
                          </span>
                        </div>
                       <h3 className="text-xl font-semibold mb-3">{study.title}</h3>
                       <p className="text-muted text-sm mb-4">{study.description}</p>
                       <div className="space-y-2 mb-6 flex-1">
                         {study.metrics.map((metric, idx) => (
                           <div key={idx} className="flex items-center text-sm">
                           <div className="w-2 h-2 rounded-full bg-accent mr-3"></div>
                           <span className="text-muted">{metric}</span>
                         </div>
                       ))}
                     </div>
                     <button 
                       onClick={() => {
                         setSelectedCaseStudy(study);
                         setIsModalOpen(true);
                       }}
                                               className="w-full py-2 px-4 rounded-lg bg-white/5 border border-white/10 hover:border-accent/30 transition-colors text-sm font-medium btn-secondary btn-secondary-no-shine-mobile cursor-pointer mt-auto"
                     >
                       <span className="md:hidden">View Before & After</span>
                       <span className="hidden md:inline">View Full Case Study</span>
                     </button>
                   </div>
                </div>
                          ));
              })()}
            </div>
            
            {/* Navigation Arrow - Below the carousel */}
            <div className="mt-6 flex justify-start">
              <button
                onClick={() => {
                  const container = document.getElementById('case-studies-carousel');
                  if (container) {
                    const cardWidth = container.scrollWidth / 27; // 27 cards (9 × 3) for circular scroll
                    container.scrollBy({ left: cardWidth, behavior: 'smooth' });
                  }
                }}
                                 className="p-3 rounded-full bg-black/20 border border-cyan-400/30 hover:border-accent/60 hover:bg-accent/10 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-accent/20 backdrop-blur-sm cursor-pointer"
                aria-label="Next case study"
              >
                <ArrowRight className="size-5 text-accent" />
              </button>
            </div>
          </div>
        </div>
      </section>



      {/* CTA */}
      <section id="contact" className="relative pt-24 md:pt-2 pb-32 md:pb-48 min-h-screen flex items-center">
        <div className="mx-auto w-full max-w-screen-2xl px-6 md:px-10 text-center">
                     <div className="glass-no-shine rounded-3xl p-10 md:p-16 border border-white/10 transition-transform duration-300 hover:scale-105">
            <h2 className="text-2xl md:text-4xl font-semibold">Ready to Dominate Your Local Market?</h2>
            <p className="mt-4 text-white max-w-3xl mx-auto text-lg">
              Get your free digital health check and discover exactly how to turn your digital presence into your most powerful asset. 
              <span className="font-medium"> No obligation, just actionable insights.</span>
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#contact-form" className="btn-primary inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-base font-medium">
                Get Your Free Digital Health Check
                <ArrowRight className="size-5" />
              </a>
                             <a href="tel:+447541516344" className="glass btn-primary-no-shine-mobile inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-base font-medium border border-cyan-400/30 hover:border-cyan-400/50 transition">
                Call Now: (+44) 7541 516 344
              </a>
            </div>
            <p className="mt-4 text-sm text-muted">✓ 30-minute strategy session ✓ Custom growth roadmap ✓ No sales pressure</p>
          </div>
        </div>
      </section>

      {/* PAGE BREAK */}
      <div className="relative py1">
        <div className="mx-auto w-full max-w-screen-2xl px-6 md:px-10">
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
        <div className="mx-auto w-full max-w-screen-2xl px-6 md:px-10">
          <ContactForm />
        </div>
      </section>

      <Footer />
      
      {/* Case Study Modal */}
      <CaseStudyModal
        caseStudy={selectedCaseStudy}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedCaseStudy(null);
        }}
      />
    </div>
  );
}
