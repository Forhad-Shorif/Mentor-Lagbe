"use client";

import React from "react";
import {
  Crown,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
} from "lucide-react";

export interface StudentProfileData {
  name: string;
  email: string;
  phone: string;
  location: string;
  classLevel: string;
  preferredSubjects: string;
  bio: string;
  payment?: boolean;
}

export default function StudentProfileCard({
  profile,
}: {
  profile: StudentProfileData;
}) {
  const isPro = Boolean(profile.payment);

  return (
    <aside className="rounded-3xl border border-amber-400/35 bg-white/85 p-5 shadow-[0_14px_38px_-14px_rgba(245,158,11,0.24)] backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/70">
      {/* Top Avatar & Role */}
      <div className="flex flex-col items-center text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-amber-500 via-yellow-400 to-amber-600 text-2xl font-black text-slate-950 shadow-md">
          {profile.name.trim().charAt(0).toUpperCase() || "S"}
        </div>

        <h2 className="mt-3 text-lg font-black text-slate-900 dark:text-white">
          {profile.name || "Student"}
        </h2>

        <div className="mt-1.5 flex flex-wrap items-center justify-center gap-1.5">
          <span className="inline-flex items-center gap-1 rounded-full border border-amber-400/45 bg-amber-400/15 px-2.5 py-0.5 text-[11px] font-bold text-amber-900 dark:text-amber-200">
            <ShieldCheck className="h-3 w-3" />
            <span>Student</span>
          </span>

          <span
            className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[11px] font-bold ${
              isPro
                ? "border-emerald-400/50 bg-emerald-500/15 text-emerald-800 dark:text-emerald-200"
                : "border-slate-300/80 bg-slate-100 text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
            }`}
          >
            <Crown className="h-3 w-3" />
            <span>{isPro ? "PRO" : "FREE"}</span>
          </span>
        </div>

        {profile.bio && (
          <p className="mt-3 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
            {profile.bio}
          </p>
        )}
      </div>

      {/* Divider */}
      <div className="my-4 border-t border-slate-200/80 dark:border-slate-800" />

      {/* Info Rows */}
      <div className="space-y-3 text-xs">
        <div className="flex items-start gap-2.5 text-slate-700 dark:text-slate-200">
          <Mail className="mt-0.5 h-4 w-4 shrink-0 text-amber-600 dark:text-amber-300" />
          <div className="min-w-0">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Email
            </p>
            <p className="truncate font-semibold">{profile.email}</p>
          </div>
        </div>

        <div className="flex items-start gap-2.5 text-slate-700 dark:text-slate-200">
          <Phone className="mt-0.5 h-4 w-4 shrink-0 text-amber-600 dark:text-amber-300" />
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Phone
            </p>
            <p className="font-semibold">{profile.phone || "Not added"}</p>
          </div>
        </div>

        <div className="flex items-start gap-2.5 text-slate-700 dark:text-slate-200">
          <GraduationCap className="mt-0.5 h-4 w-4 shrink-0 text-amber-600 dark:text-amber-300" />
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Class / Level
            </p>
            <p className="font-semibold">{profile.classLevel || "Not set"}</p>
          </div>
        </div>

        <div className="flex items-start gap-2.5 text-slate-700 dark:text-slate-200">
          <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-amber-600 dark:text-amber-300" />
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Location
            </p>
            <p className="font-semibold">{profile.location || "Not set"}</p>
          </div>
        </div>
      </div>

      {/* Preferred Subjects Tag Box */}
      <div className="mt-4 rounded-2xl border border-amber-400/25 bg-amber-50/70 p-3 dark:border-slate-800 dark:bg-slate-950/60">
        <p className="text-[10px] font-extrabold uppercase tracking-wider text-amber-900 dark:text-amber-200">
          Target Subjects
        </p>
        <p className="mt-1 text-xs font-medium text-slate-700 dark:text-slate-300">
          {profile.preferredSubjects || "General subjects"}
        </p>
      </div>
    </aside>
  );
}