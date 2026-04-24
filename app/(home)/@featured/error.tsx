"use client"

import EmptyState from "@/components/ui/empty-state"

import useError from "@/hooks/use-error"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const reload = useError(reset)

  return (
    <div className="flex h-120 items-center justify-center">
      <EmptyState
        title="Featured products unavailable"
        errorCode={error.digest}
        description="Something went wrong while loading our featured products."
      >
        <button
          onClick={reload}
          className="mt-1 rounded-4xl border border-border bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
        >
          Try again
        </button>
      </EmptyState>
    </div>
  )
}
