"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
    BookOpen,
    Calendar,
    CheckCircle2,
    Clock,
    Eye,
    GraduationCap,
    MapPin,
    Pencil,
    Plus,
    Power,
    Sparkles,
    Trash2,
    XCircle,
} from "lucide-react";
import DeleteTuitionDialog from "./Tutions/DeleteTuitionDialog";
import EditTuitionDialog from "./Tutions/EditTuitionDialog";

export interface TuitionItem {
    _id: string;
    title: string;
    subject?: string;
    classLevel?: string;
    deliveryMode?: string;
    location?: string;
    monthlyFee?: number;
    weeklyClasses?: string;
    classDuration?: string;
    courseDuration?: string;
    applyDeadline?: string;
    about?: string;
    coverImageURL?: string;
    logoImageURL?: string;
    status?: "active" | "closed" | string;
    verificationStatus?: "pending" | "verified" | "rejected" | string;
}

interface MyTuitionsListProps {
    initialTuitions: TuitionItem[];
}

export default function MyTuitionsList({ initialTuitions }: MyTuitionsListProps) {
    const [tuitions, setTuitions] = useState<TuitionItem[]>(initialTuitions || []);
    const [busyId, setBusyId] = useState<string | null>(null);

    const [editOpen, setEditOpen] = useState(false);
    const [selectedTuition, setSelectedTuition] = useState<TuitionItem | null>(null);

    const [deleteOpen, setDeleteOpen] = useState(false);
    const [deleteId, setDeleteId] = useState<string | null>(null);

    const backendUrl =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

    const totalCount = tuitions.length;
    const activeCount = tuitions.filter((t) => t.status === "active").length;
    const verifiedCount = tuitions.filter(
        (t) => t.verificationStatus === "verified"
    ).length;

    // শুধু Active / Closed স্ট্যাটাসের জন্য fetch
    const handleStatusToggle = async (item: TuitionItem) => {
        const nextStatus = item.status === "active" ? "closed" : "active";

        try {
            setBusyId(item._id);
            const res = await fetch(`${backendUrl}/TuitionsStutus/${item._id}/status`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: nextStatus }),
            });

            if (res.ok) {
                setTuitions((prev) =>
                    prev.map((row) =>
                        row._id === item._id ? { ...row, status: nextStatus } : row
                    )
                );
            }
        } catch (error) {
            console.error("Status update failed:", error);
        } finally {
            setBusyId(null);
        }
    };

    const renderBadge = (vStatus?: string) => {
        const status = (vStatus || "pending").toLowerCase();

        if (status === "verified" || status === "approved") {
            return (
                <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 dark:border-emerald-400/30 dark:bg-emerald-400/10 dark:text-emerald-300">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    <span>Verified</span>
                </span>
            );
        }

        if (status === "rejected") {
            return (
                <span className="inline-flex items-center gap-1 rounded-full border border-rose-500/30 bg-rose-500/10 px-2.5 py-0.5 text-xs font-semibold text-rose-700 dark:border-rose-400/30 dark:bg-rose-400/10 dark:text-rose-300">
                    <XCircle className="h-3.5 w-3.5" />
                    <span>Rejected</span>
                </span>
            );
        }

        return (
            <span className="inline-flex items-center gap-1 rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-0.5 text-xs font-semibold text-amber-700 dark:border-amber-400/30 dark:bg-amber-400/10 dark:text-amber-300">
                <Clock className="h-3.5 w-3.5" />
                <span>Pending</span>
            </span>
        );
    };

    return (
        <div className="mx-auto max-w-6xl space-y-6 text-slate-900 dark:text-slate-100">
            {/* Top Banner */}
            <div className="rounded-2xl border border-teal-600/20 bg-gradient-to-r from-teal-500/10 via-cyan-500/10 to-transparent p-5 dark:border-cyan-400/25 dark:from-cyan-500/15 dark:via-teal-500/10 dark:to-slate-900">
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-teal-600/25 bg-white/80 px-3 py-1 text-xs font-semibold text-teal-800 dark:border-cyan-400/30 dark:bg-slate-950/70 dark:text-cyan-300">
                            <Sparkles className="h-3.5 w-3.5" />
                            <span>Teacher Studio</span>
                        </span>
                        <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                            My Tuitions
                        </h1>
                        <p className="text-sm text-slate-600 dark:text-slate-300">
                            Manage your published tuitions, toggle active/closed status, edit, or delete.
                        </p>
                    </div>

                    <Link
                        href="/dashboard/teachers/post"
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-teal-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-800 dark:bg-cyan-400 dark:text-slate-950 dark:hover:bg-cyan-300"
                    >
                        <Plus className="h-4 w-4" />
                        <span>Post New Tuition</span>
                    </Link>
                </div>

                <div className="mt-4 grid grid-cols-3 gap-3 border-t border-slate-200/70 pt-3.5 text-xs dark:border-slate-800/80 sm:max-w-md">
                    <div className="rounded-xl border border-slate-200/70 bg-white/80 px-3 py-2 dark:border-slate-800 dark:bg-slate-950/60">
                        <span className="text-slate-500 dark:text-slate-400">Total</span>
                        <p className="mt-0.5 text-base font-extrabold text-slate-900 dark:text-white">
                            {totalCount}
                        </p>
                    </div>
                    <div className="rounded-xl border border-slate-200/70 bg-white/80 px-3 py-2 dark:border-slate-800 dark:bg-slate-950/60">
                        <span className="text-slate-500 dark:text-slate-400">Active</span>
                        <p className="mt-0.5 text-base font-extrabold text-teal-700 dark:text-cyan-400">
                            {activeCount}
                        </p>
                    </div>
                    <div className="rounded-xl border border-slate-200/70 bg-white/80 px-3 py-2 dark:border-slate-800 dark:bg-slate-950/60">
                        <span className="text-slate-500 dark:text-slate-400">Verified</span>
                        <p className="mt-0.5 text-base font-extrabold text-emerald-700 dark:text-emerald-400">
                            {verifiedCount}
                        </p>
                    </div>
                </div>
            </div>

            {/* Empty State */}
            {tuitions.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-slate-300 bg-white/90 p-10 text-center dark:border-slate-800 dark:bg-slate-900/60">
                    <BookOpen className="mx-auto h-9 w-9 text-teal-700 dark:text-cyan-400" />
                    <h2 className="mt-3 text-base font-bold text-slate-900 dark:text-white">
                        No tuitions posted yet
                    </h2>
                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                        Click &ldquo;Post New Tuition&rdquo; above to create your first tuition listing.
                    </p>
                </div>
            ) : (
                <>
                <div className="hidden overflow-hidden rounded-2xl border border-slate-200/90 bg-white/95 shadow-xs dark:border-slate-800/90 dark:bg-slate-900/75 dark:shadow-[0_0_30px_rgba(6,182,212,0.06)] lg:block">
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse text-left">
                            <thead>
                                <tr className="border-b border-slate-200/90 bg-slate-50/90 text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:border-slate-800 dark:bg-slate-950/70 dark:text-slate-400">
                                    <th className="px-5 py-3.5">Tuition</th>
                                    <th className="px-4 py-3.5">Subject & Level</th>
                                    <th className="px-4 py-3.5">Monthly Fee</th>
                                    <th className="px-4 py-3.5">Approval</th>
                                    <th className="px-4 py-3.5">Status</th>
                                    <th className="px-5 py-3.5 text-right">Actions</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-slate-200/70 text-sm dark:divide-slate-800/80">
                                {tuitions.map((item) => {
                                    const isActive = item.status === "active";
                                    const isBusy = busyId === item._id;
                                    const thumbSrc = item.logoImageURL || item.coverImageURL;

                                    return (
                                        <tr
                                            key={item._id}
                                            className="transition-colors hover:bg-teal-500/5 dark:hover:bg-cyan-400/5"
                                        >
                                            <td className="px-5 py-4">
                                                <div className="flex items-center gap-3.5">
                                                    <div className="h-12 w-12 shrink-0 overflow-hidden rounded-xl border border-slate-200 bg-slate-100 dark:border-slate-800 dark:bg-slate-950">
                                                        {thumbSrc ? (
                                                            <img
                                                                src={thumbSrc}
                                                                alt={item.title}
                                                                className="h-full w-full object-cover"
                                                            />
                                                        ) : (
                                                            <div className="flex h-full w-full items-center justify-center bg-teal-600/10 text-teal-800 dark:bg-cyan-400/10 dark:text-cyan-300">
                                                                <BookOpen className="h-5 w-5" />
                                                            </div>
                                                        )}
                                                    </div>

                                                    <div className="min-w-0">
                                                        <p className="truncate font-bold text-slate-900 dark:text-white">
                                                            {item.title}
                                                        </p>
                                                        <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                                                            <span className="inline-flex items-center gap-1">
                                                                <MapPin className="h-3.5 w-3.5 text-teal-700 dark:text-cyan-400" />
                                                                <span>
                                                                    {item.location || item.deliveryMode || "Online"}
                                                                </span>
                                                            </span>
                                                            {item.weeklyClasses && (
                                                                <span className="inline-flex items-center gap-1">
                                                                    <Calendar className="h-3.5 w-3.5 text-teal-700 dark:text-cyan-400" />
                                                                    <span>{item.weeklyClasses}</span>
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>

                                            <td className="px-4 py-4">
                                                <div className="space-y-1">
                                                    <span className="inline-block rounded-md bg-teal-600/10 px-2.5 py-0.5 text-xs font-semibold text-teal-800 dark:bg-cyan-400/10 dark:text-cyan-300">
                                                        {item.subject || "General"}
                                                    </span>
                                                    <p className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                                                        <GraduationCap className="h-3.5 w-3.5" />
                                                        <span>{item.classLevel || "All Levels"}</span>
                                                    </p>
                                                </div>
                                            </td>

                                            <td className="px-4 py-4 font-extrabold text-slate-900 dark:text-white">
                                                ৳{Number(item.monthlyFee || 0).toLocaleString()}
                                                <span className="block text-[11px] font-normal text-slate-400">
                                                    / month
                                                </span>
                                            </td>

                                            <td className="px-4 py-4">
                                                {renderBadge(item.verificationStatus)}
                                            </td>

                                            <td className="px-4 py-4">
                                                <button
                                                    type="button"
                                                    disabled={isBusy}
                                                    onClick={() => handleStatusToggle(item)}
                                                    className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold transition disabled:opacity-50 ${isActive
                                                            ? "border-teal-600/30 bg-teal-500/10 text-teal-800 hover:bg-teal-500/20 dark:border-cyan-400/35 dark:bg-cyan-400/10 dark:text-cyan-300 dark:hover:bg-cyan-400/20"
                                                            : "border-slate-300 bg-slate-100 text-slate-700 hover:bg-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                                                        }`}
                                                >
                                                    <Power className="h-3 w-3" />
                                                    <span>{isActive ? "Active" : "Closed"}</span>
                                                </button>
                                            </td>

                                            <td className="px-5 py-4">
                                                <div className="flex items-center justify-end gap-1.5">
                                                    <Link
                                                        href={`/view/${item._id}`}
                                                        title="View"
                                                        className="rounded-lg border border-slate-200 p-2 text-slate-600 transition hover:border-teal-600 hover:text-teal-700 dark:border-slate-800 dark:text-slate-300 dark:hover:border-cyan-400 dark:hover:text-cyan-300"
                                                    >
                                                        <Eye className="h-4 w-4" />
                                                    </Link>

                                                    <button
                                                        type="button"
                                                        title="Edit"
                                                        onClick={() => {
                                                            setSelectedTuition(item);
                                                            setEditOpen(true);
                                                        }}
                                                        className="rounded-lg border border-slate-200 p-2 text-slate-600 transition hover:border-teal-600 hover:text-teal-700 dark:border-slate-800 dark:text-slate-300 dark:hover:border-cyan-400 dark:hover:text-cyan-300"
                                                    >
                                                        <Pencil className="h-4 w-4" />
                                                    </button>

                                                    <button
                                                        type="button"
                                                        title="Delete"
                                                        onClick={() => {
                                                            setDeleteId(item._id);
                                                            setDeleteOpen(true);
                                                        }}
                                                        className="rounded-lg border border-slate-200 p-2 text-slate-600 transition hover:border-rose-500 hover:text-rose-600 dark:border-slate-800 dark:text-slate-300 dark:hover:border-rose-400 dark:hover:text-rose-400"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Mobile / tablet card view (table only shows from lg) */}
                <div className="space-y-3 lg:hidden">
                    {tuitions.map((item) => {
                        const isActive = item.status === "active";
                        const isBusy = busyId === item._id;
                        const thumbSrc = item.logoImageURL || item.coverImageURL;

                        return (
                            <article
                                key={item._id}
                                className="rounded-2xl border border-slate-200/90 bg-white/95 p-4 shadow-xs transition-colors dark:border-slate-800/90 dark:bg-slate-900/75"
                            >
                                <div className="flex items-start gap-3">
                                    <div className="h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-slate-200 bg-slate-100 dark:border-slate-800 dark:bg-slate-950">
                                        {thumbSrc ? (
                                            <img
                                                src={thumbSrc}
                                                alt={item.title}
                                                className="h-full w-full object-cover"
                                            />
                                        ) : (
                                            <div className="flex h-full w-full items-center justify-center bg-teal-600/10 text-teal-800 dark:bg-cyan-400/10 dark:text-cyan-300">
                                                <BookOpen className="h-5 w-5" />
                                            </div>
                                        )}
                                    </div>

                                    <div className="min-w-0 flex-1">
                                        <p className="line-clamp-2 text-sm font-bold text-slate-900 dark:text-white">
                                            {item.title}
                                        </p>
                                        <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-slate-500 dark:text-slate-400">
                                            <span className="inline-flex min-w-0 items-center gap-1">
                                                <MapPin className="h-3.5 w-3.5 shrink-0 text-teal-700 dark:text-cyan-400" />
                                                <span className="truncate">
                                                    {item.location || item.deliveryMode || "Online"}
                                                </span>
                                            </span>
                                            {item.weeklyClasses && (
                                                <span className="inline-flex items-center gap-1">
                                                    <Calendar className="h-3.5 w-3.5 shrink-0 text-teal-700 dark:text-cyan-400" />
                                                    <span>{item.weeklyClasses}</span>
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-3 flex flex-wrap items-center gap-2">
                                    <span className="rounded-md bg-teal-600/10 px-2.5 py-0.5 text-[11px] font-semibold text-teal-800 dark:bg-cyan-400/10 dark:text-cyan-300">
                                        {item.subject || "General"}
                                    </span>
                                    <span className="inline-flex items-center gap-1 text-[11px] text-slate-500 dark:text-slate-400">
                                        <GraduationCap className="h-3.5 w-3.5" />
                                        <span>{item.classLevel || "All Levels"}</span>
                                    </span>
                                    <span className="ml-auto text-sm font-extrabold text-slate-900 dark:text-white">
                                        ৳{Number(item.monthlyFee || 0).toLocaleString()}
                                        <span className="ml-0.5 text-[10px] font-normal text-slate-400">
                                            /mo
                                        </span>
                                    </span>
                                </div>

                                <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-slate-200/70 pt-3 dark:border-slate-800/80">
                                    <div className="flex flex-wrap items-center gap-1.5">
                                        {renderBadge(item.verificationStatus)}

                                        <button
                                            type="button"
                                            disabled={isBusy}
                                            onClick={() => handleStatusToggle(item)}
                                            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold transition disabled:opacity-50 ${
                                                isActive
                                                    ? "border-teal-600/30 bg-teal-500/10 text-teal-800 hover:bg-teal-500/20 dark:border-cyan-400/35 dark:bg-cyan-400/10 dark:text-cyan-300 dark:hover:bg-cyan-400/20"
                                                    : "border-slate-300 bg-slate-100 text-slate-700 hover:bg-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                                            }`}
                                        >
                                            <Power className="h-3 w-3" />
                                            <span>{isActive ? "Active" : "Closed"}</span>
                                        </button>
                                    </div>

                                    <div className="flex items-center gap-1.5">
                                        <Link
                                            href={`/view/${item._id}`}
                                            title="View"
                                            className="rounded-lg border border-slate-200 p-2 text-slate-600 transition hover:border-teal-600 hover:text-teal-700 dark:border-slate-800 dark:text-slate-300 dark:hover:border-cyan-400 dark:hover:text-cyan-300"
                                        >
                                            <Eye className="h-4 w-4" />
                                        </Link>

                                        <button
                                            type="button"
                                            title="Edit"
                                            onClick={() => {
                                                setSelectedTuition(item);
                                                setEditOpen(true);
                                            }}
                                            className="rounded-lg border border-slate-200 p-2 text-slate-600 transition hover:border-teal-600 hover:text-teal-700 dark:border-slate-800 dark:text-slate-300 dark:hover:border-cyan-400 dark:hover:text-cyan-300"
                                        >
                                            <Pencil className="h-4 w-4" />
                                        </button>

                                        <button
                                            type="button"
                                            title="Delete"
                                            onClick={() => {
                                                setDeleteId(item._id);
                                                setDeleteOpen(true);
                                            }}
                                            className="rounded-lg border border-slate-200 p-2 text-slate-600 transition hover:border-rose-500 hover:text-rose-600 dark:border-slate-800 dark:text-slate-300 dark:hover:border-rose-400 dark:hover:text-rose-400"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>
                            </article>
                        );
                    })}
                </div>
                </>
            )}

            {/* Dialog ekbar render hoy; row er Edit/Delete button theke open hoy */}
            <EditTuitionDialog
                open={editOpen}
                onOpenChange={setEditOpen}
                tuition={selectedTuition}
                onUpdated={(updated) => {
                    setTuitions((prev) =>
                        prev.map((row) =>
                            row._id === updated._id ? { ...row, ...updated } : row
                        )
                    );
                }}
            />

            <DeleteTuitionDialog
                open={deleteOpen}
                onOpenChange={setDeleteOpen}
                id={deleteId}
                onDeleted={(id) => {
                    setTuitions((prev) => prev.filter((row) => row._id !== id));
                }}
            />
        </div>
    );
}