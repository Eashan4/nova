import Link from "next/link"
import { Button, SectionLabel } from "@/components/ui"

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-svh max-w-7xl flex-col items-center justify-center px-5 pb-20 pt-28 text-center sm:px-8">
      <SectionLabel>Error 404</SectionLabel>
      <h1 className="mt-4 font-display text-7xl font-bold tracking-tight sm:text-9xl">
        4<span className="text-success">0</span>4
      </h1>
      <p className="mt-6 max-w-md font-display text-xl font-semibold tracking-tight">
        This page drifted off the catalogue.
      </p>
      <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">
        The link may be old, or the address mistyped. The Nova collection is still exactly where
        you left it.
      </p>
      <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
        <Link href="/">
          <Button>Back home</Button>
        </Link>
        <Link href="/products">
          <Button variant="outline">Browse products</Button>
        </Link>
      </div>
    </main>
  )
}