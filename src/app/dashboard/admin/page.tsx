import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CreditCard,
  LayoutDashboard,
  ShieldCheck,
  UserCheck,
  Users,
  Wallet,
} from "lucide-react";

// import AdminDashboardPage from "@/components/SheareDashboard/SheareAdmin/Overview/AdminDashboardPage";
import AdminSpotlightSection from "@/components/SheareDashboard/SheareAdmin/Overview/AdminSpotlightSection";

const API_BASE = (
  process.env.NEXT_PUBLIC_API_URL || ""
).replace(/\/+$/, "");

interface OverviewData {
  totalUsers: number;
  paidUsers: number;
  blockedUsers: number;
  totalTuitions: number;
  activeTuitions: number;
  approvedTuitions: number;
  totalPayments: number;
  paidRevenue: number;
}

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
    fetchJsonSafe(`${API_BASE}/AdminViewPayments`),
  ]);

  const totalUsers = users.length;

  // হিন্ট: "Pro ইউজার" সংখ্যা UsersData.payment ফ্ল্যাগ দিয়ে গুনলে ভুল আসে — Stripe
  //   ওই ফ্ল্যাগ সেট করে না (সেটা শুধু admin ম্যানুয়ালি দেয়)। তাই paid রশিদের
  //   distinct email গোনা হচ্ছে, আর admin-granted (payment: true) অ্যাকাউন্টগুলোও
  //   যোগ করা হচ্ছে, যাতে দুটোই একসাথে ধরা পড়ে।
  const paidReceiptEmails = new Set<string>(
    payments
      .filter(
        (p: { status?: string; payment?: boolean }) =>
          Boolean(p?.payment) ||
          ["paid", "completed", "success"].includes(
            String(p?.status || "").toLowerCase()
          )
      )
      .map((p: { email?: string }) =>
        String(p?.email || "").trim().toLowerCase()
      )
      .filter(Boolean)
  );

  for (const u of users as { email?: string; payment?: boolean }[]) {
    if (!u?.payment) continue;
    const flagEmail = String(u?.email || "").trim().toLowerCase();
    if (flagEmail) paidReceiptEmails.add(flagEmail);
  }

  const paidUsers = paidReceiptEmails.size;
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
  const paidRevenue = payments.reduce(
    (
      sum: number,
      p: { amount?: number | string; amountTotal?: number | string; status?: string }
    ) => {
      const s = String(p?.status || "").toLowerCase();
      const isPaid = s === "paid" || s === "completed" || s === "success";
      if (!isPaid) return sum;
      const value = Number(p?.amountTotal ?? p?.amount) || 0;
      return sum + value;
    },
    0
  );

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

  // const quickLinks = [
  //   {
  //     title: "Users Management",
  //     desc: "Manage roles, pro payment flags, block or delete accounts.",
  //     href: "/dashboard/admin/users",
  //     icon: Users,
  //   },
  //   {
  //     title: "All Tuitions Control",
  //     desc: "Approve or revoke tuitions, track active/closed states, or delete.",
  //     href: "/dashboard/admin/tuitions",
  //     icon: BookOpen,
  //   },
  //   {
  //     title: "Payments Management",
  //     desc: "Review transactions, toggle payment status, and clean records.",
  //     href: "/dashboard/admin/payments",
  //     icon: CreditCard,
  //   },
  // ];

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
        <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 xl:grid-cols-4">
          {[
            {
              label: "Total Users",
              value: overviewData.totalUsers,
              hint: `${overviewData.paidUsers} pro · ${overviewData.blockedUsers} blocked`,
              icon: Users,
            },
            {
              label: "Total Tuitions",
              value: overviewData.totalTuitions,
              hint: `${overviewData.activeTuitions} active`,
              icon: BookOpen,
            },
            {
              label: "Approved Tuitions",
              value: overviewData.approvedTuitions,
              hint: "Verified by admin",
              icon: ShieldCheck,
            },
            {
              label: "Paid Revenue",
              value: `$${overviewData.paidRevenue.toLocaleString()}`,
              hint: `${overviewData.totalPayments} payment records`,
              icon: Wallet,
            },
          ].map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="rounded-2xl border border-amber-400/30 bg-white/85 p-4 shadow-2xs backdrop-blur-md dark:border-amber-400/20 dark:bg-slate-900/70"
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                    {stat.label}
                  </p>
                  <span className="grid size-8 place-items-center rounded-xl border border-amber-400/35 bg-amber-400/15 text-amber-800 dark:text-amber-300">
                    <Icon className="size-4" />
                  </span>
                </div>
                <p className="mt-2 text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                  {stat.value}
                </p>
                <p className="mt-1 inline-flex items-center gap-1 text-[11px] font-medium text-slate-500 dark:text-slate-400">
                  <UserCheck className="size-3 text-amber-600 dark:text-amber-400" />
                  {stat.hint}
                </p>
              </div>
            );
          })}
        </div>

        {/* Quick Navigation Cards */}
        {/* <div className="grid grid-cols-1 gap-3.5 md:grid-cols-3">
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
        </div> */}
        {/* <AdminDashboardPage /> */}
        <AdminSpotlightSection />
      </div>
    </main>
  );
}