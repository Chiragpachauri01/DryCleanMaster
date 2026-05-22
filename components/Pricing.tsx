"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { MessageCircle } from "lucide-react";

const WA_LINK =
  "https://wa.me/918882625522?text=Hi%2C%20I%20want%20to%20know%20the%20exact%20pricing%20for%20cleaning%20services";

const pricingData = [
  {
    service: "Premium Luxury Sofa (Per Seat)",
    dry: "₹299",
    wet: "₹349",
    popular: true,
  },
  {
    service: "Office Executive Chair",
    dry: "₹149",
    wet: "₹199",
    popular: false,
  },
  {
    service: "Premium Carpet / Rug (Per Sq. Ft.)",
    dry: "₹12",
    wet: "₹15",
    popular: false,
  },
  {
    service: "King Size Premium Mattress",
    dry: "₹1,199",
    wet: "₹1,499",
    popular: false,
  },
  {
    service: "Premium Heavy Curtains (Per Panel)",
    dry: "₹249",
    wet: "₹999",
    popular: false,
  },
  {
    service: "Luxury Sedan / SUV Car Interior",
    dry: "₹2,499",
    wet: "₹2,999",
    popular: false,
  },
];

type Mode = "dry" | "wet";

export default function Pricing() {
  const [mode, setMode] = useState<Mode>("dry");
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="pricing" className="bg-pearl py-20 md:py-28" ref={ref}>
      <div className="max-w-5xl mx-auto px-4 md:px-8 lg:px-12">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.span
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            className="inline-flex items-center gap-2 mb-4 justify-center"
          >
            <span className="w-5 h-px bg-gold-dark" />
            <span className="text-gold-dark font-sans text-xs uppercase tracking-[0.2em] font-semibold">
              Indicative Pricing
            </span>
            <span className="w-5 h-px bg-gold-dark" />
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="font-serif text-midnight text-3xl md:text-4xl xl:text-5xl font-bold leading-[1.1] mb-4"
          >
            Transparent Rates
            <br />
            <span className="italic font-normal text-charcoal/45">
              No Hidden Surcharges
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.25 }}
            className="font-sans text-charcoal/60 text-sm max-w-md mx-auto"
          >
            Indicative starting rates. Final pricing is confirmed on-site after
            the free inspection visit.
          </motion.p>
        </div>

        {/* Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
          className="flex justify-center mb-10"
        >
          <div className="inline-flex bg-stone/50 border border-stone p-1 rounded-sm">
            {(["dry", "wet"] as Mode[]).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`relative px-6 py-2.5 text-sm font-sans font-medium rounded-sm transition-all duration-300 ${
                  mode === m
                    ? "bg-midnight text-cream"
                    : "text-charcoal/60 hover:text-midnight"
                }`}
              >
                {m === "dry" ? "Dry Cleaning" : "Wet / Shampoo Cleaning"}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.35 }}
          className="overflow-hidden border border-stone rounded-sm"
        >
          {/* Table header */}
          <div className="grid grid-cols-[1fr_auto] bg-midnight px-6 md:px-8 py-4">
            <span className="font-sans text-xs text-stone/50 uppercase tracking-[0.15em]">
              Furnishing / Service
            </span>
            <AnimatePresence mode="wait">
              <motion.span
                key={mode}
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                transition={{ duration: 0.2 }}
                className="font-sans text-xs text-gold/80 uppercase tracking-[0.15em] text-right"
              >
                {mode === "dry" ? "Dry Cleaning" : "Wet / Shampoo"}
              </motion.span>
            </AnimatePresence>
          </div>

          {/* Rows */}
          <div className="divide-y divide-stone/40">
            {pricingData.map((row, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.4 + i * 0.06 }}
                className={`grid grid-cols-[1fr_auto] items-center px-6 md:px-8 py-4 md:py-5 group transition-colors duration-200 ${
                  row.popular ? "bg-cream" : "bg-pearl hover:bg-cream/80"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="font-sans text-sm md:text-[0.95rem] text-charcoal/80">
                    {row.service}
                  </span>
                  {row.popular && (
                    <span className="hidden sm:inline font-sans text-[10px] bg-gold/15 text-gold-dark border border-gold/25 px-2 py-0.5 uppercase tracking-[0.1em]">
                      Most Popular
                    </span>
                  )}
                </div>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={mode}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.18 }}
                    className="text-right"
                  >
                    <span className="font-serif text-midnight text-lg font-semibold">
                      {mode === "dry" ? row.dry : row.wet}
                    </span>
                    <span className="font-sans text-charcoal/40 text-xs ml-1">
                      onwards
                    </span>
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {/* Footer note */}
          <div className="bg-stone/30 px-6 md:px-8 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <p className="font-sans text-xs text-charcoal/55">
              * Prices are indicative starting rates. Final quote after free
              on-site inspection.
            </p>
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 font-sans text-xs font-semibold text-midnight hover:text-gold transition-colors duration-200 shrink-0"
            >
              <MessageCircle size={13} />
              Get Exact Quote on WhatsApp
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
