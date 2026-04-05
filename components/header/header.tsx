import { Suspense } from "react"

import Link from "next/link"

import { ShoppingCart } from "lucide-react"

import Navigation from "@/components/header/navigation"
import Logo from "@/components/header/logo"
import Promo from "@/components/header/promo"
import MobileMenu from "@/components/header/mobile-menu"
import CartCount from "@/components/header/cart-count"
import { Button } from "@/components/ui/button"

export default function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-10 flex h-(--header-height) flex-col justify-center border-b border-sidebar-border bg-background">
      <div className="flex h-20 items-center justify-between gap-8 bg-background px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <MobileMenu />

          <Link href="/">
            <Logo />
          </Link>

          <Navigation />
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="relative"
          aria-label="Shopping cart"
          asChild
        >
          <Link href="/cart">
            <ShoppingCart className="size-5" />

            <span className="absolute -top-0.5 -right-0.5">
              <Suspense fallback={null}>
                <CartCount />
              </Suspense>
            </span>
          </Link>
        </Button>
      </div>

      <Suspense
        fallback={
          <aside className="h-10 w-full animate-pulse overflow-hidden bg-muted"></aside>
        }
      >
        <Promo />
      </Suspense>
    </header>
  )
}
