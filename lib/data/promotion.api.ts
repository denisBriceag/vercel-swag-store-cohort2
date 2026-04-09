import { cacheLife, cacheTag } from "next/cache"

import { apiClient } from "@/lib/data/client"
import { Promotion } from "@/types/promotions/promotion"
import { CACHE_TAGS } from "@/constants/app-constants"

export async function getPromotion() {
  "use cache"
  cacheLife(CACHE_TAGS.PROMO)
  cacheTag(CACHE_TAGS.PROMO)

  return apiClient<Promotion>({
    method: "GET",
    path: `promotions`,
  })
}
