"use client";

import React from "react";
import {
  CheckCircle2,
  Clock,
  CreditCard,
  Mail,
  RefreshCw,
  Trash2,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export interface AdminPaymentItem {
  _id: string;
  userId?: string;
  userName?: string;
  name?: string;
  email?: string;
  userImage?: string;
  image?: string;
  photoURL?: string;
  avatar?: string;
  amount?: number | string;
  amountTotal?: number | string;
  currency?: string;
  payment?: boolean;
  status?: "paid" | "completed" | "pending" | "failed" | string;
  transactionId?: string;
  receiptId?: string;
  planKey?: string;
  createdAt?: string;
}

export function isPaymentPaid(item: Pick<AdminPaymentItem, "status" | "payment">) {
  if (item.payment === true) return true;
  const s = String(item.status || "").toLowerCase();
  return s === "paid" || s === "completed" || s === "success";
}

interface AdminPaymentRowCardProps {
  payment: AdminPaymentItem;
  isBusy: boolean;
  onToggleStatus: (payment: AdminPaymentItem) => void;
  onDelete: (payment: AdminPaymentItem) => void;
}

// হিন্ট (কী): Admin Payments লিস্টের প্রতিটি পেমেন্ট রো কার্ড—বাম পাশে ইউজারের ছবিসহ।
// হিন্ট (কেন): মূল AdminPaymentsView ফাইল ছোট রাখতে এবং পেমেন্টের সময় দেওয়া ইউজার ছবি বাম পাশে দেখাতে।
// হিন্ট (কীভাবে): userImage/image fallback সহ প্রোফাইল ছবি, Paid/Pending ব্যাজ ও action বাটন দেখানো হয়েছে।
export default function AdminPaymentRowCard({
  payment,
  isBusy,
  onToggleStatus,
  onDelete,
}: AdminPaymentRowCardProps) {
  const payerName = payment.userName || payment.name || "User Payment";
  const email = payment.email || "No email provided";
  const amount = Number(payment.amount ?? payment.amountTotal) || 0;
  const paid = isPaymentPaid(payment);
  const payerImage =
    payment.userImage || payment.image || payment.photoURL || payment.avatar || "";
  const refId = payment.receiptId || payment.transactionId;

  return (
    <Card className="rounded-2xl border border-amber-400/30 bg-white/85 text-slate-900 shadow-2xs backdrop-blur-md transition duration-200 hover:border-amber-500/55 hover:shadow-sm dark:border-amber-400/20 dark:bg-slate-900/75 dark:text-slate-100 dark:hover:border-amber-400/45">
      <CardContent className="flex flex-col justify-between gap-3 px-4 py-2.5 lg:flex-row lg:items-center lg:px-5 lg:py-3">
        {/* Left: User Image + Name, Status & Email */}
        <div className="flex min-w-0 flex-1 items-center gap-3.5">
          {payerImage ? (
            <img
              src={payerImage}
              alt={payerName}
              className="h-11 w-11 shrink-0 rounded-xl border border-amber-400/40 object-cover"
            />
          ) : (
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-amber-400/35 bg-amber-400/15 text-sm font-black text-amber-900 dark:text-amber-300">
              {payerName.charAt(0).toUpperCase()}
            </div>
          )}

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

              {payment.planKey && (
                <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-bold uppercase text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                  {payment.planKey}
                </span>
              )}
            </div>

            <p className="flex items-center gap-1.5 truncate text-xs text-slate-500 dark:text-slate-400">
              <Mail className="h-3.5 w-3.5 shrink-0 text-amber-600 dark:text-amber-400" />
              <span className="truncate">{email}</span>
              {refId && (
                <span className="hidden text-[11px] text-slate-400 sm:inline">
                  • #{refId}
                </span>
              )}
            </p>
          </div>
        </div>

        {/* Middle: Amount */}
        <div className="flex items-center lg:justify-center">
          <span className="inline-flex h-8 items-center gap-1.5 rounded-xl border border-amber-400/35 bg-amber-400/10 px-3 text-xs font-black text-amber-950 dark:text-amber-200">
            <CreditCard className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400" />
            <span>
              {payment.currency || "৳"} {amount}
            </span>
          </span>
        </div>

        {/* Right: Actions */}
        <div className="flex shrink-0 items-center justify-end gap-2">
          <Button
            type="button"
            size="sm"
            variant="outline"
            disabled={isBusy}
            onClick={() => onToggleStatus(payment)}
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
            onClick={() => onDelete(payment)}
            className="group relative h-8 gap-1.5 overflow-hidden rounded-xl border border-rose-500/40 bg-gradient-to-r from-rose-600 via-red-600 to-rose-500 px-3.5 text-xs font-extrabold text-white shadow-sm shadow-rose-600/20 transition-all duration-200 hover:-translate-y-0.5 hover:from-rose-500 hover:to-amber-500 hover:shadow-md hover:shadow-rose-500/30 active:scale-95 dark:border-rose-400/30 dark:from-rose-500/25 dark:via-rose-600/25 dark:to-amber-500/20 dark:text-rose-200 dark:hover:from-rose-500/40 dark:hover:to-amber-500/30 dark:hover:text-white"
          >
            <Trash2 className="h-3.5 w-3.5 transition-transform duration-200 group-hover:scale-110 group-hover:-rotate-12" />
            <span>{isBusy ? "Working..." : "Delete"}</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}