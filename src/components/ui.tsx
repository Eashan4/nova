"use client"

import { Star, StarHalf } from "lucide-react"

export function cn(...parts: (string | false | undefined | null)[]) {
  return parts.filter(Boolean).join(" ")
}

export function Button({
  children,
  onClick,
  variant = "primary",
  className = "",
  type = "button",
  disabled,
  full,
}: {
  children: React.ReactNode
  onClick?: () => void
  variant?: "primary" | "outline" | "ghost" | "light"
  className?: string
  type?: "button" | "submit"
  disabled?: boolean
  full?: boolean
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "inline-flex cursor-pointer items-center justify-center gap-2 rounded-full px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.18em] transition-all duration-300 select-none",
        full && "w-full",
        variant === "primary" &&
          "bg-ink text-white hover:bg-ink/85 disabled:opacity-40",
        variant === "outline" &&
          "border border-ink/20 bg-transparent text-ink hover:border-ink hover:bg-ink hover:text-white",
        variant === "light" &&
          "bg-white text-ink hover:bg-white/85",
        variant === "ghost" && "text-ink hover:bg-ink/5",
        className
      )}
    >
      {children}
    </button>
  )
}

export function SectionLabel({
  children,
  className = "",
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <p
      className={cn(
        "font-mono text-[10px] uppercase tracking-[0.3em] text-muted",
        className
      )}
    >
      {children}
    </p>
  )
}

export function Rating({ value, size = 13 }: { value: number; size?: number }) {
  const full = Math.floor(value)
  const half = value - full >= 0.4
  return (
    <span className="inline-flex items-center gap-0.5 text-ink" aria-label={`${value} out of 5 stars`}>
      {Array.from({ length: full }).map((_, i) => (
        <Star key={i} size={size} fill="currentColor" strokeWidth={0} />
      ))}
      {half && <StarHalf size={size} fill="currentColor" strokeWidth={0} />}
      {Array.from({ length: 5 - full - (half ? 1 : 0) }).map((_, i) => (
        <Star key={`e-${i}`} size={size} className="text-line" />
      ))}
    </span>
  )
}

export function TagPill({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full bg-ink px-3 py-1 font-mono text-[9px] font-medium uppercase tracking-[0.2em] text-white",
        className
      )}
    >
      {children}
    </span>
  )
}

export function Badge({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-line bg-surface px-3 py-1 font-mono text-[9px] uppercase tracking-[0.2em] text-muted",
        className
      )}
    >
      {children}
    </span>
  )
}