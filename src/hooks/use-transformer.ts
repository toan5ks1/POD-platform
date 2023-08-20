/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useRef, type RefObject } from "react"
import type Konva from "konva"

import { useAppSelector } from "./use-app-selector"
import useStageObject from "./use-stage-object"

type Props = {
  stageRef: React.RefObject<Konva.Stage> | null
}

const useTransformer = ({ stageRef }: Props) => {
  const { updateOne } = useStageObject()
  const transformer = useRef() as RefObject<Konva.Transformer>
  const { selected } = useAppSelector((state) => state.selected)

  const onTransformerEnd = () => {
    const selectedNodes = stageRef?.current?.find((node: Konva.Node) => {
      return selected.includes(node.attrs.id)
    })

    if (selectedNodes) {
      selectedNodes.forEach((node: Konva.Node) => {
        const id = node.attrs.id
        const data = node.attrs
        updateOne({ id, data })
      })
    }

    transformer.current?.getStage()?.batchDraw()
  }

  return { transformer, onTransformerEnd }
}

export default useTransformer
