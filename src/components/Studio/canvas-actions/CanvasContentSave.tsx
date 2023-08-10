/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useEffect, useState } from "react"
import { useUpdateCanvasMutation } from "@/store/api/canvas-slice"

// import { Button, useDisclosure, useToast } from "@chakra-ui/react"

import { useAppSelector } from "@/hooks/use-app-selector"
import useStageObject from "@/hooks/use-stage-object"
import { Button } from "@/components/ui/button"
import DrawerWrapper from "@/components/editor/Drawer/DrawerWrapper"

import CanvasCreateForm from "./CanvasCreateForm"

const CanvasContentSave = () => {
  const { stageObjects } = useStageObject()
  const [content, setContent] = useState("[]")
  const { stage } = useAppSelector((state: { frame: any }) => state.frame)

  const [update, { isLoading }] = useUpdateCanvasMutation()

  // const { isOpen, onOpen, onClose } = useDisclosure()
  // const toast = useToast()

  useEffect(() => {
    const objectsJSON = JSON.stringify(stageObjects)
    setContent(objectsJSON)
  }, [stageObjects])

  const saveHandler = () => {
    if (!stage.id) {
      // toast({
      //   title: "Please create new stage first.",
      //   status: "info",
      //   duration: 5000,
      //   isClosable: true,
      // })

      // onOpen()
      return
    }

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
      .catch((err: any) => console.error(err))
  }

  return (
    <>
      <Button disabled={!isLoading} onClick={saveHandler}>
        Save Changes
      </Button>
      <DrawerWrapper title="Create a stage" isOpen={false} onClose={() => {}}>
        <CanvasCreateForm content={content} />
      </DrawerWrapper>
    </>
  )
}

export default CanvasContentSave
