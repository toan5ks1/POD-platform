import { type Metadata } from "next"
import { resources } from "@/db/schema"
import { env } from "@/env.mjs"

import { Header } from "@/components/header"
import { Resources } from "@/components/resources"
import { Shell } from "@/components/shells/shell"
import { getResourcesAction } from "@/app/_actions/resource"
import { getCategoryAction } from "@/app/_actions/category"
import { getStoresAction } from "@/app/_actions/store"

// Running out of edge function execution units on vercel free plan
// export const runtime = "edge"

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Resources",
  description: "Buy resources from our stores",
}

interface ResourcesPageProps {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

export default async function ResourcesPage({
  searchParams,
}: ResourcesPageProps) {
  const {
    page,
    per_page,
    sort,
    categories,
    subcategories,
    price_range,
    store_ids,
    store_page,
  } = searchParams

  const limit = typeof per_page === "string" ? parseInt(per_page) : 8
  const offset = typeof page === "string" ? (parseInt(page) - 1) * limit : 0

  const resourcesTransaction = await getResourcesAction({
    limit,
    offset,
    sort: typeof sort === "string" ? sort : null,
    categories: typeof categories === "string" ? categories : null,
    subcategories: typeof subcategories === "string" ? subcategories : null,
    price_range: typeof price_range === "string" ? price_range : null,
    store_ids: typeof store_ids === "string" ? store_ids : null,
  })

  const categoryTransaction = await getCategoryAction({
    limit: 10,
    offset: 1,
  })
  

  const pageCount = Math.ceil(resourcesTransaction.total / limit)

  return (
    <Shell>
      <Header
        title="Resources"
        description="Buy Resources from our stores"
        size="sm"
      />
      <Resources
        resources={resourcesTransaction.items}
        pageCount={pageCount}
        categories={Object.values(resources.category.enumValues)}
      />
    </Shell>
  )
}
