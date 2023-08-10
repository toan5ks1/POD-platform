"use client"

import React, { useEffect, useState } from "react"
import type Konva from "konva"

import { EDITING_TOOLBAR_HEIGHT, NAVBAR_HEIGHT } from "@/config/components"

import EditingToolbar from "./EditingToolbar/EditingToolbar"
import Frame from "./Frame"

// import Navbar from './Navbar/Navbar';

const Studio = () => {
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
    <div className="h-full w-full grow">
      <EditingToolbar />
      <div className="flex h-full items-center justify-center p-4">
        <Frame stageRef={stageRef} />
      </div>
    </div>
  )
}

export default Studio
