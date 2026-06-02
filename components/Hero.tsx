"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarCheck, MessageCircle, Search, Sparkles, ShieldCheck, Truck } from "lucide-react";

const banners = [
  "/img/Banner%20Images/1.webp",
  "/img/Banner%20Images/2.webp",
  "/img/Banner%20Images/3.webp",
];

const WA_LINK =
  "https://wa.me/918882631413?text=Hi%2C%20I%20want%20to%20book%20an%20inspection%20visit%20for%20cleaning%20service";

const trustBadges = [
  { icon: Search,      label: "In-Person",        sub: "Inspection Visit" },
  { icon: Sparkles,    label: "Eco-Luxury Safe &",     sub: "Odourless Solvents" },
  { icon: ShieldCheck, label: "100% Premium Fabric &", sub: "Colour Protection" },
  { icon: Truck,       label: "Same-Day",              sub: "On-Site Service Available" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.13, duration: 0.65, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export default function Hero() {
  const [activeBanner, setActiveBanner] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveBanner((i) => (i + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="hero" className="relative flex flex-col min-h-screen">

      {/* ── Full-screen background ── */}
      <div className="absolute inset-0">
        <AnimatePresence mode="sync">
          <motion.div
            key={activeBanner}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
            className="absolute inset-0"
          >
            <Image
              src={banners[activeBanner]}
              alt="Premium sofa deep cleaning by DryClean Masters Delhi"
              fill
              sizes="100vw"
              priority={activeBanner === 0}
              className="object-cover object-center"
            />
          </motion.div>
        </AnimatePresence>
        {/* layered gradients: bottom-heavy for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-teal-deep via-teal-deep/75 to-teal-deep/30" />
        {/* left-side extra darkening so headline pops */}
        <div className="absolute inset-0 bg-gradient-to-r from-teal-deep/60 via-teal-deep/20 to-transparent" />
        {/* subtle teal texture */}
        <div className="absolute inset-0 teal-texture opacity-20" />
      </div>

      {/* ── Main content ── */}
      <div className="relative z-10 flex-1 flex flex-col justify-center px-6 md:px-12 lg:px-20 max-w-7xl mx-auto w-full">

        {/* Category chip */}
        <motion.div
          custom={0}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="flex items-center gap-2.5 mb-4"
        >
          <motion.span className="w-2 h-2 rounded-full bg-teal teal-dot-pulse" />
          <span className="bg-teal-deep/60 backdrop-blur-md border border-teal/25 text-teal-glow font-sans text-[11px] uppercase tracking-[0.26em] font-semibold px-4 py-1.5 rounded-full">
            Premium Furnishing Care · Delhi
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          custom={1}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="font-serif text-ivory-warm font-bold leading-[1.1] mb-4
                     text-4xl sm:text-5xl md:text-6xl lg:text-[4rem]"
        >
          Premium Sofa, Carpet &amp;
          <br />
          <span className="relative inline-block">
            <em className="not-italic text-teal-glow">Furnishing</em>
            <motion.span
              className="absolute -bottom-1 left-0 w-full h-[3px] bg-gradient-to-r from-copper via-copper-light to-transparent rounded-full"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.55 }}
            />
          </span>
          {" "}Deep Cleaning
          <br />
          <span className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.5rem] font-normal italic text-stone-teal/50">
            in Delhi
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          custom={2}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="font-sans text-stone-teal/80 text-sm sm:text-base md:text-lg leading-relaxed mb-4 max-w-xl"
        >
          Give your luxury sofas, carpets, and mattresses a master-grade
          rejuvenation. We offer premium dry cleaning and advanced fabric shampoo
          wet-cleaning treatments that eliminate dirt, stains, and allergens right
          at your home or office.
        </motion.p>

        {/* Social proof strip */}
        <motion.div
          custom={2.5}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="flex items-center gap-3 mb-6"
        >
          <div className="flex -space-x-2">
            {["S", "P", "R", "N"].map((initial, i) => (
              <div
                key={i}
                className={`w-7 h-7 rounded-full border-2 border-teal-deep flex items-center justify-center text-[10px] font-semibold text-white ${
                  ["bg-teal", "bg-copper", "bg-teal-mid", "bg-slate-teal"][i]
                }`}
              >
                {initial}
              </div>
            ))}
          </div>
          <div>
            <span className="font-sans text-xs text-ivory-warm font-semibold">12,000+ Delhi Families</span>
            <span className="font-sans text-xs text-stone-teal/50"> trust us</span>
          </div>
        </motion.div>

        {/* CTAs */}
        <motion.div
          custom={3}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-0"
        >
          <motion.a
            href="#booking"
            className="btn-primary inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl text-sm font-semibold"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            <CalendarCheck size={16} />
            Book Inspection Visit
          </motion.a>

          {/* divider */}
          <span className="hidden sm:block w-px h-9 bg-white/20 mx-5 self-center" />

          <motion.a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl text-sm font-semibold"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            <MessageCircle size={16} />
            WhatsApp Us Now
          </motion.a>
        </motion.div>
      </div>

      {/* ── Trust Badges Strip ── */}
      <div className="relative z-10 bg-teal-deep teal-texture border-t border-teal/25">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-teal/15">
            {trustBadges.map(({ icon: Icon, label, sub }, i) => (
              <motion.div
                key={i}
                custom={i + 3.5}
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                className="group flex items-center gap-3 px-5 py-4 cursor-pointer"
                whileHover={{ y: -2 }}
              >
                <motion.div
                  className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center border transition-all duration-300 ${
                    i % 2 === 0
                      ? "bg-teal/20 border-teal-light/30 group-hover:bg-teal/35 group-hover:border-teal-glow/55"
                      : "bg-copper/15 border-copper/30 group-hover:bg-copper/28 group-hover:border-copper-light/55"
                  }`}
                  whileHover={{ rotate: 6 }}
                >
                  <Icon
                    size={15}
                    strokeWidth={1.4}
                    className={i % 2 === 0 ? "text-teal-glow" : "text-copper-light"}
                  />
                </motion.div>
                <div className="group-hover:translate-x-0.5 transition-transform duration-300">
                  <p className="font-sans text-ivory-warm text-[13px] font-bold leading-snug">{label}</p>
                  <p className="font-sans text-stone-teal/60 text-[11px] leading-snug mt-0.5">{sub}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom copper accent line */}
      <motion.div
        className="relative z-10 h-[3px] bg-gradient-to-r from-transparent via-copper to-transparent"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.2, delay: 0.4 }}
      />
    </section>
  );
}
