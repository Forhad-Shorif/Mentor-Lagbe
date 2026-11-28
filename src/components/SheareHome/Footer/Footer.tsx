"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Call02Icon,
  Facebook01Icon,
  InstagramIcon,
  Linkedin01Icon,
  Location01Icon,
  Mail01Icon,
  Mortarboard01Icon,
  NewTwitterIcon,
  Shield01Icon,
} from "@hugeicons/core-free-icons";
import ClientUser from "@/lib/ClientUser";

const studentLinks = [
  { label: "Find a Tutor", href: "/browsetuitions" },
  { label: "Browse Tuitions", href: "/browsetuitions" },
  { label: "Subject Categories", href: "/browsetuitions" },
  { label: "How It Works", href: "/About" },
];

const tutorLinks = [
  { label: "Apply as Tutor", href: "/sign-up" },
  { label: "Resources", href: "/about" },
  { label: "Success Stories", href: "/about" },
  { label: "Tutor FAQ", href: "/about" },
];

const socialLinks = [
  {
    label: "Facebook",
    href: "#",
    icon: Facebook01Icon,
    style:
      "border-sky-300/80 bg-sky-50 text-sky-700 hover:from-sky-500 hover:to-blue-600 hover:text-white dark:border-sky-400/25 dark:bg-sky-400/10 dark:text-sky-300",
  },
  {
    label: "LinkedIn",
    href: "#",
    icon: Linkedin01Icon,
    style:
      "border-cyan-300/80 bg-cyan-50 text-cyan-700 hover:from-cyan-500 hover:to-teal-600 hover:text-white dark:border-cyan-400/25 dark:bg-cyan-400/10 dark:text-cyan-300",
  },
  {
    label: "Instagram",
    href: "#",
    icon: InstagramIcon,
    style:
      "border-pink-300/80 bg-pink-50 text-pink-700 hover:from-pink-500 hover:to-amber-500 hover:text-white dark:border-pink-400/25 dark:bg-pink-400/10 dark:text-pink-300",
  },
  {
    label: "X",
    href: "#",
    icon: NewTwitterIcon,
    style:
      "border-amber-300/80 bg-amber-50 text-amber-700 hover:from-amber-500 hover:to-orange-500 hover:text-slate-950 dark:border-amber-400/30 dark:bg-amber-400/10 dark:text-amber-300",
  },
];

function useIsUserLoggedIn() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    let active = true;

    async function checkAuth() {
      try {
        const res = await fetch("/api/auth/session", { cache: "no-store" });
        if (!res.ok) {
          if (active) setIsLoggedIn(false);
          return;
        }
        const data = await res.json();
        const hasUser = Boolean(data?.user || data?.email || data?.id);
        if (active) setIsLoggedIn(hasUser);
      } catch {
        if (active) setIsLoggedIn(false);
      }
    }

    checkAuth();

    return () => {
      active = false;
    };
  }, []);

  return isLoggedIn;
}

const Footer = () => {
  const isLoggedIn = useIsUserLoggedIn();
  const user = ClientUser();

  return (
    <footer className="relative overflow-hidden border-t border-amber-300/60 bg-gradient-to-b from-slate-50 via-amber-50/25 to-teal-50/40 text-slate-700 dark:border-amber-400/20 dark:from-[#060d14] dark:via-[#08151d] dark:to-[#050b10] dark:text-slate-300">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-52 bg-[radial-gradient(ellipse_at_top,rgba(245,158,11,0.12),transparent_70%)] dark:bg-[radial-gradient(ellipse_at_top,rgba(251,191,36,0.12),transparent_70%)]"
      />

      <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
        {/* ---------- Compact Responsive CTA Banner ---------- */}
        {!isLoggedIn && (
          <div className="rounded-2xl border border-amber-300/75 bg-gradient-to-r from-amber-50/85 via-white to-teal-50/85 p-4 shadow-[0_16px_36px_-28px_rgba(217,119,6,0.45)] sm:rounded-3xl sm:p-7 dark:border-amber-400/25 dark:from-[#171612] dark:via-[#09161f] dark:to-[#092026]">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between md:gap-6">
              <div className="min-w-0">
                <span className="inline-flex items-center rounded-full border border-amber-400/40 bg-gradient-to-r from-amber-500/15 to-teal-500/15 px-2.5 py-0.5 text-[10px] font-extrabold tracking-wider text-amber-800 uppercase sm:text-[11px] dark:border-amber-300/30 dark:text-amber-300">
                  Start Learning
                </span>
                <h3 className="mt-1.5 bg-gradient-to-r from-slate-900 via-amber-800 to-teal-800 bg-clip-text text-lg font-extrabold tracking-tight text-transparent sm:text-2xl dark:from-white dark:via-amber-200 dark:to-teal-200">
                  Empowering Students. Inspiring Tutors.
                </h3>
                <p className="mt-1 text-xs text-slate-600 sm:text-sm dark:text-slate-400">
                  Join Bangladesh&apos;s premier tutoring network today.
                </p>
              </div>

              {!user && (
                <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:gap-3 md:shrink-0">
                  <Link
                    href="/sign-up"
                    className="inline-flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-amber-500 via-teal-600 to-cyan-600 px-5 py-2.5 text-xs font-bold text-white shadow-[0_10px_24px_-12px_rgba(217,119,6,0.75)] transition-all duration-200 hover:-translate-y-0.5 hover:brightness-105 sm:w-auto sm:px-6 sm:py-3 sm:text-sm dark:from-amber-400 dark:via-teal-400 dark:to-cyan-400 dark:text-[#04121a]"
                  >
                    Get Started
                  </Link>
                  <Link
                    href="/sign-up"
                    className="inline-flex w-full items-center justify-center rounded-xl border border-amber-300/90 bg-white/90 px-5 py-2.5 text-xs font-bold text-amber-800 transition-all duration-200 hover:-translate-y-0.5 hover:border-amber-400 hover:bg-amber-50 sm:w-auto sm:px-6 sm:py-3 sm:text-sm dark:border-amber-400/30 dark:bg-white/[0.04] dark:text-amber-200 dark:hover:bg-white/[0.08]"
                  >
                    Become a Tutor
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ---------- Main Grid (All Devices) ---------- */}
        <div className="mt-6 grid grid-cols-1 gap-4 sm:mt-8 sm:grid-cols-2 sm:gap-6 lg:grid-cols-[1.3fr_0.95fr_0.95fr_1.4fr]">
          {/* Brand Card */}
          <div className="group rounded-2xl border border-amber-300/70 bg-white/95 p-4 shadow-[0_14px_34px_-26px_rgba(217,119,6,0.35)] transition-all duration-300 hover:border-amber-400 sm:rounded-3xl sm:p-6 dark:border-white/10 dark:bg-white/[0.04] dark:hover:border-amber-400/40">
            <Link href="/" className="inline-flex items-center gap-2.5 sm:gap-3">
              <span className="relative grid size-10 place-items-center rounded-xl bg-gradient-to-br from-amber-400/20 via-teal-400/15 to-cyan-400/20 ring-1 ring-amber-400/40 transition-transform duration-300 group-hover:scale-105 sm:size-11 sm:rounded-2xl">
                <HugeiconsIcon
                  icon={Shield01Icon}
                  size={30}
                  strokeWidth={1.5}
                  className="text-amber-600 dark:text-amber-300"
                />
                <HugeiconsIcon
                  icon={Mortarboard01Icon}
                  size={14}
                  strokeWidth={2}
                  className="absolute text-teal-700 dark:text-teal-200"
                />
              </span>
              <span className="bg-gradient-to-r from-amber-700 via-teal-600 to-cyan-700 bg-clip-text text-xl font-extrabold tracking-tight text-transparent sm:text-2xl dark:from-amber-300 dark:via-teal-300 dark:to-cyan-300">
                MentorLagbe
              </span>
            </Link>

            <p className="mt-3 text-xs leading-relaxed text-slate-600 sm:mt-4 sm:text-sm dark:text-slate-400">
              A modernized platform connecting learners with expert educators
              across Bangladesh. Find your match or share your expertise.
            </p>
          </div>

          {/* Mobile 2-Col Links Wrapper / Desktop Columns */}
          <div className="grid grid-cols-2 gap-3 rounded-2xl border border-teal-200/75 bg-white/75 p-3.5 sm:col-span-2 sm:gap-6 sm:border-0 sm:bg-transparent sm:p-0 lg:col-span-2 lg:grid-cols-2 dark:border-white/10 dark:bg-white/[0.02] sm:dark:bg-transparent">
            {/* Students */}
            <div className="rounded-xl px-1.5 py-1 sm:rounded-2xl sm:px-4 sm:py-2.5 sm:transition-colors sm:hover:bg-amber-50/40 sm:dark:hover:bg-white/[0.02]">
              <h4 className="inline-flex items-center gap-1.5 text-[10px] font-extrabold tracking-[0.16em] text-amber-700 uppercase sm:gap-2 sm:text-[11px] sm:tracking-[0.18em] dark:text-amber-300">
                <span className="size-1.5 rounded-full bg-amber-500 dark:bg-amber-400" />
                STUDENTS
              </h4>
              <ul className="mt-2.5 space-y-2 sm:mt-4 sm:space-y-3">
                {studentLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="inline-flex items-center text-xs font-medium text-slate-700 transition-all duration-200 hover:translate-x-1 hover:text-amber-700 sm:text-sm dark:text-slate-300 dark:hover:text-amber-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tutors */}
            <div className="rounded-xl px-1.5 py-1 sm:rounded-2xl sm:px-4 sm:py-2.5 sm:transition-colors sm:hover:bg-teal-50/40 sm:dark:hover:bg-white/[0.02]">
              <h4 className="inline-flex items-center gap-1.5 text-[10px] font-extrabold tracking-[0.16em] text-teal-700 uppercase sm:gap-2 sm:text-[11px] sm:tracking-[0.18em] dark:text-teal-300">
                <span className="size-1.5 rounded-full bg-teal-500 dark:bg-teal-400" />
                TUTORS
              </h4>
              <ul className="mt-2.5 space-y-2 sm:mt-4 sm:space-y-3">
                {tutorLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="inline-flex items-center text-xs font-medium text-slate-700 transition-all duration-200 hover:translate-x-1 hover:text-teal-700 sm:text-sm dark:text-slate-300 dark:hover:text-teal-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Golden & Multi-Color Compact GET IN TOUCH Card */}
          <div className="overflow-hidden rounded-2xl border border-amber-300/85 bg-gradient-to-br from-amber-50/75 via-white to-cyan-50/60 p-4 shadow-[0_14px_34px_-24px_rgba(217,119,6,0.45)] transition-all duration-300 hover:border-amber-400 sm:col-span-2 sm:rounded-3xl sm:p-5 lg:col-span-1 dark:border-amber-400/25 dark:from-[#171510] dark:via-[#08141c] dark:to-[#081d24]">
            <div className="mb-3 h-1 w-full rounded-full bg-gradient-to-r from-amber-400 via-teal-400 to-fuchsia-400" />

            <h4 className="inline-flex items-center gap-2 text-[11px] font-extrabold tracking-[0.16em] text-amber-800 uppercase dark:text-amber-300">
              <span className="size-2 rounded-full bg-gradient-to-r from-amber-400 to-teal-400" />
              GET IN TOUCH
            </h4>

            <ul className="mt-3 space-y-2 text-xs sm:text-sm">
              <li>
                <a
                  href="mailto:hello@mentorlagbe.com"
                  className="group/item flex items-center gap-2.5 rounded-xl bg-amber-500/8 px-2.5 py-1.5 font-medium text-slate-700 transition-colors hover:bg-amber-500/15 hover:text-amber-900 dark:bg-amber-400/5 dark:text-slate-300 dark:hover:bg-amber-400/15 dark:hover:text-amber-200"
                >
                  <span className="grid size-6 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-amber-400/30 to-yellow-500/20 text-amber-700 dark:text-amber-300">
                    <HugeiconsIcon icon={Mail01Icon} size={14} strokeWidth={1.9} />
                  </span>
                  <span className="truncate">hello@mentorlagbe.com</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+8801234567890"
                  className="group/item flex items-center gap-2.5 rounded-xl bg-teal-500/8 px-2.5 py-1.5 font-medium text-slate-700 transition-colors hover:bg-teal-500/15 hover:text-teal-900 dark:bg-teal-400/5 dark:text-slate-300 dark:hover:bg-teal-400/15 dark:hover:text-teal-200"
                >
                  <span className="grid size-6 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-teal-400/25 to-cyan-500/20 text-teal-700 dark:text-teal-300">
                    <HugeiconsIcon icon={Call02Icon} size={14} strokeWidth={1.9} />
                  </span>
                  <span>+880 1234-567890</span>
                </a>
              </li>
              <li className="flex items-center gap-2.5 rounded-xl bg-violet-500/8 px-2.5 py-1.5 font-medium text-slate-700 dark:bg-violet-400/5 dark:text-slate-300">
                <span className="grid size-6 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-violet-400/25 to-amber-400/20 text-violet-700 dark:text-violet-300">
                  <HugeiconsIcon icon={Location01Icon} size={14} strokeWidth={1.9} />
                </span>
                <span>Dhaka, Bangladesh</span>
              </li>
            </ul>

            <div className="mt-3.5 flex items-center justify-between gap-2 border-t border-amber-300/60 pt-3 dark:border-amber-400/15">
              <span className="text-[11px] font-bold text-amber-800/90 dark:text-amber-200/80">
                Connect
              </span>

              <div className="flex items-center gap-1.5">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className={`grid size-8 place-items-center rounded-lg border bg-gradient-to-br shadow-2xs transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm ${social.style}`}
                  >
                    <HugeiconsIcon icon={social.icon} size={15} strokeWidth={1.9} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ---------- Bottom Bar ---------- */}
        <div className="mt-6 flex flex-col items-center justify-between gap-3 border-t border-amber-300/60 pt-5 text-center text-xs text-slate-500 sm:mt-10 sm:flex-row sm:gap-4 sm:pt-6 sm:text-left dark:border-white/10 dark:text-slate-400">
          <p className="font-medium">© 2026 MentorLagbe. All rights reserved.</p>

          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 sm:justify-end sm:gap-x-5">
            <Link
              href="/privacy"
              className="font-medium transition-colors hover:text-amber-700 dark:hover:text-amber-300"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="font-medium transition-colors hover:text-teal-700 dark:hover:text-teal-300"
            >
              Terms of Service
            </Link>
            <Link
              href="/Helpchenter"
              className="font-medium transition-colors hover:text-cyan-700 dark:hover:text-cyan-300"
            >
              Help Center
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;