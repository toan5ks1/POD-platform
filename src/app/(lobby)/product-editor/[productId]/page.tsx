import { redirect } from "next/navigation"

interface ProductEditorPageProps {
  params: {
    productId: string
  }
}

export default function ProductEditorPage({ params }: ProductEditorPageProps) {
  const productId = Number(params.productId)

  redirect(`/editor/${productId}`)
}
