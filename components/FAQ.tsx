"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    q: "What is included in Sofa Dry Cleaning?",
    a: "It includes deep high-power vacuuming, fabric type testing, application of low-moisture eco-solvents, subtle stain scrubbing, and a final fabric grooming and deodorizing step.",
  },
  {
    q: "How long does a sofa wet shampoo treatment take to dry?",
    a: "After our high-power moisture extraction process, sofas typically take around 3 to 5 hours to dry completely under normal ceiling fans. We advise keeping fans running and avoiding sitting on the sofa during this period.",
  },
  {
    q: "Is your fabric shampoo safe for silk or velvet upholstery?",
    a: "Yes. We utilize custom pH-balanced, non-ionic fabric shampoos specifically engineered to protect luxury fibers like velvet and silk from color bleeding, fiber stress, and texture damage.",
  },
  {
    q: "Do you bring your own heavy cleaning machinery?",
    a: "Yes, our technicians travel with professional industrial extraction systems, HEPA vacuum cleaners, and a complete premium chemical kit. You do not need to arrange anything.",
  },
  {
    q: "How often should I dry clean my carpets and mattresses?",
    a: "For a healthy, dust-allergy-free home in a dust-heavy city like Delhi, we highly recommend professional cleaning once every 6 months — or every 3 months if you have young children or pets.",
  },
  {
    q: "Will wet cleaning damage wooden parts of my chairs or sofas?",
    a: "Absolutely not. Our technicians mask and protect all wooden, metallic, or chrome borders and legs before applying any fluid. The treatment is precision-targeted at fabric surfaces only.",
  },
  {
    q: "What is your Free Inspection Visit policy?",
    a: "Our senior master technician visits your location to analyze the exact fabric parameters, age, and stain type, and provides an accurate quote with zero booking obligations. You decide after seeing the quote.",
  },
  {
    q: "Can you remove deep-set pet urine odors from mattresses?",
    a: "Yes. Our specialized deep wet cleaning extraction combined with bio-enzymatic deodorizers neutralizes extreme organic odors effectively, including pet urine, sweat, and food odors.",
  },
  {
    q: "Are your cleaning chemicals safe for toddlers and pets?",
    a: "Yes, we use strictly non-toxic, eco-luxury biodegradable solutions that leave zero hazardous fumes or sticky residues behind. All solutions are third-party certified safe.",
  },
  {
    q: "How do I book an on-site service?",
    a: "You can book instantly by using our website contact form, giving us a direct call at +91 8882625522, or tapping our WhatsApp button. We confirm slots within minutes.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="faq" className="bg-cream py-20 md:py-28" ref={ref}>
      <div className="max-w-3xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.span
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            className="inline-flex items-center gap-2 mb-4 justify-center"
          >
            <span className="w-5 h-px bg-gold-dark" />
            <span className="text-gold-dark font-sans text-xs uppercase tracking-[0.2em] font-semibold">
              Frequently Asked
            </span>
            <span className="w-5 h-px bg-gold-dark" />
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="font-serif text-midnight text-3xl md:text-4xl font-bold leading-[1.1]"
          >
            Questions We
            <br />
            <span className="italic font-normal text-charcoal/45">
              Get Asked Most
            </span>
          </motion.h2>
        </div>

        {/* Accordion */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.25 }}
          className="space-y-0 border-t border-stone"
        >
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.05 * i + 0.3 }}
                className="border-b border-stone"
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 py-5 md:py-6 text-left group"
                >
                  <span
                    className={`font-sans text-sm md:text-[0.95rem] font-medium leading-snug transition-colors duration-200 ${
                      isOpen ? "text-midnight" : "text-charcoal/80 group-hover:text-midnight"
                    }`}
                  >
                    {faq.q}
                  </span>
                  <span
                    className={`shrink-0 w-6 h-6 border flex items-center justify-center transition-all duration-300 ${
                      isOpen
                        ? "border-gold/60 bg-gold/10 text-gold-dark"
                        : "border-stone/60 text-charcoal/40 group-hover:border-gold/40 group-hover:text-gold-dark"
                    }`}
                  >
                    {isOpen ? <Minus size={12} /> : <Plus size={12} />}
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] as const }}
                      className="overflow-hidden"
                    >
                      <p className="font-sans text-sm text-charcoal/65 leading-relaxed pb-6 pr-10">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
