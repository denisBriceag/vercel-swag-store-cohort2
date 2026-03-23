"use client"

import Link from "next/link"

import { Button } from "@/components/ui/button"

export default function ProductError({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 p-6 text-center">
      <p className="text-sm font-medium tracking-widest text-muted-foreground uppercase">
        Something went wrong
      </p>

      <h1 className="text-3xl font-bold tracking-tight">
        Failed to load product
      </h1>

      <p className="max-w-sm text-sm text-muted-foreground">
        We couldn&#39;t load this product. Please try again or browse other
        products.
      </p>

      <div className="mt-2 flex gap-3">
        <Button variant="outline" onClick={reset}>
          Try again
        </Button>

        <Button asChild>
          <Link href="/products">Browse products</Link>
        </Button>
      </div>
    </div>
  )
}
