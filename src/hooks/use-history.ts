/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { useCallback, useState } from "react"

import { type StageObject } from "@/types/stage-object"

import useStageObject from "./use-stage-object"

const useHistory = () => {
  const { replaceAll } = useStageObject()

  const [past, setPast] = useState<StageObject[][]>([])
  const [future, setFuture] = useState<StageObject[][]>([])
  const [position, setPosition] = useState<StageObject[] | null>(null)

  const goBack = useCallback(() => {
    if (past.length <= 0 || !position) {
      return
    }

    const pastPosition = past.length - 1
    const newFuture = [...position]
    const newPosition = [...past[pastPosition]!]

    setPast((prev) => [...prev.slice(0, pastPosition)])
    setFuture((prev) => [...prev, newFuture])

    setPosition(newPosition)
    replaceAll(newPosition)
  }, [past, position, replaceAll])

  const goForward = useCallback(() => {
    if (future.length <= 0 || !position) {
      return
    }

    const newPast = [...position]
    const futurePosition = future.length - 1
    const newPosition = [...future[futurePosition]!]

    setFuture((prev) => [...prev.slice(0, futurePosition)])
    setPast((prev) => [...prev, newPast])

    setPosition(newPosition)
    replaceAll(newPosition)
  }, [future, position, replaceAll])

  const savePast = useCallback(
    (newPosition: StageObject[]) => {
      if (
        !newPosition ||
        JSON.stringify(newPosition) === JSON.stringify(position)
      ) {
        return
      }

      setPosition(newPosition)
      if (position !== null) {
        setPast((prev) => [...prev, position])
        setFuture([])
      }
    },
    [position]
  )

  return { savePast, goBack, goForward }
}

export default useHistory
