/* eslint-disable @typescript-eslint/no-unsafe-call */
import { type RefObject } from "react"
import type Konva from "konva"
import { useHotkeys } from "react-hotkeys-hook"

import { KeyType } from "@/config/keys"

import useHotkeysFunctions from "./use-hotkeys-functions"

type Props = {
  imageTransformer?: RefObject<Konva.Transformer>
  textTransformer?: RefObject<Konva.Transformer>
  multiTransformer?: RefObject<Konva.Transformer>
}

const useHotkeySetup = ({ ...transformers }: Props) => {
  const {
    onDeleteKey,
    onUnselectKey,
    onCopyKey,
    onPasteKey,
    onCutKey,
    onDuplicateKey,
    onZIndexUpKey,
    onZIndexDownKey,
  } = useHotkeysFunctions(transformers)

  useHotkeys(KeyType.DELETE, () => onDeleteKey())
  useHotkeys(KeyType.UNSELECT, () => onUnselectKey())
  useHotkeys(KeyType.COPY, () => onCopyKey())
  useHotkeys(KeyType.PASTE, () => onPasteKey())
  useHotkeys(KeyType.CUT, () => onCutKey())
  useHotkeys(KeyType.DUPLICATE, () => onDuplicateKey())
  useHotkeys(KeyType.Z_INDEX_UP, () => onZIndexUpKey())
  useHotkeys(KeyType.Z_INDEX_DOWN, () => onZIndexDownKey())
}

export default useHotkeySetup
