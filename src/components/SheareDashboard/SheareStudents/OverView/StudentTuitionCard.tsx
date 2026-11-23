"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  BookOpen,
  Calendar,
  MapPin,
  Wallet,
} from "lucide-react";

export type StudentOverviewStatus = "Applied" | "Saved";

export interface StudentTuitionItem {
  id: string;
  title: string;
  subject: string;
  location?: string;
  budget?: string;
  schedule?: string;
  status: StudentOverviewStatus;
  href?: string;
}

interface StudentTuitionCardProps {
  item: StudentTuitionItem;
}

export default function StudentTuitionCard({ item }: StudentTuitionCardProps) {
  const statusStyles: Record<StudentOverviewStatus, string> = {
    Applied:
      "border-cyan-400/40 bg-cyan-500/15 text-cyan-800 dark:text-cyan-200",
    Saved:
      "border-emerald-400/40 bg-emerald-500/15 text-emerald-800 dark:text-emerald-200",
  };

  return (
    <div className="flex flex-col justify-between gap-4 rounded-2xl border border-amber-400/30 bg-white/80 p-4 backdrop-blur-xl transition-all hover:border-amber-400/65 hover:shadow-[0_10px_28px_-12px_rgba(245,158,11,0.3)] dark:border-slate-800 dark:bg-slate-900/65 dark:hover:border-amber-300/40 lg:flex-row lg:items-center lg:px-5">
      <div className="flex min-w-0 flex-1 flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500 via-yellow-400 to-amber-600 text-slate-950 shadow-2xs">
          <BookOpen className="h-5 w-5" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="truncate text-sm font-extrabold text-slate-900 dark:text-white sm:text-base">
              {item.title}
            </h3>
            <span
              className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-bold ${statusStyles[item.status]}`}
            >
              {item.status}
            </span>
          </div>

          <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-600 dark:text-slate-300">
            <span className="font-semibold text-amber-800 dark:text-amber-300">
              {item.subject}
            </span>

            {item.location && (
              <span className="inline-flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5 text-amber-600 dark:text-amber-300" />
                <span>{item.location}</span>
              </span>
            )}

            {item.schedule && (
              <span className="inline-flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5 text-amber-600 dark:text-amber-300" />
                <span>{item.schedule}</span>
              </span>
            )}

            {item.budget && (
              <span className="inline-flex items-center gap-1 font-bold text-slate-800 dark:text-slate-100">
                <Wallet className="h-3.5 w-3.5 text-amber-600 dark:text-amber-300" />
                <span>{item.budget}</span>
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end border-t border-slate-200/70 pt-3 dark:border-slate-800 lg:border-t-0 lg:pt-0">
        <Link
          href={
            item.href ||
            (item.status === "Applied"
              ? "/dashboard/students/applications"
              : "/dashboard/students/saved")
          }
          className="inline-flex items-center gap-1.5 rounded-xl border border-amber-400/50 bg-gradient-to-r from-amber-500 to-yellow-400 px-3.5 py-2 text-xs font-extrabold text-slate-950 transition hover:brightness-105"
        >
          <span>View Details</span>
          <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
}