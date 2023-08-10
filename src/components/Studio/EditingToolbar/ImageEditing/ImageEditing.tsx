import { type StageImageData, type StageObject } from "@/types/stage-object"

import ImageFilters from "./Filters"
import ImageFlip from "./Flip"

type Props = {
  selectedObject: StageObject
}

const ImageEditing = ({ selectedObject }: Props) => {
  return (
    <div className="flex space-x-2">
      <ImageFlip selectedObject={selectedObject} />
      <ImageFilters
        imageId={selectedObject.id}
        data={selectedObject.data as StageImageData}
      />
    </div>
  )
}

export default ImageEditing
