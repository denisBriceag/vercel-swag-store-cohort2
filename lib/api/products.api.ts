import { apiClient } from "@/lib/api/client"
import { Product } from "@/types/products/product"
import { ProductSearchQuery } from "@/types/products/product-search-query"
import { StockInfo } from "@/types/stock/stock-info"
import { cacheLife } from "next/cache"

export function getProducts(query: ProductSearchQuery = {}) {
  return apiClient<Product[]>({
    method: "GET",
    path: "products",
    query,
  })
}

/**
 * @description We cache product details for hours because the product details data will less likely change frequently.
 * */
export async function getProductById(id: string) {
  "use cache"
  cacheLife("hours")

  return apiClient<Product>({
    method: "GET",
    path: `products/${id}`,
  })
}

export function getProductStock(id: string) {
  return apiClient<StockInfo>({
    method: "GET",
    path: `products/${id}/stock`,
  })
}
