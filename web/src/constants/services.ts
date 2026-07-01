import { Globe, MapPin, Link2, Smartphone, Target, Megaphone, LucideIcon } from "lucide-react";

export interface ServiceTier {
  name: string;
  price: string;
  priceNote?: string;
  features: string[];
  highlighted?: boolean;
}

export interface Service {
  slug: string;
  title: string;
  desc: string;
  fullDesc: string;
  detailedDesc: string;
  pricing: string;
  benefits: string[];
  tiers?: ServiceTier[];
  icon: LucideIcon;
}

export const services: Service[] = [
  { 
    slug: "website-development",
    title: "Website Development", 
    desc: "Professional websites designed for performance, conversions, and business growth.",
    fullDesc: "Custom-built using modern frameworks with mobile-first design, SEO optimisation, and conversion psychology.",
    detailedDesc: "We create stunning, high-performance websites that don't just look amazing—they drive real business results. Every site is built with conversion psychology, advanced SEO, and lightning-fast loading speeds.\n\nOur websites are fully responsive, accessible, and optimised for search engines from day one. You'll get a complete digital presence that turns visitors into customers and grows with your business.",
    pricing: "• Basic brochure site: from £300 • Mid-tier site: from £750 • E-commerce site: from £1,250",
    benefits: ["Mobile-first responsive design", "Advanced SEO optimisation", "Conversion psychology integration", "Lightning-fast loading speeds", "6 months free support"],
    icon: Globe
  },
  { 
    slug: "local-search-optimization",
    title: "Local Search & Business Profile Optimisation", 
    desc: "We make sure your business shows up when local customers are searching, and that your profiles look trustworthy and up to date.",
    fullDesc: "Complete local search optimisation and Business Profile management for maximum local visibility.",
    detailedDesc: "We make sure your business shows up when local customers are searching, and that your profiles look trustworthy and up to date.\n\nOur comprehensive approach combines Business Profile optimisation with local SEO strategies to ensure you're found by the right customers at the right time.",
    pricing: "Typical investment: one-off projects from £100, with optional monthly check-ins or updates if needed.",
    benefits: ["Optimisation of Google Business Profile", "Consistent details across key directories", "Keyword improvements for website and business descriptions", "Guidance on reviews: how to ask, how to respond, how to showcase", "Basic local search audit with clear recommendations", "Tracking key metrics (views, calls, direction requests)"],
    icon: MapPin
  },
  { 
    slug: "link-in-bio-setup",
    title: "Link in Bio Setup", 
    desc: "One simple link that houses all your links, socials, and content in a clean, branded page.",
    fullDesc: "A single, customisable link-in-bio page that connects your audience to everything that matters, with analytics on higher tiers.",
    detailedDesc: "Turn the single link in your bio into a powerful hub. We build you a clean, fast, mobile-first page that brings all your important links, socials, and content together in one branded place.\n\nStart free with a fully functional page, then upgrade to Pro for advanced customisation and analytics so you can see exactly what your audience is clicking and grow from there.",
    pricing: "Free plan available • Pro from £5/month (save 20% with annual billing)",
    benefits: ["Mobile-first, fast-loading page", "Your links, socials & content in one place", "Custom branding to match your business", "Simple to update whenever you need", "Analytics to track clicks and engagement (Pro)"],
    tiers: [
      {
        name: "Free",
        price: "£0",
        priceNote: "forever",
        features: ["1 page", "Basic customisation", "1–5 links"]
      },
      {
        name: "Pro",
        price: "£5",
        priceNote: "per month · save 20% annually (£48/year)",
        highlighted: true,
        features: ["Everything in Free", "Unlimited links", "Higher customisation", "Analytics & click tracking"]
      }
    ],
    icon: Link2
  },
  { 
    slug: "app-development",
    title: "App Development", 
    desc: "Simple, focused web or mobile apps that solve real problems like bookings, customer portals, or internal tools.",
    fullDesc: "Custom web or mobile app development focused on solving specific business problems.",
    detailedDesc: "Simple, focused web or mobile apps that solve real problems like bookings, customer portals, or internal tools.\n\nWe build lightweight, purpose-driven applications that integrate seamlessly with your existing tools and workflows.",
    pricing: "Typical investment: from £1,000 for simple tools, with pricing based on complexity and required features.",
    benefits: ["Initial consultation to decide whether an app is the right solution", "Planning of a lightweight app around a clear problem", "Design and build of web or mobile app", "Integration with your existing tools (email, forms)", "Basic onboarding and walkthrough", "Ongoing support and improvements available as a separate option"],
    icon: Smartphone
  },
  { 
    slug: "consulting-strategy",
    title: "Consulting & Strategy", 
    desc: "Expert business consulting with actionable strategies for sustainable growth.",
    fullDesc: "Comprehensive audits, competitive analysis, and custom growth plans tailored to your market.",
    detailedDesc: "Get expert guidance with our comprehensive growth consulting service. We analyse your entire business, identify untapped opportunities, and create a custom roadmap for rapid, sustainable expansion.\n\nOur data-driven approach includes competitive analysis, market research, and actionable strategies that deliver measurable results within 90 days.",
    pricing: "Hourly from £50 • Monthly retainers from £150/month",
    benefits: ["Comprehensive business audit", "Custom growth roadmap", "Competitive analysis", "Market opportunity identification", "90-day action plan"],
    icon: Target
  },
  { 
    slug: "marketing-campaigns",
    title: "Marketing Campaigns", 
    desc: "Multi-channel marketing campaigns designed for maximum return on investment.",
    fullDesc: "Multi-channel campaigns with advanced tracking, A/B testing, and continuous optimisation.",
    detailedDesc: "Launch high-impact marketing campaigns that deliver immediate, measurable results. We create multi-channel strategies with advanced tracking and continuous optimisation to maximise your ROI.\n\nFrom PPC advertising to email marketing, we handle the entire campaign lifecycle while providing transparent reporting and ongoing optimisation for sustained growth.",
    pricing: "Setup from £100 per campaign • Management from £150/month",
    benefits: ["Multi-channel campaign strategy", "Advanced tracking & analytics", "A/B testing & optimisation", "Monthly performance reviews", "Dedicated campaign manager"],
    icon: Megaphone
  }
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find(service => service.slug === slug);
}

