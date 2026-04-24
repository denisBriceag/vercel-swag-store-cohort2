"use client"

import { useActionState, useEffect, useOptimistic, useTransition } from "react"

import Image from "next/image"
import Link from "next/link"

import { Loader2, Minus, Plus, Trash2 } from "lucide-react"

import { toast } from "sonner"

import { Button } from "@/components/ui/button"

import { CartItemWithProduct } from "@/types/cart/cart-item-product"

import { pricePipe } from "@/utils/price"

import {
  removeFromCartAction,
  updateQuantityAction,
} from "@/lib/actions/cart-actions"

type CartItemProps = {
  item: CartItemWithProduct
}

export default function CartItem({ item }: CartItemProps) {
  const [isPending, startTransition] = useTransition()

  const { product, quantity, lineTotal } = item

  const [optimisticQuantity, setOptimisticQuantity] = useOptimistic(quantity)
  const [removeState, removeFormAction, isRemovePending] = useActionState(
    () => removeFromCartAction(product.id),
    { success: false }
  )

  const isAnyPending = isPending || isRemovePending

  useEffect(() => {
    if (removeState.sessionExpired) {
      toast.warning("Your cart session has expired.")
    } else if (!removeState.success && removeState.error) {
      toast.error(removeState.error)
    }
  }, [removeState])

  function handleQuantityChange(delta: number) {
    const newQuantity = optimisticQuantity + delta

    if (newQuantity < 1) return

    startTransition(async () => {
      setOptimisticQuantity(newQuantity)

      const result = await updateQuantityAction(product.id, newQuantity)

      if (result.sessionExpired) {
        toast.warning("Your cart session has expired.")
      } else if (!result.success) {
        toast.error(result.error ?? "Failed to update quantity.")
      }
    })
  }

  return (
    <li
      className={`flex gap-4 py-5 transition-opacity ${isAnyPending ? "pointer-events-none opacity-50" : ""}`}
    >
      <Link
        href={`/products/${product.slug}`}
        className="relative size-20 shrink-0 overflow-hidden rounded-lg border border-border bg-muted sm:size-24"
        tabIndex={isAnyPending ? -1 : undefined}
      >
        {product.images[0] ? (
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="96px"
            className="object-cover"
          />
        ) : null}
      </Link>

      <div className="flex flex-1 flex-col justify-between gap-2">
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-col gap-0.5">
            <Link
              href={`/products/${product.slug}`}
              className="line-clamp-2 text-sm font-medium text-foreground transition-colors hover:text-foreground/70"
              tabIndex={isAnyPending ? -1 : undefined}
            >
              {product.name}
            </Link>

            <span className="text-xs text-muted-foreground capitalize">
              {product.category}
            </span>
          </div>

          <form action={removeFormAction}>
            <Button
              type="submit"
              variant="ghost"
              size="icon"
              className="size-7 shrink-0 text-muted-foreground hover:text-destructive"
              aria-label={`Remove ${product.name}`}
              disabled={isAnyPending}
            >
              {isRemovePending ? (
                <Loader2 className="size-3.5 animate-spin" />
              ) : (
                <Trash2 className="size-3.5" />
              )}
            </Button>
          </form>
        </div>

        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <Button
              variant="outline"
              size="icon"
              className="size-7"
              onClick={() => handleQuantityChange(-1)}
              disabled={isAnyPending || optimisticQuantity <= 1}
              aria-label="Decrease quantity"
            >
              <Minus className="size-3" />
            </Button>

            <span className="w-7 text-center text-sm font-medium tabular-nums">
              {optimisticQuantity}
            </span>

            <Button
              variant="outline"
              size="icon"
              className="size-7"
              onClick={() => handleQuantityChange(1)}
              disabled={isAnyPending}
              aria-label="Increase quantity"
            >
              <Plus className="size-3" />
            </Button>
          </div>

          <span className="text-sm font-medium text-foreground tabular-nums">
            {pricePipe(lineTotal)}
          </span>
        </div>
      </div>
    </li>
  )
}
