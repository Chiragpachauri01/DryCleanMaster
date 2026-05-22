"use client";

import { Phone, Clock, MapPin, MessageCircle } from "lucide-react";

const WA_LINK =
  "https://wa.me/918882625522?text=Hi%2C%20I%20want%20to%20book%20a%20free%20pickup%20for%20dry%20cleaning%20service";

export default function TopBar() {
  return (
    <div className="bg-navy text-stone/80 text-xs py-2.5 px-4 lg:px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Left */}
        <div className="flex items-center gap-5">
          <a
            href="tel:+918882625522"
            className="flex items-center gap-1.5 hover:text-gold transition-colors duration-200"
          >
            <Phone size={11} strokeWidth={2} />
            <span className="tracking-wide">+91 8882625522</span>
          </a>
          <span className="hidden sm:flex items-center gap-1.5">
            <Clock size={11} strokeWidth={2} />
            <span className="tracking-wide">7 AM – 10 PM Daily</span>
          </span>
        </div>

        {/* Right */}
        <div className="flex items-center gap-5">
          <span className="hidden md:flex items-center gap-1.5">
            <MapPin size={11} strokeWidth={2} />
            <span className="tracking-wide">Serving Delhi NCR</span>
          </span>
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 bg-gold text-midnight text-xs font-semibold px-3.5 py-1.5 rounded-sm hover:bg-gold-dark transition-colors duration-200"
          >
            <MessageCircle size={11} strokeWidth={2.5} />
            <span>Book Free Pickup</span>
          </a>
        </div>
      </div>
    </div>
  );
}
