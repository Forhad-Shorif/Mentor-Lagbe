import React from "react";
import Link from "next/link";
import {
  BookOpen,
  Compass,
  GraduationCap,
  MapPin,
  Sparkles,
  UserCheck,
} from "lucide-react";

import UserProfileCard from "@/components/SheareForm/ProfileForm/UserProfile";
import { getUserProfile } from "@/components/SheareForm/ProfileForm/ActionProfile";
import EditLeftProfileDialog from "@/components/SheareForm/ProfileForm/EditLeftProfileDialog";
import AddLeftProfileDialog from "@/components/SheareForm/ProfileForm/Parsonal-Form";
import { ServerUser } from "@/lib/ServerUser";

export default async function StudentProfilePage() {
  const user = await ServerUser();

  if (!user) {
    return (
      <main className="w-full text-slate-900 transition-colors dark:text-slate-100">
        <div className="mx-auto max-w-4xl rounded-3xl border border-amber-400/35 bg-white/85 p-6 text-sm text-slate-600 shadow-sm backdrop-blur-xl dark:border-amber-300/20 dark:bg-slate-900/70 dark:text-slate-300">
          Please sign in to view your student profile.
        </div>
      </main>
    );
  }

  const email = user.email || "";
  const userProfile = email ? await getUserProfile(email) : null;

  // TypeScript property error erate safe mapping
  const profileData = (userProfile || {}) as Record<string, unknown>;

  const displayName = String(
    profileData.name || user.name || "Student"
  ).trim();
  const classLevel = String(
    profileData.classLevel || profileData.class || "Not specified"
  ).trim();
  const preferredSubjects = String(
    profileData.preferredSubjects || profileData.subjects || "Not added yet"
  ).trim();
  const studyMode = String(
    profileData.studyMode || profileData.mode || "Online / Hybrid"
  ).trim();
  const locationText = String(
    profileData.location || "Dhaka, Bangladesh"
  ).trim();
  const bioText = String(
    profileData.bio ||
      "Add a short bio, target class, and preferred subjects so tutors know your learning goals."
  ).trim();

  const highlights = [
    {
      label: "Class / Level",
      value: classLevel,
      icon: (
        <GraduationCap className="h-4 w-4 text-amber-700 dark:text-amber-300" />
      ),
    },
    {
      label: "Subjects",
      value: preferredSubjects,
      icon: <BookOpen className="h-4 w-4 text-amber-700 dark:text-amber-300" />,
    },
    {
      label: "Study Mode",
      value: studyMode,
      icon: (
        <UserCheck className="h-4 w-4 text-amber-700 dark:text-amber-300" />
      ),
    },
    {
      label: "Location",
      value: locationText,
      icon: <MapPin className="h-4 w-4 text-amber-700 dark:text-amber-300" />,
    },
  ];

  return (
    <main className="w-full text-slate-900 transition-colors dark:text-slate-100">
      <div className="mx-auto max-w-5xl space-y-5">
        {/* Golden Hero Header */}
        <div className="relative overflow-hidden rounded-3xl border border-amber-400/40 bg-gradient-to-br from-amber-50/95 via-white/85 to-yellow-100/80 p-5 shadow-[0_14px_38px_-14px_rgba(245,158,11,0.28)] backdrop-blur-xl dark:border-amber-300/25 dark:from-amber-950/45 dark:via-slate-900/75 dark:to-yellow-950/35 sm:p-6">
          <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1 rounded-full border border-amber-400/50 bg-amber-400/20 px-3 py-0.5 text-[11px] font-extrabold uppercase tracking-wider text-amber-950 dark:text-amber-200">
                  <Sparkles className="h-3 w-3" />
                  <span>Student Profile</span>
                </span>
                <span className="rounded-full border border-amber-400/35 bg-white/80 px-2.5 py-0.5 text-[11px] font-bold text-amber-900 dark:border-slate-700 dark:bg-slate-900/80 dark:text-amber-200">
                  {displayName}
                </span>
              </div>

              <h1 className="bg-gradient-to-r from-amber-900 via-amber-700 to-yellow-700 bg-clip-text text-xl font-black tracking-tight text-transparent dark:from-amber-200 dark:via-yellow-300 dark:to-amber-400 sm:text-2xl">
                Personal &amp; Study Profile
              </h1>

              <p className="max-w-2xl text-xs leading-relaxed text-slate-600 dark:text-slate-300 sm:text-sm">
                {bioText}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {userProfile ? (
                <EditLeftProfileDialog initialData={userProfile} />
              ) : (
                <AddLeftProfileDialog />
              )}

              <Link
                href="/dashboard/students"
                className="inline-flex items-center gap-1.5 rounded-xl border border-amber-400/40 bg-white/85 px-3.5 py-2 text-xs font-bold text-slate-800 transition hover:border-amber-400 dark:border-slate-700 dark:bg-slate-950/80 dark:text-slate-100"
              >
                <Compass className="h-3.5 w-3.5 text-amber-600 dark:text-amber-300" />
                <span>Overview</span>
              </Link>
            </div>
          </div>

          {/* Extra Profile Info Strip */}
          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {highlights.map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-amber-400/30 bg-white/80 p-3.5 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/65"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-amber-900/75 dark:text-amber-200/75">
                    {item.label}
                  </span>
                  <span className="flex h-7 w-7 items-center justify-center rounded-xl border border-amber-400/30 bg-amber-50 dark:border-amber-300/20 dark:bg-slate-900">
                    {item.icon}
                  </span>
                </div>
                <p className="mt-1.5 truncate text-xs font-extrabold text-slate-900 dark:text-white sm:text-sm">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Main Profile Card or Add Prompt */}
        {userProfile ? (
          <UserProfileCard
            profile={userProfile}
            fallbackName={user.name || undefined}
            fallbackImage={user.image || undefined}
          />
        ) : (
          <div className="flex w-full flex-col items-center justify-center gap-3 rounded-3xl border border-dashed border-amber-400/50 bg-gradient-to-br from-amber-50/70 via-white/80 to-yellow-50/60 p-9 text-center shadow-xs backdrop-blur-xl dark:border-amber-300/30 dark:from-amber-950/25 dark:via-slate-900/60 dark:to-yellow-950/20">
            <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
              No profile info posted yet. Click the button above to add it.
            </p>
            <p className="max-w-md text-xs text-slate-500 dark:text-slate-400">
              Add your personal info, class level, preferred subjects, and study
              mode to complete your profile.
            </p>
            <AddLeftProfileDialog />
          </div>
        )}
      </div>
    </main>
  );
}