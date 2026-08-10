import type { LucideIcon } from "lucide-react"

export interface Product {
  id: string
  name: string
  category: "Audio" | "Wearables" | "Power" | "Smart Home"
  price: number
  mrp?: number
  rating: number
  reviews: number
  description: string
  tag?: "new" | "bestseller"
  image: string
}

export const categories = ["Audio", "Wearables", "Power", "Smart Home"] as const

export const products: Product[] = [
  {
    id: "air-pro",
    name: "Nova Air Pro",
    category: "Audio",
    price: 24999,
    mrp: 29999,
    rating: 4.8,
    reviews: 1248,
    description:
      "Flagship over-ear headphones with adaptive noise cancellation, 40-hour battery and studio-grade spatial audio.",
    tag: "bestseller",
    image: "/products/air-pro.svg",
  },
  {
    id: "air",
    name: "Nova Air",
    category: "Audio",
    price: 14999,
    mrp: 17999,
    rating: 4.6,
    reviews: 864,
    description:
      "Lightweight wireless over-ears with balanced sound, comfortable memory foam and multi-device pairing.",
    tag: "new",
    image: "/products/air.svg",
  },
  {
    id: "buds",
    name: "Nova Buds",
    category: "Audio",
    price: 8999,
    mrp: 10999,
    rating: 4.7,
    reviews: 2104,
    description:
      "True wireless earbuds with active noise cancellation, wireless charging case and crystal-clear calls.",
    tag: "bestseller",
    image: "/products/buds.svg",
  },
  {
    id: "buds-mini",
    name: "Nova Buds Mini",
    category: "Audio",
    price: 5999,
    rating: 4.5,
    reviews: 941,
    description:
      "Pocket-friendly earbuds with a compact case, 24-hour total playtime and secure-fit design.",
    image: "/products/buds-mini.svg",
  },
  {
    id: "watch-x",
    name: "Nova Watch X",
    category: "Wearables",
    price: 19999,
    mrp: 23999,
    rating: 4.7,
    reviews: 1522,
    description:
      "Titanium smartwatch with AMOLED display, 10-day battery, advanced health sensors and NFC payments.",
    tag: "new",
    image: "/products/watch-x.svg",
  },
  {
    id: "watch-s",
    name: "Nova Watch S",
    category: "Wearables",
    price: 12999,
    rating: 4.4,
    reviews: 687,
    description:
      "Everyday smartwatch with fitness tracking, sleep insights and customisable watch faces.",
    image: "/products/watch-s.svg",
  },
  {
    id: "sound",
    name: "Nova Sound",
    category: "Audio",
    price: 14999,
    mrp: 16999,
    rating: 4.6,
    reviews: 745,
    description:
      "360° smart speaker with deep bass, room-filling sound and built-in voice assistance.",
    image: "/products/sound.svg",
  },
  {
    id: "sound-2",
    name: "Nova Sound 2",
    category: "Audio",
    price: 17999,
    rating: 4.6,
    reviews: 512,
    description:
      "Tower speaker with dual drivers, premium fabric finish and multi-room streaming support.",
    tag: "new",
    image: "/products/sound-2.svg",
  },
  {
    id: "charge",
    name: "Nova Charge",
    category: "Power",
    price: 2499,
    mrp: 2999,
    rating: 4.5,
    reviews: 1876,
    description:
      "10000 mAh power bank with fast charging, dual output ports and smart LED battery indicator.",
    tag: "bestseller",
    image: "/products/charge.svg",
  },
  {
    id: "charge-slim",
    name: "Nova Charge Slim",
    category: "Power",
    price: 1999,
    rating: 4.3,
    reviews: 654,
    description:
      "Ultra-thin 5000 mAh companion power bank that slips into any pocket or bag.",
    image: "/products/charge-slim.svg",
  },
  {
    id: "hub",
    name: "Nova Hub",
    category: "Smart Home",
    price: 9999,
    mrp: 11999,
    rating: 4.4,
    reviews: 423,
    description:
      "Central smart-home hub that connects your devices, automates routines and stays private by design.",
    image: "/products/hub.svg",
  },
  {
    id: "hub-mini",
    name: "Nova Hub Mini",
    category: "Smart Home",
    price: 6499,
    rating: 4.3,
    reviews: 289,
    description:
      "Compact smart hub with voice control, scene support and easy setup in minutes.",
    image: "/products/hub-mini.svg",
  },
]

export const storeInfo = {
  name: "NOVA",
  tagline: "Designed for the way you live.",
  email: "hello@nova.store",
  phone: "+91 98765 43210",
  phoneHref: "tel:+919876543210",
  hours: "Mon – Sat · 10:00 – 20:00",
  address: "NOVA Experience Store, 4th Floor, Tech Park Boulevard, Chennai 600032",
}

export const categoryMeta: {
  id: (typeof categories)[number]
  title: string
  blurb: string
  image: string
}[] = [
  { id: "Audio", title: "Audio", blurb: "Headphones, earbuds & speakers", image: "/products/air-pro.svg" },
  { id: "Wearables", title: "Wearables", blurb: "Smartwatches for every day", image: "/products/watch-x.svg" },
  { id: "Power", title: "Power", blurb: "Battery when you need it", image: "/products/charge.svg" },
  { id: "Smart Home", title: "Smart Home", blurb: "A calmer, connected home", image: "/products/hub.svg" },
]

export const formatINR = (n: number) => `₹${n.toLocaleString("en-IN")}`

export type { LucideIcon }