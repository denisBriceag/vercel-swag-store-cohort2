import { ReadonlyURLSearchParams } from "next/navigation"

import { ProductSearchQuery } from "@/types/products/product-search-query"

export function buildUpdatedSearchParams(
  currentParams: ReadonlyURLSearchParams,
  updates: Partial<ProductSearchQuery>
): URLSearchParams {
  const params = new URLSearchParams(currentParams.toString())

  Object.entries(updates).forEach(([key, value]) => {
    if (
      value === undefined ||
      value === null ||
      value === "" ||
      value === "all"
    ) {
      params.delete(key)
      return
    }

    params.set(key, String(value))
  })

  return params
}
