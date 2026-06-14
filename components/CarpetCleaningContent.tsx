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
  ArrowRight,
  Zap,
  Wind,
} from "lucide-react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

const todayISO = new Date().toISOString().split("T")[0];
const PHONE = "tel:+918882631413";
const PHONE_DISPLAY = "+91 8882631413";
const WA_LINK =
  "https://wa.me/918882631413?text=Hi%2C%20I%20want%20to%20book%20carpet%20cleaning%20in%20Delhi";

function Tag({ children, light }: { children: string; light?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2 mb-4">
      <span className={`w-5 h-[2px] rounded-full ${light ? "bg-teal" : "bg-copper"}`} />
      <span
        className={`font-sans text-xs uppercase tracking-[0.2em] font-semibold ${
          light ? "text-teal" : "text-copper"
        }`}
      >
        {children}
      </span>
    </span>
  );
}

const faqs = [
  {
    q: "How long does carpet cleaning take?",
    a: "Depending on your carpet size, it might take around 1.5–3.5 hours. The time includes all steps, including inspection and grooming. We will tell you the time estimate after inspection before starting.",
  },
  {
    q: "Is carpet shampooing safe for all carpet types?",
    a: "No, for wool, silk, or handwoven carpets, shampooing might not be the best option. For these carpets, dry cleaning methods are best suitable. Carpet shampooing methods are generally preferred for synthetic carpets.",
  },
  {
    q: "Can old and set-in stains be removed?",
    a: "Depending on the stain type, the type of carpet fabric, and whether your previous DIY treatments have changed the stain, most old stains can be removed with our specific stain-targeted treatment. We will tell you during the inspection stage whether a stain can be removed.",
  },
  {
    q: "Is professional carpet cleaning safe for children and pets?",
    a: "Yes, all the products we use are environmentally friendly and non-toxic. Even then, we recommend keeping children and pets out of the room while we clean, but after an hour of finishing, the room is fit for everyone.",
  },
  {
    q: "Do you offer doorstep carpet cleaning in Delhi?",
    a: "Yes, that's our speciality. We do not ask you to transport anything; we would come to your doorstep, clean your carpet, and leave your room just like we found it, without creating any ruckus.",
  },
  {
    q: "How long would my carpet take to dry after cleaning?",
    a: "For synthetic carpets, it would take 2–4 hours to dry, but for thick pile carpets like wool, it might take 4–6 hours to dry off completely. We aid in drying with our air-mover equipment and leave your carpet slightly damp, rather than dripping.",
  },
  {
    q: "Can professional cleaning remove bad odour from my carpet?",
    a: "For most odours like food, dust, or mustiness, yes, the odour would go away completely. But for deep-set odours like pet urine, it would take specialised treatment using bio-enzymes. The results would be satisfactory.",
  },
  {
    q: "Do you clean office carpets in Delhi?",
    a: "Yes, office carpet cleaning services Delhi are our specialised service. We offer office-friendly hours, including weekend, early morning, and evening hours, so that your operations are not disrupted.",
  },
  {
    q: "Do you use machines in carpet cleaning?",
    a: "Yes, we use commercial hot water extraction machines, HEPA vacuums, rotary pile grooming machines, and air-mover dryers to give a deep cleaning to your carpet.",
  },
  {
    q: "How often should carpets be cleaned professionally in Delhi?",
    a: "For an average Delhi house with children and pets, every 3–6 months is a suitable time. For offices with high traffic, consider getting professional cleaning every 3–4 months.",
  },
];

export default function CarpetCleaningContent() {
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
        service: "Carpet Cleaning",
        createdAt: serverTimestamp(),
      });
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "booking", ...bookingForm, service: "Carpet Cleaning" }),
      });
      if (!res.ok) throw new Error("email failed");
      setBookingSubmitted(true);
    } catch (err) {
      console.error("[carpet-booking]", err);
      setBookingError("Booking saved! But confirmation email failed — we'll call you shortly.");
    } finally {
      setBookingLoading(false);
    }
  }

  const heroRef = useRef<HTMLDivElement>(null);
  const delhibadRef = useRef<HTMLDivElement>(null);
  const doorstepRef = useRef<HTMLDivElement>(null);
  const problemsRef = useRef<HTMLDivElement>(null);
  const situationsRef = useRef<HTMLDivElement>(null);
  const typesRef = useRef<HTMLDivElement>(null);
  const pricingRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);
  const beforeAfterRef = useRef<HTMLDivElement>(null);
  const failsRef = useRef<HTMLDivElement>(null);
  const vsRef = useRef<HTMLDivElement>(null);
  const shampooRef = useRef<HTMLDivElement>(null);
  const dryingRef = useRef<HTMLDivElement>(null);
  const officeRef = useRef<HTMLDivElement>(null);
  const signsRef = useRef<HTMLDivElement>(null);
  const honestyRef = useRef<HTMLDivElement>(null);
  const whyRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);
  const areasRef = useRef<HTMLDivElement>(null);
  const relatedRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const bookingRef = useRef<HTMLDivElement>(null);

  const heroInView = useInView(heroRef, { once: true });
  const delhibadInView = useInView(delhibadRef, { once: true, margin: "-60px" });
  const doorstepInView = useInView(doorstepRef, { once: true, margin: "-60px" });
  const problemsInView = useInView(problemsRef, { once: true, margin: "-60px" });
  const situationsInView = useInView(situationsRef, { once: true, margin: "-60px" });
  const typesInView = useInView(typesRef, { once: true, margin: "-60px" });
  const pricingInView = useInView(pricingRef, { once: true, margin: "-60px" });
  const processInView = useInView(processRef, { once: true, margin: "-60px" });
  const beforeAfterInView = useInView(beforeAfterRef, { once: true, margin: "-60px" });
  const failsInView = useInView(failsRef, { once: true, margin: "-60px" });
  const vsInView = useInView(vsRef, { once: true, margin: "-60px" });
  const shampooInView = useInView(shampooRef, { once: true, margin: "-60px" });
  const dryingInView = useInView(dryingRef, { once: true, margin: "-60px" });
  const officeInView = useInView(officeRef, { once: true, margin: "-60px" });
  const signsInView = useInView(signsRef, { once: true, margin: "-60px" });
  const honestyInView = useInView(honestyRef, { once: true, margin: "-60px" });
  const whyInView = useInView(whyRef, { once: true, margin: "-60px" });
  const faqInView = useInView(faqRef, { once: true, margin: "-60px" });
  const areasInView = useInView(areasRef, { once: true, margin: "-60px" });
  const relatedInView = useInView(relatedRef, { once: true, margin: "-60px" });
  const ctaInView = useInView(ctaRef, { once: true, margin: "-60px" });
  const bookingInView = useInView(bookingRef, { once: true, margin: "-60px" });

  return (
    <main>

      {/* ── 1. HERO — split layout ─────────────────────────────────────────────── */}
      <section ref={heroRef} className="bg-teal-deep teal-texture min-h-[88vh] flex items-stretch">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 w-full grid lg:grid-cols-2 gap-0 items-stretch py-16 md:py-0">

          {/* Left — text */}
          <div className="flex flex-col justify-center py-10 lg:py-20 pr-0 lg:pr-12">
            <motion.nav
              initial={{ opacity: 0 }}
              animate={heroInView ? { opacity: 1 } : {}}
              className="mb-5 flex items-center gap-2 text-stone-teal/50 text-xs font-sans"
            >
              <a href="/" className="hover:text-copper-light transition-colors">Home</a>
              <span>/</span>
              <span className="text-copper-light">Carpet Cleaning Services in Delhi</span>
            </motion.nav>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.05 }}
              className="flex flex-wrap gap-x-6 gap-y-2 mb-5"
            >
              {[
                { icon: Star, label: "4.9/5 Rating" },
                { icon: Users, label: "12,000+ Pieces Cleaned" },
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
              className="font-serif text-ivory-warm text-3xl md:text-4xl xl:text-5xl font-bold leading-[1.1] mb-5 max-w-xl"
            >
              Professional Carpet Cleaning Services in Delhi{" "}
              <span className="italic font-normal text-stone-teal/45">
                — Doorstep Deep Clean
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15 }}
              className="font-sans text-stone-teal/65 text-sm leading-relaxed mb-7 max-w-lg"
            >
              Book a deep carpet cleaning for homes, offices, and rugs using modern methods of injection and extraction. Get dry and wet-shampoo cleaning for your carpet to rejuvenate it. Call us and we will remove what vacuuming leaves behind.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-2 gap-2.5 mb-8 max-w-md"
            >
              {[
                "Available at Doorstep",
                "Expert at Drying Methods",
                "Safe for Kids and Pets",
                "Industrial-Standard Machines",
              ].map((b) => (
                <div key={b} className="flex items-start gap-2">
                  <CheckCircle size={13} className="text-copper mt-0.5 shrink-0" />
                  <span className="font-sans text-stone-teal/70 text-xs">{b}</span>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.25 }}
              className="flex flex-wrap gap-3 items-center"
            >
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 btn-whatsapp font-sans text-sm px-6 py-3"
              >
                <MessageCircle size={15} />
                Book Service
              </a>
              <a
                href={PHONE}
                className="inline-flex items-center gap-2 font-sans text-sm px-6 py-3 border border-copper/40 text-copper-light rounded-lg hover:bg-copper/10 transition-colors"
              >
                <Phone size={15} />
                Call Now
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
          </div>

          {/* Right — hero image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={heroInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="relative hidden lg:block"
          >
            <div className="absolute inset-0 flex items-center">
              <div className="relative w-full h-[75%] rounded-2xl overflow-hidden border border-teal/20 shadow-2xl shadow-black/40">
                <Image
                  src="/img/carpet_cleaning/Carpet_Image_Hero_Banner.webp"
                  alt="Professional carpet cleaning service in Delhi"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-teal-deep/60 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5">
                  <div className="bg-teal-deep/80 backdrop-blur-sm border border-teal/20 rounded-xl p-4">
                    <p className="font-sans text-copper-light text-xs font-semibold uppercase tracking-wider mb-1">Customer Review</p>
                    <p className="font-serif text-ivory-warm text-sm italic leading-snug">
                      "The colour difference was genuinely shocking. I thought the carpet was just an older shade, turns out that was two years of Delhi pollution."
                    </p>
                    <p className="font-sans text-stone-teal/60 text-xs mt-1.5">— Arjun Sethi, South Delhi</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 2. DELHI'S CARPET PROBLEM — editorial full-width ─────────────────── */}
      <section ref={delhibadRef} className="bg-ivory py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
          <div className="grid lg:grid-cols-[1fr_420px] gap-12 items-start">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={delhibadInView ? { opacity: 1, y: 0 } : {}}
              >
                <Tag>The Reality</Tag>
                <h2 className="font-serif text-teal-deep text-3xl md:text-4xl font-bold mb-6 leading-tight max-w-2xl">
                  Your Carpet May Not Be As Clean{" "}
                  <span className="italic font-normal text-charcoal/40">As It Looks</span>
                </h2>
                <p className="font-sans text-slate-teal/70 text-sm leading-relaxed mb-8 max-w-2xl border-l-4 border-teal/30 pl-5">
                  Dirty carpets hold dust and bacteria more than your entire house, and keep releasing it back into the air with every step you take on them. With their rich fibre, carpets provide a safe haven for bacteria to expand. Regular vacuums find it hard to reach inside, and the contamination keeps expanding without interruption.
                </p>
              </motion.div>

              <div className="space-y-5">
                {[
                  {
                    num: "01",
                    title: "Fine Particulate Matter",
                    body: "Delhi's air contains PM 2.5, which is very hard to detect and clean from your house. It gets inside every surface of your home and lands directly into your lungs. Your children are directly exposed to them every second due to your upholstery.",
                  },
                  {
                    num: "02",
                    title: "Dust Mite Colonies",
                    body: "Warm indoor temperatures and high humidity during monsoon months create ideal conditions for dust mites to make a home in Delhi carpets. These dust mite particles are a primary trigger for asthma and allergies.",
                  },
                  {
                    num: "03",
                    title: "Pet and Child Exposure",
                    body: "Pets and children spend more direct contact time on carpets than on any other surface. If your carpet is dirty, it directly affects their exposure to bacteria and allergens.",
                  },
                  {
                    num: "04",
                    title: "Seasonal Allergy Amplification",
                    body: "Delhi's intense spring pollen season (February–April) and the dust period before monsoon (May–June) increase the particles settling into indoor carpets. Professional carpet cleaning during these periods provides immense relief for allergy sufferers.",
                  },
                ].map(({ num, title, body }, i) => (
                  <motion.div
                    key={num}
                    initial={{ opacity: 0, x: -20 }}
                    animate={delhibadInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.1 * i, duration: 0.5 }}
                    className="flex gap-5 group"
                  >
                    <div className="shrink-0 w-10 h-10 rounded-full bg-teal/10 border border-teal/20 flex items-center justify-center">
                      <span className="font-serif text-teal text-sm font-bold">{num}</span>
                    </div>
                    <div className="border-b border-mist pb-5 flex-1">
                      <h3 className="font-serif text-teal-deep text-base font-semibold mb-1.5">{title}</h3>
                      <p className="font-sans text-slate-teal/65 text-sm leading-relaxed">{body}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={delhibadInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.5 }}
                className="mt-8 flex flex-wrap gap-3"
              >
                <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 btn-whatsapp font-sans text-sm px-5 py-2.5">
                  <MessageCircle size={14} />
                  Get a Free Quote on WhatsApp
                </a>
                <a href={PHONE}
                  className="inline-flex items-center gap-2 font-sans text-sm text-teal hover:text-teal-mid transition-colors">
                  <Phone size={14} />
                  Call {PHONE_DISPLAY}
                </a>
              </motion.div>
            </div>

            {/* Side image */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={delhibadInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="relative rounded-2xl overflow-hidden aspect-[3/4] border border-mist shadow-xl shadow-teal/10"
            >
              <Image
                src="/img/carpet_cleaning/carpet1.webp"
                alt="Delhi carpet needing professional cleaning"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-teal-deep/50 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 bg-ivory/90 backdrop-blur-sm rounded-xl p-3">
                <p className="font-sans text-teal-deep text-xs font-semibold">Professional carpet cleaning near me is not a luxury — it is a necessity in a Delhi home.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 3. DOORSTEP SERVICE — horizontal flow ────────────────────────────── */}
      <section ref={doorstepRef} className="bg-teal-deep teal-texture py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={doorstepInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="relative rounded-2xl overflow-hidden aspect-video border border-teal/20"
            >
              <Image
                src="/img/carpet_cleaning/carpet2.webp"
                alt="Doorstep carpet cleaning service Delhi"
                fill
                className="object-cover"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={doorstepInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Tag>Doorstep Service</Tag>
              <h2 className="font-serif text-ivory-warm text-3xl md:text-4xl font-bold mb-4 leading-tight">
                Doorstep Carpet Cleaning in Delhi:{" "}
                <span className="italic font-normal text-stone-teal/40">How It Works</span>
              </h2>
              <p className="font-sans text-stone-teal/65 text-sm leading-relaxed mb-6">
                When you search carpet cleaning near me in Delhi, the ideal result isn't a pick-up-and-deliver laundry service. It is a team that comes to your home or office, cleans the carpet where it is, and leaves without you having to destroy your entire room.
              </p>

              <div className="space-y-4 mb-6">
                {[
                  "Large Persian rugs and fitted carpets cannot be transported safely without risk of damage",
                  "Cleaning on-site means the carpet dries in its actual environment, lying flat, preventing distortion",
                  "You see exactly what's being done and can point out specific areas for attention",
                  "No collection/delivery window to manage — book a slot, and we will show up",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <ArrowRight size={13} className="text-copper mt-0.5 shrink-0" />
                    <span className="font-sans text-stone-teal/70 text-sm">{item}</span>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-teal-dark/60 border border-teal/15 rounded-xl p-4">
                  <Zap size={16} className="text-copper mb-2" />
                  <p className="font-sans text-copper-light text-xs font-semibold uppercase tracking-wider mb-1">Apartment-Friendly</p>
                  <p className="font-sans text-stone-teal/60 text-xs leading-relaxed">Equipment fits standard apartment lifts and corridors. Full cleanup on exit.</p>
                </div>
                <div className="bg-teal-dark/60 border border-teal/15 rounded-xl p-4">
                  <Clock size={16} className="text-copper mb-2" />
                  <p className="font-sans text-copper-light text-xs font-semibold uppercase tracking-wider mb-1">Flexible Slots</p>
                  <p className="font-sans text-stone-teal/60 text-xs leading-relaxed">24 hours, 7 days a week. Same-day slots available when you book before noon.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 4. PROBLEMS WE SOLVE — 2-col alternating list ─────────────────────── */}
      <section ref={problemsRef} className="bg-ivory py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={problemsInView ? { opacity: 1, y: 0 } : {}}
          >
            <Tag>Problems We Solve</Tag>
            <h2 className="font-serif text-teal-deep text-3xl md:text-4xl font-bold mb-4 leading-tight max-w-2xl">
              What Carpet Problems{" "}
              <span className="italic font-normal text-charcoal/40">Do We Solve?</span>
            </h2>
            <p className="font-sans text-slate-teal/70 text-sm leading-relaxed mb-12 max-w-3xl">
              If you have tried vacuuming and scrubbing and yet your carpet does not look clean, it is not your fault. These methods are good for surface issues, but your carpet's problems might be deeper. We use professional methods that clean in a way DIY cleaning cannot.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: "Tea & Coffee Stains",
                body: "These stains get imprinted on your carpet and are very tough to remove. However, we have professional solvents specially designed for these stains.",
                img: "/img/carpet_cleaning/carpet3.webp",
              },
              {
                title: "Food Spills",
                body: "Food crumbs attract bacteria and fungus — the reason your carpet smells bad. Our bio-enzyme treatment and sanitisation takes no time in fixing this.",
                img: null,
              },
              {
                title: "Pet Accidents",
                body: "Pet urine and dander get deep in carpet fibres and reach the backing material. No amount of surface spray can clean that off. Our extraction method combined with bio-enzymatic treatment handles it.",
                img: null,
              },
              {
                title: "Dust Accumulation",
                body: "Delhi's particulate pollution settles into carpet fibres, and regular vacuuming loses the battle. Only HEPA pre-vacuuming followed by extraction removes it completely.",
                img: null,
              },
              {
                title: "Shoe Marks and Traffic Lanes",
                body: "Areas stepped on most develop dark, matted lanes. Professional cleaning typically restores 70–90% of the original colour in these areas.",
                img: "/img/carpet_cleaning/carpet4.webp",
              },
              {
                title: "Moisture Smell",
                body: "In Delhi's monsoon season, humidity gets inside the carpet layers and doesn't fully dry, creating mould growth. Extraction, cleaning, and proper drying treatment address the problem.",
                img: null,
              },
              {
                title: "Office Carpet Marks",
                body: "Heavy chair wheels, foot traffic from hundreds of people, and years of dirt damage your carpet to such a level that standard office cleaning can never restore it.",
                img: null,
              },
              {
                title: "Dull, Flat Appearance",
                body: "A carpet that looks lifeless and flat has accumulated a layer of fine dust that dulls its colour and texture. Post-extraction grooming at DryClean Masters restores both.",
                img: null,
              },
            ].map(({ title, body, img }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                animate={problemsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.07 * i, duration: 0.5 }}
                className="flex gap-4 border border-mist rounded-xl p-5 bg-ivory-teal hover:border-teal/30 transition-colors"
              >
                {img && (
                  <div className="relative shrink-0 w-20 h-20 rounded-lg overflow-hidden">
                    <Image src={img} alt={title} fill className="object-cover" />
                  </div>
                )}
                {!img && (
                  <div className="shrink-0 w-10 h-10 rounded-full bg-teal/10 border border-teal/20 flex items-center justify-center mt-0.5">
                    <CheckCircle size={14} className="text-teal" />
                  </div>
                )}
                <div>
                  <h3 className="font-serif text-teal-deep text-base font-semibold mb-1.5">{title}</h3>
                  <p className="font-sans text-slate-teal/65 text-sm leading-relaxed">{body}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={problemsInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6 }}
            className="mt-10 text-center"
          >
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-sans text-sm text-teal hover:text-teal-mid font-semibold transition-colors">
              Book Carpet Cleaning Today <ArrowRight size={14} />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── 5. REAL SITUATIONS — timeline cards ───────────────────────────────── */}
      <section ref={situationsRef} className="bg-teal-dark teal-texture py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={situationsInView ? { opacity: 1, y: 0 } : {}}
          >
            <Tag>Real Situations</Tag>
            <h2 className="font-serif text-ivory-warm text-3xl md:text-4xl font-bold mb-4 leading-tight max-w-2xl">
              Real Situations Our Customers{" "}
              <span className="italic font-normal text-stone-teal/40">Call Us For</span>
            </h2>
            <p className="font-sans text-stone-teal/65 text-sm leading-relaxed mb-12 max-w-2xl">
              You don't have to wait for a disaster. Here's when Delhi homeowners and businesses actually book us:
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                scenario: "Before Guests Arrive",
                body: "The carpet that looked fine in normal light suddenly looks awful when you're expecting family for dinner. Same-day doorstep carpet cleaning in Delhi is available. Book before noon for a same-day slot.",
              },
              {
                scenario: "After a House Party",
                body: "Multiple times someone spilt food, shoe marks your friends left, and a smell that shouldn't be there the morning after — we restore it before your party memories fade.",
              },
              {
                scenario: "Kids Spilling Food",
                body: "Children and carpets are a chaotic combination. Regular professional cleaning brings your carpet back to its newness before letting the stains call it home.",
              },
              {
                scenario: "Pet Accidents",
                body: "A pet urine incident treated within hours is manageable. Left untreated, it reaches the backing material and becomes a permanent odour issue. We treat both fresh and old pet accidents.",
              },
              {
                scenario: "Office Heavy Foot Traffic",
                body: "An office carpet cleaned professionally every 6–12 months lasts longer and maintains a professional appearance that matters to both employees and clients.",
              },
              {
                scenario: "Festive Season Preparation",
                body: "Diwali, Eid, Christmas, or before major family gatherings — a professional carpet cleaning is what you need to bring a positive change to your house.",
              },
            ].map(({ scenario, body }, i) => (
              <motion.div
                key={scenario}
                initial={{ opacity: 0, y: 24 }}
                animate={situationsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.08 * i, duration: 0.5 }}
                className="bg-teal-deep border border-teal/15 rounded-xl p-6 hover:border-copper/30 transition-colors"
              >
                <div className="w-4 h-[2px] bg-copper rounded-full mb-4" />
                <h3 className="font-serif text-copper-light text-base font-semibold mb-3">{scenario}</h3>
                <p className="font-sans text-stone-teal/65 text-sm leading-relaxed">{body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. CARPET TYPES TABLE ─────────────────────────────────────────────── */}
      <section ref={typesRef} className="bg-ivory py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
          <div className="grid lg:grid-cols-[1fr_380px] gap-12 items-start">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={typesInView ? { opacity: 1, y: 0 } : {}}
              >
                <Tag>Carpet Types</Tag>
                <h2 className="font-serif text-teal-deep text-3xl md:text-4xl font-bold mb-4 leading-tight">
                  Types of Carpets{" "}
                  <span className="italic font-normal text-charcoal/40">We Clean</span>
                </h2>
                <p className="font-sans text-slate-teal/70 text-sm leading-relaxed mb-8 max-w-2xl">
                  Different carpets need different cleaning methods because they are constructed in different ways. Using the wrong approach can cause permanent damage to a carpet's pile structure, colour, or backing. We assess your carpet type before selecting any treatment.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={typesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 }}
                className="overflow-x-auto rounded-xl border border-mist"
              >
                <table className="w-full font-sans text-sm">
                  <thead>
                    <tr className="bg-teal-deep">
                      <th className="text-left p-4 text-ivory-warm font-semibold">Carpet Type</th>
                      <th className="text-left p-4 text-stone-teal/70 font-semibold">Cleaning Method</th>
                      <th className="text-left p-4 text-copper-light font-semibold">Special Considerations</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["Persian & Oriental Rugs", "Low-moisture dry cleaning", "Dye stability testing required"],
                      ["Wool Carpets", "pH-neutral wet extraction", "Alkaline products cause fibre damage"],
                      ["Shaggy / High-Pile Carpets", "Specialised extraction", "Pile direction grooming necessary"],
                      ["Synthetic (Nylon, Polyester)", "Hot water extraction", "Most durable; deepest clean possible"],
                      ["Handwoven Rugs", "Dry cleaning", "Moisture risks structural damage"],
                      ["Office Carpet Tiles", "Low-moisture extraction", "Individual tile treatment available"],
                    ].map(([type, method, note], i) => (
                      <tr key={type} className={i % 2 === 0 ? "bg-ivory-teal" : "bg-ivory"}>
                        <td className="p-4 font-medium text-teal-deep border-t border-mist">{type}</td>
                        <td className="p-4 text-slate-teal/70 border-t border-mist">{method}</td>
                        <td className="p-4 text-teal text-xs border-t border-mist">{note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={typesInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="relative rounded-2xl overflow-hidden aspect-[3/4] border border-mist shadow-xl shadow-teal/10 hidden lg:block"
            >
              <Image
                src="/img/carpet_cleaning/carpet5.webp"
                alt="Different types of carpets cleaned by DryClean Masters"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 7. PRICING ────────────────────────────────────────────────────────── */}
      <section ref={pricingRef} className="bg-teal-deep teal-texture py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={pricingInView ? { opacity: 1, y: 0 } : {}}
          >
            <Tag>Pricing</Tag>
            <h2 className="font-serif text-ivory-warm text-3xl md:text-4xl font-bold mb-4 leading-tight max-w-2xl">
              Carpet Cleaning Services{" "}
              <span className="italic font-normal text-stone-teal/40">Prices in Delhi</span>
            </h2>
            <p className="font-sans text-stone-teal/65 text-sm leading-relaxed mb-4 max-w-3xl">
              The price depends on size of your carpet, type of fabric, the level of dirt and staining, the cleaning method required, and whether any special treatments are required. The final price our team tells you is the price you will pay — no hidden charges, no sudden surprises.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 mt-10">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={pricingInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }}
            >
              <h3 className="font-serif text-ivory-warm text-xl font-semibold mb-4">By Carpet Size</h3>
              <div className="overflow-x-auto rounded-xl border border-teal/15">
                <table className="w-full font-sans text-sm">
                  <thead>
                    <tr className="bg-teal-dark">
                      <th className="text-left p-4 text-ivory-warm font-semibold">Carpet Size</th>
                      <th className="text-left p-4 text-copper-light font-semibold">Estimated Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["Small Carpet (up to 20 sq ft)", "₹500–700"],
                      ["Medium Carpet (20–50 sq ft)", "₹800–1200"],
                      ["Large Carpet (50–100 sq ft)", "₹800–1500"],
                      ["Wall-to-Wall Carpet", "Custom Quote"],
                    ].map(([size, price], i) => (
                      <tr key={size} className={i % 2 === 0 ? "bg-teal-dark/70" : "bg-teal-dark/40"}>
                        <td className="p-4 text-stone-teal/80 border-t border-teal/10">{size}</td>
                        <td className="p-4 text-copper-light font-semibold border-t border-teal/10">{price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={pricingInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
            >
              <h3 className="font-serif text-ivory-warm text-xl font-semibold mb-4">By Carpet Type (per sq.ft)</h3>
              <div className="overflow-x-auto rounded-xl border border-teal/15">
                <table className="w-full font-sans text-sm">
                  <thead>
                    <tr className="bg-teal-dark">
                      <th className="text-left p-4 text-ivory-warm font-semibold">Carpet Type</th>
                      <th className="text-left p-4 text-copper-light font-semibold">Charges/sq.ft</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["Synthetic Carpets (nylon, polyester, etc.)", "From ₹8/sq.ft"],
                      ["Wool Carpets", "From ₹12/sq.ft"],
                      ["Silk Carpets", "From ₹18/sq.ft"],
                      ["Persian and Oriental Carpets", "Inspection Required"],
                      ["Shaggy Carpets", "From ₹12/sq.ft"],
                    ].map(([type, charge], i) => (
                      <tr key={type} className={i % 2 === 0 ? "bg-teal-dark/70" : "bg-teal-dark/40"}>
                        <td className="p-4 text-stone-teal/80 border-t border-teal/10">{type}</td>
                        <td className="p-4 text-copper-light font-semibold border-t border-teal/10">{charge}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={pricingInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <a href={PHONE} className="inline-flex items-center gap-2 font-sans text-sm text-copper-light hover:text-copper transition-colors">
              <Phone size={14} /> Call {PHONE_DISPLAY}
            </a>
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 btn-whatsapp font-sans text-sm px-5 py-2.5">
              <MessageCircle size={14} /> WhatsApp to Book Carpet Cleaning
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── 8. PROCESS — vertical alternating timeline ────────────────────────── */}
      <section ref={processRef} className="bg-ivory py-20 md:py-28">
        <div className="max-w-5xl mx-auto px-4 md:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={processInView ? { opacity: 1, y: 0 } : {}}
            className="text-center mb-14"
          >
            <Tag>Our Process</Tag>
            <h2 className="font-serif text-teal-deep text-3xl md:text-4xl font-bold mb-4 leading-tight">
              Our Professional Carpet Cleaning Process
            </h2>
          </motion.div>

          <div className="relative">
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-teal/40 via-teal/20 to-transparent hidden md:block" />
            <div className="space-y-8">
              {[
                {
                  step: "Step 1",
                  title: "Inspection and Fabric Assessment",
                  duration: "10–15 minutes",
                  body: "Before we begin, our team checks your carpet for: identifying exact fibre type, dye stability test on a hidden area, marking stain locations and checking stain types, checking for pre-existing damage, and selecting the appropriate cleaning method and chemicals.",
                },
                {
                  step: "Step 2",
                  title: "Deep Pre-Vacuuming",
                  duration: "15–20 minutes",
                  body: "We ensure that all surface dust is removed before applying any water or chemicals. Otherwise, your carpet would get muddy, and that mud would get deeper inside. We use industrial-grade HEPA vacuum equipment to remove loose surface debris, pet hair, and large particulate matter.",
                },
                {
                  step: "Step 3",
                  title: "Pre-Treatment & Shampoo Application",
                  duration: "10–15 minutes dwell",
                  body: "A pH-matched carpet shampoo is applied across the carpet. The shampoo is left on for at least 10–15 minutes, during which it breaks down oil and protein bonds holding dirt to fibres, loosens deep-embedded particulate matter, and begins the odour neutralisation process.",
                },
                {
                  step: "Step 4",
                  title: "Hot Water Treatment",
                  duration: "The core clean",
                  body: "If your carpet is synthetic, we inject hot water into it with pressure and immediately extract it. This takes out all the dirt and residual shampoo. This results in a genuine deep clean that takes out years of dust from deep inside.",
                },
                {
                  step: "Step 5",
                  title: "Targeted Stain Treatment",
                  duration: "As needed",
                  body: "Stains that couldn't be removed by the main cleaning treatment receive targeted treatment: tannin removers for tea, coffee, and wine; protein enzyme cleaners for food and biological stains; solvent-based agents for oil, grease, and cosmetic marks; bio-enzymatic treatments for pet urine.",
                },
                {
                  step: "Step 6",
                  title: "Sanitisation & Odour Treatment",
                  duration: "Full coverage",
                  body: "After stain removal, a sanitising agent is applied across the carpet. For carpet odour removal, we use organic compounds to neutralise the smell rather than masking it with fragrance that fades within days.",
                },
                {
                  step: "Step 7",
                  title: "Drying & Final Grooming",
                  duration: "2–6 hours",
                  body: "We accelerate drying time using our air-mover equipment. For most synthetic carpets, the carpet dries within 2–4 hours. Wool and thick-pile carpets may take 4–6 hours. Final grooming restores pile direction and raises flattened fibres with a carpet rake.",
                },
              ].map(({ step, title, duration, body }, i) => {
                const isLeft = i % 2 === 0;
                return (
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: isLeft ? -24 : 24 }}
                    animate={processInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.08 * i, duration: 0.5 }}
                    className={`relative md:w-[calc(50%-24px)] ${isLeft ? "md:mr-auto" : "md:ml-auto"}`}
                  >
                    <div className="absolute top-4 -right-6 md:block hidden w-3 h-3 rounded-full bg-copper border-2 border-ivory shadow-sm" style={isLeft ? { right: "-30px" } : { left: "-30px" }} />
                    <div className="bg-ivory-teal border border-mist rounded-xl p-6 hover:border-teal/30 transition-colors">
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-sans text-copper text-xs font-bold uppercase tracking-wider">{step}</span>
                        <span className="font-sans text-slate-teal/40 text-xs">{duration}</span>
                      </div>
                      <div className="w-5 h-[2px] bg-teal/50 rounded-full mb-3" />
                      <h3 className="font-serif text-teal-deep text-base font-semibold mb-2">{title}</h3>
                      <p className="font-sans text-slate-teal/65 text-sm leading-relaxed">{body}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── 9. BEFORE & AFTER + WHAT CUSTOMERS NOTICE ────────────────────────── */}
      <section ref={beforeAfterRef} className="bg-teal-deep teal-texture py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={beforeAfterInView ? { opacity: 1, y: 0 } : {}}
            >
              <Tag>Before & After</Tag>
              <h2 className="font-serif text-ivory-warm text-3xl md:text-4xl font-bold mb-6 leading-tight">
                The Visible Difference
              </h2>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-teal-dark border border-teal/15 rounded-xl p-5">
                  <p className="font-sans text-stone-teal/50 text-xs font-semibold uppercase tracking-wider mb-3">Before</p>
                  {["Dull colour", "Flat pile", "Visible foot lanes", "Visible marks", "Bad odour"].map((item) => (
                    <div key={item} className="flex items-center gap-2 mb-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-stone-teal/30 shrink-0" />
                      <span className="font-sans text-stone-teal/55 text-xs">{item}</span>
                    </div>
                  ))}
                </div>
                <div className="bg-teal-dark border border-copper/25 rounded-xl p-5">
                  <p className="font-sans text-copper-light text-xs font-semibold uppercase tracking-wider mb-3">After</p>
                  {["Noticeably brighter colour", "Raised, uniform pile", "Foot lanes eliminated", "No bad odour", "Room smells fresh"].map((item) => (
                    <div key={item} className="flex items-center gap-2 mb-1.5">
                      <CheckCircle size={11} className="text-copper shrink-0" />
                      <span className="font-sans text-stone-teal/75 text-xs">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative rounded-xl overflow-hidden aspect-video border border-teal/20">
                <Image
                  src="/img/carpet_cleaning/carpet6.webp"
                  alt="Before and after carpet cleaning results in Delhi"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={beforeAfterInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15 }}
            >
              <Tag>Customer Reports</Tag>
              <h2 className="font-serif text-ivory-warm text-3xl md:text-4xl font-bold mb-6 leading-tight">
                What Customers Notice{" "}
                <span className="italic font-normal text-stone-teal/40">After Professional Cleaning</span>
              </h2>

              <div className="space-y-4 mb-8">
                {[
                  { label: "Fresher room smell", note: "Not fragrance, just the absence of the smell that was there before" },
                  { label: "Softer texture underfoot", note: "Your carpet that used to feel coarse because of dried off dust would start to feel so soft" },
                  { label: "Brighter colour", note: "The most consistent comment — colours that seemed faded often recover" },
                  { label: "Less dust in the air", note: "Fewer allergens are released from the carpet into the indoor environment" },
                  { label: "Children and pets gravitate back", note: "Animals sense the removal of bacteria and find the carpet as their comfort place again" },
                ].map(({ label, note }, i) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, x: 16 }}
                    animate={beforeAfterInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.1 + 0.07 * i }}
                    className="flex gap-3 border-b border-teal/15 pb-4 last:border-0"
                  >
                    <CheckCircle size={15} className="text-copper mt-0.5 shrink-0" />
                    <div>
                      <p className="font-sans text-ivory-warm text-sm font-semibold">{label}</p>
                      <p className="font-sans text-stone-teal/55 text-xs mt-0.5">{note}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <blockquote className="bg-teal-dark border border-copper/20 rounded-xl p-5">
                <p className="font-serif text-ivory-warm text-sm italic leading-relaxed mb-3">
                  "The colour difference was genuinely shocking. I thought the carpet was just an older shade, turns out that was two years of Delhi pollution."
                </p>
                <footer className="font-sans text-stone-teal/55 text-xs">— Arjun Sethi, South Delhi</footer>
              </blockquote>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 10. WHY CLEANING FAILS — numbered callouts ────────────────────────── */}
      <section ref={failsRef} className="bg-ivory py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
          <div className="grid lg:grid-cols-[1fr_380px] gap-12 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={failsInView ? { opacity: 1, y: 0 } : {}}
              >
                <Tag>Common Mistakes</Tag>
                <h2 className="font-serif text-teal-deep text-3xl md:text-4xl font-bold mb-4 leading-tight">
                  Why Do Most Carpet Cleaning{" "}
                  <span className="italic font-normal text-charcoal/40">Efforts Fail?</span>
                </h2>
                <p className="font-sans text-slate-teal/70 text-sm leading-relaxed mb-10 max-w-2xl">
                  You might have tried carpet cleaning before and yet, after a week, the smell returns. Here's why this happens:
                </p>
              </motion.div>

              <div className="space-y-6">
                {[
                  {
                    num: "01",
                    title: "Solvent is rinsed off quickly",
                    body: "It requires precise timing to ensure that the shampoo or any solvent works its magic properly. Most services apply chemical, scrub immediately, and then rinse off. The contamination doesn't break down properly and rears its head very quickly again.",
                  },
                  {
                    num: "02",
                    title: "The wrong product is used on the wrong carpet",
                    body: "You need to apply a specific product to each carpet type to clean it properly. If you use a solvent on a synthetic carpet with biological contamination, it would do almost nothing. Fabric and chemical identification is essential.",
                  },
                  {
                    num: "03",
                    title: "Cheap machines that do not work properly",
                    body: "Semi-professional or consumer equipment do not have sufficient power to extract properly. Dirt stays stuck in the carpet. Even worse, the carpet remains wet, leading to contamination getting even deeper than before.",
                  },
                  {
                    num: "04",
                    title: "Ignoring pre-vacuum",
                    body: "If a team is rushing to get the job done, they often skip the pre-vacuuming step. This makes the dry dirt into mud, which becomes very difficult to remove later and does not let your carpet have a clean or fresh experience.",
                  },
                ].map(({ num, title, body }, i) => (
                  <motion.div
                    key={num}
                    initial={{ opacity: 0, x: -16 }}
                    animate={failsInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.1 * i, duration: 0.5 }}
                    className="flex gap-5"
                  >
                    <div className="shrink-0 font-serif text-3xl font-bold text-teal/20 leading-none mt-1 w-10 text-right">{num}</div>
                    <div className="border-l-2 border-teal/20 pl-5">
                      <h3 className="font-serif text-teal-deep text-base font-semibold mb-1.5">{title}</h3>
                      <p className="font-sans text-slate-teal/65 text-sm leading-relaxed">{body}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={failsInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="relative rounded-2xl overflow-hidden aspect-[3/4] border border-mist shadow-xl hidden lg:block"
            >
              <Image
                src="/img/carpet_cleaning/carpet7.webp"
                alt="Professional carpet cleaning equipment by DryClean Masters"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 11. HOME VACUUMING VS PROFESSIONAL ────────────────────────────────── */}
      <section ref={vsRef} className="bg-teal-dark teal-texture py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={vsInView ? { opacity: 1, y: 0 } : {}}
          >
            <Tag>Comparison</Tag>
            <h2 className="font-serif text-ivory-warm text-3xl md:text-4xl font-bold mb-4 leading-tight max-w-2xl">
              Home Vacuuming vs. Professional Cleaning:{" "}
              <span className="italic font-normal text-stone-teal/40">An Honest Comparison</span>
            </h2>
            <p className="font-sans text-stone-teal/65 text-sm leading-relaxed mb-10 max-w-3xl">
              Is professional carpet cleaning worth it? If you only need surface cleaning, your daily vacuuming might work fine. But if you need removal of allergens, embedded dust, stains, and bad odour, professional carpet cleaning services in Delhi are worth it.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={vsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="overflow-x-auto rounded-xl border border-teal/15"
          >
            <table className="w-full font-sans text-sm">
              <thead>
                <tr className="bg-teal-deep">
                  <th className="text-left p-4 text-ivory-warm font-semibold w-1/3">What You're Dealing With</th>
                  <th className="text-left p-4 text-stone-teal/70 font-semibold w-1/3">Home Vacuuming</th>
                  <th className="text-left p-4 text-copper-light font-semibold w-1/3">Professional Cleaning</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Surface dust and debris", "✔ Effective", "✔ Effective"],
                  ["Embedded particulate matter", "✗ Doesn't reach", "✔ Removed with extraction method"],
                  ["Bacteria and dust mites", "✗ Spreads them", "✔ Sanitisation eliminates them"],
                  ["Old stains", "✗ Doesn't touch them", "✔ Targets them specifically"],
                  ["Odour sources", "✗ No effect", "✔ Neutralisation treatment"],
                  ["Mould in the backing", "✗ Cannot address", "✔ Removed through extraction treatment"],
                  ["Pile restoration", "✗ No effect", "✔ Grooming restores it"],
                  ["Dye and colour freshness", "✗ No effect", "✔ Recovered after cleaning"],
                ].map(([issue, vacuum, professional], i) => (
                  <tr key={issue} className={i % 2 === 0 ? "bg-teal-dark/70" : "bg-teal-dark/40"}>
                    <td className="p-4 font-medium text-stone-teal/80 border-t border-teal/10">{issue}</td>
                    <td className={`p-4 border-t border-teal/10 text-sm ${vacuum.startsWith("✗") ? "text-stone-teal/40 italic" : "text-teal"}`}>{vacuum}</td>
                    <td className={`p-4 border-t border-teal/10 text-sm ${professional.startsWith("✔") ? "text-copper-light" : "text-stone-teal/40"}`}>{professional}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>
      </section>

      {/* ── 12. CARPET SHAMPOOING ─────────────────────────────────────────────── */}
      <section ref={shampooRef} className="bg-ivory py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={shampooInView ? { opacity: 1, y: 0 } : {}}
          >
            <Tag>Carpet Shampooing</Tag>
            <h2 className="font-serif text-teal-deep text-3xl md:text-4xl font-bold mb-4 leading-tight max-w-2xl">
              Carpet Shampooing Service in Delhi:{" "}
              <span className="italic font-normal text-charcoal/40">What It Is and When You Need It</span>
            </h2>
            <p className="font-sans text-slate-teal/70 text-sm leading-relaxed mb-12 max-w-3xl">
              Carpet shampooing service Delhi, as opposed to dry cleaning, is the wet foam or hot water cleaning method, adopted for synthetic fabric carpets dealing with deep dirt contamination.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                num: "01",
                title: "Foam Application and Deep Penetration",
                body: "We apply a foam shampoo on the carpet surface and leave it for 10–15 minutes. It gets deep inside the carpet and breaks down organic compounds like food residue, body oils, pet contamination — something dry cleaning methods can't address as effectively.",
              },
              {
                num: "02",
                title: "Odour Reduction at the Source",
                body: "Carpet shampoos have integrated deodorising agents that treat the bad odour during the cleaning process. This fixes the odour-causing bacteria rather than just masking it.",
              },
              {
                num: "03",
                title: "Stain Loosening Before Extraction",
                body: "As we leave the shampoo on your carpet for some minutes, it loosens the stain before completely removing it. This gives much better results for old and stubborn stains.",
              },
              {
                num: "04",
                title: "Immediate Hot Water Extraction",
                body: "Our combined inject and extract process cleans the carpet in one go without leaving any sticky substance behind that would later attract dirt.",
              },
            ].map(({ num, title, body }, i) => (
              <motion.div
                key={num}
                initial={{ opacity: 0, y: 24 }}
                animate={shampooInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 * i, duration: 0.5 }}
                className="border border-mist rounded-xl p-6 bg-ivory-teal hover:border-teal/40 hover:shadow-lg hover:shadow-teal/10 transition-all"
              >
                <span className="font-serif text-4xl font-bold text-teal/15 leading-none block mb-3">{num}</span>
                <div className="w-5 h-[2px] bg-teal/50 rounded-full mb-3" />
                <h3 className="font-serif text-teal-deep text-base font-semibold mb-2">{title}</h3>
                <p className="font-sans text-slate-teal/65 text-sm leading-relaxed">{body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 13. DRYING TIME ───────────────────────────────────────────────────── */}
      <section ref={dryingRef} className="bg-teal-deep teal-texture py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={dryingInView ? { opacity: 1, y: 0 } : {}}
          >
            <Tag>Drying Time</Tag>
            <h2 className="font-serif text-ivory-warm text-3xl md:text-4xl font-bold mb-4 leading-tight max-w-2xl">
              Drying Time Anxiety?{" "}
              <span className="italic font-normal text-stone-teal/40">Let Us Solve It</span>
            </h2>
            <p className="font-sans text-stone-teal/65 text-sm leading-relaxed mb-10 max-w-3xl">
              You've had your carpet cleaned because you're expecting guests in the evening. We know. Here's the honest picture:
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-10 items-start">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={dryingInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }}
            >
              <div className="overflow-x-auto rounded-xl border border-teal/15">
                <table className="w-full font-sans text-sm">
                  <thead>
                    <tr className="bg-teal-dark">
                      <th className="text-left p-4 text-ivory-warm font-semibold">Carpet Type</th>
                      <th className="text-left p-4 text-stone-teal/70 font-semibold">Walk-On Dry</th>
                      <th className="text-left p-4 text-copper-light font-semibold">Fully Dry</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["Synthetic Carpets", "2–4 hours", "4–6 hours"],
                      ["Wool Carpets", "4–6 hours", "6–10 hours"],
                      ["Shaggy Carpets", "4–5 hours", "Up to 12 hours"],
                    ].map(([type, walkOn, full], i) => (
                      <tr key={type} className={i % 2 === 0 ? "bg-teal-dark/70" : "bg-teal-dark/40"}>
                        <td className="p-4 text-stone-teal/80 border-t border-teal/10">{type}</td>
                        <td className="p-4 text-stone-teal/60 border-t border-teal/10">{walkOn}</td>
                        <td className="p-4 text-copper-light font-semibold border-t border-teal/10">{full}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p className="font-sans text-stone-teal/55 text-xs mt-4 border-l-2 border-copper/30 pl-4">
                We recommend booking morning slots as a carpet gets dry faster in the afternoon.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={dryingInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-2 gap-4"
            >
              <div className="bg-teal-dark border border-teal/15 rounded-xl p-5">
                <div className="flex items-center gap-2 mb-4">
                  <Wind size={16} className="text-copper" />
                  <span className="font-sans text-copper-light text-xs font-semibold uppercase tracking-wider">Speed Up Drying</span>
                </div>
                {[
                  "Run ceiling fans on highest setting",
                  "Open windows for better ventilation",
                  "Air conditioner on low humidity setting",
                  "Our air-mover equipment (included)",
                ].map((tip) => (
                  <div key={tip} className="flex items-start gap-2 mb-2">
                    <CheckCircle size={11} className="text-copper mt-0.5 shrink-0" />
                    <span className="font-sans text-stone-teal/65 text-xs">{tip}</span>
                  </div>
                ))}
              </div>
              <div className="bg-teal-dark border border-teal/15 rounded-xl p-5">
                <div className="flex items-center gap-2 mb-4">
                  <AlertCircle size={16} className="text-stone-teal/40" />
                  <span className="font-sans text-stone-teal/50 text-xs font-semibold uppercase tracking-wider">What Slows Drying</span>
                </div>
                {[
                  "High humidity (especially monsoon)",
                  "Thick carpet backing",
                  "Poor ventilation in the room",
                ].map((tip) => (
                  <div key={tip} className="flex items-start gap-2 mb-2">
                    <span className="text-stone-teal/40 text-xs mt-0.5">✗</span>
                    <span className="font-sans text-stone-teal/50 text-xs">{tip}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 14. OFFICE CARPETS ────────────────────────────────────────────────── */}
      <section ref={officeRef} className="bg-ivory py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={officeInView ? { opacity: 1, y: 0 } : {}}
          >
            <Tag>Office Carpet Cleaning</Tag>
            <h2 className="font-serif text-teal-deep text-3xl md:text-4xl font-bold mb-4 leading-tight max-w-2xl">
              Office Carpet Cleaning Services in Delhi
            </h2>
            <p className="font-sans text-slate-teal/70 text-sm leading-relaxed mb-4 max-w-3xl">
              An office carpet experiences a completely different level of traffic and hygiene problems than a home carpet. A corporate office carpet faces hundreds of shoes depositing outdoor pollution, chair wheels grinding dirt into the pile, food and beverage spills, air conditioning condensation, and appearance standards that a smelly carpet affects badly.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-10">
            {[
              { Icon: Clock, title: "Minimal Disruption", body: "24-hour and weekend cleaning slots so your office operation is never interrupted." },
              { Icon: Wind, title: "Fast Drying", body: "Machine drying leaves carpet dry within 2–4 hours. Back to business quickly." },
              { Icon: Users, title: "Large Area Capacity", body: "Our commercial-grade machines cover high-volume office floors of 5,000 sq.ft. and above in a single visit." },
              { Icon: CheckCircle, title: "Tile-Level Treatment", body: "We can clean individual or stained carpet tiles without having to clean the entire floor." },
            ].map(({ Icon, title, body }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 24 }}
                animate={officeInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 * i, duration: 0.5 }}
                className="border border-mist rounded-xl p-6 bg-ivory-teal hover:border-teal/40 transition-all"
              >
                <div className="w-9 h-9 rounded-lg bg-teal/10 flex items-center justify-center mb-4">
                  <Icon size={16} className="text-teal" />
                </div>
                <h3 className="font-serif text-teal-deep text-base font-semibold mb-2">{title}</h3>
                <p className="font-sans text-slate-teal/65 text-sm leading-relaxed">{body}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={officeInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
            className="mt-10 bg-teal-deep rounded-2xl p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-teal/20"
          >
            <div>
              <p className="font-serif text-ivory-warm text-lg font-semibold mb-1">Need Commercial Carpet Cleaning for Your Office, Clinic or Showroom?</p>
              <p className="font-sans text-stone-teal/60 text-sm">We provide service documentation for facilities management.</p>
            </div>
            <div className="flex flex-wrap gap-3 shrink-0">
              <a href={PHONE} className="inline-flex items-center gap-2 font-sans text-sm px-5 py-2.5 border border-copper/40 text-copper-light rounded-lg hover:bg-copper/10 transition-colors whitespace-nowrap">
                <Phone size={14} /> Get a Custom Quote
              </a>
              <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 btn-whatsapp font-sans text-sm px-5 py-2.5 whitespace-nowrap">
                <MessageCircle size={14} /> WhatsApp Now
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 15. SIGNS ─────────────────────────────────────────────────────────── */}
      <section ref={signsRef} className="bg-teal-deep teal-texture py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={signsInView ? { opacity: 1, y: 0 } : {}}
            className="mb-12"
          >
            <Tag>Warning Signs</Tag>
            <h2 className="font-serif text-ivory-warm text-3xl md:text-4xl font-bold mb-4 leading-tight max-w-2xl">
              Signs Your Carpet Needs{" "}
              <span className="italic font-normal text-stone-teal/40">Professional Cleaning Now</span>
            </h2>
            <p className="font-sans text-stone-teal/65 text-sm leading-relaxed max-w-2xl">
              Don't be too late in booking professional carpet cleaning services in Delhi. If you're noticing any of these signs, your carpet needs our help immediately:
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {[
              "A smell that returns within days of vacuuming",
              "Colour that looks consistently dull or grey",
              "A sticky or slightly rough texture underfoot",
              "Sneezing or allergy symptoms that improve when you leave the room",
              "Stains that keep reappearing after you clean them",
              "Visible traffic lanes that don't vacuum away",
              "Some areas that always smell, regardless of surface cleaning — contamination has reached the backing",
            ].map((sign, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={signsInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.07 * i, duration: 0.4 }}
                className="flex items-start gap-3 bg-teal-dark border border-teal/15 rounded-xl p-5 hover:border-copper/30 transition-colors"
              >
                <AlertCircle size={14} className="text-copper mt-0.5 shrink-0" />
                <p className="font-sans text-stone-teal/70 text-sm leading-relaxed">{sign}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 16. WHAT WE CAN'T PROMISE ─────────────────────────────────────────── */}
      <section ref={honestyRef} className="bg-ivory py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={honestyInView ? { opacity: 1, y: 0 } : {}}
          >
            <Tag>Our Honesty</Tag>
            <h2 className="font-serif text-teal-deep text-3xl md:text-4xl font-bold mb-4 leading-tight max-w-2xl">
              What We Can't Promise{" "}
              <span className="italic font-normal text-charcoal/40">And Why We're Telling You</span>
            </h2>
            <p className="font-sans text-slate-teal/70 text-sm leading-relaxed mb-10 max-w-3xl">
              Fulfilling expectations is our principle, and that includes transparent communication so that we don't give false hopes. We prefer honesty:
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-5">
            {[
              {
                title: "We can't always remove 100% of stains",
                body: "Some stains have permanently changed the carpet fibre, some have done colour changes to your carpet. We clean — we can't fix a colour change.",
              },
              {
                title: "We can't restore a damaged carpet",
                body: "Carpets that have frayed edges, moth damage, or pile worn down to the base cannot be restored by cleaning.",
              },
              {
                title: "We can't eliminate odour from a damaged backing",
                body: "Once the backing material absorbs pet urine or other contamination in large amounts over a long period, our bio-enzymatic treatment cannot eliminate it.",
              },
              {
                title: "We can't control how you care for your carpet afterwards",
                body: "A carpet clean works for a longer period with basic maintenance. If you don't maintain it, it might become dirtier much faster and you may require service again sooner than we recommended.",
              },
            ].map(({ title, body }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                animate={honestyInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 * i, duration: 0.5 }}
                className="flex gap-4 border border-mist rounded-xl p-6 bg-ivory-teal"
              >
                <Shield size={18} className="text-teal/50 mt-0.5 shrink-0" />
                <div>
                  <h3 className="font-serif text-teal-deep text-base font-semibold mb-1.5">{title}</h3>
                  <p className="font-sans text-slate-teal/65 text-sm leading-relaxed">{body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 17. WHY CHOOSE — stat-led layout ─────────────────────────────────── */}
      <section ref={whyRef} className="bg-teal-dark teal-texture py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={whyInView ? { opacity: 1, y: 0 } : {}}
          >
            <Tag>Why Us</Tag>
            <h2 className="font-serif text-ivory-warm text-3xl md:text-4xl font-bold mb-4 leading-tight max-w-2xl">
              Why Choose DryClean Masters{" "}
              <span className="italic font-normal text-stone-teal/40">for Carpet Cleaning in Delhi</span>
            </h2>
          </motion.div>

          {/* Stat bar */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={whyInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 my-10"
          >
            {[
              { stat: "12,000+", label: "Carpets & Upholstery Pieces Cleaned Across Delhi" },
              { stat: "4.9/5", label: "Average Customer Rating" },
              { stat: "10+", label: "Years of Specialisation" },
              { stat: "24/7", label: "Booking Availability" },
            ].map(({ stat, label }) => (
              <div key={stat} className="bg-teal-deep border border-teal/15 rounded-xl p-5 text-center">
                <p className="font-serif text-copper-light text-3xl font-bold mb-1">{stat}</p>
                <p className="font-sans text-stone-teal/55 text-xs leading-relaxed">{label}</p>
              </div>
            ))}
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { Icon: CheckCircle, title: "Fabric Assessment First, Always", body: "We never skip the inspection step. We assess every carpet individually for fibre type, dye stability, and appropriate cleaning method before applying any product." },
              { Icon: Award, title: "Industrial Extraction Equipment", body: "Our machines are industrial-grade, not the semi-professional machines many smaller services use. These machines have extraction power that gives deeper cleaning and faster drying." },
              { Icon: Leaf, title: "Fabric-Safe, Child and Pet Safe Chemistry", body: "All products are biodegradable, non-toxic, and tested safe for households with children and pets. No harsh chemical smells, no toxic residues." },
              { Icon: MapPin, title: "True Doorstep Service With Full Delhi Coverage", body: "We don't ask you to transport anything. Our teams are stationed across Delhi for faster response and same-day availability." },
              { Icon: Users, title: "Certified Technicians, Not General Cleaners", body: "Our technicians are specifically trained in carpet and upholstery care. This isn't a side service — it's our specialisation." },
              { Icon: Star, title: "Transparent Pricing + Satisfaction Guarantee", body: "Pricing is confirmed only after on-site inspection. No hidden charges. If the result doesn't meet your expectations, we work until you are satisfied. No conditions." },
            ].map(({ Icon, title, body }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 24 }}
                animate={whyInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.07 * i, duration: 0.5 }}
                className="bg-teal-deep border border-teal/15 rounded-xl p-6 hover:border-copper/30 transition-colors"
              >
                <div className="w-8 h-8 rounded-lg bg-copper/10 flex items-center justify-center mb-4">
                  <Icon size={15} className="text-copper" />
                </div>
                <h3 className="font-serif text-ivory-warm text-base font-semibold mb-2">{title}</h3>
                <p className="font-sans text-stone-teal/60 text-sm leading-relaxed">{body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 18. BOOKING FORM ─────────────────────────────────────────────────── */}
      <section ref={bookingRef} id="booking" className="bg-ivory py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={bookingInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <Tag>Book Now</Tag>
              <h2 className="font-serif text-teal-deep text-3xl md:text-4xl font-bold mb-4 max-w-xl leading-tight">
                Book Your Carpet Cleaning{" "}
                <span className="italic font-normal text-charcoal/40">Service Today</span>
              </h2>
              <p className="font-sans text-slate-teal/70 text-sm leading-relaxed mb-8 max-w-md">
                Fill in your details and our certified technician will visit, assess your carpet, and give you a transparent quote — no obligation, completely free.
              </p>
              <div className="space-y-4 mb-8">
                {[
                  "Free in-person carpet inspection",
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
              <div className="relative rounded-xl overflow-hidden aspect-video border border-mist">
                <Image
                  src="/img/carpet_cleaning/carpet1.webp"
                  alt="DryClean Masters carpet cleaning team Delhi"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={bookingInView ? { opacity: 1, x: 0 } : {}}
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
                      <h3 className="font-serif text-teal-deep text-xl font-bold mb-1.5">Booking Confirmed!</h3>
                      <p className="font-sans text-slate-teal/60 text-sm max-w-xs">
                        We've received your request for carpet cleaning on{" "}
                        <span className="font-semibold text-charcoal">{bookingForm.date}</span>. Our team will call you shortly to confirm.
                      </p>
                    </div>
                    <button
                      onClick={() => { setBookingSubmitted(false); setBookingForm({ name: "", phone: "", email: "", date: "", timeSlot: "", address: "", notes: "" }); }}
                      className="font-sans text-xs text-teal hover:text-teal-mid font-semibold transition-colors"
                    >
                      Book another visit
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleBookingSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="font-sans text-[11px] text-slate-teal/55 uppercase tracking-[0.1em] font-semibold mb-1.5 block">
                          Full Name <span className="text-copper">*</span>
                        </label>
                        <input
                          name="name" value={bookingForm.name} required placeholder="Rahul Sharma"
                          onChange={(e) => setBookingForm((p) => ({ ...p, name: e.target.value }))}
                          className="w-full font-sans text-sm text-charcoal placeholder:text-slate-teal/30 border border-stone-teal/35 rounded-lg px-4 py-2.5 bg-ivory-warm shadow-sm focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/25 focus:bg-white transition-all"
                        />
                      </div>
                      <div>
                        <label className="font-sans text-[11px] text-slate-teal/55 uppercase tracking-[0.1em] font-semibold mb-1.5 block">
                          Phone <span className="text-copper">*</span>
                        </label>
                        <input
                          name="phone" value={bookingForm.phone} required type="tel" placeholder="+91 98765 43210"
                          onChange={(e) => setBookingForm((p) => ({ ...p, phone: e.target.value }))}
                          className="w-full font-sans text-sm text-charcoal placeholder:text-slate-teal/30 border border-stone-teal/35 rounded-lg px-4 py-2.5 bg-ivory-warm shadow-sm focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/25 focus:bg-white transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="font-sans text-[11px] text-slate-teal/55 uppercase tracking-[0.1em] font-semibold mb-1.5 block">
                        Email <span className="text-copper">*</span>
                      </label>
                      <input
                        name="email" value={bookingForm.email} required type="email" placeholder="rahul@example.com"
                        onChange={(e) => setBookingForm((p) => ({ ...p, email: e.target.value }))}
                        className="w-full font-sans text-sm text-charcoal placeholder:text-slate-teal/30 border border-stone-teal/35 rounded-lg px-4 py-2.5 bg-ivory-warm shadow-sm focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/25 focus:bg-white transition-all"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="font-sans text-[11px] text-slate-teal/55 uppercase tracking-[0.1em] font-semibold mb-1.5 block">
                          <CalendarCheck size={11} className="inline mr-1 mb-0.5" />
                          Date <span className="text-copper">*</span>
                        </label>
                        <input
                          name="date" value={bookingForm.date} required type="date" min={todayISO}
                          onChange={(e) => setBookingForm((p) => ({ ...p, date: e.target.value }))}
                          className="w-full font-sans text-sm text-charcoal border border-stone-teal/35 rounded-lg px-4 py-2.5 bg-ivory-warm shadow-sm focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/25 focus:bg-white transition-all"
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
                                className={`flex-1 flex flex-col items-center justify-center rounded-lg border text-center transition-all ${active ? "border-teal bg-teal/8 text-teal" : "border-stone-teal/25 bg-ivory text-slate-teal/60 hover:border-teal/40"}`}
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

                    <div>
                      <label className="font-sans text-[11px] text-slate-teal/55 uppercase tracking-[0.1em] font-semibold mb-1.5 block">
                        <MapPin size={11} className="inline mr-1 mb-0.5" />
                        Address / Locality <span className="text-copper">*</span>
                      </label>
                      <input
                        name="address" value={bookingForm.address} required placeholder="e.g. South Extension, Delhi"
                        onChange={(e) => setBookingForm((p) => ({ ...p, address: e.target.value }))}
                        className="w-full font-sans text-sm text-charcoal placeholder:text-slate-teal/30 border border-stone-teal/35 rounded-lg px-4 py-2.5 bg-ivory-warm shadow-sm focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/25 focus:bg-white transition-all"
                      />
                    </div>

                    <div>
                      <label className="font-sans text-[11px] text-slate-teal/55 uppercase tracking-[0.1em] font-semibold mb-1.5 block">
                        Special Instructions
                      </label>
                      <textarea
                        name="notes" value={bookingForm.notes} rows={2}
                        placeholder="Carpet type, stain details, size…"
                        onChange={(e) => setBookingForm((p) => ({ ...p, notes: e.target.value }))}
                        className="w-full font-sans text-sm text-charcoal placeholder:text-slate-teal/30 border border-stone-teal/35 rounded-lg px-4 py-2.5 bg-ivory-warm shadow-sm focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/25 focus:bg-white transition-all resize-none"
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

      {/* ── 19. FAQ — 2-column accordion ──────────────────────────────────────── */}
      <section ref={faqRef} className="bg-teal-deep teal-texture py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={faqInView ? { opacity: 1, y: 0 } : {}}
            className="mb-12"
          >
            <Tag>FAQs</Tag>
            <h2 className="font-serif text-ivory-warm text-3xl md:text-4xl font-bold leading-tight max-w-2xl">
              Frequently Asked Questions
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-3">
            {faqs.map(({ q, a }, i) => {
              const isOpen = openFaq === i;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  animate={faqInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.04 * i, duration: 0.4 }}
                  className={`border rounded-xl overflow-hidden transition-colors duration-300 self-start ${
                    isOpen ? "border-copper/40 bg-teal-dark" : "border-teal/15 bg-teal-dark/60"
                  }`}
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    className="w-full flex items-center justify-between gap-4 p-5 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className={`font-sans text-sm font-semibold leading-snug ${isOpen ? "text-copper-light" : "text-ivory-warm"}`}>
                      {q}
                    </span>
                    <ChevronDown
                      size={16}
                      className={`text-copper shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
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
                        <p className="font-sans text-stone-teal/70 text-sm leading-relaxed px-5 pb-5">{a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={faqInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
            className="mt-10 text-center"
          >
            <p className="font-sans text-stone-teal/60 text-sm mb-4">Still have questions? Speak directly with our carpet cleaning expert.</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a href={PHONE} className="inline-flex items-center gap-2 font-sans text-sm text-copper-light hover:text-copper transition-colors">
                <Phone size={14} /> Call Now
              </a>
              <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 btn-whatsapp font-sans text-sm px-5 py-2.5">
                <MessageCircle size={14} /> WhatsApp Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 20. AREAS ─────────────────────────────────────────────────────────── */}
      <section ref={areasRef} className="bg-ivory py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={areasInView ? { opacity: 1, y: 0 } : {}}
            className="mb-10"
          >
            <Tag>Service Coverage</Tag>
            <h2 className="font-serif text-teal-deep text-3xl md:text-4xl font-bold mb-4 leading-tight max-w-2xl">
              Areas We Serve for Carpet Cleaning{" "}
              <span className="italic font-normal text-charcoal/40">Services in Delhi</span>
            </h2>
            <p className="font-sans text-slate-teal/70 text-sm leading-relaxed max-w-3xl">
              Our doorstep carpet cleaning services in Delhi cover the entire city, not just a few selected locations. Our trained technicians are available across Delhi for residential and commercial carpet cleaning.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                region: "South Delhi",
                areas: "Greater Kailash (GK 1 & GK 2), Hauz Khas, Saket, Vasant Kunj, Malviya Nagar, Green Park, Defence Colony, Lajpat Nagar, Safdarjung Enclave, Panchsheel Park, Chittaranjan Park, Nehru Place, Kalkaji",
              },
              {
                region: "West Delhi",
                areas: "Dwarka (All Sectors), Janakpuri, Rajouri Garden, Punjabi Bagh, Paschim Vihar, Vikaspuri, Uttam Nagar, Tilak Nagar, Hari Nagar, Subhash Nagar",
              },
              {
                region: "North Delhi",
                areas: "Rohini (All Sectors), Pitampura, Shalimar Bagh, Ashok Vihar, Model Town, Civil Lines, GTB Nagar, Kamla Nagar",
              },
              {
                region: "East Delhi",
                areas: "Mayur Vihar (Phase 1, 2 & 3), Preet Vihar, Patparganj, Vasundhara Enclave, Laxmi Nagar, Geeta Colony, Krishna Nagar, Shahdara",
              },
              {
                region: "Central Delhi",
                areas: "Karol Bagh, Patel Nagar, Rajendra Place, Connaught Place, Paharganj, Naraina, Jhandewalan",
              },
              {
                region: "New Delhi",
                areas: "Chanakyapuri, RK Puram, Vasant Vihar, Anand Niketan, Shanti Niketan, Golf Links, Lodhi Road",
              },
              {
                region: "North West Delhi",
                areas: "Narela, Bawana, Budh Vihar, Mangolpuri, Sultanpuri, Rani Bagh, Prashant Vihar",
              },
              {
                region: "South West Delhi",
                areas: "Najafgarh, Palam, Mahavir Enclave, Dabri, Dwarka Mor, Kapashera",
              },
            ].map(({ region, areas }, i) => (
              <motion.div
                key={region}
                initial={{ opacity: 0, y: 20 }}
                animate={areasInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.06 * i, duration: 0.5 }}
                className="border border-mist rounded-xl p-5 bg-ivory-teal hover:border-teal/30 transition-colors"
              >
                <div className="flex items-center gap-2 mb-3">
                  <MapPin size={13} className="text-teal shrink-0" />
                  <h3 className="font-serif text-teal-deep text-sm font-semibold">{region}</h3>
                </div>
                <p className="font-sans text-slate-teal/60 text-xs leading-relaxed">{areas}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={areasInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6 }}
            className="mt-8 border border-mist rounded-xl p-6 bg-ivory-teal flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
          >
            <div>
              <p className="font-sans text-teal-deep text-sm font-semibold mb-1">Need Carpet Cleaning in Your Area?</p>
              <p className="font-sans text-slate-teal/65 text-xs">Not sure whether we serve your locality? Call or WhatsApp us today.</p>
            </div>
            <div className="flex flex-wrap gap-3 shrink-0">
              <a href={PHONE} className="inline-flex items-center gap-2 font-sans text-sm text-teal hover:text-teal-mid transition-colors">
                <Phone size={13} /> {PHONE_DISPLAY}
              </a>
              <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 btn-whatsapp font-sans text-sm px-4 py-2">
                <MessageCircle size={13} /> WhatsApp for Availability
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 21. RELATED SERVICES ──────────────────────────────────────────────── */}
      <section ref={relatedRef} className="bg-teal-dark teal-texture py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={relatedInView ? { opacity: 1, y: 0 } : {}}
            className="mb-10"
          >
            <Tag>You Might Also Need</Tag>
            <h2 className="font-serif text-ivory-warm text-3xl md:text-4xl font-bold mb-4 leading-tight">
              While Our Team Is With You,{" "}
              <span className="italic font-normal text-stone-teal/40">Complete Your Full Upholstery Care</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                title: "Commercial Chair Cleaning Service Delhi",
                body: "Professional cleaning for office chairs, dining chairs, and executive seating.",
                href: "/commercial-chair-cleaning-delhi",
              },
              {
                title: "Best Sofa Dry Cleaners in Delhi",
                body: "Fabric-specific sofa dry cleaning and leather restoration.",
                href: "/sofa-dry-cleaning-delhi",
              },
              {
                title: "Upholstery Dry Cleaning Charges in Delhi",
                body: "Full pricing transparency for all upholstery types.",
                href: "/sofa-dry-cleaning-delhi",
              },
            ].map(({ title, body, href }, i) => (
              <motion.a
                key={title}
                href={href}
                initial={{ opacity: 0, y: 20 }}
                animate={relatedInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 * i, duration: 0.5 }}
                className="group bg-teal-deep border border-teal/15 rounded-xl p-6 hover:border-copper/30 transition-all block"
              >
                <div className="w-4 h-[2px] bg-copper/60 rounded-full mb-4" />
                <h3 className="font-serif text-ivory-warm text-base font-semibold mb-2 group-hover:text-copper-light transition-colors">{title}</h3>
                <p className="font-sans text-stone-teal/60 text-sm leading-relaxed mb-4">{body}</p>
                <span className="inline-flex items-center gap-1.5 font-sans text-copper text-xs font-semibold">
                  Learn More <ArrowRight size={12} />
                </span>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* ── 22. FINAL CTA — dark background ──────────────────────────────────── */}
      <section ref={ctaRef} className="bg-teal-deep teal-texture py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-4 md:px-8 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <Tag>Book Now</Tag>
            <h2 className="font-serif text-ivory-warm text-3xl md:text-4xl font-bold mb-6 leading-tight">
              Your Carpet Deserves More Than Surface Cleaning
            </h2>
            <p className="font-sans text-stone-teal/65 text-sm leading-relaxed mb-4 max-w-2xl mx-auto">
              Book professional doorstep carpet cleaning services in Delhi at your home or office today. Every carpet in a Delhi home is fighting a constant battle against pollution, hard water, seasonal humidity, and daily use.
            </p>
            <p className="font-sans text-stone-teal/65 text-sm leading-relaxed mb-8 max-w-2xl mx-auto">
              A cleaner carpet means better air quality, fewer allergens, a healthier home, and a room that genuinely looks and smells better.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {["Transparent fixed pricing", "Fabric-safe guarantee", "Same-day slots available"].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <CheckCircle size={13} className="text-copper" />
                  <span className="font-sans text-stone-teal/70 text-sm">{item}</span>
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
                Book Service Now
              </a>
              <a
                href={PHONE}
                className="inline-flex items-center gap-2.5 font-sans text-sm px-8 py-3.5 border border-copper/40 text-copper-light rounded-lg hover:bg-copper/10 transition-colors"
              >
                <Phone size={16} />
                Call {PHONE_DISPLAY}
              </a>
            </div>

            <div className="flex flex-wrap justify-center gap-5 text-xs font-sans text-stone-teal/50">
              <span className="flex items-center gap-1.5"><MapPin size={11} /> Full Delhi Coverage</span>
              <span className="flex items-center gap-1.5"><Clock size={11} /> 9 AM – 9 PM, All Days</span>
            </div>
          </motion.div>
        </div>
      </section>

    </main>
  );
}
