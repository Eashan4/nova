"use client"

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react"
import { products } from "@/data"

export interface CartItem {
  productId: string
  qty: number
}

interface StoreState {
  items: CartItem[]
  wishlist: string[]
  drawerOpen: boolean
  count: number
  subtotal: number
  addToCart: (productId: string, qty?: number) => void
  increment: (productId: string) => void
  decrement: (productId: string) => void
  removeFromCart: (productId: string) => void
  clearCart: () => void
  toggleWishlist: (productId: string) => void
  isWishlisted: (productId: string) => boolean
  openDrawer: () => void
  closeDrawer: () => void
}

const StoreContext = createContext<StoreState | null>(null)

function load<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key)
    if (!raw) return fallback
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [wishlist, setWishlist] = useState<string[]>([])
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    setItems(load<CartItem[]>("nova-cart", []))
    setWishlist(load<string[]>("nova-wishlist", []))
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) return
    try {
      window.localStorage.setItem("nova-cart", JSON.stringify(items))
    } catch {
      /* storage unavailable */
    }
  }, [items, hydrated])

  useEffect(() => {
    if (!hydrated) return
    try {
      window.localStorage.setItem("nova-wishlist", JSON.stringify(wishlist))
    } catch {
      /* storage unavailable */
    }
  }, [wishlist, hydrated])

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [drawerOpen])

  const addToCart = useCallback((productId: string, qty = 1) => {
    setItems((prev) => {
      const found = prev.find((i) => i.productId === productId)
      if (found) {
        return prev.map((i) => (i.productId === productId ? { ...i, qty: i.qty + qty } : i))
      }
      return [...prev, { productId, qty }]
    })
    setDrawerOpen(true)
  }, [])

  const increment = useCallback((productId: string) => {
    setItems((prev) =>
      prev.map((i) => (i.productId === productId ? { ...i, qty: i.qty + 1 } : i))
    )
  }, [])

  const decrement = useCallback((productId: string) => {
    setItems((prev) =>
      prev
        .map((i) => (i.productId === productId ? { ...i, qty: i.qty - 1 } : i))
        .filter((i) => i.qty > 0)
    )
  }, [])

  const removeFromCart = useCallback((productId: string) => {
    setItems((prev) => prev.filter((i) => i.productId !== productId))
  }, [])

  const clearCart = useCallback(() => setItems([]), [])

  const toggleWishlist = useCallback((productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    )
  }, [])

  const isWishlisted = useCallback(
    (productId: string) => wishlist.includes(productId),
    [wishlist]
  )

  const { count, subtotal } = useMemo(() => {
    let c = 0
    let s = 0
    for (const item of items) {
      const product = products.find((p) => p.id === item.productId)
      if (!product) continue
      c += item.qty
      s += product.price * item.qty
    }
    return { count: c, subtotal: s }
  }, [items])

  const value: StoreState = {
    items,
    wishlist,
    drawerOpen,
    count,
    subtotal,
    addToCart,
    increment,
    decrement,
    removeFromCart,
    clearCart,
    toggleWishlist,
    isWishlisted,
    openDrawer: () => setDrawerOpen(true),
    closeDrawer: () => setDrawerOpen(false),
  }

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export function useStore() {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error("useStore must be used within StoreProvider")
  return ctx
}