"use client";

import { MessageCircle } from "lucide-react";

const WA_LINK =
  "https://wa.me/918882625522?text=Hi%2C%20I%20want%20to%20book%20a%20cleaning%20service";

export default function FloatingWhatsApp() {
  return (
    <a
      href={WA_LINK}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-[100] flex items-center gap-2.5 bg-[#16A34A] text-white font-sans font-semibold text-sm pl-4 pr-5 py-3.5 rounded-full wa-pulse hover:bg-[#15803D] transition-colors duration-200 shadow-lg shadow-[#16A34A]/30 group"
    >
      <MessageCircle size={20} strokeWidth={2} className="shrink-0" />
      <span className="hidden sm:block">WhatsApp Us</span>
    </a>
  );
}
