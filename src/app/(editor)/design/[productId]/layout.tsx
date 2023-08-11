"use client"

import { useRef } from "react"
import { store } from "@/store/store"
import type Konva from "konva"
import { Provider } from "react-redux"

import { DesignTabs } from "@/components/pagers/design-tabs"
import { Shell } from "@/components/shells/shell"
import EditingToolbar from "@/components/Studio/EditingToolbar/EditingToolbar"
import Toolbar from "@/components/Studio/Toolbar"

interface DesignLayoutProps {
  children: React.ReactNode
  params: {
    productId: string
  }
}

export default function DesignLayout({ children, params }: DesignLayoutProps) {
  const productId = Number(params.productId)
  const stageRef = useRef<Konva.Stage>(null)
  return (
    <Provider store={store}>
      <div className="flex h-screen flex-row overflow-hidden ">
        <div className="relative w-full gap-8 bg-muted pb-8 pt-6 md:py-8">
          <div className="flex h-min w-full justify-between px-4">
            <EditingToolbar />
            <DesignTabs productId={productId} />
          </div>
          {children}
        </div>

        <div className="fixed z-30 hidden w-2/6 border-l px-4 md:sticky md:block">
          <Toolbar stageRef={stageRef} />
        </div>
      </div>
    </Provider>
  )
}
