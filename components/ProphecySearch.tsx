'use client'

import { useRouter } from "next/navigation"
import { getAllLessons } from "@/data/lessons"
import LessonCard from "@/components/LessonCard"
import FilterControls from "@/components/FilterControls"
import SearchAutocomplete from "@/components/SearchAutocomplete"
import { useLessonFilters } from "@/hooks/useLessonFilters"
import type { SortOption } from "@/hooks/useLessonFilters"

export default function ProphecySearch() {
  const router = useRouter()
  const {
    query, setQuery,
    activeType, setActiveType,
    sortBy, setSortBy,
    scholarFilter, setScholarFilter,
    completedSlugs,
    scholarCounts,
    sorted: results,
    totalLessons,
  } = useLessonFilters()

  function handleSurpriseMe() {
    const allLessons = getAllLessons()
    const incomplete = allLessons.filter(l => !completedSlugs.includes(l.slug))
    const pool = incomplete.length > 0 ? incomplete : allLessons
    const random = pool[Math.floor(Math.random() * pool.length)]
    router.push(`/lessons/${random.slug}`)
  }

  return (
    <div className="space-y-6">

      <div className="rounded-2xl border border-[#d8ccb8] bg-white p-6 shadow-sm dark:border-[#555] dark:bg-[#2a2a2a]">

        <div className="text-sm font-semibold text-[#7e622a] dark:text-[#b5a27a]">
          Search the {totalLessons} Prophecies
        </div>

        <div className="mt-4">
          <SearchAutocomplete />
        </div>

        <input
          type="text"
          placeholder="Filter results below…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="mt-3 w-full rounded-xl border border-[#d8ccb8] px-4 py-2 text-xs text-[#4a4338] focus:outline-none focus:ring-2 focus:ring-[#7e622a] dark:border-[#555] dark:bg-[#2a2a2a] dark:text-[#e8e4dc] dark:placeholder-[#888]"
        />

        <FilterControls
          activeType={activeType}
          onTypeChange={setActiveType}
          scholarFilter={scholarFilter}
          onScholarChange={setScholarFilter}
          scholarCounts={scholarCounts}
        />

        <div className="mt-3 flex flex-wrap items-center gap-3">
          <label className="sr-only" htmlFor="sort-select">Sort lessons</label>
          <select
            id="sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="rounded-xl border border-[#d8ccb8] px-3 py-1.5 text-xs text-[#4a4338] focus:outline-none focus:ring-2 focus:ring-[#7e622a] dark:border-[#555] dark:bg-[#2a2a2a] dark:text-[#e8e4dc]"
          >
            <option value="default">Sort: Default</option>
            <option value="category">Sort: By Category</option>
            <option value="completed-first">Sort: Completed First</option>
            <option value="not-completed-first">Sort: Not Completed First</option>
          </select>

          <button
            onClick={handleSurpriseMe}
            className="rounded-full border border-[#d8ccb8] px-3 py-1.5 text-xs text-[#7e622a] hover:bg-[#fbf7ee] transition dark:border-[#555] dark:text-[#b5a27a] dark:hover:bg-[#333]"
          >
            ✦ Surprise Me
          </button>
        </div>

      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">

        {results.map((lesson) => (
          <LessonCard key={lesson.slug} lesson={lesson} />
        ))}

        {results.length === 0 && (
          <div className="md:col-span-2 xl:col-span-3 rounded-3xl border border-dashed border-[#d8ccb8] bg-[#fffdf8] p-8 text-center">
            <h2 className="text-lg font-semibold text-[#1b1a17]">
              No matching lessons found
            </h2>

            <p className="mt-2 text-sm text-[#4a4338]">
              Try another title, reference, or keyword to explore the prophecy track.
            </p>
          </div>
        )}

      </div>

    </div>
  )
}