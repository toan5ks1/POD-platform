/* eslint-disable @typescript-eslint/no-unsafe-argument */
import React from "react"
import Image from "next/image"
import type { FileWithPreview } from "@/types"

import { DEFAULT_IMAGE_OBJECT } from "@/config/stage-object"
import useStageObject from "@/hooks/use-stage-object"
import { FileDialog } from "@/components/file-dialog"

const ImageUpload = () => {
  const { createOne } = useStageObject()

  const addImageToStage = (img: FileWithPreview) => {
    console.log(img)
    createOne({
      src: img.preview,
      ...DEFAULT_IMAGE_OBJECT,
    })
  }

  const [files, setFiles] = React.useState<FileWithPreview[] | null>(null)

  return (
    <div className="space-y-8">
      {files?.length ? (
        <div className="flex items-center gap-2">
          {files.map((file, i) => (
            <Image
              key={i}
              src={file.preview}
              alt={file.name}
              className="h-20 w-20 shrink-0 rounded-md object-cover object-center"
              width={80}
              height={80}
              onClick={() => addImageToStage(file)}
            />
          ))}
        </div>
      ) : null}
      <FileDialog
        setValue={() => {}}
        name="images"
        maxFiles={3}
        maxSize={1024 * 1024 * 4}
        files={files}
        setFiles={setFiles}
      />
    </div>
  )
}

export default ImageUpload
