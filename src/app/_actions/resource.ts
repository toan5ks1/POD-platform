/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
"use server"

import { revalidatePath } from "next/cache"
import { db } from "@/db"
import { resources, type Resource } from "@/db/schema"
import type { StoredFile } from "@/types"
import {
  and,
  asc,
  desc,
  eq,
  gt,
  gte,
  inArray,
  like,
  lt,
  lte,
  not,
  sql,
} from "drizzle-orm"
import { type z } from "zod"

import type {
  getResourceSchema,
  getResourcesSchema,
  resourceSchema,
} from "@/lib/validations/resource"

export async function filterResourcesAction(query: string) {
  if (query.length === 0) return null

  const filteredResources = await db
    .select({
      id: resources.id,
      name: resources.name,
      category: resources.category,
    })
    .from(resources)
    .where(like(resources.name, `%${query}%`))
    .orderBy(desc(resources.createdAt))
    .limit(10)

  // const resourcesByCategory = Object.values(resources.category.enumValues).map(
  //   (category) => ({
  //     category,
  //     resources: filteredResources.filter(
  //       (resource) => resource.category === category
  //     ),
  //   })
  // )

  // return resourcesByCategory
}

export async function getResourcesAction(
  input: z.infer<typeof getResourcesSchema>
) {
  const [column, order] =
    (input.sort?.split(".") as [
      keyof Resource | undefined,
      "asc" | "desc" | undefined,
    ]) ?? []
  const [minPrice, maxPrice] = input.price_range?.split("-") ?? []
  const categories =
    (input.categories?.split(".") as unknown as Resource["category"][]) ?? []
  const subcategories = input.subcategories?.split(".") ?? []
  const storeIds = input.store_ids?.split(".").map((str) => parseInt(str, 10)).filter((num) => !isNaN(num)) ?? [];

  const { items, total } = await db.transaction(async (tx) => {
    const items = await tx
      .select()
      .from(resources)
      .limit(input.limit)
      .offset(input.offset)
      .where(
        and(
          categories.length
            ? inArray(resources.category, categories)
            : undefined,
          subcategories.length
            ? inArray(resources.subcategory, subcategories)
            : undefined,
          minPrice ? gte(resources.price, minPrice) : undefined,
          maxPrice ? lte(resources.price, maxPrice) : undefined,
        )
      )
      .orderBy(
        column && column in resources
          ? order === "asc"
            ? asc(resources[column])
            : desc(resources[column])
          : desc(resources.createdAt)
      )

    const total = await tx
      .select({
        count: sql<number>`count(${resources.id})`,
      })
      .from(resources)
      .where(
        and(
          categories.length
            ? inArray(resources.category, categories)
            : undefined,
          subcategories.length
            ? inArray(resources.subcategory, subcategories)
            : undefined,
          minPrice ? gte(resources.price, minPrice) : undefined,
          maxPrice ? lte(resources.price, maxPrice) : undefined,
        )
      )
    return {
      items,
      total: Number(total[0]?.count) ?? 0,
    }
  })

  return {
    items,
    total,
  }
}

export async function checkResourceAction(input: { name: string; id?: number }) {
  const resourceWithSameName = await db.query.resources.findFirst({
    where: input.id
      ? and(not(eq(resources.id, input.id)), eq(resources.name, input.name))
      : eq(resources.name, input.name),
  })

  if (resourceWithSameName) {
    throw new Error("Resource name already taken.")
  }
}

export async function addResourceAction(
  input: z.infer<typeof resourceSchema> & {
    storeId: number
    images: StoredFile[] | null
  }
) {

  // await db.insert(resources).values({
  //   ...input,
  //   images: input.images,
  // })

  revalidatePath(`/dashboard/stores/${input.storeId}/resources.`)
}

// export async function updateResourceAction(
//   input: z.infer<typeof resourceSchema> & {
//     storeId: number
//     id: number
//     images: StoredFile[] | null
//   }
// ) {
//   const resource = await db.query.resources.findFirst({
//     where: and(eq(resources.id, input.id), eq(resources.storeId, input.storeId)),
//   })

//   if (!resource) {
//     throw new Error("Resource not found.")
//   }

//   await db.update(resources).set(input).where(eq(resources.id, input.id))

//   revalidatePath(`/dashboard/stores/${input.storeId}/resources/${input.id}`)
// }

// export async function deleteResourceAction(
//   input: z.infer<typeof getResourceSchema>
// ) {
//   and(eq(resources.id, input.id), eq(resources.storeId, input.storeId)),
//     await db
//       .delete(resources)
//       .where(
//         and(eq(resources.id, input.id), eq(resources.storeId, input.storeId))
//       )

//   revalidatePath(`/dashboard/stores/${input.storeId}/resources`)
// }

// export async function getNextResourceIdAction(
//   input: z.infer<typeof getResourceSchema>
// ) {
//   const resource = await db.query.resources.findFirst({
//     where: and(eq(resources.storeId, input.storeId), gt(resources.id, input.id)),
//     orderBy: asc(resources.id),
//   })

//   if (!resource) {
//     throw new Error("Resource not found.")
//   }

//   return resource.id
// }

// export async function getPreviousResourceIdAction(
//   input: z.infer<typeof getResourceSchema>
// ) {
//   const resource = await db.query.resources.findFirst({
//     where: and(eq(resources.storeId, input.storeId), lt(resources.id, input.id)),
//     orderBy: desc(resources.id),
//   })

//   if (!resource) {
//     throw new Error("Resource not found.")
//   }

//   return resource.id
// }
