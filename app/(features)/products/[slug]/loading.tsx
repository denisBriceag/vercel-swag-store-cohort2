import ProductStockSkeleton from "@/components/products/product-stock-skeleton"

export default function ProductPageLoading() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="aspect-square animate-pulse rounded-2xl border border-border bg-muted" />

        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-3">
            <div className="h-3 w-16 animate-pulse rounded bg-muted" />

            <div className="h-9 w-3/4 animate-pulse rounded-md bg-muted" />

            <div className="h-7 w-24 animate-pulse rounded-md bg-muted" />
          </div>

          <ProductStockSkeleton />

          <div className="space-y-2">
            <div className="h-4 w-full animate-pulse rounded bg-muted" />
            <div className="h-4 w-11/12 animate-pulse rounded bg-muted" />
            <div className="h-4 w-4/5 animate-pulse rounded bg-muted" />
          </div>

          <div className="flex gap-2">
            <div className="h-5 w-12 animate-pulse rounded-md bg-muted" />
            <div className="h-5 w-16 animate-pulse rounded-md bg-muted" />
            <div className="h-5 w-10 animate-pulse rounded-md bg-muted" />
          </div>
        </div>
      </div>
    </div>
  )
}
