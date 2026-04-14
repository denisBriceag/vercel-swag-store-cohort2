export default function CartSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
      <section className="lg:col-span-2">
        <ul className="divide-y divide-border">
          {Array.from({ length: 3 }).map((_, i) => (
            <li key={i} className="flex gap-4 py-6">
              <div className="size-20 shrink-0 animate-pulse rounded-lg bg-muted" />
              <div className="flex flex-1 flex-col gap-2">
                <div className="h-4 w-1/2 animate-pulse rounded bg-muted" />
                <div className="h-4 w-1/4 animate-pulse rounded bg-muted" />
                <div className="mt-auto h-8 w-24 animate-pulse rounded bg-muted" />
              </div>
            </li>
          ))}
        </ul>
      </section>

      <aside className="lg:col-span-1">
        <div className="h-48 w-full animate-pulse rounded-xl bg-muted" />
      </aside>
    </div>
  )
}
