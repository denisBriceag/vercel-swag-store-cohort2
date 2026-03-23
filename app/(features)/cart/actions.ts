"use server"

import { revalidatePath } from "next/cache"

import {
  addToCart,
  createCart,
  removeFromCart,
  updateQuantity,
} from "@/lib/api/cart.api"
import { getCartToken } from "@/lib/cart/cart-token"
import { setCartCount, clearCartCount } from "@/lib/cart/cart-count"
import { BaseResponse } from "@/types/response"

type ActionType = BaseResponse & { error?: string }

export async function addToCartAction(
  productId: string,
  quantity: number
): Promise<ActionType> {
  try {
    const token = await getCartToken()

    if (!token) {
      await createCart()
    }

    const cart = await addToCart(productId, quantity)

    await setCartCount(cart.data.totalItems)

    revalidatePath("/cart")

    return { success: true }
  } catch {
    return { success: false, error: "Failed to add item to cart." }
  }
}

export async function updateQuantityAction(
  productId: string,
  quantity: number
): Promise<ActionType> {
  try {
    const cart = await updateQuantity(productId, quantity)

    await setCartCount(cart.data.totalItems)

    revalidatePath("/cart")

    return { success: true }
  } catch {
    return { success: false, error: "Failed to update quantity." }
  }
}

export async function removeFromCartAction(
  productId: string
): Promise<ActionType> {
  try {
    const cart = await removeFromCart(productId)

    await setCartCount(cart.data.totalItems)

    revalidatePath("/cart")

    return { success: true }
  } catch {
    return { success: false, error: "Failed to remove item." }
  }
}

export async function clearCartAction(): Promise<void> {
  await clearCartCount()

  revalidatePath("/cart")
}
