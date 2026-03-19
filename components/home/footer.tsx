import Link from "next/link"

const companyMenu = ["About", "Contact", "FAQ"]
const legalMenu = ["Privacy", "Terms", "Shipping & Returns"]

export function Footer() {
  return (
    <footer className="border-t border-border bg-background text-foreground">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-8 py-10 md:px-12 lg:px-16">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-start">
          <div className="max-w-sm">
            <Link href="/" className="text-sm font-semibold tracking-tight">
              SwagStore
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
                {companyMenu.map((item, i) => (
                  <li key={i}>
                    <Link
                      href="/about"
                      className="transition-colors hover:text-foreground"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3">
              <p className="font-medium text-foreground">Legal</p>

              <ul className="space-y-2 text-muted-foreground">
                {legalMenu.map((item, i) => (
                  <li key={i}>
                    <Link
                      href="/privacy"
                      className="transition-colors hover:text-foreground"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>

        <div className="flex flex-col gap-3 border-t border-border pt-6 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>© 2026 SwagStore. All rights reserved.</p>

          <Link
            href="https://github.com/denisBriceag/vercel-swag-store-cohort2"
            target="_blank"
            className="transition-colors hover:text-foreground"
          >
            GitHub
          </Link>
        </div>
      </div>
    </footer>
  )
}
