/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable react/jsx-no-undef */
"use client"

import * as React from "react"
import Link from "next/link"
import type { MainNavItem } from "@/types"
import { db } from "@/db"
import { Category, category } from "@/db/schema"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Icons } from "@/components/icons"
import { getCategoryAction } from "@/app/_actions/category"

interface MainNavProps {
  items?: MainNavItem[]
  
}

export function MainNav({ items }: MainNavProps) {
  const [categoryItems, setCategoryItems] = React.useState<Category[]>([{
    id: 4,
    name: "Phan Trí Dũng",
    desc: "ádasdas",
    image: "category/64c67612169dd-1690727954/image 10.png",
    tags: JSON.parse("[{\"value\":\"ádasdas\"}]".replace(/\\"/g, '"')),
    createdAt: null
}]);

  React.useEffect(() => {
    async function fetchCategoryData() {
      try {
        const categoryTransaction = await getCategoryAction({
          limit: 10,
          offset: 1,
        });
        setCategoryItems(categoryTransaction.items);
      } catch (error) {
        console.error("Error fetching category data:", error);
      }
    }

    fetchCategoryData();
  }, []);
  console.log(categoryItems)

  return (
    <div className="hidden gap-6 lg:flex">
      <Link
        aria-label="Home"
        href="/"
        className="hidden items-center space-x-2 lg:flex"
      >
        <Icons.logo className="h-6 w-6" aria-hidden="true" />
        <span className="hidden font-bold lg:inline-block">
          {siteConfig.name}
        </span>
      </Link>
      <NavigationMenu>
        <NavigationMenuList>
          {items?.[0]?.items ? (
            <Link href={String(items?.[0].href)}>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="h-auto" autoFocus={false}>
                  {items[0].title}
                </NavigationMenuTrigger>
              </NavigationMenuItem>
            </Link>
          ) : null}
          {items
            ?.filter((item) => item.title !== items[0]?.title)
            .map((item) =>
              item?.items ? (
                <Link key={item.title} href={item?.href ? item.href : ''}>
                  <NavigationMenuItem key={item.title}>
                    <NavigationMenuTrigger className="h-auto capitalize" autoFocus={item?.items?.length > 1}>
                      {item.title}
                    </NavigationMenuTrigger>
                    {item.items.length > 0 && (
                      <NavigationMenuContent>
                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                          {categoryItems.map((item) => (
                            <ListItem
                              key={item.name}
                              title={item.name}
                              href={'/products'}
                            >
                              {item.desc}
                            </ListItem>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    )}
                  </NavigationMenuItem>
                </Link>
              ) : (
                item.href && (
                  <NavigationMenuItem key={item.title}>
                    <Link href={item.href} legacyBehavior passHref>
                      <NavigationMenuLink
                        className={cn(navigationMenuTriggerStyle(), "h-auto")}
                      >
                        {item.title}
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                )
              )
            )}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, href, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          ref={ref}
          href={String(href)}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
