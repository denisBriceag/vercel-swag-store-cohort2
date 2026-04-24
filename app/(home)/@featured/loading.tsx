import ProductItemSkeleton from "@/components/products/product-item-skeleton"

export default function FeaturedProductsLoading() {
  return (
    <div
      className="mx-auto max-w-7xl"
      aria-busy="true"
      aria-label="Loading featured products"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Featured products
        </h2>

        <div className="h-4 w-16 animate-pulse rounded-md bg-muted" />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <ProductItemSkeleton key={index} />
        ))}
      </div>
    </div>
  )
}
