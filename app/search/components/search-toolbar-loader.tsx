import { getCategories } from "@/lib/api/category.api"
import { buildSearchQuery } from "@/app/search/utils/build-search-query"
import SearchToolbar from "@/app/search/components/search-toolbar"

type SearchToolbarLoaderProps = {
  searchParams: Promise<Record<string, string | undefined>>
}

export default async function SearchToolbarLoader({
  searchParams,
}: SearchToolbarLoaderProps) {
  const [params, categories] = await Promise.all([
    searchParams,
    getCategories(),
  ])

  const query = buildSearchQuery(params)

  return <SearchToolbar categories={categories.data} initialQuery={query} />
}
