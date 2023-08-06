/* eslint-disable react/no-unescaped-entities */
"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { type Product } from "@/db/schema"
import { toast } from "sonner"

import { cn, formatPrice } from "@/lib/utils"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Icons } from "@/components/icons"
import { addToCartAction } from "@/app/_actions/cart"

interface ProductCardProps extends React.HTMLAttributes<HTMLDivElement> {
  product: Product
  tag: string
  variant?: "default" | "switchable"
  isAddedToCart?: boolean
  onSwitch?: () => Promise<void>
}

export function ProductCard({
  product,
  tag,
  variant = "default",
  isAddedToCart = false,
  onSwitch,
  className,
  ...props
}: ProductCardProps) {
  const [isPending, startTransition] = React.useTransition()

  return (
    <Card
      className={cn("h-full overflow-hidden rounded-sm", className)}
      {...props}
    >
      <Link
        aria-label={`View ${product.name} details`}
        href={`/product/${product.id}`}
      >
        <CardHeader className="border-b p-0">
          <AspectRatio ratio={4 / 3}>
            {tag !== '' && (
              <div className="absolute left-[10px] top-[10px] 
              z-10 h-[30px] w-[100px] items-center rounded-[3px] 
              border-[2px] border-[#C3862C] bg-[#F9F7D7]">
                
                  <p className="my-auto text-center font-bold text-[#C3862C]">{tag}</p>
              </div>
            )}
            {product?.images?.length ? (
              <Image
                src={
                  product.images[0]?.url ?? "/images/product-placeholder.webp"
                }
                alt={product.images[0]?.name ?? product.name}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                fill
                className="object-cover"
                loading="lazy"
              />
            ) : (
              <div
                aria-label="Placeholder"
                role="img"
                aria-roledescription="placeholder"
                className="flex h-full w-full items-center justify-center bg-secondary"
              >
                <Icons.placeholder
                  className="h-9 w-9 text-muted-foreground"
                  aria-hidden="true"
                />
              </div>
            )}
          </AspectRatio>
        </CardHeader>
      </Link>
      <Link
        aria-label={`View ${product.name} details`}
        href={`/product/${product.id}`}
      >
        <CardContent className="grid gap-2.5 p-4">
          <CardTitle className="line-clamp-1">{product.name}</CardTitle>
          <CardDescription className="flex flex-row">
            <span>By Gildan</span>
            <span className="pl-[5px]">5000</span>
          </CardDescription>
          <CardTitle className="mt-[10px] line-clamp-1">From USD {formatPrice(product.price).replace(".00", "")}</CardTitle>
          <CardDescription className="flex flex-row">
            <span>From USD {formatPrice(Number(product.price) - Number(product.price) / 100 * 20).replace(".00", "")} with Wearify Premium</span>
          </CardDescription>
          <CardDescription className="mt-[10px] flex flex-row">
            <span>8 Size</span>
            <span className="pl-[5px]">70 colors</span>
            <span className="pl-[5px]">22 print provider</span>
          </CardDescription>
        </CardContent>
      </Link>
      <CardFooter className="p-4">
        {variant === "default" ? (
          <div className="flex w-full flex-col items-center gap-2 sm:flex-row sm:justify-between">
            <Link
              aria-label="Preview product"
              href={`/product-preview/${product.id}`}
              className={buttonVariants({
                variant: "outline",
                size: "sm",
                className: "h-8 w-full rounded-sm",
              })}
            >
              Preview
            </Link>
            <Button
              aria-label="Add to cart"
              size="sm"
              className="h-8 w-full rounded-sm"
              onClick={() => {
                startTransition(async () => {
                  try {
                    await addToCartAction({
                      productId: product.id,
                      quantity: 1,
                    })
                    toast.success("Added to cart.")
                  } catch (error) {
                    error instanceof Error
                      ? toast.error(error.message)
                      : toast.error("Something went wrong, please try again.")
                  }
                })
              }}
              disabled={isPending}
            >
              {isPending && (
                <Icons.spinner
                  className="mr-2 h-4 w-4 animate-spin"
                  aria-hidden="true"
                />
              )}
              Add to cart
            </Button>
          </div>
        ) : (
          <Button
            aria-label={isAddedToCart ? "Remove from cart" : "Add to cart"}
            size="sm"
            className="h-8 w-full rounded-sm"
            onClick={() => {
              startTransition(async () => {
                await onSwitch?.()
              })
            }}
            disabled={isPending}
          >
            {isPending ? (
              <Icons.spinner
                className="mr-2 h-4 w-4 animate-spin"
                aria-hidden="true"
              />
            ) : isAddedToCart ? (
              <Icons.check className="mr-2 h-4 w-4" aria-hidden="true" />
            ) : (
              <Icons.add className="mr-2 h-4 w-4" aria-hidden="true" />
            )}
            {isAddedToCart ? "Added" : "Add to cart"}
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
