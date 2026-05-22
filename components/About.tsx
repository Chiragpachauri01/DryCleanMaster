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
    <section id="about" className="bg-cream py-20 md:py-28" ref={ref}>
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
              <span className="w-5 h-px bg-gold-dark" />
              <span className="text-gold-dark font-sans text-xs uppercase tracking-[0.2em] font-semibold">
                About Us
              </span>
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.1 }}
              className="font-serif text-midnight text-3xl md:text-4xl xl:text-[2.8rem] font-bold leading-[1.1] mb-6"
            >
              Delhi&apos;s Experts in
              <br />
              Premium Furnishing
              <br />
              <span className="italic font-normal text-charcoal/50">
                Care &amp; Restoration
              </span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.2 }}
              className="space-y-4"
            >
              <p className="font-sans text-charcoal/70 text-base leading-relaxed">
                Dry Clean Master was established to solve a massive problem: the
                lack of expert care for high-end home and office furnishings. We
                believe your expensive sofas, carpets, and upholstery
                shouldn&apos;t just be washed — they should be{" "}
                <span className="text-midnight font-semibold">
                  scientifically cleaned
                </span>
                .
              </p>
              <p className="font-sans text-charcoal/70 text-base leading-relaxed">
                Combining top-tier European extraction machinery with
                fabric-safe eco-luxury solvents, we provide an unmatched
                on-site cleaning experience across Delhi that no other local
                provider can replicate.
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
                "10+ years of specialization in furnishing restoration",
                "40+ certified on-site tech masters across Delhi",
                "12,000+ sofas & carpets deep cleaned",
                "Full coverage across Delhi NCR",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="mt-1.5 w-4 h-px bg-gold shrink-0" />
                  <span className="font-sans text-sm text-charcoal/75">{item}</span>
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
              className="relative h-72 md:h-80 overflow-hidden"
            >
              <Image
                src="/img/about-restored-living-room.png"
                alt="Premium luxury living room interior — Dry Clean Master"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              {/* Subtle overlay for editorial feel */}
              <div className="absolute inset-0 bg-gradient-to-t from-midnight/40 via-transparent to-transparent" />

              {/* Floating attribution */}
              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
                <div className="flex items-center gap-2 bg-midnight/70 backdrop-blur-sm px-3 py-2 border border-gold/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                  <span className="font-sans text-stone/80 text-[10px] uppercase tracking-[0.2em]">
                    On-Site Master Service
                  </span>
                </div>
                <span className="font-serif text-cream/80 text-xs italic hidden sm:inline">
                  — South Delhi residence
                </span>
              </div>
            </motion.div>

            {/* Stat grid */}
            <div className="grid grid-cols-2 gap-px bg-stone">
              {stats.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.55, delay: 0.2 + i * 0.08 }}
                  className="bg-cream p-6 md:p-7 group hover:bg-midnight transition-colors duration-300"
                >
                  <span className="font-serif text-gold text-4xl md:text-5xl font-bold leading-none block mb-2 group-hover:text-gold-light transition-colors duration-300">
                    {s.value}
                  </span>
                  <p className="font-sans text-midnight text-sm font-semibold leading-tight group-hover:text-cream transition-colors duration-300">
                    {s.label}
                  </p>
                  <p className="font-sans text-charcoal/50 text-xs group-hover:text-stone/50 transition-colors duration-300 mt-0.5">
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
