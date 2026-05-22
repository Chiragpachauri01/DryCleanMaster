"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const reviews = [
  {
    name: "Siddharth",
    location: "New Delhi",
    text: "Our 7-seater fabric sofa had severe dust accumulation built up over two years. The Dry Clean Master team cleaned it via their wet extraction process. It looks completely brand new — I couldn't believe the transformation.",
    service: "Sofa Wet Cleaning",
  },
  {
    name: "Pooja",
    location: "Rohini",
    text: "They managed to remove a tough coffee stain from my premium imported wool carpet that I thought was permanent. Highly impressed by their fabric shampoo treatment and the technician's expertise.",
    service: "Carpet Shampoo Cleaning",
  },
  {
    name: "Rahul",
    location: "West Delhi",
    text: "Very professional team. They inspected the fabric first and suggested dry cleaning for my velvet headboard instead of harsh wet washing. Exceptional knowledge about fabric care — no one in Delhi offers this level of expertise.",
    service: "Chair & Upholstery Dry Cleaning",
  },
  {
    name: "Namit Yadav",
    location: "Karol Bagh",
    text: "Booked them for car dry cleaning and mattress sanitization. Quick, seamless, on-time doorstep service with no messy water left behind. My car's fabric roof and seats feel like they just came from the showroom.",
    service: "Car Dry Cleaning + Mattress",
  },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const prev = useCallback(() => setActive((a) => (a === 0 ? reviews.length - 1 : a - 1)), []);
  const next = useCallback(() => setActive((a) => (a === reviews.length - 1 ? 0 : a + 1)), []);

  return (
    <section id="testimonials" className="bg-midnight py-20 md:py-28 fabric-texture" ref={ref}>
      <div className="max-w-5xl mx-auto px-4 md:px-8 lg:px-12">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.span
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            className="inline-flex items-center gap-2 mb-4 justify-center"
          >
            <span className="w-5 h-px bg-gold" />
            <span className="text-gold font-sans text-xs uppercase tracking-[0.2em] font-semibold">
              Client Reviews
            </span>
            <span className="w-5 h-px bg-gold" />
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="font-serif text-cream text-3xl md:text-4xl xl:text-5xl font-bold leading-[1.1]"
          >
            Trusted by Delhi&apos;s
            <br />
            <span className="italic font-normal text-stone/45">
              Most Discerning Homes
            </span>
          </motion.h2>
        </div>

        {/* Review card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative"
        >
          {/* Large quote mark */}
          <span className="absolute -top-4 left-0 font-serif text-gold/10 text-[8rem] leading-none select-none pointer-events-none">
            &ldquo;
          </span>

          <div className="relative bg-navy/60 border border-stone/10 p-8 md:p-12 min-h-[280px] flex flex-col justify-between">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className="text-gold fill-gold" />
                  ))}
                </div>

                {/* Quote text */}
                <blockquote className="font-serif text-cream text-xl md:text-2xl xl:text-[1.7rem] font-medium leading-snug mb-8 max-w-3xl">
                  &ldquo;{reviews[active].text}&rdquo;
                </blockquote>

                {/* Attribution */}
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div>
                    <p className="font-sans text-cream font-semibold text-sm">
                      {reviews[active].name}
                    </p>
                    <p className="font-sans text-stone/50 text-xs mt-0.5">
                      {reviews[active].location}
                    </p>
                  </div>
                  <span className="font-sans text-[11px] text-gold/60 uppercase tracking-[0.15em] border border-gold/20 px-3 py-1">
                    {reviews[active].service}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-6">
            {/* Dots */}
            <div className="flex gap-2">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`h-px transition-all duration-300 ${
                    i === active ? "w-8 bg-gold" : "w-4 bg-stone/30 hover:bg-stone/60"
                  }`}
                  aria-label={`Review ${i + 1}`}
                />
              ))}
            </div>

            {/* Arrows */}
            <div className="flex gap-2">
              <button
                onClick={prev}
                className="w-10 h-10 border border-stone/20 flex items-center justify-center text-stone/50 hover:border-gold/40 hover:text-gold transition-all duration-200"
                aria-label="Previous review"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={next}
                className="w-10 h-10 border border-stone/20 flex items-center justify-center text-stone/50 hover:border-gold/40 hover:text-gold transition-all duration-200"
                aria-label="Next review"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
