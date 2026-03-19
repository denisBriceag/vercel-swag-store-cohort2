import { Button } from "@/components/ui/button"
import { House, Menu, Search, X } from "lucide-react"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { VisuallyHidden } from "radix-ui"
import { JSX } from "react"
import { cn } from "@/utils/utils"
import Link from "next/link"

type MobileMenuItemProps = {
  icon?: JSX.Element
  label: string
  className?: string
}

function MobileMenuItem({ icon, label, className }: MobileMenuItemProps) {
  return (
    <li
      className={cn(
        "flex h-10.5 cursor-pointer items-center justify-between gap-2.5 rounded-lg px-3 py-2.5 text-sm transition-colors duration-100 outline-none hover:bg-muted focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 [a]:transition-colors",
        className
      )}
    >
      <span>{label}</span>

      {icon}
    </li>
  )
}

export default function MobileMenu() {
  return (
    <Drawer direction="left">
      <DrawerTrigger asChild className="block md:hidden">
        <Button variant="ghost" size="icon" aria-label="Open menu">
          <Menu />
        </Button>
      </DrawerTrigger>

      <DrawerContent aria-describedby="mobile-menu-content">
        <DrawerHeader className="flex items-end justify-end">
          <VisuallyHidden.Root>
            <DrawerTitle>Store menu</DrawerTitle>

            <DrawerDescription>
              Mobile representation of store menu
            </DrawerDescription>
          </VisuallyHidden.Root>

          <DrawerTrigger asChild>
            <Button variant="ghost" size="icon" aria-label="Close menu">
              <X />
            </Button>
          </DrawerTrigger>
        </DrawerHeader>

        <ul id="mobile-menu-content" className="w-full list-none pr-6 pl-4">
          <DrawerTrigger asChild>
            <Link href="/">
              <MobileMenuItem label="Home" icon={<House />} />
            </Link>
          </DrawerTrigger>

          <DrawerTrigger asChild>
            <Link href="/search">
              <MobileMenuItem label="Search" icon={<Search />} />
            </Link>
          </DrawerTrigger>
        </ul>
      </DrawerContent>
    </Drawer>
  )
}
