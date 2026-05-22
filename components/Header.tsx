"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Menu, X, CalendarCheck } from "lucide-react";

const WA_SCHEDULE =
  "https://wa.me/918882625522?text=Hi%2C%20I%20want%20to%20schedule%20a%20pickup%20for%20cleaning%20service";

const services = [
  { label: "Sofa Dry Cleaning", href: "#services" },
  { label: "Carpet Dry Cleaning", href: "#services" },
  { label: "Chair Dry Cleaning", href: "#services" },
  { label: "Upholstery Dry Cleaning", href: "#services" },
  { label: "Mattress Dry Cleaning", href: "#services" },
  { label: "Curtain Dry Cleaning", href: "#services" },
  { label: "Car Dry Cleaning", href: "#services" },
  { label: "Wet Cleaning Services", href: "#services" },
  { label: "Commercial Cleaning", href: "#services" },
  { label: "Steam Sanitization", href: "#services" },
  { label: "Stain & Odor Removal", href: "#services" },
];

const navLinks = [
  { label: "Home", href: "#" },
  { label: "About Us", href: "#about" },
  { label: "Gallery", href: "#gallery" },
  { label: "Blog", href: "#blog" },
  { label: "Contact Us", href: "#contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-pearl/95 backdrop-blur-md shadow-sm border-b border-stone/60"
          : "bg-pearl border-b border-stone/40"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 lg:px-8 flex items-center justify-between h-16 md:h-18">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 shrink-0">
          <div className="w-8 h-8 rounded-sm bg-midnight flex items-center justify-center">
            <span className="text-gold font-serif font-bold text-sm leading-none">D</span>
          </div>
          <div className="leading-tight">
            <span className="font-serif font-bold text-midnight text-base tracking-tight block">
              Dry Clean
            </span>
            <span className="text-gold text-[10px] font-sans uppercase tracking-[0.18em] block -mt-0.5">
              Master
            </span>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.slice(0, 2).map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="px-3.5 py-2 text-sm text-charcoal/80 hover:text-midnight font-sans hover-underline transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}

          {/* Services Dropdown */}
          <div ref={dropdownRef} className="relative">
            <button
              onClick={() => setServicesOpen((v) => !v)}
              className="flex items-center gap-1 px-3.5 py-2 text-sm text-charcoal/80 hover:text-midnight font-sans hover-underline transition-colors duration-200"
            >
              Services
              <ChevronDown
                size={13}
                className={`transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`}
              />
            </button>

            <AnimatePresence>
              {servicesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.97 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  className="absolute top-full left-0 mt-1.5 w-64 bg-pearl border border-stone rounded-sm shadow-xl overflow-hidden"
                >
                  <div className="py-1.5">
                    {services.map((s, i) => (
                      <a
                        key={i}
                        href={s.href}
                        onClick={() => setServicesOpen(false)}
                        className="block px-5 py-2.5 text-sm text-charcoal/80 hover:text-midnight hover:bg-stone/40 transition-colors duration-150 border-b border-stone/30 last:border-0"
                      >
                        {s.label}
                      </a>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {navLinks.slice(2).map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="px-3.5 py-2 text-sm text-charcoal/80 hover:text-midnight font-sans hover-underline transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <a
          href={WA_SCHEDULE}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden lg:flex items-center gap-2 bg-midnight text-cream font-sans font-semibold text-sm px-5 py-2.5 rounded-sm hover:bg-navy transition-all duration-200 group"
        >
          <CalendarCheck size={14} className="group-hover:scale-110 transition-transform duration-200" />
          Schedule Pickup
        </a>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen((v) => !v)}
          className="lg:hidden p-2 text-charcoal"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="lg:hidden overflow-hidden border-t border-stone/50 bg-pearl"
          >
            <nav className="px-4 py-4 flex flex-col gap-0">
              {navLinks.slice(0, 2).map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="py-3 text-sm text-charcoal border-b border-stone/40 hover:text-midnight"
                >
                  {link.label}
                </a>
              ))}

              {/* Mobile Services Accordion */}
              <div className="border-b border-stone/40">
                <button
                  onClick={() => setMobileServicesOpen((v) => !v)}
                  className="w-full flex items-center justify-between py-3 text-sm text-charcoal"
                >
                  Services
                  <ChevronDown
                    size={13}
                    className={`transition-transform duration-200 ${mobileServicesOpen ? "rotate-180" : ""}`}
                  />
                </button>
                <AnimatePresence>
                  {mobileServicesOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="pb-2 pl-4 flex flex-col gap-0">
                        {services.map((s, i) => (
                          <a
                            key={i}
                            href={s.href}
                            onClick={() => setMobileOpen(false)}
                            className="py-2 text-sm text-charcoal/70 hover:text-midnight border-b border-stone/20 last:border-0"
                          >
                            {s.label}
                          </a>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {navLinks.slice(2).map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="py-3 text-sm text-charcoal border-b border-stone/40 hover:text-midnight last:border-0"
                >
                  {link.label}
                </a>
              ))}

              <div className="pt-4 pb-2">
                <a
                  href={WA_SCHEDULE}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 w-full bg-midnight text-cream font-semibold text-sm px-5 py-3 rounded-sm"
                >
                  <CalendarCheck size={14} />
                  Schedule Pickup
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
