"use client";

import React, { useState } from "react";
import type { FormEvent } from "react";
import {
    BookOpen,
    ChevronDown,
    RotateCcw,
    Search,
    SlidersHorizontal,
    Sparkles,
} from "lucide-react";

import type { TuitionItem } from "./BrowseTuitionsClient";
import TuitionCard from "./TuitionCard";
import { cn } from "@/lib/utils";

interface Props {
    tuitions: TuitionItem[];
    total: number;
    loading: boolean;
    error: string | null;

    searchInput: string;
    subject: string;
    classLevel: string;
    mode: string;

    subjects: string[];
    levels: string[];
    modes: string[];

    onSearchInput: (value: string) => void;
    onSearch: (event: FormEvent<HTMLFormElement>) => void;
    onSubjectChange: (value: string) => void;
    onLevelChange: (value: string) => void;
    onModeChange: (value: string) => void;
    onReset: () => void;
}

const selectStyle =
    "h-9 w-full rounded-lg border border-teal-200/80 bg-white px-2.5 text-xs font-semibold text-slate-700 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/15 dark:border-white/10 dark:bg-[#071117] dark:text-slate-200 dark:focus:border-teal-400";

const desktopSelectStyle =
    "h-10 w-full rounded-xl border border-teal-200/80 bg-white px-3 text-sm font-medium text-slate-700 outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 dark:border-white/10 dark:bg-[#071117] dark:text-slate-200 dark:focus:border-teal-400 dark:focus:ring-teal-400/15";

export default function BrowseTuitionsView({
    tuitions,
    total,
    loading,
    error,
    searchInput,
    subject,
    classLevel,
    mode,
    subjects,
    levels,
    modes,
    onSearchInput,
    onSearch,
    onSubjectChange,
    onLevelChange,
    onModeChange,
    onReset,
}: Props) {
    const [openMobileFilters, setOpenMobileFilters] = useState(false);

    const activeCount = [subject, classLevel, mode].filter(
        (v) => v && v !== "all"
    ).length;

    return (
        <div className="space-y-5">
            {/* Search & Filters */}
            <section className="mx-auto w-full max-w-5xl rounded-[24px] border border-teal-200/80 bg-white p-3.5 shadow-[0_18px_40px_-28px_rgba(4,120,112,0.5)] sm:mt-2 sm:p-5 md:mt-4 dark:border-white/10 dark:bg-[#071117]">
                {/* Search Row + Compact Filters Toggle */}
                <div className="flex items-center gap-2">
                    <form onSubmit={onSearch} className="flex min-w-0 flex-1 items-center gap-2">
                        <div className="relative min-w-0 flex-1">
                            <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-teal-600/80 dark:text-teal-300" />
                            <input
                                type="text"
                                value={searchInput}
                                onChange={(e) => onSearchInput(e.target.value)}
                                placeholder="Search by title, subject, area or tutor..."
                                className="h-10 w-full rounded-xl border border-teal-200/80 bg-teal-50/35 pr-3 pl-9 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-500/10 sm:h-11 sm:pl-10 dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:placeholder:text-slate-400 dark:focus:border-teal-400"
                            />
                        </div>

                        <button
                            type="submit"
                            className="inline-flex h-10 shrink-0 items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-teal-600 via-teal-500 to-cyan-600 px-3.5 text-xs font-bold text-white shadow-sm transition hover:from-teal-500 hover:to-cyan-500 sm:h-11 sm:px-5 sm:text-sm dark:from-teal-400 dark:to-cyan-400 dark:text-slate-950 cursor-pointer"
                        >
                            <Search className="size-4" />
                            <span className="hidden min-[420px]:inline">Search</span>
                        </button>
                    </form>

                    {/* Mobile Compact Filter Button */}
                    <button
                        type="button"
                        onClick={() => setOpenMobileFilters((prev) => !prev)}
                        aria-expanded={openMobileFilters}
                        className={cn(
                            "inline-flex h-10 shrink-0 items-center gap-1.5 rounded-xl border px-3 text-xs font-bold transition sm:h-11 sm:px-3.5 sm:text-sm lg:hidden cursor-pointer",
                            openMobileFilters || activeCount > 0
                                ? "border-teal-500 bg-teal-50 text-teal-800 dark:border-teal-400/50 dark:bg-teal-400/15 dark:text-teal-200"
                                : "border-teal-200/80 bg-white text-slate-700 hover:bg-teal-50/60 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-200"
                        )}
                    >
                        <SlidersHorizontal className="size-3.5 text-teal-600 sm:size-4 dark:text-teal-300" />
                        <span>Filters</span>
                        {activeCount > 0 && (
                            <span className="grid size-4 place-items-center rounded-full bg-teal-600 text-[10px] font-extrabold text-white dark:bg-teal-400 dark:text-slate-950">
                                {activeCount}
                            </span>
                        )}
                        <ChevronDown
                            className={cn(
                                "size-3.5 text-slate-400 transition-transform duration-200",
                                openMobileFilters && "rotate-180 text-teal-600 dark:text-teal-300"
                            )}
                        />
                    </button>
                </div>

                {/* হিন্ট: মোবাইলে বাটনে চাপলে ঠিক নিচেই স্লিম ইনলাইন ফিল্টার স্ট্রিপ খুলবে (ফুল-স্ক্রিন নয়)। */}
                {openMobileFilters && (
                    <div className="mt-3 grid grid-cols-1 gap-2 border-t border-teal-200/60 pt-3 min-[480px]:grid-cols-3 lg:hidden dark:border-white/10">
                        <select
                            aria-label="Subject"
                            value={subject}
                            onChange={(e) => onSubjectChange(e.target.value)}
                            className={selectStyle}
                        >
                            <option value="all">All Subjects</option>
                            {subjects.map((item) => (
                                <option key={item} value={item}>
                                    {item}
                                </option>
                            ))}
                        </select>

                        <select
                            aria-label="Class Level"
                            value={classLevel}
                            onChange={(e) => onLevelChange(e.target.value)}
                            className={selectStyle}
                        >
                            <option value="all">All Levels</option>
                            {levels.map((item) => (
                                <option key={item} value={item}>
                                    {item}
                                </option>
                            ))}
                        </select>

                        <select
                            aria-label="Teaching Mode"
                            value={mode}
                            onChange={(e) => onModeChange(e.target.value)}
                            className={selectStyle}
                        >
                            <option value="all">All Modes</option>
                            {modes.map((item) => (
                                <option key={item} value={item}>
                                    {item}
                                </option>
                            ))}
                        </select>

                        {activeCount > 0 && (
                            <div className="flex justify-end min-[480px]:col-span-3">
                                <button
                                    type="button"
                                    onClick={onReset}
                                    className="inline-flex h-7 items-center gap-1 rounded-lg px-2 text-[11px] font-bold text-teal-700 hover:bg-teal-50 dark:text-teal-300 dark:hover:bg-white/10 cursor-pointer"
                                >
                                    <RotateCcw className="size-3" />
                                    Reset
                                </button>
                            </div>
                        )}
                    </div>
                )}

                {/* Desktop Filter Row */}
                <div className="mt-4 hidden grid-cols-4 gap-3 border-t border-teal-200/60 pt-4 lg:grid dark:border-white/10">
                    <div>
                        <label className="mb-1.5 block text-xs font-semibold text-slate-500 dark:text-slate-400">
                            Subject
                        </label>
                        <select
                            value={subject}
                            onChange={(e) => onSubjectChange(e.target.value)}
                            className={desktopSelectStyle}
                        >
                            <option value="all">All Subjects</option>
                            {subjects.map((item) => (
                                <option key={item} value={item}>
                                    {item}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="mb-1.5 block text-xs font-semibold text-slate-500 dark:text-slate-400">
                            Class Level
                        </label>
                        <select
                            value={classLevel}
                            onChange={(e) => onLevelChange(e.target.value)}
                            className={desktopSelectStyle}
                        >
                            <option value="all">All Levels</option>
                            {levels.map((item) => (
                                <option key={item} value={item}>
                                    {item}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="mb-1.5 block text-xs font-semibold text-slate-500 dark:text-slate-400">
                            Teaching Mode
                        </label>
                        <select
                            value={mode}
                            onChange={(e) => onModeChange(e.target.value)}
                            className={desktopSelectStyle}
                        >
                            <option value="all">All Modes</option>
                            {modes.map((item) => (
                                <option key={item} value={item}>
                                    {item}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex items-end">
                        <button
                            type="button"
                            onClick={onReset}
                            className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-xl border border-teal-200/80 bg-teal-50/50 px-3 text-sm font-semibold text-slate-700 transition hover:border-teal-300 hover:bg-teal-100/70 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-200 dark:hover:bg-white/10 cursor-pointer"
                        >
                            <RotateCcw className="size-3.5" />
                            Reset Filters
                        </button>
                    </div>
                </div>
            </section>

            {/* Results Count */}
            <div className="flex flex-wrap items-center justify-between gap-2 px-1">
                <p className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-slate-400">
                    <Sparkles className="size-3.5 text-teal-600 dark:text-teal-300" />
                    Showing{" "}
                    <strong className="font-extrabold text-slate-900 dark:text-white">
                        {tuitions.length}
                    </strong>{" "}
                    of{" "}
                    <strong className="font-extrabold text-slate-900 dark:text-white">
                        {total}
                    </strong>{" "}
                    active tuitions
                </p>
            </div>

            {/* Loading / Error / Empty / Cards */}
            {loading ? (
                <div className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2 2xl:grid-cols-3">
                    {Array.from({ length: 6 }, (_, index) => (
                        <div
                            key={index}
                            className="overflow-hidden rounded-3xl border border-teal-200/70 bg-white dark:border-white/10 dark:bg-[#071117]"
                        >
                            <div className="h-52 animate-pulse bg-gradient-to-r from-teal-100/80 via-cyan-100/60 to-teal-100/80 dark:from-white/[0.04] dark:via-teal-400/[0.06] dark:to-white/[0.04] sm:h-60" />
                            <div className="space-y-3 p-4 sm:p-6">
                                <div className="h-4 w-1/3 animate-pulse rounded-full bg-teal-100 dark:bg-white/[0.06]" />
                                <div className="h-5 w-3/4 animate-pulse rounded-lg bg-slate-200/80 dark:bg-white/[0.06]" />
                                <div className="h-3 w-1/2 animate-pulse rounded bg-slate-200/70 dark:bg-white/[0.05]" />
                            </div>
                        </div>
                    ))}
                </div>
            ) : error ? (
                <EmptyState
                    icon={<BookOpen className="size-8 text-rose-500" />}
                    title="Could not load tuitions"
                    description={error}
                />
            ) : tuitions.length === 0 ? (
                <EmptyState
                    icon={<BookOpen className="size-8 text-teal-600 dark:text-cyan-400" />}
                    title="No tuitions found"
                    description="Try another keyword or reset your filters."
                    action={onReset}
                />
            ) : (
                <div className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
                    {tuitions.map((item) => (
                        <TuitionCard key={item._id} item={item} />
                    ))}
                </div>
            )}
        </div>
    );
}

function EmptyState({
    icon,
    title,
    description,
    action,
}: {
    icon: React.ReactNode;
    title: string;
    description: string;
    action?: () => void;
}) {
    return (
        <div className="flex min-h-[340px] flex-col items-center justify-center rounded-3xl border border-dashed border-teal-300/80 bg-white/90 p-7 text-center dark:border-white/15 dark:bg-[#071117]/80">
            <div className="flex size-16 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-500/15 to-cyan-500/15 text-teal-600 dark:text-cyan-300">
                {icon}
            </div>

            <h2 className="mt-5 text-lg font-extrabold text-slate-900 dark:text-white sm:text-xl">
                {title}
            </h2>

            <p className="mt-2 max-w-md text-sm leading-6 text-slate-500 dark:text-slate-400">
                {description}
            </p>

            {action && (
                <button
                    type="button"
                    onClick={action}
                    className="mt-5 inline-flex items-center gap-2 rounded-xl border border-teal-200/80 bg-teal-50/60 px-5 py-2.5 text-sm font-bold text-teal-800 transition hover:border-teal-300 hover:bg-teal-100/70 dark:border-white/10 dark:bg-white/[0.05] dark:text-teal-200 dark:hover:bg-white/10 cursor-pointer"
                >
                    <RotateCcw className="size-4" />
                    Reset Filters
                </button>
            )}
        </div>
    );
}