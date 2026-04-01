"use client"

import EmptyState from "@/components/ui/empty-state"

export default function Error() {
  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center gap-4 p-6 text-center">
      <EmptyState
        title="Something went wrong."
        description="An unexpected error occurred. Please try again."
        actionHref="/"
        actionLabel="Go home"
      />
    </section>
  )
}
