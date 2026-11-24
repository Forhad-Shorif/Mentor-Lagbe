"use client";

import React, { useEffect, useState } from "react";
import {
  CalendarClock,
  CheckCircle2,
  Clock,
  ReceiptText,
} from "lucide-react";
import ClientUser from "@/lib/ClientUser";

export interface PaymentReceiptItem {
  receiptId: string;
  planKey: string;
  durationDays?: number;
  amountTotal: number;
  currency?: string;
  payment?: boolean;
  status?: string;
  paidAt?: string;
  planExpiresAt?: string;
  userImage?: string;
  image?: string;
  userName?: string;
}

// হিন্ট (কী): কোনো props ছাড়াই ClientUser থেকে email ও image নিয়ে /GetReceipts/:email থেকে রশিদ লোড করা হচ্ছে।
// হিন্ট (কেন): Student ও Teacher প্রোফাইলে শুধু <PaymentReceiptCard /> বসালেই যেন নিজের রশিদ ও ছবি অটো চলে আসে।
// হিন্ট (কীভাবে): ClientUser() থেকে logged-in user নিয়ে বাম পাশে ছবি ও ডান পাশে রশিদ তথ্য দেখানো হয়েছে।
export default function PaymentReceiptCard() {
  const user = ClientUser() as {
    email?: string;
    name?: string;
    image?: string;
  } | null;

  const userEmail = user?.email || "";
  const fallbackImage = user?.image || "";

  const [receipts, setReceipts] = useState<PaymentReceiptItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const backendUrl = (
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"
  ).replace(/\/+$/, "");

  useEffect(() => {
    if (!userEmail) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLoading(false);
      return;
    }

    let cancelled = false;

    async function loadReceipts() {
      setLoading(true);
      try {
        const res = await fetch(
          `${backendUrl}/GetReceipts/${encodeURIComponent(userEmail)}`,
          { cache: "no-store" }
        );
        if (!res.ok) {
          if (!cancelled) setReceipts([]);
          return;
        }

        const data = await res.json();
        const list = Array.isArray(data)
          ? data
          : Array.isArray(data?.receipts)
          ? data.receipts
          : [];

        if (!cancelled) {
          setReceipts(list);
        }
      } catch {
        if (!cancelled) setReceipts([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadReceipts();

    return () => {
      cancelled = true;
    };
  }, [backendUrl, userEmail]);

  if (loading) {
    return (
      <div className="space-y-2.5">
        <div className="h-16 w-full animate-pulse rounded-2xl border border-slate-800 bg-slate-900/70" />
        <div className="h-16 w-full animate-pulse rounded-2xl border border-slate-800 bg-slate-900/70" />
      </div>
    );
  }

  if (!userEmail) {
    return (
      <div className="flex w-full items-center gap-3 rounded-2xl border border-slate-800/90 bg-slate-950/80 px-4 py-3 text-xs text-slate-400">
        <ReceiptText className="h-4 w-4 text-cyan-400" />
        <span>Sign in to view your payment receipts.</span>
      </div>
    );
  }

  if (!receipts.length) {
    return (
      <div className="flex w-full items-center gap-3 rounded-2xl border border-slate-800/90 bg-slate-950/80 px-4 py-3 text-xs text-slate-400">
        <ReceiptText className="h-4 w-4 text-cyan-400" />
        <span>No payment receipts found yet.</span>
      </div>
    );
  }

  return (
    <div className="space-y-2.5">
      {receipts.map((receipt) => {
        const isPaid = Boolean(receipt.payment) || receipt.status === "paid";
        const leftImg = receipt.userImage || receipt.image || fallbackImage;

        return (
          <div
            key={receipt.receiptId}
            className="flex w-full flex-col justify-between gap-3 rounded-2xl border border-slate-800/90 bg-slate-950/90 px-4 py-3 text-white shadow-sm transition hover:border-cyan-400/35 sm:flex-row sm:items-center sm:px-5"
          >
            {/* Left: Image + Short Heading & Plan */}
            <div className="flex min-w-0 items-center gap-3.5">
              {leftImg ? (
                <img
                  src={leftImg}
                  alt={receipt.userName || user?.name || receipt.planKey}
                  className="h-11 w-11 shrink-0 rounded-xl border border-cyan-400/35 object-cover"
                />
              ) : (
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-cyan-400/25 bg-cyan-400/10 text-cyan-300">
                  <ReceiptText className="h-5 w-5" />
                </div>
              )}

              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-300">
                    Payment Receipt
                  </span>
                  <span className="truncate text-xs font-semibold text-slate-400">
                    #{receipt.receiptId}
                  </span>
                </div>

                <p className="truncate text-sm font-bold text-white">
                  {receipt.planKey}
                  {receipt.durationDays ? ` • ${receipt.durationDays} Days` : ""}
                </p>
              </div>
            </div>

            {/* Right: Expiry, Amount & Status */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-2.5 sm:justify-end sm:border-t-0 sm:pt-0">
              {receipt.planExpiresAt && (
                <span className="inline-flex items-center gap-1 text-xs text-slate-400">
                  <CalendarClock className="h-3.5 w-3.5 text-cyan-400" />
                  <span>
                    {new Date(receipt.planExpiresAt).toLocaleDateString()}
                  </span>
                </span>
              )}

              <span className="text-sm font-extrabold text-white">
                {receipt.currency || "$"} {receipt.amountTotal}
              </span>

              <span
                className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-bold ${
                  isPaid
                    ? "bg-emerald-400/15 text-emerald-300"
                    : "bg-amber-400/15 text-amber-300"
                }`}
              >
                {isPaid ? (
                  <>
                    <CheckCircle2 className="h-3 w-3" />
                    <span>Paid</span>
                  </>
                ) : (
                  <>
                    <Clock className="h-3 w-3" />
                    <span>Pending</span>
                  </>
                )}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}