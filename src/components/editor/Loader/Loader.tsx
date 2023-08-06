import { Icons } from "@/components/icons"

type Props = {
  isFullScreen?: boolean
}

const Loader = ({ isFullScreen = false }: Props) => {
  if (!isFullScreen) {
    return (
      <Icons.spinner className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
    )
  }

  return (
    <div className="flex h-full items-center justify-center">
      <Icons.spinner
        color="pink.500"
        className="mr-2 h-4 w-4 animate-spin"
        speed=".6s"
        overlineThickness={"4px"}
      />
    </div>
  )
}

export default Loader
