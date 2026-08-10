"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Search, X, SlidersHorizontal, LayoutGrid } from "lucide-react"
import { products, categories } from "@/data"
import { useStore } from "@/StoreContext"
import { ProductCard } from "@/components/ProductCard"
import { Button, SectionLabel, cn } from "@/components/ui"

const priceBands = [
  { id: "all", label: "All prices", test: () => true },
  { id: "u5", label: "Under ₹5,000", test: (p: number) => p < 5000 },
  { id: "5to15", label: "₹5,000 – ₹15,000", test: (p: number) => p >= 5000 && p <= 15000 },
  { id: "15up", label: "Over ₹15,000", test: (p: number) => p > 15000 },
] as const

type SortId = "featured" | "price-asc" | "price-desc" | "rating"

export function Products({ initial }: { initial: { q?: string; category?: string; wishlist?: boolean } }) {
  const { wishlist } = useStore()
  const [query, setQuery] = useState(initial.q ?? "")
  const [category, setCategory] = useState<string>(initial.category ?? "All")
  const [band, setBand] = useState<(typeof priceBands)[number]["id"]>("all")
  const [sort, setSort] = useState<SortId>("featured")
  const [wishlistOnly, setWishlistOnly] = useState(initial.wishlist ?? false)

  const filtered = useMemo(() => {
    let list = [...products]
    if (category !== "All") list = list.filter((p) => p.category === category)
    if (wishlistOnly) list = list.filter((p) => wishlist.includes(p.id))
    const q = query.trim().toLowerCase()
    if (q) {
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      )
    }
    const bandDef = priceBands.find((b) => b.id === band)
    if (bandDef) list = list.filter((p) => bandDef.test(p.price))
    switch (sort) {
      case "price-asc":
        list.sort((a, b) => a.price - b.price)
        break
      case "price-desc":
        list.sort((a, b) => b.price - a.price)
        break
      case "rating":
        list.sort((a, b) => b.rating - a.rating || b.reviews - a.reviews)
        break
      default:
        list.sort(
          (a, b) =>
            Number(b.tag === "bestseller") - Number(a.tag === "bestseller") ||
            b.rating - a.rating
        )
    }
    return list
  }, [category, wishlistOnly, query, band, sort, wishlist])

  const reset = () => {
    setQuery("")
    setCategory("All")
    setBand("all")
    setSort("featured")
    setWishlistOnly(false)
  }

  const hasFilters =
    query.trim() !== "" || category !== "All" || band !== "all" || sort !== "featured" || wishlistOnly

  return (
    <main className="mx-auto max-w-7xl px-5 pb-24 pt-28 sm:px-8 lg:pt-32">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <SectionLabel>Shop</SectionLabel>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">
            The collection<span className="text-success">.</span>
          </h1>
          <p className="mt-3 text-sm text-muted">
            {filtered.length} of {products.length} products
            {wishlistOnly ? " · favourites only" : ""}
          </p>
        </div>
        <div className="flex h-11 items-center gap-2 rounded-full border border-line bg-surface px-4">
          <Search size={14} className="text-muted" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search name, type, vibe…"
            className="w-44 bg-transparent text-sm text-ink outline-none placeholder:text-muted sm:w-56"
            aria-label="Search products"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="cursor-pointer text-muted transition-colors hover:text-ink"
            >
              <X size={13} />
            </button>
          )}
        </div>
      </div>

      <div className="mt-10 flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => {
            setCategory("All")
            setWishlistOnly(false)
          }}
          className={cn(
            "cursor-pointer rounded-full border px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.15em] transition-all",
            category === "All" && !wishlistOnly
              ? "border-ink bg-ink text-white"
              : "border-line bg-surface text-muted hover:border-ink hover:text-ink"
          )}
        >
          All
        </button>
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => {
              setCategory(c)
              setWishlistOnly(false)
            }}
            className={cn(
              "cursor-pointer rounded-full border px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.15em] transition-all",
              category === c && !wishlistOnly
                ? "border-ink bg-ink text-white"
                : "border-line bg-surface text-muted hover:border-ink hover:text-ink"
            )}
          >
            {c}
          </button>
        ))}
        <button
          type="button"
          onClick={() => setWishlistOnly((v) => !v)}
          aria-pressed={wishlistOnly}
          className={cn(
            "cursor-pointer rounded-full border px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.15em] transition-all",
            wishlistOnly
              ? "border-ink bg-ink text-white"
              : "border-line bg-surface text-muted hover:border-ink hover:text-ink"
          )}
        >
          ♥ Favourites {wishlist.length > 0 ? `(${wishlist.length})` : ""}
        </button>
        {hasFilters && (
          <button
            type="button"
            onClick={reset}
            className="ml-1 inline-flex cursor-pointer items-center gap-1 font-mono text-[10px] uppercase tracking-[0.2em] text-muted underline-offset-4 hover:text-ink hover:underline"
          >
            <X size={11} /> Reset
          </button>
        )}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-x-8 gap-y-4">
        <div className="flex items-center gap-2">
          <SlidersHorizontal size={13} className="text-muted" />
          <div className="flex flex-wrap items-center gap-1.5">
            {priceBands.map((b) => (
              <button
                key={b.id}
                type="button"
                onClick={() => setBand(b.id)}
                className={cn(
                  "cursor-pointer rounded-full px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.12em] transition-colors",
                  band === b.id
                    ? "bg-ink text-white"
                    : "bg-surface text-muted hover:text-ink"
                )}
              >
                {b.label}
              </button>
            ))}
          </div>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <LayoutGrid size={13} className="text-muted" />
          <label htmlFor="sort" className="sr-only">
            Sort products
          </label>
          <select
            id="sort"
            value={sort}
            onChange={(e) => setSort(e.target.value as SortId)}
            className="cursor-pointer rounded-full border border-line bg-surface px-4 py-2 font-mono text-[10px] uppercase tracking-[0.12em] text-ink outline-none transition-colors focus:border-ink"
          >
            <option value="featured">Sort · Featured</option>
            <option value="price-asc">Price · Low to high</option>
            <option value="price-desc">Price · High to low</option>
            <option value="rating">Top rated</option>
          </select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-16 flex flex-col items-center gap-4 rounded-3xl border border-dashed border-line bg-surface px-6 py-16 text-center"
        >
          <p className="font-display text-2xl font-bold tracking-tight">
            {wishlistOnly
              ? "No favourites saved yet"
              : "Nothing matches those filters"}
          </p>
          <p className="max-w-sm text-sm leading-relaxed text-muted">
            {wishlistOnly
              ? "Tap the heart on any product and it will wait for you here."
              : "Try a broader search, or drop the filters and browse the full catalogue."}
          </p>
          {wishlistOnly && (
            <Link href="/products">
              <Button variant="outline">Browse all products</Button>
            </Link>
          )}
          {!wishlistOnly && (
            <Button variant="outline" onClick={reset}>
              Reset filters
            </Button>
          )}
        </motion.div>
      ) : (
        <motion.div
          key={`${category}-${wishlistOnly}-${band}-${sort}-${query}`}
          initial="hidden"
          animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05 } } }}
          className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {filtered.map((p, i) => (
            <motion.div
              key={p.id}
              variants={{
                hidden: { opacity: 0, y: 24 },
                show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.21, 0.6, 0.35, 1] } },
              }}
            >
              <ProductCard product={p} key={`card-${i}`} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </main>
  )
}