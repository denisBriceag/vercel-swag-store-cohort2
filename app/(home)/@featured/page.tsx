import { cacheLife, cacheTag } from "next/cache"
import Link from "next/link"

import ProductItem from "@/components/products/product-item"

import { CACHE_TAGS } from "@/constants/app-constants"

import { getProducts } from "@/lib/data/products.api"

/**
 * @description Featured products - timings controlled via FEATURED_PRODUCTS_* env vars.
 * Revalidate: POST /data/revalidate/products
 */
export default async function FeaturedProducts() {
  "use cache"
  cacheLife(CACHE_TAGS.FEATURED_PRODUCTS)
  cacheTag(CACHE_TAGS.FEATURED_PRODUCTS, CACHE_TAGS.PRODUCTS)

  const products = await getProducts({
    page: 1,
    limit: 6,
    featured: true,
  })

  return (
    <div className="mx-auto max-w-7xl">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Featured products
        </h2>

        <Link href="/search?featured=true">
          <span className="text-muted-foreground hover:cursor-pointer hover:text-primary">
            View all
          </span>
        </Link>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
        {products.data.map(({ id, images, name, price, slug }, index) => (
          <ProductItem
            index={index}
            key={id}
            slug={slug}
            images={images}
            name={name}
            price={price}
          />
        ))}
      </div>
    </div>
  )
}
