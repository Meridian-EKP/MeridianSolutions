"use client";

import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Footer() {

  const currentYear = new Date().getFullYear();
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  const navLinks = [
    { href: "#about", label: "About" },
    { href: "#services", label: "Services" },
    { href: "#work", label: "Work" },
    { href: "#testimonials", label: "Testimonials" },
    { href: "#contact", label: "Contact" }
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
      className="relative bg-black/20"
    >
      {/* Main Footer Content */}
      <div className="glass-no-shine border-t border-accent/20 backdrop-blur-xl">
        <div className="mx-auto w-full max-w-screen-2xl px-6 md:px-10 pt-8 pb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-24">
            
                         {/* Column 1: Brand */}
             <div className="space-y-4">
               <div>
                 {isHomePage ? (
                   <button
                     onClick={() => {
                       const element = document.querySelector("#top");
                       if (element) {
                         element.scrollIntoView({ behavior: "smooth" });
                       }
                     }}
                     className="text-2xl font-bold bg-gradient-to-r from-accent to-accent-2 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300 cursor-pointer"
                   >
                     MeridianSolutions
                   </button>
                 ) : (
                   <Link
                     href="/"
                     className="text-2xl font-bold bg-gradient-to-r from-accent to-accent-2 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300 cursor-pointer"
                   >
                     MeridianSolutions
                   </Link>
                 )}
                <p className="mt-2 text-sm text-muted/80 leading-relaxed">
                  The Future of Local Digital Presence
                </p>
              </div>
              <p className="text-xs text-muted/60 leading-relaxed">
                Transforming local businesses into digital leaders through cutting-edge technology and proven marketing strategies.
              </p>
            </div>

            {/* Column 2: Navigation */}
            <div className="space-y-4 lg:justify-self-end lg:text-right">
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
            <div className="space-y-4 lg:justify-self-end lg:text-right">
              <h4 className="text-lg font-semibold text-white">Contact</h4>
              <div className="space-y-3">
                <a 
                  href="mailto:edkemppotter@gmail.com"
                  className="footer-contact-item flex items-center gap-3 text-sm text-muted hover:text-accent transition-all duration-300 group"
                >
                  <Mail className="size-4 text-accent/60 group-hover:text-accent transition-colors duration-300" />
                  <span>edkemppotter@gmail.com</span>
                </a>
                <a 
                  href="tel:+447541516344"
                  className="footer-contact-item flex items-center gap-3 text-sm text-muted hover:text-accent transition-all duration-300 group"
                >
                  <Phone className="size-4 text-accent/60 group-hover:text-accent transition-colors duration-300" />
                  <span>(+44) 7541 516 344</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-accent/10">
          <div className="mx-auto w-full max-w-screen-2xl px-6 md:px-10 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-muted/60">
                © {currentYear} MeridianSolutions. All Rights Reserved.
              </p>
                             <div className="flex gap-6">
                 <Link 
                   href="/privacy-policy"
                   className="text-sm text-muted/60 hover:text-accent transition-colors duration-300"
                 >
                   Privacy Policy
                 </Link>
                 <Link 
                   href="/terms-of-service"
                   className="text-sm text-muted/60 hover:text-accent transition-colors duration-300"
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
