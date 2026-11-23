"use client";

import React, { useState } from "react";
import { CheckCircle2, Save, UserCog } from "lucide-react";
import { StudentProfileData } from "./StudentProfileCard";

interface StudentProfileFormProps {
  profile: StudentProfileData;
  onSave: (updated: StudentProfileData) => void;
}

export default function StudentProfileForm({
  profile,
  onSave,
}: StudentProfileFormProps) {
  const [formData, setFormData] = useState<StudentProfileData>(profile);
  const [savedNotice, setSavedNotice] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (savedNotice) setSavedNotice(false);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSave(formData);
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 3000);
  }

  const inputClass =
    "mt-1 w-full rounded-xl border border-amber-400/35 bg-white/90 px-3.5 py-2.5 text-xs font-medium text-slate-900 outline-none transition focus:border-amber-500 focus:ring-4 focus:ring-amber-400/20 dark:border-slate-700 dark:bg-slate-950/80 dark:text-white";

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-amber-400/35 bg-white/85 p-5 shadow-[0_14px_38px_-14px_rgba(245,158,11,0.24)] backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/70 sm:p-6"
    >
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200/80 pb-4 dark:border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-400/20 text-amber-800 dark:text-amber-300">
            <UserCog className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-base font-black text-slate-900 dark:text-white sm:text-lg">
              Edit Profile Details
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Keep your study level, area, and contact info up to date.
            </p>
          </div>
        </div>

        {savedNotice && (
          <span className="inline-flex items-center gap-1 rounded-full border border-emerald-400/45 bg-emerald-500/15 px-3 py-1 text-xs font-bold text-emerald-800 dark:text-emerald-200">
            <CheckCircle2 className="h-3.5 w-3.5" />
            <span>Profile saved</span>
          </span>
        )}
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
            Full Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className={inputClass}
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            readOnly
            className={`${inputClass} cursor-not-allowed opacity-75`}
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
            Phone Number
          </label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+880 1XXX-XXXXXX"
            className={inputClass}
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
            Class / Academic Level
          </label>
          <input
            type="text"
            name="classLevel"
            value={formData.classLevel}
            onChange={handleChange}
            placeholder="e.g. HSC Science / Class 10"
            className={inputClass}
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
            Area / Location
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="e.g. Mirpur, Dhaka"
            className={inputClass}
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
            Preferred Subjects
          </label>
          <input
            type="text"
            name="preferredSubjects"
            value={formData.preferredSubjects}
            onChange={handleChange}
            placeholder="e.g. Physics, Math, English"
            className={inputClass}
          />
        </div>
      </div>

      <div className="mt-4">
        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
          Short Bio / Learning Goal
        </label>
        <textarea
          name="bio"
          rows={3}
          value={formData.bio}
          onChange={handleChange}
          placeholder="Write what kind of tutor or guidance you are looking for..."
          className={inputClass}
        />
      </div>

      <div className="mt-5 flex justify-end">
        <button
          type="submit"
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 px-5 py-2.5 text-xs font-extrabold text-slate-950 shadow-sm transition hover:brightness-105"
        >
          <Save className="h-4 w-4" />
          <span>Save Changes</span>
        </button>
      </div>
    </form>
  );
}