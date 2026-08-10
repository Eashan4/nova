"use client"

import Link from "next/link"
import { useState } from "react"
import { ArrowRight, Check } from "lucide-react"
import { categoryMeta, storeInfo } from "@/data"
import { SectionLabel, Button } from "@/components/ui"

export function Footer() {
  const [email, setEmail] = useState("")
  const [done, setDone] = useState(false)

  return (
    <footer className="border-t border-line bg-surface">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col gap-6 border-b border-line py-12 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
              Join the Nova list.
            </h2>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">
              New releases first, honest notes on gear, and occasional offers. No noise.
            </p>
          </div>
          {done ? (
            <p className="flex items-center gap-2 rounded-full border border-line bg-bg px-5 py-3.5 font-mono text-[11px] uppercase tracking-[0.2em] text-success">
              <Check size={13} /> Subscribed — welcome to Nova.
            </p>
          ) : (
            <form
              className="flex w-full max-w-sm gap-2"
              onSubmit={(e) => {
                e.preventDefault()
                if (email.trim()) setDone(true)
              }}
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="min-w-0 flex-1 rounded-full border border-line bg-bg px-5 py-3.5 text-sm outline-none transition-colors focus:border-ink"
                aria-label="Email for newsletter"
              />
              <Button type="submit" className="px-6">
                Join
              </Button>
            </form>
          )}
        </div>

        <div className="grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.4fr]">
          <div>
            <Link href="/" className="flex items-center gap-2.5">
              <img src="/logo.svg" alt="" className="h-7 w-auto" />
              <span className="font-display text-xl font-bold tracking-[0.24em]">NOVA</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">{storeInfo.tagline}</p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              Consumer technology, designed in Chennai. Every product ships with a 1-year warranty
              and 7-day returns.
            </p>
          </div>

          <div>
            <SectionLabel>Shop</SectionLabel>
            <ul className="mt-5 space-y-3">
              {categoryMeta.map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/products?category=${encodeURIComponent(cat.id)}`}
                    className="group inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-ink"
                  >
                    {cat.title}
                    <ArrowRight
                      size={11}
                      className="-translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <SectionLabel>Help</SectionLabel>
            <ul className="mt-5 space-y-3">
              <li>
                <Link href="/contact" className="text-sm text-muted transition-colors hover:text-ink">
                  Contact us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-muted transition-colors hover:text-ink">
                  Shipping &amp; returns
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-muted transition-colors hover:text-ink">
                  Warranty
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-sm text-muted transition-colors hover:text-ink">
                  Full catalogue
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <SectionLabel>Store</SectionLabel>
            <ul className="mt-5 space-y-3 text-sm text-muted">
              <li>
                <a href={storeInfo.phoneHref} className="transition-colors hover:text-ink">
                  {storeInfo.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${storeInfo.email}`} className="transition-colors hover:text-ink">
                  {storeInfo.email}
                </a>
              </li>
              <li>{storeInfo.hours}</li>
              <li className="leading-relaxed">{storeInfo.address}</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-line py-6 md:flex-row">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
            © 2026 Nova Consumer Technologies · Designed in Chennai
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
            UPI · Cards · COD
          </p>
        </div>
      </div>
    </footer>
  )
}