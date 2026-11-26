"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  BookOpen01Icon,
  DashboardSquare01Icon,
  DollarSignIcon,
  GraduationCapIcon,
  Home01Icon,
  InformationCircleIcon,
  Menu01Icon,
} from "@hugeicons/core-free-icons";

import { cn } from "@/lib/utils";
import { authClient } from "@/lib/auth-client";
import ProfileNav from "./ProfileNav";
import ThemeToggle from "./ThemeToggle";

// হিন্ট: Navbar-এর মূল নেভিগেশন লিংকগুলো এক জায়গায় রাখা হয়েছে।
const navLinks = [
  { label: "Home", href: "/", icon: Home01Icon },
  { label: "Browse Tuitions", href: "/browsetuitions", icon: BookOpen01Icon },
  { label: "Pricing", href: "/pricing", icon: DollarSignIcon },
  { label: "About", href: "/About", icon: InformationCircleIcon },
];

// হিন্ট: ইউজারের role অনুযায়ী সঠিক Dashboard রুটে পাঠায়; অজানা role এলে "/" ফেরত দেয়।
const getDashboardHref = (role?: string) => {
  const value = String(role || "").toLowerCase();

  if (value === "students" || value === "student") return "/dashboard/students";
  if (value === "teachers" || value === "teacher") return "/dashboard/teachers";
  if (value === "admin") return "/dashboard/admin";

  return "/";
};

const isActiveLink = (pathname: string, href: string) =>
  href === "/" ? pathname === "/" : pathname.startsWith(href);

const Navbar = () => {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const { data: session } = authClient.useSession();
  const dashboardHref = getDashboardHref(session?.user?.role);
  const isDashboardActive = pathname.startsWith("/dashboard");

  // হিন্ট: Sign মেনুর মতোই বাইরে ক্লিক করলে বা Escape চাপলে মোবাইল হ্যামবার্গার মেনু অটো বন্ধ হয়।
  useEffect(() => {
    if (!mobileOpen) return;

    const handleOutsideClick = (event: MouseEvent) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node)
      ) {
        setMobileOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [mobileOpen]);

  // হিন্ট: রুট পরিবর্তন হলে মোবাইল মেনু স্বয়ংক্রিয়ভাবে বন্ধ হয়ে যায়।
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-5">
      <nav className="relative mx-auto flex max-w-6xl items-center justify-between gap-3 rounded-[26px] border border-teal-200/80 bg-white/90 p-2.5 shadow-[0_18px_40px_-24px_rgba(4,120,112,0.55)] backdrop-blur-xl dark:border-white/10 dark:bg-[#071117]/85">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 rounded-2xl px-1.5 py-1 transition hover:opacity-95"
        >
          <span className="grid size-10 place-items-center rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-600 text-white shadow-md shadow-teal-600/30 dark:from-teal-400 dark:to-cyan-400 dark:text-slate-950">
            <HugeiconsIcon
              icon={GraduationCapIcon}
              size={22}
              strokeWidth={1.9}
            />
          </span>
          <span className="text-lg font-extrabold tracking-tight text-teal-800 dark:text-teal-200">
            Mentor
            <span className="bg-gradient-to-r from-teal-500 to-cyan-500 bg-clip-text text-transparent dark:from-teal-300 dark:to-cyan-300">
              Lagbe
            </span>
          </span>
        </Link>

        {/* Desktop nav links */}
        <div className="hidden items-center gap-1 rounded-full bg-teal-50/90 p-1.5 ring-1 ring-teal-200/60 lg:flex dark:bg-white/[0.04] dark:ring-white/10">
          {navLinks.map((link) => {
            const active = isActiveLink(pathname, link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-all",
                  active
                    ? "bg-gradient-to-r from-teal-600 to-cyan-600 text-white shadow-sm dark:from-teal-400 dark:to-cyan-400 dark:text-slate-950"
                    : "text-slate-600 hover:bg-teal-100/70 hover:text-teal-800 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white"
                )}
              >
                <HugeiconsIcon
                  icon={link.icon}
                  size={17}
                  strokeWidth={1.85}
                  className={cn(
                    active
                      ? "text-white dark:text-slate-950"
                      : "text-teal-600/85 dark:text-teal-400"
                  )}
                />
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Right actions: Theme + Profile + Mobile Hamburger Menu */}
        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <ThemeToggle />
          </div>

          <ProfileNav />

          {/* Mobile Hamburger Menu (Dashboard + Nav Links + Theme) */}
          <div ref={mobileMenuRef} className="relative lg:hidden">
            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-expanded={mobileOpen}
              aria-label="Open navigation menu"
              className={cn(
                "grid size-9 place-items-center rounded-full border transition-all active:scale-95",
                mobileOpen
                  ? "border-teal-500 bg-teal-600 text-white shadow-sm dark:border-teal-400 dark:bg-teal-400 dark:text-slate-950"
                  : "border-teal-200/80 bg-white/95 text-teal-700 shadow-2xs hover:border-teal-300 hover:bg-teal-50 dark:border-white/10 dark:bg-white/[0.05] dark:text-teal-200 dark:hover:bg-white/10"
              )}
            >
              <HugeiconsIcon icon={Menu01Icon} size={18} strokeWidth={2} />
            </button>

            {mobileOpen && (
              <div className="absolute right-0 top-full z-50 mt-2.5 w-60 max-w-[calc(100vw-1.5rem)] rounded-3xl border border-teal-200/85 bg-white/95 p-2 shadow-2xl ring-1 ring-teal-500/10 backdrop-blur-xl dark:border-white/10 dark:bg-[#09151c]/95 dark:ring-white/10">
                <div className="flex flex-col gap-0.5">
                  {session && (
                    <Link
                      href={dashboardHref}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        "flex items-center gap-2.5 rounded-2xl px-3 py-2.5 text-xs font-bold transition-all",
                        isDashboardActive
                          ? "bg-gradient-to-r from-teal-600 to-cyan-600 text-white shadow-2xs dark:from-teal-400 dark:to-cyan-400 dark:text-slate-950"
                          : "text-slate-700 hover:bg-teal-50/90 hover:text-teal-800 dark:text-slate-200 dark:hover:bg-white/10 dark:hover:text-teal-200"
                      )}
                    >
                      <HugeiconsIcon
                        icon={DashboardSquare01Icon}
                        size={17}
                        strokeWidth={1.85}
                        className={cn(
                          isDashboardActive
                            ? "text-white dark:text-slate-950"
                            : "text-teal-600 dark:text-teal-400"
                        )}
                      />
                      <span>Dashboard</span>
                    </Link>
                  )}

                  {navLinks.map((link) => {
                    const active = isActiveLink(pathname, link.href);

                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className={cn(
                          "flex items-center gap-2.5 rounded-2xl px-3 py-2.5 text-xs font-bold transition-all",
                          active
                            ? "bg-gradient-to-r from-teal-600 to-cyan-600 text-white shadow-2xs dark:from-teal-400 dark:to-cyan-400 dark:text-slate-950"
                            : "text-slate-700 hover:bg-teal-50/90 hover:text-teal-800 dark:text-slate-200 dark:hover:bg-white/10 dark:hover:text-teal-200"
                        )}
                      >
                        <HugeiconsIcon
                          icon={link.icon}
                          size={17}
                          strokeWidth={1.85}
                          className={cn(
                            active
                              ? "text-white dark:text-slate-950"
                              : "text-teal-600 dark:text-teal-400"
                          )}
                        />
                        <span>{link.label}</span>
                      </Link>
                    );
                  })}
                </div>

                <div className="mt-2 flex items-center justify-between border-t border-teal-100/90 px-3 pt-2.5 pb-1 sm:hidden dark:border-white/10">
                  <span className="text-[11px] font-bold tracking-wide text-slate-500 uppercase dark:text-slate-400">
                    Appearance
                  </span>
                  <ThemeToggle />
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;