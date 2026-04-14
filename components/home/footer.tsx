import Link from "next/link"

import { Suspense } from "react"

import FooterSocialLinks from "@/components/home/footer-social-links"
import StoreName from "@/components/home/store-name"

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

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background text-foreground">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-8 py-10 md:px-12 lg:px-16">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-start">
          <div className="max-w-sm">
            <Suspense
              fallback={
                <span className="inline-block h-3.5 w-20 animate-pulse rounded bg-muted" />
              }
            >
              <StoreName />
            </Suspense>

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
            ©{" "}
            <Suspense
              fallback={
                <span className="inline-block h-3 w-16 animate-pulse rounded bg-muted align-middle" />
              }
            >
              <StoreName />
            </Suspense>
            . All rights reserved.
          </p>

          <Suspense
            fallback={
              <div className="flex gap-4">
                <span className="h-3 w-12 animate-pulse rounded bg-muted" />
                <span className="h-3 w-10 animate-pulse rounded bg-muted" />
                <span className="h-3 w-14 animate-pulse rounded bg-muted" />
              </div>
            }
          >
            <FooterSocialLinks />
          </Suspense>
        </div>
      </div>
    </footer>
  )
}
