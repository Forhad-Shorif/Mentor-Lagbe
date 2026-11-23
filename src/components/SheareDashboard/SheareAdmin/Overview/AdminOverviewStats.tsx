import React from "react";
import { Mail, ShieldCheck, Sparkles, UserCheck } from "lucide-react";

import AdminOverviewStats from "./AdminOverviewStats";
import { ServerUser } from "@/lib/ServerUser";

export default async function AdminDashboardPage() {
  const user = await ServerUser();

  // Dummy admin profile fallback (pore auth/session data diye replace korben)
  const adminProfile = {
    name: user?.name || "Admin Commander",
    email: user?.email || "admin@mentorlagbe.com",
    role: String(user?.role || "admin"),
    image: user?.image || "",
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-6 text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100 md:px-8">
      <div className="mx-auto max-w-6xl space-y-6">
        {/* WOW Admin Profile Header */}
        <header className="relative overflow-hidden rounded-3xl border border-cyan-500/30 bg-gradient-to-br from-cyan-500/15 via-sky-500/10 to-teal-500/15 p-6 shadow-sm dark:border-cyan-400/30 dark:from-cyan-500/20 dark:via-slate-900 dark:to-teal-500/15 dark:shadow-[0_0_45px_rgba(6,182,212,0.14)] sm:p-8">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
            <div className="flex items-start gap-4 sm:items-center">
              {/* Avatar */}
              {adminProfile.image ? (
                <img
                  src={adminProfile.image}
                  alt={adminProfile.name}
                  className="h-16 w-16 shrink-0 rounded-2xl border-2 border-cyan-400/50 object-cover shadow-md sm:h-20 sm:w-20"
                />
              ) : (
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-600 to-teal-600 text-2xl font-black text-white shadow-md dark:from-cyan-400 dark:to-teal-400 dark:text-slate-950 sm:h-20 sm:w-20">
                  {adminProfile.name.charAt(0).toUpperCase()}
                </div>
              )}

              {/* Admin Profile Info */}
              <div className="min-w-0">
                <div className="inline-flex items-center gap-1.5 rounded-full border border-cyan-500/30 bg-white/85 px-3 py-0.5 text-[11px] font-bold uppercase tracking-wider text-cyan-800 dark:border-cyan-400/30 dark:bg-slate-950/75 dark:text-cyan-300">
                  <ShieldCheck className="h-3.5 w-3.5 text-cyan-600 dark:text-cyan-400" />
                  <span>Admin Profile • {adminProfile.role}</span>
                </div>

                <h1 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
                  Welcome back,{" "}
                  <span className="bg-gradient-to-r from-cyan-600 via-sky-600 to-teal-600 bg-clip-text text-transparent dark:from-cyan-300 dark:via-sky-300 dark:to-teal-300">
                    {adminProfile.name}
                  </span>
                </h1>

                <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-600 dark:text-slate-300 sm:text-sm">
                  <span className="inline-flex items-center gap-1.5">
                    <Mail className="h-3.5 w-3.5 text-cyan-600 dark:text-cyan-400" />
                    <span>{adminProfile.email}</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <UserCheck className="h-3.5 w-3.5 text-teal-600 dark:text-teal-400" />
                    <span>Full Platform Access</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Right Status Pill */}
            <div className="inline-flex w-fit items-center gap-2 rounded-2xl border border-cyan-500/25 bg-white/80 px-4 py-2.5 text-xs font-bold text-slate-800 backdrop-blur-xs dark:border-cyan-400/25 dark:bg-slate-950/70 dark:text-cyan-200">
              <Sparkles className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
              <span>Admin Dashboard Active</span>
            </div>
          </div>
        </header>

        {/* Client Overview Section (Users, Payments, Courses & More) */}
        <AdminOverviewStats />
      </div>
    </main>
  );
}