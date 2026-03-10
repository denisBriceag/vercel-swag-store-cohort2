import { Product } from "@/types/products/product"

export type CartItemWithProduct = {
  addedAt: string
  lineTotal: number
  product: Product
  productId: Product["id"]
  quantity: number
}
