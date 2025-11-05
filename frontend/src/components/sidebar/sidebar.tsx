import { useState } from "react"
import { Home, Users, Settings, UserPlus, MessageSquare, ChevronsUpDown } from "lucide-react"
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
import OrganizationSwitcher from "../dashboard/modals/organization-modal/organizationModal"
import UserMenu from "../dashboard/modals/user-setting-modal/userSettingModal"
import { Popover, PopoverTrigger } from "@/components/ui/popover"

export default function AppSidebar() {
  const [orgOpen, setOrgOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const { state } = useSidebar()
  const isCollapsed = state === "collapsed"

  const navItems = [
    { icon: Home, label: "Home", active: true },
    { icon: Users, label: "Contacts", active: false },
    { icon: Settings, label: "Settings", active: false },
  ]

  const favorites = [
    { label: "Airbnb", icon: "🔴" },
    { label: "Google", icon: "🔵" },
    { label: "Microsoft", icon: "🟫" },
  ]

  return (
    <>
      <Sidebar collapsible="icon" className="border-r border-sidebar-border">
        <SidebarHeader className="flex items-center justify-between p-2">
          <Popover open={orgOpen} onOpenChange={setOrgOpen}>
            <PopoverTrigger asChild>
              <button
                className="flex items-center gap-2 w-full rounded-md px-2 py-2 text-sm hover:bg-sidebar-accent transition-colors"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded bg-slate-800 text-white text-xs font-bold shrink-0">
                  v
                </div>
                {!isCollapsed && (
                  <>
                    <span className="font-semibold">vtai</span>
                    <ChevronsUpDown size={16} className="ml-auto" />
                  </>
                )}
              </button>
            </PopoverTrigger>
            <OrganizationSwitcher />
          </Popover>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {navItems.map((item) => (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton asChild isActive={item.active} tooltip={isCollapsed ? item.label : undefined}>
                      <a href="#">
                        <item.icon size={20} />
                        {!isCollapsed && <span>{item.label}</span>}
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup>
            {!isCollapsed && <SidebarGroupLabel>Favorites</SidebarGroupLabel>}
            <SidebarGroupContent>
              <SidebarMenu>
                {favorites.map((fav) => (
                  <SidebarMenuItem key={fav.label}>
                    <SidebarMenuButton asChild tooltip={isCollapsed ? fav.label : undefined}>
                      <a href="#">
                        <span className="text-lg shrink-0">{fav.icon}</span>
                        {!isCollapsed && <span>{fav.label}</span>}
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip={isCollapsed ? "Invite member" : undefined}>
                <button className="flex items-center gap-2 w-full">
                  <UserPlus size={20} />
                  {!isCollapsed && <span>Invite member</span>}
                </button>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip={isCollapsed ? "Feedback" : undefined}>
                <button className="flex items-center gap-2 w-full">
                  <MessageSquare size={20} />
                  {!isCollapsed && <span>Feedback</span>}
                </button>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>

          <Popover open={userMenuOpen} onOpenChange={setUserMenuOpen}>
            <PopoverTrigger asChild>
              <button
                className={`mt-4 flex items-center gap-2 w-full rounded-md px-2 py-2 text-sm hover:bg-sidebar-accent transition-colors ${isCollapsed ? 'justify-center' : ''}`}
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-600 text-white text-xs font-bold shrink-0">
                  T
                </div>
                {!isCollapsed && (
                  <>
                    <span className="flex-1 text-left">Tài Phan</span>
                    <span className="text-lg">⋯</span>
                  </>
                )}
              </button>
            </PopoverTrigger>
            <UserMenu onOpenChange={setUserMenuOpen} />
          </Popover>
        </SidebarFooter>
      </Sidebar>
    </>
  )
}
