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
    quote: "MeridianDigital completely transformed our business. We went from 5-10 customers per day to being fully booked weeks in advance. Their local SEO strategy got us ranking #1 for every coffee shop search in our area.",
    author: "Sarah Mitchell",
    role: "Owner, Sunrise Coffee Roasters",
    avatar: "/window.svg",
  },
  {
    quote: "The website they built for our medical practice is incredible. Professional, fast, and optimized for local search. We're getting 4x more appointment bookings than before, and patients love the online scheduling system.",
    author: "Dr. James Chen",
    role: "Family Medicine Practice",
    avatar: "/globe.svg",
  },
  {
    quote: "Working with MeridianDigital was the best business decision we've made. Their Google Business Profile optimization and local marketing strategy increased our service calls by 250%. We had to hire additional staff to keep up!",
    author: "Roberto Martinez",
    role: "Martinez Plumbing & HVAC",
    avatar: "/vercel.svg",
  },
  {
    quote: "They don't just build websites—they build growth engines. Our new site combined with their SEO work has brought in over $300K in new business this year. The ROI is incredible.",
    author: "Lisa Thompson",
    role: "Thompson Legal Services",
    avatar: "/file.svg",
  },
  {
    quote: "Professional, knowledgeable, and results-driven. Our restaurant went from struggling during the pandemic to having a 6-week waitlist. Their digital strategy literally saved our business.",
    author: "Michael Park",
    role: "Owner, Park's Korean BBQ",
    avatar: "/next.svg",
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


