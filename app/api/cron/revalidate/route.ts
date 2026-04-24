import { timingSafeEqual } from "crypto"
import { revalidateTag } from "next/cache"
import { NextRequest, NextResponse } from "next/server"

import { CACHE_TAGS } from "@/constants/app-constants"

/**
 * @description We specifically use CRON_SECRET so that only Vercel's infrastructure
 * can trigger a full cache flush, not an arbitrary HTTP client.
 */
export async function GET(req: NextRequest) {
  const secret = process.env.CRON_SECRET
  const provided = req.headers.get("authorization")

  if (!secret || !provided) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const expected = `Bearer ${secret}`

  if (
    provided.length !== expected.length ||
    !timingSafeEqual(Buffer.from(provided), Buffer.from(expected))
  ) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const tags = Object.values(CACHE_TAGS)

  for (const tag of tags) {
    revalidateTag(tag, "max")
  }

  return NextResponse.json({
    revalidated: true,
    tags,
    timestamp: new Date().toISOString(),
  })
}
