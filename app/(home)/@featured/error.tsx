"use client"

import EmptyState from "@/components/ui/empty-state"

import useError from "@/hooks/use-error"

export default function Error({ reset }: { error: Error; reset: () => void }) {
  const reload = useError(reset)

  return (
    <section className="flex h-120 w-full items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
      <EmptyState
        title="Featured products unavailable"
        description="Something went wrong while loading our featured products."
      >
        <button
          onClick={reload}
          className="mt-1 rounded-4xl border border-border bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
        >
          Try again
        </button>
      </EmptyState>
    </section>
  )
}
