import { apiClient } from "@/lib/api/client"
import { Product } from "@/types/products/product"
import { ProductSearchQuery } from "@/types/products/product-search-query"

export function getProducts(query: ProductSearchQuery = {}) {
  return apiClient<Product[]>({
    method: "GET",
    path: "products",
    query,
  })
}

export function getProductById(id: string) {
  return apiClient<Product>({
    method: "GET",
    path: `products/${id}`,
  })
}

export function getProductStock(id: string) {
  return apiClient<Product>({
    method: "GET",
    path: `products/${id}/stock`,
  })
}
