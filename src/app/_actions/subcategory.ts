import { getSubcategories } from '@/config/products';
"use server"

import { revalidatePath } from "next/cache"
import { db } from "@/db"
import { subcategory, type Subcategory } from "@/db/schema"
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
  getSubcategorySchema,
  getSubcategoriesSchema,
  subcategorySchema,
} from "@/lib/validations/subcategory"

export async function getSubCategoryAction(
  input: z.infer<typeof getSubcategoriesSchema>
) {
  const [column, order] =
    (input.sort?.split(".") as [
      keyof Subcategory | undefined,
      "asc" | "desc" | undefined,
    ]) ?? []
  const [minPrice, maxPrice] = input.price_range?.split("-") ?? []
  const subcategories = input.subcategories?.split(".") ?? []
  const storeIds = input.store_ids?.split(".").map(Number) ?? []

  const { items, total } = await db.transaction(async (tx) => {
    const items = await tx
      .select()
      .from(subcategory)
      .limit(input.limit)
      .offset(input.offset)
    
    const total = await tx
    .select({
      count: sql<number>`count(${subcategory.id})`,
    })
    .from(subcategory)

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

export async function checkSubCategoryAction(input: { name: string; id?: number }) {
  const subcategoryWithSameName = await db.query.subcategory.findFirst({
    where: input.id
      ? and(not(eq(subcategory.id, input.id)), eq(subcategory.name, input.name))
      : eq(subcategory.name, input.name),
  })

  if (subcategoryWithSameName) {
    throw new Error("Category name already taken.")
  }
}
