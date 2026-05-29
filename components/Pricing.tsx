"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { MessageCircle } from "lucide-react";

const WA_LINK =
  "https://wa.me/918882631413?text=Hi%2C%20I%20want%20to%20know%20the%20exact%20pricing%20for%20cleaning%20services";

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
    <section id="pricing" className="bg-ivory py-20 md:py-28" ref={ref}>
      <div className="max-w-5xl mx-auto px-4 md:px-8 lg:px-12">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.span
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            className="inline-flex items-center gap-2 mb-4 justify-center"
          >
            <span className="w-5 h-[2px] bg-teal rounded-full" />
            <span className="text-teal font-sans text-xs uppercase tracking-[0.2em] font-semibold">
              Indicative Pricing
            </span>
            <span className="w-5 h-[2px] bg-teal rounded-full" />
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="font-serif text-teal-deep text-3xl md:text-4xl xl:text-5xl font-bold leading-[1.1] mb-4"
          >
            Transparent Rates
            <br />
            <span className="italic font-normal text-charcoal/40">
              No Hidden Surcharges
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.25 }}
            className="font-sans text-slate-teal/70 text-sm max-w-md mx-auto"
          >
            Indicative starting rates. Final pricing is confirmed on-site after
            the inspection visit.
          </motion.p>
        </div>

        {/* Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
          className="flex justify-center mb-10"
        >
          <div className="inline-flex bg-mist border border-stone-teal/30 p-1 rounded-xl shadow-inner">
            {(["dry", "wet"] as Mode[]).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`relative px-6 py-2.5 text-sm font-sans font-semibold rounded-lg transition-all duration-300 ${
                  mode === m
                    ? "bg-teal text-white shadow-md shadow-teal/35"
                    : "text-slate-teal hover:text-teal"
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
          className="overflow-hidden border border-stone-teal/25 rounded-2xl shadow-md shadow-teal/8"
        >
          {/* Table header */}
          <div className="grid grid-cols-[1fr_auto] bg-teal-deep px-6 md:px-8 py-4">
            <span className="font-sans text-xs text-stone-teal/50 uppercase tracking-[0.15em]">
              Furnishing / Service
            </span>
            <AnimatePresence mode="wait">
              <motion.span
                key={mode}
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                transition={{ duration: 0.2 }}
                className="font-sans text-xs text-copper-light/90 uppercase tracking-[0.15em] text-right"
              >
                {mode === "dry" ? "Dry Cleaning" : "Wet / Shampoo"}
              </motion.span>
            </AnimatePresence>
          </div>

          {/* Rows */}
          <div className="divide-y divide-mist">
            {pricingData.map((row, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.4 + i * 0.06 }}
                className={`grid grid-cols-[1fr_auto] items-center px-6 md:px-8 py-4 md:py-5 group transition-colors duration-200 ${
                  row.popular
                    ? "bg-teal/8 border-l-4 border-teal"
                    : "bg-ivory hover:bg-ivory-teal"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="font-sans text-sm md:text-[0.95rem] text-charcoal/80">
                    {row.service}
                  </span>
                  {row.popular && (
                    <span className="hidden sm:inline font-sans text-[10px] bg-teal/12 text-teal border border-teal/25 px-2.5 py-0.5 rounded-full uppercase tracking-[0.1em] font-semibold">
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
                    <span className="font-serif text-copper text-xl font-bold">
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
          <div className="bg-mist/60 px-6 md:px-8 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <p className="font-sans text-xs text-slate-teal/60">
              * Prices are indicative starting rates. Final quote after
              on-site inspection.
            </p>
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 font-sans text-xs font-semibold text-teal hover:text-teal-mid transition-colors duration-200 shrink-0"
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
