"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";

const dryServices = [
  {
    num: "01",
    title: "Sofa Dry Cleaning",
    desc: "Specialized low-moisture treatment for luxury velvet, suede, and premium leather sofas to remove dust and stains without fabric damage.",
    tag: "Velvet · Leather · Suede",
    img: "/img/service-sofa-dry.png",
  },
  {
    num: "02",
    title: "Carpet Dry Cleaning",
    desc: "Organic compound dry cleaning process designed for premium Persian, Oriental, and delicate wool rugs.",
    tag: "Persian · Oriental · Wool",
    img: "/img/service-carpet-dry.png",
  },
  {
    num: "03",
    title: "Chair & Upholstery",
    desc: "Precision dry care for premium office chairs, dining chairs, headboards, and fabric panels without harsh chemicals.",
    tag: "Office · Dining · Headboard",
    img: "/img/service-chair-upholstery.png",
  },
  {
    num: "04",
    title: "Mattress Dry Cleaning",
    desc: "Deep dust-mite and allergen extraction treatment for premium memory foam and latex mattresses.",
    tag: "Memory Foam · Latex · Spring",
    img: "/img/service-mattress-dry.png",
  },
  {
    num: "05",
    title: "Curtain Dry Cleaning",
    desc: "On-site low-moisture cleaning for heavy drapes, silk curtains, and blackout blinds without removing them from the rods.",
    tag: "Silk · Drapes · Blackout",
    img: "/img/service-curtain-dry.png",
  },
  {
    num: "06",
    title: "Car Dry Cleaning",
    desc: "Complete internal restoration of premium car seats, roof fabric, door panels, and floor carpets.",
    tag: "Sedan · SUV · Luxury",
    img: "/img/service-car-dry.png",
  },
];

const wetServices = [
  {
    num: "01",
    title: "Sofa Wet Cleaning & Shampooing",
    desc: "High-foaming fabric shampoo treatment followed by powerful vacuum extraction to remove deep food stains, oil marks, and sweat odors.",
    tag: "Deep Stain · Oil · Odor",
    img: "/img/service-sofa-wet-shampoo.png",
  },
  {
    num: "02",
    title: "Carpet Shampoo Cleaning",
    desc: "Deep wet injection cleaning that penetrates heavy traffic areas of your carpet to revive compressed fibers and colors.",
    tag: "Heavy Traffic · Color Revival",
    img: "/img/service-carpet-shampoo.png",
  },
  {
    num: "03",
    title: "Deep Wet Upholstery Treatment",
    desc: "Specialized water-based stain-dissolving treatment for highly soiled fabric linings and cushions.",
    tag: "Fabric Lining · Cushions",
    img: "/img/service-upholstery-wet.png",
  },
  {
    num: "04",
    title: "Fabric Shampoo Treatment",
    desc: "pH-balanced conditioning shampoo application that restores the natural softness and shine of luxury furnishing fabrics.",
    tag: "pH-Balanced · Conditioning",
    img: "/img/service-fabric-shampoo.png",
  },
];

const WA_LINK =
  "https://wa.me/918882625522?text=Hi%2C%20I%20want%20to%20enquire%20about%20your%20cleaning%20services";

function ServiceCard({
  num,
  title,
  desc,
  tag,
  img,
  dark = false,
  index,
  inView,
}: {
  num: string;
  title: string;
  desc: string;
  tag: string;
  img: string;
  dark?: boolean;
  index: number;
  inView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.07 * index }}
      className={`group relative border transition-all duration-300 cursor-default overflow-hidden h-full flex flex-col ${
        dark
          ? "border-stone/10 hover:border-gold/30"
          : "border-stone/40 hover:border-gold/50"
      }`}
    >
      {/* Image header */}
      <div className="relative h-44 overflow-hidden">
        <Image
          src={img}
          alt={title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div
          className={`absolute inset-0 transition-opacity duration-300 ${
            dark
              ? "bg-gradient-to-t from-midnight via-midnight/60 to-midnight/30 group-hover:from-midnight/95"
              : "bg-gradient-to-t from-pearl via-pearl/30 to-transparent group-hover:from-pearl/95"
          }`}
        />
        {/* Floating number badge */}
        <div
          className={`absolute top-4 left-4 w-10 h-10 flex items-center justify-center backdrop-blur-sm border ${
            dark
              ? "bg-midnight/60 border-gold/30 text-gold"
              : "bg-pearl/80 border-gold-dark/40 text-gold-dark"
          }`}
        >
          <span className="font-serif text-sm font-bold">{num}</span>
        </div>
      </div>

      {/* Content */}
      <div
        className={`p-6 md:p-7 flex-1 flex flex-col transition-colors duration-300 ${
          dark
            ? "bg-midnight group-hover:bg-navy-light/30"
            : "bg-pearl group-hover:bg-stone/30"
        }`}
      >
        <div className="w-3 h-px bg-gold mb-4" />
        <h3
          className={`font-serif text-lg font-semibold mb-3 leading-snug ${
            dark ? "text-cream" : "text-midnight"
          }`}
        >
          {title}
        </h3>
        <p
          className={`font-sans text-sm leading-relaxed mb-5 flex-1 ${
            dark ? "text-stone/55" : "text-charcoal/65"
          }`}
        >
          {desc}
        </p>

        <div className="flex items-center justify-between">
          <span
            className={`font-sans text-[11px] uppercase tracking-[0.15em] ${
              dark ? "text-gold/50" : "text-gold-dark/60"
            }`}
          >
            {tag}
          </span>
          <ArrowRight
            size={13}
            className={`opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 group-hover:translate-x-0 ${
              dark ? "text-gold" : "text-gold-dark"
            }`}
          />
        </div>
      </div>
    </motion.div>
  );
}

export default function Services() {
  const dryRef = useRef<HTMLDivElement>(null);
  const wetRef = useRef<HTMLDivElement>(null);
  const dryInView = useInView(dryRef, { once: true, margin: "-60px" });
  const wetInView = useInView(wetRef, { once: true, margin: "-60px" });

  return (
    <section id="services">
      {/* ── Category A: Dry Cleaning (light) ── */}
      <div className="bg-pearl py-20 md:py-28" ref={dryRef}>
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
          {/* Section header */}
          <div className="grid lg:grid-cols-[1.2fr_1fr] gap-8 mb-14">
            <div>
              <motion.span
                initial={{ opacity: 0 }}
                animate={dryInView ? { opacity: 1 } : {}}
                className="inline-flex items-center gap-2 mb-4"
              >
                <span className="w-5 h-px bg-gold-dark" />
                <span className="text-gold-dark font-sans text-xs uppercase tracking-[0.2em] font-semibold">
                  Category A
                </span>
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 18 }}
                animate={dryInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="font-serif text-midnight text-3xl md:text-4xl xl:text-5xl font-bold leading-[1.1]"
              >
                Luxury Dry
                <br />
                <span className="italic font-normal text-charcoal/50">Cleaning Services</span>
              </motion.h2>
            </div>
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={dryInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="self-end font-sans text-charcoal/60 text-sm leading-relaxed border-l border-gold/30 pl-5"
            >
              Low-moisture, fabric-safe treatments engineered for delicate and
              luxury furnishing materials. Zero wet residue, zero fabric stress.
            </motion.p>
          </div>

          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-px bg-stone/40">
            {dryServices.map((s, i) => (
              <div key={i} className="bg-pearl">
                <ServiceCard {...s} index={i} inView={dryInView} />
              </div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={dryInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
            className="mt-10 flex justify-center"
          >
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-midnight/25 text-midnight font-sans font-medium text-sm px-7 py-3 rounded-sm hover:bg-midnight hover:text-cream hover:border-midnight transition-all duration-300"
            >
              Enquire About Dry Cleaning
              <ArrowRight size={14} />
            </a>
          </motion.div>
        </div>
      </div>

      {/* ── Category B: Wet Cleaning (dark) ── */}
      <div className="bg-midnight py-20 md:py-28 fabric-texture" ref={wetRef}>
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
          <div className="grid lg:grid-cols-[1.2fr_1fr] gap-8 mb-14">
            <div>
              <motion.span
                initial={{ opacity: 0 }}
                animate={wetInView ? { opacity: 1 } : {}}
                className="inline-flex items-center gap-2 mb-4"
              >
                <span className="w-5 h-px bg-gold" />
                <span className="text-gold font-sans text-xs uppercase tracking-[0.2em] font-semibold">
                  Category B
                </span>
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 18 }}
                animate={wetInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="font-serif text-cream text-3xl md:text-4xl xl:text-5xl font-bold leading-[1.1]"
              >
                Advanced Wet
                <br />
                <span className="italic font-normal text-stone/40">Cleaning Services</span>
              </motion.h2>
            </div>
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={wetInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="self-end font-sans text-stone/55 text-sm leading-relaxed border-l border-gold/20 pl-5"
            >
              Deep-penetration shampoo and extraction treatments for heavily
              soiled furnishings. Industrial precision, zero chemical aftermath.
            </motion.p>
          </div>

          <div className="grid sm:grid-cols-2 gap-px bg-stone/10">
            {wetServices.map((s, i) => (
              <div key={i} className="bg-midnight">
                <ServiceCard {...s} dark index={i} inView={wetInView} />
              </div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={wetInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
            className="mt-10 flex justify-center"
          >
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-gold/30 text-gold font-sans font-medium text-sm px-7 py-3 rounded-sm hover:bg-gold hover:text-midnight transition-all duration-300"
            >
              Enquire About Wet Cleaning
              <ArrowRight size={14} />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
