"use client"

import { useState, useTransition } from "react"

import { Loader2, Minus, Plus, ShoppingCart } from "lucide-react"
import { toast } from "sonner"

import { StockInfo } from "@/types/stock/stock-info"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { addToCartAction } from "@/lib/actions/cart-actions"

type ProductActionsProps = {
  productId: string
  stockInfo: StockInfo | null
}

export default function ProductActions({
  productId,
  stockInfo,
}: ProductActionsProps) {
  const canBuy = stockInfo !== null && stockInfo.inStock && stockInfo.stock > 0
  const maxQty = stockInfo?.stock ?? 1

  const [quantity, setQuantity] = useState(1)
  const [isPending, startTransition] = useTransition()

  function increment() {
    setQuantity((q) => Math.min(q + 1, maxQty))
  }

  function decrement() {
    setQuantity((q) => Math.max(q - 1, 1))
  }

  function handleAddToCart() {
    startTransition(async () => {
      const result = await addToCartAction(productId, quantity)

      if (result.sessionExpired) {
        toast.warning("Cart session expired. A new cart was created for you.")
      }
    })
  }

  return (
    <div className="flex flex-col gap-4">
      {canBuy && (
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground">Quantity</span>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="size-8"
              onClick={decrement}
              disabled={isPending || quantity <= 1}
              aria-label="Decrease quantity"
            >
              <Minus className="size-3" />
            </Button>

            <span className="w-8 text-center text-sm font-medium tabular-nums">
              {quantity}
            </span>

            <Button
              variant="outline"
              size="icon"
              className="size-8"
              onClick={increment}
              disabled={isPending || quantity >= maxQty}
              aria-label="Increase quantity"
            >
              <Plus className="size-3" />
            </Button>

            <span className="text-xs text-muted-foreground">
              / {maxQty} available
            </span>
          </div>
        </div>
      )}

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <span className="w-full sm:w-fit" tabIndex={!canBuy ? 0 : -1}>
              <Button
                className="w-full gap-2 sm:w-auto"
                disabled={!canBuy || isPending}
                onClick={handleAddToCart}
              >
                {isPending ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <ShoppingCart className="size-4" />
                )}

                {isPending ? "Adding..." : "Add to Cart"}
              </Button>
            </span>
          </TooltipTrigger>

          {!canBuy && (
            <TooltipContent>
              <p>Product is currently not available for purchase</p>
            </TooltipContent>
          )}
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}
