import { apiClient } from "@/lib/api/client"
import { StoreConfig } from "@/types/store/store-config"

export function getAppConfig() {
  return apiClient<StoreConfig>({
    method: "GET",
    path: `store/config`,
  })
}
