import { redirect } from "next/navigation"
import { currentUser } from "@clerk/nextjs"

import { DesignTabs } from "@/components/pagers/design-tabs"
import { Shell } from "@/components/shells/shell"

interface DesignLayoutProps {
  children: React.ReactNode
  params: {
    productId: string
  }
}

export default async function DesignLayout({
  children,
  params,
}: DesignLayoutProps) {
  const productId = Number(params.productId)

  const user = await currentUser()

  if (!user) {
    redirect("/signin")
  }

  return (
    <Shell variant="sidebar" className="bg-gray-200">
      <div className="relative h-[calc(100vh_-_8rem)]">
        <DesignTabs productId={productId} className="absolute right-6 w-min" />
        {children}
      </div>
    </Shell>
  )
}
