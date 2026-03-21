import { apiClient } from "@/lib/api/client"
import { Category } from "@/types/categories/category"
import { cacheLife } from "next/cache"

export async function getCategories() {
  "use cache"
  cacheLife("hours")

  return await apiClient<Category[]>({
    method: "GET",
    path: `categories`,
  })
}
