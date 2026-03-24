import { Suspense } from "react"
import { notFound } from "next/navigation"
import { Metadata } from "next"
import { cacheLife } from "next/cache"

const PAGES = {
  about: "About",
  contact: "Contact",
  faq: "FAQ",
  privacy: "Privacy",
  terms: "Terms",
  "shipping-returns": "Shipping & Returns",
} as const

type PageProps = {
  params: Promise<{ slug: keyof typeof PAGES }>
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params
  const title = PAGES[slug]

  if (!title) return {}

  return {
    title,
    openGraph: {
      title,
      url: `/${slug}`,
    },
  }
}

async function PageContent({ params }: PageProps) {
  "use cache"
  cacheLife("max")

  const { slug } = await params
  const title = PAGES[slug]

  if (!title) notFound()

  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-foreground">
        {title}
      </h1>

      <div className="mt-8 space-y-4 text-sm leading-7 text-muted-foreground">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>

        <p>
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
          dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
          proident, sunt in culpa qui officia deserunt mollit anim id est
          laborum.
        </p>

        <p>
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem
          accusantium doloremque laudantium, totam rem aperiam eaque ipsa quae
          ab illo inventore veritatis et quasi architecto beatae vitae dicta
          sunt explicabo.
        </p>
      </div>
    </article>
  )
}

export default function Page({ params }: PageProps) {
  return (
    <Suspense>
      <PageContent params={params} />
    </Suspense>
  )
}
