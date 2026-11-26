"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowDown01Icon,
  DashboardSquare01Icon,
  Logout01Icon,
  UserCircleIcon,
} from "@hugeicons/core-free-icons";

import { authClient } from "@/lib/auth-client";
import { showToast } from "@/lib/utils/toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const getInitials = (name: string) => {
  const parts = name.trim().split(" ").filter(Boolean);
  return (
    parts
      .slice(0, 2)
      .map((part) => part[0].toUpperCase())
      .join("") || "U"
  );
};

type UserRole = "students" | "teachers" | "admin";

const getRole = (role?: string): UserRole | null => {
  const value = String(role || "").toLowerCase();
  if (value === "students" || value === "student") return "students";
  if (value === "teachers" || value === "teacher") return "teachers";
  if (value === "admin") return "admin";
  return null;
};

const ROLE_LABEL: Record<UserRole, string> = {
  students: "Student",
  teachers: "Teacher",
  admin: "Admin",
};

const getDashboardHref = (role?: string) => {
  const normalized = getRole(role);
  return normalized ? `/dashboard/${normalized}` : "/";
};

// হিন্ট: মোবাইলে "Sign" বাটনে ক্লিক করলে ছোট মোডাল ডায়ালগ খোলে; ডায়ালগের বাইরে বা Close বাটনে ক্লিক করলে বন্ধ হয়।
const GuestAuthNav = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex items-center gap-2">
      {/* Desktop: Sign In ও Sign Up */}
      <div className="hidden items-center gap-2 sm:flex">
        <Link
          href="/sign-in"
          className="rounded-full px-4 py-2 text-sm font-semibold text-slate-700 transition hover:text-teal-700 dark:text-slate-300 dark:hover:text-teal-300"
        >
          Sign In
        </Link>
        <Link
          href="/sign-up"
          className="inline-flex items-center rounded-full bg-gradient-to-r from-teal-600 to-cyan-600 px-4 py-2 text-sm font-bold text-white shadow-sm transition hover:from-teal-500 hover:to-cyan-500 dark:from-teal-400 dark:to-cyan-400 dark:text-slate-950"
        >
          Sign Up
        </Link>
      </div>

      {/* Mobile: শুধু "Sign" বাটন */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center rounded-full bg-gradient-to-r from-teal-600 to-cyan-600 px-3.5 py-1.5 text-xs font-bold text-white shadow-sm sm:hidden dark:from-teal-400 dark:to-cyan-400 dark:text-slate-950"
      >
        Sign
      </button>

      {/* Simple Tiny Modal Dialog (বাইরে ক্লিক বা Close বাটনে বন্ধ হবে) */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4 backdrop-blur-[2px] sm:hidden"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-xs rounded-2xl border border-teal-200/80 bg-white p-5 text-center shadow-xl dark:border-white/10 dark:bg-[#09151c]"
          >
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
              Welcome to MentorLagbe
            </h3>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              Choose an option to continue
            </p>

            <div className="mt-4 flex flex-col gap-2">
              <Link
                href="/sign-in"
                onClick={() => setOpen(false)}
                className="w-full rounded-xl border border-teal-200 py-2 text-xs font-bold text-teal-700 hover:bg-teal-50 dark:border-white/15 dark:text-teal-300 dark:hover:bg-white/5"
              >
                Sign In
              </Link>
              <Link
                href="/sign-up"
                onClick={() => setOpen(false)}
                className="w-full rounded-xl bg-teal-600 py-2 text-xs font-bold text-white hover:bg-teal-500 dark:bg-teal-400 dark:text-slate-950 dark:hover:bg-teal-300"
              >
                Sign Up
              </Link>
            </div>

            <button
              type="button"
              onClick={() => setOpen(false)}
              className="mt-3 text-[11px] font-semibold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// হিন্ট: লগইন অবস্থায় মোবাইলে ক্লিক করলে ছোট ও পরিপাটি প্রোফাইল ড্রপডাউন খোলে।
const ProfileNav = () => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user as
    | { name?: string; email?: string; role?: string; image?: string | null }
    | undefined;

  if (isPending) {
    return (
      <div
        aria-hidden="true"
        className="h-9 w-9 animate-pulse rounded-full bg-teal-100/80 sm:h-10 sm:w-36 dark:bg-white/10"
      />
    );
  }

  if (!user) {
    return <GuestAuthNav />;
  }

  const name = user.name || "User";
  const normalizedRole = getRole(user.role);
  const roleLabel = normalizedRole ? ROLE_LABEL[normalizedRole] : "Member";
  const dashboardHref = getDashboardHref(user.role);

  const handleSignOut = async () => {
    const { error } = await authClient.signOut();
    if (error) {
      showToast.error("Sign out failed. Please try again.");
      return;
    }
    showToast.success("Signed out successfully!");
    router.push("/");
    router.refresh();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <button
            type="button"
            aria-label="Open profile menu"
            className="flex items-center gap-2 rounded-full border border-teal-200/80 bg-white/95 py-1 pr-2.5 pl-1 shadow-2xs transition hover:border-teal-300 sm:gap-2.5 sm:py-1.5 sm:pr-3 sm:pl-1.5 dark:border-white/10 dark:bg-white/[0.05]"
          />
        }
      >
        <span className="relative size-8 shrink-0 overflow-hidden rounded-full bg-gradient-to-br from-teal-500 to-cyan-600">
          {user.image ? (
            <img
              src={user.image}
              alt={name}
              className="h-full w-full object-cover object-top"
            />
          ) : (
            <span className="grid h-full w-full place-items-center text-xs font-extrabold text-white">
              {getInitials(name)}
            </span>
          )}
        </span>

        <span className="hidden text-left sm:block">
          <span className="block max-w-28 truncate text-sm font-bold text-slate-900 dark:text-white">
            {name}
          </span>
          <span className="block text-[11px] font-medium text-teal-700 dark:text-teal-300">
            {roleLabel}
          </span>
        </span>

        <HugeiconsIcon
          icon={ArrowDown01Icon}
          size={15}
          strokeWidth={2}
          className="text-slate-500 dark:text-slate-400"
        />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={8}
        className="w-52 max-w-[calc(100vw-1.5rem)] rounded-2xl border border-teal-200/80 bg-white/95 p-1.5 shadow-xl sm:w-56 dark:border-white/10 dark:bg-[#09151c]"
      >
        <DropdownMenuGroup>
          <DropdownMenuLabel className="px-2.5 py-1.5">
            <span className="block truncate text-xs font-extrabold text-slate-900 dark:text-white">
              {name}
            </span>
            <span className="block truncate text-[11px] font-normal text-slate-500 dark:text-slate-400">
              {user.email}
            </span>
          </DropdownMenuLabel>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            render={<Link href="/profile" />}
            className="rounded-xl px-2.5 py-2 text-xs font-semibold"
          >
            <HugeiconsIcon icon={UserCircleIcon} size={17} strokeWidth={1.8} />
            Profile
          </DropdownMenuItem>

          <DropdownMenuItem
            render={<Link href={dashboardHref} />}
            className="rounded-xl px-2.5 py-2 text-xs font-semibold"
          >
            <HugeiconsIcon
              icon={DashboardSquare01Icon}
              size={17}
              strokeWidth={1.8}
            />
            Dashboard
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          variant="destructive"
          onClick={handleSignOut}
          className="rounded-xl px-2.5 py-2 text-xs font-semibold"
        >
          <HugeiconsIcon icon={Logout01Icon} size={17} strokeWidth={1.8} />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileNav;