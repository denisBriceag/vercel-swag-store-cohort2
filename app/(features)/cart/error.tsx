"use client"

import EmptyState from "@/components/ui/empty-state"
import useError from "@/hooks/use-error"

export default function CartError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const reload = useError(reset)

  return (
    <section className="flex flex-col items-center justify-center gap-4 p-6 text-center">
      <EmptyState
        title="Something went wrong. Failed to load cart."
        errorCode={error.digest}
        description="We couldn't load your cart. Please try again."
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
