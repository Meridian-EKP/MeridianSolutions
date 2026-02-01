import { Globe, MapPin, Share2, Smartphone, Target, Megaphone, LucideIcon } from "lucide-react";

export interface Service {
  slug: string;
  title: string;
  desc: string;
  fullDesc: string;
  detailedDesc: string;
  pricing: string;
  benefits: string[];
  icon: LucideIcon;
}

export const services: Service[] = [
  { 
    slug: "website-development",
    title: "Website Development", 
    desc: "Professional websites designed for performance, conversions, and business growth.",
    fullDesc: "Custom-built using modern frameworks with mobile-first design, SEO optimisation, and conversion psychology.",
    detailedDesc: "We create stunning, high-performance websites that don't just look amazing—they drive real business results. Every site is built with conversion psychology, advanced SEO, and lightning-fast loading speeds.\n\nOur websites are fully responsive, accessible, and optimised for search engines from day one. You'll get a complete digital presence that turns visitors into customers and grows with your business.",
    pricing: "• Basic brochure site: from £500 • Mid-tier site: from £1,200 • E-commerce site: from £2,500",
    benefits: ["Mobile-first responsive design", "Advanced SEO optimisation", "Conversion psychology integration", "Lightning-fast loading speeds", "6 months free support"],
    icon: Globe
  },
  { 
    slug: "local-search-optimization",
    title: "Local Search & Business Profile Optimisation", 
    desc: "We make sure your business shows up when local customers are searching, and that your profiles look trustworthy and up to date.",
    fullDesc: "Complete local search optimisation and Business Profile management for maximum local visibility.",
    detailedDesc: "We make sure your business shows up when local customers are searching, and that your profiles look trustworthy and up to date.\n\nOur comprehensive approach combines Business Profile optimisation with local SEO strategies to ensure you're found by the right customers at the right time.",
    pricing: "Typical investment: one-off projects from £250–£600, with optional monthly check-ins or updates if needed.",
    benefits: ["Optimisation of Google Business Profile", "Consistent details across key directories", "Keyword improvements for website and business descriptions", "Guidance on reviews: how to ask, how to respond, how to showcase", "Basic local search audit with clear recommendations", "Tracking key metrics (views, calls, direction requests)"],
    icon: MapPin
  },
  { 
    slug: "social-media-management",
    title: "Social Media Setup & Management", 
    desc: "Professional social media management that builds brand authority and engagement.",
    fullDesc: "Platform-specific content strategies, community management, and local audience targeting that converts.",
    detailedDesc: "Build authority and drive meaningful engagement with strategic social media management. We create platform-specific content that resonates with your local audience and converts followers into customers.\n\nFrom content creation to community management, we handle everything while maintaining your authentic brand voice and driving measurable business results.",
    pricing: "Setup from £250 • Management from £250/month per platform",
    benefits: ["Platform-specific content strategy", "Daily content creation & posting", "Community management", "Local audience targeting", "Monthly analytics reports"],
    icon: Share2
  },
  { 
    slug: "app-development",
    title: "App Development", 
    desc: "Simple, focused web or mobile apps that solve real problems like bookings, customer portals, or internal tools.",
    fullDesc: "Custom web or mobile app development focused on solving specific business problems.",
    detailedDesc: "Simple, focused web or mobile apps that solve real problems like bookings, customer portals, or internal tools.\n\nWe build lightweight, purpose-driven applications that integrate seamlessly with your existing tools and workflows.",
    pricing: "Typical investment: from £1,200+ for simple tools, with pricing based on complexity and required features.",
    benefits: ["Initial consultation to decide whether an app is the right solution", "Planning of a lightweight app around a clear problem", "Design and build of web or mobile app", "Integration with your existing tools (email, forms)", "Basic onboarding and walkthrough", "Ongoing support and improvements available as a separate option"],
    icon: Smartphone
  },
  { 
    slug: "consulting-strategy",
    title: "Consulting & Strategy", 
    desc: "Expert business consulting with actionable strategies for sustainable growth.",
    fullDesc: "Comprehensive audits, competitive analysis, and custom growth plans tailored to your market.",
    detailedDesc: "Get expert guidance with our comprehensive growth consulting service. We analyse your entire business, identify untapped opportunities, and create a custom roadmap for rapid, sustainable expansion.\n\nOur data-driven approach includes competitive analysis, market research, and actionable strategies that deliver measurable results within 90 days.",
    pricing: "Hourly from £75 • Monthly retainers from £300/month",
    benefits: ["Comprehensive business audit", "Custom growth roadmap", "Competitive analysis", "Market opportunity identification", "90-day action plan"],
    icon: Target
  },
  { 
    slug: "marketing-campaigns",
    title: "Marketing Campaigns", 
    desc: "Multi-channel marketing campaigns designed for maximum return on investment.",
    fullDesc: "Multi-channel campaigns with advanced tracking, A/B testing, and continuous optimisation.",
    detailedDesc: "Launch high-impact marketing campaigns that deliver immediate, measurable results. We create multi-channel strategies with advanced tracking and continuous optimisation to maximise your ROI.\n\nFrom PPC advertising to email marketing, we handle the entire campaign lifecycle while providing transparent reporting and ongoing optimisation for sustained growth.",
    pricing: "Setup from £300 per campaign • Management from £250/month",
    benefits: ["Multi-channel campaign strategy", "Advanced tracking & analytics", "A/B testing & optimisation", "Monthly performance reviews", "Dedicated campaign manager"],
    icon: Megaphone
  }
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find(service => service.slug === slug);
}

