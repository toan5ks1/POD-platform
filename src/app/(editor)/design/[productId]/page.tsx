"use client"

import React, { useRef } from "react"
import type Konva from "konva"

import { DesignTabs } from "@/components/pagers/design-tabs"
import EditingToolbar from "@/components/Studio/EditingToolbar/EditingToolbar"
import Frame from "@/components/Studio/Frame"
import Toolbar from "@/components/Studio/Toolbar"

interface DesignPageProps {
  params: {
    productId: string
  }
}

export default function DesignPage({ params }: DesignPageProps) {
  const productId = Number(params.productId)
  const stageRef = useRef<Konva.Stage>(null)
  const src = "/images/resources/t-shirt/t-shirt-front.png"

  return (
    <div className="flex h-[calc(100vh-3.5rem)] flex-row overflow-hidden ">
      <div className="relative h-full w-3/4 overflow-hidden bg-muted">
        <div className="absolute z-30 flex h-min w-full justify-between px-4 pt-6">
          <EditingToolbar />
          <DesignTabs productId={productId} />
        </div>
        <Frame stageRef={stageRef} initialImage={src} />
      </div>

      <div className="fixed z-30 hidden w-1/4 border-l px-4 md:sticky md:block">
        <Toolbar stageRef={stageRef} />
      </div>
    </div>
  )
}
