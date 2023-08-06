/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useLayoutEffect, useRef, useState } from "react"

import useStageObject from "./use-stage-object"

type StatusType = "loading" | "loaded" | "failed"

const useImage = (url: string, id: string) => {
  const [, setStateToken] = useState(0)
  const [status, setStatus] = useState<StatusType>("loading")
  const imageRef = useRef() as any
  const { removeOne } = useStageObject()

  useLayoutEffect(() => {
    if (!url) return
    const img = document.createElement("img")

    img.addEventListener("load", () => {
      setStatus("loaded")
      imageRef.current = img
      setStateToken(Math.random())
    })

    img.addEventListener("error", () => {
      setStatus("failed")
      imageRef.current = undefined
      setStateToken(Math.random())
      removeOne(id)
    })

    img.crossOrigin = "anonymous"
    img.src = url
  }, [id, removeOne, url])

  return [imageRef.current, status]
}

export default useImage
