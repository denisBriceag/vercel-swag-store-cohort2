export default function CartSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
      <section className="lg:col-span-2">
        <ul className="divide-y divide-border">
          {Array.from({ length: 3 }).map((_, i) => (
            <li key={i} className="flex gap-4 py-5">
              <div className="size-20 shrink-0 animate-pulse rounded-lg border border-border bg-muted sm:size-24" />

              <div className="flex flex-1 flex-col justify-between gap-2">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex flex-col gap-0.5">
                    <div className="h-4 w-48 animate-pulse rounded bg-muted" />
                    <div className="h-3 w-16 animate-pulse rounded bg-muted" />
                  </div>
                  <div className="size-7 shrink-0 animate-pulse rounded-md bg-muted" />
                </div>

                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    <div className="size-7 animate-pulse rounded-full border border-border bg-muted" />
                    <div className="h-4 w-7 animate-pulse rounded bg-muted" />
                    <div className="size-7 animate-pulse rounded-full border border-border bg-muted" />
                  </div>
                  <div className="h-4 w-16 animate-pulse rounded bg-muted" />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <aside className="lg:col-span-1">
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="mb-4 h-4 w-28 animate-pulse rounded bg-muted" />

          <div className="flex flex-col gap-3 border-b border-border pb-4">
            <div className="flex items-center justify-between gap-4">
              <div className="h-4 w-32 animate-pulse rounded bg-muted" />
              <div className="h-4 w-14 animate-pulse rounded bg-muted" />
            </div>
            <div className="flex items-center justify-between gap-4">
              <div className="h-4 w-16 animate-pulse rounded bg-muted" />
              <div className="h-4 w-40 animate-pulse rounded bg-muted" />
            </div>
          </div>

          <div className="flex items-center justify-between gap-4 pt-4">
            <div className="h-4 w-10 animate-pulse rounded bg-muted" />
            <div className="h-4 w-14 animate-pulse rounded bg-muted" />
          </div>

          <div className="mt-6 h-10 w-full animate-pulse rounded-4xl bg-muted" />

          <div className="mx-auto mt-3 h-3 w-44 animate-pulse rounded bg-muted" />
        </div>
      </aside>
    </div>
  )
}
