/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { db } from "@/db"
import { Category, category, resources, stores } from "@/db/schema"
import { env } from "@/env.mjs"
import { and, desc, eq, not } from "drizzle-orm"

import { formatPrice, toTitleCase } from "@/lib/utils"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Separator } from "@/components/ui/separator"
import { AddToCartForm } from "@/components/forms/add-to-cart-form"
import { Breadcrumbs } from "@/components/pagers/breadcrumbs"
import { ResourceCard } from "@/components/resource-card"
import { ResourceImageCarousel } from "@/components/resource-image-carousel"
import { Shell } from "@/components/shells/shell"
import { useState } from "react"
import React from "react"

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Product",
  description: "Product description",
}

interface ProductPageProps {
  params: {
    resourceId: string
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const resourceId = Number(params.resourceId)

  const resource = await db.query.resources.findFirst({
    where: eq(resources.id, resourceId),
  })

  if (!resource) {
    notFound()
  }
  const categoryQuery = await db.query.category.findFirst({
    where: eq(category.id, resource.category),
  })
  if (!categoryQuery) {
    return <div>Loading...</div>;
  }
  return (
    <Shell>
      <Breadcrumbs
        segments={[
          {
            title: "Resource",
            href: "/resources",
          },
          {
            title: toTitleCase( categoryQuery.name),
            href: `/resources?category=${resource.category}`,
          },
          {
            title: resource.name,
            href: `/resource/${resource.id}`,
          },
        ]}
      />
      <div className="flex flex-col gap-8 md:flex-row md:gap-16">
        <ResourceImageCarousel
          className="w-full md:w-1/2"
          images={resource.images ?? []}
          options={{
            loop: true,
          }}
        />
        <Separator className="mt-4 md:hidden" />
        <div className="flex w-full flex-col gap-4 md:w-1/2">
          <div className="space-y-2">
            <h2 className="line-clamp-1 text-2xl font-bold">{resource.name}</h2>
            <p className="text-base text-muted-foreground">
              {formatPrice(resource.price)}
            </p>
          </div>
          <Separator className="my-1.5" />
          <div>
            Printer: {resource.supplier}
          </div>
          {/* <AddToCartForm productId={resourceId} /> */}
          <Separator className="mt-5" />
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="description">
              <AccordionTrigger>Description</AccordionTrigger>
              <AccordionContent>
                {resource.description ??
                  "No description is available for this resource."}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
      {/* {store && productsFromStore.length > 0 ? (
        <div className="overflow-hidden md:pt-6">
          <h2 className="line-clamp-1 flex-1 text-2xl font-bold">
            More resources from {store.name}
          </h2>
          <div className="overflow-x-auto pb-2 pt-6">
            <div className="flex w-fit gap-4">
              {productsFromStore.map((resource) => (
                <ResourceCard
                  key={resource.id}
                  resource={resource}
                  className="min-w-[260px]" tag={""}
                  />
              ))}
            </div>
          </div>
        </div>
      ) : null} */}
    </Shell>
  )
}
