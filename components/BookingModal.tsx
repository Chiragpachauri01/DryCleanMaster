"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X, CalendarCheck, Clock, MapPin, CheckCircle,
  Sofa, SprayCan, Bed, Layers, Car, Sparkles,
} from "lucide-react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

const services = [
  { value: "Sofa Dry Cleaning",     icon: Sofa },
  { value: "Carpet Dry Cleaning",   icon: Layers },
  { value: "Mattress Dry Cleaning", icon: Bed },
  { value: "Curtain Dry Cleaning",  icon: SprayCan },
  { value: "Car Interior Cleaning", icon: Car },
  { value: "Other / Multiple",      icon: Sparkles },
];

const timeSlots = [
  { label: "Morning",   sub: "9–12 pm" },
  { label: "Afternoon", sub: "12–4 pm" },
  { label: "Evening",   sub: "4–7 pm" },
];

const todayISO = new Date().toISOString().split("T")[0];

type FormState = {
  name: string; phone: string; email: string;
  service: string; date: string; timeSlot: string;
  address: string; notes: string;
};

const emptyForm: FormState = {
  name: "", phone: "", email: "",
  service: "", date: "", timeSlot: "",
  address: "", notes: "",
};

const inputCls =
  "w-full font-sans text-sm text-charcoal placeholder:text-slate-teal/30 " +
  "border border-stone-teal/35 rounded-lg px-4 py-2.5 bg-ivory-warm shadow-sm " +
  "focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/25 focus:bg-white transition-all duration-200";

const labelCls =
  "font-sans text-[11px] text-slate-teal/55 uppercase tracking-[0.1em] font-semibold mb-1.5 block";

interface BookingModalProps {
  open: boolean;
  onClose: () => void;
}

export default function BookingModal({ open, onClose }: BookingModalProps) {
  const [form, setForm] = useState<FormState>(emptyForm);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // lock body scroll while open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // reset on close
  useEffect(() => {
    if (!open) {
      setTimeout(() => { setForm(emptyForm); setSubmitted(false); setError(""); }, 300);
    }
  }, [open]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await addDoc(collection(db, "bookings"), { ...form, createdAt: serverTimestamp() });
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "booking", ...form }),
      });
      if (!res.ok) throw new Error("email failed");
      setSubmitted(true);
    } catch (err) {
      console.error("[booking-modal]", err);
      setError("Booking saved! But confirmation email failed — we'll call you shortly.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] bg-teal-deep/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none"
          >
            <div
              className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Colour bar */}
              <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-teal via-copper-light to-teal-deep rounded-t-2xl" />

              {/* Header */}
              <div className="flex items-start justify-between px-6 pt-6 pb-4">
                <div>
                  <p className="font-sans text-copper text-[10px] uppercase tracking-[0.18em] font-semibold mb-0.5">
                    Schedule a Visit
                  </p>
                  <h2 className="font-serif text-teal-deep text-xl font-bold leading-tight">
                    Book Your Cleaning Visit
                  </h2>
                </div>
                <button
                  onClick={onClose}
                  className="ml-4 p-1.5 rounded-lg text-slate-teal/50 hover:text-teal hover:bg-teal/8 transition-colors duration-150 shrink-0"
                  aria-label="Close"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="px-6 pb-6">
                {submitted ? (
                  <div className="flex flex-col items-center text-center py-8 gap-4">
                    <div className="w-14 h-14 rounded-full bg-teal/10 border border-teal/30 flex items-center justify-center">
                      <CheckCircle size={26} className="text-teal" />
                    </div>
                    <div>
                      <h3 className="font-serif text-teal-deep text-xl font-bold mb-1.5">
                        Booking Confirmed!
                      </h3>
                      <p className="font-sans text-slate-teal/60 text-sm max-w-xs">
                        We&apos;ve received your booking for{" "}
                        <span className="font-semibold text-charcoal">{form.service || "your service"}</span>{" "}
                        on <span className="font-semibold text-charcoal">{form.date}</span>.
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
                  <form onSubmit={handleSubmit} className="space-y-4">

                    {/* Service picker */}
                    <div>
                      <label className={labelCls}>
                        Service Required <span className="text-copper">*</span>
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {services.map(({ value, icon: Icon }) => {
                          const active = form.service === value;
                          return (
                            <button
                              key={value}
                              type="button"
                              onClick={() => setForm((p) => ({ ...p, service: value }))}
                              className={`flex items-center gap-2 px-2.5 py-2 rounded-xl border text-left transition-all duration-200 ${
                                active
                                  ? "border-teal bg-teal/8 text-teal"
                                  : "border-stone-teal/25 bg-ivory text-slate-teal/70 hover:border-teal/40 hover:bg-teal/5"
                              }`}
                            >
                              <Icon size={13} className={active ? "text-teal shrink-0" : "text-slate-teal/40 shrink-0"} />
                              <span className="font-sans text-xs font-semibold leading-snug">{value}</span>
                            </button>
                          );
                        })}
                      </div>
                      <input type="text" name="service" value={form.service} required readOnly className="sr-only" tabIndex={-1} />
                    </div>

                    {/* Name + Phone */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className={labelCls}>Full Name <span className="text-copper">*</span></label>
                        <input name="name" value={form.name} onChange={handleChange} required placeholder="Rahul Sharma" className={inputCls} />
                      </div>
                      <div>
                        <label className={labelCls}>Phone <span className="text-copper">*</span></label>
                        <input name="phone" value={form.phone} onChange={handleChange} required type="tel" placeholder="+91 98765 43210" className={inputCls} />
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label className={labelCls}>Email <span className="text-copper">*</span></label>
                      <input name="email" value={form.email} onChange={handleChange} required type="email" placeholder="rahul@example.com" className={inputCls} />
                    </div>

                    {/* Date + Time */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className={labelCls}>
                          <CalendarCheck size={11} className="inline mr-1 mb-0.5" />
                          Date <span className="text-copper">*</span>
                        </label>
                        <input name="date" value={form.date} onChange={handleChange} required type="date" min={todayISO} className={inputCls} />
                      </div>
                      <div>
                        <label className={labelCls}>
                          <Clock size={11} className="inline mr-1 mb-0.5" />
                          Time Slot <span className="text-copper">*</span>
                        </label>
                        <div className="flex gap-1.5 h-[42px]">
                          {timeSlots.map(({ label, sub }) => {
                            const active = form.timeSlot === label;
                            return (
                              <button
                                key={label}
                                type="button"
                                onClick={() => setForm((p) => ({ ...p, timeSlot: label }))}
                                className={`flex-1 flex flex-col items-center justify-center rounded-lg border text-center transition-all duration-200 ${
                                  active
                                    ? "border-teal bg-teal/8 text-teal"
                                    : "border-stone-teal/25 bg-ivory text-slate-teal/60 hover:border-teal/40"
                                }`}
                              >
                                <span className="font-sans text-[9px] font-bold leading-none">{label}</span>
                                <span className="font-sans text-[8px] opacity-60 leading-none mt-0.5">{sub}</span>
                              </button>
                            );
                          })}
                        </div>
                        <input type="text" name="timeSlot" value={form.timeSlot} required readOnly className="sr-only" tabIndex={-1} />
                      </div>
                    </div>

                    {/* Address */}
                    <div>
                      <label className={labelCls}>
                        <MapPin size={11} className="inline mr-1 mb-0.5" />
                        Address / Locality <span className="text-copper">*</span>
                      </label>
                      <input name="address" value={form.address} onChange={handleChange} required placeholder="e.g. Sector 18, Noida or South Extension, Delhi" className={inputCls} />
                    </div>

                    {/* Notes */}
                    <div>
                      <label className={labelCls}>Special Instructions</label>
                      <textarea name="notes" value={form.notes} onChange={handleChange} rows={2} placeholder="Fabric type, stain details, floor number…" className={inputCls + " resize-none"} />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full btn-primary flex items-center justify-center gap-2 py-3.5 font-sans font-semibold text-sm disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      <CalendarCheck size={15} />
                      {loading ? "Booking…" : "Confirm Booking"}
                    </button>

                    {error && (
                      <p className="font-sans text-center text-copper text-xs leading-relaxed">{error}</p>
                    )}

                    <p className="font-sans text-center text-slate-teal/40 text-xs">
                      No payment now — our team will confirm and share the quote.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
