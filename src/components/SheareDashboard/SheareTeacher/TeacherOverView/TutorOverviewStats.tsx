"use client";

import React from "react";
import { BookOpen, CheckCircle2, Clock, Flame } from "lucide-react";

interface TutorOverviewStatsProps {
  totalTuitions: number;
  activeTuitions: number;
  pendingApplications: number;
  acceptedStudents: number;
}

export default function TutorOverviewStats({
  totalTuitions,
  activeTuitions,
  pendingApplications,
  acceptedStudents,
}: TutorOverviewStatsProps) {
  const items = [
    {
      label: "Total Tuitions",
      value: totalTuitions,
      note: "All your posts",
      icon: <BookOpen className="h-4 w-4 text-amber-700 dark:text-amber-300" />,
    },
    {
      label: "Active Tuitions",
      value: activeTuitions,
      note: "Currently open",
      icon: <Flame className="h-4 w-4 text-orange-600 dark:text-orange-400" />,
    },
    {
      label: "Pending Requests",
      value: pendingApplications,
      note: "Waiting for reply",
      icon: <Clock className="h-4 w-4 text-amber-600 dark:text-amber-300" />,
    },
    {
      label: "Accepted Students",
      value: acceptedStudents,
      note: "Confirmed learners",
      icon: (
        <CheckCircle2 className="h-4 w-4 text-emerald-700 dark:text-emerald-300" />
      ),
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
      {items.map((item) => (
        <div
          key={item.label}
          className="rounded-2xl border border-amber-400/35 bg-white/85 p-4 shadow-[0_10px_28px_-14px_rgba(245,158,11,0.24)] backdrop-blur-xl transition-all duration-200 hover:-translate-y-0.5 hover:border-amber-400/75 dark:border-slate-800 dark:bg-slate-900/75"
        >
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-extrabold text-slate-700 dark:text-slate-200 sm:text-sm">
              {item.label}
            </span>
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-amber-400/30 bg-amber-50/90 dark:border-slate-700 dark:bg-slate-950/80">
              {item.icon}
            </span>
          </div>
          <p className="mt-2.5 text-2xl font-black text-slate-900 dark:text-white">
            {item.value}
          </p>
          <p className="mt-0.5 text-[11px] font-medium text-amber-900/75 dark:text-amber-200/75">
            {item.note}
          </p>
        </div>
      ))}
    </div>
  );
}