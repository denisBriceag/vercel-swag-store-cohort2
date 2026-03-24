import { ProductSearchQueryStringified } from "@/types/products/product-search-query"

export type SearchPageProps = {
  searchParams: Promise<ProductSearchQueryStringified>
}
