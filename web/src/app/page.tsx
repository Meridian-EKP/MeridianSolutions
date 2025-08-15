"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { ArrowRight, Sparkles, Quote, Globe, MapPin, Share2, Search, Target, Megaphone } from "lucide-react";
import { TestimonialCarousel } from "@/components/TestimonialCarousel";
import ContactForm from "@/components/ContactForm";

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const yParallax = useTransform(scrollYProgress, [0, 1], ["0px", "-120px"]);

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

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 md:px-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-3xl">
                              <p className="text-accent tracking-widest uppercase text-xs md:text-sm flex items-center gap-2">
                    <Sparkles className="size-4" /> MeridianDigital
                  </p>
                  <h1 className="mt-4 text-4xl md:text-6xl lg:text-7xl font-semibold leading-[1.05]">
                    Transform Your Local Business Into a Digital Powerhouse
                  </h1>
                  <p className="mt-6 text-muted max-w-2xl text-base md:text-lg">
                    We build conversion-driven websites and data-powered local marketing systems that turn your digital presence into your strongest sales channel. Get more leads, customers, and revenue with our proven modern approach.
                  </p>
            <div className="mt-8 flex flex-wrap gap-4">
                                  <a href="#contact" className="btn-primary glow-ring inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm md:text-base font-medium">
                      Get Your Free Digital Health Check
                      <ArrowRight className="size-4" />
                    </a>
                    <a href="#services" className="glass inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm md:text-base font-medium border border-white/10 hover:border-white/20 transition">
                      See Our Results
                    </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="relative py-24 md:py-32">
        <div className="mx-auto w-full max-w-7xl px-6 md:px-10 grid md:grid-cols-2 gap-10 items-center">
          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <div className="card rounded-2xl p-6 md:p-8 overflow-hidden">
              <div className="card-accents" style={{
                background: [
                  'radial-gradient(300px 220px at 12% 22%, color-mix(in oklab, var(--accent-blue-2) 55%, transparent), transparent 60%)',
                  'radial-gradient(260px 200px at 88% 20%, color-mix(in oklab, var(--accent-pink-2) 55%, transparent), transparent 60%)',
                  'radial-gradient(320px 220px at 45% 98%, color-mix(in oklab, #00ff95 55%, transparent), transparent 65%)'
                ].join(',')
              }} aria-hidden />
              <div className="card-sheen" aria-hidden />
                                    <h2 className="text-2xl md:text-4xl font-semibold">Why Local Businesses Choose Us</h2>
                      <p className="mt-4 text-muted">
                        MeridianDigital specializes in turning local businesses into digital leaders. We don't just build websites—we create complete growth ecosystems that attract, convert, and retain your ideal customers.
                      </p>
                      <p className="mt-3 text-muted">
                        Every project combines cutting-edge technology with proven marketing psychology to deliver measurable results. Our clients typically see 40-60% increases in qualified leads within 90 days.
                      </p>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.98 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden glow-ring">
              <Image src="/window.svg" alt="About" fill className="object-cover opacity-80 mix-blend-screen" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="relative py-24 md:py-32">
        <div className="mx-auto w-full max-w-7xl px-6 md:px-10">
                  <div className="max-w-3xl">
          <h2 className="text-2xl md:text-4xl font-semibold">Complete Digital Growth Solutions</h2>
          <p className="mt-3 text-muted text-lg">Everything your local business needs to dominate your market and drive consistent growth.</p>
        </div>
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { 
              title: "Website Development", 
              desc: "Lightning-fast, conversion-optimized websites that turn visitors into customers.",
              fullDesc: "Custom-built using modern frameworks with mobile-first design, SEO optimization, and conversion psychology.",
              icon: Globe
            },
            { 
              title: "Google Business Profile", 
              desc: "Dominate local search results and convert map searches into paying customers.",
              fullDesc: "Complete GBP optimization, review management, and local ranking strategies that get you found first.",
              icon: MapPin
            },
            { 
              title: "Social Media Management", 
              desc: "Strategic content that builds authority and drives local engagement.",
              fullDesc: "Platform-specific content strategies, community management, and local audience targeting that converts.",
              icon: Share2
            },
            { 
              title: "Local SEO", 
              desc: "Rank #1 for high-intent local searches in your area.",
              fullDesc: "Technical SEO, local citations, keyword targeting, and ongoing optimization for sustainable growth.",
              icon: Search
            },
            { 
              title: "Growth Consulting", 
              desc: "Data-driven strategies and roadmaps for rapid business expansion.",
              fullDesc: "Comprehensive audits, competitive analysis, and custom growth plans tailored to your market.",
              icon: Target
            },
            { 
              title: "Marketing Campaigns", 
              desc: "High-ROI campaigns that generate immediate results.",
              fullDesc: "Multi-channel campaigns with advanced tracking, A/B testing, and continuous optimization.",
              icon: Megaphone
            },
          ].map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="group relative rounded-2xl p-6 card overflow-hidden cursor-pointer hover:scale-[1.02] transition-transform duration-300"
              >
                <div className="card-accents" style={accentStyleFor(i)} aria-hidden />
                <div className="card-sheen" aria-hidden />
                <div className="relative z-10">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10 group-hover:border-accent/30 transition-colors">
                      <card.icon className="size-6 text-accent" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg md:text-xl font-semibold">{card.title}</h3>
                    </div>
                  </div>
                  <div className="relative min-h-[3rem]">
                    <p className="text-muted group-hover:opacity-0 transition-opacity duration-300">{card.desc}</p>
                    <p className="text-muted absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {card.fullDesc}
                    </p>
                  </div>
                  <div className="mt-5 inline-flex items-center gap-2 text-accent group-hover:translate-x-1 transition-transform">
                    Learn more <ArrowRight className="size-4" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CASE STUDIES */}
      <section id="work" className="relative py-24 md:py-32">
        <div className="mx-auto w-full max-w-7xl px-6 md:px-10">
          <div className="max-w-3xl">
            <h2 className="text-2xl md:text-4xl font-semibold">Real Results for Real Businesses</h2>
            <p className="mt-3 text-muted text-lg">See how we've transformed local businesses into market leaders with measurable growth.</p>
          </div>
          <div className="mt-10 grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Local Fitness Studio",
                industry: "Health & Fitness",
                result: "+127% Online Bookings",
                description: "Complete digital transformation including website redesign, local SEO, and Google Business Profile optimization.",
                metrics: ["40% increase in website traffic", "3x more Google reviews", "127% more online class bookings"]
              },
              {
                title: "Family Restaurant",
                industry: "Food & Dining",
                result: "+89% Delivery Orders",
                description: "Multi-platform presence with optimized ordering system, social media strategy, and reputation management.",
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
              <motion.div 
                key={study.title} 
                initial={{ opacity: 0, y: 12 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }} 
                transition={{ duration: 0.5, delay: i * 0.1 }} 
                className="group relative rounded-2xl overflow-hidden glow-ring bg-black/20 backdrop-blur-sm border border-white/10"
              >
                <div className="p-6">
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
                  <button className="w-full py-2 px-4 rounded-lg bg-white/5 border border-white/10 hover:border-accent/30 transition-colors text-sm font-medium">
                    View Full Case Study
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" className="relative py-24 md:py-32">
        <div className="mx-auto w-full max-w-7xl px-6 md:px-10">
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
        <div className="mx-auto w-full max-w-5xl px-6 md:px-10 text-center">
                  <div className="glass rounded-3xl p-10 md:p-16 glow-ring">
          <h2 className="text-2xl md:text-4xl font-semibold">Ready to Dominate Your Local Market?</h2>
          <p className="mt-4 text-muted max-w-3xl mx-auto text-lg">
            Get your free digital health check and discover exactly how to turn your digital presence into your most powerful growth engine. 
            <span className="text-white font-medium"> No obligation, just actionable insights.</span>
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#contact-form" className="btn-primary inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-base font-medium">
              Get Your Free Digital Health Check
              <ArrowRight className="size-5" />
            </a>
            <a href="tel:+1234567890" className="glass inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-base font-medium border border-white/10 hover:border-white/20 transition">
              Call Now: (123) 456-7890
            </a>
          </div>
          <p className="mt-4 text-sm text-muted">✓ 30-minute strategy session ✓ Custom growth roadmap ✓ No sales pressure</p>
        </div>
        </div>
      </section>

      {/* CONTACT FORM */}
      <section id="contact-form" className="relative py-24 md:py-32 bg-black/20">
        <div className="mx-auto w-full max-w-7xl px-6 md:px-10">
          <ContactForm />
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative border-t border-white/10 py-10">
        <div className="mx-auto w-full max-w-7xl px-6 md:px-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-sm text-muted">© {new Date().getFullYear()} MeridianDigital</div>
          <nav className="flex items-center gap-6 text-sm">
            <a className="hover:text-accent transition" href="#about">About</a>
            <a className="hover:text-accent transition" href="#services">Services</a>
            <a className="hover:text-accent transition" href="#work">Work</a>
            <a className="hover:text-accent transition" href="#testimonials">Testimonials</a>
            <a className="hover:text-accent transition" href="#contact">Contact</a>
          </nav>
        </div>
      </footer>
    </div>
  );
}
