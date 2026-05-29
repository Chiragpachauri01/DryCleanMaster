"use client";

import { Phone, Clock, MapPin, MessageCircle, Star } from "lucide-react";

const WA_LINK =
  "https://wa.me/918882625522?text=Hi%2C%20I%20want%20to%20book%20a%20pickup%20for%20dry%20cleaning%20service";

export default function TopBar() {
  return (
    <div className="bg-teal-deep text-stone-teal/70 text-xs py-2.5 px-4 lg:px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Left */}
        <div className="flex items-center gap-4">
          <a
            href="tel:+918882625522"
            className="flex items-center gap-1.5 hover:text-teal-glow transition-colors duration-200"
          >
            <Phone size={11} strokeWidth={2} />
            <span className="tracking-wide">+91 8882625522</span>
          </a>
          <span className="hidden sm:flex items-center gap-1.5">
            <Clock size={11} strokeWidth={2} />
            <span className="tracking-wide">7 AM – 10 PM Daily</span>
          </span>
          {/* Google Rating badge */}
          <span className="hidden lg:flex items-center gap-1.5 bg-copper/15 border border-copper/30 px-2.5 py-1 rounded-full">
            <Star size={9} className="text-copper-light fill-copper-light" />
            <span className="text-copper-light font-semibold text-[10px]">4.9</span>
            <span className="text-stone-teal/40 text-[10px]">Google Rating</span>
          </span>
        </div>

        {/* Right */}
        <div className="flex items-center gap-4">
          <span className="hidden md:flex items-center gap-1.5">
            <MapPin size={11} strokeWidth={2} />
            <span className="tracking-wide">Serving Delhi NCR</span>
          </span>
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 bg-teal text-white text-xs font-semibold px-3.5 py-1.5 rounded-full hover:bg-teal-mid transition-all duration-200 shadow-sm"
          >
            <MessageCircle size={11} strokeWidth={2.5} />
            <span>Call Now</span>
          </a>
        </div>
      </div>
    </div>
  );
}
