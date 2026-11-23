"use client";

import React, { useState } from "react";
import {
  Activity,
  ArrowUpRight,
  Award,
  Bell,
  Layers,
  ShieldAlert,
  Sparkles,
} from "lucide-react";
import { showToast } from "@/lib/utils/toast";

interface DummyActivity {
  id: string;
  title: string;
  detail: string;
  time: string;
  tag: string;
}

// Apatoto dummy activity data — pore API data diye replace korben
const DUMMY_ACTIVITIES: DummyActivity[] = [
  {
    id: "1",
    title: "New Teacher Pro Payment Received",
    detail: "Nadia Rahman upgraded to Teacher Pro ($15/mo) via Stripe.",
    time: "12 mins ago",
    tag: "Payment",
  },
  {
    id: "2",
    title: "New Course / Tuition Post Published",
    detail: "Rafiq Hasan posted 'Full-Stack Web & TypeScript Mentorship'.",
    time: "38 mins ago",
    tag: "Course",
  },
  {
    id: "3",
    title: "Student Batch Milestone Reached",
    detail: "25+ learners applied to active Science & Math batches today.",
    time: "2 hours ago",
    tag: "Users",
  },
];

export default function AdminSpotlightSection() {
  const [selectedTab, setSelectedTab] = useState<"feed" | "highlights">(
    "feed"
  );

  return (
    <section className="grid grid-cols-1 gap-6 lg:grid-cols-12">
      {/* Left 7 Cols: Live-style Dummy Feed / Highlights */}
      <div className="rounded-3xl border border-slate-200/90 bg-white/95 p-5 shadow-sm dark:border-slate-800/90 dark:bg-slate-900/80 sm:p-7 lg:col-span-7">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200/80 pb-4 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-600 to-teal-600 text-white dark:from-cyan-400 dark:to-teal-400 dark:text-slate-950">
              <Activity className="h-4 w-4" />
            </span>
            <div>
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white sm:text-lg">
                Recent Platform Activity
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Dummy entries for preview
              </p>
            </div>
          </div>

          <div className="inline-flex rounded-xl border border-slate-200 bg-slate-100/80 p-1 dark:border-slate-800 dark:bg-slate-950">
            <button
              type="button"
              onClick={() => setSelectedTab("feed")}
              className={`rounded-lg px-3 py-1 text-xs font-semibold transition ${
                selectedTab === "feed"
                  ? "bg-white text-slate-900 shadow-2xs dark:bg-slate-800 dark:text-white"
                  : "text-slate-500 dark:text-slate-400"
              }`}
            >
              Activity
            </button>
            <button
              type="button"
              onClick={() => setSelectedTab("highlights")}
              className={`rounded-lg px-3 py-1 text-xs font-semibold transition ${
                selectedTab === "highlights"
                  ? "bg-white text-slate-900 shadow-2xs dark:bg-slate-800 dark:text-white"
                  : "text-slate-500 dark:text-slate-400"
              }`}
            >
              Highlights
            </button>
          </div>
        </div>

        {selectedTab === "feed" ? (
          <div className="mt-4 space-y-3">
            {DUMMY_ACTIVITIES.map((item) => (
              <div
                key={item.id}
                className="flex flex-col justify-between gap-2 rounded-2xl border border-slate-200/80 bg-slate-50/75 p-4 transition hover:border-cyan-500/35 dark:border-slate-800 dark:bg-slate-950/60 sm:flex-row sm:items-center"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="rounded-md bg-cyan-500/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-cyan-800 dark:text-cyan-300">
                      {item.tag}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      {item.time}
                    </span>
                  </div>
                  <p className="mt-1.5 text-sm font-bold text-slate-900 dark:text-white">
                    {item.title}
                  </p>
                  <p className="mt-0.5 text-xs text-slate-600 dark:text-slate-300">
                    {item.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-cyan-500/25 bg-gradient-to-br from-cyan-500/10 to-transparent p-4 dark:border-cyan-400/25">
              <Award className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
              <p className="mt-2 text-sm font-bold text-slate-900 dark:text-white">
                Top Performing Category
              </p>
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">
                Web & Data Mentorship leads with 34 active courses (dummy metric).
              </p>
            </div>
            <div className="rounded-2xl border border-teal-500/25 bg-gradient-to-br from-teal-500/10 to-transparent p-4 dark:border-teal-400/25">
              <Layers className="h-5 w-5 text-teal-600 dark:text-teal-400" />
              <p className="mt-2 text-sm font-bold text-slate-900 dark:text-white">
                Pro Conversion Rate
              </p>
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">
                19.1% of registered users upgraded to a Pro pass (dummy metric).
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Right 5 Cols: WOW Command & Quick Actions */}
      <div className="flex flex-col justify-between rounded-3xl border border-cyan-500/30 bg-gradient-to-br from-cyan-500/15 via-sky-500/10 to-teal-500/15 p-5 shadow-md dark:border-cyan-400/30 dark:from-cyan-500/20 dark:via-slate-900 dark:to-teal-500/15 dark:shadow-[0_0_40px_rgba(34,211,238,0.14)] sm:p-7 lg:col-span-5">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full border border-cyan-500/30 bg-white/85 px-3 py-1 text-[11px] font-bold text-cyan-800 dark:border-cyan-400/30 dark:bg-slate-950/75 dark:text-cyan-300">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Admin Control Hub</span>
          </div>

          <h3 className="mt-3 text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Keep Everything Running Smoothly
          </h3>
          <p className="mt-1.5 text-xs leading-relaxed text-slate-600 dark:text-slate-300 sm:text-sm">
            Review incoming courses, monitor payment flow, and oversee platform announcements from one central spot.
          </p>

          <div className="mt-5 space-y-2.5">
            <button
              type="button"
              onClick={() =>
                showToast.success("Dummy preview: All payment logs look healthy")
              }
              className="flex w-full items-center justify-between rounded-2xl border border-white/70 bg-white/85 px-4 py-3 text-left text-xs font-bold text-slate-800 transition hover:bg-white dark:border-slate-800 dark:bg-slate-950/75 dark:text-slate-100 dark:hover:bg-slate-950 sm:text-sm"
            >
              <span className="inline-flex items-center gap-2">
                <Bell className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
                <span>Check Payment Alerts</span>
              </span>
              <ArrowUpRight className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
            </button>

            <button
              type="button"
              onClick={() =>
                showToast.error("Dummy preview: 12 items waiting for approval")
              }
              className="flex w-full items-center justify-between rounded-2xl border border-white/70 bg-white/85 px-4 py-3 text-left text-xs font-bold text-slate-800 transition hover:bg-white dark:border-slate-800 dark:bg-slate-950/75 dark:text-slate-100 dark:hover:bg-slate-950 sm:text-sm"
            >
              <span className="inline-flex items-center gap-2">
                <ShieldAlert className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                <span>Review Pending Courses</span>
              </span>
              <ArrowUpRight className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
            </button>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-cyan-500/20 bg-slate-950/85 p-4 text-xs text-slate-200 dark:border-cyan-400/20">
          <p className="font-bold text-cyan-300">Ready for Live Fetch</p>
          <p className="mt-1 text-slate-400">
            Pass your fetched stats to{" "}
            <code className="rounded bg-slate-800 px-1.5 py-0.5 text-cyan-200">
              &lt;AdminOverviewStats initialStats={"..."}/&gt;
            </code>{" "}
            whenever your backend endpoint is ready.
          </p>
        </div>
      </div>
    </section>
  );
}