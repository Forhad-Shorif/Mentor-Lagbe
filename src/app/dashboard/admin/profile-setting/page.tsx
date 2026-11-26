import React from "react";

import AdminProfileHero from "@/components/SheareDashboard/SheareAdmin/Profile/AdminProfileHero";
import AdminStatsGrid from "@/components/SheareDashboard/SheareAdmin/Profile/AdminStatsGrid";
import AdminActivityHub from "@/components/SheareDashboard/SheareAdmin/Profile/AdminActivityHub";
import { ServerUser } from "@/lib/ServerUser";

const API_BASE = (process.env.NEXT_PUBLIC_API_URL || "").replace(/\/+$/, "");

interface PaymentRecord {
  _id?: string;
  userName?: string;
  name?: string;
  email?: string;
  amount?: number | string;
  amountTotal?: number | string;
  status?: string;
  payment?: boolean;
}

interface TuitionRecord {
  _id?: string;
  title?: string;
  subject?: string;
  verificationStatus?: string;
  status?: string;
}

// হিন্ট: পেমেন্ট রেকর্ড থেকে amountTotal বা amount যেটাতে মান আছে সেখান থেকে টাকা বের করা হচ্ছে।
// হিন্ট: Recent Activity-তে যেন ৳ 0 না দেখিয়ে Paid Revenue-এর মতো আসল অংক দেখায়।
// হিন্ট: p?.amountTotal ?? p?.amount নিয়ে Number() করা হয়েছে।
function getPaymentAmount(record: PaymentRecord): number {
  const raw = record?.amountTotal ?? record?.amount;
  const num = Number(raw);
  return Number.isFinite(num) ? num : 0;
}

function isPaidRecord(record: PaymentRecord): boolean {
  if (record?.payment === true) return true;
  const s = String(record?.status || "").toLowerCase();
  return s === "paid" || s === "completed" || s === "success";
}

// হিন্ট: Users ডেটা আলাদা ফাংশনে আনা হচ্ছে যাতে পরে সহজেই auth token/session যুক্ত করা যায়।
// হিন্ট: custom generic getData এড়িয়ে প্রতিটি endpoint-এর জন্য আলাদা fetch ফাংশন রাখা হয়েছে।
// হিন্ট: /GetUsers থেকে array বা data.users নিরাপদে বের করা হয়েছে।
async function fetchUsersList(): Promise<unknown[]> {
  try {
    const res = await fetch(`${API_BASE}/GetUsers`, { cache: "no-store" });
    if (!res.ok) return [];
    const data = await res.json();
    if (Array.isArray(data)) return data;
    if (Array.isArray(data?.users)) return data.users;
    return [];
  } catch {
    return [];
  }
}

// হিন্ট: Tuitions ডেটা আলাদা ফাংশনে আনা হচ্ছে যাতে পরে সহজেই auth token/session যুক্ত করা যায়।
// হিন্ট: /TuitionsSearch?limit=200 থেকে array বা data.tuitions বের করা হয়েছে।
async function fetchTuitionsList(): Promise<TuitionRecord[]> {
  try {
    const res = await fetch(`${API_BASE}/TuitionsSearch?limit=200`, {
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

// হিন্ট: Payments ডেটা আলাদা ফাংশনে আনা হচ্ছে যাতে পরে সহজেই auth token/session যুক্ত করা যায়।
// হিন্ট: /AdminViewPayments থেকে array বা data.payments বের করা হয়েছে।
async function fetchPaymentsList(): Promise<PaymentRecord[]> {
  try {
    const res = await fetch(`${API_BASE}/AdminViewPayments`, {
      cache: "no-store",
    });
    if (!res.ok) return [];
    const data = await res.json();
    if (Array.isArray(data)) return data;
    if (Array.isArray(data?.payments)) return data.payments;
    return [];
  } catch {
    return [];
  }
}

export default async function AdminDashboardProfilePage() {
  const [user, users, tuitions, payments] = await Promise.all([
    ServerUser(),
    fetchUsersList(),
    fetchTuitionsList(),
    fetchPaymentsList(),
  ]);

  const adminInfo = {
    name: user?.name || "Admin User",
    email: user?.email || "admin@mentorlagbe.com",
    role: String(user?.role || "admin"),
    image: user?.image || "",
  };

  const status = user?.status === "blocked" ? "blocked" : "active";

  const paidRevenue = payments.reduce((sum: number, p: PaymentRecord) => {
    if (!isPaidRecord(p)) return sum;
    return sum + getPaymentAmount(p);
  }, 0);

  const stats = {
    totalUsers: users.length,
    totalTuitions: tuitions.length,
    approvedTuitions: tuitions.filter(
      (t: TuitionRecord) =>
        t?.verificationStatus === "approved" ||
        t?.verificationStatus === "verified"
    ).length,
    paidRevenue,
  };

  const latestTuitions = tuitions.slice(0, 3).map((t: TuitionRecord, idx: number) => ({
    id: `tuition-${String(t?._id || idx)}`,
    type: "Tuition" as const,
    title: t?.title || "Untitled Tuition",
    subtitle: t?.subject || "General",
    tag: String(t?.verificationStatus || t?.status || "active"),
  }));

  const latestPayments = payments.slice(0, 3).map((p: PaymentRecord, idx: number) => ({
    id: `payment-${String(p?._id || idx)}`,
    type: "Payment" as const,
    title: `${p?.userName || p?.name || p?.email || "User"} • $ ${getPaymentAmount(p)}`,
    subtitle: p?.email || "Payment Record",
    tag: isPaidRecord(p) ? "paid" : String(p?.status || "pending"),
  }));

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