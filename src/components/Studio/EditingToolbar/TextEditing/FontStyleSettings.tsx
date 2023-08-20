import { type StageTextData } from "@/types/stage-object"
import useStageObject from "@/hooks/use-stage-object"
import { Button } from "@/components/ui/button"
import { Tooltip } from "@/components/ui/tooltip"
import { TooltipContainer } from "@/components/shells/tooltip-shell"

type Props = {
  id: string
  fontVariants: StageTextData["fontVariants"]
  webFont: StageTextData["webFont"]
  fontStyle: StageTextData["fontStyle"]
}

const FontStyleSettings = ({ id, fontVariants, webFont, fontStyle }: Props) => {
  const { updateOne } = useStageObject()

  const isBoldAvailable = !fontVariants.includes("700") && webFont
  const isItalicAvailable = !fontVariants.includes("italic") && webFont

  const isBoldActive = fontStyle.includes("bold")
  const isItalicActive = fontStyle.includes("italic")

  const handleBoldClick = () => {
    updateOne({ id, data: { fontStyle: toggleBold(fontStyle) } })
  }

  const handleItalicClick = () => {
    updateOne({ id, data: { fontStyle: toggleItalic(fontStyle) } })
  }

  const toggleBold = (fontStyle: StageTextData["fontStyle"]) => {
    switch (fontStyle) {
      case "normal":
        return "bold"
      case "italic":
        return "italic bold"
      case "bold":
        return "normal"
      case "italic bold":
        return "italic"
      default:
        break
    }
  }

  const toggleItalic = (fontStyle: StageTextData["fontStyle"]) => {
    switch (fontStyle) {
      case "normal":
        return "italic"
      case "italic":
        return "normal"
      case "bold":
        return "italic bold"
      case "italic bold":
        return "bold"
      default:
        break
    }
  }

  // !! set icon for bold and italic instead of B and I

  return (
    <>
      <TooltipContainer tooltip="Bold">
        <Button
          disabled={isBoldAvailable}
          className="text-xl font-bold"
          onClick={handleBoldClick}
        >
          B
        </Button>
      </TooltipContainer>
      <TooltipContainer tooltip="Italics">
        <Button
          disabled={isItalicAvailable}
          className="text-xl italic"
          onClick={handleItalicClick}
        >
          I
        </Button>
      </TooltipContainer>
    </>
  )
}

export default FontStyleSettings
