"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MessageCircle, Droplets, Wind } from "lucide-react";

const WA_LINK =
  "https://wa.me/918882631413?text=Hi%2C%20I%20want%20to%20know%20the%20exact%20pricing%20for%20cleaning%20services";

const pricingData = [
  {
    service: "Premium Luxury Sofa",
    unit: "Per Seat",
    dry: "₹299",
    wet: "₹349",
  },
  {
    service: "Office Executive Chair",
    unit: "Per Chair",
    dry: "₹149",
    wet: "₹199",
  },
  {
    service: "Premium Carpet / Rug",
    unit: "Per Sq. Ft.",
    dry: "₹12",
    wet: "₹15",
  },
  {
    service: "King Size Premium Mattress",
    unit: "Per Mattress",
    dry: "₹1,199",
    wet: "₹1,499",
  },
  {
    service: "Premium Heavy Curtains",
    unit: "Per Panel",
    dry: "₹249",
    wet: "₹999",
  },
];

export default function Pricing() {
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
              Rate Card
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

        {/* Rate Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
          className="overflow-hidden rounded-2xl border border-stone-teal/15 shadow-sm"
        >
          {/* Table header */}
          <div className="grid grid-cols-[1fr_auto_auto] bg-teal-deep px-5 md:px-8 py-4 gap-4">
            <span className="font-sans text-xs text-stone-teal/50 uppercase tracking-[0.15em]">
              Service
            </span>
            <div className="flex items-center gap-1.5 justify-end min-w-[90px]">
              <Wind size={12} className="text-copper-light/80" />
              <span className="font-sans text-xs text-copper-light/80 uppercase tracking-[0.12em]">
                Dry Clean
              </span>
            </div>
            <div className="flex items-center gap-1.5 justify-end min-w-[100px]">
              <Droplets size={12} className="text-copper-light/80" />
              <span className="font-sans text-xs text-copper-light/80 uppercase tracking-[0.12em]">
                Wet / Shampoo
              </span>
            </div>
          </div>

          {/* Rows */}
          <div className="bg-white divide-y divide-stone-teal/8">
            {pricingData.map((row, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.35 + i * 0.06 }}
                className="grid grid-cols-[1fr_auto_auto] items-center gap-4 px-5 md:px-8 py-4 md:py-5 hover:bg-stone-50 transition-colors duration-150"
              >
                {/* Service name */}
                <div className="flex flex-col gap-0.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-sans text-sm md:text-base text-charcoal/85 font-medium">
                      {row.service}
                    </span>
                  </div>
                  <span className="font-sans text-xs text-slate-teal/50">
                    {row.unit}
                  </span>
                </div>

                {/* Dry price */}
                <div className="flex flex-col items-end min-w-[90px]">
                  <span className="font-serif text-xl md:text-2xl text-teal-deep font-bold">
                    {row.dry}
                  </span>
                  <span className="font-sans text-[10px] text-charcoal/35 leading-none mt-0.5">
                    onwards
                  </span>
                </div>

                {/* Wet price */}
                <div className="flex flex-col items-end min-w-[100px]">
                  <span className="font-serif text-xl md:text-2xl text-teal-deep font-bold">
                    {row.wet}
                  </span>
                  <span className="font-sans text-[10px] text-charcoal/35 leading-none mt-0.5">
                    onwards
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Footer */}
          <div className="px-5 md:px-8 py-4 bg-mist/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <p className="font-sans text-xs text-slate-teal/60">
              * Prices are indicative starting rates. Final quote after on-site inspection.
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
