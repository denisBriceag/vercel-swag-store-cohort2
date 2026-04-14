import { getAppConfig } from "@/lib/data/app-configuration.api"
import Link from "next/link"
import { cacheLife, cacheTag } from "next/cache"
import { CACHE_TAGS } from "@/constants/app-constants"

export default async function FooterSocialLinks() {
  "use cache"
  cacheLife(CACHE_TAGS.APP_CONFIG)
  cacheTag(CACHE_TAGS.APP_CONFIG)

  const res = await getAppConfig()

  const config = res.success ? res.data : null

  if (!config) return null

  const { socialLinks } = config

  return (
    <ul className="flex list-none gap-4">
      {Object.entries(socialLinks).map(([key, value], index) => (
        <li key={index}>
          <Link
            href={value}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-foreground"
          >
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </Link>
        </li>
      ))}
    </ul>
  )
}
