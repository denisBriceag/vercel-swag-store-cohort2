import { apiClient } from "@/lib/data/client"
import { Promotion } from "@/types/promotions/promotion"

export function getPromotion() {
  return apiClient<Promotion>({
    method: "GET",
    path: `promotions`,
  })
}
