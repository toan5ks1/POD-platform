import Image from "next/image"
import Link from "next/link"
import { redirect } from "next/navigation"
import { currentUser } from "@clerk/nextjs"

import { dashboardConfig } from "@/config/dashboard"
import { siteConfig } from "@/config/site"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Icons } from "@/components/icons"
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
    <div className="flex min-h-screen flex-col">
      <SiteHeader user={user} />
      <div className="flex flex-row">
        <main className="flex-auto justify-self-center">{children}</main>
        <aside className="fixed top-14 z-30 hidden h-[calc(100vh-3.5rem)] basis-1/4 border-l pl-4 pt-8 md:sticky md:block">
          <SidebarNav items={dashboardConfig.sidebarNav} />
        </aside>
      </div>
    </div>
  )
}
