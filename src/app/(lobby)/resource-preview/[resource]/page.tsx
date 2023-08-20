import { redirect } from "next/navigation"

interface ProductPreviewPageProps {
  params: {
    resourceId: string
  }
}

export default function ProductPreviewPage({
  params,
}: ProductPreviewPageProps) {
  const resourceId = Number(params.resourceId)

  redirect(`/resource/${resourceId}`)
}
