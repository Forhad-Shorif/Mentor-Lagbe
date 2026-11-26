"use client";

import Image from "next/image";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowRight01Icon,
  CheckmarkBadge01Icon,
  CustomerService01Icon,
  Mortarboard01Icon,
  Search01Icon,
  SecurityCheckIcon,
  SparklesIcon,
  StarIcon,
  UserGroupIcon,
} from "@hugeicons/core-free-icons";

// Trust badge gulo ek jaygay rakha hoyeche (icon + text)
const trustBadges = [
  { label: "Verified Tutors", icon: CheckmarkBadge01Icon },
  { label: "Secure Payments", icon: SecurityCheckIcon },
  { label: "24/7 Support", icon: CustomerService01Icon },
];

// Chhoto stat card (banner er niche)
const heroStats = [
  { value: "50K+", label: "Happy Students", icon: UserGroupIcon },
  { value: "4.8/5", label: "Trusted Rating", icon: StarIcon },
  { value: "10K+", label: "Expert Tutors", icon: Mortarboard01Icon },
];

const HeroBanner = () => {
  return (
    <section className="relative isolate overflow-hidden">
      {/* ---------- Background (soft gradient + blobs) ---------- */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-teal-50 via-white to-white dark:from-[#061319] dark:via-[#050b10] dark:to-[#050b10]" />
        <div className="absolute -left-24 top-4 size-72 rounded-full bg-teal-200/50 blur-3xl dark:bg-teal-500/10" />
        <div className="absolute -right-16 top-0 size-[26rem] rounded-full bg-cyan-200/50 blur-3xl dark:bg-cyan-500/10" />
        <div className="absolute bottom-0 left-1/3 size-64 rounded-full bg-emerald-100/60 blur-3xl dark:bg-emerald-500/10" />
      </div>

      <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-4 pb-12 pt-8 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-4 lg:pb-16 lg:pt-12">
        {/* ---------- Left: text + search ---------- */}
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-white/80 px-3.5 py-1.5 text-xs font-semibold text-teal-700 shadow-sm backdrop-blur dark:border-teal-400/30 dark:bg-white/5 dark:text-teal-200">
            <HugeiconsIcon icon={SparklesIcon} size={14} strokeWidth={2} />
            Tuition marketplace for Bangladesh
          </span>

          <h1 className="mt-5 text-4xl font-extrabold leading-[1.06] tracking-tight text-neutral-900 sm:text-5xl lg:text-[3.4rem] dark:text-white">
            Find the Right{" "}
            <span className="relative inline-block text-teal-600 dark:text-teal-300">
              Tutor
              {/* Headline-er niche hand-drawn underline */}
              <svg
                aria-hidden
                viewBox="0 0 140 12"
                fill="none"
                className="absolute -bottom-1.5 left-0 h-3 w-full text-teal-400/80 dark:text-teal-300/70"
              >
                <path
                  d="M3 8.5C34 3.5 78 2.5 137 5.5"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            ,
            <br className="hidden sm:block" /> Achieve Your{" "}
            <span className="relative inline-block text-teal-600 dark:text-teal-300">
              Goals
              <svg
                aria-hidden
                viewBox="0 0 140 12"
                fill="none"
                className="absolute -bottom-1.5 left-0 h-3 w-full text-teal-400/80 dark:text-teal-300/70"
              >
                <path
                  d="M3 8.5C34 3.5 78 2.5 137 5.5"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>

          <p className="mt-5 max-w-lg text-base leading-relaxed text-neutral-600 dark:text-neutral-300">
            Learn anything, anytime — from expert tutors online or near you.
            Post a tuition, compare verified tutors and start learning within
            days.
          </p>

          {/* ---------- Search form ---------- */}
          <form
            action="/browsetuitions"
            className="mt-7 flex max-w-xl flex-col gap-2 rounded-[26px] border border-teal-100 bg-white/90 p-2 shadow-[0_18px_36px_-28px_rgba(13,148,136,0.8)] backdrop-blur sm:flex-row sm:items-center dark:border-white/10 dark:bg-white/5"
          >
            <label className="flex flex-1 items-center gap-2.5 px-3">
              <HugeiconsIcon
                icon={Search01Icon}
                size={19}
                strokeWidth={1.8}
                className="shrink-0 text-neutral-400"
              />
              <input
                type="search"
                name="q"
                placeholder="Search a tutor (e.g. Math, English, Physics...)"
                className="w-full bg-transparent py-3 text-sm text-neutral-800 outline-none placeholder:text-neutral-400 dark:text-white dark:placeholder:text-neutral-500"
              />
            </label>

            <button
              type="submit"
              className="inline-flex items-center justify-center gap-1.5 rounded-2xl bg-gradient-to-r from-teal-600 to-teal-700 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-teal-600/25 transition-all hover:from-teal-500 hover:to-teal-600"
            >
              Search
              <HugeiconsIcon icon={ArrowRight01Icon} size={16} strokeWidth={2} />
            </button>
          </form>

          {/* ---------- Trust badges ---------- */}
          <div className="mt-5 flex flex-wrap items-center gap-2.5">
            {trustBadges.map((badge) => (
              <span
                key={badge.label}
                className="inline-flex items-center gap-1.5 rounded-full border border-teal-100 bg-white/70 px-3 py-1.5 text-xs font-medium text-neutral-700 shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-neutral-200"
              >
                <HugeiconsIcon
                  icon={badge.icon}
                  size={15}
                  strokeWidth={1.9}
                  className="text-teal-600 dark:text-teal-300"
                />
                {badge.label}
              </span>
            ))}
          </div>

          {/* ---------- Mini stats ---------- */}
          <div className="mt-7 grid max-w-xl grid-cols-3 gap-2.5">
            {heroStats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-teal-100/80 bg-white/80 px-2.5 py-3 text-center shadow-sm dark:border-white/10 dark:bg-white/5"
              >
                <span className="mx-auto grid size-8 place-items-center rounded-full bg-teal-50 text-teal-600 dark:bg-teal-400/10 dark:text-teal-300">
                  <HugeiconsIcon icon={stat.icon} size={16} strokeWidth={1.9} />
                </span>
                <p className="mt-2 text-base font-bold tracking-tight text-neutral-900 dark:text-white">
                  {stat.value}
                </p>
                <p className="text-[11px] font-medium text-neutral-500 dark:text-neutral-400">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ---------- Right: banner image ---------- */}
        <div className="relative mx-auto w-full max-w-[600px] lg:max-w-none">
          {/* Image-er pichone soft blob */}
          <div
            aria-hidden
            className="absolute inset-x-3 bottom-4 top-4 rounded-[46%_54%_38%_62%/52%_44%_56%_48%] bg-gradient-to-br from-teal-200/80 via-cyan-100/70 to-transparent dark:from-teal-500/15 dark:via-cyan-500/10"
          />

          <Image
            src="/OpBanner.png"
            alt="A student learning with a tutor"
            width={1672}
            height={941}
            preload
            sizes="(max-width: 1024px) 92vw, 560px"
            className="relative h-auto w-full drop-shadow-[0_30px_45px_rgba(13,148,136,0.20)]"
          />

          {/* Floating note (reference image er moto) */}
          <div className="absolute -right-1 top-0 rotate-6 rounded-2xl border border-teal-100 bg-white/90 px-3.5 py-2 text-xs font-semibold leading-tight text-teal-700 shadow-md backdrop-blur dark:border-white/10 dark:bg-neutral-900/80 dark:text-teal-200">
            Learn
            <br />
            Grow
            <br />
            Succeed
          </div>

          {/* Floating verified badge */}
          <div className="absolute -left-1 bottom-6 inline-flex items-center gap-1.5 rounded-full border border-teal-100 bg-white/95 px-3 py-1.5 text-[11px] font-semibold text-teal-700 shadow-md dark:border-white/10 dark:bg-neutral-900/90 dark:text-teal-200">
            <HugeiconsIcon
              icon={CheckmarkBadge01Icon}
              size={15}
              strokeWidth={2}
              className="text-teal-500"
            />
            Verified tutor
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
