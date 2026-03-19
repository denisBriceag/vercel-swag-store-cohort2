import Navigation from "@/components/header/navigation"
import Logo from "@/components/header/logo"
import Promo from "@/components/header/promo"
import MobileMenu from "@/components/header/mobile-menu"
import Link from "next/link"

export default function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-10 flex h-(--header-height) flex-col justify-center border-b border-sidebar-border bg-background">
      <div className="flex h-20 items-center justify-between gap-8 bg-background px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <MobileMenu />

          <Link href="/">
            <Logo />
          </Link>

          <Navigation />
        </div>
      </div>

      <Promo />
    </header>
  )
}
