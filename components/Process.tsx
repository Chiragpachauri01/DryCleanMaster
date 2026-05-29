"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { CalendarCheck } from "lucide-react";

const steps = [
  {
    num: "01",
    title: "Schedule Online or via WhatsApp",
    desc: "Choose your service, pick a convenient time slot, and confirm your booking in under two minutes. Our WhatsApp booking line is always active.",
  },
  {
    num: "02",
    title: "Free In-Person Inspection",
    desc: "Before anything is cleaned, our expert arrives and physically inspects your furnishings — fabric type, furniture age, stain severity, moisture sensitivity, and upholstery condition. This gives you a transparent, accurate price quote with no obligation.",
  },
  {
    num: "03",
    title: "Custom Treatment Selection",
    desc: "Based on the inspection, we determine whether your furnishing needs low-moisture dry cleaning, deep fabric shampoo wet cleaning, specialised stain removal, odour neutralisation, or sanitisation treatments.",
  },
  {
    num: "04",
    title: "Deep Extraction Cleaning",
    desc: "Our team uses industrial-grade machinery specialised in lifting stains, embedded dirt, and residual cleaning agents cleanly and efficiently from the deepest layers of your upholstery.",
  },
  {
    num: "05",
    title: "Final Sanitise and Handover",
    desc: "We do a final moisture check, a visual quality inspection, and hand over your freshly restored furnishing that is crisp, odour-free, and sanitised.",
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

        {/* Steps — vertical connected timeline */}
        <div>
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.12 }}
              className="flex gap-5 md:gap-7"
            >
              {/* Left col: numbered circle + connector line */}
              <div className="flex flex-col items-center shrink-0 pt-6 md:pt-7">
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={inView ? { scale: 1, opacity: 1 } : {}}
                  transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.22 + i * 0.12 }}
                  className="w-11 h-11 rounded-full bg-copper/15 border-2 border-copper/50 flex items-center justify-center shrink-0 group-hover:bg-copper/25"
                >
                  <span className="font-serif text-copper-light text-sm font-bold leading-none">
                    {step.num}
                  </span>
                </motion.div>

                {i < steps.length - 1 && (
                  <motion.div
                    className="w-[2px] flex-1 min-h-[32px] rounded-full mt-2"
                    style={{ background: "linear-gradient(to bottom, #C2732C66, #C2732C18)" }}
                    initial={{ scaleY: 0, transformOrigin: "top" }}
                    animate={inView ? { scaleY: 1 } : {}}
                    transition={{ duration: 0.7, delay: 0.38 + i * 0.12, ease: "easeOut" }}
                  />
                )}
              </div>

              {/* Right col: content card */}
              <div className={`flex-1${i < steps.length - 1 ? " pb-6" : ""}`}>
                <div className="group bg-white/[0.04] border border-teal/15 rounded-xl p-6 md:p-7 hover:bg-teal/12 hover:border-copper/28 transition-all duration-300">
                  <h3 className="font-serif text-ivory-warm text-lg font-semibold mb-2.5 leading-snug">
                    {step.title}
                  </h3>
                  <p className="font-sans text-stone-teal/55 text-sm leading-relaxed group-hover:text-stone-teal/75 transition-colors duration-300">
                    {step.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
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
