"use client"

import { useEffect, useState, useTransition } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Loader2, Search } from "lucide-react"
import { VisuallyHidden } from "radix-ui"

import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

import { Category } from "@/types/categories/category"
import { ProductSearchQuery } from "@/types/products/product-search-query"

import {
  DEFAULT_LIMIT,
  DEFAULT_PAGE,
  MIN_SEARCH_LENGTH,
  SEARCH_DEBOUNCE_MS,
} from "@/constants/search-constants"
import { buildUpdatedSearchParams } from "@/utils/search/build-updated-search-params"

type SearchToolbarProps = {
  categories: Category[]
  initialQuery: ProductSearchQuery
}

export default function SearchToolbar({
  initialQuery,
  categories,
}: SearchToolbarProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()

  const [searchValue, setSearchValue] = useState(initialQuery.search ?? "")

  const categoryValue = initialQuery.category ?? "all"
  const featuredValue = Boolean(initialQuery.featured)

  function navigateWithParams(updates: Partial<ProductSearchQuery>) {
    const params = buildUpdatedSearchParams(searchParams, updates)

    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`, { scroll: false })
    })
  }

  useEffect(() => {
    const setSearchedParams = () => {
      setSearchValue(initialQuery.search ?? "")
    }

    setSearchedParams()
  }, [initialQuery.search])

  useEffect(() => {
    const trimmed = searchValue.trim()

    const timeoutId = setTimeout(() => {
      if (trimmed.length >= MIN_SEARCH_LENGTH) {
        if (trimmed === (initialQuery.search ?? "")) return

        navigateWithParams({
          page: DEFAULT_PAGE,
          limit: initialQuery.limit ?? DEFAULT_LIMIT,
          search: trimmed,
        })
        return
      }

      if (trimmed.length === 0 && initialQuery.search) {
        navigateWithParams({
          page: DEFAULT_PAGE,
          limit: initialQuery.limit ?? DEFAULT_LIMIT,
          search: undefined,
        })
      }
    }, SEARCH_DEBOUNCE_MS)

    return () => clearTimeout(timeoutId)
  }, [searchValue, initialQuery.search, initialQuery.limit])

  function handleCategoryChange(value: string) {
    navigateWithParams({
      page: DEFAULT_PAGE,
      limit: initialQuery.limit ?? DEFAULT_LIMIT,
      category: value as ProductSearchQuery["category"],
    })
  }

  function handleFeaturedChange(checked: boolean) {
    navigateWithParams({
      page: DEFAULT_PAGE,
      limit: initialQuery.limit ?? DEFAULT_LIMIT,
      featured: checked ? true : undefined,
    })
  }

  function handleManualSearch() {
    const trimmed = searchValue.trim()

    navigateWithParams({
      page: DEFAULT_PAGE,
      limit: initialQuery.limit ?? DEFAULT_LIMIT,
      search: trimmed.length >= MIN_SEARCH_LENGTH ? trimmed : undefined,
    })
  }

  return (
    <search className="p-6">
      <form
        className="w-full"
        onSubmit={(event) => {
          event.preventDefault()
          handleManualSearch()
        }}
      >
        <FieldGroup className="flex-col items-stretch gap-4 md:flex-row md:items-center md:justify-end">
          <Field orientation="horizontal" className="w-fit">
            <Checkbox
              id="featured-products"
              checked={featuredValue}
              onCheckedChange={handleFeaturedChange}
            />
            <Label htmlFor="featured-products">Featured products</Label>
          </Field>

          <Field className="w-full md:w-fit">
            <Select value={categoryValue} onValueChange={handleCategoryChange}>
              <SelectTrigger
                className="w-full md:max-w-56"
                aria-label="Filter by category"
              >
                <SelectValue placeholder="Select category" />
              </SelectTrigger>

              <SelectContent>
                <SelectGroup>
                  <SelectItem value="all">All categories</SelectItem>

                  {categories.map((category) => (
                    <SelectItem
                      key={category.slug}
                      value={category.slug}
                      disabled={!category.productCount}
                    >
                      {category.slug}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            {!categories.length && (
              <FieldDescription>
                Categories are not available at the moment.
              </FieldDescription>
            )}
          </Field>

          <Field orientation="horizontal" className="w-full md:w-fit">
            <VisuallyHidden.VisuallyHidden>
              <FieldLabel htmlFor="search-input">
                Search for products
              </FieldLabel>
            </VisuallyHidden.VisuallyHidden>

            <Input
              id="search-input"
              type="search"
              placeholder="Search products..."
              value={searchValue}
              onChange={(event) => setSearchValue(event.target.value)}
              className="w-full md:min-w-96"
            />

            <Button
              type="submit"
              variant="outline"
              size="icon"
              aria-label="Search"
              disabled={
                isPending ||
                !searchValue.trim() ||
                searchValue.trim() === (initialQuery.search ?? "")
              }
            >
              {isPending ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <Search className="size-4" />
              )}
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </search>
  )
}
