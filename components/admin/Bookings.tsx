"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  addDoc, collection, deleteDoc, doc, getDocs,
  onSnapshot, orderBy, query, serverTimestamp, updateDoc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import {
  Bell, CheckCircle2, ChevronDown, Download, Filter,
  IndianRupee, Mail, Plus, RotateCcw, Search,
  Target, UserRoundCheck, Wallet, X, XCircle,
} from "lucide-react";
import { db } from "@/lib/firebase";
import { Modal } from "./Modal";
import PeriodFilter from "./PeriodFilter";
import {
  availableYears, filterBookings, getRange,
  money as formatMoney, summarize,
} from "@/lib/admin/analytics";

const statusStyles: Record<string, string> = {
  New: "bg-amber-50 text-amber-700 border-amber-200",
  Confirmed: "bg-teal-50 text-teal-700 border-teal-200",
  Completed: "bg-sky-50 text-sky-700 border-sky-200",
  Cancelled: "bg-red-50 text-red-700 border-red-200",
};

const money = (value: number | string | undefined) =>
  value === undefined || value === "" ? "-" : `₹ ${Number(value || 0).toLocaleString("en-IN")}`;

const isTestBooking = (booking: Record<string, unknown>) => /test|vendor/i.test((booking?.name as string) || "");

const DCM_SERVICE_OPTIONS = [
  { value: "sofa-dry-cleaning", label: "Sofa Dry Cleaning" },
  { value: "carpet-dry-cleaning", label: "Carpet Dry Cleaning" },
  { value: "mattress-dry-cleaning", label: "Mattress Dry Cleaning" },
  { value: "curtain-dry-cleaning", label: "Curtain Dry Cleaning" },
  { value: "car-interior-cleaning", label: "Car Interior Cleaning" },
  { value: "office-chair-cleaning", label: "Office Chair Cleaning" },
  { value: "other", label: "Other / Multiple" },
];

const DCM_CITY_OPTIONS = [
  { value: "delhi", label: "Delhi" },
  { value: "noida", label: "Noida" },
  { value: "gurugram", label: "Gurugram" },
  { value: "ghaziabad", label: "Ghaziabad" },
  { value: "faridabad", label: "Faridabad" },
  { value: "greater-noida", label: "Greater Noida" },
];

const fieldCls =
  "w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100 transition-colors";

interface Booking {
  id: string;
  name?: string;
  phone?: string;
  email?: string;
  service?: string;
  serviceLabel?: string;
  city?: string;
  cityLabel?: string;
  address?: string;
  notes?: string;
  preferredDate?: string;
  preferredTime?: string;
  timeSlot?: string;
  date?: string;
  finalDate?: string;
  finalTime?: string;
  status?: string;
  totalAmount?: number;
  advancePaid?: number;
  pendingAmount?: number;
  assignedVendorId?: string;
  assignedVendorName?: string;
  assignedVendorPhone?: string;
  assignedVendorEmail?: string;
  jobExpense?: number;
  vendorPay?: number;
  vendorPayBreakdown?: { label: string; qty: number; subtotal: number }[];
  exactLocation?: string;
  details?: string;
  baseAmount?: number;
  addOns?: { name: string; price: number }[];
  discountType?: string;
  discountValue?: number;
  createdAt?: unknown;
  [key: string]: unknown;
}

interface Vendor {
  id: string;
  name?: string;
  email?: string;
  phone?: string;
  city?: string;
  status?: string;
  pricing?: Record<string, { label: string; price: number }[]>;
  [key: string]: unknown;
}

interface FormDataState {
  finalDate: string;
  finalTime: string;
  baseAmount: string | number;
  advancePaid: string | number;
  exactLocation: string;
  addOns: { name: string; price: string | number }[];
  vendorPay: string | number;
  vendorPayBreakdown: { label: string; qty: number; subtotal: number }[];
  jobExpense: string | number;
  discountType: string;
  discountValue: string | number;
}

export default function Bookings() {
  const today = new Date();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [serviceFilter, setServiceFilter] = useState("all");
  const [periodFilter, setPeriodFilter] = useState({
    period: "all", year: today.getFullYear(), month: today.getMonth(), from: "", to: "",
  });
  const [sortConfig, setSortConfig] = useState({ key: "createdAt", direction: "desc" });
  const [loading, setLoading] = useState(true);
  const [showAllStats, setShowAllStats] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [newBookingAlert, setNewBookingAlert] = useState<Booking | null>(null);
  const [addBookingModal, setAddBookingModal] = useState(false);
  const [addBookingForm, setAddBookingForm] = useState({
    name: "", phone: "", email: "",
    service: "", serviceLabel: "",
    city: "", cityLabel: "",
    preferredDate: "", preferredTime: "", details: "",
    isPast: false, finalDate: "", finalTime: "",
    totalAmount: "", vendorPay: "", additionalExpense: "",
  });
  const [confirmModal, setConfirmModal] = useState(false);
  const [rescheduleModal, setRescheduleModal] = useState(false);
  const [completeModal, setCompleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [currentBooking, setCurrentBooking] = useState<Booking | null>(null);
  const [editFormData, setEditFormData] = useState({
    name: "", phone: "", email: "",
    preferredDate: "", preferredTime: "",
    finalDate: "", finalTime: "",
    details: "", exactLocation: "",
    vendorPay: "", additionalExpense: "",
    markAsCompleted: false, totalAmount: "",
  });
  const [formData, setFormData] = useState<FormDataState>({
    finalDate: "", finalTime: "",
    baseAmount: "", advancePaid: "",
    exactLocation: "",
    addOns: [{ name: "", price: "" }],
    vendorPay: "", vendorPayBreakdown: [],
    jobExpense: "", discountType: "flat", discountValue: "",
  });

  useEffect(() => {
    setLoading(true);
    if (typeof Notification !== "undefined" && Notification.permission === "default") {
      Notification.requestPermission();
    }
    let isInitial = true;
    const unsubscribe = onSnapshot(
      query(collection(db, "bookings"), orderBy("createdAt", "desc")),
      (snapshot) => {
        if (isInitial) {
          setBookings(snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as Booking)));
          setLoading(false);
          isInitial = false;
          return;
        }
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            const booking = { id: change.doc.id, ...change.doc.data() } as Booking;
            setBookings((prev) => [booking, ...prev.filter((b) => b.id !== booking.id)]);
            if ((booking.status || "New") === "New") {
              setNewBookingAlert(booking);
              if (typeof Notification !== "undefined" && Notification.permission === "granted") {
                new Notification("New Booking — DryClean Masters!", {
                  body: `${booking.name || "Customer"} — ${booking.serviceLabel || booking.service || "Service"}`,
                  icon: "/favicon.ico",
                });
              }
            }
          } else if (change.type === "modified") {
            const updated = { id: change.doc.id, ...change.doc.data() } as Booking;
            setBookings((prev) => prev.map((b) => (b.id === updated.id ? updated : b)));
          } else if (change.type === "removed") {
            setBookings((prev) => prev.filter((b) => b.id !== change.doc.id));
          }
        });
      },
      (error) => { console.error("Bookings listener error:", error); setLoading(false); }
    );
    getDocs(collection(db, "vendors")).then((snap) => {
      setVendors(snap.docs.map((d) => ({ id: d.id, ...d.data() } as Vendor)));
    });
    return () => unsubscribe();
  }, []);

  const approvedVendors = useMemo(() => vendors.filter((v) => v.status === "approved"), [vendors]);
  const years = useMemo(() => availableYears(bookings as Record<string, unknown>[]), [bookings]);
  const range = useMemo(() => getRange(periodFilter), [periodFilter]);
  const periodScopedBookings = useMemo(() => filterBookings(bookings as Record<string, unknown>[], range) as Booking[], [bookings, range]);

  const serviceOptions = useMemo(() => {
    const set = new Set<string>();
    bookings.forEach((b) => { const l = b.serviceLabel || b.service; if (l) set.add(l); });
    return Array.from(set).sort();
  }, [bookings]);

  const filteredBookings = useMemo(() => {
    let filtered = periodScopedBookings.filter((booking) => {
      const status = booking.status || "New";
      const service = booking.serviceLabel || booking.service || "";
      const matchesStatus = statusFilter === "all" || status === statusFilter;
      const matchesService = serviceFilter === "all" || service === serviceFilter;
      const matchesSearch = [booking.name, booking.email, booking.phone, booking.serviceLabel, booking.cityLabel, booking.status, booking.assignedVendorName]
        .join(" ").toLowerCase().includes(searchTerm.toLowerCase());
      return matchesStatus && matchesService && matchesSearch;
    });
    if (sortConfig.key) {
      filtered = [...filtered].sort((a, b) => {
        const aV = sortValue(a, sortConfig.key);
        const bV = sortValue(b, sortConfig.key);
        if (aV < bV) return sortConfig.direction === "asc" ? -1 : 1;
        if (aV > bV) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }
    return filtered;
  }, [periodScopedBookings, searchTerm, sortConfig, statusFilter, serviceFilter]);

  const summary = useMemo(() => summarize(filteredBookings as Record<string, unknown>[]), [filteredBookings]);

  const stats = useMemo(() => [
    { label: "Leads", value: summary.leads, icon: Target, tone: "bg-amber-50 text-amber-700" },
    { label: "Confirmed", value: summary.counts.Confirmed, icon: UserRoundCheck, tone: "bg-teal-50 text-teal-700" },
    { label: "Completed", value: summary.counts.Completed, icon: CheckCircle2, tone: "bg-sky-50 text-sky-700" },
    { label: "Cancelled", value: summary.counts.Cancelled, icon: XCircle, tone: "bg-red-50 text-red-700" },
    { label: "Sales", value: formatMoney(summary.revenue), icon: IndianRupee, tone: "bg-violet-50 text-violet-700" },
    { label: "Pending dues", value: formatMoney(summary.pending), icon: Wallet, tone: "bg-rose-50 text-rose-700" },
  ], [summary]);

  const exportCSV = () => {
    const headers = ["Name","Phone","Email","Service","City/Address","Preferred Date","Preferred Time","Final Date","Final Time","Status","Total (₹)","Advance (₹)","Pending (₹)","Assigned Vendor","Details","Booking ID"];
    const rows = filteredBookings.map((b) => [
      b.name||"", b.phone||"", b.email||"",
      b.serviceLabel||b.service||"",
      b.cityLabel||b.city||b.address||"",
      b.preferredDate||b.date||"", b.preferredTime||b.timeSlot||"",
      b.finalDate||"", b.finalTime||"",
      b.status||"New", b.totalAmount??"", b.advancePaid??"", b.pendingAmount??"",
      b.assignedVendorName||"", b.details||b.notes||"", b.id,
    ]);
    const csv = [headers,...rows].map((row) => row.map((cell) => `"${String(cell).replace(/"/g,'""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `dcm-bookings-${new Date().toISOString().slice(0,10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const resetFilters = () => {
    setSearchTerm(""); setStatusFilter("all"); setServiceFilter("all");
    setPeriodFilter({ period: "all", year: today.getFullYear(), month: today.getMonth(), from: "", to: "" });
  };

  const callApi = async (url: string, payload: unknown) => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) throw new Error("Not logged in");
    const token = await user.getIdToken();
    return fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify(payload),
    });
  };

  const computeTotals = (base: string | number, addOnsArr: { name: string; price: string | number }[], advance: string | number, discountType: string, discountValue: string | number) => {
    const validAddOns = (addOnsArr || []).filter((a) => a.name?.trim() && a.price !== "");
    const addOnsSum = validAddOns.reduce((sum, a) => sum + Number(a.price || 0), 0);
    const grossTotal = Number(base || 0) + addOnsSum;
    const rawDiscount = Number(discountValue || 0);
    const discountAmount = discountType === "percent"
      ? Math.round((grossTotal * Math.min(Math.max(rawDiscount, 0), 100)) / 100)
      : Math.min(Math.max(rawDiscount, 0), grossTotal);
    const total = Math.max(0, grossTotal - discountAmount);
    const adv = Number(advance || 0);
    return { validAddOns, total, advance: adv, pending: total - adv, discountAmount };
  };

  const openEdit = (booking: Booking) => {
    setCurrentBooking(booking);
    const storedExpense = booking.jobExpense ?? "";
    const storedVendorPay = booking.vendorPay ?? "";
    const additionalExpense = storedExpense !== "" && storedVendorPay !== ""
      ? Math.max(0, Number(storedExpense) - Number(storedVendorPay))
      : storedExpense;
    let preferredDateISO = "";
    if (booking.preferredDate || booking.date) {
      const d = new Date((booking.preferredDate || booking.date) as string);
      if (!isNaN(d.getTime())) preferredDateISO = d.toISOString().slice(0, 10);
    }
    setEditFormData({
      name: booking.name || "", phone: booking.phone || "", email: booking.email || "",
      preferredDate: preferredDateISO,
      preferredTime: booking.preferredTime || booking.timeSlot || "",
      finalDate: booking.finalDate || "", finalTime: booking.finalTime || "",
      details: booking.details || booking.notes || "",
      exactLocation: booking.exactLocation || booking.address || "",
      vendorPay: String(storedVendorPay),
      additionalExpense: String(additionalExpense),
      markAsCompleted: false,
      totalAmount: String(booking.totalAmount ?? ""),
    });
    setEditModal(true);
  };

  const handleEditSave = async () => {
    if (!currentBooking) return;
    try {
      const isVendorJob = !!currentBooking.assignedVendorId;
      const vendorPay = isVendorJob ? Number(editFormData.vendorPay || 0) : 0;
      const additionalExpense = Number(editFormData.additionalExpense || 0);
      const totalExpense = isVendorJob ? vendorPay + additionalExpense : additionalExpense;
      const effectiveTotalAmount = editFormData.markAsCompleted
        ? Number(editFormData.totalAmount || 0)
        : Number(currentBooking.totalAmount || 0);
      let preferredDate = editFormData.preferredDate;
      if (preferredDate) {
        const [y, m, d] = preferredDate.split("-").map(Number);
        preferredDate = new Date(y, m - 1, d).toDateString();
      }
      const updates: Record<string, unknown> = {
        name: editFormData.name, phone: editFormData.phone, email: editFormData.email,
        preferredDate, preferredTime: editFormData.preferredTime,
        finalDate: editFormData.finalDate, finalTime: editFormData.finalTime,
        details: editFormData.details, exactLocation: editFormData.exactLocation,
        vendorPay, jobExpense: totalExpense,
        jobProfit: effectiveTotalAmount - totalExpense,
      };
      if (editFormData.markAsCompleted) {
        updates.status = "Completed";
        updates.totalAmount = effectiveTotalAmount;
        updates.baseAmount = effectiveTotalAmount;
        updates.advancePaid = effectiveTotalAmount;
        updates.pendingAmount = 0;
      }
      await updateDoc(doc(db, "bookings", currentBooking.id), updates);
      setBookings((prev) => prev.map((b) => (b.id === currentBooking.id ? { ...b, ...updates } as Booking : b)));
      setEditModal(false);
    } catch (error) { console.error("Edit failed:", error); alert((error as Error).message); }
  };

  const handleAddBooking = async () => {
    const { name, phone, email, service, serviceLabel, city, cityLabel, preferredDate, preferredTime, details, isPast, finalDate, finalTime, totalAmount, vendorPay, additionalExpense } = addBookingForm;
    if (!name || name.length < 3) { alert("Name must be at least 3 characters."); return; }
    if (!phone || phone.length < 10) { alert("Phone number must be at least 10 digits."); return; }
    if (!service || !preferredDate || !preferredTime) { alert("Please fill service, date and time."); return; }
    if (isPast && !finalDate) { alert("Please fill the final date."); return; }
    try {
      const [y, m, d] = preferredDate.split("-").map(Number);
      const humanPreferredDate = new Date(y, m - 1, d).toDateString();
      if (isPast) {
        const total = Number(totalAmount || 0);
        const vPay = Number(vendorPay || 0);
        const addExp = Number(additionalExpense || 0);
        const jobExp = vPay + addExp;
        const response = await callApi("/api/admin/booking", {
          name, phone, email,
          service, serviceLabel, city, cityLabel,
          preferredDate: humanPreferredDate, preferredTime,
          finalDate, finalTime, details,
          status: "Completed",
          totalAmount: total, baseAmount: total, advancePaid: total, pendingAmount: 0,
          vendorPay: vPay, jobExpense: jobExp, jobProfit: total - jobExp,
        });
        const result = await response.json();
        if (!response.ok) throw new Error(result.error || "Failed to add booking");
      } else {
        await addDoc(collection(db, "bookings"), {
          name, phone, email, service, serviceLabel, city, cityLabel,
          preferredDate: humanPreferredDate, preferredTime, details,
          status: "New", createdAt: serverTimestamp(),
        });
      }
      setAddBookingModal(false);
      setAddBookingForm({ name: "", phone: "", email: "", service: "", serviceLabel: "", city: "", cityLabel: "", preferredDate: "", preferredTime: "", details: "", isPast: false, finalDate: "", finalTime: "", totalAmount: "", vendorPay: "", additionalExpense: "" });
    } catch (error) { console.error("Failed to add booking:", error); alert((error as Error).message); }
  };

  const openConfirm = (booking: Booking) => {
    setCurrentBooking(booking);
    const saved = (booking.addOns || []).filter((a) => a.name?.trim());
    const savedSum = saved.reduce((s, a) => s + Number(a.price || 0), 0);
    const baseAmount = booking.baseAmount !== undefined ? booking.baseAmount : Math.max(0, Number(booking.totalAmount || 0) - savedSum);
    setFormData({
      finalDate: booking.finalDate || booking.preferredDate || booking.date || "",
      finalTime: booking.finalTime || booking.preferredTime || booking.timeSlot || "",
      baseAmount: baseAmount || "",
      advancePaid: booking.advancePaid || "",
      exactLocation: booking.exactLocation || booking.address || "",
      addOns: saved.length ? [...saved, { name: "", price: "" }] : [{ name: "", price: "" }],
      vendorPay: booking.vendorPay ?? "",
      vendorPayBreakdown: booking.vendorPayBreakdown || [],
      jobExpense: "",
      discountType: booking.discountType || "flat",
      discountValue: booking.discountValue ?? "",
    });
    setConfirmModal(true);
  };

  const openReschedule = (booking: Booking) => {
    setCurrentBooking(booking);
    setFormData({ finalDate: booking.finalDate || booking.preferredDate || "", finalTime: booking.finalTime || booking.preferredTime || "", baseAmount: "", advancePaid: "", exactLocation: "", addOns: [{ name: "", price: "" }], vendorPay: "", vendorPayBreakdown: [], jobExpense: "", discountType: "flat", discountValue: "" });
    setRescheduleModal(true);
  };

  const handleConfirm = async () => {
    if (!currentBooking) return;
    try {
      const { validAddOns, total, advance, pending, discountAmount } = computeTotals(formData.baseAmount, formData.addOns, formData.advancePaid, formData.discountType, formData.discountValue);
      const vendorPay = formData.vendorPay !== "" ? Number(formData.vendorPay) : undefined;
      const updates = {
        status: "Confirmed", finalDate: formData.finalDate, finalTime: formData.finalTime,
        baseAmount: Number(formData.baseAmount || 0), totalAmount: total,
        advancePaid: advance, pendingAmount: pending,
        exactLocation: formData.exactLocation, addOns: validAddOns,
        discountType: formData.discountType || "flat",
        discountValue: Number(formData.discountValue || 0), discountAmount,
        ...(vendorPay !== undefined && { vendorPay }),
        ...(formData.vendorPayBreakdown?.length && { vendorPayBreakdown: formData.vendorPayBreakdown }),
      };
      await updateDoc(doc(db, "bookings", currentBooking.id), updates);
      setBookings((prev) => prev.map((b) => (b.id === currentBooking.id ? { ...b, ...updates } as Booking : b)));
      setConfirmModal(false);
      if (currentBooking.email) {
        callApi("/api/confirm-booking", {
          ...currentBooking, ...updates,
          vendorPayBreakdown: formData.vendorPayBreakdown,
        }).catch((e) => console.error("Confirm email failed:", e));
      }
    } catch (error) { console.error("Confirm failed:", error); alert((error as Error).message); }
  };

  const handleReschedule = async () => {
    if (!currentBooking) return;
    try {
      const updates = { finalDate: formData.finalDate, finalTime: formData.finalTime };
      await updateDoc(doc(db, "bookings", currentBooking.id), updates);
      setBookings((prev) => prev.map((b) => (b.id === currentBooking.id ? { ...b, ...updates } as Booking : b)));
      setRescheduleModal(false);
      if (currentBooking.email) {
        callApi("/api/reschedule-booking", { ...currentBooking, ...updates })
          .catch((e) => console.error("Reschedule email failed:", e));
      }
    } catch (error) { console.error("Reschedule failed:", error); alert((error as Error).message); }
  };

  const openComplete = (booking: Booking) => {
    setCurrentBooking(booking);
    const saved = (booking.addOns || []).filter((a) => a.name?.trim());
    const savedSum = saved.reduce((s, a) => s + Number(a.price || 0), 0);
    const baseAmount = booking.baseAmount !== undefined ? booking.baseAmount : Math.max(0, Number(booking.totalAmount || 0) - savedSum);
    setFormData({
      finalDate: booking.finalDate || "",
      finalTime: booking.finalTime || "",
      baseAmount: baseAmount || "",
      advancePaid: booking.advancePaid || "",
      exactLocation: booking.exactLocation || booking.address || "",
      addOns: saved.length ? [...saved, { name: "", price: "" }] : [{ name: "", price: "" }],
      vendorPay: booking.vendorPay ?? "",
      vendorPayBreakdown: booking.vendorPayBreakdown || [],
      jobExpense: booking.jobExpense != null && booking.vendorPay != null
        ? Math.max(0, Number(booking.jobExpense) - Number(booking.vendorPay))
        : (booking.jobExpense ?? ""),
      discountType: booking.discountType || "flat",
      discountValue: booking.discountValue ?? "",
    });
    setCompleteModal(true);
  };

  const handleComplete = async () => {
    if (!currentBooking) return;
    try {
      const { validAddOns, total, discountAmount } = computeTotals(formData.baseAmount, formData.addOns, formData.advancePaid, formData.discountType, formData.discountValue);
      const isVendorJob = !!currentBooking.assignedVendorId;
      const vendorPay = isVendorJob ? Number(formData.vendorPay || 0) : 0;
      const additionalExpense = Number(formData.jobExpense || 0);
      const totalExpense = isVendorJob ? vendorPay + additionalExpense : additionalExpense;
      const previousAdvance = Number(currentBooking.advancePaid || 0);
      const updates = {
        status: "Completed",
        baseAmount: Number(formData.baseAmount || 0), totalAmount: total,
        advancePaid: total, pendingAmount: 0, addOns: validAddOns,
        vendorPay, jobExpense: totalExpense, jobProfit: total - totalExpense,
        discountType: formData.discountType || "flat",
        discountValue: Number(formData.discountValue || 0), discountAmount,
        ...(formData.vendorPayBreakdown?.length && { vendorPayBreakdown: formData.vendorPayBreakdown }),
      };
      await updateDoc(doc(db, "bookings", currentBooking.id), updates);
      setBookings((prev) => prev.map((item) => (item.id === currentBooking.id ? { ...item, ...updates } as Booking : item)));
      setCompleteModal(false);
      if (currentBooking.email) {
        callApi("/api/complete-booking", {
          ...currentBooking, ...updates, previousAdvance,
          amountPaidNow: Math.max(0, total - previousAdvance),
          vendorPayBreakdown: formData.vendorPayBreakdown,
        }).catch((e) => console.error("Complete email failed:", e));
      }
    } catch (error) { console.error("Complete failed:", error); alert((error as Error).message); }
  };

  const handleDelete = async (booking: Booking) => {
    if (!isTestBooking(booking as Record<string, unknown>)) return;
    const confirmed = window.confirm(`Permanently delete booking for "${booking.name}"?`);
    if (!confirmed) return;
    try {
      await deleteDoc(doc(db, "bookings", booking.id));
      setBookings((prev) => prev.filter((item) => item.id !== booking.id));
    } catch (error) { console.error("Delete failed:", error); alert((error as Error).message); }
  };

  const handleCancel = async (booking: Booking) => {
    try {
      const updates = { status: "Cancelled" };
      await updateDoc(doc(db, "bookings", booking.id), updates);
      setBookings((prev) => prev.map((item) => (item.id === booking.id ? { ...item, ...updates } as Booking : item)));
      if (booking.email) {
        callApi("/api/cancel-booking", booking)
          .catch((e) => console.error("Cancel email failed:", e));
      }
    } catch (error) { console.error("Cancel failed:", error); alert((error as Error).message); }
  };

  const assignVendor = async (bookingId: string, vendorId: string) => {
    const vendor = approvedVendors.find((item) => item.id === vendorId);
    const updates = vendor
      ? { assignedVendorId: vendor.id, assignedVendorName: vendor.name || "", assignedVendorPhone: vendor.phone || "", assignedVendorEmail: vendor.email || "" }
      : { assignedVendorId: "", assignedVendorName: "", assignedVendorPhone: "", assignedVendorEmail: "" };
    await updateDoc(doc(db, "bookings", bookingId), updates);
    setBookings((prev) => prev.map((booking) => (booking.id === bookingId ? { ...booking, ...updates } as Booking : booking)));
  };

  return (
    <div className="space-y-6">
      {newBookingAlert && (
        <div className="flex items-center justify-between gap-3 rounded-2xl border border-teal-200 bg-teal-50 p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <span className="inline-flex rounded-xl bg-teal-100 p-2 text-teal-700"><Bell size={18} /></span>
            <div>
              <p className="font-semibold text-teal-900">New booking received!</p>
              <p className="text-sm text-teal-700">{newBookingAlert.name} — {newBookingAlert.serviceLabel || newBookingAlert.service || "Service"}</p>
            </div>
          </div>
          <button onClick={() => setNewBookingAlert(null)} className="text-teal-500 hover:text-teal-700"><X size={18} /></button>
        </div>
      )}

      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-xl font-bold text-slate-950 sm:text-2xl">Bookings</h1>
        <div className="flex flex-wrap gap-2">
          <button onClick={() => setAddBookingModal(true)} className="inline-flex items-center justify-center gap-2 rounded-xl bg-teal-700 px-3 py-1.5 text-xs font-bold text-white hover:bg-teal-800 sm:px-4 sm:py-2 sm:text-sm">
            <Plus size={14} /> New
          </button>
          <button onClick={exportCSV} className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-50 sm:px-4 sm:py-2 sm:text-sm">
            <Download size={14} /><span className="hidden sm:inline">Export CSV</span><span className="sm:hidden">CSV</span>
          </button>
          <Link href="/admin/email" className="hidden items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-50 sm:inline-flex sm:px-4 sm:py-2 sm:text-sm">
            <Mail size={14} /> Email
          </Link>
        </div>
      </div>

      <PeriodFilter value={periodFilter} onChange={setPeriodFilter} years={years} />

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-6">
        {(showAllStats ? stats : stats.slice(0, 3)).map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.label} className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm sm:p-4">
              <div className={`mb-2 inline-flex rounded-xl p-1.5 sm:mb-3 sm:p-2 ${item.tone}`}>
                <Icon size={16} className="sm:hidden" /><Icon size={20} className="hidden sm:block" />
              </div>
              <p className="text-lg font-bold text-slate-950 sm:text-2xl">{loading ? "-" : item.value}</p>
              <p className="text-xs text-slate-500 sm:text-sm">{item.label}</p>
            </div>
          );
        })}
        <button onClick={() => setShowAllStats((v) => !v)} className="rounded-2xl border border-dashed border-slate-300 bg-white p-3 text-xs font-bold text-slate-600 transition hover:border-teal-500 hover:text-teal-700 sm:text-sm">
          {showAllStats ? "Show less" : `+ ${stats.length - 3} more`}
        </button>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="grid grid-cols-2 gap-2 p-3 sm:grid-cols-[1.5fr_1fr_auto] sm:items-center sm:gap-3 sm:p-4">
          <div className="relative col-span-2 sm:col-span-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input type="text" placeholder="Search name, phone, vendor..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full rounded-xl border border-slate-200 py-2.5 pl-10 pr-3 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100" />
          </div>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100">
            <option value="all">All statuses</option>
            <option value="New">New</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
          <button onClick={() => setShowFilters((v) => !v)} className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 sm:text-sm">
            <Filter size={14} /> More
            <ChevronDown size={14} className={`transition-transform ${showFilters ? "rotate-180" : ""}`} />
          </button>
        </div>
        {showFilters && (
          <div className="grid gap-3 border-t border-slate-100 bg-slate-50 p-4 sm:grid-cols-[1fr_auto] lg:items-center">
            <select value={serviceFilter} onChange={(e) => setServiceFilter(e.target.value)} className="rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100">
              <option value="all">All services</option>
              {serviceOptions.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
            <button onClick={resetFilters} className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 sm:text-sm">
              <RotateCcw size={14} /> Reset
            </button>
          </div>
        )}
        <p className="border-t border-slate-100 px-4 py-2.5 text-xs text-slate-500">
          Showing <b className="text-slate-900">{filteredBookings.length}</b> of {bookings.length}
          {" · "}Sales <b className="text-slate-900">{formatMoney(summary.revenue)}</b>
          {" · "}Pending <b className="text-slate-900">{formatMoney(summary.pending)}</b>
        </p>
      </div>

      <div className="hidden overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm xl:block">
        <table className="w-full min-w-[900px] text-sm">
          <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
            <tr>
              {[["name","Customer"],["service","Service"],["preferredDate","Preferred"],["finalDate","Final"],["totalAmount","Payment"],["status","Status"]].map(([key, label]) => (
                <th key={key} onClick={() => setSortConfig((prev) => ({ key, direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc" }))} className="cursor-pointer px-3 py-3 whitespace-nowrap">{label}</th>
              ))}
              <th className="px-3 py-3">Vendor</th>
              <th className="px-3 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings.map((booking) => (
              <BookingRow key={booking.id} booking={booking} vendors={approvedVendors} onAssignVendor={assignVendor} onEdit={openEdit} onConfirm={openConfirm} onReschedule={openReschedule} onComplete={openComplete} onCancel={handleCancel} onDelete={handleDelete} />
            ))}
          </tbody>
        </table>
        {filteredBookings.length === 0 && <EmptyState loading={loading} />}
      </div>

      <div className="grid gap-2 xl:hidden">
        {filteredBookings.map((booking) => (
          <BookingCard key={booking.id} booking={booking} vendors={approvedVendors} onAssignVendor={assignVendor} onEdit={openEdit} onConfirm={openConfirm} onReschedule={openReschedule} onComplete={openComplete} onCancel={handleCancel} onDelete={handleDelete} />
        ))}
        {filteredBookings.length === 0 && <EmptyState loading={loading} />}
      </div>

      {addBookingModal && (
        <AddBookingModal formData={addBookingForm} setFormData={setAddBookingForm} onSubmit={handleAddBooking} onClose={() => setAddBookingModal(false)} />
      )}

      {editModal && (
        <EditModal formData={editFormData} setFormData={setEditFormData} booking={currentBooking!} onSubmit={handleEditSave} onClose={() => setEditModal(false)} />
      )}

      {confirmModal && (
        <Modal title="Confirm Booking" formData={formData} setFormData={setFormData} booking={currentBooking!} vendor={approvedVendors.find((v) => v.id === currentBooking?.assignedVendorId)} onSubmit={handleConfirm} onClose={() => setConfirmModal(false)} />
      )}

      {rescheduleModal && (
        <Modal title="Reschedule Booking" formData={formData} setFormData={setFormData} booking={currentBooking!} onSubmit={handleReschedule} onClose={() => setRescheduleModal(false)} />
      )}

      {completeModal && (
        <Modal title="Complete Booking" formData={formData} setFormData={setFormData} booking={currentBooking!} vendor={approvedVendors.find((v) => v.id === currentBooking?.assignedVendorId)} onSubmit={handleComplete} onClose={() => setCompleteModal(false)} />
      )}
    </div>
  );
}

function BookingRow({ booking, vendors, onAssignVendor, onEdit, onConfirm, onReschedule, onComplete, onCancel, onDelete }: {
  booking: Booking; vendors: Vendor[]; onAssignVendor: (id: string, vid: string) => void;
  onEdit: (b: Booking) => void; onConfirm: (b: Booking) => void; onReschedule: (b: Booking) => void;
  onComplete: (b: Booking) => void; onCancel: (b: Booking) => void; onDelete: (b: Booking) => void;
}) {
  const status = booking.status || "New";
  return (
    <tr className="border-t border-slate-100 align-middle hover:bg-slate-50">
      <td className="px-3 py-3">
        <button onClick={() => onEdit(booking)} className="font-semibold text-slate-900 whitespace-nowrap hover:text-teal-700 hover:underline text-left">{booking.name || "-"}</button>
        <p className="text-xs text-slate-500">{booking.phone || "-"}</p>
        <p className="text-xs text-slate-500 max-w-[160px] truncate">{booking.email || "-"}</p>
      </td>
      <td className="px-3 py-3 max-w-[130px]"><span className="line-clamp-2">{booking.serviceLabel || booking.service || "-"}</span></td>
      <td className="px-3 py-3 whitespace-nowrap">{booking.preferredDate || booking.date || "-"}<br /><span className="text-xs text-slate-500">{booking.preferredTime || booking.timeSlot || "-"}</span></td>
      <td className="px-3 py-3 whitespace-nowrap">{booking.finalDate || "-"}<br /><span className="text-xs text-slate-500">{booking.finalTime || "-"}</span></td>
      <td className="px-3 py-3 whitespace-nowrap">
        <p className="font-semibold">{money(booking.totalAmount)}</p>
        <p className="text-xs text-slate-500">Due {money(booking.pendingAmount)}</p>
      </td>
      <td className="px-3 py-3"><StatusBadge status={status} /></td>
      <td className="px-3 py-3">
        <VendorSelect booking={booking} vendors={vendors} onAssignVendor={onAssignVendor} />
      </td>
      <td className="px-3 py-3">
        <ActionButtons booking={booking} onConfirm={onConfirm} onReschedule={onReschedule} onComplete={onComplete} onCancel={onCancel} onDelete={onDelete} />
      </td>
    </tr>
  );
}

function BookingCard({ booking, vendors, onAssignVendor, onEdit, onConfirm, onReschedule, onComplete, onCancel, onDelete }: {
  booking: Booking; vendors: Vendor[]; onAssignVendor: (id: string, vid: string) => void;
  onEdit: (b: Booking) => void; onConfirm: (b: Booking) => void; onReschedule: (b: Booking) => void;
  onComplete: (b: Booking) => void; onCancel: (b: Booking) => void; onDelete: (b: Booking) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const status = booking.status || "New";
  const pending = Number(booking.pendingAmount || 0);
  return (
    <article className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <button onClick={() => setExpanded((v) => !v)} className="flex w-full items-center justify-between gap-3 p-3 text-left">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <p className="truncate font-bold text-slate-900">{booking.name || "Customer"}</p>
            <StatusBadge status={status} />
          </div>
          <p className="mt-0.5 truncate text-xs text-slate-500">
            {booking.serviceLabel || booking.service || "—"}{(booking.preferredDate || booking.date) ? ` · ${booking.preferredDate || booking.date}` : ""}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          {Number(booking.totalAmount || 0) > 0 && (
            <div className="text-right">
              <p className="text-sm font-bold text-slate-900">{money(booking.totalAmount)}</p>
              {pending > 0 && <p className="text-[11px] font-semibold text-rose-600">{money(pending)} due</p>}
            </div>
          )}
          <ChevronDown size={16} className={`text-slate-400 transition-transform ${expanded ? "rotate-180" : ""}`} />
        </div>
      </button>
      {expanded && (
        <div className="space-y-3 border-t border-slate-100 p-3">
          <div className="grid grid-cols-2 gap-2 text-xs">
            <Detail label="Phone" value={booking.phone || "-"} />
            <Detail label="Email" value={booking.email || "-"} />
            <Detail label="Preferred" value={`${booking.preferredDate || booking.date || "-"} ${booking.preferredTime || booking.timeSlot || ""}`} />
            <Detail label="Final" value={`${booking.finalDate || "-"} ${booking.finalTime || ""}`} />
          </div>
          {(booking.exactLocation || booking.address) && (
            <p className="rounded-xl bg-slate-50 p-2.5 text-xs text-slate-600">{booking.exactLocation || booking.address}</p>
          )}
          {(booking.details || booking.notes) && <p className="text-xs text-slate-500">{booking.details || booking.notes}</p>}
          <VendorSelect booking={booking} vendors={vendors} onAssignVendor={onAssignVendor} />
          <div className="flex flex-wrap gap-1.5">
            <button onClick={() => onEdit(booking)} className="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-50">Edit</button>
            {status === "New" && <button onClick={() => onConfirm(booking)} className="rounded-lg bg-teal-700 px-2.5 py-1.5 text-xs font-bold text-white hover:bg-teal-800">Confirm</button>}
            {status === "Confirmed" && (
              <>
                <button onClick={() => onReschedule(booking)} className="rounded-lg bg-amber-500 px-2.5 py-1.5 text-xs font-bold text-white hover:bg-amber-600">Reschedule</button>
                <button onClick={() => onComplete(booking)} className="rounded-lg bg-sky-600 px-2.5 py-1.5 text-xs font-bold text-white hover:bg-sky-700">Complete</button>
              </>
            )}
            {status !== "Cancelled" && status !== "Completed" && (
              <button onClick={() => onCancel(booking)} className="rounded-lg bg-red-600 px-2.5 py-1.5 text-xs font-bold text-white hover:bg-red-700">Cancel</button>
            )}
            {booking.email && (
              <Link href={`/admin/email?email=${encodeURIComponent(booking.email)}&name=${encodeURIComponent(booking.name || "")}`} className="rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-50">Email</Link>
            )}
            {isTestBooking(booking as Record<string, unknown>) && (
              <button onClick={() => onDelete(booking)} className="rounded-lg border border-red-200 bg-red-50 px-2.5 py-1.5 text-xs font-bold text-red-700 hover:bg-red-100">Delete</button>
            )}
          </div>
        </div>
      )}
    </article>
  );
}

function ActionButtons({ booking, onConfirm, onReschedule, onComplete, onCancel, onDelete }: {
  booking: Booking; onConfirm: (b: Booking) => void; onReschedule: (b: Booking) => void;
  onComplete: (b: Booking) => void; onCancel: (b: Booking) => void; onDelete: (b: Booking) => void;
}) {
  const status = booking.status || "New";
  return (
    <div className="flex flex-col items-end gap-1.5">
      {status === "New" && <button onClick={() => onConfirm(booking)} className="w-full rounded-lg bg-teal-700 px-3 py-1.5 text-xs font-bold text-white hover:bg-teal-800">Confirm</button>}
      {status === "Confirmed" && (
        <>
          <button onClick={() => onReschedule(booking)} className="w-full rounded-lg bg-amber-500 px-3 py-1.5 text-xs font-bold text-white hover:bg-amber-600">Reschedule</button>
          <button onClick={() => onComplete(booking)} className="w-full rounded-lg bg-sky-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-sky-700">Complete</button>
        </>
      )}
      {status !== "Cancelled" && status !== "Completed" && <button onClick={() => onCancel(booking)} className="w-full rounded-lg bg-red-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-red-700">Cancel</button>}
      {booking.email && <Link href={`/admin/email?email=${encodeURIComponent(booking.email)}&name=${encodeURIComponent(booking.name || "")}`} className="w-full rounded-lg border border-slate-200 px-3 py-1.5 text-center text-xs font-bold text-slate-700 hover:bg-slate-50">Email</Link>}
      {isTestBooking(booking as Record<string, unknown>) && <button onClick={() => onDelete(booking)} className="w-full rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-bold text-red-700 hover:bg-red-100">Delete</button>}
    </div>
  );
}

function VendorSelect({ booking, vendors, onAssignVendor }: { booking: Booking; vendors: Vendor[]; onAssignVendor: (id: string, vid: string) => void }) {
  return (
    <select value={booking.assignedVendorId || ""} onChange={(e) => onAssignVendor(booking.id, e.target.value)} className="w-full min-w-[140px] rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100">
      <option value="">Assign vendor</option>
      {vendors.map((vendor) => <option key={vendor.id} value={vendor.id}>{vendor.name || "Vendor"}{vendor.city ? ` - ${vendor.city}` : ""}</option>)}
    </select>
  );
}

function StatusBadge({ status }: { status: string }) {
  return <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-bold ${statusStyles[status] || statusStyles.New}`}>{status}</span>;
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-slate-50 p-3">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">{label}</p>
      <p className="mt-1 font-semibold text-slate-800">{value}</p>
    </div>
  );
}

function EmptyState({ loading }: { loading: boolean }) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-8 text-center text-sm text-slate-500">
      {loading ? "Loading bookings..." : "No bookings match your filters."}
    </div>
  );
}

type AddBookingFormState = {
  name: string; phone: string; email: string; service: string; serviceLabel: string;
  city: string; cityLabel: string; preferredDate: string; preferredTime: string; details: string;
  isPast: boolean; finalDate: string; finalTime: string; totalAmount: string; vendorPay: string; additionalExpense: string;
};

function AddBookingModal({ formData, setFormData, onSubmit, onClose }: {
  formData: AddBookingFormState;
  setFormData: React.Dispatch<React.SetStateAction<AddBookingFormState>>; onSubmit: () => void; onClose: () => void;
}) {
  const canSubmit = formData.name?.length >= 3 && formData.phone?.length >= 10 && formData.service && formData.preferredDate && formData.preferredTime;

  return (
    <div className="fixed inset-0 z-50 flex items-end bg-slate-950/60 p-3 sm:items-center sm:justify-center">
      <div className="max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white shadow-2xl">
        <div className="flex items-start justify-between gap-3 border-b border-slate-100 px-5 py-4 sm:px-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-teal-700">Admin entry</p>
            <h2 className="mt-0.5 text-xl font-bold text-slate-950">Add New Booking</h2>
            <p className="mt-0.5 text-sm text-slate-500">Log a booking received via phone or WhatsApp.</p>
          </div>
          <button onClick={onClose} className="flex-shrink-0 rounded-xl border border-slate-200 p-2 text-slate-400 hover:bg-slate-50"><X size={18} /></button>
        </div>
        <div className="space-y-4 px-5 py-5 sm:px-6">
          <div className="grid grid-cols-2 gap-3">
            <div><label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500">Name *</label><input type="text" className={fieldCls} value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} /></div>
            <div><label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500">Phone</label><input type="text" className={fieldCls} value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} /></div>
          </div>
          <div><label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500">Email</label><input type="email" className={fieldCls} value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} /></div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500">Service *</label>
              <select className={fieldCls} value={formData.service} onChange={(e) => { const opt = DCM_SERVICE_OPTIONS.find((o) => o.value === e.target.value); setFormData({ ...formData, service: e.target.value, serviceLabel: opt?.label || "" }); }}>
                <option value="">Select service</option>
                {DCM_SERVICE_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500">City</label>
              <select className={fieldCls} value={formData.city} onChange={(e) => { const opt = DCM_CITY_OPTIONS.find((o) => o.value === e.target.value); setFormData({ ...formData, city: e.target.value, cityLabel: opt?.label || "" }); }}>
                <option value="">Select city</option>
                {DCM_CITY_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div><label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500">Preferred Date *</label><input type="date" className={fieldCls} value={formData.preferredDate} onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })} /></div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500">Time Slot *</label>
              <select className={fieldCls} value={formData.preferredTime} onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}>
                <option value="">Select slot</option>
                <option value="Morning">Morning (9–12 pm)</option>
                <option value="Afternoon">Afternoon (12–4 pm)</option>
                <option value="Evening">Evening (4–7 pm)</option>
              </select>
            </div>
          </div>
          <div><label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500">Details / Notes</label><textarea rows={3} placeholder="Fabric type, stain details, floor…" className={fieldCls} value={formData.details} onChange={(e) => setFormData({ ...formData, details: e.target.value })} /></div>
          <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 px-4 py-3 hover:bg-slate-50">
            <input type="checkbox" className="h-4 w-4 accent-teal-600" checked={formData.isPast} onChange={(e) => setFormData({ ...formData, isPast: e.target.checked })} />
            <div>
              <p className="text-sm font-semibold text-slate-800">Past booking — mark as Completed</p>
              <p className="text-xs text-slate-500">No emails sent. Use for phone/WhatsApp jobs already done.</p>
            </div>
          </label>
          {formData.isPast && (
            <div className="space-y-3 rounded-xl border border-sky-200 bg-sky-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-sky-700">Completion Details</p>
              <div className="grid grid-cols-2 gap-3">
                <div><label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500">Final Date *</label><input type="date" className={fieldCls} value={formData.finalDate} onChange={(e) => setFormData({ ...formData, finalDate: e.target.value })} /></div>
                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500">Final Time</label>
                  <select className={fieldCls} value={formData.finalTime} onChange={(e) => setFormData({ ...formData, finalTime: e.target.value })}>
                    <option value="">Select slot</option>
                    <option value="Morning">Morning (9–12 pm)</option>
                    <option value="Afternoon">Afternoon (12–4 pm)</option>
                    <option value="Evening">Evening (4–7 pm)</option>
                  </select>
                </div>
              </div>
              <div><label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500">Total Amount (₹)</label><div className="relative"><span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm font-medium text-slate-400">₹</span><input type="number" placeholder="0" className={`${fieldCls} pl-7`} value={formData.totalAmount} onChange={(e) => setFormData({ ...formData, totalAmount: e.target.value })} /></div></div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500">Vendor Pay (₹)</label><div className="relative"><span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm font-medium text-slate-400">₹</span><input type="number" placeholder="0" className={`${fieldCls} pl-7`} value={formData.vendorPay} onChange={(e) => setFormData({ ...formData, vendorPay: e.target.value })} /></div></div>
                <div><label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500">Other Expense (₹)</label><div className="relative"><span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm font-medium text-slate-400">₹</span><input type="number" placeholder="0" className={`${fieldCls} pl-7`} value={formData.additionalExpense} onChange={(e) => setFormData({ ...formData, additionalExpense: e.target.value })} /></div></div>
              </div>
              {(Number(formData.totalAmount) > 0 || Number(formData.vendorPay) > 0 || Number(formData.additionalExpense) > 0) && (
                <div className={`flex items-center justify-between rounded-lg px-4 py-2.5 text-sm font-bold ${(Number(formData.totalAmount) - Number(formData.vendorPay || 0) - Number(formData.additionalExpense || 0)) >= 0 ? "bg-violet-100 text-violet-700" : "bg-red-100 text-red-700"}`}>
                  <span>Net Profit</span>
                  <span>₹ {(Number(formData.totalAmount || 0) - Number(formData.vendorPay || 0) - Number(formData.additionalExpense || 0)).toLocaleString("en-IN")}</span>
                </div>
              )}
            </div>
          )}
        </div>
        <div className="flex flex-col-reverse gap-3 border-t border-slate-100 px-5 py-4 sm:flex-row sm:justify-end sm:px-6">
          <button onClick={onClose} className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-bold text-slate-700 hover:bg-slate-50">Cancel</button>
          <button onClick={onSubmit} disabled={!canSubmit} className={`rounded-xl px-5 py-2.5 text-sm font-bold text-white transition-colors ${canSubmit ? (formData.isPast ? "bg-sky-600 hover:bg-sky-700" : "bg-teal-700 hover:bg-teal-800") : "cursor-not-allowed bg-slate-300"}`}>
            {formData.isPast ? "Add as Completed" : "Add Booking"}
          </button>
        </div>
      </div>
    </div>
  );
}

type EditFormState = {
  name: string; phone: string; email: string;
  preferredDate: string; preferredTime: string;
  finalDate: string; finalTime: string;
  details: string; exactLocation: string;
  vendorPay: string; additionalExpense: string;
  markAsCompleted: boolean; totalAmount: string;
};

function EditModal({ formData, setFormData, booking, onSubmit, onClose }: {
  formData: EditFormState; setFormData: React.Dispatch<React.SetStateAction<EditFormState>>;
  booking: Booking; onSubmit: () => void; onClose: () => void;
}) {
  const isVendorJob = !!booking?.assignedVendorId;
  const vendorPay = isVendorJob ? Number(formData.vendorPay || 0) : 0;
  const additionalExpense = Number(formData.additionalExpense || 0);
  const totalExpense = isVendorJob ? vendorPay + additionalExpense : additionalExpense;
  const totalAmount = Number(booking?.totalAmount || 0);
  const netProfit = totalAmount - totalExpense;

  return (
    <div className="fixed inset-0 z-50 flex items-end bg-slate-950/60 p-3 sm:items-center sm:justify-center">
      <div className="max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white shadow-2xl">
        <div className="flex items-start justify-between gap-3 border-b border-slate-100 px-5 py-4 sm:px-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-teal-700">Edit Booking</p>
            <h2 className="mt-0.5 text-xl font-bold text-slate-950">Customer &amp; Booking Details</h2>
            {booking && <p className="mt-0.5 text-sm text-slate-500">{booking.name}{booking.serviceLabel ? ` · ${booking.serviceLabel}` : ""}</p>}
          </div>
          <button onClick={onClose} className="flex-shrink-0 rounded-xl border border-slate-200 p-2 text-slate-400 hover:bg-slate-50"><X size={18} /></button>
        </div>
        <div className="space-y-4 px-5 py-5 sm:px-6">
          <div className="grid grid-cols-2 gap-3">
            <div><label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500">Name</label><input type="text" className={fieldCls} value={String(formData.name || "")} onChange={(e) => setFormData({ ...formData, name: e.target.value })} /></div>
            <div><label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500">Phone</label><input type="text" className={fieldCls} value={String(formData.phone || "")} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} /></div>
          </div>
          <div><label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500">Email</label><input type="email" className={fieldCls} value={String(formData.email || "")} onChange={(e) => setFormData({ ...formData, email: e.target.value })} /></div>
          <div className="grid grid-cols-2 gap-3">
            <div><label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500">Preferred Date</label><input type="date" className={fieldCls} value={String(formData.preferredDate || "")} onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })} /></div>
            <div><label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500">Preferred Time</label>
              <select className={fieldCls} value={String(formData.preferredTime || "")} onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}>
                <option value="">Select slot</option>
                <option value="Morning">Morning (9–12 pm)</option>
                <option value="Afternoon">Afternoon (12–4 pm)</option>
                <option value="Evening">Evening (4–7 pm)</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div><label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500">Final Date</label><input type="date" className={fieldCls} value={String(formData.finalDate || "")} onChange={(e) => setFormData({ ...formData, finalDate: e.target.value })} /></div>
            <div><label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500">Final Time</label><input type="time" className={fieldCls} value={String(formData.finalTime || "")} onChange={(e) => setFormData({ ...formData, finalTime: e.target.value })} /></div>
          </div>
          <div><label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500">Exact Location</label><input type="text" placeholder="Full address / landmark" className={fieldCls} value={String(formData.exactLocation || "")} onChange={(e) => setFormData({ ...formData, exactLocation: e.target.value })} /></div>
          <div><label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500">Details / Notes</label><textarea rows={3} className={fieldCls} value={String(formData.details || "")} onChange={(e) => setFormData({ ...formData, details: e.target.value })} /></div>
          <div className="border-t border-slate-100 pt-4">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Expenses</p>
            <div className="grid grid-cols-2 gap-3">
              {isVendorJob && <div><label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500">Vendor Pay</label><div className="relative"><span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm font-medium text-slate-400">₹</span><input type="number" placeholder="0" className={`${fieldCls} pl-7`} value={String(formData.vendorPay || "")} onChange={(e) => setFormData({ ...formData, vendorPay: e.target.value })} /></div></div>}
              <div><label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500">{isVendorJob ? "Additional Expense" : "Job Expense"}</label><div className="relative"><span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm font-medium text-slate-400">₹</span><input type="number" placeholder="0" className={`${fieldCls} pl-7`} value={String(formData.additionalExpense || "")} onChange={(e) => setFormData({ ...formData, additionalExpense: e.target.value })} /></div></div>
            </div>
            {totalExpense > 0 && totalAmount > 0 && (
              <div className={`mt-3 flex items-center justify-between rounded-xl px-4 py-3 text-sm font-bold ${netProfit >= 0 ? "bg-violet-50 text-violet-700" : "bg-red-50 text-red-700"}`}>
                <span>Net Profit</span><span>₹ {netProfit.toLocaleString("en-IN")}</span>
              </div>
            )}
          </div>
          {booking?.status !== "Completed" && booking?.status !== "Cancelled" && (
            <div className="border-t border-slate-100 pt-4">
              <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 px-4 py-3 hover:bg-slate-50">
                <input type="checkbox" className="h-4 w-4 accent-sky-600" checked={Boolean(formData.markAsCompleted)} onChange={(e) => setFormData({ ...formData, markAsCompleted: e.target.checked })} />
                <div>
                  <p className="text-sm font-semibold text-slate-800">Mark as Completed</p>
                  <p className="text-xs text-slate-500">Updates status to Completed.</p>
                </div>
              </label>
              {formData.markAsCompleted && (
                <div className="mt-3 space-y-3 rounded-xl border border-sky-200 bg-sky-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-sky-700">Completion Details</p>
                  <div><label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500">Total Amount (₹)</label><div className="relative"><span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm font-medium text-slate-400">₹</span><input type="number" placeholder="0" className={`${fieldCls} pl-7`} value={String(formData.totalAmount || "")} onChange={(e) => setFormData({ ...formData, totalAmount: e.target.value })} /></div></div>
                </div>
              )}
            </div>
          )}
        </div>
        <div className="flex flex-col-reverse gap-3 border-t border-slate-100 px-5 py-4 sm:flex-row sm:justify-end sm:px-6">
          <button onClick={onClose} className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-bold text-slate-700 hover:bg-slate-50">Cancel</button>
          <button onClick={onSubmit} className={`rounded-xl px-5 py-2.5 text-sm font-bold text-white ${formData.markAsCompleted ? "bg-sky-600 hover:bg-sky-700" : "bg-teal-700 hover:bg-teal-800"}`}>
            {formData.markAsCompleted ? "Save & Complete" : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}

function sortValue(booking: Booking, key: string): string | number {
  if (key === "createdAt") return (booking.createdAt as { seconds?: number })?.seconds || 0;
  return String(booking[key] ?? "");
}
