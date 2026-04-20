import { timingSafeEqual } from "crypto"
import { NextRequest } from "next/server"

/**
 * @description Shared auth check for all revalidate endpoints.
 * We use timingSafeEqual to compare secrets in constant time, preventing
 * timing side-channel attacks where response time could be used to
 * guess the secret character by character.
 */
export function isAuthorizedRevalidateRequest(req: NextRequest): boolean {
  const secret = process.env.REVALIDATE_SECRET

  if (!secret) return false

  const provided = req.headers.get("authorization")

  if (!provided) return false

  const expected = `Bearer ${secret}`

  if (provided.length !== expected.length) return false

  return timingSafeEqual(Buffer.from(provided), Buffer.from(expected))
}
