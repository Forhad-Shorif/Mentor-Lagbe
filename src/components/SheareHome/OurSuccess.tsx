"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowRight01Icon,
  CheckmarkBadge01Icon,
  EarthIcon,
  Location01Icon,
  StarIcon,
} from "@hugeicons/core-free-icons";

type TuitionItem = {
  _id?: string;
  deliveryMode?: string;
  mode?: string;
  location?: string;
  area?: string;
};

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";

// TODO: পরে রিভিউ API এলে আসল রেটিং বসাবেন; আপাতত "No rating yet" রাখা হয়েছে।
const NO_RATING_TEXT = "No rating yet";

const OurSuccessStats = () => {
  const [onlineCount, setOnlineCount] = useState(0);
  const [offlineCount, setOfflineCount] = useState(0);
  const [areaCount, setAreaCount] = useState(0);

  // হিন্ট: limit ছাড়াই ${API_BASE}/TuitionsSearch?status=active থেকে সব একটিভ টিউশন আনা হচ্ছে।
  useEffect(() => {
    let active = true;

    async function loadTuitions() {
      try {
        const res = await fetch(`${API_BASE}/TuitionsSearch?status=active`, {
          cache: "no-store",
        });
        if (!res.ok) return;

        const data = await res.json();
        const items: TuitionItem[] = Array.isArray(data)
          ? data
          : Array.isArray(data?.tuitions)
          ? data.tuitions
          : Array.isArray(data?.data)
          ? data.data
          : [];

        let online = 0;
        let offline = 0;
        const uniqueAreas = new Set<string>();

        for (const item of items) {
          const modeValue = String(item?.deliveryMode || item?.mode || "")
            .trim()
            .toLowerCase();

          if (modeValue.includes("online")) {
            online += 1;
          }
          if (modeValue.includes("offline") || modeValue.includes("hybrid")) {
            offline += 1;
          }

          const rawArea = String(item?.location || item?.area || "").trim();
          if (rawArea) {
            uniqueAreas.add(rawArea.toLowerCase());
          }
        }

        if (active) {
          setOnlineCount(online);
          setOfflineCount(offline);
          setAreaCount(uniqueAreas.size);
        }
      } catch {
        // এরর হলে সংখ্যাগুলো 0 থাকবে
      }
    }

    loadTuitions();

    return () => {
      active = false;
    };
  }, []);

  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-b from-amber-50/75 via-slate-50/80 to-cyan-50/50 py-16 sm:py-20 dark:from-[#08121a] dark:via-[#060e16] dark:to-[#050b10]">
      {/* সোনালি, রুপালি ও বর্ণালী সফট ব্যাকগ্রাউন্ড */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-20 top-14 size-72 rounded-full bg-amber-300/35 blur-3xl dark:bg-amber-400/12" />
        <div className="absolute right-10 top-6 size-72 rounded-full bg-slate-300/50 blur-3xl dark:bg-slate-400/10" />
        <div className="absolute -right-20 bottom-10 size-80 rounded-full bg-gradient-to-br from-cyan-300/30 via-fuchsia-300/25 to-amber-300/30 blur-3xl dark:from-cyan-500/12 dark:via-fuchsia-500/10 dark:to-amber-400/12" />
      </div>

      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-amber-300/90 bg-gradient-to-r from-amber-50 via-white to-slate-100 px-3.5 py-1.5 text-[11px] font-extrabold tracking-[0.16em] text-amber-800 uppercase shadow-2xs dark:border-amber-300/30 dark:from-amber-400/10 dark:via-white/[0.04] dark:to-slate-300/10 dark:text-amber-200">
            <span className="size-1.5 rounded-full bg-gradient-to-r from-amber-500 to-fuchsia-500" />
            Our success story
          </span>

          <h2 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-[2.65rem] dark:text-white">
            Two ways to learn.{" "}
            <span className="bg-gradient-to-r from-amber-600 via-fuchsia-600 to-cyan-600 bg-clip-text text-transparent dark:from-amber-300 dark:via-fuchsia-300 dark:to-cyan-300">
              One goal
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-400">
            Tutors post tuitions, students apply — some join from home, some
            learn in a classroom nearby. Either way, the result is the same.
          </p>
        </div>

        {/* Online & Offline Cards */}
        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Online Card (সোনালি + বর্ণালী) */}
          <article className="flex flex-col justify-between overflow-hidden rounded-[26px] border border-amber-300/85 bg-gradient-to-b from-amber-50/60 via-white to-slate-50/80 shadow-[0_18px_40px_-26px_rgba(217,119,6,0.45)] transition-all duration-300 hover:-translate-y-1 dark:border-amber-300/25 dark:from-[#16140f] dark:via-[#08131b] dark:to-[#071118]">
            <div className="h-1.5 w-full bg-gradient-to-r from-amber-400 via-fuchsia-500 to-cyan-500" />

            <div className="flex flex-1 flex-col justify-between p-5 sm:p-7">
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-3 py-1 text-[11px] font-extrabold text-white dark:from-amber-400 dark:to-yellow-400 dark:text-slate-950">
                    <HugeiconsIcon icon={EarthIcon} size={14} strokeWidth={2} />
                    ONLINE
                  </span>

                  <span className="inline-flex items-center gap-1 rounded-full border border-amber-300/80 bg-white/90 px-2.5 py-1 text-[11px] font-bold text-amber-800 dark:border-amber-300/25 dark:bg-white/5 dark:text-amber-200">
                    <HugeiconsIcon
                      icon={CheckmarkBadge01Icon}
                      size={13}
                      strokeWidth={2}
                    />
                    Live data
                  </span>
                </div>

                <h3 className="mt-4 text-xl font-extrabold text-slate-900 sm:text-2xl dark:text-white">
                  Classes from anywhere
                </h3>

                <p className="mt-3 border-l-2 border-amber-400 pl-3.5 text-sm leading-relaxed text-slate-700 sm:text-[15px] dark:text-slate-300">
                  &ldquo;Found a Math tutor in just 3 days. Every class was
                  online, right at my desk.&rdquo;
                </p>

                <p className="mt-3 text-xs font-semibold text-slate-500 dark:text-slate-400">
                  Nusrat J. · HSC · Dhaka
                </p>
              </div>

              <div className="mt-6">
                <div className="grid grid-cols-2 divide-x divide-amber-200/80 rounded-2xl border border-amber-300/70 bg-white/90 py-3.5 text-center dark:divide-white/10 dark:border-amber-300/20 dark:bg-white/[0.04]">
                  <div className="px-3">
                    <p className="bg-gradient-to-r from-amber-700 to-fuchsia-700 bg-clip-text text-lg font-extrabold text-transparent sm:text-xl dark:from-amber-300 dark:to-fuchsia-300">
                      {onlineCount}
                    </p>
                    <p className="mt-0.5 text-[11px] font-medium text-slate-600 dark:text-slate-400">
                      Online tuitions
                    </p>
                  </div>

                  <div className="px-3">
                    <p className="text-sm font-extrabold text-slate-800 sm:text-base dark:text-slate-200">
                      {NO_RATING_TEXT}
                    </p>
                    <p className="mt-0.5 text-[11px] font-medium text-slate-600 dark:text-slate-400">
                      Tutor rating
                    </p>
                  </div>
                </div>

                <Link
                  href="/browsetuitions?mode=online"
                  className="mt-5 inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-600 to-orange-600 px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:brightness-105 sm:w-auto dark:from-amber-400 dark:to-yellow-400 dark:text-slate-950"
                >
                  Browse online tuitions
                  <HugeiconsIcon
                    icon={ArrowRight01Icon}
                    size={16}
                    strokeWidth={2.2}
                  />
                </Link>
              </div>
            </div>
          </article>

          {/* Offline Card (রুপালি + বর্ণালী) */}
          <article className="flex flex-col justify-between overflow-hidden rounded-[26px] border border-slate-300/90 bg-gradient-to-b from-slate-100/80 via-white to-cyan-50/70 shadow-[0_18px_40px_-26px_rgba(15,23,42,0.35)] transition-all duration-300 hover:-translate-y-1 dark:border-slate-400/25 dark:from-[#0f1722] dark:via-[#08131b] dark:to-[#07161c]">
            <div className="h-1.5 w-full bg-gradient-to-r from-slate-400 via-cyan-500 to-violet-500" />

            <div className="flex flex-1 flex-col justify-between p-5 sm:p-7">
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-slate-700 to-cyan-700 px-3 py-1 text-[11px] font-extrabold text-white dark:from-slate-200 dark:to-cyan-200 dark:text-slate-950">
                    <HugeiconsIcon
                      icon={Location01Icon}
                      size={14}
                      strokeWidth={2}
                    />
                    OFFLINE
                  </span>

                  <span className="inline-flex items-center gap-1 rounded-full border border-slate-300/90 bg-white/90 px-2.5 py-1 text-[11px] font-bold text-slate-700 dark:border-white/15 dark:bg-white/5 dark:text-slate-200">
                    <HugeiconsIcon
                      icon={CheckmarkBadge01Icon}
                      size={13}
                      strokeWidth={2}
                    />
                    Live data
                  </span>
                </div>

                <h3 className="mt-4 text-xl font-extrabold text-slate-900 sm:text-2xl dark:text-white">
                  Learning face to face
                </h3>

                <p className="mt-3 border-l-2 border-cyan-500 pl-3.5 text-sm leading-relaxed text-slate-700 sm:text-[15px] dark:text-slate-300">
                  &ldquo;A home tutor came twice a week. My grades moved from C to
                  A in one term.&rdquo;
                </p>

                <p className="mt-3 text-xs font-semibold text-slate-500 dark:text-slate-400">
                  Rafi A. · Class 10 · Chattogram
                </p>
              </div>

              <div className="mt-6">
                <div className="grid grid-cols-2 divide-x divide-slate-200/90 rounded-2xl border border-slate-300/80 bg-white/90 py-3.5 text-center dark:divide-white/10 dark:border-white/15 dark:bg-white/[0.04]">
                  <div className="px-3">
                    <p className="bg-gradient-to-r from-slate-800 via-cyan-700 to-violet-700 bg-clip-text text-lg font-extrabold text-transparent sm:text-xl dark:from-slate-100 dark:via-cyan-300 dark:to-violet-300">
                      {offlineCount}
                    </p>
                    <p className="mt-0.5 text-[11px] font-medium text-slate-600 dark:text-slate-400">
                      Offline tuitions
                    </p>
                  </div>

                  <div className="px-3">
                    <p className="text-lg font-extrabold text-slate-900 sm:text-xl dark:text-white">
                      {areaCount}
                    </p>
                    <p className="mt-0.5 text-[11px] font-medium text-slate-600 dark:text-slate-400">
                      Active areas
                    </p>
                  </div>
                </div>

                <Link
                  href="/browsetuitions?mode=offline"
                  className="mt-5 inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-slate-800 via-cyan-700 to-teal-700 px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:brightness-105 sm:w-auto dark:from-slate-200 dark:to-cyan-300 dark:text-slate-950"
                >
                  Browse offline tuitions
                  <HugeiconsIcon
                    icon={ArrowRight01Icon}
                    size={16}
                    strokeWidth={2.2}
                  />
                </Link>
              </div>
            </div>
          </article>
        </div>

        {/* Summary Strip */}
        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="flex items-center gap-3.5 rounded-2xl border border-amber-300/80 bg-white/95 px-5 py-4 shadow-2xs dark:border-amber-300/20 dark:bg-white/[0.04]">
            <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-amber-400/25 to-orange-400/20 text-amber-700 dark:text-amber-300">
              <HugeiconsIcon icon={EarthIcon} size={19} strokeWidth={1.9} />
            </span>
            <span className="min-w-0">
              <span className="block truncate text-base font-extrabold text-slate-900 dark:text-white">
                {onlineCount} Online / {offlineCount} Offline
              </span>
              <span className="block truncate text-[11px] font-medium text-slate-600 dark:text-slate-400">
                Active learning modes
              </span>
            </span>
          </div>

          <div className="flex items-center gap-3.5 rounded-2xl border border-slate-300/90 bg-white/95 px-5 py-4 shadow-2xs dark:border-white/15 dark:bg-white/[0.04]">
            <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-slate-200 to-cyan-200/80 text-slate-800 dark:from-slate-300/20 dark:to-cyan-300/15 dark:text-cyan-200">
              <HugeiconsIcon
                icon={Location01Icon}
                size={19}
                strokeWidth={1.9}
              />
            </span>
            <span className="min-w-0">
              <span className="block truncate text-base font-extrabold text-slate-900 dark:text-white">
                {areaCount}
              </span>
              <span className="block truncate text-[11px] font-medium text-slate-600 dark:text-slate-400">
                Areas from active tuitions
              </span>
            </span>
          </div>

          <div className="flex items-center gap-3.5 rounded-2xl border border-fuchsia-300/75 bg-white/95 px-5 py-4 shadow-2xs dark:border-fuchsia-400/20 dark:bg-white/[0.04]">
            <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-fuchsia-400/20 to-amber-300/25 text-fuchsia-700 dark:text-amber-300">
              <HugeiconsIcon icon={StarIcon} size={19} strokeWidth={1.9} />
            </span>
            <span className="min-w-0">
              <span className="block truncate text-base font-extrabold text-slate-900 dark:text-white">
                {NO_RATING_TEXT}
              </span>
              <span className="block truncate text-[11px] font-medium text-slate-600 dark:text-slate-400">
                Average rating
              </span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurSuccessStats;