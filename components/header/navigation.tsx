"use client"

import Link from "next/link"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

import { usePathname } from "next/navigation"

import { cn } from "@/utils/utils"

function activeLink(path: string, pathName: string) {
  return path === pathName ? "text-primary" : ""
}

export default function Navigation() {
  const path = usePathname()

  return (
    <NavigationMenu className="hidden md:block">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink
            asChild
            className={cn(navigationMenuTriggerStyle(), activeLink("/", path))}
          >
            <Link href="/">Home</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink
            asChild
            className={cn(
              navigationMenuTriggerStyle(),
              activeLink("/search", path)
            )}
          >
            <Link href="/search">Search</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
