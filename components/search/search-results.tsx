import { getProducts } from "@/lib/data/products.api"

import { SuccessResponseMeta } from "@/types/response"

import { Product } from "@/types/products/product"
import ProductItem from "@/components/products/product-item"

import SearchPagination from "./search-pagination"
import { SearchPageProps } from "@/types/search/search-params-props"
import { buildSearchQuery } from "@/utils/search/build-search-query"
import EmptyState from "@/components/ui/empty-state"

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
        <EmptyState
          className="h-144"
          title="No products found."
          description="Try a different search term or remove filters."
        />
      ) : (
        <>
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product, index) => (
              <li key={product.id}>
                <ProductItem
                  index={index}
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
