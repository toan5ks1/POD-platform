import { redirect } from "next/navigation"
import { currentUser } from "@clerk/nextjs"

import { dashboardConfig } from "@/config/dashboard"
import { SidebarNav } from "@/components/layouts/sidebar-nav"
import { SiteHeader } from "@/components/layouts/site-header"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const user = await currentUser()

  if (!user) {
    redirect("/signin")
  }

  return (
    <div className="flex h-screen flex-col">
      <SiteHeader user={user} />
      <div className="flex h-full flex-row overflow-hidden">
        <main className="flex-auto justify-center">{children}</main>
        {/* <aside className="fixed z-30 hidden basis-1/4 border-l px-4 py-8 md:sticky md:block">
          <SidebarNav items={dashboardConfig.sidebarNav} />
        </aside> */}
      </div>
    </div>
  )
}
