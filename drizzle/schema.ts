import { mysqlTable, mysqlSchema, AnyMySqlColumn, primaryKey, serial, varchar, timestamp, unique, int, json, tinyint, decimal, text, mysqlEnum } from "drizzle-orm/mysql-core"
import { sql } from "drizzle-orm"


export const addresses = mysqlTable("addresses", {
	id: serial("id").notNull(),
	line1: varchar("line1", { length: 191 }),
	line2: varchar("line2", { length: 191 }),
	city: varchar("city", { length: 191 }),
	state: varchar("state", { length: 191 }),
	postalCode: varchar("postalCode", { length: 191 }),
	country: varchar("country", { length: 191 }),
	createdAt: timestamp("createdAt", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
},
(table) => {
	return {
		addressesId: primaryKey(table.id)
	}
});

export const admin = mysqlTable("admin", {
	id: int("id").autoincrement().notNull(),
	username: varchar("username", { length: 255 }).notNull(),
	password: varchar("password", { length: 255 }).notNull(),
	name: varchar("name", { length: 255 }).notNull(),
	phone: varchar("phone", { length: 255 }).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }),
	updatedAt: timestamp("updated_at", { mode: 'string' }),
},
(table) => {
	return {
		adminId: primaryKey(table.id),
		id: unique("id").on(table.id),
	}
});

export const carts = mysqlTable("carts", {
	id: serial("id").notNull(),
	userId: varchar("userId", { length: 191 }),
	paymentIntentId: varchar("paymentIntentId", { length: 191 }),
	clientSecret: varchar("clientSecret", { length: 191 }),
	items: json("items").default('null'),
	createdAt: timestamp("createdAt", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
},
(table) => {
	return {
		cartsId: primaryKey(table.id)
	}
});

export const emailPreferences = mysqlTable("email_preferences", {
	id: serial("id").notNull(),
	userId: varchar("userId", { length: 191 }),
	email: varchar("email", { length: 191 }).notNull(),
	token: varchar("token", { length: 191 }).notNull(),
	newsletter: tinyint("newsletter").default(0).notNull(),
	marketing: tinyint("marketing").default(0).notNull(),
	transactional: tinyint("transactional").default(0).notNull(),
	createdAt: timestamp("createdAt", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
},
(table) => {
	return {
		emailPreferencesId: primaryKey(table.id)
	}
});

export const migrations = mysqlTable("migrations", {
	id: int("id").autoincrement().notNull(),
	migration: varchar("migration", { length: 255 }).notNull(),
	batch: int("batch").notNull(),
},
(table) => {
	return {
		migrationsId: primaryKey(table.id),
		id: unique("id").on(table.id),
	}
});

export const orders = mysqlTable("orders", {
	id: serial("id").notNull(),
	userId: varchar("userId", { length: 191 }),
	storeId: int("storeId").notNull(),
	items: json("items").default('null'),
	total: decimal("total", { precision: 10, scale: 2 }).default('0.00').notNull(),
	stripePaymentIntentId: varchar("stripePaymentIntentId", { length: 191 }).notNull(),
	stripePaymentIntentStatus: varchar("stripePaymentIntentStatus", { length: 191 }).notNull(),
	name: varchar("name", { length: 191 }),
	email: varchar("email", { length: 191 }),
	addressId: int("addressId"),
	createdAt: timestamp("createdAt", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
},
(table) => {
	return {
		ordersId: primaryKey(table.id)
	}
});

export const payments = mysqlTable("payments", {
	id: serial("id").notNull(),
	userId: varchar("userId", { length: 191 }),
	storeId: int("storeId").notNull(),
	stripeAccountId: varchar("stripeAccountId", { length: 191 }).notNull(),
	stripeAccountCreatedAt: int("stripeAccountCreatedAt").notNull(),
	stripeAccountExpiresAt: int("stripeAccountExpiresAt").notNull(),
	detailsSubmitted: tinyint("detailsSubmitted").default(0).notNull(),
	createdAt: timestamp("createdAt", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
},
(table) => {
	return {
		paymentsId: primaryKey(table.id)
	}
});

export const products = mysqlTable("products", {
	id: serial("id").notNull(),
	name: varchar("name", { length: 191 }).notNull(),
	description: text("description"),
	images: json("images").default('null'),
	category: mysqlEnum("category", ['skateboards','clothing','shoes','accessories']).default('skateboards').notNull(),
	subcategory: varchar("subcategory", { length: 191 }),
	price: decimal("price", { precision: 10, scale: 2 }).default('0.00').notNull(),
	inventory: int("inventory").default(0).notNull(),
	rating: int("rating").default(0).notNull(),
	tags: json("tags").default('null'),
	storeId: int("storeId").notNull(),
	createdAt: timestamp("createdAt", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
},
(table) => {
	return {
		productsId: primaryKey(table.id)
	}
});

export const resources = mysqlTable("resources", {
	id: serial("id").notNull(),
	name: varchar("name", { length: 191 }).notNull(),
	description: text("description"),
	images: json("images").default('null'),
	category: mysqlEnum("category", ['skateboards','clothing','shoes','accessories']).default('skateboards').notNull(),
	subcategory: varchar("subcategory", { length: 191 }),
	sizes: json("sizes").default('null'),
	colors: json("colors").default('null'),
	printAreas: mysqlEnum("printAreas", ['Alloverprint','Backside','Frontside','Backendfront','Sleeveleft','Sleeveright']).default('Frontside').notNull(),
	price: decimal("price", { precision: 10, scale: 2 }).default('0.00').notNull(),
	inventory: int("inventory").default(0).notNull(),
	rating: int("rating").default(0).notNull(),
	tags: json("tags").default('null'),
	supplierId: int("supplierId").notNull(),
	createdAt: timestamp("createdAt", { mode: 'string' }).defaultNow(),
},
(table) => {
	return {
		resourcesId: primaryKey(table.id)
	}
});

export const stores = mysqlTable("stores", {
	id: serial("id").notNull(),
	userId: varchar("userId", { length: 191 }).notNull(),
	name: varchar("name", { length: 191 }).notNull(),
	description: text("description"),
	slug: text("slug"),
	createdAt: timestamp("createdAt", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	active: tinyint("active").default(1).notNull(),
	stripeAccountId: varchar("stripeAccountId", { length: 191 }),
},
(table) => {
	return {
		storesId: primaryKey(table.id)
	}
});

export const suppliers = mysqlTable("suppliers", {
	id: serial("id").notNull(),
	userId: varchar("userId", { length: 191 }).notNull(),
	name: varchar("name", { length: 191 }).notNull(),
	description: text("description"),
	slug: text("slug"),
	active: tinyint("active").default(1).notNull(),
	stripeAccountId: varchar("stripeAccountId", { length: 191 }),
	createdAt: timestamp("createdAt", { mode: 'string' }).defaultNow(),
},
(table) => {
	return {
		suppliersId: primaryKey(table.id)
	}
});