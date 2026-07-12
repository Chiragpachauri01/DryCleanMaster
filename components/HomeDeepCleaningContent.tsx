"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
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
  Briefcase,
  Building,
  BadgeCheck,
  Recycle,
  Plus,
  Minus,
} from "lucide-react";

const PHONE = "tel:+918882631413";
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

/* Button row — renders the exact button labels from the source document.
   "Call" labels go to tel:, "WhatsApp" labels go to wa.me, everything else
   (booking / quote / contact prompts) also routes to WhatsApp as the
   general enquiry channel. */
function variantFor(label: string, index: number): "primary" | "copper" | "whatsapp" | "ghost" {
  const l = label.toLowerCase();
  if (l.includes("whatsapp")) return "whatsapp";
  if (l.includes("call")) return "ghost";
  return index % 2 === 0 ? "primary" : "copper";
}

function ButtonRow({ labels, center }: { labels: string[]; center?: boolean }) {
  return (
    <div className={`mt-10 flex flex-wrap gap-3 ${center ? "justify-center" : ""}`}>
      {labels.map((label, i) => {
        const variant = variantFor(label, i);
        const href = variant === "ghost" ? PHONE : WA_LINK;
        const cls =
          variant === "primary"
            ? "btn-primary"
            : variant === "copper"
            ? "btn-copper"
            : variant === "whatsapp"
            ? "btn-whatsapp"
            : "border-2 border-mist text-slate-teal rounded-lg hover:border-teal hover:text-teal transition-colors";
        return (
          <a
            key={label}
            href={href}
            {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className={`inline-flex items-center gap-2 font-sans text-sm px-6 py-3 ${cls}`}
          >
            {variant === "ghost" && <Phone size={15} />}
            {variant === "whatsapp" && <MessageCircle size={14} />}
            {label}
            {(variant === "primary" || variant === "copper") && <ArrowRight size={15} />}
          </a>
        );
      })}
    </div>
  );
}

/* ── Data (verbatim from source document) ───────────────────────────────── */

const heroBadges = [
  "Verified Professionals",
  "Same-Day Booking",
  "Safe Cleaning Products",
  "Delhi-Wide Coverage",
  "Transparent Pricing",
];

const signs = [
  {
    title: "Dust comes back within a day or two.",
    body: "You dust the shelves, and two days later, that layer of dust is back again. This means that the source of this dust, which may be your ceiling fan, AC vent, fabric surface, etc, has not been addressed. Surface cleaning just moves around the dust; it doesn't remove it.",
  },
  {
    title: "The kitchen always feels slightly greasy.",
    body: "That greasy layer on the tiles, on the cabinet doors, and around the countertop, it does not happen from one cooking session. It develops after months of cooking vapours building up on top of each other. A cloth can never clean it off.",
  },
  {
    title: "Bathrooms have a smell that doesn't go away.",
    body: "Even after cleaning regularly, the hard water deposits on the bathroom surface and the bacteria that got built up in the tile joints do not go away, giving the bathroom a distinct smell.",
  },
  {
    title: "Someone at home is sneezing more than usual.",
    body: "If the sneezing stops when they step outside the home, the causes might be dust mites in mattresses or mold in the bathroom. They contain dust and other allergy triggers.",
  },
  {
    title: "The home looks clean but doesn't feel clean.",
    body: "Your room feels a little heavy, and you keep the windows open a lot more than you used to. It is just the general dullness that regular cleaning has not fixed.",
  },
  {
    title: "Guests are coming, and the usual cleaning is not enough.",
    body: "Before a festival, a family function, or guests staying over, a full house deep cleaning service handles everything your routine cleaning might have missed.",
  },
  {
    title: "You just moved in or just moved out.",
    body: "Construction dust from a renovation and the previous tenant's leftovers- they do not go away just with a broom. They specifically need a proper deep clean.",
  },
];

const serviceTypes = [
  {
    label: "Full House Deep Cleaning Services",
    icon: Home,
    bestFor: "Homes that haven't had a deep clean in 3-6 months, or as a routine clean before or after monsoon.",
    included: "Every room, every surface, including kitchen, bathrooms, fans, floors, furniture, windows, balconies,",
    frequency: "Every 3-6 months for most Delhi NCR homes.",
  },
  {
    label: "Festival Cleaning",
    icon: Sun,
    bestFor: "Before Diwali, Eid, Christmas, or any big family gathering.",
    included: "Full home deep clean with extra focus on the living room, entrance, and guest areas.",
    frequency: "Once or twice a year around major festivals.",
  },
  {
    label: "Move-In Cleaning",
    icon: Package,
    bestFor: "Families moving into a new rented or purchased home.",
    included: "Complete top-to-bottom clean and sanitisation of the entire home before furniture arrives.",
    frequency: "Once, before you move in.",
  },
  {
    label: "Move-Out Cleaning",
    icon: DoorOpen,
    bestFor: "Tenants handing back a rented property and wanting the full deposit returned.",
    included: "Full cleaning of all rooms to bring the home back to original condition, with before-and-after photos.",
    frequency: "Once, at the end of tenancy.",
  },
  {
    label: "Post-Renovation Cleaning",
    icon: Hammer,
    bestFor: "Homes where any painting, tiling, or construction work has just been done.",
    included: "Removal of construction dust, paint marks, and adhesive residue from all surfaces.",
    frequency: "Once, immediately after renovation is complete.",
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
    duration: "45-60 minutes",
    equipment: "Microfibre dusters, HEPA vacuum, glass cleaner, floor scrubbing machine",
    tasks: "Ceiling cobwebs, fan blades, AC vent covers, wall marks, switchboards, sofa exterior, furniture tops, glass surfaces, window sills, full floor scrub",
  },
  {
    name: "Bedrooms",
    icon: Bed,
    duration: "30-45 minutes per bedroom",
    equipment: "HEPA vacuum, extension dusters, microfibre cloths, floor scrubber",
    tasks: "Ceiling fan, AC vent, switchboards, wardrobe exterior, window sills, under-bed area, floor scrubbing and disinfection",
  },
  {
    name: "Kitchen",
    icon: Utensils,
    duration: "60-90 minutes",
    equipment: "Degreaser, rotary scrubber, descaling agent, microfibre cloths, floor machine",
    tasks: "Tile degreasing, cabinet interiors and exteriors, chimney exterior, countertop, sink descaling, appliance exteriors, floor deep clean",
  },
  {
    name: "Bathrooms",
    icon: ShowerHead,
    duration: "30-45 minutes per bathroom",
    equipment: "Descaling agent, grout brush, scrubbing machine, bactericidal sanitiser",
    tasks: "Full toilet descaling, tiles and grout, shower area, sink, mirror, faucet descaling, exhaust fan, floor scrubbing",
  },
  {
    name: "Balcony",
    icon: Trees,
    duration: "20-30 minutes",
    equipment: "Pressure scrubber, floor cleaning solution, microfibre cloths",
    tasks: "Floor scrubbing, railing and grille cleaning, ceiling if accessible",
  },
  {
    name: "Doors",
    icon: DoorOpen,
    duration: "10 minutes per door",
    equipment: "Microfibre cloths, degreasing agents",
    tasks: "Both sides of all doors, door frames, handles",
  },
  {
    name: "Windows",
    icon: Wind,
    duration: "5 minutes per window",
    equipment: "Glass cleaning solutions",
    tasks: "Glass panels, frames, sills from the inside",
  },
  {
    name: "Switchboards",
    icon: ToggleLeft,
    duration: "2-3 minutes per switchboard",
    equipment: "Vacuum cleaners and sanitising solutions",
    tasks: "All switches and socket panels wiped and sanitised",
  },
  {
    name: "Fans",
    icon: Fan,
    duration: "10 minutes per fan",
    equipment: "Same agents",
    tasks: "All ceiling fans including blades, housing, and centre cap",
  },
  {
    name: "Furniture",
    icon: Armchair,
    duration: "30 minutes",
    equipment: "Same agents",
    tasks: "Tops, sides, and legs of all accessible furniture",
  },
  {
    name: "Cabinets",
    icon: Warehouse,
    duration: "20 minutes",
    equipment: "Same agents",
    tasks: "Full exterior clean, interiors on request",
  },
  {
    name: "Floors",
    icon: Sparkles,
    duration: "40 minutes",
    equipment: "Scrubbing machine and disinfectant solutions",
    tasks: "Full scrub and disinfectant mop throughout the home",
  },
];

const notCovered = [
  { title: "Pest Control", body: "It is a separate licensed service and we only clean surfaces, not infestations" },
  { title: "Painting and Wall Repairs", body: "We clean scuff marks and surface stains, but we cannot repaint your walls." },
  { title: "Electrical and Plumbing Repairs", body: "We clean around electrical fixtures, but we do not repair them." },
  { title: "Exterior Building Cleaning", body: "Our services are for inside the home only. External cleaning is not in our scope." },
  { title: "Permanent Stain Restoration", body: "Stains that have penetrated surfaces permanently may not respond to cleaning." },
  { title: "Waterproofing and Mould Repairs", body: "We treat surface mould, but our services do not include waterproofing." },
  { title: "Construction Debris Removal", body: "We clean dust and chemical residue, but bulk debris removal is a separate thing." },
  { title: "Heavy Furniture Moving", body: "We clean around and beneath furniture, but large wardrobes and beds are cleaned around only. We cannot move them." },
  { title: "Internal Appliance Servicing", body: "Appliance exteriors are cleaned, but AC servicing, fridge gas refilling, and similar internal work are not included." },
  { title: "Unsafe or Inaccessible areas", body: "Rooftops, external windows, and other inaccessible areas are not covered in our services." },
];

const pricingFactors = [
  { title: "Home Size:", body: <>More rooms mean more time, more team members, and more material. Hence, more cost.</> },
  { title: "Number of Bathrooms:", body: <>Bathroom cleaning takes the most time in a deep clean. If you have a three-bathroom house, it would naturally cost more than one with one bathroom.</> },
  { title: "Condition of the Home:", body: <>A home that gets regular maintenance is easier to clean than one that hasn&apos;t been deep cleaned in over a year.</> },
  {
    title: "Add-Ons",
    body: (
      <>
        <Link href="/sofa-dry-cleaning-delhi" className="text-teal font-semibold underline underline-offset-2 decoration-teal/40 hover:text-teal-deep">
          Sofa cleaning
        </Link>
        , mattress sanitisation, curtain cleaning, and appliance interior cleaning are charged separately but can be added to the same visit, which is more economical than a separate visit.
      </>
    ),
  },
];

const pricingTiers = [
  { label: "1 BHK", price: "3498" },
  { label: "2 BHK", price: "4998" },
  { label: "3 BHK", price: "6998" },
  { label: "4 BHK / Villa", price: "8998" },
];

const durationRows = [
  ["1 BHK Apartment", "4-5 hours"],
  ["2 BHK Apartment", "5-7 hours"],
  ["3 BHK Apartment", "7-9 hours"],
  ["4 BHK / Villa", "9-12 hours"],
];

const prepSteps = [
  { title: "Secure valuables:", body: "Jewellery, important documents, and fragile items should be put away." },
  { title: "Keep pets in one room:", body: "Though our products are pet-safe, having pets in the room significantly slows down the cleaning process. What with their curiosity and all." },
  { title: "Make sure water and electricity are accessible:", body: "The team would use your water and electricity, so make sure it can be accessed." },
  { title: "Clear countertops if you can:", body: "It is not required, but removing personal items from surfaces speeds up the process, and you can take care of them well." },
];

const guaranteedResults = [
  "Visibly cleaner surfaces in every room",
  "Kitchen and bathroom are hygienically clean, not just surface-clean",
  "Fans, vents, and light fixtures are dust-free",
  "The air in every room is fresher",
  "Floors under your feet feel different",
];

const resultLimits = [
  "Very old stains that have permanently changed the surface may not disappear completely. Our technician would inform you during the inspection.",
  "Physically damaged surfaces, like cracked tiles and peeling paint, are not restored. They'd only be cleaned.",
];

const processSteps = [
  {
    title: "Booking",
    body: "Call, WhatsApp, or book online by filling out the form. Tell us your home size, the date that you prefer, and any specific questions that you have. It will take less than two minutes.",
  },
  {
    title: "In-person Assessment of Your Property",
    body: "Our team will arrive and do a quick walk-through of your property before we touch anything. This helps us identify which areas need extra attention and confirms what add-on services your home might require. There will be no sudden surprises at the end of the job.",
  },
  {
    title: "Setup and Preparation",
    body: "We lay protective floor covers to avoid damage to any vulnerable floor surface; the equipment is organised, and the team briefs you on your priorities.",
  },
  {
    title: "Deep Cleaning Room by Room",
    body: "From ceiling to floor, every room is systematically covered. First, high surfaces are cleaned, then floors at the end.",
  },
  {
    title: "Sanitisation",
    body: "After physical cleaning is done, we sanitise all the high-touch points, including door handles, switchboards, faucets, and bathroom surfaces, with an anti-microbial spray.",
  },
  {
    title: "Final Inspection and Handover",
    body: "Our lead technician walks through your entire house and checks if any area is not up to standard. We re-clean any area left unsatisfactory immediately, and then we call the job complete.",
  },
];

const equipment = [
  { title: "HEPA Vacuum Systems", body: "They capture fine dust particles that regular vacuum cleaners just push back into the air. We use these systems for all rooms, especially the bedrooms and living areas." },
  { title: "Rotary Floor Scrubbing Machines", body: "Machine scrubbers clean tile and floor surfaces far better than manual scrubbing. They also prevent any physical damage that hard scrubbing might cause over time." },
  { title: "Microfibre Tools and Dusters", body: "Microfibre cloths trap dust rather than moving it around. We use extension dusters that can reach ceiling fans and high surfaces and clean effectively." },
  { title: "Eco-Friendly Degreasers", body: "We use biodegradable and food-safe degreasers that are effective on grease without leaving behind any harmful chemicals where food is prepared." },
  { title: "Descaling Agents", body: "For hard water deposits in Delhi, our descaling agents remove calcium and mineral buildup without damaging the tiles." },
  { title: "Child and Pet-Safe Products", body: "Once the chemicals dry out, they are non-toxic for households with pets, children, or elderly family members," },
];

const differentiators = [
  { title: "Verified Professionals", body: "Every team member is background-verified before joining us. We don't send unknown people into your home.", icon: BadgeCheck },
  { title: "Advanced Equipment", body: "We use professional-grade machines that most local services don't carry. Our results are better not only because we try harder, but also because the tools actually reach what basic equipment can't.", icon: Sparkles },
  { title: "Transparent Pricing", body: "You get a confirmed price before the job starts. No changes during the job. No hidden charges later that you weren't told about.", icon: ShieldCheck },
  { title: "Flexible Scheduling", body: "24-hours a day, seven days a week, including weekends. We are always available so you can schedule our services according to your comfort.", icon: Clock },
  { title: "Dedicated Support", body: "A real person to call or WhatsApp before, during, or after the service. It's not a bot, but our service support agent solving all your queries in real-time.", icon: MessageCircle },
  { title: "Satisfaction Guarantee", body: "If any part of the service doesn't meet what we promised, we redo it until it is up to the standard. No conditions.", icon: CheckCircle2 },
  { title: "Delhi NCR -Specific Expertise", body: "We understand what makes Delhi NCR homes specifically harder to keep clean - hard water, construction dust, monsoon humidity, heavy outdoor pollution and our process is built around these problems to solve them effectively.", icon: MapPin },
];

const whoBooks = [
  { title: "Families in Apartments", body: "The majority of our bookings are in Delhi's residential areas, 2 and 3 BHK apartments. Every standard apartment layout is within our cleaning expertise.", icon: Building },
  { title: "Villas and Independent Houses", body: "Larger houses with multiple floors, bathrooms, and bigger kitchens need our services quite often. These are handled by larger teams and the prices are quoted after a visit.", icon: Home },
  { title: "Tenants Moving In or Moving Out", body: "Tenants moving out need to protect their security deposit, and landlords need cleaning between tenancies to maintain the property.", icon: Package },
  { title: "Homes with Young Children", body: "Young families book more frequently, around every 2 to 3 months, because children create messes in every corner of the home and regular cleaning cannot keep up with it.", icon: Baby },
  { title: "Senior Citizen Households", body: "Elderly residents who need a thorough clean but cannot do the heavy work themselves are our frequent customers. We take extra care with these bookings and make sure that nothing is unnecessarily disturbed.", icon: Users },
  { title: "Working Professional Households", body: "Couples and individuals whose jobs are demanding and can manage basic maintenance but don't have the time or energy for a proper deep clean. Quarterly bookings keep their home at an optimum standard.", icon: Briefcase },
];

const maintenanceTips = [
  { title: "Wipe kitchen tiles and countertops after cooking every day.", body: "The deep clean removes the grease buildup, but daily wipes stop it from coming back." },
  { title: "Get your AC filters cleaned every 2 to 3 months.", body: "A dusty AC filter undoes a lot of what a deep clean achieves for indoor air quality." },
  { title: "Use a doormat and encourage leaving shoes at the door.", body: "A large part of indoor dust walks in from outside." },
  { title: "For anyone with allergies, a HEPA air purifier in the bedroom can make a real difference between professional cleans.", body: "" },
];

const coverageZones = [
  { zone: "South Delhi", areas: ["Saket", "Hauz Khas", "Vasant Kunj", "Lajpat Nagar"] },
  { zone: "West Delhi", areas: ["Dwarka", "Rajouri Garden", "Punjabi Bagh"] },
  { zone: "North Delhi", areas: ["Rohini", "Pitampura"] },
  { zone: "East Delhi", areas: ["Mayur Vihar"] },
];

const faqs = [
  { q: "How much does home deep cleaning cost in Delhi NCR?", a: "Home deep cleaning in Delhi NCR starts from 3498 for a 1 BHK house and 4998 for a 2 BHK. Final pricing would depend on your house's size, number of bathrooms, your house's condition, and any additional services. We would confirm the exact price before we start our job." },
  { q: "How long does the cleaning take?", a: "A 1 BHK takes about 4 to 5 hours, while a 3 BHK can take up to 7 to 9 hours. Cleaning time also depends on the services you opt for." },
  { q: "Do I need to be at home the whole time?", a: "Not necessarily. Someone just needs to walk us through the house and hand it over to us. Many customers leave after the walkthrough and return later only for inspection." },
  { q: "Are your products safe for children and pets?", a: "Yes, completely. All our products are non-toxic and eco-friendly. We recommend keeping kids and pets away while we are cleaning. Once the surfaces are dry, everything is safe." },
  { q: "Do you offer same-day home deep cleaning in Delhi NCR?", a: "Yes, for most Delhi NCR areas, when you book before noon, we can come on the same day and clean your house. Just WhatsApp us your location and your house size for a same-day slot confirmation." },
  { q: "Do your team members come verified?", a: "Yes, every team member is background verified before joining. We do not send unverified people into our customers' homes. You can seek information from us on any person who comes to your house." },
  { q: "What payment methods do you accept?", a: "UPI, bank transfer, cash, and all major digital wallets are acceptable. You only need to pay after the service is complete, not before." },
  { q: "Is there a satisfaction guarantee?", a: "Yes. If any part of the service doesn't meet our standards, we return and re-clean that area at no extra charge." },
  { q: "Do you do move-in cleaning for new homes?", a: "Yes, top-to-bottom sanitisation of the entire house is a part of our service before your furniture arrives. It is one of our most popular service types." },
  { q: "Do you do festival cleaning before Diwali?", a: "Yes, festival slots, especially in the week before Diwali, book up very quickly. We recommend booking at least a week in advance to ensure you get your preferred slot." },
  { q: "Can you clean a home that has never been professionally deep cleaned?", a: "Absolutely, and honestly, these show the most dramatic results. The before-and-after difference in a first-time deep clean is usually surprising. If you have never booked a deep clean before, now would be the best time to do that." },
  { q: "Do you bring all your own equipment?", a: "Entirely. Machines, chemicals, cloths, mops - we bring everything ourselves. We might, however, need water and electricity from you." },
  { q: "Can I ask for extra attention on specific areas?", a: "Yes, that is a part of our custom deep cleaning services in Delhi NCR. During the initial walkthrough, you can mention the areas that you want specific attention on. Our team would note that and ensure that these areas are given priority." },
  { q: "Do you clean independent houses and villas?", a: "Yes. We inspect larger properties on-site and give you a price quote based on the team size needed and other factors." },
  { q: "How often should I book a deep clean in Delhi NCR?", a: "Considering Delhi's pollution, every 3 to 6 months is optimum for most households. However, if your house has children, pets, or allergy-sensitive individuals, a three-month cycle would be the best choice for you. For working households too, quarterly booking might be the right rhythm." },
  { q: "What is the difference between regular cleaning and deep cleaning?", a: "Regular cleaning is about the maintenance of the house; it keeps things from getting worse. Deep cleaning is restoring your house and reaching what regular cleaning has been missing. Think of this as a difference between wiping a kitchen and actually cleaning a kitchen." },
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
    notCovered: useRef<HTMLDivElement>(null),
    pricing: useRef<HTMLDivElement>(null),
    serviceDay: useRef<HTMLDivElement>(null),
    results: useRef<HTMLDivElement>(null),
    process: useRef<HTMLDivElement>(null),
    equipment: useRef<HTMLDivElement>(null),
    choose: useRef<HTMLDivElement>(null),
    whoBooks: useRef<HTMLDivElement>(null),
    maintenance: useRef<HTMLDivElement>(null),
    coverage: useRef<HTMLDivElement>(null),
    faq: useRef<HTMLDivElement>(null),
    cta: useRef<HTMLDivElement>(null),
  };

  const inView = {
    signs: useInView(refs.signs, { once: true, margin: "-60px" }),
    types: useInView(refs.types, { once: true, margin: "-60px" }),
    gallery: useInView(refs.gallery, { once: true, margin: "-60px" }),
    rooms: useInView(refs.rooms, { once: true, margin: "-60px" }),
    notCovered: useInView(refs.notCovered, { once: true, margin: "-60px" }),
    pricing: useInView(refs.pricing, { once: true, margin: "-60px" }),
    serviceDay: useInView(refs.serviceDay, { once: true, margin: "-60px" }),
    results: useInView(refs.results, { once: true, margin: "-60px" }),
    process: useInView(refs.process, { once: true, margin: "-60px" }),
    equipment: useInView(refs.equipment, { once: true, margin: "-60px" }),
    choose: useInView(refs.choose, { once: true, margin: "-60px" }),
    whoBooks: useInView(refs.whoBooks, { once: true, margin: "-60px" }),
    maintenance: useInView(refs.maintenance, { once: true, margin: "-60px" }),
    coverage: useInView(refs.coverage, { once: true, margin: "-60px" }),
    faq: useInView(refs.faq, { once: true, margin: "-60px" }),
    cta: useInView(refs.cta, { once: true, margin: "-60px" }),
  };

  return (
    <main className="font-sans">
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/img/home_deep_cleaning/real_home_deep.webp"
            alt="DryClean Masters technicians performing a home deep cleaning in a Delhi NCR apartment"
            fill
            sizes="100vw"
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

          <h1 className="text-ivory text-4xl md:text-6xl font-extrabold leading-[1.05] tracking-tight mb-6">
            Professional Home Deep Cleaning
            <span className="block text-teal-light">Services in Delhi NCR</span>
          </h1>

          <p className="text-stone-teal/75 text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-8">
            Give your home a fresh start with professional deep cleaning designed to remove
            built-up dust, grease, stains, and allergens from every room. Whether you live in an
            apartment, villa, or independent house, our trained team delivers a thorough,
            room-by-room clean using professional equipment and safe cleaning solutions across
            Delhi NCR.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
            {heroBadges.map((b) => (
              <span
                key={b}
                className="inline-flex items-center gap-1.5 bg-teal/12 border border-teal/25 rounded-full px-3.5 py-1.5 text-xs font-semibold text-teal-light"
              >
                <CheckCircle2 size={13} /> {b}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href={PHONE}
              className="inline-flex items-center gap-2 text-sm px-6 py-3.5 border border-teal/40 text-teal-light rounded-lg hover:bg-teal/10 transition-colors"
            >
              <Phone size={15} /> Call Now
            </a>
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 btn-whatsapp text-sm px-6 py-3.5"
            >
              <MessageCircle size={16} /> WhatsApp Us
            </a>
          </div>

          <p className="text-stone-teal/60 text-sm mt-6">
            <Clock size={14} className="inline-block mr-1.5 -mt-0.5 text-teal-light" />
            Timings: 24-hour service, 7-days a week
          </p>
        </div>

        {/* Floating stat card, overlapping into next section */}
        <div className="relative max-w-2xl mx-auto px-4">
          <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-full grid grid-cols-2 gap-2 md:gap-4 bg-ivory rounded-2xl p-5 md:p-7 shadow-2xl shadow-black/20 border border-mist">
            <div className="text-center">
              <p className="text-teal-deep text-xl md:text-3xl font-extrabold">4.9/5</p>
              <p className="text-muted-teal text-[0.65rem] md:text-xs uppercase tracking-wide mt-1">
                Google Rating
              </p>
            </div>
            <div className="text-center">
              <p className="text-teal-deep text-xl md:text-3xl font-extrabold">15,000+</p>
              <p className="text-muted-teal text-[0.65rem] md:text-xs uppercase tracking-wide mt-1">
                Homes Cleaned Across Delhi NCR
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── IS YOUR HOME ASKING FOR A PROFESSIONAL DEEP CLEAN? ─────────────── */}
      <section ref={refs.signs} className="bg-ivory pt-24 md:pt-28 pb-20 md:pb-28">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 grid lg:grid-cols-[0.85fr_1.15fr] gap-14 items-start">
          <motion.div {...fade(inView.signs)}>
            <Tag>Warning Signs</Tag>
            <h2 className="text-teal-deep text-3xl md:text-4xl font-extrabold tracking-tight leading-tight mb-5">
              Is Your Home Asking For a Professional Deep Clean?
            </h2>
            <p className="text-slate-teal/75 text-base leading-relaxed">
              Most homes do not look clearly dirty; they just stop feeling fresh. If you walk into
              your house and cannot feel the freshness anymore, your house might be asking for a
              deep clean. Here are the signs to catch on:
            </p>
          </motion.div>

          <div className="space-y-3">
            {signs.map((s, i) => (
              <motion.div
                key={s.title}
                {...fade(inView.signs, 0.05 * i)}
                className="flex gap-4 bg-ivory-teal rounded-2xl px-6 py-5 hover:bg-mist/60 transition-colors"
              >
                <span className="shrink-0 w-9 h-9 rounded-full bg-teal-deep text-ivory flex items-center justify-center text-sm font-bold">
                  {i + 1}
                </span>
                <div>
                  <p className="text-teal-deep font-bold text-sm md:text-base mb-1.5">{s.title}</p>
                  <p className="text-slate-teal/75 text-sm leading-relaxed">{s.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
          <ButtonRow labels={["Book a Home Cleaning", "Contact us for queries"]} />
        </div>
      </section>

      {/* ── WHICH CLEANING SERVICE DO YOU ACTUALLY NEED? ───────────────────── */}
      <section ref={refs.types} className="bg-teal-deep teal-texture py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
          <motion.div {...fade(inView.types)} className="text-center max-w-2xl mx-auto mb-14">
            <Tag light>Choose Your Service</Tag>
            <h2 className="text-ivory text-3xl md:text-4xl font-extrabold tracking-tight leading-tight">
              Which Cleaning Service Do You Actually Need?
            </h2>
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
              className="grid md:grid-cols-[auto_1fr] gap-8 items-start bg-teal-dark/60 border border-teal/15 rounded-3xl p-8 md:p-12 max-w-4xl mx-auto"
            >
              <div className="w-16 h-16 rounded-2xl bg-teal/15 flex items-center justify-center shrink-0 mx-auto md:mx-0">
                {(() => {
                  const Icon = serviceTypes[activeType].icon;
                  return <Icon size={28} className="text-teal-light" />;
                })()}
              </div>
              <div className="space-y-4">
                <h3 className="text-ivory text-2xl font-bold">{serviceTypes[activeType].label}</h3>
                <p className="text-stone-teal/75 text-sm leading-relaxed">
                  <span className="text-teal-light font-bold">Best for: </span>
                  {serviceTypes[activeType].bestFor}
                </p>
                <p className="text-stone-teal/75 text-sm leading-relaxed">
                  <span className="text-teal-light font-bold">What&apos;s included: </span>
                  {serviceTypes[activeType].included}
                </p>
                <p className="text-stone-teal/75 text-sm leading-relaxed">
                  <span className="text-teal-light font-bold">Ideal frequency: </span>
                  {serviceTypes[activeType].frequency}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          <ButtonRow center labels={["Same-day slots available", "Secure your preferred slot now"]} />
        </div>
      </section>

      {/* ── REAL PHOTOS GALLERY (bonus — actual job photos) ─────────────────── */}
      <section ref={refs.gallery} className="bg-ivory py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
          <motion.div {...fade(inView.gallery)} className="text-center max-w-2xl mx-auto mb-14">
            <Tag>Real Job, Real Photos</Tag>
            <h2 className="text-teal-deep text-3xl md:text-4xl font-extrabold tracking-tight leading-tight mb-4">
              A Deep Clean, Documented On-Site
            </h2>
            <p className="text-slate-teal/75 text-base leading-relaxed">
              Candid shots from an actual DryClean Masters home deep cleaning job in Delhi NCR.
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
                  sizes={p.span ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 50vw, 25vw"}
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-teal-deep/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <p className="absolute bottom-0 left-0 right-0 p-3 text-ivory text-xs font-semibold opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300">
                  {p.caption}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT'S INCLUDED — room-by-room accordion ───────────────────────── */}
      <section ref={refs.rooms} className="bg-ivory-teal py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <motion.div {...fade(inView.rooms)} className="text-center mb-12">
            <Tag>Full Scope</Tag>
            <h2 className="text-teal-deep text-3xl md:text-4xl font-extrabold tracking-tight leading-tight">
              What&apos;s Included in Our Home Deep Cleaning Service?
            </h2>
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
                            <span className="font-semibold">Tools Used:</span> {r.equipment}
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

      {/* ── WHAT WE DON'T COVER ─────────────────────────────────────────────── */}
      <section ref={refs.notCovered} className="bg-ivory py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-4 md:px-8 lg:px-12">
          <motion.div {...fade(inView.notCovered)} className="text-center max-w-2xl mx-auto mb-14">
            <Tag>Scope, Clearly Defined</Tag>
            <h2 className="text-teal-deep text-3xl md:text-4xl font-extrabold tracking-tight leading-tight">
              What We Don&apos;t Cover: Honest and Upfront
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-4 mb-12">
            {notCovered.map((n, i) => (
              <motion.div
                key={n.title}
                {...fade(inView.notCovered, 0.03 * i)}
                className="flex gap-3 bg-ivory-teal border border-mist rounded-2xl p-5"
              >
                <XCircle size={18} className="text-muted-teal shrink-0 mt-0.5" />
                <div>
                  <p className="text-teal-deep font-semibold text-sm mb-1">{n.title}</p>
                  <p className="text-slate-teal/70 text-sm leading-relaxed">{n.body}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div {...fade(inView.notCovered, 0.1)} className="bg-teal-deep teal-texture rounded-3xl p-8">
            <h3 className="text-ivory font-bold text-lg mb-5">Want to add these on?</h3>
            <div className="flex flex-wrap gap-x-8 gap-y-3 mb-5">
              <span className="inline-flex items-center gap-2 text-stone-teal/85 text-sm">
                <CheckCircle2 size={15} className="text-teal-light" /> Sofa Deep Cleaning
              </span>
              <span className="inline-flex items-center gap-2 text-stone-teal/85 text-sm">
                <CheckCircle2 size={15} className="text-teal-light" />
                <Link
                  href="/mattress-cleaning-services-delhi"
                  className="underline underline-offset-2 decoration-teal-light/40 hover:text-teal-light"
                >
                  Mattress Sanitisation
                </Link>
              </span>
              <span className="inline-flex items-center gap-2 text-stone-teal/85 text-sm">
                <CheckCircle2 size={15} className="text-teal-light" /> Curtain Cleaning
              </span>
              <span className="inline-flex items-center gap-2 text-stone-teal/85 text-sm">
                <CheckCircle2 size={15} className="text-teal-light" /> Appliance Interior Cleaning
              </span>
            </div>
            <p className="text-stone-teal/70 text-sm">
              All these are available as add-ons to any home deep cleaning booking.
            </p>
          </motion.div>

          <ButtonRow
            labels={["Add Services to your Booking", "Get Instant Comprehensive Price Quote", "Talk to Our Customer Support"]}
          />
        </div>
      </section>

      {/* ── HOW MUCH DOES HOME DEEP CLEANING COST IN DELHI NCR? ─────────────── */}
      <section ref={refs.pricing} className="bg-ivory-teal py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
          <motion.div {...fade(inView.pricing)} className="max-w-3xl mb-14">
            <Tag>Transparent Pricing</Tag>
            <h2 className="text-teal-deep text-3xl md:text-4xl font-extrabold tracking-tight leading-tight mb-4">
              How Much Does Home Deep Cleaning Cost in Delhi NCR?
            </h2>
            <p className="text-slate-teal/75 text-base leading-relaxed">
              There are some factors that drive home deep cleaning cost in Delhi NCR:
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-6 mb-6">
            {pricingFactors.map((f, i) => (
              <motion.div
                key={f.title}
                {...fade(inView.pricing, 0.05 * i)}
                className="flex gap-4 bg-ivory rounded-2xl p-6 border border-mist"
              >
                <span className="mt-0.5 shrink-0 w-7 h-7 rounded-lg bg-teal/10 text-teal flex items-center justify-center text-sm font-bold">
                  {i + 1}
                </span>
                <div>
                  <h4 className="text-teal-deep font-bold text-base mb-1">{f.title}</h4>
                  <p className="text-slate-teal/70 text-sm leading-relaxed">{f.body}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.h3 {...fade(inView.pricing, 0.1)} className="text-teal-deep text-lg font-bold mb-6">
            Pricing Table
          </motion.h3>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            {pricingTiers.map((t, i) => (
              <motion.div
                key={t.label}
                {...fade(inView.pricing, 0.05 * i)}
                className={`rounded-3xl p-7 ${
                  i === 1
                    ? "bg-teal-deep teal-texture text-ivory shadow-xl shadow-teal/20 lg:-translate-y-3"
                    : "bg-ivory border border-mist"
                }`}
              >
                <h3 className={`font-bold text-base mb-3 ${i === 1 ? "text-teal-light" : "text-teal-deep"}`}>
                  {t.label}
                </h3>
                <p className={`text-3xl font-extrabold mb-1 ${i === 1 ? "text-ivory" : "text-teal-deep"}`}>
                  ₹{t.price}
                </p>
                <p className={`text-xs uppercase tracking-wide ${i === 1 ? "text-stone-teal/60" : "text-muted-teal"}`}>
                  Starting Price
                </p>
              </motion.div>
            ))}
          </div>

          <motion.p {...fade(inView.pricing, 0.15)} className="text-slate-teal/75 text-base leading-relaxed">
            Prices are confirmed after the initial assessment. What we will quote then is what you
            will be paying.
          </motion.p>

          <ButtonRow labels={["Get a Free Custom Quote", "Call or WhatsApp with your house size and preferred slot"]} />
        </div>
      </section>

      {/* ── WHAT TO EXPECT ON SERVICE DAY ────────────────────────────────────── */}
      <section ref={refs.serviceDay} className="bg-ivory py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-4 md:px-8 lg:px-12">
          <motion.div {...fade(inView.serviceDay)} className="text-center max-w-2xl mx-auto mb-14">
            <Tag>Before We Arrive</Tag>
            <h2 className="text-teal-deep text-3xl md:text-4xl font-extrabold tracking-tight leading-tight">
              What to Expect on Service Day
            </h2>
          </motion.div>

          <motion.h3 {...fade(inView.serviceDay, 0.05)} className="text-teal-deep text-lg font-bold mb-5">
            How long will the clean take?
          </motion.h3>
          <motion.div {...fade(inView.serviceDay, 0.08)} className="rounded-2xl overflow-hidden border border-mist shadow-sm bg-ivory mb-4">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-teal-deep text-ivory">
                  <th className="px-5 py-3.5 font-semibold">Property</th>
                  <th className="px-5 py-3.5 font-semibold">Estimated Time</th>
                </tr>
              </thead>
              <tbody>
                {durationRows.map((row, i) => (
                  <tr key={row[0]} className={i % 2 ? "bg-ivory-teal" : "bg-ivory"}>
                    <td className="px-5 py-3.5 font-semibold text-teal-deep">{row[0]}</td>
                    <td className="px-5 py-3.5 text-slate-teal/75">{row[1]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
          <motion.p {...fade(inView.serviceDay, 0.1)} className="text-slate-teal/70 text-sm mb-14">
            Time spent depends on the current home condition and any add-ons booked.
          </motion.p>

          <motion.h3 {...fade(inView.serviceDay, 0.12)} className="text-teal-deep text-lg font-bold mb-2">
            How to Prepare?
          </motion.h3>
          <motion.p {...fade(inView.serviceDay, 0.14)} className="text-slate-teal/75 text-base leading-relaxed mb-6">
            We keep it simple; you do not need to do much. Just do these few things to help the
            team get started fast:
          </motion.p>

          <div className="grid sm:grid-cols-2 gap-5">
            {prepSteps.map((p, i) => (
              <motion.div key={p.title} {...fade(inView.serviceDay, 0.05 * i)} className="flex gap-3 bg-ivory-teal border border-mist rounded-2xl p-5">
                <CheckCircle2 size={18} className="text-teal shrink-0 mt-0.5" />
                <div>
                  <p className="text-teal-deep font-semibold text-sm mb-1">{p.title}</p>
                  <p className="text-slate-teal/70 text-sm leading-relaxed">{p.body}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <ButtonRow labels={["Request a Callback", "Book Your Home Cleaning Service in Minutes"]} />
        </div>
      </section>

      {/* ── WHAT RESULTS CAN YOU EXPECT ──────────────────────────────────────── */}
      <section ref={refs.results} className="bg-ivory-teal py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-4 md:px-8 lg:px-12">
          <motion.div {...fade(inView.results)} className="text-center max-w-2xl mx-auto mb-14">
            <Tag>What to Expect</Tag>
            <h2 className="text-teal-deep text-3xl md:text-4xl font-extrabold tracking-tight leading-tight">
              What Results Can You Expect After a Professional Home Deep Cleaning?
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            <motion.div {...fade(inView.results, 0.05)} className="bg-ivory rounded-3xl p-8 border border-mist">
              <ul className="space-y-3">
                {guaranteedResults.map((g) => (
                  <li key={g} className="flex items-start gap-2.5 text-slate-teal/80 text-sm">
                    <CheckCircle2 size={17} className="text-teal shrink-0 mt-0.5" /> {g}
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div {...fade(inView.results, 0.1)} className="bg-ivory rounded-3xl p-8 border border-mist">
              <ul className="space-y-3">
                {resultLimits.map((r) => (
                  <li key={r} className="flex items-start gap-2.5 text-slate-teal/70 text-sm">
                    <XCircle size={17} className="text-muted-teal shrink-0 mt-0.5" /> {r}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          <ButtonRow labels={["Bring back the shine to your home - Book now", "24-hour slots available"]} />
        </div>
      </section>

      {/* ── HOW DOES OUR PROCESS WORK ────────────────────────────────────────── */}
      <section ref={refs.process} className="bg-teal-deep teal-texture py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <motion.div {...fade(inView.process)} className="text-center mb-16">
            <Tag light>Step by Step</Tag>
            <h2 className="text-ivory text-3xl md:text-4xl font-extrabold tracking-tight leading-tight">
              How Does Our Home Deep Cleaning Process Work?
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

          <ButtonRow center labels={["Call for a Home Deep Cleaning", "Limited time cleaning offers"]} />
        </div>
      </section>

      {/* ── EQUIPMENT AND PRODUCTS ───────────────────────────────────────────── */}
      <section ref={refs.equipment} className="bg-ivory py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-4 md:px-8 lg:px-12">
          <motion.div {...fade(inView.equipment)} className="text-center max-w-2xl mx-auto mb-14">
            <Tag>Behind the Clean</Tag>
            <h2 className="text-teal-deep text-3xl md:text-4xl font-extrabold tracking-tight leading-tight">
              What Are the Equipment and Products We Use?
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {equipment.map((e, i) => (
              <motion.div
                key={e.title}
                {...fade(inView.equipment, 0.05 * i)}
                className="bg-ivory-teal rounded-2xl p-6 border border-mist"
              >
                <div className="w-10 h-10 rounded-xl bg-teal/10 flex items-center justify-center mb-4">
                  <Droplets size={18} className="text-teal" />
                </div>
                <h3 className="text-teal-deep font-bold text-base mb-2">{e.title}</h3>
                <p className="text-slate-teal/70 text-sm leading-relaxed">{e.body}</p>
              </motion.div>
            ))}
          </div>

          <ButtonRow labels={["A cleaner home starts here", "Get a complete home refresh today"]} />
        </div>
      </section>

      {/* ── WHY DELHI NCR FAMILIES CHOOSE US ─────────────────────────────────── */}
      <section ref={refs.choose} className="bg-ivory-teal py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
          <motion.div {...fade(inView.choose)} className="text-center max-w-2xl mx-auto mb-14">
            <Tag>Our Promise</Tag>
            <h2 className="text-teal-deep text-3xl md:text-4xl font-extrabold tracking-tight leading-tight">
              Why Do Delhi NCR Families Choose DryClean Masters for Home Deep Cleaning?
            </h2>
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

          <ButtonRow labels={["Book trusted home deep cleaning experts in Delhi NCR", "Get an instant cleaning estimate"]} />
        </div>
      </section>

      {/* ── WHO BOOKS OUR SERVICES ───────────────────────────────────────────── */}
      <section ref={refs.whoBooks} className="bg-ivory py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
          <motion.div {...fade(inView.whoBooks)} className="text-center max-w-2xl mx-auto mb-14">
            <Tag>Who We Serve</Tag>
            <h2 className="text-teal-deep text-3xl md:text-4xl font-extrabold tracking-tight leading-tight">
              Who Books Our Home Deep Cleaning Services?
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {whoBooks.map((w, i) => {
              const Icon = w.icon;
              return (
                <motion.div
                  key={w.title}
                  {...fade(inView.whoBooks, 0.05 * i)}
                  className="bg-ivory-teal rounded-2xl p-6 border border-mist"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <Icon size={18} className="text-teal shrink-0" />
                    <h3 className="text-teal-deep font-bold text-base">{w.title}</h3>
                  </div>
                  <p className="text-slate-teal/70 text-sm leading-relaxed">{w.body}</p>
                </motion.div>
              );
            })}
          </div>

          <ButtonRow labels={["Festival Slots Early Booking Available", "Custom Cleaning Services - Book Today"]} />
        </div>
      </section>

      {/* ── HOW TO KEEP YOUR HOME CLEAN FOR LONGER ───────────────────────────── */}
      <section ref={refs.maintenance} className="bg-ivory-teal py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <motion.div {...fade(inView.maintenance)} className="text-center mb-4">
            <Tag>Maintenance Tips</Tag>
            <h2 className="text-teal-deep text-3xl md:text-4xl font-extrabold tracking-tight leading-tight mb-4">
              How Can You Keep Your Home Clean for Longer After a Deep Clean?
            </h2>
            <p className="text-slate-teal/75 text-base leading-relaxed">
              How to keep your home clean longer after a professional deep clean.
            </p>
          </motion.div>

          <div className="space-y-3 mt-10">
            {maintenanceTips.map((m, i) => (
              <motion.div key={m.title} {...fade(inView.maintenance, 0.05 * i)} className="flex gap-3 bg-ivory rounded-2xl p-5">
                <Recycle size={18} className="text-teal shrink-0 mt-0.5" />
                <div>
                  <p className="text-teal-deep font-semibold text-sm">{m.title}</p>
                  {m.body && <p className="text-slate-teal/70 text-sm leading-relaxed mt-1">{m.body}</p>}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.p {...fade(inView.maintenance, 0.2)} className="mt-8 text-slate-teal/75 text-base leading-relaxed">
            These small daily habits after a proper deep clean can significantly extend the
            results of a deep clean.
          </motion.p>

          <ButtonRow labels={["Book Scheduled Contracts", "Maintain a Cleaner, Fresher Home"]} />
        </div>
      </section>

      {/* ── COVERAGE AREAS ────────────────────────────────────────────────────── */}
      <section ref={refs.coverage} className="bg-ivory py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-4 md:px-8 lg:px-12">
          <motion.div {...fade(inView.coverage)} className="max-w-3xl mb-14">
            <Tag>Service Area</Tag>
            <h2 className="text-teal-deep text-3xl md:text-4xl font-extrabold tracking-tight leading-tight mb-4">
              Where Do We Provide Home Deep Cleaning Services in Delhi NCR?
            </h2>
            <p className="text-slate-teal/75 text-base leading-relaxed">
              DryClean Masters provides professional home deep cleaning services across Delhi NCR
              for apartments, villas, builder floors, and independent houses. Whether you&apos;re
              preparing for a festival, moving into a new home, or scheduling routine maintenance,
              our trained teams are available in most residential neighbourhoods across the city.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-5">
            {coverageZones.map((z, i) => (
              <motion.div
                key={z.zone}
                {...fade(inView.coverage, 0.05 * i)}
                className="bg-ivory-teal rounded-2xl p-6 border border-mist"
              >
                <div className="flex items-center gap-2 mb-4">
                  <MapPin size={16} className="text-teal" />
                  <h3 className="text-teal-deep font-bold text-base">{z.zone}</h3>
                </div>
                <ul className="space-y-2">
                  {z.areas.map((a) => (
                    <li key={a} className="text-slate-teal/75 text-sm">
                      Home Deep Cleaning in {a}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────────── */}
      <section ref={refs.faq} className="bg-ivory-teal py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-4 md:px-8 lg:px-12">
          <motion.div {...fade(inView.faq)} className="text-center max-w-2xl mx-auto mb-14">
            <Tag>Questions Answered</Tag>
            <h2 className="text-teal-deep text-3xl md:text-4xl font-extrabold tracking-tight leading-tight">
              FAQs
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
                        className="border border-mist rounded-2xl overflow-hidden bg-ivory"
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

      {/* ── READY FOR A CLEANER, HEALTHIER HOME? ─────────────────────────────── */}
      <section ref={refs.cta} className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/img/home_deep_cleaning/52.webp"
            alt="DryClean Masters team completing a home deep cleaning in a Delhi NCR living room"
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-teal-deep/90" />
        </div>

        <div className="relative max-w-3xl mx-auto px-4 md:px-8 py-20 md:py-28 text-center">
          <Tag light>Get Started</Tag>
          <h2 className="text-ivory text-3xl md:text-5xl font-extrabold tracking-tight leading-tight mb-2">
            Ready for a Cleaner, Healthier Home?
          </h2>
          <p className="text-teal-light font-semibold text-lg mb-8">
            Professional Home Deep Cleaning Services Across Delhi NCR.
          </p>

          <div className="space-y-4 text-stone-teal/75 text-base leading-relaxed mb-8 max-w-xl mx-auto">
            <p>
              Now that you know what all is included, how much it costs, how long it takes, and
              exactly what to expect, you only have one thing left to do.
            </p>
            <p className="text-ivory font-semibold">Call us and ask away everything you need to!</p>
            <p>
              Whether it&apos;s a full house deep cleaning service before the festive season, or a
              deep clean your house has been asking for, we are ready whenever you are.
            </p>
            <p className="text-ivory font-semibold">24 hours. Every day. All of Delhi.</p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
            <a
              href={PHONE}
              className="inline-flex items-center gap-2 text-sm px-6 py-3.5 border border-teal/40 text-teal-light rounded-lg hover:bg-teal/10 transition-colors"
            >
              <Phone size={15} /> Call Now
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
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 btn-copper text-sm px-6 py-3.5"
            >
              <Sparkles size={16} /> Get Free Quote
            </a>
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 btn-primary text-sm px-6 py-3.5"
            >
              Book Service <ArrowUpRight size={15} />
            </a>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {["Verified Team", "Safe Products", "Transparent Pricing", "Guaranteed Satisfaction"].map((f) => (
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
