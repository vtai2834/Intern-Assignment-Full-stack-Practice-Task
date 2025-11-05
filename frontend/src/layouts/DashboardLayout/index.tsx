import type React from "react"
import { SidebarProvider, useSidebar } from "@/components/ui/sidebar"
import AppSidebar from "@/components/dashboard/sidebar"
import DashboardHeader from "@/components/dashboard/header/header.tsx"
import "./dashboard-layout.css"

function MainContent({ children }: { children: React.ReactNode }) {
  const { state } = useSidebar()
  const sidebarWidth = state === "collapsed" ? "3rem" : "16rem"
  
  return (
    <div 
      className="mainContent" 
      style={{ 
        marginLeft: sidebarWidth,
        transition: 'margin-left 300ms ease-linear',
        '--sidebar-width': sidebarWidth,
      } as React.CSSProperties}
    >
      <DashboardHeader sidebarWidth={sidebarWidth} />
      <main className="pageContent" style={{ padding: 0 }}>{children}</main>
    </div>
  )
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <MainContent>{children}</MainContent>
      </div>
    </SidebarProvider>
  )
}
