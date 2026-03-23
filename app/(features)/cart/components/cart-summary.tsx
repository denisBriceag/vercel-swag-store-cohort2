import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { CartWithProducts } from "@/types/cart/cart-products"
import { pricePipe } from "@/utils/price"

type CartSummaryProps = {
  cart: CartWithProducts
}

export default function CartSummary({ cart }: CartSummaryProps) {
  const subtotal = pricePipe(Number(cart.subtotal))

  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <h2 className="mb-4 text-sm font-semibold text-foreground">
        Order summary
      </h2>

      <div className="flex flex-col gap-3 border-b border-border pb-4 text-sm">
        <div className="flex items-center justify-between gap-4">
          <span className="text-muted-foreground">
            Subtotal ({cart.totalItems} {cart.totalItems === 1 ? "item" : "items"})
          </span>
          <span className="tabular-nums text-foreground">{subtotal}</span>
        </div>

        <div className="flex items-center justify-between gap-4">
          <span className="text-muted-foreground">Shipping</span>
          <span className="text-muted-foreground">Calculated at checkout</span>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 pt-4 text-sm">
        <span className="font-medium text-foreground">Total</span>
        <span className="font-semibold tabular-nums text-foreground">
          {subtotal}
        </span>
      </div>

      <Button className="mt-6 w-full gap-2" size="lg">
        Checkout
        <ArrowRight className="size-4" />
      </Button>

      <p className="mt-3 text-center text-xs text-muted-foreground">
        Taxes calculated at checkout
      </p>
    </div>
  )
}
