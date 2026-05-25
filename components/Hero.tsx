"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CalendarCheck, MessageCircle, Search, Sparkles, ShieldCheck, Truck } from "lucide-react";

const WA_LINK =
  "https://wa.me/918882625522?text=Hi%2C%20I%20want%20to%20book%20a%20free%20inspection%20visit%20for%20cleaning%20service";

const trustBadges = [
  { icon: Search, label: "Free In-Person", sub: "Inspection Visit" },
  { icon: Sparkles, label: "Eco-Luxury Safe", sub: "Odorless Solvents" },
  { icon: ShieldCheck, label: "100% Fabric &", sub: "Color Protection" },
  { icon: Truck, label: "Same-Day", sub: "On-Site Service" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col" id="hero">
      {/* Main split */}
      <div className="flex-1 flex flex-col lg:flex-row min-h-[calc(100vh-120px)]">
        {/* ── Left: Text panel ── */}
        <div className="relative flex-1 lg:w-[58%] bg-ivory-teal flex items-center px-6 py-16 md:px-12 lg:px-16 xl:px-20 overflow-hidden">
          {/* Decorative teal geometric shapes */}
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-teal/8 -translate-y-1/2 translate-x-1/4 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-teal/6 translate-y-1/3 -translate-x-1/4 pointer-events-none" />
          {/* Left accent bar */}
          <div className="absolute left-0 top-1/4 h-1/2 w-1 bg-gradient-to-b from-transparent via-teal to-transparent hidden lg:block" />

          <div className="w-full max-w-xl relative z-10">
            {/* Category chip */}
            <motion.div
              custom={0}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="inline-flex items-center gap-2 mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-teal teal-dot-pulse" />
              <span className="bg-teal/12 border border-teal/25 text-teal font-sans text-xs uppercase tracking-[0.22em] font-semibold px-3 py-1 rounded-full">
                Premium Furnishing Care · Delhi
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              custom={1}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="font-serif text-teal-deep leading-[1.08] text-4xl md:text-5xl xl:text-[3.5rem] font-bold mb-6"
            >
              Premium Sofa,
              <br />
              Carpet &amp;
              <br />
              <span className="relative inline-block">
                <em className="not-italic text-teal">Furnishing</em>
                <span className="absolute -bottom-1 left-0 right-0 h-[3px] bg-copper/50 rounded-full" />
              </span>
              <br />
              Deep Cleaning
              <br />
              <span className="text-3xl md:text-4xl xl:text-[2.8rem] font-normal italic text-charcoal/45">
                in Delhi
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              custom={2}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="font-sans text-slate-teal text-base md:text-[1.05rem] leading-relaxed mb-4 max-w-[90%]"
            >
              Give your luxury sofas, carpets, and mattresses a master-grade
              rejuvenation. Premium dry cleaning and advanced fabric shampoo
              treatments that eliminate dirt, stains, and allergens right at
              your home or office.
            </motion.p>

            {/* Social proof strip */}
            <motion.div
              custom={2.5}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="flex items-center gap-3 mb-8"
            >
              <div className="flex -space-x-2">
                {["S", "P", "R", "N"].map((initial, i) => (
                  <div
                    key={i}
                    className={`w-7 h-7 rounded-full border-2 border-ivory-teal flex items-center justify-center text-[10px] font-semibold text-white ${
                      ["bg-teal", "bg-copper", "bg-teal-mid", "bg-slate-teal"][i]
                    }`}
                  >
                    {initial}
                  </div>
                ))}
              </div>
              <div>
                <span className="font-sans text-xs text-charcoal font-semibold">12,000+ Delhi Families</span>
                <span className="font-sans text-xs text-charcoal/45"> trust us</span>
              </div>
            </motion.div>

            {/* CTAs */}
            <motion.div
              custom={3}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3"
            >
              <a
                href="#contact"
                className="group btn-primary flex items-center justify-center gap-2.5 text-sm px-7 py-3.5"
              >
                <CalendarCheck
                  size={15}
                  className="group-hover:rotate-[-8deg] transition-transform duration-300"
                />
                Book Free Inspection Visit
              </a>
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp flex items-center justify-center gap-2.5 text-sm px-7 py-3.5"
              >
                <MessageCircle size={15} />
                WhatsApp Us Now
              </a>
            </motion.div>
          </div>
        </div>

        {/* ── Right: Visual panel ── */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] as const }}
          className="relative lg:w-[42%] min-h-[420px] lg:min-h-full bg-teal-deep overflow-hidden"
        >
          {/* Hero Image */}
          <Image
            src="/img/hero-sofa-extraction.png"
            alt="Premium velvet sofa being cleaned by Dry Clean Master"
            fill
            sizes="(max-width: 1024px) 100vw, 42vw"
            priority
            className="object-cover"
          />

          {/* Dark teal gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-teal-deep/90 via-teal-dark/70 to-teal-deep/92" />
          <div className="absolute inset-0 bg-gradient-to-t from-teal-deep via-teal-deep/25 to-transparent" />

          {/* Teal texture overlay */}
          <div className="absolute inset-0 teal-texture opacity-50" />

          {/* Top service tag */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="absolute top-8 left-8 right-8 flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-glow teal-dot-pulse" />
              <span className="font-sans text-stone-teal/70 text-[10px] uppercase tracking-[0.25em]">
                Live · Doorstep Service
              </span>
            </div>
            <span className="font-sans text-stone-teal/50 text-[10px] uppercase tracking-[0.2em]">
              Est. 2014
            </span>
          </motion.div>

          {/* Decorative teal lines */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 0.2 }}
                transition={{ delay: 0.9 + i * 0.15, duration: 1.4, ease: "easeOut" }}
                className="absolute h-px bg-teal-light origin-left"
                style={{
                  top: `${30 + i * 18}%`,
                  left: "8%",
                  right: "8%",
                }}
              />
            ))}
          </div>

          {/* Bottom editorial quote */}
          <div className="absolute inset-x-0 bottom-0 px-8 pb-10 pt-20 bg-gradient-to-t from-teal-deep via-teal-deep/80 to-transparent">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8, ease: "easeOut" }}
              className="max-w-md"
            >
              <div className="w-8 h-[2px] bg-copper mb-4 rounded-full" />
              <p className="font-serif text-ivory-warm text-2xl md:text-3xl font-medium leading-[1.15] mb-3">
                &ldquo;Restore, Don&apos;t
                <br />
                <em className="text-copper-light font-normal">Just Clean.</em>&rdquo;
              </p>
              <p className="font-sans text-stone-teal/60 text-xs uppercase tracking-[0.2em]">
                — Delhi&apos;s Master Craftsmen
              </p>
            </motion.div>
          </div>

          {/* Stat callout badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.1, duration: 0.6 }}
            className="absolute top-1/3 right-6 hidden lg:flex flex-col items-end bg-teal-deep/70 backdrop-blur-sm border border-teal-light/25 px-4 py-3 rounded-xl"
          >
            <span className="font-serif text-teal-glow text-2xl font-bold leading-none">
              12K+
            </span>
            <span className="font-sans text-stone-teal/60 text-[10px] uppercase tracking-[0.15em] mt-1">
              Homes Restored
            </span>
          </motion.div>

          {/* Bottom copper accent bar */}
          <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-copper/70 to-transparent" />
        </motion.div>
      </div>

      {/* ── Trust Badges Strip ── */}
      <div className="bg-teal-deep border-t border-teal/20">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-teal/15">
            {trustBadges.map(({ icon: Icon, label, sub }, i) => (
              <motion.div
                key={i}
                custom={i}
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                className="flex items-center gap-3 px-6 py-5 group"
              >
                <div className={`shrink-0 w-9 h-9 rounded-xl flex items-center justify-center border transition-all duration-300 ${
                  i % 2 === 0
                    ? "bg-teal/20 border-teal/35 group-hover:bg-teal/35 group-hover:border-teal-light/50"
                    : "bg-copper/15 border-copper/30 group-hover:bg-copper/25 group-hover:border-copper/50"
                }`}>
                  <Icon size={14} className={i % 2 === 0 ? "text-teal-glow" : "text-copper-light"} strokeWidth={1.5} />
                </div>
                <div>
                  <p className="font-sans text-ivory-warm text-xs font-semibold leading-tight">{label}</p>
                  <p className="font-sans text-stone-teal/50 text-[11px] leading-tight">{sub}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
