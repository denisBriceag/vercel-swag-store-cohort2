"use client"

import { useOptimistic, useTransition } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Loader2, Minus, Plus, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { CartItemWithProduct } from "@/types/cart/cart-item-product"
import { pricePipe } from "@/utils/price"
import { removeFromCartAction, updateQuantityAction } from "../actions"

type CartItemProps = {
  item: CartItemWithProduct
}

export default function CartItem({ item }: CartItemProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const { product, quantity, lineTotal } = item

  const [optimisticQuantity, setOptimisticQuantity] = useOptimistic(quantity)

  function handleDecrement() {
    if (optimisticQuantity <= 1) return

    startTransition(async () => {
      setOptimisticQuantity(optimisticQuantity - 1)

      await updateQuantityAction(product.id, optimisticQuantity - 1)

      router.refresh()
    })
  }

  function handleIncrement() {
    startTransition(async () => {
      setOptimisticQuantity(optimisticQuantity + 1)

      await updateQuantityAction(product.id, optimisticQuantity + 1)

      router.refresh()
    })
  }

  function handleRemove() {
    startTransition(async () => {
      await removeFromCartAction(product.id)

      router.refresh()
    })
  }

  return (
    <li
      className={`flex gap-4 py-5 transition-opacity ${isPending ? "pointer-events-none opacity-50" : ""}`}
    >
      <Link
        href={`/products/${product.slug}`}
        className="relative size-20 shrink-0 overflow-hidden rounded-lg border border-border bg-muted sm:size-24"
        tabIndex={isPending ? -1 : undefined}
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

      {/* Details */}
      <div className="flex flex-1 flex-col justify-between gap-2">
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-col gap-0.5">
            <Link
              href={`/products/${product.slug}`}
              className="line-clamp-2 text-sm font-medium text-foreground transition-colors hover:text-foreground/70"
              tabIndex={isPending ? -1 : undefined}
            >
              {product.name}
            </Link>

            <span className="text-xs text-muted-foreground capitalize">
              {product.category}
            </span>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="size-7 shrink-0 text-muted-foreground hover:text-destructive"
            aria-label={`Remove ${product.name}`}
            onClick={handleRemove}
            disabled={isPending}
          >
            {isPending ? (
              <Loader2 className="size-3.5 animate-spin" />
            ) : (
              <Trash2 className="size-3.5" />
            )}
          </Button>
        </div>

        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <Button
              variant="outline"
              size="icon"
              className="size-7"
              onClick={handleDecrement}
              disabled={isPending || optimisticQuantity <= 1}
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
              onClick={handleIncrement}
              disabled={isPending}
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
