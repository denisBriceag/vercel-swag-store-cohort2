"use client"

import EmptyState from "@/components/ui/empty-state"

export default function SearchError() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 p-6 text-center">
      <EmptyState
        title="Something went wrong. Search unavailable."
        description="We couldn't load the search results. Please try again later."
        actionHref="/"
        actionLabel="Go back home."
      />
    </div>
  )
}
