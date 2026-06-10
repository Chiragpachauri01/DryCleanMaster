"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  CalendarCheck, Clock, MapPin, CheckCircle,
  Sofa, SprayCan, Bed, Layers, Car, Sparkles,
} from "lucide-react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

const services = [
  { value: "Sofa Dry Cleaning",     icon: Sofa },
  { value: "Carpet Dry Cleaning",   icon: Layers },
  { value: "Mattress Dry Cleaning", icon: Bed },
  { value: "Curtain Dry Cleaning",  icon: SprayCan },
  { value: "Other / Multiple",      icon: Sparkles },
];

const timeSlots = [
  { label: "Morning",   sub: "9 am – 12 pm" },
  { label: "Afternoon", sub: "12 pm – 4 pm" },
  { label: "Evening",   sub: "4 pm – 7 pm" },
];

const benefits = [
  { text: "In-Person Visit" },
  { text: "No hidden charges — transparent pricing" },
  { text: "Same-day service available" },
  { text: "Eco-safe, odourless solvents" },
  { text: "12,000+ families served in Delhi NCR" },
];

const todayISO = new Date().toISOString().split("T")[0];

type FormState = {
  name: string;
  phone: string;
  email: string;
  service: string;
  date: string;
  timeSlot: string;
  address: string;
  notes: string;
};

const emptyForm: FormState = {
  name: "", phone: "", email: "",
  service: "", date: "", timeSlot: "",
  address: "", notes: "",
};

const inputCls =
  "w-full font-sans text-sm text-charcoal placeholder:text-slate-teal/30 " +
  "border border-stone-teal/35 rounded-lg px-4 py-3 bg-ivory-warm shadow-sm " +
  "focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/25 focus:bg-white transition-all duration-200";

const labelCls =
  "font-sans text-[11px] text-slate-teal/55 uppercase tracking-[0.1em] font-semibold mb-1.5 block";

export default function HomeContactForm() {
  const [form, setForm] = useState<FormState>(emptyForm);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function setTimeSlot(slot: string) {
    setForm((prev) => ({ ...prev, timeSlot: slot }));
  }

  function setService(value: string) {
    setForm((prev) => ({ ...prev, service: value }));
  }

  async function handleSubmit(e: React.BaseSyntheticEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await addDoc(collection(db, "bookings"), {
        ...form,
        createdAt: serverTimestamp(),
      });
      const emailResponse = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "booking", ...form }),
      });

      if (!emailResponse.ok) {
        throw new Error("Email confirmation failed");
      }

      setSubmitted(true);
    } catch (err) {
      console.error("[booking-submit]", err);
      setError("We saved your booking, but the confirmation email could not be sent. Please call or WhatsApp us if you do not hear from us shortly.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="booking" className="bg-ivory-teal py-12 md:py-28 teal-texture">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">

        {/* Section header */}
        <div className="text-center mb-8 md:mb-12">
          <span className="inline-flex items-center gap-2 mb-4">
            <span className="w-5 h-[2px] bg-copper rounded-full" />
            <span className="text-copper font-sans text-xs uppercase tracking-[0.2em] font-semibold">
              Schedule a Visit
            </span>
            <span className="w-5 h-[2px] bg-copper rounded-full" />
          </span>
          <h2 className="font-serif text-teal-deep text-3xl md:text-4xl xl:text-5xl font-bold leading-[1.1] mb-3">
            Book Your{" "}
            <span className="italic font-normal text-slate-teal/50">Cleaning</span>{" "}
            <span className="text-teal">Visit</span>
          </h2>
          <p className="font-sans text-slate-teal/55 text-sm max-w-md mx-auto">
            Pick a service, choose a slot, and we&apos;ll confirm within minutes.
            Serving all of Delhi NCR — no travel fee.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1fr_1.75fr] gap-5 md:gap-8 xl:gap-14 items-start">

          {/* ── Left: dark info panel ── */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-teal-deep rounded-2xl p-5 md:p-10 text-ivory-warm"
          >
            <div className="w-11 h-11 md:w-12 md:h-12 rounded-xl bg-teal/20 border border-teal/30 flex items-center justify-center mb-4 md:mb-6">
              <CalendarCheck size={22} className="text-teal-glow" />
            </div>
            <h3 className="font-serif text-2xl font-bold mb-2">
              Why Book With Us?
            </h3>
            <p className="font-sans text-stone-teal/55 text-sm mb-5 md:mb-8 leading-relaxed">
              Professional furnishing care at your doorstep. No guesswork, no hassle.
            </p>

            <ul className="space-y-3 md:space-y-4 mb-6 md:mb-10">
              {benefits.map(({ text }) => (
                <li key={text} className="flex items-start gap-3">
                  <span className="mt-[3px] w-4 h-4 rounded-full bg-copper/20 border border-copper/40 flex items-center justify-center shrink-0">
                    <CheckCircle size={10} className="text-copper-light" />
                  </span>
                  <span className="font-sans text-sm text-stone-teal/75">{text}</span>
                </li>
              ))}
            </ul>

            {/* trust strip */}
            <div className="border-t border-white/10 pt-4 md:pt-6 flex items-center gap-3">
              <div className="flex -space-x-2">
                {["S", "P", "R", "N"].map((initial, i) => (
                  <div
                    key={i}
                    className={`w-7 h-7 rounded-full border-2 border-teal-deep flex items-center justify-center text-[10px] font-semibold text-white ${
                      ["bg-teal", "bg-copper", "bg-teal-mid", "bg-slate-teal"][i]
                    }`}
                  >
                    {initial}
                  </div>
                ))}
              </div>
              <p className="font-sans text-xs text-stone-teal/55">
                <span className="text-ivory-warm font-semibold">12,000+</span> happy customers
              </p>
            </div>
          </motion.div>

          {/* ── Right: booking form ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="relative overflow-hidden bg-white border-2 border-teal/35 rounded-2xl shadow-2xl shadow-teal/18 p-4 pt-6 md:p-10"
          >
            <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-teal via-copper-light to-teal-deep" />
            <div className="mb-4 md:mb-7 rounded-xl border border-teal/20 bg-ivory-teal px-4 md:px-5 py-3 md:py-4">
              <p className="font-sans text-copper text-[11px] uppercase tracking-[0.18em] font-semibold mb-1">
                Booking Form
              </p>
              <h3 className="font-serif text-teal-deep text-2xl font-bold leading-tight">
                Tell us what needs cleaning
              </h3>
            </div>
            {submitted ? (
              <div className="flex flex-col items-center text-center py-10 gap-5">
                <div className="w-16 h-16 rounded-full bg-teal/10 border border-teal/30 flex items-center justify-center">
                  <CheckCircle size={30} className="text-teal" />
                </div>
                <div>
                  <h3 className="font-serif text-teal-deep text-2xl font-bold mb-2">
                    Booking Confirmed!
                  </h3>
                  <p className="font-sans text-slate-teal/60 text-sm max-w-xs">
                    We&apos;ve received your booking for{" "}
                    <span className="font-semibold text-charcoal">{form.service || "your service"}</span>{" "}
                    on{" "}
                    <span className="font-semibold text-charcoal">{form.date}</span>.
                    Our team will call you shortly to confirm.
                  </p>
                </div>
                <button
                  onClick={() => { setSubmitted(false); setForm(emptyForm); }}
                  className="font-sans text-xs text-teal hover:text-teal-mid font-semibold transition-colors duration-200"
                >
                  Book another visit
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">

                {/* Service picker */}
                <div>
                  <label className={labelCls}>
                    Service Required <span className="text-copper">*</span>
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 md:gap-2.5">
                    {services.map(({ value, icon: Icon }) => {
                      const active = form.service === value;
                      return (
                        <button
                          key={value}
                          type="button"
                          onClick={() => setService(value)}
                          className={`flex items-center gap-2 px-2.5 md:px-3 py-2 md:py-2.5 rounded-xl border text-left transition-all duration-200 ${
                            active
                              ? "border-teal bg-teal/8 text-teal"
                              : "border-stone-teal/25 bg-ivory text-slate-teal/70 hover:border-teal/40 hover:bg-teal/5"
                          }`}
                        >
                          <Icon size={14} className={active ? "text-teal shrink-0" : "text-slate-teal/40 shrink-0"} />
                          <span className="font-sans text-xs font-semibold leading-snug">{value}</span>
                        </button>
                      );
                    })}
                  </div>
                  {/* hidden required input for native validation */}
                  <input
                    type="text"
                    name="service"
                    value={form.service}
                    required
                    readOnly
                    className="sr-only"
                    tabIndex={-1}
                  />
                </div>

                {/* Name + Phone */}
                <div className="grid sm:grid-cols-2 gap-3 md:gap-4">
                  <div>
                    <label className={labelCls}>
                      Full Name <span className="text-copper">*</span>
                    </label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="Rahul Sharma"
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label className={labelCls}>
                      Phone Number <span className="text-copper">*</span>
                    </label>
                    <input
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      required
                      type="tel"
                      placeholder="+91 98765 43210"
                      className={inputCls}
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className={labelCls}>
                    Email Address <span className="text-copper">*</span>
                  </label>
                  <input
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    type="email"
                    placeholder="rahul@example.com"
                    className={inputCls}
                  />
                </div>

                {/* Date + Time */}
                <div className="grid sm:grid-cols-2 gap-3 md:gap-4">
                  <div>
                    <label className={labelCls}>
                      <CalendarCheck size={11} className="inline mr-1 mb-0.5" />
                      Preferred Date <span className="text-copper">*</span>
                    </label>
                    <input
                      name="date"
                      value={form.date}
                      onChange={handleChange}
                      required
                      type="date"
                      min={todayISO}
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label className={labelCls}>
                      <Clock size={11} className="inline mr-1 mb-0.5" />
                      Time Slot <span className="text-copper">*</span>
                    </label>
                    <div className="flex gap-2 h-[46px]">
                      {timeSlots.map(({ label, sub }) => {
                        const active = form.timeSlot === label;
                        return (
                          <button
                            key={label}
                            type="button"
                            onClick={() => setTimeSlot(label)}
                            className={`flex-1 flex flex-col items-center justify-center rounded-lg border text-center transition-all duration-200 ${
                              active
                                ? "border-teal bg-teal/8 text-teal"
                                : "border-stone-teal/25 bg-ivory text-slate-teal/60 hover:border-teal/40"
                            }`}
                          >
                            <span className="font-sans text-[10px] font-bold leading-none">{label}</span>
                            <span className="font-sans text-[9px] opacity-60 leading-none mt-0.5">{sub}</span>
                          </button>
                        );
                      })}
                    </div>
                    <input
                      type="text"
                      name="timeSlot"
                      value={form.timeSlot}
                      required
                      readOnly
                      className="sr-only"
                      tabIndex={-1}
                    />
                  </div>
                </div>

                {/* Address */}
                <div>
                  <label className={labelCls}>
                    <MapPin size={11} className="inline mr-1 mb-0.5" />
                    Address / Locality <span className="text-copper">*</span>
                  </label>
                  <input
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    required
                    placeholder="e.g. Sector 18, Noida or South Extension, Delhi"
                    className={inputCls}
                  />
                </div>

                {/* Notes */}
                <div>
                  <label className={labelCls}>Special Instructions</label>
                  <textarea
                    name="notes"
                    value={form.notes}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Fabric type, stain details, floor number, access instructions…"
                    className={inputCls + " resize-none"}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full btn-primary flex items-center justify-center gap-2.5 py-4 font-sans font-semibold text-sm disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <CalendarCheck size={16} />
                  {loading ? "Booking…" : "Confirm Booking"}
                </button>

                {error && (
                  <p className="font-sans text-center text-copper text-xs leading-relaxed">
                    {error}
                  </p>
                )}

                <p className="font-sans text-center text-slate-teal/40 text-xs">
                  No payment now — our team will confirm and share the quote.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
