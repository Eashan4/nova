"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useState } from "react"
import { Heart, Menu, Search, ShoppingBag, X } from "lucide-react"
import { useStore } from "@/StoreContext"
import { storeInfo } from "@/data"
import { cn } from "@/components/ui"

const links = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/contact", label: "Contact" },
]

export function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const { count, openDrawer, wishlist } = useStore()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [query, setQuery] = useState("")

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault()
    router.push(query.trim() ? `/products?q=${encodeURIComponent(query.trim())}` : "/products")
    setQuery("")
  }

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-30 transition-all duration-500",
          scrolled
            ? "border-b border-line/80 bg-bg/85 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        )}
      >
        <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-6 px-5 sm:px-8">
          <Link href="/" className="flex items-center gap-2.5" aria-label="Nova home">
            <img src="/logo.svg" alt="" className="h-7 w-auto" />
            <span className="font-display text-xl font-bold tracking-[0.24em]">NOVA</span>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {links.map((link) => {
              const active = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href))
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative text-[11px] font-semibold uppercase tracking-[0.22em] transition-colors",
                    active ? "text-ink" : "text-muted hover:text-ink"
                  )}
                >
                  {link.label}
                  {active && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute -bottom-2 left-0 right-0 h-px bg-ink"
                    />
                  )}
                </Link>
              )
            })}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <form onSubmit={submitSearch} className="hidden lg:block">
              <div className="flex items-center gap-2 rounded-full border border-line bg-surface px-3.5 py-2 transition-colors focus-within:border-ink">
                <Search size={13} className="text-muted" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search products…"
                  className="w-36 bg-transparent text-xs text-ink outline-none placeholder:text-muted"
                  aria-label="Search products"
                />
              </div>
            </form>

            <Link
              href={wishlist.length ? "/products?wishlist=1" : "/products"}
              aria-label="Wishlist"
              className="relative flex h-10 w-10 items-center justify-center rounded-full text-ink transition-colors hover:bg-ink/5"
            >
              <Heart size={18} />
              {wishlist.length > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-ink font-mono text-[9px] text-white">
                  {wishlist.length}
                </span>
              )}
            </Link>

            <button
              type="button"
              onClick={openDrawer}
              aria-label="Open cart"
              className="relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-ink transition-colors hover:bg-ink/5"
            >
              <ShoppingBag size={18} />
              {count > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-ink font-mono text-[9px] text-white">
                  {count > 9 ? "9+" : count}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-ink transition-colors hover:bg-ink/5 md:hidden"
            >
              <Menu size={18} />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex flex-col bg-bg md:hidden"
          >
            <div className="flex h-18 items-center justify-between px-5">
              <span className="font-display text-xl font-bold tracking-[0.24em]">NOVA</span>
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-line transition-colors hover:border-ink hover:bg-ink hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={submitSearch} className="px-5 pt-2">
              <div className="flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-3">
                <Search size={15} className="text-muted" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search products…"
                  className="w-full bg-transparent text-sm outline-none placeholder:text-muted"
                  aria-label="Search products"
                />
              </div>
            </form>

            <nav className="flex flex-1 flex-col justify-center gap-2 px-5">
              {links.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 * i, duration: 0.35 }}
                >
                  <Link
                    href={link.href}
                    className="flex items-baseline gap-4 py-3 font-display text-4xl font-bold tracking-tight text-ink"
                  >
                    <span className="font-mono text-xs text-muted">0{i + 1}</span>
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 }}
              className="border-t border-line px-5 py-6"
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted">Contact</p>
              <a href={storeInfo.phoneHref} className="mt-2 block font-display text-lg font-semibold">
                {storeInfo.phone}
              </a>
              <p className="mt-1 text-sm text-muted">{storeInfo.email}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}