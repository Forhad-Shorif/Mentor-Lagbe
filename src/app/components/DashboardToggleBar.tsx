"use client"

import Link from "next/link"
import { Bell, Mail, Search } from "lucide-react"

import { SidebarTrigger } from "@/components/ui/sidebar"
import { authClient } from "@/lib/auth-client"
import ThemeToggle from "@/components/SheareHome/ThemeToggle"

export function DashboardTopbar() {
  const { data: session } = authClient.useSession()
  const user = session?.user

  const name = user?.name?.trim() || "Forhad Shorif"
  const initial = name.charAt(0).toUpperCase()

  return (
    <header className="relative sticky top-0 z-20 flex h-16 shrink-0 items-center gap-2 border-b border-teal-100 bg-white/90 px-3 shadow-[0_14px_35px_-30px_rgba(13,148,136,0.75)] backdrop-blur-xl before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-teal-300/70 before:to-transparent sm:h-20 sm:gap-4 sm:px-8 dark:border-blue-900/30 dark:bg-gradient-to-r dark:from-[#030712]/95 dark:via-[#060d1f]/90 dark:to-[#030712]/95 dark:shadow-[0_18px_40px_-30px_rgba(59,130,246,0.9)] dark:before:via-sky-400/40">
      
      {/* 🟢 এখানে এই ট্রিগার বাটনটি থাকাতে সাইডবার বন্ধ থাকলেও এটি ক্লিক করে আবার ফিরিয়ে আনা যাবে */}
      <SidebarTrigger className="grid size-9 shrink-0 place-items-center rounded-xl border border-teal-200 bg-white text-teal-700 shadow-sm transition-all duration-300 hover:border-teal-300 hover:bg-teal-50 hover:text-teal-800 sm:size-10 dark:border-blue-800/40 dark:bg-blue-950/30 dark:text-blue-300 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] dark:hover:border-blue-500/50 dark:hover:bg-blue-500/15 dark:hover:text-sky-200 dark:hover:shadow-[0_0_20px_-6px_rgba(59,130,246,0.8)] cursor-pointer" />

      {/* সার্চ ইনপুট */}
      <div className="group relative hidden min-w-0 max-w-xl flex-1 sm:block">
        <Search className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-neutral-400 transition-colors duration-300 group-focus-within:text-teal-600 dark:text-slate-400 dark:group-focus-within:text-sky-300" />
        <input
          type="search"
          placeholder="Search tuitions, tutors, or applications..."
          aria-label="Search tuitions, tutors, or applications"
          className="h-11 w-full rounded-xl border border-teal-100 bg-slate-50 pr-4 pl-11 text-sm text-neutral-800 shadow-sm transition-all duration-300 placeholder:text-neutral-400 hover:border-teal-200 focus:border-teal-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-teal-500/10 dark:border-blue-900/40 dark:bg-blue-950/20 dark:text-white dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] dark:placeholder:text-slate-400 dark:hover:border-blue-700/50 dark:focus:border-sky-500/60 dark:focus:bg-blue-950/40 dark:focus:shadow-[0_0_28px_-8px_rgba(56,189,248,0.75)] dark:focus:ring-sky-500/10"
        />
      </div>

      <div className="ml-auto flex shrink-0 items-center gap-3 sm:gap-4">
        <button
          type="button"
          aria-label="Messages"
          className="group relative hidden size-9 place-items-center rounded-xl border border-teal-100 bg-white text-neutral-500 shadow-sm transition-all duration-300 hover:border-teal-300 hover:bg-teal-50 hover:text-teal-700 min-[380px]:grid sm:size-10 dark:border-blue-900/40 dark:bg-blue-950/20 dark:text-slate-300 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] dark:hover:border-blue-500/40 dark:hover:bg-blue-500/15 dark:hover:text-sky-200 dark:hover:shadow-[0_0_20px_-6px_rgba(59,130,246,0.8)]"
        >
          <Mail className="size-4 transition-transform duration-300 group-hover:scale-110" />
          <span className="absolute top-2.5 right-2.5 size-1.5 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.6)] ring-2 ring-white dark:bg-rose-400 dark:shadow-[0_0_8px_rgba(251,113,133,0.9)] dark:ring-[#030712]" />
        </button>

        <button
          type="button"
          aria-label="Notifications"
          className="group relative grid size-9 place-items-center rounded-xl border border-teal-100 bg-white text-neutral-500 shadow-sm transition-all duration-300 hover:border-teal-300 hover:bg-teal-50 hover:text-teal-700 sm:size-10 dark:border-blue-900/40 dark:bg-blue-950/20 dark:text-slate-300 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] dark:hover:border-blue-500/40 dark:hover:bg-blue-500/15 dark:hover:text-sky-200 dark:hover:shadow-[0_0_20px_-6px_rgba(59,130,246,0.8)]"
        >
          <Bell className="size-4 transition-transform duration-300 group-hover:scale-110" />
          <span className="absolute top-2.5 right-2.5 size-1.5 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.6)] ring-2 ring-white dark:bg-rose-400 dark:shadow-[0_0_8px_rgba(251,113,133,0.9)] dark:ring-[#030712]" />
        </button>

        <span className="hidden h-6 w-px bg-teal-100 sm:block dark:bg-blue-400/30" />

        <span className="hidden sm:block">
          <ThemeToggle />
        </span>

        <Link href="/profile" className="group flex items-center gap-3">
          <div className="hidden text-right sm:block">
            <span className="block text-sm font-semibold text-neutral-900 transition-colors duration-300 group-hover:text-teal-700 dark:text-white dark:group-hover:text-sky-200">{name}</span>
            <span className="block text-[11px] font-medium tracking-wide text-teal-600 capitalize dark:text-sky-300/75">{user?.role || "Member"}</span>
          </div>

          <span className="grid size-9 shrink-0 place-items-center overflow-hidden rounded-xl border border-teal-300 bg-gradient-to-br from-teal-500 via-cyan-600 to-blue-600 text-sm font-bold text-white shadow-[0_0_20px_-8px_rgba(20,184,166,0.85)] transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_0_22px_-6px_rgba(20,184,166,0.9)] sm:size-10 dark:border-sky-400/40 dark:from-sky-500 dark:via-blue-600 dark:to-indigo-600 dark:shadow-[0_0_20px_-4px_rgba(59,130,246,0.85)] dark:group-hover:shadow-[0_0_24px_-2px_rgba(56,189,248,0.9)]">
            {user?.image ? (
              <img src={user.image} alt={name} className="size-full object-cover" />
            ) : (
              initial
            )}
          </span>
        </Link>
      </div>
    </header>
  )
}
