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

// হিন্ট: Footer-এর সব নেভিগেশন লিংক এক জায়গায় রাখা হয়েছে যেন ভবিষ্যতে আপডেট করা সহজ হয়।
const studentLinks = [
  { label: "Find a Tutor", href: "/browsetuitions" },
  { label: "Browse Tuitions", href: "/browsetuitions" },
  { label: "Subject Categories", href: "/browsetuitions" },
  { label: "How It Works", href: "/about" },
];

const tutorLinks = [
  { label: "Apply as Tutor", href: "/sign-up" },
  { label: "Resources", href: "/about" },
  { label: "Success Stories", href: "/about" },
  { label: "Tutor FAQ", href: "/about" },
];

const socialLinks = [
  { label: "Facebook", href: "#", icon: Facebook01Icon },
  { label: "LinkedIn", href: "#", icon: Linkedin01Icon },
  { label: "Instagram", href: "#", icon: InstagramIcon },
  { label: "X", href: "#", icon: NewTwitterIcon },
];

// হিন্ট: ইউজার লগইন করা আছে কি না তা চেক করা হচ্ছে যেন শুধু লগইন না থাকলে CTA ব্যানার দেখায়।
// হিন্ট: /api/auth/session বা আপনার নিজস্ব session endpoint থেকে user থাকলে isLoggedIn = true হবে।
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

// হিন্ট: ইউজার লগইন করা না থাকলে তবেই "Empowering Students. Inspiring Tutors." ব্যানার দেখানো হচ্ছে।
const Footer = () => {
  const isLoggedIn = useIsUserLoggedIn();

  return (
    <footer className="relative overflow-hidden border-t border-teal-200/75 bg-gradient-to-b from-slate-50 via-teal-50/35 to-white text-slate-700 dark:border-teal-400/15 dark:from-[#060d14] dark:via-[#07141b] dark:to-[#050b10] dark:text-slate-300">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-48 bg-[radial-gradient(ellipse_at_top,rgba(13,148,136,0.12),transparent_70%)] dark:bg-[radial-gradient(ellipse_at_top,rgba(20,184,166,0.14),transparent_70%)]"
      />

      <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
        {/* ---------- CTA banner (শুধু লগইন না থাকলে দেখাবে) ---------- */}
        {!isLoggedIn && (
          <div className="flex flex-col gap-6 rounded-2xl border border-teal-200/85 bg-gradient-to-r from-teal-50/90 via-white to-cyan-50/70 p-6 shadow-[0_18px_40px_-32px_rgba(13,148,136,0.5)] sm:flex-row sm:items-center sm:justify-between sm:p-8 dark:border-teal-400/20 dark:from-[#0c1b24] dark:via-[#09151e] dark:to-[#0b1e26]">
            <div>
              <h3 className="text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl dark:text-white">
                Empowering Students. Inspiring Tutors.
              </h3>
              <p className="mt-1.5 text-sm text-slate-600 dark:text-slate-400">
                Join Bangladesh&apos;s premier tutoring network today.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/sign-up"
                className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-teal-600 to-cyan-600 px-6 py-3 text-sm font-bold text-white shadow-[0_10px_24px_-12px_rgba(13,148,136,0.85)] transition-all hover:-translate-y-0.5 hover:from-teal-500 hover:to-cyan-500 dark:from-teal-400 dark:to-cyan-400 dark:text-[#04121a] dark:shadow-[0_0_24px_-6px_rgba(45,212,191,0.8)] dark:hover:from-teal-300 dark:hover:to-cyan-300"
              >
                Get Started
              </Link>
              <Link
                href="/sign-up"
                className="inline-flex items-center justify-center rounded-xl border border-teal-300/90 bg-white/80 px-6 py-3 text-sm font-bold text-teal-700 transition-all hover:border-teal-400 hover:bg-teal-50/70 hover:text-teal-800 dark:border-teal-400/25 dark:bg-white/[0.03] dark:text-teal-200 dark:hover:border-teal-300/50 dark:hover:bg-white/[0.07] dark:hover:text-white"
              >
                Become a Tutor
              </Link>
            </div>
          </div>
        )}

        {/* ---------- Links grid ---------- */}
        <div className="mt-8 grid grid-cols-2 gap-6 lg:grid-cols-[1.4fr_1fr_1fr_1.4fr]">
          {/* Brand card */}
          <div className="col-span-2 rounded-2xl border border-teal-200/80 bg-white/90 p-5 shadow-2xs sm:p-6 lg:col-span-1 dark:border-white/10 dark:bg-white/[0.04]">
            <Link href="/" className="flex items-center gap-3">
              <span className="relative grid size-11 place-items-center rounded-xl bg-teal-500/10 ring-1 ring-teal-500/20 dark:bg-teal-400/10 dark:ring-teal-400/20">
                <HugeiconsIcon
                  icon={Shield01Icon}
                  size={34}
                  strokeWidth={1.5}
                  className="text-teal-600 dark:text-teal-400"
                />
                <HugeiconsIcon
                  icon={Mortarboard01Icon}
                  size={15}
                  strokeWidth={2}
                  className="absolute text-teal-700 dark:text-teal-200"
                />
              </span>
              <span className="bg-gradient-to-r from-teal-700 to-cyan-700 bg-clip-text text-2xl font-extrabold tracking-tight text-transparent dark:from-teal-300 dark:to-cyan-300">
                MentorLagbe
              </span>
            </Link>

            <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              A modernized platform connecting learners with expert educators
              across Bangladesh. Find your match or share your expertise.
            </p>
          </div>

          {/* Students */}
          <div className="px-2 py-2 sm:px-4">
            <h4 className="text-[11px] font-bold tracking-[0.18em] text-teal-700 uppercase dark:text-teal-300">
              STUDENTS
            </h4>
            <ul className="mt-4 space-y-3">
              {studentLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm font-medium text-slate-700 transition-colors hover:text-teal-700 dark:text-slate-300 dark:hover:text-teal-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tutors */}
          <div className="px-2 py-2 sm:px-4">
            <h4 className="text-[11px] font-bold tracking-[0.18em] text-teal-700 uppercase dark:text-teal-300">
              TUTORS
            </h4>
            <ul className="mt-4 space-y-3">
              {tutorLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm font-medium text-slate-700 transition-colors hover:text-teal-700 dark:text-slate-300 dark:hover:text-teal-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact card */}
          <div className="col-span-2 rounded-2xl border border-teal-200/80 bg-white/90 p-5 shadow-2xs sm:p-6 lg:col-span-1 dark:border-white/10 dark:bg-white/[0.04]">
            <h4 className="text-[11px] font-bold tracking-[0.18em] text-teal-700 uppercase dark:text-teal-300">
              GET IN TOUCH
            </h4>

            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a
                  href="mailto:hello@mentorlagbe.com"
                  className="flex items-center gap-3 text-slate-700 transition-colors hover:text-teal-700 dark:text-slate-300 dark:hover:text-teal-300"
                >
                  <HugeiconsIcon
                    icon={Mail01Icon}
                    size={18}
                    strokeWidth={1.8}
                    className="shrink-0 text-teal-600 dark:text-teal-400"
                  />
                  hello@mentorlagbe.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+8801234567890"
                  className="flex items-center gap-3 text-slate-700 transition-colors hover:text-teal-700 dark:text-slate-300 dark:hover:text-teal-300"
                >
                  <HugeiconsIcon
                    icon={Call02Icon}
                    size={18}
                    strokeWidth={1.8}
                    className="shrink-0 text-teal-600 dark:text-teal-400"
                  />
                  +880 1234-567890
                </a>
              </li>
              <li className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                <HugeiconsIcon
                  icon={Location01Icon}
                  size={18}
                  strokeWidth={1.8}
                  className="shrink-0 text-teal-600 dark:text-teal-400"
                />
                Dhaka, Bangladesh
              </li>
            </ul>

            <p className="mt-6 border-t border-teal-200/70 pt-4 text-xs font-medium text-slate-500 dark:border-white/10 dark:text-slate-400">
              Connect with us
            </p>

            <div className="mt-3 flex items-center gap-2.5">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="grid size-9 place-items-center rounded-lg border border-teal-200/80 bg-teal-50/50 text-slate-600 transition-all hover:-translate-y-0.5 hover:border-teal-400 hover:bg-teal-600 hover:text-white dark:border-white/10 dark:bg-white/[0.03] dark:text-slate-300 dark:hover:border-teal-400/50 dark:hover:bg-teal-400 dark:hover:text-slate-950"
                >
                  <HugeiconsIcon icon={social.icon} size={17} strokeWidth={1.8} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ---------- Bottom bar ---------- */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-teal-200/70 pt-6 text-xs text-slate-500 sm:flex-row dark:border-white/10 dark:text-slate-400">
          <p>© 2026 MentorLagbe. All rights reserved.</p>

          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-center sm:justify-end">
            <Link
              href="/privacy"
              className="transition-colors hover:text-teal-700 dark:hover:text-teal-300"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="transition-colors hover:text-teal-700 dark:hover:text-teal-300"
            >
              Terms of Service
            </Link>
            <Link
              href="/about"
              className="transition-colors hover:text-teal-700 dark:hover:text-teal-300"
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