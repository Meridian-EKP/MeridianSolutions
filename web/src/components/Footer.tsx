"use client";

import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function Footer() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  const navLinks = [
    { href: "#about", label: "Why Meridian" },
    { href: "#services", label: "Services" },
    { href: "#team", label: "About Me" },
    { href: "#contact", label: "Contact" },
    { href: "#contact-form", label: "Digital Health Check" }
  ];



  const scrollToSection = (href: string) => {
    const element = document.querySelector(href) as HTMLElement | null;
    if (!element) return;

    const isMobileViewport = typeof window !== 'undefined' && window.innerWidth < 1024; // Tailwind lg breakpoint
    const isServices = href === '#services';
    const isContactForm = href === '#contact-form';

    if (isMobileViewport && (isServices || isContactForm)) {
      const rect = element.getBoundingClientRect();
      const absoluteTop = rect.top + window.pageYOffset;
      const offset = isServices ? -48 : -32; // mirror Navigation.tsx offsets
      window.scrollTo({ top: absoluteTop + offset, behavior: 'smooth' });
    } else {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <footer 
      id="footer"
      className="relative bg-black/20"
    >
      {/* Main Footer Content */}
             <div className="glass-no-shine border-t border-white/10 backdrop-blur-xl">
                                   <div className="mx-auto w-full max-w-screen-2xl px-6 md:px-10 pt-2 pb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-4">
              
                           {/* Column 1: Brand */}
               <div className="space-y-1">
                                <div>
                                     {isHomePage ? (
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                <button
                             onClick={() => {
                               const element = document.querySelector("#top");
                               if (element) {
                                 element.scrollIntoView({ behavior: "smooth" });
                               }
                             }}
                             className="hover:scale-105 transition-transform duration-300 cursor-pointer"
                           >
                              <Image
                                src="/MeridianLabsLogoOneLine.png"
                                alt="The Meridian Agency"
                                width={1300}
                                height={325}
                                className="h-20 md:h-40 w-auto max-w-full -ml-4 object-contain"
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
                                width={1300}
                                height={325}
                                className="h-20 md:h-40 w-auto max-w-full -ml-4 object-contain"
                                priority
                              />
                            </Link>
                  )}
                                                                                                                                       <p className="mt-0 text-sm text-muted leading-relaxed">
                     The Future of Local Digital Presence
                   </p>
                 </div>
                 <p className="text-xs text-muted leading-relaxed mt-0">
                   Transforming local businesses into digital leaders through modern technology and proven marketing strategies.
                 </p>
            </div>

                                                   {/* Mobile: Navigation and Contact side by side */}
                                                   <div className="md:hidden grid grid-cols-2 gap-6">
                                                     {/* Column 2: Navigation */}
                                                     <div className="space-y-2">
                                                       <h4 className="text-lg font-semibold text-white">Navigation</h4>
                                                       <nav>
                                                         <ul className="space-y-3">
                                                           {navLinks.map((link) => (
                                                             <li key={link.href}>
                                                               <button
                                                                 onClick={() => scrollToSection(link.href)}
                                                                 className="footer-link text-sm text-muted hover:text-accent transition-all duration-300 relative group cursor-pointer"
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
                                                     <div className="space-y-2">
                                                       <h4 className="text-lg font-semibold text-white">Contact</h4>
                                                       <div className="space-y-3">
                                                         <a 
                                                         href="mailto:Hello@TheMeridianAgency.xyz"
                                                           className="footer-contact-item text-sm text-muted hover:text-accent transition-all duration-300 group cursor-pointer block"
                                                         >
                                                           Hello@TheMeridianAgency.xyz
                                                         </a>
                                                         <a 
                                                           href="tel:+447541516344"
                                                           className="footer-contact-item text-sm text-muted hover:text-accent transition-all duration-300 group cursor-pointer block"
                                                         >
                                                           (+44) 7541 516 344
                                                         </a>
                                                       </div>
                                                     </div>
                                                   </div>

                                                   {/* Desktop: Navigation and Contact separate columns */}
                                                   <div className="hidden md:block space-y-2 lg:justify-self-end lg:text-right pt-8">
                                                     {/* Column 2: Navigation */}
                                                     <h4 className="text-lg font-semibold text-white">Navigation</h4>
                                                     <nav>
                                                       <ul className="space-y-3">
                                                         {navLinks.map((link) => (
                                                           <li key={link.href}>
                                                             <button
                                                               onClick={() => scrollToSection(link.href)}
                                                               className="footer-link text-sm text-muted hover:text-accent transition-all duration-300 relative group cursor-pointer"
                                                             >
                                                               {link.label}
                                                               <span className="absolute bottom-0 left-0 w-0 h-px bg-gradient-to-r from-accent to-accent-2 transition-all duration-300 group-hover:w-full"></span>
                                                             </button>
                                                           </li>
                                                         ))}
                                                       </ul>
                                                     </nav>
                                                   </div>

                                                   <div className="hidden md:block space-y-2 lg:justify-self-end lg:text-right pt-8">
                                                     {/* Column 3: Contact Info */}
                                                     <div className="space-y-2">
                                                       <h4 className="text-lg font-semibold text-white">Contact</h4>
                                                       <div className="space-y-3">
                                                         <a 
                                                           href="mailto:Hello@TheMeridianAgency.xyz"
                                                           className="footer-contact-item flex items-center gap-3 text-sm text-muted hover:text-accent transition-all duration-300 group cursor-pointer"
                                                         >
                                                           <Mail className="size-4 text-accent/60 group-hover:text-accent transition-colors duration-300" />
                                                           <span>Hello@TheMeridianAgency.xyz</span>
                                                         </a>
                                                         <a 
                                                           href="tel:+447541516344"
                                                           className="footer-contact-item flex items-center gap-3 text-sm text-muted hover:text-accent transition-all duration-300 group cursor-pointer"
                                                         >
                                                           <Phone className="size-4 text-accent/60 group-hover:text-accent transition-colors duration-300" />
                                                           <span>(+44) 7541 516 344</span>
                                                         </a>
                                                       </div>
                                                     </div>
                                                   </div>
          </div>
        </div>

        {/* Bottom Bar */}
                 <div className="border-t border-white/10">
          <div className="mx-auto w-full max-w-screen-2xl px-6 md:px-10 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                             <p className="text-sm text-muted">
                © 2025-2026 The Meridian Agency. All Rights Reserved.
               </p>
                             <div className="flex gap-6">
                 <Link 
                   href="/privacy-policy"
                   className="text-sm text-muted hover:text-accent transition-colors duration-300 cursor-pointer"
                 >
                   Privacy Policy
                 </Link>
                 <Link 
                   href="/terms-of-service"
                   className="text-sm text-muted hover:text-accent transition-colors duration-300 cursor-pointer"
                 >
                   Terms of Service
                 </Link>
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
