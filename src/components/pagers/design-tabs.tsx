"use client"

import { usePathname, useRouter } from "next/navigation"

import { cn } from "@/lib/utils"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface DesignTabsProps extends React.ComponentPropsWithoutRef<typeof Tabs> {
  productId: number
}

export function DesignTabs({
  className,
  productId,
  ...props
}: DesignTabsProps) {
  const router = useRouter()
  const pathname = usePathname()

  const tabs = [
    {
      title: "Edit",
      href: `/design/${productId}`,
    },
    {
      title: "Preview",
      href: `/design/${productId}/preview`,
    },
  ]

  return (
    <Tabs
      {...props}
      className={cn("overflow-x-auto", className)}
      onValueChange={(value) => router.push(value)}
    >
      <TabsList>
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.title}
            value={tab.href}
            className={cn(
              pathname === tab.href && "bg-background text-foreground shadow-sm"
            )}
            onClick={() => router.push(tab.href)}
          >
            {tab.title}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  )
}
