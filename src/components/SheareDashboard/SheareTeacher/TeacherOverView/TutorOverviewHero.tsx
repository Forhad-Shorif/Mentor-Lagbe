"use client";

import React from "react";
import Link from "next/link";
import {
  FileText,
  GraduationCap,
  PlusCircle,
  Sparkles,
  UserCheck,
} from "lucide-react";

interface TutorOverviewHeroProps {
  name: string;
  email: string;
  image?: string;
  role?: string;
}

export default function TutorOverviewHero({
  name,
  email,
  image,
  role = "teacher",
}: TutorOverviewHeroProps) {
  const initial = (name || email || "T").charAt(0).toUpperCase();

  return (
    <section className="relative overflow-hidden rounded-3xl border border-amber-400/40 bg-gradient-to-br from-amber-50/95 via-white/85 to-yellow-100/75 p-4 shadow-[0_14px_38px_-14px_rgba(245,158,11,0.28)] backdrop-blur-xl transition-all duration-300 dark:border-amber-300/25 dark:from-amber-950/40 dark:via-slate-900/80 dark:to-yellow-950/30 sm:p-6">
      <div className="pointer-events-none absolute -right-14 -top-14 h-40 w-40 rounded-full bg-amber-400/20 blur-3xl dark:bg-amber-300/10" />

      <div className="relative flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
        <div className="flex items-center gap-3.5 sm:gap-4">
          {image ? (
            <img
              src={image}
              alt={name}
              className="h-14 w-14 shrink-0 rounded-2xl border border-amber-400/50 object-cover shadow-xs sm:h-16 sm:w-16"
            />
          ) : (
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500 via-yellow-400 to-amber-600 text-xl font-black text-slate-950 shadow-xs sm:h-16 sm:w-16">
              {initial}
            </div>
          )}

          <div className="min-w-0 space-y-1">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="inline-flex items-center gap-1 rounded-full border border-amber-400/45 bg-amber-400/20 px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-amber-950 dark:text-amber-200">
                <GraduationCap className="h-3 w-3" />
                <span>{role}</span>
              </span>
              <span className="inline-flex items-center gap-1 rounded-full border border-emerald-400/40 bg-emerald-500/15 px-2.5 py-0.5 text-[10px] font-bold text-emerald-800 dark:text-emerald-200">
                <Sparkles className="h-3 w-3" />
                <span>Overview</span>
              </span>
            </div>

            <h1 className="truncate text-xl font-black text-slate-900 dark:text-white sm:text-2xl">
              Welcome back, {name}
            </h1>
            <p className="truncate text-xs font-medium text-slate-600 dark:text-slate-300">
              {email}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/dashboard/teachers/post"
            className="inline-flex h-9 items-center gap-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 px-3.5 text-xs font-extrabold text-slate-950 shadow-xs transition duration-200 hover:-translate-y-0.5 hover:brightness-105"
          >
            <PlusCircle className="h-3.5 w-3.5" />
            <span>Post Tuition</span>
          </Link>

          <Link
            href="/dashboard/teachers/applicants"
            className="inline-flex h-9 items-center gap-1.5 rounded-xl border border-amber-400/45 bg-white/85 px-3.5 text-xs font-bold text-slate-800 transition duration-200 hover:-translate-y-0.5 hover:bg-amber-50 dark:border-slate-700 dark:bg-slate-950/80 dark:text-amber-200"
          >
            <UserCheck className="h-3.5 w-3.5 text-amber-600 dark:text-amber-300" />
            <span>Applications</span>
          </Link>

          <Link
            href="/dashboard/teachers/profile-setting"
            className="inline-flex h-9 items-center gap-1.5 rounded-xl border border-amber-400/35 bg-white/75 px-3 text-xs font-bold text-slate-700 transition duration-200 hover:-translate-y-0.5 hover:bg-amber-50 dark:border-slate-800 dark:bg-slate-950/70 dark:text-slate-200"
          >
            <FileText className="h-3.5 w-3.5 text-amber-600 dark:text-amber-300" />
            <span>Profile</span>
          </Link>
        </div>
      </div>
    </section>
  );
}