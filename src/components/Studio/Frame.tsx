"use client"

/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import React, { useEffect, useRef, useState } from "react"
import { loadGoogleFontsDefaultVariants } from "@/utils/load-google-fonts-default-variants"
import type Konva from "konva"
import { type KonvaEventObject } from "konva/lib/Node"
import { Image as KonvaImage, Layer, Stage, Transformer } from "react-konva"

import {
  StageObjectType,
  type StageObject,
  type StageTextObjectData,
} from "@/types/stage-object"
import { DEFAULT_IMAGE_OBJECT } from "@/config/stage-object"
import { useAppSelector } from "@/hooks/use-app-selector"
import useHotkeySetup from "@/hooks/use-hotkey-setup"
import useKonvaImage from "@/hooks/use-konva-image"
import useObjectSelect from "@/hooks/use-object-select"
import useStageObject from "@/hooks/use-stage-object"
import useStageResize from "@/hooks/use-stage-resize"
import useTransformer from "@/hooks/use-transformer"

import ImageObject from "./objects/ImageObject/ImageObject"
import ShapeObject from "./objects/ShapeObject/ShapeObject"
import TextObject from "./objects/TextObject/TextObject"

type IProps = {
  stageRef: React.RefObject<Konva.Stage> | null
  initialImage: string
}

const Frame = ({ stageRef, initialImage }: IProps) => {
  const { stageObjects, resetAll, replaceAll } = useStageObject()

  const {
    transformer: imageTransformer,
    onTransformerEnd: onImageTransformerEnd,
  } = useTransformer({ stageRef })
  const {
    transformer: textTransformer,
    onTransformerEnd: onTextTransformerEnd,
  } = useTransformer({ stageRef })
  const {
    transformer: multiTransformer,
    onTransformerEnd: onMultiTransformerEnd,
  } = useTransformer({ stageRef })

  const transformers = { imageTransformer, textTransformer, multiTransformer }

  const { onObjectSelect, resetObjectSelect } = useObjectSelect(transformers)

  useHotkeySetup(transformers)

  const { width, height, scale, stage } = useAppSelector((state) => state.frame)
  const { boxWidth, boxHeight, handleZoom, handleDragMoveStage } =
    useStageResize({ stageRef })

  const [konvaImage, setKonvaImage] = useState<HTMLImageElement | undefined>(
    undefined
  )

  useKonvaImage({
    initialImage,
    onLoad: (imgElement) => {
      setKonvaImage(imgElement)
    },
  })

  useEffect(() => {
    const fontsToLoad = stageObjects
      .filter(
        (obj) => obj.data.type === StageObjectType.TEXT && obj.data.webFont
      )
      .map((obj) => obj.data.fontFamily)

    if (fontsToLoad.length) void loadGoogleFontsDefaultVariants(fontsToLoad)

    resetObjectSelect()
  }, [])

  useEffect(() => {
    const content = stage.content
    resetObjectSelect()
    if (JSON.stringify(content) === JSON.stringify(stageObjects)) {
      return
    }
    if (
      content === null ||
      content === undefined ||
      content === '""' ||
      !content.length
    ) {
      resetAll()
      return
    }

    replaceAll(content as StageObject[])
  }, [stage.id, stage.content])

  const checkDeselect = (
    e: KonvaEventObject<MouseEvent> | KonvaEventObject<TouchEvent>
  ) => {
    const clickedOnEmpty = e.target === e.target.getStage()
    if (clickedOnEmpty) {
      resetObjectSelect()
    }
  }

  const sortStageObject = () => {
    return stageObjects.sort((obj1, obj2) => {
      if (obj1.data.z_index === obj2.data.z_index) {
        if (obj1.data.z_index < 0) {
          return obj2.data.updatedAt - obj1.data.updatedAt
        }
        return obj1.data.updatedAt - obj2.data.updatedAt
      }
      return obj1.data.z_index - obj2.data.z_index
    })
  }

  const renderStageObject = (obj: StageObject) => {
    const data = obj.data
    switch (data.type) {
      case StageObjectType.IMAGE:
        return <ImageObject onSelect={onObjectSelect} obj={obj} />
      case StageObjectType.TEXT:
        return (
          <TextObject
            onSelect={onObjectSelect}
            shapeProps={obj as StageTextObjectData}
          />
        )
      case StageObjectType.SHAPE:
        return <ShapeObject onSelect={onObjectSelect} obj={obj} />
      default:
        return null
    }
  }

  return (
    <div className="h-full overflow-hidden">
      <Stage
        width={width * scale}
        height={height * scale}
        style={{ backgroundColor: "black" }}
        scaleX={scale}
        scaleY={scale}
        draggable={true}
        ref={stageRef}
        onMouseDown={checkDeselect}
        onTouchStart={checkDeselect}
        onWheel={handleZoom}
        onDragMove={handleDragMoveStage}
      >
        <Layer>
          <KonvaImage
            image={konvaImage}
            width={width}
            height={height}
            // x={100}
            y={100}
          />
          {sortStageObject().map((obj) => (
            <React.Fragment key={obj.id}>
              {renderStageObject(obj)}
            </React.Fragment>
          ))}
          <Transformer
            ref={imageTransformer}
            onTransformEnd={onImageTransformerEnd}
            ignoreStroke={true}
          />
          <Transformer
            ref={textTransformer}
            onTransformEnd={onTextTransformerEnd}
            rotationSnaps={[0, 90, 180, 270]}
            rotateEnabled={true}
            enabledAnchors={["middle-left", "middle-right"]}
            boundBoxFunc={(_oldBox, newBox) => {
              newBox.width = Math.max(30, newBox.width)
              return newBox
            }}
          />
          <Transformer
            ref={multiTransformer}
            onTransformEnd={onMultiTransformerEnd}
            enabledAnchors={[
              "top-left",
              "top-right",
              "bottom-left",
              "bottom-right",
            ]}
            boundBoxFunc={(_oldBox, newBox) => {
              newBox.width = Math.max(30, newBox.width)
              return newBox
            }}
            ignoreStroke={true}
          />
        </Layer>
      </Stage>
    </div>
  )
}

export default Frame
