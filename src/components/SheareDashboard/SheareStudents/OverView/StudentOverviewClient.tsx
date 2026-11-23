"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import {
  Bookmark,
  Compass,
  FileCheck2,
  Search,
  Sparkles,
  UserCog,
} from "lucide-react";
import StudentOverviewStats, {
  StudentStatsData,
} from "./StudentOverviewStats";
import StudentTuitionCard, {
  StudentOverviewStatus,
  StudentTuitionItem,
} from "./StudentTuitionCard";

interface StudentOverviewClientProps {
  studentName: string;
  isPro: boolean;
  items: StudentTuitionItem[];
}

export default function StudentOverviewClient({
  studentName,
  isPro,
  items,
}: StudentOverviewClientProps) {
  const [selectedTab, setSelectedTab] = useState<
    "All" | StudentOverviewStatus
  >("All");
  const [searchText, setSearchText] = useState("");

  const stats: StudentStatsData = useMemo(() => {
    const appliedCount = items.filter((i) => i.status === "Applied").length;
    const savedCount = items.filter((i) => i.status === "Saved").length;

    return {
      appliedCount,
      savedCount,
      activeClassesCount: appliedCount,
      isPro,
    };
  }, [items, isPro]);

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      if (selectedTab !== "All" && item.status !== selectedTab) return false;
      if (searchText.trim()) {
        const q = searchText.toLowerCase();
        const matchTitle = item.title.toLowerCase().includes(q);
        const matchSubject = item.subject.toLowerCase().includes(q);
        if (!matchTitle && !matchSubject) return false;
      }
      return true;
    });
  }, [items, selectedTab, searchText]);

  const tabs: ("All" | StudentOverviewStatus)[] = ["All", "Applied", "Saved"];

  return (
    <div className="space-y-6">
      {/* Glass Gold Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-amber-400/40 bg-gradient-to-br from-amber-50/95 via-white/80 to-yellow-100/75 p-5 shadow-[0_14px_40px_-14px_rgba(245,158,11,0.28)] backdrop-blur-xl dark:border-amber-300/25 dark:from-amber-950/45 dark:via-slate-900/75 dark:to-yellow-950/35 sm:p-6">
        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
          <div>
            <span className="inline-flex items-center gap-1 rounded-full border border-amber-400/45 bg-amber-400/20 px-3 py-0.5 text-[11px] font-extrabold uppercase tracking-wider text-amber-900 dark:text-amber-200">
              <Sparkles className="h-3 w-3" />
              <span>Student Overview</span>
            </span>
            <h1 className="mt-2 bg-gradient-to-r from-amber-900 via-amber-700 to-yellow-700 bg-clip-text text-2xl font-black text-transparent dark:from-amber-200 dark:via-yellow-300 dark:to-amber-400 sm:text-3xl">
              Welcome back, {studentName}
            </h1>
            <p className="mt-1 text-xs text-slate-600 dark:text-slate-300 sm:text-sm">
              Track your applied tuitions, saved posts, and learning progress.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Link
              href="/dashboard/students/application"
              className="inline-flex items-center gap-1.5 rounded-xl border border-amber-400/40 bg-white/85 px-3 py-2 text-xs font-bold text-slate-800 transition hover:border-amber-400 dark:border-slate-700 dark:bg-slate-950/80 dark:text-slate-100"
            >
              <FileCheck2 className="h-3.5 w-3.5 text-amber-600 dark:text-amber-300" />
              <span>Applications</span>
            </Link>

            <Link
              href="/dashboard/students/saved"
              className="inline-flex items-center gap-1.5 rounded-xl border border-amber-400/40 bg-white/85 px-3 py-2 text-xs font-bold text-slate-800 transition hover:border-amber-400 dark:border-slate-700 dark:bg-slate-950/80 dark:text-slate-100"
            >
              <Bookmark className="h-3.5 w-3.5 text-amber-600 dark:text-amber-300" />
              <span>Saved</span>
            </Link>

            <Link
              href="/dashboard/students/profile-setting"
              className="inline-flex items-center gap-1.5 rounded-xl border border-amber-400/40 bg-white/85 px-3 py-2 text-xs font-bold text-slate-800 transition hover:border-amber-400 dark:border-slate-700 dark:bg-slate-950/80 dark:text-slate-100"
            >
              <UserCog className="h-3.5 w-3.5 text-amber-600 dark:text-amber-300" />
              <span>Profile</span>
            </Link>

            <Link
              href="/tuitions"
              className="inline-flex items-center gap-1.5 rounded-xl border border-amber-400/50 bg-gradient-to-r from-amber-500 to-yellow-400 px-3.5 py-2 text-xs font-extrabold text-slate-950 shadow-2xs transition hover:brightness-105"
            >
              <Compass className="h-3.5 w-3.5" />
              <span>Browse Tuitions</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Top Stat Cards */}
      <StudentOverviewStats stats={stats} />

      {/* Filter Tabs (All, Applied, Saved) + Search Bar */}
      <div className="flex flex-col justify-between gap-3 rounded-2xl border border-amber-400/25 bg-white/75 p-3.5 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/60 sm:flex-row sm:items-center">
        <div className="flex flex-wrap items-center gap-1.5">
          {tabs.map((tab) => {
            const active = selectedTab === tab;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => setSelectedTab(tab)}
                className={`rounded-xl px-3.5 py-1.5 text-xs font-bold transition ${
                  active
                    ? "bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 shadow-2xs"
                    : "text-slate-700 hover:bg-amber-400/15 dark:text-slate-200"
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>

        <div className="relative sm:w-64">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-amber-700/70 dark:text-amber-300/70" />
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search tuition or subject..."
            className="w-full rounded-xl border border-amber-400/35 bg-white/90 py-1.5 pl-9 pr-3 text-xs text-slate-900 outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-400/20 dark:border-slate-700 dark:bg-slate-950/80 dark:text-white"
          />
        </div>
      </div>

      {/* Long Tuition Cards */}
      <div className="space-y-3">
        {filteredItems.length === 0 ? (
          <div className="rounded-3xl border border-amber-400/30 bg-white/75 p-10 text-center backdrop-blur-xl dark:bg-slate-900/60">
            <p className="text-sm font-bold text-slate-700 dark:text-slate-200">
              No tuition items found in your account yet.
            </p>
          </div>
        ) : (
          filteredItems.map((item) => (
            <StudentTuitionCard key={item.id} item={item} />
          ))
        )}
      </div>
    </div>
  );
}