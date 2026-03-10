import { Suspense } from "react"
import Link from "next/link"
import type { Metadata } from "next"
import ProphecySearch from "@/components/ProphecySearch"
import ContinueCard from "@/components/ContinueCard"
import { getAllLessons } from "@/data/lessons"

export const metadata: Metadata = {
  title: "Scripture Journey — Explore How Scripture Points to Jesus",
  description: "Walk through 211 prophecies, patterns, and promises in the Old Testament that Christians believe find their fulfillment in Jesus.",
  openGraph: {
    title: "Scripture Journey — Explore How Scripture Points to Jesus",
    description: "Walk through 211 prophecies, patterns, and promises that point to Jesus. Inspired by Luke 24:27.",
  },
}

const startingPaths: { label: string; title: string; description: string; href: string }[] = [
  {
    label: "Begin at the Beginning",
    title: "Lesson 1: The First Promise",
    description: "Start with the very first messianic prophecy in Genesis and follow the story forward.",
    href: "/lessons/seed-of-the-woman",
  },
  {
    label: "By Category",
    title: "Explore the Prophecy Map",
    description: "Choose a category — Lineage, Identity, Passion, Kingdom — and dive in.",
    href: "/map",
  },
  {
    label: "Chronologically",
    title: "Follow the Timeline",
    description: "See how God revealed the Messiah across nine eras of biblical history.",
    href: "/timeline",
  },
  {
    label: "Test Yourself",
    title: "Jump into the Quiz",
    description: "Try 10 questions drawn from the prophecy lessons — no preparation needed.",
    href: "/quiz",
  },
]

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

      {/* ── Where to Start ── */}
      <div className="rounded-[2rem] border border-[#d8ccb8] bg-[#fffdf8] p-8 shadow-sm">
        <div className="text-sm font-semibold uppercase tracking-[0.22em] text-[#7e622a]">
          Where to Start
        </div>
        <p className="mt-2 text-sm text-[#4a4338]">
          Not sure where to begin? Choose a starting path that fits your interest.
        </p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {startingPaths.map((path) => (
            <Link
              key={path.href}
              href={path.href}
              className="rounded-xl border border-[#d8ccb8] bg-white px-5 py-4 transition hover:border-[#c8a84b] hover:shadow-sm"
            >
              <span className="text-xs font-semibold text-[#7e622a]">{path.label}</span>
              <span className="mt-1 block font-semibold text-[#1b1a17]">{path.title}</span>
              <span className="mt-0.5 block text-xs text-[#4a4338]">{path.description}</span>
            </Link>
          ))}
        </div>
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
