import useStageObject from "@/hooks/use-stage-object"
import { Input } from "@/components/ui/input"

type Props = {
  id: string
  fontSize: number
}

const minVal = 1
const maxVal = 800

const FontSizeInput = ({ id, fontSize }: Props) => {
  const { updateOne } = useStageObject()

  const handleFontSizeChange = (
    valueAsString: string,
    valueAsNumber: number
  ) => {
    const regex = /^\d{1,3}$/

    if (
      regex.test(valueAsString) &&
      valueAsNumber >= minVal &&
      valueAsNumber <= maxVal
    ) {
      updateOne({ id, data: { fontSize: valueAsNumber } })
    }
  }

  return (
    <Input
      type="number"
      inputMode="numeric"
      min={minVal}
      max={maxVal}
      value={fontSize}
      onChange={(e) =>
        handleFontSizeChange(e.target.value, parseInt(e.target.value))
      }
    />
  )
}

export default FontSizeInput
