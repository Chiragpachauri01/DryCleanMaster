"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Phone, Mail, MessageCircle, MapPin, Star } from "lucide-react";

const WA_LINK =
  "https://wa.me/918882631413?text=Hi%2C%20I%20want%20to%20enquire%20about%20dry%20cleaning%20services";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/#services" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Gallery", href: "/#gallery" },
  { label: "Blog", href: "/#blog" },
  { label: "Web Stories", href: "/web-stories/" },
  { label: "Contact Us", href: "/contact" },
  { label: "Privacy Policy", href: "#privacy" },
  { label: "Terms of Service", href: "#terms" },
];

const services = [
  { label: "Home Deep Cleaning", href: "/home-deep-cleaning-services-delhi" },
  { label: "Sofa Dry Cleaning", href: "/sofa-dry-cleaning-delhi" },
  { label: "Carpet Cleaning", href: "/carpet-cleaning-services-delhi" },
  { label: "Chair Dry Cleaning", href: "/office-chair-cleaning-delhi" },
  { label: "Office Cleaning", href: "/office-cleaning-services-delhi" },
  { label: "Mattress Dry Cleaning", href: "/mattress-cleaning-services-delhi" },
];

export default function Footer() {
  const [rating, setRating] = useState(4.9);
  const [reviewCount, setReviewCount] = useState(400);

  useEffect(() => {
    let isMounted = true;

    fetch("/api/google-reviews")
      .then((res) => res.json())
      .then((data: { ok: boolean; rating: number | null; userRatingCount: number | null }) => {
        if (!isMounted || !data.ok) return;
        if (data.rating) setRating(data.rating);
        if (data.userRatingCount) setReviewCount(data.userRatingCount);
      })
      .catch(() => {
        // Keep fallback rating/count when Google Places is unavailable.
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <footer id="contact" className="bg-teal-deep teal-texture">
      {/* Top CTA bar */}
      <div className="border-b border-teal/15">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={11} className="text-copper-light fill-copper-light" />
              ))}
              <span className="font-sans text-copper-light text-xs font-semibold ml-1">{rating.toFixed(1)}</span>
              <span className="font-sans text-stone-teal/40 text-xs">
                · {reviewCount.toLocaleString("en-IN")}+ Google Reviews
              </span>
            </div>
            <p className="font-sans text-stone-teal/50 text-xs uppercase tracking-[0.2em] mb-1">
              Ready for a Master Clean?
            </p>
            <h3 className="font-serif text-ivory-warm text-2xl md:text-3xl font-semibold">
              Book Professional Cleaning Services Today
            </h3>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="tel:+918882631413"
              className="flex items-center gap-2 btn-primary font-sans font-semibold text-sm px-6 py-3.5"
            >
              Call Now
              <Phone size={14} />
            </a>
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#16A34A] text-white font-sans font-medium text-sm px-6 py-3 rounded-lg hover:bg-[#15803D] transition-all duration-200 shadow-sm"
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
          <div className="flex items-center gap-3 mb-5">
            <div className="h-16 w-16 rounded-full overflow-hidden shrink-0">
              <Image
                src="/img/Logo/DryCleanLogo-transparent.png"
                alt="DryClean Masters"
                width={64}
                height={64}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="leading-tight">
              <span className="font-serif font-bold text-ivory-warm text-base block">
                Dry Clean
              </span>
              <span className="text-copper text-[10px] font-sans uppercase tracking-[0.18em] block -mt-0.5 font-semibold">
                Master
              </span>
            </div>
          </div>

          <p className="font-sans text-stone-teal/50 text-sm leading-relaxed mb-5 max-w-[220px]">
            Delhi&apos;s elite choice for automated on-site sofa, carpet, and premium
            upholstery deep restoration services.
          </p>

          {/* Trust mini-badges */}
          <div className="space-y-2 mb-5">
            <a
              href="https://maps.app.goo.gl/WWBookpmg5rhxuma6"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-stone-teal/40 text-xs font-sans hover:text-teal-light transition-colors duration-200"
            >
              <MapPin size={11} />
              <span>Serving all of Delhi NCR</span>
            </a>
            <div className="flex items-center gap-1.5 text-stone-teal/40 text-xs font-sans">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-light" />
              <span>12,000+ Families Trust Us</span>
            </div>
          </div>

          {/* Social media */}
          <div className="flex items-center gap-2">
            <a
              href="https://www.facebook.com/DryCleanMasters/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-lg border border-[#1877F2]/50 bg-[#1877F2]/15 flex items-center justify-center text-[#1877F2] hover:bg-[#1877F2]/28 hover:border-[#1877F2]/70 transition-all duration-200"
              aria-label="Facebook"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
            <a
              href="https://www.instagram.com/drycleanmasters/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-lg border border-[#E1306C]/50 bg-[#E1306C]/15 flex items-center justify-center text-[#E1306C] hover:bg-[#E1306C]/28 hover:border-[#E1306C]/70 transition-all duration-200"
              aria-label="Instagram"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
            </a>
          </div>
        </div>

        {/* Col 2: Quick Links */}
        <div>
          <h4 className="font-sans text-ivory-warm text-xs uppercase tracking-[0.18em] font-semibold mb-5">
            Quick Navigation
          </h4>
          <ul className="space-y-2.5">
            {quickLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="font-sans text-stone-teal/50 text-sm hover:text-teal-light transition-colors duration-200 flex items-center gap-1.5 group"
                >
                  <span className="w-2 h-px bg-stone-teal/30 group-hover:bg-teal-light group-hover:w-3 transition-all duration-200 shrink-0" />
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3: Services */}
        <div>
          <h4 className="font-sans text-ivory-warm text-xs uppercase tracking-[0.18em] font-semibold mb-5">
            Our Services
          </h4>
          <ul className="space-y-2.5">
            {services.map((s) => (
              <li key={s.label}>
                <Link
                  href={s.href}
                  className="font-sans text-stone-teal/50 text-sm hover:text-teal-light transition-colors duration-200 flex items-center gap-1.5 group"
                >
                  <span className="w-2 h-px bg-stone-teal/30 group-hover:bg-teal-light group-hover:w-3 transition-all duration-200 shrink-0" />
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 4: Contact */}
        <div>
          <h4 className="font-sans text-ivory-warm text-xs uppercase tracking-[0.18em] font-semibold mb-5">
            Direct Support
          </h4>
          <div className="space-y-4">
            <a
              href="tel:+918882631413"
              className="flex items-start gap-3 group"
            >
              <div className="mt-0.5 w-8 h-8 border border-teal/15 rounded-lg flex items-center justify-center group-hover:border-teal/40 group-hover:bg-teal/12 transition-all duration-200 shrink-0">
                <Phone size={12} className="text-stone-teal/40 group-hover:text-teal-light transition-colors duration-200" />
              </div>
              <div>
                <p className="font-sans text-stone-teal/40 text-[11px] uppercase tracking-[0.12em]">
                  Call Us
                </p>
                <p className="font-sans text-ivory-warm/80 text-sm group-hover:text-teal-glow transition-colors duration-200">
                  +91 8882631413
                </p>
              </div>
            </a>

            <a
              href="mailto:info@drycleanmasters.com"
              className="flex items-start gap-3 group"
            >
              <div className="mt-0.5 w-8 h-8 border border-teal/15 rounded-lg flex items-center justify-center group-hover:border-teal/40 group-hover:bg-teal/12 transition-all duration-200 shrink-0">
                <Mail size={12} className="text-stone-teal/40 group-hover:text-teal-light transition-colors duration-200" />
              </div>
              <div>
                <p className="font-sans text-stone-teal/40 text-[11px] uppercase tracking-[0.12em]">
                  Email
                </p>
                <p className="font-sans text-ivory-warm/80 text-sm group-hover:text-teal-glow transition-colors duration-200">
                  info@drycleanmasters.com
                </p>
              </div>
            </a>

            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3 group"
            >
              <div className="mt-0.5 w-8 h-8 border border-teal/15 rounded-lg flex items-center justify-center group-hover:border-[#16A34A]/35 group-hover:bg-[#16A34A]/8 transition-all duration-200 shrink-0">
                <MessageCircle size={12} className="text-stone-teal/40 group-hover:text-[#16A34A] transition-colors duration-200" />
              </div>
              <div>
                <p className="font-sans text-stone-teal/40 text-[11px] uppercase tracking-[0.12em]">
                  WhatsApp
                </p>
                <p className="font-sans text-ivory-warm/80 text-sm group-hover:text-[#16A34A] transition-colors duration-200">
                  Chat with Us Now
                </p>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-teal/12">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-sans text-stone-teal/35 text-xs">
            © 2026 DryClean Masters. All Rights Reserved.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="#privacy"
              className="font-sans text-stone-teal/35 text-xs hover:text-stone-teal/70 transition-colors duration-200"
            >
              Privacy Policy
            </a>
            <span className="text-stone-teal/20">·</span>
            <a
              href="#terms"
              className="font-sans text-stone-teal/35 text-xs hover:text-stone-teal/70 transition-colors duration-200"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
