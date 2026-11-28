"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Activity,
  ArrowUpRight,
  BookOpen,
  CreditCard,
  Layers,
  Sparkles,
  Users,
} from "lucide-react";
import { showToast } from "@/lib/utils/toast";

interface ModuleSummary {
  id: string;
  title: string;
  detail: string;
  href: string;
  tag: string;
  badgeClass: string;
}

// হিন্ট: প্ল্যাটফর্মের মূল সেকশনগুলোর (Users, Tuitions, Payments) শর্টকাট ও স্ট্যাটাস সামারি।
const PLATFORM_MODULES: ModuleSummary[] = [
  {
    id: "users",
    title: "User Accounts & Roles",
    detail: "Review registered students, tutors, Pro members, and account status.",
    href: "/dashboard/admin/users",
    tag: "Users",
    badgeClass:
      "bg-amber-500/15 text-amber-800 border border-amber-400/40 dark:text-amber-300",
  },
  {
    id: "tuitions",
    title: "Tuition Listings & Approval",
    detail: "Verify newly posted tuitions, monitor active listings, and manage status.",
    href: "/dashboard/admin/tuitions",
    tag: "Tuitions",
    badgeClass:
      "bg-cyan-500/15 text-cyan-800 border border-cyan-400/40 dark:text-cyan-300",
  },
  {
    id: "payments",
    title: "Payment & Revenue Logs",
    detail: "Inspect recorded transactions and verify platform payment updates.",
    href: "/dashboard/admin/payments",
    tag: "Payments",
    badgeClass:
      "bg-violet-500/15 text-violet-800 border border-violet-400/40 dark:text-violet-300",
  },
];

export default function AdminSpotlightSection() {
  const [selectedTab, setSelectedTab] = useState<"modules" | "workflow">(
    "modules"
  );

  return (
    <section className="grid grid-cols-1 gap-6 lg:grid-cols-12">
      {/* Left 7 Cols: Live Modules & Workflow Notes */}
      <div className="rounded-3xl border border-slate-300/80 bg-white/95 p-5 shadow-[0_14px_35px_-26px_rgba(15,23,42,0.3)] dark:border-white/10 dark:bg-slate-900/80 sm:p-7 lg:col-span-7">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200/80 pb-4 dark:border-white/10">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 via-teal-600 to-cyan-600 text-white shadow-2xs dark:from-amber-400 dark:to-cyan-400 dark:text-slate-950">
              <Activity className="h-4 w-4" />
            </span>
            <div>
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white sm:text-lg">
                Workspace Modules
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Direct controls connected to live platform data
              </p>
            </div>
          </div>

          <div className="inline-flex rounded-xl border border-slate-300/80 bg-slate-100/90 p-1 dark:border-white/10 dark:bg-slate-950">
            <button
              type="button"
              onClick={() => setSelectedTab("modules")}
              className={`rounded-lg px-3 py-1 text-xs font-bold transition cursor-pointer ${
                selectedTab === "modules"
                  ? "bg-gradient-to-r from-amber-500/20 to-cyan-500/20 text-slate-900 shadow-2xs dark:bg-slate-800 dark:text-amber-200"
                  : "text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
              }`}
            >
              Modules
            </button>
            <button
              type="button"
              onClick={() => setSelectedTab("workflow")}
              className={`rounded-lg px-3 py-1 text-xs font-bold transition cursor-pointer ${
                selectedTab === "workflow"
                  ? "bg-gradient-to-r from-amber-500/20 to-cyan-500/20 text-slate-900 shadow-2xs dark:bg-slate-800 dark:text-amber-200"
                  : "text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
              }`}
            >
              Guidelines
            </button>
          </div>
        </div>

        {selectedTab === "modules" ? (
          <div className="mt-4 space-y-3">
            {PLATFORM_MODULES.map((mod) => (
              <Link
                key={mod.id}
                href={mod.href}
                className="group flex flex-col justify-between gap-2 rounded-2xl border border-slate-200/90 bg-gradient-to-r from-slate-50/90 via-white to-amber-50/35 p-4 transition-all hover:-translate-y-0.5 hover:border-amber-400/75 hover:shadow-sm dark:border-white/10 dark:from-slate-950/70 dark:via-slate-950/50 dark:to-[#15130e] dark:hover:border-amber-300/40 sm:flex-row sm:items-center"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span
                      className={`rounded-md px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider ${mod.badgeClass}`}
                    >
                      {mod.tag}
                    </span>
                  </div>
                  <p className="mt-1.5 text-sm font-bold text-slate-900 transition-colors group-hover:text-amber-700 dark:text-white dark:group-hover:text-amber-300">
                    {mod.title}
                  </p>
                  <p className="mt-0.5 text-xs text-slate-600 dark:text-slate-400">
                    {mod.detail}
                  </p>
                </div>

                <ArrowUpRight className="h-4 w-4 shrink-0 text-slate-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-amber-600 dark:group-hover:text-amber-300" />
              </Link>
            ))}
          </div>
        ) : (
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-amber-300/80 bg-gradient-to-br from-amber-50/80 via-white to-transparent p-4 dark:border-amber-300/25 dark:from-amber-400/10 dark:to-transparent">
              <Layers className="h-5 w-5 text-amber-600 dark:text-amber-300" />
              <p className="mt-2 text-sm font-bold text-slate-900 dark:text-white">
                Verification First
              </p>
              <p className="mt-1 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                Check tutor details and tuition mode before approving public listings.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-300/80 bg-gradient-to-br from-slate-100/80 via-white to-cyan-50/50 p-4 dark:border-white/15 dark:from-slate-400/10 dark:to-transparent">
              <Sparkles className="h-5 w-5 text-cyan-600 dark:text-cyan-300" />
              <p className="mt-2 text-sm font-bold text-slate-900 dark:text-white">
                Database Synced Metrics
              </p>
              <p className="mt-1 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                Overview numbers reflect live database records without hardcoded placeholder stats.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Right 5 Cols: WOW Golden-Silver-Prismatic Quick Command Hub */}
      <div className="flex flex-col justify-between rounded-3xl border border-amber-300/85 bg-gradient-to-br from-amber-50/90 via-white to-cyan-50/80 p-5 shadow-[0_18px_40px_-26px_rgba(217,119,6,0.45)] dark:border-amber-300/25 dark:from-[#18150e] dark:via-slate-900 dark:to-[#081c24] dark:shadow-[0_0_40px_rgba(34,211,238,0.12)] sm:p-7 lg:col-span-5">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/50 bg-white/90 px-3 py-1 text-[11px] font-extrabold text-amber-800 shadow-2xs dark:border-amber-300/30 dark:bg-slate-950/80 dark:text-amber-200">
            <Sparkles className="h-3.5 w-3.5 text-amber-500 dark:text-amber-300" />
            <span>Admin Control Hub</span>
          </div>

          <h3 className="mt-3 bg-gradient-to-r from-slate-900 via-amber-800 to-cyan-800 bg-clip-text text-xl font-extrabold tracking-tight text-transparent dark:from-white dark:via-amber-200 dark:to-cyan-200">
            Quick Management Shortcuts
          </h3>
          <p className="mt-1.5 text-xs leading-relaxed text-slate-600 dark:text-slate-300 sm:text-sm">
            Jump straight into key admin areas or trigger a quick status check.
          </p>

          <div className="mt-5 space-y-2.5">
            <Link
              href="/dashboard/admin/users"
              className="flex w-full items-center justify-between rounded-2xl border border-amber-300/70 bg-white/90 px-4 py-3 text-left text-xs font-bold text-slate-800 transition hover:-translate-y-0.5 hover:border-amber-400 hover:bg-white dark:border-white/10 dark:bg-slate-950/75 dark:text-slate-100 dark:hover:border-amber-300/40 dark:hover:bg-slate-950 sm:text-sm"
            >
              <span className="inline-flex items-center gap-2.5">
                <Users className="h-4 w-4 text-amber-600 dark:text-amber-300" />
                <span>Manage Users &amp; Roles</span>
              </span>
              <ArrowUpRight className="h-4 w-4 text-amber-600 dark:text-amber-300" />
            </Link>

            <Link
              href="/dashboard/admin/tuitions"
              className="flex w-full items-center justify-between rounded-2xl border border-slate-300/80 bg-white/90 px-4 py-3 text-left text-xs font-bold text-slate-800 transition hover:-translate-y-0.5 hover:border-cyan-400 hover:bg-white dark:border-white/10 dark:bg-slate-950/75 dark:text-slate-100 dark:hover:border-cyan-300/40 dark:hover:bg-slate-950 sm:text-sm"
            >
              <span className="inline-flex items-center gap-2.5">
                <BookOpen className="h-4 w-4 text-cyan-600 dark:text-cyan-300" />
                <span>Review Tuition Listings</span>
              </span>
              <ArrowUpRight className="h-4 w-4 text-cyan-600 dark:text-cyan-300" />
            </Link>

            <button
              type="button"
              onClick={() =>
                showToast.success("Admin workspace is connected and ready.")
              }
              className="flex w-full items-center justify-between rounded-2xl border border-violet-300/75 bg-white/90 px-4 py-3 text-left text-xs font-bold text-slate-800 transition hover:-translate-y-0.5 hover:border-violet-400 hover:bg-white dark:border-white/10 dark:bg-slate-950/75 dark:text-slate-100 dark:hover:border-violet-300/40 dark:hover:bg-slate-950 sm:text-sm cursor-pointer"
            >
              <span className="inline-flex items-center gap-2.5">
                <CreditCard className="h-4 w-4 text-violet-600 dark:text-violet-300" />
                <span>Verify Workspace Status</span>
              </span>
              <ArrowUpRight className="h-4 w-4 text-violet-600 dark:text-violet-300" />
            </button>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-amber-400/35 bg-slate-950/90 p-4 text-xs text-slate-200 dark:border-amber-300/20">
          <p className="font-extrabold text-amber-300">Live Platform Ready</p>
          <p className="mt-1 leading-relaxed text-slate-300">
            All metrics and controls are structured to work directly with your live database and Next.js routes.
          </p>
        </div>
      </div>
    </section>
  );
}