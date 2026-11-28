import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Earth,
  Layers,
  Sparkles,
  Users,
} from "lucide-react";
import AppReviewsDialog from "@/components/SheareHome/AppReviewsDialog";

export const metadata: Metadata = {
  title: "About | MentorLagbe",
  description:
    "Learn how MentorLagbe connects students, guardians, and teachers for online and home tuition across Bangladesh.",
};

const steps = [
  {
    step: "01",
    title: "Post or explore",
    description:
      "Teachers share tuition posts and profiles; students browse matching subjects, modes, and locations.",
    badgeClass:
      "border-amber-300/80 bg-amber-500/15 text-amber-800 dark:border-amber-300/25 dark:text-amber-300",
    cardClass:
      "border-amber-300/80 bg-gradient-to-b from-amber-50/65 via-white to-slate-50/75 dark:border-amber-300/25 dark:from-[#18150e] dark:via-slate-900/90 dark:to-slate-950",
  },
  {
    step: "02",
    title: "Connect with ease",
    description:
      "Choose online sessions from home or face-to-face learning nearby without unnecessary back-and-forth.",
    badgeClass:
      "border-slate-300/90 bg-slate-200/70 text-slate-800 dark:border-white/15 dark:bg-white/10 dark:text-slate-200",
    cardClass:
      "border-slate-300/90 bg-gradient-to-b from-slate-100/80 via-white to-cyan-50/60 dark:border-white/15 dark:from-slate-900/90 dark:via-slate-900/75 dark:to-[#081920]",
  },
  {
    step: "03",
    title: "Learn & grow",
    description:
      "Stay organized through clean role-based dashboards with steady academic progress.",
    badgeClass:
      "border-fuchsia-300/80 bg-fuchsia-500/12 text-fuchsia-800 dark:border-fuchsia-400/25 dark:text-fuchsia-300",
    cardClass:
      "border-cyan-300/80 bg-gradient-to-b from-cyan-50/60 via-white to-fuchsia-50/55 dark:border-cyan-400/25 dark:from-[#081922] dark:via-slate-900/90 dark:to-[#17111e]",
  },
];

const highlights = [
  {
    icon: Earth,
    title: "Online, Offline & Hybrid",
    subtitle: "Flexible learning modes",
    iconWrap:
      "bg-gradient-to-br from-amber-400/25 to-yellow-500/20 text-amber-700 ring-1 ring-amber-400/40 dark:text-amber-300",
    cardBorder:
      "border-amber-300/80 hover:border-amber-400 dark:border-amber-300/20 dark:hover:border-amber-300/45",
  },
  {
    icon: Users,
    title: "3 Dedicated Roles",
    subtitle: "Student, Teacher & Admin",
    iconWrap:
      "bg-gradient-to-br from-slate-200 via-white to-cyan-200/70 text-slate-800 ring-1 ring-slate-300 dark:from-slate-300/20 dark:to-cyan-300/15 dark:text-cyan-200",
    cardBorder:
      "border-slate-300/90 hover:border-cyan-400 dark:border-white/15 dark:hover:border-cyan-300/45",
  },
  {
    icon: Layers,
    title: "Role-Based Dashboards",
    subtitle: "Organized learning & listings",
    iconWrap:
      "bg-gradient-to-br from-fuchsia-400/20 via-violet-400/20 to-amber-300/25 text-fuchsia-700 ring-1 ring-fuchsia-400/35 dark:text-fuchsia-300",
    cardBorder:
      "border-violet-300/80 hover:border-violet-400 dark:border-fuchsia-400/20 dark:hover:border-fuchsia-300/45",
  },
];

export default function AboutPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-b from-amber-50/65 via-slate-50 to-cyan-50/45 text-slate-900 dark:from-[#09121a] dark:via-[#060e16] dark:to-[#050b10] dark:text-white">
      {/* Golden + Silver + Prismatic Soft Glows */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-24 top-12 size-80 rounded-full bg-amber-300/35 blur-3xl dark:bg-amber-400/12" />
        <div className="absolute right-0 top-16 size-80 rounded-full bg-slate-300/45 blur-3xl dark:bg-slate-400/10" />
        <div className="absolute bottom-10 left-1/3 size-80 rounded-full bg-gradient-to-br from-cyan-300/30 via-fuchsia-300/25 to-amber-300/30 blur-3xl dark:from-cyan-500/12 dark:via-fuchsia-500/10 dark:to-amber-400/12" />
      </div>

      {/* 1. Hero Section */}
      <section className="mx-auto max-w-6xl px-4 pt-12 pb-14 sm:px-6 sm:pt-16 sm:pb-20">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-amber-300/90 bg-gradient-to-r from-amber-50 via-white to-slate-100 px-3.5 py-1.5 text-[11px] font-extrabold tracking-[0.18em] text-amber-800 uppercase shadow-2xs dark:border-amber-300/30 dark:from-amber-400/10 dark:via-white/[0.04] dark:to-slate-300/10 dark:text-amber-200">
            <Sparkles className="size-3.5 text-amber-600 dark:text-amber-300" />
            About MentorLagbe
          </span>

          <h1 className="mt-5 text-3xl font-extrabold leading-tight tracking-tight sm:text-5xl">
            Right mentor, right learning pace —{" "}
            <span className="bg-gradient-to-r from-amber-600 via-fuchsia-600 to-cyan-600 bg-clip-text text-transparent dark:from-amber-300 dark:via-fuchsia-300 dark:to-cyan-300">
              online or at home
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
            MentorLagbe makes it straightforward for students and guardians to
            find dependable tutors, while giving teachers a clear place to share
            tuitions and connect with learners across Bangladesh.
          </p>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/browsetuitions"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 via-teal-600 to-cyan-600 px-5 py-2.5 text-sm font-extrabold text-white shadow-sm transition hover:brightness-105 dark:from-amber-400 dark:via-teal-400 dark:to-cyan-400 dark:text-slate-950"
            >
              <span>Browse Tuitions</span>
              <ArrowRight className="size-4" />
            </Link>

            <AppReviewsDialog variant="outline" triggerLabel="App Reviews" />
          </div>
        </div>

        {/* Highlights Strip (No fake numbers) */}
        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3">
          {highlights.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className={`flex items-center gap-3.5 rounded-2xl border bg-white/95 px-4 py-4 shadow-2xs transition-all duration-200 hover:-translate-y-0.5 dark:bg-white/[0.04] ${item.cardBorder}`}
              >
                <span
                  className={`grid size-11 shrink-0 place-items-center rounded-xl ${item.iconWrap}`}
                >
                  <Icon className="size-5" />
                </span>
                <div className="min-w-0">
                  <p className="truncate text-base font-extrabold text-slate-900 dark:text-white">
                    {item.title}
                  </p>
                  <p className="truncate text-xs font-medium text-slate-600 dark:text-slate-400">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 2. How It Works */}
      <section className="border-y border-amber-300/50 bg-white/75 py-14 sm:py-16 dark:border-white/10 dark:bg-white/[0.02]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-extrabold tracking-[0.18em] text-amber-700 uppercase dark:text-amber-300">
              <span className="size-1.5 rounded-full bg-gradient-to-r from-amber-500 to-cyan-500" />
              How It Works
            </span>
            <h2 className="mt-1.5 text-2xl font-extrabold tracking-tight sm:text-3xl">
              Three simple steps to get started
            </h2>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
            {steps.map((item) => (
              <article
                key={item.step}
                className={`rounded-2xl border p-6 shadow-2xs transition-all duration-300 hover:-translate-y-1 ${item.cardClass}`}
              >
                <span
                  className={`inline-flex rounded-lg border px-2.5 py-1 text-xs font-extrabold ${item.badgeClass}`}
                >
                  STEP {item.step}
                </span>
                <h3 className="mt-4 text-lg font-extrabold text-slate-900 dark:text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Closing CTA */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
        <div className="flex flex-col items-start justify-between gap-4 rounded-3xl border border-amber-300/85 bg-gradient-to-r from-amber-50/90 via-white to-cyan-50/80 p-6 shadow-sm dark:border-amber-300/25 dark:from-[#18150e] dark:via-slate-900 dark:to-[#081b22] sm:flex-row sm:items-center sm:p-8">
          <div>
            <h2 className="text-xl font-extrabold tracking-tight sm:text-2xl">
              Ready to start learning or mentoring?
            </h2>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              Explore available tuitions or read and share user experiences.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <AppReviewsDialog variant="outline" triggerLabel="Write a Review" />
            <Link
              href="/browsetuitions"
              className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-amber-500 via-teal-600 to-cyan-600 px-4 py-2.5 text-xs font-extrabold text-white transition hover:brightness-105 sm:text-sm dark:from-amber-400 dark:via-teal-400 dark:to-cyan-400 dark:text-slate-950"
            >
              <span>Browse Tuitions</span>
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}