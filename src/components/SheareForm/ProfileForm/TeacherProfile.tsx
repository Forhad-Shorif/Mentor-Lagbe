
"use client";

import React from "react";
import {
  Award,
  BookOpen,
  Calendar,
  Mail,
  MapPin,
  Video,
} from "lucide-react";
import { TeacherProfileItem } from "@/components/SheareForm/ProfileForm/ActionProfile";

interface TeacherProfileCardProps {
  profile: TeacherProfileItem & {
    image?: string;
  };
}

export default function TeacherProfileCard({
  profile,
}: TeacherProfileCardProps) {
  const displayTitle = profile.headline || "Teacher Overview";
  const initial = displayTitle.charAt(0).toUpperCase();

  return (
    <section className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-950">
      {/* Top Accent */}
      <div className="h-1 w-full bg-gradient-to-r from-cyan-500 via-teal-500 to-blue-500" />

      <div className="space-y-5 p-4 sm:p-5 lg:p-6">
        {/* Profile Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          {/* Image */}
          <div className="relative shrink-0">
            {profile.image ? (
              <img
                src={profile.image}
                alt={displayTitle}
                className="h-[76px] w-[76px] rounded-2xl border border-slate-200 object-cover ring-4 ring-slate-100 dark:border-slate-700 dark:ring-slate-900 sm:h-[88px] sm:w-[88px]"
              />
            ) : (
              <div className="flex h-[76px] w-[76px] items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-teal-500 text-2xl font-black text-white shadow-lg shadow-cyan-500/15 sm:h-[88px] sm:w-[88px]">
                {initial}
              </div>
            )}
          </div>

          {/* Profile Details */}
          <div className="min-w-0 flex-1 space-y-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-teal-200 bg-teal-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-teal-700 dark:border-teal-500/20 dark:bg-teal-500/10 dark:text-teal-300">
              <BookOpen className="h-3.5 w-3.5" />
              Teacher Profile
            </span>

            <h3 className="break-words text-lg font-extrabold leading-snug text-slate-900 dark:text-white sm:text-xl">
              {displayTitle}
            </h3>

            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex max-w-full items-center gap-1.5 rounded-lg bg-cyan-50 px-2.5 py-1 text-xs font-semibold text-cyan-700 dark:bg-cyan-500/10 dark:text-cyan-300">
                <Video className="h-3.5 w-3.5 shrink-0" />
                <span className="break-words">
                  {profile.teachingMode || "Teaching mode not provided"}
                </span>
              </span>

              <span className="inline-flex items-center gap-1.5 rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                <Award className="h-3.5 w-3.5 shrink-0 text-amber-500" />
                {profile.yearsExperience
                  ? `${profile.yearsExperience} years experience`
                  : "Experience not provided"}
              </span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-slate-100 dark:bg-slate-800" />

        {/* Basic Information */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {/* Date */}
          <div className="flex min-w-0 items-start gap-3 rounded-xl border border-slate-200/80 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-900/70">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-cyan-100 text-cyan-700 dark:bg-cyan-500/10 dark:text-cyan-400">
              <Calendar className="h-4 w-4" />
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Date of Birth
              </p>
              <p className="mt-1 break-words text-xs font-semibold text-slate-800 dark:text-slate-200">
                {profile.dateOfBirth || "Not provided"}
              </p>
            </div>
          </div>

          {/* Location */}
          <div className="flex min-w-0 items-start gap-3 rounded-xl border border-slate-200/80 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-900/70">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-teal-100 text-teal-700 dark:bg-teal-500/10 dark:text-teal-400">
              <MapPin className="h-4 w-4" />
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Location
              </p>
              <p className="mt-1 break-words text-xs font-semibold text-slate-800 dark:text-slate-200">
                {profile.location || "Not provided"}
              </p>
            </div>
          </div>

          {/* Email */}
          <div className="flex min-w-0 items-start gap-3 rounded-xl border border-slate-200/80 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-900/70 sm:col-span-2 xl:col-span-1">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400">
              <Mail className="h-4 w-4" />
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Email Address
              </p>
              <p className="mt-1 break-all text-xs font-semibold text-slate-800 dark:text-slate-200">
                {profile.email || "Not provided"}
              </p>
            </div>
          </div>
        </div>

        {/* About & Skills */}
        <div className="grid grid-cols-1 gap-3 xl:grid-cols-2">
          {/* About Me */}
          <div className="min-w-0 rounded-xl border border-slate-200/80 bg-slate-50/70 p-4 dark:border-slate-800 dark:bg-slate-900/50">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              About Me
            </p>

            <p className="mt-2 whitespace-pre-line break-words text-sm leading-6 text-slate-700 dark:text-slate-300">
              {profile.aboutMe || "No About Me added yet."}
            </p>
          </div>

          {/* Skills & Subjects */}
          <div className="min-w-0 rounded-xl border border-slate-200/80 bg-slate-50/70 p-4 dark:border-slate-800 dark:bg-slate-900/50">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Skills & Subjects
            </p>

            {Array.isArray(profile.skillsAndSubjects) &&
            profile.skillsAndSubjects.length > 0 ? (
              <div className="mt-3 flex flex-wrap gap-2">
                {profile.skillsAndSubjects.map((skill, idx) => (
                  <span
                    key={`${profile._id}-skill-${idx}`}
                    className="rounded-lg border border-cyan-200 bg-cyan-50 px-2.5 py-1 text-xs font-semibold text-cyan-700 transition-colors hover:bg-cyan-100 dark:border-cyan-500/20 dark:bg-cyan-500/10 dark:text-cyan-300 dark:hover:bg-cyan-500/20"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            ) : (
              <p className="mt-2 text-sm text-slate-400 dark:text-slate-500">
                No skills or subjects added yet.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
