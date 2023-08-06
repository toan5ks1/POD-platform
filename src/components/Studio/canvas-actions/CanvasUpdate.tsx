/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Box, Button, useDisclosure } from "@chakra-ui/react"

import DrawerWrapper from "@/components/editor/Drawer/DrawerWrapper"

import CanvasUpdateForm from "./CanvasUpdateForm"

const CanvasUpdate = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Box sx={{ w: "100%" }}>
      <Button
        variant="ghost"
        colorScheme="pink"
        onClick={onOpen}
        sx={{ w: "100%" }}
      >
        Update this canvas
      </Button>
      <DrawerWrapper
        isOpen={isOpen}
        onClose={onClose}
        title="Update This Canvas"
      >
        <CanvasUpdateForm />
      </DrawerWrapper>
    </Box>
  )
}

export default CanvasUpdate
