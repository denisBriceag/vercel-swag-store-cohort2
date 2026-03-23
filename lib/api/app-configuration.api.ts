import { cacheLife } from "next/cache"

import { apiClient } from "@/lib/api/client"
import { StoreConfig } from "@/types/store/store-config"

/**
 * @description We will cache app config at least for 1 week since it's not a dynamic data.
 * */
export async function getAppConfig() {
  "use cache"
  cacheLife("weeks")

  return apiClient<StoreConfig>({
    method: "GET",
    path: `store/config`,
  })
}
