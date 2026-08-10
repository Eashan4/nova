"use client"

import { motion } from "framer-motion"
import { Heart, ShoppingBag } from "lucide-react"
import { formatINR } from "@/data"
import type { Product } from "@/data"
import { useStore } from "@/StoreContext"
import { Rating, TagPill, cn } from "@/components/ui"

export function ProductCard({ product }: { product: Product }) {
  const { addToCart, toggleWishlist, isWishlisted } = useStore()
  const wishlisted = isWishlisted(product.id)
  const discount = product.mrp ? Math.round(((product.mrp - product.price) / product.mrp) * 100) : 0

  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-shadow duration-500 hover:shadow-[0_24px_60px_-24px_rgba(17,17,17,0.25)]"
    >
      <div className="relative overflow-hidden bg-gradient-to-br from-[#F4F3F1] to-[#E8E7E4]">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="aspect-[4/3] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <p className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-3 p-5 text-xs leading-relaxed text-white opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          {product.description}
        </p>

        <div className="absolute left-3.5 top-3.5 flex gap-2">
          {discount > 0 && <TagPill className="bg-ink/90">-{discount}%</TagPill>}
        </div>
        <div className="absolute right-3.5 top-3.5 flex gap-2">
          {product.tag === "new" && <TagPill className="bg-white text-ink">New</TagPill>}
          {product.tag === "bestseller" && <TagPill className="bg-white text-ink">Bestseller</TagPill>}
        </div>

        <button
          type="button"
          onClick={() => toggleWishlist(product.id)}
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          className={cn(
            "absolute bottom-3.5 right-3.5 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border transition-all duration-300",
            wishlisted
              ? "border-ink bg-ink text-white"
              : "border-line bg-white/90 text-ink opacity-0 backdrop-blur group-hover:opacity-100 hover:border-ink"
          )}
        >
          <Heart size={16} fill={wishlisted ? "currentColor" : "none"} />
        </button>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-5">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-muted">
            {product.category}
          </span>
          <span className="flex items-center gap-1.5 text-xs text-muted">
            <Rating value={product.rating} />
            <span className="font-mono text-[10px]">
              {product.rating} ({product.reviews.toLocaleString("en-IN")})
            </span>
          </span>
        </div>

        <h3 className="font-display text-lg font-semibold tracking-tight text-ink transition-colors group-hover:text-muted">
          {product.name}
        </h3>

        <div className="mt-auto flex items-baseline gap-2 pt-1">
          <span className="font-display text-xl font-bold tracking-tight">
            {formatINR(product.price)}
          </span>
          {product.mrp && (
            <span className="text-sm text-muted line-through">{formatINR(product.mrp)}</span>
          )}
        </div>

        <button
          type="button"
          onClick={() => addToCart(product.id)}
          className="mt-3 inline-flex cursor-pointer items-center justify-center gap-2 rounded-full border border-ink/15 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] transition-all duration-300 hover:border-ink hover:bg-ink hover:text-white active:scale-[0.98]"
        >
          <ShoppingBag size={13} />
          Add to Cart
        </button>
      </div>
    </motion.article>
  )
}