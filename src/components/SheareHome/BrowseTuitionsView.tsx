
"use client";

import type { FormEvent } from "react";
import Link from "next/link";
import {
    ArrowUpRight,
    BookOpen,
    Calendar,
    GraduationCap,
    MapPin,
    RotateCcw,
    Search,
} from "lucide-react";

import type { TuitionItem } from "./BrowseTuitionsClient";

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

const inputStyle =
    "h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-teal-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200 dark:focus:border-cyan-400";

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
    return (
        <div className="space-y-5">

            {/* Search & Filters */}
            <section className="mx-auto w-full max-w-5xl rounded-2xl border border-slate-200 bg-white sm:mt-2 md:mt-4 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-5">

                {/* Search */}
                <form
                    onSubmit={onSearch}
                    className="flex flex-col gap-2.5 sm:flex-row sm:items-center"
                >
                    <div className="relative flex-1">
                        <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400" />

                        <input
                            type="text"
                            value={searchInput}
                            onChange={(event) => onSearchInput(event.target.value)}
                            placeholder="Search by title, subject, area or tutor..."
                            className={`${inputStyle} pl-10`}
                        />
                    </div>

                    <button
                        type="submit"
                        className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-teal-700 px-5 text-sm font-semibold text-white transition hover:bg-teal-800 dark:bg-cyan-400 dark:text-slate-950 dark:hover:bg-cyan-300"
                    >
                        <Search className="size-4" />
                        Search
                    </button>
                </form>

                {/* Filters */}
                <div className="mt-4 grid grid-cols-1 gap-3 border-t border-slate-200 pt-4 dark:border-slate-800 sm:grid-cols-2 lg:grid-cols-4">

                    {/* Subject */}
                    <div>
                        <label className="mb-1.5 block text-xs font-semibold text-slate-500 dark:text-slate-400">
                            Subject
                        </label>

                        <select
                            value={subject}
                            onChange={(e) => onSubjectChange(e.target.value)}
                            className={inputStyle}
                        >
                            <option value="all">All Subjects</option>
                            {subjects.map((item) => (
                                <option key={item} value={item}>
                                    {item}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Class */}
                    <div>
                        <label className="mb-1.5 block text-xs font-semibold text-slate-500 dark:text-slate-400">
                            Class Level
                        </label>

                        <select
                            value={classLevel}
                            onChange={(e) => onLevelChange(e.target.value)}
                            className={inputStyle}
                        >
                            <option value="all">All Levels</option>
                            {levels.map((item) => (
                                <option key={item} value={item}>
                                    {item}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Mode */}
                    <div>
                        <label className="mb-1.5 block text-xs font-semibold text-slate-500 dark:text-slate-400">
                            Teaching Mode
                        </label>

                        <select
                            value={mode}
                            onChange={(e) => onModeChange(e.target.value)}
                            className={inputStyle}
                        >
                            <option value="all">All Modes</option>
                            {modes.map((item) => (
                                <option key={item} value={item}>
                                    {item}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Reset */}
                    <div className="flex items-end">
                        <button
                            type="button"
                            onClick={onReset}
                            className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300 dark:hover:bg-slate-800"
                        >
                            <RotateCcw className="size-3.5" />
                            Reset Filters
                        </button>
                    </div>
                </div>
            </section>

            {/* Results Count */}
            <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-xs text-slate-500 dark:text-slate-400">
                    Showing{" "}
                    <strong className="text-slate-900 dark:text-white">
                        {tuitions.length}
                    </strong>
                    {" "}of{" "}
                    <strong className="text-slate-900 dark:text-white">
                        {total}
                    </strong>
                    {" "}active tuitions
                </p>
            </div>

            {/* Loading */}
            {loading ? (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 2xl:grid-cols-3">
                    {Array.from({ length: 6 }, (_, index) => (
                        <div
                            key={index}
                            className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900"
                        >
                            <div className="h-48 animate-pulse bg-slate-200 dark:bg-slate-800 sm:h-52" />

                            <div className="space-y-3 p-5 sm:p-6">
                                <div className="h-4 w-1/3 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                                <div className="h-5 w-3/4 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                                <div className="h-3 w-1/2 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                            </div>
                        </div>
                    ))}
                </div>
            ) : error ? (
                /* Error */
                <EmptyState
                    icon={<BookOpen className="size-8 text-rose-500" />}
                    title="Could not load tuitions"
                    description={error}
                />
            ) : tuitions.length === 0 ? (
                /* Empty */
                <EmptyState
                    icon={<BookOpen className="size-8 text-teal-600 dark:text-cyan-400" />}
                    title="No tuitions found"
                    description="Try another keyword or reset your filters."
                    action={onReset}
                />
            ) : (
                /* Tuition Cards — unchanged */
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 2xl:grid-cols-3">
                    {tuitions.map((item) => (
                        <TuitionCard key={item._id} item={item} />
                    ))}
                </div>
            )}
        </div>
    );
}

// Tuition Card
function TuitionCard({ item }: { item: TuitionItem }) {
    const image = item.coverImageURL || item.logoImageURL;

    return (
        <article className="group flex min-w-0 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-teal-300 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900 dark:hover:border-cyan-400/40">

            {/* Image */}
            <div className="relative h-48 overflow-hidden bg-slate-100 sm:h-52">
                {image ? (
                    <img
                        src={image}
                        alt={item.title || "Tuition cover"}
                        className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                        onError={(e) => {
                            e.currentTarget.style.display = "none";
                        }}
                    />
                ) : (
                    <div className="flex size-full items-center justify-center bg-gradient-to-br from-teal-500/10 to-cyan-500/10 text-teal-600 dark:text-cyan-400">
                        <BookOpen className="size-11" />
                    </div>
                )}

                {/* Delivery Mode */}
                <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/65 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm">
                    {item.deliveryMode || "Online"}
                </span>
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col p-5 sm:p-6">

                {/* Subject & Class */}
                <div className="flex items-center justify-between gap-3">
                    <span className="max-w-[60%] truncate rounded-lg bg-teal-50 px-3 py-1.5 text-xs font-semibold text-teal-700 dark:bg-cyan-400/10 dark:text-cyan-300 sm:text-sm">
                        {item.subject || "General"}
                    </span>

                    <span className="truncate text-sm text-slate-500 dark:text-slate-400">
                        {item.classLevel || "All Levels"}
                    </span>
                </div>

                {/* Title */}
                <h2 className="mt-4 line-clamp-2 min-h-14 text-lg font-bold leading-7 text-slate-900 transition-colors group-hover:text-teal-700 dark:text-white dark:group-hover:text-cyan-300 sm:text-xl">
                    {item.title || "Untitled Tuition"}
                </h2>

                {/* Details */}
                <div className="mt-4 space-y-3 text-sm text-slate-500 dark:text-slate-400">

                    {/* Location */}
                    <p className="flex items-center gap-2.5">
                        <MapPin className="size-4 shrink-0 text-teal-600 dark:text-cyan-400" />
                        <span className="truncate">
                            {item.location || "Online / Nationwide"}
                        </span>
                    </p>

                    {/* Class Level */}
                    <p className="flex items-center gap-2.5">
                        <GraduationCap className="size-4 shrink-0 text-teal-600 dark:text-cyan-400" />
                        <span className="truncate">
                            {item.classLevel || "All Levels"}
                        </span>
                    </p>

                    {/* Weekly Classes */}
                    {item.weeklyClasses && (
                        <p className="flex items-center gap-2.5">
                            <Calendar className="size-4 shrink-0 text-teal-600 dark:text-cyan-400" />
                            <span className="truncate">
                                {item.weeklyClasses}
                            </span>
                        </p>
                    )}
                </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between gap-3 border-t border-slate-200 bg-slate-50/70 px-5 py-4 dark:border-slate-800 dark:bg-slate-950/40 sm:px-6">

                {/* Fee */}
                <div className="min-w-0">
                    <span className="text-lg font-extrabold text-slate-900 dark:text-white sm:text-xl">
                        ৳{Number(item.monthlyFee || 0).toLocaleString()}
                    </span>

                    <span className="ml-1 text-xs text-slate-400">
                        / month
                    </span>
                </div>

                {/* Details Button */}
                <Link
                    href={`/view/${item._id}`}
                    className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-teal-700 px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-teal-800 hover:shadow-md dark:bg-cyan-400 dark:text-slate-950 dark:hover:bg-cyan-300"
                >
                    Details
                    <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
            </div>
        </article>
    );
}

// Empty and error state
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
        <div className="flex min-h-[360px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center dark:border-slate-800 dark:bg-slate-900">

            <div className="flex size-16 items-center justify-center rounded-2xl bg-teal-50 text-teal-600 dark:bg-cyan-400/10 dark:text-cyan-400">
                {icon}
            </div>

            <h2 className="mt-5 text-lg font-bold text-slate-900 dark:text-white sm:text-xl">
                {title}
            </h2>

            <p className="mt-2 max-w-md text-sm leading-6 text-slate-500 dark:text-slate-400 sm:text-base">
                {description}
            </p>

            {action && (
                <button
                    type="button"
                    onClick={action}
                    className="mt-5 inline-flex items-center gap-2 rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-teal-300 hover:bg-teal-50 hover:text-teal-700 dark:border-slate-800 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                    <RotateCcw className="size-4" />
                    Reset Filters
                </button>
            )}
        </div>
    );
}