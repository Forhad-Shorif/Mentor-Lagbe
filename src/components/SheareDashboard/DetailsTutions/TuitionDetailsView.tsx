
"use client";

import Link from "next/link";
import {
  ArrowLeft,
  BadgeCheck,
  Bookmark,
  CalendarDays,
  Check,
  Clock,
  GraduationCap,
  Layers,
  MapPin,
  MessageSquareQuote,
  Share2,
  Star,
  UserCheck,
} from "lucide-react";
import type { TuitionDetailData } from "./TutionsDetails";
import ClientUser from "@/lib/ClientUser";
import showToast from "@/lib/utils/toast";

interface TuitionDetailsViewProps {
  tuition: TuitionDetailData;
  saved: boolean;
  saving: boolean;
  onShare: () => void;
  onBookmark: () => void;
  onApply: () => void;
}

const textOrDefault = (value?: string | number | null) =>
  value === undefined || value === null || value === ""
    ? "Not provided"
    : String(value);

export default function TuitionDetailsView({
  tuition,
  saved,
  saving,
  onShare,
  onBookmark,
  onApply,
}: TuitionDetailsViewProps) {
  const title = tuition.title || "Untitled Tuition";
  const subject = tuition.subject || "General";
  const mentorName = tuition.mentor?.name || "Mentor";
  const mentorEmail = tuition.mentor?.email || "";
  const currency = tuition.currency || "$";
  const user = ClientUser()

  const rating = Number(tuition.rating);
  const validRating = Number.isFinite(rating)
    ? Math.max(0, Math.min(5, rating))
    : 0;

  const reviewCount = Number.isFinite(Number(tuition.reviewCount))
    ? Math.max(0, Number(tuition.reviewCount))
    : 0;

  const highlights = Array.isArray(tuition.highlights)
    ? tuition.highlights.filter(
      (item): item is string =>
        typeof item === "string" && item.trim().length > 0
    )
    : [];

  const details = [
    {
      label: "Subject",
      value: textOrDefault(tuition.subject),
      icon: Layers,
    },
    {
      label: "Class Level",
      value: textOrDefault(tuition.classLevel),
      icon: GraduationCap,
    },
    {
      label: "Delivery",
      value: textOrDefault(tuition.deliveryMode),
      icon: UserCheck,
    },
    {
      label: "Location",
      value: textOrDefault(tuition.location),
      icon: MapPin,
    },
    {
      label: "Weekly Classes",
      value: textOrDefault(tuition.weeklyClasses),
      icon: CalendarDays,
    },
    ...(tuition.classDuration
      ? [{ label: "Class Duration", value: tuition.classDuration, icon: Clock }]
      : []),
    ...(tuition.courseDuration
      ? [{ label: "Course Duration", value: tuition.courseDuration, icon: Clock }]
      : []),
    ...(tuition.availableSeats
      ? [{ label: "Available Seats", value: tuition.availableSeats, icon: UserCheck }]
      : []),
  ];

  return (
    <main className="mx-auto max-w-6xl space-y-5 px-1">
      {/* Top actions */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <Link
          href="/browsetuitions"
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:border-cyan-300 hover:bg-cyan-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Tuitions
        </Link>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={onShare}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
          >
            <Share2 className="h-3.5 w-3.5 text-cyan-600" />
            Share
          </button>

          {user?.role === 'students' ? <div>
            <button
              type="button"
              disabled={saving}
              onClick={onBookmark}
              className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-semibold transition disabled:cursor-not-allowed disabled:opacity-60 ${saved
                ? "border-cyan-300 bg-cyan-50 text-cyan-700 dark:border-cyan-500/30 dark:bg-cyan-500/10 dark:text-cyan-300"
                : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
                }`}
            >
              <Bookmark className={`h-3.5 w-3.5 ${saved ? "fill-current" : ""}`} />
              {saving ? "Saving..." : saved ? "Saved" : "Save"}
            </button>
          </div> : <div>
            <button onClick={() => { showToast.error("You are not Students") }} type="button" className="inline-flex items-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-semibold transition disabled:cursor-not-allowed disabled:opacity-60 border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
              Save  <Bookmark />
            </button></div>}
        </div>
      </div>

      {/* Page Grid */}
      <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-12">
        {/* Main */}
        <div className="min-w-0 space-y-5 lg:col-span-8">
          {/* Banner */}
          <section className="relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 dark:border-slate-800 dark:bg-slate-900">
            {tuition.bannerImage ? (
              <img
                src={tuition.bannerImage}
                alt={title}
                onError={(event) => {
                  event.currentTarget.style.display = "none";
                }}
                className="h-48 w-full object-cover sm:h-60"
              />
            ) : (
              <div className="flex h-48 items-center justify-center bg-gradient-to-br from-cyan-50 via-sky-50 to-teal-50 dark:from-slate-900 dark:via-cyan-950/30 dark:to-slate-950 sm:h-60">
                <div className="px-5 text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-cyan-600 shadow-sm dark:bg-slate-900">
                    <GraduationCap className="h-7 w-7" />
                  </div>
                  <p className="mt-3 text-lg font-extrabold text-slate-800 dark:text-white sm:text-2xl">
                    {subject}
                  </p>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                    Tuition & Mentorship
                  </p>
                </div>
              </div>
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />

            <div className="absolute bottom-3 left-3 right-3 flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-white/20 bg-slate-950/60 px-3 py-1 text-[10px] font-bold text-white backdrop-blur-md">
                {textOrDefault(tuition.deliveryMode)}
              </span>

              {tuition.status && (
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/90 px-3 py-1 text-[10px] font-bold text-white backdrop-blur">
                  <BadgeCheck className="h-3 w-3" />
                  {tuition.status}
                </span>
              )}
            </div>
          </section>

          {/* Title Card */}
          <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-950 sm:p-5">
            <div className="flex flex-wrap gap-2">
              <span className="rounded-lg bg-cyan-50 px-2.5 py-1 text-[11px] font-bold text-cyan-700 dark:bg-cyan-500/10 dark:text-cyan-300">
                {subject}
              </span>
              <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                {textOrDefault(tuition.classLevel)}
              </span>
            </div>

            <h1 className="mt-2.5 break-words text-xl font-black leading-snug tracking-tight text-slate-900 dark:text-white sm:text-2xl">
              {title}
            </h1>

            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 border-t border-slate-100 pt-3 dark:border-slate-800">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300">
                <UserCheck className="h-3.5 w-3.5 text-cyan-600" />
                {mentorName}
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                <Clock className="h-3.5 w-3.5 text-cyan-600" />
                {textOrDefault(tuition.weeklyClasses)}
              </span>
              {tuition.postedDate && (
                <span className="inline-flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                  <CalendarDays className="h-3.5 w-3.5 text-cyan-600" />
                  {tuition.postedDate}
                </span>
              )}
            </div>
          </section>

          {/* About */}
          <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-950 sm:p-5">
            <h2 className="text-sm font-extrabold text-slate-900 dark:text-white">
              About This Tuition
            </h2>
            <p className="mt-2 whitespace-pre-line break-words text-sm leading-6 text-slate-600 dark:text-slate-300">
              {tuition.about || "No additional description has been provided."}
            </p>
          </section>

          {/* Highlights */}
          {highlights.length > 0 && (
            <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-950 sm:p-5">
              <h2 className="text-sm font-extrabold text-slate-900 dark:text-white">
                Learning Highlights
              </h2>
              <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {highlights.map((item, index) => (
                  <div
                    key={`${index}-${item}`}
                    className="flex min-w-0 items-start gap-2 rounded-xl border border-slate-100 bg-slate-50 px-3 py-2.5 dark:border-slate-800 dark:bg-slate-900/70"
                  >
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-cyan-600" />
                    <span className="break-words text-xs font-medium leading-5 text-slate-700 dark:text-slate-300">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Reviews */}
          <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-950 sm:p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-sm font-extrabold text-slate-900 dark:text-white">
                  Student Reviews
                </h2>
                <p className="mt-0.5 text-xs text-slate-500">
                  Learner feedback and ratings
                </p>
              </div>

              <div className="flex items-center gap-2 rounded-xl bg-amber-50 px-3 py-2 dark:bg-amber-500/10">
                <span className="text-xl font-black text-slate-900 dark:text-white">
                  {validRating.toFixed(1)}
                </span>
                <div>
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-3 w-3 ${star <= Math.round(validRating)
                          ? "fill-amber-400 text-amber-400"
                          : "text-slate-300 dark:text-slate-700"
                          }`}
                      />
                    ))}
                  </div>
                  <p className="text-[10px] text-slate-500">
                    {reviewCount} {reviewCount === 1 ? "review" : "reviews"}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-3 flex items-center gap-3 rounded-xl border border-dashed border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900/50">
              <MessageSquareQuote className="h-5 w-5 shrink-0 text-cyan-500" />
              <p className="text-xs leading-5 text-slate-500 dark:text-slate-400">
                No reviews yet. Feedback will appear here when available.
              </p>
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <aside className="min-w-0 space-y-4 lg:sticky lg:top-5 lg:col-span-4">
          {/* Fee */}
          <section className="overflow-hidden rounded-2xl border border-cyan-200 bg-white shadow-sm dark:border-cyan-500/20 dark:bg-slate-950">
            <div className="bg-gradient-to-br from-cyan-50 via-white to-teal-50 p-4 dark:from-cyan-500/10 dark:via-slate-950 dark:to-teal-500/5">
              <p className="text-[10px] font-bold uppercase tracking-widest text-cyan-700 dark:text-cyan-300">
                Monthly Tuition Fee
              </p>
              <div className="mt-1 flex flex-wrap items-baseline gap-1">
                <span className="break-words text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                  {currency} {textOrDefault(tuition.monthlyFee)}
                </span>
                <span className="text-xs text-slate-500">/ month</span>
              </div>
            </div>

            {/* Tuition Specs */}
            <div className="divide-y divide-slate-100 px-4 dark:divide-slate-800">
              {details.map(({ label, value, icon: Icon }) => (
                <div
                  key={label}
                  className="flex items-start justify-between gap-3 py-3"
                >
                  <span className="flex shrink-0 items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                    <Icon className="h-3.5 w-3.5 text-cyan-600 dark:text-cyan-400" />
                    {label}
                  </span>
                  <span className="min-w-0 break-words text-right text-xs font-semibold text-slate-800 dark:text-slate-200">
                    {value}
                  </span>
                </div>
              ))}

              {tuition.applyDeadline && (
                <div className="flex items-start justify-between gap-3 py-3">
                  <span className="text-xs text-slate-500">Apply Before</span>
                  <span className="break-words text-right text-xs font-semibold text-rose-600 dark:text-rose-400">
                    {tuition.applyDeadline}
                  </span>
                </div>
              )}

              {tuition.status && (
                <div className="flex items-center justify-between gap-3 py-3">
                  <span className="text-xs text-slate-500">Status</span>
                  <span className="rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-bold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
                    {tuition.status}
                  </span>
                </div>
              )}
            </div>

            {/* Mentor & Actions */}
            <div className="space-y-3 border-t border-slate-100 bg-slate-50/80 p-4 dark:border-slate-800 dark:bg-slate-900/60">
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-teal-500 text-sm font-black text-white">
                  {mentorName.charAt(0).toUpperCase()}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400">
                    Your Mentor
                  </p>
                  <p className="truncate text-sm font-bold text-slate-900 dark:text-white">
                    {mentorName}
                  </p>
                  {mentorEmail && (
                    <p className="truncate text-xs text-slate-500 dark:text-slate-400">
                      {mentorEmail}
                    </p>
                  )}
                  {tuition.mentor?.verified && (
                    <span className="mt-1 inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                      <BadgeCheck className="h-3 w-3" />
                      Verified Mentor
                    </span>
                  )}
                </div>
              </div>

              {mentorEmail && (
                <Link
                  href={`/teacher/${encodeURIComponent(mentorEmail)}`}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-cyan-200 bg-white px-3 py-2.5 text-xs font-bold text-cyan-700 transition hover:bg-cyan-50 dark:border-cyan-500/20 dark:bg-slate-950 dark:text-cyan-300 dark:hover:bg-cyan-500/10"
                >
                  <UserCheck className="h-4 w-4" />
                  View Mentor Profile
                </Link>
              )}

              <div className="grid grid-cols-2 gap-2">
                {user?.role === 'students' ? <div>
                  <button
                    type="button"
                    onClick={onApply}
                    className="rounded-xl bg-gradient-to-r from-cyan-600 to-teal-600 px-3 py-2.5 text-xs font-bold text-white shadow-sm transition hover:brightness-105 active:scale-[0.98] dark:from-cyan-500 dark:to-teal-500"
                  >
                    Apply Now
                  </button>
                </div> : <div>
                  <button
                    onClick={() => { showToast.error("You are not Students") }}
                    type="button"
                    className="rounded-xl bg-gradient-to-r from-cyan-600 to-teal-600 px-3 py-2.5 text-xs font-bold text-white shadow-sm transition hover:brightness-105 active:scale-[0.98] dark:from-cyan-500 dark:to-teal-500"
                  >
                    Apply Now
                  </button>
                </div>}

                {user?.role === 'students' ? <div>
                  <button
                    type="button"
                    disabled={saving}
                    onClick={onBookmark}
                    className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-semibold transition disabled:cursor-not-allowed disabled:opacity-60 ${saved
                      ? "border-cyan-300 bg-cyan-50 text-cyan-700 dark:border-cyan-500/30 dark:bg-cyan-500/10 dark:text-cyan-300"
                      : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
                      }`}
                  >
                    <Bookmark className={`h-3.5 w-3.5 ${saved ? "fill-current" : ""}`} />
                    {saving ? "Saving..." : saved ? "Saved" : "Save"}
                  </button>
                </div> : <div>
                  <button onClick={() => { showToast.error("You are not Students") }} type="button" className="inline-flex items-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-semibold transition disabled:cursor-not-allowed disabled:opacity-60 border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
                    Save  <Bookmark />
                  </button>
                  </div>}

              </div>
            </div>
          </section>
        </aside>
      </div>
    </main>
  );
}
