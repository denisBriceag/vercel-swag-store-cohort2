import { Metadata } from "./metadata"
import { ServerError } from "./server-error"

interface BaseResponse {
  success: boolean
}

export interface SuccessResponse<T> extends BaseResponse {
  data: T
}

export interface SuccessResponseMeta<T> extends SuccessResponse<T> {
  meta: Metadata
}

export interface ErrorResponse extends BaseResponse {
  error: ServerError
}

export type ApiResponse<T> =
  | SuccessResponse<T>
  | SuccessResponseMeta<T>
  | ErrorResponse

export function errorGuard<T>(
  response: ApiResponse<T>
): response is ErrorResponse {
  return !response.success
}
