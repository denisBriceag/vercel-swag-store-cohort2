"use client"

import EmptyState from "@/components/ui/empty-state"

export default function ProductError() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 p-6 text-center">
      <EmptyState
        title="Something went wrong. Failed to load product"
        description="We couldn&#39;t load this product. Please try again or browse other
        products."
        actionHref="/search"
        actionLabel="Browse products."
      />
    </div>
  )
}
