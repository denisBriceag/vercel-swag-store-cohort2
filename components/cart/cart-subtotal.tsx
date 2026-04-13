import { getCart } from "@/lib/data/cart.api"
import { pricePipe } from "@/utils/price"

type CartSubtotalProps = Partial<{
  totalItems: boolean
  totalPrice: boolean
}>

export default async function CartSubtotal({
  totalItems,
  totalPrice,
}: CartSubtotalProps) {
  const cart = await getCart()

  if (!cart || cart.items.length === 0) return 0

  if (totalItems)
    return (
      <>
        ({cart.totalItems} {cart.totalItems === 1 ? "item" : "items"})
      </>
    )
  else if (totalPrice) return <>{pricePipe(cart.subtotal)}</>
  else return null
}
