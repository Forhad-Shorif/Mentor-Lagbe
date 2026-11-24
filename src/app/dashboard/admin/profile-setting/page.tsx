import React from "react";

import AdminProfileHero from "@/components/SheareDashboard/SheareAdmin/Profile/AdminProfileHero";
import AdminStatsGrid from "@/components/SheareDashboard/SheareAdmin/Profile/AdminStatsGrid";
import AdminActivityHub from "@/components/SheareDashboard/SheareAdmin/Profile/AdminActivityHub";
import { ServerUser } from "@/lib/ServerUser";

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

async function getData(url: string) {
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

export default async function AdminDashboardProfilePage() {
  const [user, users, tuitions, payments] = await Promise.all([
    ServerUser(),
    getData(`${API_BASE}/GetUsers`),
    getData(`${API_BASE}/TuitionsSearch?limit=200`),
    getData(`${API_BASE}/AdminViewPayments`),
  ]);

  const adminInfo = {
    name: user?.name || "Admin User",
    email: user?.email || "admin@mentorlagbe.com",
    role: String(user?.role || "admin"),
    image: user?.image || "",
  };

  const status = user?.status === "blocked" ? "blocked" : "active";

  const paidRevenue = payments.reduce(
    (
      sum: number,
      p: { amount?: number | string; amountTotal?: number | string; status?: string }
    ) => {
      const s = String(p?.status || "").toLowerCase();
      const paid = s === "paid" || s === "completed" || s === "success";
      if (!paid) return sum;
      return sum + (Number(p?.amountTotal ?? p?.amount) || 0);
    },
    0
  );

  const stats = {
    totalUsers: users.length,
    totalTuitions: tuitions.length,
    approvedTuitions: tuitions.filter(
      (t: { verificationStatus?: string }) =>
        t?.verificationStatus === "approved" ||
        t?.verificationStatus === "verified"
    ).length,
    paidRevenue,
  };

  // Latest tuitions (shobar upore latest gulo thakle slice(0, 3), natoba reverse().slice(0, 3))
  const latestTuitions = tuitions.slice(0, 3).map(
    (t: {
      _id?: string;
      title?: string;
      subject?: string;
      verificationStatus?: string;
      status?: string;
    }) => ({
      // eslint-disable-next-line react-hooks/purity
      id: `tuition-${String(t?._id || Math.random())}`,
      type: "Tuition" as const,
      title: t?.title || "Untitled Tuition",
      subtitle: t?.subject || "General",
      tag: String(t?.verificationStatus || t?.status || "active"),
    })
  );

  // Latest payments
  const latestPayments = payments.slice(0, 3).map(
    (p: {
      _id?: string;
      userName?: string;
      name?: string;
      email?: string;
      amount?: number | string;
      status?: string;
    }) => ({
      // eslint-disable-next-line react-hooks/purity
      id: `payment-${String(p?._id || Math.random())}`,
      type: "Payment" as const,
      title: `${p?.userName || p?.name || p?.email || "User"} • ৳ ${
        Number(p?.amount) || 0
      }`,
      subtitle: p?.email || "Payment Record",
      tag: String(p?.status || "pending"),
    })
  );

  const activities = [...latestTuitions, ...latestPayments];

  return (
    <main className="w-full text-slate-900 transition-colors dark:text-slate-100">
      <div className="mx-auto max-w-6xl space-y-6">
        <AdminProfileHero profile={adminInfo} />
        <AdminStatsGrid stats={stats} role={adminInfo.role} status={status} />
        <AdminActivityHub
          email={adminInfo.email}
          role={adminInfo.role}
          status={status}
          activities={activities}
        />
      </div>
    </main>
  );
}