"use client"

import { useRef } from "react"
import { store } from "@/store/store"
import type Konva from "konva"
import { Provider } from "react-redux"

import { DesignTabs } from "@/components/pagers/design-tabs"
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
      <div className="flex h-[calc(100vh-3.5rem)] flex-row overflow-hidden ">
        <div className="relative h-full w-3/4 overflow-hidden bg-muted">
          <div className="absolute z-30 flex h-min w-full justify-between px-4 pt-6">
            <EditingToolbar />
            <DesignTabs productId={productId} />
          </div>
          {children}
        </div>

        <div className="fixed z-30 hidden w-1/4 border-l px-4 md:sticky md:block">
          <Toolbar stageRef={stageRef} />
        </div>
      </div>
    </Provider>
  )
}
