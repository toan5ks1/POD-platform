/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useEffect, useState } from "react"
import { setScale } from "@/store/slices/frame-slice"
import type Konva from "konva"
import { type KonvaEventObject } from "konva/lib/Node"
import { useDispatch } from "react-redux"

import { FRAME_CONTAINER_PADDING } from "@/config/components"
import { KeyType } from "@/config/keys"

import { useAppSelector } from "./use-app-selector"
import useKeyPress from "./use-key-press"

type Props = {
  stageRef?: React.RefObject<Konva.Stage> | null
}

const useStageResize = ({ stageRef }: Props) => {
  const dispatch = useDispatch()
  const { width, height, scale } = useAppSelector((state) => state.frame)
  const [boxWidth, setBoxWidth] = useState(500)
  const [boxHeight, setBoxHeight] = useState(500)

  const isKeyPressed = useKeyPress(KeyType.DRAG_STAGE)

  const setStageSize = () => {
    const toolbar = document.querySelector("#toolbar") as HTMLElement
    const navbar = document.querySelector("#navbar") as HTMLElement

    if (toolbar && navbar) {
      const w = window.innerWidth - toolbar.offsetWidth
      const h =
        window.innerHeight - navbar.offsetHeight + FRAME_CONTAINER_PADDING

      setBoxWidth(w)
      setBoxHeight(h)

      const wScale = w / width
      const hScale = h / height
      if (wScale < hScale) {
        dispatch(setScale({ scale: wScale }))
      } else {
        dispatch(setScale({ scale: hScale }))
      }
    }
  }

  useEffect(() => {
    setStageSize()
    window.addEventListener("resize", setStageSize)

    return () => {
      window.removeEventListener("resize", setStageSize)
    }
  }, [width, height])

  const setStageCoodrs = () => {
    let x = Math.min(stageRef?.current?.attrs.x || 0, 0)
    let y = Math.min(stageRef?.current?.attrs.y || 0, 0)

    const stageWidth = stageRef?.current?.attrs.width
    if (stageWidth <= boxWidth) {
      x = 0
    } else if (stageWidth + x < boxWidth) {
      x = boxWidth - stageWidth
    }

    const stageHeight = stageRef?.current?.attrs.height
    if (stageHeight <= boxHeight) {
      y = 0
    } else if (stageHeight + y < boxHeight) {
      y = boxHeight - stageHeight
    }

    stageRef?.current?.x(x)
    stageRef?.current?.y(y)
  }

  useEffect(() => {
    setStageCoodrs()
  }, [scale])

  const handleZoom = (e: KonvaEventObject<WheelEvent>) => {
    e.evt.preventDefault()

    let direction = e.evt.deltaY > 0 ? -1 : 1
    const scaleBy = 1.1
    const stage = stageRef?.current?.getStage()
    const pointer = stage?.getPointerPosition() // Get mouse pointer position
    // when we zoom on trackpad, e.evt.ctrlKey is true, in that case lets revert direction
    if (e.evt.ctrlKey) {
      direction = -direction
    }

    // dispatch(
    //   setScale({ scale: direction > 0 ? scale * scaleBy : scale / scaleBy })
    // )
    // setStageCoodrs()

    if (stage) {
      const oldScale = stage.scaleX()
      const newScale = direction > 0 ? oldScale * scaleBy : oldScale / scaleBy
      const mousePointTo = {
        x: (pointer?.x || 0 - stage.x()) / oldScale,
        y: (pointer?.y || 0 - stage.x()) / oldScale,
      }

      // const newPos = {
      //   x: pointer?.x || 0 - mousePointTo.x * newScale,
      //   y: pointer?.y || 0 - mousePointTo.y * newScale,
      // }

      dispatch(
        setScale({
          scale: direction > 0 ? scale * scaleBy : scale / scaleBy,
        })
      )
    }

    setStageCoodrs()
  }

  const handleDragMoveStage = (e: Konva.KonvaEventObject<DragEvent>) => {
    e.evt.preventDefault()
    e.evt.stopPropagation()

    if (isKeyPressed) {
      stageRef?.current?.startDrag()
    }

    setStageCoodrs()
  }

  return { boxWidth, boxHeight, handleZoom, handleDragMoveStage, setStageSize }
}

export default useStageResize
