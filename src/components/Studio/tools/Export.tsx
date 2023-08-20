/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from "react"
import type Konva from "konva"

import { useAppSelector } from "@/hooks/use-app-selector"
import { Button } from "@/components/ui/button"

type IProps = {
  stageRef: React.RefObject<Konva.Stage> | null
}

const Export = ({ stageRef }: IProps) => {
  const { width, height } = useAppSelector((state) => state.frame)

  const downloadURI = (uri: string, name: string) => {
    const link = document.createElement("a")
    link.download = name
    link.href = uri
    link.click()
  }

  const handleExport = () => {
    if (stageRef?.current) {
      const dataURL = stageRef.current.toDataURL({
        x: stageRef.current.attrs.x,
        y: stageRef.current.attrs.y,
        width: width * stageRef.current.scaleX(),
        height: height * stageRef.current.scaleY(),
        pixelRatio: 1 / stageRef.current.attrs.scaleX,
      })
      downloadURI(dataURL, "webster")
    }
  }

  return (
    <Button onClick={handleExport} className="w-full">
      Export
    </Button>
  )
}

export default Export
