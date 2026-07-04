"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import {
  Phone,
  MessageCircle,
  ChevronDown,
  ArrowRight,
  CheckCircle2,
  Building2,
  ClipboardCheck,
  Sparkles,
  ShieldCheck,
  Clock,
  MapPin,
} from "lucide-react";

const PHONE = "tel:+918882631413";
const PHONE_DISPLAY = "8882631413";
const WA_LINK =
  "https://wa.me/918882631413?text=Hi%2C%20I%20want%20a%20quote%20for%20office%20cleaning%20services%20in%20Delhi%20NCR";

/* ── Shared bits ─────────────────────────────────────────────────────────── */

function Eyebrow({ children, light }: { children: string; light?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2.5 mb-4">
      <span className="w-8 h-[3px] rounded-full bg-teal" />
      <span
        className={`font-sans text-[0.7rem] uppercase tracking-[0.25em] font-bold ${
          light ? "text-teal-light" : "text-teal"
        }`}
      >
        {children}
      </span>
    </span>
  );
}

function fade(inView: boolean, delay = 0) {
  return {
    initial: { opacity: 0, y: 22 },
    animate: inView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.55, delay },
  };
}

/* Dual pill CTA row used at the end of most sections */
function CtaRow({
  primary,
  secondary,
  primaryHref = WA_LINK,
  secondaryHref = PHONE,
}: {
  primary: string;
  secondary: string;
  primaryHref?: string;
  secondaryHref?: string;
}) {
  const external = primaryHref.startsWith("http");
  return (
    <div className="mt-10 flex flex-wrap gap-3">
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

const signs = [
  {
    title: "Dusty workstations despite daily cleaning",
    body: "If dust returns on the desks on the same day or a day after surface wiping, the dust might be residing deep inside the AC vents, carpets, or fibre surfaces. Only deep cleaning can solve it.",
  },
  {
    title: "Office chairs with visible stains or bad odour",
    body: "Chairs accumulate years of body contact and with it, sweat, odour, and bacteria. Without a professional chair extraction, they give off a persistent odour which gets difficult to ignore.",
  },
  {
    title: "Carpets with permanent-looking traffic lanes",
    body: "With regular use, carpet fabric captures dust, which does not just sit on the surface but gets deep inside it, and destroys the pile of the carpet. Only professional vacuums that are high-powered with fabric-safe shampoo can fix that.",
  },
  {
    title: "A reception area that looks tired",
    body: "Your clients first visit the reception area. If they find it dull or untidy, the impression sticks with them and might come off as unfavourable for the business.",
  },
  {
    title: "Pantry hygiene complaints",
    body: "Residue on appliances, grease on surfaces, a drainage smell that stays, and rotten food that leaves a smell in the cabinet, the pantries are among the biggest hygiene problems in an office.",
  },
  {
    title: "Washroom complaints from the employees",
    body: "If the staff is complaining about the washroom, the problem has already reached its zenith. A dirty washroom is a direct sign of how the employers feel about the employees' well-being.",
  },
  {
    title: "Allergies or respiratory issues are increasing",
    body: "Increased sneezing, congestion, or eye irritation that employees notice more at the office than at home means that there is accumulated dust or allergens in the carpets, chairs, and other appliance systems.",
  },
  {
    title: "An audit, inspection, or major client visit is upcoming",
    body: "A major reason why most commercial office cleaning appointments are booked.",
  },
];

const pricingFactors = [
  {
    title: "Office Size and Layout",
    body: "A 1,000 sq. ft. open office and a 1,000 sq. ft. office with multiple meeting rooms, a pantry, two washrooms, and a reception area require very different cleaning methods and time despite the same area.",
  },
  {
    title: "Number of workstations",
    body: "Each workstation adds more surface to clean, and hence, time. 50 people working in 1500 sqft require more per-sqft effort than 20 people working in the same space.",
  },
  {
    title: "Carpet Coverage",
    body: "Carpeted offices require additional manpower and time. If your office has extensive carpet coverage and you require extraction cleaning, it is calculated separately.",
  },
  {
    title: "Cleaning Frequency",
    body: "Deep cleaning of offices that are cleaned 5 times a week costs less than the offices cleaned once a week because dust and grime don't get embedded that deeply.",
  },
  {
    title: "Specialist Services Required",
    body: "Depending on the services you opt for, the rates might vary. If you choose chair extraction cleaning, carpet deep cleaning, hospital-grade sanitisation, or any other special service, the rates would depend on that specific service.",
  },
];

const pricingRows = [
  ["Small (Up to 500 sq ft)", "2-3 Professionals", "3-4 Hours", "₹2999 – ₹4999"],
  ["Medium (500–1,500 sq ft)", "3-5 Professionals", "4-6 Hours", "₹3499 – ₹9998"],
  ["Large (1,500–3,000 sq ft)", "5-7 Professionals", "Half Day", "Get Quote"],
  ["Enterprise (3,000+ sq ft)", "Custom Team", "Site Assessment", "Get Quote"],
];

const whyBook = [
  {
    title: "Before Client Visits",
    body: "Client meetings, pitches, and board presentations all require an office environment that looks professional. A one-time deep clean before an important visit is one of our most common bookings and one of the best investments a business can make in impression building.",
  },
  {
    title: "Before Audits and Inspections",
    body: "ISO audits and workplace assessments, labour department inspections, and food safety inspections all include workplace hygiene as an important component. Documenting a professional clean hence matters a lot.",
  },
  {
    title: "Employee Hygiene Concerns",
    body: "When HR receives hygiene-related complaints, particularly about washrooms, pantries, or shared workstation areas, a professional deep clean combined with a regular cleaning schedule is the best solution. Acting quickly here is also crucial here because employees' trust is at stake.",
  },
  {
    title: "New Office Move-In",
    body: "Offices that are newly occupied, whether freshly built, post-renovation, or taken over from a previous tenant, need a thorough professional clean before beginning operation. Construction dust, chemical residue, and the previous occupant's contamination all require proper removal before your team moves in.",
  },
  {
    title: "Post-Renovation Cleaning",
    body: "Renovation work leaves behind fine silica dust, paint particles, sticky residue, and debris that regular cleaning cannot fully address. Our professional post-renovation clean is a separate, special service, that is designed to address these problems.",
  },
  {
    title: "Quarterly Workplace Maintenance",
    body: "Growing businesses that have established standards of professional cleaning every quarter are our most consistent long-term clients. Businesses that treat office hygiene the way they treat accounting are the ones that we connect with regularly.",
  },
];

const included = [
  {
    title: "Workstation Cleaning",
    body: "Full desk surface cleaning, including keyboard and nearby areas, monitor screens, under-monitor spaces, drawer fronts, and cable management areas. Spraying anti-bacterial solution, moving personal items, cleaning them, and then replacing them in position.",
  },
  {
    title: "Office Chair Cleaning",
    body: "Fabric office chairs receive HEPA pre-vacuuming, fabric-safe extraction cleaning, and anti-microbial sanitisation. Executive leather chairs receive cleaning, conditioning, and polishing. Chair wheels and bases are cleaned separately. This is a specialist service that significantly affects both hygiene and chair longevity.",
  },
  {
    title: "Office Carpet Cleaning",
    body: "Office carpets in offices where there is a high-footfall receive extraction-based cleaning with our commercial-grade equipment. Carpet tiles are cleaned individually where required. Traffic lanes are restored, stains are treated, and anti-microbial solution is sprayed for sanitisation.",
  },
  {
    title: "Reception Area Cleaning",
    body: "The most client-visible area in the office gets our priority attention. Reception desk (all surfaces, including undersides and fronts), seating area, flooring (hard floor or carpet), glass entry panels, sign panels, and any decorative elements are all treated. The goal is to achieve an entry space that immediately communicates care and hygiene.",
  },
  {
    title: "Meeting and Conference Room Cleaning",
    body: "Conference tables (including underside edges and cable ports), all chairs, presentation screens and equipment surfaces, whiteboards and marker trays, window ledges, and blinds. Rooms are reset to a standard that looks ready for meeting.",
  },
  {
    title: "Pantry and Kitchen Cleaning",
    body: "Appliance exteriors (microwave, refrigerator, coffee machine, kettle), countertop and sink descaling, cabinet fronts, floor deep-clean, and drain area deodorising. Pantry cleaning requires the use of food-safe chemicals throughout and we take care of that.",
  },
  {
    title: "Washroom Cleaning",
    body: "Full toilet and urinal descaling and sanitisation, sink and tap descaling, mirror cleaning, floor scrubbing and disinfection, dispenser refill, exhaust fan cleaning, and grout treatment where required. Washrooms are disinfected with hospital-grade bactericidal agents.",
  },
  {
    title: "Glass Partition Cleaning",
    body: "Office glass partitions accumulate fingerprints, smears, and general haze that make even a clean-looking office look dull. We use streak-free professional glass cleaners for these glass panels and your workplace looks bright immediately.",
  },
  {
    title: "High-Touch Surface Sanitisation",
    body: "Every high-contact point in the office - door handles, light switches, lift buttons, printer panels, common-area controls - is sanitised with anti-microbial agents in our final step. This is the part that regular cleaning overlooks.",
  },
];

const deepCompare = [
  ["Frequency", "Daily / Weekly", "Quarterly / Biannually"],
  ["Workstations", "Surface wipe", "Full clean including under-desk"],
  ["Chairs", "Wipe down", "Full fabric extraction and sanitisation"],
  ["Carpets", "Vacuuming", "Deep extraction cleaning"],
  ["Washrooms", "Standard clean", "Full descaling and grout treatment"],
  ["Glass", "Spot clean", "Full panel streak-free finish"],
  ["AC Vents", "Not included", "Cleaned and sanitised"],
  ["High-touch points", "Occasional wipe", "Systematic bactericidal treatment"],
  ["Pantry", "Surface clean", "Full appliance and drain treatment"],
  ["Suitable for", "Routine maintenance", "Audits, post-renovation, quarterly reset"],
  ["Duration", "1-3 hours", "4-8 hours (office-size dependent)"],
];

const deepWhen = [
  "Before annual ISO or compliance audits",
  "After illness spread through the office (post-COVID protocols)",
  "Before and after major renovation work",
  "Quarterly maintenance for high-traffic offices",
  "Moving into a new office space",
  "Before a major client visit or leadership inspection",
];

const industries = [
  {
    title: "Corporate Offices",
    body: "We handle large corporate offices with multiple floors, open workspaces, conference rooms, and reception areas. We do not disturb your operations as we have early morning, evening, and weekend slots available.",
  },
  {
    title: "Startups and Growing SMEs",
    body: "Offices of 10-50 people that have regular maids cleaning them up, but still need a professional service. Our services are scalable, growing with your growing business.",
  },
  {
    title: "Co-Working Spaces",
    body: "These spaces have higher hygiene needs as employees might face issues in shared spaces. Daily and weekly cleaning plans are available for common areas, meeting rooms, and desk areas.",
  },
  {
    title: "BPO and Call Centres",
    body: "As these workspaces see multiple shifts, they have the highest hygiene requirements. The headsets, the workstations, and the washrooms are all used to their utmost. That is why they require more professional attention than a standard office.",
  },
  {
    title: "Clinics and Healthcare Offices",
    body: "Clinical environments require hospital-grade protocols. They have to meet specific chemical standards and document cleanliness records. Our services are specifically designed to help them meet these documentation requirements.",
  },
  {
    title: "Educational Institutes",
    body: "Common areas in schools, colleges, and other educational institutes are carefully sanitised to protect students' health and hygiene.",
  },
  {
    title: "Retail Offices and Showrooms",
    body: "Showroom floors, back-office areas, and areas where customers visit, we maintain the cleanliness standards of these spaces to give your workspace a commercial upper hand.",
  },
  {
    title: "Restaurants and Cafe Back-Offices",
    body: "As restaurants and cafes have to maintain food-safety standards, we help with the hygienic part.",
  },
];

const forgottenAreas = [
  "Door handles",
  "Light switches",
  "Chair armrests",
  "Keyboard surfaces",
  "Computer mice",
  "Telephone handsets",
  "Meeting room remote controls",
  "Lift buttons",
  "Drawer handles",
  "Reception counters",
  "Glass partition edges and frames",
  "AC vent covers",
  "Monitor backs and stands",
  "Power strip switches and cables",
  "Under-desk areas",
  "Stairwell handrails",
  "Printer and photocopier panels",
  "Pantry appliances",
  "Dispenser surfaces in washrooms",
  "Windowsills and blinds",
  "Behind and under furniture",
  "Partition tops",
  "Bin surroundings",
  "Storage room interiors",
  "Welcome mat and entry area floors",
];

const checklists = [
  {
    label: "Daily",
    heading: "Daily Office Cleaning Checklist",
    items: [
      "Empty all waste bins",
      "Wipe all workstation surfaces",
      "Clean washrooms (toilet, sink, mirror, floor, restock dispensers)",
      "Clean pantry surfaces and appliances",
      "Mop hard floors",
      "Vacuum carpets",
      "Clean reception and entry areas",
      "Sanitise high-touch surfaces (door handles, switches, lift buttons)",
      "Clean glass entry panels and partitions",
      "Remove any visible marks from glass surfaces",
    ],
  },
  {
    label: "Weekly",
    heading: "Weekly Office Cleaning Checklist",
    items: [
      "Full carpet vacuuming across all areas",
      "Chair surface wiping (arms, backs, bases)",
      "Window ledges and blinds cleaning",
      "AC vent cover wiping",
      "Under-desk and behind-equipment cleaning",
      "Full pantry deep clean (inside appliances, drain treatment)",
      "Washroom grout and tile scrub",
      "Stairwell and common corridor thorough clean",
      "Glass partition full clean",
      "Meeting room full reset and clean",
    ],
  },
  {
    label: "Monthly",
    heading: "Monthly Office Cleaning Checklist",
    items: [
      "Full chair extraction cleaning",
      "Carpet spot cleaning for stains",
      "Monitor and screen cleaning",
      "Keyboard and surrounding area deep clean",
      "Light fixtures dusting",
      "Storage area cleaning",
      "Full washroom descaling treatment",
      "Outdoor entrance and car park area",
      "Furniture tops and partition surfaces",
      "Wall marks removal",
    ],
  },
  {
    label: "Quarterly",
    heading: "Quarterly Deep Cleaning Checklist",
    items: [
      "Full carpet extraction and clearing (all areas)",
      "All chairs full fabric extraction and sanitisation",
      "AC vent and duct cover deep cleaning",
      "Full pantry cleaning",
      "Complete washroom descaling and grout treatment",
      "Glass partitions and all windows",
      "Under and behind all furniture",
      "All high-touch surface bacteria treatment",
      "Storage rooms and archive areas",
      "Full workstation deep clean, including under-desk zone",
    ],
  },
];

const beforeAfter = [
  {
    title: "Office Chairs",
    before: "Fabric with darkening on armrests, a faint smell, rough texture.",
    after: "Fresh fabric feel, no smell, armrests restored to original appearance. Employees notice it immediately.",
  },
  {
    title: "Office Carpets",
    before: "Traffic lanes that can't be removed by vacuum, dull colour, and odour",
    after: "Colour brightens visibly, traffic lanes reduced, odour gone.",
  },
  {
    title: "Reception Areas",
    before: "Desk surfaces that look clean but are a bit sticky due to grease, glass panels where fingerprints have become permanent, and flooring that has not been deep-cleaned.",
    after: "Surfaces that are visibly and hygienically clean, streak-free glass, and a fresh-smelling area. The space looks professional before anyone says a word.",
  },
  {
    title: "Workstations",
    before: "Keyboards and other things with visible dust accumulation, monitor backs, and desk surfaces that have gotten grimy.",
    after: "Workstations that feel and look very clean. People around notice the change.",
  },
];

const outperformRows = [
  ["Cleaning Depth", "Surface-level only", "Deep extraction where required"],
  ["Equipment", "Basic mops and cloths", "Commercial-grade machines"],
  ["Sanitisation", "Generic spray and wipe", "Special anti-bacterial treatment"],
  ["Scheduling", "Fixed, inflexible", "24-hour service"],
  ["Office Chair Cleaning", "Basic wipe", "Full extraction + sanitisation"],
  ["Carpet Cleaning", "Vacuuming only", "Deep extraction + stain treatment"],
  ["Consistency", "Variable between visits", "Documented standard at each job"],
  ["Communication", "Difficult to reach", "Dedicated contact service"],
  ["Business Disruption", "Often during work hours", "Schedule around your operations"],
  ["Pricing Transparency", "Vague or hidden charges", "Fixed quote after site inspection"],
];

const whyChoose = [
  {
    title: "Trained Cleaning Team",
    body: "Every member in our team is trained for office cleaning and not a general cleaning staff. Workstation handling, sensitivity around equipment, and office protocol are all part of our training.",
  },
  {
    title: "Industrial-Grade Equipment",
    body: "Industrial vacuum systems, hot water extraction machines for carpets and chairs, professional glass cleaning tools, and anti-bacterial sanitisation chemicals.",
  },
  {
    title: "Flexible Scheduling That Doesn't Disrupt Operations",
    body: "We provide a 24-hour service, including early morning slots, later in the evening, and weekends as well. We work around your schedule so your team doesn't have to.",
  },
  {
    title: "Minimal Business Disruption",
    body: "We work in sections to ensure that every area is returned to a ready-to-use state before we move on. No mess is left mid-clean, and no equipment to stumble on in the middle of the corridor.",
  },
  {
    title: "Same-Day Availability for Urgent Requirements",
    body: "If you have surprise client visits in the afternoon and your office looks like a mess, that's what we keep our same-day urgent bookings for. Book your slots before noon, and we'll be there before your client.",
  },
  {
    title: "Transparent, Fixed Pricing",
    body: "We give you a fixed quote after assessing your office, and you can choose not to go ahead with it. Charges would not be varied after what the team declares on that day.",
  },
  {
    title: "Dedicated Support Contact",
    body: "We provide you with a dedicated contact for support, feedback, or any queries. It would not be a generic helpline; it would be a person who knows your office and your standards.",
  },
];

const processSteps = [
  {
    title: "Site Inspection",
    body: "We visit your office before quoting any price. This is not optional; it is how we understand your requirements, whether you need any special services (carpets, chairs, glass partitions), and ensure that the quote we give is the final quote.",
  },
  {
    title: "Office Assessment and Plan",
    body: "Based on the inspection, we create a blueprint of the cleaning plan, zones, sequence of cleaning, what treatments are required, and what areas need any special attention. This plan is shared with you before we begin.",
  },
  {
    title: "Dust and Debris Removal",
    body: "We vacuum all surfaces, floors, workstations, chairs, windows, and AC vents. Pre-cleaning vacuum makes all the next steps even more effective.",
  },
  {
    title: "Zone-by-Zone Deep Cleaning",
    body: "Working systematically through each zone, we ensure an area is complete before moving on to the next one. We clean each office zone, including workstations, meeting rooms, reception area, pantry, washrooms, etc. Different products are applied according to the suitability of each zone.",
  },
  {
    title: "Sanitisation Step",
    body: "After all the physical cleaning is done, we perform an anti-microbial sanitisation on all high-touch surfaces. Door handles, switches, shared equipment, etc., are all treated with an anti-microbial agent.",
  },
  {
    title: "Final Quality Inspection",
    body: "Our team checks the entire cleaning plan before the team signs off. In case any step is missed, or any area does not meet our standard cleaning promises, we re-clean it before we leave.",
  },
];

const frequencyRows = [
  ["Small office (under 20 people, light use)", "Weekly cleaning + Quarterly deep clean"],
  ["Medium office (20-50 people)", "3 times a week cleaning + Quarterly deep clean"],
  ["Large office (50-150 people)", "Daily clean + monthly deep clean"],
  ["High-traffic office (150+ people)", "Daily clean + bi-monthly deep clean"],
  ["BPO / Call centre (multi-shift)", "Daily clean every shift + monthly deep clean"],
  ["Offices with carpets throughout", "Monthly carpet extraction with any schedule"],
  ["Clinic or healthcare office", "Daily clean with hospital-grade protocols + monthly deep clean"],
  ["Co-working space", "Daily clean + bi-monthly deep clean of all common areas"],
];

const faqs = [
  {
    q: "What is included in office cleaning services?",
    a: "Our office cleaning services in Delhi cover workstation cleaning, washroom cleaning, pantry cleaning, reception area cleaning, meeting room cleaning, glass partition cleaning, carpet vacuuming, floor mopping, waste removal, and complete office sanitisation. Office chair cleaning and carpet deep cleaning are also available as additional services.",
  },
  {
    q: "What is the difference between office cleaning and office deep cleaning?",
    a: "Regular office cleaning is maintenance. It helps maintain the standard of your office on regular days. Office deep cleaning services in Delhi NCR mean restoration, accessing areas that routine cleaning does not. Deep cleaning is done quarterly, while regular cleaning can be done as many times a week.",
  },
  {
    q: "How often should an office be professionally cleaned?",
    a: "Most Delhi offices can do well with regular cleaning of 2-3 times a week, combined with a quarterly deep clean. For offices with high traffic, we recommend more frequent professional cleaning.",
  },
  {
    q: "Do you provide after-hours office cleaning?",
    a: "Yes! At DryClean Masters, we provide a 24-hour service, 7 days a week. You can book early morning slots or later in the evening so that your office hours are not disrupted.",
  },
  {
    q: "Can you clean office chairs and carpets as part of the service?",
    a: "Yes, office chair cleaning and carpet vacuuming are available in our commercial office cleaning services. However, if you require office chair extraction cleaning and carpet deep cleaning, they would be available as additional services, which you can opt for.",
  },
  {
    q: "How much does office cleaning cost in Delhi NCR?",
    a: "Our office cleaning costs start from ₹6 per sq.ft for small offices and vary based on office size, number of workstations, and requirements. Pricing would be confirmed after the first inspection.",
  },
  {
    q: "Do you offer same-day office cleaning in Delhi?",
    a: "Yes, for urgent requirements and if you book before noon, same-day commercial cleaning is available in most Delhi NCR areas.",
  },
  {
    q: "Which industries do you serve?",
    a: "We clean corporate offices, startups, coworking spaces, BPOs, call centres, clinics, educational institutions, retail offices, restaurants, and cafes across Delhi and NCR areas.",
  },
  {
    q: "Do you provide one-time service as well as commercial cleaning contracts?",
    a: "Yes, we provide recurring service contracts as well as one-time service. You can schedule our visits accordingly. You will get a dedicated contact person and fixed monthly pricing. If you want consistent and managed office hygiene, a contract is the best thing.",
  },
  {
    q: "Can office cleaning be done without disrupting office operations?",
    a: "Yes, with our 24-hour service, you can schedule your slots around your office timings. If you require cleaning during office hours, we also do sectional cleaning, in which one part is finished before moving on to the other, to ensure the whole office doesn't get disturbed.",
  },
  {
    q: "Do you bring your own equipment and supplies?",
    a: "Yes, completely. All chemicals, equipment, and supplies are provided by our team. You won't need to stock any chemicals or prepare anything.",
  },
  {
    q: "How long does office cleaning take?",
    a: "A standard clean for a 1,000 sq ft office with 20 workstations takes approximately 2-3 hours. Deep cleaning that space might take 4-6 hours. We will tell you the estimated time during the inspection.",
  },
  {
    q: "Do you compensate for any damage done during cleaning?",
    a: "Yes, in case our technicians do any damage, we compensate for that. Our technicians are trained to work around high-value equipment and the damages are rare to non-existent. Still, it is advised that you remove any valuable products and pieces before we arrive.",
  },
  {
    q: "Do you provide a free inspection as part of your office cleaning services?",
    a: "The inspection is included in our service contact. Once you register a service, we arrive and assess your workplace to give you a price quote. Stand-alone inspection, however, is not included with our services.",
  },
  {
    q: "Can you clean IT equipment and work desks?",
    a: "Yes, we clean monitors, keyboards, untangle wires, and other office equipment without damage. We know how much dust these workstations hold and any office cleaning without cleaning them is incomplete.",
  },
];

/* ── Component ───────────────────────────────────────────────────────────── */

export default function OfficeCleaningContent() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeList, setActiveList] = useState(0);

  const refs = {
    intro: useRef<HTMLDivElement>(null),
    signs: useRef<HTMLDivElement>(null),
    cost: useRef<HTMLDivElement>(null),
    book: useRef<HTMLDivElement>(null),
    included: useRef<HTMLDivElement>(null),
    deep: useRef<HTMLDivElement>(null),
    industries: useRef<HTMLDivElement>(null),
    forgotten: useRef<HTMLDivElement>(null),
    checklist: useRef<HTMLDivElement>(null),
    beforeAfter: useRef<HTMLDivElement>(null),
    outperform: useRef<HTMLDivElement>(null),
    choose: useRef<HTMLDivElement>(null),
    process: useRef<HTMLDivElement>(null),
    frequency: useRef<HTMLDivElement>(null),
    faq: useRef<HTMLDivElement>(null),
    cta: useRef<HTMLDivElement>(null),
  };

  const inView = {
    intro: useInView(refs.intro, { once: true, margin: "-60px" }),
    signs: useInView(refs.signs, { once: true, margin: "-60px" }),
    cost: useInView(refs.cost, { once: true, margin: "-60px" }),
    book: useInView(refs.book, { once: true, margin: "-60px" }),
    included: useInView(refs.included, { once: true, margin: "-60px" }),
    deep: useInView(refs.deep, { once: true, margin: "-60px" }),
    industries: useInView(refs.industries, { once: true, margin: "-60px" }),
    forgotten: useInView(refs.forgotten, { once: true, margin: "-60px" }),
    checklist: useInView(refs.checklist, { once: true, margin: "-60px" }),
    beforeAfter: useInView(refs.beforeAfter, { once: true, margin: "-60px" }),
    outperform: useInView(refs.outperform, { once: true, margin: "-60px" }),
    choose: useInView(refs.choose, { once: true, margin: "-60px" }),
    process: useInView(refs.process, { once: true, margin: "-60px" }),
    frequency: useInView(refs.frequency, { once: true, margin: "-60px" }),
    faq: useInView(refs.faq, { once: true, margin: "-60px" }),
    cta: useInView(refs.cta, { once: true, margin: "-60px" }),
  };

  return (
    <main className="font-sans">

      {/* ── HERO — split panel, navy left / stat card right ────────────────── */}
      <section className="bg-teal-deep teal-texture text-ivory">
        <div className="bg-teal/15 border-b border-teal/20 py-2 px-4 text-center">
          <p className="text-teal-light text-xs font-semibold tracking-wider">
            ✔ Same-day Booking &nbsp;·&nbsp; ✔ 24-hour Service &nbsp;·&nbsp; ✔ 7 days a week &nbsp;·&nbsp; ✔ Full Delhi NCR Coverage
          </p>
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 py-14 md:py-20 grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
          {/* Left — copy */}
          <div>
            <nav className="mb-6 flex items-center gap-2 text-stone-teal/50 text-xs">
              <a href="/" className="hover:text-teal-light transition-colors">Home</a>
              <span>/</span>
              <span className="text-teal-light">Office Cleaning Services</span>
            </nav>

            <div className="inline-flex items-center gap-2 bg-teal/15 border border-teal/25 rounded-full px-4 py-1.5 mb-6">
              <Building2 size={14} className="text-teal-light" />
              <span className="text-xs font-semibold tracking-wide text-teal-light">
                Commercial &amp; Corporate Cleaning
              </span>
            </div>

            <h1 className="text-ivory text-4xl md:text-5xl xl:text-[3.4rem] font-extrabold leading-[1.08] tracking-tight mb-5">
              Office Cleaning Services in Delhi NCR
              <span className="block text-teal-light text-2xl md:text-3xl font-bold mt-3">
                Starting ₹6 per sq.ft
              </span>
            </h1>

            <p className="text-stone-teal/75 text-base leading-relaxed mb-8 max-w-xl">
              Professional office cleaning, commercial office cleaning &amp; office deep
              cleaning services for modern businesses across Delhi NCR.
            </p>

            <div className="flex flex-wrap gap-3 mb-8">
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
                <Phone size={15} /> Book Online
              </a>
            </div>

            <div className="flex flex-wrap gap-x-6 gap-y-3 text-xs text-stone-teal/70 border-t border-teal/15 pt-6">
              <span className="inline-flex items-center gap-1.5">
                <Phone size={13} className="text-teal-light" /> {PHONE_DISPLAY}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock size={13} className="text-teal-light" /> 24-hour service
              </span>
              <span className="inline-flex items-center gap-1.5">
                <MapPin size={13} className="text-teal-light" /> Full Delhi NCR Coverage
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 size={13} className="text-teal-light" /> Same-day Booking Available
              </span>
            </div>
          </div>

          {/* Right — image + floating stats */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden aspect-[4/5] border border-teal/20 shadow-2xl shadow-black/40">
              <Image
                src="/img/office_cleaning_Delhi/1.webp"
                alt="Professional office cleaning services in Delhi NCR"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-teal-deep/80 via-transparent to-transparent" />
            </div>
            <div className="absolute -bottom-5 -left-3 right-8 grid grid-cols-3 gap-2 bg-ivory rounded-2xl p-4 shadow-xl shadow-black/30">
              {[
                { val: "₹6", label: "per sq.ft" },
                { val: "24hr", label: "service" },
                { val: "NCR", label: "coverage" },
              ].map(({ val, label }) => (
                <div key={label} className="text-center">
                  <p className="text-teal-deep text-xl font-extrabold">{val}</p>
                  <p className="text-muted-teal text-[0.7rem] uppercase tracking-wide">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FIRST IMPRESSION — editorial intro ─────────────────────────────── */}
      <section ref={refs.intro} className="bg-ivory py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <motion.div {...fade(inView.intro)}>
            <Eyebrow>First Impressions</Eyebrow>
            <h2 className="text-teal-deep text-3xl md:text-4xl font-extrabold tracking-tight leading-tight mb-8">
              Is Your Office Creating the Right First Impression?
            </h2>
            <div className="relative rounded-3xl overflow-hidden aspect-[16/7] border border-mist shadow-lg mb-8">
              <Image
                src="/img/office_cleaning_Delhi/5.webp"
                alt="Clean, professional office reception in Delhi NCR"
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-5 text-slate-teal/80 text-base leading-relaxed">
              <p>
                A client walks into your office for the first time. Before you say hello,
                before the meeting even starts, they have already formed an opinion. The dust
                on your reception desk and the stained carpet near the entrance, along with the
                faint smells from your pantry, speak volumes before you do.
              </p>
              <p>
                First impressions in business are very important, and your office can either
                make them or break them. Not much is in your hands, but your office's
                cleanliness? That is totally in your hands. Besides, your employees spend 8-10
                hours a day in this space. A dirty workplace means more sick leave and less
                productivity.
              </p>
              <p>
                Professional office cleaning, hence, is a necessity to meet basic hygiene
                standards. If you are looking for a shining workplace that makes your employees
                want to come to the office, DryClean Masters has you covered with the best
                office cleaning services in Delhi NCR.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-4 bg-mist/50 border border-mist rounded-2xl p-5">
              <p className="text-teal-deep font-semibold text-sm flex-1 min-w-[200px]">
                Need office cleaning this week?
              </p>
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 btn-primary text-sm px-6 py-3"
              >
                Request A Quick Quote <ArrowRight size={15} />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── SIGNS — bordered accent cards on tinted band ───────────────────── */}
      <section ref={refs.signs} className="bg-ivory-teal py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
          <motion.div {...fade(inView.signs)} className="max-w-3xl mb-14">
            <Eyebrow>Warning Signs</Eyebrow>
            <h2 className="text-teal-deep text-3xl md:text-4xl font-extrabold tracking-tight leading-tight mb-4">
              If You See These Signs, Your Office Is Overdue for Professional Cleaning
            </h2>
            <p className="text-slate-teal/75 text-base leading-relaxed">
              You won't call a professional office cleaning when your office is spotless. You,
              however, should contact us when one or all of these signs appear:
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {signs.map((s, i) => (
              <motion.div
                key={s.title}
                {...fade(inView.signs, 0.05 * i)}
                className="bg-ivory rounded-2xl p-6 border-l-4 border-teal shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
              >
                <span className="block text-teal/30 text-3xl font-extrabold mb-3">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-teal-deep text-base font-bold mb-2 leading-snug">{s.title}</h3>
                <p className="text-slate-teal/70 text-sm leading-relaxed">{s.body}</p>
              </motion.div>
            ))}
          </div>

          <motion.div {...fade(inView.signs, 0.2)} className="mt-10">
            <p className="text-slate-teal/75 text-base leading-relaxed max-w-3xl mb-6">
              It's better if you call us before it gets urgent or before your employees complain
              of hygiene issues, but we are ready whenever you want us.
            </p>
            <CtaRow primary="Call us if you see these signs" secondary="WhatsApp for queries" primaryHref={PHONE} secondaryHref={WA_LINK} />
          </motion.div>
        </div>
      </section>

      {/* ── COST — factors + pricing table ─────────────────────────────────── */}
      <section ref={refs.cost} className="bg-ivory py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
          <motion.div {...fade(inView.cost)} className="max-w-3xl mb-14">
            <Eyebrow>Transparent Pricing</Eyebrow>
            <h2 className="text-teal-deep text-3xl md:text-4xl font-extrabold tracking-tight leading-tight mb-4">
              Office Cleaning Cost in Delhi NCR: What to Expect
            </h2>
            <p className="text-slate-teal/75 text-base leading-relaxed">
              Office cleaning pricing in Delhi NCR depends on a few factors, which are:
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-14 items-start">
            {/* Factors */}
            <div>
              <h3 className="text-teal-deep text-lg font-bold mb-6">Key Pricing Factors</h3>
              <div className="space-y-5">
                {pricingFactors.map((f, i) => (
                  <motion.div
                    key={f.title}
                    {...fade(inView.cost, 0.05 * i)}
                    className="flex gap-4"
                  >
                    <span className="mt-1 shrink-0 w-7 h-7 rounded-lg bg-teal/10 text-teal flex items-center justify-center text-sm font-bold">
                      {i + 1}
                    </span>
                    <div>
                      <h4 className="text-teal-deep font-semibold text-base mb-1">{f.title}</h4>
                      <p className="text-slate-teal/70 text-sm leading-relaxed">{f.body}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              <p className="mt-6 text-slate-teal/70 text-sm italic border-l-2 border-teal/40 pl-4">
                All prices are confirmed after the inspection, and you will pay just the price
                that we quote then.
              </p>
            </div>

            {/* Table */}
            <motion.div {...fade(inView.cost, 0.1)}>
              <div className="rounded-2xl overflow-hidden border border-mist shadow-sm">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="bg-teal-deep text-ivory">
                      <th className="px-4 py-3 font-semibold">Office Size</th>
                      <th className="px-4 py-3 font-semibold">Team</th>
                      <th className="px-4 py-3 font-semibold">Time</th>
                      <th className="px-4 py-3 font-semibold">Pricing</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pricingRows.map((row, i) => (
                      <tr
                        key={row[0]}
                        className={i % 2 ? "bg-ivory-teal" : "bg-ivory"}
                      >
                        <td className="px-4 py-3.5 font-semibold text-teal-deep">{row[0]}</td>
                        <td className="px-4 py-3.5 text-slate-teal/75">{row[1]}</td>
                        <td className="px-4 py-3.5 text-slate-teal/75">{row[2]}</td>
                        <td className="px-4 py-3.5 font-semibold text-teal">{row[3]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-6 bg-teal-deep teal-texture rounded-2xl p-6 text-ivory">
                <p className="font-bold text-lg mb-1">Request A Custom Quote</p>
                <p className="text-stone-teal/70 text-sm mb-4">
                  Site inspection, assessment, and fixed quote within 24 hours
                </p>
                <a
                  href={WA_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 btn-copper text-sm px-5 py-2.5"
                >
                  Get My Quote <ArrowRight size={14} />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── WHY BUSINESSES BOOK — dark band, 2-col cards ───────────────────── */}
      <section ref={refs.book} className="bg-teal-deep teal-texture py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
          <div className="grid lg:grid-cols-[1fr_0.8fr] gap-10 items-center mb-14">
            <motion.div {...fade(inView.book)} className="max-w-2xl">
              <Eyebrow light>Common Triggers</Eyebrow>
              <h2 className="text-ivory text-3xl md:text-4xl font-extrabold tracking-tight leading-tight mb-4">
                Why Businesses Actually Book Office Cleaning Services
              </h2>
              <p className="text-stone-teal/70 text-base leading-relaxed">
                Understanding why businesses book us helps you know whether you are in the right place.
              </p>
            </motion.div>
            <motion.div {...fade(inView.book, 0.1)} className="relative rounded-3xl overflow-hidden aspect-[16/10] border border-teal/20 shadow-xl shadow-black/30">
              <Image
                src="/img/office_cleaning_Delhi/6.webp"
                alt="Professional team cleaning a corporate office in Delhi NCR"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-teal-deep/50 to-transparent" />
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {whyBook.map((b, i) => (
              <motion.div
                key={b.title}
                {...fade(inView.book, 0.05 * i)}
                className="bg-teal-dark border border-teal/15 rounded-2xl p-7 hover:border-teal/40 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-teal/15 flex items-center justify-center mb-5">
                  <ClipboardCheck size={18} className="text-teal-light" />
                </div>
                <h3 className="text-ivory text-lg font-bold mb-2 leading-snug">{b.title}</h3>
                <p className="text-stone-teal/65 text-sm leading-relaxed">{b.body}</p>
              </motion.div>
            ))}
          </div>

          <CtaRow primary="WhatsApp us your requirements" secondary="Get a direct point of contact" secondaryHref={WA_LINK} />
        </div>
      </section>

      {/* ── WHAT'S INCLUDED — image + list ─────────────────────────────────── */}
      <section ref={refs.included} className="bg-ivory py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
          <motion.div {...fade(inView.included)} className="max-w-3xl mb-14">
            <Eyebrow>Full Scope</Eyebrow>
            <h2 className="text-teal-deep text-3xl md:text-4xl font-extrabold tracking-tight leading-tight mb-4">
              What's Included in Our Office Cleaning Services
            </h2>
            <p className="text-slate-teal/75 text-base leading-relaxed">
              Our office cleaning services in Delhi NCR are comprehensive. We include everything
              in our services. Here's exactly what we clean:
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-[1fr_0.7fr] gap-10 items-start">
            <div className="grid sm:grid-cols-2 gap-x-8 gap-y-7">
              {included.map((it, i) => (
                <motion.div key={it.title} {...fade(inView.included, 0.04 * i)} className="flex gap-3">
                  <CheckCircle2 size={20} className="text-teal shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-teal-deep font-bold text-base mb-1.5">{it.title}</h3>
                    <p className="text-slate-teal/70 text-sm leading-relaxed">{it.body}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div {...fade(inView.included, 0.1)} className="lg:sticky lg:top-24">
              <div className="relative rounded-3xl overflow-hidden aspect-[3/4] border border-mist shadow-lg">
                <Image
                  src="/img/office_cleaning_Delhi/2.webp"
                  alt="What is included in office cleaning services in Delhi NCR"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="mt-5 bg-mist/50 border border-mist rounded-2xl p-5 text-center">
                <p className="text-teal-deep font-semibold text-sm mb-3">Tell us your office size</p>
                <a
                  href={WA_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 btn-primary text-sm px-5 py-2.5"
                >
                  Get a custom cleaning plan <ArrowRight size={14} />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── DEEP CLEANING — comparison table ───────────────────────────────── */}
      <section ref={refs.deep} className="bg-ivory-teal py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
          <motion.div {...fade(inView.deep)} className="max-w-3xl mb-12">
            <Eyebrow>Deep vs Regular</Eyebrow>
            <h2 className="text-teal-deep text-3xl md:text-4xl font-extrabold tracking-tight leading-tight mb-5">
              Office Deep Cleaning: What It Is and When You Need It
            </h2>
            <div className="space-y-4 text-slate-teal/80 text-base leading-relaxed">
              <p>
                Regular office cleaning maintains the standard; office deep cleaning services in
                Delhi NCR restore your office.
              </p>
              <p>
                Deep cleaning goes beyond routine maintenance; it accesses areas that standard
                cleaning doesn't touch, using specialist equipment for clearing off the
                contamination that has built up over months, and delivering a reset for your
                office that you have been missing.
              </p>
            </div>
          </motion.div>

          <motion.h3 {...fade(inView.deep, 0.05)} className="text-teal-deep text-xl font-bold mb-5">
            Regular Cleaning vs. Office Deep Cleaning
          </motion.h3>

          <motion.div {...fade(inView.deep, 0.08)} className="rounded-2xl overflow-hidden border border-mist shadow-sm bg-ivory">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-teal-deep text-ivory">
                  <th className="px-4 py-3.5 font-semibold">Aspect</th>
                  <th className="px-4 py-3.5 font-semibold">Regular Office Cleaning</th>
                  <th className="px-4 py-3.5 font-semibold">Office Deep Cleaning</th>
                </tr>
              </thead>
              <tbody>
                {deepCompare.map((row, i) => (
                  <tr key={row[0]} className={i % 2 ? "bg-ivory-teal" : "bg-ivory"}>
                    <td className="px-4 py-3 font-semibold text-teal-deep">{row[0]}</td>
                    <td className="px-4 py-3 text-slate-teal/75">{row[1]}</td>
                    <td className="px-4 py-3 text-teal font-medium">{row[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>

          <motion.div {...fade(inView.deep, 0.12)} className="mt-12 grid lg:grid-cols-[0.9fr_1.1fr] gap-8 items-center">
            <div>
              <h3 className="text-teal-deep text-lg font-bold mb-4">When businesses book a deep clean:</h3>
              <ul className="space-y-3">
                {deepWhen.map((w) => (
                  <li key={w} className="flex gap-2.5 text-slate-teal/80 text-sm">
                    <CheckCircle2 size={17} className="text-teal shrink-0 mt-0.5" />
                    {w}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-teal-deep teal-texture rounded-2xl p-7 text-ivory">
              <p className="font-bold text-lg mb-1">Book a site inspection</p>
              <p className="text-stone-teal/70 text-sm mb-5">
                We'll assess your office and recommend the right frequency and service scope.
              </p>
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 btn-copper text-sm px-5 py-3"
              >
                Schedule Inspection <ArrowRight size={14} />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── INDUSTRIES ─────────────────────────────────────────────────────── */}
      <section ref={refs.industries} className="bg-ivory py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
          <motion.div {...fade(inView.industries)} className="max-w-3xl mb-14">
            <Eyebrow>Who We Serve</Eyebrow>
            <h2 className="text-teal-deep text-3xl md:text-4xl font-extrabold tracking-tight leading-tight mb-4">
              Industries and Business Types We Work With
            </h2>
            <p className="text-slate-teal/75 text-base leading-relaxed">
              Our corporate office cleaning services cover the full range of commercial
              environments in Delhi NCR, each with different requirements, schedules, and
              hygiene standards.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {industries.map((ind, i) => (
              <motion.div
                key={ind.title}
                {...fade(inView.industries, 0.04 * i)}
                className="bg-ivory-teal rounded-2xl p-6 border border-mist hover:border-teal/40 transition-colors"
              >
                <h3 className="text-teal-deep font-bold text-base mb-2">{ind.title}</h3>
                <p className="text-slate-teal/70 text-sm leading-relaxed">{ind.body}</p>
              </motion.div>
            ))}
          </div>

          <CtaRow primary="Schedule inspection" secondary="Book the earliest slot" secondaryHref={WA_LINK} />
        </div>
      </section>

      {/* ── 25 FORGOTTEN AREAS — dense chip grid ───────────────────────────── */}
      <section ref={refs.forgotten} className="bg-teal-deep teal-texture py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
          <motion.div {...fade(inView.forgotten)} className="max-w-3xl mb-12">
            <Eyebrow light>Overlooked Spots</Eyebrow>
            <h2 className="text-ivory text-3xl md:text-4xl font-extrabold tracking-tight leading-tight mb-4">
              25 Areas Most Offices Forget to Clean
            </h2>
            <p className="text-stone-teal/70 text-base leading-relaxed">
              Basic cleaning companies miss these important spots that lead to the rebuilding of
              bacteria quickly after cleaning.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {forgottenAreas.map((area, i) => (
              <motion.div
                key={area}
                {...fade(inView.forgotten, 0.02 * i)}
                className="flex items-center gap-2.5 bg-teal-dark/70 border border-teal/15 rounded-xl px-4 py-3"
              >
                <span className="text-teal-light text-xs font-bold shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-stone-teal/85 text-sm leading-snug">{area}</span>
              </motion.div>
            ))}
          </div>

          <motion.p {...fade(inView.forgotten, 0.2)} className="mt-10 text-stone-teal/70 text-base leading-relaxed max-w-3xl">
            Our high-touch areas sanitisation services take care that every single area that
            comes in contact with people is addressed. Regular cleaning does not touch on this
            problem.
          </motion.p>
          <CtaRow primary="Contact us for a total clean" secondary="Book now to ensure hygiene" secondaryHref={WA_LINK} />
        </div>
      </section>

      {/* ── CHECKLIST — tabbed ─────────────────────────────────────────────── */}
      <section ref={refs.checklist} className="bg-ivory py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
          <motion.div {...fade(inView.checklist)} className="max-w-3xl mb-12">
            <Eyebrow>Cleaning Frequency Guide</Eyebrow>
            <h2 className="text-teal-deep text-3xl md:text-4xl font-extrabold tracking-tight leading-tight mb-4">
              How Often Should You Clean Certain Areas of Your Office: An Office Cleaning Checklist
            </h2>
            <p className="text-slate-teal/75 text-base leading-relaxed">
              If you are planning to manage your office's hygiene and want a checklist to cover
              daily, weekly, monthly, and quarterly necessities, here's a complete guide to what
              you should cover and how frequently:
            </p>
          </motion.div>

          {/* Tabs */}
          <div className="flex flex-wrap gap-2 mb-8">
            {checklists.map((c, i) => (
              <button
                key={c.label}
                onClick={() => setActiveList(i)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-colors ${
                  activeList === i
                    ? "bg-teal-deep text-ivory"
                    : "bg-ivory-teal text-slate-teal hover:bg-mist"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          <motion.div
            key={activeList}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="bg-ivory-teal border border-mist rounded-3xl p-8 md:p-10"
          >
            <h3 className="text-teal-deep text-xl font-bold mb-6">{checklists[activeList].heading}</h3>
            <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-3.5">
              {checklists[activeList].items.map((item) => (
                <li key={item} className="flex gap-2.5 text-slate-teal/80 text-sm">
                  <CheckCircle2 size={17} className="text-teal shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          <CtaRow primary="Contact for carpet extraction cleaning" secondary="Book additional services at a lower price" primaryHref={PHONE} secondaryHref={WA_LINK} />
        </div>
      </section>

      {/* ── BEFORE & AFTER — split cards ───────────────────────────────────── */}
      <section ref={refs.beforeAfter} className="bg-ivory-teal py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
          <motion.div {...fade(inView.beforeAfter)} className="max-w-3xl mb-14">
            <Eyebrow>Real Results</Eyebrow>
            <h2 className="text-teal-deep text-3xl md:text-4xl font-extrabold tracking-tight leading-tight mb-4">
              Before and After: What Professional Cleaning Actually Changes
            </h2>
            <p className="text-slate-teal/75 text-base leading-relaxed">
              Results are completely visible after we leave your home. We will explain what
              happens after a professional commercial office cleaning visit.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {beforeAfter.map((b, i) => (
              <motion.div
                key={b.title}
                {...fade(inView.beforeAfter, 0.06 * i)}
                className="bg-ivory rounded-2xl border border-mist overflow-hidden"
              >
                <div className="px-6 py-4 bg-teal-deep">
                  <h3 className="text-ivory font-bold text-lg">{b.title}</h3>
                </div>
                <div className="grid grid-cols-2 divide-x divide-mist">
                  <div className="p-6">
                    <span className="inline-block text-xs font-bold uppercase tracking-wider text-muted-teal mb-2">
                      Before
                    </span>
                    <p className="text-slate-teal/70 text-sm leading-relaxed">{b.before}</p>
                  </div>
                  <div className="p-6 bg-mist/40">
                    <span className="inline-block text-xs font-bold uppercase tracking-wider text-teal mb-2">
                      After
                    </span>
                    <p className="text-slate-teal/80 text-sm leading-relaxed">{b.after}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <CtaRow primary="WhatsApp to connect with satisfied customers" secondary="Send us your concerns" secondaryHref={WA_LINK} />
        </div>
      </section>

      {/* ── OUTPERFORM — comparison ────────────────────────────────────────── */}
      <section ref={refs.outperform} className="bg-ivory py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-4 md:px-8 lg:px-12">
          <motion.div {...fade(inView.outperform)} className="max-w-3xl mb-12">
            <Eyebrow>The Difference</Eyebrow>
            <h2 className="text-teal-deep text-3xl md:text-4xl font-extrabold tracking-tight leading-tight">
              Why Professional Office Cleaning Outperforms Standard Options
            </h2>
          </motion.div>

          <motion.div {...fade(inView.outperform, 0.05)} className="rounded-2xl overflow-hidden border border-mist shadow-sm">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-teal-deep text-ivory">
                  <th className="px-4 py-3.5 font-semibold">What it Cleans</th>
                  <th className="px-4 py-3.5 font-semibold">Typical Local Cleaning</th>
                  <th className="px-4 py-3.5 font-semibold">DryClean Masters</th>
                </tr>
              </thead>
              <tbody>
                {outperformRows.map((row, i) => (
                  <tr key={row[0]} className={i % 2 ? "bg-ivory-teal" : "bg-ivory"}>
                    <td className="px-4 py-3 font-semibold text-teal-deep">{row[0]}</td>
                    <td className="px-4 py-3 text-slate-teal/70">{row[1]}</td>
                    <td className="px-4 py-3 text-teal font-medium">
                      <span className="inline-flex items-center gap-1.5">
                        <CheckCircle2 size={15} className="text-teal shrink-0" />
                        {row[2]}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>

          <motion.p {...fade(inView.outperform, 0.1)} className="mt-8 text-slate-teal/80 text-base leading-relaxed max-w-3xl">
            The difference between a service that just touches the surface and a commercial
            office deep cleaning service is that one genuinely delivers, while the other just
            creates visuals.
          </motion.p>
        </div>
      </section>

      {/* ── WHY CHOOSE — dark band with image ──────────────────────────────── */}
      <section ref={refs.choose} className="bg-teal-deep teal-texture py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
          <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-12 items-start">
            <motion.div {...fade(inView.choose)} className="lg:sticky lg:top-24">
              <Eyebrow light>Our Promise</Eyebrow>
              <h2 className="text-ivory text-3xl md:text-4xl font-extrabold tracking-tight leading-tight mb-6">
                Why Businesses Choose DryClean Masters
              </h2>
              <div className="relative rounded-3xl overflow-hidden aspect-[4/3] border border-teal/20 shadow-xl shadow-black/30">
                <Image
                  src="/img/office_cleaning_Delhi/3.webp"
                  alt="Why businesses choose DryClean Masters for office cleaning in Delhi"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-teal-deep/70 to-transparent" />
              </div>
            </motion.div>

            <div className="space-y-4">
              {whyChoose.map((w, i) => (
                <motion.div
                  key={w.title}
                  {...fade(inView.choose, 0.05 * i)}
                  className="flex gap-4 bg-teal-dark/60 border border-teal/15 rounded-2xl p-6 hover:border-teal/40 transition-colors"
                >
                  <ShieldCheck size={22} className="text-teal-light shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-ivory font-bold text-base mb-1.5">{w.title}</h3>
                    <p className="text-stone-teal/65 text-sm leading-relaxed">{w.body}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <CtaRow primary="Let professionals handle the cleaning" secondary="Book your slot before it's gone" secondaryHref={WA_LINK} />
        </div>
      </section>

      {/* ── PROCESS — numbered steps ───────────────────────────────────────── */}
      <section ref={refs.process} className="bg-ivory py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
          <motion.div {...fade(inView.process)} className="max-w-3xl mb-14">
            <Eyebrow>Step by Step</Eyebrow>
            <h2 className="text-teal-deep text-3xl md:text-4xl font-extrabold tracking-tight leading-tight">
              Our Professional Office Cleaning Process
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {processSteps.map((step, i) => (
              <motion.div
                key={step.title}
                {...fade(inView.process, 0.05 * i)}
                className="relative bg-ivory-teal rounded-2xl p-7 border border-mist"
              >
                <span className="absolute top-6 right-6 text-5xl font-extrabold text-teal/12 leading-none select-none">
                  {i + 1}
                </span>
                <span className="inline-block text-xs font-bold uppercase tracking-widest text-teal mb-3">
                  Step-{i + 1}
                </span>
                <h3 className="text-teal-deep font-bold text-lg mb-2 leading-snug pr-8">{step.title}</h3>
                <p className="text-slate-teal/70 text-sm leading-relaxed">{step.body}</p>
              </motion.div>
            ))}
          </div>

          <CtaRow primary="Schedule your office assessment" secondary="Book an inspection today" secondaryHref={WA_LINK} />
        </div>
      </section>

      {/* ── FREQUENCY — table ──────────────────────────────────────────────── */}
      <section ref={refs.frequency} className="bg-ivory-teal py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-4 md:px-8 lg:px-12">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center mb-12">
            <motion.div {...fade(inView.frequency)}>
              <Eyebrow>Recommended Schedule</Eyebrow>
              <h2 className="text-teal-deep text-3xl md:text-4xl font-extrabold tracking-tight leading-tight mb-4">
                How Often Should Your Office Be Professionally Cleaned?
              </h2>
              <p className="text-slate-teal/75 text-base leading-relaxed">
                If this question comes to your mind, the basic answer is - as often as you feel
                your office needs it or whenever you start feeling your workspace is dirty.
                However, if we make a framework, it depends on your office type, team size, and
                the nature of your work.
              </p>
            </motion.div>
            <motion.div {...fade(inView.frequency, 0.1)} className="relative rounded-3xl overflow-hidden aspect-[4/3] border border-mist shadow-lg">
              <Image
                src="/img/office_cleaning_Delhi/7.webp"
                alt="Regularly maintained clean office workspace in Delhi NCR"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>

          <motion.div {...fade(inView.frequency, 0.05)} className="rounded-2xl overflow-hidden border border-mist shadow-sm bg-ivory">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-teal-deep text-ivory">
                  <th className="px-5 py-3.5 font-semibold">Office Type</th>
                  <th className="px-5 py-3.5 font-semibold">Recommended Frequency</th>
                </tr>
              </thead>
              <tbody>
                {frequencyRows.map((row, i) => (
                  <tr key={row[0]} className={i % 2 ? "bg-ivory-teal" : "bg-ivory"}>
                    <td className="px-5 py-3.5 font-semibold text-teal-deep">{row[0]}</td>
                    <td className="px-5 py-3.5 text-slate-teal/75">{row[1]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>

          <motion.p {...fade(inView.frequency, 0.1)} className="mt-8 text-slate-teal/80 text-base leading-relaxed max-w-3xl">
            For most Delhi NCR offices, regular cleaning 2-3 times a week and a quarterly deep
            clean cover the basic hygiene standards that would keep your office up to your
            employees' satisfaction, clients' expectations, and manage your office most
            efficiently.
          </motion.p>

          <CtaRow primary="Book a cleaning contract" secondary="Request a callback" secondaryHref={WA_LINK} />
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────────────────────── */}
      <section ref={refs.faq} className="bg-ivory py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <motion.div {...fade(inView.faq)} className="mb-12 text-center">
            <Eyebrow>Questions Answered</Eyebrow>
            <h2 className="text-teal-deep text-3xl md:text-4xl font-extrabold tracking-tight leading-tight">
              Frequently Asked Questions
            </h2>
          </motion.div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={faq.q}
                {...fade(inView.faq, 0.02 * i)}
                className="border border-mist rounded-2xl overflow-hidden bg-ivory-teal"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="text-teal-deep font-semibold text-base">{faq.q}</span>
                  <ChevronDown
                    size={18}
                    className={`text-teal shrink-0 transition-transform ${
                      openFaq === i ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openFaq === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    className="px-6 pb-5"
                  >
                    <p className="text-slate-teal/75 text-sm leading-relaxed">{faq.a}</p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ──────────────────────────────────────────────────────── */}
      <section ref={refs.cta} className="bg-teal-deep teal-texture py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div {...fade(inView.cta)}>
              <Eyebrow light>Get Started</Eyebrow>
              <h2 className="text-ivory text-3xl md:text-4xl font-extrabold tracking-tight leading-tight mb-6">
                Book Your Office Cleaning Assessment Today
              </h2>
              <div className="space-y-4 text-stone-teal/75 text-base leading-relaxed mb-8">
                <p>
                  Your office is where your business happens, where clients form first
                  impressions, and where employees spend their working lives. The culture of
                  your office is reflected by its cleanliness.
                </p>
                <p>
                  The standard of cleaning should match the standard of your business. Our
                  professional office cleaning services cover full Delhi NCR - Delhi, Noida,
                  Gurgaon, Faridabad, and Ghaziabad. We will provide the staff, the equipment,
                  and flexibility in scheduling. We provide the missing part in your work life;
                  we provide comfort.
                </p>
              </div>

              <div className="flex flex-wrap gap-3 mb-8">
                <a
                  href={WA_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 btn-copper text-sm px-6 py-3.5"
                >
                  <Sparkles size={16} /> Contact today for an instant quote
                </a>
                <a
                  href={PHONE}
                  className="inline-flex items-center gap-2 text-sm px-6 py-3.5 border border-teal/40 text-teal-light rounded-lg hover:bg-teal/10 transition-colors"
                >
                  <ClipboardCheck size={15} /> Schedule site inspection
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

              <div className="flex flex-wrap gap-x-6 gap-y-2">
                {[
                  "Trained, certified team",
                  "Flexible scheduling",
                  "Transparent pricing",
                  "Full Delhi NCR coverage",
                ].map((f) => (
                  <span key={f} className="inline-flex items-center gap-1.5 text-stone-teal/80 text-sm">
                    <CheckCircle2 size={15} className="text-teal-light" /> {f}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div {...fade(inView.cta, 0.1)}>
              <div className="relative rounded-3xl overflow-hidden aspect-[4/3] border border-teal/20 shadow-2xl shadow-black/40 mb-6">
                <Image
                  src="/img/office_cleaning_Delhi/4.webp"
                  alt="Book office cleaning assessment in Delhi NCR"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-teal-deep/60 to-transparent" />
              </div>
              <div className="bg-teal-dark/60 border border-teal/15 rounded-2xl p-6 grid sm:grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-teal-light text-xs uppercase tracking-wide mb-1">Phone</p>
                  <a href={PHONE} className="text-ivory font-bold hover:text-teal-light transition-colors">
                    {PHONE_DISPLAY}
                  </a>
                </div>
                <div>
                  <p className="text-teal-light text-xs uppercase tracking-wide mb-1">WhatsApp</p>
                  <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="text-ivory font-bold hover:text-teal-light transition-colors">
                    {PHONE_DISPLAY}
                  </a>
                </div>
                <div>
                  <p className="text-teal-light text-xs uppercase tracking-wide mb-1">Schedule</p>
                  <p className="text-ivory font-bold">24-hour, 7 days a week</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
