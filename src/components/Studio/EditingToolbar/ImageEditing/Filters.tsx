import React, { useEffect, useState } from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu"

import {
  FilterName,
  RGB_FILTERS,
  type FilterValue,
  type StageImageData,
  type StageImageFilterValues,
} from "@/types/stage-object"
import { cn } from "@/lib/utils"
import useStageObject from "@/hooks/use-stage-object"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Icons } from "@/components/icons"

type Props = {
  imageId: string
  data: StageImageData
}

const ALTERABLE_FILTERS: FilterValue[] = [
  { name: FilterName.brighten, min: -1, max: 1, step: 0.05 },
  { name: FilterName.contrast },
]

const BOOLEAN_FILTERS: FilterValue[] = [
  { name: FilterName.invert },
  { name: FilterName.grayscale },
  { name: FilterName.rgb, min: 0, max: 256, step: 1 },
]

const ImageFilters = ({ imageId, data }: Props) => {
  const { filterValues, filterNames } = data
  const { updateOne } = useStageObject()
  const [filters, setFilters] = useState<FilterName[]>(filterNames)
  const [filterMap, setFilterMap] =
    useState<StageImageFilterValues>(filterValues)

  const getFilterByName = (name: FilterName | string) => {
    return filters.includes(name as FilterName)
  }

  const handleSliderChange = (value: number[], name: FilterName | string) => {
    if (!RGB_FILTERS.includes(name) && !getFilterByName(name)) {
      setFilters((curr) => [...curr, name as FilterName])
    }

    setFilterMap((map) => ({ ...map, [name.toLowerCase()]: value[0] }))
  }

  const handleSwitchChange = (filter: FilterName) => {
    if (getFilterByName(filter)) {
      const names =
        filter === FilterName.rgb ? [filter, ...RGB_FILTERS] : [filter]
      const newFilters = filters.filter((f) => !names.includes(f))
      setFilters(newFilters)
      return
    }
    setFilters((curr) => [...curr, filter])
  }

  useEffect(() => {
    updateOne({
      id: imageId,
      data: {
        filterNames: filters,
        filterValues: filterMap,
      },
    })
  }, [filters, filterMap])

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button aria-label="Sort products" size="sm">
            Filters
            <Icons.chevronDown className="ml-2 h-4 w-4" aria-hidden="true" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-48 p-6">
          {ALTERABLE_FILTERS.map((f, i) => (
            <div className="mb-4 flex space-x-4" key={i}>
              <h3 className="text-sm font-medium tracking-wide text-foreground">
                {f.name}
              </h3>
              <Slider
                id={f.name}
                aria-label="slider-ex-1"
                thickness="thin"
                defaultValue={[0]}
                min={f.min || -100}
                max={f.max || 100}
                step={f.step || 1}
                value={[
                  filterMap[f.name.toLowerCase() as keyof typeof filterMap]!,
                ]}
                onValueChange={(value: number[]) =>
                  handleSliderChange(value, f.name)
                }
              />
            </div>
          ))}
          {BOOLEAN_FILTERS.map((f, i) => (
            <div
              key={i}
              className={cn(
                "items-start space-y-4",
                i === BOOLEAN_FILTERS.length - 1 ? "mb-0" : "mb-4"
              )}
            >
              <div className="flex space-x-4">
                <h3 className="text-sm font-medium tracking-wide text-foreground">
                  {f.name}
                </h3>
                <Switch
                  checked={getFilterByName(f.name)}
                  onCheckedChange={() => handleSwitchChange(f.name)}
                />
              </div>
              {f.name === FilterName.rgb && getFilterByName(f.name) && (
                <>
                  {RGB_FILTERS.map((rgbName) => (
                    <React.Fragment key={rgbName}>
                      <h3 className="text-sm font-medium tracking-wide text-foreground">
                        {rgbName}
                      </h3>
                      <Slider
                        id={rgbName}
                        aria-label="slider-ex-1"
                        min={f.min || -100}
                        max={f.max || 100}
                        step={f.step || 1}
                        value={[
                          filterMap[
                            rgbName.toLowerCase() as keyof typeof filterMap
                          ]!,
                        ]}
                        onValueChange={(value: number[]) =>
                          handleSliderChange(value, rgbName)
                        }
                      />
                    </React.Fragment>
                  ))}
                </>
              )}
            </div>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default ImageFilters
