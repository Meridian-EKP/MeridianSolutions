import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // Add these optimizations:
  experimental: {
    optimizePackageImports: ['framer-motion', 'gsap', 'lucide-react'],
  },
  compress: true,
  // Serve the standalone Ed's Tech Help page (public/eds-tech-help.html) at /eds-tech-help
  async rewrites() {
    return [
      { source: "/eds-tech-help", destination: "/eds-tech-help.html" },
    ];
  },
  // MeridianSolutions - Digital Marketing Agency Website
};

export default nextConfig;
