import { cacheLife, cacheTag } from "next/cache"
import { CACHE_TAGS } from "@/constants/app-constants"
import { getAppConfig } from "@/lib/data/app-configuration.api"
import Link from "next/link"

export default async function StoreName() {
  "use cache"
  cacheLife(CACHE_TAGS.APP_CONFIG)
  cacheTag(CACHE_TAGS.APP_CONFIG)

  const res = await getAppConfig()

  const config = res.success ? res.data : null

  return (
    <Link href="/" className="text-sm font-semibold tracking-tight">
      {config?.storeName ?? "SwagStore"}
    </Link>
  )
}
