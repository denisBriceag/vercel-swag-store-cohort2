import { DEFAULT_LIMIT } from "@/app/(features)/search/constants/constants"
import ProductsSkeleton from "@/components/products/product-skeleton"

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
    </section>
  )
}
