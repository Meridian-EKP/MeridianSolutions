"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
      // Close mobile menu when scrolling
      setIsMobileMenuOpen(false);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#about", label: "Why Meridian" },
    { href: "#services", label: "Services" },
    { href: "#team", label: "About Me" },
    { href: "#contact", label: "Contact" },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href) as HTMLElement | null;
    if (!element) return;

    // Adjust scroll position for mobile to avoid header overlap (especially for Services)
    const isMobileViewport = typeof window !== 'undefined' && window.innerWidth < 1024; // Tailwind lg breakpoint
    const needsServicesOffset = href === "#services" && isMobileViewport;
    const needsContactFormOffset = href === "#contact-form" && isMobileViewport;
    if (needsServicesOffset) {
      const rect = element.getBoundingClientRect();
      const absoluteTop = rect.top + window.pageYOffset;
      const offset = -48; // mid-point offset for ideal title visibility
      window.scrollTo({ top: absoluteTop + offset, behavior: 'smooth' });
    } else if (needsContactFormOffset) {
      const rect = element.getBoundingClientRect();
      const absoluteTop = rect.top + window.pageYOffset;
      const offset = -32; // slight lift so CTA isn't too close to task bar
      window.scrollTo({ top: absoluteTop + offset, behavior: 'smooth' });
    } else {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    setIsMobileMenuOpen(false);
  };

  return (
                   <nav
        className={`fixed z-[60] font-nav ${
          isMobileMenuOpen
            ? isScrolled
              ? "top-0 left-0 right-0 md:top-0 md:left-0 md:right-0 h-20 md:rounded-none bg-white/5 md:bg-background backdrop-blur-xl md:backdrop-blur-sm border-b border-white/10 md:border-black transition-all duration-300 ease-out"
              : "top-0 left-0 right-0 h-20 bg-background border-b border-black transition-none"
            : isScrolled
            ? "top-4 left-4 right-4 md:top-0 md:left-0 md:right-0 h-16 rounded-2xl md:rounded-none bg-white/5 md:bg-background/90 backdrop-blur-xl md:backdrop-blur-sm border border-white/10 md:border-b md:border-white/10 shadow-lg md:shadow-lg md:shadow-accent/10 transition-all duration-500 ease-out"
            : "top-0 left-0 right-0 h-20 bg-background border-b border-black transition-all duration-500 ease-out"
        }`}
      >
      <div className={`mx-auto max-w-screen-2xl h-full transition-all duration-500 ease-out ${
        isScrolled && !isMobileMenuOpen ? "px-6 md:px-10" : "px-6 md:px-10"
      }`}>
        <div className="flex items-center justify-between h-full">
          {/* Logo/Brand */}
          <div className="flex items-center">
                                                 {isHomePage ? (
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 <button
                       onClick={() => scrollToSection("#top")}
                       className="hover:scale-105 transition-transform duration-300 cursor-pointer"
                     >
                                              <Image
                          src="/MeridianLabsLogoOneLine.png"
                          alt="The Meridian Agency"
                          width={550}
                          height={138}
                          className="max-h-20 md:max-h-28 w-auto -mt-1 -ml-2 md:-ml-8"
                          priority
                        />
                    </button>
             ) : (
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  <Link
                        href="/"
                        className="hover:scale-105 transition-transform duration-300 cursor-pointer"
                      >
                       <Image
                         src="/MeridianLabsLogoOneLine.png"
                         alt="The Meridian Agency"
                         width={550}
                         height={138}
                         className="max-h-20 md:max-h-28 w-auto -mt-1 -ml-2 md:-ml-8"
                         priority
                       />
                     </Link>
            )}
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-4">
            {navLinks.map((link) => (
                             <button
                 key={link.href}
                 onClick={() => scrollToSection(link.href)}
                                   className={`nav-link relative transition-all duration-300 text-sm font-medium cursor-pointer ${
                    isScrolled 
                      ? "text-muted hover:text-accent" 
                      : "text-white hover:text-accent"
                  }`}
               >
                {link.label}
                <span className="nav-link-glow absolute inset-0 rounded-lg opacity-0 transition-opacity duration-300" />
              </button>
            ))}
            
            {/* CTA Button */}
            <button
              onClick={() => scrollToSection("#contact-form")}
              className="btn-gradient-animated px-6 py-2 text-sm font-medium"
            >
              Get Started
            </button>
          </div>

          {/* Mobile Menu Button - Morphs into X */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg glass glass-no-shine-mobile border border-black hover:border-accent/30 transition-all duration-300"
            aria-label={isMobileMenuOpen ? "Close mobile menu" : "Open mobile menu"}
          >
            <div className="relative w-5 h-5">
              <Menu 
                className={`absolute inset-0 size-5 text-accent transition-all duration-300 ${
                  isMobileMenuOpen ? "opacity-0 rotate-90" : "opacity-100 rotate-0"
                }`} 
              />
              <X 
                className={`absolute inset-0 size-5 text-accent transition-all duration-300 ${
                  isMobileMenuOpen ? "opacity-100 rotate-0" : "opacity-0 -rotate-90"
                }`} 
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu - Compact Top Third Design */}
      <div
        className={`lg:hidden fixed left-0 right-0 z-30 ${
          isMobileMenuOpen
            ? "block"
            : "hidden"
        }`}
        style={{ 
          top: '80px',
          maxHeight: '33vh',
        }}
      >
        {/* Menu Container */}
        <div className="bg-background border-b border-black rounded-b-2xl overflow-hidden">
          <div className="flex flex-col">
            {navLinks.map((link, index) => (
              <div key={link.href}>
                <button
                  onClick={() => scrollToSection(link.href)}
                  className="w-full text-left px-6 py-4 text-base font-medium text-white hover:text-accent transition-colors duration-200 flex items-center"
                >
                  <span>{link.label}</span>
                </button>
                {index < navLinks.length - 1 && (
                  <div className="h-px bg-gradient-to-r from-white/10 to-transparent mx-6" />
                )}
              </div>
            ))}
            
            {/* Get Started Button */}
            <div className="px-6 py-4 border-t border-white/10">
              <button
                onClick={() => scrollToSection("#contact-form")}
                className="w-full btn-gradient-animated px-4 py-2.5 text-sm font-medium rounded-lg"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
