import { getCart } from "@/lib/data/cart.api"
import CartEmpty from "@/components/cart/cart-empty"
import CartItem from "@/components/cart/cart-item"

export default async function CartItems() {
  const cart = await getCart()

  if (!cart) return <CartEmpty />

  return (
    <ul className="divide-y divide-border">
      {cart.items.map((item) => (
        <CartItem key={item.productId} item={item} />
      ))}
    </ul>
  )
}
