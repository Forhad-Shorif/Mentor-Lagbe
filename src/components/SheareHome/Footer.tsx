"use client";

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

// Footer-er link gulo ek jaygay, jate pore change kora shohoj hoy
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

// Prottek color er day (default) + dark variant deya — tai theme toggle
// korle footer o sathe sathe bodlay.
const Footer = () => {
  return (
    <footer className="border-t border-teal-100 bg-slate-50 text-neutral-700 dark:border-teal-400/10 dark:bg-[#070d14] dark:text-slate-300">
      <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
        {/* ---------- CTA banner ---------- */}
        <div className="flex flex-col gap-6 rounded-2xl border border-teal-200 bg-gradient-to-r from-teal-50 via-white to-teal-50 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8 dark:border-teal-400/20 dark:from-[#0d1b26] dark:via-[#0b1420] dark:to-[#0d1b26]">
          <div>
            <h3 className="text-xl font-bold tracking-tight text-neutral-900 sm:text-2xl dark:text-white">
              Empowering Students. Inspiring Tutors.
            </h3>
            <p className="mt-1.5 text-sm text-neutral-600 dark:text-slate-400">
              Join Bangladesh&apos;s premier tutoring network today.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/sign-up"
              className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-teal-600 to-teal-700 px-6 py-3 text-sm font-semibold text-white shadow-[0_10px_24px_-12px_rgba(13,148,136,0.85)] transition-all hover:from-teal-500 hover:to-teal-600 dark:from-teal-400 dark:to-teal-500 dark:text-[#04121a] dark:shadow-[0_0_24px_-6px_rgba(45,212,191,0.9)] dark:hover:from-teal-300 dark:hover:to-teal-400"
            >
              Get Started
            </Link>
            <Link
              href="/sign-up"
              className="inline-flex items-center justify-center rounded-xl border border-teal-300 px-6 py-3 text-sm font-semibold text-teal-700 transition-colors hover:border-teal-400 hover:text-teal-800 dark:border-white/25 dark:text-white dark:hover:border-teal-300/60 dark:hover:text-teal-200"
            >
              Become a Tutor
            </Link>
          </div>
        </div>

        {/* ---------- Links grid ---------- */}
        <div className="mt-8 grid grid-cols-2 gap-6 lg:grid-cols-[1.4fr_1fr_1fr_1.4fr]">
          {/* Brand card */}
          <div className="col-span-2 rounded-2xl border border-teal-200 bg-gradient-to-b from-teal-50 to-white p-5 sm:p-6 lg:col-span-1 dark:border-teal-400/20 dark:from-teal-400/[0.07] dark:to-transparent">
            <Link href="/" className="flex items-center gap-3">
              <span className="relative grid size-11 place-items-center">
                <HugeiconsIcon
                  icon={Shield01Icon}
                  size={44}
                  strokeWidth={1.4}
                  className="text-teal-500 dark:text-teal-400"
                />
                <HugeiconsIcon
                  icon={Mortarboard01Icon}
                  size={18}
                  strokeWidth={2}
                  className="absolute text-teal-600 dark:text-teal-200"
                />
              </span>
              <span className="text-2xl font-bold tracking-tight text-teal-700 dark:text-cyan-300 dark:drop-shadow-[0_0_14px_rgba(34,211,238,0.45)]">
                MentorLagbe
              </span>
            </Link>

            <p className="mt-4 text-sm leading-relaxed text-neutral-600 dark:text-slate-400">
              A modernized platform connecting learners with expert educators
              across Bangladesh. Find your match or share your expertise.
            </p>
          </div>

          {/* Students */}
          <div className="px-2 py-2 sm:px-4">
            <h4 className="text-[11px] font-semibold tracking-[0.18em] text-teal-600 dark:text-teal-400">
              STUDENTS
            </h4>
            <ul className="mt-4 space-y-3">
              {studentLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-neutral-700 transition-colors hover:text-teal-700 dark:text-slate-300 dark:hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tutors */}
          <div className="px-2 py-2 sm:px-4">
            <h4 className="text-[11px] font-semibold tracking-[0.18em] text-teal-600 dark:text-teal-400">
              TUTORS
            </h4>
            <ul className="mt-4 space-y-3">
              {tutorLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-neutral-700 transition-colors hover:text-teal-700 dark:text-slate-300 dark:hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact card */}
          <div className="col-span-2 rounded-2xl border border-teal-200 bg-gradient-to-b from-teal-50 to-white p-5 sm:p-6 lg:col-span-1 dark:border-teal-400/20 dark:from-teal-400/10 dark:to-transparent">
            <h4 className="text-[11px] font-semibold tracking-[0.18em] text-teal-600 dark:text-teal-400">
              GET IN TOUCH
            </h4>

            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a
                  href="mailto:hello@mentorlagbe.com"
                  className="flex items-center gap-3 text-neutral-700 transition-colors hover:text-teal-700 dark:text-slate-300 dark:hover:text-white"
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
                  className="flex items-center gap-3 text-neutral-700 transition-colors hover:text-teal-700 dark:text-slate-300 dark:hover:text-white"
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
              <li className="flex items-center gap-3 text-neutral-700 dark:text-slate-300">
                <HugeiconsIcon
                  icon={Location01Icon}
                  size={18}
                  strokeWidth={1.8}
                  className="shrink-0 text-teal-600 dark:text-teal-400"
                />
                Dhaka, Bangladesh
              </li>
            </ul>

            <p className="mt-6 border-t border-teal-100 pt-4 text-xs text-neutral-500 dark:border-teal-400/15 dark:text-slate-500">
              Connect with us
            </p>

            <div className="mt-3 flex items-center gap-2.5">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="grid size-9 place-items-center rounded-lg border border-teal-200 text-neutral-600 transition-colors hover:border-teal-400 hover:text-teal-700 dark:border-white/10 dark:text-slate-300 dark:hover:border-teal-300/60 dark:hover:text-teal-200"
                >
                  <HugeiconsIcon icon={social.icon} size={17} strokeWidth={1.8} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ---------- Bottom bar ---------- */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-teal-100 pt-6 text-xs text-neutral-500 sm:flex-row dark:border-white/5 dark:text-slate-500">
          <p>© 2026 MentorLagbe. All rights reserved.</p>

          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-center sm:justify-end">
            <Link href="/privacy" className="transition-colors hover:text-neutral-900 dark:hover:text-slate-300">
              Privacy Policy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-neutral-900 dark:hover:text-slate-300">
              Terms of Service
            </Link>
            <Link href="/about" className="transition-colors hover:text-neutral-900 dark:hover:text-slate-300">
              Help Center
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
