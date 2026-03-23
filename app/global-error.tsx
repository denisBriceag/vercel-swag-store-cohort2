"use client"

export default function GlobalError() {
  return (
    <html>
      <body>
        <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-6 text-center">
          <p className="text-sm font-medium tracking-widest text-muted-foreground uppercase">
            Something went wrong
          </p>

          <h1 className="text-3xl font-bold tracking-tight">
            Unexpected error
          </h1>

          <p className="max-w-sm text-sm text-muted-foreground">
            An unexpected error occurred. Please try again.
          </p>
        </main>
      </body>
    </html>
  )
}
