import ProductItemSkeleton from "@/components/products/product-item-skeleton"

export default function FeaturedProductsSkeleton() {
  return (
    <section
      className="w-full px-4 py-16 sm:px-6 lg:px-8"
      aria-busy="true"
      aria-label="Loading featured products"
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Featured products
          </h2>

          <div className="h-4 w-16 animate-pulse rounded-md bg-muted" />
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <ProductItemSkeleton key={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
