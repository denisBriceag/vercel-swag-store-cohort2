import { Suspense } from "react"
import { Metadata } from "next"

import SearchToolbarLoader from "./components/search-toolbar-loader"
import SearchToolbarSkeleton from "./components/search-toolbar-skeleton"
import SearchResults from "./components/search-results"
import SearchResultsSkeleton from "./components/search-results-skeleton"

import { SearchPageProps } from "./types/search-params-props"

export async function generateMetadata({
  searchParams,
}: SearchPageProps): Promise<Metadata> {
  const { search } = await searchParams
  const title = search ? `Search results for "${search}"` : "Search"

  return {
    title,
    openGraph: {
      title,
      url: search ? `/search?search=${encodeURIComponent(search)}` : "/search",
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
