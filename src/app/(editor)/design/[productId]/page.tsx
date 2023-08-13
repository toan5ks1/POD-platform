"use client"

import React, { useEffect, useState } from "react"
import type Konva from "konva"

import { EDITING_TOOLBAR_HEIGHT, NAVBAR_HEIGHT } from "@/config/components"
import Frame from "@/components/Studio/Frame"

export default function DesignPage() {
  const imgUrl = "/images/resources/t-shirt/t-shirt-front.png"
  const stageRef = React.useRef<Konva.Stage>(null)
  const [image, setImage] = useState<HTMLImageElement | undefined>(undefined)

  useEffect(() => {
    const blob = new Blob([imgUrl], { type: "image/png" })
    const img = new Image()
    img.src = URL.createObjectURL(blob)
    img.onload = () => {
      setImage(img)
    }
  }, [])

  return (
    <div className="flex items-center justify-center">
      <Frame stageRef={stageRef} initialImage={image} />
    </div>
  )
}
