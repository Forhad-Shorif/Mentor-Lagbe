"use client";

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
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import ProfileNav from "./ProfileNav";
import ThemeToggle from "./ThemeToggle";

// Navbar-er link gulo ek jaygay: label + href + icon
const navLinks = [
  { label: "Home", href: "/", icon: Home01Icon },
  { label: "Browse Tuitions", href: "/browsetuitions", icon: BookOpen01Icon },
  { label: "Pricing", href: "/pricing", icon: DollarSignIcon },
  { label: "About", href: "/about", icon: InformationCircleIcon },
];

// Home link shudhu exact "/" e active hobe, baki link nijer path diye shuru holei active.
// Role onujayi dashboard er link. Role na porichito hole home e pathai —
// kono "students" fallback nei, tai bhul role er user students page e bounce kore na.
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

  // Login thakle Dashboard button dekhai, role onujayi link hobe.
  const { data: session } = authClient.useSession();
  const dashboardHref = getDashboardHref(session?.user?.role);

  return (
    <header className="sticky top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-5">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-3 rounded-[26px] border border-teal-100 bg-white/85 p-2.5 shadow-[0_18px_40px_-24px_rgba(4,120,112,0.55)] backdrop-blur-xl dark:border-white/10 dark:bg-neutral-900/80">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 rounded-2xl px-1.5 py-1">
          <span className="grid size-10 place-items-center rounded-2xl bg-gradient-to-br from-teal-500 to-teal-700 text-white shadow-md shadow-teal-600/30">
            <HugeiconsIcon icon={GraduationCapIcon} size={22} strokeWidth={1.8} />
          </span>
          <span className="text-lg font-bold tracking-tight text-teal-700 dark:text-teal-300">
            Mentor
            <span className="text-teal-500 dark:text-teal-400">Lagbe</span>
          </span>
        </Link>

        {/* Desktop nav links (prottek link er nijer icon) */}
        <div className="hidden items-center gap-1 rounded-full bg-teal-50/80 p-1.5 lg:flex dark:bg-white/5">
          {navLinks.map((link) => {
            const active = isActiveLink(pathname, link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  active
                    ? "bg-teal-100 text-teal-900 shadow-sm dark:bg-teal-500/20 dark:text-teal-100"
                    : "text-neutral-600 hover:bg-teal-100/60 hover:text-teal-800 dark:text-neutral-300 dark:hover:bg-white/10 dark:hover:text-white"
                )}
              >
                <HugeiconsIcon
                  icon={link.icon}
                  size={17}
                  strokeWidth={1.8}
                  className={active ? "text-teal-600 dark:text-teal-300" : "text-teal-500/80"}
                />
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Dashboard + theme toggle + profile */}
        <div className="flex items-center gap-2">
          {session && (
            <Link
              href={dashboardHref}
              className="hidden items-center gap-1.5 rounded-full border border-teal-200 bg-teal-50 px-3.5 py-2 text-sm font-semibold text-teal-700 shadow-sm transition-colors hover:bg-teal-100 sm:inline-flex dark:border-teal-400/30 dark:bg-teal-400/10 dark:text-teal-200 dark:hover:bg-teal-400/20"
            >
              <HugeiconsIcon
                icon={DashboardSquare01Icon}
                size={17}
                strokeWidth={1.8}
              />
              Dashboard
            </Link>
          )}

          <div className="hidden sm:block">
            <ThemeToggle />
          </div>

          <ProfileNav />

          {/* Mobile menu (chhoto screen e desktop link gulo ekhane) */}
          <Sheet>
            <SheetTrigger
              render={
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  aria-label="Open menu"
                  className="rounded-full border-teal-100 bg-white text-teal-700 lg:hidden dark:border-white/10 dark:bg-white/5 dark:text-teal-200"
                />
              }
            >
              <HugeiconsIcon icon={Menu01Icon} size={18} strokeWidth={2} />
            </SheetTrigger>

            <SheetContent side="right" floating className="gap-2">
              <SheetHeader className="pr-12">
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>

              <div className="flex flex-1 flex-col gap-1 overflow-y-auto px-6 pb-6">
                {session && (
                  <Link
                    href={dashboardHref}
                    className="mb-2 inline-flex items-center gap-2.5 rounded-xl border border-teal-200 bg-teal-50 px-3 py-2.5 text-sm font-semibold text-teal-700 dark:border-teal-400/30 dark:bg-teal-400/10 dark:text-teal-200"
                  >
                    <HugeiconsIcon
                      icon={DashboardSquare01Icon}
                      size={17}
                      strokeWidth={1.8}
                    />
                    Dashboard
                  </Link>
                )}

                {navLinks.map((link) => {
                  const active = isActiveLink(pathname, link.href);

                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={cn(
                        "inline-flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                        active
                          ? "bg-teal-100 text-teal-900 dark:bg-teal-500/20 dark:text-teal-100"
                          : "text-neutral-700 hover:bg-teal-50 dark:text-neutral-300 dark:hover:bg-white/10"
                      )}
                    >
                      <HugeiconsIcon
                        icon={link.icon}
                        size={17}
                        strokeWidth={1.8}
                        className="text-teal-500/80"
                      />
                      {link.label}
                    </Link>
                  );
                })}

                <div className="mt-4 flex items-center justify-between rounded-xl border border-teal-100 px-3 py-2 sm:hidden dark:border-white/10">
                  <span className="text-sm text-neutral-600 dark:text-neutral-300">
                    Theme
                  </span>
                  <ThemeToggle />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
