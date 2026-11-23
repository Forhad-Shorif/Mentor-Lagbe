"use client";

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
import { getDashboardHref, getRole, ROLE_LABEL } from "@/lib/roles";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// "Nusrat Jahan" -> "NJ" (avatar er vitore dekhai)
const getInitials = (name: string) => {
  const parts = name.trim().split(" ").filter(Boolean);
  const initials = parts
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");

  return initials || "U";
};

const ProfileNav = () => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user as
    | { name?: string; email?: string; role?: string; image?: string | null }
    | undefined;

  // Session load howar age ekta chhoto skeleton dekhai (layout jump na hoy).
  if (isPending) {
    return (
      <div
        aria-hidden="true"
        className="h-10 w-10 animate-pulse rounded-full bg-teal-100/70 sm:w-36 dark:bg-white/10"
      />
    );
  }

  // Login na thakle Sign In / Sign Up dekhai
  if (!user) {
    return (
      <div className="flex items-center gap-2">
        <Link
          href="/sign-in"
          className="hidden rounded-full px-4 py-2 text-sm font-medium text-neutral-700 transition-colors hover:text-teal-700 sm:inline-flex dark:text-neutral-300 dark:hover:text-teal-300"
        >
          Sign In
        </Link>
        <Link
          href="/sign-up"
          className="inline-flex items-center rounded-full bg-gradient-to-r from-teal-600 to-teal-700 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-teal-600/25 transition-all hover:from-teal-500 hover:to-teal-600"
        >
          Sign Up
        </Link>
      </div>
    );
  }

  const name = user.name || "User";
  const roleLabel = ROLE_LABEL[getRole(user.role)];
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
            className="flex items-center gap-2.5 rounded-full border border-teal-100 bg-white/90 py-1.5 pr-3 pl-1.5 shadow-sm transition-colors hover:bg-teal-50/70 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10"
          />
        }
      >
        {/* Avatar: profile image thakle seta, na thakle initials */}
        <span className="relative size-8 shrink-0 overflow-hidden rounded-full bg-gradient-to-br from-teal-500 to-teal-700">
          {user.image ? (
            <img
              src={user.image}
              alt={name}
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="grid h-full w-full place-items-center text-xs font-bold text-white">
              {getInitials(name)}
            </span>
          )}
        </span>

        <span className="hidden text-left sm:block">
          <span className="block max-w-28 truncate text-sm font-semibold text-neutral-800 dark:text-neutral-100">
            {name}
          </span>
          <span className="block text-[11px] text-neutral-500 dark:text-neutral-400">
            {roleLabel}
          </span>
        </span>

        <HugeiconsIcon
          icon={ArrowDown01Icon}
          size={16}
          strokeWidth={2}
          className="text-neutral-500 dark:text-neutral-400"
        />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" sideOffset={10} className="w-64 rounded-3xl p-2">
        {/* User info */}
        <DropdownMenuGroup>
          <DropdownMenuLabel className="px-3 py-2">
            <span className="block truncate text-sm font-semibold text-foreground">
              {name}
            </span>
            <span className="block truncate text-xs font-normal text-muted-foreground">
              {user.email}
            </span>
          </DropdownMenuLabel>

          <DropdownMenuSeparator />

          <DropdownMenuItem render={<Link href="/profile" />}>
            <HugeiconsIcon icon={UserCircleIcon} size={18} strokeWidth={1.8} />
            Profile
          </DropdownMenuItem>

          <DropdownMenuItem render={<Link href={dashboardHref} />}>
            <HugeiconsIcon
              icon={DashboardSquare01Icon}
              size={18}
              strokeWidth={1.8}
            />
            Dashboard
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem variant="destructive" onClick={handleSignOut}>
          <HugeiconsIcon icon={Logout01Icon} size={18} strokeWidth={1.8} />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileNav;
