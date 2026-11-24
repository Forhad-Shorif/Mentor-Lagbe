"use client";

import React, { useMemo, useState } from "react";
import {
  CheckCircle2,
  Clock,
  CreditCard,
  Mail,
  RefreshCw,
  Trash2,
} from "lucide-react";
import { showToast } from "@/lib/utils/toast";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export interface AdminPaymentItem {
  _id: string;
  userId?: string;
  userName?: string;
  name?: string;
  email?: string;
  amount?: number | string;
  currency?: string;
  status?: "paid" | "completed" | "pending" | "failed" | string;
  transactionId?: string;
  createdAt?: string;
}

interface AdminPaymentsViewProps {
  initialPayments: AdminPaymentItem[];
}

type PaymentFilter = "all" | "paid" | "pending";

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

function isPaidStatus(status?: string) {
  const s = String(status || "").toLowerCase();
  return s === "paid" || s === "completed" || s === "success";
}

function notifyOnce(type: "success" | "error", id: string, message: string) {
  showToast[type](message, { id });
}

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
      const numericAmount = Number(item.amount) || 0;
      if (isPaidStatus(item.status)) {
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
      return payments.filter((item) => isPaidStatus(item.status));
    }
    if (filter === "pending") {
      return payments.filter((item) => !isPaidStatus(item.status));
    }
    return payments;
  }, [payments, filter]);

  const handleToggleStatus = async (payment: AdminPaymentItem) => {
    const currentlyPaid = isPaidStatus(payment.status);
    const nextStatus = currentlyPaid ? "pending" : "paid";
    const prevList = payments;

    setBusyId(payment._id);
    setPayments((current) =>
      current.map((item) =>
        item._id === payment._id ? { ...item, status: nextStatus } : item
      )
    );

    try {
      const res = await fetch(
        `${API_BASE}/UpdatePaymentStatus/${encodeURIComponent(payment._id)}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            status: nextStatus,
            userId: payment.userId,
            email: payment.email,
            payment: nextStatus === "paid",
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
      const res = await fetch(
        `${API_BASE}/DeletePayment/${encodeURIComponent(payment._id)}`,
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
          <span>Paid Total: ৳ {stats.totalAmount}</span>
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
          {filteredPayments.map((payment) => {
            const payerName =
              payment.userName || payment.name || "User Payment";
            const email = payment.email || "No email provided";
            const amount = Number(payment.amount) || 0;
            const paid = isPaidStatus(payment.status);
            const isBusy = busyId === payment._id;

            return (
              <Card
                key={payment._id}
                className="rounded-2xl border border-amber-400/30 bg-white/85 text-slate-900 shadow-2xs backdrop-blur-md transition duration-200 hover:border-amber-500/55 hover:shadow-sm dark:border-amber-400/20 dark:bg-slate-900/75 dark:text-slate-100 dark:hover:border-amber-400/45"
              >
                <CardContent className="flex flex-col justify-between gap-3 px-4 py-2.5 lg:flex-row lg:items-center lg:px-5 lg:py-3">
                  <div className="min-w-0 flex-1 space-y-0.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="truncate text-sm font-extrabold text-slate-900 dark:text-white sm:text-[15px]">
                        {payerName}
                      </h2>

                      <Badge
                        className={`h-5 gap-1 rounded-full border px-2 text-[10px] font-extrabold uppercase ${
                          paid
                            ? "border-emerald-500/35 bg-emerald-500/15 text-emerald-800 dark:text-emerald-300"
                            : "border-amber-500/40 bg-amber-400/15 text-amber-900 dark:text-amber-300"
                        }`}
                      >
                        {paid ? (
                          <CheckCircle2 className="h-2.5 w-2.5" />
                        ) : (
                          <Clock className="h-2.5 w-2.5" />
                        )}
                        <span>{paid ? "paid" : "pending"}</span>
                      </Badge>
                    </div>

                    <p className="flex items-center gap-1.5 truncate text-xs text-slate-500 dark:text-slate-400">
                      <Mail className="h-3.5 w-3.5 shrink-0 text-amber-600 dark:text-amber-400" />
                      <span className="truncate">{email}</span>
                      {payment.transactionId && (
                        <span className="hidden text-[11px] text-slate-400 sm:inline">
                          • Txn: {payment.transactionId}
                        </span>
                      )}
                    </p>
                  </div>

                  <div className="flex items-center lg:justify-center">
                    <span className="inline-flex h-8 items-center gap-1.5 rounded-xl border border-amber-400/35 bg-amber-400/10 px-3 text-xs font-black text-amber-950 dark:text-amber-200">
                      <CreditCard className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400" />
                      <span>৳ {amount}</span>
                    </span>
                  </div>

                  <div className="flex shrink-0 items-center justify-end gap-2">
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      disabled={isBusy}
                      onClick={() => handleToggleStatus(payment)}
                      className="h-8 gap-1.5 rounded-xl border-amber-400/40 bg-white/80 px-3 text-xs font-bold text-slate-800 hover:border-amber-500 hover:bg-amber-50 dark:border-amber-400/30 dark:bg-slate-950/70 dark:text-amber-200 dark:hover:border-amber-400/60 dark:hover:bg-amber-400/10 dark:hover:text-white"
                    >
                      <RefreshCw
                        className={`h-3.5 w-3.5 text-amber-600 dark:text-amber-400 ${
                          isBusy ? "animate-spin" : ""
                        }`}
                      />
                      <span>{paid ? "Mark Pending" : "Mark Paid"}</span>
                    </Button>

                    <Button
                      type="button"
                      size="sm"
                      disabled={isBusy}
                      onClick={() => handleDelete(payment)}
                      className="group relative h-8 gap-1.5 overflow-hidden rounded-xl border border-rose-500/40 bg-gradient-to-r from-rose-600 via-red-600 to-rose-500 px-3.5 text-xs font-extrabold text-white shadow-sm shadow-rose-600/20 transition-all duration-200 hover:-translate-y-0.5 hover:from-rose-500 hover:to-amber-500 hover:shadow-md hover:shadow-rose-500/30 active:scale-95 dark:border-rose-400/30 dark:from-rose-500/25 dark:via-rose-600/25 dark:to-amber-500/20 dark:text-rose-200 dark:hover:from-rose-500/40 dark:hover:to-amber-500/30 dark:hover:text-white"
                    >
                      <Trash2 className="h-3.5 w-3.5 transition-transform duration-200 group-hover:scale-110 group-hover:-rotate-12" />
                      <span>{isBusy ? "Working..." : "Delete"}</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}