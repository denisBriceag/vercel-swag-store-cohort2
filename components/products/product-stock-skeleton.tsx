export default function ProductStockSkeleton() {
  return (
    <>
      <div className="h-5 w-20 animate-pulse rounded-full bg-muted" />

      <div className="border-t border-border pt-6">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <div className="h-4 w-14 animate-pulse rounded bg-muted" />

            <div className="flex items-center gap-2">
              <div className="size-8 animate-pulse rounded-md bg-muted" />
              <div className="size-8 animate-pulse rounded bg-muted" />
              <div className="size-8 animate-pulse rounded-md bg-muted" />
              <div className="h-3 w-20 animate-pulse rounded bg-muted" />
            </div>
          </div>

          <div className="h-9 w-full animate-pulse rounded-md bg-muted sm:w-32" />
        </div>
      </div>
    </>
  )
}
