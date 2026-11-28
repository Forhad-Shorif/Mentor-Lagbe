import React from "react";
import {
  BookOpen,
  CheckCircle2,
  FileText,
  Scale,
  Sparkles,
  Users,
} from "lucide-react";
import BackButton from "@/components/SheareUI/BackButton";

const termsCards = [
  {
    step: "01",
    title: "Using MentorLagbe Fairly",
    summary:
      "Accurate profiles, respectful communication, and genuine tuition posts.",
    icon: Users,
    border:
      "border-amber-300/85 bg-gradient-to-br from-amber-50/80 via-white to-slate-50/70 dark:border-amber-300/25 dark:from-[#18150e] dark:via-slate-900 dark:to-slate-950",
    iconWrap:
      "bg-gradient-to-br from-amber-400/25 to-yellow-500/20 text-amber-700 ring-1 ring-amber-400/40 dark:text-amber-300",
    items: [
      "Provide true and up-to-date information when registering or updating your role.",
      "Do not post spam, misleading tuition fees, or duplicate listings.",
      "Keep all interactions respectful across students, tutors, and platform administrators.",
    ],
  },
  {
    step: "02",
    title: "Tuitions, Schedules & Modes",
    summary:
      "Clear expectations for Online, Offline, and Hybrid learning sessions.",
    icon: BookOpen,
    border:
      "border-slate-300/90 bg-gradient-to-br from-slate-100/85 via-white to-cyan-50/60 dark:border-white/15 dark:from-slate-900/90 dark:via-slate-900/75 dark:to-[#081920]",
    iconWrap:
      "bg-gradient-to-br from-slate-200 via-white to-cyan-200/70 text-slate-800 ring-1 ring-slate-300 dark:from-slate-300/20 dark:to-cyan-300/15 dark:text-cyan-200",
    items: [
      "Confirm class schedules, subjects, monthly fees, and teaching mode before starting.",
      "Offline and home tuitions should follow safe, agreed-upon locations and timings.",
      "MentorLagbe connects learners and tutors and may update listings to maintain quality.",
    ],
  },
  {
    step: "03",
    title: "Account Integrity & Updates",
    summary: "Platform moderation and periodic improvements to these terms.",
    icon: Scale,
    border:
      "border-cyan-300/80 bg-gradient-to-br from-cyan-50/70 via-white to-fuchsia-50/55 dark:border-cyan-400/25 dark:from-[#081922] dark:via-slate-900 dark:to-[#17111e]",
    iconWrap:
      "bg-gradient-to-br from-cyan-400/20 via-teal-400/20 to-fuchsia-300/25 text-cyan-700 ring-1 ring-cyan-400/35 dark:text-cyan-300",
    items: [
      "Accounts involved in policy violations or misuse may be restricted or reviewed.",
      "Terms may be updated as MentorLagbe adds new features for students and tutors.",
      "Continuing to use the platform after updates means you accept the revised terms.",
    ],
  },
];

export default function TermsOfServicePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-b from-slate-50 via-amber-50/45 to-cyan-50/45 px-4 py-10 text-slate-900 dark:from-[#060d14] dark:via-[#08141c] dark:to-[#050b10] dark:text-slate-100 sm:px-6 lg:px-8">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -right-24 top-12 size-80 rounded-full bg-amber-300/35 blur-3xl dark:bg-amber-400/12" />
        <div className="absolute -left-24 bottom-12 size-80 rounded-full bg-gradient-to-br from-cyan-300/30 via-fuchsia-300/25 to-slate-300/40 blur-3xl dark:from-cyan-500/12 dark:via-fuchsia-500/10 dark:to-slate-400/10" />
      </div>

      <div className="mx-auto max-w-5xl space-y-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-slate-300/90 bg-white/90 px-4 py-2 text-xs font-bold text-slate-800 shadow-2xs transition hover:-translate-x-0.5 hover:border-amber-400 dark:border-white/15 dark:bg-white/[0.05] dark:text-slate-200"
          >
            <ArrowLeft className="h-3.5 w-3.5 text-amber-600 dark:text-amber-300" />
            <span>Back to Home</span>
          </Link>

          <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-300/85 bg-amber-50/90 px-3.5 py-1.5 text-[11px] font-extrabold text-amber-800 dark:border-amber-300/30 dark:bg-amber-400/10 dark:text-amber-200">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Terms of Service</span>
          </span>
        </div>

        <header className="rounded-[30px] border border-slate-300/90 bg-gradient-to-br from-white via-slate-50/90 to-amber-50/75 p-6 shadow-[0_22px_50px_-30px_rgba(15,23,42,0.3)] dark:border-white/15 dark:from-[#0b1520] dark:via-slate-900 dark:to-[#17140d] sm:p-9">
          <div className="mb-4 h-1.5 w-28 rounded-full bg-gradient-to-r from-amber-400 via-cyan-500 to-fuchsia-500" />

          <div className="inline-flex items-center gap-2 rounded-full border border-slate-300/90 bg-white px-3.5 py-1 text-xs font-extrabold text-slate-800 dark:border-white/15 dark:bg-slate-950/75 dark:text-amber-200">
            <FileText className="h-4 w-4 text-amber-600 dark:text-amber-300" />
            <span>Platform Guidelines · MentorLagbe</span>
          </div>

          <h1 className="mt-4 text-3xl font-black tracking-tight text-slate-900 dark:text-white sm:text-5xl">
            Clear Rules for{" "}
            <span className="bg-gradient-to-r from-amber-600 via-cyan-600 to-fuchsia-600 bg-clip-text text-transparent dark:from-amber-300 dark:via-cyan-300 dark:to-fuchsia-300">
              Every Learner &amp; Tutor
            </span>
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-slate-300 sm:text-base">
            Simple, fair terms designed to keep tuition discovery smooth,
            honest, and helpful across Bangladesh.
          </p>
        </header>

        <section className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {termsCards.map((card) => {
            const Icon = card.icon;
            return (
              <article
                key={card.step}
                className={`flex flex-col justify-between rounded-[26px] border p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 sm:p-6 ${card.border}`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`grid size-11 place-items-center rounded-2xl ${card.iconWrap}`}
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="rounded-full border border-slate-300/80 bg-white/85 px-2.5 py-0.5 text-[11px] font-black text-slate-600 dark:border-white/10 dark:bg-white/[0.05] dark:text-slate-300">
                      RULE {card.step}
                    </span>
                  </div>

                  <h2 className="mt-4 text-lg font-extrabold text-slate-900 dark:text-white sm:text-xl">
                    {card.title}
                  </h2>
                  <p className="mt-1.5 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                    {card.summary}
                  </p>

                  <ul className="mt-4 space-y-2.5 border-t border-slate-200/80 pt-4 dark:border-white/10">
                    {card.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-xs leading-relaxed text-slate-700 dark:text-slate-300 sm:text-sm"
                      >
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-amber-600 dark:text-amber-300" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            );
          })}
        </section>

        <div className="flex flex-col items-start justify-between gap-4 rounded-[26px] border border-amber-300/85 bg-gradient-to-r from-amber-50/85 via-white to-cyan-50/75 p-5 shadow-sm dark:border-amber-300/25 dark:from-[#18150e] dark:via-slate-900 dark:to-[#081a21] sm:flex-row sm:items-center sm:p-6">
          <div>
            <p className="text-sm font-extrabold text-slate-900 dark:text-white">
              Ready to browse tuitions or join as a tutor?
            </p>
            <p className="mt-0.5 text-xs text-slate-600 dark:text-slate-400">
              Explore live tuition listings or visit the Help Center if you need
              assistance.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <Link
              href="/about"
              className="rounded-xl border border-amber-400/70 bg-white/90 px-4 py-2.5 text-xs font-bold text-amber-900 transition hover:bg-amber-50 dark:border-amber-300/30 dark:bg-white/[0.05] dark:text-amber-200 dark:hover:bg-white/[0.1] sm:text-sm"
            >
              Visit Help Center
            </Link>

            <Link
              href="/browsetuitions"
              className="rounded-xl bg-gradient-to-r from-amber-500 via-teal-600 to-cyan-600 px-5 py-2.5 text-xs font-extrabold text-white shadow-sm transition hover:brightness-105 dark:from-amber-400 dark:via-teal-400 dark:to-cyan-400 dark:text-slate-950 sm:text-sm"
            >
              Browse Tuitions
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
