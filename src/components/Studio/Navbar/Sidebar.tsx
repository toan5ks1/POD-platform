"use client"

import React from "react"
import type Konva from "konva"

import { Shell } from "@/components/shells/shell"

import Toolbar from "../Toolbar"

export function Sidebar() {
  const stageRef = React.useRef<Konva.Stage>(null)

  return (
    <Shell variant="sidebar">
      <Toolbar stageRef={stageRef} />
    </Shell>
  )
}
