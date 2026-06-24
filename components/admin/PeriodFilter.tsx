"use client";

import { useState } from "react";
import { Calendar, ChevronDown } from "lucide-react";
import { MONTHS, PERIOD_OPTIONS } from "@/lib/admin/analytics";

interface FilterValue {
  period: string;
  year: number;
  month: number;
  from: string;
  to: string;
}

function summarize(value: FilterValue): string {
  const opt = PERIOD_OPTIONS.find((o) => o.value === value.period);
  if (!opt) return "All time";
  if (value.period === "month") return `${MONTHS[value.month] || ""} ${value.year}`;
  if (value.period === "year") return `${value.year}`;
  if (value.period === "custom") {
    if (value.from && value.to) return `${value.from} → ${value.to}`;
    return "Custom range";
  }
  return opt.label;
}

export default function PeriodFilter({
  value,
  onChange,
  years,
}: {
  value: FilterValue;
  onChange: (v: FilterValue) => void;
  years: number[];
}) {
  const [open, setOpen] = useState(false);
  const update = (patch: Partial<FilterValue>) => onChange({ ...value, ...patch });

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-3 px-4 py-3 sm:hidden"
      >
        <div className="flex items-center gap-2 text-sm font-bold text-slate-700">
          <Calendar size={16} className="text-teal-700" />
          <span>{summarize(value)}</span>
        </div>
        <ChevronDown size={16} className={`text-slate-500 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      <div className={`${open ? "block" : "hidden"} px-4 pb-4 sm:block sm:px-4 sm:py-4`}>
        <div className="mb-3 hidden items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-500 sm:flex">
          <Calendar size={14} />
          Filter by period
        </div>

        <div className="flex flex-wrap gap-2">
          {PERIOD_OPTIONS.map((opt) => {
            const active = value.period === opt.value;
            return (
              <button
                key={opt.value}
                onClick={() => update({ period: opt.value })}
                className={`rounded-xl px-3 py-1.5 text-xs font-bold transition ${
                  active
                    ? "bg-teal-700 text-white"
                    : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>

        {(value.period === "month" || value.period === "year") && (
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <select
              value={value.year}
              onChange={(e) => update({ year: Number(e.target.value) })}
              className="rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
            >
              {years.map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
            {value.period === "month" && (
              <select
                value={value.month}
                onChange={(e) => update({ month: Number(e.target.value) })}
                className="rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
              >
                {MONTHS.map((m, idx) => (
                  <option key={m} value={idx}>{m}</option>
                ))}
              </select>
            )}
          </div>
        )}

        {value.period === "custom" && (
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <label className="flex items-center gap-2 text-xs font-semibold text-slate-500">
              From
              <input
                type="date"
                value={value.from || ""}
                onChange={(e) => update({ from: e.target.value })}
                className="rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
              />
            </label>
            <label className="flex items-center gap-2 text-xs font-semibold text-slate-500">
              To
              <input
                type="date"
                value={value.to || ""}
                onChange={(e) => update({ to: e.target.value })}
                className="rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
              />
            </label>
          </div>
        )}
      </div>
    </div>
  );
}
