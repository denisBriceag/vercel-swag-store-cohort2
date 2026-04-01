import {
  ProductSearchQuery,
  ProductSearchQueryStringified,
} from "@/types/products/product-search-query"

import { parsePositiveNumber } from "./parse-positive-number"
import { parseBoolean } from "./parse-boolean"

import { DEFAULT_LIMIT, DEFAULT_PAGE } from "@/constants/search-constants"

export function buildSearchQuery(
  params: ProductSearchQueryStringified
): ProductSearchQuery {
  return {
    page: parsePositiveNumber(params.page, DEFAULT_PAGE),
    limit: parsePositiveNumber(params.limit, DEFAULT_LIMIT),
    category: (params.category || undefined) as ProductSearchQuery["category"],
    search: params.search?.trim() || undefined,
    featured: parseBoolean(params.featured),
  }
}
