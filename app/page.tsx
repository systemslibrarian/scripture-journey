import Link from "next/link"
import { prophecies } from "@/data/prophecies"

export default function DashboardPage() {

  const firstLesson = prophecies[0]
  const todayLesson = prophecies[24]

  return (
    <div className="space-y-8">

      <div className="rounded-[2rem] border border-[#d8ccb8] bg-white p-8 shadow-sm">

        <div className="text-sm font-semibold uppercase tracking-[0.22em] text-[#7e622a]">
          Dashboard
        </div>

        <h1 className="mt-3 text-3xl font-bold text-[#1b1a17]">
          Scripture Journey
        </h1>

        <p className="mt-4 max-w-2xl text-[#4a4338]">
          This project explores 100 Old Testament prophecies and how
          Christians understand them as fulfilled in Jesus.
        </p>

      </div>

      <div className="grid gap-6 md:grid-cols-2">

        <div className="rounded-[2rem] border border-[#d8ccb8] bg-white p-6 shadow-sm">

          <div className="text-sm font-semibold text-[#7e622a]">
            Start at the Beginning
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
            Today’s Discovery
          </div>

          <h2 className="mt-2 text-xl font-bold text-[#1b1a17]">
            {todayLesson.title}
          </h2>

          <p className="mt-3 text-sm text-[#4a4338]">
            {todayLesson.summary}
          </p>

          <Link
            href={`/lessons/${todayLesson.slug}`}
            className="mt-4 inline-block rounded-xl border border-[#d8ccb8] px-4 py-2 text-sm font-semibold"
          >
            Open Lesson
          </Link>

        </div>

      </div>

      <div className="rounded-[2rem] border border-[#d8ccb8] bg-white p-6 shadow-sm">

        <div className="text-sm font-semibold text-[#7e622a]">
          Prophecy Track
        </div>

        <div className="mt-2 text-2xl font-bold text-[#1b1a17]">
          100 Lessons
        </div>

        <p className="mt-2 text-[#4a4338]">
          Explore identity, ministry, rejection, the passion,
          and resurrection prophecies connected to Jesus.
        </p>

        <Link
          href="/prophecies"
          className="mt-4 inline-block text-sm font-semibold text-[#7e622a] hover:underline"
        >
          Browse all lessons →
        </Link>

      </div>

    </div>
  )
}