import { getRequestConfig, GetRequestConfigParams } from "next-intl/server"
import { routing } from "@/lib/i18n/i18n-routing"
import { Locale } from "@/types/locale"

export default getRequestConfig(
  async ({ requestLocale }: GetRequestConfigParams) => {
    let locale = (await requestLocale) as Locale

    if (!locale || !routing.locales.includes(locale)) {
      locale = routing.defaultLocale
    }

    return {
      locale,
      messages: (await import(`../../locales/${locale}.json`)).default,
    }
  }
)
