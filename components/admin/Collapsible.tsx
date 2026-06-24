"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function Collapsible({
  title,
  subtitle,
  defaultOpen = false,
  badge,
  children,
}: {
  title: string;
  subtitle?: string;
  defaultOpen?: boolean;
  badge?: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left sm:px-5 sm:py-4"
      >
        <div className="min-w-0">
          <h2 className="font-bold text-slate-900">{title}</h2>
          {subtitle && <p className="truncate text-xs text-slate-500">{subtitle}</p>}
        </div>
        <div className="flex shrink-0 items-center gap-2">
          {badge && (
            <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-bold text-slate-600">
              {badge}
            </span>
          )}
          <ChevronDown
            size={18}
            className={`text-slate-500 transition-transform ${open ? "rotate-180" : ""}`}
          />
        </div>
      </button>
      {open && <div className="border-t border-slate-100 p-4 sm:p-5">{children}</div>}
    </section>
  );
}
