// import { Button, TooltipContainer } from "@chakra-ui/react"

import { type StageTextData } from "@/types/stage-object"
import useStageObject from "@/hooks/use-stage-object"
import { Button } from "@/components/ui/button"
import { TooltipContainer } from "@/components/shells/tooltip-shell"

type Props = {
  id: string
  textDecoration: StageTextData["textDecoration"]
}

const TextDecorationSettings = ({ id, textDecoration }: Props) => {
  const { updateOne } = useStageObject()

  const isUnderlineActive = textDecoration.includes("underline")
  const isLineThroughActive = textDecoration.includes("line-through")

  const handleUnderlineClick = () => {
    updateOne({ id, data: { textDecoration: toggleUnderline(textDecoration) } })
  }

  const handleLineThroughClick = () => {
    updateOne({
      id,
      data: { textDecoration: toggleLineThrough(textDecoration) },
    })
  }

  const toggleUnderline = (textDecoration: StageTextData["textDecoration"]) => {
    switch (textDecoration) {
      case "":
        return "underline"
      case "underline":
        return ""
      case "line-through":
        return "underline line-through"
      case "underline line-through":
        return "line-through"
      default:
        break
    }
  }

  const toggleLineThrough = (
    textDecoration: StageTextData["textDecoration"]
  ) => {
    switch (textDecoration) {
      case "":
        return "line-through"
      case "underline":
        return "underline line-through"
      case "line-through":
        return ""
      case "underline line-through":
        return "underline"
      default:
        break
    }
  }

  return (
    <>
      <TooltipContainer tooltip="Underline">
        <Button
          disabled={!isUnderlineActive}
          className="text-xl underline"
          onClick={handleUnderlineClick}
        >
          U
        </Button>
      </TooltipContainer>
      <TooltipContainer tooltip="Line-through">
        <Button
          disabled={!isLineThroughActive}
          className="text-xl line-through"
          onClick={handleLineThroughClick}
        >
          S
        </Button>
      </TooltipContainer>
    </>
  )
}

export default TextDecorationSettings
