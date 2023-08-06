"use server"

import { revalidatePath } from "next/cache"
import { db } from "@/db"
import { category, type Category } from "@/db/schema"
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
  getProductSchema,
  getProductsSchema,
  productSchema,
} from "@/lib/validations/product"

export async function getCategoryAction(
  input: z.infer<typeof getProductsSchema>
) {
  const [column, order] =
    (input.sort?.split(".") as [
      keyof Category | undefined,
      "asc" | "desc" | undefined,
    ]) ?? []
  const [minPrice, maxPrice] = input.price_range?.split("-") ?? []
  const subcategories = input.subcategories?.split(".") ?? []
  const storeIds = input.store_ids?.split(".").map(Number) ?? []

  const { items, total } = await db.transaction(async (tx) => {
    const items = await tx
      .select()
      .from(category)
      .limit(input.limit)
      .offset(input.offset)
    
    const total = await tx
    .select({
      count: sql<number>`count(${category.id})`,
    })
    .from(category)

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

export async function checkCategoryAction(input: { name: string; id?: number }) {
  const categoryWithSameName = await db.query.category.findFirst({
    where: input.id
      ? and(not(eq(category.id, input.id)), eq(category.name, input.name))
      : eq(category.name, input.name),
  })

  if (categoryWithSameName) {
    throw new Error("Category name already taken.")
  }
}
