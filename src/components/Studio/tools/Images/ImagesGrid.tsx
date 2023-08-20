/* eslint-disable @typescript-eslint/no-unsafe-argument */
// import { Image as ChakraImage, SimpleGrid } from '@chakra-ui/react';
import Image from "next/image"

import { DEFAULT_IMAGE_OBJECT } from "@/config/stage-object"
import useStageObject from "@/hooks/use-stage-object"

import { type Photo } from "./Images"

type Props = {
  images: Photo[]
}

const ImagesGrid = ({ images }: Props) => {
  const { createOne } = useStageObject()

  const addImageToStage = (img: Photo) => {
    createOne({
      src: img.urls.regular,
      ...DEFAULT_IMAGE_OBJECT,
    })
  }

  return (
    <div className="grid gap-4">
      {images.map((img, i) => (
        <Image
          key={i}
          src={img.urls.regular}
          alt={img.id}
          className="rounded-md bg-white"
          onClick={() => addImageToStage(img)}
        />
      ))}
    </div>
  )
}

export default ImagesGrid
