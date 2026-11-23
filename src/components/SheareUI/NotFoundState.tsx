import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Compass,
  CreditCard,
  Home,
  LayoutDashboard,
  LifeBuoy,
  Sparkles,
} from "lucide-react";

export interface NotFoundLink {
  label: string;
  href: string;
  description?: string;
}

export interface NotFoundStateProps {
  /** Small eyebrow text above the title. */
  eyebrow?: string;
  title?: string;
  description?: string;
  homeHref?: string;
  homeLabel?: string;
  browseHref?: string;
  browseLabel?: string;
  /** Extra helpful links shown under the actions. */
  links?: NotFoundLink[];
  className?: string;
  compact?: boolean;
}

const DEFAULT_LINKS: NotFoundLink[] = [
  {
    label: "Home",
    href: "/",
    description: "Back to the MentorLagbe landing page",
  },
  {
    label: "Browse tuitions",
    href: "/browsetuitions",
    description: "Find an online or offline tuition",
  },
  {
    label: "Pricing",
    href: "/pricing",
    description: "Compare student and tutor plans",
  },
];

const LINK_ICONS = [Home, BookOpen, CreditCard, LayoutDashboard];

/**
 * Shared 404 screen. Server component — not-found.tsx file gulo te direct use hoy.
 */
export default function NotFoundState({
  eyebrow = "Error 404",
  title = "This page took a wrong turn",
  description = "The page you are looking for was moved, renamed, or never existed. Let's get you back to something useful.",
  homeHref = "/",
  homeLabel = "Back to home",
  browseHref = "/browsetuitions",
  browseLabel = "Browse tuitions",
  links,
  className = "",
  compact = false,
}: NotFoundStateProps) {
  const quickLinks = links && links.length > 0 ? links : DEFAULT_LINKS;

  return (
    <section
      className={`relative isolate flex w-full items-center justify-center overflow-hidden px-3 py-12 sm:px-6 sm:py-16 ${
        compact ? "min-h-[62vh]" : "min-h-[74vh]"
      } ${className}`}
    >
      {/* Decorative background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 ml-grid-pattern opacity-70"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-4 -z-10 h-56 w-56 rounded-full bg-teal-400/20 blur-3xl dark:bg-cyan-500/15 sm:h-80 sm:w-80"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 bottom-0 -z-10 h-56 w-56 rounded-full bg-amber-300/25 blur-3xl dark:bg-amber-400/10 sm:h-80 sm:w-80"
      />

      <div className="w-full max-w-3xl">
        <div className="relative overflow-hidden rounded-3xl border border-teal-500/20 bg-white/90 p-5 text-center shadow-[0_30px_80px_-40px_rgba(13,148,136,0.45)] backdrop-blur-xl dark:border-cyan-400/20 dark:bg-slate-900/80 dark:shadow-[0_30px_80px_-40px_rgba(34,211,238,0.35)] sm:rounded-[2rem] sm:p-10">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-teal-600 via-cyan-400 to-amber-400"
          />

          {/* Orbit / compass visual */}
          <div className="relative mx-auto flex h-24 w-24 items-center justify-center sm:h-32 sm:w-32">
            <span
              aria-hidden="true"
              className="absolute inset-0 rounded-full border border-teal-500/25 dark:border-cyan-400/25"
            />
            <span
              aria-hidden="true"
              className="absolute inset-3 rounded-full border border-dashed border-teal-500/30 dark:border-cyan-400/30"
            />
            <span
              aria-hidden="true"
              className="absolute inset-6 rounded-full bg-gradient-to-br from-teal-500/15 via-cyan-400/10 to-transparent dark:from-cyan-400/20 dark:via-teal-400/10"
            />
            <Compass className="relative h-9 w-9 text-teal-700 dark:text-cyan-300 sm:h-12 sm:w-12" />
            <span className="absolute -right-1 -top-1 flex h-7 w-7 items-center justify-center rounded-full border border-amber-400/40 bg-amber-400/20 text-amber-700 shadow-sm dark:text-amber-300 sm:h-8 sm:w-8">
              <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </span>
          </div>

          <div className="mt-4 flex flex-col items-center gap-1">
            <span className="text-[10px] font-extrabold uppercase tracking-[0.32em] text-teal-700 dark:text-cyan-300 sm:text-xs">
              {eyebrow}
            </span>
            <span
              aria-hidden="true"
              className="bg-gradient-to-r from-teal-600 via-cyan-500 to-amber-500 bg-clip-text text-5xl font-black leading-none tracking-tighter text-transparent dark:from-cyan-300 dark:via-teal-300 dark:to-amber-300 sm:text-7xl"
            >
              404
            </span>
          </div>

          <h1 className="mt-3 text-xl font-black tracking-tight text-slate-900 dark:text-white sm:text-2xl md:text-3xl">
            {title}
          </h1>
          <p className="mx-auto mt-2 max-w-xl text-xs leading-relaxed text-slate-600 dark:text-slate-300 sm:text-sm">
            {description}
          </p>

          <div className="mt-6 grid gap-2 sm:flex sm:flex-wrap sm:items-center sm:justify-center">
            <Link
              href={homeHref}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-teal-700 to-cyan-600 px-5 text-xs font-extrabold text-white shadow-sm transition hover:brightness-110 focus:outline-none focus-visible:ring-4 focus-visible:ring-teal-500/25 active:scale-[0.99] dark:from-cyan-400 dark:to-teal-400 dark:text-slate-950 sm:text-sm"
            >
              <Home className="h-4 w-4" />
              <span>{homeLabel}</span>
            </Link>
            <Link
              href={browseHref}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 text-xs font-bold text-slate-700 transition hover:border-teal-500/50 hover:text-teal-700 dark:border-slate-700 dark:bg-slate-950/70 dark:text-slate-200 dark:hover:border-cyan-400/50 dark:hover:text-cyan-300 sm:text-sm"
            >
              <BookOpen className="h-4 w-4" />
              <span>{browseLabel}</span>
            </Link>
          </div>
        </div>

        {/* Helpful links */}
        <div className="mt-4 grid grid-cols-1 gap-2 sm:mt-5 sm:grid-cols-2">
          {quickLinks.map((link, index) => {
            const Icon = LINK_ICONS[index % LINK_ICONS.length];
            return (
              <Link
                key={`${link.href}-${link.label}`}
                href={link.href}
                className="group flex items-center gap-3 rounded-2xl border border-slate-200/80 bg-white/80 px-3 py-2.5 text-left transition hover:-translate-y-0.5 hover:border-teal-500/40 hover:shadow-sm dark:border-slate-800 dark:bg-slate-900/60 dark:hover:border-cyan-400/40"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-teal-500/10 text-teal-700 dark:bg-cyan-400/10 dark:text-cyan-300">
                  <Icon className="h-4 w-4" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-xs font-bold text-slate-800 dark:text-slate-100 sm:text-sm">
                    {link.label}
                  </span>
                  {link.description && (
                    <span className="block truncate text-[11px] text-slate-500 dark:text-slate-400">
                      {link.description}
                    </span>
                  )}
                </span>
                <ArrowRight className="h-4 w-4 shrink-0 text-slate-400 transition group-hover:translate-x-0.5 group-hover:text-teal-600 dark:group-hover:text-cyan-300" />
              </Link>
            );
          })}
        </div>

        <p className="mt-4 flex items-center justify-center gap-1.5 text-center text-[11px] text-slate-500 dark:text-slate-400 sm:text-xs">
          <LifeBuoy className="h-3.5 w-3.5" />
          <span>
            Broken link? Mail us at{" "}
            <span className="font-semibold text-teal-700 dark:text-cyan-300">
              support@mentorlagbe.com
            </span>
          </span>
        </p>
      </div>
    </section>
  );
}
