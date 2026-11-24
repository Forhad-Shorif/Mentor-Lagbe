"use client";

import React, { useMemo, useState } from "react";
import { CheckCircle2, Filter, Search, Sparkles, XCircle } from "lucide-react";
import { showToast } from "@/lib/utils/toast";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import TutorApplicationCard, {
    TutorAppItem,
    TutorAppStatus,
} from "./TutorApplicationCard";

const API_BASE =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export default function TutorApplicationsClient({
    initialApplications = [],
}: {
    initialApplications?: TutorAppItem[];
    tutorEmail?: string;
}) {
    const [applications, setApplications] =
        useState<TutorAppItem[]>(initialApplications);
    const [selectedTuition, setSelectedTuition] = useState("All");
    const [statusFilter, setStatusFilter] = useState<"All" | TutorAppStatus>(
        "All"
    );
    const [searchText, setSearchText] = useState("");
    const [selectedApp, setSelectedApp] = useState<TutorAppItem | null>(null);
    const [saving, setSaving] = useState(false);

    const tuitions = useMemo(() => {
        const unique = Array.from(
            new Set(
                applications
                    .map((a) => String(a.tuitionTitle || "").trim())
                    .filter(Boolean)
            )
        );
        return ["All", ...unique];
    }, [applications]);

    const filtered = useMemo(() => {
        const q = searchText.trim().toLowerCase();
        return applications.filter((item) => {
            if (selectedTuition !== "All" && item.tuitionTitle !== selectedTuition) {
                return false;
            }
            if (statusFilter !== "All" && item.status !== statusFilter) {
                return false;
            }
            if (!q) return true;
            return (
                item.studentName.toLowerCase().includes(q) ||
                item.tuitionTitle.toLowerCase().includes(q) ||
                item.subject.toLowerCase().includes(q)
            );
        });
    }, [applications, selectedTuition, statusFilter, searchText]);

    const handleDecision = async (
        id: string,
        nextStatus: string
    ) => {
        const cleanStatus: "Accepted" | "Rejected" =
            String(nextStatus).toLowerCase() === "rejected" ? "Rejected" : "Accepted";
        const normalizedStatus = cleanStatus.toLowerCase(); // "accepted" | "rejected"

        const prev = applications;
        setApplications((list) =>
            list.map((item) =>
                item.id === id ? { ...item, status: cleanStatus } : item
            )
        );

        try {
            setSaving(true);
            const res = await fetch(
                `${API_BASE}/ApplyStatus/${encodeURIComponent(id)}`,
                {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        status: normalizedStatus,
                    }),
                }
            );

            const data = await res.json();
            if (!res.ok) {
                throw new Error(data?.message || "Failed to update status");
            }

            showToast.success(data?.message || `Application ${normalizedStatus}`);
            setSelectedApp(null);
        } catch (err) {
            setApplications(prev);
            showToast.error(
                err instanceof Error ? err.message : "Could not update status"
            );
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="space-y-4">
            {/* Header */}
            <div className="rounded-3xl border border-amber-400/40 bg-gradient-to-br from-amber-50/95 via-white/85 to-yellow-100/75 p-4 shadow-[0_12px_34px_-14px_rgba(245,158,11,0.25)] backdrop-blur-xl dark:border-amber-300/25 dark:from-amber-950/40 dark:via-slate-900/80 dark:to-yellow-950/30 sm:p-5">
                <span className="inline-flex items-center gap-1 rounded-full border border-amber-400/45 bg-amber-400/20 px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-amber-950 dark:text-amber-200">
                    <Sparkles className="h-3 w-3" />
                    <span>Tutor Applications</span>
                </span>
                <h1 className="mt-1.5 text-xl font-black text-slate-900 dark:text-white sm:text-2xl">
                    Student Applications
                </h1>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                    Click Pending to Accept or Reject a student, filter by tuition, and see Admin status.
                </p>
            </div>

            {/* Tuition Filter + Status + Search */}
            <div className="flex flex-col gap-3 rounded-2xl border border-amber-400/30 bg-white/85 p-3 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/75 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex flex-wrap items-center gap-2">
                    <div className="flex items-center gap-1.5">
                        <Filter className="h-3.5 w-3.5 text-amber-600 dark:text-amber-300" />
                        <select
                            value={selectedTuition}
                            onChange={(e) => setSelectedTuition(e.target.value)}
                            className="rounded-xl border border-amber-400/35 bg-white/95 px-2.5 py-1.5 text-xs font-bold text-slate-800 outline-none dark:border-slate-700 dark:bg-slate-950/85 dark:text-slate-100"
                        >
                            {tuitions.map((t) => (
                                <option key={t} value={t}>
                                    {t === "All" ? "All Tuitions" : t}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex flex-wrap items-center gap-1">
                        {(["All", "Pending", "Accepted", "Rejected"] as const).map((st) => (
                            <button
                                key={st}
                                type="button"
                                onClick={() => setStatusFilter(st)}
                                className={`rounded-xl px-2.5 py-1.5 text-xs font-bold transition ${statusFilter === st
                                    ? "bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950"
                                    : "text-slate-700 hover:bg-amber-400/15 dark:text-slate-200"
                                    }`}
                            >
                                {st}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="relative sm:w-64">
                    <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-amber-700/75 dark:text-amber-300/75" />
                    <input
                        type="text"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        placeholder="Search student or tuition..."
                        className="w-full rounded-xl border border-amber-400/35 bg-white/95 py-1.5 pl-8 pr-3 text-xs text-slate-900 outline-none dark:border-slate-700 dark:bg-slate-950/85 dark:text-white"
                    />
                </div>
            </div>

            {/* Cards */}
            <div className="space-y-2.5">
                {filtered.length === 0 ? (
                    <div className="rounded-3xl border border-dashed border-amber-400/40 bg-white/80 p-8 text-center text-xs font-bold text-slate-600 dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-300">
                        No applications found.
                    </div>
                ) : (
                    filtered.map((item) => (
                        <TutorApplicationCard
                            key={item.id}
                            item={item}
                            onPendingClick={(app) => setSelectedApp(app)}
                            onDecision={(id: string, nextStatus: string) =>
                                handleDecision(id, nextStatus)
                            }
                        />
                    ))
                )}
            </div>

            {/* shadcn Dialog when Pending is clicked */}
            <Dialog
                open={Boolean(selectedApp)}
                onOpenChange={(open) => {
                    if (!open && !saving) setSelectedApp(null);
                }}
            >
                <DialogContent className="rounded-3xl border-amber-400/40 bg-white/95 dark:border-amber-300/25 dark:bg-slate-900/95 sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle className="text-base font-black text-slate-900 dark:text-white">
                            Do you want this student?
                        </DialogTitle>
                        <DialogDescription className="text-xs text-slate-600 dark:text-slate-300">
                            {selectedApp?.studentName} applied for{" "}
                            <span className="font-bold text-amber-700 dark:text-amber-300">
                                {selectedApp?.tuitionTitle}
                            </span>
                            .
                        </DialogDescription>
                    </DialogHeader>

                    <DialogFooter className="grid grid-cols-2 gap-2 sm:flex sm:justify-end">
                        <button
                            type="button"
                            disabled={saving}
                            onClick={() =>
                                selectedApp && handleDecision(selectedApp.id, "Rejected")
                            }
                            className="inline-flex h-9 items-center justify-center gap-1.5 rounded-xl border border-rose-400/45 bg-rose-500/15 px-3.5 text-xs font-extrabold text-rose-800 transition hover:bg-rose-500/25 disabled:opacity-50 dark:text-rose-200"
                        >
                            <XCircle className="h-3.5 w-3.5" />
                            <span>{saving ? "Saving..." : "Reject"}</span>
                        </button>

                        <button
                            type="button"
                            disabled={saving}
                            onClick={() =>
                                selectedApp && handleDecision(selectedApp.id, "Accepted")
                            }
                            className="inline-flex h-9 items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 px-4 text-xs font-extrabold text-slate-950 transition hover:brightness-105 disabled:opacity-50"
                        >
                            <CheckCircle2 className="h-3.5 w-3.5" />
                            <span>{saving ? "Saving..." : "Accept"}</span>
                        </button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}