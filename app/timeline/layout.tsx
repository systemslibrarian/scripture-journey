import { Suspense } from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Timeline — Scripture Journey",
  description: "Follow the messianic promise chronologically from Genesis through the Prophets — 193 lessons organized by biblical era.",
  openGraph: {
    title: "Timeline — Scripture Journey",
    description: "See how God progressively revealed the Messiah across the Old Testament — from the first promise in Genesis to the final prophecies.",
  },
}

export default function TimelineLayout({ children }: { children: React.ReactNode }) {
  return <Suspense>{children}</Suspense>
}
