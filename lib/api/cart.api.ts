import { apiClient } from "@/lib/api/client"
import {
  clearCartToken,
  getCartToken,
  setCartToken,
} from "@/lib/cart/cart-token"
import { CartWithProducts } from "@/types/cart/cart-products"
import { UpdateCart } from "@/types/cart/update-cart"

async function cartHeaders(): Promise<Record<string, string>> {
  const token = await getCartToken()
  return token ? { "x-cart-token": token } : {}
}

export async function getCart(): Promise<CartWithProducts> {
  return apiClient<CartWithProducts>({
    method: "GET",
    path: `/cart`,
    headers: await cartHeaders(),
  })
}

export async function createCart(): Promise<CartWithProducts> {
  const cart = await apiClient<CartWithProducts>({
    method: "POST",
    path: `/cart/create`,
  })

  await setCartToken(cart.token)

  return cart
}

export async function addToCart(
  productId: string,
  quantity: number
): Promise<CartWithProducts> {
  return apiClient<CartWithProducts, UpdateCart>({
    method: "POST",
    path: `/cart`,
    headers: await cartHeaders(),
    body: {
      productId,
      quantity,
    },
  })
}

export async function updateQuantity(
  productId: string,
  quantity: number
): Promise<CartWithProducts> {
  return apiClient<CartWithProducts, Omit<UpdateCart, "productId">>({
    method: "PATCH",
    path: `/cart/${productId}`,
    headers: await cartHeaders(),
    body: {
      quantity,
    },
  })
}

export async function removeFromCart(
  productId: string
): Promise<CartWithProducts> {
  return apiClient<CartWithProducts>({
    method: "DELETE",
    path: `/cart/${productId}`,
    headers: await cartHeaders(),
  })
}

export async function clearCart(): Promise<void> {
  await clearCartToken()
}
