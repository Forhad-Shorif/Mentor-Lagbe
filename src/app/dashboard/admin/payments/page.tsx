import React from "react";
import Link from "next/link";
import { ArrowLeft, CreditCard } from "lucide-react";
import AdminPaymentsView, { AdminPaymentItem } from "@/components/SheareDashboard/SheareAdmin/Payments/AdminPaymentsView";

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

async function getInitialPayments(): Promise<AdminPaymentItem[]> {
  try {
    const res = await fetch(`${API_BASE}/AdminViewPayments`, { cache: "no-store" });
    if (!res.ok) return [];
    const data = await res.json();
    if (Array.isArray(data)) return data;
    if (Array.isArray(data?.payments)) return data.payments;
    return [];
  } catch {
    return [];
  }
}

// ============================================================================
// হিন্ট: পেমেন্ট · Admin Payments Page (সব লেনদেনের নিয়ন্ত্রণ)
// ============================================================================
// হিন্ট (কী): অ্যাডমিন এখানে সব ইউজারের পেমেন্ট রেকর্ড দেখে, paid/pending বদলাতে
//   পারে এবং ভুল রেকর্ড ডিলিট করতে পারে।
//
// হিন্ট (কেন): Stripe সবসময় ঠিক নাও হতে পারে (টেস্ট পেমেন্ট, রিফান্ড, ভুল ডেটা);
//   অ্যাডমিনের হাতে ম্যানুয়াল নিয়ন্ত্রণ থাকলে ইউজারের প্ল্যান ঠিক করা যায়।
//
// হিন্ট (কীভাবে): সার্ভার পেজ GET /AdminViewPayments ডেকে সব রেকর্ড আনে →
//   <AdminPaymentsView initialPayments={...} /> এ পাঠায় (filter, Paid Total ইত্যাদি
//   ক্লায়েন্টে হয়)। সেখান থেকে:
//     · status toggle → PATCH /UpdatePaymentStatus/:id
//     · delete → DELETE /DeletePayment/:id
//
// হিন্ট (সবচেয়ে জরুরি): এই দুটো API ই ব্যাকএন্ডে syncUserPlanFromReceipts(email)
//   চালায়। তাই অ্যাডমিন paid করলে ইউজারের প্ল্যান চালু/মেয়াদ সেট হয়, আর
//   pending/ডিলিট করলে প্ল্যান সাথে সাথে বন্ধ হয় — UsersData-তে পুরনো তারিখ
//   আটকে থাকে না।
//
// হিন্ট: রেকর্ড না থাকলে বা ব্যাকএন্ড ডাউন থাকলে initialPayments = [] →
//   পেজ error না দিয়ে খালি লিস্ট দেখায়।
// ============================================================================
export default async function AdminPaymentsPage() {
  const initialPayments = await getInitialPayments();

  return (
    <main className="w-full text-slate-900 dark:text-slate-100">
      <div className="mx-auto max-w-7xl space-y-5">
        <div className="flex flex-col justify-between gap-4 rounded-2xl border border-amber-400/35 bg-white/80 px-5 py-4 shadow-sm backdrop-blur-md dark:border-amber-400/25 dark:bg-slate-900/70 dark:shadow-black/30 sm:flex-row sm:items-center">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/40 bg-amber-400/15 px-3 py-0.5 text-[11px] font-extrabold uppercase tracking-wider text-amber-900 dark:border-amber-400/30 dark:bg-amber-400/10 dark:text-amber-300">
              <CreditCard className="h-3 w-3 text-amber-600 dark:text-amber-400" />
              <span>Billing & Transactions</span>
            </div>

            <h1 className="bg-gradient-to-r from-slate-900 via-amber-800 to-slate-900 bg-clip-text text-2xl font-black tracking-tight text-transparent dark:from-white dark:via-amber-200 dark:to-amber-400 sm:text-3xl">
              Payments Management
            </h1>

            <p className="text-xs text-slate-600 dark:text-slate-400 sm:text-sm">
              Track user transactions, update payment status, and manage payment
              records.
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

        <AdminPaymentsView initialPayments={initialPayments} />
      </div>
    </main>
  );
}