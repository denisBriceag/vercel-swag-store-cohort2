import { apiClient } from "@/lib/api/client"
import { SuccessResponse, SuccessResponseMeta } from "@/types/response"
import { Product } from "@/types/products/product"
import { ProductSearchQuery } from "@/types/products/product-search-query"

export function getProducts(query: ProductSearchQuery = {}) {
  return apiClient<SuccessResponseMeta<Product>>({
    method: "GET",
    path: "products",
    query,
  })
}

export function getProductById(id: string) {
  return apiClient<SuccessResponse<Product>>({
    method: "GET",
    path: `products/${id}`,
  })
}

export function getProductStock(id: string) {
  return apiClient<SuccessResponse<Product>>({
    method: "GET",
    path: `products/${id}/stock`,
  })
}
