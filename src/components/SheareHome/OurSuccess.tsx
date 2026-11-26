"use client";

import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowRight01Icon,
  CheckmarkBadge01Icon,
  EarthIcon,
  Location01Icon,
  StarIcon,
} from "@hugeicons/core-free-icons";

// হিন্ট: Average Rating স্থির রাখা হয়েছে যেন পরে রিয়েল ডেটা দিয়ে আপডেট করা যায়।
const FIXED_AVERAGE_RATING = "4.9/5";

// হিন্ট: ইমেজ ছাড়াই Online ও Offline সাফল্য কার্ডগুলো সব ডিভাইসে ক্লিন ও প্রিমিয়াম লুকে দেখানো হচ্ছে।
const stories = [
  {
    mode: "Online",
    icon: EarthIcon,
    title: "Classes from anywhere",
    student: "Nusrat J. · HSC · Dhaka",
    quote:
      "Found a Math tutor in just 3 days. Every class was online, right at my desk.",
    stats: [
      { value: "1,200+", label: "Online tuitions matched" },
      { value: FIXED_AVERAGE_RATING, label: "Average tutor rating (fixed)" },
    ],
    cta: "Browse online tuitions",
    href: "/browsetuitions?mode=online",
    topBarClass: "from-teal-500 via-cyan-500 to-emerald-400",
    badgeClass:
      "bg-teal-600 text-white dark:bg-teal-400 dark:text-[#04121a]",
    chipClass:
      "bg-teal-50 text-teal-800 border border-teal-200/80 dark:bg-teal-400/10 dark:text-teal-200 dark:border-teal-400/20",
  },
  {
    mode: "Offline",
    icon: Location01Icon,
    title: "Learning face to face",
    student: "Rafi A. · Class 10 · Chattogram",
    quote:
      "A home tutor came twice a week. My grades moved from C to A in one term.",
    stats: [
      { value: "1,300+", label: "Home tuitions matched" },
      { value: "64", label: "Areas covered" },
    ],
    cta: "Browse offline tuitions",
    href: "/browsetuitions?mode=offline",
    topBarClass: "from-cyan-500 via-teal-500 to-sky-400",
    badgeClass:
      "bg-teal-600 text-white dark:bg-teal-400 dark:text-[#04121a]",
    chipClass:
      "bg-cyan-50 text-cyan-800 border border-cyan-200/80 dark:bg-cyan-400/10 dark:text-cyan-200 dark:border-cyan-400/20",
  },
];

// হিন্ট: নিচের Summary বারে কোনো ডুপ্লিকেট সংখ্যা নেই; Average Rating স্থির রাখা হয়েছে।
const summaryItems = [
  {
    icon: EarthIcon,
    value: "Online & Offline",
    label: "Flexible learning modes",
  },
  {
    icon: Location01Icon,
    value: "64",
    label: "Areas covered across BD",
  },
  {
    icon: StarIcon,
    value: FIXED_AVERAGE_RATING,
    label: "Average rating (fixed)",
  },
];

const OurSuccessStats = () => {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-b from-teal-50/75 via-white to-teal-50/35 py-16 sm:py-20 dark:from-[#050b10] dark:via-[#07161b] dark:to-[#050b10]">
      {/* ---------- Background ---------- */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(13,148,136,0.14),transparent_60%)] dark:bg-[radial-gradient(ellipse_at_top,rgba(20,184,166,0.18),transparent_60%)]" />
        <div className="absolute -left-24 top-20 size-80 rounded-full bg-teal-300/25 blur-3xl dark:bg-teal-500/10" />
        <div className="absolute -right-24 bottom-8 size-80 rounded-full bg-cyan-300/25 blur-3xl dark:bg-cyan-500/10" />
      </div>

      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        {/* ---------- Heading ---------- */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-teal-200/90 bg-white/90 px-3.5 py-1.5 text-[11px] font-bold tracking-[0.18em] text-teal-700 uppercase shadow-2xs backdrop-blur dark:border-teal-400/25 dark:bg-white/5 dark:text-teal-300">
            <span className="size-1.5 rounded-full bg-teal-500 shadow-[0_0_8px_rgba(20,184,166,0.8)] dark:bg-teal-400" />
            Our success story
          </span>

          <h2 className="mt-5 text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-[2.75rem] dark:text-white">
            Two ways to learn.{" "}
            <span className="relative inline-block bg-gradient-to-r from-teal-600 via-teal-500 to-cyan-600 bg-clip-text text-transparent dark:from-teal-300 dark:to-cyan-300">
              One goal
              <svg
                aria-hidden
                viewBox="0 0 160 12"
                fill="none"
                className="absolute -bottom-1.5 left-0 h-3 w-full text-teal-500/65 dark:text-teal-300/60"
              >
                <path
                  d="M4 8C40 3.5 100 3 156 6"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-400">
            Tutors post tuitions, students apply — some join from home, some
            learn in a classroom nearby. Either way, the result is the same.
          </p>
        </div>

        {/* ---------- Image-less Cards (All Devices Responsive) ---------- */}
        <div className="mt-10 grid grid-cols-1 gap-6 lg:mt-12 lg:grid-cols-2">
          {stories.map((story) => (
            <article
              key={story.mode}
              className="group relative flex flex-col justify-between overflow-hidden rounded-[28px] border border-teal-200/75 bg-white/95 shadow-[0_24px_50px_-35px_rgba(13,148,136,0.45)] transition-all duration-300 hover:-translate-y-1 hover:border-teal-300 hover:shadow-[0_28px_60px_-30px_rgba(13,148,136,0.6)] dark:border-white/10 dark:bg-white/[0.04] dark:hover:border-teal-400/35"
            >
              {/* Top accent bar */}
              <div
                aria-hidden
                className={`h-1.5 w-full bg-gradient-to-r ${story.topBarClass}`}
              />

              <div className="flex flex-1 flex-col justify-between p-5 sm:p-7">
                <div>
                  {/* Mode & Success story badges */}
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold tracking-wide shadow-2xs ${story.badgeClass}`}
                    >
                      <HugeiconsIcon
                        icon={story.icon}
                        size={14}
                        strokeWidth={2}
                      />
                      {story.mode.toUpperCase()}
                    </span>

                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold ${story.chipClass}`}
                    >
                      <HugeiconsIcon
                        icon={CheckmarkBadge01Icon}
                        size={13}
                        strokeWidth={2}
                      />
                      Success story
                    </span>
                  </div>

                  {/* Title & Quote */}
                  <h3 className="mt-4 text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl dark:text-white">
                    {story.title}
                  </h3>

                  <p className="mt-3 border-l-2 border-teal-500/80 pl-3.5 text-sm leading-relaxed text-slate-700 sm:text-[15px] dark:text-slate-300">
                    &ldquo;{story.quote}&rdquo;
                  </p>

                  <p className="mt-3 text-xs font-semibold text-slate-500 dark:text-slate-400">
                    {story.student}
                  </p>
                </div>

                {/* Stats + CTA */}
                <div className="mt-6">
                  <div className="grid grid-cols-2 divide-x divide-teal-200/70 overflow-hidden rounded-2xl border border-teal-200/70 bg-gradient-to-r from-teal-50/80 to-cyan-50/50 py-3.5 text-center dark:divide-white/10 dark:border-white/10 dark:from-teal-500/10 dark:to-cyan-500/5">
                    {story.stats.map((stat) => (
                      <div key={stat.label} className="px-3">
                        <p className="text-lg font-extrabold tracking-tight text-slate-900 sm:text-xl dark:text-white">
                          {stat.value}
                        </p>
                        <p className="mt-0.5 text-[11px] font-medium leading-tight text-slate-600 dark:text-slate-400">
                          {stat.label}
                        </p>
                      </div>
                    ))}
                  </div>

                  <Link
                    href={story.href}
                    className="group/link mt-5 inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-teal-600/10 px-4 py-2.5 text-sm font-bold text-teal-700 transition-all hover:bg-teal-600 hover:text-white sm:w-auto dark:bg-teal-400/10 dark:text-teal-300 dark:hover:bg-teal-400 dark:hover:text-slate-950"
                  >
                    {story.cta}
                    <HugeiconsIcon
                      icon={ArrowRight01Icon}
                      size={16}
                      strokeWidth={2.2}
                      className="transition-transform duration-300 group-hover/link:translate-x-0.5"
                    />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* ---------- Fixed Rating & Mode Summary ---------- */}
        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3 lg:mt-8">
          {summaryItems.map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-3.5 rounded-2xl border border-teal-200/70 bg-white/90 px-5 py-4 shadow-2xs transition-colors hover:border-teal-300 dark:border-white/10 dark:bg-[#070f16]/90 dark:hover:border-teal-400/30"
            >
              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-teal-500/15 to-cyan-500/15 text-teal-600 ring-1 ring-teal-500/20 dark:text-teal-300">
                <HugeiconsIcon icon={item.icon} size={19} strokeWidth={1.9} />
              </span>
              <span className="min-w-0">
                <span className="block truncate text-base font-extrabold tracking-tight text-slate-900 dark:text-white">
                  {item.value}
                </span>
                <span className="block truncate text-[11px] font-medium text-slate-600 dark:text-slate-400">
                  {item.label}
                </span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurSuccessStats;