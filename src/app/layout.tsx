import type { Metadata, Viewport } from "next"
import { DM_Sans, Space_Grotesk, JetBrains_Mono } from "next/font/google"
import "./globals.css"
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import { StoreProvider } from "@/StoreContext"

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
})

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
  weight: ["400", "500", "600", "700"],
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
  weight: ["400", "500"],
})

export const metadata: Metadata = {
  title: {
    default: "NOVA — Modern Technology & Lifestyle",
    template: "%s · NOVA",
  },
  description:
    "Premium technology and lifestyle products, designed for the way you live.",
}

export const viewport: Viewport = {
  themeColor: "#f7f7f5",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <StoreProvider>
          <Navbar />
          {children}
          <Footer />
        </StoreProvider>
      </body>
    </html>
  )
}