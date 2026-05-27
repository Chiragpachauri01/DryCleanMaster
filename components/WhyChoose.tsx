"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const features = [
  {
    num: "01",
    title: "Certified Furnishing Masters",
    desc: "Our technicians understand delicate fabrics — velvet, leather, suede, wool — and treat each one with precision protocols.",
  },
  {
    num: "02",
    title: "Advanced Extraction Tech",
    desc: "Industrial moisture-extraction machines pull embedded dirt from the deepest fiber layers that vacuums cannot reach.",
  },
  {
    num: "03",
    title: "Eco-Friendly Fabric Shampoos",
    desc: "100% biodegradable, non-toxic solutions that are completely safe for children and pets in the household.",
  },
  {
    num: "04",
    title: "Zero Chemical Residue",
    desc: "Our wet cleaning and fabric treatments leave no sticky chemicals or strong synthetic odors behind.",
  },
  {
    num: "05",
    title: "Transparent & Fixed Pricing",
    desc: "Premium pricing based purely on seat count or square footage. No surprise surcharges on the day of service.",
  },
  {
    num: "06",
    title: "12,000+ Homes Restored",
    desc: "Trusted by Delhi's premium high-rise apartments and corporate offices for consistent, showroom-quality results.",
  },
];

export default function WhyChoose() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="why" className="bg-teal-dark py-20 md:py-28 teal-texture" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
        {/* Top: two-column intro */}
        <div className="grid lg:grid-cols-[1fr_1.3fr] gap-12 mb-16 md:mb-20">
          {/* Left: heading block */}
          <div>
            <motion.span
              initial={{ opacity: 0, x: -12 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 mb-5"
            >
              <span className="w-2 h-2 rounded-full bg-copper" />
              <span className="text-copper font-sans text-xs uppercase tracking-[0.2em] font-semibold">
                Why Choose Us
              </span>
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.1 }}
              className="font-serif text-ivory-warm text-4xl md:text-5xl font-bold leading-[1.1] mb-0"
            >
              Why Delhi Homes
              <br />
              <span className="italic font-normal text-stone-teal/55">trust our</span>
              <br />
              <span className="text-teal-glow">Master Care</span>
            </motion.h2>
          </div>

          {/* Right: context paragraph */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.2 }}
            className="flex items-end"
          >
            <p className="font-sans text-stone-teal/60 text-base leading-relaxed border-l-[3px] border-copper/40 pl-6">
              Delhi&apos;s heavy dust and pollution settle deep inside your sofas,
              carpets, and curtains, breeding dust mites and bacteria. Regular
              vacuuming is not enough. At Dry Clean Master, we don&apos;t just
              clean — we restore your expensive upholstery to its pristine,
              showroom-like glory using scientifically validated processes.
            </p>
          </motion.div>
        </div>

        <div className="divider-copper mb-16 opacity-20" />

        {/* Feature list — editorial numbered grid */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-0">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.08 * i }}
              className="group relative p-7 border-b border-teal/15 md:border-r md:border-b last:border-b-0 hover:bg-teal/15 transition-colors duration-300"
              style={{
                borderRight:
                  (i + 1) % 2 === 0 && (i + 1) % 3 !== 0
                    ? "none"
                    : undefined,
              }}
            >
              {/* Number accent */}
              <span className="font-serif text-copper/30 text-6xl font-bold absolute top-4 right-5 leading-none select-none group-hover:text-copper/55 transition-colors duration-300">
                {f.num}
              </span>

              <div className="relative">
                <div className="w-4 h-[2px] bg-copper mb-5 rounded-full" />
                <h3 className="font-serif text-ivory-warm text-lg font-semibold mb-3 leading-snug">
                  {f.title}
                </h3>
                <p className="font-sans text-stone-teal/55 text-sm leading-relaxed">
                  {f.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
