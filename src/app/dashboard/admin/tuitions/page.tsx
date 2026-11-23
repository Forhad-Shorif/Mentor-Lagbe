import React from "react";
import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";
import AdminTuitionsList, { AdminTuitionItem } from "@/components/SheareDashboard/SheareAdmin/Tutions/AdminTuitionsList";


const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

async function getAllTuitions(): Promise<AdminTuitionItem[]> {
  try {
    const res = await fetch(`${API_BASE}/TuitionsSearch?limit=150`, {
      cache: "no-store",
    });
    if (!res.ok) return [];
    const data = await res.json();
    if (Array.isArray(data)) return data;
    if (Array.isArray(data?.tuitions)) return data.tuitions;
    return [];
  } catch {
    return [];
  }
}

export default async function AdminTuitionsPage() {
  const initialTuitions = await getAllTuitions();

  return (
    <main className="w-full text-slate-900 dark:text-slate-100">
      <div className="mx-auto max-w-7xl space-y-5">
        <div className="flex flex-col justify-between gap-4 rounded-2xl border border-amber-400/35 bg-white/80 px-5 py-4 shadow-sm backdrop-blur-md dark:border-amber-400/25 dark:bg-slate-900/70 dark:shadow-black/30 sm:flex-row sm:items-center">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/40 bg-amber-400/15 px-3 py-0.5 text-[11px] font-extrabold uppercase tracking-wider text-amber-900 dark:border-amber-400/30 dark:bg-amber-400/10 dark:text-amber-300">
              <Sparkles className="h-3 w-3 text-amber-600 dark:text-amber-400" />
              <span>Tuition Moderation Hub</span>
            </div>

            <h1 className="bg-gradient-to-r from-slate-900 via-amber-800 to-slate-900 bg-clip-text text-2xl font-black tracking-tight text-transparent dark:from-white dark:via-amber-200 dark:to-amber-400 sm:text-3xl">
              All Tuitions Control
            </h1>

            <p className="text-xs text-slate-600 dark:text-slate-400 sm:text-sm">
              Approve or revoke tuition listings, monitor active or closed user
              states, and remove unwanted posts.
            </p>
          </div>

          <Link
            href="/dashboard/admin"
            className="inline-flex h-9 items-center gap-1.5 self-start rounded-xl border border-amber-400/40 bg-white/85 px-3.5 text-xs font-bold text-slate-800 shadow-2xs transition hover:border-amber-500 hover:bg-amber-50 dark:border-amber-400/30 dark:bg-slate-950/70 dark:text-amber-200 dark:hover:border-amber-400/60 dark:hover:bg-amber-400/10 dark:hover:text-white sm:self-auto"
          >
            <ArrowLeft className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400" />
            <span>Back to Overview</span>
          </Link>
        </div>

        <AdminTuitionsList initialTuitions={initialTuitions} />
      </div>
    </main>
  );
}