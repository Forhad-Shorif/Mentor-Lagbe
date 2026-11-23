"use client";

import React from "react";
import {
  BookmarkCheck,
  CheckCircle2,
  Crown,
  Send,
} from "lucide-react";

export interface StudentStatsData {
  appliedCount: number;
  savedCount: number;
  activeClassesCount: number;
  isPro: boolean;
}

interface StudentOverviewStatsProps {
  stats: StudentStatsData;
}

export default function StudentOverviewStats({
  stats,
}: StudentOverviewStatsProps) {
  const items = [
    {
      label: "My Applications",
      value: stats.appliedCount,
      hint: "Sent to tutors",
      icon: <Send className="h-4 w-4 text-amber-700 dark:text-amber-300" />,
    },
    {
      label: "Saved Tuitions",
      value: stats.savedCount,
      hint: "Bookmarked posts",
      icon: (
        <BookmarkCheck className="h-4 w-4 text-cyan-700 dark:text-cyan-300" />
      ),
    },
    {
      label: "Active Classes",
      value: stats.activeClassesCount,
      hint: "Ongoing learning",
      icon: (
        <CheckCircle2 className="h-4 w-4 text-emerald-700 dark:text-emerald-300" />
      ),
    },
    {
      label: "Membership",
      value: stats.isPro ? "PRO" : "FREE",
      hint: stats.isPro ? "payment: true" : "Standard plan",
      icon: <Crown className="h-4 w-4 text-amber-600 dark:text-amber-300" />,
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {items.map((item) => (
        <div
          key={item.label}
          className="rounded-2xl border border-amber-400/35 bg-white/80 p-4 shadow-[0_10px_28px_-12px_rgba(245,158,11,0.25)] backdrop-blur-xl transition-all hover:-translate-y-0.5 hover:border-amber-400/65 dark:border-slate-800 dark:bg-slate-900/65 dark:hover:border-amber-300/40"
        >
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-extrabold text-slate-700 dark:text-slate-200 sm:text-sm">
              {item.label}
            </span>
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-amber-400/30 bg-amber-50/90 dark:border-amber-300/20 dark:bg-slate-950/80">
              {item.icon}
            </span>
          </div>

          <p className="mt-2.5 text-2xl font-black tracking-tight text-slate-900 dark:text-white">
            {item.value}
          </p>

          <p className="mt-0.5 text-[11px] font-medium text-amber-900/75 dark:text-amber-200/75">
            {item.hint}
          </p>
        </div>
      ))}
    </div>
  );
}