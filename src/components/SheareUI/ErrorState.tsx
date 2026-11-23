"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Home,
  LifeBuoy,
  RefreshCw,
  TriangleAlert,
} from "lucide-react";

export interface ErrorStateProps {
  /** Error object passed by the Next.js error boundary. */
  error?: unknown;
  /** Next 16 stable retry callback (re-fetches + re-renders the segment). */
  retry?: () => void;
  /** Older reset callback (kept as fallback). */
  reset?: () => void;
  title?: string;
  description?: string;
  homeHref?: string;
  homeLabel?: string;
  variant?: "public" | "dashboard" | "minimal";
  showBack?: boolean;
  className?: string;
}

function getErrorDetails(error: unknown) {
  if (typeof error === "string") {
    return { message: error, digest: "" };
  }

  if (error && typeof error === "object") {
    const value = error as { message?: unknown; digest?: unknown };
    return {
      message: typeof value.message === "string" ? value.message : "",
      digest: typeof value.digest === "string" ? value.digest : "",
    };
  }

  return { message: "", digest: "" };
}

/**
 * Shared error screen. Ei component ta error.tsx file gulo te use hoy,
 * tai ek jayga theke style change korlei sob page e apply hobe.
 */
export default function ErrorState({
  error,
  retry,
  reset,
  title = "We hit a small bump",
  description = "This section could not load right now. Your data is safe — please try again, or head back to a working page.",
  homeHref = "/",
  homeLabel = "Go to homepage",
  variant = "public",
  showBack = true,
  className = "",
}: ErrorStateProps) {
  const router = useRouter();
  const { message, digest } = getErrorDetails(error);

  const handleRetry = () => {
    if (typeof retry === "function") {
      retry();
      return;
    }
    if (typeof reset === "function") {
      reset();
      return;
    }
    if (typeof window !== "undefined") {
      window.location.reload();
    }
  };

  const minHeight =
    variant === "minimal"
      ? "min-h-[60vh]"
      : variant === "dashboard"
        ? "min-h-[68vh]"
        : "min-h-[72vh]";

  return (
    <section
      role="alert"
      aria-live="polite"
      className={`relative isolate flex w-full items-center justify-center overflow-hidden px-3 py-10 sm:px-6 sm:py-14 ${minHeight} ${className}`}
    >
      {/* Decorative background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 ml-grid-pattern opacity-60"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-0 -z-10 h-56 w-56 rounded-full bg-rose-400/20 blur-3xl dark:bg-rose-500/15 sm:h-72 sm:w-72"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 bottom-0 -z-10 h-56 w-56 rounded-full bg-teal-400/20 blur-3xl dark:bg-cyan-500/15 sm:h-72 sm:w-72"
      />

      <div className="w-full max-w-2xl">
        <div className="relative overflow-hidden rounded-3xl border border-rose-300/40 bg-white/90 p-5 text-center shadow-[0_24px_70px_-32px_rgba(244,63,94,0.35)] backdrop-blur-xl dark:border-rose-400/25 dark:bg-slate-900/80 dark:shadow-[0_24px_70px_-32px_rgba(244,63,94,0.45)] sm:rounded-[2rem] sm:p-9">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-rose-500 via-amber-400 to-teal-500"
          />

          {/* Icon */}
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-rose-400/40 bg-gradient-to-br from-rose-500/20 via-amber-400/15 to-transparent text-rose-600 shadow-inner dark:border-rose-400/30 dark:text-rose-300 sm:h-20 sm:w-20">
            <span className="relative flex items-center justify-center">
              <span
                aria-hidden="true"
                className="absolute inline-flex h-10 w-10 animate-ping rounded-full bg-rose-400/30 sm:h-12 sm:w-12"
              />
              <TriangleAlert className="relative h-7 w-7 sm:h-9 sm:w-9" />
            </span>
          </div>

          <span className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-rose-400/35 bg-rose-500/10 px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.18em] text-rose-700 dark:border-rose-400/25 dark:text-rose-300 sm:text-[11px]">
            <LifeBuoy className="h-3 w-3" />
            <span>Unexpected error</span>
          </span>

          <h1 className="mt-3 text-xl font-black tracking-tight text-slate-900 dark:text-white sm:text-2xl md:text-3xl">
            {title}
          </h1>
          <p className="mx-auto mt-2 max-w-lg text-xs leading-relaxed text-slate-600 dark:text-slate-300 sm:text-sm">
            {description}
          </p>

          {/* Actions */}
          <div className="mt-6 grid gap-2 sm:flex sm:flex-wrap sm:items-center sm:justify-center">
            <button
              type="button"
              onClick={handleRetry}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-teal-700 to-cyan-600 px-5 text-xs font-extrabold text-white shadow-sm transition hover:brightness-110 focus:outline-none focus-visible:ring-4 focus-visible:ring-teal-500/25 active:scale-[0.99] dark:from-cyan-400 dark:to-teal-400 dark:text-slate-950 sm:text-sm"
            >
              <RefreshCw className="h-4 w-4" />
              <span>Try again</span>
            </button>

            <Link
              href={homeHref}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 text-xs font-bold text-slate-700 transition hover:border-teal-500/50 hover:text-teal-700 dark:border-slate-700 dark:bg-slate-950/70 dark:text-slate-200 dark:hover:border-cyan-400/50 dark:hover:text-cyan-300 sm:text-sm"
            >
              <Home className="h-4 w-4" />
              <span>{homeLabel}</span>
            </Link>

            {showBack && (
              <button
                type="button"
                onClick={() => router.back()}
                className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-transparent px-4 text-xs font-bold text-slate-500 transition hover:bg-slate-100 hover:text-slate-800 dark:text-slate-400 dark:hover:bg-white/5 dark:hover:text-white sm:text-sm"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Go back</span>
              </button>
            )}
          </div>

          {/* Technical details (collapsed by default) */}
          {(message || digest) && (
            <details className="group mt-6 rounded-2xl border border-slate-200/80 bg-slate-50/80 px-4 py-3 text-left dark:border-slate-800 dark:bg-slate-950/60">
              <summary className="cursor-pointer list-none text-[11px] font-bold uppercase tracking-wider text-slate-500 transition hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200">
                <span className="inline-flex items-center gap-1.5">
                  <TriangleAlert className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400" />
                  Technical details
                </span>
              </summary>
              <div className="mt-2 space-y-1 break-words font-mono text-[11px] leading-relaxed text-slate-600 dark:text-slate-300">
                {message && <p>{message}</p>}
                {digest && (
                  <p className="text-slate-400 dark:text-slate-500">
                    Digest: {digest}
                  </p>
                )}
              </div>
            </details>
          )}
        </div>

        <p className="mt-4 text-center text-[11px] text-slate-500 dark:text-slate-400 sm:text-xs">
          Still stuck? Try refreshing the page or contact{" "}
          <span className="font-semibold text-teal-700 dark:text-cyan-300">
            support@mentorlagbe.com
          </span>
        </p>
      </div>
    </section>
  );
}
