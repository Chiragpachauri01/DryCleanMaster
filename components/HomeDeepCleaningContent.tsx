"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Image from "next/image";
import {
  Phone,
  MessageCircle,
  ChevronDown,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  XCircle,
  Sparkles,
  ShieldCheck,
  Clock,
  MapPin,
  Home,
  Sun,
  Package,
  Hammer,
  Timer,
  Droplets,
  Wind,
  Sofa,
  Bed,
  Utensils,
  ShowerHead,
  Trees,
  DoorOpen,
  ToggleLeft,
  Fan,
  Armchair,
  Warehouse,
  Users,
  Baby,
  PawPrint,
  Briefcase,
  Building,
  BadgeCheck,
  Recycle,
  Leaf,
  ThumbsUp,
  Plus,
  Minus,
} from "lucide-react";

const PHONE = "tel:+918882631413";
const PHONE_DISPLAY = "8882631413";
const WA_LINK =
  "https://wa.me/918882631413?text=Hi%2C%20I%20want%20a%20quote%20for%20home%20deep%20cleaning%20services%20in%20Delhi%20NCR";

/* ── Shared bits ─────────────────────────────────────────────────────────── */

function Tag({ children, light }: { children: string; light?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-5 border ${
        light
          ? "bg-teal/12 border-teal/25 text-teal-light"
          : "bg-teal/8 border-teal/20 text-teal-deep"
      }`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${light ? "bg-teal-light" : "bg-teal"}`} />
      <span className="font-sans text-[0.7rem] uppercase tracking-[0.2em] font-bold">
        {children}
      </span>
    </span>
  );
}

function fade(inView: boolean, delay = 0) {
  return {
    initial: { opacity: 0, y: 20 },
    animate: inView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.55, delay },
  };
}

function CtaRow({
  primary,
  secondary,
  primaryHref = WA_LINK,
  secondaryHref = PHONE,
  center,
}: {
  primary: string;
  secondary: string;
  primaryHref?: string;
  secondaryHref?: string;
  center?: boolean;
}) {
  const external = primaryHref.startsWith("http");
  return (
    <div className={`mt-10 flex flex-wrap gap-3 ${center ? "justify-center" : ""}`}>
      <a
        href={primaryHref}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className="inline-flex items-center gap-2 btn-primary font-sans text-sm px-6 py-3"
      >
        {primary} <ArrowRight size={15} />
      </a>
      <a
        href={secondaryHref}
        {...(secondaryHref.startsWith("http")
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
        className="inline-flex items-center gap-2 font-sans text-sm px-6 py-3 border-2 border-mist text-slate-teal rounded-lg hover:border-teal hover:text-teal transition-colors"
      >
        <MessageCircle size={14} /> {secondary}
      </a>
    </div>
  );
}

/* ── Data ────────────────────────────────────────────────────────────────── */

const heroStats = [
  { val: "4.9★", label: "Google Rating" },
  { val: "15,000+", label: "Homes Cleaned" },
  { val: "24/7", label: "Availability" },
];

const signs = [
  "Dust reappears on surfaces within 1-2 days of cleaning",
  "Kitchen surfaces retain a persistent greasy residue",
  "Bathroom odours persist despite regular cleaning",
  "Household members are sneezing more often indoors",
  "Your home feels unclean even though it appears tidy",
  "A special event needs a deeper clean than routine maintenance",
  "A recent move or renovation needs comprehensive sanitisation",
];

const serviceTypes = [
  {
    label: "Full House Deep Cleaning",
    icon: Home,
    frequency: "Every 3-6 months",
    body: "Every room and every surface — kitchen, bathrooms, fans, floors, furniture, windows, and balconies included. This is our most complete service, designed to reset your entire home to a like-new standard.",
  },
  {
    label: "Festival Cleaning",
    icon: Sun,
    frequency: "1-2 times a year, before major celebrations",
    body: "Focused on the areas guests actually see — living areas, entrances, and guest spaces. Booked heavily before Diwali and other major celebrations, so early booking is recommended.",
  },
  {
    label: "Move-In Cleaning",
    icon: Package,
    frequency: "One-time, before furniture arrives",
    body: "A complete top-to-bottom sanitisation of a new home before your furniture moves in. Ideal for freshly built or newly possessed apartments and villas.",
  },
  {
    label: "Move-Out Cleaning",
    icon: DoorOpen,
    frequency: "End-of-tenancy, one-time",
    body: "Designed to help you recover your security deposit, with before-and-after documentation of the property's condition included as part of the service.",
  },
  {
    label: "Post-Renovation Cleaning",
    icon: Hammer,
    frequency: "Immediately after renovation work",
    body: "Targets construction dust, paint particles, and sticky residue that regular cleaning cannot handle. Booked right after painters, carpenters, or contractors finish their work.",
  },
];

const galleryPhotos = [
  {
    src: "/img/home_deep_cleaning/homedeep4.webp",
    alt: "Pre-clean walkthrough of a Delhi kitchen before deep cleaning",
    caption: "Pre-clean walkthrough",
    span: "md:col-span-2 md:row-span-2",
  },
  {
    src: "/img/home_deep_cleaning/homedeep1.webp",
    alt: "DryClean Masters technician degreasing a stove and countertop",
    caption: "Countertop & stove detailing",
    span: "md:row-span-2",
  },
  {
    src: "/img/home_deep_cleaning/homedeep3.webp",
    alt: "Technician spraying degreaser inside overhead kitchen cabinets",
    caption: "Cabinet interior treatment",
    span: "",
  },
  {
    src: "/img/home_deep_cleaning/homedeep6.webp",
    alt: "Detailed cleaning around refrigerator and utility corner",
    caption: "Appliance corner cleaning",
    span: "",
  },
  {
    src: "/img/home_deep_cleaning/homedeep5.webp",
    alt: "Close-up of kitchen counter and backsplash before treatment",
    caption: "Counter & backsplash close-up",
    span: "",
  },
  {
    src: "/img/home_deep_cleaning/homedeep7.webp",
    alt: "Full kitchen walkthrough during a home deep cleaning job in Delhi",
    caption: "Full kitchen walkthrough",
    span: "",
  },
];

const rooms = [
  {
    name: "Living Room",
    icon: Sofa,
    duration: "45-60 min",
    equipment: "Microfibre dusters, HEPA vacuum, floor machine",
    tasks: "Ceiling cobwebs, fan blades, AC vents, switchboards, sofa exterior, windows, and floors.",
  },
  {
    name: "Bedrooms",
    icon: Bed,
    duration: "30-45 min each",
    equipment: "HEPA vacuum, extension dusters, floor scrubber",
    tasks: "Ceiling fans, vents, wardrobe exteriors, under-bed areas, and full floor disinfection.",
  },
  {
    name: "Kitchen",
    icon: Utensils,
    duration: "60-90 min",
    equipment: "Degreaser, rotary scrubber, descaling agents",
    tasks: "Tile degreasing, cabinet interiors and exteriors, chimney, countertop, and sink descaling.",
  },
  {
    name: "Bathrooms",
    icon: ShowerHead,
    duration: "30-45 min each",
    equipment: "Descaling agents, grout brush, sanitiser",
    tasks: "Toilet descaling, tile and grout cleaning, shower areas, and faucet descaling.",
  },
  {
    name: "Balcony",
    icon: Trees,
    duration: "20-30 min",
    equipment: "Pressure scrubber, floor solution",
    tasks: "Floor scrubbing and railing cleaning.",
  },
  {
    name: "Doors",
    icon: DoorOpen,
    duration: "10 min each",
    equipment: "Microfibre cloths, degreasers",
    tasks: "Both sides, frames, and handles cleaned and degreased.",
  },
  {
    name: "Windows",
    icon: Wind,
    duration: "5 min each",
    equipment: "Glass cleaning solutions",
    tasks: "Glass panels, frames, and sills wiped streak-free.",
  },
  {
    name: "Switchboards",
    icon: ToggleLeft,
    duration: "2-3 min each",
    equipment: "Vacuum, sanitising solutions",
    tasks: "Every switch and socket vacuumed and sanitised.",
  },
  {
    name: "Fans",
    icon: Fan,
    duration: "10 min each",
    equipment: "Professional cleaning agents",
    tasks: "Blades, housing, and centre cap fully cleaned.",
  },
  {
    name: "Furniture",
    icon: Armchair,
    duration: "30 min",
    equipment: "Standard cleaning agents",
    tasks: "Tops, sides, and legs of every accessible piece.",
  },
  {
    name: "Cabinets",
    icon: Warehouse,
    duration: "20 min",
    equipment: "Standard cleaning agents",
    tasks: "Exterior cleaned as standard; interiors cleaned on request.",
  },
  {
    name: "Floors",
    icon: Sparkles,
    duration: "40 min",
    equipment: "Scrubbing machine, disinfectant",
    tasks: "Full scrub-down with a hygienic disinfectant treatment.",
  },
];

const notIncluded = [
  "Pest control services",
  "Wall painting and repairs",
  "Electrical or plumbing repairs",
  "Exterior building cleaning",
  "Permanent stain restoration",
  "Waterproofing and mould treatment",
  "Construction debris removal",
  "Heavy furniture moving",
  "Internal appliance servicing",
  "Rooftop or inaccessible area cleaning",
];

const addOns = [
  "Sofa deep cleaning",
  "Mattress sanitisation",
  "Curtain cleaning",
  "Appliance interior cleaning",
];

const pricingTiers = [
  { label: "1 BHK", price: "3,498", duration: "4-5 hours", popular: false },
  { label: "2 BHK", price: "4,998", duration: "5-7 hours", popular: true },
  { label: "3 BHK", price: "6,998", duration: "7-9 hours", popular: false },
  { label: "4 BHK / Villa", price: "8,998", duration: "9-12 hours", popular: false },
];

const pricingFactors = [
  "Home size and number of rooms",
  "Bathroom count",
  "Current maintenance condition",
  "Additional services selected",
];

const prepSteps = [
  "Secure valuables and fragile items",
  "Confine pets to one room",
  "Ensure water and electricity accessibility",
  "Clear countertops if possible (optional)",
];

const guaranteedResults = [
  "Visibly cleaner surfaces throughout",
  "Hygienically clean kitchen and bathrooms",
  "Dust-free fans, vents, and fixtures",
  "Improved indoor air quality",
  "Noticeably cleaner floors",
];

const resultLimits = [
  "Permanent surface stains may not fully disappear",
  "Physically damaged surfaces (cracked tiles, peeling paint) are cleaned but not restored",
];

const processSteps = [
  { title: "Booking", body: "Online, phone, or WhatsApp — confirming a slot takes under 2 minutes." },
  { title: "Property Assessment", body: "A quick walkthrough on arrival to identify priority areas and confirm the plan." },
  { title: "Setup", body: "Floor protection goes down and equipment gets organised before any cleaning starts." },
  { title: "Systematic Deep Cleaning", body: "Room-by-room, ceiling-to-floor progression so nothing gets missed or re-soiled." },
  { title: "Sanitisation", body: "Anti-microbial treatment applied to every high-touch surface in the home." },
  { title: "Final Inspection", body: "A quality walkthrough with the team — any area is re-cleaned on the spot if it doesn't meet standard." },
];

const machinery = [
  { label: "HEPA vacuum systems", body: "Capture fine dust and allergens that a standard vacuum leaves behind." },
  { label: "Rotary floor scrubbers", body: "Professional-grade machines for a deeper floor clean than mopping alone." },
];

const materials = [
  { label: "Microfibre & extension tools", body: "For ceilings, fans, and every hard-to-reach surface." },
  { label: "Biodegradable degreasers", body: "Food-safe formulas for kitchen tiles, cabinets, and countertops." },
  { label: "Hard-water descalers", body: "Purpose-built for Delhi's hard water bathroom and tap stains." },
  { label: "Child & pet-safe products", body: "Non-toxic once dry, safe for homes with kids and pets." },
];

const differentiators = [
  { title: "Verified Professionals", body: "Every technician on our team is background-checked before joining.", icon: BadgeCheck },
  { title: "Advanced Equipment", body: "Professional-grade machinery that exceeds typical local cleaning standards.", icon: Sparkles },
  { title: "Transparent Pricing", body: "Your cost is confirmed before we start — no surprises after the job is done.", icon: ShieldCheck },
  { title: "Flexible Scheduling", body: "Round-the-clock availability, including weekends and same-day slots.", icon: Clock },
  { title: "Dedicated Support", body: "A real person on phone or WhatsApp, not a generic support queue.", icon: MessageCircle },
  { title: "Satisfaction Guarantee", body: "If any area doesn't meet our standard, we re-clean it for free.", icon: ThumbsUp },
];

const targetSegments = [
  { label: "Apartment dwellers", icon: Building },
  { label: "Villa & independent house owners", icon: Home },
  { label: "Tenants managing security deposits", icon: Package },
  { label: "Families with young children", icon: Baby },
  { label: "Households with pets", icon: PawPrint },
  { label: "Senior citizen households", icon: Users },
  { label: "Working professionals", icon: Briefcase },
];

const maintenanceTips = [
  "Wipe kitchen surfaces daily after cooking",
  "Clean AC filters every 2-3 months",
  "Use doormats and remove shoes indoors",
  "Consider a HEPA air purifier for allergy-sensitive members",
];

const coverageZones = [
  { zone: "South Delhi", areas: ["Saket", "Hauz Khas", "Vasant Kunj", "Lajpat Nagar"] },
  { zone: "West Delhi", areas: ["Dwarka", "Rajouri Garden", "Punjabi Bagh"] },
  { zone: "North Delhi", areas: ["Rohini", "Pitampura"] },
  { zone: "East Delhi", areas: ["Mayur Vihar"] },
];

const faqs = [
  {
    q: "How much does home deep cleaning cost in Delhi?",
    a: "Our home deep cleaning services start at ₹3,498 for a 1 BHK apartment, ₹4,998 for a 2 BHK, ₹6,998 for a 3 BHK, and ₹8,998 for a 4 BHK or villa. Final costs are determined by home size, bathroom count, current condition, and any add-ons you select.",
  },
  {
    q: "How long does a home deep cleaning take?",
    a: "A 1 BHK typically takes 4-5 hours, a 2 BHK takes 5-7 hours, a 3 BHK takes 7-9 hours, and a 4 BHK or villa takes 9-12 hours. Actual time depends on the current condition of the home and any add-on services selected.",
  },
  {
    q: "Do I need to be present during the entire cleaning?",
    a: "Someone needs to provide house access and do a quick walkthrough with our team at the start. After that, you're free to leave and return in time for the final inspection.",
  },
  {
    q: "Are your cleaning products safe for children and pets?",
    a: "Yes, all our products are non-toxic and eco-friendly. That said, we recommend keeping children and pets away from the specific area being actively cleaned until it dries.",
  },
  {
    q: "Do you offer same-day home deep cleaning in Delhi?",
    a: "Yes, same-day service is available for most Delhi NCR locations when you book before noon.",
  },
  {
    q: "Is your cleaning team background-verified?",
    a: "Yes, every technician undergoes background verification before joining our team.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept UPI, bank transfer, cash, and digital wallets. Payment is due after the service is completed.",
  },
  {
    q: "What happens if I'm not satisfied with an area?",
    a: "Any area that doesn't meet our cleaning standard is re-cleaned free of charge — just point it out during the final inspection.",
  },
  {
    q: "Can you clean a home before we move in?",
    a: "Yes, our move-in cleaning service is a complete top-to-bottom sanitisation, done before your furniture arrives.",
  },
  {
    q: "How far in advance should I book festival cleaning?",
    a: "Pre-Diwali slots fill up quickly, so we recommend booking at least a week in advance for festival cleaning.",
  },
  {
    q: "Will the results look dramatic if this is my first deep clean?",
    a: "Yes — first-time professional deep cleans usually produce a very visible before-and-after transformation, since dust and grime have often built up over months or years.",
  },
  {
    q: "Do I need to provide any equipment or chemicals?",
    a: "No. We bring all machinery, chemicals, and tools required. You only need to provide water and electricity access.",
  },
  {
    q: "Can I ask the team to prioritise specific areas?",
    a: "Yes, you can request specific area priorities during the initial walkthrough with our team.",
  },
  {
    q: "How is villa cleaning priced differently?",
    a: "Larger properties like villas are assessed on-site so we can quote accurately based on the team size and time required.",
  },
  {
    q: "How often should I book a home deep cleaning?",
    a: "Every 3-6 months for a typical household, and quarterly for homes with children, pets, or allergy-prone family members.",
  },
  {
    q: "What's the difference between deep cleaning and regular cleaning?",
    a: "Regular cleaning maintains a home's current condition. Deep cleaning addresses the areas and build-up that regular cleaning misses — inside cabinets, behind appliances, ceiling fans, grout, and more.",
  },
];

/* ── Component ───────────────────────────────────────────────────────────── */

export default function HomeDeepCleaningContent() {
  const [activeType, setActiveType] = useState(0);
  const [openRoom, setOpenRoom] = useState<number | null>(0);
  const [openFaqLeft, setOpenFaqLeft] = useState<number | null>(null);
  const [openFaqRight, setOpenFaqRight] = useState<number | null>(null);

  const refs = {
    signs: useRef<HTMLDivElement>(null),
    types: useRef<HTMLDivElement>(null),
    gallery: useRef<HTMLDivElement>(null),
    rooms: useRef<HTMLDivElement>(null),
    included: useRef<HTMLDivElement>(null),
    pricing: useRef<HTMLDivElement>(null),
    prep: useRef<HTMLDivElement>(null),
    process: useRef<HTMLDivElement>(null),
    equipment: useRef<HTMLDivElement>(null),
    choose: useRef<HTMLDivElement>(null),
    segments: useRef<HTMLDivElement>(null),
    coverage: useRef<HTMLDivElement>(null),
    faq: useRef<HTMLDivElement>(null),
    cta: useRef<HTMLDivElement>(null),
  };

  const inView = {
    signs: useInView(refs.signs, { once: true, margin: "-60px" }),
    types: useInView(refs.types, { once: true, margin: "-60px" }),
    gallery: useInView(refs.gallery, { once: true, margin: "-60px" }),
    rooms: useInView(refs.rooms, { once: true, margin: "-60px" }),
    included: useInView(refs.included, { once: true, margin: "-60px" }),
    pricing: useInView(refs.pricing, { once: true, margin: "-60px" }),
    prep: useInView(refs.prep, { once: true, margin: "-60px" }),
    process: useInView(refs.process, { once: true, margin: "-60px" }),
    equipment: useInView(refs.equipment, { once: true, margin: "-60px" }),
    choose: useInView(refs.choose, { once: true, margin: "-60px" }),
    segments: useInView(refs.segments, { once: true, margin: "-60px" }),
    coverage: useInView(refs.coverage, { once: true, margin: "-60px" }),
    faq: useInView(refs.faq, { once: true, margin: "-60px" }),
    cta: useInView(refs.cta, { once: true, margin: "-60px" }),
  };

  return (
    <main className="font-sans">
      {/* ── HERO — full-bleed cinematic image, centered copy ───────────────── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/img/home_deep_cleaning/real_home_deep.webp"
            alt="DryClean Masters technicians performing a home deep cleaning in a Delhi NCR apartment"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-teal-deep/90 via-teal-deep/80 to-teal-deep" />
        </div>

        <div className="relative max-w-5xl mx-auto px-4 md:px-8 pt-16 md:pt-24 pb-32 md:pb-40 text-center">
          <nav className="mb-7 flex items-center justify-center gap-2 text-stone-teal/50 text-xs">
            <a href="/" className="hover:text-teal-light transition-colors">Home</a>
            <span>/</span>
            <span className="text-teal-light">Home Deep Cleaning</span>
          </nav>

          <Tag light>Home Deep Cleaning Services</Tag>

          <h1 className="text-ivory text-4xl md:text-6xl font-extrabold leading-[1.05] tracking-tight mb-6">
            The Deep Clean Your Home
            <span className="block text-teal-light">Has Been Waiting For</span>
          </h1>

          <p className="text-stone-teal/75 text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-10">
            Verified professionals, eco-friendly products, and fixed pricing — for apartments,
            villas, and independent houses across Delhi NCR.
            <span className="block mt-2 text-teal-light font-semibold text-lg">
              Starting ₹3,498
            </span>
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 btn-copper text-sm px-6 py-3.5"
            >
              <Sparkles size={16} /> Get Instant Quote
            </a>
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 btn-whatsapp text-sm px-6 py-3.5"
            >
              <MessageCircle size={16} /> WhatsApp Us
            </a>
            <a
              href={PHONE}
              className="inline-flex items-center gap-2 text-sm px-6 py-3.5 border border-teal/40 text-teal-light rounded-lg hover:bg-teal/10 transition-colors"
            >
              <Phone size={15} /> {PHONE_DISPLAY}
            </a>
          </div>
        </div>

        {/* Floating stat card, overlapping into next section */}
        <div className="relative max-w-3xl mx-auto px-4">
          <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-full grid grid-cols-3 gap-2 md:gap-4 bg-ivory rounded-2xl p-5 md:p-7 shadow-2xl shadow-black/20 border border-mist">
            {heroStats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-teal-deep text-xl md:text-3xl font-extrabold">{s.val}</p>
                <p className="text-muted-teal text-[0.65rem] md:text-xs uppercase tracking-wide mt-1">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SIGNS — asymmetric intro + numbered checklist ──────────────────── */}
      <section ref={refs.signs} className="bg-ivory pt-24 md:pt-28 pb-20 md:pb-28">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 grid lg:grid-cols-[0.85fr_1.15fr] gap-14 items-start">
          <motion.div {...fade(inView.signs)}>
            <Tag>Warning Signs</Tag>
            <h2 className="text-teal-deep text-3xl md:text-4xl font-extrabold tracking-tight leading-tight mb-5">
              Is It Time for a Professional Deep Clean?
            </h2>
            <p className="text-slate-teal/75 text-base leading-relaxed mb-6">
              DryClean Masters provides thorough home cleaning designed to eliminate accumulated
              dust, grease, and allergens — for apartments, villas, and independent houses across
              Delhi NCR. If any of these sound familiar, your home is overdue.
            </p>
            <div className="bg-ivory-teal border border-mist rounded-2xl p-6">
              <p className="text-teal-deep font-semibold text-sm mb-3">
                Recognise two or more signs?
              </p>
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 btn-primary text-sm px-5 py-2.5"
              >
                Book a deep clean <ArrowRight size={14} />
              </a>
            </div>
          </motion.div>

          <div className="space-y-3">
            {signs.map((s, i) => (
              <motion.div
                key={s}
                {...fade(inView.signs, 0.05 * i)}
                className="flex items-center gap-4 bg-ivory-teal rounded-2xl px-6 py-4 hover:bg-mist/60 transition-colors"
              >
                <span className="shrink-0 w-9 h-9 rounded-full bg-teal-deep text-ivory flex items-center justify-center text-sm font-bold">
                  {i + 1}
                </span>
                <p className="text-slate-teal/85 text-sm md:text-base leading-snug">{s}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICE TYPES — interactive tabs ───────────────────────────────── */}
      <section ref={refs.types} className="bg-teal-deep teal-texture py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
          <motion.div {...fade(inView.types)} className="text-center max-w-2xl mx-auto mb-14">
            <Tag light>Choose Your Service</Tag>
            <h2 className="text-ivory text-3xl md:text-4xl font-extrabold tracking-tight leading-tight mb-4">
              Five Ways We Deep Clean Delhi NCR Homes
            </h2>
            <p className="text-stone-teal/70 text-base leading-relaxed">
              Every home reaches out to us for a different reason. Pick the one that matches
              yours.
            </p>
          </motion.div>

          <motion.div {...fade(inView.types, 0.05)} className="flex flex-wrap justify-center gap-2 mb-10">
            {serviceTypes.map((t, i) => {
              const Icon = t.icon;
              return (
                <button
                  key={t.label}
                  onClick={() => setActiveType(i)}
                  className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-colors ${
                    activeType === i
                      ? "bg-teal text-teal-deep"
                      : "bg-teal-dark/70 text-stone-teal/70 hover:bg-teal-dark"
                  }`}
                >
                  <Icon size={15} /> {t.label}
                </button>
              );
            })}
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeType}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="grid md:grid-cols-[auto_1fr] gap-8 items-center bg-teal-dark/60 border border-teal/15 rounded-3xl p-8 md:p-12 max-w-4xl mx-auto"
            >
              <div className="w-16 h-16 rounded-2xl bg-teal/15 flex items-center justify-center shrink-0 mx-auto md:mx-0">
                {(() => {
                  const Icon = serviceTypes[activeType].icon;
                  return <Icon size={28} className="text-teal-light" />;
                })()}
              </div>
              <div>
                <h3 className="text-ivory text-2xl font-bold mb-2">{serviceTypes[activeType].label}</h3>
                <span className="inline-block text-teal-light text-xs font-bold uppercase tracking-wider mb-4">
                  {serviceTypes[activeType].frequency}
                </span>
                <p className="text-stone-teal/70 text-base leading-relaxed">
                  {serviceTypes[activeType].body}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          <CtaRow center primary="Ask which service fits your home" secondary="Speak to our team" secondaryHref={PHONE} />
        </div>
      </section>

      {/* ── REAL PHOTOS GALLERY — bento grid ───────────────────────────────── */}
      <section ref={refs.gallery} className="bg-ivory py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
          <motion.div {...fade(inView.gallery)} className="text-center max-w-2xl mx-auto mb-14">
            <Tag>Real Job, Real Photos</Tag>
            <h2 className="text-teal-deep text-3xl md:text-4xl font-extrabold tracking-tight leading-tight mb-4">
              A Deep Clean, Documented On-Site
            </h2>
            <p className="text-slate-teal/75 text-base leading-relaxed">
              No stock photography — these are candid shots from an actual DryClean Masters home
              deep cleaning job in Delhi NCR.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[140px] md:auto-rows-[160px] gap-3 md:gap-4">
            {galleryPhotos.map((p, i) => (
              <motion.div
                key={p.src}
                {...fade(inView.gallery, 0.04 * i)}
                className={`relative rounded-2xl overflow-hidden border border-mist group ${p.span}`}
              >
                <Image
                  src={p.src}
                  alt={p.alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-teal-deep/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <p className="absolute bottom-0 left-0 right-0 p-3 text-ivory text-xs font-semibold opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300">
                  {p.caption}
                </p>
              </motion.div>
            ))}
          </div>

          <CtaRow center primary="See the results in your own home" secondary="Book an inspection" secondaryHref={WA_LINK} />
        </div>
      </section>

      {/* ── ROOM-BY-ROOM — accordion ───────────────────────────────────────── */}
      <section ref={refs.rooms} className="bg-ivory-teal py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <motion.div {...fade(inView.rooms)} className="text-center mb-12">
            <Tag>Full Scope</Tag>
            <h2 className="text-teal-deep text-3xl md:text-4xl font-extrabold tracking-tight leading-tight mb-4">
              What We Clean, Room by Room
            </h2>
            <p className="text-slate-teal/75 text-base leading-relaxed">
              Tap a room to see exactly what's covered, the equipment we use, and roughly how
              long it takes.
            </p>
          </motion.div>

          <div className="space-y-3">
            {rooms.map((r, i) => {
              const Icon = r.icon;
              const open = openRoom === i;
              return (
                <motion.div
                  key={r.name}
                  {...fade(inView.rooms, 0.02 * i)}
                  className="bg-ivory border border-mist rounded-2xl overflow-hidden"
                >
                  <button
                    onClick={() => setOpenRoom(open ? null : i)}
                    className="w-full flex items-center gap-4 px-5 md:px-6 py-4 text-left"
                  >
                    <span className="shrink-0 w-10 h-10 rounded-xl bg-teal/10 flex items-center justify-center">
                      <Icon size={18} className="text-teal" />
                    </span>
                    <span className="flex-1 text-teal-deep font-bold text-base">{r.name}</span>
                    <span className="hidden sm:inline-flex items-center gap-1.5 text-muted-teal text-xs">
                      <Timer size={13} /> {r.duration}
                    </span>
                    {open ? (
                      <Minus size={17} className="text-teal shrink-0" />
                    ) : (
                      <Plus size={17} className="text-teal shrink-0" />
                    )}
                  </button>
                  <AnimatePresence>
                    {open && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 md:px-6 pb-5 pl-[4.25rem] space-y-2">
                          <p className="text-slate-teal/80 text-sm leading-relaxed">{r.tasks}</p>
                          <p className="text-muted-teal text-xs">
                            <span className="font-semibold">Equipment:</span> {r.equipment}
                          </p>
                          <p className="sm:hidden text-muted-teal text-xs inline-flex items-center gap-1.5">
                            <Timer size={12} /> {r.duration}
                          </p>
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

      {/* ── INCLUDED / NOT INCLUDED — split panel ──────────────────────────── */}
      <section ref={refs.included} className="bg-ivory py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-4 md:px-8 lg:px-12">
          <motion.div {...fade(inView.included)} className="text-center max-w-2xl mx-auto mb-14">
            <Tag>Scope, Clearly Defined</Tag>
            <h2 className="text-teal-deep text-3xl md:text-4xl font-extrabold tracking-tight leading-tight">
              What's In the Service — and What Isn't
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            <motion.div {...fade(inView.included, 0.05)} className="bg-teal-deep teal-texture rounded-3xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <CheckCircle2 size={22} className="text-teal-light" />
                <h3 className="text-ivory font-bold text-lg">Covered as Standard</h3>
              </div>
              <p className="text-stone-teal/70 text-sm leading-relaxed mb-5">
                Every room in the room-by-room breakdown above, plus these add-ons available on
                request:
              </p>
              <ul className="grid grid-cols-2 gap-x-4 gap-y-2.5">
                {addOns.map((a) => (
                  <li key={a} className="flex items-start gap-2 text-stone-teal/85 text-sm">
                    <CheckCircle2 size={15} className="text-teal-light shrink-0 mt-0.5" /> {a}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div {...fade(inView.included, 0.1)} className="bg-ivory-teal border border-mist rounded-3xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <XCircle size={22} className="text-muted-teal" />
                <h3 className="text-teal-deep font-bold text-lg">Not Part of This Service</h3>
              </div>
              <ul className="grid grid-cols-2 gap-x-4 gap-y-2.5">
                {notIncluded.map((n) => (
                  <li key={n} className="flex items-start gap-2 text-slate-teal/70 text-sm">
                    <XCircle size={15} className="text-muted-teal/60 shrink-0 mt-0.5" /> {n}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── PRICING — cards ─────────────────────────────────────────────────── */}
      <section ref={refs.pricing} className="bg-ivory-teal py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
          <motion.div {...fade(inView.pricing)} className="text-center max-w-2xl mx-auto mb-14">
            <Tag>Transparent Pricing</Tag>
            <h2 className="text-teal-deep text-3xl md:text-4xl font-extrabold tracking-tight leading-tight mb-4">
              Fixed Pricing, By Home Size
            </h2>
            <p className="text-slate-teal/75 text-base leading-relaxed">
              Final quotes are confirmed after a quick property assessment — the price we quote
              is the price you pay, with no hidden charges.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
            {pricingTiers.map((t, i) => (
              <motion.div
                key={t.label}
                {...fade(inView.pricing, 0.05 * i)}
                className={`relative rounded-3xl p-7 flex flex-col ${
                  t.popular
                    ? "bg-teal-deep teal-texture text-ivory shadow-xl shadow-teal/20 lg:-translate-y-3"
                    : "bg-ivory border border-mist"
                }`}
              >
                {t.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-copper-light text-teal-deep text-[0.65rem] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                    Most Booked
                  </span>
                )}
                <h3 className={`font-bold text-base mb-3 ${t.popular ? "text-teal-light" : "text-teal-deep"}`}>
                  {t.label}
                </h3>
                <p className={`text-3xl font-extrabold mb-1 ${t.popular ? "text-ivory" : "text-teal-deep"}`}>
                  ₹{t.price}
                </p>
                <p className={`text-xs uppercase tracking-wide mb-6 ${t.popular ? "text-stone-teal/60" : "text-muted-teal"}`}>
                  starting price
                </p>
                <p className={`flex items-center gap-1.5 text-sm mb-6 ${t.popular ? "text-stone-teal/80" : "text-slate-teal/75"}`}>
                  <Timer size={14} /> {t.duration}
                </p>
                <a
                  href={WA_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-auto inline-flex items-center justify-center gap-2 text-sm font-semibold px-5 py-3 rounded-lg transition-colors ${
                    t.popular
                      ? "bg-copper-light text-teal-deep hover:bg-teal-light"
                      : "bg-teal/10 text-teal-deep hover:bg-teal/20"
                  }`}
                >
                  Get This Quote <ArrowUpRight size={14} />
                </a>
              </motion.div>
            ))}
          </div>

          <motion.div {...fade(inView.pricing, 0.15)} className="grid md:grid-cols-[1fr_auto] gap-6 items-center bg-ivory border border-mist rounded-2xl p-6 md:p-7">
            <div>
              <p className="text-teal-deep font-semibold text-sm mb-2">Final pricing depends on:</p>
              <div className="flex flex-wrap gap-2">
                {pricingFactors.map((f) => (
                  <span key={f} className="text-xs bg-mist/60 text-slate-teal/80 rounded-full px-3 py-1.5">
                    {f}
                  </span>
                ))}
              </div>
            </div>
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 btn-primary text-sm px-6 py-3 shrink-0"
            >
              Request a custom quote <ArrowRight size={14} />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── PREP + RESULTS ──────────────────────────────────────────────────── */}
      <section ref={refs.prep} className="bg-ivory py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-4 md:px-8 lg:px-12 grid md:grid-cols-2 gap-6">
          <motion.div {...fade(inView.prep)} className="bg-ivory-teal border border-mist rounded-3xl p-8">
            <Tag>Before We Arrive</Tag>
            <h3 className="text-teal-deep text-xl font-bold mb-5">A Quick Prep Checklist</h3>
            <ul className="space-y-3">
              {prepSteps.map((p) => (
                <li key={p} className="flex items-start gap-2.5 text-slate-teal/80 text-sm">
                  <CheckCircle2 size={17} className="text-teal shrink-0 mt-0.5" /> {p}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div {...fade(inView.prep, 0.08)} className="bg-ivory-teal border border-mist rounded-3xl p-8">
            <Tag>What to Expect</Tag>
            <h3 className="text-teal-deep text-xl font-bold mb-5">Guaranteed Results</h3>
            <ul className="space-y-2.5 mb-6">
              {guaranteedResults.map((g) => (
                <li key={g} className="flex items-start gap-2.5 text-slate-teal/80 text-sm">
                  <CheckCircle2 size={17} className="text-teal shrink-0 mt-0.5" /> {g}
                </li>
              ))}
            </ul>
            <div className="border-t border-mist pt-5 space-y-2">
              <p className="text-muted-teal text-xs font-bold uppercase tracking-wider">Honest limitations</p>
              {resultLimits.map((r) => (
                <p key={r} className="text-slate-teal/60 text-sm leading-relaxed">{r}</p>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── PROCESS — vertical timeline ─────────────────────────────────────── */}
      <section ref={refs.process} className="bg-teal-deep teal-texture py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <motion.div {...fade(inView.process)} className="text-center mb-16">
            <Tag light>Step by Step</Tag>
            <h2 className="text-ivory text-3xl md:text-4xl font-extrabold tracking-tight leading-tight">
              Our Six-Step Deep Cleaning Process
            </h2>
          </motion.div>

          <div className="relative">
            <div className="absolute left-5 md:left-1/2 top-2 bottom-2 w-px bg-teal/20 md:-translate-x-1/2" />
            <div className="space-y-10">
              {processSteps.map((step, i) => (
                <motion.div key={step.title} {...fade(inView.process, 0.06 * i)} className="relative">
                  <span className="absolute left-5 md:left-1/2 top-0 -translate-x-1/2 z-10 w-10 h-10 rounded-full bg-teal text-teal-deep flex items-center justify-center text-sm font-extrabold">
                    {i + 1}
                  </span>
                  <div
                    className={`ml-16 md:ml-0 md:w-[calc(50%-2.5rem)] ${
                      i % 2 === 0 ? "md:mr-auto" : "md:ml-auto"
                    }`}
                  >
                    <div className="bg-teal-dark/60 border border-teal/15 rounded-2xl p-6">
                      <h3 className="text-ivory font-bold text-lg mb-1.5">{step.title}</h3>
                      <p className="text-stone-teal/65 text-sm leading-relaxed">{step.body}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <CtaRow center primary="Book your six-step deep clean" secondary="Talk to us first" secondaryHref={PHONE} />
        </div>
      </section>

      {/* ── EQUIPMENT & PRODUCTS ────────────────────────────────────────────── */}
      <section ref={refs.equipment} className="bg-ivory py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-4 md:px-8 lg:px-12">
          <motion.div {...fade(inView.equipment)} className="text-center max-w-2xl mx-auto mb-14">
            <Tag>Behind the Clean</Tag>
            <h2 className="text-teal-deep text-3xl md:text-4xl font-extrabold tracking-tight leading-tight">
              The Equipment and Products We Use
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-10">
            <motion.div {...fade(inView.equipment, 0.05)}>
              <h3 className="text-teal-deep font-bold text-sm uppercase tracking-wider mb-5 flex items-center gap-2">
                <Wind size={16} className="text-teal" /> Machinery
              </h3>
              <div className="space-y-4">
                {machinery.map((m) => (
                  <div key={m.label} className="flex gap-4 bg-ivory-teal rounded-2xl p-5">
                    <Sparkles size={18} className="text-teal shrink-0 mt-0.5" />
                    <div>
                      <p className="text-teal-deep font-semibold text-sm mb-1">{m.label}</p>
                      <p className="text-slate-teal/70 text-sm leading-relaxed">{m.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div {...fade(inView.equipment, 0.1)}>
              <h3 className="text-teal-deep font-bold text-sm uppercase tracking-wider mb-5 flex items-center gap-2">
                <Droplets size={16} className="text-teal" /> Cleaning Materials
              </h3>
              <div className="space-y-4">
                {materials.map((m) => (
                  <div key={m.label} className="flex gap-4 bg-ivory-teal rounded-2xl p-5">
                    <Leaf size={18} className="text-teal shrink-0 mt-0.5" />
                    <div>
                      <p className="text-teal-deep font-semibold text-sm mb-1">{m.label}</p>
                      <p className="text-slate-teal/70 text-sm leading-relaxed">{m.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── WHY DRYCLEAN MASTERS — icon-top cards ──────────────────────────── */}
      <section ref={refs.choose} className="bg-ivory-teal py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
          <motion.div {...fade(inView.choose)} className="text-center max-w-2xl mx-auto mb-14">
            <Tag>Our Promise</Tag>
            <h2 className="text-teal-deep text-3xl md:text-4xl font-extrabold tracking-tight leading-tight mb-4">
              Why Delhi NCR Homes Choose DryClean Masters
            </h2>
            <p className="text-slate-teal/75 text-base leading-relaxed">
              Delhi NCR expertise means solutions built for hard water, construction dust,
              monsoon humidity, and pollution — problems generic cleaning crews aren't set up
              for.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {differentiators.map((d, i) => {
              const Icon = d.icon;
              return (
                <motion.div
                  key={d.title}
                  {...fade(inView.choose, 0.05 * i)}
                  className="bg-ivory rounded-2xl p-7 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
                >
                  <div className="w-12 h-12 rounded-full bg-teal/10 flex items-center justify-center mb-5">
                    <Icon size={20} className="text-teal" />
                  </div>
                  <h3 className="text-teal-deep font-bold text-base mb-2">{d.title}</h3>
                  <p className="text-slate-teal/70 text-sm leading-relaxed">{d.body}</p>
                </motion.div>
              );
            })}
          </div>

          <CtaRow center primary="Book with a team you can trust" secondary="Chat with us first" />
        </div>
      </section>

      {/* ── WHO WE SERVE — chip cloud ──────────────────────────────────────── */}
      <section ref={refs.segments} className="bg-ivory py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
          <motion.div {...fade(inView.segments)} className="mb-10">
            <Tag>Who We Serve</Tag>
            <h2 className="text-teal-deep text-3xl md:text-4xl font-extrabold tracking-tight leading-tight">
              Built for Every Kind of Delhi NCR Household
            </h2>
          </motion.div>

          <motion.div {...fade(inView.segments, 0.06)} className="flex flex-wrap justify-center gap-3 mb-14">
            {targetSegments.map((s) => {
              const Icon = s.icon;
              return (
                <span
                  key={s.label}
                  className="inline-flex items-center gap-2 bg-ivory-teal border border-mist rounded-full px-5 py-2.5 text-sm text-slate-teal/85 font-medium"
                >
                  <Icon size={15} className="text-teal" /> {s.label}
                </span>
              );
            })}
          </motion.div>

          <motion.div {...fade(inView.segments, 0.1)} className="bg-teal-deep teal-texture rounded-3xl p-8 md:p-10 text-left grid md:grid-cols-[1fr_auto] gap-6 items-center">
            <div>
              <p className="text-teal-light text-xs font-bold uppercase tracking-wider mb-2">
                Maintenance Tips
              </p>
              <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-2">
                {maintenanceTips.map((m) => (
                  <li key={m} className="flex items-start gap-2 text-stone-teal/80 text-sm">
                    <Recycle size={14} className="text-teal-light shrink-0 mt-0.5" /> {m}
                  </li>
                ))}
              </ul>
              <p className="text-stone-teal/60 text-xs mt-4">
                Recommended frequency: every 3-6 months, quarterly for households with children,
                pets, or allergy-prone members.
              </p>
            </div>
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 btn-copper text-sm px-6 py-3 shrink-0"
            >
              Set a cleaning schedule <ArrowRight size={14} />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── COVERAGE AREAS — chip grid by zone ─────────────────────────────── */}
      <section ref={refs.coverage} className="bg-ivory-teal py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-4 md:px-8 lg:px-12">
          <motion.div {...fade(inView.coverage)} className="text-center max-w-2xl mx-auto mb-14">
            <Tag>Service Area</Tag>
            <h2 className="text-teal-deep text-3xl md:text-4xl font-extrabold tracking-tight leading-tight">
              Where We Provide Home Deep Cleaning
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-5">
            {coverageZones.map((z, i) => (
              <motion.div
                key={z.zone}
                {...fade(inView.coverage, 0.05 * i)}
                className="bg-ivory rounded-2xl p-6 border border-mist"
              >
                <div className="flex items-center gap-2 mb-4">
                  <MapPin size={16} className="text-teal" />
                  <h3 className="text-teal-deep font-bold text-base">{z.zone}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {z.areas.map((a) => (
                    <span key={a} className="text-xs bg-mist/60 text-slate-teal/80 rounded-full px-3 py-1.5">
                      {a}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.p {...fade(inView.coverage, 0.15)} className="mt-8 text-center text-slate-teal/70 text-sm">
            Don't see your area listed? We're likely still serving it —
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="text-teal font-semibold hover:underline ml-1">
              ask us on WhatsApp
            </a>.
          </motion.p>
        </div>
      </section>

      {/* ── FAQ — two-column accordion ──────────────────────────────────────── */}
      <section ref={refs.faq} className="bg-ivory py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-4 md:px-8 lg:px-12">
          <motion.div {...fade(inView.faq)} className="text-center max-w-2xl mx-auto mb-14">
            <Tag>Questions Answered</Tag>
            <h2 className="text-teal-deep text-3xl md:text-4xl font-extrabold tracking-tight leading-tight">
              Frequently Asked Questions
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-3 md:gap-x-5 md:gap-y-3 items-start">
            {[faqs.slice(0, Math.ceil(faqs.length / 2)), faqs.slice(Math.ceil(faqs.length / 2))].map(
              (col, colIdx) => (
                <div key={colIdx} className="space-y-3">
                  {col.map((faq, i) => {
                    const isOpen = colIdx === 0 ? openFaqLeft === i : openFaqRight === i;
                    const setOpen = colIdx === 0 ? setOpenFaqLeft : setOpenFaqRight;
                    return (
                      <motion.div
                        key={faq.q}
                        {...fade(inView.faq, 0.02 * i)}
                        className="border border-mist rounded-2xl overflow-hidden bg-ivory-teal"
                      >
                        <button
                          onClick={() => setOpen(isOpen ? null : i)}
                          className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
                        >
                          <span className="text-teal-deep font-semibold text-sm">{faq.q}</span>
                          <ChevronDown
                            size={16}
                            className={`text-teal shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`}
                          />
                        </button>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            className="px-5 pb-4"
                          >
                            <p className="text-slate-teal/75 text-sm leading-relaxed">{faq.a}</p>
                          </motion.div>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA — bold centered banner ───────────────────────────────── */}
      <section ref={refs.cta} className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/img/home_deep_cleaning/52.webp"
            alt="DryClean Masters team completing a home deep cleaning in a Delhi NCR living room"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-teal-deep/90" />
        </div>

        <div className="relative max-w-3xl mx-auto px-4 md:px-8 py-20 md:py-28 text-center">
          <Tag light>Get Started</Tag>
          <h2 className="text-ivory text-3xl md:text-5xl font-extrabold tracking-tight leading-tight mb-6">
            Book Your Home Deep Cleaning Today
          </h2>
          <p className="text-stone-teal/75 text-base leading-relaxed mb-10 max-w-xl mx-auto">
            Verified professionals, non-toxic products, and fixed pricing — across Delhi, Noida,
            Gurgaon, Faridabad, and Ghaziabad. We provide the staff, the equipment, and the
            flexibility; you just enjoy the result.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 btn-copper text-sm px-6 py-3.5"
            >
              <Sparkles size={16} /> Get an Instant Quote
            </a>
            <a
              href={PHONE}
              className="inline-flex items-center gap-2 text-sm px-6 py-3.5 border border-teal/40 text-teal-light rounded-lg hover:bg-teal/10 transition-colors"
            >
              <Phone size={15} /> Call {PHONE_DISPLAY}
            </a>
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 btn-whatsapp text-sm px-6 py-3.5"
            >
              <MessageCircle size={16} /> WhatsApp Now
            </a>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {["Verified team", "Fixed pricing", "24/7 booking", "Full Delhi NCR coverage"].map((f) => (
              <span key={f} className="inline-flex items-center gap-1.5 text-stone-teal/80 text-sm">
                <CheckCircle2 size={15} className="text-teal-light" /> {f}
              </span>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
