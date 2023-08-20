import { useEffect } from "react"

type UseKonvaImageProps = {
  initialImage: string
  onLoad: (image: HTMLImageElement) => void
}

function useKonvaImage({ initialImage, onLoad }: UseKonvaImageProps) {
  useEffect(() => {
    const imgElement = new window.Image()
    imgElement.src = initialImage

    imgElement.onload = () => {
      onLoad(imgElement)
    }
  }, [initialImage, onLoad])
}

export default useKonvaImage
