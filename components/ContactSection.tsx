"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Phone, Mail, MessageCircle, MapPin, Clock, Send, CheckCircle } from "lucide-react";

const WA_NUMBER = "918449008612";
const WA_LINK = `https://wa.me/${WA_NUMBER}`;

const services = [
  "Sofa Dry Cleaning",
  "Carpet Dry Cleaning",
  "Mattress Dry Cleaning",
  "Curtain Dry Cleaning",
  "Car Interior Cleaning",
  "Wet / Shampoo Cleaning",
  "Commercial Cleaning",
  "Stain & Odour Removal",
  "Other",
];

const contactCards = [
  {
    icon: Phone,
    label: "Call Us",
    value: "+91 8882631413",
    href: "tel:+918882631413",
    color: "teal",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "Chat with Us Now",
    href: WA_LINK,
    color: "green",
    external: true,
  },
  {
    icon: Mail,
    label: "Email",
    value: "info@drycleanmasters.com",
    href: "mailto:info@drycleanmasters.com",
    color: "copper",
  },
  {
    icon: Clock,
    label: "Working Hours",
    value: "7 AM – 10 PM Daily",
    href: null,
    color: "teal",
  },
];

export default function ContactSection() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const text = [
      `Hi, I'd like to enquire about your cleaning services.`,
      `*Name:* ${form.name}`,
      `*Phone:* ${form.phone}`,
      form.email ? `*Email:* ${form.email}` : null,
      form.service ? `*Service Needed:* ${form.service}` : null,
      form.message ? `*Message:* ${form.message}` : null,
    ]
      .filter(Boolean)
      .join("\n");

    window.open(
      `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`,
      "_blank"
    );
    setSubmitted(true);
  }

  return (
    <>
      {/* Hero banner */}
      <section className="relative bg-teal-deep pt-24 pb-16 overflow-hidden">
        <Image
          src="/img/Banner Images/1.webp"
          alt="Dry Clean Masters technician at work"
          fill
          sizes="100vw"
          className="object-cover object-center opacity-25"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-teal-deep/60 via-teal-deep/50 to-teal-deep/80" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 lg:px-12 text-center">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="inline-flex items-center gap-2 mb-5 justify-center"
          >
            <span className="w-5 h-[2px] bg-copper rounded-full" />
            <span className="text-copper font-sans text-xs uppercase tracking-[0.2em] font-semibold">
              Get In Touch
            </span>
            <span className="w-5 h-[2px] bg-copper rounded-full" />
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="font-serif text-ivory-warm text-4xl md:text-5xl xl:text-6xl font-bold leading-[1.1] mb-4"
          >
            Contact
            <br />
            <span className="italic font-normal text-stone-teal/55">Dry Clean</span>{" "}
            <span className="text-teal-glow">Masters</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
            className="font-sans text-stone-teal/60 text-base max-w-xl mx-auto"
          >
            Book an inspection, ask about pricing, or just say hello. We&apos;re
            available 7 AM – 10 PM every day across Delhi NCR.
          </motion.p>
        </div>
      </section>

      {/* Bottom copper accent */}
      <div className="h-[3px] bg-gradient-to-r from-transparent via-copper to-transparent" />

      {/* Main content */}
      <section className="bg-ivory py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
          <div className="grid lg:grid-cols-[1fr_1.4fr] gap-12 xl:gap-20">

            {/* Left: contact info */}
            <div>
              <h2 className="font-serif text-teal-deep text-2xl md:text-3xl font-bold mb-2">
                Reach Us Directly
              </h2>
              <p className="font-sans text-slate-teal/60 text-sm mb-8 leading-relaxed">
                Prefer calling or chatting? Use any of the channels below —
                our team responds within minutes.
              </p>

              <div className="space-y-5 mb-10">
                {contactCards.map(({ icon: Icon, label, value, href, color, external }) => {
                  const colorMap: Record<string, string> = {
                    teal: "border-teal/20 bg-teal/8 group-hover:border-teal/40 group-hover:bg-teal/15",
                    green: "border-[#16A34A]/25 bg-[#16A34A]/8 group-hover:border-[#16A34A]/45 group-hover:bg-[#16A34A]/15",
                    copper: "border-copper/25 bg-copper/8 group-hover:border-copper/45 group-hover:bg-copper/15",
                  };
                  const iconColorMap: Record<string, string> = {
                    teal: "text-teal group-hover:text-teal-mid",
                    green: "text-[#16A34A]",
                    copper: "text-copper group-hover:text-copper-light",
                  };
                  const content = (
                    <div className={`group flex items-center gap-4 mb-4 p-4 rounded-xl border transition-all duration-200 ${colorMap[color]}`}>
                      <div className={`w-11 h-11 rounded-xl border ${colorMap[color]} flex items-center justify-center shrink-0`}>
                        <Icon size={18} className={iconColorMap[color]} />
                      </div>
                      <div>
                        <p className="font-sans text-slate-teal/50 text-[11px] uppercase tracking-[0.12em]">
                          {label}
                        </p>
                        <p className="font-sans text-charcoal text-sm font-semibold">
                          {value}
                        </p>
                      </div>
                    </div>
                  );

                  return href ? (
                    <a
                      key={label}
                      href={href}
                      target={external ? "_blank" : undefined}
                      rel={external ? "noopener noreferrer" : undefined}
                    >
                      {content}
                    </a>
                  ) : (
                    <div key={label}>{content}</div>
                  );
                })}
              </div>

              {/* Social media */}
              <div className="mb-6">
                <p className="font-sans text-xs text-slate-teal/50 uppercase tracking-[0.12em] font-semibold mb-3">
                  Follow Us
                </p>
                <div className="flex items-center gap-3">
                  <a
                    href="https://www.facebook.com/DryCleanMasters/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl border border-[#1877F2]/40 bg-[#1877F2]/10 text-[#1877F2] hover:bg-[#1877F2]/20 hover:border-[#1877F2]/60 transition-all duration-200"
                    aria-label="Facebook"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                    </svg>
                    <span className="font-sans text-xs font-semibold">Facebook</span>
                  </a>
                  <a
                    href="https://www.instagram.com/drycleanmasters/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl border border-[#E1306C]/40 bg-[#E1306C]/10 text-[#E1306C] hover:bg-[#E1306C]/20 hover:border-[#E1306C]/60 transition-all duration-200"
                    aria-label="Instagram"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                      <circle cx="12" cy="12" r="4" />
                      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                    </svg>
                    <span className="font-sans text-xs font-semibold">Instagram</span>
                  </a>
                </div>
              </div>

              {/* Location */}
              <div className="rounded-xl border border-stone-teal/25 overflow-hidden">
                <div className="bg-mist px-5 py-3 flex items-center gap-2">
                  <MapPin size={13} className="text-teal" />
                  <span className="font-sans text-teal text-xs font-semibold uppercase tracking-[0.12em]">
                    Service Area
                  </span>
                </div>
                <div className="px-5 py-4">
                  <p className="font-sans text-charcoal/80 text-sm font-semibold mb-1">
                    Serving All of Delhi NCR
                  </p>
                  <p className="font-sans text-slate-teal/55 text-xs leading-relaxed mb-3">
                    South Delhi · North Delhi · East Delhi · West Delhi ·
                    Gurgaon · Noida · Faridabad · Ghaziabad
                  </p>
                  <a
                    href="https://maps.app.goo.gl/WWBookpmg5rhxuma6"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-sans text-xs font-semibold text-teal hover:text-teal-mid transition-colors duration-200"
                  >
                    <MapPin size={11} />
                    View on Google Maps
                  </a>
                </div>
              </div>
            </div>

            {/* Right: form */}
            <div className="bg-white border border-stone-teal/20 rounded-2xl shadow-sm shadow-teal/8 p-8 md:p-10">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center h-full text-center py-10"
                >
                  <div className="w-16 h-16 rounded-full bg-teal/12 border border-teal/30 flex items-center justify-center mb-5">
                    <CheckCircle size={28} className="text-teal" />
                  </div>
                  <h3 className="font-serif text-teal-deep text-2xl font-bold mb-2">
                    Message Sent!
                  </h3>
                  <p className="font-sans text-slate-teal/60 text-sm max-w-xs">
                    Your WhatsApp chat has opened. We&apos;ll get back to you
                    within a few minutes.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setForm({ name: "", phone: "", email: "", service: "", message: "" }); }}
                    className="mt-6 font-sans text-sm text-teal hover:text-teal-mid font-semibold transition-colors duration-200"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <>
                  <h2 className="font-serif text-teal-deep text-2xl font-bold mb-1">
                    Send Us a Message
                  </h2>
                  <p className="font-sans text-slate-teal/55 text-sm mb-7">
                    Fill in the form and we&apos;ll reply via WhatsApp instantly.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-3">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="font-sans text-xs text-slate-teal/60 uppercase tracking-[0.1em] font-semibold mb-1.5 block">
                          Full Name <span className="text-copper">*</span>
                        </label>
                        <input
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          required
                          placeholder="Rahul Sharma"
                          className="w-full font-sans text-sm text-charcoal placeholder:text-slate-teal/30 border border-stone-teal/30 rounded-lg px-4 py-3 focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/15 transition-all duration-200 bg-ivory"
                        />
                      </div>
                      <div>
                        <label className="font-sans text-xs text-slate-teal/60 uppercase tracking-[0.1em] font-semibold mb-1.5 block">
                          Phone Number <span className="text-copper">*</span>
                        </label>
                        <input
                          name="phone"
                          value={form.phone}
                          onChange={handleChange}
                          required
                          type="tel"
                          placeholder="+91 98765 43210"
                          className="w-full font-sans text-sm text-charcoal placeholder:text-slate-teal/30 border border-stone-teal/30 rounded-lg px-4 py-3 focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/15 transition-all duration-200 bg-ivory"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="font-sans text-xs text-slate-teal/60 uppercase tracking-[0.1em] font-semibold mb-1.5 block">
                        Email Address
                      </label>
                      <input
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        type="email"
                        placeholder="rahul@example.com"
                        className="w-full font-sans text-sm text-charcoal placeholder:text-slate-teal/30 border border-stone-teal/30 rounded-lg px-4 py-3 focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/15 transition-all duration-200 bg-ivory"
                      />
                    </div>

                    <div>
                      <label className="font-sans text-xs text-slate-teal/60 uppercase tracking-[0.1em] font-semibold mb-1.5 block">
                        Service Needed
                      </label>
                      <select
                        name="service"
                        value={form.service}
                        onChange={handleChange}
                        className="w-full font-sans text-sm text-charcoal border border-stone-teal/30 rounded-lg px-4 py-3 focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/15 transition-all duration-200 bg-ivory appearance-none"
                      >
                        <option value="">Select a service…</option>
                        {services.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="font-sans text-xs text-slate-teal/60 uppercase tracking-[0.1em] font-semibold mb-1.5 block">
                        Message
                      </label>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        rows={4}
                        placeholder="Tell us about your furnishings, any stains, or specific concerns…"
                        className="w-full font-sans text-sm text-charcoal placeholder:text-slate-teal/30 border border-stone-teal/30 rounded-lg px-4 py-3 focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/15 transition-all duration-200 bg-ivory resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full btn-primary flex items-center justify-center gap-2.5 py-3.5 font-sans font-semibold text-sm"
                    >
                      <Send size={15} />
                      Send via WhatsApp
                    </button>

                    <p className="font-sans text-center text-slate-teal/40 text-xs">
                      Submitting opens WhatsApp with your details pre-filled.
                    </p>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
