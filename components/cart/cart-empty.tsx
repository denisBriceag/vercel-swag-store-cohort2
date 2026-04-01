import Link from "next/link"
import { ShoppingCart } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function CartEmpty() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
      <div className="flex size-16 items-center justify-center rounded-full bg-muted">
        <ShoppingCart className="size-7 text-muted-foreground" />
      </div>

      <div className="flex flex-col gap-1">
        <p className="text-base font-medium text-foreground">
          Your cart is empty
        </p>

        <p className="text-sm text-muted-foreground">
          Add some items to get started.
        </p>
      </div>

      <Button asChild variant="outline" className="mt-2">
        <Link href="/search">Browse products</Link>
      </Button>
    </div>
  )
}
