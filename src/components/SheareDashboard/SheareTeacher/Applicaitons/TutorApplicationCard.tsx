"use client";

import React from "react";
import {
  Check,
  Clock,
  MapPin,
  ShieldAlert,
  ShieldCheck,
  User,
  Wallet,
  X,
} from "lucide-react";

export type TutorAppStatus = "Pending" | "Accepted" | "Rejected";
export type AdminState = "Approved" | "Revoked" | "Pending";

export interface TutorAppItem {
  id: string;
  tuitionTitle: string;
  subject: string;
  studentName: string;
  studentEmail?: string;
  location: string;
  budget: string;
  status: TutorAppStatus;
  adminStatus: AdminState;
  appliedAt: string;
}

interface TutorApplicationCardProps {
  item: TutorAppItem;
  onPendingClick: (item: TutorAppItem) => void;
  onDecision: (id: string, nextStatus: "Accepted" | "Rejected") => void;
}

export default function TutorApplicationCard({
  item,
  onPendingClick,
  onDecision,
}: TutorApplicationCardProps) {
  const statusStyle: Record<TutorAppStatus, string> = {
    Pending:
      "border-amber-400/50 bg-amber-400/20 text-amber-950 dark:text-amber-200",
    Accepted:
      "border-emerald-400/50 bg-emerald-500/15 text-emerald-800 dark:text-emerald-200",
    Rejected:
      "border-rose-400/50 bg-rose-500/15 text-rose-800 dark:text-rose-200",
  };

  const adminStyle: Record<AdminState, string> = {
    Approved:
      "border-emerald-400/40 bg-emerald-500/10 text-emerald-800 dark:text-emerald-300",
    Revoked:
      "border-rose-400/40 bg-rose-500/10 text-rose-800 dark:text-rose-300",
    Pending:
      "border-slate-300 bg-slate-100 text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300",
  };

  const isPending = item.status === "Pending";

  return (
    <article className="flex flex-col justify-between gap-2.5 rounded-2xl border border-amber-400/35 bg-white/85 px-3.5 py-3 shadow-[0_8px_24px_-12px_rgba(245,158,11,0.22)] backdrop-blur-xl transition hover:border-amber-400/70 dark:border-slate-800 dark:bg-slate-900/75 sm:px-4 lg:flex-row lg:items-center">
      <div className="min-w-0 flex-1 space-y-1">
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          <span className="inline-flex items-center gap-1 text-xs font-black text-slate-900 dark:text-white sm:text-sm">
            <User className="h-3.5 w-3.5 shrink-0 text-amber-600 dark:text-amber-300" />
            <span className="truncate">{item.studentName}</span>
          </span>

          <span className="text-slate-400">•</span>

          <h3 className="truncate text-xs font-extrabold text-amber-900 dark:text-amber-200 sm:text-sm">
            {item.tuitionTitle}
          </h3>

          {/* Default Pending -> Click opens shadcn Dialog */}
          {isPending ? (
            <button
              type="button"
              onClick={() => onPendingClick(item)}
              className={`inline-flex cursor-pointer items-center gap-1 rounded-full border px-2.5 py-0.5 text-[10px] font-extrabold transition hover:scale-105 ${statusStyle.Pending}`}
            >
              <Clock className="h-2.5 w-2.5" />
              <span>Pending</span>
            </button>
          ) : (
            <span
              className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[10px] font-extrabold ${statusStyle[item.status]}`}
            >
              {item.status === "Accepted" && <Check className="h-2.5 w-2.5" />}
              {item.status === "Rejected" && <X className="h-2.5 w-2.5" />}
              <span>{item.status}</span>
            </span>
          )}

          {/* Admin Approved / Revoked Status */}
          <span
            className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-bold ${adminStyle[item.adminStatus]}`}
          >
            {item.adminStatus === "Revoked" ? (
              <ShieldAlert className="h-2.5 w-2.5" />
            ) : (
              <ShieldCheck className="h-2.5 w-2.5" />
            )}
            <span>Admin: {item.adminStatus}</span>
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 text-[11px] text-slate-600 dark:text-slate-300">
          <span className="font-bold text-amber-800 dark:text-amber-300">
            {item.subject}
          </span>
          <span className="inline-flex items-center gap-1">
            <MapPin className="h-3 w-3 text-amber-600 dark:text-amber-300" />
            <span>{item.location}</span>
          </span>
          <span className="inline-flex items-center gap-1 font-bold text-slate-800 dark:text-slate-100">
            <Wallet className="h-3 w-3 text-amber-600 dark:text-amber-300" />
            <span>{item.budget}</span>
          </span>
          <span className="text-slate-400">{item.appliedAt}</span>
        </div>
      </div>

      <div className="flex items-center justify-end gap-1.5 border-t border-slate-200/70 pt-2 dark:border-slate-800 lg:border-t-0 lg:pt-0">
        {isPending ? (
          <>
            <button
              type="button"
              onClick={() => onDecision(item.id, "Rejected")}
              className="inline-flex h-7 items-center gap-1 rounded-lg border border-rose-400/40 bg-rose-500/10 px-2.5 text-[11px] font-bold text-rose-700 transition hover:bg-rose-500/20 dark:text-rose-300"
            >
              <X className="h-3 w-3" />
              <span>Reject</span>
            </button>
            <button
              type="button"
              onClick={() => onDecision(item.id, "Accepted")}
              className="inline-flex h-7 items-center gap-1 rounded-lg bg-gradient-to-r from-amber-500 to-yellow-400 px-3 text-[11px] font-extrabold text-slate-950 transition hover:brightness-105"
            >
              <Check className="h-3 w-3" />
              <span>Accept</span>
            </button>
          </>
        ) : (
          <span className="rounded-lg border border-slate-200/80 bg-slate-100/70 px-2.5 py-1 text-[10px] font-bold text-slate-500 dark:border-slate-800 dark:bg-slate-950/70 dark:text-slate-400">
            {item.status === "Accepted" ? "Accepted" : "Rejected"}
          </span>
        )}
      </div>
    </article>
  );
}