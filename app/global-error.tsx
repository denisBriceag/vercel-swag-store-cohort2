"use client"

import EmptyState from "@/components/ui/empty-state"

export default function GlobalError() {
  return (
    <html lang="en">
      <body>
        <main className="flex min-h-screen items-center justify-center p-6">
          <EmptyState
            title="Something went wrong"
            description="An unexpected error occurred. Please try relaod the page"
          />
        </main>
      </body>
    </html>
  )
}
