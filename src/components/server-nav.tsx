/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/no-unescaped-entities */
"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { type Category } from "@/db/schema"
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
import { db } from "@/db"

interface CategoryNavProps extends React.HTMLAttributes<HTMLDivElement> {
  category: Category
}

export function CategoryItem({
  category,
}: CategoryNavProps) {
  const [isPending, startTransition] = React.useTransition()
  // const allCategory = await db
  //   .select()
  //   .from(category)
  //   .limit(8)

  return (
    <div>aksdjlhadjksasd</div>
  )
}
