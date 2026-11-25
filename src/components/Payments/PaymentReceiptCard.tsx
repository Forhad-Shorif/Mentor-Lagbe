"use client";

import React, { useEffect, useMemo, useState } from "react";
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
  createdAt?: string;
  planExpiresAt?: string;
  userImage?: string;
  image?: string;
  userName?: string;
  userEmail?: string;
  email?: string;
}

function normalizeEmail(value?: string | null): string {
  return (value || "").trim().toLowerCase();
}

function getReceiptOwnerEmail(receipt: PaymentReceiptItem): string {
  return normalizeEmail(receipt.userEmail || receipt.email);
}

function isReceiptPaid(receipt: PaymentReceiptItem): boolean {
  return Boolean(receipt.payment) || receipt.status?.toLowerCase() === "paid";
}

function getReceiptTimestamp(receipt: PaymentReceiptItem): number {
  const rawDate = receipt.paidAt || receipt.createdAt || receipt.planExpiresAt;
  if (!rawDate) return 0;
  const time = new Date(rawDate).getTime();
  return Number.isNaN(time) ? 0 : time;
}

// হিন্ট (কী): রশিদে role না থাকলেও রশিদের userEmail/email আর লগইন ইউজারের email মিলে গেলেই কেবল সেই রশিদ দেখানো হচ্ছে।
// হিন্ট (কেন): অন্য কোনো student বা tutor যেন অন্য কারও রশিদ দেখতে না পারে এবং Light/Dark থিমে কার্ডটি স্বাভাবিক দেখায়।
// হিন্ট (কীভাবে): loggedInEmail দিয়ে রশিদ ফিল্টার করে latest 1 pending + সব paid রশিদ রেন্ডার করা হয়েছে।
export default function PaymentReceiptCard() {
  const user = ClientUser() as {
    email?: string;
    name?: string;
    image?: string;
  } | null;

  const loggedInEmail = normalizeEmail(user?.email);
  const fallbackImage = user?.image || "";

  const [receipts, setReceipts] = useState<PaymentReceiptItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const backendUrl = process.env.NEXT_PUBLIC_API_URL || "";

  useEffect(() => {
    if (!loggedInEmail) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLoading(false);
      return;
    }

    let cancelled = false;

    async function loadReceipts() {
      setLoading(true);
      try {
        const base = backendUrl.replace(/\/+$/, "");
        const res = await fetch(
          `${base}/GetReceipts/${encodeURIComponent(loggedInEmail)}`,
          { cache: "no-store" }
        );

        if (!res.ok) {
          if (!cancelled) setReceipts([]);
          return;
        }

        const data = await res.json();
        const list: PaymentReceiptItem[] = Array.isArray(data)
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
  }, [backendUrl, loggedInEmail]);

  const visibleReceipts = useMemo(() => {
    if (!loggedInEmail) return [];

    // রশিদে email ফিল্ড থাকলে অবশ্যই লগইন ইউজারের email-এর সাথে মিলতে হবে
    const ownedReceipts = receipts.filter((item) => {
      const ownerEmail = getReceiptOwnerEmail(item);
      return !ownerEmail || ownerEmail === loggedInEmail;
    });

    const paidReceipts = ownedReceipts.filter((item) => isReceiptPaid(item));
    const pendingReceipts = ownedReceipts
      .filter((item) => !isReceiptPaid(item))
      .sort((a, b) => getReceiptTimestamp(b) - getReceiptTimestamp(a));

    return [...pendingReceipts.slice(0, 1), ...paidReceipts];
  }, [receipts, loggedInEmail]);

  if (loading) {
    return (
      <div className="space-y-2.5">
        <div className="h-16 w-full animate-pulse rounded-2xl border border-slate-200 bg-slate-100/90 dark:border-slate-800 dark:bg-slate-900/70" />
      </div>
    );
  }

  if (!loggedInEmail) {
    return (
      <div className="flex w-full items-center gap-3 rounded-2xl border border-slate-200/90 bg-white/80 px-4 py-3 text-xs text-slate-600 shadow-2xs dark:border-slate-800/90 dark:bg-slate-950/80 dark:text-slate-400">
        <ReceiptText className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
        <span>Sign in to view your payment receipts.</span>
      </div>
    );
  }

  if (!visibleReceipts.length) {
    return (
      <div className="flex w-full items-center gap-3 rounded-2xl border border-slate-200/90 bg-white/80 px-4 py-3 text-xs text-slate-600 shadow-2xs dark:border-slate-800/90 dark:bg-slate-950/80 dark:text-slate-400">
        <ReceiptText className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
        <span>No payment receipts found yet.</span>
      </div>
    );
  }

  return (
    <div className="space-y-2.5">
      {visibleReceipts.map((receipt, idx) => {
        const isPaid = isReceiptPaid(receipt);
        const leftImg = receipt.userImage || receipt.image || fallbackImage;

        return (
          <div
            key={receipt.receiptId || `${idx}-${receipt.planKey}`}
            className="flex w-full flex-col justify-between gap-3 rounded-2xl border border-slate-200/90 bg-white/90 px-4 py-3 text-slate-900 shadow-xs backdrop-blur-xl transition-all duration-200 hover:border-cyan-500/45 dark:border-slate-800/90 dark:bg-slate-950/85 dark:text-slate-100 dark:hover:border-cyan-400/40 sm:flex-row sm:items-center sm:px-5"
          >
            {/* Left: Image + Short Heading & Plan */}
            <div className="flex min-w-0 items-center gap-3.5">
              {leftImg ? (
                <img
                  src={leftImg}
                  alt={receipt.userName || user?.name || receipt.planKey}
                  className="h-11 w-11 shrink-0 rounded-xl border border-cyan-500/30 object-cover dark:border-cyan-400/30"
                />
              ) : (
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-cyan-500/25 bg-cyan-500/10 text-cyan-700 dark:border-cyan-400/25 dark:bg-cyan-400/10 dark:text-cyan-300">
                  <ReceiptText className="h-5 w-5" />
                </div>
              )}

              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-700 dark:text-cyan-300">
                    Payment Receipt
                  </span>
                  <span className="truncate text-xs font-semibold text-slate-500 dark:text-slate-400">
                    #{receipt.receiptId}
                  </span>
                </div>

                <p className="truncate text-sm font-bold text-slate-900 dark:text-white">
                  {receipt.planKey}
                  {receipt.durationDays ? ` • ${receipt.durationDays} Days` : ""}
                </p>
              </div>
            </div>

            {/* Right: Expiry, Amount & Status */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-slate-200/80 pt-2.5 dark:border-white/10 sm:justify-end sm:border-t-0 sm:pt-0">
              {receipt.planExpiresAt && (
                <span className="inline-flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                  <CalendarClock className="h-3.5 w-3.5 text-cyan-600 dark:text-cyan-400" />
                  <span>
                    {new Date(receipt.planExpiresAt).toLocaleDateString()}
                  </span>
                </span>
              )}

              <span className="text-sm font-extrabold text-slate-900 dark:text-white">
                {receipt.currency || "$"} {receipt.amountTotal}
              </span>

              <span
                className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-bold ${
                  isPaid
                    ? "bg-emerald-500/15 text-emerald-700 dark:bg-emerald-400/15 dark:text-emerald-300"
                    : "bg-amber-500/15 text-amber-700 dark:bg-amber-400/15 dark:text-amber-300"
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