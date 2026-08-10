import type { Metadata } from "next"
import { Products } from "./Products"

export const metadata: Metadata = {
  title: "All Products",
  description:
    "The full Nova collection — audio, wearables, power and smart home. Free shipping over ₹999, 1-year warranty on everything.",
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string; wishlist?: string }>
}) {
  const params = await searchParams
  return (
    <Products
      initial={{
        q: params.q ?? undefined,
        category: params.category ?? undefined,
        wishlist: params.wishlist === "1",
      }}
    />
  )
}