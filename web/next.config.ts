import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // Add these optimizations:
  experimental: {
    optimizePackageImports: ['framer-motion', 'gsap', 'lucide-react'],
  },
  swcMinify: true,
  compress: true,
  // MeridianSolutions - Digital Marketing Agency Website
};

export default nextConfig;
