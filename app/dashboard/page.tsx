'use client'

import { useEffect, useState } from "react"
import Link from "next/link"
import { prophecies } from "@/data/prophecies"
import ProgressBar from "@/components/ProgressBar"
import { getCompletionCount, getCompletionPercent } from "@/lib/progress"

export default function DashboardPage() {

  const [completed, setCompleted] = useState(0)

  useEffect(() => {
    const count = getCompletionCount()
    setCompleted(count)
  }, [])

  const total = prophecies.length
  const percent = getCompletionPercent(total)

  const firstLesson = prophecies[0]

  return (
    <div className="space-y-8">

      <div className="rounded-[2rem] border border-[#d8ccb8] bg-white p-8 shadow-sm">

        <div className="text-sm font-semibold uppercase tracking-[0.22em] text-[#7e622a]">
          Dashboard
        </div>

        <h1 className="mt-2 text-3xl font-bold text-[#1b1a17]">
          Your Scripture Journey
        </h1>

        <p className="mt-4 max-w-2xl text-[#4a4338]">
          Track your progress through the 100 prophecy lessons that point to Jesus.
        </p>

      </div>

      <div className="rounded-[2rem] border border-[#d8ccb8] bg-white p-6 shadow-sm">

        <div className="text-sm font-semibold text-[#7e622a]">
          Progress
        </div>

        <div className="mt-2 text-3xl font-bold text-[#1b1a17]">
          {completed} / {total} Lessons
        </div>

        <div className="mt-2 text-sm text-[#4a4338]">
          {percent}% complete
        </div>

        <div className="mt-4">
          <ProgressBar current={completed} total={total} />
        </div>

      </div>

      <div className="grid gap-6 md:grid-cols-2">

        <div className="rounded-[2rem] border border-[#d8ccb8] bg-white p-6 shadow-sm">

          <div className="text-sm font-semibold text-[#7e622a]">
            Start the Journey
          </div>

          <h2 className="mt-2 text-xl font-bold text-[#1b1a17]">
            {firstLesson.title}
          </h2>

          <p className="mt-3 text-sm text-[#4a4338]">
            {firstLesson.summary}
          </p>

          <Link
            href={`/lessons/${firstLesson.slug}`}
            className="mt-4 inline-block rounded-xl bg-[#1b1a17] px-4 py-2 text-white text-sm font-semibold"
          >
            Open Lesson
          </Link>

        </div>

        <div className="rounded-[2rem] border border-[#d8ccb8] bg-white p-6 shadow-sm">

          <div className="text-sm font-semibold text-[#7e622a]">
            Explore All Lessons
          </div>

          <p className="mt-3 text-sm text-[#4a4338]">
            Browse all prophecy lessons and explore the connections between
            Old Testament promises and the life of Jesus.
          </p>

          <Link
            href="/prophecies"
            className="mt-4 inline-block rounded-xl border border-[#d8ccb8] px-4 py-2 text-sm font-semibold"
          >
            Browse Prophecies
          </Link>

        </div>

      </div>

    </div>
  )
}