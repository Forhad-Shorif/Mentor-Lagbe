import React from "react";
import Link from "next/link";
import { ArrowLeft, Crown } from "lucide-react";
import AdminUsersView from "@/components/SheareDashboard/SheareAdmin/Users/AdminUsersView";

export default function AdminUsersPage() {
  return (
    <main className="w-full text-slate-900 dark:text-slate-100">
      <div className="mx-auto max-w-7xl space-y-5">
        <div className="flex flex-col justify-between gap-3 rounded-2xl border border-amber-400/35 bg-white/70 px-5 py-4 shadow-sm backdrop-blur-md dark:border-amber-400/25 dark:bg-slate-900/60 dark:shadow-black/30 sm:flex-row sm:items-center">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/40 bg-amber-400/15 px-2.5 py-0.5 text-[11px] font-bold text-amber-800 dark:border-amber-400/30 dark:bg-amber-400/10 dark:text-amber-300">
              <Crown className="h-3 w-3 text-amber-600 dark:text-amber-400" />
              <span>Admin Control</span>
            </div>
            <h1 className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-2xl">
              Users Management
            </h1>
            <p className="text-xs text-slate-600 dark:text-slate-400 sm:text-sm">
              Manage roles, payment status, and block or delete user accounts.
            </p>
          </div>

          <Link
            href="/dashboard/admin"
            className="inline-flex h-9 items-center gap-1.5 self-start rounded-xl border border-amber-400/40 bg-white/80 px-3.5 text-xs font-bold text-slate-800 shadow-2xs transition hover:border-amber-500/60 hover:bg-amber-50/90 dark:border-amber-400/30 dark:bg-slate-950/65 dark:text-amber-200 dark:hover:border-amber-400/60 dark:hover:bg-amber-400/10 dark:hover:text-white sm:self-auto"
          >
            <ArrowLeft className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400" />
            <span>Back to Overview</span>
          </Link>
        </div>

        <AdminUsersView />
      </div>
    </main>
  );
}