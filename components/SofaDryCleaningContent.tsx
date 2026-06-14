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
  Leaf,
  Award,
  Users,
  AlertCircle,
  CalendarCheck,
} from "lucide-react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

const todayISO = new Date().toISOString().split("T")[0];

const PHONE = "tel:+918882625522";
const PHONE_DISPLAY = "+91 8882625522";
const WA_LINK =
  "https://wa.me/918882625522?text=Hi%2C%20I%20want%20to%20book%20sofa%20dry%20cleaning%20in%20Delhi";

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
    q: "What are the sofa dry cleaning charges in Delhi?",
    a: "Our pricing starts at ₹200 per seat for standard fabric sofas with dry cleaning, and ₹250 per seat for wet shampoo cleaning. A 3-seater sofa dry clean starts from approximately ₹600. Leather sofa cleaning and polishing Delhi starts at ₹350 per seat. All prices are confirmed after a free in-person inspection.",
  },
  {
    q: "How do I find reliable sofa dry cleaning near me in Delhi?",
    a: "DryClean Masters provides doorstep sofa dry cleaning across all Delhi areas - South, North, East, West, and Central. You can book via our website, call us at +91 8882625522, or WhatsApp us for a same-day or next-day appointment.",
  },
  {
    q: "How long does sofa dry cleaning take?",
    a: "For a standard 3-seater sofa, the dry cleaning process takes approximately 1.5 to 2.5 hours. A full 7-seater set takes 3 to 4 hours. Wet shampoo cleaning takes slightly longer due to the drying process.",
  },
  {
    q: "How long before a shampooed sofa is ready to use?",
    a: "After wet shampoo cleaning with our high-power moisture extraction, sofas are typically dry and ready to sit on within 3 to 5 hours.",
  },
  {
    q: "Is dry cleaning safe for velvet and suede sofas?",
    a: "Yes! In fact, dry cleaning is the only recommended method for velvet and genuine suede. Wet washing or steam cleaning can permanently damage the pile of velvet and cause severe water-marking on suede. Our velvet and suede cleaning methods are specifically designed to protect these sensitive fabrics.",
  },
  {
    q: "What is included in leather sofa cleaning and polishing in Delhi?",
    a: "Our full leather care package includes pH-balanced deep cleaning to remove surface grime and body oil, deep conditioning to restore moisture and prevent cracking, colour-matched polishing to restore surface lustre, and a UV-protective finishing coat. We stock products matched to all leather types, including full grain, aniline, semi-aniline, and pigmented leather.",
  },
  {
    q: "Can you remove old, set-in stains from sofas?",
    a: "In many cases, yes, but results depend on the stain type, the fabric, how long the stain has been there, and whether previous DIY cleaning attempts have altered it. Our technician will assess each stain during the inspection and give you an honest answer before cleaning begins.",
  },
  {
    q: "Do you bring your own equipment and chemicals?",
    a: "Yes, entirely. Our technicians arrive with professional industrial extraction equipment, HEPA vacuums, full chemical kits, protective covers, and all necessary tools. You don't need to provide anything.",
  },
  {
    q: "Is the sofa dry cleaning service safe for children and pets?",
    a: "All our products are non-toxic, biodegradable, and free from harmful chemical residues. We recommend keeping children and pets away from the sofa during cleaning and for approximately 1 hour after. Once the sofa is dry, it is completely safe.",
  },
  {
    q: "Why should I choose DryClean Masters over other sofa dry cleaners in Delhi?",
    a: "10+ years of specialist upholstery experience, 40+ certified technicians, free in-person inspection, fabric-safe guarantee, eco-safe chemical standards, transparent pricing, and a track record of 12,000+ sofa cleans across Delhi. When searching for the best sofa dry cleaners in Delhi, our combination of expertise, safety standards, and results consistency is what sets us apart.",
  },
  {
    q: "Do you offer same-day sofa dry cleaning in Delhi?",
    a: "Yes. For most Delhi areas, same-day doorstep service is available when you book before noon. Contact us via WhatsApp or phone to check same-day availability for your specific location.",
  },
  {
    q: "How often should I get my sofa professionally cleaned?",
    a: "For a sofa in regular daily use in a Delhi home, professional cleaning every 6 to 12 months is recommended. Homes with pets, young children, or allergy sufferers should consider cleaning every 3 to 6 months.",
  },
  {
    q: 'Can you clean a sofa with a "DryClean Only" care label?',
    a: "Yes, our dry cleaning service is specifically designed for sofas with dry-clean-only care instructions. We use low-moisture methods that comply with these care requirements.",
  },
  {
    q: "What happens if I'm not satisfied with the results?",
    a: "We offer a free redo guarantee. If any aspect of the service doesn't meet your expectations, we will address it at zero charge.",
  },
];

export default function SofaDryCleaningContent() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [heroExpanded, setHeroExpanded] = useState(false);
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
        service: "Sofa Dry Cleaning",
        createdAt: serverTimestamp(),
      });
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "booking", ...bookingForm, service: "Sofa Dry Cleaning" }),
      });
      if (!res.ok) throw new Error("email failed");
      setBookingSubmitted(true);
    } catch (err) {
      console.error("[sofa-booking]", err);
      setBookingError("Booking saved! But confirmation email failed — we'll call you shortly.");
    } finally {
      setBookingLoading(false);
    }
  }

  const heroRef = useRef<HTMLDivElement>(null);
  const problemRef = useRef<HTMLDivElement>(null);
  const whatIsRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLDivElement>(null);
  const vsRef = useRef<HTMLDivElement>(null);
  const materialRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);
  const pricingRef = useRef<HTMLDivElement>(null);
  const signsRef = useRef<HTMLDivElement>(null);
  const maintainRef = useRef<HTMLDivElement>(null);
  const healthRef = useRef<HTMLDivElement>(null);
  const whyRef = useRef<HTMLDivElement>(null);
  const areasRef = useRef<HTMLDivElement>(null);
  const addonsRef = useRef<HTMLDivElement>(null);
  const bookingFormRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const heroInView = useInView(heroRef, { once: true });
  const problemInView = useInView(problemRef, { once: true, margin: "-60px" });
  const whatIsInView = useInView(whatIsRef, { once: true, margin: "-60px" });
  const tableInView = useInView(tableRef, { once: true, margin: "-60px" });
  const vsInView = useInView(vsRef, { once: true, margin: "-60px" });
  const materialInView = useInView(materialRef, { once: true, margin: "-60px" });
  const processInView = useInView(processRef, { once: true, margin: "-60px" });
  const pricingInView = useInView(pricingRef, { once: true, margin: "-60px" });
  const signsInView = useInView(signsRef, { once: true, margin: "-60px" });
  const maintainInView = useInView(maintainRef, { once: true, margin: "-60px" });
  const healthInView = useInView(healthRef, { once: true, margin: "-60px" });
  const whyInView = useInView(whyRef, { once: true, margin: "-60px" });
  const areasInView = useInView(areasRef, { once: true, margin: "-60px" });
  const addonsInView = useInView(addonsRef, { once: true, margin: "-60px" });
  const bookingFormInView = useInView(bookingFormRef, { once: true, margin: "-60px" });
  const faqInView = useInView(faqRef, { once: true, margin: "-60px" });
  const ctaInView = useInView(ctaRef, { once: true, margin: "-60px" });

  return (
    <main>
      {/* ── 1. HERO ──────────────────────────────────────────────────────────── */}
      <section ref={heroRef} className="bg-teal-deep teal-texture py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
          <div className="grid lg:grid-cols-[1fr_420px] gap-12 items-center">
          <div>
          {/* Breadcrumb */}
          <motion.nav
            initial={{ opacity: 0 }}
            animate={heroInView ? { opacity: 1 } : {}}
            className="mb-6 flex items-center gap-2 text-stone-teal/50 text-xs font-sans"
          >
            <a href="/" className="hover:text-copper-light transition-colors">
              Home
            </a>
            <span>/</span>
            <span className="text-copper-light">Sofa Dry Cleaning Services in Delhi</span>
          </motion.nav>

          {/* Stats bar */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="flex flex-wrap gap-4 md:gap-8 mb-6"
          >
            {[
              { Icon: Star, text: "4.9/5 Rating" },
              { Icon: Users, text: "12,000+ Sofas Deep Cleaned" },
              { Icon: Award, text: "Delhi's Most Trusted Sofa Cleaners" },
            ].map(({ Icon, text }) => (
              <div key={text} className="flex items-center gap-2">
                <Icon size={14} className="text-copper" />
                <span className="font-sans text-stone-teal/80 text-sm">{text}</span>
              </div>
            ))}
          </motion.div>

          {/* H1 */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15 }}
            className="font-serif text-ivory-warm text-3xl md:text-4xl xl:text-5xl font-bold leading-[1.1] mb-6 max-w-4xl"
          >
            Sofa Dry Cleaning Services in Delhi:{" "}
            <span className="italic font-normal text-stone-teal/55">
              Doorstep Deep Cleaning Starting ₹250 Per Seat
            </span>
          </motion.h1>

          {/* Intro */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="mb-8 max-w-3xl"
          >
            <p className="font-sans text-stone-teal/70 text-sm md:text-base leading-relaxed">
              Your sofa is the most-used piece of furniture in your home and, mostly, the least properly
              cleaned. If you&apos;re looking for professional sofa dry cleaning services in Delhi that genuinely
              restore your sofa&apos;s health rather than just surface cleaning, you&apos;ve come to the right place.
              {!heroExpanded && (
                <button
                  onClick={() => setHeroExpanded(true)}
                  className="ml-1 font-semibold text-copper-light hover:text-copper underline underline-offset-2 transition-colors text-sm"
                >
                  Read more
                </button>
              )}
            </p>
            <AnimatePresence>
              {heroExpanded && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.35 }}
                  className="font-sans text-stone-teal/70 text-sm md:text-base leading-relaxed mt-2 overflow-hidden"
                >
                  DryClean Masters offers certified, doorstep sofa dry cleaning services in Delhi with
                  fabric-safe treatments that eliminate dirt, allergens, stains, and odours without excess
                  moisture or any damage to your upholstery.{" "}
                  <button
                    onClick={() => setHeroExpanded(false)}
                    className="font-semibold text-copper-light hover:text-copper underline underline-offset-2 transition-colors text-sm"
                  >
                    Read less
                  </button>
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.25 }}
            className="grid sm:grid-cols-2 gap-3 mb-8 max-w-2xl"
          >
            {[
              "Free In-Person Fabric Inspection, Zero Obligation",
              "Same-Day Doorstep Service Available",
              "100% Eco-Safe, Odourless Solvents",
              "Certified Fabric Masters, Velvet, Suede, Leather & More",
            ].map((badge) => (
              <div key={badge} className="flex items-start gap-2.5">
                <CheckCircle size={14} className="text-copper mt-0.5 shrink-0" />
                <span className="font-sans text-stone-teal/75 text-sm">{badge}</span>
              </div>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row flex-wrap gap-4 items-start sm:items-center"
          >
            <a
              href="#booking"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 btn-whatsapp font-sans text-sm px-7 py-3.5"
            >
              <MessageCircle size={16} />
              Book Now
            </a>
            <a
              href={PHONE}
              className="inline-flex items-center gap-2.5 font-sans text-sm px-7 py-3.5 border border-copper/40 text-copper-light rounded-lg hover:bg-copper/10 transition-colors"
            >
              <Phone size={16} />
              {PHONE_DISPLAY}
            </a>
            <span className="font-sans text-stone-teal/50 text-xs flex items-center gap-1.5">
              <MapPin size={12} />
              All Delhi Areas Covered
            </span>
          </motion.div>
          </div>

          {/* Hero image — desktop only */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={heroInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="relative hidden lg:block"
          >
            <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden border border-teal/20 shadow-2xl shadow-black/40">
              <Image
                src="/img/sofa_cleaning/hero_banner.webp"
                alt="Sofa dry cleaning service in Delhi - DryClean Masters"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-teal-deep/60 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5">
                <div className="bg-teal-deep/80 backdrop-blur-sm border border-teal/20 rounded-xl p-4">
                  <p className="font-sans text-copper-light text-xs font-semibold uppercase tracking-wider mb-1">12,000+ Sofas Cleaned</p>
                  <p className="font-serif text-ivory-warm text-sm italic leading-snug">
                    "Fabric-safe treatments that restore your sofa to showroom condition — right at your doorstep."
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
          </div>
        </div>
      </section>

      {/* ── 2. DELHI PROBLEM ─────────────────────────────────────────────────── */}
      <section ref={problemRef} className="bg-ivory py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={problemInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <SectionTag>The Reality</SectionTag>
            <h2 className="font-serif text-teal-deep text-3xl md:text-4xl font-bold mb-4 max-w-2xl leading-tight">
              The Delhi Sofa Problem{" "}
              <span className="italic font-normal text-charcoal/40">Nobody Talks About</span>
            </h2>
            <p className="font-sans text-slate-teal/70 text-sm leading-relaxed mb-12 max-w-3xl">
              Here&apos;s something most Delhi homeowners don&apos;t realise: your sofa is dirtier than it looks.
              Not because you&apos;re careless but because Delhi&apos;s environment makes it almost impossible for
              even the cleanest home to have a truly clean sofa.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Delhi's Pollution",
                body: "Delhi consistently ranks among the world's most polluted cities. The fine particulate matter floating through the air doesn't just affect your lungs; it settles into every surface inside your home, and fabrics are highly vulnerable to it. Your sofa fabric traps these microscopic particles within its fibres, and over weeks and months, these particles combine with sweat, body oils, pet dander, spilt food, and dust mites to form a layer of pollution that regular vacuuming cannot even reach.",
                delay: 0.1,
              },
              {
                title: "The Extreme Weather",
                body: "And it's not just the pollution; Delhi's seasonal conditions are extreme. Summers are dusty and dry, sending fine sand particles into every corner of your home. Monsoons are humid months that accelerate bacteria growth in your sofa's foam. Winters, well, the cold Delhi winters trap indoor allergens with minimal ventilation. This creates a year-round cycle that degrades your sofa from the inside.",
                delay: 0.2,
              },
              {
                title: "Family's Favourite",
                body: "Consider what your sofa absorbs every single day. Family members prefer the sofa as their favourite spot and sit on it for hours. Food and drinks are consumed on it, pets curl up on it, children play on it, sometimes using it as a trampoline, and all memories are made on it. The other thing that is made on it is 'the mess'. The average Delhi sofa that hasn't been professionally cleaned in the past year contains more bacteria per square centimetre than a public washroom surface.",
                delay: 0.3,
              },
            ].map(({ title, body, delay }) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 24 }}
                animate={problemInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay }}
                className="bg-ivory-teal border border-mist rounded-xl p-7"
              >
                <div className="w-4 h-[2px] bg-teal rounded-full mb-4" />
                <h3 className="font-serif text-teal-deep text-lg font-semibold mb-3">{title}</h3>
                <p className="font-sans text-slate-teal/70 text-sm leading-relaxed">{body}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 grid lg:grid-cols-[1fr_360px] gap-8 items-start">
            <motion.p
              initial={{ opacity: 0 }}
              animate={problemInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.5 }}
              className="font-sans text-slate-teal/70 text-sm leading-relaxed border-l-[3px] border-teal/25 pl-5"
            >
              Such a level of dirt and bacteria cannot be cleaned by a vacuum or a maid. It requires
              professional sofa dry cleaning services in Delhi, a service that understands the difference
              between a surface clean and a genuine deep sofa reformation. At DryClean Masters, we don&apos;t just
              clean sofas, we restore them. And we do it at your doorstep, using fabric-specific treatments
              that protect your sofa&apos;s upholstery while taking out what&apos;s living inside it.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={problemInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.55, duration: 0.6 }}
              className="relative rounded-2xl overflow-hidden aspect-video border border-mist shadow-lg hidden lg:block"
            >
              <Image
                src="/img/sofa_cleaning/image.webp"
                alt="Sofa in Delhi home needing professional cleaning"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 3. WHAT IS PROFESSIONAL DRY CLEANING ─────────────────────────────── */}
      <section ref={whatIsRef} className="bg-teal-deep teal-texture py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={whatIsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <SectionTag dark>Professional Standard</SectionTag>
            <h2 className="font-serif text-ivory-warm text-3xl md:text-4xl font-bold mb-4 max-w-3xl leading-tight">
              What Is Professional Sofa Dry Cleaning{" "}
              <span className="italic font-normal text-stone-teal/40">and Why Does It Matter?</span>
            </h2>
            <p className="font-sans text-stone-teal/65 text-sm leading-relaxed mb-4 max-w-3xl">
              Many people assume that &apos;dry cleaning&apos; simply means cleaning without water, or that it&apos;s just
              a fancy name for vacuuming. That might prompt one to book a basic cleaning service for their
              sofa, which is dangerous because booking the wrong type of cleaning for your sofa can cause
              permanent fabric damage.
            </p>
            <p className="font-sans text-stone-teal/65 text-sm leading-relaxed mb-12 max-w-3xl">
              Professional sofa dry cleaning is a low-moisture deep cleaning that uses chemicals and specific
              solutions to get inside the fabric, dissolve the stuck bacteria and dirt, remove stains, and
              freshen up the upholstery, all without saturating your sofa with water. It is specifically
              designed for fabrics that cannot handle high water exposure, like velvet, suede, silk blends,
              delicate woven textures, antique upholstery, and any sofa that runs a risk of colour bleeding
              or fabric shrinkage.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {[
              {
                num: "01",
                title: "Pre-Treatment Inspection",
                body: "Identifying fabric type, its dye sensitivity, stain type, and any existing damage before any chemical is applied. Our doorstep sofa dry cleaning in Delhi begins with a free in-person inspection rather than jumping straight to cleaning.",
              },
              {
                num: "02",
                title: "Dry Vacuuming",
                body: "We use high-powered vacuums with HEPA-filtered equipment to remove loose surface dust, pet hair, and large particulate matter before treatment begins. This helps prevent any surface contamination from getting inside your sofa during the cleaning process.",
              },
              {
                num: "03",
                title: "Solvent Application",
                body: "Application of a fabric-safe organic solvent that is low in moisture and dissolves oil-based stains and grease without wetting the fabric too much. Different fabric types require different solvent formulations.",
              },
              {
                num: "04",
                title: "Controlled Agitation",
                body: "Using soft-bristle upholstery brushes, we gently agitate your sofa mechanically to get the solvent through the fabric and release embedded grime without damaging delicate fibres.",
              },
              {
                num: "05",
                title: "Extraction",
                body: "After agitation, dissolved grime, solvent, or any leftover moisture is extracted using a suction method. This leaves the fabric clean, dry, and residue-free.",
              },
              {
                num: "06",
                title: "Sanitisation",
                body: "An anti-microbial sanitising agent is applied that eliminates bacteria, dust mites, and mould spores from the foam and fabric layers. The agent we use at DryClean Masters is especially designed to be fabric safe.",
              },
              {
                num: "07",
                title: "Finishing & Grooming",
                body: "After cleaning and sanitisation are done, we move on to the final fabric grooming to restore the sofa surface texture, leaving your sofa looking close to its showroom condition.",
              },
            ].map(({ num, title, body }, i) => (
              <motion.div
                key={num}
                initial={{ opacity: 0, y: 24 }}
                animate={whatIsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.07 * i }}
                className="border border-teal/15 hover:border-copper/35 hover:shadow-lg hover:shadow-copper/12 transition-all duration-300 rounded-xl bg-teal-dark p-6"
              >
                <div className="font-serif text-copper text-sm font-bold mb-3">{num}</div>
                <div className="w-4 h-[2px] bg-copper/60 rounded-full mb-3" />
                <h3 className="font-serif text-ivory-warm text-base font-semibold mb-2">{title}</h3>
                <p className="font-sans text-stone-teal/55 text-xs leading-relaxed">{body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. REGULAR vs PROFESSIONAL TABLE ─────────────────────────────────── */}
      <section ref={tableRef} className="bg-ivory py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={tableInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <SectionTag>Comparison</SectionTag>
            <h2 className="font-serif text-teal-deep text-3xl md:text-4xl font-bold mb-4 max-w-3xl leading-tight">
              Regular Sofa Cleaning vs{" "}
              <span className="italic font-normal text-charcoal/40">Professional Sofa Cleaning</span>
            </h2>
            <p className="font-sans text-slate-teal/70 text-sm leading-relaxed mb-10 max-w-3xl">
              Many homeowners believe that regular cleaning and keeping your sofa stain-free are enough to
              keep a sofa clean. Though regular maintenance is important, it only addresses surface-level
              dirt. Professional cleaning, on the other hand, targets dirt at a much deeper level.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={tableInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="overflow-x-auto rounded-xl border border-mist"
          >
            <table className="w-full font-sans text-sm">
              <thead>
                <tr className="bg-teal-deep">
                  <th className="text-left p-4 text-ivory-warm font-semibold w-1/3">Aspect</th>
                  <th className="text-left p-4 text-stone-teal/70 font-semibold w-1/3">
                    Regular Sofa Cleaning
                  </th>
                  <th className="text-left p-4 text-copper-light font-semibold w-1/3">
                    Professional Sofa Cleaning
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  [
                    "Cleaning Depth",
                    "Removes surface dust and visible dirt",
                    "Cleans deep within the fabric and cushion layers",
                  ],
                  [
                    "Equipment Used",
                    "Household vacuum cleaners, cloths, brushes",
                    "Industrial-grade extraction machines, HEPA vacuums, specialised equipment",
                  ],
                  [
                    "Stain Removal",
                    "Only minor stains",
                    "Stain-specific treatment for oil, grease, ink, and pet stains",
                  ],
                  [
                    "Dust Mites and Allergens",
                    "Limited removal",
                    "Eliminates embedded pollutants",
                  ],
                  [
                    "Bacteria and Hygiene",
                    "Surface cleaning only",
                    "Deep sanitisation reduces bacterial contamination",
                  ],
                  [
                    "Odour Treatment",
                    "Temporary masking of odours with fresheners",
                    "Neutralise odours at their source within the fabric",
                  ],
                  [
                    "Fabric Protection",
                    "Risk of using unsuitable products",
                    "Fabric-specific cleaning minimises the risk of shrinkage, fading, or damage",
                  ],
                  [
                    "Pet Hair Removal",
                    "Removes visible hair",
                    "Extracts deeply embedded pet hair and dander",
                  ],
                  [
                    "Appearance Restoration",
                    "Temporary visual improvement",
                    "Restores colour, softness, texture, and overall freshness",
                  ],
                  [
                    "Recommended Frequency",
                    "Weekly maintenance",
                    "Every 3–6 months for homes with pets, children, or allergic individuals",
                  ],
                ].map(([aspect, regular, professional], i) => (
                  <tr key={aspect} className={i % 2 === 0 ? "bg-ivory-teal" : "bg-ivory"}>
                    <td className="p-4 font-semibold text-teal-deep border-t border-mist">{aspect}</td>
                    <td className="p-4 text-slate-teal/70 border-t border-mist">{regular}</td>
                    <td className="p-4 text-teal border-t border-mist">{professional}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>
      </section>

      {/* ── 5. SHAMPOOING vs DRY CLEANING ────────────────────────────────────── */}
      <section ref={vsRef} className="bg-teal-dark teal-texture py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={vsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <SectionTag dark>Service Types</SectionTag>
            <h2 className="font-serif text-ivory-warm text-3xl md:text-4xl font-bold mb-4 max-w-3xl leading-tight">
              Sofa Shampooing vs. Injection-Extraction Dry Cleaning:{" "}
              <span className="italic font-normal text-stone-teal/40">Which Does Your Sofa Need?</span>
            </h2>
            <p className="font-sans text-stone-teal/65 text-sm leading-relaxed mb-12 max-w-3xl">
              One of the most important questions in professional sofa dry cleaning services in Delhi is
              whether your sofa needs dry cleaning or wet shampooing. These are two completely different
              treatments that give different results and involve different risks. Thus, both need different
              appropriate treatments.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={vsInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-teal-deep border border-teal/15 rounded-xl p-7"
            >
              <div className="w-4 h-[2px] bg-copper/60 rounded-full mb-4" />
              <h3 className="font-serif text-ivory-warm text-xl font-semibold mb-4">
                Sofa Shampooing Service
              </h3>
              <p className="font-sans text-stone-teal/60 text-sm leading-relaxed mb-5">
                Sofa shampooing (also called wet cleaning or injection-extraction) uses water-based shampoo
                solutions injected into the fabric with pressure and then extracted with the help of an
                industrial wet vacuum. Our sofa shampooing service Delhi is highly effective at removing
                water-soluble stains, organic contamination like pet urine, food spills, or sweat accumulation.
              </p>
              <p className="font-sans text-copper-light text-xs font-semibold uppercase tracking-wider mb-2">
                Best suited for:
              </p>
              <ul className="space-y-1.5 mb-5">
                {[
                  "Polyester, nylon, cotton, and synthetic blend fabrics",
                  "Performance fabrics",
                  "Heavily soiled sofas with water-soluble stain types",
                  "Sofas in high-traffic family rooms where deep biological cleaning is the priority",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckCircle size={12} className="text-copper mt-0.5 shrink-0" />
                    <span className="font-sans text-stone-teal/60 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="font-sans text-stone-teal/40 text-xs font-semibold uppercase tracking-wider mb-2">
                Not suitable for:
              </p>
              <ul className="space-y-1.5 mb-4">
                {[
                  "Velvet, silk, suede, antique fabric",
                  "Loose-weave textures",
                  "Any sofa where the manufacturer's label indicates dry clean only",
                  "Foam-heavy cushions where extended drying time is a concern",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="text-stone-teal/40 shrink-0 text-xs mt-0.5">✕</span>
                    <span className="font-sans text-stone-teal/50 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="font-sans text-stone-teal/50 text-xs border-t border-teal/15 pt-4">
                Our sofa shampooing service Delhi uses pH-balanced shampoo that cleans your sofa without
                leaving sticky residue or damaging the fabric. Sofas typically require 3–5 hours for drying.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={vsInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-teal-deep border border-copper/25 rounded-xl p-7"
            >
              <div className="w-4 h-[2px] bg-copper rounded-full mb-4" />
              <h3 className="font-serif text-ivory-warm text-xl font-semibold mb-4">
                Sofa Dry Cleaning Service
              </h3>
              <p className="font-sans text-stone-teal/60 text-sm leading-relaxed mb-5">
                Dry cleaning (Low-Moisture Solvent Treatment) involves the use of organic solvent-based
                compounds applied with minimal moisture. The fabric becomes slightly damp during the
                treatment, but it would never get wet. If you&apos;re looking for sofa dry cleaning near me, it
                is the superior choice for delicate fabrics, premium upholstery, or any situation where
                drying time or colour safety is a concern.
              </p>
              <p className="font-sans text-copper-light text-xs font-semibold uppercase tracking-wider mb-2">
                Best suited for:
              </p>
              <ul className="space-y-1.5 mb-5">
                {[
                  "Velvet, suede, silk blends, wool, antique upholstery",
                  "Premium designer fabrics",
                  "Any sofa with a dry-clean-only care label",
                  "Leather and faux leather sofas",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckCircle size={12} className="text-copper mt-0.5 shrink-0" />
                    <span className="font-sans text-stone-teal/60 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="font-sans text-stone-teal/40 text-xs font-semibold uppercase tracking-wider mb-2">
                Not suitable for:
              </p>
              <ul className="space-y-1.5 mb-5">
                {[
                  "Heavily soiled synthetic fabric sofas with deep contamination, where water-based extraction would be more effective",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="text-stone-teal/40 shrink-0 text-xs mt-0.5">✕</span>
                    <span className="font-sans text-stone-teal/50 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="border-t border-copper/15 pt-4 bg-copper/5 rounded-lg p-3 -mx-1">
                <p className="font-sans text-copper-light text-xs font-semibold mb-1">
                  Our expert recommendation:
                </p>
                <p className="font-sans text-stone-teal/60 text-xs leading-relaxed">
                  During the free inspection visit, our certified technician assesses your sofa&apos;s fabric
                  type, stain profile, and care requirements, then recommends the best treatment. You should
                  never have to guess; we tell you exactly what your sofa needs and why.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 6. MATERIAL-SPECIFIC PROTOCOLS ───────────────────────────────────── */}
      <section ref={materialRef} className="bg-ivory py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
          <div className="grid lg:grid-cols-[1fr_360px] gap-10 items-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={materialInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <SectionTag>Fabric Expertise</SectionTag>
              <h2 className="font-serif text-teal-deep text-3xl md:text-4xl font-bold mb-4 max-w-2xl leading-tight">
                Material-Specific Cleaning Protocols:{" "}
                <span className="italic font-normal text-charcoal/40">Every Fabric Is Different</span>
              </h2>
              <p className="font-sans text-slate-teal/70 text-sm leading-relaxed max-w-xl">
                This is where DryClean Masters separates itself from generic cleaning companies. We don&apos;t apply
                one product to every sofa. Every fabric has a specific chemistry, its own vulnerability, and a
                unique cleaning method that works best for it.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={materialInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="relative rounded-2xl overflow-hidden aspect-video border border-mist shadow-lg hidden lg:block"
            >
              <Image
                src="/img/sofa_cleaning/image1.webp"
                alt="Different sofa fabric types cleaned by DryClean Masters"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                title: "Velvet Sofas",
                body: "Though one of the most visually stunning fabrics, velvet is one of the most cleaning-sensitive sofa fabrics. It traps dust and debris easily, but is extraordinarily vulnerable to moisture, pressure, and the wrong cleaning agents. Our velvet cleaning methods employ very low-moisture organic solvents applied with a specific directional technique that takes care of the natural pile direction. Post-clean, we use a velvet grooming brush to restore the pile to its original condition.",
                tag: "Low-Moisture Organic Solvents",
              },
              {
                title: "Suede & Microsuede Sofas",
                body: "Genuine suede and microsuede materials are extremely sensitive to water and require specialist suede-safe agents. Microsuede, while more durable, develops visible water marks if it is not properly dealt with, and requires a specific 'wet-then-dry' technique to avoid water marks.",
                tag: "Suede-Safe Agents",
              },
              {
                title: "Leather Sofas",
                body: "Leather sofa cleaning and polishing in Delhi is a special service we provide. Our leather cleaning methods involve four stages: pH-balanced leather cleaner, a deep conditioner injected to restore moisture, a colour-matched polish where the finish has dulled, and a UV-protective finishing coat. Our conditioners and polishes are specifically selected for different leather types — full grain, top grain, corrected grain, aniline, semi-aniline, and pigmented leather.",
                tag: "4-Stage Leather Care",
              },
              {
                title: "Fabric & Woven Sofas",
                body: "Cotton, linen, and chenille fabrics are more tolerant of moisture but still require controlled application, as it can still lead to watermarking and colour bleeding, particularly in darker or printed fabrics. Before full treatment, we do a patch test on your sofa to check dye stability and prevent any damage.",
                tag: "Patch Test Included",
              },
              {
                title: "Wool & Wool-Blend Upholstery",
                body: "Wool is a natural protein fibre that is extremely sensitive to chemicals. For wool sofa cleaning, we use pH-neutral, wool-safe solutions that clean without causing fibre damage.",
                tag: "pH-Neutral Wool-Safe Solutions",
              },
              {
                title: "Silk & Silk-Blend Upholstery",
                body: "Silk is the most delicate upholstery material and the one where cleaning errors are most dangerous. Our silk sofa cleaning method uses the most gentle solvents, applied with a precision applicator rather than a brush, with careful blotting extraction. We do not use any mechanical agitation on silk.",
                tag: "No Mechanical Agitation",
              },
            ].map(({ title, body, tag }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 24 }}
                animate={materialInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.07 * i }}
                className="group border border-mist hover:border-teal/40 hover:shadow-lg hover:shadow-teal/12 transition-all duration-300 rounded-xl bg-ivory-teal p-6"
              >
                <div className="w-4 h-[2px] bg-teal rounded-full mb-4" />
                <h3 className="font-serif text-teal-deep text-lg font-semibold mb-3">{title}</h3>
                <p className="font-sans text-slate-teal/70 text-sm leading-relaxed mb-4">{body}</p>
                <span className="inline-block font-sans text-[10px] uppercase tracking-wider text-teal bg-teal/10 px-2.5 py-1 rounded-full">
                  {tag}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. STEP-BY-STEP PROCESS ──────────────────────────────────────────── */}
      <section ref={processRef} className="bg-teal-deep teal-texture py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={processInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <SectionTag dark>Our Process</SectionTag>
            <h2 className="font-serif text-ivory-warm text-3xl md:text-4xl font-bold mb-4 max-w-2xl leading-tight">
              Our Step-by-Step Doorstep{" "}
              <span className="italic font-normal text-stone-teal/40">Sofa Dry Cleaning Process</span>
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                step: "Step 1",
                title: "Free In-Person Inspection (15–20 Minutes)",
                body: "Our certified technician visits your home and conducts a thorough physical inspection of your sofa's fabric type, care label, stain types, stain locations, and estimated age. You receive a transparent price quote and a clear explanation of what will be done and why. No obligation to proceed if you're not comfortable.",
              },
              {
                step: "Step 2",
                title: "Pre-Clean Setup and Protection",
                body: "Before cleaning begins, we place protective floor covers around the sofa to protect your flooring. Adjacent furniture is covered or moved to provide clear access.",
              },
              {
                step: "Step 3",
                title: "High-Power Pre-Vacuuming",
                body: "Using a HEPA-filtered industrial vacuum cleaner, we remove all loose surface debris, pet hair, dust, and particulate matter. This step prevents surface contamination from getting deeper into the fabric during treatment.",
              },
              {
                step: "Step 4",
                title: "Stain Pre-Treatment",
                body: "Individual stains are identified and pre-treated with targeted stain-specific agents before the main cleaning begins. Coffee stains, oil marks, ink, pet stains, and food residues all have different chemical compositions and require different pre-treatments.",
              },
              {
                step: "Step 5",
                title: "Main Cleaning Treatment",
                body: "The appropriate cleaning method (dry solvent or wet shampoo extraction) is applied across the entire sofa. For dry cleaning, organic solvents are applied through the fabric using appropriate tools. For wet shampooing, we inject measured shampoo solution and immediately extract it.",
              },
              {
                step: "Step 6",
                title: "Deep Sanitisation",
                body: "Once the main cleaning is complete, an anti-microbial, fabric-safe sanitising spray is applied across all surfaces. This eliminates remaining bacteria from the foam and fabric layers, giving you a health benefit that goes beyond any surface clean.",
              },
              {
                step: "Step 7",
                title: "Moisture Check and Drying",
                body: "For wet-cleaned sofas, we conduct a moisture check and assist the initial drying with our industrial air-mover equipment, reducing dry time significantly. We only leave once moisture levels are within the safe range.",
              },
              {
                step: "Step 8",
                title: "Final Grooming, Quality Check, and Handover",
                body: "The sofa fabric is groomed, and a final visual quality check is completed. Our technician walks you through the results, explains any care notes, and ensures you're fully satisfied before packing up.",
              },
            ].map(({ step, title, body }, i) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 24 }}
                animate={processInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.07 * i }}
                className="border border-teal/15 rounded-xl bg-teal-dark p-6"
              >
                <span className="font-sans text-copper text-xs font-semibold uppercase tracking-wider block mb-3">
                  {step}
                </span>
                <div className="w-4 h-[2px] bg-copper/60 rounded-full mb-3" />
                <h3 className="font-serif text-ivory-warm text-base font-semibold mb-2">{title}</h3>
                <p className="font-sans text-stone-teal/55 text-xs leading-relaxed">{body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. PRICING ───────────────────────────────────────────────────────── */}
      <section ref={pricingRef} className="bg-ivory py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={pricingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <SectionTag>Transparent Pricing</SectionTag>
            <h2 className="font-serif text-teal-deep text-3xl md:text-4xl font-bold mb-4 max-w-2xl leading-tight">
              Transparent Sofa Dry Cleaning Charges in Delhi
            </h2>
            <p className="font-sans text-slate-teal/70 text-sm leading-relaxed mb-4 max-w-3xl">
              We at DryClean Masters believe in complete price transparency. Here is our full pricing matrix.
            </p>
            <div className="flex flex-wrap gap-5 mb-10">
              {[
                "Free inspection included",
                "All chemicals & equipment",
                "Pre-vacuuming & stain pre-treatment",
                "Main cleaning & sanitisation",
                "Final grooming",
                "No hidden charges",
              ].map((item) => (
                <div key={item} className="flex items-center gap-1.5">
                  <CheckCircle size={13} className="text-teal" />
                  <span className="font-sans text-slate-teal/70 text-sm">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="space-y-8">
            {/* Table 1 */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={pricingInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h3 className="font-serif text-teal-deep text-xl font-semibold mb-4">
                Standard Pricing for Sofa Dry Cleaning
              </h3>
              <div className="overflow-x-auto rounded-xl border border-mist">
                <table className="w-full font-sans text-sm">
                  <thead>
                    <tr className="bg-teal-deep">
                      <th className="text-left p-4 text-ivory-warm font-semibold">Sofa Type</th>
                      <th className="text-left p-4 text-stone-teal/70 font-semibold">
                        Dry Cleaning (Per Seat)
                      </th>
                      <th className="text-left p-4 text-copper-light font-semibold">
                        Wet Shampooing (Dry Cleaning Included) (Per Seat)
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["Fabric / Cotton / Polyester Sofa", "₹200", "₹250"],
                      ["Velvet Sofa", "₹250", "Not Recommended"],
                      ["Chenille / Woven Sofa", "₹450", "₹350"],
                      ["Microsuede Sofa", "₹500", "₹400"],
                      ["Wool / Wool-Blend Sofa", "₹550", "Not Recommended"],
                    ].map(([type, dry, wet], i) => (
                      <tr key={type} className={i % 2 === 0 ? "bg-ivory-teal" : "bg-ivory"}>
                        <td className="p-4 font-medium text-teal-deep border-t border-mist">{type}</td>
                        <td className="p-4 text-teal font-semibold border-t border-mist">{dry}</td>
                        <td
                          className={`p-4 border-t border-mist ${
                            wet === "Not Recommended"
                              ? "text-muted-teal/60 italic text-xs"
                              : "text-teal font-semibold"
                          }`}
                        >
                          {wet}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>

            {/* Table 2 */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={pricingInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="font-serif text-teal-deep text-xl font-semibold mb-4">
                Leather Sofa Cleaning and Polishing Delhi Pricing
              </h3>
              <div className="overflow-x-auto rounded-xl border border-mist">
                <table className="w-full font-sans text-sm">
                  <thead>
                    <tr className="bg-teal-deep">
                      <th className="text-left p-4 text-ivory-warm font-semibold">
                        Leather Sofa Service
                      </th>
                      <th className="text-left p-4 text-copper-light font-semibold">Starting Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["Leather Sofa Cleaning (Per Seat)", "₹350"],
                      ["Leather Conditioning (Per Seat)", "₹250"],
                      ["Leather Cleaning + Conditioning + Polish (Full Package)", "₹700"],
                      ["Minor Colour Restoration (Per Seat)", "₹900"],
                    ].map(([service, price], i) => (
                      <tr key={service} className={i % 2 === 0 ? "bg-ivory-teal" : "bg-ivory"}>
                        <td className="p-4 font-medium text-teal-deep border-t border-mist">{service}</td>
                        <td className="p-4 text-teal font-semibold border-t border-mist">{price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>

            {/* Table 3 */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={pricingInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h3 className="font-serif text-teal-deep text-xl font-semibold mb-4">
                Common Sofa Configurations: Indicative Total Cost
              </h3>
              <div className="overflow-x-auto rounded-xl border border-mist">
                <table className="w-full font-sans text-sm">
                  <thead>
                    <tr className="bg-teal-deep">
                      <th className="text-left p-4 text-ivory-warm font-semibold">Configuration</th>
                      <th className="text-left p-4 text-stone-teal/70 font-semibold">
                        Dry Cleaning (Approx.)
                      </th>
                      <th className="text-left p-4 text-copper-light font-semibold">
                        Wet Shampoo (Approx.)
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["2-Seater Sofa", "₹700", "₹600"],
                      ["3-Seater Sofa", "₹1,050", "₹900"],
                      ["5-Seater (2+3) Set", "₹1,750", "₹1,500"],
                      ["7-Seater (2+3+2) Set", "₹2,450", "₹2,100"],
                      ["L-Shaped Sofa (5 Seats)", "₹1,750", "₹1,500"],
                    ].map(([config, dry, wet], i) => (
                      <tr key={config} className={i % 2 === 0 ? "bg-ivory-teal" : "bg-ivory"}>
                        <td className="p-4 font-medium text-teal-deep border-t border-mist">{config}</td>
                        <td className="p-4 text-teal font-semibold border-t border-mist">{dry}</td>
                        <td className="p-4 text-teal font-semibold border-t border-mist">{wet}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={pricingInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
            className="font-sans text-slate-teal/55 text-xs mt-6 leading-relaxed border-l-[3px] border-teal/20 pl-4"
          >
            * Fabric type, grease or stain severity, last professional clean date, and any add-on services
            (leather polishing, odour treatment, etc.) may affect the final price. All prices are confirmed
            after the free in-person inspection. The price quote you receive will be the final price you&apos;ll
            be paying.
          </motion.p>
        </div>
      </section>

      {/* ── 9. SIGNS ─────────────────────────────────────────────────────────── */}
      <section ref={signsRef} className="bg-teal-dark teal-texture py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={signsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <SectionTag dark>Warning Signs</SectionTag>
            <h2 className="font-serif text-ivory-warm text-3xl md:text-4xl font-bold mb-4 max-w-2xl leading-tight">
              Signs Your Sofa Needs{" "}
              <span className="italic font-normal text-stone-teal/40">Immediate Professional Cleaning</span>
            </h2>
            <p className="font-sans text-stone-teal/65 text-sm leading-relaxed mb-12 max-w-3xl">
              Most people book a sofa cleaning when it looks dirty. But by that point, the contamination
              inside the fabric, which has been building up for months, just comes to the surface.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {[
              "Visible stains that won't budge with your DIY stain removal",
              "A persistent smell you can't source and doesn't go away with regular cleaning or air fresheners",
              "Visible discolouration or dullness even without obvious stains — professional sofa dry cleaning near me can often restore the original vibrancy significantly",
              "You notice increased sneezing or allergies at home, particularly when seated on the sofa",
              "Pet hair is embedded in the fabric and becomes impossible to remove without professional equipment",
              "You can't remember the last time it was professionally cleaned — if the answer is 'never' or 'more than 12 months ago,' book a service",
              "Fabric feels stiff, rough, or sticky",
            ].map((sign, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={signsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.06 * i }}
                className="flex items-start gap-3 border border-teal/15 rounded-xl p-5 bg-teal-deep"
              >
                <AlertCircle size={14} className="text-copper mt-0.5 shrink-0" />
                <p className="font-sans text-stone-teal/70 text-sm leading-relaxed">{sign}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 10. MAINTENANCE TIPS ─────────────────────────────────────────────── */}
      <section ref={maintainRef} className="bg-ivory py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={maintainInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <SectionTag>After-Care</SectionTag>
            <h2 className="font-serif text-teal-deep text-3xl md:text-4xl font-bold mb-4 max-w-2xl leading-tight">
              How to Maintain Your Sofa{" "}
              <span className="italic font-normal text-charcoal/40">After a Professional Clean</span>
            </h2>
            <p className="font-sans text-slate-teal/70 text-sm leading-relaxed mb-12 max-w-3xl">
              Proper maintenance can not only preserve your sofa&apos;s appearance for a long time, it can also
              help you reduce the frequency of professional cleaning appointments.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                title: "Vacuum Weekly",
                body: "Pay particular attention to seat creases, cushion edges, armrests, and areas beneath removable cushions.",
              },
              {
                title: "Deal With Spills Immediately",
                body: "Blot the liquid immediately with a clean microfibre cloth. Avoid rubbing, as this pushes the stain deeper into the fabric. Absorb as much moisture as possible before attempting any cleaning. Avoid using harsh household chemicals unless you know their suitability for your sofa's fabric.",
              },
              {
                title: "Rotate Cushions Regularly",
                body: "This helps prevent uneven wear, maintain cushion shape, reduce compression marks, and extend the life of your sofa cushions.",
              },
              {
                title: "Protect From Direct Sunlight",
                body: "Keep sofas away from prolonged direct sunlight. Use curtains or blinds during peak afternoon hours. Consider UV-protective window films for rooms with too much sun exposure.",
              },
              {
                title: "Keep Pets Groomed",
                body: "Regular grooming of pets reduces hair accumulation, odour transfer, allergen levels, and embedded dirt on your sofa.",
              },
              {
                title: "Use Washable Covers On Your Sofa",
                body: "That can help you keep your sofa clean for a longer period, as you can wash it frequently by yourself and avoid direct dirt and stains getting into your sofa.",
              },
            ].map(({ title, body }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 24 }}
                animate={maintainInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.07 * i }}
                className="border border-mist hover:border-teal/40 transition-all duration-300 rounded-xl bg-ivory-teal p-6"
              >
                <div className="w-4 h-[2px] bg-teal rounded-full mb-4" />
                <h3 className="font-serif text-teal-deep text-base font-semibold mb-2">{title}</h3>
                <p className="font-sans text-slate-teal/70 text-sm leading-relaxed">{body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 11. HEALTH BENEFITS ──────────────────────────────────────────────── */}
      <section ref={healthRef} className="bg-teal-deep teal-texture py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={healthInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <SectionTag dark>Health Impact</SectionTag>
            <h2 className="font-serif text-ivory-warm text-3xl md:text-4xl font-bold mb-4 max-w-2xl leading-tight">
              Health and Hygiene Benefits{" "}
              <span className="italic font-normal text-stone-teal/40">of Deep Sofa Cleaning</span>
            </h2>
            <p className="font-sans text-stone-teal/65 text-sm leading-relaxed mb-12 max-w-3xl">
              Professional sofa dry cleaning services in Delhi aren&apos;t just about appearance. The hygiene
              impact is significant and directly affects your family&apos;s health.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-5">
            {[
              {
                title: "Dust Mite Elimination",
                body: "A single square metre of upholstery can harbour several thousand dust mites that trigger asthma, eczema, rhinitis, and chronic sneezing. Professional cleaning with heated solvents and anti-microbial sanitisation kills dust mite colonies and prevents allergies.",
              },
              {
                title: "Bacterial Load Reduction",
                body: "Studies find high concentrations of bacteria in domestic upholstery, including E. coli and various mould species, particularly in homes with children, pets, or elderly family members who spend extended time on the sofa. Professional sanitisation reduces bacterial contamination by over 99%.",
              },
              {
                title: "Improved Indoor Air Quality",
                body: "Every time someone sits on an uncleaned sofa, a small cloud of embedded dust is released into the air. Professional drying and antimicrobial treatment during cleaning prevent mould from establishing itself.",
              },
              {
                title: "Odour Neutralisation",
                body: "Our sanitising agents don't mask odours; they find the root cause and then treat it with appropriate solvents, providing long-lasting freshness rather than a temporary cover-up.",
              },
            ].map(({ title, body }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 24 }}
                animate={healthInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 * i }}
                className="border border-teal/15 hover:border-copper/35 transition-all duration-300 rounded-xl bg-teal-dark p-7"
              >
                <div className="w-4 h-[2px] bg-copper rounded-full mb-4" />
                <h3 className="font-serif text-ivory-warm text-lg font-semibold mb-3">{title}</h3>
                <p className="font-sans text-stone-teal/60 text-sm leading-relaxed">{body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 12. WHY CHOOSE US ─────────────────────────────────────────────────── */}
      <section ref={whyRef} className="bg-ivory py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={whyInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <SectionTag>Why Us</SectionTag>
            <h2 className="font-serif text-teal-deep text-3xl md:text-4xl font-bold mb-4 max-w-2xl leading-tight">
              Why Choose DryClean Masters for{" "}
              <span className="italic font-normal text-charcoal/40">
                Doorstep Sofa Dry Cleaning in Delhi?
              </span>
            </h2>
            <p className="font-sans text-slate-teal/70 text-sm leading-relaxed mb-12 max-w-3xl">
              Delhi has no shortage of cleaning companies. Here is why thousands of homeowners specifically
              seek out DryClean Masters when they search for the best sofa dry cleaners in Delhi.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                Icon: Award,
                title: "10+ Years of Specialisation, Not General Cleaning",
                body: "We are not a general home cleaning company that also does sofas. Sofa and upholstery care is our specific expertise, which shows in our results, our knowledge of fabric types that most generalist companies simply don't have.",
              },
              {
                Icon: Users,
                title: "40+ Certified On-Site Technicians",
                body: "Every technician is specifically trained and certified in upholstery care. Our training programme covers fabric identification, stain chemistry, cleaning protocols for 15+ fabric types, leather care, and customer service.",
              },
              {
                Icon: Shield,
                title: "Fabric-Safe Guarantee",
                body: "We guarantee no damage to your sofa fabric during our cleaning process. If any treatment-related damage occurs, we take full responsibility and find a satisfactory resolution.",
              },
              {
                Icon: CheckCircle,
                title: "Free In-Person Inspection",
                body: "We never quote blindly over the phone or apply a standard treatment without first seeing the sofa. First, a free inspection, then we communicate our methods and prices.",
              },
              {
                Icon: Clock,
                title: "Same-Day Doorstep Service",
                body: "For urgent bookings, we offer same-day doorstep sofa dry cleaning in Delhi across most areas.",
              },
              {
                Icon: Leaf,
                title: "Environment, Child and Pet Safe Products",
                body: "All our solvents, shampoos, and sanitisers are biodegradable, non-toxic, and specifically safe for households with children and pets.",
              },
              {
                Icon: Star,
                title: "12,000+ Sofas Cleaned",
                body: "When you're letting someone treat your ₹60,000 velvet sofa, experience matters a great deal. Our 12,000+ completed sofa cleaning jobs across Delhi cannot be matched easily by any other company.",
              },
            ].map(({ Icon, title, body }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 24 }}
                animate={whyInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.07 * i }}
                className="group border border-mist hover:border-teal/40 hover:shadow-lg hover:shadow-teal/12 transition-all duration-300 rounded-xl bg-ivory-teal p-6"
              >
                <div className="w-8 h-8 rounded-lg bg-teal/10 flex items-center justify-center mb-4">
                  <Icon size={16} className="text-teal" />
                </div>
                <h3 className="font-serif text-teal-deep text-base font-semibold mb-2">{title}</h3>
                <p className="font-sans text-slate-teal/70 text-sm leading-relaxed">{body}</p>
              </motion.div>
            ))}
          </div>

          {/* Image strip after why choose cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={whyInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-10 grid grid-cols-3 gap-4"
          >
            {[
              "/img/sofa_cleaning/image2.webp",
              "/img/sofa_cleaning/image3.webp",
              "/img/sofa_cleaning/image4.webp",
            ].map((src, i) => (
              <div key={i} className="relative rounded-xl overflow-hidden aspect-video border border-mist">
                <Image src={src} alt={`DryClean Masters sofa cleaning result ${i + 1}`} fill className="object-cover" />
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 13. AREAS ────────────────────────────────────────────────────────── */}
      <section ref={areasRef} className="bg-teal-dark teal-texture py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={areasInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <SectionTag dark>Service Coverage</SectionTag>
            <h2 className="font-serif text-ivory-warm text-3xl md:text-4xl font-bold mb-4 max-w-2xl leading-tight">
              Areas We Serve In Our{" "}
              <span className="italic font-normal text-stone-teal/40">
                Doorstep Sofa Dry Cleaning In Delhi
              </span>
            </h2>
            <p className="font-sans text-stone-teal/65 text-sm leading-relaxed mb-12 max-w-3xl">
              Our doorstep sofa dry cleaning in Delhi covers the entire city, not just select premium
              neighbourhoods. Our teams are stationed across Delhi for faster response times and same-day
              availability.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                region: "South Delhi",
                areas:
                  "Greater Kailash (GK1, GK2), Hauz Khas, Vasant Kunj, Saket, Malviya Nagar, Safdarjung Enclave, Lajpat Nagar, Defence Colony, Green Park, Panchsheel Park, Chittaranjan Park, Nehru Place",
              },
              {
                region: "West Delhi",
                areas:
                  "Dwarka (all sectors), Janakpuri, Rajouri Garden, Punjabi Bagh, Paschim Vihar, Vikaspuri, Uttam Nagar, Tilak Nagar",
              },
              {
                region: "North Delhi",
                areas:
                  "Rohini (all sectors), Pitampura, Shalimar Bagh, Ashok Vihar, Model Town, GTB Nagar, Civil Lines",
              },
              {
                region: "East Delhi",
                areas:
                  "Mayur Vihar (Phase 1, 2, 3), Preet Vihar, Patparganj, Vasundhara Enclave, Laxmi Nagar, Geeta Colony",
              },
              {
                region: "Central Delhi",
                areas: "Karol Bagh, Connaught Place, Patel Nagar, Rajender Nagar, Naraina",
              },
              {
                region: "New Delhi",
                areas:
                  "Lutyen's Delhi, RK Puram, Chanakyapuri, Vasant Vihar, Anand Niketan, Shanti Niketan",
              },
              {
                region: "North West Delhi",
                areas: "Narela, Bawana, Budh Vihar, Mangolpuri, Sultanpuri",
              },
            ].map(({ region, areas }, i) => (
              <motion.div
                key={region}
                initial={{ opacity: 0, y: 20 }}
                animate={areasInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.07 * i }}
                className="border border-teal/15 rounded-xl bg-teal-deep p-6"
              >
                <div className="flex items-center gap-2 mb-3">
                  <MapPin size={14} className="text-copper" />
                  <h3 className="font-serif text-copper-light text-base font-semibold">{region}</h3>
                </div>
                <p className="font-sans text-stone-teal/60 text-xs leading-relaxed">{areas}</p>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={areasInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6 }}
            className="font-sans text-stone-teal/55 text-sm mt-8 border-l-[3px] border-copper/25 pl-4"
          >
            If your area isn&apos;t listed here, don&apos;t assume we don&apos;t cover it. WhatsApp us with your
            location, and we&apos;ll confirm availability within minutes.
          </motion.p>
        </div>
      </section>

      {/* ── 14. ADD-ON SERVICES ───────────────────────────────────────────────── */}
      <section ref={addonsRef} className="bg-ivory py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={addonsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <SectionTag>More Services</SectionTag>
            <h2 className="font-serif text-teal-deep text-3xl md:text-4xl font-bold mb-4 max-w-2xl leading-tight">
              Complementary Add-On Services:{" "}
              <span className="italic font-normal text-charcoal/40">Complete Your Upholstery Care</span>
            </h2>
            <p className="font-sans text-slate-teal/70 text-sm leading-relaxed mb-12 max-w-3xl">
              While our team is at your home for sofa cleaning, fabric couch and chair dry cleaning Delhi,
              you might like to take the opportunity to extend the service to other upholstery. All of these
              are available as add-ons to your sofa dry cleaning services.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                title: "Carpet Shampooing Service Delhi",
                body: "From premium Persian and Oriental rugs to wall-to-wall synthetic carpets.",
              },
              {
                title: "Mattress Deep Cleaning",
                body: "As mattresses accumulate the same dust mites, allergens, and moisture issues as sofas, it is recommended for a complete refresh.",
              },
              {
                title: "Commercial Chair Cleaning Service Delhi",
                body: "Dining chairs, office chairs, reading chairs, headboards, and ottomans.",
              },
              {
                title: "Curtain On-Site Cleaning",
                body: "We clean curtains without removing them from their rods. Heavy drapes, silk panels, blackout blinds, etc.",
              },
            ].map(({ title, body }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 24 }}
                animate={addonsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 * i }}
                className="border border-mist hover:border-teal/40 transition-all duration-300 rounded-xl bg-ivory-teal p-6"
              >
                <div className="w-4 h-[2px] bg-teal rounded-full mb-4" />
                <h3 className="font-serif text-teal-deep text-base font-semibold mb-2">{title}</h3>
                <p className="font-sans text-slate-teal/70 text-sm leading-relaxed">{body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 15. BOOKING FORM ─────────────────────────────────────────────────── */}
      <section ref={bookingFormRef} id="book-sofa" className="bg-ivory py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left: Info */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={bookingFormInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <SectionTag>Book Now</SectionTag>
              <h2 className="font-serif text-teal-deep text-3xl md:text-4xl font-bold mb-4 max-w-xl leading-tight">
                Book Your Free Sofa{" "}
                <span className="italic font-normal text-charcoal/40">Inspection Visit</span>
              </h2>
              <p className="font-sans text-slate-teal/70 text-sm leading-relaxed mb-8 max-w-md">
                Fill in your details and our certified technician will visit, assess your sofa, and give
                you a transparent quote — no obligation, completely free.
              </p>
              <div className="space-y-4">
                {[
                  "Free in-person fabric inspection",
                  "Transparent pricing before cleaning begins",
                  "Same-day slots available",
                  "Serving all Delhi areas",
                ].map((text) => (
                  <div key={text} className="flex items-center gap-2.5">
                    <CheckCircle size={14} className="text-teal shrink-0" />
                    <span className="font-sans text-slate-teal/70 text-sm">{text}</span>
                  </div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={bookingFormInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="relative mt-8 rounded-xl overflow-hidden aspect-video border border-mist"
              >
                <Image
                  src="/img/sofa_cleaning/image5.webp"
                  alt="DryClean Masters sofa cleaning team at work in Delhi"
                  fill
                  className="object-cover"
                />
              </motion.div>
            </motion.div>

            {/* Right: Form */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={bookingFormInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white rounded-2xl border border-mist shadow-lg overflow-hidden"
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
                        We&apos;ve received your request for sofa cleaning on{" "}
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
                        Email <span className="text-copper">*</span>
                      </label>
                      <input
                        name="email" value={bookingForm.email} required type="email" placeholder="rahul@example.com"
                        onChange={(e) => setBookingForm((p) => ({ ...p, email: e.target.value }))}
                        className="w-full font-sans text-sm text-charcoal placeholder:text-slate-teal/30 border border-stone-teal/35 rounded-lg px-4 py-2.5 bg-ivory-warm shadow-sm focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/25 focus:bg-white transition-all duration-200"
                      />
                    </div>

                    {/* Date + Time */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="font-sans text-[11px] text-slate-teal/55 uppercase tracking-[0.1em] font-semibold mb-1.5 block">
                          <CalendarCheck size={11} className="inline mr-1 mb-0.5" />
                          Date <span className="text-copper">*</span>
                        </label>
                        <input
                          name="date" value={bookingForm.date} required type="date" min={todayISO}
                          onChange={(e) => setBookingForm((p) => ({ ...p, date: e.target.value }))}
                          className="w-full font-sans text-sm text-charcoal placeholder:text-slate-teal/30 border border-stone-teal/35 rounded-lg px-4 py-2.5 bg-ivory-warm shadow-sm focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/25 focus:bg-white transition-all duration-200"
                        />
                      </div>
                      <div>
                        <label className="font-sans text-[11px] text-slate-teal/55 uppercase tracking-[0.1em] font-semibold mb-1.5 block">
                          <Clock size={11} className="inline mr-1 mb-0.5" />
                          Time Slot <span className="text-copper">*</span>
                        </label>
                        <div className="flex gap-1.5 h-[42px]">
                          {[
                            { label: "Morning", sub: "9–12 pm" },
                            { label: "Afternoon", sub: "12–4 pm" },
                            { label: "Evening", sub: "4–7 pm" },
                          ].map(({ label, sub }) => {
                            const active = bookingForm.timeSlot === label;
                            return (
                              <button
                                key={label} type="button"
                                onClick={() => setBookingForm((p) => ({ ...p, timeSlot: label }))}
                                className={`flex-1 flex flex-col items-center justify-center rounded-lg border text-center transition-all duration-200 ${active ? "border-teal bg-teal/8 text-teal" : "border-stone-teal/25 bg-ivory text-slate-teal/60 hover:border-teal/40"}`}
                              >
                                <span className="font-sans text-[9px] font-bold leading-none">{label}</span>
                                <span className="font-sans text-[8px] opacity-60 leading-none mt-0.5">{sub}</span>
                              </button>
                            );
                          })}
                        </div>
                        <input type="text" name="timeSlot" value={bookingForm.timeSlot} required readOnly className="sr-only" tabIndex={-1} />
                      </div>
                    </div>

                    {/* Address */}
                    <div>
                      <label className="font-sans text-[11px] text-slate-teal/55 uppercase tracking-[0.1em] font-semibold mb-1.5 block">
                        <MapPin size={11} className="inline mr-1 mb-0.5" />
                        Address / Locality <span className="text-copper">*</span>
                      </label>
                      <input
                        name="address" value={bookingForm.address} required placeholder="e.g. South Extension, Delhi"
                        onChange={(e) => setBookingForm((p) => ({ ...p, address: e.target.value }))}
                        className="w-full font-sans text-sm text-charcoal placeholder:text-slate-teal/30 border border-stone-teal/35 rounded-lg px-4 py-2.5 bg-ivory-warm shadow-sm focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/25 focus:bg-white transition-all duration-200"
                      />
                    </div>

                    {/* Notes */}
                    <div>
                      <label className="font-sans text-[11px] text-slate-teal/55 uppercase tracking-[0.1em] font-semibold mb-1.5 block">
                        Special Instructions
                      </label>
                      <textarea
                        name="notes" value={bookingForm.notes} rows={2}
                        placeholder="Fabric type, stain details, sofa size…"
                        onChange={(e) => setBookingForm((p) => ({ ...p, notes: e.target.value }))}
                        className="w-full font-sans text-sm text-charcoal placeholder:text-slate-teal/30 border border-stone-teal/35 rounded-lg px-4 py-2.5 bg-ivory-warm shadow-sm focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/25 focus:bg-white transition-all duration-200 resize-none"
                      />
                    </div>

                    <button
                      type="submit" disabled={bookingLoading}
                      className="w-full btn-primary flex items-center justify-center gap-2 py-3.5 font-sans font-semibold text-sm disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      <CalendarCheck size={15} />
                      {bookingLoading ? "Booking…" : "Confirm Booking"}
                    </button>

                    {bookingError && (
                      <p className="font-sans text-center text-copper text-xs leading-relaxed">{bookingError}</p>
                    )}

                    <p className="font-sans text-center text-slate-teal/40 text-xs">
                      No payment now — our team will confirm and share the quote.
                    </p>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 16. FAQ ───────────────────────────────────────────────────────────── */}
      <section ref={faqRef} className="bg-teal-deep teal-texture py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-4 md:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={faqInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <SectionTag dark>FAQs</SectionTag>
            <h2 className="font-serif text-ivory-warm text-3xl md:text-4xl font-bold mb-12 max-w-2xl leading-tight">
              Frequently Asked Questions
            </h2>
          </motion.div>

          <div className="space-y-3">
            {faqs.map(({ q, a }, i) => {
              const isOpen = openFaq === i;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  animate={faqInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.04 * i }}
                  className={`border rounded-xl overflow-hidden transition-colors duration-300 ${
                    isOpen
                      ? "border-copper/40 bg-teal-dark"
                      : "border-teal/15 bg-teal-dark/60"
                  }`}
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    className="w-full flex items-center justify-between gap-4 p-5 text-left"
                    aria-expanded={isOpen}
                  >
                    <span
                      className={`font-sans text-sm font-semibold leading-snug ${
                        isOpen ? "text-copper-light" : "text-ivory-warm"
                      }`}
                    >
                      {q}
                    </span>
                    <ChevronDown
                      size={16}
                      className={`text-copper shrink-0 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <p className="font-sans text-stone-teal/70 text-sm leading-relaxed px-5 pb-5">
                          {a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 16. FINAL CTA ────────────────────────────────────────────────────── */}
      <section ref={ctaRef} className="bg-ivory py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-4 md:px-8 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <SectionTag>Book Now</SectionTag>
            <h2 className="font-serif text-teal-deep text-3xl md:text-4xl font-bold mb-6 leading-tight">
              Book Your Sofa Dry Cleaning Service in Delhi Today!
            </h2>
            <p className="font-sans text-slate-teal/70 text-sm leading-relaxed mb-6 max-w-2xl mx-auto">
              Your sofa isn&apos;t just furniture, it&apos;s where your family and memories live. It&apos;s where you rest
              after work, where your children play, and where you entertain guests. It deserves the kind of
              care that actually gives it a caress and a thanks.
            </p>
            <p className="font-sans text-slate-teal/70 text-sm leading-relaxed mb-8 max-w-2xl mx-auto">
              Whether you need a quick sofa dry cleaning near me for a single chair, a sofa shampooing
              service in Delhi for a large family sofa, specialist leather sofa cleaning and polishing Delhi,
              or a complete living room upholstery refresh, DryClean Masters&apos; certified team is ready to
              come to you.
            </p>

            <div className="flex flex-wrap justify-center gap-5 mb-8">
              {[
                "Transparent fixed pricing",
                "Fabric-safe guarantee",
                "Same-day slots available",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <CheckCircle size={13} className="text-teal" />
                  <span className="font-sans text-slate-teal/70 text-sm">{item}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 btn-whatsapp font-sans text-sm px-8 py-3.5"
              >
                <MessageCircle size={16} />
                Book Now
              </a>
              <a
                href={PHONE}
                className="inline-flex items-center gap-2.5 btn-primary font-sans text-sm px-8 py-3.5"
              >
                <Phone size={16} />
                Call {PHONE_DISPLAY}
              </a>
            </div>

            <div className="flex flex-wrap justify-center gap-5 text-xs font-sans text-muted-teal/60">
              <span className="flex items-center gap-1.5">
                <MapPin size={11} />
                Serving All Delhi Areas
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={11} />
                9 AM – 9 PM, All Days
              </span>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
