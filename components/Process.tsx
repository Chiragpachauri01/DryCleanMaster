"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { CalendarCheck } from "lucide-react";

const steps = [
  {
    num: "01",
    title: "Schedule Online",
    desc: "Choose your service and book a slot in under 2 minutes — online or via WhatsApp.",
  },
  {
    num: "02",
    title: "Free Inspection",
    desc: "Our expert arrives at your door to assess fabric type, age, and stain severity. No obligations.",
  },
  {
    num: "03",
    title: "Custom Treatment",
    desc: "We prescribe either Low-Moisture Dry Cleaning or Deep Fabric Shampoo based on your furnishing.",
  },
  {
    num: "04",
    title: "Deep Extraction",
    desc: "Industrial machinery pulls stains and embedded dirt from the fiber core — not just the surface.",
  },
  {
    num: "05",
    title: "Sanitize & Handover",
    desc: "A final moisture check, sanitization pass, and your furnishing is handed back crisp and germ-free.",
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
              <span className="italic font-normal text-stone-teal/50">Master Service</span>
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
            rushed — each furnishing receives a bespoke treatment selected by
            our senior master technicians on-site.
          </motion.p>
        </div>

        {/* Banner image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative h-52 md:h-64 mb-16 overflow-hidden rounded-2xl"
        >
          <Image
            src="/img/process-extraction-banner.png"
            alt="Master technician at work — precision extraction cleaning"
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-teal-dark via-teal-dark/35 to-teal-dark/15" />
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
          <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-copper/60 to-transparent" />
        </motion.div>

        {/* Steps — vertical on mobile, horizontal dashed timeline on desktop */}
        <div className="relative">

          {/* Desktop: horizontal dashed line through dot centers */}
          <motion.div
            className="absolute top-3 left-3 right-3 h-px hidden md:block"
            style={{
              backgroundImage: "repeating-linear-gradient(to right, #C2732C66 0px, #C2732C66 8px, transparent 8px, transparent 18px)",
            }}
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          />

          {/* Mobile: vertical dashed line through dot centers */}
          <motion.div
            className="absolute left-3 top-3 bottom-3 w-px md:hidden"
            style={{
              backgroundImage: "repeating-linear-gradient(to bottom, #C2732C66 0px, #C2732C66 8px, transparent 8px, transparent 18px)",
            }}
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          />

          {/* Desktop: 5-column grid / Mobile: vertical list */}
          <div className="grid md:grid-cols-5 gap-0">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
                className="group flex md:flex-col gap-5 md:gap-0 pb-8 md:pb-0 last:pb-0"
              >
                {/* Dot */}
                <div className="relative z-10 shrink-0 w-6 h-6 rounded-full border-2 border-copper/55 bg-teal-dark group-hover:border-copper group-hover:bg-copper/15 transition-all duration-300 flex items-center justify-center md:mb-2.5">
                  <div className="w-2 h-2 rounded-full bg-copper/65 group-hover:bg-copper transition-colors duration-300" />
                </div>

                {/* Content */}
                <div className="flex flex-col md:block">
                  <span className="font-sans text-copper/50 text-[10px] font-bold uppercase tracking-[0.16em] mb-2 md:mb-3 group-hover:text-copper/85 transition-colors duration-300 block">
                    {step.num}
                  </span>
                  <h3 className="font-serif text-ivory-warm text-base md:text-[1.05rem] font-semibold mb-1.5 leading-snug">
                    {step.title}
                  </h3>
                  <p className="font-sans text-stone-teal/50 text-sm leading-relaxed group-hover:text-stone-teal/75 transition-colors duration-300">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-14 pt-10 border-t border-teal/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        >
          <p className="font-sans text-stone-teal/55 text-sm">
            Ready to restore your furnishings?
          </p>
          <a
            href="#contact"
            className="btn-primary inline-flex items-center gap-2.5 px-7 py-3 rounded-xl text-sm font-semibold"
          >
            <CalendarCheck size={15} />
            Book Free Inspection
          </a>
        </motion.div>

      </div>
    </section>
  );
}
