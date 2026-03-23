import { getCartCount } from "@/lib/cart/cart-count"

export default async function CartCount() {
  const count = await getCartCount()

  if (count === 0) return null

  return (
    <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-foreground px-1 text-[10px] leading-none font-semibold text-background tabular-nums">
      {count > 99 ? "99+" : count}
    </span>
  )
}
