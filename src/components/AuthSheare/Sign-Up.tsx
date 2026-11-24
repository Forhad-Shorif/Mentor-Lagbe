"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  AlertCircle,
  ArrowRight,
  BookOpen,
  Briefcase,
  CheckCircle2,
  Eye,
  EyeOff,
  Lock,
  Mail,
  ShieldCheck,
  Sparkles,
  UserRound,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"

import { authClient } from "@/lib/auth-client"
import { showToast } from "@/lib/utils/toast"
import SocialSign from "./SocialSign"

// ------------------------------------------------------------------
// ইউজারের রোল ডিফিনিশন
// ------------------------------------------------------------------
// BetterAuth server-এ role-এর মান: "students" | "teachers" | "admin"
// এই webapp একটি tuition marketplace, তাই দুটি রোল: Students আর Teachers।
type SignUpRole = "students" | "teachers"

const roleOptions: {
  value: SignUpRole
  label: string
  description: string
  icon: LucideIcon
}[] = [
  {
    value: "students",
    label: "Student",
    description: "Find trusted tutors, track classes, and apply easily.",
    icon: UserRound,
  },
  {
    value: "teachers",
    label: "Tutor",
    description: "Discover tuition jobs, teach students, and grow.",
    icon: Briefcase,
  },
]

// Role অনুযায়ী sign up-এর পর কোথায় যাবে
const dashboardByRole: Record<SignUpRole, string> = {
  students: "/dashboard/students",
  teachers: "/dashboard/teachers",
}

// পাসওয়ার্ড শক্তির রুলস
const passwordRules = [
  { label: "At least 8 characters", test: (value: string) => value.length >= 8 },
  { label: "One uppercase letter", test: (value: string) => /[A-Z]/.test(value) },
  { label: "One number", test: (value: string) => /\d/.test(value) },
]

// হিন্ট (কী): Light ও Dark উভয় থিম এবং ফুল-স্ক্রিন split ভিউ-সহ SignUpForm রেন্ডার করা হচ্ছে।
// হিন্ট (কেন): একক ফর্ম কার্ডের বদলে ফুল-স্ক্রিনে একটি আকর্ষণীয় সাইড ভিউ ও পরিপাটি থিম-সমন্বিত ফর্ম দিতে।
// হিন্ট (কীভাবে): lg:grid-cols-2 split লেআউট এবং light/dark Tailwind ক্লাস ব্যবহার করা হয়েছে।
export function SignUpForm() {
  const router = useRouter()

  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [role, setRole] = useState<SignUpRole>("students")
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const passedRules = passwordRules.filter((rule) => rule.test(password)).length
  const selectedRole =
    roleOptions.find((option) => option.value === role) ?? roleOptions[0]

  /**
   * অ্যাকাউন্ট তৈরি হ্যান্ডলার
   */
  async function handleSignUp(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    setErrorMessage("")

    const formData = new FormData(event.currentTarget)
    const user = Object.fromEntries(formData.entries()) as {
      name: string
      email: string
      password: string
    }

    try {
      const { error } = await authClient.signUp.email({
        name: user.name,
        email: user.email,
        password: user.password,
        role,
      })

      if (error) {
        setErrorMessage(error.message || "Could not create your account.")
        showToast.error(error.message || "Could not create your account.")
        return
      }

      showToast.success("Account created! Now complete your profile.")
      router.push(dashboardByRole[role])
      router.refresh()
    } catch (error) {
      console.error("Sign up error:", error)
      setErrorMessage("Something went wrong. Please try again.")
      showToast.error("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100">
      {/* Ambient Background Glows (Light & Dark Adaptive) */}
      <div className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full bg-cyan-400/20 blur-3xl dark:bg-cyan-500/15" />
      <div className="pointer-events-none absolute -bottom-24 right-0 h-96 w-96 rounded-full bg-blue-500/15 blur-3xl dark:bg-blue-600/20" />

      <div className="relative mx-auto grid min-h-screen max-w-7xl grid-cols-1 items-center gap-8 px-4 py-8 sm:px-6 lg:grid-cols-12 lg:gap-12 lg:px-8 lg:py-12">
        {/* Left Side: Full-Screen Brand & Role Showcase */}
        <div className="flex flex-col justify-between rounded-[2.25rem] border border-slate-200/90 bg-gradient-to-br from-white via-cyan-50/60 to-sky-100/70 p-7 shadow-xl shadow-slate-200/60 backdrop-blur-xl dark:border-cyan-400/20 dark:from-slate-950 dark:via-[#07152b] dark:to-[#08233a] dark:shadow-[0_24px_70px_rgba(2,6,23,0.65)] lg:col-span-6 lg:min-h-[680px] lg:p-10">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/25 bg-cyan-500/10 px-3.5 py-1.5 text-xs font-bold text-cyan-700 dark:border-cyan-400/30 dark:bg-cyan-400/10 dark:text-cyan-300">
              <Sparkles className="h-3.5 w-3.5 text-cyan-600 dark:text-cyan-300" />
              <span>MentorLagbe • Learn · Teach · Grow</span>
            </div>

            <div className="space-y-3">
              <h1 className="bg-gradient-to-r from-slate-900 via-cyan-900 to-blue-800 bg-clip-text text-3xl font-black tracking-tight text-transparent dark:from-white dark:via-cyan-100 dark:to-sky-300 sm:text-4xl lg:text-[2.65rem] lg:leading-[1.12]">
                Start your learning & tutoring journey today
              </h1>
              <p className="max-w-xl text-sm leading-relaxed text-slate-600 dark:text-slate-300 sm:text-base">
                Join as a student looking for dedicated tutors or as a teacher ready to guide learners and take tuition opportunities.
              </p>
            </div>

            {/* Active Role Preview Box */}
            <div className="rounded-2xl border border-cyan-500/20 bg-white/80 p-4 shadow-xs backdrop-blur-md dark:border-cyan-400/20 dark:bg-slate-950/65">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-cyan-700 dark:text-cyan-300">
                  Selected Role: {selectedRole.label}
                </span>
                <span className="rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-[11px] font-bold text-emerald-700 dark:text-emerald-300">
                  Instant Workspace
                </span>
              </div>
              <p className="mt-1.5 text-xs text-slate-600 dark:text-slate-300 sm:text-sm">
                {selectedRole.description}
              </p>
            </div>
          </div>

          {/* Bottom Highlights */}
          <div className="mt-8 grid grid-cols-1 gap-3.5 pt-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-200/80 bg-white/75 p-4 dark:border-white/10 dark:bg-slate-950/55">
              <div className="flex items-center gap-2 text-xs font-extrabold text-slate-900 dark:text-white">
                <BookOpen className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
                <span>Smart Tuition Matching</span>
              </div>
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
                Save posts, track applications, and manage active classes effortlessly.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200/80 bg-white/75 p-4 dark:border-white/10 dark:bg-slate-950/55">
              <div className="flex items-center gap-2 text-xs font-extrabold text-slate-900 dark:text-white">
                <ShieldCheck className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
                <span>Role-Based Dashboard</span>
              </div>
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
                Dedicated workspace tailored directly for students and tutors.
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Sign Up Form Card */}
        <div className="w-full lg:col-span-6">
          <div className="mx-auto w-full max-w-lg rounded-[2.25rem] border border-slate-200/90 bg-white/90 p-6 shadow-xl shadow-slate-200/70 backdrop-blur-2xl transition-all duration-300 dark:border-cyan-400/20 dark:bg-slate-900/75 dark:shadow-[0_24px_65px_rgba(2,6,23,0.65)] sm:p-9">
            {/* হেডার সেকশন */}
            <div className="mb-7 text-center">
              <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-cyan-500/25 bg-cyan-500/10 px-3.5 py-1 text-xs font-bold text-cyan-700 dark:border-cyan-400/25 dark:bg-cyan-400/10 dark:text-cyan-300">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Create Your Account</span>
              </div>

              <h2 className="bg-gradient-to-r from-slate-900 via-slate-800 to-cyan-800 bg-clip-text text-2xl font-black tracking-tight text-transparent dark:from-white dark:via-cyan-100 dark:to-sky-300 sm:text-3xl">
                Get Started Today
              </h2>

              <p className="mt-1.5 text-xs text-slate-600 dark:text-slate-400 sm:text-sm">
                Already have an account?{" "}
                <Link
                  href="/sign-in"
                  className="font-bold text-cyan-700 underline underline-offset-4 transition hover:text-cyan-600 dark:text-cyan-300 dark:hover:text-cyan-200"
                >
                  Sign in
                </Link>
              </p>
            </div>

            {/* সোশ্যাল সাইন-আপ বাটন */}
            <div className="mb-6 grid grid-cols-2 gap-3">
              <SocialSign />
            </div>

            {/* ডিভাইডার */}
            <div className="my-6 flex items-center">
              <div className="flex-grow border-t border-slate-200 dark:border-slate-800" />
              <span className="mx-3.5 shrink-0 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Or continue with email
              </span>
              <div className="flex-grow border-t border-slate-200 dark:border-slate-800" />
            </div>

            {/* এরর মেসেজ বক্স */}
            {errorMessage && (
              <div className="mb-5 flex items-start gap-2.5 rounded-2xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-xs font-medium text-rose-700 dark:text-rose-200">
                <AlertCircle className="mt-0.5 size-4 shrink-0 text-rose-500 dark:text-rose-400" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form className="space-y-5" onSubmit={handleSignUp}>
              {/* রোল সিলেকশন ট্যাব */}
              <div className="space-y-2">
                <span className="block text-xs font-bold text-slate-700 dark:text-slate-300 sm:text-sm">
                  I am joining as
                </span>

                <div className="grid grid-cols-2 gap-2.5">
                  {roleOptions.map((option) => {
                    const Icon = option.icon
                    const isSelected = role === option.value

                    return (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => setRole(option.value)}
                        aria-pressed={isSelected}
                        className={`flex cursor-pointer flex-col items-center gap-1.5 rounded-2xl border px-3 py-3 text-xs font-bold transition-all duration-200 ${
                          isSelected
                            ? "border-cyan-500 bg-cyan-500/15 text-cyan-900 shadow-sm ring-2 ring-cyan-500/20 dark:border-cyan-400 dark:bg-cyan-400/15 dark:text-cyan-200"
                            : "border-slate-200 bg-slate-50/80 text-slate-600 hover:border-cyan-400/50 hover:text-slate-900 dark:border-slate-800 dark:bg-slate-950/50 dark:text-slate-400 dark:hover:border-slate-700 dark:hover:text-slate-200"
                        }`}
                      >
                        <Icon className="size-4" />
                        <span>{option.label}</span>
                      </button>
                    )
                  })}
                </div>
                <p className="px-1 text-[11px] italic text-slate-500 dark:text-slate-400">
                  {selectedRole.description}
                </p>
              </div>

              {/* Full Name Field */}
              <div className="space-y-1.5">
                <label
                  htmlFor="name"
                  className="block text-xs font-bold text-slate-700 dark:text-slate-300 sm:text-sm"
                >
                  Full Name
                </label>
                <div className="relative flex items-center">
                  <span className="pointer-events-none absolute left-3.5 text-slate-400">
                    <UserRound className="size-4" />
                  </span>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Ayesha Rahman"
                    autoComplete="name"
                    required
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50/80 py-3 pl-11 pr-4 text-sm text-slate-900 placeholder-slate-400 shadow-2xs transition-all duration-200 focus:border-cyan-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-cyan-500/15 dark:border-slate-700/80 dark:bg-slate-950/65 dark:text-slate-100 dark:placeholder-slate-500 dark:focus:border-cyan-400 dark:focus:bg-slate-950 dark:focus:ring-cyan-400/15"
                  />
                </div>
              </div>

              {/* Email Address Field */}
              <div className="space-y-1.5">
                <label
                  htmlFor="email"
                  className="block text-xs font-bold text-slate-700 dark:text-slate-300 sm:text-sm"
                >
                  Email Address
                </label>
                <div className="relative flex items-center">
                  <span className="pointer-events-none absolute left-3.5 text-slate-400">
                    <Mail className="size-4" />
                  </span>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    autoComplete="email"
                    required
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50/80 py-3 pl-11 pr-4 text-sm text-slate-900 placeholder-slate-400 shadow-2xs transition-all duration-200 focus:border-cyan-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-cyan-500/15 dark:border-slate-700/80 dark:bg-slate-950/65 dark:text-slate-100 dark:placeholder-slate-500 dark:focus:border-cyan-400 dark:focus:bg-slate-950 dark:focus:ring-cyan-400/15"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="block text-xs font-bold text-slate-700 dark:text-slate-300 sm:text-sm"
                >
                  Password
                </label>
                <div className="relative flex items-center">
                  <span className="pointer-events-none absolute left-3.5 text-slate-400">
                    <Lock className="size-4" />
                  </span>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
                    autoComplete="new-password"
                    minLength={8}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50/80 py-3 pl-11 pr-11 text-sm text-slate-900 placeholder-slate-400 shadow-2xs transition-all duration-200 focus:border-cyan-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-cyan-500/15 dark:border-slate-700/80 dark:bg-slate-950/65 dark:text-slate-100 dark:placeholder-slate-500 dark:focus:border-cyan-400 dark:focus:bg-slate-950 dark:focus:ring-cyan-400/15"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((visible) => !visible)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="absolute right-3.5 flex size-8 cursor-pointer items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-200/70 hover:text-slate-800 focus:outline-none dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200"
                  >
                    {showPassword ? (
                      <EyeOff className="size-4" />
                    ) : (
                      <Eye className="size-4" />
                    )}
                  </button>
                </div>

                {/* পাসওয়ার্ড স্ট্রেন্থ বার */}
                <div className="grid grid-cols-3 gap-1.5 pt-1">
                  {passwordRules.map((rule, index) => (
                    <span
                      key={rule.label}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        index < passedRules
                          ? "bg-emerald-500 dark:bg-emerald-400"
                          : "bg-slate-200 dark:bg-slate-800"
                      }`}
                    />
                  ))}
                </div>

                <ul className="space-y-1 pt-1">
                  {passwordRules.map((rule) => {
                    const passed = rule.test(password)
                    return (
                      <li
                        key={rule.label}
                        className={`flex items-center gap-2 text-[11px] ${
                          passed
                            ? "font-semibold text-emerald-600 dark:text-emerald-400"
                            : "text-slate-500 dark:text-slate-400"
                        }`}
                      >
                        <CheckCircle2
                          className={`size-3 ${
                            passed
                              ? "text-emerald-500 dark:text-emerald-400"
                              : "text-slate-400 dark:text-slate-600"
                          }`}
                        />
                        {rule.label}
                      </li>
                    )
                  })}
                </ul>
              </div>

              <label className="flex cursor-pointer items-start gap-2.5 pt-1 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                <input
                  type="checkbox"
                  name="terms"
                  required
                  className="mt-0.5 size-4 shrink-0 cursor-pointer rounded border-slate-300 accent-cyan-600 dark:border-slate-700 dark:bg-slate-950 dark:accent-cyan-400"
                />
                <span>
                  I agree to the{" "}
                  <Link
                    href="/terms"
                    className="font-semibold text-cyan-700 hover:underline dark:text-cyan-300"
                  >
                    Terms
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/privacy"
                    className="font-semibold text-cyan-700 hover:underline dark:text-cyan-300"
                  >
                    Privacy Policy
                  </Link>
                  .
                </span>
              </label>

              <button
                type="submit"
                disabled={loading}
                className="flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 text-sm font-extrabold text-white shadow-lg shadow-cyan-500/25 transition-all duration-200 hover:brightness-105 active:scale-[0.99] disabled:opacity-50 dark:from-cyan-400 dark:via-sky-400 dark:to-blue-500 dark:text-slate-950 dark:shadow-cyan-400/20"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Creating account...
                  </span>
                ) : (
                  <>
                    Create account
                    <ArrowRight className="size-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}