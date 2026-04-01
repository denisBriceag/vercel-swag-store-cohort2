import { Suspense } from "react"
import { Metadata } from "next"

import { getCart } from "@/lib/api/cart.api"
import { getCartToken } from "@/lib/cart/cart-token"
import { ApiHttpError } from "@/types/server-error"

import CartEmpty from "@/components/cart/cart-empty"
import CartItem from "@/components/cart/cart-item"
import CartSummary from "@/components/cart/cart-summary"
import CartSkeleton from "@/components/cart/cart-skeleton"

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

async function CartContent() {
  const token = await getCartToken()

  if (!token) return <CartEmpty />

  let cart

  try {
    const response = await getCart()

    cart = response.data
  } catch (error) {
    if (error instanceof ApiHttpError) {
      return <CartEmpty />
    }
    throw error
  }

  if (cart.items.length === 0) return <CartEmpty />

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
      <section className="lg:col-span-2">
        <ul className="divide-y divide-border">
          {cart.items.map((item) => (
            <CartItem key={item.productId} item={item} />
          ))}
        </ul>
      </section>

      <aside className="lg:col-span-1">
        <div className="lg:sticky lg:top-[calc(var(--header-height)+2rem)]">
          <CartSummary cart={cart} />
        </div>
      </aside>
    </div>
  )
}
