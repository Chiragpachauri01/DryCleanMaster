"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  Armchair,
  BadgeCheck,
  Building2,
  CalendarCheck,
  CheckCircle2,
  Clock,
  Home,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  SprayCan,
  Wind,
} from "lucide-react";

const WA_LINK =
  "https://wa.me/918882631413?text=Hi%2C%20I%20want%20to%20book%20a%20doorstep%20cleaning%20service";

const services = [
  {
    title: "Sofa Dry Cleaning",
    desc: "Deep cleaning for velvet, fabric, and leather sofas using moisture-controlled extraction that removes stains, dust, and odors while protecting color and texture.",
    icon: Armchair,
  },
  {
    title: "Carpet Dry Cleaning",
    desc: "Heavy-duty vacuuming and fiber-safe cleaning for luxury rugs and office carpets, removing embedded dust, pet dander, allergens, and tough stains.",
    icon: Sparkles,
  },
  {
    title: "Chair Dry Cleaning",
    desc: "A practical refresh for home and office seating, extracting sweat stains, accumulated dust, and bacteria from fabric and upholstered chairs.",
    icon: Building2,
  },
  {
    title: "Upholstery Dry Cleaning",
    desc: "Specialist care for custom cushions, fabric panels, and luxury interior upholstery without texture damage or color fading.",
    icon: SprayCan,
  },
  {
    title: "Mattress Dry Cleaning",
    desc: "Deep hygienic extraction for hidden dust mites, dead skin cells, and sweat odors so your family can sleep in a cleaner, safer room.",
    icon: ShieldCheck,
  },
  {
    title: "Curtain Dry Cleaning",
    desc: "No dismantling or unhooking hassle. We clean heavy silk, velvet, and cotton drapes directly on the rod to avoid shrinkage and handling damage.",
    icon: Wind,
  },
];

const reasons = [
  {
    title: "In-House Trained Staff",
    desc: "No random daily-wagers. We send background-verified, uniformed staff trained to handle expensive furniture with care.",
  },
  {
    title: "Zero-Shrinkage Curtain Care",
    desc: "We clean drapes directly on the rod with strong protection against fabric shrinkage, pulling, or handling damage.",
  },
  {
    title: "Quick-Dry Sofa Cleaning",
    desc: "No messy flooding or wet cushions. Smart extraction leaves furniture fresh and dry in about 2 hours.",
  },
  {
    title: "Allergy & Odor Protection",
    desc: "Our process pulls out hidden dust mites, bacteria, and stubborn sweat smells for fresher, healthier rooms.",
  },
  {
    title: "100% Fixed Pricing",
    desc: "The price quoted on WhatsApp or call is exactly what you pay at your doorstep, with no surprise billing.",
  },
  {
    title: "Same-Day Doorstep Service",
    desc: "For sudden spills or urgent cleaning, our active mobile team can reach your location within hours.",
  },
];

const highlights = [
  "Specialist care for sofas, carpets, chairs, curtains, mattresses, and upholstery",
  "Heavy-duty extraction machines for deeper dirt removal",
  "Surface-safe and eco-friendly cleaning solutions",
  "Doorstep service across Delhi, Noida, Gurgaon, and Ghaziabad",
];

export default function AboutPageContent() {
  return (
    <main>
      <section
        id="about"
        className="relative overflow-hidden bg-ivory-warm teal-texture py-16 md:py-24"
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
          <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65 }}
            >
              <span className="inline-flex items-center gap-2 mb-5">
                <span className="w-2 h-2 rounded-full bg-teal" />
                <span className="text-teal font-sans text-xs uppercase tracking-[0.2em] font-semibold">
                  The DryClean Masters Story
                </span>
              </span>

              <h1 className="font-serif text-teal-deep text-4xl md:text-5xl xl:text-6xl font-bold leading-[1.05] mb-5">
                No Shifting,
                <br />
                No Shrinkage
                <br />
                <span className="italic font-normal text-charcoal/45">
                  Premium Doorstep Care
                </span>
              </h1>

              <p className="font-sans text-slate-teal text-base md:text-lg leading-relaxed max-w-2xl mb-7">
                Bringing expert fabric care directly to homes and offices across
                Delhi-NCR, with trained professionals, industrial extraction
                machines, and surface-safe cleaning solutions.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={WA_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 btn-whatsapp font-sans text-sm px-6 py-3.5"
                >
                  <MessageCircle size={16} />
                  Book on WhatsApp
                </a>
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 btn-teal-ghost font-sans text-sm px-6 py-3.5"
                >
                  <CalendarCheck size={16} />
                  Contact Us
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.12 }}
              className="relative"
            >
              <div className="relative h-[360px] md:h-[460px] overflow-hidden rounded-2xl border border-mist shadow-xl shadow-teal/10">
                <Image
                  src="/img/about-restored-living-room.webp"
                  alt="Clean restored living room by DryClean Masters"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-teal-deep/55 via-transparent to-transparent" />
                <div className="absolute left-5 right-5 bottom-5 rounded-xl border border-teal-light/20 bg-teal-deep/80 backdrop-blur-md p-5">
                  <p className="font-sans text-stone-teal/60 text-xs uppercase tracking-[0.2em] mb-2">
                    Doorstep fabric care
                  </p>
                  <p className="font-serif text-ivory-warm text-2xl leading-tight">
                    Built for Delhi-NCR homes that need specialist care, not
                    generic washing.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="bg-ivory py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
          <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-12 lg:gap-16">
            <div>
              <span className="inline-flex items-center gap-2 mb-5">
                <span className="w-5 h-[2px] bg-teal rounded-full" />
                <span className="text-teal font-sans text-xs uppercase tracking-[0.2em] font-semibold">
                  Bringing Expert Fabric Care Directly to You
                </span>
              </span>
              <h2 className="font-serif text-teal-deep text-3xl md:text-4xl xl:text-5xl font-bold leading-[1.1]">
                A cleaner space,
                <br />
                <span className="italic font-normal text-charcoal/45">
                  without fabric risk
                </span>
              </h2>
            </div>

            <div className="space-y-5 font-sans text-slate-teal text-base leading-relaxed">
              <p>
                At DryClean Masters, we believe that a clean home or office is
                not just about appearances. It is about health, hygiene, and
                complete peace of mind. Our journey began with a clear purpose:
                to bridge the gap between proper fabric safety and absolute
                doorstep convenience for families and workspaces across Delhi,
                Noida, Gurgaon, and Ghaziabad.
              </p>
              <p>
                We noticed a regular problem in modern homes. People spend a lot
                of money on beautiful furnishings like velvet sofas, premium
                carpets, and heavy curtains, only to watch them get ruined by
                old-school wet washing or untrained local cleaners. Delhi-NCR did
                not need another generic booking app that sends random daily
                wagers to your house. It needed a dedicated specialist care team
                that stands by its words.
              </p>
              <p>
                That is why we built a proper team of cleaning professionals
                equipped with heavy-duty extraction machines and surface-safe,
                eco-friendly cleaning solutions. We do not make tall,
                unrealistic claims. We only promise what we can actually deliver
                on the ground.
              </p>

              <div className="grid sm:grid-cols-2 gap-3 pt-3">
                {highlights.map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 rounded-xl border border-mist bg-ivory-teal p-4"
                  >
                    <CheckCircle2 className="mt-0.5 text-teal shrink-0" size={17} />
                    <span className="text-sm text-slate-teal/80">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-teal-deep py-16 md:py-24 teal-texture">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
          <div className="grid lg:grid-cols-[1fr_1.1fr] gap-8 mb-12">
            <div>
              <span className="inline-flex items-center gap-2 mb-4">
                <span className="w-5 h-[2px] bg-copper rounded-full" />
                <span className="text-copper font-sans text-xs uppercase tracking-[0.2em] font-semibold">
                  Our Core Services
                </span>
              </span>
              <h2 className="font-serif text-ivory-warm text-3xl md:text-4xl xl:text-5xl font-bold leading-[1.1]">
                Specialist cleaning
                <br />
                <span className="italic font-normal text-stone-teal/45">
                  for valuable fabrics
                </span>
              </h2>
            </div>
            <p className="self-end font-sans text-stone-teal/60 text-sm md:text-base leading-relaxed border-l-[3px] border-copper/35 pl-5">
              Every service is designed around the same promise: deep cleaning,
              controlled moisture, careful handling, and a cleaner room without
              unnecessary shifting or fabric damage.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
            {services.map((service, index) => {
              const Icon = service.icon;

              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="group rounded-xl border border-teal/15 bg-teal-dark p-6 hover:bg-teal/20 hover:border-copper/35 transition-all duration-300"
                >
                  <div className="w-11 h-11 rounded-xl border border-copper/25 bg-copper/10 flex items-center justify-center mb-5">
                    <Icon size={20} className="text-copper-light" />
                  </div>
                  <h3 className="font-serif text-ivory-warm text-xl font-semibold mb-3">
                    {service.title}
                  </h3>
                  <p className="font-sans text-stone-teal/55 text-sm leading-relaxed">
                    {service.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-ivory-warm py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-flex items-center justify-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-teal" />
              <span className="text-teal font-sans text-xs uppercase tracking-[0.2em] font-semibold">
                Why Choose DryClean Masters
              </span>
            </span>
            <h2 className="font-serif text-teal-deep text-3xl md:text-4xl xl:text-5xl font-bold leading-[1.1]">
              Built for trust at your doorstep
            </h2>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
            {reasons.map((reason, index) => (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="rounded-xl border border-mist bg-ivory p-6 hover:border-teal/35 hover:shadow-lg hover:shadow-teal/10 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-lg bg-ivory-teal border border-mist flex items-center justify-center">
                    <BadgeCheck size={18} className="text-teal" />
                  </div>
                  <span className="font-serif text-copper text-xl">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="font-serif text-teal-deep text-xl font-semibold mb-3">
                  {reason.title}
                </h3>
                <p className="font-sans text-slate-teal/75 text-sm leading-relaxed">
                  {reason.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ivory py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
          <div className="rounded-2xl bg-teal-deep teal-texture border border-teal/15 p-7 md:p-10 lg:p-12 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 mb-4">
                <Home size={17} className="text-copper-light" />
                <span className="text-copper-light font-sans text-xs uppercase tracking-[0.2em] font-semibold">
                  Let Us Do the Heavy Lifting For You
                </span>
              </div>
              <h2 className="font-serif text-ivory-warm text-3xl md:text-4xl font-bold leading-tight mb-4">
                Festival prep, office hygiene, or allergy-safe bedrooms - we are
                one click away.
              </h2>
              <p className="font-sans text-stone-teal/60 text-sm md:text-base leading-relaxed">
                Whether you are protecting your kids from hidden mattress
                allergens, refreshing a corporate office, or preparing your home
                for guests, DryClean Masters brings specialist fabric care
                directly to your doorstep.
              </p>
            </div>
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 btn-whatsapp font-sans text-sm px-7 py-3.5 shrink-0"
            >
              <Clock size={16} />
              Book Same-Day Service
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
