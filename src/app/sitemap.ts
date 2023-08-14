/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { type MetadataRoute } from "next"
import { allPosts } from "contentlayer/generated"

import { productCategories } from "@/config/products"
import { siteConfig } from "@/config/site"
import { getProductsAction } from "@/app/_actions/product"
import { getCategoryAction } from "@/app/_actions/category"
import { getSubCategoryAction } from "@/app/_actions/subcategory"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const productsTransaction = await getProductsAction({
    limit: 10,
    offset: 0,
    sort: "createdAt.desc",
  })

  const categoryTransaction = await getCategoryAction({
    offset: 0,
    limit: 10,
  })

  const subCategoryTransaction = await getSubCategoryAction({
    offset: 0,
    limit: 10,
  })
  

  const products = productsTransaction.items.map((product) => ({
    url: `${siteConfig.url}/product/${product.id}`,
    lastModified: new Date().toISOString(),
  }))

  const categories = categoryTransaction.items.map((category) => ({
    url: `${siteConfig.url}/categories/${category.name}`,
    lastModified: new Date().toISOString(),
  }))
  console.log('alsdkhalksdhjaslkdjaskldjaskldjaskldjaskldjaklsj');
  console.log(products);

  const subcategories = productCategories
    .map((category) =>
      category.subcategories.map((subcategory) => ({
        url: `${siteConfig.url}/categories/${category.title}/${subcategory.slug}`,
        lastModified: new Date().toISOString(),
      }))
    )
    .flat()

  console.log(subcategories);

  const posts = allPosts.map((post) => ({
    url: `${siteConfig.url}/blog/${post.slug}`,
    lastModified: new Date().toISOString(),
  }))

  const routes = [
    "",
    "/products",
    "/build-a-board",
    "/blog",
    "/dashboard/account",
    "/dashboard/stores",
    "/dashboard/billing",
    "/dashboard/purchases",
  ].map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date().toISOString(),
  }))

  return [...routes, ...products, ...subcategories, ...posts]
}
