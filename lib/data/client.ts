import "server-only"

import {
  ApiResponse,
  errorGuard,
  ErrorResponse,
  SuccessResponse,
  SuccessResponseMeta,
} from "@/types/response"
import {
  ApiHttpError,
  ApiTimeoutError,
  ServerError,
} from "@/types/server-error"
import { ERROR_CODE } from "@/types/error-code"

const DEFAULT_TIMEOUT_MS = 10000

export type ApiClientOptions<R = undefined> = {
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH"
  path: string
  body?: R
  headers?: Record<string, string>
  query?: Record<string, string | number | boolean | undefined>
}

export async function apiClient<T, R = undefined>(
  options: ApiClientOptions<R>
): Promise<SuccessResponse<T> | SuccessResponseMeta<T>> {
  const headers: Record<string, string> = { ...options.headers }

  if (options.body !== undefined) {
    headers["Content-Type"] = "application/json"
  }

  const bypassToken = process.env.SERVER_BYPASS_TOKEN

  if (bypassToken) {
    headers["x-vercel-protection-bypass"] = bypassToken
  }

  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), DEFAULT_TIMEOUT_MS)

  let response: Response

  try {
    response = await fetch(_buildUrl(options.path, options.query), {
      method: options.method,
      headers,
      body:
        options.body !== undefined ? JSON.stringify(options.body) : undefined,
      signal: controller.signal,
    })
  } catch (error) {
    if (controller.signal.aborted) throw new ApiTimeoutError()

    throw error
  } finally {
    clearTimeout(timeoutId)
  }

  if (!response.ok) {
    await _parseErrorResponse(response)
  }

  const result = (await response.json()) as ApiResponse<T>

  if (errorGuard(result)) {
    throw result.error
  }

  return result
}

/**
 * @description A helper function to build a full data request url with query search parms if present
 * */
function _buildUrl(path: string, query?: ApiClientOptions["query"]): string {
  const url = new URL(path, process.env.SERVER_URL)

  if (query) {
    for (const [key, value] of Object.entries(query)) {
      if (value !== undefined && value !== null) {
        url.searchParams.set(key, String(value))
      }
    }
  }

  return url.toString()
}

async function _parseErrorResponse(response: Response): Promise<never> {
  let parsedError: ErrorResponse | null = null
  let rawText = ""

  try {
    rawText = await response.text()

    if (rawText) parsedError = JSON.parse(rawText) as ErrorResponse
  } catch {}

  const serverError: ServerError = parsedError?.error ?? {
    message: `Request failed with status ${response.status}`,
    code: ERROR_CODE.INTERNAL_SERVER_ERROR,
    details: rawText || response.statusText,
  }

  throw new ApiHttpError(response.status, serverError)
}
