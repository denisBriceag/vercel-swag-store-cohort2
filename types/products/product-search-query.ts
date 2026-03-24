import { CategorySlug } from "@/types/categories/category-slug"

export type ProductSearchQuery = Partial<{
  page: number
  limit: number
  category: CategorySlug
  search: string
  featured: boolean
}>

export type ProductSearchQueryStringified = Record<
  keyof ProductSearchQuery,
  string
>
