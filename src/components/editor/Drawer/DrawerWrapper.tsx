import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

// import { Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay } from '@chakra-ui/react';

type PropsType = {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactElement
}

const DrawerWrapper = ({ isOpen, onClose, title, children }: PropsType) => {
  return (
    // <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
    //   <DrawerOverlay />
    //   <DrawerContent>
    //     <DrawerCloseButton />
    //     <DrawerHeader borderBottomWidth="1px">{title}</DrawerHeader>
    //     <DrawerBody>{children}</DrawerBody>
    //   </DrawerContent>
    // </Drawer>
    <Sheet>
      <SheetTrigger asChild>
        <Button aria-label="Filter products" size="sm">
          Filter
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col">{children}</SheetContent>
    </Sheet>
  )
}

export default DrawerWrapper
