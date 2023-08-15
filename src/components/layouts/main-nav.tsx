/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable react/jsx-no-undef */
"use client"

import * as React from "react"
import Link from "next/link"
import type { MainNavItem } from "@/types"
import { type Subcategory, type Category } from "@/db/schema"
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
import { getSubCategoryAction } from "@/app/_actions/subcategory"

interface MainNavProps {
  items?: MainNavItem[]
}

export function MainNav({ items }: MainNavProps) {
  const [categoryItems, setCategoryItems] = React.useState<Category[]>([]);
  const [subcategoryItems, setSubcategoryItems] = React.useState<Subcategory[]>([]);

  React.useEffect(() => {
    async function fetchCategoryData() {
      try {
        const categoryTransaction = await getCategoryAction({
          limit: 10,
          offset: 0,
        });
        setCategoryItems(categoryTransaction.items);

      } catch (error) {
        console.error("Error fetching category data:", error);
      }
    }

    async function fetchSubCategoryData() {
      try {
        const subcategoryTransaction = await getSubCategoryAction({
          limit: 10,
          offset: 0,
        });
        setSubcategoryItems(subcategoryTransaction.items);
        console.log(subcategoryTransaction);
      } catch (error) {
        console.error("Error fetching category data:", error);
      }
    }
    fetchSubCategoryData();
    fetchCategoryData();
  }, []);

  

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
                    <Link href={item.title as string} >
                      <NavigationMenuTrigger className="h-auto capitalize" autoFocus={item?.items?.length > 1}>
                        {item.title}
                      </NavigationMenuTrigger>
                    </Link>
                    {item.items.length > 0 ? (
                      <NavigationMenuContent>
                        <ul className="flex flex-row gap-3 p-4">
                          {categoryItems.map((itemChild: { name: React.Key | null | undefined; id: number | null }) => (
                            <ListItem
                              key={itemChild.name}
                              title={itemChild.name as string}
                              href={item.title === 'resource' ? `/resources?categories=${itemChild.name}` : `/products?categories=${itemChild.name}`}
                            >
                              {item.desc}
                              <div className="flex flex-col pl-[20] text-sm leading-snug text-muted-foreground">
                                {subcategoryItems
                                .filter((subItem) => subItem.category === itemChild.id)
                                .map((itemSubcategoryChild) => (
                                  <Link 
                                    href={item.title === 'resource' ? `/resources?categories=${itemChild.name}?subcategory=${itemSubcategoryChild.slug}` 
                                    : `/products?categories=${itemChild.name}?subcategory=${itemSubcategoryChild.slug}`} 
                                    key={itemSubcategoryChild.id} 
                                    className="rounded-[5px] p-[10px] hover:bg-gray-200">
                                    {itemSubcategoryChild.name}
                                  </Link>
                                ))}
                              </div>
                            </ListItem>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    ):(<></>)}
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
        <>
        <Link
          ref={ref}
          href={String(href)}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none line-clamp-1 min-w-[200px]">{title}</div>
        </Link>
        {children}
        </>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
