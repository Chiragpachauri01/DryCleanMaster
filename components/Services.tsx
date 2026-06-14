"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";

const dryServices = [
  {
    num: "01",
    title: "Sofa Dry Cleaning",
    desc: "Your sofa is one of the most used pieces of furniture in your home, and hence, the most exposed to dust, spills, body oils, and stains. Designed for luxury fabric sofas including velvet, chenille, and microfiber, we remove embedded dust without wetting the fabric deeply, protecting the material and internal foam structure.",
    tag: "Velvet · Chenille · Microfiber",
    img: "/img/service-sofa-dry.webp",
    price: "₹299/seat",
    popular: true,
    href: "/sofa-dry-cleaning-delhi",
  },
  {
    num: "02",
    title: "Carpet Dry Cleaning",
    desc: "Delicate Persian rugs, Oriental carpets, and premium wool floor coverings need specialised care. Our dry cleaning services clean your organic upholstery without causing colour bleed or fibre damage. Your carpets are bound to look like new.",
    tag: "Persian · Oriental · Wool",
    img: "/img/service-carpet-dry.webp",
    price: "₹12/sq.ft",
    popular: false,
    href: "/carpet-cleaning-services-delhi",
  },
  {
    num: "03",
    title: "Chair & Upholstery Dry Cleaning",
    desc: "Your office chairs, dining chairs, headboards, and any other fabric-covered surfaces are cleaned with our precision dry cleaning techniques. We ensure to protect the foam padding and frame while thoroughly cleaning the outer fabric.",
    tag: "Office · Dining · Headboard",
    img: "/img/service-chair-upholstery.webp",
    price: "₹149/chair",
    popular: false,
  },
  {
    num: "04",
    title: "Mattress Dry Cleaning",
    desc: "Did you know that an uncleaned mattress can house millions of dust particles? Our deep extraction treatment targets dust mites and allergens from your premium foam and latex mattress. We clean memory foam, latex, orthopedic, hotel, and luxury bedroom mattresses.",
    tag: "Memory Foam · Latex · Orthopedic",
    img: "/img/service-mattress-dry.webp",
    price: "₹1,199/king",
    popular: false,
  },
  {
    num: "05",
    title: "Curtain Dry Cleaning",
    desc: "We clean your curtains right where they hang — no uninstalling, no transporting, no waiting for days. Our on-site low-moisture process works wonders for heavy drapes, silk curtains, blackout curtains, designer curtains, and office blinds.",
    tag: "Silk · Drapes · Blackout",
    img: "/img/service-curtain-dry.webp",
    price: "₹249/panel",
    popular: false,
  },
];

const wetServices = [
  {
    num: "01",
    title: "Sofa Wet Cleaning & Shampooing",
    desc: "High-foaming fabric shampoo treatment followed by powerful vacuum extraction to remove deep food stains, oil marks, and sweat odours. Ideal for heavily soiled sofas that need deep penetration cleaning beyond what dry methods can achieve.",
    tag: "Deep Stain · Oil · Odour",
    img: "/img/service-sofa-wet-shampoo.webp",
    price: "₹349/seat",
    popular: true,
  },
  {
    num: "02",
    title: "Carpet Shampoo Cleaning",
    desc: "Deep wet injection cleaning that penetrates heavy traffic areas of your carpet to revive compressed fibres and colours. Recommended for carpets with stubborn stains, embedded grime, or significant foot-traffic wear.",
    tag: "Heavy Traffic · Colour Revival",
    img: "/img/service-carpet-shampoo.webp",
    price: "₹15/sq.ft",
    popular: false,
    href: "/carpet-cleaning-services-delhi",
  },
  {
    num: "03",
    title: "Deep Wet Upholstery Treatment",
    desc: "Specialised water-based stain-dissolving treatment for highly soiled fabric linings and cushions. Our extraction process removes residue cleanly, leaving upholstery fresh and dry within hours.",
    tag: "Fabric Lining · Cushions",
    img: "/img/service-upholstery-wet.webp",
    price: "₹199/chair",
    popular: false,
  },
  {
    num: "04",
    title: "Fabric Shampoo Treatment",
    desc: "pH-balanced conditioning shampoo application that restores the natural softness and shine of luxury furnishing fabrics. Leaves no sticky residue and no harsh chemical smell after treatment.",
    tag: "pH-Balanced · Conditioning",
    img: "/img/service-fabric-shampoo.webp",
    price: "₹999+",
    popular: false,
  },
];

const WA_LINK =
  "https://wa.me/918882631413?text=Hi%2C%20I%20want%20to%20enquire%20about%20your%20cleaning%20services";

function ServiceCard({
  num,
  title,
  desc,
  tag,
  img,
  price,
  popular = false,
  dark = false,
  href,
  index,
  inView,
}: {
  num: string;
  title: string;
  desc: string;
  tag: string;
  img: string;
  price: string;
  popular?: boolean;
  dark?: boolean;
  href?: string;
  index: number;
  inView: boolean;
}) {
  const cls = `group relative border transition-all duration-300 overflow-hidden h-full flex flex-col rounded-xl ${
    href ? "cursor-pointer" : "cursor-default"
  } ${
    dark
      ? "border-teal/15 hover:border-copper/35 hover:shadow-lg hover:shadow-copper/12"
      : "border-mist hover:border-teal/40 hover:shadow-lg hover:shadow-teal/12"
  }`;

  const content = (
    <>
      {popular && (
        <div className="absolute top-3 right-3 z-10">
          <span className="font-sans text-[10px] bg-copper text-white font-semibold px-2.5 py-1 rounded-full shadow-sm">
            Most Popular
          </span>
        </div>
      )}
      <div className="relative h-44 overflow-hidden rounded-t-xl">
        <Image
          src={img}
          alt={title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-transparent" />
        <div
          className={`absolute top-4 left-4 w-10 h-10 flex items-center justify-center backdrop-blur-sm border rounded-lg ${
            dark
              ? "bg-teal-deep/60 border-copper/30 text-copper-light"
              : "bg-ivory/85 border-teal/30 text-teal"
          }`}
        >
          <span className="font-serif text-sm font-bold">{num}</span>
        </div>
      </div>
      <div
        className={`p-6 md:p-7 flex-1 flex flex-col transition-colors duration-300 ${
          dark
            ? "bg-teal-dark group-hover:bg-teal/20"
            : "bg-ivory-teal group-hover:bg-mist/50"
        }`}
      >
        <div className="w-4 h-[2px] bg-copper mb-4 rounded-full" />
        <h3 className={`font-serif text-lg font-semibold mb-3 leading-snug ${dark ? "text-ivory-warm" : "text-teal-deep"}`}>
          {title}
        </h3>
        <p className={`font-sans text-sm leading-relaxed mb-5 flex-1 ${dark ? "text-stone-teal/55" : "text-slate-teal/75"}`}>
          {desc}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <span className={`font-sans text-[11px] uppercase tracking-[0.12em] ${dark ? "text-stone-teal/40" : "text-muted-teal/60"}`}>
              {tag}
            </span>
            <span className={`font-sans text-xs font-semibold ${dark ? "text-copper-light" : "text-copper"}`}>
              Starting {price}
            </span>
          </div>
          <ArrowRight
            size={14}
            className={`opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 group-hover:translate-x-0 ${dark ? "text-copper-light" : "text-teal"}`}
          />
        </div>
      </div>
    </>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.07 * index }}
    >
      {href ? (
        <Link href={href} className={cls}>{content}</Link>
      ) : (
        <div className={cls}>{content}</div>
      )}
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
      {/* ── Category A: Dry Cleaning (light teal) ── */}
      <div className="bg-ivory py-20 md:py-28" ref={dryRef}>
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
          {/* Section header */}
          <div className="grid lg:grid-cols-[1.2fr_1fr] gap-8 mb-14">
            <div>
              <motion.span
                initial={{ opacity: 0 }}
                animate={dryInView ? { opacity: 1 } : {}}
                className="inline-flex items-center gap-2 mb-4"
              >
                <span className="w-5 h-[2px] bg-teal rounded-full" />
                <span className="text-teal font-sans text-xs uppercase tracking-[0.2em] font-semibold">
                  Category A
                </span>
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 18 }}
                animate={dryInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="font-serif text-teal-deep text-3xl md:text-4xl xl:text-5xl font-bold leading-[1.1]"
              >
                Luxury Dry
                <br />
                <span className="italic font-normal text-charcoal/45">Cleaning Services</span>
              </motion.h2>
            </div>
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={dryInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="self-end font-sans text-slate-teal/70 text-sm leading-relaxed border-l-[3px] border-teal/25 pl-5"
            >
              Low-moisture, fabric-safe treatments engineered for delicate and
              luxury furnishing materials. Zero wet residue, zero fabric stress.
            </motion.p>
          </div>

          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
            {dryServices.map((s, i) => (
              <ServiceCard key={i} {...s} index={i} inView={dryInView} />
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
              className="inline-flex items-center gap-2 btn-primary font-sans text-sm px-8 py-3.5"
            >
              Enquire About Dry Cleaning
              <ArrowRight size={14} />
            </a>
          </motion.div>
        </div>
      </div>

      {/* ── Category B: Wet Cleaning (dark teal) ── */}
      <div className="bg-teal-deep py-20 md:py-28 teal-texture" ref={wetRef}>
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
          <div className="grid lg:grid-cols-[1.2fr_1fr] gap-8 mb-14">
            <div>
              <motion.span
                initial={{ opacity: 0 }}
                animate={wetInView ? { opacity: 1 } : {}}
                className="inline-flex items-center gap-2 mb-4"
              >
                <span className="w-5 h-[2px] bg-copper rounded-full" />
                <span className="text-copper font-sans text-xs uppercase tracking-[0.2em] font-semibold">
                  Category B
                </span>
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 18 }}
                animate={wetInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="font-serif text-ivory-warm text-3xl md:text-4xl xl:text-5xl font-bold leading-[1.1]"
              >
                Advanced Wet
                <br />
                <span className="italic font-normal text-stone-teal/40">Cleaning Services</span>
              </motion.h2>
            </div>
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={wetInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="self-end font-sans text-stone-teal/55 text-sm leading-relaxed border-l-[3px] border-copper/25 pl-5"
            >
              Deep-penetration shampoo and extraction treatments for heavily
              soiled furnishings. Industrial precision, zero chemical aftermath.
            </motion.p>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            {wetServices.map((s, i) => (
              <ServiceCard key={i} {...s} dark index={i} inView={wetInView} />
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
              className="inline-flex items-center gap-2 btn-whatsapp font-sans text-sm px-8 py-3.5"
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
