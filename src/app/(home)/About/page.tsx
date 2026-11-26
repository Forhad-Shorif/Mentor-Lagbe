import type { Metadata } from "next";
import Link from "next/link";
import {
    ArrowRight,
    Earth,
    MapPin,
    Sparkles,
    Star,
    Users,
} from "lucide-react";
import AppReviewsDialog from "@/components/SheareHome/AppReviewsDialog";

export const metadata: Metadata = {
    title: "About | MentorLagbe",
    description:
        "Learn how MentorLagbe connects students, guardians, and teachers for online and home tuition across Bangladesh.",
};

const FIXED_AVERAGE_RATING = "4.9/5";

const steps = [
    {
        step: "01",
        title: "Post or explore",
        description:
            "Teachers share tuition posts and profiles; students browse matching subjects, modes, and locations.",
    },
    {
        step: "02",
        title: "Connect with ease",
        description:
            "Choose online sessions from home or face-to-face learning nearby without unnecessary back-and-forth.",
    },
    {
        step: "03",
        title: "Learn & grow",
        description:
            "Stay organized through clean role-based dashboards with steady academic progress.",
    },
];

const highlights = [
    {
        icon: Earth,
        value: "Online & Offline",
        label: "Flexible learning modes",
    },
    {
        icon: MapPin,
        value: "64",
        label: "Districts across Bangladesh",
    },
    {
        icon: Star,
        value: FIXED_AVERAGE_RATING,
        label: "Average rating (fixed)",
    },
    {
        icon: Users,
        value: "3 Roles",
        label: "Student, Teacher & Admin",
    },
];

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-gradient-to-b from-teal-50/75 via-white to-teal-50/35 text-slate-900 dark:from-[#050b10] dark:via-[#07161b] dark:to-[#050b10] dark:text-white">
            {/* 1. Hero Section */}
            <section className="mx-auto max-w-6xl px-4 pt-12 pb-14 sm:px-6 sm:pt-16 sm:pb-20">
                <div className="mx-auto max-w-3xl text-center">
                    <span className="inline-flex items-center gap-2 rounded-full border border-teal-200/90 bg-white/90 px-3.5 py-1.5 text-[11px] font-bold tracking-[0.18em] text-teal-700 uppercase shadow-2xs dark:border-teal-400/25 dark:bg-white/5 dark:text-teal-300">
                        <Sparkles className="size-3.5 text-teal-600 dark:text-teal-400" />
                        About MentorLagbe
                    </span>

                    <h1 className="mt-5 text-3xl font-extrabold leading-tight tracking-tight sm:text-5xl">
                        Right mentor, right learning pace —{" "}
                        <span className="bg-gradient-to-r from-teal-600 via-teal-500 to-cyan-600 bg-clip-text text-transparent dark:from-teal-300 dark:to-cyan-300">
                            online or at home
                        </span>
                    </h1>

                    <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-400">
                        MentorLagbe makes it straightforward for students and guardians to
                        find dependable tutors, while giving teachers a clear place to share
                        tuitions and connect with learners across Bangladesh.
                    </p>

                    <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
                        <Link
                            href="/browsetuitions"
                            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-teal-600 to-cyan-600 px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:from-teal-500 hover:to-cyan-500 dark:from-teal-400 dark:to-cyan-400 dark:text-slate-950"
                        >
                            <span>Browse Tuitions</span>
                            <ArrowRight className="size-4" />
                        </Link>

                        <AppReviewsDialog variant="outline" triggerLabel="App Reviews" />
                    </div>
                </div>

                {/* Highlights Strip */}
                <div className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    {highlights.map((item) => {
                        const Icon = item.icon;
                        return (
                            <div
                                key={item.label}
                                className="flex items-center gap-3.5 rounded-2xl border border-teal-200/75 bg-white/95 px-4 py-4 shadow-2xs dark:border-white/10 dark:bg-white/[0.04]"
                            >
                                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-teal-500/12 text-teal-700 ring-1 ring-teal-500/20 dark:bg-teal-400/15 dark:text-teal-300">
                                    <Icon className="size-5" />
                                </span>
                                <div className="min-w-0">
                                    <p className="truncate text-base font-extrabold text-slate-900 dark:text-white">
                                        {item.value}
                                    </p>
                                    <p className="truncate text-xs font-medium text-slate-600 dark:text-slate-400">
                                        {item.label}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* 2. How It Works */}
            <section className="border-y border-teal-200/60 bg-white/70 py-14 sm:py-16 dark:border-white/10 dark:bg-white/[0.02]">
                <div className="mx-auto max-w-6xl px-4 sm:px-6">
                    <div className="max-w-xl">
                        <span className="text-[11px] font-bold tracking-[0.18em] text-teal-700 uppercase dark:text-teal-300">
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
                                className="rounded-2xl border border-teal-200/75 bg-white p-6 shadow-2xs dark:border-white/10 dark:bg-white/[0.04]"
                            >
                                <span className="inline-flex rounded-lg bg-teal-600/10 px-2.5 py-1 text-xs font-extrabold text-teal-700 dark:bg-teal-400/15 dark:text-teal-300">
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
                <div className="flex flex-col items-start justify-between gap-4 rounded-3xl border border-teal-200/80 bg-gradient-to-r from-teal-50 via-white to-cyan-50/70 p-6 sm:flex-row sm:items-center sm:p-8 dark:border-white/10 dark:from-teal-500/10 dark:via-white/[0.03] dark:to-cyan-500/10">
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
                            className="inline-flex items-center gap-1.5 rounded-xl bg-teal-600 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-teal-500 sm:text-sm dark:bg-teal-400 dark:text-slate-950 dark:hover:bg-teal-300"
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
