import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CreditCard,
  LayoutDashboard,
  Users,
} from "lucide-react";
import AdminOverviewStats, { OverviewData } from "@/components/SheareDashboard/SheareAdmin/AdminOverviewStats";

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

async function fetchJsonSafe(url: string) {
  try {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) return [];
    const data = await res.json();
    if (Array.isArray(data)) return data;
    if (Array.isArray(data?.users)) return data.users;
    if (Array.isArray(data?.tuitions)) return data.tuitions;
    if (Array.isArray(data?.payments)) return data.payments;
    return [];
  } catch {
    return [];
  }
}

async function getOverviewData(): Promise<OverviewData> {
  const [users, tuitions, payments] = await Promise.all([
    fetchJsonSafe(`${API_BASE}/GetUsers`),
    fetchJsonSafe(`${API_BASE}/TuitionsSearch?limit=200`),
    fetchJsonSafe(`${API_BASE}/GetPayments`),
  ]);

  const totalUsers = users.length;
  const paidUsers = users.filter((u: { payment?: boolean }) =>
    Boolean(u?.payment)
  ).length;
  const blockedUsers = users.filter(
    (u: { status?: string }) => u?.status === "blocked"
  ).length;

  const totalTuitions = tuitions.length;
  const activeTuitions = tuitions.filter(
    (t: { status?: string }) => String(t?.status || "active") === "active"
  ).length;
  const approvedTuitions = tuitions.filter(
    (t: { verificationStatus?: string }) =>
      t?.verificationStatus === "approved" || t?.verificationStatus === "verified"
  ).length;

  const totalPayments = payments.length;
  const paidRevenue = payments.reduce((sum: number, p: { amount?: number | string; status?: string }) => {
    const s = String(p?.status || "").toLowerCase();
    const isPaid = s === "paid" || s === "completed" || s === "success";
    return isPaid ? sum + (Number(p?.amount) || 0) : sum;
  }, 0);

  return {
    totalUsers,
    paidUsers,
    blockedUsers,
    totalTuitions,
    activeTuitions,
    approvedTuitions,
    totalPayments,
    paidRevenue,
  };
}

export default async function AdminOverviewPage() {
  const overviewData = await getOverviewData();

  const quickLinks = [
    {
      title: "Users Management",
      desc: "Manage roles, pro payment flags, block or delete accounts.",
      href: "/dashboard/admin/users",
      icon: Users,
    },
    {
      title: "All Tuitions Control",
      desc: "Approve or revoke tuitions, track active/closed states, or delete.",
      href: "/dashboard/admin/tuitions",
      icon: BookOpen,
    },
    {
      title: "Payments Management",
      desc: "Review transactions, toggle payment status, and clean records.",
      href: "/dashboard/admin/payments",
      icon: CreditCard,
    },
  ];

  return (
    <main className="w-full text-slate-900 dark:text-slate-100">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div className="flex flex-col justify-between gap-3 rounded-2xl border border-amber-400/35 bg-white/80 px-5 py-4 shadow-sm backdrop-blur-md dark:border-amber-400/25 dark:bg-slate-900/70 dark:shadow-black/30 sm:flex-row sm:items-center">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/40 bg-amber-400/15 px-3 py-0.5 text-[11px] font-extrabold uppercase tracking-wider text-amber-900 dark:border-amber-400/30 dark:bg-amber-400/10 dark:text-amber-300">
              <LayoutDashboard className="h-3 w-3 text-amber-600 dark:text-amber-400" />
              <span>Admin Overview</span>
            </div>

            <h1 className="bg-gradient-to-r from-slate-900 via-amber-800 to-slate-900 bg-clip-text text-2xl font-black tracking-tight text-transparent dark:from-white dark:via-amber-200 dark:to-amber-400 sm:text-3xl">
              Platform Live Overview
            </h1>

            <p className="text-xs text-slate-600 dark:text-slate-400 sm:text-sm">
              Real-time metrics pulled directly from your database without dummy
              numbers.
            </p>
          </div>
        </div>

        {/* Real Stats Cards */}
        <AdminOverviewStats data={overviewData} />

        {/* Quick Navigation Cards */}
        <div className="grid grid-cols-1 gap-3.5 md:grid-cols-3">
          {quickLinks.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="group flex flex-col justify-between gap-3 rounded-2xl border border-amber-400/30 bg-white/85 p-4 shadow-2xs backdrop-blur-md transition duration-200 hover:-translate-y-0.5 hover:border-amber-500/60 hover:shadow-md dark:border-amber-400/20 dark:bg-slate-900/75 dark:hover:border-amber-400/50"
              >
                <div className="space-y-1.5">
                  <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-amber-400/35 bg-amber-400/15 text-amber-800 dark:text-amber-300">
                    <Icon className="h-4 w-4" />
                  </div>
                  <h2 className="text-base font-extrabold text-slate-900 dark:text-white">
                    {item.title}
                  </h2>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    {item.desc}
                  </p>
                </div>

                <div className="inline-flex items-center gap-1 text-xs font-extrabold text-amber-800 transition group-hover:translate-x-0.5 dark:text-amber-300">
                  <span>Open Section</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}