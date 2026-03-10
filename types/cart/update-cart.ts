import { Product } from "@/types/products/product"

export type UpdateCart = {
  productId: Product["id"]
  quantity: number
}
