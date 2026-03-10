import { apiClient } from "@/lib/api/client"
import { SuccessResponse } from "@/types/response"
import { AppHealth } from "@/types/health"
import { ApiHttpError } from "@/types/server-error"
import { ERROR_CODE } from "@/types/error-code"

export async function checkHealth() {
  const response = await apiClient<SuccessResponse<AppHealth>>({
    method: "GET",
    path: "health",
  })

  if (response.data.status !== "ok") {
    const failing = Object.entries(response.data.services)
      .filter(([, status]) => status !== "connected")
      .map(([name]) => name)

    throw new ApiHttpError(200, {
      message: `Backend unhealthy — failing services: ${failing.join(", ")}`,
      code: ERROR_CODE.API_FAILING_SERVICES,
    })
  }

  return response
}
