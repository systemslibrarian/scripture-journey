import { Suspense } from "react"
import Link from "next/link"
import type { Metadata } from "next"
import ProphecySearch from "@/components/ProphecySearch"
import ContinueCard from "@/components/ContinueCard"
import { getAllLessons } from "@/data/lessons"

export const metadata: Metadata = {
  title: "Scripture Journey — Explore How Scripture Points to Jesus",
  description: "Walk through 211 prophecies, patterns, and promises in the Old Testament that Christians believe find their fulfillment in Jesus.",
}

export default function HomePage() {
  const totalLessons = getAllLessons().length

  return (
    <div className="space-y-8">
      <div className="text-center">
        <p className="text-lg italic text-[#4a4338]">
          &ldquo;And beginning with Moses and all the Prophets, he explained to them what was said in all the Scriptures concerning himself.&rdquo;
        </p>
        <p className="mt-2 text-sm font-semibold text-[#7e622a]">— Luke 24:27 (NIV)</p>
      </div>

      <div className="rounded-[2rem] border border-[#d8ccb8] bg-white p-8 shadow-sm">
        <div className="text-sm font-semibold uppercase tracking-[0.22em] text-[#7e622a]">
          {totalLessons} Prophecy Lessons
        </div>

        <h1 className="mt-2 text-3xl font-bold text-[#1b1a17]">
          Explore How Scripture Points to Jesus
        </h1>

        <p className="mt-4 max-w-3xl text-[#4a4338]">
          Scripture Journey walks you through the prophecies, patterns, and promises in the Old Testament that Christians believe find their fulfillment in Jesus. Start a lesson, track your progress, and go deeper with each study.
        </p>
      </div>

      <ContinueCard />

      <div className="grid gap-4 sm:grid-cols-3">
        <Link
          href="/map"
          className="rounded-2xl border border-[#d8ccb8] bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
        >
          <div className="text-sm font-semibold text-[#7e622a]">Prophecy Map</div>
          <p className="mt-1 text-sm text-[#4a4338]">
            See all {totalLessons} lessons organized by category — from Lineage to Kingdom.
          </p>
        </Link>
        <Link
          href="/timeline"
          className="rounded-2xl border border-[#d8ccb8] bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
        >
          <div className="text-sm font-semibold text-[#7e622a]">Timeline</div>
          <p className="mt-1 text-sm text-[#4a4338]">
            Follow the messianic promise from Genesis through the Prophets.
          </p>
        </Link>
        <Link
          href="/quiz"
          className="rounded-2xl border border-[#d8ccb8] bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
        >
          <div className="text-sm font-semibold text-[#7e622a]">Quiz</div>
          <p className="mt-1 text-sm text-[#4a4338]">
            Test your knowledge with 10 randomized questions from the lessons.
          </p>
        </Link>
      </div>

      <div className="text-sm font-semibold uppercase tracking-[0.22em] text-[#7e622a]">
        Browse All Lessons
      </div>

      <Suspense>
        <ProphecySearch />
      </Suspense>
    </div>
  )
}
