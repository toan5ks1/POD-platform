/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useCallback, useEffect, useState } from "react"
import { useUpdateCanvasMutation } from "@/store/api/canvas-slice"

// import { useToast } from "@chakra-ui/react"

import { useAppSelector } from "./use-app-selector"
import useStageObject from "./use-stage-object"

const useSaveContent = () => {
  const { stageObjects } = useStageObject()
  const { stage } = useAppSelector((state) => state.frame)
  const [content, setContent] = useState("[]")

  // const toast = useToast()

  const [update] = useUpdateCanvasMutation()

  useEffect(() => {
    const objectsJSON = JSON.stringify(stageObjects)
    setContent(objectsJSON)
  }, [stageObjects])

  const saveHandler = useCallback(() => {
    const stageValues = {
      id: stage.id as string,
      name: stage.name as string,
      description: stage.description as string,
    }

    update({ ...stageValues, content })
      .then(() => {
        // toast({
        //   title: "Changes were successfully saved.",
        //   status: "success",
        //   duration: 5000,
        //   isClosable: true,
        // })
      })
      .catch((err) => console.error(err))
  }, [stage.id, stage.name, stage.description, update, content])

  return { saveHandler }
}

export default useSaveContent
