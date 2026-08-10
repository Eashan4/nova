"use client"

import Link from "next/link"
import { AnimatePresence, motion } from "framer-motion"
import { X, Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react"
import { products, formatINR, storeInfo } from "@/data"
import { useStore } from "@/StoreContext"
import { Button } from "@/components/ui"

export function CartDrawer() {
  const { items, drawerOpen, closeDrawer, increment, decrement, removeFromCart, subtotal, count } =
    useStore()

  const shipping = subtotal === 0 ? 0 : subtotal >= 999 ? 0 : 99

  return (
    <AnimatePresence>
      {drawerOpen && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeDrawer}
            className="fixed inset-0 z-40 bg-ink/40 backdrop-blur-[2px]"
          />
          <motion.aside
            key="drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 32 }}
            className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col border-l border-line bg-bg shadow-2xl"
            role="dialog"
            aria-label="Shopping cart"
          >
            <header className="flex items-center justify-between border-b border-line bg-surface px-6 py-5">
              <div className="flex items-center gap-3">
                <ShoppingBag size={17} className="text-ink" />
                <h2 className="font-display text-lg font-semibold tracking-tight">
                  Your Cart
                </h2>
                <span className="rounded-full bg-ink px-2.5 py-0.5 font-mono text-[10px] text-white">
                  {count}
                </span>
              </div>
              <button
                type="button"
                onClick={closeDrawer}
                aria-label="Close cart"
                className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-line transition-colors hover:border-ink hover:bg-ink hover:text-white"
              >
                <X size={16} />
              </button>
            </header>

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-full border border-line bg-surface">
                  <ShoppingBag size={22} className="text-muted" />
                </span>
                <p className="font-display text-lg font-semibold tracking-tight">
                  Your cart is empty
                </p>
                <p className="max-w-xs text-sm leading-relaxed text-muted">
                  Add something from the collection and it will appear here.
                </p>
                <Button variant="outline" onClick={closeDrawer}>
                  Continue Shopping
                </Button>
              </div>
            ) : (
              <>
                <div className="flex-1 space-y-3 overflow-y-auto px-6 py-5">
                  <AnimatePresence initial={false}>
                    {items.map((item) => {
                      const product = products.find((p) => p.id === item.productId)
                      if (!product) return null
                      return (
                        <motion.div
                          key={item.productId}
                          layout
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, x: 40 }}
                          className="flex gap-4 rounded-xl border border-line bg-surface p-3.5"
                        >
                          <div className="w-20 flex-shrink-0 overflow-hidden rounded-lg bg-gradient-to-br from-[#F4F3F1] to-[#E8E7E4]">
                            <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
                          </div>
                          <div className="flex min-w-0 flex-1 flex-col">
                            <div className="flex items-start justify-between gap-2">
                              <div className="min-w-0">
                                <p className="truncate font-display text-sm font-semibold tracking-tight">
                                  {product.name}
                                </p>
                                <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted">
                                  {product.category}
                                </p>
                              </div>
                              <button
                                type="button"
                                onClick={() => removeFromCart(product.id)}
                                aria-label={`Remove ${product.name}`}
                                className="cursor-pointer text-muted transition-colors hover:text-danger"
                              >
                                <Trash2 size={15} />
                              </button>
                            </div>
                            <div className="mt-auto flex items-center justify-between pt-2">
                              <div className="flex items-center rounded-full border border-line">
                                <button
                                  type="button"
                                  onClick={() => decrement(product.id)}
                                  aria-label="Decrease quantity"
                                  className="flex h-8 w-8 cursor-pointer items-center justify-center transition-colors hover:bg-ink hover:text-white"
                                >
                                  <Minus size={13} />
                                </button>
                                <span className="w-8 text-center font-mono text-xs">{item.qty}</span>
                                <button
                                  type="button"
                                  onClick={() => increment(product.id)}
                                  aria-label="Increase quantity"
                                  className="flex h-8 w-8 cursor-pointer items-center justify-center transition-colors hover:bg-ink hover:text-white"
                                >
                                  <Plus size={13} />
                                </button>
                              </div>
                              <p className="font-display text-sm font-bold tracking-tight">
                                {formatINR(product.price * item.qty)}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      )
                    })}
                  </AnimatePresence>
                  <p className="pt-1 text-center font-mono text-[9px] uppercase tracking-[0.2em] text-muted">
                    {storeInfo.email} · 1-year warranty included
                  </p>
                </div>

                <footer className="space-y-4 border-t border-line bg-surface px-6 py-5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted">Subtotal</span>
                    <span className="font-display text-base font-bold tracking-tight">
                      {formatINR(subtotal)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted">Shipping</span>
                    <span className="font-mono text-xs">
                      {shipping === 0 ? (
                        <span className="text-success">Free</span>
                      ) : (
                        formatINR(shipping)
                      )}
                    </span>
                  </div>
                  {shipping > 0 && (
                    <p className="rounded-lg border border-line bg-bg px-3 py-2 font-mono text-[10px] uppercase tracking-[0.15em] text-muted">
                      Add {formatINR(999 - subtotal)} more for free shipping
                    </p>
                  )}
                  <Link
                    href="/checkout"
                    onClick={closeDrawer}
                    className="inline-flex w-full cursor-pointer items-center justify-between rounded-full bg-ink px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-ink/85"
                  >
                    Proceed to Checkout
                    <ArrowRight size={14} />
                  </Link>
                </footer>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}