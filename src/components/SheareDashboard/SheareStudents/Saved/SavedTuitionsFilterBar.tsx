"use client";

import React from "react";
import { RotateCcw, Search } from "lucide-react";

interface SavedTuitionsFilterBarProps {
  subjects: string[];
  selectedSubject: string;
  onSelectSubject: (subject: string) => void;
  searchText: string;
  onSearchChange: (value: string) => void;
  onReset: () => void;
}

export default function SavedTuitionsFilterBar({
  subjects,
  selectedSubject,
  onSelectSubject,
  searchText,
  onSearchChange,
  onReset,
}: SavedTuitionsFilterBarProps) {
  const hasFilter = selectedSubject !== "All" || searchText.trim().length > 0;

  return (
    <div className="rounded-2xl border border-amber-400/35 bg-white/85 p-3.5 shadow-[0_10px_28px_-14px_rgba(245,158,11,0.25)] backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/75 sm:p-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap items-center gap-1.5">
          {subjects.map((subject) => {
            const active = selectedSubject === subject;
            return (
              <button
                key={subject}
                type="button"
                onClick={() => onSelectSubject(subject)}
                className={`rounded-xl px-3 py-1.5 text-xs font-bold transition ${
                  active
                    ? "bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 shadow-2xs"
                    : "border border-amber-400/25 bg-amber-50/50 text-slate-700 hover:border-amber-400/60 hover:bg-amber-400/15 dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-200"
                }`}
              >
                {subject}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2 md:w-72 lg:w-80">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-amber-700/75 dark:text-amber-300/75" />
            <input
              type="text"
              value={searchText}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search title, subject, location..."
              className="w-full rounded-xl border border-amber-400/35 bg-white/95 py-2 pl-9 pr-3 text-xs font-medium text-slate-900 outline-none transition focus:border-amber-500 focus:ring-4 focus:ring-amber-400/20 dark:border-slate-700 dark:bg-slate-950/85 dark:text-white"
            />
          </div>

          {hasFilter && (
            <button
              type="button"
              onClick={onReset}
              className="inline-flex h-9 shrink-0 items-center gap-1 rounded-xl border border-amber-400/35 bg-amber-50/80 px-2.5 text-xs font-bold text-slate-700 transition hover:bg-amber-400/20 dark:border-slate-700 dark:bg-slate-950/80 dark:text-slate-200"
            >
              <RotateCcw className="h-3.5 w-3.5 text-amber-600 dark:text-amber-300" />
              <span className="hidden sm:inline">Reset</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}