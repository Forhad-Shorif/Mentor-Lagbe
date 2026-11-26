"use client"

import React, { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Bell, Mail, Search, X } from "lucide-react"

import { SidebarTrigger } from "@/components/ui/sidebar"
import { authClient } from "@/lib/auth-client"
import ThemeToggle from "@/components/SheareHome/ThemeToggle"

export function DashboardTopbar() {
  const router = useRouter()
  const { data: session } = authClient.useSession()
  const user = session?.user

  const [query, setQuery] = useState("")
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false)

  const name = user?.name?.trim() || "Forhad Shorif"
  const initial = name.charAt(0).toUpperCase()

  // হিন্ট: সার্চ লিখে Enter চাপলে /browsetuitions রুটে নিয়ে যায়।
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const trimmed = query.trim()
    const targetHref = trimmed
      ? `/browsetuitions?search=${encodeURIComponent(trimmed)}`
      : "/browsetuitions"

    setMobileSearchOpen(false)
    router.push(targetHref)
  }

  return (
    <header className="relative sticky top-0 z-20 flex h-16 shrink-0 flex-col justify-center border-b border-teal-200/75 bg-white/90 px-3 shadow-[0_14px_35px_-30px_rgba(13,148,136,0.75)] backdrop-blur-xl before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-teal-400/70 before:to-transparent sm:h-20 sm:px-8 dark:border-white/10 dark:bg-[#071117]/90 dark:before:via-teal-400/40">
      <div className="flex w-full items-center gap-2 sm:gap-4">
        {/* Sidebar Toggle */}
        <SidebarTrigger className="grid size-9 shrink-0 place-items-center rounded-xl border border-teal-200/80 bg-white text-teal-700 shadow-2xs transition-all duration-200 hover:border-teal-300 hover:bg-teal-50 hover:text-teal-800 sm:size-10 dark:border-white/10 dark:bg-white/[0.05] dark:text-teal-200 dark:hover:border-teal-400/35 dark:hover:bg-white/10 cursor-pointer" />

        {/* Desktop Search Form (Enter চাপলে লিংকে নিয়ে যাবে) */}
        <form
          onSubmit={handleSearch}
          role="search"
          aria-label="Search tuitions"
          className="group relative hidden min-w-0 max-w-xl flex-1 sm:block"
        >
          <Search className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-slate-400 transition-colors duration-200 group-focus-within:text-teal-600 dark:text-slate-400 dark:group-focus-within:text-teal-300" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search tuitions, tutors, or applications..."
            aria-label="Search tuitions, tutors, or applications"
            className="h-11 w-full rounded-xl border border-teal-200/70 bg-teal-50/40 pr-9 pl-11 text-sm font-medium text-slate-800 shadow-2xs transition-all duration-200 placeholder:text-slate-400 hover:border-teal-300 focus:border-teal-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-teal-500/10 dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:placeholder:text-slate-400 dark:hover:border-teal-400/30 dark:focus:border-teal-400 dark:focus:bg-white/[0.07] dark:focus:ring-teal-400/15"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="absolute top-1/2 right-3 grid size-5 -translate-y-1/2 place-items-center rounded-full text-slate-400 transition hover:bg-slate-200/70 hover:text-slate-700 dark:hover:bg-white/10 dark:hover:text-white"
            >
              <X className="size-3.5" />
            </button>
          )}
        </form>

        {/* Right Actions */}
        <div className="ml-auto flex shrink-0 items-center gap-2 sm:gap-3.5">
          {/* Mobile Search Toggle */}
          <button
            type="button"
            onClick={() => setMobileSearchOpen((prev) => !prev)}
            aria-label="Toggle search"
            aria-expanded={mobileSearchOpen}
            className="grid size-9 place-items-center rounded-xl border border-teal-200/80 bg-white text-slate-600 shadow-2xs transition hover:border-teal-300 hover:bg-teal-50 hover:text-teal-700 sm:hidden dark:border-white/10 dark:bg-white/[0.05] dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-teal-300"
          >
            <Search className="size-4" />
          </button>

          <button
            type="button"
            aria-label="Messages"
            className="group relative hidden size-9 place-items-center rounded-xl border border-teal-200/80 bg-white text-slate-600 shadow-2xs transition-all duration-200 hover:border-teal-300 hover:bg-teal-50 hover:text-teal-700 min-[380px]:grid sm:size-10 dark:border-white/10 dark:bg-white/[0.05] dark:text-slate-300 dark:hover:border-teal-400/35 dark:hover:bg-white/10 dark:hover:text-teal-300"
          >
            <Mail className="size-4 transition-transform duration-200 group-hover:scale-105" />
            <span className="absolute top-2.5 right-2.5 size-1.5 rounded-full bg-rose-500 ring-2 ring-white dark:bg-rose-400 dark:ring-[#071117]" />
          </button>

          <button
            type="button"
            aria-label="Notifications"
            className="group relative grid size-9 place-items-center rounded-xl border border-teal-200/80 bg-white text-slate-600 shadow-2xs transition-all duration-200 hover:border-teal-300 hover:bg-teal-50 hover:text-teal-700 sm:size-10 dark:border-white/10 dark:bg-white/[0.05] dark:text-slate-300 dark:hover:border-teal-400/35 dark:hover:bg-white/10 dark:hover:text-teal-300"
          >
            <Bell className="size-4 transition-transform duration-200 group-hover:scale-105" />
            <span className="absolute top-2.5 right-2.5 size-1.5 rounded-full bg-rose-500 ring-2 ring-white dark:bg-rose-400 dark:ring-[#071117]" />
          </button>

          <span className="hidden h-6 w-px bg-teal-200/80 sm:block dark:bg-white/10" />

          <span className="hidden sm:block">
            <ThemeToggle />
          </span>

          <Link href="/profile" className="group flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <span className="block text-sm font-bold text-slate-900 transition-colors duration-200 group-hover:text-teal-700 dark:text-white dark:group-hover:text-teal-300">
                {name}
              </span>
              <span className="block text-[11px] font-semibold tracking-wide text-teal-600 capitalize dark:text-teal-300/80">
                {user?.role || "Member"}
              </span>
            </div>

            <span className="grid size-9 shrink-0 place-items-center overflow-hidden rounded-xl border border-teal-300/80 bg-gradient-to-br from-teal-500 to-cyan-600 text-sm font-extrabold text-white shadow-sm transition-all duration-200 group-hover:scale-105 sm:size-10 dark:border-teal-400/40 dark:from-teal-400 dark:to-cyan-400 dark:text-slate-950">
              {user?.image ? (
                <img
                  src={user.image}
                  alt={name}
                  className="size-full object-cover object-top"
                />
              ) : (
                initial
              )}
            </span>
          </Link>
        </div>
      </div>

      {/* Mobile Search Bar */}
      {mobileSearchOpen && (
        <form
          onSubmit={handleSearch}
          role="search"
          aria-label="Mobile search tuitions"
          className="absolute inset-x-3 top-full z-30 mt-2 rounded-2xl border border-teal-200/80 bg-white/95 p-2 shadow-xl backdrop-blur-md sm:hidden dark:border-white/10 dark:bg-[#09151c]/95"
        >
          <div className="relative flex items-center">
            <Search className="pointer-events-none absolute left-3 size-4 text-slate-400 dark:text-slate-400" />
            <input
              type="search"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search tuitions or tutors..."
              aria-label="Mobile search tuitions or tutors"
              className="h-10 w-full rounded-xl border border-teal-200/70 bg-teal-50/40 pr-8 pl-9 text-xs font-medium text-slate-800 placeholder:text-slate-400 focus:border-teal-500 focus:bg-white focus:outline-none dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:placeholder:text-slate-400 dark:focus:border-teal-400"
            />
            <button
              type="button"
              onClick={() => setMobileSearchOpen(false)}
              aria-label="Close mobile search"
              className="absolute right-2 grid size-6 place-items-center rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white"
            >
              <X className="size-3.5" />
            </button>
          </div>
        </form>
      )}
    </header>
  )
}