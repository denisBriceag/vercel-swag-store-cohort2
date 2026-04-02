import { PackageSearch } from "lucide-react"

import { getProducts } from "@/lib/data/products.api"

import { SuccessResponseMeta } from "@/types/response"

import { Product } from "@/types/products/product"
import ProductItem from "@/components/products/product-item"

import SearchPagination from "./search-pagination"
import { SearchPageProps } from "@/types/search/search-params-props"
import { buildSearchQuery } from "@/utils/search/build-search-query"

export default async function SearchResults({ searchParams }: SearchPageProps) {
  const params = await searchParams
  const query = buildSearchQuery(params)

  const {
    data: products,
    meta: { pagination },
  } = (await getProducts(query)) as SuccessResponseMeta<Product[]>

  return (
    <section className="px-6 pb-12">
      <p className="mb-6 text-sm text-muted-foreground">
        {pagination.total} result{pagination.total === 1 ? "" : "s"}
        {query.search ? (
          <>
            {" "}
            for{" "}
            <span className="font-medium text-foreground">
              &ldquo;{query.search}&rdquo;
            </span>
          </>
        ) : null}
      </p>

      {products.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 py-24 text-center text-muted-foreground">
          <PackageSearch className="size-12 opacity-40" />
          <p className="text-base font-medium">No products found</p>
          {query.search && (
            <p className="text-sm">
              Try a different search term or remove filters.
            </p>
          )}
        </div>
      ) : (
        <>
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <li key={product.id}>
                <ProductItem
                  slug={product.slug}
                  images={product.images}
                  name={product.name}
                  price={product.price}
                />
              </li>
            ))}
          </ul>

          <SearchPagination query={query} pagination={pagination} />
        </>
      )}
    </section>
  )
}
