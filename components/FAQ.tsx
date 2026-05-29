"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    q: "How long does it take for the sofa to dry after cleaning?",
    a: "Drying time depends on the fabric and cleaning method used. Most sofas dry within 4–8 hours. We use a low-moisture process to avoid leaving the furniture wet for long.",
  },
  {
    q: "Do you provide doorstep service or take the furniture away?",
    a: "We provide complete on-site cleaning services at your home or office. There is no need to move or transport your sofa, carpet, or mattress anywhere.",
  },
  {
    q: "Are the cleaning products safe for children and pets?",
    a: "Yes. We use fabric-safe and eco-friendly cleaning solutions that are generally safe for homes with children and pets. There is also no strong chemical smell left behind after cleaning.",
  },
  {
    q: "Can old stains be removed completely?",
    a: "Many common stains like coffee, food spills, dust marks, and sweat stains can be removed or significantly reduced. However, very old or deep stains depend on the fabric type and stain condition.",
  },
  {
    q: "Can you safely clean delicate fabrics like velvet or suede?",
    a: "Yes. Delicate fabrics such as velvet, suede, chenille, and premium upholstery require special care. Our team inspects the fabric first and then selects the most suitable cleaning method.",
  },
  {
    q: "Does mattress cleaning help with allergies and odours?",
    a: "Professional mattress cleaning can help reduce dust, allergens, and unpleasant smells that build up over time, especially in mattresses that haven't been deep cleaned for a long period.",
  },
  {
    q: "Is same-day service available in Delhi NCR?",
    a: "Yes. Same-day service is available in many areas across Delhi NCR, depending on slot availability. Early bookings usually have a better chance of getting same-day service.",
  },
  {
    q: "Will the furniture smell damp or feel sticky after cleaning?",
    a: "No. Our extraction process removes excess moisture and residue properly, so the furniture feels fresh, clean, and comfortable after the service.",
  },
  {
    q: "Do carpets need to be removed for cleaning?",
    a: "Not always. Many carpets and rugs can be cleaned directly at your location. Our team checks the carpet condition and recommends the best cleaning process accordingly.",
  },
  {
    q: "How can I book a cleaning service?",
    a: "You can book a service through a phone call or WhatsApp. Our team will check the fabric condition, and then proceed with the appropriate cleaning treatment.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="faq" className="bg-ivory-warm py-20 md:py-28" ref={ref}>
      <div className="max-w-3xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.span
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            className="inline-flex items-center gap-2 mb-4 justify-center"
          >
            <span className="w-5 h-[2px] bg-teal rounded-full" />
            <span className="text-teal font-sans text-xs uppercase tracking-[0.2em] font-semibold">
              Frequently Asked
            </span>
            <span className="w-5 h-[2px] bg-teal rounded-full" />
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="font-serif text-teal-deep text-3xl md:text-4xl font-bold leading-[1.1]"
          >
            Questions We
            <br />
            <span className="italic font-normal text-charcoal/40">
              Get Asked Most
            </span>
          </motion.h2>
        </div>

        {/* Accordion */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.25 }}
          className="space-y-0 border-t border-stone-teal/20"
        >
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.05 * i + 0.3 }}
                className="border-b border-stone-teal/20"
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 py-5 md:py-6 text-left group"
                >
                  <span
                    className={`font-sans text-sm md:text-[0.95rem] font-medium leading-snug transition-colors duration-200 ${
                      isOpen ? "text-teal" : "text-charcoal/80 group-hover:text-teal"
                    }`}
                  >
                    {faq.q}
                  </span>
                  <span
                    className={`shrink-0 w-7 h-7 border rounded-lg flex items-center justify-center transition-all duration-300 ${
                      isOpen
                        ? "border-teal/60 bg-teal/10 text-teal"
                        : "border-stone-teal/40 text-charcoal/40 group-hover:border-teal/35 group-hover:text-teal"
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
                      <p className="font-sans text-sm text-slate-teal leading-relaxed pb-6 pr-10">
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
