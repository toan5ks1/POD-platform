/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// import { Box, Button, useDisclosure } from "@chakra-ui/react"

import { Button } from "@/components/ui/button"
import DrawerWrapper from "@/components/editor/Drawer/DrawerWrapper"

import CanvasUpdateForm from "./CanvasUpdateForm"

const CanvasUpdate = () => {
  // const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <div className="w-full">
      <Button className="w-full" onClick={() => {}}>
        Update this canvas
      </Button>
      <DrawerWrapper
        isOpen={false}
        onClose={() => {}}
        title="Update This Canvas"
      >
        <CanvasUpdateForm />
      </DrawerWrapper>
    </div>
  )
}

export default CanvasUpdate
