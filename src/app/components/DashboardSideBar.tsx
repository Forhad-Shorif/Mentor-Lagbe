"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
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
    useSidebar,
} from "@/components/ui/sidebar"

import { authClient } from "@/lib/auth-client"
import { showToast } from "@/lib/utils/toast"
import { cn } from "@/lib/utils"

type UserRole = "students" | "teachers" | "admin"

// হিন্ট: অজানা role এলে null ফেরত দেয়, কোনো ভুল fallback নেই।
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
    const { isMobile, setOpenMobile } = useSidebar()

    const { data: session } = authClient.useSession()
    const [isSigningOut, setIsSigningOut] = useState(false)

    const user = session?.user
    const role = getRole(user?.role)
    const items = role ? MENU_BY_ROLE[role] : []
    const dashboardRoot = role ? `/dashboard/${role}` : "/dashboard"

    const name = user?.name?.trim() || "User"

    // হিন্ট: রুট পরিবর্তন হলে মোবাইলের সাইডবার অটো বন্ধ হয়ে যায়।
    useEffect(() => {
        if (isMobile) {
            setOpenMobile(false)
        }
    }, [pathname, isMobile, setOpenMobile])

    const closeOnMobile = () => {
        if (isMobile) {
            setOpenMobile(false)
        }
    }

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

            closeOnMobile()
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
                    tooltip={item.label}
                    render={<Link href={item.href} onClick={closeOnMobile} />}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                        "group/nav relative h-10 overflow-hidden rounded-xl px-2.5 md:h-11",
                        "gap-2.5 text-[13px] font-semibold transition-all duration-200 md:gap-3",
                        "group-data-[collapsible=icon]:mx-auto group-data-[collapsible=icon]:size-10 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:p-0",
                        "text-slate-600 hover:bg-teal-50/80 hover:text-slate-950",
                        "dark:text-slate-400 dark:hover:bg-white/[0.05] dark:hover:text-white",

                        isActive && [
                            "bg-gradient-to-r from-teal-50 to-cyan-50/60 text-teal-800 hover:bg-teal-50",
                            "dark:from-teal-400/12 dark:to-cyan-400/5 dark:text-teal-200 dark:hover:bg-teal-400/[0.12]",
                        ]
                    )}
                >
                    {isActive && (
                        <span className="absolute left-0 top-2 bottom-2 w-[3px] rounded-full bg-teal-500 group-data-[collapsible=icon]:hidden dark:bg-teal-300" />
                    )}

                    <span
                        className={cn(
                            "grid size-7 shrink-0 place-items-center rounded-lg transition-all duration-200 md:size-8",
                            isActive
                                ? "bg-teal-600 text-white shadow-2xs dark:bg-teal-400 dark:text-slate-950"
                                : "text-slate-400 group-hover/nav:bg-teal-100/70 group-hover/nav:text-teal-700 dark:text-slate-500 dark:group-hover/nav:bg-white/[0.06] dark:group-hover/nav:text-teal-300"
                        )}
                    >
                        <Icon className="size-4" />
                    </span>

                    <span className="min-w-0 flex-1 truncate group-data-[collapsible=icon]:hidden">
                        {item.label}
                    </span>

                    {isActive && (
                        <ChevronRight className="size-3.5 shrink-0 text-teal-600 group-data-[collapsible=icon]:hidden dark:text-teal-300" />
                    )}
                </SidebarMenuButton>
            </SidebarMenuItem>
        )
    }

    return (
        <Sidebar
            collapsible="icon"
            className={cn(
                "border-r border-teal-200/70 bg-white",
                "[&_[data-slot=sidebar-inner]]:bg-white",
                "dark:border-white/[0.08] dark:bg-[#071117]",
                "[&_[data-slot=sidebar-inner]]:dark:bg-[#071117]"
            )}
        >
            {/* ───────────── BRAND ───────────── */}
            <SidebarHeader className="px-3.5 pt-4 pb-2.5 md:px-4 md:pt-5 md:pb-3 group-data-[collapsible=icon]:px-2 group-data-[collapsible=icon]:items-center">
                <Link
                    href="/"
                    onClick={closeOnMobile}
                    title="MentorLagbe"
                    className="group flex items-center gap-2.5 rounded-xl px-1 py-1 md:gap-3 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0"
                >
                    <span className="relative grid size-9 shrink-0 place-items-center overflow-hidden rounded-xl bg-gradient-to-br from-teal-500 to-cyan-600 text-xs font-black tracking-tight text-white shadow-md shadow-teal-600/20 transition-transform duration-300 group-hover:scale-[1.03] md:size-10 md:text-[13px] dark:from-teal-400 dark:to-cyan-400 dark:text-slate-950">
                        ML
                    </span>

                    <span className="min-w-0 group-data-[collapsible=icon]:hidden">
                        <span className="block truncate text-base font-extrabold tracking-tight text-slate-900 md:text-[17px] dark:text-white">
                            Mentor
                            <span className="text-teal-600 dark:text-teal-300">
                                Lagbe
                            </span>
                        </span>
                        <span className="block truncate text-[9px] font-bold tracking-[0.16em] text-slate-400 uppercase md:text-[10px] dark:text-slate-500">
                            Learning Platform
                        </span>
                    </span>
                </Link>
            </SidebarHeader>

            {/* ───────────── USER PROFILE ───────────── */}
            <div className="px-3 pt-1.5 pb-3 md:pb-4 group-data-[collapsible=icon]:px-2">
                <Link
                    href="/profile"
                    onClick={closeOnMobile}
                    title={`${name} · Profile`}
                    className={cn(
                        "group/profile relative block overflow-hidden rounded-2xl",
                        "border border-teal-200/70 bg-teal-50/40 p-2.5 md:p-3",
                        "group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:size-10 group-data-[collapsible=icon]:mx-auto group-data-[collapsible=icon]:items-center group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:rounded-xl group-data-[collapsible=icon]:p-0",
                        "transition-all duration-200 hover:border-teal-300 hover:bg-teal-50/80",
                        "dark:border-white/[0.08] dark:bg-white/[0.03]",
                        "dark:hover:border-teal-400/30 dark:hover:bg-teal-400/[0.05]"
                    )}
                >
                    <div className="relative flex items-center gap-2.5 md:gap-3 group-data-[collapsible=icon]:justify-center">
                        <span className="relative grid size-9 shrink-0 place-items-center overflow-hidden rounded-xl bg-gradient-to-br from-teal-500/15 to-cyan-500/15 text-teal-700 ring-1 ring-teal-500/20 md:size-10 group-data-[collapsible=icon]:size-8 dark:text-teal-200">
                            {user?.image ? (
                                <img
                                    src={user.image}
                                    alt={name}
                                    className="size-full object-cover object-top"
                                />
                            ) : (
                                <UserRound className="size-4 md:size-5" />
                            )}
                        </span>

                        <span className="min-w-0 flex-1 group-data-[collapsible=icon]:hidden">
                            <span className="block truncate text-xs font-bold text-slate-900 md:text-[13px] dark:text-slate-100">
                                {name}
                            </span>

                            <span className="mt-0.5 flex items-center gap-1.5">
                                <span className="size-1.5 rounded-full bg-emerald-500" />
                                <span className="truncate text-[10px] font-semibold text-teal-700 md:text-[11px] dark:text-teal-300">
                                    {role ? ROLE_LABEL[role] : "Member"}
                                </span>
                            </span>
                        </span>

                        <ChevronRight className="size-3.5 shrink-0 text-slate-400 transition-transform group-hover/profile:translate-x-0.5 group-hover/profile:text-teal-600 group-data-[collapsible=icon]:hidden dark:group-hover/profile:text-teal-300" />
                    </div>
                </Link>
            </div>

            {/* ───────────── NAVIGATION ───────────── */}
            <SidebarContent className="px-3 pt-0.5 group-data-[collapsible=icon]:px-2">
                <div className="mb-1.5 flex items-center justify-between px-2.5 group-data-[collapsible=icon]:hidden">
                    <p className="text-[10px] font-bold tracking-[0.16em] text-slate-400 uppercase dark:text-slate-500">
                        Workspace
                    </p>
                    <span className="rounded-md bg-teal-500/10 px-1.5 py-0.5 text-[9px] font-bold text-teal-700 dark:text-teal-300">
                        MENU
                    </span>
                </div>

                <SidebarMenu className="gap-1 group-data-[collapsible=icon]:items-center">
                    {items.map(renderNavItem)}
                </SidebarMenu>
            </SidebarContent>

            {/* ───────────── FOOTER ───────────── */}
            <SidebarFooter className="mt-auto px-3 pb-3 pt-2.5 group-data-[collapsible=icon]:px-2">
                <div className="mb-2 h-px bg-teal-200/60 dark:bg-white/[0.07]" />

                <SidebarMenu className="group-data-[collapsible=icon]:items-center">
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            type="button"
                            tooltip="Log out"
                            disabled={isSigningOut}
                            onClick={handleSignOut}
                            className={cn(
                                "group/logout h-10 rounded-xl px-2.5 md:h-11",
                                "gap-2.5 text-[13px] font-semibold md:gap-3",
                                "group-data-[collapsible=icon]:mx-auto group-data-[collapsible=icon]:size-10 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:p-0",
                                "text-slate-500 transition-all duration-200",
                                "hover:bg-rose-50 hover:text-rose-600",
                                "dark:text-slate-400 dark:hover:bg-rose-400/[0.07] dark:hover:text-rose-300",
                                "disabled:cursor-not-allowed disabled:opacity-60"
                            )}
                        >
                            <span className="grid size-7 shrink-0 place-items-center rounded-lg text-slate-400 transition-colors group-hover/logout:bg-rose-100 group-hover/logout:text-rose-600 md:size-8 dark:group-hover/logout:bg-rose-400/10 dark:group-hover/logout:text-rose-300">
                                <LogOut className="size-4" />
                            </span>

                            <span className="group-data-[collapsible=icon]:hidden">
                                {isSigningOut ? "Logging out..." : "Log out"}
                            </span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}