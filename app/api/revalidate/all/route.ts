import { revalidateTag } from "next/cache"
import { NextResponse } from "next/server"

import { CACHE_TAGS } from "@/constants/app-constants"

export async function POST() {
  const tags = Object.values(CACHE_TAGS)

  for (const tag of tags) {
    revalidateTag(tag, "max")
  }

  return NextResponse.json({ revalidated: true, tags })
}
