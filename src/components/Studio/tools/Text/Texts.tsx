"use client"

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { useEffect, useState } from "react"
import { loadGoogleFontsDefaultVariants } from "@/utils/load-google-fonts-default-variants"

import { type GoogleFont } from "@/types/google-font-type"
import { type StageTextData } from "@/types/stage-object"
import { DEFAULT_TEXT_OBJECT } from "@/config/stage-object"
import useGetFontListQuery from "@/hooks/use-get-font-list-query"
import useStageObject from "@/hooks/use-stage-object"
import { Button } from "@/components/ui/button"

const Texts = () => {
  const { createOne } = useStageObject()
  // const [selectedFonts, setSelectedFonts] = useState<GoogleFont[]>([])
  // const { fontList, isLoaded } = useGetFontListQuery()

  // useEffect(() => {
  //   // if (!isLoaded) return

  //   const fonts = fontList
  //   const fontFamilies = fonts.map((font: any) => font.family)

  //   if (fonts.length) {
  //     loadGoogleFontsDefaultVariants(fontFamilies)
  //     setSelectedFonts(fonts)
  //   }
  // }, [])

  const addTextToStage = (options: Partial<StageTextData> = {}) => {
    createOne({
      ...DEFAULT_TEXT_OBJECT,
      ...options,
    })
  }

  return (
    <div className="flex h-full flex-col overflow-y-auto">
      <div className="w-full space-y-4">
        <Button onClick={() => addTextToStage()} className="w-full">
          Add a text box
        </Button>
      </div>
    </div>
  )
}
// onClick={() => addTextToStage()}
export default Texts
