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
import DeletePaymentConfirmButton from "./DeletePaymentConfirmButton";

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

// হিন্ট (কী): payment === true অথবা status paid/completed/success হলে paid ধরা হচ্ছে।
// হিন্ট (কেন): ডাটাবেসে শুধু payment: true বা status: "paid" যেকোনো একটা থাকলেও যেন সঠিক স্ট্যাটাস দেখায়।
// হিন্ট (কীভাবে): Boolean(item.payment) এবং lowercase status চেক করা হয়েছে।
export function isPaymentPaid(
  item: Pick<AdminPaymentItem, "status" | "payment">
) {
  if (item.payment === true) return true;
  const s = String(item.status || "").toLowerCase();
  return s === "paid" || s === "completed" || s === "success";
}

// হিন্ট (কী): amount বা amountTotal যেটাতে টাকার মান আছে, সেখান থেকে সংখ্যা বের করা হচ্ছে।
// হিন্ট (কেন): ডাটাবেস ফিল্ড amountTotal হলে যেন ৳ 0 না দেখিয়ে আসল টাকা দেখায়।
// হিন্ট (কীভাবে): item.amountTotal ?? item.amount নিয়ে Number() করা হয়েছে।
export function getPaymentAmount(
  item: Pick<AdminPaymentItem, "amount" | "amountTotal">
) {
  const raw = item.amountTotal ?? item.amount;
  const parsed = Number(raw);
  return Number.isFinite(parsed) ? parsed : 0;
}

interface AdminPaymentRowCardProps {
  payment: AdminPaymentItem;
  isBusy: boolean;
  onToggleStatus: (payment: AdminPaymentItem) => void;
  onDelete: (payment: AdminPaymentItem) => void;
}

export default function AdminPaymentRowCard({
  payment,
  isBusy,
  onToggleStatus,
  onDelete,
}: AdminPaymentRowCardProps) {
  const payerName = payment.userName || payment.name || "User Payment";
  const email = payment.email || "No email provided";
  const amount = getPaymentAmount(payment);
  const paid = isPaymentPaid(payment);
  const payerImage =
    payment.userImage ||
    payment.image ||
    payment.photoURL ||
    payment.avatar ||
    "";
  const refId = payment.receiptId || payment.transactionId;

  return (
    <Card className="rounded-2xl border border-amber-400/30 bg-white/85 text-slate-900 shadow-2xs backdrop-blur-md transition duration-200 hover:border-amber-500/55 hover:shadow-sm dark:border-amber-400/20 dark:bg-slate-900/75 dark:text-slate-100 dark:hover:border-amber-400/45">
      <CardContent className="flex flex-col justify-between gap-3 px-4 py-2.5 lg:flex-row lg:items-center lg:px-5 lg:py-3">
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
                className={`h-5 gap-1 rounded-full border px-2 text-[10px] font-extrabold uppercase ${paid
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

        <div className="flex items-center lg:justify-center">
          <span className="inline-flex h-8 items-center gap-1.5 rounded-xl border border-amber-400/35 bg-amber-400/10 px-3 text-xs font-black text-amber-950 dark:text-amber-200">
            <CreditCard className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400" />
            <span>
              {payment.currency || "$"} {amount.toLocaleString()}
            </span>
          </span>
        </div>

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
              className={`h-3.5 w-3.5 text-amber-600 dark:text-amber-400 ${isBusy ? "animate-spin" : ""
                }`}
            />
            <span>{paid ? "Mark Pending" : "Mark Paid"}</span>
          </Button>

          <DeletePaymentConfirmButton
            payment={payment}
            isBusy={isBusy}
            onConfirmDelete={onDelete}
          />
        </div>
      </CardContent>
    </Card>
  );
}