import { notFound } from "next/navigation"
import { Metadata } from "next"
import { cacheLife, cacheTag } from "next/cache"
import { CACHE_TAGS, STATIC_PAGES } from "@/constants/app-constants"

type StaticPageSlug = keyof typeof STATIC_PAGES
type PageProps = {
  params: Promise<{ slug: StaticPageSlug }>
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params
  const title = STATIC_PAGES[slug]

  if (!title) return {}

  return {
    title,
    openGraph: {
      title,
      url: `/${slug}`,
    },
  }
}

export function generateStaticParams(): { slug: string }[] {
  return Object.keys(STATIC_PAGES).map((slug) => ({ slug }))
}

export default async function Page({ params }: PageProps) {
  "use cache"
  cacheLife(CACHE_TAGS.PAGES)
  cacheTag(CACHE_TAGS.PAGES)

  const { slug } = await params
  const title = STATIC_PAGES[slug]

  if (!title) notFound()

  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold tracking-tight text-foreground">
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
