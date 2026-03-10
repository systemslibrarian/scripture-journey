'use client'

import { useMemo } from "react"
import LessonCard from "@/components/LessonCard"
import FilterControls from "@/components/FilterControls"
import { useLessonFilters } from "@/hooks/useLessonFilters"
import { TIMELINE_ERAS, groupLessonsByTimelineEra } from "@/lib/timeline"

const arcPhrases = [
  "Promise Given",
  "Promise Narrowed",
  "Redemption Pictured",
  "King Promised",
  "Suffering Revealed",
  "Kingdom Unveiled",
]

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

  return (
    <div className="space-y-8">

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
      </div>

      <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs text-[#7e622a]">
        {arcPhrases.map((phrase, i) => (
          <span key={phrase} className="flex items-center gap-3">
            <span className="font-medium">{phrase}</span>
            {i < arcPhrases.length - 1 && (
              <span className="text-[#d8ccb8]">→</span>
            )}
          </span>
        ))}
      </div>

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

      {hasResults ? (
        TIMELINE_ERAS.map((era) => {
          const lessons = grouped.get(era.id) ?? []
          if (lessons.length === 0) return null
          const sorted = [...lessons].sort((a, b) => a.id - b.id)
          return (
            <section key={era.id} className="space-y-4">
              <div>
                <h2 className="text-2xl font-bold text-[#1b1a17]">{era.title}</h2>
                <p className="mt-1 max-w-3xl text-sm text-[#4a4338]">{era.description}</p>
                <p className="mt-1 text-xs text-[#7e622a]">
                  {sorted.length} {sorted.length === 1 ? 'lesson' : 'lessons'}
                </p>
              </div>
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {sorted.map((lesson) => (
                  <LessonCard key={lesson.slug} lesson={lesson} />
                ))}
              </div>
            </section>
          )
        })
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

    </div>
  )
}
