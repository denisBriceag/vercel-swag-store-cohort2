import * as React from "react"

import Link from "next/link"
import { cacheLife, cacheTag } from "next/cache"

import { getPromotion } from "@/lib/data/promotion.api"

import { CACHE_TAGS } from "@/constants/app-constants"

import { Promotion } from "@/types/promotions/promotion"

import { cn } from "@/utils/utils"

function PromoMessage({
  title,
  description,
  code,
  className,
}: React.ComponentProps<"span"> &
  Pick<Promotion, "title" | "description" | "code">) {
  return (
    <span className={cn(className)}>
      {title} - {description}{" "}
      {code !== "AUTO" && (
        <span>
          Code:{" "}
          <Link href="https://nextjs.org/" target="_blank">
            <strong className="cursor-pointer underline">{code}</strong>
          </Link>
        </span>
      )}
    </span>
  )
}

/**
 * @description We cache promo as promos are usually last from 1 week till 1 month. So it's quite safe to cache it at least for 1 week.
 * Alternatively we could receive validUntil flag from server and calculate time until validUntil timestamp.
 * The limitation though is that server returns timestamps from the last year (2025).
 *
 * If getPromotion fails we silently hide the promo bar.
 * */
export default async function Promo() {
  "use cache"
  cacheLife(CACHE_TAGS.PROMO)
  cacheTag(CACHE_TAGS.PROMO)

  let data: Awaited<ReturnType<typeof getPromotion>>["data"]

  try {
    const result = await getPromotion()

    data = result.data
  } catch {
    return null
  }

  if (!data.active) return null

  return (
    <aside className="flex h-10 w-full items-center overflow-hidden bg-primary px-6 text-secondary dark:bg-foreground">
      <div className="block w-full overflow-hidden whitespace-nowrap md:hidden">
        <div className="inline-flex min-w-max animate-marquee items-center whitespace-nowrap">
          {/*PromoMessage duplication needed for marquee effect in mobile version*/}
          <PromoMessage
            className="mr-12"
            code={data.code}
            title={data.title}
            description={data.description}
          />

          <PromoMessage
            className="mr-12"
            code={data.code}
            title={data.title}
            description={data.description}
          />
        </div>
      </div>

      <div className="hidden w-full items-center justify-center md:flex">
        <PromoMessage
          code={data.code}
          title={data.title}
          description={data.description}
        />
      </div>
    </aside>
  )
}
