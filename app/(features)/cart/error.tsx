"use client"

import EmptyState from "@/components/ui/empty-state"

export default function CartError() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 p-6 text-center">
      <EmptyState
        title="Something went wrong. Failed to load cart."
        description="We couldn't load your cart. Please try again later."
        actionHref="/search"
        actionLabel="Browse products."
      />
    </div>
  )
}
