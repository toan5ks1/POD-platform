"use client"

import { KeysWithDescription, type KeyWithDescriptionType } from "@/config/keys"

const HotkeyItem = ({ hotkey }: { hotkey: KeyWithDescriptionType }) => {
  console.log("keyhot")
  const keyValue = hotkey.key[0] === " " ? "Space" : hotkey.key[0]
  const key = (
    <span>
      <kbd>{keyValue}</kbd>
      {hotkey.key[1] && (
        <span>
          + <span>{hotkey.key[1]}</span>
        </span>
      )}
    </span>
  )

  return (
    <div className="space-y-2">
      {key}
      <p>{hotkey.description}</p>
    </div>
  )
}

const HotkeysList = () => {
  const keys = KeysWithDescription.map((hotkey) => ({
    ...hotkey,
    key: (hotkey.key as string).split("+"),
  }))

  return (
    <div className="space-y-4">
      {keys.map((key, i) => (
        <HotkeyItem key={i} hotkey={key} />
      ))}
    </div>
  )
}

export default HotkeysList
