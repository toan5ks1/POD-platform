/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Box, Button, useDisclosure } from "@chakra-ui/react"

import DrawerWrapper from "@/components/editor/Drawer/DrawerWrapper"

import CanvasCreateForm from "./CanvasCreateForm"

const CanvasCreate = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Box sx={{ w: "100%" }}>
      <Button
        variant="ghost"
        colorScheme="pink"
        onClick={onOpen}
        sx={{ w: "100%" }}
      >
        Create a canvas
      </Button>
      <DrawerWrapper isOpen={isOpen} onClose={onClose} title="Create a Canvas">
        <CanvasCreateForm />
      </DrawerWrapper>
    </Box>
  )
}

export default CanvasCreate
