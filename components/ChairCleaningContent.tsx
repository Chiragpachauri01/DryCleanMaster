"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  CheckCircle,
  Phone,
  MessageCircle,
  ChevronDown,
  Star,
  Clock,
  Award,
  Users,
  AlertCircle,
  ArrowRight,
  Zap,
  Wind,
  Shield,
  Droplets,
  ThumbsUp,
  Building2,
} from "lucide-react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

const todayISO = new Date().toISOString().split("T")[0];
const PHONE = "tel:+918882631413";
const PHONE_DISPLAY = "+91 8882631413";
const WA_LINK =
  "https://wa.me/918882631413?text=Hi%2C%20I%20want%20to%20book%20office%20chair%20cleaning%20in%20Delhi";

function Tag({ children, light }: { children: string; light?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2 mb-4">
      <span className={`w-5 h-[2px] rounded-full ${light ? "bg-copper" : "bg-teal"}`} />
      <span
        className={`font-sans text-xs uppercase tracking-[0.2em] font-semibold ${
          light ? "text-copper-light" : "text-teal"
        }`}
      >
        {children}
      </span>
    </span>
  );
}

const faqs = [
  {
    q: "How long does a cleaned chair take to dry?",
    a: "A standard fabric chair takes 2-4 hours to dry, leather chairs are usable within 1-2 hours, thick velvet and heavily padded chairs may take up to 5-6 hours to dry.",
  },
  {
    q: "Can you remove the sweat smell from office chairs completely?",
    a: "Yes! Our anti-microbial treatment eliminates the bacterial source of the odour, not just the surface smell. However, chairs with severe odour buildup may need 2 sessions to eliminate it completely.",
  },
  {
    q: "Do you handle bulk office chair cleaning for businesses?",
    a: "Yes, bulk office chairs from 10 chairs upwards are a core part of our business. We would provide a team dedicated to large-volume jobs which can be completed in after-hours and weekend slots.",
  },
  {
    q: "Can you clean ergonomic mesh chairs?",
    a: "Yes, mesh chairs require a different approach than a fabric chair. It requires specialist tools to get into the mesh structure. Our technicians are specially trained for mesh chair cleaning.",
  },
  {
    q: "Is chair cleaning safe for expensive executive chairs?",
    a: "Yes, as we do fabric assessment before applying any product, our methods are safe for expensive executive chairs. We've cleaned executive chairs from Herman Miller, Haworth, Steelcase, and most premium brands without issue.",
  },
  {
    q: "How often should office chairs be professionally cleaned?",
    a: "For chairs in daily use, consider professional cleaning every 3-6 months. House chairs can be cleaned every 6-8 months. But if it is a chair in a co-working space, quarterly cleaning would be the best option.",
  },
  {
    q: "Do you offer same-day chair cleaning services?",
    a: "Yes, for most areas when booked before noon. WhatsApp us your location and quantity, and we will come and clean your chairs on the same day.",
  },
  {
    q: "Can you clean chairs without moving them from the workstation?",
    a: "Yes, our process is designed for on-site cleaning. We put protective floor covering around your chair and clean it on the spot. This helps us minimise the disturbance around other operations.",
  },
  {
    q: "Do you clean dining chairs with wooden legs and frames?",
    a: "We mask and protect all wooden, metal, and chrome elements before applying any cleaning products. No chemical comes in contact with any non-fabric surface.",
  },
  {
    q: "Do you provide receipts or service documentation for corporate clients?",
    a: "Yes, we provide service documentation for all commercial bookings.",
  },
];

export default function ChairCleaningContent() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [openProcess, setOpenProcess] = useState<number | null>(0);
  const [bookingForm, setBookingForm] = useState({
    name: "", phone: "", email: "", date: "", timeSlot: "", address: "", notes: "",
  });
  const [bookingSubmitted, setBookingSubmitted] = useState(false);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingError, setBookingError] = useState("");

  async function handleBookingSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBookingLoading(true);
    setBookingError("");
    try {
      await addDoc(collection(db, "bookings"), {
        ...bookingForm,
        service: "Chair Cleaning",
        createdAt: serverTimestamp(),
      });
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "booking", ...bookingForm, service: "Chair Cleaning" }),
      });
      if (!res.ok) throw new Error("email failed");
      setBookingSubmitted(true);
    } catch (err) {
      console.error("[chair-booking]", err);
      setBookingError("Booking saved! But confirmation email failed — we'll call you shortly.");
    } finally {
      setBookingLoading(false);
    }
  }

  const heroRef = useRef<HTMLDivElement>(null);
  const signsRef = useRef<HTMLDivElement>(null);
  const hygieneRef = useRef<HTMLDivElement>(null);
  const pricingRef = useRef<HTMLDivElement>(null);
  const comparisonRef = useRef<HTMLDivElement>(null);
  const typesRef = useRef<HTMLDivElement>(null);
  const situationsRef = useRef<HTMLDivElement>(null);
  const diyRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);
  const stainsRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const dryingRef = useRef<HTMLDivElement>(null);
  const businessRef = useRef<HTMLDivElement>(null);
  const competitorsRef = useRef<HTMLDivElement>(null);
  const perfectRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const bookingRef = useRef<HTMLDivElement>(null);

  const heroInView = useInView(heroRef, { once: true });
  const signsInView = useInView(signsRef, { once: true, margin: "-60px" });
  const hygieneInView = useInView(hygieneRef, { once: true, margin: "-60px" });
  const pricingInView = useInView(pricingRef, { once: true, margin: "-60px" });
  const comparisonInView = useInView(comparisonRef, { once: true, margin: "-60px" });
  const typesInView = useInView(typesRef, { once: true, margin: "-60px" });
  const situationsInView = useInView(situationsRef, { once: true, margin: "-60px" });
  const diyInView = useInView(diyRef, { once: true, margin: "-60px" });
  const processInView = useInView(processRef, { once: true, margin: "-60px" });
  const stainsInView = useInView(stainsRef, { once: true, margin: "-60px" });
  const resultsInView = useInView(resultsRef, { once: true, margin: "-60px" });
  const dryingInView = useInView(dryingRef, { once: true, margin: "-60px" });
  const businessInView = useInView(businessRef, { once: true, margin: "-60px" });
  const competitorsInView = useInView(competitorsRef, { once: true, margin: "-60px" });
  const perfectInView = useInView(perfectRef, { once: true, margin: "-60px" });
  const faqInView = useInView(faqRef, { once: true, margin: "-60px" });
  const ctaInView = useInView(ctaRef, { once: true, margin: "-60px" });
  const bookingInView = useInView(bookingRef, { once: true, margin: "-60px" });

  return (
    <main>

      {/* ── 1. HERO — Centered full-width (no split panel) ───────────────────── */}
      <section ref={heroRef} className="bg-teal-deep teal-texture">
        {/* Announcement strip */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={heroInView ? { opacity: 1, y: 0 } : {}}
          className="bg-copper/20 border-b border-copper/20 py-2 px-4 text-center"
        >
          <p className="font-sans text-copper-light text-xs font-semibold tracking-wider">
            ✔ Same-day service available &nbsp;·&nbsp; ✔ 24-hour service &nbsp;·&nbsp; ✔ 7 days a week &nbsp;·&nbsp; ✔ Doorstep across NCR
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto px-4 md:px-8 py-16 md:py-24 text-center">
          <motion.nav
            initial={{ opacity: 0 }}
            animate={heroInView ? { opacity: 1 } : {}}
            className="mb-6 flex items-center justify-center gap-2 text-stone-teal/50 text-xs font-sans"
          >
            <a href="/" className="hover:text-copper-light transition-colors">Home</a>
            <span>/</span>
            <span className="text-copper-light">Office Chair Cleaning Services in Delhi</span>
          </motion.nav>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.05 }}
            className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-6"
          >
            {[
              { icon: Star, label: "4.9/5 Rating" },
              { icon: Users, label: "12,000+ Chairs Cleaned" },
              { icon: Award, label: "Delhi's Most Trusted" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-1.5">
                <Icon size={13} className="text-copper" />
                <span className="font-sans text-stone-teal/75 text-xs">{label}</span>
              </div>
            ))}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="font-serif text-ivory-warm text-4xl md:text-5xl xl:text-6xl font-bold leading-[1.1] mb-4"
          >
            Office Chair Cleaning{" "}
            <span className="italic font-normal text-stone-teal/45">Services in Delhi NCR</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15 }}
            className="font-sans text-stone-teal/60 text-sm md:text-base mb-3 max-w-2xl mx-auto"
          >
            Deep Cleaning for Office, Gaming, Dining &amp; Commercial Chairs
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.18 }}
            className="font-sans text-stone-teal/65 text-sm leading-relaxed mb-8 max-w-2xl mx-auto"
          >
            Chair Cleaning is not a luxury; it is a basic hygiene need that most offices and homes in Delhi have been ignoring for years. Most chairs in Delhi NCR are dirtier than the floors, and surprisingly, we never realise it until either the smell becomes unbearable or someone else points it out. Before you have to undergo any embarrassment for an uncleaned chair, our professional office chair cleaning services are here to help you.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.22 }}
            className="flex flex-wrap justify-center gap-3 mb-10"
          >
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 btn-whatsapp font-sans text-sm px-7 py-3.5"
            >
              <MessageCircle size={15} />
              Book Office Chair Cleaning
            </a>
            <a
              href={PHONE}
              className="inline-flex items-center gap-2 font-sans text-sm px-7 py-3.5 border border-copper/40 text-copper-light rounded-lg hover:bg-copper/10 transition-colors"
            >
              <Phone size={15} />
              {PHONE_DISPLAY}
            </a>
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-sans text-xs text-stone-teal/55 hover:text-copper-light transition-colors"
            >
              <MessageCircle size={12} />
              WhatsApp Now
            </a>
          </motion.div>

          {/* Hero image — full width centered */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.25, duration: 0.7 }}
            className="relative w-full rounded-2xl overflow-hidden aspect-[16/7] border border-teal/20 shadow-2xl shadow-black/40"
          >
            <Image
              src="/img/office_images/21.webp"
              alt="Professional office chair cleaning service in Delhi NCR"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-teal-deep/70 via-teal-deep/20 to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 flex flex-wrap justify-center gap-4 md:gap-8">
              {[
                { val: "₹149", label: "Starting Price" },
                { val: "24hr", label: "Service Window" },
                { val: "2–4hr", label: "Fast Drying" },
                { val: "NCR", label: "Full Coverage" },
              ].map(({ val, label }) => (
                <div key={label} className="text-center">
                  <p className="font-serif text-copper-light text-xl md:text-2xl font-bold">{val}</p>
                  <p className="font-sans text-stone-teal/70 text-xs">{label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 2. WHAT PEOPLE NOTICE FIRST — Large numbered horizontal tiles ──────── */}
      <section ref={signsRef} className="bg-ivory py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
          <div className="max-w-2xl mb-14">
            <motion.div initial={{ opacity: 0, y: 18 }} animate={signsInView ? { opacity: 1, y: 0 } : {}}>
              <Tag>Warning Signs</Tag>
              <h2 className="font-serif text-teal-deep text-3xl md:text-4xl font-bold leading-tight mb-4">
                What People Usually{" "}
                <span className="italic font-normal text-charcoal/40">Notice First</span>
              </h2>
              <p className="font-sans text-slate-teal/70 text-sm leading-relaxed">
                A dirty chair is not a sudden realisation. It is about the small things you have been ignoring for a long time.
              </p>
            </motion.div>
          </div>

          {/* Large numbered tiles — staggered layout */}
          <div className="space-y-5">
            {[
              {
                num: "01",
                title: "The armrests look darker than the rest of the chair",
                body: "Your hands and forearms rest longer on the armrests. This means they absorb the most sweat. The dark patch you see is not the fabric colour; it is the contamination.",
                img: "/img/office_images/22.webp",
                reverse: false,
              },
              {
                num: "02",
                title: "A smell arrives when the room heats up",
                body: "As soon as the temperature rises, hidden odour comes out of your dirty upholstery. The odour is coming from the fabric where sweat and bacteria have been building up for a long time.",
                img: "/img/office_images/24.webp",
                reverse: true,
              },
              {
                num: "03",
                title: "The seat fabric feels sticky",
                body: "A new chair has a very soft fabric, but as the chair gets dirty, the fabric becomes rough and sticky. That's the sign that your chair has accumulated skin oils and dust, and needs cleaning.",
                img: "/img/office_images/25.webp",
                reverse: false,
              },
              {
                num: "04",
                title: "A dust cloud gets up as you sit down",
                body: "As soon as someone sits on the chair, a visible dust cloud rises. That's the embedded particulate matter that your chair has been absorbing from Delhi NCR's pollution for months.",
                img: "/img/office_images/27.webp",
                reverse: true,
              },
            ].map(({ num, title, body, img, reverse }, i) => (
              <motion.div
                key={num}
                initial={{ opacity: 0, y: 24 }}
                animate={signsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 * i, duration: 0.55 }}
                className={`flex flex-col md:flex-row ${reverse ? "md:flex-row-reverse" : ""} gap-0 border border-mist rounded-2xl overflow-hidden bg-ivory-teal hover:border-teal/30 transition-colors`}
              >
                {/* Number + text */}
                <div className="flex-1 p-7 md:p-10 flex gap-6 items-start">
                  <span className="font-serif text-5xl md:text-6xl font-bold text-teal/15 leading-none shrink-0 select-none">{num}</span>
                  <div>
                    <h3 className="font-serif text-teal-deep text-lg md:text-xl font-semibold mb-3 leading-snug">{title}</h3>
                    <p className="font-sans text-slate-teal/65 text-sm leading-relaxed">{body}</p>
                  </div>
                </div>
                {/* Image */}
                <div className="relative w-full md:w-64 lg:w-80 shrink-0 h-48 md:h-auto">
                  <Image src={img} alt={title} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-r from-ivory-teal/40 to-transparent md:from-transparent" />
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={signsInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.55 }}
            className="mt-10 flex flex-wrap gap-3"
          >
            <p className="font-sans text-slate-teal/70 text-sm">If you're noticing multiple signs together, it's probably time for professional chair cleaning.</p>
            <a href={PHONE} className="inline-flex items-center gap-1.5 font-sans text-sm text-teal font-semibold hover:text-teal-mid transition-colors">
              Call us if you see any of these signs <ArrowRight size={13} />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── 3. WHY CHAIRS BECOME HYGIENE PROBLEMS — Editorial 2-col ─────────── */}
      <section ref={hygieneRef} className="bg-teal-deep teal-texture py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
          <div className="grid lg:grid-cols-[420px_1fr] gap-12 items-start">
            {/* Left: editorial intro + image */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={hygieneInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <Tag light>The Science</Tag>
              <h2 className="font-serif text-ivory-warm text-3xl md:text-4xl font-bold leading-tight mb-5">
                Why Office Chairs Become{" "}
                <span className="italic font-normal text-stone-teal/40">Hygiene Problems</span>
              </h2>
              <p className="font-sans text-stone-teal/65 text-sm leading-relaxed mb-6">
                Imagine this: an employee sits in a chair for on average 8-10 hours, 5-6 days a week. That makes it over 2000 hours every year. Compared to your mattress that gets in human contact for 6-8 hours every day, your chair is the dirtiest upholstery in your office.
              </p>

              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] border border-teal/20 shadow-xl shadow-black/30">
                <Image
                  src="/img/office_images/offi6.webp"
                  alt="Office chair hygiene issues in Delhi"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-teal-deep/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 bg-teal-deep/80 backdrop-blur-sm rounded-xl p-3 border border-teal/20">
                  <p className="font-sans text-copper-light text-xs font-semibold">2000+ hours/year</p>
                  <p className="font-serif text-ivory-warm text-sm italic">Your chair sees more body contact than your mattress.</p>
                </div>
              </div>
            </motion.div>

            {/* Right: 4 reason cards in 2x2 grid */}
            <div className="grid sm:grid-cols-2 gap-5 self-center">
              {[
                {
                  icon: Droplets,
                  title: "Sweat is the root of the problem",
                  body: "Summer temperatures across NCR reach 42-45 degrees, and the resulting sweat transfers continuously to the office chair. It doesn't evaporate easily; it leaves behind an odour and moisture, which becomes a colony for bacteria.",
                },
                {
                  icon: Users,
                  title: "Body contact area is significant",
                  body: "The chair has a very large body contact area: the entire seat, back panel, armrests, headrest, and whatnot. We can clean ourselves by bathing every day, but how would the chair do that?",
                },
                {
                  icon: Wind,
                  title: "Dust from the AC vents is problematic",
                  body: "AC vents are rarely cleaned, and the dust accumulated in them blows directly on your chairs. This dust is trapped by the body oils already present on the chair and creates a sticky residue that makes your chair unbearable.",
                },
                {
                  icon: AlertCircle,
                  title: "Trapped moisture in the chair fabric ferments",
                  body: "Sweat doesn't evaporate from the chair; it feeds bacterial growth, which results in a sour smell from a long-used office chair. No spray or deodorant can mask it.",
                },
              ].map(({ icon: Icon, title, body }, i) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={hygieneInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.15 + 0.1 * i, duration: 0.5 }}
                  className="bg-teal-dark border border-teal/15 rounded-xl p-6 hover:border-copper/30 transition-colors"
                >
                  <div className="w-9 h-9 rounded-lg bg-copper/15 flex items-center justify-center mb-4">
                    <Icon size={16} className="text-copper-light" />
                  </div>
                  <h3 className="font-serif text-ivory-warm text-base font-semibold mb-2 leading-snug">{title}</h3>
                  <p className="font-sans text-stone-teal/60 text-xs leading-relaxed">{body}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={hygieneInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6 }}
            className="mt-10 border-t border-teal/20 pt-8 flex flex-wrap gap-4 items-center justify-between"
          >
            <p className="font-sans text-stone-teal/55 text-sm max-w-2xl">
              Hence, an office chair with 2000+ hours of use does indeed become a hygiene problem, and nothing short of professional chair cleaning can solve this problem.
            </p>
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 btn-whatsapp font-sans text-sm px-5 py-2.5 shrink-0">
              <MessageCircle size={14} /> Book Same-Day Service
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── 4. PRICING — Centered card with table ────────────────────────────── */}
      <section ref={pricingRef} className="bg-ivory py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={pricingInView ? { opacity: 1, y: 0 } : {}}
            className="text-center mb-10"
          >
            <Tag>Pricing</Tag>
            <h2 className="font-serif text-teal-deep text-3xl md:text-4xl font-bold leading-tight mb-4">
              Our Office Chair Cleaning Prices in Delhi{" "}
              <span className="italic font-normal text-charcoal/40">and What to Expect</span>
            </h2>
            <p className="font-sans text-slate-teal/70 text-sm leading-relaxed max-w-2xl mx-auto">
              Here's what determines your chair cleaning cost:
            </p>
          </motion.div>

          {/* Pricing factors as pills */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={pricingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="flex flex-wrap justify-center gap-2.5 mb-10"
          >
            {[
              "Chair type and fabric",
              "Stain type and level",
              "Last cleaning date",
              "Quantity of chairs (bulk discount 10+)",
            ].map((factor) => (
              <span key={factor} className="font-sans text-xs text-teal bg-teal/10 border border-teal/20 px-3 py-1.5 rounded-full">
                {factor}
              </span>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={pricingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="rounded-2xl border border-mist overflow-hidden shadow-xl shadow-teal/5"
          >
            <div className="bg-teal-deep px-6 py-4 text-center">
              <p className="font-sans text-copper-light text-xs font-semibold uppercase tracking-wider">Indicative Price List</p>
            </div>
            <table className="w-full font-sans text-sm">
              <thead>
                <tr className="bg-ivory-teal">
                  <th className="text-left p-4 text-teal-deep font-semibold border-b border-mist">Chair Type</th>
                  <th className="text-left p-4 text-teal font-semibold border-b border-mist">Cleaning Rate (Per Chair)</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Standard Office / Task Chair", "From ₹149"],
                  ["Executive Chair (Fabric)", "From ₹199"],
                  ["Executive Chair (Leather)", "From ₹299"],
                  ["Dining Chair (Fabric Cushion)", "From ₹149"],
                  ["Gaming Chair", "From ₹299"],
                  ["Premium / Velvet Chair", "From ₹249"],
                  ["Bulk Office (20+ Chairs)", "Custom Quote"],
                ].map(([type, rate], i) => (
                  <tr key={type} className={i % 2 === 0 ? "bg-ivory" : "bg-ivory-teal"}>
                    <td className="p-4 text-teal-deep font-medium border-t border-mist">{type}</td>
                    <td className={`p-4 font-bold border-t border-mist ${rate === "Custom Quote" ? "text-copper" : "text-teal"}`}>{rate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={pricingInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
            className="mt-8 bg-teal-deep rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 border border-teal/20"
          >
            <div>
              <p className="font-serif text-ivory-warm text-base font-semibold mb-1">Same-day service available across most NCR areas.</p>
              <p className="font-sans text-stone-teal/60 text-xs">WhatsApp us your chair type, quantity, and location for a confirmed quote within 30 minutes.</p>
            </div>
            <div className="flex gap-3 shrink-0 flex-wrap">
              <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 btn-whatsapp font-sans text-sm px-5 py-2.5">
                <MessageCircle size={14} /> Get Instant Quote
              </a>
              <a href={PHONE}
                className="inline-flex items-center gap-2 font-sans text-xs px-4 py-2 border border-copper/40 text-copper-light rounded-lg hover:bg-copper/10 transition-colors">
                <Phone size={12} /> Call Now
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 5. COMPARISON TABLE ──────────────────────────────────────────────── */}
      <section ref={comparisonRef} className="bg-teal-dark teal-texture py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={comparisonInView ? { opacity: 1, y: 0 } : {}}
          >
            <Tag light>Comparison</Tag>
            <h2 className="font-serif text-ivory-warm text-3xl md:text-4xl font-bold leading-tight mb-4 max-w-2xl">
              Normal Cleaning vs.{" "}
              <span className="italic font-normal text-stone-teal/40">Professional Chair Cleaning</span>
            </h2>
            <p className="font-sans text-stone-teal/65 text-sm leading-relaxed mb-10 max-w-2xl">
              The difference is not about thoroughness. Both are completely different processes, and regular cleaning cannot treat a chair's hygiene problems like professional cleaning does.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={comparisonInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="overflow-x-auto rounded-2xl border border-teal/15"
          >
            <table className="w-full font-sans text-sm">
              <thead>
                <tr className="bg-teal-deep">
                  <th className="text-left p-4 text-ivory-warm font-semibold w-1/3">Aspect</th>
                  <th className="text-left p-4 text-stone-teal/70 font-semibold w-1/3">Regular Wiping / DIY</th>
                  <th className="text-left p-4 text-copper-light font-semibold w-1/3">Professional Chair Cleaning</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["What it cleans", "Surface dust and fresh spills only", "Deep fabric fibres, foam layer, bacterial buildup"],
                  ["Freshness", "Temporary, 1-2 days", "Genuine, extracted contamination does not return"],
                  ["Smell treatment", "Masked with fragrance", "Neutralised at the biological source"],
                  ["Stain removal", "Spreads stains or sets them deeper", "Targeted pre-treatment before extraction"],
                  ["Fabric safety", "Risk of over-wetting, hardening", "Fabric-matched chemicals, controlled moisture"],
                  ["Drying time", "Often days (if over-wetted)", "2-4 hours with extraction and air movers"],
                  ["Bacterial removal", "None", "Anti-microbial sanitisation included"],
                  ["Result duration", "Days", "3-6 months with normal use"],
                ].map(([aspect, diy, pro], i) => (
                  <tr key={aspect} className={i % 2 === 0 ? "bg-teal-dark/70" : "bg-teal-dark/40"}>
                    <td className="p-4 font-medium text-stone-teal/80 border-t border-teal/10">{aspect}</td>
                    <td className="p-4 text-stone-teal/45 italic border-t border-teal/10 text-xs">{diy}</td>
                    <td className="p-4 text-copper-light border-t border-teal/10">{pro}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>
      </section>

      {/* ── 6. CHAIR TYPES — Alternating editorial list ──────────────────────── */}
      <section ref={typesRef} className="bg-ivory py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={typesInView ? { opacity: 1, y: 0 } : {}}
            className="text-center mb-14"
          >
            <Tag>Chair Types</Tag>
            <h2 className="font-serif text-teal-deep text-3xl md:text-4xl font-bold leading-tight mb-4">
              Chairs We Clean Every Week{" "}
              <span className="italic font-normal text-charcoal/40">Across Delhi and Nearby Areas</span>
            </h2>
            <p className="font-sans text-slate-teal/70 text-sm leading-relaxed max-w-2xl mx-auto">
              our commercial chair cleaning service covers every chair type that you will find in your homes, offices, cafes, and clinics.
            </p>
          </motion.div>

          <div className="divide-y divide-mist">
            {[
              {
                title: "Office and Executive Chairs",
                body: "Office chairs include leather chairs, conference room chairs, task chairs, etc. These are in the heaviest daily use and require professional cleaning the most. Whether it's a single chair or full-floor chairs, we take all tasks promptly.",
                img: "/img/office_images/23.png",
                tags: ["Leather", "Task Chair", "Conference Chair"],
              },
              {
                title: "Dining Chairs",
                body: "Fabric chairs on your dining table accumulate food spills and body oils, and they are almost never cleaned beyond a surface wipe.",
                img: null,
                tags: ["Fabric Cushion", "Wooden Frame"],
              },
              {
                title: "Gaming Chairs",
                body: "Faux-leather and fabric gaming chairs have gamers sitting on them for 4-8 hours every day and are almost never cleaned. We have specially designed faux leather chair cleaning services at DryClean Masters.",
                img: null,
                tags: ["Faux Leather", "Fabric"],
              },
              {
                title: "Cafe and Restaurant Chairs",
                body: "The food and oil vapours that rise up deposit themselves on the chairs. That's why you see grease on cafe and restaurant chairs. Besides that, beverage and coffee spills make your chairs unpresentable. Pre-service cleaning for cafes and restaurants is a regular part of our office chair dry cleaning charges in Delhi NCR.",
                img: "/img/office_images/24.webp",
                tags: ["Commercial", "High-Traffic"],
              },
              {
                title: "Clinic and Salon Chairs",
                body: "Salon chairs, like wash chairs and styling chairs, and clinic chairs have hygiene issues that are not visible. We offer professional cleaning for chairs in clinics and medical facilities.",
                img: null,
                tags: ["Medical Grade", "Hygiene Standard"],
              },
              {
                title: "Call Centre and Coworking Chairs",
                body: "As different people use this chair in multiple shifts, imagine the hygiene problem that is created over the single-user office seating. The need for professionally cleaning these chairs is even higher.",
                img: null,
                tags: ["Multi-Shift", "Bulk Cleaning"],
              },
            ].map(({ title, body, img, tags }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                animate={typesInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.08 * i, duration: 0.5 }}
                className={`flex flex-col ${img && i % 2 !== 0 ? "md:flex-row-reverse" : "md:flex-row"} items-start gap-6 py-8 hover:bg-ivory-teal transition-colors px-4 -mx-4 rounded-xl`}
              >
                <div className="shrink-0">
                  {img ? (
                    <div className="relative w-full md:w-48 h-36 rounded-xl overflow-hidden border border-mist">
                      <Image src={img} alt={title} fill className="object-cover" />
                    </div>
                  ) : (
                    <div className="w-12 h-12 rounded-xl bg-teal/10 border border-teal/20 flex items-center justify-center">
                      <CheckCircle size={18} className="text-teal" />
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-serif text-teal-deep text-xl font-semibold mb-2">{title}</h3>
                  <p className="font-sans text-slate-teal/70 text-sm leading-relaxed mb-3">{body}</p>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <span key={tag} className="font-sans text-[10px] uppercase tracking-wider text-teal bg-teal/8 border border-teal/15 px-2.5 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={typesInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6 }}
            className="mt-10 text-center"
          >
            <a href={PHONE} className="inline-flex items-center gap-2 font-sans text-sm text-teal font-semibold hover:text-teal-mid transition-colors">
              Call today to find out whether we clean your type of chair <ArrowRight size={13} />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── 7. REAL SITUATIONS — Pull-quote masonry cards ────────────────────── */}
      <section ref={situationsRef} className="bg-teal-deep teal-texture py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={situationsInView ? { opacity: 1, y: 0 } : {}}
            className="max-w-2xl mb-14"
          >
            <Tag light>Real Situations</Tag>
            <h2 className="font-serif text-ivory-warm text-3xl md:text-4xl font-bold leading-tight mb-4">
              Real Situations When{" "}
              <span className="italic font-normal text-stone-teal/40">People Call Us</span>
            </h2>
            <p className="font-sans text-stone-teal/65 text-sm leading-relaxed">
              This is when our phone actually rings, and this is when you should call us.
            </p>
          </motion.div>

          {/* Masonry-style 3-col */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">
            {[
              {
                scenario: "The office is reopening after a long break",
                body: "Post-holiday, post-renovation, or post-construction.",
                emphasis: true,
              },
              {
                scenario: "A client visit is scheduled for tomorrow",
                body: "We provide same-day desk chair cleaning services. Your office will be ready before the meeting.",
                emphasis: false,
              },
              {
                scenario: "The restaurant is getting a review",
                body: "A food critic, a blogger, or a corporate group booking is coming in. We clean commercial seating overnight and on weekends, too.",
                emphasis: false,
              },
              {
                scenario: "Children spilt food on the chair",
                body: "Food and drink spills can get deep inside the fabric very quickly, leaving stains that are impossible to remove, not for us, however.",
                emphasis: true,
              },
              {
                scenario: "Summer has arrived, and the chair has started to smell",
                body: "We receive the most calls in April as Delhi's heat makes the office and chair emit the foul odour.",
                emphasis: false,
              },
              {
                scenario: "A new employee used an old, uncleaned chair",
                body: "When a person picks up the neglected chair and notices that something is wrong.",
                emphasis: false,
              },
              {
                scenario: "Festival season preparation",
                body: "Before Diwali, Eid, Christmas, or any major family gathering.",
                emphasis: true,
              },
            ].map(({ scenario, body, emphasis }, i) => (
              <motion.div
                key={scenario}
                initial={{ opacity: 0, y: 24 }}
                animate={situationsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.07 * i, duration: 0.5 }}
                className={`break-inside-avoid rounded-xl p-6 mb-5 border ${emphasis ? "bg-teal-dark border-copper/25" : "bg-teal-dark/70 border-teal/15"}`}
              >
                <div className="flex items-start gap-3 mb-2">
                  <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${emphasis ? "bg-copper" : "bg-teal/40"}`} />
                  <h3 className={`font-serif text-base font-semibold leading-snug ${emphasis ? "text-copper-light" : "text-ivory-warm"}`}>
                    {scenario}
                  </h3>
                </div>
                <p className="font-sans text-stone-teal/60 text-sm leading-relaxed ml-5">{body}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={situationsInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6 }}
            className="mt-10 flex flex-wrap gap-3"
          >
            <a href={PHONE} className="inline-flex items-center gap-2 font-sans text-sm px-5 py-2.5 border border-copper/40 text-copper-light rounded-lg hover:bg-copper/10 transition-colors">
              <Phone size={14} /> Contact for Emergency
            </a>
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 btn-whatsapp font-sans text-sm px-5 py-2.5">
              <MessageCircle size={14} /> Same-Day Service
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── 8. WHY DIY FAILS — Bold horizontal numbered callouts ─────────────── */}
      <section ref={diyRef} className="bg-ivory py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={diyInView ? { opacity: 1, y: 0 } : {}}
            className="max-w-2xl mb-14"
          >
            <Tag>Why DIY Fails</Tag>
            <h2 className="font-serif text-teal-deep text-3xl md:text-4xl font-bold leading-tight mb-4">
              Why DIY Chair Cleaning{" "}
              <span className="italic font-normal text-charcoal/40">Often Makes Things Worse</span>
            </h2>
            <p className="font-sans text-slate-teal/70 text-sm leading-relaxed">
              It is an instinct to want to handle it yourself, but in chairs' case, DIY cleaning not only has a failure record, but it also makes things worse:
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
            {[
              {
                num: "01",
                title: "Over-wetting is the most common mistake",
                body: "Spraying liquid cleaner directly on a fabric chair without extracting it later gets moisture in the foam. The moisture leads to the expansion of bacteria in the foam, renewing the problem that was creating the smell in the first place.",
              },
              {
                num: "02",
                title: "Detergent residue damages the fabric",
                body: "If you use detergent to clean the chair, it leaves behind a residue after the water evaporates. This sticky residue attracts and traps dirt, and the chair gets dirtier faster than ever before.",
              },
              {
                num: "03",
                title: "The smell returns stronger",
                body: "DIY cleaning cannot get inside the fabric to kill the bacteria colony expanding there. After the over-wetting of the fabric, the bacterial colony expands, the fragrance runs off in two days, and the smell returns even worse than before.",
              },
              {
                num: "04",
                title: "Scrubbing makes stains permanent",
                body: "As you scrub, the stain goes deeper into the fabric due to friction and bonds with it. This changes the stain's chemistry and makes removing it even more difficult than it was before.",
              },
              {
                num: "05",
                title: "Fabric hardening and colour fading",
                body: "You might not have the specific upholstery safe cleaning agent. Using common soap or detergent runs the risk of hardening the chair fabric and fading the colour.",
              },
            ].map(({ num, title, body }, i) => (
              <motion.div
                key={num}
                initial={{ opacity: 0, y: 24 }}
                animate={diyInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.08 * i, duration: 0.5 }}
                className="relative border border-mist rounded-xl p-6 bg-ivory-teal overflow-hidden group hover:border-teal/30 transition-colors"
              >
                {/* Background number */}
                <span className="absolute -right-2 -top-4 font-serif text-8xl font-bold text-teal/6 select-none leading-none pointer-events-none group-hover:text-teal/10 transition-colors">
                  {num}
                </span>
                <div className="relative">
                  <AlertCircle size={18} className="text-copper mb-4" />
                  <h3 className="font-serif text-teal-deep text-base font-semibold mb-2 leading-snug">{title}</h3>
                  <p className="font-sans text-slate-teal/65 text-sm leading-relaxed">{body}</p>
                </div>
              </motion.div>
            ))}

            {/* Tip card */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={diyInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.45, duration: 0.5 }}
              className="border border-teal/30 rounded-xl p-6 bg-teal/5 md:col-span-2 xl:col-span-1"
            >
              <Shield size={18} className="text-teal mb-4" />
              <p className="font-sans text-xs text-teal font-semibold uppercase tracking-wider mb-2">Pro Tip</p>
              <p className="font-sans text-slate-teal/70 text-sm leading-relaxed">
                If a spill or stain happens, do not rub it out; take a dry cotton cloth and absorb the excess liquid. Then, book professional chair cleaning services.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 9. PROCESS — Expandable accordion (unique layout) ────────────────── */}
      <section ref={processRef} className="bg-teal-dark teal-texture py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={processInView ? { opacity: 1, y: 0 } : {}}
            className="text-center mb-12"
          >
            <Tag light>Our Process</Tag>
            <h2 className="font-serif text-ivory-warm text-3xl md:text-4xl font-bold leading-tight mb-4">
              Here&apos;s Exactly What Happens{" "}
              <span className="italic font-normal text-stone-teal/40">When Our Team Arrives</span>
            </h2>
            <p className="font-sans text-stone-teal/65 text-sm leading-relaxed max-w-xl mx-auto">
              Here's the actual sequence of what happens in our office chair shampooing service:
            </p>
          </motion.div>

          <div className="space-y-3">
            {[
              {
                step: "Step 1",
                title: "Arrival and Setup",
                duration: "5-10 mins",
                body: "Our team arrives with complete equipment, including HEPA vacuum, extraction machine, chemical kit, air movers, and protective floor covering. We place the covering around the chair to protect the floor while cleaning.",
              },
              {
                step: "Step 2",
                title: "Fabric Inspection",
                duration: "5-10 mins",
                body: "No treatment can start before assessing the fabric's type (polyester, faux leather, velvet, chenille), fabric's age, presence of pre-existing damage, any colour loss, locations of the stains, and their types. This ensures that proper chemicals can be applied for proper treatment.",
              },
              {
                step: "Step 3",
                title: "High-Power Pre-Vacuuming",
                duration: "5-10 mins per chair",
                body: "We pre-vacuum every chair with an industrial HEPA vacuum to catch all the surface debris, dust, pet hair, food particles, etc. This is to prevent the surface particles from getting inside the fabric during the wet cleaning process.",
              },
              {
                step: "Step 4",
                title: "Stain Pre-Treatment",
                duration: "5-10 mins dwell",
                body: "Every individual stain gets a unique treatment; an oil-based stain gets a solvent treatment, a protein-based one (sweat, food) gets enzyme treatment, and inks get appropriate acidic or alkaline treatment. Each pre-treatment gets 5-10 minutes dwell time before we extract it.",
              },
              {
                step: "Step 5",
                title: "Shampoo Application",
                duration: "10-15 mins dwell",
                body: "Here, we apply a fabric-safe shampoo to the chair's fabric and get it into the fabric with an upholstery brush. This shampoo is left on for 10-15 minutes to break down the body oils and loosen embedded contamination. Most budget services miss the dwell time, but this is the step that makes all the difference.",
              },
              {
                step: "Step 6",
                title: "Extraction Cleaning",
                duration: "Core clean",
                body: "A burst of hot water is injected into the fabric and immediately extracted. This comes out with all the loosened contamination, shampoo residue, and stains. This process leaves the fabric damp rather than all wet, and your chair becomes dry after only 2-4 hours.",
              },
              {
                step: "Step 7",
                title: "Anti-Microbial Sanitation",
                duration: "Full coverage",
                body: "After extraction, we spray a fabric-safe, food-grade anti-microbial spray on your chairs. This ensures that if any bacteria survive the cleaning process, it is eliminated. This step treats the odour at the biological level, removing it where it originated.",
              },
              {
                step: "Step 8",
                title: "Air Mover Drying",
                duration: "Accelerated",
                body: "Industrial air movers around the chair accelerate drying. This lessens your chair's drying time to less than half. We don't only do it as a courtesy, but it is to make sure that moisture does not stay in your chair for long and bacteria does not get enough time to rebuild.",
              },
              {
                step: "Step 9",
                title: "Final Grooming and Handover",
                duration: "Completion",
                body: "Fabric is groomed, cushions are placed back, and a final visual check is done to ensure we give your chair back looking better than before. The job is still not done until you're satisfied.",
              },
            ].map(({ step, title, duration, body }, i) => {
              const isOpen = openProcess === i;
              return (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, y: 12 }}
                  animate={processInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.05 * i, duration: 0.4 }}
                  className={`rounded-xl border overflow-hidden transition-colors ${isOpen ? "border-copper/35 bg-teal-deep" : "border-teal/15 bg-teal-dark/60 hover:border-teal/30"}`}
                >
                  <button
                    onClick={() => setOpenProcess(isOpen ? null : i)}
                    className="w-full flex items-center justify-between gap-4 p-5 text-left"
                  >
                    <div className="flex items-center gap-4">
                      <span className={`font-sans text-xs font-bold uppercase tracking-wider shrink-0 ${isOpen ? "text-copper-light" : "text-teal/60"}`}>
                        {step}
                      </span>
                      <span className={`font-serif text-base font-semibold ${isOpen ? "text-ivory-warm" : "text-stone-teal/80"}`}>
                        {title}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="font-sans text-xs text-stone-teal/40 hidden sm:block">{duration}</span>
                      <ChevronDown
                        size={16}
                        className={`text-copper transition-transform ${isOpen ? "rotate-180" : ""}`}
                      />
                    </div>
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 border-t border-copper/15">
                          <p className="font-sans text-stone-teal/65 text-sm leading-relaxed pt-4">{body}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={processInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
            className="mt-8 flex flex-wrap gap-3 justify-center"
          >
            <a href={PHONE} className="inline-flex items-center gap-2 font-sans text-sm px-5 py-2.5 border border-copper/40 text-copper-light rounded-lg hover:bg-copper/10 transition-colors">
              <Phone size={14} /> Request Callback
            </a>
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 btn-whatsapp font-sans text-sm px-5 py-2.5">
              <MessageCircle size={14} /> Check Bulk Rates
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── 10. STAINS HONESTY — Left-bordered timeline list ─────────────────── */}
      <section ref={stainsRef} className="bg-ivory py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
          <div className="grid lg:grid-cols-[1fr_480px] gap-14 items-start">
            <div>
              <motion.div initial={{ opacity: 0, y: 18 }} animate={stainsInView ? { opacity: 1, y: 0 } : {}}>
                <Tag>Honest Assessment</Tag>
                <h2 className="font-serif text-teal-deep text-3xl md:text-4xl font-bold leading-tight mb-4">
                  Why Some Stains{" "}
                  <span className="italic font-normal text-charcoal/40">Never Fully Go Away</span>
                </h2>
                <p className="font-sans text-slate-teal/70 text-sm leading-relaxed mb-8 max-w-xl border-l-4 border-teal/20 pl-5">
                  We believe in telling you this before we start, not after, as an excuse.
                </p>
              </motion.div>

              <div className="relative pl-6 border-l-2 border-mist space-y-0">
                {[
                  {
                    title: "Bleach damage is permanent",
                    body: "If a cleaning product containing bleach has been used on the chair, the fabric dye has been chemically removed. It's not a stain anymore but a colour damage which we cannot restore.",
                  },
                  {
                    title: "Sunlight fading cannot be restored",
                    body: "Sunlight's UV rays drive colour fade, which cannot be reversed by any cleaning. If you have your chair near a window, it might be fading because of the sun and not the dust.",
                  },
                  {
                    title: "Old oil stains that were scrubbed",
                    body: "If a stain has been rubbed with a cloth, the stain has bonded chemically with the chair's fabric due to friction. We improve these stains in most cases, but a complete removal may not always be achievable.",
                  },
                  {
                    title: "Ink on light fabrics",
                    body: "Ballpoint ink contains a permanent solvent-carrier component. On dark fabrics, we achieve significant lightening of the colour of the ink, but on light fabrics, some stain might always be visible.",
                  },
                  {
                    title: "Fabric wear is not contamination",
                    body: "A chair that looks faded or the foam has thinned because of high use cannot be rebuilt just by cleaning.",
                  },
                ].map(({ title, body }, i) => (
                  <motion.div
                    key={title}
                    initial={{ opacity: 0, x: -14 }}
                    animate={stainsInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.1 * i, duration: 0.5 }}
                    className="relative pb-8 last:pb-0"
                  >
                    <div className="absolute -left-[29px] top-1.5 w-4 h-4 rounded-full bg-ivory border-2 border-teal/30 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-copper" />
                    </div>
                    <h3 className="font-serif text-teal-deep text-base font-semibold mb-1.5">{title}</h3>
                    <p className="font-sans text-slate-teal/65 text-sm leading-relaxed">{body}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Side image stack */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={stainsInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="space-y-4 hidden lg:block"
            >
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] border border-mist shadow-lg">
                <Image src="/img/office_images/25.webp" alt="Chair stain assessment" fill className="object-cover" />
              </div>
              <div className="relative rounded-2xl overflow-hidden aspect-video border border-mist shadow-lg">
                <Image src="/img/office_images/27.webp" alt="Professional chair cleaning" fill className="object-cover" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 11. WHAT CUSTOMERS NOTICE — Big outcome cards ────────────────────── */}
      <section ref={resultsRef} className="bg-teal-deep teal-texture py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={resultsInView ? { opacity: 1, y: 0 } : {}}
            className="text-center mb-14"
          >
            <Tag light>After We&apos;re Done</Tag>
            <h2 className="font-serif text-ivory-warm text-3xl md:text-4xl font-bold leading-tight mb-4">
              What Customers Notice{" "}
              <span className="italic font-normal text-stone-teal/40">After We&apos;re Done</span>
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                icon: Wind,
                title: "The smell is gone",
                body: "Not covered, not just masked with fragrance, the smell has been eliminated from your room. Your room smells very different from how it used to smell.",
              },
              {
                icon: ThumbsUp,
                title: "The fabric feels different to touch",
                body: "The fabric is softer now because the roughness that had built up from dried contamination and dust has been removed.",
              },
              {
                icon: Star,
                title: "The colour looks brighter",
                body: "The particulate matter and the dust that was embedded in the chair fabric fade the colour by reducing light reflection from the chair surface. When it is removed, the colour recovers.",
              },
              {
                icon: Zap,
                title: "The workspace feels different",
                body: "A clean chair in a clean working space affects how people feel about the environment they are working in. Focus improves when the physical environment supports them.",
              },
              {
                icon: Users,
                title: "Visitors are happy",
                body: "As your clients and visitors arrive, they notice a clean office, appreciate it, and develop a positive bias towards the office.",
              },
            ].map(({ icon: Icon, title, body }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 24 }}
                animate={resultsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 * i, duration: 0.5 }}
                className={`border border-teal/15 rounded-xl p-7 bg-teal-dark hover:border-copper/30 transition-colors ${i === 4 ? "sm:col-span-2 lg:col-span-1" : ""}`}
              >
                <div className="w-10 h-10 rounded-xl bg-copper/15 flex items-center justify-center mb-5">
                  <Icon size={18} className="text-copper-light" />
                </div>
                <h3 className="font-serif text-ivory-warm text-lg font-semibold mb-3">{title}</h3>
                <p className="font-sans text-stone-teal/60 text-sm leading-relaxed">{body}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={resultsInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6 }}
            className="mt-10 text-center flex flex-wrap gap-3 justify-center"
          >
            <a href={PHONE} className="inline-flex items-center gap-2 font-sans text-sm px-5 py-2.5 border border-copper/40 text-copper-light rounded-lg hover:bg-copper/10 transition-colors">
              <Phone size={14} /> Call for a Clean Chair
            </a>
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 btn-whatsapp font-sans text-sm px-5 py-2.5">
              <MessageCircle size={14} /> Book on WhatsApp
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── 12. WHY FAST DRYING MATTERS — Horizontal editorial strip ─────────── */}
      <section ref={dryingRef} className="bg-ivory py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={dryingInView ? { opacity: 1, y: 0 } : {}}
          >
            <Tag>Fast Drying</Tag>
            <h2 className="font-serif text-teal-deep text-3xl md:text-4xl font-bold leading-tight mb-4 max-w-2xl">
              Why Fast Drying{" "}
              <span className="italic font-normal text-charcoal/40">Actually Matters</span>
            </h2>
            <p className="font-sans text-slate-teal/70 text-sm leading-relaxed mb-12 max-w-3xl">
              Faster drying time is not just for convenience; it has implications for hygiene, fabric health, and practical usability.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-px bg-mist rounded-2xl overflow-hidden border border-mist">
            {[
              {
                num: "01",
                title: "Slow drying leads to mould risk",
                body: "A chair that stays damp for 12 to 24 hours becomes a warm and moisture-rich environment, which is suitable for mould growth in foam padding. With our air movers, we decrease the damp time to 2-4 hours, which is not enough for mould to establish.",
              },
              {
                num: "02",
                title: "Slow drying brings the smell back",
                body: "This is why, with DIY cleaning, the chair smells worse within days. As the foam stays wet, the bacteria resumes its activity and the odour rebuilds. Our extraction-based cleaning removes the moisture along with the contamination, preventing the buildup of smell later.",
              },
              {
                num: "03",
                title: "Offices need usability quickly",
                body: "An office that books a corporate chair dry cleaning Delhi service needs to use the chair on the same day. Our drying process ensures that your chair can be used again in 2 to 4 hours. If we clean a chair at 8:00 a.m., you can use it before noon.",
              },
              {
                num: "04",
                title: "Fabric longevity",
                body: "If chair foam stays saturated for a long time, its structural integrity is destroyed. With our controlled extraction cleaning, we extract the moisture quickly and ensure that the foam does not stay wet for a long time.",
              },
            ].map(({ num, title, body }, i) => (
              <motion.div
                key={num}
                initial={{ opacity: 0, y: 20 }}
                animate={dryingInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 * i, duration: 0.5 }}
                className="bg-ivory p-7"
              >
                <span className="font-serif text-4xl font-bold text-teal/12 leading-none block mb-3">{num}</span>
                <div className="w-5 h-[2px] bg-teal/40 rounded-full mb-4" />
                <h3 className="font-serif text-teal-deep text-base font-semibold mb-2 leading-snug">{title}</h3>
                <p className="font-sans text-slate-teal/65 text-sm leading-relaxed">{body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 13. BUSINESS — Feature banner with segments ──────────────────────── */}
      <section ref={businessRef} className="bg-teal-dark teal-texture py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={businessInView ? { opacity: 1, y: 0 } : {}}
          >
            <Tag light>For Businesses</Tag>
            <h2 className="font-serif text-ivory-warm text-3xl md:text-4xl font-bold leading-tight mb-4 max-w-2xl">
              Office Chair Cleaning for Businesses:{" "}
              <span className="italic font-normal text-stone-teal/40">What We Actually Handle</span>
            </h2>
            <p className="font-sans text-stone-teal/65 text-sm leading-relaxed mb-4 max-w-2xl">
              Our commercial chair cleaning service Delhi takes care of business realities. We understand the concerns about scheduling, the large volume of work, business disruption, and appearance standards that are higher than those required for residential cleaning. That is why we provide 24-hour services to work around your comfort.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
            {[
              {
                icon: Building2,
                title: "Startups and Growing Offices",
                body: "Early morning and late night schedules available to finish the work before the team arrives.",
              },
              {
                icon: Users,
                title: "Corporate Floors and Enterprise Offices",
                body: "More than 100 workstations, conference rooms, executive suites handled in multiple shifts, weekend slots, and phased approaches. One area is cleaned while the other office remains operational.",
              },
              {
                icon: Clock,
                title: "Call Centres and BPO Offices",
                body: "These centres see people working in multiple shifts, using the chairs much more than in normal offices. These places require monthly professional cleaning.",
              },
              {
                icon: Zap,
                title: "Coworking Spaces",
                body: "These are the spaces where members might show some discomfort due to hygiene issues with equipment sharing. We offer service contracts for coworking spaces in nearby areas, including Noida, and Gurgaon.",
              },
              {
                icon: Shield,
                title: "Clinics and Medical Offices",
                body: "Hospitals and medical spaces require an anti-microbial treatment as they carry high-hygiene requirements. We offer services that help these spaces meet compliance.",
              },
              {
                icon: Star,
                title: "Restaurants and Cafes",
                body: "These high-use environments require frequent chair cleaning because hygiene is a major concern in an eating place. We provide morning and late evening slots to avoid disruption and scheduled service contracts.",
              },
            ].map(({ icon: Icon, title, body }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                animate={businessInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.08 * i, duration: 0.5 }}
                className="bg-teal-deep border border-teal/15 rounded-xl p-6 hover:border-copper/30 transition-colors"
              >
                <div className="w-9 h-9 rounded-lg bg-copper/15 flex items-center justify-center mb-4">
                  <Icon size={16} className="text-copper-light" />
                </div>
                <h3 className="font-serif text-ivory-warm text-base font-semibold mb-2">{title}</h3>
                <p className="font-sans text-stone-teal/60 text-xs leading-relaxed">{body}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={businessInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6 }}
            className="mt-10 grid sm:grid-cols-3 gap-4"
          >
            {[
              "Bulk Cleaning Rates from 10 chairs onwards",
              "Weekend and after-hours service available",
              "Service documentation for corporate clients",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 border border-teal/15 rounded-xl p-4 bg-teal-deep/60">
                <CheckCircle size={14} className="text-copper shrink-0" />
                <span className="font-sans text-stone-teal/70 text-sm">{item}</span>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={businessInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.7 }}
            className="mt-6 flex flex-wrap gap-3"
          >
            <a href={PHONE} className="inline-flex items-center gap-2 font-sans text-sm px-5 py-2.5 border border-copper/40 text-copper-light rounded-lg hover:bg-copper/10 transition-colors">
              <Phone size={14} /> Same-Day Booking for Urgent Needs
            </a>
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 btn-whatsapp font-sans text-sm px-5 py-2.5">
              <MessageCircle size={14} /> Get Bulk Rate Quote
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── 14. COMPETITORS — Dark bold editorial ────────────────────────────── */}
      <section ref={competitorsRef} className="bg-ivory py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
          <div className="grid lg:grid-cols-[1fr_480px] gap-14 items-center">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={competitorsInView ? { opacity: 1, y: 0 } : {}}
            >
              <Tag>Honest Comparison</Tag>
              <h2 className="font-serif text-teal-deep text-3xl md:text-4xl font-bold leading-tight mb-4">
                What Most Local Cleaners{" "}
                <span className="italic font-normal text-charcoal/40">Don&apos;t Tell You But We Will</span>
              </h2>
              <p className="font-sans text-slate-teal/70 text-sm leading-relaxed mb-8 max-w-lg">
                If you feel like the cheapest option might be as good as the best option, we will tell you what you are actually paying for.
              </p>

              <div className="space-y-5">
                {[
                  "They use fake fragrance to mask the bad odour. The smell returns within days of such cleaning.",
                  "No extraction means no deep cleaning; it is actually a surface clean, as the contamination in the foam is not removed.",
                  "Untrained labour using generic products on all chair types. This is how your velvet is damaged, your faux-leather is ruined, and your fabric shrinks and changes colour. Application of any chemical without fabric assessment is a recipe for disaster.",
                  "Cheap shampoo leaves behind a residue which makes your fabric stiff and sticky. The chair gets dirtier again faster, and your faith in professional cleaning is broken forever.",
                  "Your chair remains wet for more than 24 hours. Without extraction cleaning, it is very difficult to dry a chair in 2-4 hours as we do. This makes your chair vulnerable to contamination and mold formation again very soon.",
                ].map((point, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -16 }}
                    animate={competitorsInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.1 * i, duration: 0.5 }}
                    className="flex gap-4 border-b border-mist pb-5 last:border-0 last:pb-0"
                  >
                    <span className="font-serif text-2xl font-bold text-teal/20 leading-none shrink-0 w-7 text-right mt-0.5">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="font-sans text-slate-teal/70 text-sm leading-relaxed">{point}</p>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={competitorsInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.6 }}
                className="mt-8 bg-teal/5 border border-teal/20 rounded-xl p-5"
              >
                <p className="font-sans text-slate-teal/70 text-sm leading-relaxed">
                  When you're comparing prices for <strong className="text-teal-deep">office chair dry cleaning charges</strong>, don't just look for 'how much', but rather go for 'what does the process actually include'? The difference between 150 rupees and 299 rupees per chair is a basic surface clean and complete extraction cleaning.
                </p>
              </motion.div>
            </motion.div>

            {/* Side image */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={competitorsInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="relative rounded-2xl overflow-hidden aspect-[3/4] border border-mist shadow-xl hidden lg:block"
            >
              <Image src="/img/office_images/22.webp" alt="Professional chair cleaning equipment" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-teal-deep/40 to-transparent" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 15. PERFECT FOR — Two-column checklist ───────────────────────────── */}
      <section ref={perfectRef} className="bg-teal-deep teal-texture py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={perfectInView ? { opacity: 1, y: 0 } : {}}
            className="text-center mb-12"
          >
            <Tag light>Perfect For</Tag>
            <h2 className="font-serif text-ivory-warm text-3xl md:text-4xl font-bold leading-tight">
              The Service Is{" "}
              <span className="italic font-normal text-stone-teal/40">Perfect For</span>
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-3 max-w-3xl mx-auto">
            {[
              ["Corporate Offices", "Scheduled bulk cleaning, post-lockdown reopening, client-visit preparation"],
              ["Clinics and Healthcare Spaces", "Hygiene-standard seating with documented professional cleaning"],
              ["Cafes and Restaurants", "Front-of-house seating that reflects directly on customer experience"],
              ["Luxury Dining Spaces", "Premium upholstered seating that needs fabric-specific expert care"],
              ["Homes with Young Children", "Dining chairs and living room seating that bear the evidence of every meal"],
              ["Pet Owners", "Fabric chairs that have absorbed dander, hair, and pet odours over months"],
              ["Rental Properties and Landlords", "Furnished apartment chairs cleaned between tenancies"],
              ["Coworking Spaces", "Member-facing seating that's central to the product experience"],
              ["Gaming Setups", "High-hour chairs that deserve the same care as office chairs"],
              ["Festival and Event Preparation", "Home seating refreshed before major family gatherings"],
            ].map(([title, note], i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 14 }}
                animate={perfectInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.05 * i, duration: 0.4 }}
                className="flex items-start gap-3 bg-teal-dark/60 border border-teal/15 rounded-xl p-4 hover:border-copper/30 transition-colors"
              >
                <CheckCircle size={14} className="text-copper mt-0.5 shrink-0" />
                <div>
                  <p className="font-sans text-ivory-warm text-sm font-semibold leading-snug">{title}</p>
                  <p className="font-sans text-stone-teal/50 text-xs mt-0.5">{note}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 16. FAQ — Numbered accordion ─────────────────────────────────────── */}
      <section ref={faqRef} className="bg-ivory py-20 md:py-28">
        <div className="max-w-3xl mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={faqInView ? { opacity: 1, y: 0 } : {}}
            className="text-center mb-12"
          >
            <Tag>FAQs</Tag>
            <h2 className="font-serif text-teal-deep text-3xl md:text-4xl font-bold leading-tight">
              Quick Answers to What{" "}
              <span className="italic font-normal text-charcoal/40">You&apos;re Actually Wondering</span>
            </h2>
          </motion.div>

          <div className="space-y-3">
            {faqs.map(({ q, a }, i) => {
              const isOpen = openFaq === i;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  animate={faqInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.04 * i }}
                  className={`rounded-xl border overflow-hidden transition-colors ${isOpen ? "border-teal/30" : "border-mist"}`}
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    className="w-full flex items-start gap-4 p-5 text-left hover:bg-ivory-teal transition-colors"
                  >
                    <span className="font-serif text-teal/30 font-bold text-lg leading-none shrink-0 mt-0.5">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-sans text-teal-deep text-sm font-semibold flex-1 leading-snug">{q}</span>
                    <ChevronDown
                      size={15}
                      className={`text-teal shrink-0 mt-0.5 transition-transform ${isOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28 }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 border-t border-mist">
                          <p className="font-sans text-slate-teal/70 text-sm leading-relaxed pt-4 pl-9">{a}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 17. CLOSING CTA ──────────────────────────────────────────────────── */}
      <section ref={ctaRef} className="bg-teal-deep teal-texture py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
          >
            <Tag light>Book Today</Tag>
            <h2 className="font-serif text-ivory-warm text-3xl md:text-4xl xl:text-5xl font-bold leading-tight mb-6">
              A Cleaner Chair Changes{" "}
              <span className="italic font-normal text-stone-teal/40">How a Space Feels</span>
            </h2>
            <p className="font-sans text-stone-teal/65 text-sm leading-relaxed mb-4 max-w-2xl mx-auto">
              It's not just about hygiene, though hygiene matters more than most people have considered before reading this far. It's about the everyday environment, a space you work and live in. A chair that smells wrong affects how you feel about sitting in it, it affects your mood, and your productivity.
            </p>
            <p className="font-sans text-stone-teal/65 text-sm leading-relaxed mb-10 max-w-2xl mx-auto">
              Professional desk chair cleaning services in Delhi deliver a reset: the smell is gone, the fabric is clean, it feels soft, and your living space feels better.
            </p>

            <div className="flex flex-wrap gap-3 justify-center mb-10">
              <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 btn-whatsapp font-sans text-sm px-7 py-3.5">
                <MessageCircle size={15} /> Book Chair Cleaning
              </a>
              <a href={PHONE}
                className="inline-flex items-center gap-2 font-sans text-sm px-7 py-3.5 border border-copper/40 text-copper-light rounded-lg hover:bg-copper/10 transition-colors">
                <Phone size={15} /> {PHONE_DISPLAY}
              </a>
            </div>

            <p className="font-sans text-stone-teal/40 text-xs mb-12">
              No advance payment, pay after the job. Satisfaction guaranteed.
            </p>

            {/* Also available */}
            <div className="border-t border-teal/20 pt-10">
              <p className="font-sans text-stone-teal/50 text-xs uppercase tracking-wider mb-5">Also Available from DryClean Masters</p>
              <div className="flex flex-wrap gap-3 justify-center">
                {[
                  { label: "Upholstery Dry Cleaning Services in Delhi", href: "/" },
                  { label: "Sofa Dry Cleaning Near Me", href: "/sofa-dry-cleaning-delhi" },
                  { label: "Carpet Shampooing Service Delhi", href: "/carpet-cleaning-services-delhi" },
                ].map(({ label, href }) => (
                  <a
                    key={label}
                    href={href}
                    className="inline-flex items-center gap-1.5 font-sans text-xs text-copper-light hover:text-copper transition-colors border border-copper/25 rounded-lg px-4 py-2 hover:bg-copper/10"
                  >
                    {label} <ArrowRight size={11} />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 18. BOOKING FORM ─────────────────────────────────────────────────── */}
      <section id="booking" ref={bookingRef} className="bg-ivory-teal py-20 md:py-28">
        <div className="max-w-2xl mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={bookingInView ? { opacity: 1, y: 0 } : {}}
            className="text-center mb-10"
          >
            <Tag>Book Now</Tag>
            <h2 className="font-serif text-teal-deep text-2xl md:text-3xl font-bold mb-3">
              Book Your Chair Cleaning
            </h2>
            <p className="font-sans text-slate-teal/65 text-sm">No advance payment. Pay after the job is done.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={bookingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="bg-ivory rounded-2xl border border-mist shadow-xl shadow-teal/5 p-7"
          >
            {bookingSubmitted ? (
              <div className="text-center py-8">
                <CheckCircle size={40} className="text-teal mx-auto mb-4" />
                <h3 className="font-serif text-teal-deep text-xl font-semibold mb-2">Booking Confirmed!</h3>
                <p className="font-sans text-slate-teal/70 text-sm">We'll contact you shortly to confirm the time slot.</p>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-sans text-teal-deep text-xs font-semibold uppercase tracking-wider block mb-1.5">Name *</label>
                    <input
                      required
                      value={bookingForm.name}
                      onChange={e => setBookingForm(f => ({ ...f, name: e.target.value }))}
                      className="w-full border border-mist rounded-lg px-4 py-2.5 font-sans text-sm text-teal-deep placeholder-slate-teal/30 focus:outline-none focus:border-teal/40 bg-ivory-teal"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="font-sans text-teal-deep text-xs font-semibold uppercase tracking-wider block mb-1.5">Phone *</label>
                    <input
                      required
                      type="tel"
                      value={bookingForm.phone}
                      onChange={e => setBookingForm(f => ({ ...f, phone: e.target.value }))}
                      className="w-full border border-mist rounded-lg px-4 py-2.5 font-sans text-sm text-teal-deep placeholder-slate-teal/30 focus:outline-none focus:border-teal/40 bg-ivory-teal"
                      placeholder="+91 XXXXX XXXXX"
                    />
                  </div>
                </div>
                <div>
                  <label className="font-sans text-teal-deep text-xs font-semibold uppercase tracking-wider block mb-1.5">Email</label>
                  <input
                    type="email"
                    value={bookingForm.email}
                    onChange={e => setBookingForm(f => ({ ...f, email: e.target.value }))}
                    className="w-full border border-mist rounded-lg px-4 py-2.5 font-sans text-sm text-teal-deep placeholder-slate-teal/30 focus:outline-none focus:border-teal/40 bg-ivory-teal"
                    placeholder="your@email.com"
                  />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-sans text-teal-deep text-xs font-semibold uppercase tracking-wider block mb-1.5">Preferred Date *</label>
                    <input
                      required
                      type="date"
                      min={todayISO}
                      value={bookingForm.date}
                      onChange={e => setBookingForm(f => ({ ...f, date: e.target.value }))}
                      className="w-full border border-mist rounded-lg px-4 py-2.5 font-sans text-sm text-teal-deep focus:outline-none focus:border-teal/40 bg-ivory-teal"
                    />
                  </div>
                  <div>
                    <label className="font-sans text-teal-deep text-xs font-semibold uppercase tracking-wider block mb-1.5">Time Slot</label>
                    <select
                      value={bookingForm.timeSlot}
                      onChange={e => setBookingForm(f => ({ ...f, timeSlot: e.target.value }))}
                      className="w-full border border-mist rounded-lg px-4 py-2.5 font-sans text-sm text-teal-deep focus:outline-none focus:border-teal/40 bg-ivory-teal"
                    >
                      <option value="">Select slot</option>
                      <option>8:00 AM – 11:00 AM</option>
                      <option>11:00 AM – 2:00 PM</option>
                      <option>2:00 PM – 5:00 PM</option>
                      <option>5:00 PM – 8:00 PM</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="font-sans text-teal-deep text-xs font-semibold uppercase tracking-wider block mb-1.5">Address *</label>
                  <input
                    required
                    value={bookingForm.address}
                    onChange={e => setBookingForm(f => ({ ...f, address: e.target.value }))}
                    className="w-full border border-mist rounded-lg px-4 py-2.5 font-sans text-sm text-teal-deep placeholder-slate-teal/30 focus:outline-none focus:border-teal/40 bg-ivory-teal"
                    placeholder="Full address with area / locality"
                  />
                </div>
                <div>
                  <label className="font-sans text-teal-deep text-xs font-semibold uppercase tracking-wider block mb-1.5">Chair Type &amp; Notes</label>
                  <textarea
                    rows={3}
                    value={bookingForm.notes}
                    onChange={e => setBookingForm(f => ({ ...f, notes: e.target.value }))}
                    className="w-full border border-mist rounded-lg px-4 py-2.5 font-sans text-sm text-teal-deep placeholder-slate-teal/30 focus:outline-none focus:border-teal/40 bg-ivory-teal resize-none"
                    placeholder="Chair type, quantity, any special stains or requirements..."
                  />
                </div>
                {bookingError && (
                  <p className="font-sans text-xs text-copper">{bookingError}</p>
                )}
                <button
                  type="submit"
                  disabled={bookingLoading}
                  className="w-full inline-flex items-center justify-center gap-2 btn-whatsapp font-sans text-sm py-3.5 disabled:opacity-60"
                >
                  {bookingLoading ? "Submitting..." : (
                    <>
                      <CheckCircle size={15} />
                      Confirm Booking
                    </>
                  )}
                </button>
                <p className="font-sans text-slate-teal/45 text-xs text-center">
                  No payment needed now · We'll call to confirm
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </section>

    </main>
  );
}
