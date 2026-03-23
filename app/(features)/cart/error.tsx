"use client"

import Link from "next/link"

import { Button } from "@/components/ui/button"

export default function CartError() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 p-6 text-center">
      <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
        Something went wrong
      </p>

      <h1 className="text-3xl font-bold tracking-tight">
        Failed to load cart
      </h1>

      <p className="max-w-sm text-sm text-muted-foreground">
        We couldn&apos;t load your cart. Please try again later.
      </p>

      <Button asChild className="mt-2">
        <Link href="/products">Browse products</Link>
      </Button>
    </div>
  )
}
