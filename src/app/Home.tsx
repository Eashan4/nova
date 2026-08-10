"use client"

import Link from "next/link"
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion"
import { useMemo, useRef } from "react"
import { ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react"
import { categoryMeta, products, storeInfo } from "@/data"
import { ProductCard } from "@/components/ProductCard"
import { Button, SectionLabel, cn } from "@/components/ui"

function Reveal({
  children,
  delay = 0,
  className = "",
  y = 28,
}: {
  children: React.ReactNode
  delay?: number
  className?: string
  y?: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: [0.21, 0.6, 0.35, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

const marqueeItems = [
  "Free shipping over ₹999",
  "1-year warranty included",
  "7-day no-questions returns",
  "UPI · Cards · COD",
  "Designed in Chennai",
]

function Hero() {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 60, damping: 20 })
  const sy = useSpring(my, { stiffness: 60, damping: 20 })
  const px = useTransform(sx, [-1, 1], [-16, 16])
  const py = useTransform(sy, [-1, 1], [-10, 10])

  const onMouseMove = (e: React.MouseEvent) => {
    if (reduced || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    mx.set(((e.clientX - rect.left) / rect.width) * 2 - 1)
    my.set(((e.clientY - rect.top) / rect.height) * 2 - 1)
  }

  return (
    <section
      ref={ref}
      onMouseMove={onMouseMove}
      className="relative flex min-h-[92svh] flex-col justify-center overflow-hidden bg-ink text-white"
    >
      <div
        className="pointer-events-none absolute -left-40 top-1/4 h-[560px] w-[560px] rounded-full bg-white/[0.05] blur-[110px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-32 bottom-0 h-[460px] w-[460px] rounded-full bg-white/[0.04] blur-[100px]"
        aria-hidden
      />

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-16 px-5 pb-24 pt-28 sm:px-8 lg:grid-cols-[1.05fr_1fr] lg:gap-8">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-white/50"
          >
            <span className="h-px w-8 bg-white/30" />
            Nova · Est. 2026 · Chennai
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.22, duration: 0.7, ease: [0.21, 0.6, 0.35, 1] }}
            className="mt-6 font-display text-5xl font-bold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl"
          >
            Designed for
            <br />
            the way you <span className="font-mono font-normal">live</span>
            <span className="text-success">.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.36, duration: 0.7 }}
            className="mt-6 max-w-md text-base leading-relaxed text-white/60"
          >
            Audio, wearables and power that disappear into your day — built quiet, charged long,
            and made to last. Twelve products. Zero noise.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <Link href="/products">
              <Button variant="light">
                Shop the collection <ArrowRight size={14} />
              </Button>
            </Link>
            <Link
              href="/products"
              className="group inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/70 transition-colors hover:text-white"
            >
              Explore
              <ArrowUpRight
                size={14}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
          </motion.div>

          <motion.dl
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="mt-12 flex gap-10 border-t border-white/10 pt-7"
          >
            {[
              ["12", "products"],
              ["4", "categories"],
              ["40 h", "battery"],
            ].map(([num, label]) => (
              <div key={label}>
                <dt className="sr-only">{label}</dt>
                <dd className="font-display text-2xl font-bold tracking-tight">{num}</dd>
                <dd className="mt-1 font-mono text-[9px] uppercase tracking-[0.25em] text-white/40">
                  {label}
                </dd>
              </div>
            ))}
          </motion.dl>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.45, duration: 0.9, ease: [0.21, 0.6, 0.35, 1] }}
          className="relative mx-auto w-full max-w-[460px] lg:max-w-none"
        >
          <div
            className="absolute inset-0 m-auto h-[340px] w-[340px] rounded-full bg-white/[0.07] blur-[70px]"
            aria-hidden
          />
          <motion.img
            src="/products/air-pro.svg"
            alt="Nova Air Pro wireless headphones"
            style={{ x: px, y: py }}
            animate={reduced ? undefined : { y: [-10, 10, -10] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="relative w-full select-none drop-shadow-[0_40px_60px_rgba(0,0,0,0.45)]"
            draggable={false}
          />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 1 }}
        className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 sm:flex"
        aria-hidden
      >
        <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/35">Scroll</span>
        <motion.span
          animate={{ scaleY: [0.3, 1, 0.3], opacity: [0.2, 0.8, 0.2] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="h-8 w-px origin-top bg-white/50"
        />
      </motion.div>
    </section>
  )
}

function Marquee() {
  const row = [...marqueeItems, ...marqueeItems, ...marqueeItems]
  return (
    <div className="overflow-hidden border-y border-line bg-surface py-4">
      <div className="flex w-max animate-marquee gap-10 whitespace-nowrap">
        {row.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex items-center gap-10 font-mono text-[10px] uppercase tracking-[0.28em] text-muted"
          >
            {item}
            <span className="text-ink">✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}

function Categories() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:py-32">
      <Reveal className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <SectionLabel>Browse by category</SectionLabel>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Everything, in four places.
          </h2>
        </div>
        <Link
          href="/products"
          className="group mb-1 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-ink"
        >
          View all products
          <ArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </Reveal>

      <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {categoryMeta.map((cat, i) => (
          <Reveal key={cat.id} delay={i * 0.08}>
            <Link
              href={`/products?category=${encodeURIComponent(cat.id)}`}
              className="group block overflow-hidden rounded-2xl border border-line bg-surface transition-shadow duration-500 hover:shadow-[0_24px_60px_-24px_rgba(17,17,17,0.25)]"
            >
              <div className="overflow-hidden bg-gradient-to-br from-[#F4F3F1] to-[#E8E7E4]">
                <img
                  src={cat.image}
                  alt={cat.title}
                  loading="lazy"
                  className="aspect-square w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.07]"
                />
              </div>
              <div className="flex items-center justify-between gap-3 p-5">
                <div>
                  <h3 className="font-display text-base font-bold tracking-tight sm:text-lg">
                    {cat.title}
                  </h3>
                  <p className="mt-0.5 line-clamp-1 text-xs text-muted">{cat.blurb}</p>
                </div>
                <ArrowUpRight
                  size={16}
                  className="shrink-0 text-muted transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ink"
                />
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function Featured() {
  const ref = useRef<HTMLDivElement>(null)
  const featured = useMemo(() => {
    const best = products.filter((p) => p.tag === "bestseller")
    const rest = products.filter((p) => p.tag !== "bestseller").sort((a, b) => b.rating - a.rating)
    return [...best, ...rest].slice(0, 6)
  }, [])

  const scroll = (dir: 1 | -1) => {
    ref.current?.scrollBy({ left: dir * 300, behavior: "smooth" })
  }

  return (
    <section className="border-y border-line bg-surface py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <SectionLabel>The favourites</SectionLabel>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Most reordered.
            </h2>
          </div>
          <div className="mb-1 flex gap-2">
            <button
              type="button"
              onClick={() => scroll(-1)}
              aria-label="Scroll left"
              className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-ink hover:bg-ink hover:text-white"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={() => scroll(1)}
              aria-label="Scroll right"
              className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-ink hover:bg-ink hover:text-white"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </Reveal>
      </div>

      <Reveal delay={0.1}>
        <div
          ref={ref}
          className="mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-5 pb-4 sm:px-[max(1.25rem,calc((100vw-80rem)/2+2rem))] scrollbar-none"
        >
          {featured.map((p) => (
            <div key={p.id} className="w-[280px] flex-shrink-0 snap-start sm:w-[300px]">
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  )
}

function FeatureBand() {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const imgY = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [48, -48])
  const glowY = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [20, -20])

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-ink py-28 text-white lg:py-40"
    >
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[540px] w-[540px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.05] blur-[100px]"
        aria-hidden
      />
      <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-5 sm:px-8 lg:grid-cols-2">
        <motion.img
          src="/products/watch-x.svg"
          alt="Nova Watch X smartwatch"
          style={{ y: imgY }}
          className="mx-auto w-full max-w-[440px] select-none drop-shadow-[0_40px_70px_rgba(0,0,0,0.55)]"
          draggable={false}
        />
        <Reveal>
          <SectionLabel className="text-white/40">Feature · Watch X</SectionLabel>
          <h2 className="mt-4 font-display text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
            Time, quieted.
            <br />
            Your week, decoded.
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-white/60">
            A titanium case, a display that stays on for ten days, and health sensors that read
            your body like a quiet observer — not another notification machine.
          </p>
          <div className="mt-8">
            <Link href="/products?category=Wearables">
              <Button variant="light">Shop Watch X</Button>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

const editorial = [
  {
    num: "01",
    title: "Designed, not decorated",
    body: "Every line and material earns its place. If it doesn't make the product calmer to use, it doesn't ship.",
  },
  {
    num: "02",
    title: "Battery you forget",
    body: "Days, not hours. Our devices are tuned so charging becomes a weekly thought instead of a nightly one.",
  },
  {
    num: "03",
    title: "Support that shows up",
    body: "Real people in Chennai, seven days a week, one-year warranty on everything. Returns within 7 days, no forms.",
  },
]

function WhyNova() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:py-32">
      <div className="grid gap-16 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <Reveal>
            <SectionLabel>Why Nova</SectionLabel>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Small catalogue.
              <br />
              Serious standards.
            </h2>
          </Reveal>
          <Reveal delay={0.15} className="mt-10">
            <figure className="rounded-2xl border border-line bg-surface p-8">
              <span className="font-display text-6xl leading-none text-line">“</span>
              <blockquote className="mt-2 font-display text-xl font-medium leading-relaxed tracking-tight text-ink">
                I've owned far pricier earbuds. The Buds out-last them and sound calmer at
                loud volumes. Nova earned a repeat customer.
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ink font-mono text-[10px] font-medium text-white">
                  AR
                </span>
                <span>
                  <span className="block text-sm font-medium text-ink">Ananya R.</span>
                  <span className="block font-mono text-[9px] uppercase tracking-[0.2em] text-muted">
                    Verified buyer · Chennai
                  </span>
                </span>
              </figcaption>
            </figure>
          </Reveal>
        </div>

        <div className="flex flex-col justify-center gap-4">
          {editorial.map((item, i) => (
            <Reveal key={item.num} delay={i * 0.1}>
              <div className="group flex gap-6 rounded-2xl border border-transparent p-6 transition-colors duration-300 hover:border-line hover:bg-surface">
                <span className="font-mono text-sm text-muted">{item.num}</span>
                <div>
                  <h3 className="font-display text-xl font-bold tracking-tight text-ink">
                    {item.title}
                  </h3>
                  <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">{item.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function FinalCta() {
  return (
    <section className="mx-auto max-w-7xl px-5 pb-24 sm:px-8 lg:pb-32">
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl bg-ink px-6 py-20 text-center text-white sm:px-12 lg:py-28">
          <div
            className="pointer-events-none absolute -top-32 left-1/2 h-[380px] w-[600px] -translate-x-1/2 rounded-full bg-white/[0.06] blur-[90px]"
            aria-hidden
          />
          <div className="relative">
            <SectionLabel className="text-white/40">Nova · 2026 collection</SectionLabel>
            <h2 className="mx-auto mt-4 max-w-2xl font-display text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Own the Nova feeling<span className="text-success">.</span>
            </h2>
            <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-white/60">
              Twelve products. One standard. Free shipping over ₹999, and a 7-day window to
              change your mind.
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
              <Link href="/products">
                <Button variant="light">Shop all products</Button>
              </Link>
              <Link href="/contact">
                <Button variant="ghost" className="text-white hover:bg-white/10">
                  Talk to us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}

export function Home() {
  return (
    <main>
      <Hero />
      <Marquee />
      <Categories />
      <Featured />
      <FeatureBand />
      <WhyNova />
      <FinalCta />
    </main>
  )
}