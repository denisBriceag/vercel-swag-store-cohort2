import { apiClient } from "@/lib/api/client"
import { SuccessResponse } from "@/types/response"
import { Category } from "@/types/categories/category"

export function getCategories() {
  return apiClient<SuccessResponse<Category>>({
    method: "GET",
    path: `categories`,
  })
}
