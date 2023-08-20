/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { subcategory } from "@/db/schema"
import * as z from "zod"

export const subcategorySchema = z.object({
  name: z.string().min(1, {
    message: "Must be at least 1 character",
  }),
  description: z.string().optional(),
  category:  z.number(),
  subcategory: z.string().optional().nullable(),
  price: z.string().regex(/^\d+(\.\d{1,2})?$/, {
    message: "Must be a valid price",
  }),
  inventory: z.number(),
  images: z
    .unknown()
    .refine((val) => {
      if (!Array.isArray(val)) return false
      if (val.some((file) => !(file instanceof File))) return false
      return true
    }, "Must be an array of File")
    .optional()
    .nullable()
    .default(null),
})

export const filterSubcategoriesSchema = z.object({
  query: z.string(),
})

export const getSubcategorySchema = z.object({
  id: z.number(),
  storeId: z.number(),
})

export const getSubcategoriesSchema = z.object({
  limit: z.number().default(10),
  offset: z.number().default(0),
  categories: z
    .string()
    .regex(/^\d+.\d+$/)
    .optional()
    .nullable(),
  subcategories: z
    .string()
    .regex(/^\d+.\d+$/)
    .optional()
    .nullable(),
  sort: z
    .string()
    .regex(/^\w+.(asc|desc)$/)
    .optional()
    .nullable(),
  price_range: z
    .string()
    .regex(/^\d+-\d+$/)
    .optional()
    .nullable(),
  store_ids: z
    .string()
    .regex(/^\d+.\d+$/)
    .optional()
    .nullable(),
})
