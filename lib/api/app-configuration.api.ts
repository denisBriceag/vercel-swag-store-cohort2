import { cacheLife, cacheTag } from "next/cache"

import { apiClient } from "@/lib/api/client"
import { StoreConfig } from "@/types/store/store-config"
import { CACHE_TAGS } from "@/constants/app-constants"

export async function getAppConfig() {
  "use cache"
  cacheLife(CACHE_TAGS.APP_CONFIG)
  cacheTag(CACHE_TAGS.APP_CONFIG)

  return apiClient<StoreConfig>({
    method: "GET",
    path: `store/config`,
  })
}
