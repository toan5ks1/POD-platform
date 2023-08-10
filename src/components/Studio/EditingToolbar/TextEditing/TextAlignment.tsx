import { type StageTextData } from "@/types/stage-object"
import useStageObject from "@/hooks/use-stage-object"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { TooltipContainer } from "@/components/shells/tooltip-shell"

type Props = {
  id: string
  textAlign: StageTextData["align"]
}

const TextAlignment = ({ id, textAlign }: Props) => {
  const { updateOne } = useStageObject()

  const handleAlignmentClick = () => {
    updateOne({ id, data: { align: toggleAlignment(textAlign) } })
  }

  const toggleAlignment = (textAlign: StageTextData["align"]) => {
    switch (textAlign) {
      case "left":
        return "center"
      case "center":
        return "right"
      case "right":
        return "justify"
      case "justify":
        return "left"
      default:
        break
    }
  }

  const getAlignmentIcon = (textAlign: StageTextData["align"]) => {
    switch (textAlign) {
      case "center":
        return <Icons.center className="ml-2 h-4 w-4" aria-hidden="true" />
      case "left":
        return <Icons.left className="ml-2 h-4 w-4" aria-hidden="true" />
      case "right":
        return <Icons.right className="ml-2 h-4 w-4" aria-hidden="true" />
      case "justify":
        return <Icons.justify className="ml-2 h-4 w-4" aria-hidden="true" />
      default:
        break
    }
  }

  return (
    <TooltipContainer tooltip="Alignment" side="bottom">
      <Button
        aria-label="Alignment"
        variant="outline"
        size="icon"
        className="relative"
        onClick={handleAlignmentClick}
      >
        {getAlignmentIcon(textAlign)}
      </Button>
    </TooltipContainer>
  )
}

export default TextAlignment
