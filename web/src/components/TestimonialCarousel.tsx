"use client";

import Image from "next/image";
import { useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "framer-motion";

type Testimonial = {
  quote: string;
  author: string;
  role: string;
  avatar: string; // path in public/
};

const testimonials: Testimonial[] = [
  {
    quote: "Game‑changing local results. We saw calls and bookings spike in week one.",
    author: "Alex Turner",
    role: "Cafe Owner",
    avatar: "/vercel.svg",
  },
  {
    quote: "Design that actually converts—clean, fast, and built for local search.",
    author: "Priya Singh",
    role: "Clinic Manager",
    avatar: "/globe.svg",
  },
  {
    quote: "Reliable, strategic, and effective. Our best campaign to date.",
    author: "Marco Ruiz",
    role: "Contractor",
    avatar: "/window.svg",
  },
];

export function TestimonialCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });

  const autoScroll = useCallback(() => {
    if (!emblaApi) return;
    const id = setInterval(() => {
      emblaApi.scrollNext();
    }, 3500);
    return () => clearInterval(id);
  }, [emblaApi]);

  useEffect(() => {
    const cleanup = autoScroll();
    return cleanup;
  }, [autoScroll]);

  return (
    <div className="glass rounded-3xl p-6 md:p-10 border border-white/10">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {testimonials.map((t, i) => (
            <motion.figure
              key={i}
              className="min-w-0 shrink-0 basis-full px-1"
              initial={{ opacity: 0.6 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="mx-auto max-w-2xl text-center">
                <div className="mx-auto size-14 rounded-full overflow-hidden glass flex items-center justify-center">
                  <Image src={t.avatar} alt="" width={48} height={48} className="opacity-90" />
                </div>
                <blockquote className="mt-5 text-lg md:text-xl text-foreground/90">“{t.quote}”</blockquote>
                <figcaption className="mt-4 text-sm text-muted">
                  {t.author} — {t.role}
                </figcaption>
              </div>
            </motion.figure>
          ))}
        </div>
      </div>
    </div>
  );
}


