/**
 * @description We don't use next Image here because svg is already well optimized.
 * */
export default function Logo() {
  return (
    <>
      <picture className="hidden md:block">
        <source
          srcSet="/logo-desktop-dark.svg"
          media="(prefers-color-scheme: dark)"
        />
        <img
          src="/logo-desktop-light.svg"
          alt="Vercel Swag Store"
          width={160}
          height={20}
          loading="eager"
        />
      </picture>

      <picture className="block md:hidden">
        <source
          srcSet="/logo-mobile-dark.svg"
          media="(prefers-color-scheme: dark)"
        />
        <img
          src="/logo-mobile-light.svg"
          alt="Vercel Swag Store"
          width={32}
          height={32}
          loading="eager"
        />
      </picture>
    </>
  )
}
