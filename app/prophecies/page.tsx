import { Suspense } from "react"
import type { Metadata } from "next"
import ProphecySearch from "@/components/ProphecySearch"
import { getAllLessons } from "@/data/lessons"

export const metadata: Metadata = {
  title: "Browse Prophecy Lessons — Scripture Journey",
  description: "Search and explore 211 prophecy lessons that trace promises, patterns, and psalms pointing to Jesus.",
  openGraph: {
    title: "Browse Prophecy Lessons — Scripture Journey",
    description: "Search and filter 211 messianic prophecy lessons by type, scholar, and category.",
  },
}

export default function PropheciesPage() {
  const totalLessons = getAllLessons().length

  return (
    <div className="space-y-8">
      <div className="rounded-[2rem] border border-[#d8ccb8] bg-white p-8 shadow-sm">
        <div className="text-sm font-semibold uppercase tracking-[0.22em] text-[#7e622a]">
          {totalLessons} Prophecy Lessons
        </div>
        <h1 className="mt-2 text-3xl font-bold text-[#1b1a17]">
          Search and Explore {totalLessons} Lessons That Point to Jesus
        </h1>
        <p className="mt-4 max-w-3xl text-[#4a4338]">
          Browse the full prophecy track or search by title, Scripture
          reference, or theme.
        </p>
      </div>
      <Suspense>
        <ProphecySearch />
      </Suspense>
    </div>
  )
}