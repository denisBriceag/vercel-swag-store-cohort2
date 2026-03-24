import { ERROR_CODE } from "@/types/error-code"

export type ServerError = {
  message: string
  code: keyof typeof ERROR_CODE
  details?: string
}

export class ApiTimeoutError extends Error {
  constructor() {
    super("Timeout error")
    this.name = ERROR_CODE.API_TIMEOUT_ERROR
  }
}

export class ApiHttpError extends Error {
  constructor(
    public status: number,
    public serverError: ServerError
  ) {
    super(serverError.message)

    this.name = serverError.code
    this.status = status
  }
}
