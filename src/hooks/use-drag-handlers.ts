/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useCallback } from "react"
import type Konva from "konva"

import { type StageObject } from "@/types/stage-object"
import { KeyType } from "@/config/keys"

import useKeyPress from "./use-key-press"
import useStageObject from "./use-stage-object"

const useDragHandlers = () => {
  const { updateOne } = useStageObject()

  const isDragStagePressed = useKeyPress(KeyType.DRAG_STAGE)

  const onDragStart = useCallback((e: Konva.KonvaEventObject<DragEvent>) => {
    if (isDragStagePressed) {
      e.target.stopDrag()
    }
  }, [])

  const onDragEnd = useCallback(
    (e: Konva.KonvaEventObject<DragEvent>, obj: StageObject) => {
      e.evt.preventDefault()
      e.evt.stopPropagation()

      const id = obj.id

      const { x, y, offsetX, offsetY } = e.target.attrs

      updateOne({
        id,
        data: {
          ...obj.data,
          x,
          y,
          offsetX,
          offsetY,
        },
      })
      e.target.getLayer().batchDraw()
    },
    []
  )

  return { onDragStart, onDragEnd }
}

export default useDragHandlers
