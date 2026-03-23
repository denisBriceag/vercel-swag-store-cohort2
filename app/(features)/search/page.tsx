import { Suspense } from "react"
import { Metadata } from "next"

import SearchToolbarLoader from "./components/search-toolbar-loader"
import SearchToolbarSkeleton from "./components/search-toolbar-skeleton"
import SearchResults from "./components/search-results"
import SearchResultsSkeleton from "./components/search-results-skeleton"

type SearchPageProps = {
  searchParams: Promise<Record<string, string | undefined>>
}

export async function generateMetadata({
  searchParams,
}: SearchPageProps): Promise<Metadata> {
  const { q } = await searchParams
  const title = q ? `Search results for "${q}"` : "Search"

  return {
    title,
    openGraph: {
      title,
      url: q ? `/search?q=${encodeURIComponent(q)}` : "/search",
    },
  }
}

export default function SearchPage({ searchParams }: SearchPageProps) {
  return (
    <>
      <Suspense fallback={<SearchToolbarSkeleton />}>
        <SearchToolbarLoader searchParams={searchParams} />
      </Suspense>

      <Suspense fallback={<SearchResultsSkeleton />}>
        <SearchResults searchParams={searchParams} />
      </Suspense>
    </>
  )
}
