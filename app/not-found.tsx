import { Metadata } from "next"

import EmptyState from "@/components/ui/empty-state"

export const metadata: Metadata = {
  title: "Not found",
  robots: { index: false },
}

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <EmptyState
        title="Page not found"
        description="The page you're looking for doesn't exist or has been moved."
        actionHref="/"
        actionLabel="Go home"
      />
    </main>
  )
}
