import { FONT_VARIANTS_TO_LOAD } from "@/config/fonts"

import { loadGoogleFonts } from "./load-google-fonts"

export const loadGoogleFontsDefaultVariants = (fonts: string[]) => {
  const obj: Record<string, string[]> = {}
  fonts.forEach((fontFamily) => (obj[fontFamily] = FONT_VARIANTS_TO_LOAD))
  loadGoogleFonts(obj)
}
