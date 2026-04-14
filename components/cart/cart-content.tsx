import { getCart } from "@/lib/data/cart.api"
import CartEmpty from "@/components/cart/cart-empty"
import CartItem from "@/components/cart/cart-item"
import CartSummary from "@/components/cart/cart-summary"

export default async function CartContent() {
  const cart = await getCart()

  if (!cart || cart.items.length === 0) return <CartEmpty />

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
