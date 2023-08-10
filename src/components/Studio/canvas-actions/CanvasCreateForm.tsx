/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useCreateCanvasMutation } from "@/store/api/canvas-slice"
import { setStage } from "@/store/slices/frame-slice"
// import {
//   Button,
//   FormControl,
//   FormErrorMessage,
//   FormLabel,
//   Input,
//   VStack,
// } from "@chakra-ui/react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux"

import { createSchema, type ICreate } from "@/lib/validations/canvas"

type Props = {
  content?: string
}

const CanvasCreateForm = ({ content }: Props) => {
  const dispatch = useDispatch()
  const [create, { isLoading }] = useCreateCanvasMutation()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ICreate>({
    resolver: zodResolver(createSchema),
  })

  const onSubmit = async (data: ICreate) => {
    create({ ...data, content: content || "[]" })
      .unwrap()
      .then(({ id, name }: { id: any; name: any }) => {
        dispatch(setStage({ id, name }))
      })
      .catch((err: any) => console.error(err))
    reset()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* <VStack spacing="4">
        <FormControl isInvalid={!!errors.name} isRequired>
          <FormLabel htmlFor="name">Name</FormLabel>
          <Input id="name" placeholder="name" {...register("name")} />
          <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.description} isRequired>
          <FormLabel htmlFor="description">Description</FormLabel>
          <Input
            id="description"
            placeholder="description"
            {...register("description")}
          />
          <FormErrorMessage>{errors.description?.message}</FormErrorMessage>
        </FormControl>
        <Button
          type="submit"
          w="200px"
          colorScheme="pink"
          isLoading={isLoading}
        >
          Save
        </Button>
      </VStack> */}
    </form>
  )
}

export default CanvasCreateForm
