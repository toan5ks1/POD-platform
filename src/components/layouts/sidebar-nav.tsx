"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import type { SidebarNavItem } from "@/types"
import type Konva from "konva"

import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"

import Toolbar from "../Studio/Toolbar"

export interface SidebarNavProps {
  items: SidebarNavItem[]
}

export function SidebarNav({ items }: SidebarNavProps) {
  const pathname = usePathname()
  const stageRef = React.useRef<Konva.Stage>(null)

  if (!items?.length) return null

  return (
    <div className="flex w-full flex-col gap-2">
      <Toolbar stageRef={stageRef} />
      {/* {items.map((item, index) => {
        const Icon = Icons[item.icon ?? "chevronLeft"]

        return item.href ? (
          <Link
            key={index}
            href={item.href}
            target={item.external ? "_blank" : ""}
            rel={item.external ? "noreferrer" : ""}
          >
            <span
              className={cn(
                "group flex w-full items-center rounded-md border border-transparent px-2 py-1 hover:bg-muted hover:text-foreground",
                pathname === item.href
                  ? "bg-muted font-medium text-foreground"
                  : "text-muted-foreground",
                item.disabled && "pointer-events-none opacity-60"
              )}
            >
              <Icon className="mr-2 h-4 w-4" aria-hidden="true" />
              <span>{item.title}</span>
            </span>
          </Link>
        ) : (
          <span
            key={index}
            className="flex w-full cursor-not-allowed items-center rounded-md p-2 text-muted-foreground hover:underline"
          >
            {item.title}
          </span>
        )
      })} */}
    </div>
  )
}
