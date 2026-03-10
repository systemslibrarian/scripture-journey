'use client'

import { useMemo } from "react"
import Link from "next/link"
import LessonCard from "@/components/LessonCard"
import FilterControls from "@/components/FilterControls"
import { useLessonFilters } from "@/hooks/useLessonFilters"
import { TIMELINE_ERAS, groupLessonsByTimelineEra } from "@/lib/timeline"

export default function TimelinePage() {
  const {
    query, setQuery,
    activeType, setActiveType,
    scholarFilter, setScholarFilter,
    scholarCounts,
    filtered,
  } = useLessonFilters()

  const grouped = useMemo(() => groupLessonsByTimelineEra(filtered), [filtered])

  const hasResults = TIMELINE_ERAS.some((era) => (grouped.get(era.id)?.length ?? 0) > 0)

  /* Count visible eras for connector logic */
  const visibleEras = TIMELINE_ERAS.filter(
    (era) => (grouped.get(era.id)?.length ?? 0) > 0
  )

  return (
    <div className="space-y-8">

      {/* ── Header ── */}
      <div className="rounded-[2rem] border border-[#d8ccb8] bg-white p-8 shadow-sm">
        <div className="text-sm font-semibold uppercase tracking-[0.22em] text-[#7e622a]">
          Scripture Journey
        </div>

        <h1 className="mt-2 text-3xl font-bold text-[#1b1a17]">
          Journey Through the Promise
        </h1>

        <p className="mt-4 max-w-3xl text-[#4a4338]">
          See how God progressively revealed the Messiah across the Old Testament —
          from the first promise in Genesis to the final prophecies before His arrival.
        </p>

        {/* Arc summary — visual progression of the whole story */}
        <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#7e622a]">
          {TIMELINE_ERAS.map((era, i) => (
            <span key={era.id} className="flex items-center gap-3">
              <span className="font-medium">{era.arcPhrase}</span>
              {i < TIMELINE_ERAS.length - 1 && (
                <span className="text-[#d8ccb8]">→</span>
              )}
            </span>
          ))}
        </div>
      </div>

      {/* ── How to Use This Page ── */}
      <div className="rounded-2xl border border-[#d8ccb8] bg-[#fffdf8] p-6">
        <h2 className="text-sm font-semibold text-[#7e622a]">
          How to Use This Page
        </h2>
        <div className="mt-3 space-y-2 text-sm leading-relaxed text-[#4a4338]">
          <p>
            This timeline traces how God progressively revealed the coming Messiah — from
            the first promise in Eden to the final prophets before Christ&apos;s birth.
          </p>
          <p>
            Scroll through nine biblical eras, each representing a stage in the unfolding
            story of redemption. Open any lesson to see how its Old Testament passage
            points forward to Jesus and is fulfilled in the New Testament.
          </p>
        </div>
      </div>

      {/* ── Filters ── */}
      <div className="rounded-2xl border border-[#d8ccb8] bg-white p-6 shadow-sm">
        <div className="text-sm font-semibold text-[#7e622a]">
          Filter Lessons
        </div>

        <input
          type="text"
          placeholder="Search prophecy, verse, or topic..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="mt-4 w-full rounded-xl border border-[#d8ccb8] px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#7e622a]"
        />

        <FilterControls
          activeType={activeType}
          onTypeChange={setActiveType}
          scholarFilter={scholarFilter}
          onScholarChange={setScholarFilter}
          scholarCounts={scholarCounts}
        />
      </div>

      {/* ── Timeline ── */}
      {hasResults ? (
        <div className="relative ml-3 border-l-2 border-[#d8ccb8] sm:ml-5">
          {visibleEras.map((era, visibleIndex) => {
            const lessons = grouped.get(era.id) ?? []
            const sorted = [...lessons].sort((a, b) => a.id - b.id)
            const isLast = visibleIndex === visibleEras.length - 1

            return (
              <section
                key={era.id}
                className={`relative pl-8 sm:pl-12 ${isLast ? 'pb-0' : 'pb-12'}`}
              >
                {/* Timeline node */}
                <div className="absolute -left-[17px] top-0 flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#7e622a] bg-[#fbf7ee] text-xs font-bold text-[#7e622a]">
                  {era.order}
                </div>

                {/* Era header */}
                <div className="rounded-2xl border border-[#d8ccb8] bg-white p-5 shadow-sm">
                  <div className="text-xs font-semibold uppercase tracking-widest text-[#7e622a]">
                    {era.arcPhrase}
                  </div>
                  <h2 className="mt-1 text-2xl font-bold text-[#1b1a17]">
                    {era.title}
                  </h2>
                  <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#7e622a]">
                    <span>{era.dateRange}</span>
                    <span className="text-[#d8ccb8]">·</span>
                    <span>{era.keyBooks}</span>
                    <span className="text-[#d8ccb8]">·</span>
                    <span>
                      {sorted.length} {sorted.length === 1 ? 'lesson' : 'lessons'}
                    </span>
                  </div>
                  <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[#4a4338]">
                    {era.description}
                  </p>
                </div>

                {/* Lesson cards */}
                <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {sorted.map((lesson) => (
                    <LessonCard key={lesson.slug} lesson={lesson} />
                  ))}
                </div>
              </section>
            )
          })}
        </div>
      ) : (
        <div className="rounded-3xl border border-dashed border-[#d8ccb8] bg-[#fffdf8] p-8 text-center">
          <h2 className="text-lg font-semibold text-[#1b1a17]">
            No matching lessons found
          </h2>
          <p className="mt-2 text-sm text-[#4a4338]">
            Try another title, reference, or keyword to explore the timeline.
          </p>
        </div>
      )}

      {/* ── Continue Exploring ── */}
      <div className="rounded-[2rem] border border-[#d8ccb8] bg-[#fffdf8] p-8 shadow-sm">
        <div className="text-sm font-semibold uppercase tracking-[0.22em] text-[#7e622a]">
          Continue Exploring
        </div>
        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          <Link
            href="/lessons/genesis-3-15"
            className="rounded-xl border border-[#d8ccb8] bg-white px-5 py-4 transition hover:border-[#c8a84b] hover:shadow-sm"
          >
            <span className="text-xs font-semibold text-[#7e622a]">Start at the Beginning</span>
            <span className="mt-1 block font-semibold text-[#1b1a17]">Lesson 1: The Seed of the Woman</span>
            <span className="mt-0.5 block text-xs text-[#4a4338]">
              The first messianic promise in all of Scripture
            </span>
          </Link>
          <Link
            href="/map"
            className="rounded-xl border border-[#d8ccb8] bg-white px-5 py-4 transition hover:border-[#c8a84b] hover:shadow-sm"
          >
            <span className="text-xs font-semibold text-[#7e622a]">Prophecy Map</span>
            <span className="mt-1 block font-semibold text-[#1b1a17]">Explore by Category</span>
            <span className="mt-0.5 block text-xs text-[#4a4338]">
              See lessons organized by Lineage, Identity, Passion, and more
            </span>
          </Link>
          <Link
            href="/quiz"
            className="rounded-xl border border-[#d8ccb8] bg-white px-5 py-4 transition hover:border-[#c8a84b] hover:shadow-sm"
          >
            <span className="text-xs font-semibold text-[#7e622a]">Test Your Knowledge</span>
            <span className="mt-1 block font-semibold text-[#1b1a17]">Take the Quiz</span>
            <span className="mt-0.5 block text-xs text-[#4a4338]">
              10 questions from the prophecy lessons you&apos;ve studied
            </span>
          </Link>
        </div>
      </div>

    </div>
  )
}
