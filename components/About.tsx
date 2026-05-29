"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

const stats = [
  { value: "10+", label: "Years of Specialization", sub: "in Furnishing Restoration" },
  { value: "40+", label: "Certified On-Site", sub: "Tech Masters" },
  { value: "12K+", label: "Sofas & Carpets", sub: "Deep Cleaned in Delhi" },
  { value: "100%", label: "Full Coverage", sub: "Across Delhi NCR" },
];

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="about" className="bg-ivory-warm py-20 md:py-28" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-start">
          {/* Left: story text */}
          <div>
            <motion.span
              initial={{ opacity: 0, x: -12 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 mb-5"
            >
              <span className="w-2 h-2 rounded-full bg-teal" />
              <span className="text-teal font-sans text-xs uppercase tracking-[0.2em] font-semibold">
                About Us
              </span>
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.1 }}
              className="font-serif text-teal-deep text-3xl md:text-4xl xl:text-[2.8rem] font-bold leading-[1.1] mb-6"
            >
              Delhi&apos;s Experts in
              <br />
              Premium Furnishing
              <br />
              <span className="italic font-normal text-charcoal/45">
                Care &amp; Restoration
              </span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.2 }}
              className="space-y-4"
            >
              <p className="font-sans text-slate-teal text-base leading-relaxed">
                DryClean Master was established with one clear goal: to bring
                expert-level care to your premium home and office furnishings.
                We believe that your expensive sofas, carpets, and upholstery
                deserve much more than basic washing; they need deep,{" "}
                <span className="text-teal font-semibold">
                  scientific cleaning methods
                </span>{" "}
                that actually protect the fabric while restoring freshness.
              </p>
              <p className="font-sans text-slate-teal text-base leading-relaxed">
                By combining advanced European extraction machines with
                fabric-safe, eco-friendly cleaning solutions, we deliver a
                premium on-site furnishing cleaning experience across Delhi.
              </p>
            </motion.div>

            {/* Strengths list */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.3 }}
              className="mt-8 space-y-3"
            >
              {[
                "10+ Years of Specialisation in Furnishing Restoration",
                "40+ Certified On-Site Tech Masters",
                "12,000+ Sofas & Carpets Deep Cleaned in Delhi",
                "Full Coverage Across Delhi NCR",
                "Advanced industrial-grade machinery",
                "Safe and eco-friendly cleaning methods",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="mt-2 w-4 h-[2px] bg-copper shrink-0 rounded-full" />
                  <span className="font-sans text-sm text-slate-teal">{item}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: image + stat grid */}
          <div className="space-y-6">
            {/* Hero image */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="relative h-72 md:h-80 overflow-hidden rounded-2xl"
            >
              <Image
                src="/img/about-restored-living-room.webp"
                alt="Premium luxury living room interior — Dry Clean Master"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-teal-deep/25 via-transparent to-transparent" />

              {/* Floating attribution */}
              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
                <div className="flex items-center gap-2 bg-teal-deep/75 backdrop-blur-sm px-3 py-2 rounded-lg border border-teal-light/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-glow teal-dot-pulse" />
                  <span className="font-sans text-stone-teal/85 text-[10px] uppercase tracking-[0.2em]">
                    On-Site Master Service
                  </span>
                </div>
                <span className="font-serif text-ivory-warm/80 text-xs italic hidden sm:inline">
                  — South Delhi residence
                </span>
              </div>
            </motion.div>

            {/* Stat grid */}
            <div className="grid grid-cols-2 gap-3">
              {stats.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.55, delay: 0.2 + i * 0.08 }}
                  className="bg-ivory border border-mist p-6 md:p-7 rounded-2xl group hover:bg-teal-deep hover:border-teal/30 transition-all duration-300 hover:shadow-xl hover:shadow-teal/15"
                >
                  <span className="font-serif text-copper text-4xl md:text-5xl font-bold leading-none block mb-2 group-hover:text-copper-light transition-colors duration-300">
                    {s.value}
                  </span>
                  <p className="font-sans text-teal-deep text-sm font-semibold leading-tight group-hover:text-ivory-warm transition-colors duration-300">
                    {s.label}
                  </p>
                  <p className="font-sans text-muted-teal text-xs group-hover:text-stone-teal/50 transition-colors duration-300 mt-0.5">
                    {s.sub}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
