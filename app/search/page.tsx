import { Suspense } from "react"

import SearchToolbarLoader from "@/app/search/components/search-toolbar-loader"
import SearchResults from "@/app/search/components/search-results"
import SearchResultsSkeleton from "@/app/search/components/search-results-skeleton"

type SearchPageProps = {
  searchParams: Promise<Record<string, string | undefined>>
}

export default function SearchPage({ searchParams }: SearchPageProps) {
  return (
    <main className="mt-(--header-height)">
      <Suspense>
        <SearchToolbarLoader searchParams={searchParams} />
      </Suspense>

      <Suspense fallback={<SearchResultsSkeleton />}>
        <SearchResults searchParams={searchParams} />
      </Suspense>
    </main>
  )
}
