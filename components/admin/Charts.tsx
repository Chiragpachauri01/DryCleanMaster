"use client";

import { compactMoney } from "@/lib/admin/analytics";

const MAX_BAR_PX = 160;

interface BarChartItem {
  [key: string]: unknown;
  idx?: number;
}

export function BarChart({
  data,
  valueKey = "revenue",
  labelKey = "month",
  format = compactMoney,
  color = "bg-teal-600",
  onBarClick,
  activeIdx,
}: {
  data: BarChartItem[];
  valueKey?: string;
  labelKey?: string;
  format?: (v: number) => string;
  color?: string;
  onBarClick?: (item: BarChartItem) => void;
  activeIdx?: number | null;
}) {
  const max = Math.max(1, ...data.map((d) => Number(d[valueKey] || 0)));
  return (
    <div className="flex h-56 items-end gap-1 sm:gap-1.5">
      {data.map((d) => {
        const value = Number(d[valueKey] || 0);
        const barPx = value > 0 ? Math.max(4, Math.round((value / max) * MAX_BAR_PX)) : 0;
        const isActive = activeIdx !== undefined && activeIdx !== null && d.idx === activeIdx;
        return (
          <div
            key={String(d[labelKey])}
            className={`group relative flex flex-1 flex-col items-center ${onBarClick ? "cursor-pointer" : ""}`}
            onClick={() => onBarClick?.(d)}
          >
            <div className="absolute bottom-full mb-1 hidden whitespace-nowrap text-[10px] font-bold text-slate-700 group-hover:block">
              {format(value)}
            </div>
            <div
              className={`w-full rounded-t-md transition-all hover:opacity-80 ${color} ${isActive ? "ring-2 ring-offset-1 ring-teal-500" : ""}`}
              style={{ height: `${barPx}px` }}
              title={`${String(d[labelKey])}: ${format(value)}`}
            />
            <div className={`mt-1.5 text-[10px] font-semibold ${isActive ? "text-teal-700" : "text-slate-500"}`}>
              {String(d[labelKey])}
            </div>
          </div>
        );
      })}
    </div>
  );
}

interface HBarItem {
  [key: string]: unknown;
}

export function HBarList({
  items,
  valueKey = "revenue",
  labelKey = "key",
  format = compactMoney,
  color = "bg-teal-500",
  emptyText = "No data yet.",
}: {
  items: HBarItem[];
  valueKey?: string;
  labelKey?: string;
  format?: (v: number) => string;
  color?: string;
  emptyText?: string;
}) {
  if (!items.length) {
    return <p className="py-4 text-center text-sm text-slate-500">{emptyText}</p>;
  }
  const max = Math.max(1, ...items.map((i) => Number(i[valueKey] || 0)));
  return (
    <div className="space-y-2.5">
      {items.map((item) => {
        const value = Number(item[valueKey] || 0);
        const width = Math.round((value / max) * 100);
        return (
          <div key={String(item[labelKey])}>
            <div className="mb-1 flex items-center justify-between gap-2 text-xs">
              <span className="truncate font-semibold text-slate-700">{String(item[labelKey])}</span>
              <span className="font-bold text-slate-900">{format(value)}</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
              <div className={`h-full ${color}`} style={{ width: `${Math.max(width, 4)}%` }} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function StatusBars({ counts }: { counts: Record<string, number> }) {
  const palette: Record<string, string> = {
    New: "bg-amber-500",
    Confirmed: "bg-emerald-500",
    Completed: "bg-sky-600",
    Cancelled: "bg-red-500",
  };
  const total = Object.values(counts).reduce((s, n) => s + n, 0) || 1;
  const order = ["New", "Confirmed", "Completed", "Cancelled"];
  return (
    <div>
      <div className="flex h-3 w-full overflow-hidden rounded-full bg-slate-100">
        {order.map((key) => {
          const value = counts[key] || 0;
          if (!value) return null;
          return (
            <div
              key={key}
              className={palette[key]}
              style={{ width: `${(value / total) * 100}%` }}
              title={`${key}: ${value}`}
            />
          );
        })}
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2 text-xs sm:grid-cols-4">
        {order.map((key) => (
          <div key={key} className="flex items-center gap-2">
            <span className={`h-2.5 w-2.5 rounded-full ${palette[key]}`} />
            <span className="font-semibold text-slate-600">{key}</span>
            <span className="ml-auto font-bold text-slate-900">{counts[key] || 0}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
