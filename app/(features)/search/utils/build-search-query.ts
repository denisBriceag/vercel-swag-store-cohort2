import { ProductSearchQuery } from "@/types/products/product-search-query"

import {
  DEFAULT_LIMIT,
  DEFAULT_PAGE,
} from "@/app/(features)/search/constants/constants"
import { parsePositiveNumber } from "@/app/(features)/search/utils/parse-positive-number"
import { parseBoolean } from "@/app/(features)/search/utils/parse-boolean"

export function buildSearchQuery(
  params: Record<string, string | undefined>
): ProductSearchQuery {
  return {
    page: parsePositiveNumber(params.page, DEFAULT_PAGE),
    limit: parsePositiveNumber(params.limit, DEFAULT_LIMIT),
    category: (params.category || undefined) as ProductSearchQuery["category"],
    search: params.search?.trim() || undefined,
    featured: parseBoolean(params.featured),
  }
}
