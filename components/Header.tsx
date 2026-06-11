"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Menu, X, CalendarCheck } from "lucide-react";
import { usePathname } from "next/navigation";
import BookingModal from "./BookingModal";

const services = [
  { label: "Sofa Dry Cleaning", href: "/sofa-dry-cleaning-delhi" },
  { label: "Carpet Dry Cleaning", href: "/#services" },
  { label: "Chair Dry Cleaning", href: "/#services" },
  { label: "Upholstery Dry Cleaning", href: "/#services" },
  { label: "Mattress Dry Cleaning", href: "/#services" },
  { label: "Curtain Dry Cleaning", href: "/#services" },
];

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Gallery", href: "/#gallery" },
  { label: "Blog", href: "/#blog" },
  { label: "Contact Us", href: "/contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  function handleBookNow() {
    setMobileOpen(false);
    if (pathname === "/") {
      document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
    } else {
      setBookingOpen(true);
    }
  }

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
    <>
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-ivory/97 backdrop-blur-md shadow-lg shadow-teal/8 border-b border-mist"
          : "bg-ivory border-b border-mist"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 lg:px-8 flex items-center justify-between h-16 md:h-18">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <div className="h-14 w-14 rounded-full overflow-hidden shrink-0">
            <Image
              src="/img/Logo/DryCleanLogo-transparent.png"
              alt="DryClean Masters"
              width={64}
              height={64}
              className="h-full w-full object-cover"
              priority
            />
          </div>
          <div className="leading-tight">
            <span className="font-serif font-bold text-teal-deep text-base tracking-tight block">
              DryClean
            </span>
            <span className="text-copper text-[10px] font-sans uppercase tracking-[0.18em] block -mt-0.5 font-semibold">
              Masters
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.slice(0, 2).map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="px-3.5 py-2 text-sm text-charcoal/75 hover:text-teal font-sans hover-underline transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}

          {/* Services Dropdown */}
          <div ref={dropdownRef} className="relative">
            <button
              onClick={() => setServicesOpen((v) => !v)}
              className="flex items-center gap-1 px-3.5 py-2 text-sm text-charcoal/75 hover:text-teal font-sans hover-underline transition-colors duration-200"
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
                  className="absolute top-full left-0 mt-1.5 w-64 bg-ivory border border-mist rounded-xl shadow-xl shadow-teal/10 overflow-hidden"
                >
                  <div className="py-1.5">
                    {services.map((s, i) => (
                      <Link
                        key={i}
                        href={s.href}
                        onClick={() => setServicesOpen(false)}
                        className="block px-5 py-2.5 text-sm text-charcoal/75 hover:text-teal hover:bg-teal/5 transition-colors duration-150 border-b border-mist last:border-0"
                      >
                        {s.label}
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {navLinks.slice(2).map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="px-3.5 py-2 text-sm text-charcoal/75 hover:text-teal font-sans hover-underline transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <button
          onClick={handleBookNow}
          className="hidden lg:flex items-center gap-2 btn-primary font-sans text-sm px-5 py-2.5 group"
        >
          <CalendarCheck size={14} className="group-hover:scale-110 transition-transform duration-200" />
          Book Now
        </button>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen((v) => !v)}
          className="lg:hidden p-2 text-teal-deep"
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
            className="lg:hidden overflow-hidden border-t border-mist bg-ivory"
          >
            <nav className="px-4 py-4 flex flex-col gap-0">
              {navLinks.slice(0, 2).map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="py-3 text-sm text-charcoal border-b border-mist hover:text-teal transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ))}

              {/* Mobile Services Accordion */}
              <div className="border-b border-mist">
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
                          <Link
                            key={i}
                            href={s.href}
                            onClick={() => setMobileOpen(false)}
                            className="py-2 text-sm text-charcoal/70 hover:text-teal border-b border-mist last:border-0 transition-colors duration-200"
                          >
                            {s.label}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {navLinks.slice(2).map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="py-3 text-sm text-charcoal border-b border-mist hover:text-teal last:border-0 transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ))}

              <div className="pt-4 pb-2">
                <button
                  onClick={handleBookNow}
                  className="flex items-center justify-center gap-2 w-full btn-primary font-sans text-sm px-5 py-3.5"
                >
                  <CalendarCheck size={14} />
                  Book Now
                </button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>

    <BookingModal open={bookingOpen} onClose={() => setBookingOpen(false)} />
    </>
  );
}
