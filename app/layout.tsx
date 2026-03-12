import type { Metadata, Viewport } from "next"
import Link from "next/link"
import "./globals.css"
import Header from "@/components/Header"
import ServiceWorkerRegistration from "@/components/ServiceWorkerRegistration"
import AuthProvider from "@/components/AuthProvider"
import ThemeProvider from "@/components/ThemeProvider"
import { ErrorBoundary } from "@/components/ErrorBoundary"
import { InAppBrowserBanner } from "@/components/InAppBrowserBanner"

export const metadata: Metadata = {
  title: "Scripture Journey",
  description:
    "Explore how the entire Bible points to Jesus through 202 prophecy-centered lessons inspired by Luke 24:27.",
  metadataBase: new URL("https://scripturejourney.com"),
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Scripture Journey",
  },
  openGraph: {
    title: "Scripture Journey",
    description:
      "Explore how the entire Bible points to Jesus through 202 prophecy-centered lessons inspired by Luke 24:27.",
    url: "https://scripturejourney.com",
    siteName: "Scripture Journey",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Scripture Journey homepage preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Scripture Journey",
    description:
      "Explore how the entire Bible points to Jesus through 202 prophecy-centered lessons inspired by Luke 24:27.",
    images: ["/og-image.png"],
  },
}

export const viewport: Viewport = {
  themeColor: "#7e622a",
  viewportFit: "cover",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-[#fefcf8] text-[#1b1a17] antialiased">
        <ErrorBoundary>
        <AuthProvider>
        <ThemeProvider>

        <InAppBrowserBanner />
        <a href="#main-content" className="skip-link">Skip to content</a>

        <noscript>
          <div style={{ padding: "1rem", textAlign: "center" }}>
            Please enable JavaScript to use Scripture Journey.
          </div>
        </noscript>

        <Header />

        <main id="main-content" className="mx-auto w-full max-w-6xl px-4 py-6 md:py-10">
          {children}
        </main>

        <footer className="mx-auto max-w-4xl px-4 py-8 text-center text-xs leading-relaxed text-[#9a8e7e]">
          Scripture quotations taken from The Holy Bible, New International
          Version® NIV®. Copyright © 1973, 1978, 1984, 2011 by Biblica, Inc.™
          Used by permission. All rights reserved worldwide.
          <div className="mt-3">
            <Link href="/sources" className="underline decoration-[#bba989] underline-offset-4 hover:text-[#7e622a]">
              Sources and Methodology
            </Link>
          </div>
        </footer>

        <ServiceWorkerRegistration />

        </ThemeProvider>
        </AuthProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}