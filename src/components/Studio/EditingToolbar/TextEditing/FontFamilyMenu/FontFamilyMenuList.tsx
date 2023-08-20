import { memo } from "react"

import { type GoogleFont } from "@/types/google-font-type"
import { ScrollArea } from "@/components/ui/scroll-area"

import FontFamilyMenuItem from "./FontFamilyMenuItem"

type Props = {
  fontList: GoogleFont[]
  isLoaded: boolean
  handleMenuItemClick: (font: GoogleFont) => void
}

const FontFamilyMenuList = memo(function FontFamilyMenuList({
  fontList,
  isLoaded,
  handleMenuItemClick,
}: Props) {
  return (
    <ScrollArea className="h-96">
      <div className="space-y-4">
        {isLoaded
          ? fontList.map((font, index) => (
              <FontFamilyMenuItem
                key={index}
                font={font}
                onClick={() => handleMenuItemClick(font)}
              />
            ))
          : "Loading..."}
      </div>
    </ScrollArea>
  )
})

export default FontFamilyMenuList
