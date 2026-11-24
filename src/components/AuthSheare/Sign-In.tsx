"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  AlertCircle,
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  Eye,
  EyeOff,
  Lock,
  Mail,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import { authClient } from "@/lib/auth-client";
import { showToast } from "@/lib/utils/toast";
import SocialSign from "./SocialSign";

// হিন্ট (কী): Light ও Dark থিম ও ফুল-স্ক্রিন split ভিউ-সহ SignInPage রেন্ডার করা হচ্ছে।
// হিন্ট (কেন): SignUpForm-এর সাথে মিল রেখে ফুল-স্ক্রিনে আকর্ষণীয় সাইড ভিউ ও থিম-সমন্বিত লগইন ফর্ম দিতে।
// হিন্ট (কীভাবে): lg:grid-cols-12 split লেআউট এবং light/dark adaptive Tailwind ক্লাস ব্যবহার করা হয়েছে।
const SignInPage = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Inline email validation (@ এবং . চেক)-এর জন্য state
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  // '@' এবং '.' চেক করার email validation handler
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setEmail(val);

    if (val.trim() === "") {
      setEmailError("Email address is required.");
    } else if (!val.includes("@") || !val.includes(".")) {
      setEmailError("Please enter a valid email containing '@' and '.'");
    } else {
      setEmailError("");
    }
  };

  // Email/password sign-in submission handler
  const HandleonSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (emailError || !email.includes("@") || !email.includes(".")) {
      showToast.error("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries()) as {
      email: string;
      password: string;
    };

    try {
      const { data, error } = await authClient.signIn.email({
        ...user,
      });

      if (error || !data) {
        showToast.error(
          error?.message || "Sign-in failed! Please check your credentials."
        );
        setLoading(false);
        return;
      }

      showToast.success("Successfully signed in!");
      router.refresh();
      router.replace(callbackUrl);
      setLoading(false);
    } catch {
      showToast.error("Sign-in failed! Please check your credentials.");
      setLoading(false);
    }
  };

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100">
      {/* Ambient Background Glows (Light & Dark Adaptive) */}
      <div className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full bg-cyan-400/20 blur-3xl dark:bg-cyan-500/15" />
      <div className="pointer-events-none absolute -bottom-24 right-0 h-96 w-96 rounded-full bg-blue-500/15 blur-3xl dark:bg-blue-600/20" />

      <div className="relative mx-auto grid min-h-screen max-w-7xl grid-cols-1 items-center gap-8 px-4 py-8 sm:px-6 lg:grid-cols-12 lg:gap-12 lg:px-8 lg:py-12">
        {/* Left Side: Full-Screen Brand & Workspace Showcase */}
        <div className="flex flex-col justify-between rounded-[2.25rem] border border-slate-200/90 bg-gradient-to-br from-white via-cyan-50/60 to-sky-100/70 p-7 shadow-xl shadow-slate-200/60 backdrop-blur-xl dark:border-cyan-400/20 dark:from-slate-950 dark:via-[#07152b] dark:to-[#08233a] dark:shadow-[0_24px_70px_rgba(2,6,23,0.65)] lg:col-span-6 lg:min-h-[650px] lg:p-10">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/25 bg-cyan-500/10 px-3.5 py-1.5 text-xs font-bold text-cyan-700 dark:border-cyan-400/30 dark:bg-cyan-400/10 dark:text-cyan-300">
              <Sparkles className="h-3.5 w-3.5 text-cyan-600 dark:text-cyan-300" />
              <span>MentorLagbe • Secure Portal Access</span>
            </div>

            <div className="space-y-3">
              <h1 className="bg-gradient-to-r from-slate-900 via-cyan-900 to-blue-800 bg-clip-text text-3xl font-black tracking-tight text-transparent dark:from-white dark:via-cyan-100 dark:to-sky-300 sm:text-4xl lg:text-[2.65rem] lg:leading-[1.12]">
                Welcome back to your workspace
              </h1>
              <p className="max-w-xl text-sm leading-relaxed text-slate-600 dark:text-slate-300 sm:text-base">
                Sign in to manage your tuition posts, applications, saved items, and active plan status in one place.
              </p>
            </div>

            <div className="rounded-2xl border border-cyan-500/20 bg-white/80 p-4 shadow-2xs backdrop-blur-md dark:border-cyan-400/20 dark:bg-slate-950/65">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-cyan-700 dark:text-cyan-300">
                  Quick Return Flow
                </span>
                <span className="rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-[11px] font-bold text-emerald-700 dark:text-emerald-300">
                  Protected Session
                </span>
              </div>
              <p className="mt-1.5 text-xs text-slate-600 dark:text-slate-300 sm:text-sm">
                After signing in, you will be taken straight back to your dashboard or requested page.
              </p>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-3.5 pt-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-200/80 bg-white/75 p-4 dark:border-white/10 dark:bg-slate-950/55">
              <div className="flex items-center gap-2 text-xs font-extrabold text-slate-900 dark:text-white">
                <BookOpen className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
                <span>Live Tuition Activity</span>
              </div>
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
                Check updates on applied tuitions, bookmarks, and schedules.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200/80 bg-white/75 p-4 dark:border-white/10 dark:bg-slate-950/55">
              <div className="flex items-center gap-2 text-xs font-extrabold text-slate-900 dark:text-white">
                <ShieldCheck className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
                <span>Account & Receipts</span>
              </div>
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
                Access your profile details, active plan validity, and receipts.
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Sign In Form Card */}
        <div className="w-full lg:col-span-6">
          <div className="mx-auto w-full max-w-lg rounded-[2.25rem] border border-slate-200/90 bg-white/90 p-6 shadow-xl shadow-slate-200/70 backdrop-blur-2xl transition-all duration-300 dark:border-cyan-400/20 dark:bg-slate-900/75 dark:shadow-[0_24px_65px_rgba(2,6,23,0.65)] sm:p-9">
            {/* Header Branding */}
            <div className="mb-7 text-center">
              <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-cyan-500/25 bg-cyan-500/10 px-3.5 py-1 text-xs font-bold text-cyan-700 dark:border-cyan-400/25 dark:bg-cyan-400/10 dark:text-cyan-300">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Secure Portal Access</span>
              </div>

              <h2 className="bg-gradient-to-r from-slate-900 via-slate-800 to-cyan-800 bg-clip-text text-2xl font-black tracking-tight text-transparent dark:from-white dark:via-cyan-100 dark:to-sky-300 sm:text-3xl">
                Welcome Back
              </h2>

              <p className="mt-1.5 text-xs text-slate-600 dark:text-slate-400 sm:text-sm">
                Enter your credentials to manage your workflow and explore your dashboard.
              </p>
            </div>

            <form onSubmit={HandleonSubmit} className="space-y-5">
              {/* Social Authentication Providers */}
              <div className="grid grid-cols-2 gap-3">
                <SocialSign />
              </div>

              {/* Divider */}
              <div className="my-6 flex items-center">
                <div className="flex-grow border-t border-slate-200 dark:border-slate-800" />
                <span className="mx-3.5 shrink-0 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  Or continue with email
                </span>
                <div className="flex-grow border-t border-slate-200 dark:border-slate-800" />
              </div>

              {/* Email Input Field with Inline Validation */}
              <div className="space-y-1.5">
                <label className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300 sm:text-sm">
                  <Mail className="h-3.5 w-3.5 text-cyan-600 dark:text-cyan-400" />
                  <span>Email Address</span>
                </label>

                <div className="relative">
                  <input
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={handleEmailChange}
                    placeholder="name@example.com"
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50/80 py-3 pl-4 pr-10 text-sm text-slate-900 placeholder-slate-400 shadow-2xs transition-all duration-200 focus:border-cyan-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-cyan-500/15 dark:border-slate-700/80 dark:bg-slate-950/65 dark:text-slate-100 dark:placeholder-slate-500 dark:focus:border-cyan-400 dark:focus:bg-slate-950 dark:focus:ring-cyan-400/15"
                  />

                  {email.length > 0 && (
                    <div className="absolute right-3.5 top-1/2 -translate-y-1/2">
                      {email.includes("@") && email.includes(".") ? (
                        <CheckCircle2 className="h-4 w-4 text-emerald-500 dark:text-emerald-400" />
                      ) : (
                        <AlertCircle className="h-4 w-4 text-amber-500 dark:text-amber-400" />
                      )}
                    </div>
                  )}
                </div>

                {emailError && (
                  <span className="mt-1 flex items-center gap-1 text-xs font-medium text-rose-600 dark:text-rose-400">
                    <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                    <span>{emailError}</span>
                  </span>
                )}
              </div>

              {/* Password Input Field */}
              <div className="space-y-1.5">
                <label className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300 sm:text-sm">
                  <Lock className="h-3.5 w-3.5 text-cyan-600 dark:text-cyan-400" />
                  <span>Password</span>
                </label>

                <div className="relative">
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    minLength={8}
                    placeholder="••••••••"
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50/80 py-3 pl-4 pr-11 text-sm text-slate-900 placeholder-slate-400 shadow-2xs transition-all duration-200 focus:border-cyan-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-cyan-500/15 dark:border-slate-700/80 dark:bg-slate-950/65 dark:text-slate-100 dark:placeholder-slate-500 dark:focus:border-cyan-400 dark:focus:bg-slate-950 dark:focus:ring-cyan-400/15"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 cursor-pointer rounded-lg p-1 text-slate-500 transition hover:bg-slate-200/70 hover:text-slate-800 focus:outline-none dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>

                <p className="text-[11px] font-normal leading-relaxed text-slate-500 dark:text-slate-400">
                  Minimum 8 characters with a mix of letters and numbers.
                </p>
              </div>

              {/* Form Action Buttons */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  disabled={loading || Boolean(emailError)}
                  type="submit"
                  className="flex h-12 w-full cursor-pointer items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 px-5 text-sm font-extrabold text-white shadow-lg shadow-cyan-500/25 transition-all duration-200 hover:brightness-105 active:scale-[0.99] disabled:opacity-50 dark:from-cyan-400 dark:via-sky-400 dark:to-blue-500 dark:text-slate-950 dark:shadow-cyan-400/20"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                      <span>Signing in...</span>
                    </span>
                  ) : (
                    "Sign In"
                  )}
                </button>

                <button
                  type="reset"
                  onClick={() => {
                    setEmail("");
                    setEmailError("");
                  }}
                  className="h-12 cursor-pointer rounded-2xl border border-slate-200 bg-slate-100/80 px-5 text-sm font-bold text-slate-700 transition hover:bg-slate-200/80 hover:text-slate-950 active:scale-[0.99] dark:border-slate-700/80 dark:bg-slate-800/60 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
                >
                  Reset
                </button>
              </div>

              {/* Signup Redirect Footer */}
              <div className="border-t border-slate-200 pt-4 text-center dark:border-slate-800/80">
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Don{"'"}t have an account?{" "}
                  <Link
                    className="font-bold text-cyan-700 underline underline-offset-4 transition hover:text-cyan-600 dark:text-cyan-300 dark:hover:text-cyan-200"
                    href="/sign-up"
                  >
                    Sign up now
                  </Link>
                </p>
              </div>
            </form>
          </div>

          {/* Back to Home Navigation Link */}
          <div className="mt-5 text-center">
            <Link
              className="group inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-5 py-2.5 text-xs font-semibold text-slate-600 shadow-2xs backdrop-blur-md transition hover:border-cyan-400/50 hover:text-slate-950 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-300 dark:hover:border-cyan-400/35 dark:hover:text-white sm:text-sm"
              href="/"
            >
              <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-x-1" />
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignInPage;