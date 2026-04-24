import { cacheLife, cacheTag } from "next/cache"

import { apiClient } from "@/lib/data/client"

import {
  clearCartToken,
  getCartToken,
  setCartToken,
} from "@/lib/cart/cart-token"
import { CartWithProducts } from "@/types/cart/cart-products"
import { UpdateCart } from "@/types/cart/update-cart"
import { ApiHttpError } from "@/types/server-error"

import { cartCacheTag, CACHE_TAGS } from "@/constants/app-constants"

async function cartHeaders(): Promise<Record<string, string>> {
  const token = await getCartToken()

  return token ? { "x-cart-token": token } : {}
}

/**
 * The cart response will be cached for a relatively small amount of time (approx. 1 minute)
 * Then the cart tag will be updated on demand using updateTag api inside related server actions.
 * */
async function getCachedCart(
  token: string
): Promise<CartWithProducts | null> {
  "use cache"
  cacheTag(cartCacheTag(token))
  cacheLife(CACHE_TAGS.CART)

  try {
    const response = await apiClient<CartWithProducts>({
      method: "GET",
      path: `cart`,
      headers: { "x-cart-token": token },
    })

    return response.data
  } catch (error) {
    if (error instanceof ApiHttpError && error.status === 404) {
      return null
    }

    throw error
  }
}

export async function getCart(): Promise<CartWithProducts | null> {
  const token = await getCartToken()

  if (!token) return null

  return getCachedCart(token)
}

export async function createCart() {
  const cart = await apiClient<CartWithProducts>({
    method: "POST",
    path: `cart/create`,
  })

  await setCartToken(cart.data.token)

  return cart
}

export async function addToCart(productId: string, quantity: number) {
  return apiClient<CartWithProducts, UpdateCart>({
    method: "POST",
    path: `cart`,
    headers: await cartHeaders(),
    body: {
      productId,
      quantity,
    },
  })
}

export async function updateQuantity(productId: string, quantity: number) {
  return apiClient<CartWithProducts, Omit<UpdateCart, "productId">>({
    method: "PATCH",
    path: `cart/${productId}`,
    headers: await cartHeaders(),
    body: {
      quantity,
    },
  })
}

export async function removeFromCart(productId: string) {
  return apiClient<CartWithProducts>({
    method: "DELETE",
    path: `cart/${productId}`,
    headers: await cartHeaders(),
  })
}

export async function clearCart(): Promise<void> {
  await clearCartToken()
}
