import type { Metadata } from "next"
import { Home } from "@/app/Home"

export const metadata: Metadata = {
  title: "Nova — Designed for the way you live.",
  description:
    "Nova is a Chennai-designed consumer technology label — audio, wearables and power that disappear into your day. Twelve products, one standard.",
}

export default function Page() {
  return <Home />
}