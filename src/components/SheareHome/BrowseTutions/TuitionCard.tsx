"use client";

import Link from "next/link";
import {
    ArrowUpRight,
    BookOpen,
    Calendar,
    GraduationCap,
    MapPin,
} from "lucide-react";

import type { TuitionItem } from "./BrowseTuitionsClient";
import { cn } from "@/lib/utils";

interface TuitionCardProps {
    item: TuitionItem;
}

// হিন্ট: আলাদা TuitionCard কম্পোনেন্ট — item প্রপস দিয়ে যেকোনো লিস্ট বা গ্রিডে ব্যবহারযোগ্য।
export default function TuitionCard({ item }: TuitionCardProps) {
    const image = item.coverImageURL || item.logoImageURL;
    const isOnline = String(item.deliveryMode || "")
        .toLowerCase()
        .includes("online");

    return (
        <article className="group relative flex min-w-0 flex-col overflow-hidden rounded-[26px] border border-teal-200/80 bg-white shadow-[0_14px_34px_-24px_rgba(13,148,136,0.45)] transition-all duration-300 hover:-translate-y-1.5 hover:border-teal-400/80 hover:shadow-[0_24px_48px_-22px_rgba(8,145,178,0.45)] dark:border-white/10 dark:bg-[#071117] dark:hover:border-teal-400/45 dark:hover:shadow-[0_24px_50px_-22px_rgba(45,212,191,0.22)]">
            {/* Top accent bar */}
            <div className="h-1 w-full bg-gradient-to-r from-teal-500 via-cyan-500 to-emerald-500 opacity-85 transition-opacity duration-300 group-hover:opacity-100 dark:from-teal-400 dark:via-cyan-300 dark:to-emerald-300" />

            {/* Image Header */}
            <div className="relative h-52 overflow-hidden bg-gradient-to-br from-teal-500/15 via-cyan-500/10 to-emerald-500/15 sm:h-60 dark:from-teal-400/15 dark:via-cyan-400/10 dark:to-emerald-400/10">
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
                    <div className="flex size-full items-center justify-center text-teal-600 dark:text-cyan-300">
                        <div className="grid size-14 place-items-center rounded-2xl bg-white/80 shadow-sm ring-1 ring-teal-500/20 dark:bg-white/[0.06] dark:ring-teal-300/20">
                            <BookOpen className="size-7" />
                        </div>
                    </div>
                )}

                {/* Subtle bottom gradient overlay for depth */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/55 via-transparent to-transparent" />

                {/* Delivery Mode Pill */}
                <span
                    className={cn(
                        "absolute left-3.5 top-3.5 inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-extrabold tracking-wide backdrop-blur-md",
                        isOnline
                            ? "border-cyan-200/50 bg-cyan-950/75 text-cyan-200"
                            : "border-emerald-200/50 bg-emerald-950/75 text-emerald-200"
                    )}
                >
                    <span
                        className={cn(
                            "size-1.5 rounded-full",
                            isOnline ? "bg-cyan-400" : "bg-emerald-400"
                        )}
                    />
                    {item.deliveryMode || "Online"}
                </span>

                {/* Class pill on bottom-right of image */}
                <span className="absolute right-3.5 bottom-3 rounded-xl border border-white/20 bg-slate-950/65 px-2.5 py-1 text-[11px] font-bold text-white backdrop-blur-md">
                    {item.classLevel || "All Levels"}
                </span>
            </div>

            {/* Card Body */}
            <div className="flex flex-1 flex-col p-4 sm:p-6">
                {/* Subject Chip */}
                <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex max-w-full items-center truncate rounded-xl border border-teal-500/20 bg-gradient-to-r from-teal-500/12 to-cyan-500/12 px-3 py-1 text-xs font-extrabold text-teal-800 dark:border-teal-400/25 dark:from-teal-400/15 dark:to-cyan-400/10 dark:text-teal-200">
                        {item.subject || "General"}
                    </span>
                </div>

                {/* Title */}
                <h2 className="mt-3 line-clamp-2 min-h-12 text-base font-extrabold leading-snug text-slate-900 transition-colors group-hover:text-teal-700 sm:min-h-14 sm:text-xl dark:text-white dark:group-hover:text-teal-300">
                    {item.title || "Untitled Tuition"}
                </h2>

                {/* Details */}
                <div className="mt-3.5 space-y-2.5 text-xs font-medium text-slate-600 sm:mt-4 sm:text-sm dark:text-slate-400">
                    <p className="flex items-center gap-2.5">
                        <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-teal-500/10 text-teal-700 dark:bg-teal-400/10 dark:text-teal-300">
                            <MapPin className="size-3.5" />
                        </span>
                        <span className="truncate">
                            {item.location || "Online / Nationwide"}
                        </span>
                    </p>

                    <p className="flex items-center gap-2.5">
                        <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-cyan-500/10 text-cyan-700 dark:bg-cyan-400/10 dark:text-cyan-300">
                            <GraduationCap className="size-3.5" />
                        </span>
                        <span className="truncate">
                            {item.classLevel || "All Levels"}
                        </span>
                    </p>

                    {item.weeklyClasses && (
                        <p className="flex items-center gap-2.5">
                            <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-emerald-500/10 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-300">
                                <Calendar className="size-3.5" />
                            </span>
                            <span className="truncate">
                                {item.weeklyClasses}
                            </span>
                        </p>
                    )}
                </div>
            </div>

            {/* Card Footer */}
            <div className="flex items-center justify-between gap-3 border-t border-teal-200/60 bg-gradient-to-r from-teal-50/70 via-white to-cyan-50/60 px-4 py-3.5 sm:px-6 sm:py-4 dark:border-white/10 dark:from-teal-400/[0.05] dark:via-[#071117] dark:to-cyan-400/[0.05]">
                <div className="min-w-0">
                    <span className="bg-gradient-to-r from-teal-700 to-cyan-700 bg-clip-text text-lg font-black text-transparent sm:text-xl dark:from-teal-300 dark:to-cyan-300">
                        ৳{Number(item.monthlyFee || 0).toLocaleString()}
                    </span>
                    <span className="ml-1 text-xs font-semibold text-slate-500 dark:text-slate-400">
                        / month
                    </span>
                </div>

                <Link
                    href={`/view/${item._id}`}
                    className="inline-flex shrink-0 items-center gap-1.5 rounded-xl bg-gradient-to-r from-teal-600 to-cyan-600 px-3.5 py-2 text-xs font-bold text-white shadow-sm shadow-teal-600/20 transition-all hover:from-teal-500 hover:to-cyan-500 hover:shadow-md sm:px-4 sm:py-2.5 sm:text-sm dark:from-teal-400 dark:to-cyan-400 dark:text-slate-950"
                >
                    <span>Details</span>
                    <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
            </div>
        </article>
    );
}