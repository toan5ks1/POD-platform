/* eslint-disable jsx-a11y/alt-text */
import Image from "next/image"
import Link from "next/link"
import { db } from "@/db"
import { products, stores, category } from "@/db/schema"
import { desc, eq, sql } from "drizzle-orm"
import Balance from "react-wrap-balancer"

import { productCategories } from "@/config/products"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Icons } from "@/components/icons"
import { ProductCard } from "@/components/product-card"
import { Shell } from "@/components/shells/shell"

// Running out of edge function execution units on vercel free plan
// export const runtime = "edge"

// This is equivalent to getServersideProps() in the pages directory
// Read more: https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config
export const dynamic = "force-dynamic"

export default async function IndexPage() {
  const allProducts = await db
    .select()
    .from(products)
    .limit(8)
    .orderBy(desc(products.createdAt))
  
  const allCategory = await db
    .select()
    .from(category)
    .orderBy(desc(category.createdAt))

  const allStoresWithProductCount = await db
    .select({
      id: stores.id,
      name: stores.name,
      description: stores.description,
      productCount: sql<number>`count(${products.id})`,
    })
    .from(stores)
    .limit(4)
    .leftJoin(products, eq(products.storeId, stores.id))
    .groupBy(stores.id)
    .orderBy(desc(sql<number>`count(${products.id})`))


  return (
    <Shell as="div" className="gap-12">
      <section
        id="banner"
      >
        <h1 className="text-[40px] font-bold">Wearify Product</h1>
        <div className="mt-[20px] w-full rounded-[5px] bg-[#B990FF] py-[20px]">
          <div className="flex flex-row p-[20px]">
            <div className="flex flex-col">
              <h1 className="text-[40px] font-bold">Wearify presents:</h1>
              <h1 className="text-[40px] font-bold">Amplified</h1>
              <p className="font-normal">Turn up the volume on your business. Learn, share, and connect with Print-On-Demand rockstars from around the world.</p>
              <div className="mt-[20px] flex w-[200px] items-center justify-center rounded-[5px] bg-white p-[10px]">
                <span className="text-center font-bold text-black">Claim Your Seat</span>
              </div>
            </div>
            <div></div>
          </div>
        </div>
      </section>
      <section
        id="categories"
        aria-labelledby="categories-heading"
        className="space-y-6 py-6"
      >
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <h2 className="text-[24px] font-bold leading-[1.1]">
            Bestsellers
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {allProducts.map((product) => (
            <ProductCard key={product.id} product={product} tag={'Bestseller'}/>
          ))}
        </div>
      </section>
      <section
        id="create-a-store-banner"
        aria-labelledby="create-a-store-banner-heading"
        className="grid place-items-center gap-6 rounded-lg border bg-card text-center text-card-foreground shadow-sm"
      >
        <div className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 px-6 py-16">
          <h1 className="text-2xl font-medium sm:text-3xl">Print providers</h1>
          <h2 className="py-[15px]">
            Wearify is the largest print on demand network
          </h2>
          <Link href="/dashboard/stores">
            <div className={cn(buttonVariants())}>
              See print providers
              <span className="sr-only">See print providers</span>
            </div>
          </Link>
        </div>
      </section>
      <section
        aria-labelledby=""
        className="space-y-6"
        id="categories">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
          {allCategory.map((category) => (
            <Link
              aria-label={`Go to ${category.name}`}
              key={category.name}
              href={`/categories/${category.name}`}
            >
              <div className="group relative h-[200px] overflow-hidden rounded-md">
                <AspectRatio ratio={4 / 5}>
                  <div className="absolute inset-0 z-10 bg-black/60 transition-colors group-hover:bg-black/70" />
                  {/* <Image
                    src={category.image}
                    alt={category.name}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                    priority
                  /> */}
                </AspectRatio>
                <div className="absolute inset-0 z-20 flex items-center justify-center">
                  <h3 className="text-[30px] font-bold capitalize text-slate-100">
                    {category.name}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <section
        id="featured-products"
        aria-labelledby="featured-products-heading"
        className="space-y-6"
      >
        <div className="flex items-center">
          <h2 className="flex-1 text-2xl font-medium sm:text-3xl">
            Featured products
          </h2>
          <Link href="/products">
            <div
              className={cn(
                buttonVariants({
                  size: "sm",
                })
              )}
            >
              View all
              <span className="sr-only">View all products</span>
            </div>
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {allProducts.map((product) => (
            <ProductCard key={product.id} product={product} tag={''}/>
          ))}
        </div>
      </section>
      <section
        id="featured-stores"
        aria-labelledby="featured-stores-heading"
        className="space-y-6"
      >
        <h2 className="text-2xl font-medium sm:text-3xl">Featured stores</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {allStoresWithProductCount.map((store) => (
            <Card key={store.id} className="flex h-full flex-col">
              <CardHeader className="flex-1">
                <CardTitle className="line-clamp-1">{store.name}</CardTitle>
                <CardDescription className="line-clamp-2">
                  {store.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href={`/products?store_ids=${store.id}`}>
                  <div
                    className={cn(
                      buttonVariants({
                        size: "sm",
                        className: "h-8 w-full",
                      })
                    )}
                  >
                    View products ({store.productCount})
                    <span className="sr-only">{`${store.name} store products`}</span>
                  </div>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      <section
        id="random-subcategories"
        aria-labelledby="random-subcategories-heading"
        className="flex flex-wrap items-center justify-center gap-4 pb-4"
      >
        {productCategories && productCategories[
          Math.floor(Math.random() * productCategories.length)
        ]?.subcategories.map((subcategory) => (
          <Link
            key={subcategory.slug}
            href={`/categories/${String(productCategories[0]?.title)}/${
              subcategory.slug
            }`}
          >
            <Badge variant="secondary" className="rounded px-3 py-1">
              {subcategory.title}
            </Badge>
            <span className="sr-only">{subcategory.title}</span>
          </Link>
        ))}
      </section>
    </Shell>
  )
}
