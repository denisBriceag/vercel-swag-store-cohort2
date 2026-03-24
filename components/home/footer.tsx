import Link from "next/link"
import { cacheLife } from "next/cache"

import { getAppConfig } from "@/lib/api/app-configuration.api"

const companyMenu = [
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "FAQ", href: "/faq" },
]

const legalMenu = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Shipping & Returns", href: "/shipping-returns" },
]

export async function Footer() {
  "use cache"
  cacheLife("weeks")

  const res = await getAppConfig()

  const config = res.success ? res.data : null

  return (
    <footer className="border-t border-border bg-background text-foreground">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-8 py-10 md:px-12 lg:px-16">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-start">
          <div className="max-w-sm">
            <Link href="/" className="text-sm font-semibold tracking-tight">
              {config?.storeName ?? "SwagStore"}
            </Link>

            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Premium products for people who care about clean design, quality
              details, and everyday essentials.
            </p>
          </div>

          <nav className="grid grid-cols-2 gap-x-10 gap-y-6 text-sm">
            <div className="space-y-3">
              <p className="font-medium text-foreground">Company</p>

              <ul className="space-y-2 text-muted-foreground">
                {companyMenu.map(({ label, href }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="transition-colors hover:text-foreground"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3">
              <p className="font-medium text-foreground">Legal</p>

              <ul className="space-y-2 text-muted-foreground">
                {legalMenu.map(({ label, href }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="transition-colors hover:text-foreground"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>

        <div className="flex flex-col gap-3 border-t border-border pt-6 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {config?.storeName ?? "SwagStore"}. All
            rights reserved.
          </p>

          {config?.socialLinks && (
            <div className="flex gap-4">
              <Link
                href={config.socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-foreground"
              >
                Twitter
              </Link>

              <Link
                href={config.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-foreground"
              >
                GitHub
              </Link>

              <Link
                href={config.socialLinks.discord}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-foreground"
              >
                Discord
              </Link>
            </div>
          )}
        </div>
      </div>
    </footer>
  )
}
