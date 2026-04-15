import ProductsSkeleton from "@/components/products/product-item-skeleton"
import { DEFAULT_LIMIT } from "@/constants/search-constants"

export default function SearchResultsSkeleton() {
  return (
    <section
      className="px-6 pb-12"
      aria-busy="true"
      aria-label="Loading products"
    >
      <div className="mb-6 h-4 w-24 animate-pulse rounded-md bg-muted" />

      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: DEFAULT_LIMIT }).map((_, i) => (
          <li key={i}>
            <ProductsSkeleton />
          </li>
        ))}
      </ul>

      <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
        <div className="flex items-center gap-2">
          <div className="h-4 w-24 animate-pulse rounded-md bg-muted" />
          <div className="h-8 w-16 animate-pulse rounded-md bg-muted" />
        </div>

        <div className="flex items-center gap-1">
          <div className="h-9 w-20 animate-pulse rounded-md bg-muted" />
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-9 w-9 animate-pulse rounded-md bg-muted" />
          ))}
          <div className="h-9 w-20 animate-pulse rounded-md bg-muted" />
        </div>
      </div>
    </section>
  )
}
