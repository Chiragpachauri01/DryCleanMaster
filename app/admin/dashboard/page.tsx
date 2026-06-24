"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import {
  CalendarCheck, CheckCircle2, Clock3, IndianRupee,
  Mail, Minus, Target, TrendingDown, TrendingUp, Users, Wallet,
} from "lucide-react";
import AdminShell from "@/components/admin/AdminShell";
import PeriodFilter from "@/components/admin/PeriodFilter";
import Collapsible from "@/components/admin/Collapsible";
import { BarChart, HBarList, StatusBars } from "@/components/admin/Charts";
import { db } from "@/lib/firebase";
import {
  availableYears, bookingDate, compactMoney, filterBookings,
  getRange, groupBy, money, monthlySeries, summarize,
} from "@/lib/admin/analytics";

const STATUS_TONES: Record<string, string> = {
  New: "bg-amber-50 text-amber-700",
  Confirmed: "bg-teal-50 text-teal-700",
  Completed: "bg-sky-50 text-sky-700",
  Cancelled: "bg-red-50 text-red-700",
};

interface Booking {
  id: string;
  status?: string;
  name?: string;
  serviceLabel?: string;
  service?: string;
  cityLabel?: string;
  city?: string;
  totalAmount?: number;
  assignedVendorName?: string;
  createdAt?: unknown;
  [key: string]: unknown;
}

interface Vendor {
  id: string;
  status?: string;
  name?: string;
  city?: string;
  phone?: string;
}

export default function Dashboard() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAllKpis, setShowAllKpis] = useState(false);

  const today = new Date();
  const [filter, setFilter] = useState({
    period: "30d", year: today.getFullYear(), month: today.getMonth(), from: "", to: "",
  });

  useEffect(() => {
    const load = async () => {
      try {
        const [bookingSnap, vendorSnap] = await Promise.all([
          getDocs(query(collection(db, "bookings"), orderBy("createdAt", "desc"))),
          getDocs(collection(db, "vendors")),
        ]);
        setBookings(bookingSnap.docs.map((d) => ({ id: d.id, ...d.data() } as Booking)));
        setVendors(vendorSnap.docs.map((d) => ({ id: d.id, ...d.data() } as Vendor)));
      } catch (error) { console.error("Failed to load dashboard:", error); }
      finally { setLoading(false); }
    };
    load();
  }, []);

  const years = useMemo(() => availableYears(bookings as Record<string, unknown>[]), [bookings]);
  const range = useMemo(() => getRange(filter), [filter]);
  const filtered = useMemo(() => filterBookings(bookings as Record<string, unknown>[], range) as Booking[], [bookings, range]);
  const stats = useMemo(() => summarize(filtered as Record<string, unknown>[]), [filtered]);
  const monthly = useMemo(() => monthlySeries(bookings as Record<string, unknown>[], filter.year), [bookings, filter.year]);

  const topServices = useMemo(
    () => groupBy(filtered as Record<string, unknown>[], (b) => (b.serviceLabel || b.service) as string).sort((a, b) => b.revenue - a.revenue || b.leads - a.leads).slice(0, 6),
    [filtered]
  );

  const topVendors = useMemo(() => {
    const grouped = groupBy(
      (filtered as Record<string, unknown>[]).filter((b) => b.assignedVendorName),
      (b) => b.assignedVendorName as string
    );
    return grouped.sort((a, b) => b.leads - a.leads).slice(0, 5);
  }, [filtered]);

  const recentBookings = useMemo(
    () => [...filtered].sort((a, b) => (bookingDate(b as Record<string, unknown>)?.getTime() || 0) - (bookingDate(a as Record<string, unknown>)?.getTime() || 0)).slice(0, 6),
    [filtered]
  );

  const pendingVendors = useMemo(
    () => vendors.filter((v) => !v.status || v.status === "pending").slice(0, 5),
    [vendors]
  );

  const marginPct = stats.revenue > 0 ? Math.round((stats.profit / stats.revenue) * 100) : 0;

  const kpis = [
    { label: "Total sales", value: money(stats.revenue), hint: `${stats.counts.Confirmed + stats.counts.Completed} won jobs`, icon: IndianRupee, tone: "bg-teal-50 text-teal-700" },
    { label: "Total leads", value: stats.leads, hint: `${stats.counts.New} awaiting response`, icon: Target, tone: "bg-amber-50 text-amber-700" },
    { label: "Conversion", value: `${stats.conversion}%`, hint: "Confirmed + completed", icon: TrendingUp, tone: "bg-violet-50 text-violet-700" },
    { label: "Avg. ticket", value: money(stats.avgOrder), hint: "Per won job", icon: Wallet, tone: "bg-sky-50 text-sky-700" },
    { label: "Pending dues", value: money(stats.pending), hint: `${money(stats.collected)} collected`, icon: Clock3, tone: "bg-rose-50 text-rose-700" },
    { label: "Total expenses", value: money(stats.totalExpense), hint: "Completed jobs only", icon: TrendingDown, tone: "bg-red-50 text-red-600" },
    { label: "Net profit", value: money(stats.profit), hint: `${marginPct}% margin`, icon: stats.profit >= 0 ? TrendingUp : Minus, tone: stats.profit >= 0 ? "bg-violet-50 text-violet-700" : "bg-red-50 text-red-700" },
  ];

  return (
    <AdminShell>
      <div className="space-y-4 sm:space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-xl font-bold text-slate-950 sm:text-2xl">Dashboard</h1>
          <div className="flex flex-wrap gap-2">
            <Link href="/admin/bookings" className="rounded-xl bg-teal-700 px-3 py-1.5 text-xs font-bold text-white hover:bg-teal-800 sm:px-4 sm:py-2 sm:text-sm">Bookings</Link>
            <Link href="/admin/email" className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-50 sm:px-4 sm:py-2 sm:text-sm">Send email</Link>
          </div>
        </div>

        <PeriodFilter value={filter} onChange={setFilter} years={years} />

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7">
          {(showAllKpis ? kpis : kpis.slice(0, 3)).map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm sm:p-4">
                <div className={`mb-2 inline-flex rounded-xl p-1.5 sm:mb-3 sm:p-2 ${item.tone}`}>
                  <Icon size={16} className="sm:hidden" /><Icon size={20} className="hidden sm:block" />
                </div>
                <p className="text-lg font-bold text-slate-950 sm:text-2xl">{loading ? "-" : String(item.value)}</p>
                <p className="text-xs text-slate-500 sm:text-sm">{item.label}</p>
                <p className="mt-1 hidden text-xs text-slate-400 sm:block">{item.hint}</p>
              </div>
            );
          })}
          <button onClick={() => setShowAllKpis((v) => !v)} className="rounded-2xl border border-dashed border-slate-300 bg-white p-3 text-xs font-bold text-slate-600 transition hover:border-teal-500 hover:text-teal-700 sm:text-sm">
            {showAllKpis ? "Show less" : `+ ${kpis.length - 3} more`}
          </button>
        </div>

        <Collapsible title={`Monthly sales — ${filter.year}`} subtitle="Revenue from non-cancelled bookings each month." badge={`Total: ${compactMoney(monthly.reduce((s, m) => s + m.revenue, 0))}`}>
          <BarChart data={monthly} valueKey="revenue" labelKey="month" format={compactMoney} color="bg-teal-600" />
        </Collapsible>

        <Collapsible title={`Monthly leads — ${filter.year}`} subtitle="All booking requests received." badge={`Total: ${monthly.reduce((s, m) => s + m.leads, 0)}`}>
          <BarChart data={monthly} valueKey="leads" labelKey="month" format={(v) => String(v)} color="bg-amber-500" />
        </Collapsible>

        <Collapsible title={`Monthly expenses — ${filter.year}`} subtitle="Job costs for completed bookings." badge={`Total: ${compactMoney(monthly.reduce((s, m) => s + m.expense, 0))}`}>
          <BarChart data={monthly} valueKey="expense" labelKey="month" format={compactMoney} color="bg-red-400" />
        </Collapsible>

        <Collapsible title={`Monthly net profit — ${filter.year}`} subtitle="Revenue minus job expenses (completed jobs)." badge={`Total: ${compactMoney(monthly.reduce((s, m) => s + m.profit, 0))}`}>
          <BarChart data={monthly} valueKey="profit" labelKey="month" format={compactMoney} color="bg-violet-500" />
        </Collapsible>

        <Collapsible title="Status mix & top performers" subtitle="Status breakdown, top services and vendors.">
          <div className="grid gap-6 lg:grid-cols-2">
            <div>
              <h3 className="mb-3 text-sm font-bold text-slate-700">Status mix</h3>
              <StatusBars counts={stats.counts} />
            </div>
            <div>
              <h3 className="mb-3 text-sm font-bold text-slate-700">Top services by revenue</h3>
              <HBarList items={topServices} valueKey="revenue" labelKey="key" format={compactMoney} color="bg-teal-500" />
            </div>
            <div>
              <h3 className="mb-3 text-sm font-bold text-slate-700">Top vendors by jobs</h3>
              <HBarList items={topVendors} valueKey="leads" labelKey="key" format={(v) => `${v} jobs`} color="bg-violet-500" emptyText="Assign vendors to bookings to see this list." />
            </div>
          </div>
        </Collapsible>

        <div className="grid gap-6 lg:grid-cols-[1.4fr_0.8fr]">
          <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 p-4">
              <div>
                <h2 className="font-bold text-slate-900">Recent bookings in selected period</h2>
                <p className="text-xs text-slate-500">{filtered.length} total in range</p>
              </div>
              <Link href="/admin/bookings" className="text-sm font-semibold text-teal-700">View all</Link>
            </div>
            <div className="divide-y divide-slate-100">
              {recentBookings.length === 0 && <p className="p-6 text-center text-sm text-slate-500">No bookings in this period.</p>}
              {recentBookings.map((booking) => {
                const status = booking.status || "New";
                return (
                  <div key={booking.id} className="grid gap-3 p-4 sm:grid-cols-[1fr_auto] sm:items-center">
                    <div>
                      <p className="font-semibold text-slate-900">{booking.name || "Customer"}</p>
                      <p className="text-sm text-slate-500">{booking.serviceLabel || booking.service || "-"}</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 sm:justify-end">
                      <span className={`rounded-full px-3 py-1 text-xs font-bold ${STATUS_TONES[status] || STATUS_TONES.New}`}>{status}</span>
                      <span className="text-sm font-semibold text-slate-700">{money(booking.totalAmount)}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 p-4">
              <div>
                <h2 className="font-bold text-slate-900">Vendor approvals</h2>
                <p className="text-xs text-slate-500">{pendingVendors.length} waiting</p>
              </div>
              <Link href="/admin/vendors" className="text-sm font-semibold text-teal-700">Review</Link>
            </div>
            <div className="divide-y divide-slate-100">
              {pendingVendors.length === 0 && <p className="p-6 text-center text-sm text-slate-500">No pending vendors.</p>}
              {pendingVendors.map((vendor) => (
                <div key={vendor.id} className="p-4">
                  <p className="font-semibold text-slate-900">{vendor.name || "Vendor"}</p>
                  <p className="text-sm text-slate-500">{vendor.city || "-"} · {vendor.phone || "-"}</p>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-2 border-t border-slate-100 p-4 text-xs text-slate-500">
              <div className="flex items-center gap-2">
                <span className="rounded-lg bg-violet-50 p-1.5 text-violet-700"><Users size={14} /></span>
                <span><b className="text-slate-900">{vendors.filter((v) => v.status === "approved").length}</b> active vendors</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="rounded-lg bg-teal-50 p-1.5 text-teal-700"><CalendarCheck size={14} /></span>
                <span><b className="text-slate-900">{stats.counts.Confirmed}</b> confirmed jobs</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="rounded-lg bg-sky-50 p-1.5 text-sky-700"><CheckCircle2 size={14} /></span>
                <span><b className="text-slate-900">{stats.counts.Completed}</b> completed</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="rounded-lg bg-rose-50 p-1.5 text-rose-700"><Mail size={14} /></span>
                <span><b className="text-slate-900">{stats.counts.Cancelled}</b> cancelled</span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </AdminShell>
  );
}
