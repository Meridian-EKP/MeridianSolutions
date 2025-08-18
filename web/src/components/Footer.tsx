"use client";

import { useState, useEffect } from "react";
import { Mail, Phone, MapPin, Linkedin, Facebook, Instagram } from "lucide-react";

export default function Footer() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const footerElement = document.getElementById('footer');
    if (footerElement) {
      observer.observe(footerElement);
    }

    return () => observer.disconnect();
  }, []);

  const currentYear = new Date().getFullYear();

  const navLinks = [
    { href: "#about", label: "About" },
    { href: "#services", label: "Services" },
    { href: "#work", label: "Work" },
    { href: "#testimonials", label: "Testimonials" },
    { href: "#contact", label: "Contact" }
  ];

  const socialLinks = [
    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn", hoverColor: "hover:text-blue-400" },
    { icon: Facebook, href: "https://facebook.com", label: "Facebook", hoverColor: "hover:text-blue-500" },
    { icon: Instagram, href: "https://instagram.com", label: "Instagram", hoverColor: "hover:text-pink-400" }
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer 
      id="footer"
      className={`relative bg-black/20 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      {/* Main Footer Content */}
      <div className="glass-no-shine border-t border-accent/20 backdrop-blur-xl">
        <div className="mx-auto w-full max-w-7xl px-6 md:px-10 pt-8 pb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            
            {/* Column 1: Brand */}
            <div className="space-y-4">
              <div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-accent to-accent-2 bg-clip-text text-transparent">
                  MeridianDigital
                </h3>
                <p className="mt-2 text-sm text-muted/80 leading-relaxed">
                  The Future of Local Digital Presence
                </p>
              </div>
              <p className="text-xs text-muted/60 leading-relaxed">
                Transforming local businesses into digital leaders through cutting-edge technology and proven marketing strategies.
              </p>
            </div>

            {/* Column 2: Navigation */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white">Navigation</h4>
              <nav>
                <ul className="space-y-3">
                  {navLinks.map((link) => (
                    <li key={link.href}>
                      <button
                        onClick={() => scrollToSection(link.href)}
                        className="footer-link text-sm text-muted hover:text-accent transition-all duration-300 relative group"
                      >
                        {link.label}
                        <span className="absolute bottom-0 left-0 w-0 h-px bg-gradient-to-r from-accent to-accent-2 transition-all duration-300 group-hover:w-full"></span>
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            {/* Column 3: Contact Info */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white">Contact</h4>
              <div className="space-y-3">
                <a 
                  href="mailto:hello@meridiandigital.com"
                  className="footer-contact-item flex items-center gap-3 text-sm text-muted hover:text-accent transition-all duration-300 group"
                >
                  <Mail className="size-4 text-accent/60 group-hover:text-accent transition-colors duration-300" />
                  <span>hello@meridiandigital.com</span>
                </a>
                <a 
                  href="tel:+1234567890"
                  className="footer-contact-item flex items-center gap-3 text-sm text-muted hover:text-accent transition-all duration-300 group"
                >
                  <Phone className="size-4 text-accent/60 group-hover:text-accent transition-colors duration-300" />
                  <span>(123) 456-7890</span>
                </a>
                <div className="flex items-center gap-3 text-sm text-muted/60">
                  <MapPin className="size-4 text-accent/40" />
                  <span>Available Nationwide</span>
                </div>
              </div>
            </div>

            {/* Column 4: Social Media */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white">Connect</h4>
              <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className={`footer-social-link p-3 rounded-xl bg-white/5 border border-white/10 text-muted/60 hover:text-white ${social.hoverColor} hover:border-accent/30 hover:bg-white/10 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-accent/20`}
                  >
                    <social.icon className="size-5" />
                  </a>
                ))}
              </div>
              <p className="text-xs text-muted/60">
                Follow us for insights and updates
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-accent/10">
          <div className="mx-auto w-full max-w-7xl px-6 md:px-10 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-muted/60">
                © {currentYear} MeridianDigital. All Rights Reserved.
              </p>
              <div className="flex gap-6">
                <button 
                  className="text-sm text-muted/60 hover:text-accent transition-colors duration-300"
                  onClick={() => {/* Add Privacy Policy handler */}}
                >
                  Privacy Policy
                </button>
                <button 
                  className="text-sm text-muted/60 hover:text-accent transition-colors duration-300"
                  onClick={() => {/* Add Terms handler */}}
                >
                  Terms of Service
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle glow effect at top */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent"></div>
    </footer>
  );
}
