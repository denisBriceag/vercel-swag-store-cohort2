"use client"

import Link from "next/link"

import { Button } from "@/components/ui/button"

export default function Error() {
  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center gap-4 p-6 text-center">
      <p className="text-sm font-medium tracking-widest text-muted-foreground uppercase">
        Something went wrong
      </p>

      <h1 className="text-3xl font-bold tracking-tight">Unexpected error</h1>

      <p className="max-w-sm text-sm text-muted-foreground">
        An unexpected error occurred. Please try again.
      </p>

      <Button variant="outline" asChild className="mt-2">
        <Link href="/">Get back home</Link>
      </Button>
    </section>
  )
}
