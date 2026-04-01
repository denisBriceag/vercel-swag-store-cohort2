import { cacheLife, cacheTag } from "next/cache"

import { apiClient } from "@/lib/api/client"
import { Category } from "@/types/categories/category"
import { CACHE_TAGS } from "@/constants/app-constants"

export async function getCategories() {
  "use cache"
  cacheLife(CACHE_TAGS.CATEGORIES)
  cacheTag(CACHE_TAGS.CATEGORIES)

  return await apiClient<Category[]>({
    method: "GET",
    path: `categories`,
  })
}
