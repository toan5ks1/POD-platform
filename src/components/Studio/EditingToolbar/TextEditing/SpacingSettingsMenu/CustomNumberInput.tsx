import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"

type Props = {
  min: number
  max: number
  value: number
  step: number
  pattern?: RegExp
  mark?: number
  label: string
  onChange: (val: number) => void
}

const CustomNumberInput = ({
  min,
  max,
  step,
  value,
  pattern = /^\d$/,
  label,
  onChange,
}: Props) => {
  const handleInputChange = (valueAsString: string) => {
    const parsedValue = parseInt(valueAsString, 10)
    if (
      pattern.test(valueAsString) &&
      parsedValue >= min &&
      parsedValue <= max
    ) {
      onChange(parsedValue)
    }
  }

  return (
    <div className="space-y-4 pb-10">
      <div className="flex w-full justify-between">
        <span className="text-sm font-medium tracking-wide text-foreground">
          {label}
        </span>
        <Input
          type="number"
          inputMode="numeric"
          min={min}
          max={max}
          value={value}
          onChange={(e) => handleInputChange(e.target.value)}
        />
      </div>
      <Slider
        thickness="thin"
        defaultValue={[0]}
        min={min}
        max={max}
        step={step}
        value={[value]}
        onValueChange={(value: number[]) => onChange(value[0]!)}
      />
    </div>
  )
}

export default CustomNumberInput
