"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { Compass, Search, Sparkles } from "lucide-react";
import StudentApplicationsStats, {
  ApplicationStatsData,
} from "./StudentApplicationsStats";
import StudentApplicationCard, {
  ApplicationStatus,
  StudentApplicationItem,
} from "./StudentApplicationCard";

interface StudentApplicationsClientProps {
  initialApplications?: StudentApplicationItem[];
  studentEmail?: string;
}

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export default function StudentApplicationsClient({
  initialApplications = [],
  studentEmail = "",
}: StudentApplicationsClientProps) {
  const [applications, setApplications] =
    useState<StudentApplicationItem[]>(initialApplications);
  const [activeFilter, setActiveFilter] = useState<"All" | ApplicationStatus>(
    "All"
  );
  const [searchQuery, setSearchQuery] = useState("");

  const activeList = useMemo(
    () => applications.filter((a) => a.post !== false),
    [applications]
  );

  const stats: ApplicationStatsData = useMemo(() => {
    return {
      total: activeList.length,
      pending: activeList.filter((a) => a.status === "Pending").length,
      accepted: activeList.filter((a) => a.status === "Accepted").length,
      rejected: activeList.filter((a) => a.status === "Rejected").length,
    };
  }, [activeList]);

  const filteredApplications = useMemo(() => {
    return activeList.filter((item) => {
      if (activeFilter !== "All" && item.status !== activeFilter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(q);
        const matchesSubject = item.subject.toLowerCase().includes(q);
        const matchesTutor = item.tutorName.toLowerCase().includes(q);
        if (!matchesTitle && !matchesSubject && !matchesTutor) return false;
      }
      return true;
    });
  }, [activeList, activeFilter, searchQuery]);

  async function handleCancelPending(id: string) {
    const target = applications.find((a) => a.id === id);
    if (!target || target.status !== "Pending") return;

    setApplications((prev) =>
      prev.map((item) => (item.id === id ? { ...item, post: false } : item))
    );

    if (API_BASE) {
      try {
        const encodedId = encodeURIComponent(id);
        const query = studentEmail
          ? `?email=${encodeURIComponent(studentEmail)}`
          : "";

        await fetch(`${API_BASE}/StudentApplicationPost/${encodedId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ post: false, email: studentEmail }),
        });

        await fetch(`${API_BASE}/StudentApplicationDelete/${encodedId}${query}`, {
          method: "DELETE",
        });
      } catch (err) {
        console.error("Cancel application error:", err);
      }
    }
  }

  const filterTabs: ("All" | ApplicationStatus)[] = [
    "All",
    "Pending",
    "Accepted",
    "Rejected",
  ];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-amber-400/40 bg-gradient-to-br from-amber-50/95 via-white/80 to-yellow-100/75 p-5 shadow-[0_14px_40px_-14px_rgba(245,158,11,0.28)] backdrop-blur-xl dark:border-amber-300/25 dark:from-amber-950/45 dark:via-slate-900/75 dark:to-yellow-950/35 sm:p-6">
        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
          <div>
            <span className="inline-flex items-center gap-1 rounded-full border border-amber-400/45 bg-amber-400/20 px-3 py-0.5 text-[11px] font-extrabold uppercase tracking-wider text-amber-900 dark:text-amber-200">
              <Sparkles className="h-3 w-3" />
              <span>My Applications</span>
            </span>
            <h1 className="mt-2 bg-gradient-to-r from-amber-900 via-amber-700 to-yellow-700 bg-clip-text text-2xl font-black text-transparent dark:from-amber-200 dark:via-yellow-300 dark:to-amber-400 sm:text-3xl">
              Tuition Applications &amp; Status
            </h1>
            <p className="mt-1 text-xs text-slate-600 dark:text-slate-300 sm:text-sm">
              Track pending requests, teacher acceptances, and rejected
              applications. Cancel anytime while pending.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Link
              href="/dashboard/students"
              className="inline-flex items-center gap-1.5 rounded-xl border border-amber-400/40 bg-white/85 px-3.5 py-2 text-xs font-bold text-slate-800 transition hover:border-amber-400 dark:border-slate-700 dark:bg-slate-950/80 dark:text-slate-100"
            >
              <Compass className="h-3.5 w-3.5 text-amber-600 dark:text-amber-300" />
              <span>Back to Overview</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Overview Stats Cards */}
      <StudentApplicationsStats stats={stats} />

      {/* Filter Buttons + Search */}
      <div className="flex flex-col justify-between gap-3 rounded-2xl border border-amber-400/25 bg-white/75 p-3.5 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/60 sm:flex-row sm:items-center">
        <div className="flex flex-wrap items-center gap-1.5">
          {filterTabs.map((tab) => {
            const isActive = activeFilter === tab;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveFilter(tab)}
                className={`rounded-xl px-3.5 py-1.5 text-xs font-bold transition ${
                  isActive
                    ? "bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 shadow-2xs"
                    : "text-slate-700 hover:bg-amber-400/15 dark:text-slate-200"
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>

        <div className="relative sm:w-64">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-amber-700/70 dark:text-amber-300/70" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search subject or tutor..."
            className="w-full rounded-xl border border-amber-400/35 bg-white/90 py-1.5 pl-9 pr-3 text-xs text-slate-900 outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-400/20 dark:border-slate-700 dark:bg-slate-950/80 dark:text-white"
          />
        </div>
      </div>

      {/* Application Cards List */}
      <div className="space-y-3">
        {filteredApplications.length === 0 ? (
          <div className="rounded-3xl border border-amber-400/30 bg-white/75 p-10 text-center backdrop-blur-xl dark:bg-slate-900/60">
            <p className="text-sm font-bold text-slate-700 dark:text-slate-200">
              No applications found under &ldquo;{activeFilter}&rdquo;.
            </p>
          </div>
        ) : (
          filteredApplications.map((item) => (
            <StudentApplicationCard
              key={item.id}
              item={item}
              onCancelPending={handleCancelPending}
            />
          ))
        )}
      </div>
    </div>
  );
}