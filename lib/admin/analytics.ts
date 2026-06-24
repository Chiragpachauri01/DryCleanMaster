export const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

export const PERIOD_OPTIONS = [
  { value: "today", label: "Today" },
  { value: "7d", label: "Last 7 days" },
  { value: "30d", label: "Last 30 days" },
  { value: "month", label: "This month" },
  { value: "year", label: "This year" },
  { value: "all", label: "All time" },
  { value: "custom", label: "Custom" },
];

export function toDate(value: unknown): Date | null {
  if (!value) return null;
  if (typeof value === "object" && value !== null && "seconds" in value && typeof (value as { seconds: number }).seconds === "number") {
    return new Date((value as { seconds: number }).seconds * 1000);
  }
  if (typeof value === "object" && value !== null && typeof (value as { toDate?: () => Date }).toDate === "function") {
    return (value as { toDate: () => Date }).toDate();
  }
  const parsed = new Date(value as string | number);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

export function bookingDate(booking: Record<string, unknown>): Date | null {
  if (booking.status === "Completed") {
    return toDate(booking.finalDate) || toDate(booking.createdAt) || toDate(booking.preferredDate);
  }
  return toDate(booking.createdAt) || toDate(booking.preferredDate) || toDate(booking.finalDate);
}

export function startOfDay(d: Date): Date {
  const out = new Date(d);
  out.setHours(0, 0, 0, 0);
  return out;
}

export function endOfDay(d: Date): Date {
  const out = new Date(d);
  out.setHours(23, 59, 59, 999);
  return out;
}

interface FilterState {
  period: string;
  from?: string;
  to?: string;
  year?: number;
  month?: number;
}

interface Range {
  from: Date | null;
  to: Date | null;
}

export function getRange({ period, from, to, year, month }: FilterState): Range {
  const now = new Date();
  if (period === "custom") {
    const fromDate = from ? startOfDay(new Date(from)) : null;
    const toDate = to ? endOfDay(new Date(to)) : null;
    return { from: fromDate, to: toDate };
  }
  if (period === "today") return { from: startOfDay(now), to: endOfDay(now) };
  if (period === "7d") {
    const f = new Date(now);
    f.setDate(f.getDate() - 6);
    return { from: startOfDay(f), to: endOfDay(now) };
  }
  if (period === "30d") {
    const f = new Date(now);
    f.setDate(f.getDate() - 29);
    return { from: startOfDay(f), to: endOfDay(now) };
  }
  if (period === "month") {
    const y = year ?? now.getFullYear();
    const m = month ?? now.getMonth();
    return { from: new Date(y, m, 1, 0, 0, 0, 0), to: new Date(y, m + 1, 0, 23, 59, 59, 999) };
  }
  if (period === "year") {
    const y = year ?? now.getFullYear();
    return { from: new Date(y, 0, 1, 0, 0, 0, 0), to: new Date(y, 11, 31, 23, 59, 59, 999) };
  }
  return { from: null, to: null };
}

export function inRange(date: Date | null, range: Range): boolean {
  if (!date) return false;
  if (range.from && date < range.from) return false;
  if (range.to && date > range.to) return false;
  return true;
}

export function filterBookings(bookings: Record<string, unknown>[], range: Range): Record<string, unknown>[] {
  if (!range.from && !range.to) return bookings;
  return bookings.filter((b) => inRange(bookingDate(b), range));
}

export function availableYears(bookings: Record<string, unknown>[]): number[] {
  const years = new Set<number>();
  bookings.forEach((b) => {
    const d = bookingDate(b);
    if (d) years.add(d.getFullYear());
  });
  const list = Array.from(years).sort((a, b) => b - a);
  if (list.length === 0) list.push(new Date().getFullYear());
  return list;
}

export function bookingRevenue(b: Record<string, unknown>): number {
  if (b.status === "Cancelled") return 0;
  return Number(b.totalAmount || 0);
}

export function summarize(bookings: Record<string, unknown>[]) {
  let revenue = 0;
  let collected = 0;
  let pending = 0;
  let totalExpense = 0;
  const counts: Record<string, number> = { New: 0, Confirmed: 0, Completed: 0, Cancelled: 0 };

  bookings.forEach((b) => {
    const status = (b.status as string) || "New";
    counts[status] = (counts[status] || 0) + 1;
    if (status === "Cancelled") return;
    const total = Number(b.totalAmount || 0);
    revenue += total;
    const advance = Number(b.advancePaid || 0);
    collected += advance;
    pending += Math.max(0, total - advance);
    if (status === "Completed") {
      totalExpense += Number(b.jobExpense || 0);
    }
  });

  const leads = bookings.length;
  const wins = counts.Confirmed + counts.Completed;
  const conversion = leads ? Math.round((wins / leads) * 100) : 0;
  const avgOrder = wins ? Math.round(revenue / wins) : 0;
  const completedRevenue = bookings
    .filter((b) => b.status === "Completed")
    .reduce((s, b) => s + Number(b.totalAmount || 0), 0);
  const profit = completedRevenue - totalExpense;

  return { leads, revenue, collected, pending, counts, conversion, avgOrder, totalExpense, profit };
}

export function groupBy(bookings: Record<string, unknown>[], getKey: (b: Record<string, unknown>) => string | undefined) {
  const map = new Map<string, { key: string; bookings: Record<string, unknown>[]; leads: number; revenue: number }>();
  bookings.forEach((b) => {
    const key = getKey(b);
    if (!key) return;
    if (!map.has(key)) map.set(key, { key, bookings: [], leads: 0, revenue: 0 });
    const entry = map.get(key)!;
    entry.bookings.push(b);
    entry.leads += 1;
    entry.revenue += bookingRevenue(b);
  });
  return Array.from(map.values());
}

export function monthlySeries(bookings: Record<string, unknown>[], year: number) {
  const buckets = MONTHS.map((m, idx) => ({ month: m, idx, leads: 0, revenue: 0, expense: 0, profit: 0 }));
  bookings.forEach((b) => {
    const d = bookingDate(b);
    if (!d || d.getFullYear() !== year) return;
    const idx = d.getMonth();
    buckets[idx].leads += 1;
    const rev = bookingRevenue(b);
    buckets[idx].revenue += rev;
    if (b.status === "Completed") {
      const exp = Number(b.jobExpense || 0);
      buckets[idx].expense += exp;
      buckets[idx].profit += rev - exp;
    }
  });
  return buckets;
}

export function money(value: number | string | undefined): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number(value || 0));
}

export function compactMoney(value: number | string | undefined): string {
  const num = Number(value || 0);
  if (num >= 10000000) return `₹${(num / 10000000).toFixed(1)}Cr`;
  if (num >= 100000) return `₹${(num / 100000).toFixed(1)}L`;
  if (num >= 1000) return `₹${(num / 1000).toFixed(1)}K`;
  return `₹${num}`;
}
