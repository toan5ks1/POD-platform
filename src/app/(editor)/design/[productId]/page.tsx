"use client"

import React from "react"
import type Konva from "konva"

import Frame from "@/components/Studio/Frame"

export default function DesignPage() {
  const stageRef = React.useRef<Konva.Stage>(null)
  const src = "/images/resources/t-shirt/t-shirt-front.png"

  return (
    <div className="flex h-full items-center justify-center">
      <Frame stageRef={stageRef} initialImage={src} />
    </div>
  )
}
