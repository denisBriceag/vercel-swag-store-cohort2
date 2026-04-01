import { getCart } from "@/lib/api/cart.api"
import { getCartToken } from "@/lib/cart/cart-token"

export default async function CartCount() {
  const token = await getCartToken()

  if (!token) return null

  try {
    const { data: cart } = await getCart()

    if (cart.totalItems === 0) return null

    return (
      <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-foreground px-1 text-[10px] leading-none font-semibold text-background tabular-nums">
        {cart.totalItems > 99 ? "99+" : cart.totalItems}
      </span>
    )
  } catch {
    return null
  }
}
