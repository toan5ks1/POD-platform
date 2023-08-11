"use client"

import React, { useEffect, useState } from "react"
import type Konva from "konva"

import { EDITING_TOOLBAR_HEIGHT, NAVBAR_HEIGHT } from "@/config/components"
import Frame from "@/components/Studio/Frame"

export default function DesignPage() {
  const stageRef = React.useRef<Konva.Stage>(null)

  const [navbarHeight, setNavbarHeight] = useState(NAVBAR_HEIGHT)
  const [editingToolbarHeight, setEditingToolbarHeight] = useState(
    EDITING_TOOLBAR_HEIGHT
  )

  useEffect(() => {
    const navbar = document.querySelector("#navbar") as HTMLElement
    if (navbar) {
      setNavbarHeight(navbar.offsetHeight)
    }
  }, [])

  useEffect(() => {
    const editingToolbar = document.querySelector(
      "#editing_toolbar"
    ) as HTMLElement
    if (editingToolbar) {
      setEditingToolbarHeight(editingToolbar.offsetHeight)
    }
  }, [])

  return (
    <div className="flex items-center justify-center">
      <Frame stageRef={stageRef} />
    </div>
  )
}
