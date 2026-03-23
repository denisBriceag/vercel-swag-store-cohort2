import { getProductStock } from "@/lib/api/products.api"

import StockBadge from "./stock-badge"
import ProductActions from "./product-actions"

type ProductStockSectionProps = {
  productId: string
}

export default async function ProductStock({
  productId,
}: ProductStockSectionProps) {
  let stockInfo = null

  const res = await getProductStock(productId)

  if (res.success) stockInfo = res.data

  return (
    <>
      <StockBadge stockInfo={stockInfo} />

      <div className="border-t border-border pt-6">
        <ProductActions productId={productId} stockInfo={stockInfo} />
      </div>
    </>
  )
}
