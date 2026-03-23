import { Suspense } from "react"
import { Metadata } from "next"

import { getCart } from "@/lib/api/cart.api"
import { getCartToken } from "@/lib/cart/cart-token"
import { ApiHttpError } from "@/types/server-error"
import CartItem from "./components/cart-item"
import CartSummary from "./components/cart-summary"
import CartEmpty from "./components/cart-empty"

export const metadata: Metadata = {
  title: "Cart",
  robots: { index: false },
}

async function CartPageContent() {
  const token = await getCartToken()

  if (!token) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="mb-8 text-2xl font-bold tracking-tight text-foreground">
          Cart
        </h1>
        <CartEmpty />
      </div>
    )
  }

  let cart

  try {
    const response = await getCart()

    cart = response.data
  } catch (error) {
    if (error instanceof ApiHttpError) {
      return (
        <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
          <h1 className="mb-8 text-2xl font-bold tracking-tight text-foreground">
            Cart
          </h1>
          <CartEmpty />
        </div>
      )
    }

    throw error
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="mb-8 text-2xl font-bold tracking-tight text-foreground">
        Cart
      </h1>

      {cart.items.length === 0 ? (
        <CartEmpty />
      ) : (
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
      )}
    </div>
  )
}

export default function CartPage() {
  return (
    <Suspense>
      <CartPageContent />
    </Suspense>
  )
}
