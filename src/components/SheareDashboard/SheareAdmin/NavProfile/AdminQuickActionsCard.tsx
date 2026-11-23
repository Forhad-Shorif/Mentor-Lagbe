import React from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  BookOpen,
  CreditCard,
  Settings,
  Users,
} from "lucide-react";

const SHORTCUTS = [
  {
    title: "Manage Users",
    href: "/dashboard/admin/users",
    icon: <Users className="h-4 w-4 text-violet-600 dark:text-violet-300" />,
  },
  {
    title: "Manage Tuitions",
    href: "/dashboard/admin/tuitions",
    icon: <BookOpen className="h-4 w-4 text-indigo-600 dark:text-indigo-300" />,
  },
  {
    title: "View Payments",
    href: "/dashboard/admin/payments",
    icon: (
      <CreditCard className="h-4 w-4 text-fuchsia-600 dark:text-fuchsia-300" />
    ),
  },
  {
    title: "Update Profile",
    href: "/dashboard/admin/update-profile",
    icon: <Settings className="h-4 w-4 text-violet-600 dark:text-violet-300" />,
  },
];

export default function AdminQuickActionsCard() {
  return (
    <div className="relative h-full overflow-hidden rounded-3xl border border-violet-400/40 bg-gradient-to-br from-violet-50/85 via-white/75 to-indigo-50/70 p-5 shadow-[0_14px_36px_-14px_rgba(139,92,246,0.25)] backdrop-blur-xl transition-all dark:border-violet-300/25 dark:from-violet-950/40 dark:via-slate-900/75 dark:to-indigo-950/35 dark:shadow-[0_14px_38px_-14px_rgba(167,139,250,0.16)] sm:p-6">
      <div className="pointer-events-none -right-14 -bottom-14 absolute h-36 w-36 rounded-full bg-violet-400/20 blur-2xl" />

      <div className="relative flex items-center justify-between gap-2">
        <div>
          <h3 className="text-base font-extrabold text-slate-900 dark:text-white sm:text-lg">
            Quick Profile Shortcuts
          </h3>
          <p className="mt-0.5 text-xs text-slate-600 dark:text-slate-300">
            Open admin sections directly from your profile
          </p>
        </div>
        <span className="rounded-full border border-violet-400/40 bg-violet-500/15 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-violet-800 dark:text-violet-200">
          Shortcuts
        </span>
      </div>

      <div className="relative mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {SHORTCUTS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="group flex items-center justify-between rounded-2xl border border-violet-400/25 bg-white/80 p-3.5 text-xs font-bold text-slate-800 shadow-2xs backdrop-blur-md transition-all hover:-translate-y-0.5 hover:border-violet-400/60 hover:bg-white hover:shadow-[0_8px_22px_-8px_rgba(139,92,246,0.35)] dark:border-violet-300/15 dark:bg-slate-950/65 dark:text-slate-100 dark:hover:border-violet-300/45 sm:text-sm"
          >
            <span className="inline-flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl border border-violet-400/25 bg-violet-500/10 dark:bg-violet-400/15">
                {item.icon}
              </span>
              <span>{item.title}</span>
            </span>
            <ArrowUpRight className="h-4 w-4 text-violet-500 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 dark:text-violet-300" />
          </Link>
        ))}
      </div>
    </div>
  );
}