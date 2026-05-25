"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

const steps = [
  {
    num: "01",
    title: "Schedule Online",
    desc: "Choose your cleaning service and book a convenient slot online or via WhatsApp. Takes under two minutes.",
    accent: "Book Anytime",
  },
  {
    num: "02",
    title: "Free In-Person Inspection",
    desc: "Our expert arrives at your doorstep to inspect fabric type, age, and stain severity before starting. No obligations.",
    accent: "Zero Commitment",
  },
  {
    num: "03",
    title: "Custom Treatment Selection",
    desc: "We determine whether your furnishing requires Low-Moisture Dry Cleaning or Deep Fabric Shampoo Wet Cleaning.",
    accent: "Tailored Protocol",
  },
  {
    num: "04",
    title: "Deep Extraction Cleaning",
    desc: "Our team uses specialized industrial machinery to lift stains, embedded dirt, and shampoo residues cleanly from the fiber core.",
    accent: "Industrial Precision",
  },
  {
    num: "05",
    title: "Final Sanitize & Handover",
    desc: "We conduct a final moisture inspection and pass your furnishing back to you crisp, fresh, and germ-free.",
    accent: "Verified Clean",
  },
];

export default function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="process" className="bg-teal-dark py-20 md:py-28 teal-texture" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
        {/* Header */}
        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-10 mb-16">
          <div>
            <motion.span
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              className="inline-flex items-center gap-2 mb-5"
            >
              <span className="w-2 h-2 rounded-full bg-copper" />
              <span className="text-copper font-sans text-xs uppercase tracking-[0.2em] font-semibold">
                Our Process
              </span>
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.1 }}
              className="font-serif text-ivory-warm text-3xl md:text-4xl xl:text-5xl font-bold leading-[1.1]"
            >
              How Our
              <br />
              <span className="italic font-normal text-stone-teal/50">
                Master Service
              </span>
              <br />
              <span className="text-teal-glow">Works</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="self-end font-sans text-stone-teal/55 text-base leading-relaxed border-l-[3px] border-copper/30 pl-6"
          >
            Every visit follows a precise five-step methodology. Nothing is
            rushed. Every furnishing receives a bespoke treatment selected by
            our senior master technicians on-site.
          </motion.p>
        </div>

        {/* Editorial process banner image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="relative h-52 md:h-64 mb-16 overflow-hidden rounded-2xl"
        >
          <Image
            src="/img/process-extraction-banner.png"
            alt="Master technician at work — precision extraction cleaning process"
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-teal-dark via-teal-dark/35 to-teal-dark/15" />
          <div className="absolute inset-0 teal-texture opacity-15" />

          {/* Editorial overlay text */}
          <div className="absolute inset-0 flex items-center px-8 md:px-12">
            <div className="max-w-md">
              <div className="w-6 h-[2px] bg-copper mb-3 rounded-full" />
              <p className="font-serif text-ivory-warm text-xl md:text-2xl font-medium leading-snug mb-2">
                Every fiber, every stain,
                <br />
                <em className="text-copper-light font-normal">handled with precision.</em>
              </p>
              <p className="font-sans text-stone-teal/55 text-[11px] uppercase tracking-[0.2em]">
                Industrial Extraction · European Equipment
              </p>
            </div>
          </div>

          {/* Bottom copper accent */}
          <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-copper/60 to-transparent" />
        </motion.div>

        {/* Steps: staggered vertical layout with connecting line */}
        <div className="relative">
          {/* Vertical connector line */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
            className="absolute left-[1.95rem] top-8 bottom-8 w-px bg-copper/20 origin-top hidden md:block"
          />

          <div className="space-y-0">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.15 + i * 0.12 }}
                className={`group flex gap-6 md:gap-10 items-start py-8 border-b border-teal/12 last:border-0 ${
                  i % 2 !== 0 ? "md:pl-16" : ""
                }`}
              >
                {/* Step circle */}
                <div className="shrink-0 relative">
                  <div className="w-16 h-16 rounded-full border-2 border-copper/25 flex items-center justify-center bg-teal-dark group-hover:border-copper/55 group-hover:bg-copper/10 transition-all duration-300">
                    <span className="font-serif text-copper-light text-lg font-bold">
                      {step.num}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 pt-2">
                  <div className="flex flex-wrap items-baseline gap-3 mb-2">
                    <h3 className="font-serif text-ivory-warm text-xl md:text-2xl font-semibold">
                      {step.title}
                    </h3>
                    <span className="font-sans text-[11px] text-teal-glow/70 uppercase tracking-[0.12em] bg-teal/12 border border-teal/20 px-2.5 py-0.5 rounded-full">
                      {step.accent}
                    </span>
                  </div>
                  <p className="font-sans text-stone-teal/55 text-sm md:text-base leading-relaxed max-w-xl">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
