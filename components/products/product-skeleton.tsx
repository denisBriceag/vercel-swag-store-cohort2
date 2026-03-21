export default function ProductsSkeleton() {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card">
      <div className="aspect-square w-full animate-pulse bg-muted" />

      <div className="flex flex-col gap-3 px-4 py-2">
        <div className="flex items-center justify-between gap-2">
          <div className="h-4 w-2/3 animate-pulse rounded bg-muted" />
          <div className="h-4 w-12 animate-pulse rounded bg-muted" />
        </div>

        <div className="h-10 w-full animate-pulse rounded bg-muted" />
      </div>
    </div>
  )
}
