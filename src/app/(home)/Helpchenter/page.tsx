import { LifeBuoy, Sparkles } from "lucide-react";
import HelpCenterInteractive from "@/components/SheareHome/Footer/HelpCenterInteractive";
import BackButton from "@/components/SheareUI/BackButton";

export default function HelpCenterPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-b from-amber-50/65 via-slate-50 to-cyan-50/50 px-4 py-10 text-slate-900 dark:from-[#09121a] dark:via-[#060e16] dark:to-[#050b10] dark:text-slate-100 sm:px-6 lg:px-8">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-24 top-10 size-80 rounded-full bg-amber-300/35 blur-3xl dark:bg-amber-400/12" />
        <div className="absolute -right-24 top-24 size-80 rounded-full bg-gradient-to-br from-fuchsia-300/25 via-cyan-300/30 to-slate-300/40 blur-3xl dark:from-fuchsia-500/10 dark:via-cyan-500/12 dark:to-slate-400/10" />
      </div>

      <div className="mx-auto max-w-5xl space-y-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-amber-300/85 bg-white/90 px-4 py-2 text-xs font-bold text-slate-800 shadow-2xs transition hover:-translate-x-0.5 hover:border-amber-400 dark:border-amber-300/25 dark:bg-white/[0.05] dark:text-amber-200"
          >
            <ArrowLeft className="h-3.5 w-3.5 text-amber-600 dark:text-amber-300" />
            <span>Back to MentorLagbe</span>
          </Link>

          <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-300/90 bg-white/90 px-3.5 py-1.5 text-[11px] font-extrabold text-slate-700 dark:border-white/15 dark:bg-white/[0.05] dark:text-slate-200">
            <Sparkles className="h-3.5 w-3.5 text-amber-500 dark:text-amber-300" />
            <span>Help Center</span>
          </span>
        </div>

        <header className="rounded-[30px] border border-amber-300/85 bg-gradient-to-br from-amber-50/90 via-white to-cyan-50/80 p-6 shadow-[0_22px_50px_-28px_rgba(217,119,6,0.45)] dark:border-amber-300/25 dark:from-[#18150e] dark:via-[#08131b] dark:to-[#081b22] sm:p-9">
          <div className="mb-4 h-1.5 w-28 rounded-full bg-gradient-to-r from-amber-400 via-fuchsia-500 to-cyan-500" />

          <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/45 bg-white/90 px-3.5 py-1 text-xs font-extrabold text-amber-800 dark:border-amber-300/30 dark:bg-slate-950/75 dark:text-amber-200">
            <LifeBuoy className="h-4 w-4 text-amber-600 dark:text-amber-300" />
            <span>MentorLagbe Support &amp; Guide</span>
          </div>

          <h1 className="mt-4 text-3xl font-black tracking-tight text-slate-900 dark:text-white sm:text-5xl">
            How Can We{" "}
            <span className="bg-gradient-to-r from-amber-600 via-fuchsia-600 to-cyan-600 bg-clip-text text-transparent dark:from-amber-300 dark:via-fuchsia-300 dark:to-cyan-300">
              Help You Today?
            </span>
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-slate-300 sm:text-base">
            Search quick answers about tuition browsing, tutor profiles,
            teaching modes, or direct support.
          </p>
        </header>

        <HelpCenterInteractive />
      </div>
    </main>
  );
}
