"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  ArrowRight,
  BookmarkCheck,
  CheckCircle2,
  GraduationCap,
  Loader2,
  Sparkles,
  Zap,
} from "lucide-react";
import { showToast } from "@/lib/utils/toast";

interface StudentPlanSectionProps {
  studentEmail?: string;
  studentId?: string;
  studentName?: string;
  studentImage?: string;
  currentPlan?: "free" | "pro";
  returnTo?: string;
}

export default function StudentPlanSection({
  studentEmail,
  studentId,
  studentName = "",
  studentImage = "",
  currentPlan = "free",
  returnTo,
}: StudentPlanSectionProps) {
  const router = useRouter();
  const pathname = usePathname();

  const [loadingPlan, setLoadingPlan] = useState<"free" | "pro" | null>(null);
  const [billingCycle, setBillingCycle] = useState<"monthly" | "quarterly">("monthly");
  const [isActiveFromBackend, setIsActiveFromBackend] = useState(currentPlan === "pro");
  const [planExpiresAt, setPlanExpiresAt] = useState<string | null>(null);

  // হিন্ট (কী): ব্যাকএন্ড URL এবং পেমেন্ট শেষে ফেরার ঠিকানা (returnTo) ঠিক করা হচ্ছে।
  // হিন্ট (কেন): পেমেন্ট বা রশিদ ফ্লোতে ইউজার যেন সঠিক পেজে ফিরতে পারে এবং ব্যাকএন্ড ঠিকমতো কল হয়।
  // হিন্ট (কীভাবে): props-এ returnTo না থাকলে বর্তমান pathname নেওয়া হচ্ছে।
  // হিন্ট: env miss হলে আগের মতো `undefined/GetPlanStatus/...` কল হয়ে স্ট্যাটাস চুপচাপ হারিয়ে যেত,
  // তাই localhost fallback যোগ করা হলো।
  const backendUrl =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
    
  const targetReturnTo = returnTo || pathname || "/dashboard";

  const proPrice = billingCycle === "monthly" ? 10 : 27;
  const durationDays = billingCycle === "monthly" ? 30 : 90;
  const planKey = billingCycle === "monthly" ? "student_1m" : "student_3m";

  // হিন্ট: `amount` ডলারে পাঠানো হয় (সেন্টে নয়) — ব্যাকএন্ড /PaymentPending এটাকে
  //   সরাসরি amountTotal হিসেবে সেভ করে এবং অ্যাডমিন/রশিদ কার্ডে সেটাই দেখায়।
  //   আগে সেন্ট (১০০০) যেত, তাই pending রেকর্ডে "$1000" দেখাত।
  //   আসল চার্জ হয় Stripe Price ID থেকে, তাই এখানকার সংখ্যা শুধু রেকর্ড/প্রদর্শনের জন্য।

  // হিন্ট (কী): স্টুডেন্টের ইমেইল থাকলে ব্যাকএন্ড থেকে প্ল্যানের মেয়াদ ও active অবস্থা যাচাই করা হচ্ছে।
  // হিন্ট (কেন): মেয়াদ শেষ হলে বা পেমেন্ট রেকর্ড মুছে গেলে যেন আবার আপগ্রেড করতে পারে,
  // আর সত্যিই active থাকলে ডুপ্লিকেট পেমেন্ট না হয়।
  // হিন্ট (কীভাবে): /GetPlanStatus/:email কল করে isActivePlan state আপডেট করা হচ্ছে।
  // ব্যাকএন্ড কিছু ফেরত না দিলে বা কল fail করলে বাটন disable হবে না (currentPlan prop-ই থাকবে)।
  useEffect(() => {
    let cancelled = false;

    // হিন্ট: ইমেইল না থাকলে ব্যাকএন্ডে জিজ্ঞেস করার কিছু নেই — initial state-ই থাকবে।
    if (!studentEmail) return;

    fetch(`${backendUrl}/GetPlanStatus/${encodeURIComponent(studentEmail)}`, {
      cache: "no-store",
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (cancelled || !data) return;

        if (typeof data?.isActivePlan === "boolean") {
          setIsActiveFromBackend(data.isActivePlan);
        }
        setPlanExpiresAt(data?.planExpiresAt || null);
      })
      .catch(() => {
        // ব্যাকএন্ড স্ট্যাটাস না এলে currentPlan prop-এর ওপর নির্ভর করবে
      });

    return () => {
      cancelled = true;
    };
  }, [backendUrl, studentEmail, currentPlan]);

  // হিন্ট (কী): Stripe থেকে Back করলে ব্রাউজার bfcache থেকে পুরনো state ফিরিয়ে দিতে পারে।
  // হিন্ট (কেন): তখন loadingPlan === "pro" রয়ে গিয়ে বাটন চিরতরে "Connecting to Stripe..." + disabled দেখাত।
  // হিন্ট (কীভাবে): pageshow ইভেন্টে loading state রিসেট করা হচ্ছে।
  useEffect(() => {
    const resetLoadingState = () => setLoadingPlan(null);

    window.addEventListener("pageshow", resetLoadingState);

    return () => {
      window.removeEventListener("pageshow", resetLoadingState);
    };
  }, []);

  const planExpiryLabel = planExpiresAt
    ? new Date(planExpiresAt).toLocaleDateString(undefined, {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "";

  const handleStudentStripeUpgrade = async (plan: "free" | "pro") => {
    if (plan === "free") {
      showToast.error(
        "You are already on the Free Student plan (up to 2 bookmarks)."
      );
      return;
    }

    // হিন্ট (কী): লগইন না থাকলে returnTo সহ login পেজে পাঠানোর guard।
    // হিন্ট (কেন): ইমেইল ছাড়া পেমেন্ট বা রশিদ ইউজারের সাথে যুক্ত করা যাবে না।
    // হিন্ট (কীভাবে): studentEmail না থাকলে /login-এ redirect করা হচ্ছে।
    if (!studentEmail) {
      showToast.error("Please log in as a student first.");
      const nextUrl = `${pathname}?returnTo=${encodeURIComponent(targetReturnTo)}`;
      router.push(`/sign-in?callbackUrl=${encodeURIComponent(nextUrl)}`);
      return;
    }

    // হিন্ট (কী): আগে থেকেই active plan থাকলে ডুপ্লিকেট চেকআউট আটকে দেওয়া হচ্ছে।
    // হিন্ট (কেন): মেয়াদ থাকা অবস্থায় ভুল করে দুবার পেমেন্ট হওয়া ঠেকাতে।
    // হিন্ট (কীভাবে): isActiveFromBackend সত্য হলে এখানেই থামিয়ে toast দেখানো হচ্ছে।
    if (isActiveFromBackend) {
      showToast.error(
        planExpiryLabel
          ? `Your Student Pro Pass is already active till ${planExpiryLabel}.`
          : "Your Student Pro Pass is already active."
      );
      return;
    }

    try {
      setLoadingPlan(plan);

      const payload = {
        email: studentEmail,
        name: studentName,
        image: studentImage,
        role: "student",
        planKey,
        billingCycle,
        durationDays,
        amount: proPrice,
        userId: studentId || "",
        returnTo: targetReturnTo,
      };

      // হিন্ট (কী): Stripe-এ যাওয়ার আগে payment: false দিয়ে pending রেকর্ড সেভ করা হচ্ছে।
      // হিন্ট (কেন): ইউজার পেমেন্ট না করে ব্যাক করলে রেকর্ডটি payment: false হিসেবে থেকে যাবে।
      // হিন্ট (কীভাবে): /PaymentPending এ POST রিকোয়েস্ট পাঠানো হচ্ছে।
      const pendingRes = await fetch(`${backendUrl}/PaymentPending`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!pendingRes.ok) {
        showToast.error("Could not initialize pending payment record");
        return;
      }

      // হিন্ট (কী): Stripe Checkout Session তৈরি করে ইউজারকে Stripe পেজে পাঠানো হচ্ছে।
      // হিন্ট (কেন): নিরাপদ কার্ড পেমেন্ট নেওয়ার জন্য Stripe Checkout Session URL দরকার।
      // হিন্ট (কীভাবে): checkout route কল করে data.url পেলে window.location.href দিয়ে পাঠানো হচ্ছে।
      const res = await fetch(`/api/checkout_sessions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => null);

      if (data?.url) {
        sessionStorage.setItem("stripe_checkout_started", "true");
        window.location.href = data.url;
        return;
      }

      showToast.error(data?.message || "Failed to redirect to Stripe checkout");
    } catch (error) {
      console.error("Student Stripe checkout error:", error);
      showToast.error("Could not start Stripe payment");
    } finally {
      setLoadingPlan(null);
    }
  };

  return (
    <section className="overflow-hidden rounded-3xl border border-slate-200/90 bg-white/95 shadow-sm dark:border-slate-800/90 dark:bg-slate-900/80">
      {/* Top Bar */}
      <div className="flex flex-col justify-between gap-4 border-b border-slate-200/80 bg-gradient-to-r from-teal-500/10 via-cyan-500/5 to-sky-500/10 px-5 py-5 dark:border-slate-800 dark:from-teal-500/15 dark:via-slate-900 dark:to-cyan-500/10 sm:flex-row sm:items-center sm:px-7">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-lg bg-teal-600/10 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-teal-800 dark:bg-cyan-400/15 dark:text-cyan-300">
            <GraduationCap className="h-3.5 w-3.5" />
            <span>Student Pass</span>
          </span>
          <h2 className="mt-2 text-xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-2xl">
            Smart Learning Plans for Students
          </h2>
          <p className="mt-1 text-xs text-slate-600 dark:text-slate-300 sm:text-sm">
            Save tuitions, apply faster, and unlock priority mentor access via Stripe.
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="inline-flex shrink-0 self-start rounded-xl border border-slate-200 bg-white p-1 dark:border-slate-800 dark:bg-slate-950 sm:self-center">
          <button
            type="button"
            onClick={() => setBillingCycle("monthly")}
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${billingCycle === "monthly"
                ? "bg-teal-700 text-white dark:bg-cyan-400 dark:text-slate-950"
                : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
              }`}
          >
            Monthly
          </button>
          <button
            type="button"
            onClick={() => setBillingCycle("quarterly")}
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${billingCycle === "quarterly"
                ? "bg-teal-700 text-white dark:bg-cyan-400 dark:text-slate-950"
                : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
              }`}
          >
            3 Months (Save $3)
          </button>
        </div>
      </div>

      {/* Split Layout */}
      <div className="grid grid-cols-1 divide-y divide-slate-200/80 dark:divide-slate-800 lg:grid-cols-12 lg:divide-x lg:divide-y-0">
        {/* Free Student */}
        <div className="flex flex-col justify-between p-5 sm:p-7 lg:col-span-5">
          <div>
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                <BookmarkCheck className="h-4 w-4 text-slate-500 dark:text-slate-400" />
                <span>Student Free</span>
              </span>
              <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                $0 / mo
              </span>
            </div>

            <div className="mt-4 rounded-2xl border border-slate-200/80 bg-slate-50/80 p-4 dark:border-slate-800 dark:bg-slate-950/60">
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                Starter Allowance
              </p>
              <p className="mt-1 text-2xl font-black text-slate-900 dark:text-white">
                Up to 2 Bookmarks
              </p>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                Browse tuitions and submit direct applications.
              </p>
            </div>

            <ul className="mt-5 space-y-2.5 text-xs text-slate-600 dark:text-slate-300 sm:text-sm">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-slate-400" />
                <span>Bookmark up to 2 tuitions</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-slate-400" />
                <span>Direct tuition applications</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-slate-400" />
                <span>Standard search & subject filters</span>
              </li>
            </ul>
          </div>

          <button
            type="button"
            onClick={() => handleStudentStripeUpgrade("free")}
            className="mt-6 w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300 dark:hover:bg-slate-900 sm:text-sm"
          >
            {!isActiveFromBackend ? "Active: Student Free" : "Student Free"}
          </button>
        </div>

        {/* Student Pro */}
        <div className="flex flex-col justify-between bg-gradient-to-br from-teal-500/[0.06] via-transparent to-cyan-500/[0.08] p-5 dark:from-cyan-400/[0.08] dark:to-teal-400/[0.06] sm:p-7 lg:col-span-7">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-600/15 px-3 py-1 text-[11px] font-bold text-teal-800 dark:bg-cyan-400/15 dark:text-cyan-300">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Student Pro</span>
              </span>
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-teal-700 dark:text-cyan-300">
                <Zap className="h-3.5 w-3.5" />
                <span>Faster Matching</span>
              </span>
            </div>

            <div className="mt-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
              <div>
                <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
                  Student Pro Pass
                </h3>
                <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">
                  Save unlimited tuitions, get faster mentor responses, and study smarter.
                </p>

                {isActiveFromBackend && (
                  <span className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-emerald-500/35 bg-emerald-500/10 px-3 py-1 text-[11px] font-bold text-emerald-700 dark:border-emerald-400/35 dark:bg-emerald-400/10 dark:text-emerald-300">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    <span>
                      {planExpiryLabel
                        ? `Pro Pass Active · till ${planExpiryLabel}`
                        : "Pro Pass Active"}
                    </span>
                  </span>
                )}
              </div>

              <div className="text-left sm:text-right">
                <span className="text-3xl font-black tracking-tight text-slate-900 dark:text-white sm:text-4xl">
                  ${proPrice}
                </span>
                <span className="ml-1 text-xs font-medium text-slate-500 dark:text-slate-400">
                  / {billingCycle === "monthly" ? "month" : "3 months"}
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-teal-600/20 bg-white/80 p-3 text-xs dark:border-cyan-400/20 dark:bg-slate-950/70">
                <p className="font-bold text-slate-900 dark:text-white">
                  Unlimited Bookmarks
                </p>
                <p className="mt-0.5 text-slate-500 dark:text-slate-400">
                  Save all your preferred tutors and batches in one place.
                </p>
              </div>

              <div className="rounded-xl border border-teal-600/20 bg-white/80 p-3 text-xs dark:border-cyan-400/20 dark:bg-slate-950/70">
                <p className="font-bold text-slate-900 dark:text-white">
                  Priority Application Tag
                </p>
                <p className="mt-0.5 text-slate-500 dark:text-slate-400">
                  Stand out to teachers when you apply for a tuition.
                </p>
              </div>

              <div className="rounded-xl border border-teal-600/20 bg-white/80 p-3 text-xs dark:border-cyan-400/20 dark:bg-slate-950/70">
                <p className="font-bold text-slate-900 dark:text-white">
                  Instant Alerts
                </p>
                <p className="mt-0.5 text-slate-500 dark:text-slate-400">
                  Get notified quickly about matching subjects & slots.
                </p>
              </div>

              <div className="rounded-xl border border-teal-600/20 bg-white/80 p-3 text-xs dark:border-cyan-400/20 dark:bg-slate-950/70">
                <p className="font-bold text-slate-900 dark:text-white">
                  Stripe Checkout
                </p>
                <p className="mt-0.5 text-slate-500 dark:text-slate-400">
                  Simple and secure payment with instant activation.
                </p>
              </div>
            </div>
          </div>

          <button
            type="button"
            disabled={loadingPlan === "pro" || isActiveFromBackend}
            onClick={() => handleStudentStripeUpgrade("pro")}
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-teal-700 to-cyan-600 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:brightness-105 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 dark:from-cyan-400 dark:to-teal-400 dark:text-slate-950 dark:shadow-[0_0_24px_rgba(34,211,238,0.25)]"
          >
            {loadingPlan === "pro" ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Connecting to Stripe...</span>
              </>
            ) : (
              <>
                <span>
                  {isActiveFromBackend
                    ? planExpiryLabel
                      ? `Pro Pass Active · till ${planExpiryLabel}`
                      : "Pro Pass Active"
                    : "Update Plan"}
                </span>
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  );
}