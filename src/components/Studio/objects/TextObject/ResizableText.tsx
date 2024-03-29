import { useRef } from "react"
import type Konva from "konva"
import { type KonvaEventObject } from "konva/lib/Node"
import { Text } from "react-konva"

import { type StageTextObjectData } from "@/types/stage-object"
import useDragHandlers from "@/hooks/use-drag-handlers"

import useFontFaceObserver from "./use-font-face-observer"

type TProps = {
  shapeProps: StageTextObjectData
  onDoubleClick: (e: KonvaEventObject<MouseEvent>) => void
  onSelect: (e: Konva.KonvaEventObject<MouseEvent>) => void
}

const ResizableText = ({ shapeProps, onDoubleClick, onSelect }: TProps) => {
  const { id, data } = shapeProps
  const isFontLoaded = useFontFaceObserver([{ family: data.fontFamily }])
  const { onDragStart, onDragEnd } = useDragHandlers()

  const textRef = useRef<Konva.Text | null>(null)

  const handleResize = () => {
    if (textRef.current !== null) {
      const textNode = textRef.current
      const newWidth = textNode.width() * textNode.scaleX()
      textNode.setAttrs({
        width: newWidth,
        scaleX: 1,
        scaleY: 1,
      })
    }
  }

  return (
    <Text
      id={id}
      ref={textRef}
      x={data.x}
      y={data.y}
      draggable={data.draggable}
      width={data.width}
      text={data.text}
      fontFamily={isFontLoaded ? data.fontFamily : "sans-serif"}
      fill={data.fill}
      fontSize={data.fontSize}
      lineHeight={data.lineHeight}
      letterSpacing={data.letterSpacing}
      fontStyle={data.fontStyle}
      align={data.align}
      rotation={data.rotation}
      textDecoration={data.textDecoration}
      type={data.type}
      z_index={data.z_index}
      updatedAt={data.updatedAt}
      perfectDrawEnabled={true}
      onTransform={handleResize}
      onClick={onSelect}
      onTap={onSelect}
      onDragStart={onDragStart}
      onDragEnd={(e) => onDragEnd(e, { id, data })}
      onDblClick={onDoubleClick}
      onDblTap={onDoubleClick}
    />
  )
}

export default ResizableText
