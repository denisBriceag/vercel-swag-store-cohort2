import { apiClient } from "@/lib/api/client"
import { SuccessResponse } from "@/types/response"
import { StoreConfig } from "@/types/store/store-config"

export function getCart() {
  return apiClient<SuccessResponse<StoreConfig>>({
    method: "GET",
    path: `store/config`,
  })
}
