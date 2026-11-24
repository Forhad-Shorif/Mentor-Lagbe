
"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useState, type ComponentType } from "react"
import type { LucideIcon } from "lucide-react"
import {
    Bookmark,
    ClipboardList,
    CreditCard,
    FileText,
    LayoutDashboard,
    LogOut,
    Settings,
    SquarePlus,
    UserRound,
    UsersRound,
    ChevronRight,
} from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"

import { authClient } from "@/lib/auth-client"
import { showToast } from "@/lib/utils/toast"
import { cn } from "@/lib/utils"

type UserRole = "students" | "teachers" | "admin"

// Role na porichito hole null — kono "students" fallback nei.
const getRole = (role?: string): UserRole | null => {
    const value = String(role || "").toLowerCase()

    if (value === "students" || value === "student") return "students"
    if (value === "teachers" || value === "teacher") return "teachers"
    if (value === "admin") return "admin"

    return null
}

const ROLE_LABEL: Record<UserRole, string> = {
    students: "Student",
    teachers: "Teacher",
    admin: "Admin",
}

type NavItem = {
    label: string
    href: string
    icon: LucideIcon
}

const MENU_BY_ROLE: Record<UserRole, NavItem[]> = {
    students: [
        { label: "Overview", href: "/dashboard/students", icon: LayoutDashboard },
        { label: "My Applications", href: "/dashboard/students/application", icon: ClipboardList },
        { label: "Saved Tuitions", href: "/dashboard/students/saved", icon: Bookmark },
        { label: "Update Profile", href: "/dashboard/students/profile-setting", icon: Settings },
    ],

    teachers: [
        { label: "Overview", href: "/dashboard/teachers", icon: LayoutDashboard },
        { label: "My Tuitions", href: "/dashboard/teachers/tuitions", icon: FileText },
        { label: "Post Tuition", href: "/dashboard/teachers/post", icon: SquarePlus },
        { label: "Applicants", href: "/dashboard/teachers/applicants", icon: UsersRound },
        { label: "Update Profile", href: "/dashboard/teachers/profile-setting", icon: Settings },
    ],

    admin: [
        { label: "Overview", href: "/dashboard/admin", icon: LayoutDashboard },
        { label: "Users", href: "/dashboard/admin/users", icon: UsersRound },
        { label: "Tuitions", href: "/dashboard/admin/tuitions", icon: FileText },
        { label: "Payments", href: "/dashboard/admin/payments", icon: CreditCard },
        { label: "Update Profile", href: "/dashboard/admin/profile-setting", icon: Settings },
    ],
}

export function DashboardSidebar() {
    const pathname = usePathname()
    const router = useRouter()

    const { data: session } = authClient.useSession()
    const [isSigningOut, setIsSigningOut] = useState(false)

    const user = session?.user
    const role = getRole(user?.role)
    const items = role ? MENU_BY_ROLE[role] : []
    const dashboardRoot = role ? `/dashboard/${role}` : "/dashboard"

    const name = user?.name?.trim() || "User"

    async function handleSignOut() {
        if (isSigningOut) return

        setIsSigningOut(true)

        try {
            const { error } = await authClient.signOut()

            if (error) {
                console.error("Sign out failed:", error)
                showToast.error("Could not log out. Please try again.")
                return
            }

            showToast.success("Logged out successfully.")
            router.push("/")
            router.refresh()
        } catch (error) {
            console.error("Sign out failed:", error)
            showToast.error("Something went wrong while logging out.")
        } finally {
            setIsSigningOut(false)
        }
    }

    const renderNavItem = (item: NavItem) => {
        const Icon = item.icon

        const isActive =
            pathname === item.href ||
            (item.href !== dashboardRoot &&
                pathname.startsWith(`${item.href}/`))

        return (
            <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                    render={<Link href={item.href} />}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                        "group/nav relative h-11 overflow-hidden rounded-xl px-3",
                        "gap-3 text-[13px] font-medium transition-all duration-200",
                        "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-950",
                        "dark:text-neutral-400 dark:hover:bg-white/[0.05] dark:hover:text-white",

                        isActive && [
                            "bg-teal-50 text-teal-800 hover:bg-teal-50",
                            "dark:bg-teal-400/[0.09] dark:text-teal-200 dark:hover:bg-teal-400/[0.09]",
                        ]
                    )}
                >
                    {/* Active indicator */}
                    {isActive && (
                        <span className="absolute left-0 top-2 bottom-2 w-[3px] rounded-full bg-teal-500 dark:bg-teal-300" />
                    )}

                    {/* Icon box */}
                    <span
                        className={cn(
                            "grid size-8 shrink-0 place-items-center rounded-lg transition-all duration-200",
                            isActive
                                ? "bg-teal-100 text-teal-700 dark:bg-teal-300/10 dark:text-teal-200"
                                : "text-neutral-400 group-hover/nav:text-teal-600 dark:text-neutral-500 dark:group-hover/nav:text-teal-300"
                        )}
                    >
                        <Icon className="size-[17px]" />
                    </span>

                    <span className="min-w-0 flex-1 truncate">
                        {item.label}
                    </span>

                    {isActive && (
                        <ChevronRight className="size-3.5 shrink-0 text-teal-500 dark:text-teal-300" />
                    )}
                </SidebarMenuButton>
            </SidebarMenuItem>
        )
    }

    return (
        <Sidebar
            className={cn(
                "border-r border-neutral-200/80 bg-white",
                "[&_[data-slot=sidebar-inner]]:bg-white",
                "dark:border-white/[0.07] dark:bg-[#0b1017]",
                "[&_[data-slot=sidebar-inner]]:dark:bg-[#0b1017]"
            )}
        >
            {/* ───────────── BRAND ───────────── */}
            <SidebarHeader className="px-4 pt-5 pb-3">
                <Link
                    href="/"
                    className="group flex items-center gap-3 rounded-xl px-1 py-1"
                >
                    <span className="relative grid size-10 shrink-0 place-items-center overflow-hidden rounded-xl bg-gradient-to-br from-teal-400 via-cyan-400 to-blue-500 text-[13px] font-black tracking-tight text-white shadow-lg shadow-teal-500/15 transition-transform duration-300 group-hover:scale-[1.04]">
                        <span className="absolute inset-0 bg-gradient-to-br from-white/25 to-transparent" />
                        <span className="relative">ML</span>
                    </span>

                    <span className="min-w-0">
                        <span className="block truncate text-[17px] font-bold tracking-tight text-neutral-900 dark:text-white">
                            Mentor
                            <span className="text-teal-600 dark:text-teal-300">
                                Lagbe
                            </span>
                        </span>
                        <span className="mt-0.5 block text-[10px] font-medium tracking-[0.16em] text-neutral-400 dark:text-neutral-500">
                            LEARNING PLATFORM
                        </span>
                    </span>
                </Link>
            </SidebarHeader>

            {/* ───────────── USER PROFILE ───────────── */}
            <div className="px-3 pt-2 pb-4">
                <Link
                    href="/profile"
                    className={cn(
                        "group/profile relative block overflow-hidden rounded-2xl",
                        "border border-neutral-200/80 bg-neutral-50/80 p-3",
                        "transition-all duration-200 hover:border-teal-300 hover:bg-teal-50/60",
                        "dark:border-white/[0.07] dark:bg-white/[0.025]",
                        "dark:hover:border-teal-400/30 dark:hover:bg-teal-400/[0.04]"
                    )}
                >
                    {/* Subtle card decoration */}
                    <div className="pointer-events-none absolute -right-8 -top-8 size-24 rounded-full bg-teal-400/5 blur-2xl transition-colors group-hover/profile:bg-teal-400/10" />

                    <div className="relative flex items-center gap-3">
                        {/* Avatar */}
                        <span className="relative grid size-11 shrink-0 place-items-center overflow-hidden rounded-xl bg-gradient-to-br from-teal-100 to-cyan-100 text-teal-700 ring-1 ring-teal-200/80 dark:from-teal-400/10 dark:to-cyan-400/10 dark:text-teal-200 dark:ring-teal-300/10">
                            {user?.image ? (
                                <img
                                    src={user.image}
                                    alt={name}
                                    className="size-full object-cover"
                                />
                            ) : (
                                <UserRound className="size-5" />
                            )}
                        </span>

                        {/* User info */}
                        <span className="min-w-0 flex-1">
                            <span className="block truncate text-[13px] font-semibold text-neutral-900 dark:text-neutral-100">
                                {name}
                            </span>

                            <span className="mt-1 flex items-center gap-1.5">
                                <span className="size-1.5 rounded-full bg-emerald-500" />
                                <span className="truncate text-[11px] text-neutral-500 dark:text-neutral-400">
                                    {role ? ROLE_LABEL[role] : "Member"}
                                </span>
                            </span>
                        </span>

                        <ChevronRight className="size-4 shrink-0 text-neutral-400 transition-transform group-hover/profile:translate-x-0.5 group-hover/profile:text-teal-500" />
                    </div>
                </Link>
            </div>

            {/* ───────────── NAVIGATION ───────────── */}
            <SidebarContent className="px-3 pt-1">
                <div className="mb-2 flex items-center justify-between px-3">
                    <p className="text-[10px] font-semibold tracking-[0.16em] text-neutral-400 dark:text-neutral-600">
                        WORKSPACE
                    </p>
                    <span className="rounded-md bg-neutral-100 px-1.5 py-0.5 text-[9px] font-medium text-neutral-400 dark:bg-white/[0.04] dark:text-neutral-500">
                        MENU
                    </span>
                </div>

                <SidebarMenu className="gap-1">
                    {items.map(renderNavItem)}
                </SidebarMenu>
            </SidebarContent>

            {/* ───────────── FOOTER ───────────── */}
            <SidebarFooter className="mt-auto px-3 pb-3 pt-3">
                <div className="mb-2 h-px bg-neutral-200/80 dark:bg-white/[0.06]" />

                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            type="button"
                            disabled={isSigningOut}
                            onClick={handleSignOut}
                            className={cn(
                                "group/logout h-11 rounded-xl px-3",
                                "gap-3 text-[13px] font-medium",
                                "text-neutral-500 transition-all duration-200",
                                "hover:bg-rose-50 hover:text-rose-600",
                                "dark:text-neutral-400 dark:hover:bg-rose-400/[0.06] dark:hover:text-rose-300",
                                "disabled:cursor-not-allowed disabled:opacity-60"
                            )}
                        >
                            <span className="grid size-8 shrink-0 place-items-center rounded-lg text-neutral-400 transition-colors group-hover/logout:bg-rose-100 group-hover/logout:text-rose-600 dark:group-hover/logout:bg-rose-400/10 dark:group-hover/logout:text-rose-300">
                                <LogOut className="size-[17px]" />
                            </span>

                            <span>
                                {isSigningOut ? "Logging out..." : "Log out"}
                            </span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>

                <div className="mt-2 rounded-xl bg-neutral-50 px-3 py-2.5 dark:bg-white/[0.025]">
                    <p className="text-[10px] font-medium text-neutral-400 dark:text-neutral-600">
                        MentorLagbe
                    </p>
                    <p className="mt-0.5 text-[10px] text-neutral-500 dark:text-neutral-500">
                        Learn · Teach · Grow
                    </p>
                </div>
            </SidebarFooter>
        </Sidebar>
    )
}
