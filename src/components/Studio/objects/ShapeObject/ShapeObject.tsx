/* eslint-disable @typescript-eslint/no-explicit-any */
import Konva from "konva"
import { Arrow, Circle, Rect, RegularPolygon, Star } from "react-konva"

import { ShapeType } from "@/types/shape-type"
import { type StageObject, type StageObjectData } from "@/types/stage-object"
import useDragHandlers from "@/hooks/use-drag-handlers"

export type RegularPolygonData = {
  sides: number
  radius: number
} & StageObjectData &
  Record<string, any>

export type StarData = {
  numPoints: number
  innerRadius: number
  outerRadius: number
} & StageObjectData &
  Record<string, any>

export type ArrowData = {
  points: number[]
} & StageObjectData &
  Record<string, any>

type Props = {
  obj: StageObject
  onSelect: (e: Konva.KonvaEventObject<MouseEvent>) => void
}

const ShapeObject = ({ obj, onSelect }: Props) => {
  const { id, data } = obj

  const { onDragStart, onDragEnd } = useDragHandlers()

  switch (data.shapeType) {
    case ShapeType.RECT:
      return (
        <Rect
          id={id}
          onClick={onSelect}
          onDragStart={onDragStart}
          onDragEnd={(e) => onDragEnd(e, obj)}
          {...data}
        />
      )
    case ShapeType.CIRCLE:
      return (
        <Circle
          id={id}
          onClick={onSelect}
          onDragStart={onDragStart}
          onDragEnd={(e) => onDragEnd(e, obj)}
          {...data}
        />
      )
    case ShapeType.POLYGON:
      return (
        <RegularPolygon
          id={id}
          onClick={onSelect}
          onDragStart={onDragStart}
          onDragEnd={(e) => onDragEnd(e, obj)}
          {...(data as RegularPolygonData)}
        />
      )
    case ShapeType.STAR:
      return (
        <Star
          id={id}
          onClick={onSelect}
          onDragStart={onDragStart}
          onDragEnd={(e) => onDragEnd(e, obj)}
          {...(data as StarData)}
        />
      )
    case ShapeType.ARROW:
      return (
        <Arrow
          id={id}
          onClick={onSelect}
          onDragStart={onDragStart}
          onDragEnd={(e) => onDragEnd(e, obj)}
          {...(data as ArrowData)}
        />
      )
  }

  return null
}

export default ShapeObject
