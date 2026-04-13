"use client"

import EmptyState from "@/components/ui/empty-state"

import useError from "@/hooks/use-error"

export default function Error({ reset }: { error: Error; reset: () => void }) {
  const reload = useError(reset)

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 p-6 text-center">
      <EmptyState
        title="Page unavailable."
        description="Something went wrong while loading the page."
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
