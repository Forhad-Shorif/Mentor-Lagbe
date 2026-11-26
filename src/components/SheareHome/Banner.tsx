"use client";

import React, { useEffect, useState } from "react";
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

type UserItem = {
  _id?: string;
  id?: string | number;
  role?: string;
};

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";

const trustBadges = [
  {
    label: "Verified Tutors",
    icon: CheckmarkBadge01Icon,
    iconColor: "text-amber-600 dark:text-amber-300",
    ring: "border-amber-300/80 bg-gradient-to-r from-amber-50/90 via-white to-slate-100/80 dark:border-amber-400/25 dark:from-amber-400/10 dark:via-white/[0.04] dark:to-slate-400/10",
  },
  {
    label: "Secure Payments",
    icon: SecurityCheckIcon,
    iconColor: "text-cyan-600 dark:text-cyan-300",
    ring: "border-cyan-300/80 bg-gradient-to-r from-cyan-50/90 via-white to-slate-100/80 dark:border-cyan-400/25 dark:from-cyan-400/10 dark:via-white/[0.04] dark:to-slate-400/10",
  },
  {
    label: "24/7 Support",
    icon: CustomerService01Icon,
    iconColor: "text-fuchsia-600 dark:text-fuchsia-300",
    ring: "border-fuchsia-300/80 bg-gradient-to-r from-fuchsia-50/80 via-white to-amber-50/80 dark:border-fuchsia-400/25 dark:from-fuchsia-400/10 dark:via-white/[0.04] dark:to-amber-400/10",
  },
];

const HeroBanner = () => {
  const [studentCount, setStudentCount] = useState(0);
  const [tutorCount, setTutorCount] = useState(0);

  // হিন্ট: শুধু fetch দিয়ে ${API_BASE}/GetUsers থেকে ইউজার এনে role ফিল্টার করা হচ্ছে।
  useEffect(() => {
    let active = true;

    async function fetchUsers() {
      try {
        const res = await fetch(`${API_BASE}/GetUsers`, { cache: "no-store" });
        if (!res.ok) return;

        const data = await res.json();
        const users: UserItem[] = Array.isArray(data)
          ? data
          : Array.isArray(data?.users)
          ? data.users
          : Array.isArray(data?.data)
          ? data.data
          : [];

        const StudentsCount = users.filter((user) => user?.role === "students")
         const students = StudentsCount.length

        const TeachesrCount = users.filter((u) => u?.role === "teachers")
        const teachers = TeachesrCount.length

        if (active) {
          setStudentCount(students);
          setTutorCount(teachers);
        }
      } catch {
        // এরর হলে 0 হিসেবেই থাকবে
      }
    }

    fetchUsers();

    return () => {
      active = false;
    };
  }, []);

  // TODO: রিভিউ API যুক্ত হলে real average rating বসাবেন; না থাকলে সাময়িকভাবে "No reviews yet"।
  const ratingValue = "No reviews yet";

  return (
    <section className="relative isolate overflow-hidden">
      {/* ---------- Background (Golden + Prismatic + Silver Aura) ---------- */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-50/75 via-slate-50/70 to-white dark:from-[#09121a] dark:via-[#060d14] dark:to-[#050b10]" />
        <div className="absolute -left-24 top-4 size-80 rounded-full bg-amber-300/35 blur-3xl dark:bg-amber-400/12" />
        <div className="absolute -right-16 top-2 size-[26rem] rounded-full bg-gradient-to-br from-cyan-200/45 via-fuchsia-200/30 to-amber-200/40 blur-3xl dark:from-cyan-500/12 dark:via-fuchsia-500/10 dark:to-amber-400/12" />
        <div className="absolute bottom-0 left-1/3 size-72 rounded-full bg-slate-200/60 blur-3xl dark:bg-slate-400/10" />
      </div>

      <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-4 pb-12 pt-8 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-6 lg:pb-16 lg:pt-12">
        {/* ---------- Left: text + search ---------- */}
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-amber-300/90 bg-gradient-to-r from-amber-50 via-white to-slate-100/90 px-3.5 py-1.5 text-xs font-bold text-amber-800 shadow-[0_6px_20px_-10px_rgba(217,119,6,0.45)] backdrop-blur dark:border-amber-300/30 dark:from-amber-400/10 dark:via-white/[0.05] dark:to-slate-300/10 dark:text-amber-200">
            <HugeiconsIcon
              icon={SparklesIcon}
              size={14}
              strokeWidth={2}
              className="text-amber-600 dark:text-amber-300"
            />
            Tuition marketplace for Bangladesh
          </span>

          <h1 className="mt-5 text-4xl font-extrabold leading-[1.06] tracking-tight text-neutral-900 sm:text-5xl lg:text-[3.4rem] dark:text-white">
            Find the Right{" "}
            <span className="relative inline-block bg-gradient-to-r from-amber-600 via-yellow-500 to-teal-600 bg-clip-text text-transparent dark:from-amber-300 dark:via-yellow-200 dark:to-cyan-300">
              Tutor
              <svg
                aria-hidden
                viewBox="0 0 140 12"
                fill="none"
                className="absolute -bottom-1.5 left-0 h-3 w-full text-amber-400/90 dark:text-amber-300/80"
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
            <span className="relative inline-block bg-gradient-to-r from-teal-600 via-violet-600 to-amber-600 bg-clip-text text-transparent dark:from-cyan-300 dark:via-fuchsia-300 dark:to-amber-300">
              Goals
              <svg
                aria-hidden
                viewBox="0 0 140 12"
                fill="none"
                className="absolute -bottom-1.5 left-0 h-3 w-full text-cyan-400/90 dark:text-cyan-300/80"
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

          {/* ---------- Search form (Golden + Silver Rim) ---------- */}
          <form
            action="/browsetuitions"
            className="mt-7 flex max-w-xl flex-col gap-2 rounded-[26px] border border-amber-300/85 bg-gradient-to-r from-white via-slate-50/90 to-amber-50/70 p-2 shadow-[0_20px_42px_-26px_rgba(217,119,6,0.55)] backdrop-blur sm:flex-row sm:items-center dark:border-amber-300/25 dark:from-[#0c1620] dark:via-[#09121a] dark:to-[#141310]"
          >
            <label className="flex flex-1 items-center gap-2.5 px-3">
              <HugeiconsIcon
                icon={Search01Icon}
                size={19}
                strokeWidth={1.8}
                className="shrink-0 text-amber-600 dark:text-amber-300"
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
              className="inline-flex items-center justify-center gap-1.5 rounded-2xl bg-gradient-to-r from-amber-500 via-teal-600 to-cyan-600 px-6 py-3 text-sm font-bold text-white shadow-[0_12px_24px_-10px_rgba(217,119,6,0.75)] transition-all duration-200 hover:-translate-y-0.5 hover:brightness-105 dark:from-amber-400 dark:via-teal-400 dark:to-cyan-400 dark:text-[#04121a] cursor-pointer"
            >
              Search
              <HugeiconsIcon icon={ArrowRight01Icon} size={16} strokeWidth={2.2} />
            </button>
          </form>

          {/* ---------- Trust badges ---------- */}
          <div className="mt-5 flex flex-wrap items-center gap-2.5">
            {trustBadges.map((badge) => (
              <span
                key={badge.label}
                className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold text-neutral-700 shadow-2xs transition-transform duration-200 hover:-translate-y-0.5 dark:text-neutral-200 ${badge.ring}`}
              >
                <HugeiconsIcon
                  icon={badge.icon}
                  size={15}
                  strokeWidth={2}
                  className={badge.iconColor}
                />
                {badge.label}
              </span>
            ))}
          </div>

          {/* ---------- Role-Filtered Stats ---------- */}
          <div className="mt-7 grid max-w-xl grid-cols-3 gap-2.5">
            <div className="rounded-2xl border border-amber-300/80 bg-gradient-to-b from-white via-slate-50/75 to-amber-50/40 px-2.5 py-3 text-center shadow-[0_12px_28px_-22px_rgba(15,23,42,0.45)] transition-all duration-200 hover:-translate-y-0.5 hover:border-amber-400 dark:border-amber-400/20 dark:from-white/[0.06] dark:via-white/[0.03] dark:to-transparent dark:hover:border-amber-300/45">
              <span className="mx-auto grid size-8 place-items-center rounded-full bg-gradient-to-br from-amber-400/25 to-yellow-500/20 text-amber-700 ring-1 ring-amber-400/40 dark:text-amber-300">
                <HugeiconsIcon icon={UserGroupIcon} size={16} strokeWidth={2} />
              </span>
              <p className="mt-2 bg-gradient-to-r from-neutral-900 via-amber-800 to-slate-800 bg-clip-text text-sm font-extrabold tracking-tight text-transparent sm:text-base dark:from-white dark:via-amber-200 dark:to-slate-200">
                {studentCount}
              </p>
              <p className="text-[11px] font-medium text-neutral-500 dark:text-neutral-400">
                Happy Students
              </p>
            </div>

            <div className="rounded-2xl border border-slate-300/90 bg-gradient-to-b from-white via-slate-50/75 to-amber-50/40 px-2.5 py-3 text-center shadow-[0_12px_28px_-22px_rgba(15,23,42,0.45)] transition-all duration-200 hover:-translate-y-0.5 hover:border-cyan-400 dark:border-white/15 dark:from-white/[0.06] dark:via-white/[0.03] dark:to-transparent dark:hover:border-cyan-300/45">
              <span className="mx-auto grid size-8 place-items-center rounded-full bg-gradient-to-br from-slate-200/90 via-white to-cyan-200/60 text-slate-700 ring-1 ring-slate-300/90 dark:from-slate-300/20 dark:to-cyan-300/15 dark:text-slate-200">
                <HugeiconsIcon icon={StarIcon} size={16} strokeWidth={2} />
              </span>
              <p className="mt-2 bg-gradient-to-r from-neutral-900 via-amber-800 to-slate-800 bg-clip-text text-sm font-extrabold tracking-tight text-transparent sm:text-base dark:from-white dark:via-amber-200 dark:to-slate-200">
                {ratingValue}
              </p>
              <p className="text-[11px] font-medium text-neutral-500 dark:text-neutral-400">
                Tutor Rating
              </p>
            </div>

            <div className="rounded-2xl border border-violet-300/80 bg-gradient-to-b from-white via-slate-50/75 to-amber-50/40 px-2.5 py-3 text-center shadow-[0_12px_28px_-22px_rgba(15,23,42,0.45)] transition-all duration-200 hover:-translate-y-0.5 hover:border-violet-400 dark:border-violet-400/20 dark:from-white/[0.06] dark:via-white/[0.03] dark:to-transparent dark:hover:border-violet-300/45">
              <span className="mx-auto grid size-8 place-items-center rounded-full bg-gradient-to-br from-violet-400/20 via-teal-400/20 to-amber-300/25 text-violet-700 ring-1 ring-violet-400/35 dark:text-violet-300">
                <HugeiconsIcon icon={Mortarboard01Icon} size={16} strokeWidth={2} />
              </span>
              <p className="mt-2 bg-gradient-to-r from-neutral-900 via-amber-800 to-slate-800 bg-clip-text text-sm font-extrabold tracking-tight text-transparent sm:text-base dark:from-white dark:via-amber-200 dark:to-slate-200">
                {tutorCount}
              </p>
              <p className="text-[11px] font-medium text-neutral-500 dark:text-neutral-400">
                Expert Tutors
              </p>
            </div>
          </div>
        </div>

        {/* ---------- Right: banner image (Golden + Silver + Prismatic Halo) ---------- */}
        <div className="relative mx-auto w-full max-w-[600px] lg:max-w-none">
          <div
            aria-hidden
            className="absolute inset-x-3 bottom-4 top-4 rounded-[46%_54%_38%_62%/52%_44%_56%_48%] bg-gradient-to-br from-amber-300/55 via-cyan-200/45 to-slate-300/55 blur-xl dark:from-amber-400/20 dark:via-cyan-400/15 dark:to-slate-400/15"
          />

          <div className="relative overflow-hidden rounded-[32px] border border-amber-300/75 bg-gradient-to-br from-white/70 via-slate-50/50 to-amber-50/50 p-1.5 shadow-[0_28px_60px_-25px_rgba(217,119,6,0.35)] backdrop-blur-xs dark:border-amber-300/25 dark:from-white/[0.05] dark:via-white/[0.02] dark:to-amber-400/[0.04]">
            <Image
              src="/OpBanner.png"
              alt="A student learning with a tutor"
              width={1672}
              height={941}
              preload
              sizes="(max-width: 1024px) 92vw, 560px"
              className="relative h-auto w-full rounded-[26px] drop-shadow-[0_24px_35px_rgba(15,23,42,0.16)]"
            />
          </div>

          {/* Floating golden & prismatic note */}
          <div className="absolute -right-1 top-2 rotate-6 rounded-2xl border border-amber-300/90 bg-gradient-to-br from-amber-50 via-white to-yellow-100/80 px-3.5 py-2 text-xs font-extrabold leading-tight text-amber-800 shadow-lg backdrop-blur dark:border-amber-300/35 dark:from-[#1d1911] dark:via-[#141820] dark:to-[#191610] dark:text-amber-200">
            <span className="bg-gradient-to-r from-amber-600 via-fuchsia-600 to-cyan-600 bg-clip-text text-transparent dark:from-amber-300 dark:via-fuchsia-300 dark:to-cyan-300">
              Learn
              <br />
              Grow
              <br />
              Succeed
            </span>
          </div>

          {/* Floating silver & golden verified badge */}
          <div className="absolute -left-1 bottom-6 inline-flex items-center gap-1.5 rounded-full border border-slate-300/90 bg-gradient-to-r from-white via-slate-100/95 to-amber-50/90 px-3.5 py-1.5 text-[11px] font-bold text-slate-800 shadow-lg dark:border-slate-400/30 dark:from-[#111922] dark:via-[#0d151e] dark:to-[#181611] dark:text-amber-200">
            <HugeiconsIcon
              icon={CheckmarkBadge01Icon}
              size={15}
              strokeWidth={2.2}
              className="text-amber-500 dark:text-amber-300"
            />
            Verified tutor
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;