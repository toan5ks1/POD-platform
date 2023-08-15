import type { CartItem, CheckoutItem, Colors, Sizes, StoredFile } from "@/types"
import { relations, type InferModel } from "drizzle-orm"
import {
  boolean,
  decimal,
  int,
  json,
  mysqlEnum,
  mysqlTable,
  primaryKey,
  serial,
  text,
  timestamp,
  unique,
  varchar,
} from "drizzle-orm/mysql-core"

export const stores = mysqlTable("stores", {
  id: serial("id").primaryKey(),
  userId: varchar("userId", { length: 191 }).notNull(),
  name: varchar("name", { length: 191 }).notNull(),
  description: text("description"),
  slug: text("slug"),
  active: boolean("active").notNull().default(true),
  stripeAccountId: varchar("stripeAccountId", { length: 191 }),
  createdAt: timestamp("createdAt").defaultNow(),
})

export type Store = InferModel<typeof stores>

export const storesRelations = relations(stores, ({ many }) => ({
  products: many(products),
  resources: many(resources),
}))

export const products = mysqlTable("products", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 191 }).notNull(),
  description: text("description"),
  images: json("images").$type<StoredFile[] | null>().default(null),
  category: mysqlEnum("category", [
    "skateboards",
    "clothing",
    "shoes",
    "accessories",
  ])
    .notNull()
    .default("skateboards"),
  sizes: json("sizes").$type<Sizes[] | null>().default(null),
  colors: json("colors").$type<Colors[] | null>().default(null),
  subcategory: varchar("subcategory", { length: 191 }),
  price: decimal("price", { precision: 10, scale: 2 }).notNull().default("0"),
  inventory: int("inventory").notNull().default(0),
  rating: int("rating").notNull().default(0),
  tags: json("tags").$type<string[] | null>().default(null),
  storeId: int("storeId").notNull(),
  createdAt: timestamp("createdAt").defaultNow(),
})

export type Product = InferModel<typeof products>

export const resources = mysqlTable("resources", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 191 }).notNull(),
  description: text("description"),
  images: json("images").$type<StoredFile[] | null>().default(null),
  category: mysqlEnum("category", [
    "skateboards",
    "clothing",
    "shoes",
    "accessories",
  ])
    .notNull()
    .default("skateboards"),
  sizes: json("sizes").$type<Sizes[] | null>().default(null),
  colors: json("colors").$type<Colors[] | null>().default(null),
  subcategory: varchar("subcategory", { length: 191 }),
  price: decimal("price", { precision: 10, scale: 2 }).notNull().default("0"),
  inventory: int("inventory").notNull().default(0),
  rating: int("rating").notNull().default(0),
  tags: json("tags").$type<string[] | null>().default(null),
  createdAt: timestamp("createdAt").defaultNow(),
})

export type Resource = InferModel<typeof resources>

export const category = mysqlTable("category", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 191 }).notNull(),
  desc: text("desc"),
  slug: text("slug"),
  image: text("image"),
  tags: json("tags").$type<string[] | null>().default(null),
  createdAt: timestamp("created_at").defaultNow(),
})

export type Category = InferModel<typeof category>

export const subcategory = mysqlTable("subcategory", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 191 }).notNull(),
  desc: text("description"),
  slug: text("slug"),
  image: text("image"),
  category: int("category"),
  tags: json("tags").$type<string[] | null>().default(null),
  createdAt: timestamp("created_at").defaultNow(),
})



export type Subcategory = InferModel<typeof subcategory>


export const productsRelations = relations(products, ({ one }) => ({
  store: one(stores, { fields: [products.storeId], references: [stores.id] }),
}))

export const subcategoryRelations = relations(subcategory, ({ one }) => ({
  category: one(category, { fields: [subcategory.category], references: [category.id] }),
}))

export const suppliers = mysqlTable("suppliers", {
  id: serial("id").primaryKey(),
  userId: varchar("userId", { length: 191 }).notNull(),
  name: varchar("name", { length: 191 }).notNull(),
  description: text("description"),
  slug: text("slug"),
  active: boolean("active").notNull().default(true),
  stripeAccountId: varchar("stripeAccountId", { length: 191 }),
  createdAt: timestamp("createdAt").defaultNow(),
})

export type Suppliers = InferModel<typeof suppliers>

export const suppliersRelations = relations(suppliers, ({ many }) => ({
  resources: many(resources),
}))

export const carts = mysqlTable("carts", {
  id: serial("id").primaryKey(),
  userId: varchar("userId", { length: 191 }),
  paymentIntentId: varchar("paymentIntentId", { length: 191 }),
  clientSecret: varchar("clientSecret", { length: 191 }),
  items: json("items").$type<CartItem[] | null>().default(null),
  createdAt: timestamp("createdAt").defaultNow(),
})

export type Cart = InferModel<typeof carts>

export const emailPreferences = mysqlTable("email_preferences", {
  id: serial("id").primaryKey(),
  userId: varchar("userId", { length: 191 }),
  email: varchar("email", { length: 191 }).notNull(),
  token: varchar("token", { length: 191 }).notNull(),
  newsletter: boolean("newsletter").notNull().default(false),
  marketing: boolean("marketing").notNull().default(false),
  transactional: boolean("transactional").notNull().default(false),
  createdAt: timestamp("createdAt").defaultNow(),
})

export type EmailPreference = InferModel<typeof emailPreferences>

export const payments = mysqlTable("payments", {
  id: serial("id").primaryKey(),
  userId: varchar("userId", { length: 191 }),
  storeId: int("storeId").notNull(),
  stripeAccountId: varchar("stripeAccountId", { length: 191 }).notNull(),
  stripeAccountCreatedAt: int("stripeAccountCreatedAt").notNull(),
  stripeAccountExpiresAt: int("stripeAccountExpiresAt").notNull(),
  detailsSubmitted: boolean("detailsSubmitted").notNull().default(false),
  createdAt: timestamp("createdAt").defaultNow(),
})

export type Payment = InferModel<typeof payments>

export const orders = mysqlTable("orders", {
  id: serial("id").primaryKey(),
  userId: varchar("userId", { length: 191 }),
  storeId: int("storeId").notNull(),
  items: json("items").$type<CheckoutItem[] | null>().default(null),
  total: decimal("total", { precision: 10, scale: 2 }).notNull().default("0"),
  stripePaymentIntentId: varchar("stripePaymentIntentId", {
    length: 191,
  }).notNull(),
  stripePaymentIntentStatus: varchar("stripePaymentIntentStatus", {
    length: 191,
  }).notNull(),
  name: varchar("name", { length: 191 }),
  email: varchar("email", { length: 191 }),
  addressId: int("addressId"),
  createdAt: timestamp("createdAt").defaultNow(),
})

export type Order = InferModel<typeof orders>

export const addresses = mysqlTable("addresses", {
  id: serial("id").primaryKey(),
  line1: varchar("line1", { length: 191 }),
  line2: varchar("line2", { length: 191 }),
  city: varchar("city", { length: 191 }),
  state: varchar("state", { length: 191 }),
  postalCode: varchar("postalCode", { length: 191 }),
  country: varchar("country", { length: 191 }),
  createdAt: timestamp("createdAt").defaultNow(),
})

export type Address = InferModel<typeof addresses>

export const admin = mysqlTable(
  "admin",
  {
    id: int("id").autoincrement().notNull(),
    username: varchar("username", { length: 255 }).notNull(),
    password: varchar("password", { length: 255 }).notNull(),
    name: varchar("name", { length: 255 }).notNull(),
    phone: varchar("phone", { length: 255 }).notNull(),
    createdAt: timestamp("created_at", { mode: "string" }),
    updatedAt: timestamp("updated_at", { mode: "string" }),
  },
  (table) => {
    return {
      adminId: primaryKey(table.id),
      id: unique("id").on(table.id),
    }
  }
)

export const migrations = mysqlTable(
  "migrations",
  {
    id: int("id").autoincrement().notNull(),
    migration: varchar("migration", { length: 255 }).notNull(),
    batch: int("batch").notNull(),
  },
  (table) => {
    return {
      migrationsId: primaryKey(table.id),
      id: unique("id").on(table.id),
    }
  }
)
