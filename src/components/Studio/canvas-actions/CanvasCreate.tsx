/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// import { Box, Button, useDisclosure } from "@chakra-ui/react"

import { Button } from "@/components/ui/button"
import DrawerWrapper from "@/components/editor/Drawer/DrawerWrapper"

import CanvasCreateForm from "./CanvasCreateForm"

const CanvasCreate = () => {
  // const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <div className="w-full">
      <Button
        variant="ghost"
        // colorScheme="pink"
        // onClick={onOpen}
        className="w-full"
      >
        Create a canvas
      </Button>
      <DrawerWrapper isOpen={false} onClose={() => {}} title="Create a Canvas">
        <CanvasCreateForm />
      </DrawerWrapper>
    </div>
  )
}

export default CanvasCreate
