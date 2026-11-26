"use client";

import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowRight01Icon,
  GraduationCapIcon,
  Location01Icon,
  NoteEditIcon,
  Search01Icon,
  ShieldCheckIcon,
  Task01Icon,
  TeacherIcon,
} from "@hugeicons/core-free-icons";

// হিন্ট: প্রতিটি কার্ডে বাম পাশে আইকন এবং ডান পাশে টেক্সট পাশাপাশি বসানোর জন্য flex-row ও shrink-0 ব্যবহার করা হয়েছে।
// হিন্ট: কোনো ডুপ্লিকেট স্ট্যাটাস নেই এবং Average Rating স্থির রাখা হয়েছে।
const features = [
  {
    icon: Search01Icon,
    audience: "For students",
    title: "Search by",
    accent: "Subject",
    accentClass: "text-teal-600 dark:text-teal-300",
    description:
      "Filter live tuitions by subject, class, area and budget — results in seconds.",
    circleClass:
      "from-teal-100 via-cyan-50 to-white text-teal-600 ring-1 ring-teal-200/80 dark:from-teal-400/20 dark:via-cyan-400/10 dark:text-teal-300 dark:ring-teal-400/20",
    glowClass: "bg-teal-200/50 dark:bg-teal-400/10",
  },
  {
    icon: TeacherIcon,
    audience: "For students",
    title: "Verified",
    accent: "Tutors",
    accentClass: "text-sky-600 dark:text-sky-300",
    description:
      "Compare experience, qualifications, ratings and reviews before you pick a mentor.",
    circleClass:
      "from-sky-100 via-blue-50 to-white text-sky-600 ring-1 ring-sky-200/80 dark:from-sky-400/20 dark:via-blue-400/10 dark:text-sky-300 dark:ring-sky-400/20",
    glowClass: "bg-sky-200/50 dark:bg-sky-400/10",
  },
  {
    icon: Location01Icon,
    audience: "Your choice",
    title: "Online or",
    accent: "Offline",
    accentClass: "text-indigo-600 dark:text-indigo-300",
    description:
      "Join classes from home or meet your tutor face to face in your own area.",
    circleClass:
      "from-indigo-100 via-violet-50 to-white text-indigo-600 ring-1 ring-indigo-200/80 dark:from-indigo-400/20 dark:via-violet-400/10 dark:text-indigo-300 dark:ring-indigo-400/20",
    glowClass: "bg-indigo-200/50 dark:bg-indigo-400/10",
  },
  {
    icon: NoteEditIcon,
    audience: "For tutors",
    title: "Post a",
    accent: "Tuition",
    accentClass: "text-amber-600 dark:text-amber-300",
    description:
      "Teachers post a tuition request in minutes and get applications from interested students.",
    circleClass:
      "from-amber-100 via-orange-50 to-white text-amber-600 ring-1 ring-amber-200/80 dark:from-amber-400/20 dark:via-orange-400/10 dark:text-amber-300 dark:ring-amber-400/20",
    glowClass: "bg-amber-200/50 dark:bg-amber-400/10",
  },
  {
    icon: Task01Icon,
    audience: "For students",
    title: "Apply with",
    accent: "Confidence",
    accentClass: "text-emerald-600 dark:text-emerald-300",
    description:
      "Send applications straight from your profile — class, area and goals included.",
    circleClass:
      "from-emerald-100 via-green-50 to-white text-emerald-600 ring-1 ring-emerald-200/80 dark:from-emerald-400/20 dark:via-green-400/10 dark:text-emerald-300 dark:ring-emerald-400/20",
    glowClass: "bg-emerald-200/50 dark:bg-emerald-400/10",
  },
  {
    icon: ShieldCheckIcon,
    audience: "For everyone",
    title: "Safe &",
    accent: "Secure",
    accentClass: "text-cyan-600 dark:text-cyan-300",
    description:
      "Verified profiles, private contact details and support whenever you need it.",
    circleClass:
      "from-cyan-100 via-teal-50 to-white text-cyan-600 ring-1 ring-cyan-200/80 dark:from-cyan-400/20 dark:via-teal-400/10 dark:text-cyan-300 dark:ring-cyan-400/20",
    glowClass: "bg-cyan-200/50 dark:bg-cyan-400/10",
  },
];

// হিন্ট: Average Rating স্থির রাখা হয়েছে যেন পরে রিয়েল ডেটা দিয়ে আপডেট করা যায়।
const FIXED_AVERAGE_RATING = "4.9/5";

const Features = () => {
  return (
    <section className="relative isolate overflow-hidden py-14 sm:py-20">
      {/* ---------- Background ---------- */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-teal-50/60 to-white dark:from-[#050b10] dark:via-[#07161b] dark:to-[#050b10]" />
        <div className="absolute -left-24 top-0 size-72 rounded-full bg-teal-200/40 blur-3xl dark:bg-teal-500/10" />
        <div className="absolute -right-20 bottom-0 size-80 rounded-full bg-cyan-200/40 blur-3xl dark:bg-cyan-500/10" />
        <div className="absolute right-6 top-10 h-20 w-28 bg-[radial-gradient(circle,rgba(13,148,136,0.35)_1px,transparent_1px)] bg-[size:14px_14px] opacity-50 dark:opacity-25" />
        <div className="absolute bottom-8 left-6 h-20 w-28 bg-[radial-gradient(circle,rgba(13,148,136,0.35)_1px,transparent_1px)] bg-[size:14px_14px] opacity-50 dark:opacity-25" />
        <div className="absolute left-[8%] top-24 size-14 rounded-full border border-teal-200/60 dark:border-teal-400/20" />
        <div className="absolute right-[12%] top-40 size-6 rounded-full bg-teal-200/60 dark:bg-teal-400/20" />
      </div>

      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        {/* ---------- Heading ---------- */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="flex items-center justify-center gap-3">
            <span className="hidden h-px w-12 bg-teal-300 sm:block dark:bg-teal-400/30" />
            <span className="inline-flex items-center gap-2 rounded-full border border-teal-100 bg-white/85 px-4 py-2 text-xs font-semibold text-teal-700 shadow-sm backdrop-blur dark:border-teal-400/25 dark:bg-white/5 dark:text-teal-200">
              <HugeiconsIcon
                icon={GraduationCapIcon}
                size={16}
                strokeWidth={1.9}
              />
              Better learning. Better teaching
            </span>
            <span className="hidden h-px w-12 bg-teal-300 sm:block dark:bg-teal-400/30" />
          </div>

          <h2 className="mt-5 text-3xl font-extrabold leading-[1.1] tracking-tight text-slate-900 sm:text-4xl lg:text-[3rem] dark:text-white">
            Find your course.
            <br />
            <span className="relative inline-block bg-gradient-to-r from-teal-600 via-teal-500 to-cyan-500 bg-clip-text text-transparent dark:from-teal-300 dark:via-teal-300 dark:to-cyan-300">
              Find your mentor
              <svg
                aria-hidden
                viewBox="0 0 260 14"
                fill="none"
                className="absolute -bottom-2 left-0 h-3.5 w-full text-teal-400/70 dark:text-teal-300/60"
              >
                <path
                  d="M4 9C58 4 160 3 256 6"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-400">
            Students search tuitions by subject, class, area and budget. Tutors
            post tuition requests and pick the students who fit best — online or
            offline.
          </p>
        </div>

        {/* ---------- Feature cards: Left Icon | Right Content ---------- */}
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:mt-12 lg:grid-cols-3">
          {features.map((feature) => (
            <article
              key={feature.accent}
              className="group relative flex flex-row items-start gap-4 overflow-hidden rounded-3xl border border-teal-200/75 bg-white/90 p-5 shadow-[0_20px_45px_-34px_rgba(13,148,136,0.65)] backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-teal-300 sm:p-6 dark:border-white/10 dark:bg-white/[0.04] dark:hover:border-teal-400/35"
            >
              <span
                aria-hidden
                className={`absolute -bottom-10 -right-8 size-24 rounded-full blur-2xl ${feature.glowClass}`}
              />

              {/* Left Icon */}
              <span
                className={`grid size-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br shadow-inner sm:size-16 ${feature.circleClass}`}
              >
                <HugeiconsIcon
                  icon={feature.icon}
                  size={26}
                  strokeWidth={1.75}
                  className="transition-transform duration-300 group-hover:scale-110"
                />
              </span>

              {/* Right Content */}
              <div className="min-w-0 flex-1 border-l border-teal-200/70 pl-4 dark:border-white/10">
                <span
                  className={`block text-[10px] font-bold uppercase tracking-[0.12em] ${feature.accentClass}`}
                >
                  {feature.audience}
                </span>
                <h3 className="mt-1 text-base font-bold tracking-tight text-slate-900 sm:text-lg dark:text-white">
                  {feature.title}{" "}
                  <span className={feature.accentClass}>{feature.accent}</span>
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  {feature.description}
                </p>
              </div>
            </article>
          ))}
        </div>

        {/* ---------- Fixed Rating + Actions ---------- */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-2xl border border-teal-200/75 bg-white/85 px-5 py-4 text-center sm:flex-row sm:text-left dark:border-white/10 dark:bg-white/[0.03]">
          <div>
            <p className="text-xs font-bold tracking-[0.14em] text-teal-700 uppercase dark:text-teal-300">
              Platform Rating
            </p>
            <p className="mt-0.5 text-sm font-semibold text-slate-800 dark:text-slate-200">
              Average Rating: {FIXED_AVERAGE_RATING} (fixed for live sync)
            </p>
          </div>

          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/browsetuitions"
              className="group/cta inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-teal-600 to-cyan-600 px-6 py-2.5 text-sm font-semibold text-white shadow-[0_18px_35px_-18px_rgba(13,148,136,0.85)] transition-transform duration-300 hover:-translate-y-0.5 dark:from-teal-500 dark:to-cyan-500 dark:text-[#04121a]"
            >
              Browse tuitions
              <HugeiconsIcon
                icon={ArrowRight01Icon}
                size={17}
                strokeWidth={2}
                className="transition-transform duration-300 group-hover/cta:translate-x-0.5"
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;