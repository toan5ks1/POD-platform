
## Tech Stack

- [Next.js](https://nextjs.org)
- [Tailwind CSS](https://tailwindcss.com)
- [Clerk Auth](https://clerk.dev)
- [Drizzle ORM](https://orm.drizzle.team)
- [React Email](https://react.email)
- [Contentlayer](https://www.contentlayer.dev)
- [uploadthing](https://uploadthing.com)
- [Stripe](https://stripe.com)

## Features to be implemented

- [x] Authentication with **Clerk**
- [x] File uploads with **uploadthing**
- [x] Newsletter subscription with **React Email** and **Resend**
- [x] Blog using **MDX** and **Contentlayer**
- [x] ORM using **Drizzle ORM**
- [x] Database on **PlanetScale**
- [x] Validation with **Zod**
- [x] Storefront with products, categories, and subcategories
- [x] Seller and customer workflows
- [x] User subscriptions with **Stripe**
- [ ] Checkout with **Stripe Checkout**
- [ ] Admin dashboard with stores, products, orders, subscriptions, and payments

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/sadmann7/skateshop
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Create a `.env` file

Create a `.env` file in the root directory and add the environment variables as shown in the `.env.example` file.

### 4. Run the application

```bash
pnpm run dev
```

### 5. Push database

```bash
pnpm run db:push
```

### 6. Listen for stripe events

```bash
pnpm run stripe:listen
```
