import { StockInfo } from "@/types/stock/stock-info"

type StockBadgeProps = {
  stockInfo: StockInfo | null
}

export default function StockBadge({ stockInfo }: StockBadgeProps) {
  if (stockInfo === null) return null

  if (!stockInfo.inStock) {
    return (
      <span className="inline-flex w-fit items-center rounded-full border border-destructive/30 bg-destructive/10 px-2.5 py-0.5 text-xs font-medium text-destructive">
        Out of Stock
      </span>
    )
  }

  if (stockInfo.lowStock) {
    return (
      <span className="inline-flex w-fit items-center rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-0.5 text-xs font-medium text-amber-600 dark:text-amber-400">
        Low Stock — only {stockInfo.stock} left
      </span>
    )
  }

  return (
    <span className="inline-flex w-fit items-center rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
      In Stock
    </span>
  )
}
