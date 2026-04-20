import * as z from "zod/mini"

z.config(z.locales.en())

/**
 * All the validations are taken from open api docs
 * */

export const AddToCartSchema = z.object({
  productId: z.string().check(z.minLength(1, "Product ID is required")),
  quantity: z.number().check(z.gte(1, "Quantity must be at least 1")),
})

export const UpdateCartItemSchema = z.object({
  productId: z.string().check(z.minLength(1, "Product ID is required")),
  quantity: z.number().check(z.gte(0, "Quantity must be 0 or greater")),
})

export const CartItemIdSchema = z
  .string()
  .check(z.minLength(1, "Product ID is required"))
