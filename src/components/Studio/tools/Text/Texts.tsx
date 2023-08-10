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

const defaultTextStylesButtons: Partial<StageTextData>[] = [
  {
    text: "Add a heading",
    fontSize: 68,
    width: 600,
    fontStyle: "bold",
  },
  {
    text: "Add a subheading",
    fontSize: 44,
    width: 400,
    fontStyle: "bold",
  },
  {
    text: "Add a little bit of body text",
    fontSize: 30,
    width: 400,
    fontStyle: "normal",
  },
]

const Texts = () => {
  const { createOne } = useStageObject()
  const [query, setQuery] = useState<string>(" ")
  const [selectedFonts, setSelectedFonts] = useState<GoogleFont[]>([])
  const { fontList, isLoaded } = useGetFontListQuery()

  useEffect(() => {
    if (!isLoaded) return

    const fonts = fontList
      .filter((font) =>
        font.family.toLowerCase().startsWith(query.toLowerCase())
      )
      .slice(0, 15)
    const fontFamilies = fonts.map((font: any) => font.family)

    if (fonts.length) {
      void loadGoogleFontsDefaultVariants(fontFamilies)
      //setSelectedFonts(fonts)
    }
  }, [query, isLoaded, fontList])

  const addTextToStage = (options: Partial<StageTextData> = {}) => {
    createOne({
      ...DEFAULT_TEXT_OBJECT,
      ...options,
    })
  }

  return (
    <div className="relative flex h-full flex-col overflow-y-auto p-4">
      {selectedFonts.length && query.trim() ? (
        <div className="mt-4 w-full space-y-4">
          {selectedFonts.map((font: any) => (
            <Button
              key={font.family}
              className="w-full"
              onClick={() =>
                addTextToStage({
                  text: font.family,
                  fontFamily: font.family,
                  fontVariants: font.variants, // set variants that available to load from Google Fonts
                  webFont: true,
                  fontSize: 50,
                  fontStyle: "normal",
                })
              }
            >
              {font.family}
            </Button>
          ))}
        </div>
      ) : (
        <div className="mt-4 w-full space-y-4">
          <Button className="w-full" onClick={() => addTextToStage()}>
            Add a text box
          </Button>
          {defaultTextStylesButtons.map((data, i) => (
            <Button
              key={i}
              className="w-full"
              onClick={() => addTextToStage(data)}
            >
              {data.text}
            </Button>
          ))}
        </div>
      )}
    </div>
  )
}

export default Texts
