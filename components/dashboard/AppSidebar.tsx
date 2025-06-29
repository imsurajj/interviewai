"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { Home, Mic, MessageCircle, History, Settings, LogOut, Zap } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

const menuItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Voice Interview",
    url: "/dashboard/voice-interview",
    icon: Mic,
  },
  {
    title: "Chat Interview",
    url: "/dashboard/chat-interview",
    icon: MessageCircle,
  },
  {
    title: "Interview History",
    url: "/dashboard/history",
    icon: History,
  },
]

export function AppSidebar() {
  const { isMobile, setOpenMobile } = useSidebar()
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated")
    router.push("/")
  }

  const handleLinkClick = () => {
    if (isMobile) {
      setOpenMobile(false)
    }
  }

  return (
    <Sidebar>
      <SidebarHeader className="border-b border-sidebar-border">
        <div className="flex items-center gap-3 px-4 py-3">
          <div className="flex aspect-square size-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-lg">
            <Zap className="size-5" />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-bold text-lg text-blue-600">InterviewAce</span>
            <span className="truncate text-xs text-gray-500">AI Interview Practice</span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Interview Practice</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url} onClick={handleLinkClick}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              {/* Settings only on mobile */}
              {isMobile && (
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href="/dashboard/settings" onClick={handleLinkClick}>
                      <Settings />
                      <span>Settings</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={handleLogout} className="text-red-600 hover:text-red-700 hover:bg-red-50">
              <LogOut />
              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
