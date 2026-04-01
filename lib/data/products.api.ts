import { apiClient } from "@/lib/api/client"
import { Product } from "@/types/products/product"
import { ProductSearchQuery } from "@/types/products/product-search-query"
import { StockInfo } from "@/types/stock/stock-info"
import { cacheLife, cacheTag } from "next/cache"
import { CACHE_TAGS, productCacheTag } from "@/constants/app-constants"

export function getProducts(query: ProductSearchQuery = {}) {
  return apiClient<Product[]>({
    method: "GET",
    path: "products",
    query,
  })
}

export async function getProductDetails(slug: string) {
  "use cache"
  cacheLife(CACHE_TAGS.PRODUCTS)
  cacheTag(CACHE_TAGS.PRODUCTS, productCacheTag(slug))

  return apiClient<Product>({
    method: "GET",
    path: `products/${slug}`,
  })
}

export function getProductStock(id: string) {
  return apiClient<StockInfo>({
    method: "GET",
    path: `products/${id}/stock`,
  })
}
