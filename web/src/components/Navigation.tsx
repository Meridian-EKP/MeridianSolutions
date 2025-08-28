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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out font-nav ${
        isScrolled
          ? "h-16 navbar-glass-force shadow-lg shadow-accent/10"
          : "h-20 navbar-opaque"
      }`}
      style={
        isScrolled
          ? {
              background: 'rgba(7, 10, 15, 0.85)',
              backdropFilter: 'blur(20px) saturate(180%)',
              WebkitBackdropFilter: 'blur(20px) saturate(180%)',
              MozBackdropFilter: 'blur(20px) saturate(180%)',
              borderBottom: '1px solid rgba(154, 164, 178, 0.3)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
              transform: 'translateZ(0)',
              willChange: 'backdrop-filter',
              WebkitTransform: 'translateZ(0)',
              MozTransform: 'translateZ(0)',
              WebkitPerspective: '1000px',
              MozPerspective: '1000px',
              perspective: '1000px',
              WebkitBackfaceVisibility: 'hidden',
              MozBackfaceVisibility: 'hidden',
              backfaceVisibility: 'hidden',
              WebkitTransform3d: 'translateZ(0)',
              MozTransform3d: 'translateZ(0)',
              transform3d: 'translateZ(0)',
            }
          : {}
      }
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
                      src="/MeridianSolutionsLogo.png"
                      alt="MeridianSolutions"
                      width={550}
                      height={138}
                      className="h-28 md:h-36 w-auto mt-1"
                      priority
                    />
                  </button>
            ) : (
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               <Link
                     href="/"
                     className="hover:scale-105 transition-transform duration-300 cursor-pointer"
                   >
                    <Image
                      src="/MeridianSolutionsLogo.png"
                      alt="MeridianSolutions"
                      width={550}
                      height={138}
                      className="h-28 md:h-36 w-auto mt-1"
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

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg glass border border-black hover:border-accent/30 transition-colors"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <X className="size-5 text-accent" />
            ) : (
              <Menu className="size-5 text-accent" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden absolute top-full left-0 right-0 transition-all duration-300 ease-out ${
          isMobileMenuOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <div className="navbar-glass border-t border-black shadow-xl shadow-black/20">
          <div className="mx-auto max-w-screen-2xl px-6 py-6">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                                 <button
                   key={link.href}
                   onClick={() => scrollToSection(link.href)}
                   className={`text-left py-3 px-4 rounded-lg hover:text-accent hover:bg-white/5 transition-all duration-300 text-sm font-medium cursor-pointer ${
                     isScrolled 
                       ? "text-muted" 
                       : "text-white"
                   }`}
                 >
                  {link.label}
                </button>
              ))}
                             <button
                 onClick={() => scrollToSection("#contact-form")}
                 className="mt-4 btn-primary px-6 py-3 rounded-full font-medium transition-all duration-300 cursor-pointer"
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
