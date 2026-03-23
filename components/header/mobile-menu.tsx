import { ComponentType } from "react"
import Link from "next/link"

import { House, Menu, MoveRight, Search, X } from "lucide-react"

import { VisuallyHidden } from "radix-ui"

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import Logo from "@/components/header/logo"

type NavItem = {
  href: string
  label: string
  icon: ComponentType<{ className?: string }>
}

const NAV_ITEMS: NavItem[] = [
  { href: "/", label: "Home", icon: House },
  { href: "/search", label: "Search", icon: Search },
]

export default function MobileMenu() {
  return (
    <Drawer direction="left">
      <DrawerTrigger asChild className="block md:hidden">
        <Button variant="ghost" size="icon" aria-label="Open menu">
          <Menu />
        </Button>
      </DrawerTrigger>

      <DrawerContent>
        <VisuallyHidden.Root>
          <DrawerTitle>Store menu</DrawerTitle>
          <DrawerDescription>
            Mobile representation of store menu
          </DrawerDescription>
        </VisuallyHidden.Root>

        <DrawerHeader className="flex flex-row items-center justify-between border-b border-border px-4 py-3">
          <Link href="/">
            <Logo />
          </Link>

          <DrawerTrigger asChild>
            <Button variant="ghost" size="icon" aria-label="Close menu">
              <X className="size-4" />
            </Button>
          </DrawerTrigger>
        </DrawerHeader>

        <div className="flex flex-col gap-1 px-3 py-4">
          <p className="px-3 pb-1 text-xs font-medium tracking-widest text-muted-foreground uppercase">
            Navigation
          </p>

          <ul className="flex flex-col">
            {NAV_ITEMS.map(({ href, label, icon: Icon }) => (
              <li key={href}>
                <DrawerTrigger asChild>
                  <Link
                    href={href}
                    className="flex items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                  >
                    <span className="flex items-center gap-3">
                      <span className="text-muted-foreground">
                        <Icon className="size-4" />
                      </span>
                      {label}
                    </span>

                    <MoveRight className="size-3.5 text-muted-foreground" />
                  </Link>
                </DrawerTrigger>
              </li>
            ))}
          </ul>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
