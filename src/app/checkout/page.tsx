"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { ArrowRight, Check, Copy, ShieldCheck, Truck } from "lucide-react"
import { products, formatINR } from "@/data"
import { useStore } from "@/StoreContext"
import { Button, SectionLabel, cn } from "@/components/ui"

const inputCls =
  "w-full rounded-xl border border-line bg-surface px-4 py-3.5 text-sm text-ink outline-none transition-colors placeholder:text-muted focus:border-ink"

const payments = [
  { id: "upi", label: "UPI", note: "GPay, PhonePe, Paytm — pay on delivery link" },
  { id: "card", label: "Card", note: "Visa, Mastercard, RuPay, Amex" },
  { id: "cod", label: "Cash on Delivery", note: "Pay at your door — ₹49 handling fee applies" },
] as const

function OrderId({ id }: { id: string }) {
  const [copied, setCopied] = useState(false)
  return (
    <button
      type="button"
      onClick={() => {
        navigator.clipboard?.writeText(id).catch(() => {})
        setCopied(true)
        setTimeout(() => setCopied(false), 1600)
      }}
      className="group inline-flex cursor-pointer items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 font-mono text-xs tracking-[0.2em] transition-colors hover:border-ink"
    >
      {id}
      <Copy size={12} className={cn("text-muted transition-colors", copied && "text-success")} />
    </button>
  )
}

export default function CheckoutPage() {
  const { items, subtotal, clearCart, count } = useStore()
  const [placed, setPlaced] = useState<string | null>(null)
  const [payment, setPayment] = useState<(typeof payments)[number]["id"]>("upi")
  const [promo, setPromo] = useState("")
  const [promoApplied, setPromoApplied] = useState(false)
  const [copied, setCopied] = useState(false)
  const [details, setDetails] = useState({ name: "", email: "", phone: "", address: "", city: "", pincode: "" })

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [])

  const set = (key: keyof typeof details) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setDetails((d) => ({ ...d, [key]: e.target.value }))

  const discount = promoApplied ? Math.round(subtotal * 0.05) : 0
  const shipping = subtotal === 0 ? 0 : subtotal - discount >= 999 ? 0 : 99
  const codFee = payment === "cod" ? 49 : 0
  const total = subtotal - discount + shipping + codFee

  const placeOrder = (e: React.FormEvent) => {
    e.preventDefault()
    const id = `NOVA-${String(Math.floor(100000 + Math.random() * 900000))}`
    setPlaced(id)
    clearCart()
  }

  if (placed) {
    return (
      <main className="mx-auto max-w-3xl px-5 pb-24 pt-28 sm:px-8 lg:pt-32">
        <div className="flex flex-col items-center rounded-3xl border border-line bg-surface p-10 text-center sm:p-14">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-success/10 text-success">
            <Check size={28} />
          </span>
          <SectionLabel className="mt-7">Order confirmed</SectionLabel>
          <h1 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Thank you, {details.name.split(" ")[0] || "friend"}.
          </h1>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-muted">
            We&apos;ve logged your order and a confirmation is on its way to{" "}
            <span className="text-ink">{details.email}</span>. You&apos;ll get tracking the
            moment it ships.
          </p>
          <p className="mt-7 font-mono text-[10px] uppercase tracking-[0.25em] text-muted">
            Your order id
          </p>
          <div className="mt-3">
            <OrderId id={placed} />
          </div>
          <div className="mt-10 w-full max-w-sm space-y-3 rounded-2xl border border-line bg-bg p-6">
            <p className="flex items-center justify-between text-sm">
              <span className="text-muted">Total paid</span>
              <span className="font-display text-xl font-bold tracking-tight">{formatINR(total)}</span>
            </p>
            <p className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.15em] text-muted">
              <Truck size={11} /> Delivery in 3–5 working days · {details.city || "your city"}
            </p>
            <p className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.15em] text-muted">
              <ShieldCheck size={11} /> 1-year warranty · 7-day returns
            </p>
          </div>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Link href="/products">
              <Button>
                Continue shopping <ArrowRight size={13} />
              </Button>
            </Link>
            {copied || <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted">Tap the id to copy</span>}
          </div>
        </div>
      </main>
    )
  }

  if (items.length === 0) {
    return (
      <main className="mx-auto flex min-h-svh max-w-2xl flex-col items-center justify-center px-5 pb-20 pt-28 text-center sm:px-8">
        <span className="flex h-16 w-16 items-center justify-center rounded-full border border-line bg-surface text-muted">
          <Truck size={22} />
        </span>
        <h1 className="mt-6 font-display text-3xl font-bold tracking-tight">
          Nothing to check out yet.
        </h1>
        <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
          Your cart is empty — the collection is one click away.
        </p>
        <Link href="/products" className="mt-8">
          <Button>Browse the collection</Button>
        </Link>
      </main>
    )
  }

  return (
    <main className="mx-auto max-w-7xl px-5 pb-24 pt-28 sm:px-8 lg:pt-32">
      <SectionLabel>Secure checkout</SectionLabel>
      <h1 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">
        Almost yours<span className="text-success">.</span>
      </h1>

      <div className="mt-12 grid gap-12 lg:grid-cols-[1.35fr_1fr]">
        <form onSubmit={placeOrder} className="grid gap-12 lg:grid-cols-[1.35fr_1fr] lg:items-start">
          <div className="space-y-10">
            <section>
            <h2 className="flex items-center gap-3 font-display text-lg font-bold tracking-tight">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-ink font-mono text-[10px] text-white">1</span>
              Delivery details
            </h2>
            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.2em] text-muted">Full name</span>
                <input required type="text" value={details.name} onChange={set("name")} placeholder="Ananya R." className={inputCls} />
              </label>
              <label className="block">
                <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.2em] text-muted">Email</span>
                <input required type="email" value={details.email} onChange={set("email")} placeholder="you@example.com" className={inputCls} />
              </label>
              <label className="block">
                <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.2em] text-muted">Phone</span>
                <input required type="tel" value={details.phone} onChange={set("phone")} placeholder="+91 …" className={inputCls} />
              </label>
              <label className="block sm:col-span-2">
                <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.2em] text-muted">Address</span>
                <input required type="text" value={details.address} onChange={set("address")} placeholder="Flat, street, landmark" className={inputCls} />
              </label>
              <label className="block">
                <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.2em] text-muted">City</span>
                <input required type="text" value={details.city} onChange={set("city")} placeholder="Chennai" className={inputCls} />
              </label>
              <label className="block">
                <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.2em] text-muted">PIN code</span>
                <input required type="text" inputMode="numeric" pattern="[0-9]{6}" value={details.pincode} onChange={set("pincode")} placeholder="600032" className={inputCls} />
              </label>
            </div>
          </section>

          <section>
            <h2 className="flex items-center gap-3 font-display text-lg font-bold tracking-tight">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-ink font-mono text-[10px] text-white">2</span>
              Payment
            </h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {payments.map((p) => (
                <label
                  key={p.id}
                  className={cn(
                    "block cursor-pointer rounded-2xl border p-5 transition-all",
                    payment === p.id ? "border-ink bg-ink text-white" : "border-line bg-surface hover:border-ink"
                  )}
                >
                  <input
                    type="radio"
                    name="payment"
                    value={p.id}
                    checked={payment === p.id}
                    onChange={() => setPayment(p.id)}
                    className="sr-only"
                  />
                  <span className="block font-display text-sm font-bold tracking-tight">{p.label}</span>
                  <span className={cn("mt-1.5 block text-xs leading-relaxed", payment === p.id ? "text-white/60" : "text-muted")}>
                    {p.note}
                  </span>
                </label>
              ))}
            </div>
          </section>
          </div>

          <aside className="h-fit space-y-5 rounded-3xl border border-line bg-surface p-7 lg:sticky lg:top-28">
          <h2 className="font-display text-lg font-bold tracking-tight">
            Order summary <span className="font-mono text-xs font-normal text-muted">({count} items)</span>
          </h2>
          <ul className="space-y-3">
            {items.map((item) => {
              const product = products.find((p) => p.id === item.productId)
              if (!product) return null
              return (
                <li key={item.productId} className="flex items-center gap-3">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-[#F4F3F1] to-[#E8E7E4]">
                    <img src={product.image} alt="" className="h-full w-full object-cover" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-ink">{product.name}</p>
                    <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted">× {item.qty}</p>
                  </div>
                  <span className="font-mono text-xs">{formatINR(product.price * item.qty)}</span>
                </li>
              )
            })}
          </ul>

          <div className="flex gap-2">
            <input
              type="text"
              value={promo}
              onChange={(e) => setPromo(e.target.value)}
              placeholder="Promo code — try NOVA10"
              disabled={promoApplied}
              className={cn(inputCls, "py-3 font-mono text-xs uppercase tracking-[0.15em]")}
              aria-label="Promo code"
            />
            {!promoApplied && (
              <button
                type="button"
                onClick={() => {
                  if (promo.trim().toUpperCase() === "NOVA10") setPromoApplied(true)
                }}
                className={cn(
                  "shrink-0 cursor-pointer rounded-xl border px-4 font-mono text-[10px] uppercase tracking-[0.2em] transition-colors",
                  promo.trim().toUpperCase() === "NOVA10"
                    ? "border-ink bg-ink text-white"
                    : "border-line bg-bg text-muted"
                )}
              >
                Apply
              </button>
            )}
          </div>
          {promoApplied && (
            <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-success">
              ✓ NOVA10 applied — 5% off
            </p>
          )}

          <dl className="space-y-2.5 border-t border-line pt-4 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted">Subtotal</dt>
              <dd className="font-mono">{formatINR(subtotal)}</dd>
            </div>
            {discount > 0 && (
              <div className="flex justify-between">
                <dt className="text-muted">Discount (NOVA10)</dt>
                <dd className="font-mono text-success">− {formatINR(discount)}</dd>
              </div>
            )}
            <div className="flex justify-between">
              <dt className="text-muted">Shipping</dt>
              <dd className="font-mono">{shipping === 0 ? <span className="text-success">Free</span> : formatINR(shipping)}</dd>
            </div>
            {codFee > 0 && (
              <div className="flex justify-between">
                <dt className="text-muted">COD handling</dt>
                <dd className="font-mono">{formatINR(codFee)}</dd>
              </div>
            )}
            <div className="flex justify-between border-t border-line pt-3">
              <dt className="font-display font-bold">Total</dt>
              <dd className="font-display text-xl font-bold tracking-tight">{formatINR(total)}</dd>
            </div>
          </dl>

          <Button type="submit" full>
            Place order — {formatINR(total)}
          </Button>

          <p className="text-center font-mono text-[9px] uppercase tracking-[0.2em] text-muted">
            Demo checkout · no payment is processed
          </p>
        </aside>
        </form>
      </div>
    </main>
  )
}