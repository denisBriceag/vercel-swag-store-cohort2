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

/**
 * 10 secs
 * */
const DEFAULT_TIMEOUT_MS = 10000

export type ApiClientOptions<R = undefined> = {
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH"
  path: string
  body?: R
  headers?: Record<string, string>
  query?: Record<string, string | number | boolean | undefined>
  timeout?: number
  signal?: AbortSignal
}

/**
 * @description This function is a main http client for this app.
 * Automatically passes x-vercel-protection-bypass header
 * */
export async function apiClient<T, R = undefined>(
  options: ApiClientOptions<R>
): Promise<SuccessResponse<T> | SuccessResponseMeta<T>> {
  const headers: Record<string, string> = {
    ...options.headers,
  }

  if (options.body !== undefined) {
    headers["Content-Type"] = "application/json"
  }

  const bypassToken = process.env.SERVER_BYPASS_TOKEN

  if (bypassToken) {
    headers["x-vercel-protection-bypass"] = bypassToken
  }

  const timeoutMs = options.timeout ?? DEFAULT_TIMEOUT_MS
  const timeoutController = timeoutMs > 0 ? new AbortController() : null
  const timeoutId =
    timeoutController && setTimeout(() => timeoutController.abort(), timeoutMs)

  const signal = _mergeSignals(options.signal, timeoutController?.signal)

  let response: Response
  try {
    response = await fetch(_buildUrl(options.path, options.query), {
      method: options.method,
      headers,
      body:
        options.body !== undefined ? JSON.stringify(options.body) : undefined,
      signal,
    })
  } catch (error) {
    if (timeoutController?.signal.aborted) {
      throw new ApiTimeoutError()
    }
    throw error
  } finally {
    if (timeoutId) clearTimeout(timeoutId)
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

function _buildUrl(path: string, query?: ApiClientOptions["query"]): string {
  const baseUrl = process.env.SERVER_URL
  const url = new URL(path, baseUrl)

  if (query) {
    for (const [key, value] of Object.entries(query)) {
      if (value !== undefined && value !== null) {
        url.searchParams.set(key, String(value))
      }
    }
  }

  return url.toString()
}

function _mergeSignals(
  ...signals: (AbortSignal | undefined)[]
): AbortSignal | undefined {
  const defined = signals.filter(Boolean) as AbortSignal[]

  if (defined.length === 0) return undefined
  if (defined.length === 1) return defined[0]

  const controller = new AbortController()

  for (const sig of defined) {
    if (sig.aborted) {
      controller.abort(sig.reason)

      return controller.signal
    }

    sig.addEventListener("abort", () => controller.abort(sig.reason), {
      once: true,
      signal: controller.signal,
    })
  }

  return controller.signal
}

async function _parseErrorResponse(response: Response): Promise<never> {
  let parsedError: ErrorResponse | null = null
  let rawText = ""

  try {
    rawText = await response.text()

    if (rawText) {
      parsedError = JSON.parse(rawText) as ErrorResponse
    }
  } catch {}

  const serverError: ServerError = parsedError?.error ?? {
    message: `Request failed with status ${response.status}`,
    code: ERROR_CODE.INTERNAL_SERVER_ERROR,
    details: rawText || response.statusText,
  }

  throw new ApiHttpError(response.status, serverError)
}
