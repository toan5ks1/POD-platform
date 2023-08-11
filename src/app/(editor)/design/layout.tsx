import { redirect } from "next/navigation"
import { currentUser } from "@clerk/nextjs"

import { SiteHeader } from "@/components/layouts/site-header"

interface EditorLayoutProps {
  children: React.ReactNode
}

export default async function EditorLayout({ children }: EditorLayoutProps) {
  const user = await currentUser()

  if (!user) {
    redirect("/signin")
  }

  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <SiteHeader user={user} />
      <main className="flex-auto justify-center">{children}</main>
    </div>
  )
}
