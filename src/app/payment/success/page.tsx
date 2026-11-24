"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ArrowRight,
  CheckCircle2,
  Loader2,
  ReceiptText,
  ShieldAlert,
} from "lucide-react";

interface ReceiptData {
  receiptId: string;
  sessionId: string;
  email: string;
  name?: string;
  role?: string;
  planKey: string;
  durationDays: number;
  amountTotal: number;
  currency: string;
  payment: boolean;
  status: string;
  paidAt?: string;
  planExpiresAt?: string;
  returnTo?: string;
}

// হিন্ট (কী): লগইন করা ইউজারের তথ্য পড়ার ছোট helper ফাংশন।
// হিন্ট (কেন): লগইন ছাড়া বা অন্য কারো সেশন দিয়ে সরাসরি success পেজে ঢোকা আটকাতে।
// হিন্ট (কীভাবে): localStorage থেকে currentUser অবজেক্ট নিরাপদে parse করে।
function getLoggedInUser() {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem("currentUser");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export default function PaymentSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = (searchParams.get("session_id") || "").trim();

  const backendUrl =
    process.env.NEXT_PUBLIC_BACKEND_URL ||
    process.env.NEXT_PUBLIC_API_URL ||
    "http://localhost:8000";

  const [verifying, setVerifying] = useState(true);
  const [verified, setVerified] = useState(false);
  const [blockedMsg, setBlockedMsg] = useState("");
  const [receipt, setReceipt] = useState<ReceiptData | null>(null);

  // হিন্ট (কী): সরাসরি URL টাইপ করে বা ভুল session_id দিয়ে ঢোকার চেষ্টা আটকে আসল Stripe পেমেন্ট যাচাই করা হচ্ছে।
  // হিন্ট (কেন): কেউ যেন search bar/URL লিখে বা ভুয়া লিংক দিয়ে success/receipt পেজে ঢুকতে না পারে।
  // হিন্ট (কীভাবে): session_id format, checkout initiation flag ও /VerifyPayment যাচাই করে তবেই রশিদ দেখায়।
  useEffect(() => {
    let isCancelled = false;

    async function guardAndVerify() {
      const currentUser = getLoggedInUser();
      const pendingCheckoutRaw =
        typeof window !== "undefined"
          ? sessionStorage.getItem("stripe_checkout_started")
          : null;

      // Guard 1: আসল Stripe session_id (cs_...) না থাকলে সরাসরি প্রবেশ ব্লক
      const looksLikeStripeSession = sessionId.startsWith("cs_");
      if (!looksLikeStripeSession) {
        if (!isCancelled) {
          setBlockedMsg("Direct access is not allowed without a valid Stripe payment session.");
          setVerifying(false);
          setVerified(false);
        }
        return;
      }

      // Guard 2: লগইন ইউজার না থাকলে লগইনে পাঠানো
      if (!currentUser?.email) {
        router.replace("/login");
        return;
      }

      // Guard 3: এই ব্রাউজার থেকে checkout শুরু না হয়ে থাকলে ব্লক করা
      if (!pendingCheckoutRaw) {
        if (!isCancelled) {
          setBlockedMsg("Invalid or expired checkout navigation. Please start from your plan page.");
          setVerifying(false);
          setVerified(false);
        }
        return;
      }

      try {
        setVerifying(true);
        setBlockedMsg("");

        const res = await fetch(`${backendUrl}/VerifyPayment`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            sessionId,
            email: currentUser.email,
          }),
        });

        const data = await res.json();

        if (isCancelled) return;

        if (!res.ok || !data?.verified || !data?.receipt) {
          setVerified(false);
          setBlockedMsg(data?.message || data?.error || "Payment verification failed.");
          return;
        }

        // যাচাই সফল হলে one-time checkout flag মুছে ফেলা হচ্ছে
        sessionStorage.removeItem("stripe_checkout_started");

        setVerified(true);
        setReceipt(data.receipt);
      } catch (err) {
        if (isCancelled) return;
        setVerified(false);
        setBlockedMsg("Could not verify payment with server.");
      } finally {
        if (!isCancelled) {
          setVerifying(false);
        }
      }
    }

    guardAndVerify();

    return () => {
      isCancelled = true;
    };
  }, [backendUrl, router, sessionId]);

  const backTarget = receipt?.returnTo || "/dashboard";

  return (
    <main className="mx-auto flex min-h-[75vh] max-w-2xl items-center px-4 py-12">
      <div className="w-full rounded-3xl border border-slate-200/90 bg-white/95 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/85 sm:p-8">
        {/* Loading State */}
        {verifying && (
          <div className="py-10 text-center">
            <Loader2 className="mx-auto h-10 w-10 animate-spin text-cyan-600 dark:text-cyan-400" />
            <h1 className="mt-4 text-xl font-extrabold text-slate-900 dark:text-white">
              Verifying Your Payment...
            </h1>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Checking your Stripe session securely.
            </p>
          </div>
        )}

        {/* Blocked / Unverified State */}
        {!verifying && !verified && (
          <div className="py-6 text-center">
            <ShieldAlert className="mx-auto h-12 w-12 text-amber-500" />
            <h1 className="mt-4 text-2xl font-extrabold text-slate-900 dark:text-white">
              Restricted Access
            </h1>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
              {blockedMsg || "You can only view this page after completing a valid checkout."}
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link
                href="/pricing"
                className="rounded-xl bg-cyan-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-cyan-500"
              >
                Go to Pricing
              </Link>
              <Link
                href="/dashboard"
                className="rounded-xl border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                Back to Dashboard
              </Link>
            </div>
          </div>
        )}

        {/* Verified Receipt View */}
        {!verifying && verified && receipt && (
          <div>
            <div className="flex flex-col items-start justify-between gap-4 border-b border-slate-200 pb-6 dark:border-slate-800 sm:flex-row sm:items-center">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="h-7 w-7" />
                </div>
                <div>
                  <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                    Payment Successful
                  </span>
                  <h1 className="text-2xl font-black text-slate-900 dark:text-white">
                    Plan Activated
                  </h1>
                </div>
              </div>

              <div className="inline-flex items-center gap-1.5 rounded-xl bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                <ReceiptText className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
                <span>{receipt.receiptId}</span>
              </div>
            </div>

            {/* Receipt Details */}
            <div className="mt-6 space-y-3 rounded-2xl border border-slate-200/80 bg-slate-50/80 p-4 text-sm dark:border-slate-800 dark:bg-slate-950/60">
              <div className="flex justify-between gap-4">
                <span className="text-slate-500 dark:text-slate-400">Email</span>
                <span className="font-semibold text-slate-900 dark:text-white">
                  {receipt.email}
                </span>
              </div>

              <div className="flex justify-between gap-4">
                <span className="text-slate-500 dark:text-slate-400">Plan</span>
                <span className="font-semibold uppercase text-slate-900 dark:text-white">
                  {receipt.planKey}
                </span>
              </div>

              <div className="flex justify-between gap-4">
                <span className="text-slate-500 dark:text-slate-400">Duration</span>
                <span className="font-semibold text-slate-900 dark:text-white">
                  {receipt.durationDays} Days
                </span>
              </div>

              <div className="flex justify-between gap-4">
                <span className="text-slate-500 dark:text-slate-400">Amount Paid</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">
                  {receipt.currency} {receipt.amountTotal}
                </span>
              </div>

              <div className="flex justify-between gap-4">
                <span className="text-slate-500 dark:text-slate-400">Valid Until</span>
                <span className="font-semibold text-slate-900 dark:text-white">
                  {receipt.planExpiresAt
                    ? new Date(receipt.planExpiresAt).toLocaleDateString()
                    : "N/A"}
                </span>
              </div>
            </div>

            {/* Return Action */}
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                href={backTarget}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-600 to-teal-600 px-5 py-3 text-sm font-bold text-white transition hover:brightness-105 dark:from-cyan-400 dark:to-teal-400 dark:text-slate-950"
              >
                <span>Continue to Your Page</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}