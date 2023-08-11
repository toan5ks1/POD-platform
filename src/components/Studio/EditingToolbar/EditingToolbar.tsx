"use client"

/* eslint-disable tailwindcss/no-custom-classname */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useEffect } from "react"
import { stageObjectSelector } from "@/store/slices/stage-object-slice"
import { useHotkeys } from "react-hotkeys-hook"

import { StageObjectType } from "@/types/stage-object"
import { EDITING_TOOLBAR_HEIGHT } from "@/config/components"
import { KeyType } from "@/config/keys"
import { useAppSelector } from "@/hooks/use-app-selector"
import useHistory from "@/hooks/use-history"
import useStageResize from "@/hooks/use-stage-resize"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { TooltipContainer } from "@/components/shells/tooltip-shell"

import CanvasContentSave from "../canvas-actions/CanvasContentSave"
import ImageEditing from "./ImageEditing/ImageEditing"
import TextEditing from "./TextEditing/TextEditing"

const EditingToolbar = () => {
  const stageObjects = useAppSelector(stageObjectSelector.selectAll)
  const { selected } = useAppSelector((state) => state.selected)
  const { isLoggedIn } = useAppSelector((state) => state.auth)

  const { savePast, goBack, goForward } = useHistory()

  const { setStageSize } = useStageResize({})

  useHotkeys(KeyType.UNDO, (e: { preventDefault: () => void }) => {
    e.preventDefault()
    goBack()
  })

  useHotkeys(KeyType.REDO, (e: { preventDefault: () => void }) => {
    e.preventDefault()
    goForward()
  })

  useEffect(() => {
    savePast(stageObjects)
  }, [savePast, stageObjects])

  const getSelectedObject = () => {
    if (selected.length === 1 && stageObjects) {
      return stageObjects.find((obj) => obj.id === selected[0])
    }
    return null
  }

  const selectedObject = getSelectedObject()

  const renderEditing = () => {
    switch (selectedObject?.data.type) {
      case StageObjectType.IMAGE:
        return <ImageEditing selectedObject={selectedObject} />
      case StageObjectType.TEXT:
        return <TextEditing selectedObject={selectedObject} />
      default:
        return null
    }
  }

  return (
    <div
      className={`h-${EDITING_TOOLBAR_HEIGHT} flex space-x-2`}
      id="editing_toolbar"
    >
      <TooltipContainer tooltip="Undo Ctrl + Z">
        <Button
          aria-label="Undo"
          variant="outline"
          size="icon"
          className="relative"
          onClick={() => goBack()}
        >
          <Icons.undo className="mr-2 h-3.5 w-3.5" aria-hidden="true" />
        </Button>
      </TooltipContainer>

      <TooltipContainer tooltip="Redo Ctrl + Y">
        <Button
          aria-label="Redo"
          variant="outline"
          size="icon"
          className="relative"
          onClick={() => goForward()}
        >
          <Icons.redo className="mr-2 h-3.5 w-3.5" aria-hidden="true" />
        </Button>
      </TooltipContainer>

      <TooltipContainer tooltip="Reset zoom">
        <Button
          aria-label="Reset zoom"
          variant="outline"
          size="icon"
          className="relative"
          onClick={() => setStageSize()}
        >
          <Icons.reload className="mr-2 h-3.5 w-3.5" aria-hidden="true" />
        </Button>
      </TooltipContainer>
      {renderEditing()}
      {isLoggedIn && (
        <>
          {/* <Spacer /> */}
          <CanvasContentSave />
        </>
      )}
    </div>
  )
}

export default EditingToolbar
