"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase/firebase.auth";
import {
  BarChart3,
  CalendarCheck,
  LayoutDashboard,
  LogOut,
  Mail,
  Menu,
  MoreHorizontal,
  TrendingDown,
  Users,
  X,
} from "lucide-react";

const navItems = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard, primary: true },
  { name: "Bookings", href: "/admin/bookings", icon: CalendarCheck, primary: true },
  { name: "Expenses", href: "/admin/expenses", icon: TrendingDown, primary: true },
  { name: "Vendors", href: "/admin/vendors", icon: Users },
  { name: "Custom Email", href: "/admin/email", icon: Mail },
];

const primaryNav = navItems.filter((item) => item.primary);

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const logout = async () => {
    await signOut(auth);
    router.push("/admin/login");
  };

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 flex h-14 items-center justify-between border-b border-slate-200 bg-white/95 px-4 shadow-sm backdrop-blur md:hidden">
        <Link href="/admin/dashboard" className="flex items-center gap-2 text-base font-bold text-teal-700">
          <BarChart3 size={20} />
          DCM Admin
        </Link>
        <button
          aria-label="Toggle menu"
          onClick={() => setIsOpen((v) => !v)}
          className="rounded-lg border border-slate-200 p-2 text-slate-700"
        >
          {isOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </header>

      {/* Mobile bottom nav */}
      <nav className="fixed inset-x-0 bottom-0 z-30 flex border-t border-slate-200 bg-white/95 shadow-[0_-2px_10px_rgba(0,0,0,0.04)] backdrop-blur md:hidden">
        {primaryNav.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex flex-1 flex-col items-center justify-center gap-0.5 py-2.5 text-[11px] font-bold transition ${
                isActive ? "text-teal-700" : "text-slate-500 hover:text-slate-800"
              }`}
            >
              <Icon size={20} />
              <span>{item.name}</span>
            </Link>
          );
        })}
        <button
          onClick={() => setIsOpen(true)}
          className="flex flex-1 flex-col items-center justify-center gap-0.5 py-2.5 text-[11px] font-bold text-slate-500 hover:text-slate-800"
        >
          <MoreHorizontal size={20} />
          <span>More</span>
        </button>
      </nav>

      {isOpen && (
        <button
          aria-label="Close menu overlay"
          className="fixed inset-0 z-30 bg-slate-950/40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r border-teal-900/20 bg-teal-800 p-4 text-white shadow-2xl transition-transform duration-300 md:sticky md:top-0 md:h-screen md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between rounded-xl bg-white/10 p-3">
          <Link href="/admin/dashboard" onClick={() => setIsOpen(false)}>
            <p className="text-lg font-bold leading-tight">DCM Admin</p>
            <p className="text-xs text-teal-100">DryClean Masters operations</p>
          </Link>
          <button
            aria-label="Close menu"
            onClick={() => setIsOpen(false)}
            className="rounded-lg p-2 text-teal-100 hover:bg-white/10 md:hidden"
          >
            <X size={18} />
          </button>
        </div>

        <nav className="mt-6 space-y-1 text-sm font-semibold">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 rounded-xl px-3 py-3 transition ${
                  isActive
                    ? "bg-white text-teal-800 shadow-sm"
                    : "text-teal-50 hover:bg-white/10"
                }`}
              >
                <Icon size={18} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto rounded-2xl bg-white/10 p-3">
          <p className="text-xs font-medium text-teal-100">
            Manage bookings, vendors, and customer communication from one place.
          </p>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-white/20 px-4 py-2.5 text-sm font-bold text-teal-100 transition hover:bg-white/10"
          >
            View Site ↗
          </a>
          <button
            onClick={logout}
            className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 px-4 py-3 text-sm font-bold text-white transition hover:bg-orange-600"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
