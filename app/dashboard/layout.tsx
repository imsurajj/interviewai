import type React from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/dashboard/AppSidebar"
import DashboardNavbar from "@/components/dashboard/DashboardNavbar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="bg-white min-h-screen">
      <SidebarProvider>
        <AppSidebar />
        <div className="flex-1">
          <DashboardNavbar />
          <main className="bg-white">{children}</main>
        </div>
      </SidebarProvider>
    </div>
  )
}
