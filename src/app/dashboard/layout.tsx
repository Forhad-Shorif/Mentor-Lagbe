import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { DashboardTopbar } from "../components/DashboardToggleBar"
import { DashboardSidebar } from "../components/DashboardSideBar"

// ------------------------------------------------------------------
// 🧱 DASHBOARD LAYOUT
// ------------------------------------------------------------------
// বাম দিকে sidebar, ডান দিকে top bar + page content।
// Content ekta single scroll area — page gulote আর আলাদা <main>/min-h-screen
// lagbe na, tai chhoto screen e double padding/extra scroll hoy na.
const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <SidebarProvider>
            <DashboardSidebar />

            <SidebarInset className="min-w-0 overflow-x-clip bg-slate-50 dark:bg-[#050b10]">
                <DashboardTopbar />

                <div className="relative min-w-0 flex-1 p-3 text-neutral-900 sm:p-5 lg:p-8 dark:text-neutral-100">
                    {/* Soft ambient glow — page content er pichone, kono layout block kore na */}
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(60%_100%_at_50%_0%,rgba(20,184,166,0.10),transparent_72%)] dark:bg-[radial-gradient(60%_100%_at_50%_0%,rgba(56,189,248,0.12),transparent_72%)]"
                    />
                    <div className="relative min-w-0">{children}</div>
                </div>
            </SidebarInset>
        </SidebarProvider>

    )
}

export default DashboardLayout
