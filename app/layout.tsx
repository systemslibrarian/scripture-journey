import type { Metadata } from "next"
import "./globals.css"
import Header from "@/components/Header"

export const metadata: Metadata = {
  title: "Scripture Journey",
  description:
    "Explore how the promises, prophecies, and story of Scripture point to Jesus.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#fefcf8] text-[#1b1a17] antialiased">

        <Header />

        <main className="mx-auto w-full max-w-6xl px-4 py-10">
          {children}
        </main>

        <footer className="mx-auto max-w-4xl px-4 py-8 text-center text-xs leading-relaxed text-[#9a8e7e]">
          Scripture quotations taken from The Holy Bible, New International
          Version® NIV®. Copyright © 1973, 1978, 1984, 2011 by Biblica, Inc.™
          Used by permission. All rights reserved worldwide.
        </footer>

      </body>
    </html>
  )
}