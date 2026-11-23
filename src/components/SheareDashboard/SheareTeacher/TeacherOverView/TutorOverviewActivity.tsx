"use client";

import React from "react";
import { BookOpen, UserCheck } from "lucide-react";

export interface OverviewRowItem {
  id: string;
  title: string;
  meta: string;
  badge: string;
}

export default function TutorOverviewActivity({
  tuitions,
  applications,
}: {
  tuitions: OverviewRowItem[];
  applications: OverviewRowItem[];
}) {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      {/* Recent Tuitions */}
      <div className="rounded-2xl border border-amber-400/35 bg-white/85 p-4 shadow-[0_10px_28px_-14px_rgba(245,158,11,0.22)] backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/75 sm:p-5">
        <div className="flex items-center gap-2">
          <BookOpen className="h-4 w-4 text-amber-600 dark:text-amber-300" />
          <h2 className="text-sm font-extrabold text-slate-900 dark:text-white sm:text-base">
            Recent Tuitions
          </h2>
        </div>

        {tuitions.length === 0 ? (
          <p className="mt-3 rounded-xl border border-amber-400/20 bg-amber-50/50 p-4 text-center text-xs text-slate-500 dark:bg-slate-950/60 dark:text-slate-400">
            No tuitions posted yet.
          </p>
        ) : (
          <div className="mt-3 space-y-2">
            {tuitions.map((row) => (
              <div
                key={row.id}
                className="flex items-center justify-between gap-2 rounded-xl border border-amber-400/20 bg-amber-50/50 px-3.5 py-2.5 transition hover:border-amber-400/50 dark:bg-slate-950/60"
              >
                <div className="min-w-0">
                  <p className="truncate text-xs font-bold text-slate-900 dark:text-white sm:text-sm">
                    {row.title}
                  </p>
                  <p className="truncate text-[11px] text-slate-500 dark:text-slate-400">
                    {row.meta}
                  </p>
                </div>
                <span className="shrink-0 rounded-full bg-amber-400/15 px-2.5 py-0.5 text-[10px] font-bold uppercase text-amber-950 dark:text-amber-200">
                  {row.badge}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Recent Student Applications */}
      <div className="rounded-2xl border border-amber-400/35 bg-white/85 p-4 shadow-[0_10px_28px_-14px_rgba(245,158,11,0.22)] backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/75 sm:p-5">
        <div className="flex items-center gap-2">
          <UserCheck className="h-4 w-4 text-amber-600 dark:text-amber-300" />
          <h2 className="text-sm font-extrabold text-slate-900 dark:text-white sm:text-base">
            Recent Applications
          </h2>
        </div>

        {applications.length === 0 ? (
          <p className="mt-3 rounded-xl border border-amber-400/20 bg-amber-50/50 p-4 text-center text-xs text-slate-500 dark:bg-slate-950/60 dark:text-slate-400">
            No student applications yet.
          </p>
        ) : (
          <div className="mt-3 space-y-2">
            {applications.map((row) => (
              <div
                key={row.id}
                className="flex items-center justify-between gap-2 rounded-xl border border-amber-400/20 bg-amber-50/50 px-3.5 py-2.5 transition hover:border-amber-400/50 dark:bg-slate-950/60"
              >
                <div className="min-w-0">
                  <p className="truncate text-xs font-bold text-slate-900 dark:text-white sm:text-sm">
                    {row.title}
                  </p>
                  <p className="truncate text-[11px] text-slate-500 dark:text-slate-400">
                    {row.meta}
                  </p>
                </div>
                <span className="shrink-0 rounded-full bg-amber-400/15 px-2.5 py-0.5 text-[10px] font-bold uppercase text-amber-950 dark:text-amber-200">
                  {row.badge}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}