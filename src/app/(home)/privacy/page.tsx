import React from "react";
import {
  CheckCircle2,
  Database,
  Eye,
  Lock,
  Mail,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import BackButton from "@/components/SheareUI/BackButton";

const privacySections = [
  {
    id: "collection",
    badge: "01 · DATA COLLECTION",
    title: "Information We Collect",
    icon: Database,
    accent:
      "border-amber-300/80 bg-gradient-to-br from-amber-50/80 via-white to-slate-50/70 dark:border-amber-300/25 dark:from-[#18150e] dark:via-slate-900 dark:to-slate-950",
    iconStyle:
      "bg-gradient-to-br from-amber-400/25 to-yellow-500/20 text-amber-700 ring-1 ring-amber-400/40 dark:text-amber-300",
    points: [
      "Account and profile details such as your name, email address, role (Student, Tutor, or Admin), and selected subjects or class levels.",
      "Tuition search queries, posted tuition listings, and application details shared on MentorLagbe.",
      "Basic technical and session signals required for authentication, security, and platform stability.",
    ],
  },
  {
    id: "usage",
    badge: "02 · HOW WE USE IT",
    title: "How Your Data Powers MentorLagbe",
    icon: Eye,
    accent:
      "border-slate-300/90 bg-gradient-to-br from-slate-100/85 via-white to-cyan-50/60 dark:border-white/15 dark:from-slate-900/90 dark:via-slate-900/75 dark:to-[#081920]",
    iconStyle:
      "bg-gradient-to-br from-slate-200 via-white to-cyan-200/70 text-slate-800 ring-1 ring-slate-300 dark:from-slate-300/20 dark:to-cyan-300/15 dark:text-cyan-200",
    points: [
      "Matching students with relevant tutors across online, offline, and hybrid teaching modes.",
      "Displaying active tuitions, managing user roles, and keeping account sessions reliable.",
      "Improving search relevance, mobile responsiveness, and user support across Bangladesh.",
    ],
  },
  {
    id: "security",
    badge: "03 · PROTECTION & CONTROL",
    title: "Security & Your Privacy Rights",
    icon: Lock,
    accent:
      "border-violet-300/80 bg-gradient-to-br from-fuchsia-50/60 via-white to-amber-50/60 dark:border-fuchsia-400/25 dark:from-[#17101d] dark:via-slate-900 dark:to-[#15130e]",
    iconStyle:
      "bg-gradient-to-br from-fuchsia-400/20 via-violet-400/20 to-amber-300/25 text-fuchsia-700 ring-1 ring-fuchsia-400/35 dark:text-fuchsia-300",
    points: [
      "We do not sell your personal contact details to third-party data brokers.",
      "Protected routes and role checks help keep account actions and platform records organized.",
      "You can request profile updates or contact our support team anytime regarding your account data.",
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-b from-amber-50/65 via-slate-50 to-cyan-50/45 px-4 py-10 text-slate-900 dark:from-[#09121a] dark:via-[#060e16] dark:to-[#050b10] dark:text-slate-100 sm:px-6 lg:px-8">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-24 top-10 size-80 rounded-full bg-amber-300/35 blur-3xl dark:bg-amber-400/12" />
        <div className="absolute right-0 top-20 size-80 rounded-full bg-slate-300/45 blur-3xl dark:bg-slate-400/10" />
        <div className="absolute bottom-10 left-1/3 size-80 rounded-full bg-gradient-to-br from-cyan-300/30 via-fuchsia-300/25 to-amber-300/30 blur-3xl dark:from-cyan-500/12 dark:via-fuchsia-500/10 dark:to-amber-400/12" />
      </div>

      <div className="mx-auto max-w-5xl space-y-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-amber-300/80 bg-white/90 px-4 py-2 text-xs font-bold text-slate-800 shadow-2xs transition hover:-translate-x-0.5 hover:border-amber-400 dark:border-amber-300/25 dark:bg-white/[0.05] dark:text-amber-200"
          >
            <ArrowLeft className="h-3.5 w-3.5 text-amber-600 dark:text-amber-300" />
            <span>Back to MentorLagbe</span>
          </Link>

          <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-300/90 bg-gradient-to-r from-white via-slate-100 to-amber-50 px-3.5 py-1.5 text-[11px] font-extrabold text-slate-700 dark:border-white/15 dark:from-white/[0.06] dark:to-amber-400/10 dark:text-slate-200">
            <Sparkles className="h-3.5 w-3.5 text-amber-500 dark:text-amber-300" />
            <span>Updated · November 2026</span>
          </span>
        </div>

        <header className="relative overflow-hidden rounded-[30px] border border-amber-300/85 bg-gradient-to-br from-amber-50/90 via-white to-cyan-50/75 p-6 shadow-[0_22px_50px_-28px_rgba(217,119,6,0.45)] dark:border-amber-300/25 dark:from-[#18150e] dark:via-[#08131b] dark:to-[#081b22] sm:p-9">
          <div className="mb-4 h-1.5 w-28 rounded-full bg-gradient-to-r from-amber-400 via-fuchsia-500 to-cyan-500" />

          <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/45 bg-white/90 px-3.5 py-1 text-xs font-extrabold text-amber-800 dark:border-amber-300/30 dark:bg-slate-950/75 dark:text-amber-200">
            <ShieldCheck className="h-4 w-4 text-amber-600 dark:text-amber-300" />
            <span>Privacy Policy · MentorLagbe</span>
          </div>

          <h1 className="mt-4 text-3xl font-black tracking-tight text-slate-900 dark:text-white sm:text-5xl">
            Your Trust &amp; Data{" "}
            <span className="bg-gradient-to-r from-amber-600 via-fuchsia-600 to-cyan-600 bg-clip-text text-transparent dark:from-amber-300 dark:via-fuchsia-300 dark:to-cyan-300">
              Protected
            </span>
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-slate-300 sm:text-base">
            We keep your learning journey transparent and secure. Here is how
            MentorLagbe handles your profile information, tuition activity, and
            account preferences.
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {privacySections.map((sec) => (
              <a
                key={sec.id}
                href={`#${sec.id}`}
                className="rounded-xl border border-slate-300/85 bg-white/90 px-3.5 py-1.5 text-xs font-bold text-slate-800 transition hover:border-amber-400 hover:text-amber-800 dark:border-white/15 dark:bg-white/[0.05] dark:text-slate-200 dark:hover:border-amber-300/40"
              >
                {sec.title}
              </a>
            ))}
          </div>
        </header>

        <section className="space-y-5">
          {privacySections.map((sec) => {
            const Icon = sec.icon;
            return (
              <article
                id={sec.id}
                key={sec.id}
                className={`scroll-mt-8 rounded-[26px] border p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 sm:p-7 ${sec.accent}`}
              >
                <div className="flex items-start gap-3.5">
                  <span
                    className={`grid size-11 shrink-0 place-items-center rounded-2xl ${sec.iconStyle}`}
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-[11px] font-extrabold tracking-widest text-amber-800 uppercase dark:text-amber-300">
                      {sec.badge}
                    </p>
                    <h2 className="mt-1 text-xl font-extrabold text-slate-900 dark:text-white sm:text-2xl">
                      {sec.title}
                    </h2>
                  </div>
                </div>

                <ul className="mt-5 space-y-3 border-t border-slate-200/80 pt-4 dark:border-white/10">
                  {sec.points.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-2.5 text-sm leading-relaxed text-slate-700 dark:text-slate-300"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-amber-600 dark:text-amber-300" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </section>

        <div className="flex flex-col items-start justify-between gap-4 rounded-[26px] border border-slate-300/90 bg-gradient-to-r from-slate-100/90 via-white to-amber-50/80 p-5 shadow-sm dark:border-white/15 dark:from-slate-900 dark:via-slate-900/90 dark:to-[#17140d] sm:flex-row sm:items-center sm:p-6">
          <div>
            <p className="text-sm font-extrabold text-slate-900 dark:text-white">
              Questions about privacy or your account?
            </p>
            <p className="mt-0.5 text-xs text-slate-600 dark:text-slate-400">
              Reach out anytime at{" "}
              <span className="font-bold text-amber-700 dark:text-amber-300">
                hello@mentorlagbe.com
              </span>
            </p>
          </div>

          <a
            href="mailto:hello@mentorlagbe.com"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 via-teal-600 to-cyan-600 px-5 py-2.5 text-xs font-extrabold text-white shadow-sm transition hover:brightness-105 dark:from-amber-400 dark:via-teal-400 dark:to-cyan-400 dark:text-slate-950 sm:text-sm"
          >
            <Mail className="h-4 w-4" />
            <span>Contact Support</span>
          </a>
        </div>
      </div>
    </main>
  );
}
