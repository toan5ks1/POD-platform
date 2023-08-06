/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useEffect, useState } from "react"
import { useGetCanvasesQuery } from "@/store/api/canvas-slice"
import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  VStack,
} from "@chakra-ui/react"

import { type ICanvas } from "@/types/canvas"
import Loader from "@/components/editor/Loader/Loader"
import NothingFound from "@/components/editor/NothingFound/NothingFound"
import Pagination from "@/components/editor/Pagination/Pagination"

import CanvasViewItem from "./CanvasViewItem"

const ITEMS_PER_PAGE = 5

const CanvasesView = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [page, setPage] = useState(1)
  const [canvases, setCanvases] = useState<ICanvas[]>([])
  const [total, setTotal] = useState(0)

  const { data, isLoading } = useGetCanvasesQuery({
    skip: (page - 1) * ITEMS_PER_PAGE,
    take: ITEMS_PER_PAGE,
  })

  useEffect(() => {
    if (data) {
      setCanvases(data.canvases)
      setTotal(data.count)
    }
  }, [data])

  return (
    <Box sx={{ w: "100%" }}>
      <Button
        variant="ghost"
        colorScheme="pink"
        onClick={onOpen}
        sx={{ w: "100%" }}
      >
        View all canvases
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <ModalContent sx={{ p: 4 }}>
          <ModalHeader>All Created Canvases</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {isLoading ? (
              <Loader />
            ) : (
              <VStack spacing={4}>
                {canvases && canvases.length ? (
                  <>
                    {canvases.map((s) => (
                      <CanvasViewItem onClose={onClose} key={s.id} {...s} />
                    ))}
                    <Pagination
                      pagesCount={Math.ceil((total as number) / ITEMS_PER_PAGE)}
                      page={page}
                      setPage={setPage}
                    />
                  </>
                ) : (
                  <NothingFound message="You have no canvases. Please create one." />
                )}
              </VStack>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  )
}

export default CanvasesView
