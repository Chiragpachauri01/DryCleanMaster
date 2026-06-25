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
  Shield,
  Clock,
  MapPin,
  Award,
  Users,
  AlertTriangle,
  Zap,
  Wind,
  Sun,
  Droplets,
  Bug,
  ThumbsUp,
  CalendarCheck,
  Home,
  Building2,
  Heart,
} from "lucide-react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

const todayISO = new Date().toISOString().split("T")[0];

const PHONE = "tel:+918882631413";
const PHONE_DISPLAY = "+91 8882631413";
const WA_LINK =
  "https://wa.me/918882631413?text=Hi%2C%20I%20want%20to%20book%20mattress%20cleaning%20in%20Delhi";

function SectionTag({ children, dark }: { children: string; dark?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2 mb-4">
      <span className={`w-5 h-[2px] rounded-full ${dark ? "bg-copper" : "bg-teal"}`} />
      <span
        className={`font-sans text-xs uppercase tracking-[0.2em] font-semibold ${
          dark ? "text-copper" : "text-teal"
        }`}
      >
        {children}
      </span>
    </span>
  );
}

const faqs = [
  {
    q: "How much does mattress cleaning cost in Delhi?",
    a: "Our mattress cleaning services in Delhi start at ₹399 for a single mattress deep clean and ₹599 for a double mattress. Queen and king sizes range from ₹699 to ₹999. Final pricing is confirmed after on-site inspection based on stain severity and treatment required.",
  },
  {
    q: "How long does mattress cleaning take?",
    a: "A standard double or queen mattress deep clean takes approximately 1 to 1.5 hours, including inspection, vacuuming, treatment, and UV-C sanitisation. Larger mattresses or those with multiple stains may take slightly longer.",
  },
  {
    q: "How long before I can sleep on the mattress after cleaning?",
    a: "With our low-moisture method, most mattresses are ready for bedding within 3 to 5 hours. We recommend allowing the full drying window before placing sheets back on to ensure complete moisture removal.",
  },
  {
    q: "Can you remove old urine stains and odour completely?",
    a: "In most cases, yes. Our bio-enzyme treatment is specifically designed to break down urine compounds chemically and not just mask the odour. Very old, deeply set stains may require two treatment sessions for complete removal, which our technician will advise during inspection.",
  },
  {
    q: "Is mattress cleaning safe for children and people with allergies?",
    a: "Yes, in fact it is specifically beneficial for allergy sufferers. All chemicals used are non-toxic and child-safe, and the UV-C sanitisation process is specifically designed to target the dust mites that trigger childhood allergies and asthma.",
  },
  {
    q: "Do you offer mattress cleaning at home, or do I need to bring it somewhere?",
    a: "All our services are doorstep-based. We bring our complete professional equipment and team to your home so that your mattress does not need to be transported anywhere.",
  },
  {
    q: "Can you clean both sides of the mattress?",
    a: "Yes, this is available as an add-on service. Many customers don't realise the underside often has more hidden contamination, particularly moisture-related issues, than the top, especially with non-ventilated bed bases.",
  },
  {
    q: "Do you sanitise the mattress or just clean it?",
    a: "Our standard deep cleaning service includes UV-C sanitisation as part of the process, not as a separate optional extra. This is specifically what targets dust mites and bacteria beyond visible dirt and stains.",
  },
  {
    q: "Is mattress dry cleaning in Delhi different from wet cleaning?",
    a: "Yes. Our process uses a controlled low-moisture method specifically because mattress foam cannot handle the kind of heavy water extraction used on carpets or sofas. This protects against fungus risk while still achieving a genuine deep clean.",
  },
  {
    q: "How often should I get my mattress professionally cleaned?",
    a: "Every 6 months for a standard household mattress in regular use and every 3 to 4 months for households with allergy-sensitive sleepers, pets, or young children. Post-monsoon cleaning is also strongly recommended for Delhi homes.",
  },
  {
    q: "Do you offer same-day mattress cleaning in Delhi?",
    a: "Yes, for most areas when you book before noon, our team will arrive on the same day and finish the job. WhatsApp us your location and mattress size for same-day confirmation.",
  },
  {
    q: "What is the difference between a sanitisation-only service and a full deep cleaning?",
    a: "Sanitisation only includes HEPA vacuuming and UV-C treatment. This is ideal for routine maintenance on a relatively clean mattress. Full deep cleaning adds stain treatment and low-moisture extraction, which is recommended when there is visible staining, odour, or it has been a long time since the last professional service.",
  },
  {
    q: "Can hotels and PGs book recurring mattress cleaning services?",
    a: "Yes. We offer scheduled recurring service plans for hospitality businesses, PG accommodations, and rental property managers with bulk pricing for multi-mattress bookings.",
  },
];

export default function MattressCleaningContent() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
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
        service: "Mattress Cleaning",
        createdAt: serverTimestamp(),
      });
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "booking", ...bookingForm, service: "Mattress Cleaning" }),
      });
      if (!res.ok) throw new Error("email failed");
      setBookingSubmitted(true);
    } catch (err) {
      console.error("[mattress-booking]", err);
      setBookingError("Booking saved! But confirmation email failed — we'll call you shortly.");
    } finally {
      setBookingLoading(false);
    }
  }

  const heroRef = useRef<HTMLDivElement>(null);
  const signsRef = useRef<HTMLDivElement>(null);
  const problemsRef = useRef<HTMLDivElement>(null);
  const pricingRef = useRef<HTMLDivElement>(null);
  const findingsRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);
  const sanitisationRef = useRef<HTMLDivElement>(null);
  const mattressTypesRef = useRef<HTMLDivElement>(null);
  const diyVsProRef = useRef<HTMLDivElement>(null);
  const frequencyRef = useRef<HTMLDivElement>(null);
  const whoRef = useRef<HTMLDivElement>(null);
  const canCannotRef = useRef<HTMLDivElement>(null);
  const bedsheetRef = useRef<HTMLDivElement>(null);
  const whyUsRef = useRef<HTMLDivElement>(null);
  const bookingFormRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const heroInView = useInView(heroRef, { once: true });
  const signsInView = useInView(signsRef, { once: true, margin: "-60px" });
  const problemsInView = useInView(problemsRef, { once: true, margin: "-60px" });
  const pricingInView = useInView(pricingRef, { once: true, margin: "-60px" });
  const findingsInView = useInView(findingsRef, { once: true, margin: "-60px" });
  const processInView = useInView(processRef, { once: true, margin: "-60px" });
  const sanitisationInView = useInView(sanitisationRef, { once: true, margin: "-60px" });
  const mattressTypesInView = useInView(mattressTypesRef, { once: true, margin: "-60px" });
  const diyVsProInView = useInView(diyVsProRef, { once: true, margin: "-60px" });
  const frequencyInView = useInView(frequencyRef, { once: true, margin: "-60px" });
  const whoInView = useInView(whoRef, { once: true, margin: "-60px" });
  const canCannotInView = useInView(canCannotRef, { once: true, margin: "-60px" });
  const bedsheetInView = useInView(bedsheetRef, { once: true, margin: "-60px" });
  const whyUsInView = useInView(whyUsRef, { once: true, margin: "-60px" });
  const bookingFormInView = useInView(bookingFormRef, { once: true, margin: "-60px" });
  const faqInView = useInView(faqRef, { once: true, margin: "-60px" });
  const ctaInView = useInView(ctaRef, { once: true, margin: "-60px" });

  return (
    <main>

      {/* ── 1. HERO — split layout with large image panel ─────────────────────── */}
      <section ref={heroRef} className="min-h-[92vh] bg-teal-deep teal-texture flex flex-col">
        {/* Top strip */}
        <div className="bg-teal-dark/60 border-b border-teal/10 py-2.5">
          <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 flex flex-wrap items-center gap-6 justify-between">
            <nav className="flex items-center gap-2 text-stone-teal/50 text-xs font-sans">
              <a href="/" className="hover:text-copper-light transition-colors">Home</a>
              <span>/</span>
              <span className="text-copper-light">Mattress Cleaning Services in Delhi</span>
            </nav>
            <div className="flex items-center gap-6">
              {[
                { Icon: Star, text: "4.9/5 Rating" },
                { Icon: Users, text: "9,000+ Mattresses Sanitised" },
                { Icon: Award, text: "Delhi's Most Trusted" },
              ].map(({ Icon, text }) => (
                <div key={text} className="hidden sm:flex items-center gap-1.5">
                  <Icon size={12} className="text-copper" />
                  <span className="font-sans text-stone-teal/70 text-xs">{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Hero body */}
        <div className="flex-1 max-w-7xl mx-auto px-4 md:px-8 lg:px-12 w-full grid lg:grid-cols-2 gap-0 items-stretch">
          {/* Left content */}
          <div className="flex flex-col justify-center py-16 md:py-20 lg:pr-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.05 }}
              className="mb-5"
            >
              <SectionTag dark>Professional Mattress Care</SectionTag>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }}
              className="font-serif text-ivory-warm text-3xl md:text-4xl xl:text-5xl font-bold leading-[1.1] mb-5 max-w-xl"
            >
              Mattress Cleaning Services in Delhi:{" "}
              <span className="italic font-normal text-stone-teal/50">
                Doorstep Service for a Comfortable Life
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15 }}
              className="font-sans text-stone-teal/70 text-sm md:text-base leading-relaxed mb-6 max-w-lg"
            >
              We spend around one-third of our lives on our mattresses — more hours of direct body
              contact than on any other surface. Yet beyond a changed bedsheet now and then, we never
              think about keeping the mattress itself clean. You&apos;re sleeping on top of years of
              accumulated sweat, dust mites, and skin cells. Our professional mattress cleaning services
              in Delhi fix this using deep extraction, UV sanitisation, and stain treatment.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="grid sm:grid-cols-2 gap-3 mb-8 max-w-lg"
            >
              {[
                "Doorstep mattress cleaning",
                "Same-day service available across Delhi",
                "UV sanitisation + dust mite reduction",
                "Safe for kids, allergy sufferers, & pets",
              ].map((badge) => (
                <div key={badge} className="flex items-start gap-2.5">
                  <CheckCircle size={14} className="text-copper mt-0.5 shrink-0" />
                  <span className="font-sans text-stone-teal/75 text-sm">{badge}</span>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.25 }}
              className="flex flex-col sm:flex-row flex-wrap gap-4 items-start sm:items-center mb-8"
            >
              <a
                href="#book-mattress"
                className="inline-flex items-center gap-2.5 btn-whatsapp font-sans text-sm px-7 py-3.5"
              >
                <MessageCircle size={16} />
                Book Mattress Cleaning
              </a>
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 font-sans text-sm px-7 py-3.5 border border-copper/40 text-copper-light rounded-lg hover:bg-copper/10 transition-colors"
              >
                <MessageCircle size={16} />
                WhatsApp Now
              </a>
              <a
                href={PHONE}
                className="inline-flex items-center gap-2.5 font-sans text-xs text-stone-teal/60 hover:text-copper-light transition-colors"
              >
                <Phone size={13} />
                {PHONE_DISPLAY}
              </a>
            </motion.div>

            {/* Stats pills */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={heroInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.35 }}
              className="flex flex-wrap gap-3"
            >
              {[
                { label: "Starting from", value: "₹399" },
                { label: "Service hours", value: "24/7" },
                { label: "Areas covered", value: "All Delhi" },
              ].map(({ label, value }) => (
                <div key={label} className="bg-teal-dark/60 border border-teal/15 rounded-xl px-4 py-2.5 text-center">
                  <p className="font-serif text-copper-light text-lg font-bold leading-none">{value}</p>
                  <p className="font-sans text-stone-teal/55 text-[10px] uppercase tracking-wider mt-1">{label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right image mosaic */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={heroInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="grid grid-rows-2 grid-cols-2 gap-3 pb-10 lg:py-10 h-[60vh] min-h-[380px] lg:h-auto lg:min-h-0"
          >
            <div className="relative col-span-2 row-span-1 rounded-2xl overflow-hidden border border-teal/20 shadow-xl">
              <Image
                src="/img/Mattress/3.webp"
                alt="Professional mattress deep cleaning service in Delhi"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-teal-deep/50 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-teal-deep/80 backdrop-blur-sm border border-teal/20 rounded-xl px-4 py-3">
                  <p className="font-sans text-copper-light text-[10px] font-semibold uppercase tracking-wider mb-0.5">9,000+ Mattresses Sanitised</p>
                  <p className="font-serif text-ivory-warm text-sm italic leading-snug">
                    &quot;Delhi&apos;s most trusted doorstep mattress sanitisation specialists.&quot;
                  </p>
                </div>
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden border border-teal/20 shadow-lg">
              <Image
                src="/img/Mattress/1.webp"
                alt="Mattress UV sanitisation treatment"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative rounded-2xl overflow-hidden border border-teal/20 shadow-lg">
              <Image
                src="/img/Mattress/2.webp"
                alt="Mattress stain removal and deep cleaning"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 2. SIGNS YOUR MATTRESS NEEDS CLEANING ────────────────────────────── */}
      <section ref={signsRef} className="bg-ivory-warm py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
          <div className="grid lg:grid-cols-[1fr_420px] gap-16 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={signsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
              >
                <SectionTag>Warning Signs</SectionTag>
                <h2 className="font-serif text-teal-deep text-3xl md:text-4xl font-bold mb-4 leading-tight">
                  Is Your Mattress{" "}
                  <span className="italic font-normal text-charcoal/40">Showing These Signs?</span>
                </h2>
                <p className="font-sans text-slate-teal/70 text-sm leading-relaxed mb-8 max-w-2xl">
                  If you think you would only get your mattress cleaned once it looks visibly dirty, you
                  are highly mistaken. Before it is visible, the contamination has been building for months.
                  Here are the signs to watch for before your mattress shows them outwardly:
                </p>
              </motion.div>

              <div className="space-y-3">
                {[
                  { icon: Wind, text: "A musty or sour smell when you lie down" },
                  { icon: Sun, text: "Visible yellow or brown discolouration" },
                  { icon: Bug, text: "You wake up sneezing or congested, but feel fine once you're up" },
                  { icon: Droplets, text: "The mattress feels slightly damp or heavy in humid months" },
                  { icon: Clock, text: "You can't remember the last time it was professionally cleaned" },
                  { icon: AlertTriangle, text: "Visible stains that have never been treated" },
                ].map(({ icon: Icon, text }, i) => (
                  <motion.div
                    key={text}
                    initial={{ opacity: 0, x: -16 }}
                    animate={signsInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.08 * i }}
                    className="flex items-center gap-4 bg-white border border-mist rounded-xl px-5 py-4 hover:border-teal/30 hover:shadow-sm transition-all duration-200"
                  >
                    <div className="w-9 h-9 rounded-lg bg-teal/8 border border-teal/15 flex items-center justify-center shrink-0">
                      <Icon size={16} className="text-teal" />
                    </div>
                    <span className="font-sans text-slate-teal/80 text-sm">{text}</span>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={signsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.6 }}
                className="mt-8 flex flex-wrap gap-4"
              >
                <a href="#book-mattress" className="inline-flex items-center gap-2 btn-primary font-sans text-sm px-6 py-3">
                  <CalendarCheck size={15} />
                  Book your service now
                </a>
                <a href={PHONE} className="inline-flex items-center gap-2 font-sans text-sm px-6 py-3 border border-teal/30 text-teal rounded-lg hover:bg-teal/5 transition-colors">
                  <Phone size={15} />
                  Call Now
                </a>
              </motion.div>
            </div>

            {/* Right image */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={signsInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="relative aspect-[3/4] rounded-3xl overflow-hidden border border-mist shadow-2xl">
                <Image
                  src="/img/Mattress/4.webp"
                  alt="Mattress showing signs of contamination before professional cleaning"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-teal-deep/40" />
              </div>
              <div className="absolute -bottom-5 -left-5 bg-white border border-mist rounded-2xl p-4 shadow-xl max-w-[200px]">
                <p className="font-sans text-teal text-xs font-semibold uppercase tracking-wider mb-1">If even one sign applies</p>
                <p className="font-serif text-teal-deep text-sm font-bold leading-snug">Your mattress is overdue for a professional clean</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 3. COMMON PROBLEMS WE SOLVE ─────────────────────────────────────── */}
      <section ref={problemsRef} className="bg-teal-deep teal-texture py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={problemsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-14"
          >
            <SectionTag dark>What We Fix</SectionTag>
            <h2 className="font-serif text-ivory-warm text-3xl md:text-4xl font-bold mb-4 max-w-2xl leading-tight">
              Common Mattress Problems{" "}
              <span className="italic font-normal text-stone-teal/40">We Solve</span>
            </h2>
            <p className="font-sans text-stone-teal/65 text-sm leading-relaxed max-w-3xl">
              Different types of mattress issues need different treatments. Here&apos;s what we deal with
              and why standard cleaning fails on them.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                num: "01",
                title: "Sweat Stains",
                body: "The human body releases sweat every single night, even in air-conditioned rooms, and your mattress absorbs it. Over months, it builds up into a visible yellow layer and gives out a bacterial odour. Surface cleaning cannot reach deep enough to clean it; only our extraction-treatment does.",
              },
              {
                num: "02",
                title: "Urine Stains",
                body: "Whether by children, elderly family members, or by pets, such accidents are sometimes inevitable. They go straight through the surface and bond with the foam material. Our bio-enzymatic treatment is designed to break down that bond and cure the odour.",
              },
              {
                num: "03",
                title: "Food Spills",
                body: "We all love eating in bed, and so do the bacteria. The crumbs that fall down or the beverages that spill leave a sticky layer beneath the surface, making your mattress a hygiene disaster. Though nothing we couldn't clean in the blink of an eye.",
              },
              {
                num: "04",
                title: "Pet Stains",
                body: "Pets leave behind dander, hair, and occasionally accidents. Our specific allergen removal treatments reduce allergenic particles from your mattress significantly.",
              },
              {
                num: "05",
                title: "Persistent Odour",
                body: "Often, the reason people finally book a cleaning is that odour is rarely from one source; it is from the combination of sweat, dust, and other biological contamination that is never addressed at a deeper level. We address that in all ways possible.",
              },
              {
                num: "06",
                title: "Dust & Allergen Buildup",
                body: "Mattresses are favourites with dust mites and allergens. They get food, human sweat, and an undisturbed environment. If you want your mattress not to become a source of your allergies, you need professional help from the best mattress cleaning services Delhi.",
              },
            ].map(({ num, title, body }, i) => (
              <motion.div
                key={num}
                initial={{ opacity: 0, y: 24 }}
                animate={problemsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.08 * i }}
                className="group border border-teal/15 hover:border-copper/40 transition-all duration-300 rounded-2xl bg-teal-dark/40 p-6"
              >
                <span className="font-sans text-[11px] text-copper/60 font-bold tracking-[0.2em] uppercase mb-3 block">{num}</span>
                <h3 className="font-serif text-copper-light text-lg font-semibold mb-3">{title}</h3>
                <p className="font-sans text-stone-teal/60 text-sm leading-relaxed">{body}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={problemsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6 }}
            className="mt-10 flex flex-col sm:flex-row gap-4 items-start sm:items-center"
          >
            <a href="#book-mattress" className="inline-flex items-center gap-2 btn-whatsapp font-sans text-sm px-6 py-3">
              <MessageCircle size={15} />
              Solve Your Mattress Problems Today
            </a>
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="font-sans text-stone-teal/60 text-sm hover:text-copper-light transition-colors underline underline-offset-2">
              Book to get a price quote →
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── 4. PRICING ──────────────────────────────────────────────────────── */}
      <section ref={pricingRef} className="bg-ivory py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={pricingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-14 text-center"
          >
            <SectionTag>Transparent Pricing</SectionTag>
            <h2 className="font-serif text-teal-deep text-3xl md:text-4xl font-bold mb-4 leading-tight">
              Mattress Cleaning Prices in Delhi
            </h2>
            <p className="font-sans text-slate-teal/70 text-sm leading-relaxed max-w-2xl mx-auto">
              Standard deep cleaning rates — all prices confirmed after on-site inspection.
              Multi-mattress package discounts available.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-[1fr_1fr] gap-12 items-start">
            {/* Price cards */}
            <div>
              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                {[
                  { size: "Single", price: "From ₹399", note: "Twin/single beds" },
                  { size: "Double", price: "From ₹599", note: "Standard double beds", highlight: true },
                  { size: "Queen", price: "From ₹699", note: "Queen size beds" },
                  { size: "King", price: "From ₹999", note: "King size beds" },
                ].map(({ size, price, note, highlight }, i) => (
                  <motion.div
                    key={size}
                    initial={{ opacity: 0, y: 20 }}
                    animate={pricingInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.1 * i }}
                    className={`rounded-2xl p-6 border transition-all duration-200 ${
                      highlight
                        ? "bg-teal-deep border-teal/30 shadow-lg"
                        : "bg-white border-mist hover:border-teal/30 hover:shadow-sm"
                    }`}
                  >
                    <p className={`font-sans text-xs uppercase tracking-[0.15em] font-semibold mb-1 ${highlight ? "text-copper" : "text-teal/70"}`}>
                      {size} Mattress
                    </p>
                    <p className={`font-serif text-2xl font-bold mb-1 ${highlight ? "text-ivory-warm" : "text-teal-deep"}`}>
                      {price}
                    </p>
                    <p className={`font-sans text-xs ${highlight ? "text-stone-teal/60" : "text-slate-teal/55"}`}>{note}</p>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={pricingInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5 }}
                className="flex flex-wrap gap-4"
              >
                <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 btn-whatsapp font-sans text-sm px-6 py-3">
                  <MessageCircle size={15} />
                  Chat with us
                </a>
                <a href={PHONE} className="inline-flex items-center gap-2 font-sans text-sm px-6 py-3 border border-teal/30 text-teal rounded-lg hover:bg-teal/5 transition-colors">
                  <Phone size={15} />
                  Contact us for final price
                </a>
              </motion.div>
            </div>

            {/* Inclusions */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={pricingInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="bg-ivory-teal border border-mist rounded-2xl p-7 mb-5">
                <h3 className="font-serif text-teal-deep text-lg font-semibold mb-5">What&apos;s Always Included</h3>
                <div className="space-y-3">
                  {[
                    "Inspection",
                    "HEPA vacuuming",
                    "Low-moisture deep cleaning",
                    "UV-C Sanitisation",
                    "Final Quality Check",
                    "All chemical and equipment use",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <CheckCircle size={14} className="text-teal shrink-0" />
                      <span className="font-sans text-slate-teal/75 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white border border-mist rounded-2xl p-7">
                <h3 className="font-serif text-teal-deep text-lg font-semibold mb-5">What Might Affect Final Pricing</h3>
                <div className="space-y-3">
                  {[
                    "Severity of the stain",
                    "Time since last professional clean",
                    "Whether both sides need treatment",
                    "Specialist bio-enzyme treatment requirement",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-copper/60 mt-2 shrink-0" />
                      <span className="font-sans text-slate-teal/70 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
                <p className="font-sans text-slate-teal/55 text-xs leading-relaxed mt-4 border-t border-mist pt-4">
                  All this is quoted transparently during the on-site inspection. If you are booking
                  multi-mattress cleaning, we also have package discounts for that.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 5. WHAT WE USUALLY FIND ─────────────────────────────────────────── */}
      <section ref={findingsRef} className="bg-teal-dark teal-texture py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={findingsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-14"
          >
            <SectionTag dark>Real Findings</SectionTag>
            <h2 className="font-serif text-ivory-warm text-3xl md:text-4xl font-bold mb-4 max-w-2xl leading-tight">
              What We Usually Find{" "}
              <span className="italic font-normal text-stone-teal/40">During Mattress Cleaning</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
            {[
              {
                title: "The underside is often worse than the top",
                body: "Most of us never even think to check the bottom of our mattresses. Moisture from below, especially in wooden beds, settles into the mattress and creates mould patches which are visible when the mattress is flipped.",
              },
              {
                title: "Body-shaped sweat stains are extremely common",
                body: "On mattresses that haven't been cleaned for over 2 years, we notice a visible body shape formed by the sweat, showcasing years of accumulation.",
              },
              {
                title: "Pillow areas carry more bacteria than the rest",
                body: "The area where your head and shoulder rest accumulates hair product residue and drool at a very high level. This is something most people do not expect.",
              },
              {
                title: "Children's mattresses often have more contamination",
                body: "Children are freer with their beds, eating food and creating all the mess. Their mattresses demand stronger bio-enzyme treatments than adult mattresses.",
              },
              {
                title: "Mattresses near windows develop mould faster",
                body: "Ground floor rooms and rooms where windows open over your bed show greater mould formation, especially in the monsoon season.",
              },
              {
                title: "Most mattresses have never been vacuumed",
                body: "Out of all the mattresses we have cleaned, only the rare ones have been vacuumed regularly. The dust and allergens keep building without any care.",
              },
            ].map(({ title, body }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                animate={findingsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.08 * i }}
                className="border border-teal/12 rounded-2xl bg-teal-deep/60 p-6"
              >
                <div className="w-8 h-[2px] bg-copper rounded-full mb-4" />
                <h3 className="font-serif text-copper-light text-base font-semibold mb-3 leading-snug">{title}</h3>
                <p className="font-sans text-stone-teal/60 text-sm leading-relaxed">{body}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={findingsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 items-start sm:items-center"
          >
            <a href={PHONE} className="inline-flex items-center gap-2 font-sans text-sm px-6 py-3 border border-copper/40 text-copper-light rounded-lg hover:bg-copper/10 transition-colors">
              <Phone size={15} />
              Call us: {PHONE_DISPLAY}
            </a>
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 btn-whatsapp font-sans text-sm px-6 py-3">
              <MessageCircle size={15} />
              WhatsApp
            </a>
            <a href="#book-mattress" className="inline-flex items-center gap-2 btn-copper font-sans text-sm px-6 py-3">
              <CalendarCheck size={15} />
              Book Online
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── 6. STEP-BY-STEP PROCESS ─────────────────────────────────────────── */}
      <section ref={processRef} className="bg-ivory py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={processInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-14"
          >
            <SectionTag>Our Process</SectionTag>
            <h2 className="font-serif text-teal-deep text-3xl md:text-4xl font-bold mb-4 max-w-2xl leading-tight">
              How Do We Clean Your Mattress?{" "}
              <span className="italic font-normal text-charcoal/40">Step-by-Step</span>
            </h2>
            <p className="font-sans text-slate-teal/70 text-sm leading-relaxed max-w-3xl">
              Here&apos;s the step-by-step process of what happens when our team arrives for a mattress
              dry cleaning in Delhi appointment.
            </p>
          </motion.div>

          <div className="relative">
            {/* Vertical connector line */}
            <div className="absolute left-7 top-8 bottom-8 w-px bg-gradient-to-b from-teal/40 via-teal/20 to-transparent hidden md:block" />

            <div className="space-y-5">
              {[
                {
                  step: "01",
                  title: "Inspection and Assessment",
                  body: "Before the cleaning begins, the mattress has to be checked for fabric type, stain types and locations, assessing the overall condition of your mattress, treatment required, and checking where the odour has built up the most. This helps us determine where we would focus the most.",
                  image: "/img/Mattress/1.webp",
                },
                {
                  step: "02",
                  title: "High-Power Dry Vacuuming",
                  body: "An industrial HEPA vacuum is used to remove the loose surface debris, dead skin cells, dust, and any other surface matter. This step removes a significant amount of contamination before we even begin any chemical treatment.",
                },
                {
                  step: "03",
                  title: "Stain Pre-Treatment",
                  body: "The stains that were identified are treated separately with unique treatments; sweat and body oils receive a different treatment than urine, which again receives a different treatment than food or beverage stains. A solvent is applied and then left for some time to break them down chemically before extraction.",
                },
                {
                  step: "04",
                  title: "Low-Moisture Deep Cleaning",
                  body: "Unlike sofas or carpets, mattresses cannot handle water saturation. The excess water, if used, gets very hard to extract and gets trapped inside the mattress, which leads to fungus formation. We use a low-moisture extraction method, applying just enough liquid to clean without oversaturating the foam.",
                  image: "/img/Mattress/2.webp",
                },
                {
                  step: "05",
                  title: "Bio-Enzymatic Treatment on Targeted Spots",
                  body: "For urine and other biological stains, we apply a bio-enzymatic solution to chemically break down the organic compounds that were responsible for the false odour. We do not just mask the problems — we cure them.",
                },
                {
                  step: "06",
                  title: "UV-C Sanitisation",
                  body: "This is where mattress cleaning differs significantly from upholstery cleaning. We use UV-C light treatment across the mattress surface, which is proven to deactivate dust bacteria, and certain mould spores without any chemical or moisture involvement. This step is particularly valuable for allergy sufferers.",
                },
                {
                  step: "07",
                  title: "Extraction and Drying",
                  body: "Any moisture that is left after our cleaning process is extracted using our extraction equipment. After that, we use Air Movers to dry your mattress completely. Your mattress stays a bit damp while we leave, and would be ready to sleep on in 3 to 5 hours.",
                },
                {
                  step: "08",
                  title: "Final Inspection",
                  body: "A final check is performed to confirm that the mattress is dry, treated areas have been completely cleaned, and the surface is ready for use. We will consult with you before declaring our job complete.",
                },
              ].map(({ step, title, body, image }, i) => (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: -16 }}
                  animate={processInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.07 * i }}
                  className="grid md:grid-cols-[56px_1fr] gap-4 md:gap-8 items-start"
                >
                  <div className="relative flex flex-col items-center">
                    <div className="w-14 h-14 rounded-2xl bg-teal-deep border border-teal/25 flex items-center justify-center shrink-0 shadow-md z-10">
                      <span className="font-serif text-copper-light text-base font-bold">{step}</span>
                    </div>
                  </div>
                  <div className={`bg-white border border-mist rounded-2xl p-6 ${image ? "grid md:grid-cols-[1fr_200px] gap-6 items-center" : ""}`}>
                    <div>
                      <h3 className="font-serif text-teal-deep text-lg font-semibold mb-2">
                        Step {step}: {title}
                      </h3>
                      <p className="font-sans text-slate-teal/70 text-sm leading-relaxed">{body}</p>
                    </div>
                    {image && (
                      <div className="relative aspect-video rounded-xl overflow-hidden border border-mist hidden md:block">
                        <Image src={image} alt={title} fill className="object-cover" />
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={processInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.7 }}
            className="mt-10 flex flex-wrap gap-4 items-center"
          >
            <a href="#book-mattress" className="inline-flex items-center gap-2 btn-primary font-sans text-sm px-6 py-3">
              <CalendarCheck size={15} />
              Book Same-Day Services
            </a>
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 btn-whatsapp font-sans text-sm px-6 py-3">
              <MessageCircle size={15} />
              Check Our Bulk Rates
            </a>
            <a href={PHONE} className="inline-flex items-center gap-2 font-sans text-sm text-slate-teal/60 hover:text-teal transition-colors">
              <Phone size={13} />
              Request Callback
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── 7. SANITISATION — why it's separate ─────────────────────────────── */}
      <section ref={sanitisationRef} className="bg-teal-deep teal-texture py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
          <div className="grid lg:grid-cols-[1fr_360px] gap-14 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={sanitisationInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
              >
                <SectionTag dark>Why Sanitisation Matters</SectionTag>
                <h2 className="font-serif text-ivory-warm text-3xl md:text-4xl font-bold mb-4 max-w-2xl leading-tight">
                  Mattress Sanitisation Services:{" "}
                  <span className="italic font-normal text-stone-teal/40">A Separate Essential Step</span>
                </h2>
                <p className="font-sans text-stone-teal/65 text-sm leading-relaxed mb-6 max-w-2xl">
                  Mattress sanitisation services deserve their own explanation because cleaning and
                  sanitising are genuinely two different things, and a lot of cleaning services skip the
                  second entirely.
                </p>
                <p className="font-sans text-stone-teal/65 text-sm leading-relaxed mb-8 border-l-[3px] border-copper/30 pl-5 max-w-2xl">
                  <strong className="text-copper-light">Cleaning</strong> removes visible contamination:
                  stains, dust, surface debris.{" "}
                  <strong className="text-copper-light">Sanitisation</strong> addresses what you can&apos;t
                  see: the dust mite population living in the mattress, the bacterial colonies in
                  sweat-affected areas, and the fungus that may have developed in humid conditions.
                </p>
              </motion.div>

              <div className="grid sm:grid-cols-3 gap-4 mb-8">
                {[
                  {
                    title: "Why UV-C Specifically",
                    body: "UV-C light at the correct wavelength can deactivate the DNA structure of bacteria, dust mites, and certain fungi without using any chemicals and without adding any moisture to the mattress — making it uniquely suited to mattress treatment.",
                  },
                  {
                    title: "Why This Matters for Allergy Sufferers",
                    body: "Dust mite allergen is one of the most common triggers for asthma, eczema, and chronic rhinitis, and mattresses are consistently the highest-concentration source. Sanitisation is the step that actually addresses the health-relevant problem.",
                  },
                  {
                    title: "Standalone Sanitisation Option",
                    body: "For mattresses that are relatively stain-free but haven't had attention in a long time, we offer a sanitisation-focused service — HEPA vacuuming plus full UV-C treatment — at a lower price than the full deep clean.",
                  },
                ].map(({ title, body }, i) => (
                  <motion.div
                    key={title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={sanitisationInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.15 * i }}
                    className="border border-teal/15 rounded-2xl bg-teal-dark/40 p-5"
                  >
                    <div className="w-6 h-[2px] bg-copper rounded-full mb-3" />
                    <h3 className="font-serif text-copper-light text-sm font-semibold mb-2 leading-snug">{title}</h3>
                    <p className="font-sans text-stone-teal/55 text-xs leading-relaxed">{body}</p>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={sanitisationInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.55 }}
                className="flex flex-wrap gap-4"
              >
                <a href="#book-mattress" className="inline-flex items-center gap-2 btn-whatsapp font-sans text-sm px-6 py-3">
                  <MessageCircle size={15} />
                  Book Sanitisation Today
                </a>
                <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-sans text-sm px-6 py-3 border border-copper/40 text-copper-light rounded-lg hover:bg-copper/10 transition-colors">
                  <MessageCircle size={15} />
                  Chat with us on WhatsApp
                </a>
              </motion.div>
            </div>

            {/* Right image */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={sanitisationInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-teal/20 shadow-2xl">
                <Image
                  src="/img/Mattress/3.webp"
                  alt="UV-C sanitisation treatment for mattress in Delhi"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-teal-deep/60 via-transparent to-transparent" />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-teal-dark border border-teal/20 rounded-2xl p-4 max-w-[180px] shadow-xl">
                <Zap size={18} className="text-copper mb-2" />
                <p className="font-serif text-ivory-warm text-sm font-semibold leading-snug">UV-C Sanitisation Included as Standard</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 8. MATTRESS TYPES WE CLEAN ───────────────────────────────────────── */}
      <section ref={mattressTypesRef} className="bg-ivory-warm py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={mattressTypesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-14"
          >
            <SectionTag>All Types Welcome</SectionTag>
            <h2 className="font-serif text-teal-deep text-3xl md:text-4xl font-bold mb-4 max-w-2xl leading-tight">
              What Types of Mattresses{" "}
              <span className="italic font-normal text-charcoal/40">Do We Clean?</span>
            </h2>
            <p className="font-sans text-slate-teal/70 text-sm leading-relaxed max-w-3xl">
              Every type of mattress gets individual treatment considering material type, density, and
              cleaning requirements. If you&apos;re unsure about your specific mattress type, we will inspect
              it and inform you before beginning any treatment.
            </p>
          </motion.div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="border-b-2 border-teal/20">
                  <th className="font-sans text-xs uppercase tracking-[0.15em] text-teal font-semibold text-left pb-4 pr-6">Mattress Type</th>
                  <th className="font-sans text-xs uppercase tracking-[0.15em] text-teal font-semibold text-left pb-4">Cleaning Considerations</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { type: "Single / Twin", note: "Faster cleaning and drying, ideal for routine cleaning" },
                  { type: "Double", note: "Standard process, most common bookings" },
                  { type: "Queen", note: "Slightly extended cleaning time, full process applied" },
                  { type: "King", note: "Largest surface area, takes the longest for a single mattress" },
                  { type: "Orthopaedic / Memory Foam", note: "Requires low-moisture method as memory foam retains moisture much longer than a normal mattress", highlight: true },
                  { type: "Kids Mattress", note: "Often needs bio-enzymatic treatment; requires extra attention if a waterproofing layer is applied", highlight: true },
                  { type: "Spring Mattress", note: "Can tolerate more moisture than foam; standard extraction treatment required" },
                  { type: "Latex Mattress", note: "Natural material requires low-moisture, pH-neutral treatment", highlight: true },
                ].map(({ type, note, highlight }, i) => (
                  <motion.tr
                    key={type}
                    initial={{ opacity: 0, x: -12 }}
                    animate={mattressTypesInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.06 * i }}
                    className={`border-b border-mist transition-colors hover:bg-ivory-teal ${highlight ? "bg-teal/3" : ""}`}
                  >
                    <td className="py-4 pr-6">
                      <span className={`font-serif text-sm font-semibold ${highlight ? "text-teal" : "text-teal-deep"}`}>{type}</span>
                    </td>
                    <td className="py-4">
                      <span className="font-sans text-slate-teal/70 text-sm leading-relaxed">{note}</span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={mattressTypesInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6 }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <a href={PHONE} className="inline-flex items-center gap-2 font-sans text-sm px-6 py-3 border border-teal/30 text-teal rounded-lg hover:bg-teal/5 transition-colors">
              <Phone size={15} />
              Call us to know your mattress type
            </a>
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 btn-whatsapp font-sans text-sm px-6 py-3">
              <MessageCircle size={15} />
              Chat with us on WhatsApp
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── 9. DIY vs PROFESSIONAL ──────────────────────────────────────────── */}
      <section ref={diyVsProRef} className="bg-teal-deep teal-texture py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={diyVsProInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-14"
          >
            <SectionTag dark>DIY vs Professional</SectionTag>
            <h2 className="font-serif text-ivory-warm text-3xl md:text-4xl font-bold mb-4 max-w-2xl leading-tight">
              DIY Mattress Cleaning{" "}
              <span className="italic font-normal text-stone-teal/40">vs Professional Cleaning</span>
            </h2>
            <p className="font-sans text-stone-teal/65 text-sm leading-relaxed max-w-3xl">
              We know you feel you can do it all with some baking soda and a vacuum on a relaxing Sunday
              afternoon; however, mattress cleaning at home is just touching the surface of your mattress
              problem — sometimes, not even that.
            </p>
          </motion.div>

          <div className="overflow-x-auto mb-10">
            <table className="w-full min-w-[620px] border-collapse">
              <thead>
                <tr>
                  <th className="font-sans text-xs uppercase tracking-[0.15em] text-stone-teal/60 font-semibold text-left pb-4 pr-4 border-b border-teal/15 w-1/3">Issues Covered</th>
                  <th className="font-sans text-xs uppercase tracking-[0.15em] text-stone-teal/60 font-semibold text-center pb-4 px-4 border-b border-teal/15 w-1/3">
                    <span className="text-stone-teal/40">DIY Cleaning</span>
                  </th>
                  <th className="font-sans text-xs uppercase tracking-[0.15em] text-copper font-semibold text-center pb-4 pl-4 border-b border-teal/15 w-1/3">
                    Professional Mattress Cleaning
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  { issue: "Surface dust removal", diy: "Partially effective", pro: "Fully effective with HEPA vacuum" },
                  { issue: "Dust mite & allergen reduction", diy: "Minimal to none", pro: "UV-C sanitisation addresses this directly" },
                  { issue: "Stain removal", diy: "Often spreads the stain or sets it deeper", pro: "Targeted stain treatment by stain type" },
                  { issue: "Odour treatment", diy: "Mask it temporarily", pro: "Neutralisation at source with bio-enzyme treatment" },
                  { issue: "Mould risk", diy: "High if moisture gets inside without extraction", pro: "Low-moisture methods with deep machine extraction" },
                  { issue: "Deep foam contamination", diy: "Cannot reach it", pro: "Extraction reaches below the surface" },
                  { issue: "Bacterial reduction", diy: "None", pro: "Anti-microbial and UV-C treatment" },
                  { issue: "Time investment", diy: "1–2 hours of your effort", pro: "Professional team handles everything" },
                ].map(({ issue, diy, pro }, i) => (
                  <motion.tr
                    key={issue}
                    initial={{ opacity: 0 }}
                    animate={diyVsProInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.06 * i }}
                    className="border-b border-teal/10 hover:bg-teal-dark/30 transition-colors"
                  >
                    <td className="py-3.5 pr-4">
                      <span className="font-sans text-stone-teal/75 text-sm">{issue}</span>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span className="font-sans text-stone-teal/40 text-sm">{diy}</span>
                    </td>
                    <td className="py-3.5 pl-4 text-center">
                      <span className="font-sans text-copper-light text-sm font-medium">{pro}</span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={diyVsProInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6 }}
            className="bg-teal-dark/60 border border-copper/20 rounded-2xl p-6 mb-8 max-w-3xl"
          >
            <div className="flex items-start gap-3">
              <AlertTriangle size={18} className="text-copper shrink-0 mt-0.5" />
              <div>
                <p className="font-sans text-copper-light text-sm font-semibold mb-1">Warning</p>
                <p className="font-sans text-stone-teal/70 text-sm leading-relaxed">
                  Never attempt to clean your mattress by deep-wetting. Your mattress&apos;s foam would absorb
                  excess moisture, and it would take days to dry. This can lead to mould formation inside
                  the core of the foam, and it would get very difficult to clean later.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={diyVsProInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.7 }}
            className="flex flex-wrap gap-4"
          >
            <a href="#book-mattress" className="inline-flex items-center gap-2 btn-whatsapp font-sans text-sm px-6 py-3">
              <MessageCircle size={15} />
              Call for a Professional Clean
            </a>
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-sans text-sm px-6 py-3 border border-copper/40 text-copper-light rounded-lg hover:bg-copper/10 transition-colors">
              <Phone size={15} />
              Get Instant Price Quote
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── 10. CLEANING FREQUENCY ───────────────────────────────────────────── */}
      <section ref={frequencyRef} className="bg-ivory py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={frequencyInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-14 text-center max-w-2xl mx-auto"
          >
            <SectionTag>Cleaning Schedule</SectionTag>
            <h2 className="font-serif text-teal-deep text-3xl md:text-4xl font-bold mb-4 leading-tight">
              How Often Should a Mattress{" "}
              <span className="italic font-normal text-charcoal/40">Be Cleaned?</span>
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
            {[
              { situation: "Standard adult mattress", frequency: "Every 6 months", icon: Home },
              { situation: "Allergy-sensitive sleepers", frequency: "Every 3–4 months", icon: Heart },
              { situation: "Children's mattress", frequency: "Every 3 months", icon: Shield },
              { situation: "Mattress with pets sleeping on it", frequency: "Every 3 months", icon: Users },
              { situation: "Mattress after illness", frequency: "Immediately, then normal schedule", icon: Zap },
              { situation: "Mattress after monsoon season", frequency: "Within 2–4 weeks after monsoon", icon: Droplets },
              { situation: "Rental property mattress", frequency: "Every change of tenancy", icon: Building2 },
              { situation: "Mattress with recent spill", frequency: "Within 2 days of the incident", icon: AlertTriangle },
              { situation: "New mattress before first use", frequency: "Optional — recommended for sanitisation", icon: Star },
            ].map(({ situation, frequency, icon: Icon }, i) => (
              <motion.div
                key={situation}
                initial={{ opacity: 0, y: 20 }}
                animate={frequencyInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.07 * i }}
                className="bg-white border border-mist hover:border-teal/30 hover:shadow-sm transition-all duration-200 rounded-2xl p-5 flex items-start gap-4"
              >
                <div className="w-9 h-9 rounded-lg bg-teal/8 border border-teal/15 flex items-center justify-center shrink-0">
                  <Icon size={15} className="text-teal" />
                </div>
                <div>
                  <p className="font-serif text-teal-deep text-sm font-semibold mb-1 leading-snug">{situation}</p>
                  <p className="font-sans text-copper text-xs font-semibold">{frequency}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={frequencyInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.7 }}
            className="font-sans text-slate-teal/65 text-sm leading-relaxed max-w-3xl border-l-[3px] border-teal/25 pl-5 mb-8"
          >
            For most Delhi homes, booking mattress deep cleaning services twice a year — once before
            and once after monsoon — can be the ideal frequency. However, if special guests are visiting,
            you have allergies, pets, or young children, you can go for more.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={frequencyInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.75 }}
            className="flex flex-wrap gap-4"
          >
            <a href="#book-mattress" className="inline-flex items-center gap-2 btn-primary font-sans text-sm px-6 py-3">
              <CalendarCheck size={15} />
              Invest in Cleaner Sleep
            </a>
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 btn-whatsapp font-sans text-sm px-6 py-3">
              <MessageCircle size={15} />
              Book Mattress Cleaning Now
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── 11. WHO BOOKS MOST OFTEN ─────────────────────────────────────────── */}
      <section ref={whoRef} className="bg-teal-deep teal-texture py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={whoInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-14"
          >
            <SectionTag dark>Our Customers</SectionTag>
            <h2 className="font-serif text-ivory-warm text-3xl md:text-4xl font-bold mb-4 max-w-2xl leading-tight">
              Who Books Mattress Cleaning{" "}
              <span className="italic font-normal text-stone-teal/40">Most Often?</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
            {[
              {
                title: "Families with Young Children",
                icon: Heart,
                body: "Bedwetting incidents, illness, and general mess that children and daily life include — family mattresses become the most vulnerable to dirtiness and hence see the highest rate of bookings. Parents book a scheduled cleaning every 2–3 months to protect their children from sneezing and skin irritation.",
              },
              {
                title: "Pet Owners",
                icon: Shield,
                body: "You can't prevent pets from sneaking into your bed, and that leaves a trail of dander, hair, and occasional accidents to deal with. Pet owners are one of our most consistent repeat customers, booking every 3–4 months, mostly.",
              },
              {
                title: "Hotels and Guesthouses",
                icon: Building2,
                body: "Hospitality businesses need to maintain certain standards, and our bed mattress cleaning services do exactly that. We maintain hygiene and extend your mattress's lifespan. As this reduces their replacement costs, hotels and guesthouses are our frequent customers.",
              },
              {
                title: "PG (Paying Guest) Accommodations",
                icon: Users,
                body: "PGs see shared accommodations and thus, offer a hygiene challenge. Multiple people occupy a mattress over a lifetime, and no individual owns it enough to maintain it. PG operators across Delhi call us frequently between tenant changes.",
              },
              {
                title: "Rental Property Owners",
                icon: Home,
                body: "Furnished rental properties include mattresses and face the same concerns as a PG. A professionally cleaned mattress makes a property attractive and helps the landlord raise rent for maintaining hygiene standards.",
              },
              {
                title: "People Recovering from Illness",
                icon: Zap,
                body: "After any illness that involved bed rest — like flu, viral, or longer recovery periods — mattress sanitisation becomes a necessity to free your mattress of the potential pathogens. That's when people remember us the most.",
              },
              {
                title: "Anyone Moving Into a New Home",
                icon: ThumbsUp,
                body: "Whether it's a new mattress or one that is inherited from the previous owners, mattress sanitisation services are the best way to gain peace of mind before sleeping in a new place for the first time.",
              },
            ].map(({ title, icon: Icon, body }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 24 }}
                animate={whoInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.07 * i }}
                className="border border-teal/15 hover:border-copper/30 transition-all duration-300 rounded-2xl bg-teal-dark/40 p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-lg bg-copper/15 border border-copper/20 flex items-center justify-center shrink-0">
                    <Icon size={16} className="text-copper" />
                  </div>
                  <h3 className="font-serif text-copper-light text-base font-semibold leading-snug">{title}</h3>
                </div>
                <p className="font-sans text-stone-teal/60 text-sm leading-relaxed">{body}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={whoInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap gap-4"
          >
            <a href="#book-mattress" className="inline-flex items-center gap-2 btn-whatsapp font-sans text-sm px-6 py-3">
              <MessageCircle size={15} />
              Book Now to Avoid Health Problems
            </a>
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-sans text-sm px-6 py-3 border border-copper/40 text-copper-light rounded-lg hover:bg-copper/10 transition-colors">
              <Phone size={15} />
              Call for a Price Quote
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── 12. WHAT WE CAN AND CANNOT FIX ──────────────────────────────────── */}
      <section ref={canCannotRef} className="bg-ivory py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={canCannotInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-14"
          >
            <SectionTag>Honest Assessment</SectionTag>
            <h2 className="font-serif text-teal-deep text-3xl md:text-4xl font-bold mb-4 max-w-2xl leading-tight">
              What Mattress Deep Cleaning{" "}
              <span className="italic font-normal text-charcoal/40">Services Can and Cannot Fix</span>
            </h2>
            <p className="font-sans text-slate-teal/70 text-sm leading-relaxed max-w-2xl">
              We believe in telling it all to you before we start so that you don&apos;t get any false
              expectations. We would not charge you for something we cannot do.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Can fix */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={canCannotInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white border border-mist rounded-2xl overflow-hidden"
            >
              <div className="h-1 bg-gradient-to-r from-teal to-copper-light" />
              <div className="p-7">
                <h3 className="font-serif text-teal-deep text-xl font-bold mb-6">What We Can Fix</h3>
                <div className="space-y-4">
                  {[
                    "Sweat stains and the discolouration they cause",
                    "Odour from sweat, biological contamination, and general use",
                    "Dust mites and allergens",
                    "Urine and food stains",
                    "Flat feeling of an unwashed mattress",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <CheckCircle size={16} className="text-teal mt-0.5 shrink-0" />
                      <span className="font-sans text-slate-teal/75 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Cannot fix */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={canCannotInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white border border-mist rounded-2xl overflow-hidden"
            >
              <div className="h-1 bg-gradient-to-r from-slate-teal/30 to-slate-teal/10" />
              <div className="p-7">
                <h3 className="font-serif text-teal-deep text-xl font-bold mb-6">What We Cannot Fully Fix</h3>
                <div className="space-y-5">
                  {[
                    {
                      title: "Deep mould in foam core",
                      note: "Surface mould is still treatable, but the mould that has established itself in the internal foam means that the foam has to be replaced, not just cleaned. We'll tell you this during the inspection.",
                    },
                    {
                      title: "Structural sagging or indentation",
                      note: "Cleaning solves the hygiene problem, not the physical support structure of an ageing mattress. A mattress that has sagged would still sag after cleaning.",
                    },
                    {
                      title: "Very old stains treated with wrong products",
                      note: "DIY scrubbing with bleach or detergents can alter the chemistry of the stain. The stain has now become a part of the fabric and cannot be treated.",
                    },
                    {
                      title: "Permanent discolouration from sun exposure",
                      note: "We only clean the mattress; we cannot restore UV fading of the fabric or cover.",
                    },
                  ].map(({ title, note }) => (
                    <div key={title} className="flex items-start gap-3">
                      <div className="w-4 h-4 rounded border-2 border-slate-teal/25 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-sans text-slate-teal/80 text-sm font-semibold mb-0.5">{title}</p>
                        <p className="font-sans text-slate-teal/55 text-xs leading-relaxed">{note}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={canCannotInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.55 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <a href="#book-mattress" className="inline-flex items-center gap-2 btn-primary font-sans text-sm px-6 py-3">
              <CalendarCheck size={15} />
              Don't Wait for Allergies to Strike
            </a>
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 btn-whatsapp font-sans text-sm px-6 py-3">
              <MessageCircle size={15} />
              Let Us Clean Your Mattress Now
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── 13. BEDSHEET vs MATTRESS CLEANING ───────────────────────────────── */}
      <section ref={bedsheetRef} className="bg-teal-deep teal-texture py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={bedsheetInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-14"
          >
            <SectionTag dark>Common Misconception</SectionTag>
            <h2 className="font-serif text-ivory-warm text-3xl md:text-4xl font-bold mb-4 max-w-2xl leading-tight">
              Normal Bedsheet Cleaning vs Mattress Cleaning:{" "}
              <span className="italic font-normal text-stone-teal/40">Why Both Matter</span>
            </h2>
            <p className="font-sans text-stone-teal/65 text-sm leading-relaxed max-w-3xl">
              If you wash your bedsheet regularly, is your mattress not already protected? The answer
              is a big no. Here&apos;s why:
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-5 mb-10">
            {[
              {
                title: "A bedsheet is only a barrier, not a seal",
                body: "A bedsheet cannot protect the mattress from sweat, dust, and mould, just like a mattress cover can't. They pass through fabric, and changing the bedsheet only cleans the layer that touches your skin, not what happens underneath that.",
              },
              {
                title: "Mattress protectors slow contamination, but don't stop it",
                body: "A good waterproof mattress protector can protect it against immediate spills, but dust, humidity, and body heat still interact with your mattress and also with your mattress protector, making it necessary to get them both cleaned.",
              },
              {
                title: "Dust mites live in the mattress, not just the sheets",
                body: "Dust mites thrive in the warm, humid environment inside the mattress foam and washing the bedsheet would not change what they're doing to your mattress at all.",
              },
              {
                title: "The bottom line",
                body: "Bedsheet cleaning fixes the layer that is in touch with your skin, but mattress deep cleaning handles everything beneath it, neutralising odour at source, cleaning off dust mites and sweat residue. Both are necessary for a hygienic living. Neither can replace the other.",
              },
            ].map(({ title, body }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                animate={bedsheetInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 * i }}
                className="border border-teal/12 rounded-2xl bg-teal-dark/40 p-6"
              >
                <div className="w-6 h-[2px] bg-copper rounded-full mb-3" />
                <h3 className="font-serif text-copper-light text-base font-semibold mb-3 leading-snug">{title}</h3>
                <p className="font-sans text-stone-teal/60 text-sm leading-relaxed">{body}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={bedsheetInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.55 }}
            className="flex flex-wrap gap-4"
          >
            <a href="#book-mattress" className="inline-flex items-center gap-2 btn-whatsapp font-sans text-sm px-6 py-3">
              <MessageCircle size={15} />
              Book Your Mattress Refresh Today
            </a>
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-sans text-sm px-6 py-3 border border-copper/40 text-copper-light rounded-lg hover:bg-copper/10 transition-colors">
              <Zap size={15} />
              Start Sleeping Cleaner This Week
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── 14. WHY CHOOSE US ────────────────────────────────────────────────── */}
      <section ref={whyUsRef} className="bg-ivory py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={whyUsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-14"
          >
            <SectionTag>Why DryClean Masters</SectionTag>
            <h2 className="font-serif text-teal-deep text-3xl md:text-4xl font-bold mb-4 max-w-2xl leading-tight">
              Why Choose DryClean Masters{" "}
              <span className="italic font-normal text-charcoal/40">for Mattress Cleaning in Delhi?</span>
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-[1fr_360px] gap-14 items-start">
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                {
                  title: "9,000+ Mattresses Sanitised",
                  body: "Across Delhi homes, hotels, and PGs — a track record that speaks for itself.",
                  icon: Award,
                },
                {
                  title: "Specialist Low-Moisture Method",
                  body: "Mattresses require different treatment than carpets or sofas. Our process is designed to clean deeply without over-saturating the foam, protecting your mattress from mould risk.",
                  icon: Droplets,
                },
                {
                  title: "UV-C Sanitisation Included as Standard",
                  body: "Unlike many local services that offer cleaning without sanitisation, our process includes UV-C treatment as standard, addressing dust mites and bacteria at a level surface cleaning alone never reaches.",
                  icon: Zap,
                },
                {
                  title: "Bio-Enzymatic Stain Expertise",
                  body: "Urine, sweat, and biological stains require specific enzymatic chemistry to genuinely break down rather than mask. Our technicians are trained in stain-specific treatment selection, not a single generic product for every situation.",
                  icon: Shield,
                },
                {
                  title: "Doorstep Convenience, No Transport",
                  body: "We come to you. Your mattress never leaves your home, and there's no risk of damage or contamination during transport that off-site cleaning services involve.",
                  icon: Home,
                },
                {
                  title: "Honest, Transparent Expectations",
                  body: "We tell you what we can fix and what we genuinely cannot — before starting any work, not as a disclaimer at the end, but as part of the inspection conversation.",
                  icon: ThumbsUp,
                },
                {
                  title: "Same-Day Service Across Delhi",
                  body: "For urgent situations — a fresh stain, an unexpected guest, or a pre-move-in deadline — same-day booking is available across most Delhi areas when you contact us before noon.",
                  icon: Clock,
                },
                {
                  title: "Trained, Background-Verified Technicians",
                  body: "Every technician handling your mattress is professionally trained in our specific protocols and verified before joining our team.",
                  icon: Users,
                },
              ].map(({ title, body, icon: Icon }, i) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={whyUsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.06 * i }}
                  className="bg-white border border-mist hover:border-teal/30 hover:shadow-sm transition-all duration-200 rounded-2xl p-5"
                >
                  <div className="w-9 h-9 rounded-xl bg-teal/8 border border-teal/15 flex items-center justify-center mb-4">
                    <Icon size={16} className="text-teal" />
                  </div>
                  <h3 className="font-serif text-teal-deep text-sm font-semibold mb-2 leading-snug">{title}</h3>
                  <p className="font-sans text-slate-teal/65 text-xs leading-relaxed">{body}</p>
                </motion.div>
              ))}
            </div>

            {/* Right side image stack */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={whyUsInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="hidden lg:flex flex-col gap-4 sticky top-24"
            >
              <div className="relative aspect-square rounded-2xl overflow-hidden border border-mist shadow-xl">
                <Image
                  src="/img/Mattress/4.webp"
                  alt="DryClean Masters mattress cleaning team in Delhi"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-video rounded-2xl overflow-hidden border border-mist shadow-lg">
                <Image
                  src="/img/Mattress/1.webp"
                  alt="Professional mattress sanitisation process"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="bg-teal-deep border border-teal/20 rounded-2xl p-5 text-center">
                <p className="font-serif text-ivory-warm text-lg font-bold mb-1">Trust the Experts</p>
                <p className="font-sans text-stone-teal/60 text-xs mb-4">Behind Healthier Sleep</p>
                <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 btn-whatsapp font-sans text-xs px-5 py-2.5 w-full justify-center">
                  <MessageCircle size={13} />
                  Connect with Us Today
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 15. BOOKING FORM ─────────────────────────────────────────────────── */}
      <section ref={bookingFormRef} id="book-mattress" className="bg-teal-deep teal-texture py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-14 items-start">
            {/* Left info */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={bookingFormInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <SectionTag dark>Book Now</SectionTag>
              <h2 className="font-serif text-ivory-warm text-3xl md:text-4xl font-bold mb-4 max-w-xl leading-tight">
                Book Your Mattress{" "}
                <span className="italic font-normal text-stone-teal/40">Deep Clean in Delhi</span>
              </h2>
              <p className="font-sans text-stone-teal/65 text-sm leading-relaxed mb-8 max-w-md">
                It feels unimaginable to go without washing your sheets for months. Your mattress —
                where sweat, dust mites, and years of nightly contact actually happen — deserves the
                same standard of care. Fill in your details and we&apos;ll be right there.
              </p>

              <div className="space-y-4 mb-8">
                {[
                  "Inspection before starting",
                  "Transparent pricing — no surprises",
                  "Same-day slots available",
                  "Doorstep service across all Delhi areas",
                ].map((text) => (
                  <div key={text} className="flex items-center gap-3">
                    <CheckCircle size={14} className="text-copper shrink-0" />
                    <span className="font-sans text-stone-teal/70 text-sm">{text}</span>
                  </div>
                ))}
              </div>

              {/* Image */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={bookingFormInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="relative rounded-2xl overflow-hidden aspect-video border border-teal/20 shadow-xl hidden sm:block"
              >
                <Image
                  src="/img/Mattress/2.webp"
                  alt="DryClean Masters mattress cleaning team at work in Delhi"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-teal-deep/40 via-transparent to-transparent" />
              </motion.div>

              {/* Contact chips */}
              <div className="flex flex-wrap gap-3 mt-6">
                <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 btn-whatsapp font-sans text-sm px-5 py-2.5">
                  <MessageCircle size={14} />
                  WhatsApp for Instant Quote
                </a>
                <a href={PHONE} className="inline-flex items-center gap-2 font-sans text-sm px-5 py-2.5 border border-copper/40 text-copper-light rounded-lg hover:bg-copper/10 transition-colors">
                  <Phone size={14} />
                  {PHONE_DISPLAY}
                </a>
              </div>
            </motion.div>

            {/* Right form */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={bookingFormInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white rounded-2xl border border-mist shadow-2xl overflow-hidden"
            >
              <div className="h-1 bg-gradient-to-r from-teal via-copper-light to-teal-deep" />
              <div className="p-7">
                {bookingSubmitted ? (
                  <div className="flex flex-col items-center text-center py-8 gap-4">
                    <div className="w-14 h-14 rounded-full bg-teal/10 border border-teal/30 flex items-center justify-center">
                      <CheckCircle size={26} className="text-teal" />
                    </div>
                    <div>
                      <h3 className="font-serif text-teal-deep text-xl font-bold mb-1.5">
                        Booking Confirmed!
                      </h3>
                      <p className="font-sans text-slate-teal/60 text-sm max-w-xs">
                        We&apos;ve received your mattress cleaning request for{" "}
                        <span className="font-semibold text-charcoal">{bookingForm.date}</span>. Our
                        team will call you shortly to confirm.
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setBookingSubmitted(false);
                        setBookingForm({ name: "", phone: "", email: "", date: "", timeSlot: "", address: "", notes: "" });
                      }}
                      className="font-sans text-xs text-teal hover:text-teal-mid font-semibold transition-colors duration-200"
                    >
                      Book another visit
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleBookingSubmit} className="space-y-4">
                    <h3 className="font-serif text-teal-deep text-xl font-bold mb-5">Book Your Mattress Cleaning</h3>

                    {/* Name + Phone */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="font-sans text-[11px] text-slate-teal/55 uppercase tracking-[0.1em] font-semibold mb-1.5 block">
                          Full Name <span className="text-copper">*</span>
                        </label>
                        <input
                          name="name" value={bookingForm.name} required placeholder="Rahul Sharma"
                          onChange={(e) => setBookingForm((p) => ({ ...p, name: e.target.value }))}
                          className="w-full font-sans text-sm text-charcoal placeholder:text-slate-teal/30 border border-stone-teal/35 rounded-lg px-4 py-2.5 bg-ivory-warm shadow-sm focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/25 focus:bg-white transition-all duration-200"
                        />
                      </div>
                      <div>
                        <label className="font-sans text-[11px] text-slate-teal/55 uppercase tracking-[0.1em] font-semibold mb-1.5 block">
                          Phone <span className="text-copper">*</span>
                        </label>
                        <input
                          name="phone" value={bookingForm.phone} required type="tel" placeholder="+91 98765 43210"
                          onChange={(e) => setBookingForm((p) => ({ ...p, phone: e.target.value }))}
                          className="w-full font-sans text-sm text-charcoal placeholder:text-slate-teal/30 border border-stone-teal/35 rounded-lg px-4 py-2.5 bg-ivory-warm shadow-sm focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/25 focus:bg-white transition-all duration-200"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label className="font-sans text-[11px] text-slate-teal/55 uppercase tracking-[0.1em] font-semibold mb-1.5 block">
                        Email Address
                      </label>
                      <input
                        name="email" value={bookingForm.email} type="email" placeholder="rahul@example.com"
                        onChange={(e) => setBookingForm((p) => ({ ...p, email: e.target.value }))}
                        className="w-full font-sans text-sm text-charcoal placeholder:text-slate-teal/30 border border-stone-teal/35 rounded-lg px-4 py-2.5 bg-ivory-warm shadow-sm focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/25 focus:bg-white transition-all duration-200"
                      />
                    </div>

                    {/* Date + Time */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="font-sans text-[11px] text-slate-teal/55 uppercase tracking-[0.1em] font-semibold mb-1.5 block">
                          Preferred Date <span className="text-copper">*</span>
                        </label>
                        <input
                          name="date" value={bookingForm.date} required type="date" min={todayISO}
                          onChange={(e) => setBookingForm((p) => ({ ...p, date: e.target.value }))}
                          className="w-full font-sans text-sm text-charcoal border border-stone-teal/35 rounded-lg px-4 py-2.5 bg-ivory-warm shadow-sm focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/25 focus:bg-white transition-all duration-200"
                        />
                      </div>
                      <div>
                        <label className="font-sans text-[11px] text-slate-teal/55 uppercase tracking-[0.1em] font-semibold mb-1.5 block">
                          Time Slot <span className="text-copper">*</span>
                        </label>
                        <select
                          name="timeSlot" value={bookingForm.timeSlot} required
                          onChange={(e) => setBookingForm((p) => ({ ...p, timeSlot: e.target.value }))}
                          className="w-full font-sans text-sm text-charcoal border border-stone-teal/35 rounded-lg px-4 py-2.5 bg-ivory-warm shadow-sm focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/25 focus:bg-white transition-all duration-200"
                        >
                          <option value="" disabled>Select slot</option>
                          <option value="Morning">Morning (8 AM – 12 PM)</option>
                          <option value="Afternoon">Afternoon (12 PM – 4 PM)</option>
                          <option value="Evening">Evening (4 PM – 8 PM)</option>
                        </select>
                      </div>
                    </div>

                    {/* Address */}
                    <div>
                      <label className="font-sans text-[11px] text-slate-teal/55 uppercase tracking-[0.1em] font-semibold mb-1.5 block">
                        Address <span className="text-copper">*</span>
                      </label>
                      <input
                        name="address" value={bookingForm.address} required placeholder="Flat 4B, Green Park, New Delhi"
                        onChange={(e) => setBookingForm((p) => ({ ...p, address: e.target.value }))}
                        className="w-full font-sans text-sm text-charcoal placeholder:text-slate-teal/30 border border-stone-teal/35 rounded-lg px-4 py-2.5 bg-ivory-warm shadow-sm focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/25 focus:bg-white transition-all duration-200"
                      />
                    </div>

                    {/* Notes */}
                    <div>
                      <label className="font-sans text-[11px] text-slate-teal/55 uppercase tracking-[0.1em] font-semibold mb-1.5 block">
                        Notes / Mattress Details
                      </label>
                      <textarea
                        name="notes" value={bookingForm.notes} rows={3}
                        placeholder="Mattress size, stain type, special instructions..."
                        onChange={(e) => setBookingForm((p) => ({ ...p, notes: e.target.value }))}
                        className="w-full font-sans text-sm text-charcoal placeholder:text-slate-teal/30 border border-stone-teal/35 rounded-lg px-4 py-2.5 bg-ivory-warm shadow-sm focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/25 focus:bg-white transition-all duration-200 resize-none"
                      />
                    </div>

                    {bookingError && (
                      <p className="font-sans text-xs text-amber-600 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
                        {bookingError}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={bookingLoading}
                      className="w-full inline-flex items-center justify-center gap-2.5 btn-primary font-sans text-sm px-7 py-3.5 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {bookingLoading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                          Submitting…
                        </>
                      ) : (
                        <>
                          <CalendarCheck size={16} />
                          Book Mattress Cleaning Now
                        </>
                      )}
                    </button>

                    <p className="font-sans text-[11px] text-slate-teal/45 text-center">
                      24-hour service · All Delhi areas · Doorstep visit
                    </p>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 16. FAQ ──────────────────────────────────────────────────────────── */}
      <section ref={faqRef} className="bg-ivory py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
          <div className="grid lg:grid-cols-[1fr_480px] gap-16 items-start">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={faqInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
                className="mb-8"
              >
                <SectionTag>FAQ</SectionTag>
                <h2 className="font-serif text-teal-deep text-3xl md:text-4xl font-bold mb-4 leading-tight">
                  Frequently Asked Questions
                </h2>
                <p className="font-sans text-slate-teal/70 text-sm leading-relaxed">
                  Everything you need to know about our mattress cleaning services in Delhi.
                </p>
              </motion.div>

              <div className="space-y-3">
                {faqs.map(({ q, a }, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 12 }}
                    animate={faqInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.04 * i }}
                    className="bg-white border border-mist rounded-xl overflow-hidden"
                  >
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-ivory-teal transition-colors duration-200"
                    >
                      <span className="font-sans text-sm font-semibold text-teal-deep leading-snug">{q}</span>
                      <ChevronDown
                        size={16}
                        className={`text-teal/60 shrink-0 transition-transform duration-300 ${openFaq === i ? "rotate-180" : ""}`}
                      />
                    </button>
                    <AnimatePresence>
                      {openFaq === i && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="px-5 pb-4 border-t border-mist">
                            <p className="font-sans text-slate-teal/70 text-sm leading-relaxed pt-3">{a}</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right sticky summary */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={faqInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="hidden lg:block sticky top-24 space-y-5"
            >
              <div className="bg-teal-deep border border-teal/15 rounded-2xl p-6">
                <Star size={18} className="text-copper mb-3" />
                <p className="font-serif text-ivory-warm text-lg font-bold mb-1">4.9/5 Rating</p>
                <p className="font-sans text-stone-teal/55 text-xs mb-4">Based on 9,000+ mattress cleans across Delhi</p>
                <div className="space-y-2">
                  {[
                    "9,000+ mattresses sanitised",
                    "24/7 availability",
                    "Same-day service available",
                    "All Delhi areas covered",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-2">
                      <CheckCircle size={12} className="text-copper shrink-0" />
                      <span className="font-sans text-stone-teal/65 text-xs">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative aspect-square rounded-2xl overflow-hidden border border-mist shadow-lg">
                <Image
                  src="/img/Mattress/3.webp"
                  alt="Professional mattress cleaning result in Delhi"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="bg-white border border-mist rounded-2xl p-5 text-center">
                <p className="font-sans text-slate-teal/50 text-xs uppercase tracking-wider mb-2">Still have questions?</p>
                <p className="font-serif text-teal-deep text-base font-bold mb-4 leading-snug">We&apos;re available 24/7 to help you</p>
                <div className="flex flex-col gap-2">
                  <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 btn-whatsapp font-sans text-xs px-5 py-2.5">
                    <MessageCircle size={13} />
                    Text us your questions
                  </a>
                  <a href={PHONE} className="inline-flex items-center justify-center gap-2 font-sans text-xs px-5 py-2.5 border border-teal/25 text-teal rounded-lg hover:bg-teal/5 transition-colors">
                    <Phone size={13} />
                    {PHONE_DISPLAY}
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 17. FINAL CTA ────────────────────────────────────────────────────── */}
      <section ref={ctaRef} className="bg-teal-deep teal-texture py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            {/* Left content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={ctaInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <SectionTag dark>Book Today</SectionTag>
              <h2 className="font-serif text-ivory-warm text-3xl md:text-4xl font-bold mb-5 leading-tight max-w-xl">
                Book Your Mattress Deep Clean{" "}
                <span className="italic font-normal text-stone-teal/40">in Delhi Today!</span>
              </h2>
              <p className="font-sans text-stone-teal/65 text-sm leading-relaxed mb-6 max-w-lg">
                It feels unimaginable to go without washing your sheets for months, right? Your mattress,
                where sweat, dust mites, and years of nightly contact actually happen, deserves the same
                standard of care — just on a longer cycle.
              </p>
              <p className="font-sans text-stone-teal/65 text-sm leading-relaxed mb-8 max-w-lg">
                Whether you need urgent mattress dry cleaning in Delhi for a fresh stain or routine
                mattress sanitisation services, our team is ready at your beck and call. A genuinely clean
                mattress means better sleep, fewer allergies, no false odour, and the simple peace of mind
                that comes from knowing exactly what you are lying on every night.
              </p>

              <div className="flex flex-wrap gap-4 mb-8">
                <a href="#book-mattress" className="inline-flex items-center gap-2.5 btn-whatsapp font-sans text-sm px-7 py-3.5">
                  <CalendarCheck size={16} />
                  Book Mattress Cleaning Now
                </a>
                <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5 font-sans text-sm px-7 py-3.5 border border-copper/40 text-copper-light rounded-lg hover:bg-copper/10 transition-colors">
                  <MessageCircle size={16} />
                  WhatsApp for Instant Quote
                </a>
              </div>

              <a href={PHONE} className="inline-flex items-center gap-2 text-stone-teal/55 hover:text-copper-light transition-colors font-sans text-sm">
                <Phone size={14} />
                Call / WhatsApp: {PHONE_DISPLAY} — Available 24 hours, 7 days a week
              </a>
            </motion.div>

            {/* Right checklist + image */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={ctaInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="space-y-5"
            >
              <div className="relative aspect-video rounded-2xl overflow-hidden border border-teal/20 shadow-2xl">
                <Image
                  src="/img/Mattress/3.webp"
                  alt="Clean mattress after DryClean Masters professional service in Delhi"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-teal-deep/60 via-transparent to-transparent" />
              </div>

              <div className="bg-teal-dark/60 border border-teal/15 rounded-2xl p-6">
                <p className="font-sans text-copper text-xs uppercase tracking-wider font-semibold mb-4">What You Get</p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    "Inspection before starting",
                    "Transparent pricing",
                    "Same-day slots available",
                    "Doorstep service",
                    "UV-C sanitisation included",
                    "24/7 availability",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-2.5">
                      <CheckCircle size={13} className="text-copper shrink-0" />
                      <span className="font-sans text-stone-teal/75 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                {[
                  { label: "Doorstep Service", sub: "No transport needed" },
                  { label: "All Delhi Areas", sub: "We come to you" },
                  { label: "₹399 onwards", sub: "Transparent pricing" },
                ].map(({ label, sub }) => (
                  <div key={label} className="bg-teal-deep/80 border border-teal/15 rounded-xl px-4 py-3 flex-1 min-w-[120px] text-center">
                    <p className="font-serif text-copper-light text-sm font-bold">{label}</p>
                    <p className="font-sans text-stone-teal/50 text-[10px] mt-0.5">{sub}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

    </main>
  );
}
