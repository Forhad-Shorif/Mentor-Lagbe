"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  ArrowRight,
  CheckCircle2,
  Flame,
  Layers,
  Loader2,
  Shield,
  Zap,
} from "lucide-react";
import { showToast } from "@/lib/utils/toast";

interface TeacherPlanSectionProps {
  teacherEmail?: string;
  teacherId?: string;
  teacherName?: string;
  teacherImage?: string;
  currentPlan?: "starter" | "pro";
  returnTo?: string;
}

export default function TeacherPlanSection({
  teacherEmail,
  teacherId,
  teacherName = "",
  teacherImage = "",
  currentPlan = "starter",
  returnTo,
}: TeacherPlanSectionProps) {
  const router = useRouter();
  const pathname = usePathname();

  const [loadingPlan, setLoadingPlan] = useState<"starter" | "pro" | null>(
    null
  );
  const [billingCycle, setBillingCycle] = useState<"monthly" | "quarterly">(
    "monthly"
  );
  const [isActiveFromBackend, setIsActiveFromBackend] = useState(
    currentPlan === "pro"
  );

  // হিন্ট (কী): ব্যাকএন্ড URL এবং পেমেন্ট শেষে ফেরার ঠিকানা (returnTo) নির্ধারণ করা হচ্ছে।
  // হিন্ট (কেন): পেমেন্ট শেষে ইউজার যেন আগের পেজে ফিরতে পারে এবং ব্যাকএন্ডে সঠিক URL-এ রিকোয়েস্ট যায়।
  // হিন্ট (কীভাবে): props-এ returnTo না থাকলে বর্তমান pathname নেওয়া হচ্ছে।
  const backendUrl = process.env.NEXT_PUBLIC_API_URL 
  
  const targetReturnTo = returnTo || pathname || "/dashboard";

  const proPrice = billingCycle === "monthly" ? 15 : 39;
  const durationDays = billingCycle === "monthly" ? 30 : 90;
  const planKey = billingCycle === "monthly" ? "teacher_1m" : "teacher_3m";
  const amountInCents = proPrice * 100;

  // হিন্ট (কী): টিচারের ইমেইল থাকলে ব্যাকএন্ড থেকে প্ল্যানের মেয়াদ ও active অবস্থা যাচাই করা হচ্ছে।
  // হিন্ট (কেন): মেয়াদ শেষ হলে যেন আবার আপগ্রেড করতে পারে এবং active থাকলে ডুপ্লিকেট পেমেন্ট না হয়।
  // হিন্ট (কীভাবে): /GetPlanStatus/:email কল করে isActivePlan state আপডেট করা হচ্ছে।
  useEffect(() => {
    if (!teacherEmail) return;

    fetch(`${backendUrl}/GetPlanStatus/${encodeURIComponent(teacherEmail)}`)
      .then((res) => res.json())
      .then((data) => {
        if (typeof data?.isActivePlan === "boolean") {
          setIsActiveFromBackend(data.isActivePlan);
        }
      })
      .catch(() => {
        // ব্যাকএন্ড থেকে স্ট্যাটাস না এলে currentPlan prop-এর ওপর নির্ভর করবে
      });
  }, [backendUrl, teacherEmail]);

  const handleStripeUpgrade = async (plan: "starter" | "pro") => {
    if (plan === "starter") {
      showToast.error(
        "You are already on the Free Starter plan (up to 2 posts)."
      );
      return;
    }

    // হিন্ট (কী): লগইন না থাকলে returnTo সহ login পেজে পাঠানোর guard।
    // হিন্ট (কেন): ইমেইল ছাড়া পেমেন্ট বা রশিদ ইউজারের সাথে যুক্ত করা যাবে না।
    // হিন্ট (কীভাবে): teacherEmail না থাকলে /login-এ redirect করা হচ্ছে।
    if (!teacherEmail) {
      showToast.error("Please log in as a teacher first.");
      const nextUrl = `${pathname}?returnTo=${encodeURIComponent(targetReturnTo)}`;
      router.push(`/login?callbackUrl=${encodeURIComponent(nextUrl)}`);
      return;
    }

    // হিন্ট (কী): আগে থেকেই active plan থাকলে ডুপ্লিকেট চেকআউট আটকে দেওয়া হচ্ছে।
    // হিন্ট (কেন): মেয়াদ থাকা অবস্থায় ভুল করে দুবার পেমেন্ট হওয়া ঠেকাতে।
    // হিন্ট (কীভাবে): isActiveFromBackend সত্য হলে এখানেই থামিয়ে toast দেখানো হচ্ছে।
    if (isActiveFromBackend) {
      showToast.error("Your Teacher Pro plan is already active.");
      return;
    }

    try {
      setLoadingPlan(plan);

      const payload = {
        email: teacherEmail,
        name: teacherName,
        image: teacherImage,
        role: "teacher",
        planKey,
        billingCycle,
        durationDays,
        amount: amountInCents,
        userId: teacherId || "",
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
      console.error("Stripe checkout error:", error);
      showToast.error("Could not start Stripe payment");
    } finally {
      setLoadingPlan(null);
    }
  };

  return (
    <section className="overflow-hidden rounded-3xl border border-slate-200/90 bg-white/95 shadow-sm dark:border-slate-800/90 dark:bg-slate-900/80">
      {/* Top Banner Bar */}
      <div className="flex flex-col justify-between gap-4 border-b border-slate-200/80 bg-gradient-to-r from-cyan-500/10 via-sky-500/5 to-teal-500/10 px-5 py-5 dark:border-slate-800 dark:from-cyan-500/15 dark:via-slate-900 dark:to-teal-500/10 sm:flex-row sm:items-center sm:px-7">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-lg bg-cyan-600/10 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-cyan-800 dark:bg-cyan-400/15 dark:text-cyan-300">
            <Zap className="h-3.5 w-3.5" />
            <span>Early Pro Access</span>
          </span>
          <h2 className="mt-2 text-xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-2xl">
            Scale Your Teaching Before 2 Free Posts End
          </h2>
          <p className="mt-1 text-xs text-slate-600 dark:text-slate-300 sm:text-sm">
            Compare your current 2-post starter allowance with Pro access—upgrade anytime via Stripe.
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="inline-flex shrink-0 self-start rounded-xl border border-slate-200 bg-white p-1 dark:border-slate-800 dark:bg-slate-950 sm:self-center">
          <button
            type="button"
            onClick={() => setBillingCycle("monthly")}
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${billingCycle === "monthly"
                ? "bg-cyan-600 text-white dark:bg-cyan-400 dark:text-slate-950"
                : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
              }`}
          >
            Monthly
          </button>
          <button
            type="button"
            onClick={() => setBillingCycle("quarterly")}
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${billingCycle === "quarterly"
                ? "bg-cyan-600 text-white dark:bg-cyan-400 dark:text-slate-950"
                : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
              }`}
          >
            3 Months (Save $6)
          </button>
        </div>
      </div>

      {/* Main Split Layout: Left Current Allowance | Right Pro Upgrade Box */}
      <div className="grid grid-cols-1 divide-y divide-slate-200/80 dark:divide-slate-800 lg:grid-cols-12 lg:divide-x lg:divide-y-0">
        {/* Left Column: Current Free Allowance */}
        <div className="flex flex-col justify-between p-5 sm:p-7 lg:col-span-5">
          <div>
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                <Layers className="h-4 w-4 text-slate-500 dark:text-slate-400" />
                <span>Free Allowance</span>
              </span>
              <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                $0 / mo
              </span>
            </div>

            <div className="mt-4 rounded-2xl border border-slate-200/80 bg-slate-50/80 p-4 dark:border-slate-800 dark:bg-slate-950/60">
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                Starter Quota
              </p>
              <p className="mt-1 text-2xl font-black text-slate-900 dark:text-white">
                2 Tuition Posts
              </p>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                Great for trying out listings before upgrading.
              </p>
            </div>

            <ul className="mt-5 space-y-2.5 text-xs text-slate-600 dark:text-slate-300 sm:text-sm">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-slate-400" />
                <span>Up to 2 active tuition posts</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-slate-400" />
                <span>Basic teacher profile display</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-slate-400" />
                <span>Standard student inquiry access</span>
              </li>
            </ul>
          </div>

          <button
            type="button"
            onClick={() => handleStripeUpgrade("starter")}
            className="mt-6 w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300 dark:hover:bg-slate-900 sm:text-sm"
          >
            {!isActiveFromBackend ? "Active: Free Starter" : "Starter Tier"}
          </button>
        </div>

        {/* Right Column: Teacher Pro Upgrade Highlight */}
        <div className="flex flex-col justify-between bg-gradient-to-br from-cyan-500/[0.06] via-transparent to-teal-500/[0.08] p-5 dark:from-cyan-400/[0.08] dark:to-teal-400/[0.06] sm:p-7 lg:col-span-7">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/15 px-3 py-1 text-[11px] font-bold text-amber-700 dark:bg-amber-400/15 dark:text-amber-300">
                <Flame className="h-3.5 w-3.5" />
                <span>Unlimited Posting</span>
              </span>
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-cyan-700 dark:text-cyan-300">
                <Shield className="h-3.5 w-3.5" />
                <span>Verified Mentor Perks</span>
              </span>
            </div>

            <div className="mt-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
              <div>
                <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
                  Teacher Pro Membership
                </h3>
                <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">
                  Remove the 2-post limit anytime and boost your visibility among students.
                </p>
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
              <div className="rounded-xl border border-cyan-500/20 bg-white/80 p-3 text-xs dark:border-cyan-400/20 dark:bg-slate-950/70">
                <p className="font-bold text-slate-900 dark:text-white">
                  Unlimited Tuition Posts
                </p>
                <p className="mt-0.5 text-slate-500 dark:text-slate-400">
                  Post as many batches or subjects as you teach.
                </p>
              </div>

              <div className="rounded-xl border border-cyan-500/20 bg-white/80 p-3 text-xs dark:border-cyan-400/20 dark:bg-slate-950/70">
                <p className="font-bold text-slate-900 dark:text-white">
                  Priority Search Ranking
                </p>
                <p className="mt-0.5 text-slate-500 dark:text-slate-400">
                  Appear higher when students browse tuitions.
                </p>
              </div>

              <div className="rounded-xl border border-cyan-500/20 bg-white/80 p-3 text-xs dark:border-cyan-400/20 dark:bg-slate-950/70">
                <p className="font-bold text-slate-900 dark:text-white">
                  Pro Mentor Identity
                </p>
                <p className="mt-0.5 text-slate-500 dark:text-slate-400">
                  Stand out with a dedicated Pro badge on your profile.
                </p>
              </div>

              <div className="rounded-xl border border-cyan-500/20 bg-white/80 p-3 text-xs dark:border-cyan-400/20 dark:bg-slate-950/70">
                <p className="font-bold text-slate-900 dark:text-white">
                  Secured by Stripe
                </p>
                <p className="mt-0.5 text-slate-500 dark:text-slate-400">
                  Fast, safe checkout directly from your dashboard.
                </p>
              </div>
            </div>
          </div>

          <button
            type="button"
            disabled={loadingPlan === "pro" || isActiveFromBackend}
            onClick={() => handleStripeUpgrade("pro")}
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-600 to-teal-600 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:brightness-105 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 dark:from-cyan-400 dark:to-teal-400 dark:text-slate-950 dark:shadow-[0_0_24px_rgba(34,211,238,0.25)]"
          >
            {loadingPlan === "pro" ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Connecting to Stripe...</span>
              </>
            ) : (
              <>
                <span>
                  {isActiveFromBackend ? "Pro Plan Active" : "Update Plan"}
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