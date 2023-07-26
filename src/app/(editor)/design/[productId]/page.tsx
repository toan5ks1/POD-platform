"use client"

import CanvasModel from "@/components/canvas/CanvasModel"

// Running out of edge function execution units on vercel free plan
// export const runtime = "edge"

export default function DesignPage() {
  return (
    <div className="flex h-screen">
      <CanvasModel />
    </div>
  )
}
