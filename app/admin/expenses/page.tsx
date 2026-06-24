"use client";

import { useEffect, useMemo, useState } from "react";
import { addDoc, collection, deleteDoc, doc, getDocs, orderBy, query } from "firebase/firestore";
import {
  AlertTriangle, ArrowDownLeft, ArrowUpRight, Building2,
  IndianRupee, Landmark, Percent, Plus, Trash2,
  TrendingDown, TrendingUp, Users, Wallet,
} from "lucide-react";
import AdminShell from "@/components/admin/AdminShell";
import PeriodFilter from "@/components/admin/PeriodFilter";
import Collapsible from "@/components/admin/Collapsible";
import { BarChart } from "@/components/admin/Charts";
import { db } from "@/lib/firebase";
import {
  availableYears, bookingDate, compactMoney, filterBookings,
  getRange, inRange, MONTHS, money, monthlySeries, toDate,
} from "@/lib/admin/analytics";

const OVERHEAD_CATEGORIES = ["Supervisor", "Rent", "Office", "Other"];

const fieldCls = "rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100 transition-colors";

interface Booking {
  id: string;
  status?: string;
  assignedVendorId?: string;
  assignedVendorName?: string;
  totalAmount?: number;
  jobExpense?: number;
  serviceLabel?: string;
  service?: string;
  name?: string;
  phone?: string;
  createdAt?: unknown;
  [key: string]: unknown;
}

interface OverheadEntry {
  id: string;
  label?: string;
  amount?: number | string;
  category?: string;
  date?: string;
  createdAt?: unknown;
}

interface CashflowEntry {
  id: string;
  type?: string;
  label?: string;
  amount?: number | string;
  date?: string;
  createdAt?: unknown;
}

export default function ExpensesPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [overhead, setOverhead] = useState<OverheadEntry[]>([]);
  const [cashflow, setCashflow] = useState<CashflowEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeMonth, setActiveMonth] = useState<number | null>(null);
  const [addingOverhead, setAddingOverhead] = useState(false);
  const [newOverhead, setNewOverhead] = useState({ label: "", amount: "", category: "Other", date: "" });
  const [addingCash, setAddingCash] = useState(false);
  const [newCash, setNewCash] = useState({ type: "deposit", label: "", amount: "", date: "" });
  const [showAllKpis, setShowAllKpis] = useState(false);

  const today = new Date();
  const [filter, setFilter] = useState({
    period: "year", year: today.getFullYear(), month: today.getMonth(), from: "", to: "",
  });

  useEffect(() => {
    const load = async () => {
      try {
        const snap = await getDocs(query(collection(db, "bookings"), orderBy("createdAt", "desc")));
        setBookings(snap.docs.map((d) => ({ id: d.id, ...d.data() } as Booking)));
      } catch (err) { console.error("Failed to load bookings:", err); }
      finally { setLoading(false); }
      try {
        const snap = await getDocs(query(collection(db, "overheadExpenses"), orderBy("date", "desc")));
        setOverhead(snap.docs.map((d) => ({ id: d.id, ...d.data() } as OverheadEntry)));
      } catch (err) { console.error("overheadExpenses:", err); }
      try {
        const snap = await getDocs(query(collection(db, "cashflow"), orderBy("date", "desc")));
        setCashflow(snap.docs.map((d) => ({ id: d.id, ...d.data() } as CashflowEntry)));
      } catch (err) { console.error("cashflow:", err); }
    };
    load();
  }, []);

  const years = useMemo(() => availableYears(bookings as Record<string, unknown>[]), [bookings]);
  const range = useMemo(() => getRange(filter), [filter]);
  const filtered = useMemo(() => filterBookings(bookings as Record<string, unknown>[], range) as Booking[], [bookings, range]);
  const monthly = useMemo(() => monthlySeries(bookings as Record<string, unknown>[], filter.year), [bookings, filter.year]);

  const completedJobs = useMemo(() => filtered.filter((b) => b.status === "Completed"), [filtered]);
  const directJobs = useMemo(() => completedJobs.filter((b) => !b.assignedVendorId), [completedJobs]);
  const vendorJobs = useMemo(() => completedJobs.filter((b) => !!b.assignedVendorId), [completedJobs]);

  const filteredOverhead = useMemo(() => {
    if (!range.from && !range.to) return overhead;
    return overhead.filter((o) => inRange(toDate(o.date), range));
  }, [overhead, range]);

  const filteredCashflow = useMemo(() => {
    if (!range.from && !range.to) return cashflow.filter((c) => c.type !== "opening");
    return cashflow.filter((c) => c.type !== "opening" && inRange(toDate(c.date), range));
  }, [cashflow, range]);

  const balance = useMemo(() => {
    const sumBy = (list: CashflowEntry[], type: string) =>
      list.filter((x) => x.type === type).reduce((s, x) => s + Number(x.amount || 0), 0);
    const opening = sumBy(cashflow, "opening");
    const deposits = sumBy(cashflow, "deposit");
    const withdrawals = sumBy(cashflow, "withdrawal");
    const completedAll = bookings.filter((b) => b.status === "Completed");
    const bookingIn = completedAll.reduce((s, b) => s + Number(b.totalAmount || 0), 0);
    const jobOut = completedAll.reduce((s, b) => s + Number(b.jobExpense || 0), 0);
    const overheadOut = overhead.reduce((s, o) => s + Number(o.amount || 0), 0);
    return opening + deposits + bookingIn - withdrawals - jobOut - overheadOut;
  }, [cashflow, bookings, overhead]);

  const openingBalance = useMemo(
    () => cashflow.filter((c) => c.type === "opening").reduce((s, c) => s + Number(c.amount || 0), 0),
    [cashflow]
  );

  const periodFlow = useMemo(() => {
    const completedFiltered = filtered.filter((b) => b.status === "Completed");
    const bookingIn = completedFiltered.reduce((s, b) => s + Number(b.totalAmount || 0), 0);
    const jobOut = completedFiltered.reduce((s, b) => s + Number(b.jobExpense || 0), 0);
    const overheadOut = filteredOverhead.reduce((s, o) => s + Number(o.amount || 0), 0);
    const deposits = filteredCashflow.filter((c) => c.type === "deposit").reduce((s, c) => s + Number(c.amount || 0), 0);
    const withdrawals = filteredCashflow.filter((c) => c.type === "withdrawal").reduce((s, c) => s + Number(c.amount || 0), 0);
    const inflow = bookingIn + deposits;
    const outflow = jobOut + overheadOut + withdrawals;
    return { inflow, outflow, net: inflow - outflow, bookingIn, deposits, jobOut, overheadOut, withdrawals };
  }, [filtered, filteredOverhead, filteredCashflow]);

  const unloggedJobs = useMemo(
    () => completedJobs.filter((b) => !b.jobExpense || Number(b.jobExpense) === 0),
    [completedJobs]
  );

  const totals = useMemo(() => {
    const revenue = completedJobs.reduce((s, b) => s + Number(b.totalAmount || 0), 0);
    const jobExpense = completedJobs.reduce((s, b) => s + Number(b.jobExpense || 0), 0);
    const overheadTotal = filteredOverhead.reduce((s, o) => s + Number(o.amount || 0), 0);
    const totalExpense = jobExpense + overheadTotal;
    const profit = revenue - totalExpense;
    const margin = revenue > 0 ? Math.round((profit / revenue) * 100) : 0;
    return { revenue, jobExpense, overheadTotal, totalExpense, profit, margin };
  }, [completedJobs, filteredOverhead]);

  const jobsForMonth = useMemo(() => {
    if (activeMonth === null) return [];
    return completedJobs.filter((b) => {
      const d = bookingDate(b as Record<string, unknown>);
      return d && d.getFullYear() === filter.year && d.getMonth() === activeMonth;
    });
  }, [activeMonth, completedJobs, filter.year]);

  const kpis = [
    { label: "Completed revenue", value: money(totals.revenue), icon: IndianRupee, tone: "bg-teal-50 text-teal-700" },
    { label: "Job expenses", value: money(totals.jobExpense), icon: TrendingDown, tone: "bg-orange-50 text-orange-500" },
    { label: "Overhead expenses", value: money(totals.overheadTotal), icon: Building2, tone: "bg-red-50 text-red-600" },
    { label: "Net profit", value: money(totals.profit), icon: TrendingUp, tone: totals.profit >= 0 ? "bg-violet-50 text-violet-700" : "bg-red-50 text-red-700" },
    { label: "Profit margin", value: `${totals.margin}%`, icon: Percent, tone: "bg-sky-50 text-sky-700" },
  ];

  const handleAddOverhead = async () => {
    if (!newOverhead.label || !newOverhead.amount || !newOverhead.date) return;
    try {
      const entry = { label: newOverhead.label, amount: Number(newOverhead.amount), category: newOverhead.category, date: newOverhead.date, createdAt: new Date() };
      const ref = await addDoc(collection(db, "overheadExpenses"), entry);
      setOverhead((prev) => [{ id: ref.id, ...entry }, ...prev]);
      setNewOverhead({ label: "", amount: "", category: "Other", date: "" });
      setAddingOverhead(false);
    } catch (err) { console.error("Failed to add overhead:", err); }
  };

  const handleDeleteOverhead = async (id: string) => {
    try {
      await deleteDoc(doc(db, "overheadExpenses", id));
      setOverhead((prev) => prev.filter((o) => o.id !== id));
    } catch (err) { console.error("Failed to delete overhead:", err); }
  };

  const handleAddCash = async () => {
    if (!newCash.amount || !newCash.date) return;
    if (newCash.type === "opening" && cashflow.some((c) => c.type === "opening")) {
      alert("Opening balance is already set. Delete the existing one first to change it."); return;
    }
    try {
      const defaultLabel = newCash.type === "deposit" ? "Deposit" : newCash.type === "withdrawal" ? "Withdrawal" : "Opening balance";
      const entry = { type: newCash.type, label: newCash.label || defaultLabel, amount: Number(newCash.amount), date: newCash.date, createdAt: new Date() };
      const ref = await addDoc(collection(db, "cashflow"), entry);
      setCashflow((prev) => [{ id: ref.id, ...entry }, ...prev]);
      setNewCash({ type: "deposit", label: "", amount: "", date: "" });
      setAddingCash(false);
    } catch (err) { console.error("Failed to add cashflow:", err); alert((err as Error).message); }
  };

  const handleDeleteCash = async (id: string) => {
    try {
      await deleteDoc(doc(db, "cashflow", id));
      setCashflow((prev) => prev.filter((c) => c.id !== id));
    } catch (err) { console.error("Failed to delete cashflow:", err); }
  };

  const isSubYearPeriod = !["year", "all"].includes(filter.period);

  return (
    <AdminShell>
      <div className="space-y-4 sm:space-y-6">
        <h1 className="text-xl font-bold text-slate-950 sm:text-2xl">Expenses</h1>

        <PeriodFilter value={filter} onChange={setFilter} years={years} />

        <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-5 py-4">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-teal-50 p-2 text-teal-700"><Landmark size={20} /></div>
              <div>
                <h2 className="font-bold text-slate-900">Account balance &amp; cashflow</h2>
                <p className="text-xs text-slate-500">Live balance from bookings, expenses, and manual transactions.</p>
              </div>
            </div>
            <button onClick={() => setAddingCash(true)} className="inline-flex items-center gap-2 rounded-xl bg-teal-700 px-4 py-2 text-sm font-bold text-white hover:bg-teal-800">
              <Plus size={15} />Add transaction
            </button>
          </div>

          <div className="grid gap-4 p-5 md:grid-cols-4">
            <div className={`rounded-2xl p-5 shadow-sm md:col-span-1 ${balance >= 0 ? "bg-gradient-to-br from-teal-600 to-teal-700 text-white" : "bg-gradient-to-br from-red-600 to-red-700 text-white"}`}>
              <div className="mb-2 inline-flex rounded-xl bg-white/20 p-2"><Wallet size={20} /></div>
              <p className="text-3xl font-bold">{loading ? "—" : money(balance)}</p>
              <p className="mt-1 text-sm opacity-90">Current balance</p>
              {openingBalance > 0 && <p className="mt-2 text-xs opacity-75">Opening: {money(openingBalance)}</p>}
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-4">
              <div className="mb-2 inline-flex rounded-xl bg-teal-50 p-2 text-teal-700"><ArrowDownLeft size={18} /></div>
              <p className="text-2xl font-bold text-slate-950">{loading ? "—" : money(periodFlow.inflow)}</p>
              <p className="text-sm text-slate-500">Money in (period)</p>
              <p className="mt-1 text-xs text-slate-400">Bookings {compactMoney(periodFlow.bookingIn)} · Deposits {compactMoney(periodFlow.deposits)}</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-4">
              <div className="mb-2 inline-flex rounded-xl bg-red-50 p-2 text-red-600"><ArrowUpRight size={18} /></div>
              <p className="text-2xl font-bold text-slate-950">{loading ? "—" : money(periodFlow.outflow)}</p>
              <p className="text-sm text-slate-500">Money out (period)</p>
              <p className="mt-1 text-xs text-slate-400">Job {compactMoney(periodFlow.jobOut)} · Overhead {compactMoney(periodFlow.overheadOut)} · Withdraw {compactMoney(periodFlow.withdrawals)}</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-4">
              <div className={`mb-2 inline-flex rounded-xl p-2 ${periodFlow.net >= 0 ? "bg-violet-50 text-violet-700" : "bg-red-50 text-red-600"}`}>
                {periodFlow.net >= 0 ? <TrendingUp size={18} /> : <TrendingDown size={18} />}
              </div>
              <p className={`text-2xl font-bold ${periodFlow.net >= 0 ? "text-violet-700" : "text-red-700"}`}>{loading ? "—" : money(periodFlow.net)}</p>
              <p className="text-sm text-slate-500">Net cashflow (period)</p>
              <p className="mt-1 text-xs text-slate-400">In − out for the selected range</p>
            </div>
          </div>

          {addingCash && (
            <div className="border-t border-slate-100 bg-slate-50 p-5">
              <div className="flex flex-wrap gap-3">
                <select value={newCash.type} onChange={(e) => setNewCash({ ...newCash, type: e.target.value })} className={fieldCls}>
                  <option value="deposit">Deposit (money in)</option>
                  <option value="withdrawal">Withdrawal (money out)</option>
                  <option value="opening">Opening balance</option>
                </select>
                <input type="text" placeholder="Label / note (optional)" value={newCash.label} onChange={(e) => setNewCash({ ...newCash, label: e.target.value })} className={`${fieldCls} min-w-[200px] flex-1`} />
                <div className="relative">
                  <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-400">₹</span>
                  <input type="number" placeholder="Amount" value={newCash.amount} onChange={(e) => setNewCash({ ...newCash, amount: e.target.value })} className={`${fieldCls} w-32 pl-7`} />
                </div>
                <input type="date" value={newCash.date} onChange={(e) => setNewCash({ ...newCash, date: e.target.value })} className={fieldCls} />
                <div className="flex gap-2">
                  <button onClick={handleAddCash} disabled={!newCash.amount || !newCash.date} className="rounded-lg bg-teal-700 px-4 py-2 text-sm font-bold text-white hover:bg-teal-800 disabled:cursor-not-allowed disabled:bg-slate-300">Save</button>
                  <button onClick={() => { setAddingCash(false); setNewCash({ type: "deposit", label: "", amount: "", date: "" }); }} className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-100">Cancel</button>
                </div>
              </div>
              <p className="mt-2 text-xs text-slate-500">For per-booking expenses use the Bookings page. For rent/salary use Overhead expenses below.</p>
            </div>
          )}

          <div className="border-t border-slate-100">
            <div className="flex items-center justify-between px-5 py-3">
              <h3 className="text-sm font-bold text-slate-700">Manual transactions</h3>
              <span className="text-xs text-slate-400">{cashflow.length} entr{cashflow.length === 1 ? "y" : "ies"}</span>
            </div>
            {cashflow.length === 0 ? (
              <p className="px-5 pb-6 text-center text-sm text-slate-500">No manual transactions yet. Click &quot;Add transaction&quot; to set an opening balance or log a deposit/withdrawal.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[500px] text-sm">
                  <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                    <tr><th className="px-5 py-3 text-left">Type</th><th className="px-5 py-3 text-left">Label</th><th className="px-5 py-3 text-left">Date</th><th className="px-5 py-3 text-right">Amount</th><th className="px-5 py-3" /></tr>
                  </thead>
                  <tbody>
                    {cashflow.map((c) => {
                      const isIn = c.type === "deposit" || c.type === "opening";
                      const tone = c.type === "opening" ? "bg-sky-50 text-sky-700" : c.type === "deposit" ? "bg-teal-50 text-teal-700" : "bg-red-50 text-red-600";
                      const labelText = c.type === "opening" ? "Opening" : c.type === "deposit" ? "Deposit" : "Withdrawal";
                      return (
                        <tr key={c.id} className="border-t border-slate-100 hover:bg-slate-50">
                          <td className="px-5 py-3"><span className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${tone}`}>{labelText}</span></td>
                          <td className="px-5 py-3 font-medium text-slate-800">{c.label || "—"}</td>
                          <td className="px-5 py-3 text-slate-500">{c.date}</td>
                          <td className={`px-5 py-3 text-right font-bold ${isIn ? "text-teal-700" : "text-red-600"}`}>{isIn ? "+" : "−"} {money(Number(c.amount || 0))}</td>
                          <td className="px-5 py-3 text-right">
                            <button onClick={() => handleDeleteCash(c.id)} className="rounded-lg p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-500"><Trash2 size={15} /></button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </section>

        {!loading && unloggedJobs.length > 0 && (
          <div className="flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4">
            <AlertTriangle size={18} className="mt-0.5 flex-shrink-0 text-amber-600" />
            <div>
              <p className="font-semibold text-amber-800">{unloggedJobs.length} completed job{unloggedJobs.length > 1 ? "s" : ""} missing expense data</p>
              <p className="text-sm text-amber-700">These show ₹0 expense which inflates your profit. Open Bookings to fill in job expenses.</p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-5">
          {(showAllKpis ? kpis : kpis.slice(0, 3)).map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm sm:p-4">
                <div className={`mb-2 inline-flex rounded-xl p-1.5 sm:mb-3 sm:p-2 ${item.tone}`}>
                  <Icon size={16} className="sm:hidden" /><Icon size={20} className="hidden sm:block" />
                </div>
                <p className="text-lg font-bold text-slate-950 sm:text-2xl">{loading ? "—" : item.value}</p>
                <p className="text-xs text-slate-500 sm:text-sm">{item.label}</p>
              </div>
            );
          })}
          <button onClick={() => setShowAllKpis((v) => !v)} className="rounded-2xl border border-dashed border-slate-300 bg-white p-3 text-xs font-bold text-slate-600 transition hover:border-teal-500 hover:text-teal-700 sm:text-sm">
            {showAllKpis ? "Show less" : `+ ${kpis.length - 3} more`}
          </button>
        </div>

        <Collapsible title="Direct vs vendor split" subtitle="How completed jobs break down by who handled them.">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-100 bg-white p-4">
              <div className="mb-4 flex items-center gap-3">
                <div className="rounded-xl bg-teal-50 p-2 text-teal-700"><IndianRupee size={18} /></div>
                <div><p className="font-bold text-slate-900">Direct jobs</p><p className="text-xs text-slate-500">Your equipment</p></div>
              </div>
              <div className="grid grid-cols-3 gap-2 text-sm">
                <div className="rounded-xl bg-slate-50 p-2"><p className="text-xs text-slate-500">Jobs</p><p className="mt-1 font-bold text-slate-900">{loading ? "—" : directJobs.length}</p></div>
                <div className="rounded-xl bg-teal-50 p-2"><p className="text-xs text-slate-500">Revenue</p><p className="mt-1 font-bold text-teal-700">{loading ? "—" : compactMoney(directJobs.reduce((s, b) => s + Number(b.totalAmount || 0), 0))}</p></div>
                <div className="rounded-xl bg-red-50 p-2"><p className="text-xs text-slate-500">Expenses</p><p className="mt-1 font-bold text-red-600">{loading ? "—" : compactMoney(directJobs.reduce((s, b) => s + Number(b.jobExpense || 0), 0))}</p></div>
              </div>
            </div>
            <div className="rounded-2xl border border-slate-100 bg-white p-4">
              <div className="mb-4 flex items-center gap-3">
                <div className="rounded-xl bg-violet-50 p-2 text-violet-700"><Users size={18} /></div>
                <div><p className="font-bold text-slate-900">Vendor jobs</p><p className="text-xs text-slate-500">You keep the difference</p></div>
              </div>
              <div className="grid grid-cols-3 gap-2 text-sm">
                <div className="rounded-xl bg-slate-50 p-2"><p className="text-xs text-slate-500">Jobs</p><p className="mt-1 font-bold text-slate-900">{loading ? "—" : vendorJobs.length}</p></div>
                <div className="rounded-xl bg-teal-50 p-2"><p className="text-xs text-slate-500">Revenue</p><p className="mt-1 font-bold text-teal-700">{loading ? "—" : compactMoney(vendorJobs.reduce((s, b) => s + Number(b.totalAmount || 0), 0))}</p></div>
                <div className="rounded-xl bg-red-50 p-2"><p className="text-xs text-slate-500">Vendor pay</p><p className="mt-1 font-bold text-red-600">{loading ? "—" : compactMoney(vendorJobs.reduce((s, b) => s + Number(b.jobExpense || 0), 0))}</p></div>
              </div>
            </div>
          </div>
        </Collapsible>

        {isSubYearPeriod && (
          <p className="rounded-xl border border-slate-100 bg-slate-50 px-4 py-2.5 text-xs text-slate-500">Monthly charts always show the full selected year for trend context. KPI cards reflect your selected period.</p>
        )}

        <Collapsible title={`Revenue — ${filter.year}`} subtitle="Completed jobs only." badge={compactMoney(monthly.reduce((s, m) => s + m.revenue, 0))}>
          <BarChart data={monthly} valueKey="revenue" labelKey="month" format={compactMoney} color="bg-teal-500" />
        </Collapsible>

        <Collapsible title={`Job expenses — ${filter.year}`} subtitle="Click a bar to drill into jobs." badge={compactMoney(monthly.reduce((s, m) => s + m.expense, 0))}>
          <BarChart data={monthly} valueKey="expense" labelKey="month" format={compactMoney} color="bg-red-400" onBarClick={(item) => setActiveMonth(activeMonth === item.idx ? null : (item.idx as number))} activeIdx={activeMonth} />
        </Collapsible>

        <Collapsible title={`Net profit — ${filter.year}`} subtitle="Revenue minus job expenses." badge={compactMoney(monthly.reduce((s, m) => s + m.profit, 0))}>
          <BarChart data={monthly} valueKey="profit" labelKey="month" format={compactMoney} color="bg-violet-500" />
        </Collapsible>

        <Collapsible title={`Monthly breakdown — ${filter.year}`} subtitle="Click a row to see individual jobs.">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px] text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-5 py-3 text-left">Month</th>
                  <th className="px-5 py-3 text-right">Jobs</th>
                  <th className="px-5 py-3 text-right">Revenue</th>
                  <th className="px-5 py-3 text-right">Job expenses</th>
                  <th className="px-5 py-3 text-right">Job profit</th>
                  <th className="px-5 py-3 text-right">Margin</th>
                </tr>
              </thead>
              <tbody>
                {monthly.map((row) => {
                  const jobCount = bookings.filter((b) => {
                    const d = bookingDate(b as Record<string, unknown>);
                    return b.status === "Completed" && d && d.getFullYear() === filter.year && d.getMonth() === row.idx;
                  }).length;
                  const margin = row.revenue > 0 ? Math.round((row.profit / row.revenue) * 100) : 0;
                  const isActive = activeMonth === row.idx;
                  return (
                    <tr key={row.idx} onClick={() => setActiveMonth(isActive ? null : row.idx)} className={`cursor-pointer border-t border-slate-100 transition hover:bg-slate-50 ${isActive ? "bg-violet-50" : ""}`}>
                      <td className="px-5 py-3 font-semibold text-slate-800">{row.month}</td>
                      <td className="px-5 py-3 text-right text-slate-600">{jobCount}</td>
                      <td className="px-5 py-3 text-right font-medium text-teal-700">{row.revenue > 0 ? money(row.revenue) : "—"}</td>
                      <td className="px-5 py-3 text-right font-medium text-red-600">{row.expense > 0 ? money(row.expense) : "—"}</td>
                      <td className={`px-5 py-3 text-right font-bold ${row.profit >= 0 ? "text-violet-700" : "text-red-700"}`}>{row.revenue > 0 ? money(row.profit) : "—"}</td>
                      <td className="px-5 py-3 text-right text-slate-500">{row.revenue > 0 ? `${margin}%` : "—"}</td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot className="border-t-2 border-slate-200 bg-slate-50 text-sm font-bold">
                <tr>
                  <td className="px-5 py-3 text-slate-700">Year total</td>
                  <td className="px-5 py-3 text-right text-slate-700">{bookings.filter((b) => { const d = bookingDate(b as Record<string, unknown>); return b.status === "Completed" && d && d.getFullYear() === filter.year; }).length}</td>
                  <td className="px-5 py-3 text-right text-teal-700">{money(monthly.reduce((s, m) => s + m.revenue, 0))}</td>
                  <td className="px-5 py-3 text-right text-red-600">{money(monthly.reduce((s, m) => s + m.expense, 0))}</td>
                  <td className={`px-5 py-3 text-right ${monthly.reduce((s, m) => s + m.profit, 0) >= 0 ? "text-violet-700" : "text-red-700"}`}>{money(monthly.reduce((s, m) => s + m.profit, 0))}</td>
                  <td className="px-5 py-3 text-right text-slate-500">{(() => { const yr = monthly.reduce((s, m) => s + m.revenue, 0); const yp = monthly.reduce((s, m) => s + m.profit, 0); return yr > 0 ? `${Math.round((yp / yr) * 100)}%` : "—"; })()}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </Collapsible>

        {activeMonth !== null && (
          <section className="rounded-2xl border border-violet-200 bg-white shadow-sm">
            <div className="border-b border-violet-100 bg-violet-50 px-5 py-4">
              <h2 className="font-bold text-violet-900">Jobs in {MONTHS[activeMonth]} {filter.year}<span className="ml-2 text-sm font-normal text-violet-600">({jobsForMonth.length} completed)</span></h2>
            </div>
            {jobsForMonth.length === 0 ? (
              <p className="p-6 text-center text-sm text-slate-500">No completed jobs in this month.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[700px] text-sm">
                  <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                    <tr><th className="px-5 py-3 text-left">Customer</th><th className="px-5 py-3 text-left">Service</th><th className="px-5 py-3 text-left">Type</th><th className="px-5 py-3 text-left">Vendor</th><th className="px-5 py-3 text-right">Revenue</th><th className="px-5 py-3 text-right">Expense</th><th className="px-5 py-3 text-right">Profit</th></tr>
                  </thead>
                  <tbody>
                    {jobsForMonth.map((b) => {
                      const rev = Number(b.totalAmount || 0);
                      const exp = Number(b.jobExpense || 0);
                      const pft = rev - exp;
                      const isVendor = !!b.assignedVendorId;
                      const noExpense = !b.jobExpense || Number(b.jobExpense) === 0;
                      return (
                        <tr key={b.id} className="border-t border-slate-100 hover:bg-slate-50">
                          <td className="px-5 py-3"><p className="font-semibold text-slate-900">{b.name || "—"}</p><p className="text-xs text-slate-400">{b.phone || ""}</p></td>
                          <td className="px-5 py-3 text-slate-600">{b.serviceLabel || b.service || "—"}</td>
                          <td className="px-5 py-3"><span className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${isVendor ? "bg-violet-50 text-violet-700" : "bg-teal-50 text-teal-700"}`}>{isVendor ? "Vendor" : "Direct"}</span></td>
                          <td className="px-5 py-3 text-slate-500">{b.assignedVendorName || "—"}</td>
                          <td className="px-5 py-3 text-right font-medium text-teal-700">{money(rev)}</td>
                          <td className="px-5 py-3 text-right font-medium">{noExpense ? <span className="font-semibold text-amber-500">missing</span> : <span className="text-red-600">{money(exp)}</span>}</td>
                          <td className={`px-5 py-3 text-right font-bold ${pft >= 0 ? "text-violet-700" : "text-red-700"}`}>{money(pft)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        )}

        <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-5 py-4">
            <div>
              <h2 className="font-bold text-slate-900">Overhead expenses</h2>
              <p className="text-xs text-slate-500">Standing costs not tied to a single job — supervisor, rent, office. Counted in your net profit above.</p>
            </div>
            <button onClick={() => setAddingOverhead(true)} className="inline-flex items-center gap-2 rounded-xl bg-teal-700 px-4 py-2 text-sm font-bold text-white hover:bg-teal-800">
              <Plus size={15} />Add expense
            </button>
          </div>

          {addingOverhead && (
            <div className="border-b border-slate-100 bg-slate-50 p-5">
              <div className="flex flex-wrap gap-3">
                <input type="text" placeholder="Label (e.g. Supervisor — June)" value={newOverhead.label} onChange={(e) => setNewOverhead({ ...newOverhead, label: e.target.value })} className={`${fieldCls} min-w-[200px] flex-1`} />
                <div className="relative">
                  <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-400">₹</span>
                  <input type="number" placeholder="Amount" value={newOverhead.amount} onChange={(e) => setNewOverhead({ ...newOverhead, amount: e.target.value })} className={`${fieldCls} w-32 pl-7`} />
                </div>
                <select value={newOverhead.category} onChange={(e) => setNewOverhead({ ...newOverhead, category: e.target.value })} className={fieldCls}>
                  {OVERHEAD_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
                <input type="date" value={newOverhead.date} onChange={(e) => setNewOverhead({ ...newOverhead, date: e.target.value })} className={fieldCls} />
                <div className="flex gap-2">
                  <button onClick={handleAddOverhead} disabled={!newOverhead.label || !newOverhead.amount || !newOverhead.date} className="rounded-lg bg-teal-700 px-4 py-2 text-sm font-bold text-white hover:bg-teal-800 disabled:cursor-not-allowed disabled:bg-slate-300">Save</button>
                  <button onClick={() => { setAddingOverhead(false); setNewOverhead({ label: "", amount: "", category: "Other", date: "" }); }} className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-100">Cancel</button>
                </div>
              </div>
            </div>
          )}

          {filteredOverhead.length === 0 ? (
            <p className="p-6 text-center text-sm text-slate-500">No overhead expenses for this period.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[500px] text-sm">
                <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                  <tr><th className="px-5 py-3 text-left">Label</th><th className="px-5 py-3 text-left">Category</th><th className="px-5 py-3 text-left">Date</th><th className="px-5 py-3 text-right">Amount</th><th className="px-5 py-3" /></tr>
                </thead>
                <tbody>
                  {filteredOverhead.map((o) => (
                    <tr key={o.id} className="border-t border-slate-100 hover:bg-slate-50">
                      <td className="px-5 py-3 font-medium text-slate-800">{o.label}</td>
                      <td className="px-5 py-3"><span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-600">{o.category}</span></td>
                      <td className="px-5 py-3 text-slate-500">{o.date}</td>
                      <td className="px-5 py-3 text-right font-bold text-red-600">{money(Number(o.amount || 0))}</td>
                      <td className="px-5 py-3 text-right">
                        <button onClick={() => handleDeleteOverhead(o.id)} className="rounded-lg p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-500"><Trash2 size={15} /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="border-t-2 border-slate-200 bg-slate-50 text-sm font-bold">
                  <tr>
                    <td colSpan={3} className="px-5 py-3 text-slate-700">Total overhead</td>
                    <td className="px-5 py-3 text-right text-red-600">{money(filteredOverhead.reduce((s, o) => s + Number(o.amount || 0), 0))}</td>
                    <td />
                  </tr>
                </tfoot>
              </table>
            </div>
          )}
        </section>
      </div>
    </AdminShell>
  );
}
