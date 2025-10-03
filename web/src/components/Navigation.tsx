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
    { href: "#about", label: "About" },
    { href: "#services", label: "Services" },
    { href: "#contact", label: "Contact" },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  return (
                   <nav
        className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-500 ease-out font-nav ${
          isMobileMenuOpen
            ? "h-20 bg-background border-b border-black"
            : isScrolled
            ? "h-16 bg-background/90 backdrop-blur-sm border-b border-white/10 shadow-lg shadow-accent/10"
            : "h-20 bg-background border-b border-black"
        }`}
      >
      <div className="mx-auto max-w-screen-2xl px-6 md:px-10 h-full">
        <div className="flex items-center justify-between h-full">
          {/* Logo/Brand */}
          <div className="flex items-center">
                                                 {isHomePage ? (
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 <button
                       onClick={() => scrollToSection("#top")}
                       className="hover:scale-105 transition-transform duration-300 cursor-pointer"
                     >
                                              <Image
                          src="/MeridianSolutionsLogoOneLine.png"
                          alt="MeridianSolutions"
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
                         src="/MeridianSolutionsLogoOneLine.png"
                         alt="MeridianSolutions"
                         width={550}
                         height={138}
                         className="max-h-20 md:max-h-28 w-auto -mt-1 -ml-2 md:-ml-8"
                         priority
                       />
                     </Link>
            )}
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
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
               className="btn-primary px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-accent/30 cursor-pointer"
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

      {/* Mobile Menu - Below Taskbar */}
      <div
        className={`lg:hidden fixed left-0 right-0 z-30 ${
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        style={{ 
          top: '80px',
          height: 'calc(100vh - 80px)',
          minHeight: 'calc(100vh - 80px)'
        }}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-md" />
        
        {/* Menu Content */}
        <div className="relative h-full flex flex-col items-center justify-start z-40" style={{ minHeight: 'calc(100vh - 80px)', paddingBottom: 'calc(env(safe-area-inset-bottom) + 120px)' }}>
          {/* Navigation Links and Get Started - distributed to fill vertical space */}
          <div className="flex flex-col items-center justify-between w-full gap-3" style={{ marginTop: '20vh', minHeight: '55vh' }}>
            {navLinks.map((link, index) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className={`group relative text-3xl font-medium text-white hover:text-accent transition-all duration-500 cursor-pointer transform ${
                  isMobileMenuOpen 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-8'
                }`}
                style={{ 
                  animationDelay: `${index * 0.15}s`,
                  transitionDelay: `${index * 0.15}s`
                }}
              >
                <span className="relative z-10">{link.label}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-accent/10 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300" />
              </button>
            ))}
            
            {/* Get Started Button - Same Text Size, Equal Spacing with Animation */}
            <button
              onClick={() => scrollToSection("#contact-form")}
              className={`btn-primary px-9 py-3 rounded-full text-3xl font-medium transition-all duration-500 hover:scale-105 hover:shadow-lg hover:shadow-accent/30 cursor-pointer transform ${
                isMobileMenuOpen 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
              }`}
              style={{ 
                transitionDelay: `${navLinks.length * 0.15 + 0.1}s`
              }}
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
