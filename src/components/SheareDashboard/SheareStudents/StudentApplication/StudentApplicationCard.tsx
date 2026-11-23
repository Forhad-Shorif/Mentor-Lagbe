"use client";

import React from "react";
import {
  BookOpen,
  Calendar,
  Check,
  Clock,
  Lock,
  MapPin,
  Trash2,
  UserCheck,
  Wallet,
  X,
} from "lucide-react";

export type ApplicationStatus = "Pending" | "Accepted" | "Rejected";

export interface StudentApplicationItem {
  id: string;
  title: string;
  subject: string;
  tutorName: string;
  location: string;
  schedule: string;
  budget: string;
  appliedAt: string;
  status: ApplicationStatus;
  post?: boolean;
}

interface StudentApplicationCardProps {
  item: StudentApplicationItem;
  onCancelPending: (id: string) => void;
}

export default function StudentApplicationCard({
  item,
  onCancelPending,
}: StudentApplicationCardProps) {
  const badgeStyle: Record<ApplicationStatus, string> = {
    Pending:
      "border-amber-400/50 bg-amber-400/20 text-amber-950 dark:text-amber-200",
    Accepted:
      "border-emerald-400/50 bg-emerald-500/15 text-emerald-800 dark:text-emerald-200",
    Rejected:
      "border-rose-400/50 bg-rose-500/15 text-rose-800 dark:text-rose-200",
  };

  const isPending = item.status === "Pending";

  return (
    <div className="flex flex-col justify-between gap-4 rounded-2xl border border-amber-400/30 bg-white/80 p-4 backdrop-blur-xl transition-all hover:border-amber-400/65 dark:border-slate-800 dark:bg-slate-900/65 lg:flex-row lg:items-center lg:px-5">
      <div className="flex min-w-0 flex-1 flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500 via-yellow-400 to-amber-600 text-slate-950">
          <BookOpen className="h-5 w-5" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="truncate text-sm font-extrabold text-slate-900 dark:text-white sm:text-base">
              {item.title}
            </h3>

            <span
              className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[11px] font-bold ${badgeStyle[item.status]}`}
            >
              {item.status === "Pending" && <Clock className="h-3 w-3" />}
              {item.status === "Accepted" && <Check className="h-3 w-3" />}
              {item.status === "Rejected" && <X className="h-3 w-3" />}
              <span>{item.status}</span>
            </span>
          </div>

          <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-600 dark:text-slate-300">
            <span className="font-semibold text-amber-800 dark:text-amber-300">
              {item.subject}
            </span>

            <span className="inline-flex items-center gap-1">
              <UserCheck className="h-3.5 w-3.5 text-amber-600 dark:text-amber-300" />
              <span>{item.tutorName}</span>
            </span>

            <span className="inline-flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5 text-amber-600 dark:text-amber-300" />
              <span>{item.location}</span>
            </span>

            <span className="inline-flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5 text-amber-600 dark:text-amber-300" />
              <span>{item.schedule}</span>
            </span>

            <span className="inline-flex items-center gap-1 font-bold text-slate-800 dark:text-slate-100">
              <Wallet className="h-3.5 w-3.5 text-amber-600 dark:text-amber-300" />
              <span>{item.budget}</span>
            </span>
          </div>

          <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
            Applied on {item.appliedAt}
          </p>
        </div>
      </div>

      {/* Student can only cancel/delete when status is Pending */}
      <div className="flex items-center justify-end border-t border-slate-200/70 pt-3 dark:border-slate-800 lg:border-t-0 lg:pt-0">
        {isPending ? (
          <button
            type="button"
            onClick={() => onCancelPending(item.id)}
            className="inline-flex items-center gap-1.5 rounded-xl border border-rose-400/45 bg-rose-500/15 px-3.5 py-2 text-xs font-bold text-rose-800 transition hover:bg-rose-500/25 dark:text-rose-200"
          >
            <Trash2 className="h-3.5 w-3.5" />
            <span>Cancel Application</span>
          </button>
        ) : (
          <span className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300/70 bg-slate-100/80 px-3 py-1.5 text-[11px] font-semibold text-slate-500 dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-400">
            <Lock className="h-3 w-3" />
            <span>
              {item.status === "Accepted"
                ? "Accepted by teacher"
                : "Rejected by teacher"}
            </span>
          </span>
        )}
      </div>
    </div>
  );
}