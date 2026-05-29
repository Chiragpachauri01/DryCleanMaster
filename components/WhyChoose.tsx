"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const features = [
  {
    title: "Certified Furnishing Masters on Every Job",
    desc: "Our technicians aren't just 'cleaning guys'. They are trained and certified in handling delicate fabrics, including velvet, leather, suede, wool, and silk. They know exactly which treatment each material needs before a single drop of solution is applied.",
  },
  {
    title: "Advanced Industrial Extraction Machines",
    desc: "We don't use your home equipment or jerry-rig any pipes. Our equipment is industry-standard, pulling dirt and bacteria from the deepest layers of your furniture upholstery. A regular vacuum does not reach those layers.",
  },
  {
    title: "Eco-Friendly and Family-Safe Cleaning Solutions",
    desc: "All our cleaning agents are 100% safe and biodegradable, suitable for children, pets, elderly family members, and family members with health conditions. No odour or sticky residue is left behind after cleaning.",
  },
  {
    title: "Zero Residue Cleaning Process",
    desc: "Many low-quality cleaning methods leave fabrics damp and sticky after cleaning. Our specialised extraction systems remove excess moisture and cleaning agents from deep inside the fabric, leaving them fresh, soft, and residue-free.",
  },
  {
    title: "Transparent and Fixed Prices",
    desc: "Our dry cleaning services prices are calculated based on square footage or seat count. We impose no hidden surcharges or spring up no surprise bills at the end. What you see in the quote is what you pay.",
  },
  {
    title: "12,000+ Homes and Offices Restored Across Delhi",
    desc: "From premium high-rise apartments in South Delhi to corporate offices in Connaught Place, we have restored furnishings across the entire city, with satisfied customers who hire us again and again.",
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
              Despite there being plenty of cleaning companies in Delhi,
              homeowners and corporate clients consistently choose us. Here&apos;s
              what sets our service apart: certified masters, industrial-grade
              machines, family-safe solutions, and a zero-residue process that
              actually protects your expensive furnishings.
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
              className="group p-7 border-b border-teal/15 md:border-r md:border-b last:border-b-0 hover:bg-teal/15 transition-colors duration-300"
              style={{
                borderRight:
                  (i + 1) % 2 === 0 && (i + 1) % 3 !== 0
                    ? "none"
                    : undefined,
              }}
            >
              <div className="w-4 h-[2px] bg-copper mb-5 rounded-full" />
              <h3 className="font-serif text-ivory-warm text-lg font-semibold mb-3 leading-snug">
                {f.title}
              </h3>
              <p className="font-sans text-stone-teal/55 text-sm leading-relaxed">
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
