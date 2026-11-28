"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

interface BackButtonProps {
  /** History না থাকলে (সরাসরি লিংকে ঢুকলে) এই path-এ যাবে। */
  fallbackHref?: string;
  label?: string;
  className?: string;
}

const DEFAULT_CLASS =
  "inline-flex items-center gap-2 rounded-xl border border-slate-200/90 bg-white/90 px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-2xs transition hover:border-amber-400/60 hover:text-amber-800 dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-200 dark:hover:border-amber-300/40 dark:hover:text-amber-300";

/**
 * হিন্ট: Client-side back button.
 * আগের পেজ থাকলে browser history তে ফিরে যায় (router.back), নাহলে
 * fallbackHref এ push করে — তাই সরাসরি লিংক শেয়ার করেও পেজ আটকে যায় না।
 */
export default function BackButton({
  fallbackHref = "/",
  label = "Back",
  className,
}: BackButtonProps) {
  const router = useRouter();

  const handleBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
      return;
    }

    router.push(fallbackHref);
  };

  return (
    <button
      type="button"
      onClick={handleBack}
      title={label}
      aria-label={label}
      className={className || DEFAULT_CLASS}
    >
      <ArrowLeft className="h-4 w-4" />
      <span>{label}</span>
    </button>
  );
}
