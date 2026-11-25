"use client";

import React, { useMemo, useState } from "react";
import { CreditCard } from "lucide-react";
import { showToast } from "@/lib/utils/toast";
import { Card, CardContent } from "@/components/ui/card";
import AdminPaymentRowCard, {
  type AdminPaymentItem,
  getPaymentAmount,
  isPaymentPaid,
} from "./AdminPaymentRowCard";

// হিন্ট: পুরনো ইমপোর্ট (`import AdminPaymentsView, { AdminPaymentItem } ...`) কাজ করার জন্য
// টাইপটি এখান থেকেও re-export করা হচ্ছে — Otherwise admin/payments page type-check fail করে।
export type { AdminPaymentItem };

interface AdminPaymentsViewProps {
  initialPayments: AdminPaymentItem[];
}

type PaymentFilter = "all" | "paid" | "pending";

const API_BASE = (
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"
).replace(/\/+$/, "");

function notifyOnce(type: "success" | "error", id: string, message: string) {
  showToast[type](message, { id });
}

// হিন্ট (কী): Admin Payments লিস্টে Paid Total, Paid/Pending ফিল্টার এবং প্রতিটি পেমেন্ট কার্ড দেখানো হচ্ছে।
// হিন্ট (কেন): amountTotal বা amount যেকোনো ফিল্ডে টাকা থাকলে যেন Paid Total ও কার্ডে সঠিক অংক দেখায়।
// হিন্ট (কীভাবে): isPaymentPaid ও getPaymentAmount ব্যবহার করে stats ও filteredPayments হিসাব করা হয়েছে।
export default function AdminPaymentsView({
  initialPayments,
}: AdminPaymentsViewProps) {
  const [payments, setPayments] = useState<AdminPaymentItem[]>(initialPayments);
  const [filter, setFilter] = useState<PaymentFilter>("all");
  const [busyId, setBusyId] = useState<string | null>(null);

  const stats = useMemo(() => {
    let paidCount = 0;
    let pendingCount = 0;
    let totalAmount = 0;

    for (const item of payments) {
      const numericAmount = getPaymentAmount(item);
      if (isPaymentPaid(item)) {
        paidCount += 1;
        totalAmount += numericAmount;
      } else {
        pendingCount += 1;
      }
    }

    return {
      all: payments.length,
      paid: paidCount,
      pending: pendingCount,
      totalAmount,
    };
  }, [payments]);

  const filteredPayments = useMemo(() => {
    if (filter === "paid") {
      return payments.filter((item) => isPaymentPaid(item));
    }
    if (filter === "pending") {
      return payments.filter((item) => !isPaymentPaid(item));
    }
    return payments;
  }, [payments, filter]);

  const handleToggleStatus = async (payment: AdminPaymentItem) => {
    const currentlyPaid = isPaymentPaid(payment);
    const nextStatus = currentlyPaid ? "pending" : "paid";
    const nextPaidBool = nextStatus === "paid";
    const prevList = payments;

    setBusyId(payment._id);
    setPayments((current) =>
      current.map((item) =>
        item._id === payment._id
          ? { ...item, status: nextStatus, payment: nextPaidBool }
          : item
      )
    );

    try {
      const base = API_BASE.replace(/\/+$/, "");
      const res = await fetch(
        `${base}/UpdatePaymentStatus/${encodeURIComponent(payment._id)}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            status: nextStatus,
            userId: payment.userId,
            email: payment.email,
            payment: nextPaidBool,
          }),
        }
      );

      if (!res.ok) throw new Error("Failed to update payment status");

      notifyOnce(
        "success",
        "admin-payment-status",
        `Payment marked as ${nextStatus}`
      );
    } catch {
      setPayments(prevList);
      notifyOnce(
        "error",
        "admin-payment-status",
        "Could not update payment status"
      );
    } finally {
      setBusyId(null);
    }
  };

  const handleDelete = async (payment: AdminPaymentItem) => {
    const prevList = payments;

    setBusyId(payment._id);
    setPayments((current) =>
      current.filter((item) => item._id !== payment._id)
    );

    try {
      const base = API_BASE.replace(/\/+$/, "");
      const res = await fetch(
        `${base}/DeletePayment/${encodeURIComponent(payment._id)}`,
        { method: "DELETE" }
      );

      if (!res.ok) throw new Error("Failed to delete payment");

      notifyOnce("success", "admin-payment-delete", "Payment record deleted");
    } catch {
      setPayments(prevList);
      notifyOnce(
        "error",
        "admin-payment-delete",
        "Could not delete payment record"
      );
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col justify-between gap-3 rounded-2xl border border-amber-400/25 bg-white/75 p-3 shadow-2xs backdrop-blur-md dark:border-amber-400/20 dark:bg-slate-900/65 sm:flex-row sm:items-center">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setFilter("all")}
            className={`inline-flex h-8 items-center gap-2 rounded-xl px-3.5 text-xs font-extrabold transition ${
              filter === "all"
                ? "bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 shadow-xs"
                : "text-slate-700 hover:bg-amber-400/15 dark:text-slate-300 dark:hover:bg-amber-400/10"
            }`}
          >
            <span>All</span>
            <span className="rounded-full bg-black/10 px-2 py-0.5 text-[10px] font-black dark:bg-white/15">
              {stats.all}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setFilter("paid")}
            className={`inline-flex h-8 items-center gap-2 rounded-xl px-3.5 text-xs font-extrabold transition ${
              filter === "paid"
                ? "bg-emerald-600 text-white shadow-xs dark:bg-emerald-500 dark:text-slate-950"
                : "text-slate-700 hover:bg-emerald-500/10 dark:text-slate-300"
            }`}
          >
            <span>Paid</span>
            <span className="rounded-full bg-black/10 px-2 py-0.5 text-[10px] font-black dark:bg-white/15">
              {stats.paid}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setFilter("pending")}
            className={`inline-flex h-8 items-center gap-2 rounded-xl px-3.5 text-xs font-extrabold transition ${
              filter === "pending"
                ? "bg-amber-600 text-white shadow-xs dark:bg-amber-400 dark:text-slate-950"
                : "text-slate-700 hover:bg-amber-500/10 dark:text-slate-300"
            }`}
          >
            <span>Pending</span>
            <span className="rounded-full bg-black/10 px-2 py-0.5 text-[10px] font-black dark:bg-white/15">
              {stats.pending}
            </span>
          </button>
        </div>

        <div className="inline-flex h-8 items-center gap-1.5 self-start rounded-xl border border-amber-400/35 bg-amber-400/10 px-3 text-xs font-extrabold text-amber-950 dark:text-amber-200 sm:self-auto">
          <CreditCard className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400" />
          <span>Paid Total: ৳ {stats.totalAmount.toLocaleString()}</span>
        </div>
      </div>

      {filteredPayments.length === 0 ? (
        <Card className="rounded-2xl border border-amber-400/30 bg-white/80 shadow-2xs backdrop-blur-md dark:border-amber-400/20 dark:bg-slate-900/70">
          <CardContent className="py-8 text-center text-sm font-semibold text-slate-600 dark:text-slate-300">
            No payment records found.
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-2.5">
          {filteredPayments.map((payment) => (
            <AdminPaymentRowCard
              key={payment._id}
              payment={payment}
              isBusy={busyId === payment._id}
              onToggleStatus={handleToggleStatus}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}