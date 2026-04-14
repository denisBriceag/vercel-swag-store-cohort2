import { LogoDesktop, LogoMobile } from "@/icons"

export default function Logo() {
  return (
    <>
      <LogoDesktop
        className="hidden text-primary md:block dark:text-white"
        aria-label="Vercel Swag Store"
        width={160}
        height={20}
      />

      <LogoMobile
        className="block text-primary md:hidden dark:text-white"
        aria-label="Vercel Swag Store"
        width={32}
        height={32}
      />
    </>
  )
}
