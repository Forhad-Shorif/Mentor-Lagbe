"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import {
    ArrowUpRight,
    BookOpen,
    Calendar,
    Clock,
    GraduationCap,
    MapPin,
    Monitor,
    Search,
    Sparkles,
} from "lucide-react";
import BackButton from "@/components/SheareUI/BackButton";

export interface TeacherTuitionPost {
    _id?: string;
    id?: string | number;
    name?: string;
    title?: string;
    subject?: string;
    classLevel?: string;
    deliveryMode?: string;
    mode?: string;
    location?: string;
    area?: string;
    fee?: number | string;
    monthlyFee?: number | string;
    weeklyClasses?: string;
    classDuration?: string;
    courseDuration?: string;
    availableSeats?: string | number;
    applyDeadline?: string;
    status?: string;
    description?: string;
    about?: string;
    coverImageURL?: string;
    logoImageURL?: string;
    highlights?: string[];
    createdAt?: string;
}

interface TeacherTuitionsListProps {
    tuitions: TeacherTuitionPost[];
    backHref?: string;
    backLabel?: string;
}

const isClosed = (tuition: TeacherTuitionPost) =>
    String(tuition?.status || "active").toLowerCase() === "closed";

const getDescription = (tuition: TeacherTuitionPost) =>
    tuition?.about || tuition?.description || "";

const getCover = (tuition: TeacherTuitionPost) =>
    tuition?.coverImageURL || tuition?.logoImageURL || "";

export default function TeacherTuitionsList({
    tuitions,
    backHref,
    backLabel = "Back",
}: TeacherTuitionsListProps) {
    const [searchTerm, setSearchTerm] = useState("");
    const [modeFilter, setModeFilter] = useState<"all" | "online" | "offline">(
        "all"
    );

    const filteredTuitions = useMemo(() => {
        const q = searchTerm.trim().toLowerCase();

        return tuitions.filter((item) => {
            const modeVal = String(item?.deliveryMode || item?.mode || "").toLowerCase();
            const matchesMode =
                modeFilter === "all" ||
                (modeFilter === "online" && modeVal.includes("online")) ||
                (modeFilter === "offline" &&
                    (modeVal.includes("offline") || modeVal.includes("hybrid")));

            const matchesSearch =
                !q ||
                String(item?.title || "").toLowerCase().includes(q) ||
                String(item?.subject || "").toLowerCase().includes(q) ||
                String(item?.classLevel || "").toLowerCase().includes(q) ||
                String(item?.location || item?.area || "").toLowerCase().includes(q);

            return matchesMode && matchesSearch;
        });
    }, [tuitions, searchTerm, modeFilter]);

    return (
        <div className="space-y-5">
            {backHref && (
                <BackButton fallbackHref={backHref} label={backLabel} />
            )}

            {/* Search & Mode Filter */}
            <div className="flex flex-col gap-3 rounded-2xl border border-slate-300/80 bg-white/95 p-4 shadow-2xs dark:border-white/10 dark:bg-white/[0.04] sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-1 items-center gap-2 rounded-xl border border-slate-200 bg-slate-50/80 px-3 py-2 focus-within:border-amber-400 focus-within:bg-white dark:border-white/10 dark:bg-slate-950/70">
                    <Search className="h-4 w-4 shrink-0 text-amber-600 dark:text-amber-300" />
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search tuitions by title, subject, level or area..."
                        className="w-full bg-transparent text-xs text-slate-800 outline-none placeholder:text-slate-400 dark:text-white sm:text-sm"
                    />
                </div>

                <div className="inline-flex rounded-xl border border-slate-200 bg-slate-100 p-1 dark:border-white/10 dark:bg-slate-950">
                    {(["all", "online", "offline"] as const).map((mode) => (
                        <button
                            key={mode}
                            type="button"
                            onClick={() => setModeFilter(mode)}
                            className={`cursor-pointer rounded-lg px-3 py-1 text-xs font-bold capitalize transition ${modeFilter === mode
                                    ? "bg-gradient-to-r from-amber-500 to-cyan-600 text-white shadow-2xs dark:from-amber-400 dark:to-cyan-400 dark:text-slate-950"
                                    : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                                }`}
                        >
                            {mode}
                        </button>
                    ))}
                </div>
            </div>

            <p className="inline-flex items-center gap-1.5 px-1 text-xs font-medium text-slate-500 dark:text-slate-400">
                <Sparkles className="h-3.5 w-3.5 text-amber-600 dark:text-amber-300" />
                Showing{" "}
                <strong className="font-extrabold text-slate-900 dark:text-white">
                    {filteredTuitions.length}
                </strong>{" "}
                of{" "}
                <strong className="font-extrabold text-slate-900 dark:text-white">
                    {tuitions.length}
                </strong>{" "}
                tuition post{tuitions.length === 1 ? "" : "s"}
            </p>

            {/* Tuitions Grid */}
            {filteredTuitions.length === 0 ? (
                <div className="rounded-3xl border border-dashed border-amber-400/70 bg-white/90 p-10 text-center dark:border-amber-300/25 dark:bg-white/[0.03]">
                    <BookOpen className="mx-auto h-8 w-8 text-amber-600 dark:text-amber-300" />
                    <p className="mt-3 text-base font-extrabold text-slate-900 dark:text-white">
                        No tuitions found
                    </p>
                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                        {tuitions.length === 0
                            ? "This teacher has not posted any tuition yet."
                            : "No tuition matches your search or filter. Try clearing them."}
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                    {filteredTuitions.map((tuition, idx) => {
                        const id = String(tuition?._id || tuition?.id || idx);
                        const modeLabel = tuition?.deliveryMode || tuition?.mode || "Flexible";
                        const locationLabel =
                            tuition?.location || tuition?.area || "Bangladesh";
                        const feeValue = tuition?.fee ?? tuition?.monthlyFee;
                        const cover = getCover(tuition);
                        const description = getDescription(tuition);
                        const closed = isClosed(tuition);

                        return (
                            <article
                                key={id}
                                className={`flex flex-col justify-between overflow-hidden rounded-3xl border bg-white/95 shadow-sm transition-all duration-300 hover:-translate-y-1 dark:bg-white/[0.04] ${closed
                                        ? "border-slate-300/70 opacity-90 hover:border-slate-400 dark:border-white/10"
                                        : "border-slate-300/85 hover:border-amber-400/75 dark:border-white/10 dark:hover:border-amber-300/35"
                                    }`}
                            >
                                <div>
                                    <div className="h-1.5 w-full bg-gradient-to-r from-amber-400 via-fuchsia-500 to-cyan-500" />

                                    {/* Cover image */}
                                    {cover ? (
                                        <div className="relative h-40 w-full overflow-hidden bg-gradient-to-br from-amber-500/10 via-cyan-500/10 to-slate-100 sm:h-44 dark:from-amber-400/10 dark:via-cyan-400/10 dark:to-slate-900">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img
                                                src={cover}
                                                alt={tuition?.title || "Tuition cover"}
                                                className={`h-full w-full object-cover ${closed ? "grayscale" : ""
                                                    }`}
                                            />
                                            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/45 via-transparent to-transparent" />
                                        </div>
                                    ) : null}

                                    <div className="p-5 sm:p-6">
                                        <div className="flex flex-wrap items-center justify-between gap-2">
                                            <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-300/80 bg-amber-50 px-3 py-1 text-[11px] font-extrabold text-amber-800 dark:border-amber-300/25 dark:bg-amber-400/10 dark:text-amber-200">
                                                <Monitor className="h-3.5 w-3.5" />
                                                <span>{modeLabel}</span>
                                            </span>

                                            <span
                                                className={`rounded-full border px-2.5 py-0.5 text-[11px] font-bold capitalize ${closed
                                                        ? "border-rose-300/80 bg-rose-50 text-rose-700 dark:border-rose-400/25 dark:bg-rose-400/10 dark:text-rose-200"
                                                        : "border-emerald-300/80 bg-emerald-50 text-emerald-700 dark:border-emerald-400/25 dark:bg-emerald-400/10 dark:text-emerald-200"
                                                    }`}
                                            >
                                                {closed ? "Closed" : "Active"}
                                            </span>
                                        </div>

                                        <h2 className="mt-3 text-lg font-extrabold text-slate-900 dark:text-white sm:text-xl">
                                            {tuition?.title || tuition?.subject || "Tuition Batch"}
                                        </h2>

                                        <p className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-semibold text-slate-500 dark:text-slate-400">
                                            <span className="inline-flex items-center gap-1">
                                                <GraduationCap className="h-3.5 w-3.5 text-cyan-600 dark:text-cyan-300" />
                                                <span>
                                                    {[tuition?.subject, tuition?.classLevel]
                                                        .filter(Boolean)
                                                        .join(" · ") || "General Tuition"}
                                                </span>
                                            </span>
                                        </p>

                                        {description && (
                                            <p className="mt-3 line-clamp-2 text-xs leading-relaxed text-slate-600 dark:text-slate-300 sm:text-sm">
                                                {description}
                                            </p>
                                        )}

                                        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs text-slate-600 dark:text-slate-400">
                                            <span className="inline-flex items-center gap-1">
                                                <MapPin className="h-3.5 w-3.5 text-amber-600 dark:text-amber-300" />
                                                <span>{locationLabel}</span>
                                            </span>

                                            {tuition?.weeklyClasses && (
                                                <span className="inline-flex items-center gap-1">
                                                    <Calendar className="h-3.5 w-3.5 text-cyan-600 dark:text-cyan-300" />
                                                    <span>{tuition.weeklyClasses}</span>
                                                </span>
                                            )}

                                            {tuition?.classDuration && (
                                                <span className="inline-flex items-center gap-1">
                                                    <Clock className="h-3.5 w-3.5 text-violet-600 dark:text-violet-300" />
                                                    <span>{tuition.classDuration}</span>
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between gap-3 border-t border-slate-200/80 bg-slate-50/70 px-5 py-3.5 dark:border-white/10 dark:bg-slate-950/50 sm:px-6">
                                    <div>
                                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                            Monthly Fee
                                        </span>
                                        <p className="text-sm font-extrabold text-slate-900 dark:text-amber-200">
                                            {feeValue !== undefined && feeValue !== ""
                                                ? `৳ ${feeValue}`
                                                : "Negotiable"}
                                        </p>
                                    </div>

                                    {closed ? (
                                        <span
                                            title="This tuition is closed"
                                            className="inline-flex cursor-not-allowed items-center gap-1.5 rounded-xl border border-slate-300 bg-slate-100 px-4 py-2 text-xs font-extrabold text-slate-500 dark:border-white/10 dark:bg-white/5 dark:text-slate-400"
                                        >
                                            <span>Closed</span>
                                        </span>
                                    ) : (
                                        <Link
                                            href={`/view/${encodeURIComponent(id)}`}
                                            className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-amber-500 via-teal-600 to-cyan-600 px-4 py-2 text-xs font-extrabold text-white shadow-2xs transition hover:brightness-105 dark:from-amber-400 dark:via-teal-400 dark:to-cyan-400 dark:text-slate-950"
                                        >
                                            <span>View Details</span>
                                            <ArrowUpRight className="h-3.5 w-3.5" />
                                        </Link>
                                    )}
                                </div>
                            </article>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
