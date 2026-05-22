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
        <div className="relative flex-1 lg:w-[58%] bg-cream flex items-center px-6 py-16 md:px-12 lg:px-16 xl:px-20">
          {/* Subtle vertical line accent */}
          <div className="absolute left-0 top-1/4 h-1/2 w-px bg-gold/25 hidden lg:block" />

          <div className="w-full max-w-xl">
            {/* Category chip */}
            <motion.div
              custom={0}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="inline-flex items-center gap-2 mb-6"
            >
              <span className="w-6 h-px bg-gold" />
              <span className="text-gold font-sans text-xs uppercase tracking-[0.22em] font-semibold">
                Premium Furnishing Care · Delhi
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              custom={1}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="font-serif text-midnight leading-[1.08] text-4xl md:text-5xl xl:text-[3.6rem] font-bold mb-6"
            >
              Premium Sofa,
              <br />
              Carpet &amp;
              <br />
              <em className="not-italic text-navy">Furnishing</em>
              <br />
              Deep Cleaning
              <br />
              <span className="text-3xl md:text-4xl xl:text-[2.9rem] font-normal italic text-charcoal/60">
                in Delhi
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              custom={2}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="font-sans text-charcoal/70 text-base md:text-[1.05rem] leading-relaxed mb-8 max-w-[90%]"
            >
              Give your luxury sofas, carpets, and mattresses a master-grade
              rejuvenation. We offer premium dry cleaning and advanced fabric
              shampoo wet-cleaning treatments that eliminate dirt, stains, and
              allergens right at your home or office.
            </motion.p>

            {/* CTAs */}
            <motion.div
              custom={3}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-3"
            >
              <a
                href="#contact"
                className="group flex items-center gap-2.5 bg-midnight text-cream font-sans font-semibold text-sm px-7 py-3.5 rounded-sm hover:bg-navy transition-all duration-300 hover:shadow-lg hover:shadow-midnight/20"
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
                className="flex items-center gap-2.5 border border-charcoal/25 text-charcoal font-sans font-medium text-sm px-7 py-3.5 rounded-sm hover:border-gold hover:text-gold transition-all duration-300"
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
          className="relative lg:w-[42%] min-h-[420px] lg:min-h-full bg-midnight overflow-hidden"
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

          {/* Dark gradient overlay for premium feel */}
          <div className="absolute inset-0 bg-gradient-to-br from-midnight/85 via-midnight/65 to-midnight/90" />
          <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/30 to-transparent" />

          {/* Fabric texture overlay */}
          <div className="absolute inset-0 fabric-texture opacity-40" />

          {/* Top-left service tag */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="absolute top-8 left-8 right-8 flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
              <span className="font-sans text-stone/70 text-[10px] uppercase tracking-[0.25em]">
                Live · Doorstep Service
              </span>
            </div>
            <span className="font-sans text-stone/50 text-[10px] uppercase tracking-[0.2em]">
              Est. 2014
            </span>
          </motion.div>

          {/* Decorative gold lines */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 0.15 }}
                transition={{ delay: 0.9 + i * 0.15, duration: 1.4, ease: "easeOut" }}
                className="absolute h-px bg-gold origin-left"
                style={{
                  top: `${30 + i * 18}%`,
                  left: "8%",
                  right: "8%",
                }}
              />
            ))}
          </div>

          {/* Bottom-center editorial quote */}
          <div className="absolute inset-x-0 bottom-0 px-8 pb-10 pt-20 bg-gradient-to-t from-midnight via-midnight/80 to-transparent">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8, ease: "easeOut" }}
              className="max-w-md"
            >
              <div className="w-8 h-px bg-gold mb-4" />
              <p className="font-serif text-cream text-2xl md:text-3xl font-medium leading-[1.15] mb-3">
                &ldquo;Restore, Don&apos;t
                <br />
                <em className="text-gold/90 font-normal">Just Clean.</em>&rdquo;
              </p>
              <p className="font-sans text-stone/60 text-xs uppercase tracking-[0.2em]">
                — Delhi&apos;s Master Craftsmen
              </p>
            </motion.div>
          </div>

          {/* Stat callout — floating badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.1, duration: 0.6 }}
            className="absolute top-1/3 right-6 hidden lg:flex flex-col items-end bg-midnight/70 backdrop-blur-sm border border-gold/20 px-4 py-3"
          >
            <span className="font-serif text-gold text-2xl font-bold leading-none">
              12K+
            </span>
            <span className="font-sans text-stone/60 text-[10px] uppercase tracking-[0.15em] mt-1">
              Homes Restored
            </span>
          </motion.div>

          {/* Bottom gold accent bar */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent opacity-60" />
        </motion.div>
      </div>

      {/* ── Trust Badges Strip ── */}
      <div className="bg-midnight">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-stone/10">
            {trustBadges.map(({ icon: Icon, label, sub }, i) => (
              <motion.div
                key={i}
                custom={i}
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                className="flex items-center gap-3 px-6 py-5 group"
              >
                <div className="shrink-0 w-8 h-8 rounded-sm bg-navy/60 border border-gold/20 flex items-center justify-center group-hover:border-gold/50 transition-colors duration-300">
                  <Icon size={14} className="text-gold" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="font-sans text-cream text-xs font-semibold leading-tight">{label}</p>
                  <p className="font-sans text-stone/50 text-[11px] leading-tight">{sub}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
