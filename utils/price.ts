import { localeMap } from "@/types/locale-map"
import { Locale } from "@/types/locale"

export function price(cents: number, locale: Locale): string {
  return new Intl.NumberFormat(localeMap[locale], {
    style: "currency",
    currency: "USD",
  }).format(cents / 100)
}
