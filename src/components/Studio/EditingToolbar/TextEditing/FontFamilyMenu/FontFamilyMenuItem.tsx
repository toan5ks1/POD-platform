import { loadGoogleFontsDefaultVariants } from "@/utils/load-google-fonts-default-variants"
import { InView } from "react-intersection-observer"

import { type GoogleFont } from "@/types/google-font-type"

type Props = {
  font: GoogleFont
  onClick: () => void
}

const FontFamilyMenuItem = ({ font, onClick }: Props) => {
  return (
    <InView
      as="option"
      rootMargin="50px"
      value={font.family}
      className="px-4 py-2 duration-100 hover:cursor-pointer hover:bg-gray-200"
      triggerOnce={true}
      onClick={onClick}
      onChange={(inView) => {
        if (inView) {
          void loadGoogleFontsDefaultVariants([font.family])
        }
      }}
    >
      {font.family}
    </InView>
  )
}

export default FontFamilyMenuItem
