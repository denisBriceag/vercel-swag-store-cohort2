import { Suspense } from "react"

import SearchToolbarLoader from "./components/search-toolbar-loader"
import SearchToolbarSkeleton from "./components/search-toolbar-skeleton"
import SearchResults from "./components/search-results"
import SearchResultsSkeleton from "./components/search-results-skeleton"

type SearchPageProps = {
  searchParams: Promise<Record<string, string | undefined>>
}

export default function SearchPage({ searchParams }: SearchPageProps) {
  return (
    <main className="mt-(--header-height)">
      <Suspense fallback={<SearchToolbarSkeleton />}>
        <SearchToolbarLoader searchParams={searchParams} />
      </Suspense>

      <Suspense fallback={<SearchResultsSkeleton />}>
        <SearchResults searchParams={searchParams} />
      </Suspense>
    </main>
  )
}
