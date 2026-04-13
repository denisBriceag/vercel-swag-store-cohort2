import { Suspense } from "react"

import { Metadata } from "next"

import CartSkeleton from "@/components/cart/cart-skeleton"
import CartContent from "@/components/cart/cart-content"

export const metadata: Metadata = {
  title: "Cart",
  robots: { index: false },
}

export default function CartPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="mb-8 text-2xl font-bold tracking-tight text-foreground">
        Cart
      </h1>

      <Suspense fallback={<CartSkeleton />}>
        <CartContent />
      </Suspense>
    </div>
  )
}
