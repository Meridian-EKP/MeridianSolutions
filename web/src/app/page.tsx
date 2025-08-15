"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { ArrowRight, Sparkles, Quote } from "lucide-react";
import { TestimonialCarousel } from "@/components/TestimonialCarousel";

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
              The Future of Local Digital Presence
            </h1>
            <p className="mt-6 text-muted max-w-2xl text-base md:text-lg">
              We craft sleek websites and high-performance local growth systems. From websites to Google Business Profile, SEO, and campaigns—built with precision and modern design.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href="#contact" className="btn-primary glow-ring inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm md:text-base font-medium">
                Book Your Digital Health Check
                <ArrowRight className="size-4" />
              </a>
              <a href="#services" className="glass inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm md:text-base font-medium border border-white/10 hover:border-white/20 transition">
                Explore Services
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
              <h2 className="text-2xl md:text-4xl font-semibold">Who we are</h2>
              <p className="mt-4 text-muted">
                MeridianDigital is a modern digital services studio focused on local businesses. We combine design, data, and automation to deliver measurable growth.
              </p>
              <p className="mt-3 text-muted">
                Our approach is minimal, fast, and conversion-driven with a focus on accessibility and performance.
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
          <div className="max-w-2xl">
            <h2 className="text-2xl md:text-4xl font-semibold">Services</h2>
            <p className="mt-3 text-muted">Built for speed, clarity, and local dominance.</p>
          </div>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Website Development", desc: "High-performance websites with modern UX and conversions." },
              { title: "Google Business Profile", desc: "Rank in the map pack and convert searches into calls." },
              { title: "Social Media Management", desc: "Content systems designed for local visibility." },
              { title: "Local SEO", desc: "Technical and content SEO for local intent." },
              { title: "Consulting", desc: "Roadmaps, audits, and growth playbooks." },
              { title: "Marketing Campaigns", desc: "Launches and promos with measurable ROI." },
            ].map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="group relative rounded-2xl p-6 card overflow-hidden"
              >
                <div className="card-accents" style={accentStyleFor(i)} aria-hidden />
                <div className="card-sheen" aria-hidden />
                <h3 className="text-lg md:text-xl font-semibold">{card.title}</h3>
                <p className="mt-2 text-muted">{card.desc}</p>
                <div className="mt-5 inline-flex items-center gap-2 text-accent group-hover:translate-x-1 transition-transform">
                  Learn more <ArrowRight className="size-4" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CASE STUDIES */}
      <section id="work" className="relative py-24 md:py-32">
        <div className="mx-auto w-full max-w-7xl px-6 md:px-10">
          <div className="max-w-2xl">
            <h2 className="text-2xl md:text-4xl font-semibold">Case Studies</h2>
            <p className="mt-3 text-muted">Before/after previews with clean transitions.</p>
          </div>
          <div className="mt-10 grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <motion.div key={n} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="relative rounded-2xl overflow-hidden glow-ring">
                <div className="aspect-[4/3]">
                  <Image src="/window.svg" alt={`Case ${n}`} fill className="object-cover opacity-90" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" className="relative py-24 md:py-32">
        <div className="mx-auto w-full max-w-7xl px-6 md:px-10">
          <div className="max-w-2xl">
            <h2 className="text-2xl md:text-4xl font-semibold">Testimonials</h2>
            <p className="mt-3 text-muted">What our clients say.</p>
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
            <h2 className="text-2xl md:text-4xl font-semibold">Ready to elevate your local presence?</h2>
            <p className="mt-3 text-muted max-w-2xl mx-auto">Get a free digital health check and a tailored roadmap for growth.</p>
            <div className="mt-8">
              <a href="#" className="btn-primary inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm md:text-base font-medium">
                Book Your Digital Health Check
                <ArrowRight className="size-4" />
              </a>
            </div>
          </div>
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
