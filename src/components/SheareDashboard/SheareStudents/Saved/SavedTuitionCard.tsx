"use client";

import React from "react";
import {
  Calendar,
  GraduationCap,
  MapPin,
  Send,
  Sparkles,
  Trash2,
  UserCheck,
} from "lucide-react";
import { SavedTuitionItem } from "./SavedTuitionsList";

interface SavedTuitionCardProps {
  item: SavedTuitionItem;
  deletingId: string | null;
  onDelete: (item: SavedTuitionItem) => void;
  onApply: (item: SavedTuitionItem) => void;
}

export default function SavedTuitionCard({
  item,
  deletingId,
  onDelete,
  onApply,
}: SavedTuitionCardProps) {
  const isDeleting = deletingId === item.id;

  return (
    <article className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-amber-400/35 bg-white/85 shadow-[0_14px_36px_-14px_rgba(245,158,11,0.24)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-amber-400/75 hover:shadow-[0_20px_44px_-12px_rgba(245,158,11,0.36)] dark:border-slate-800 dark:bg-slate-900/75 dark:hover:border-amber-300/45">
      <div className="pointer-events-none absolute -right-14 -top-14 h-36 w-36 rounded-full bg-amber-400/15 blur-2xl dark:bg-amber-300/10" />
      <div className="h-1.5 w-full bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600" />

      <div className="relative p-4 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1 rounded-xl border border-amber-400/40 bg-amber-400/15 px-3 py-1 text-xs font-extrabold text-amber-950 dark:border-amber-300/25 dark:bg-amber-400/15 dark:text-amber-200">
            <Sparkles className="h-3 w-3 text-amber-600 dark:text-amber-300" />
            <span>{item.subject}</span>
          </span>

          <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-bold">
            <span className="rounded-lg border border-slate-200/80 bg-slate-100/90 px-2.5 py-1 text-slate-700 dark:border-slate-700 dark:bg-slate-800/90 dark:text-slate-200">
              {item.classLevel}
            </span>
            <span className="rounded-lg border border-amber-400/30 bg-amber-50/90 px-2.5 py-1 text-amber-900 dark:border-amber-300/20 dark:bg-amber-950/50 dark:text-amber-200">
              {item.deliveryMode}
            </span>
          </div>
        </div>

        <h2 className="mt-3.5 line-clamp-2 text-base font-black leading-snug text-slate-900 transition-colors group-hover:text-amber-800 dark:text-white dark:group-hover:text-amber-300 sm:text-xl">
          {item.title}
        </h2>

        {item.mentor?.name && (
          <div className="mt-2 inline-flex items-center gap-1.5 rounded-xl bg-amber-50/70 px-2.5 py-1 text-xs font-semibold text-slate-700 dark:bg-slate-950/60 dark:text-slate-300">
            <UserCheck className="h-3.5 w-3.5 shrink-0 text-amber-600 dark:text-amber-300" />
            <span className="truncate">Mentor: {item.mentor.name}</span>
          </div>
        )}

        <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-700 dark:text-slate-300">
          <span className="inline-flex max-w-full items-center gap-1.5 rounded-xl border border-amber-400/25 bg-white/80 px-2.5 py-1.5 font-medium dark:border-slate-800 dark:bg-slate-950/65">
            <MapPin className="h-3.5 w-3.5 shrink-0 text-amber-600 dark:text-amber-300" />
            <span className="truncate">{item.location}</span>
          </span>

          <span className="inline-flex items-center gap-1.5 rounded-xl border border-amber-400/25 bg-white/80 px-2.5 py-1.5 font-medium dark:border-slate-800 dark:bg-slate-950/65">
            <GraduationCap className="h-3.5 w-3.5 shrink-0 text-amber-600 dark:text-amber-300" />
            <span>{item.weeklyClasses}</span>
          </span>

          {item.savedAt && (
            <span className="inline-flex items-center gap-1.5 rounded-xl border border-amber-400/25 bg-white/80 px-2.5 py-1.5 font-medium dark:border-slate-800 dark:bg-slate-950/65">
              <Calendar className="h-3.5 w-3.5 shrink-0 text-amber-600 dark:text-amber-300" />
              <span>{item.savedAt}</span>
            </span>
          )}
        </div>
      </div>

      <div className="relative flex flex-col gap-3 border-t border-amber-400/25 bg-amber-50/55 px-4 py-3.5 dark:border-slate-800 dark:bg-slate-950/55 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-4">
        <div className="flex items-baseline justify-between rounded-2xl border border-amber-400/35 bg-white/90 px-3.5 py-2 dark:border-amber-300/20 dark:bg-slate-900/90 sm:block sm:py-1.5">
          <span className="block text-[10px] font-extrabold uppercase tracking-wider text-amber-800/80 dark:text-amber-300/75">
            Monthly Fee
          </span>
          <span className="text-base font-black text-slate-900 dark:text-white sm:text-lg">
            {item.currency || "৳"} {item.monthlyFee}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 sm:flex sm:items-center">
          <button
            type="button"
            disabled={isDeleting}
            onClick={() => onDelete(item)}
            className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-rose-400/40 bg-rose-500/10 px-3.5 py-2.5 text-xs font-bold text-rose-700 transition hover:bg-rose-500/20 disabled:opacity-50 dark:text-rose-300"
          >
            <Trash2 className="h-3.5 w-3.5 shrink-0" />
            <span>{isDeleting ? "Deleting..." : "Delete"}</span>
          </button>

          <button
            type="button"
            disabled={isDeleting}
            onClick={() => onApply(item)}
            className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-amber-400/50 bg-gradient-to-r from-amber-500 to-yellow-400 px-4 py-2.5 text-xs font-extrabold text-slate-950 shadow-xs transition hover:brightness-105 disabled:opacity-50"
          >
            <Send className="h-3.5 w-3.5 shrink-0" />
            <span>Apply</span>
          </button>
        </div>
      </div>
    </article>
  );
}