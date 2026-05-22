"use client";

import { Phone, Mail, MessageCircle, MapPin, ArrowRight } from "lucide-react";

const WA_LINK =
  "https://wa.me/918882625522?text=Hi%2C%20I%20want%20to%20enquire%20about%20dry%20cleaning%20services";

const quickLinks = [
  { label: "Home", href: "#" },
  { label: "About Us", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Pricing", href: "#pricing" },
  { label: "Gallery", href: "#gallery" },
  { label: "Blog", href: "#blog" },
  { label: "Contact Us", href: "#contact" },
  { label: "Privacy Policy", href: "#privacy" },
  { label: "Terms of Service", href: "#terms" },
];

const services = [
  "Sofa Dry Cleaning",
  "Carpet Dry Cleaning",
  "Mattress Dry Cleaning",
  "Curtain Dry Cleaning",
  "Car Dry Cleaning",
  "Wet Cleaning Services",
  "Commercial Cleaning",
  "Steam Sanitization",
  "Stain & Odor Removal",
];

export default function Footer() {
  return (
    <footer id="contact" className="bg-midnight fabric-texture">
      {/* Top CTA bar */}
      <div className="border-b border-stone/10">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <p className="font-sans text-stone/50 text-xs uppercase tracking-[0.2em] mb-1">
              Ready for a Master Clean?
            </p>
            <h3 className="font-serif text-cream text-2xl md:text-3xl font-semibold">
              Book a Free Inspection Today
            </h3>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="#contact"
              className="flex items-center gap-2 bg-gold text-midnight font-sans font-semibold text-sm px-6 py-3 rounded-sm hover:bg-gold-light transition-colors duration-200"
            >
              Book Free Visit
              <ArrowRight size={14} />
            </a>
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 border border-stone/20 text-stone/70 font-sans font-medium text-sm px-6 py-3 rounded-sm hover:border-gold/40 hover:text-gold transition-all duration-200"
            >
              <MessageCircle size={14} />
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Main footer grid */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 py-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Col 1: Brand */}
        <div className="lg:col-span-1">
          {/* Logo */}
          <div className="flex items-center gap-2.5 mb-5">
            <div className="w-8 h-8 rounded-sm bg-navy border border-gold/20 flex items-center justify-center">
              <span className="text-gold font-serif font-bold text-sm">D</span>
            </div>
            <div className="leading-tight">
              <span className="font-serif font-bold text-cream text-base block">
                Dry Clean
              </span>
              <span className="text-gold text-[10px] font-sans uppercase tracking-[0.18em] block -mt-0.5">
                Master
              </span>
            </div>
          </div>

          <p className="font-sans text-stone/50 text-sm leading-relaxed mb-6 max-w-[220px]">
            Delhi&apos;s elite choice for automated on-site sofa, carpet, and premium
            upholstery deep restoration services.
          </p>

          <div className="flex items-center gap-1.5 text-stone/40 text-xs font-sans mb-2">
            <MapPin size={11} />
            <span>Serving all of Delhi NCR</span>
          </div>
        </div>

        {/* Col 2: Quick Links */}
        <div>
          <h4 className="font-sans text-cream text-xs uppercase tracking-[0.18em] font-semibold mb-5">
            Quick Navigation
          </h4>
          <ul className="space-y-2.5">
            {quickLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="font-sans text-stone/50 text-sm hover:text-gold transition-colors duration-200 flex items-center gap-1.5 group"
                >
                  <span className="w-2 h-px bg-stone/30 group-hover:bg-gold group-hover:w-3 transition-all duration-200 shrink-0" />
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3: Services */}
        <div>
          <h4 className="font-sans text-cream text-xs uppercase tracking-[0.18em] font-semibold mb-5">
            Our Services
          </h4>
          <ul className="space-y-2.5">
            {services.map((s) => (
              <li key={s}>
                <a
                  href="#services"
                  className="font-sans text-stone/50 text-sm hover:text-gold transition-colors duration-200 flex items-center gap-1.5 group"
                >
                  <span className="w-2 h-px bg-stone/30 group-hover:bg-gold group-hover:w-3 transition-all duration-200 shrink-0" />
                  {s}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 4: Contact */}
        <div>
          <h4 className="font-sans text-cream text-xs uppercase tracking-[0.18em] font-semibold mb-5">
            Direct Support
          </h4>
          <div className="space-y-4">
            <a
              href="tel:+918882625522"
              className="flex items-start gap-3 group"
            >
              <div className="mt-0.5 w-7 h-7 border border-stone/15 flex items-center justify-center group-hover:border-gold/30 transition-colors duration-200 shrink-0">
                <Phone size={12} className="text-stone/40 group-hover:text-gold transition-colors duration-200" />
              </div>
              <div>
                <p className="font-sans text-stone/40 text-[11px] uppercase tracking-[0.12em]">
                  Call Us
                </p>
                <p className="font-sans text-cream/80 text-sm group-hover:text-gold transition-colors duration-200">
                  +91 8882625522
                </p>
              </div>
            </a>

            <a
              href="mailto:Info@drycleanmaster.in"
              className="flex items-start gap-3 group"
            >
              <div className="mt-0.5 w-7 h-7 border border-stone/15 flex items-center justify-center group-hover:border-gold/30 transition-colors duration-200 shrink-0">
                <Mail size={12} className="text-stone/40 group-hover:text-gold transition-colors duration-200" />
              </div>
              <div>
                <p className="font-sans text-stone/40 text-[11px] uppercase tracking-[0.12em]">
                  Email
                </p>
                <p className="font-sans text-cream/80 text-sm group-hover:text-gold transition-colors duration-200">
                  Info@drycleanmaster.in
                </p>
              </div>
            </a>

            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3 group"
            >
              <div className="mt-0.5 w-7 h-7 border border-stone/15 flex items-center justify-center group-hover:border-gold/30 transition-colors duration-200 shrink-0">
                <MessageCircle size={12} className="text-stone/40 group-hover:text-gold transition-colors duration-200" />
              </div>
              <div>
                <p className="font-sans text-stone/40 text-[11px] uppercase tracking-[0.12em]">
                  WhatsApp
                </p>
                <p className="font-sans text-cream/80 text-sm group-hover:text-gold transition-colors duration-200">
                  Chat with Us Now
                </p>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-stone/10">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-sans text-stone/35 text-xs">
            © 2026 Dry Clean Master. All Rights Reserved.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="#privacy"
              className="font-sans text-stone/35 text-xs hover:text-stone/70 transition-colors duration-200"
            >
              Privacy Policy
            </a>
            <span className="text-stone/20">·</span>
            <a
              href="#terms"
              className="font-sans text-stone/35 text-xs hover:text-stone/70 transition-colors duration-200"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
