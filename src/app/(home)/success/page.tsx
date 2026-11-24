import Link from "next/link";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  CreditCard,
  Mail,
  ReceiptText,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import { stripe } from "@/lib/stripe";

interface SuccessPageProps {
  searchParams: Promise<{ session_id?: string; returnTo?: string }>;
}

interface ReceiptData {
  receiptId?: string;
  email?: string;
  role?: string;
  planKey?: string;
  durationDays?: number;
  amountTotal?: number;
  currency?: string;
  planExpiresAt?: string;
  returnTo?: string;
}

const API_BASE = (
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"
).replace(/\/+$/, "");

const PLAN_LABEL: Record<string, string> = {
  student_1m: "Student Pro · 1 Month",
  student_3m: "Student Pro · 3 Months",
  teacher_1m: "Teacher Pro · 1 Month",
  teacher_3m: "Teacher Pro · 3 Months",
};

const planLabel = (planKey?: string) => {
  if (!planKey) return "MentorLagbe Pro";
  return (
    PLAN_LABEL[planKey] ||
    planKey
      .replace(/_/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase())
  );
};

const formatMoney = (amount?: number | null, currency?: string | null) => {
  if (amount == null) return "—";

  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: (currency || "usd").toUpperCase(),
    }).format(amount);
  } catch {
    return `${(currency || "USD").toUpperCase()} ${amount.toFixed(2)}`;
  }
};

const dashboardHref = (role?: string) => {
  const value = String(role || "").toLowerCase();

  if (value === "teachers" || value === "teacher") return "/dashboard/teachers";
  if (value === "admin") return "/dashboard/admin";
  if (value === "students" || value === "student") return "/dashboard/students";

  return "/dashboard";
};

const formatDate = (value?: string) => {
  if (!value) return "—";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export default async function Success({ searchParams }: SuccessPageProps) {
  const params = await searchParams;
  const sessionId = String(params.session_id || "").trim();

  if (!sessionId) {
    return (
      <StatusCard
        icon={<ShieldCheck className="h-10 w-10" />}
        tone="amber"
        badge="No payment session"
        title="Nothing to show here"
        message="This page opens after a successful Stripe checkout. Please choose a plan to continue."
      />
    );
  }

  let session;
  try {
    session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["line_items"],
    });
  } catch {
    return (
      <StatusCard
        icon={<ShieldCheck className="h-10 w-10" />}
        tone="rose"
        badge="Invalid session"
        title="We couldn't find that payment"
        message="The payment link is invalid or expired. If you were charged, please contact support with your receipt."
      />
    );
  }

  if (session.status === "open") {
    redirect("/pricing");
  }

  const meta = session.metadata || {};
  const email = session.customer_details?.email || meta.email || "";

  if (session.status !== "complete" || session.payment_status !== "paid") {
    return (
      <StatusCard
        icon={<CreditCard className="h-10 w-10" />}
        tone="amber"
        badge="Payment processing"
        title="We're waiting for Stripe"
        message="Your payment hasn't been confirmed yet. This can take a few moments — refresh this page in a minute."
        email={email}
      />
    );
  }

  // Stripe bolche payment paid — backend e receipt save + plan activate kori.
  let receipt: ReceiptData | null = null;
  if (email) {
    try {
      const res = await fetch(`${API_BASE}/VerifyPayment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId: session.id, email }),
        cache: "no-store",
      });
      const data = await res.json().catch(() => null);

      if (data?.verified && data?.receipt) {
        receipt = data.receipt as ReceiptData;
      }
    } catch {
      // Backend down thakleo Stripe-er data diye page ta dekhabo.
    }
  }

  const paidEmail = receipt?.email || email;
  const plan = planLabel(receipt?.planKey || meta.planKey);
  const duration = Number(receipt?.durationDays ?? meta.durationDays ?? 30) || 30;
  const amount =
    receipt?.amountTotal ??
    (session.amount_total != null ? session.amount_total / 100 : null);
  const currency = receipt?.currency || session.currency || "usd";
  const receiptId =
    receipt?.receiptId || `RCPT-${session.id.slice(-8).toUpperCase()}`;
  const returnTo = receipt?.returnTo || meta.returnTo || "";
  const goHref =
    returnTo && returnTo !== "/"
      ? returnTo
      : dashboardHref(receipt?.role || meta.role);

  return (
    <main className="relative min-h-[80vh] overflow-hidden bg-slate-50 px-4 py-10 text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100 sm:py-14">
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-emerald-400/20 blur-3xl dark:bg-emerald-400/10"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 right-0 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl dark:bg-cyan-400/10"
      />

      <div className="relative mx-auto max-w-3xl">
        <div className="overflow-hidden rounded-[2rem] border border-teal-600/20 bg-white/85 shadow-[0_30px_80px_-30px_rgba(13,148,136,0.45)] backdrop-blur-xl dark:border-cyan-400/20 dark:bg-slate-900/80">
          <div className="h-1.5 w-full bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400" />

          <div className="px-6 pb-8 pt-9 sm:px-10 sm:pb-10 sm:pt-12">
            <div className="text-center">
              <div className="relative mx-auto grid h-20 w-20 place-items-center rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 text-white shadow-xl shadow-emerald-500/30">
                <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400/30" />
                <CheckCircle2 className="relative h-10 w-10" />
              </div>

              <span className="mt-5 inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-50 px-3.5 py-1 text-[11px] font-black uppercase tracking-[0.16em] text-emerald-700 dark:border-emerald-400/30 dark:bg-emerald-400/10 dark:text-emerald-300">
                <Sparkles className="h-3.5 w-3.5" />
                Payment successful
              </span>

              <h1 className="mt-4 text-3xl font-black tracking-tight text-slate-900 dark:text-white sm:text-4xl">
                You&apos;re all set! 🎉
              </h1>

              <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-300 sm:text-base">
                We appreciate your business! A confirmation email will be sent
                to{" "}
                <span className="font-bold text-teal-700 dark:text-cyan-300">
                  {paidEmail || "your email"}
                </span>
                . If you have any questions, please email{" "}
                <a
                  href="mailto:hello@mentorlagbe.com"
                  className="font-semibold text-teal-700 underline decoration-teal-400/50 underline-offset-2 transition hover:text-teal-800 dark:text-cyan-300 dark:hover:text-cyan-200"
                >
                  hello@mentorlagbe.com
                </a>
                .
              </p>
            </div>

            {/* Receipt details */}
            <div className="mt-8 grid gap-3 rounded-2xl border border-slate-200/80 bg-slate-50/80 p-4 dark:border-slate-800 dark:bg-slate-950/50 sm:grid-cols-2">
              <Detail
                icon={<BadgeCheck className="h-4 w-4" />}
                label="Plan"
                value={plan}
              />
              <Detail
                icon={<CreditCard className="h-4 w-4" />}
                label="Amount paid"
                value={formatMoney(amount, currency)}
                valueClass="text-emerald-600 dark:text-emerald-400"
              />
              <Detail
                icon={<CalendarDays className="h-4 w-4" />}
                label="Duration"
                value={`${duration} days`}
              />
              <Detail
                icon={<Mail className="h-4 w-4" />}
                label="Account"
                value={paidEmail || "—"}
              />
              <Detail
                icon={<ReceiptText className="h-4 w-4" />}
                label="Receipt"
                value={receiptId}
              />
              <Detail
                icon={<ShieldCheck className="h-4 w-4" />}
                label="Valid until"
                value={formatDate(receipt?.planExpiresAt)}
              />
            </div>

            {/* Actions */}
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                href={goHref}
                className="group inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-teal-600 to-cyan-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-teal-600/25 transition hover:from-teal-500 hover:to-cyan-500 hover:shadow-teal-500/30 dark:from-cyan-400 dark:to-teal-400 dark:text-slate-950"
              >
                <span>Go to dashboard</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>

              <Link
                href="/browsetuitions"
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-teal-400/50 hover:text-teal-700 dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-200 dark:hover:border-cyan-400/40 dark:hover:text-cyan-300"
              >
                <BookOpen className="h-4 w-4" />
                <span>Browse tuitions</span>
              </Link>
            </div>

            <p className="mt-5 text-center text-xs text-slate-500 dark:text-slate-400">
              A receipt has been saved to your account. You can view it anytime
              from your dashboard.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

interface DetailProps {
  icon: ReactNode;
  label: string;
  value: string;
  valueClass?: string;
}

function Detail({ icon, label, value, valueClass = "" }: DetailProps) {
  return (
    <div className="flex items-start gap-3 rounded-xl bg-white/70 px-3.5 py-3 dark:bg-slate-900/60">
      <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-teal-500/10 text-teal-600 dark:bg-cyan-400/10 dark:text-cyan-300">
        {icon}
      </span>

      <div className="min-w-0">
        <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400 dark:text-slate-500">
          {label}
        </p>
        <p
          className={`mt-0.5 break-words text-sm font-bold text-slate-800 dark:text-slate-100 ${valueClass}`}
        >
          {value}
        </p>
      </div>
    </div>
  );
}

interface StatusCardProps {
  icon: ReactNode;
  tone: "amber" | "rose";
  badge: string;
  title: string;
  message: string;
  email?: string;
}

const TONE_CLASS: Record<StatusCardProps["tone"], string> = {
  amber:
    "border-amber-500/30 bg-amber-50 text-amber-600 dark:border-amber-400/30 dark:bg-amber-400/10 dark:text-amber-300",
  rose:
    "border-rose-500/30 bg-rose-50 text-rose-600 dark:border-rose-400/30 dark:bg-rose-400/10 dark:text-rose-300",
};

function StatusCard({
  icon,
  tone,
  badge,
  title,
  message,
  email,
}: StatusCardProps) {
  return (
    <main className="relative min-h-[70vh] overflow-hidden bg-slate-50 px-4 py-12 text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-amber-400/15 blur-3xl dark:bg-amber-400/10"
      />

      <div className="relative mx-auto max-w-xl">
        <div className="rounded-3xl border border-slate-200/80 bg-white/90 p-7 text-center shadow-xl shadow-slate-900/5 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/80 sm:p-9">
          <div
            className={`mx-auto grid h-20 w-20 place-items-center rounded-full border ${TONE_CLASS[tone]}`}
          >
            {icon}
          </div>

          <span className="mt-5 inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-slate-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400">
            {badge}
          </span>

          <h1 className="mt-3 text-2xl font-black tracking-tight text-slate-900 dark:text-white">
            {title}
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
            {message}
          </p>

          {email && (
            <p className="mt-2 break-words text-xs font-medium text-slate-500 dark:text-slate-400">
              Signed in as {email}
            </p>
          )}

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-teal-600 to-cyan-600 px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-teal-600/20 transition hover:from-teal-500 hover:to-cyan-500 dark:from-cyan-400 dark:to-teal-400 dark:text-slate-950"
            >
              View plans
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              Back home
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
