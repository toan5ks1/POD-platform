/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { type StageObject } from "@/types/stage-object"

import FontFamilyMenu from "./FontFamilyMenu/FontFamilyMenu"
import FontSizeInput from "./FontSizeInput"
import FontStyleSettings from "./FontStyleSettings"
import SpacingSettingsMenu from "./SpacingSettingsMenu/SpacingSettingsMenu"
import TextAlignment from "./TextAlignment"
import TextColorPicker from "./TextColorPicker"
import TextDecorationSettings from "./TextDecorationSettings"

type Props = {
  selectedObject: StageObject
}

const TextEditing = ({ selectedObject }: Props) => {
  return (
    <>
      <FontFamilyMenu
        id={selectedObject.id}
        fontFamily={selectedObject.data.fontFamily}
      />
      <FontSizeInput
        id={selectedObject.id}
        fontSize={selectedObject.data.fontSize}
      />
      <TextColorPicker
        id={selectedObject.id}
        selectedObject={selectedObject.data}
      />
      <FontStyleSettings
        id={selectedObject.id}
        fontVariants={selectedObject.data.fontVariants}
        fontStyle={selectedObject.data.fontStyle}
        webFont={selectedObject.data.webFont}
      />
      <TextDecorationSettings
        id={selectedObject.id}
        textDecoration={selectedObject.data.textDecoration}
      />
      <TextAlignment
        id={selectedObject.id}
        textAlign={selectedObject.data.align}
      />
      <SpacingSettingsMenu
        id={selectedObject.id}
        letterSpacing={selectedObject.data.letterSpacing}
        lineHeight={selectedObject.data.lineHeight}
      />
    </>
  )
}

export default TextEditing
