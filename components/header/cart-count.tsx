import { getCart } from "@/lib/data/cart.api"

export default async function CartCount() {
  const cart = await getCart()

  if (!cart || cart.totalItems === 0) return null

  return (
    <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-foreground px-1 text-[10px] leading-none font-semibold text-background tabular-nums">
      {cart.totalItems > 99 ? "99+" : cart.totalItems}
    </span>
  )
}
