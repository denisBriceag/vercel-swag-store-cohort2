"use server"

import { revalidatePath } from "next/cache"

import {
  addToCart,
  createCart,
  removeFromCart,
  updateQuantity,
} from "@/lib/data/cart.api"
import { getCartToken } from "@/lib/cart/cart-token"
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

    await addToCart(productId, quantity)

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
    await updateQuantity(productId, quantity)

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
    await removeFromCart(productId)

    revalidatePath("/cart")

    return { success: true }
  } catch {
    return { success: false, error: "Failed to remove item." }
  }
}

export async function clearCartAction(): Promise<void> {
  revalidatePath("/cart")
}
