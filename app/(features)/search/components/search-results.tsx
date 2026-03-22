import { PackageSearch } from "lucide-react"

import { getProducts } from "@/lib/api/products.api"
import { SuccessResponseMeta } from "@/types/response"
import { Product } from "@/types/products/product"
import ProductItem from "@/components/products/product-item"

import { buildSearchQuery } from "../utils/build-search-query"
import SearchPagination from "./search-pagination"

type SearchResultsProps = {
  searchParams: Promise<Record<string, string | undefined>>
}

export default async function SearchResults({
  searchParams,
}: SearchResultsProps) {
  const params = await searchParams
  const query = buildSearchQuery(params)

  let response: SuccessResponseMeta<Product[]>

  try {
    response = (await getProducts(query)) as SuccessResponseMeta<Product[]>
  } catch {
    return (
      <section className="px-6 pb-12">
        <p className="text-sm text-destructive">
          Failed to load products. Please try again later.
        </p>
      </section>
    )
  }

  const { data: products, meta } = response
  const { pagination } = meta

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
