/* eslint-disable @typescript-eslint/no-unsafe-enum-comparison */
import { useEffect, useState } from "react"

import { type KeyType } from "@/config/keys"

const useKeyPress = (targetKey: KeyType) => {
  const [isKeyPressed, setIsKeyPressed] = useState(false)

  const downHandler = ({ key }: { key: string }) => {
    if (targetKey === key) {
      setIsKeyPressed(true)
    }
  }

  const upHandler = ({ key }: { key: string }) => {
    if (targetKey === key) {
      setIsKeyPressed(false)
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", downHandler)
    window.addEventListener("keyup", upHandler)

    return () => {
      window.removeEventListener("keydown", downHandler)
      window.removeEventListener("keyup", upHandler)
    }
  }, [])

  return isKeyPressed
}

export default useKeyPress
