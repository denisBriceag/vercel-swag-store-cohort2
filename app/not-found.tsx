import Link from "next/link"

export default function NotFound() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center gap-4 p-6 text-center">
      <p className="text-sm font-medium tracking-widest text-muted-foreground uppercase">
        404
      </p>

      <h1 className="text-3xl font-bold tracking-tight">Page not found</h1>

      <p className="max-w-sm text-sm text-muted-foreground">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>

      <Link
        href="/"
        className="mt-2 rounded-md border border-border bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
      >
        Go home
      </Link>
    </section>
  )
}
