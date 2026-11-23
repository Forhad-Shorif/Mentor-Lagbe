"use client";

import React, { useState } from "react";
import { Save, Sparkles } from "lucide-react";
import { showToast } from "@/lib/utils/toast";

interface AdminProfileBioCardProps {
  initialBio?: string;
}

const PRESET_TAGS = [
  "Platform Administrator",
  "Course & Tuition Moderator",
  "Payment & User Oversight",
];

export default function AdminProfileBioCard({
  initialBio = "Managing MentorLagbe platform quality, user accounts, tuition approvals, and payment workflows.",
}: AdminProfileBioCardProps) {
  const [bio, setBio] = useState(initialBio);

  const handleAddTag = (tag: string) => {
    setBio((prev) => (prev.includes(tag) ? prev : `${prev} • ${tag}`));
  };

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    showToast.success("Profile bio updated");
  };

  return (
    <form
      onSubmit={handleSave}
      className="relative overflow-hidden rounded-3xl border border-amber-400/45 bg-gradient-to-br from-amber-50/90 via-yellow-50/55 to-orange-50/60 p-5 shadow-[0_14px_38px_-14px_rgba(245,158,11,0.32)] backdrop-blur-xl transition-all dark:border-amber-300/30 dark:from-amber-950/45 dark:via-slate-900/75 dark:to-orange-950/35 dark:shadow-[0_14px_40px_-14px_rgba(251,191,36,0.2)] sm:p-6"
    >
      <div className="pointer-events-none -right-14 -top-14 absolute h-40 w-40 rounded-full bg-amber-400/25 blur-2xl" />

      <div className="relative flex items-center justify-between gap-2">
        <h2 className="bg-gradient-to-r from-amber-900 via-amber-700 to-orange-700 bg-clip-text text-base font-extrabold text-transparent dark:from-amber-200 dark:via-yellow-300 dark:to-orange-300 sm:text-lg">
          About & Admin Bio
        </h2>
        <span className="inline-flex items-center gap-1 rounded-full border border-amber-400/50 bg-amber-400/20 px-3 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-amber-900 shadow-2xs dark:text-amber-200">
          <Sparkles className="h-3 w-3" />
          <span>Gold Bio</span>
        </span>
      </div>

      <textarea
        rows={3}
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        placeholder="Write a short bio about your admin role..."
        className="relative mt-3 w-full resize-none rounded-2xl border border-amber-400/35 bg-white/90 p-3.5 text-xs text-slate-900 shadow-2xs backdrop-blur-md outline-none transition focus:border-amber-500 focus:bg-white focus:ring-4 focus:ring-amber-400/20 dark:border-amber-300/25 dark:bg-slate-950/80 dark:text-white dark:focus:border-amber-300 sm:text-sm"
      />

      <div className="relative mt-3 flex flex-wrap gap-1.5">
        {PRESET_TAGS.map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => handleAddTag(tag)}
            className="rounded-xl border border-amber-400/40 bg-white/80 px-2.5 py-1 text-[11px] font-semibold text-amber-950 shadow-2xs transition hover:-translate-y-0.5 hover:bg-amber-400/25 dark:border-amber-300/25 dark:bg-slate-950/70 dark:text-amber-200 dark:hover:bg-amber-400/20"
          >
            + {tag}
          </button>
        ))}
      </div>

      <div className="relative mt-4 flex items-center justify-between gap-3 border-t border-amber-500/20 pt-3.5 dark:border-amber-300/15">
        <span className="text-[11px] font-semibold text-amber-900/75 dark:text-amber-200/75">
          {bio.length} characters
        </span>
        <button
          type="submit"
          className="inline-flex items-center gap-1.5 rounded-xl border border-amber-300/70 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 px-4 py-2 text-xs font-extrabold text-slate-950 shadow-[0_8px_22px_-6px_rgba(245,158,11,0.55)] transition hover:scale-[1.02] hover:brightness-105 active:scale-[0.99]"
        >
          <Save className="h-3.5 w-3.5" />
          <span>Save Bio</span>
        </button>
      </div>
    </form>
  );
}