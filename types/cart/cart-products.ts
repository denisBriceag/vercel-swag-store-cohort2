import { CartItemWithProduct } from "@/types/cart/cart-item-product"

export type CartWithProducts = {
  createdAt: string
  updatedAt: string
  currency: string
  items: CartItemWithProduct[]
  subtotal: number
  token: string
  totalItems: number
}
