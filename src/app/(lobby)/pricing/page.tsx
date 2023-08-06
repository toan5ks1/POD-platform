/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { type Metadata } from "next"
import { cn, formatDate, formatPrice } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import { env } from "@/env.mjs"
import { allPosts } from "contentlayer/generated"
import dayjs from "dayjs"
import { buttonVariants } from "@/components/ui/button"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { ManageStoreSubscriptionForm } from "@/components/forms/manage-store-subscription-form"
import { Separator } from "@/components/ui/separator"
import { Header } from "@/components/header"
import { Icons } from "@/components/icons"
import { Shell } from "@/components/shells/shell"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { currentUser } from "@clerk/nextjs"
import { redirect } from "next/navigation"
import { getUserSubscriptionPlan } from "@/lib/subscription"
import { storeSubscriptionPlans } from "@/config/subscriptions"

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Pricing",
  description: "Explore the latest news and updates from the community",
}

export default async function BlogPage() {
  const user = await currentUser()

  if (!user) {
    redirect("/signin")
  }

  const email =
    user.emailAddresses?.find((e) => e.id === user.primaryEmailAddressId)
      ?.emailAddress ?? ""

  const subscriptionPlan = await getUserSubscriptionPlan(user.id)
  const posts = allPosts
    .filter((post) => post.published)
    .sort((a, b) => dayjs(b.date).unix() - dayjs(a.date).unix())

  return (
    <Shell className="md:pb-10">
      <section
      id="banner-pricing">
        <div className="grid grid-cols-2">
          <div className="px-[60px]">
            <h1 className="text-[40px] font-bold">Choose the right plan for your business</h1>
            <h2 className="py-3 text-[24px] font-bold">Printify helps merchants make more money with less effort.</h2>
            <p>Regardless if you’re just starting out or if you’re a fast growing and established business or an enterprise, we’ve got you covered. Choose the pricing plan that suits your needs the best!</p>
          </div>
          <div className="">
            <Image
              src="/images/auth-layout.webp"
              alt="A skateboarder doing a high drop"
              width={600}
              height={200}
              className="h-[345px] rounded-[25px] object-cover"
            />
          </div>
        </div>
      </section>
      <section
        id="subscription-plans"
        aria-labelledby="subscription-plans-heading"
        className="space-y-5 pb-2.5"
      >
        <h2 className="text-xl font-semibold sm:text-2xl">
          Subscription plans
        </h2>
        <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {storeSubscriptionPlans.map((plan, i) => (
            <Card
              key={plan.name}
              className={cn(
                "flex flex-col",
                i === storeSubscriptionPlans.length - 1 &&
                  "lg:col-span-2 xl:col-span-1"
              )}
            >
              <CardHeader>
                <CardTitle className="line-clamp-1">{plan.name}</CardTitle>
                <CardDescription className="line-clamp-2">
                  {plan.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="grid flex-1 place-items-start gap-6">
                <div className="text-3xl font-bold">
                  {formatPrice(plan.price, "USD", "compact")}
                  <span className="text-sm font-normal text-muted-foreground">
                    /month
                  </span>
                </div>
                <div className="space-y-2 text-sm text-muted-foreground">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2">
                      <Icons.check className="h-4 w-4" aria-hidden="true" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="pt-4">
                {plan.id === "basic" ? (
                  <Link href="/dashboard/stores" className="w-full">
                    <div
                      className={cn(
                        buttonVariants({
                          className: "w-full",
                        })
                      )}
                    >
                      Manage Stores
                      <span className="sr-only">Manage Stores</span>
                    </div>
                  </Link>
                ) : (
                  <ManageStoreSubscriptionForm
                    userId={user.id}
                    email={email}
                    stripePriceId={plan.stripePriceId}
                    stripeCustomerId={subscriptionPlan?.stripeCustomerId}
                    stripeSubscriptionId={
                      subscriptionPlan?.stripeSubscriptionId
                    }
                    isSubscribed={subscriptionPlan.isSubscribed}
                    isCurrentPlan={subscriptionPlan?.name === plan.name}
                  />
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </Shell>
  )
}
