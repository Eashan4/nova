"use client"

import { useState } from "react"
import { Check, Clock, Mail, MapPin, MessageSquare, Phone, Send } from "lucide-react"
import { storeInfo } from "@/data"
import { Button, SectionLabel } from "@/components/ui"

const inputCls =
  "w-full rounded-xl border border-line bg-surface px-4 py-3.5 text-sm text-ink outline-none transition-colors placeholder:text-muted focus:border-ink"

export default function ContactPage() {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" })

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }))

  return (
    <main className="mx-auto max-w-7xl px-5 pb-24 pt-28 sm:px-8 lg:pt-32">
      <SectionLabel>Contact</SectionLabel>
      <h1 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">
        Talk to a human<span className="text-success">.</span>
      </h1>
      <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted">
        Orders, warranty, or just curiosity about the catalogue — the Nova team answers within a
        working day. Real people, Chennai time.
      </p>

      <div className="mt-14 grid gap-12 lg:grid-cols-[1.3fr_1fr]">
        <div>
          {sent ? (
            <div className="flex flex-col items-start gap-5 rounded-3xl border border-line bg-surface p-10">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-success/10 text-success">
                <Check size={24} />
              </span>
              <h2 className="font-display text-2xl font-bold tracking-tight">
                Message received.
              </h2>
              <p className="max-w-md text-sm leading-relaxed text-muted">
                Thanks, {form.name.split(" ")[0] || "friend"}. We&apos;ve logged your note and
                will reply to <span className="text-ink">{form.email}</span> within one working
                day.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSent(false)
                  setForm({ name: "", email: "", phone: "", message: "" })
                }}
              >
                Send another message
              </Button>
            </div>
          ) : (
            <form
              className="grid gap-5"
              onSubmit={(e) => {
                e.preventDefault()
                setSent(true)
              }}
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                    Your name
                  </span>
                  <input
                    required
                    type="text"
                    value={form.name}
                    onChange={set("name")}
                    placeholder="Ananya R."
                    className={inputCls}
                  />
                </label>
                <label className="block">
                  <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                    Email
                  </span>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={set("email")}
                    placeholder="you@example.com"
                    className={inputCls}
                  />
                </label>
              </div>
              <label className="block">
                <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                  Phone <span className="normal-case tracking-normal text-line">(optional)</span>
                </span>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={set("phone")}
                  placeholder="+91 …"
                  className={inputCls}
                />
              </label>
              <label className="block">
                <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                  Message
                </span>
                <textarea
                  required
                  rows={6}
                  value={form.message}
                  onChange={set("message")}
                  placeholder="Tell us what's on your mind…"
                  className={`${inputCls} resize-none`}
                />
              </label>
              <div>
                <Button type="submit" className="w-full sm:w-auto">
                  Send message <Send size={13} />
                </Button>
                <p className="mt-3 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.2em] text-muted">
                  <MessageSquare size={11} /> We reply within 1 working day
                </p>
              </div>
            </form>
          )}
        </div>

        <aside className="space-y-4">
          {[
            { icon: Mail, label: "Email", value: storeInfo.email, href: `mailto:${storeInfo.email}` },
            { icon: Phone, label: "Phone", value: storeInfo.phone, href: storeInfo.phoneHref },
            { icon: Clock, label: "Hours", value: storeInfo.hours },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={`block rounded-2xl border border-line bg-surface p-6 transition-colors hover:border-ink ${
                item.href ? "cursor-pointer" : "cursor-default hover:border-line"
              }`}
            >
              <div className="flex items-center gap-4">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-ink text-white">
                  <item.icon size={16} />
                </span>
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-muted">
                    {item.label}
                  </p>
                  <p className="mt-1 text-sm font-medium text-ink">{item.value}</p>
                </div>
              </div>
            </a>
          ))}
          <div className="rounded-2xl border border-line bg-surface p-6">
            <div className="flex items-center gap-4">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-ink text-white">
                <MapPin size={16} />
              </span>
              <div>
                <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-muted">Showroom</p>
                <p className="mt-1 text-sm font-medium leading-relaxed text-ink">
                  {storeInfo.address}
                </p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </main>
  )
}