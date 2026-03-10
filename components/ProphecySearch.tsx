'use client'

import { useState, useEffect, useMemo } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { prophecies } from "@/data/prophecies"
import { getCompletedLessons } from "@/lib/progress"
import CompletedIndicator from "@/components/CompletedIndicator"
import ProphecyTypeBadge from "@/components/ProphecyTypeBadge"
import type { ProphecyType, Lesson } from "@/lib/types"

const ALL_TYPES: ProphecyType[] = [
  'Direct Prophecy',
  'Messianic Psalm',
  'Typology',
  'Thematic Foreshadowing',
];

const typeActiveStyles: Record<ProphecyType, string> = {
  'Direct Prophecy':        'bg-[#fef3c7] border-[#f59e0b] text-[#92400e]',
  'Messianic Psalm':        'bg-[#dbeafe] border-[#3b82f6] text-[#1e40af]',
  'Typology':               'bg-[#d1fae5] border-[#10b981] text-[#065f46]',
  'Thematic Foreshadowing': 'bg-[#ede9fe] border-[#8b5cf6] text-[#4c1d95]',
};

type SortOption = 'default' | 'category' | 'completed-first' | 'not-completed-first';
type ScholarFilter = 'all' | 'payne' | 'edersheim' | 'mcdowell';

const scholarActiveStyles: Record<Exclude<ScholarFilter, 'all'>, string> = {
  payne:     'bg-[#efe8fb] border-[#5f3a8a] text-[#5f3a8a]',
  edersheim: 'bg-[#f5f0e5] border-[#7e622a] text-[#7e622a]',
  mcdowell:  'bg-[#e8f0f5] border-[#2a5a7e] text-[#2a5a7e]',
};

function matchesScholar(lesson: Lesson, filter: ScholarFilter): boolean {
  if (filter === 'all') return true;
  if (filter === 'payne') return !!lesson.scholarship?.payne?.attested;
  if (filter === 'edersheim') return !!lesson.scholarship?.edersheim?.attested;
  if (filter === 'mcdowell') return !!lesson.scholarship?.mcdowell?.attested;
  return true;
}

export default function ProphecySearch() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [query, setQuery] = useState("")
  const [activeType, setActiveType] = useState<ProphecyType | null>(null)
  const [sortBy, setSortBy] = useState<SortOption>('default')
  const rawScholar = searchParams.get('scholar')
  const initialScholar: ScholarFilter = rawScholar && ['payne', 'edersheim', 'mcdowell'].includes(rawScholar)
    ? rawScholar as ScholarFilter
    : 'all'
  const [scholarFilter, setScholarFilter] = useState<ScholarFilter>(initialScholar)
  const [completedSlugs, setCompletedSlugs] = useState<string[]>([])
  const totalLessons = prophecies.length

  useEffect(() => {
    setCompletedSlugs(getCompletedLessons())
  }, [])

  const scholarCounts = useMemo(() => ({
    payne: prophecies.filter(l => l.scholarship?.payne?.attested).length,
    edersheim: prophecies.filter(l => l.scholarship?.edersheim?.attested).length,
    mcdowell: prophecies.filter(l => l.scholarship?.mcdowell?.attested).length,
  }), [])

  const normalizedQuery = query.trim().toLowerCase()

  const filtered = prophecies.filter((lesson) => {
    const text = `${lesson.title} ${lesson.otReference} ${lesson.ntReference} ${lesson.summary} ${lesson.category}`.toLowerCase()
    const matchesSearch = text.includes(normalizedQuery)
    const matchesType = activeType === null || lesson.prophecyType === activeType
    return matchesSearch && matchesType && matchesScholar(lesson, scholarFilter)
  })

  const results = [...filtered].sort((a, b) => {
    if (sortBy === 'category') return a.category.localeCompare(b.category) || a.id - b.id;
    if (sortBy === 'completed-first') {
      return (completedSlugs.includes(b.slug) ? 1 : 0) - (completedSlugs.includes(a.slug) ? 1 : 0);
    }
    if (sortBy === 'not-completed-first') {
      return (completedSlugs.includes(a.slug) ? 1 : 0) - (completedSlugs.includes(b.slug) ? 1 : 0);
    }
    return a.id - b.id;
  })

  function handleSurpriseMe() {
    const incomplete = prophecies.filter(l => !completedSlugs.includes(l.slug))
    const pool = incomplete.length > 0 ? incomplete : prophecies
    const random = pool[Math.floor(Math.random() * pool.length)]
    router.push(`/lessons/${random.slug}`)
  }

  return (
    <div className="space-y-6">

      <div className="rounded-2xl border border-[#d8ccb8] bg-white p-6 shadow-sm">

        <div className="text-sm font-semibold text-[#7e622a]">
          Search the {totalLessons} Prophecies
        </div>

        <input
          type="text"
          placeholder="Search prophecy, verse, or topic..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="mt-4 w-full rounded-xl border border-[#d8ccb8] px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#7e622a]"
        />

        <div className="mt-3 flex flex-wrap items-center gap-2">
          {ALL_TYPES.map((type) => (
            <button
              key={type}
              onClick={() => setActiveType(activeType === type ? null : type)}
              className={`rounded-full px-3 py-1 text-xs font-medium border transition
                ${activeType === type
                  ? typeActiveStyles[type]
                  : 'bg-white border-[#d8ccb8] text-[#4a4338] hover:border-[#7e622a]'
                }`}
            >
              {type}
            </button>
          ))}
          {activeType && (
            <button
              onClick={() => setActiveType(null)}
              className="rounded-full px-3 py-1 text-xs font-medium border border-[#d8ccb8] text-[#7e622a] hover:bg-[#fbf7ee]"
            >
              Clear ✕
            </button>
          )}
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="text-xs text-[#7e622a] font-semibold">Scholar:</span>
          <button
            onClick={() => setScholarFilter('all')}
            className={`rounded-full px-3 py-1 text-xs font-medium border transition ${scholarFilter === 'all' ? 'bg-[#fbf7ee] border-[#7e622a] text-[#7e622a]' : 'bg-white border-[#d8ccb8] text-[#4a4338] hover:border-[#7e622a]'}`}
          >
            All
          </button>
          <button
            onClick={() => setScholarFilter(scholarFilter === 'payne' ? 'all' : 'payne')}
            className={`rounded-full px-3 py-1 text-xs font-medium border transition ${scholarFilter === 'payne' ? scholarActiveStyles.payne : 'bg-white border-[#d8ccb8] text-[#4a4338] hover:border-[#7e622a]'}`}
          >
            📘 Payne ({scholarCounts.payne})
          </button>
          <button
            onClick={() => setScholarFilter(scholarFilter === 'edersheim' ? 'all' : 'edersheim')}
            className={`rounded-full px-3 py-1 text-xs font-medium border transition ${scholarFilter === 'edersheim' ? scholarActiveStyles.edersheim : 'bg-white border-[#d8ccb8] text-[#4a4338] hover:border-[#7e622a]'}`}
          >
            📚 Edersheim ({scholarCounts.edersheim})
          </button>
          <button
            onClick={() => setScholarFilter(scholarFilter === 'mcdowell' ? 'all' : 'mcdowell')}
            className={`rounded-full px-3 py-1 text-xs font-medium border transition ${scholarFilter === 'mcdowell' ? scholarActiveStyles.mcdowell : 'bg-white border-[#d8ccb8] text-[#4a4338] hover:border-[#7e622a]'}`}
          >
            📖 McDowell ({scholarCounts.mcdowell})
          </button>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-3">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="rounded-xl border border-[#d8ccb8] px-3 py-1.5 text-xs text-[#4a4338] focus:outline-none focus:ring-2 focus:ring-[#7e622a]"
          >
            <option value="default">Sort: Default</option>
            <option value="category">Sort: By Category</option>
            <option value="completed-first">Sort: Completed First</option>
            <option value="not-completed-first">Sort: Not Completed First</option>
          </select>

          <button
            onClick={handleSurpriseMe}
            className="rounded-full border border-[#d8ccb8] px-3 py-1.5 text-xs text-[#7e622a] hover:bg-[#fbf7ee] transition"
          >
            ✦ Surprise Me
          </button>
        </div>

      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">

        {results.map((lesson) => (
          <Link
            key={lesson.slug}
            href={`/lessons/${lesson.slug}`}
            className="rounded-3xl border border-[#d8ccb8] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >

            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-[#7e622a]">
                  Lesson {lesson.id}
                </span>
                <span className="rounded-full border border-[#d8ccb8] bg-[#fbf7ee] px-2 py-0.5 text-[10px] font-medium text-[#7e622a]">
                  {lesson.category}
                </span>
              </div>

              <CompletedIndicator slug={lesson.slug} />
            </div>

            <h2 className="mt-2 text-xl font-bold text-[#1b1a17]">
              {lesson.title}
            </h2>

            <p className="mt-2 text-sm text-[#4a4338]">
              {lesson.otReference} → {lesson.ntReference}
            </p>

            <div className="mt-2 flex flex-wrap gap-1">
              {lesson.scholarship?.payne?.attested && (
                <span className="inline-flex items-center rounded-full bg-[#efe8fb] px-1.5 py-0.5 text-[10px] font-medium text-[#5f3a8a]">📘 Payne ✓</span>
              )}
              {lesson.scholarship?.edersheim?.attested && (
                <span className="inline-flex items-center rounded-full bg-[#f5f0e5] px-1.5 py-0.5 text-[10px] font-medium text-[#7e622a]">📚 Edersheim ✓</span>
              )}
              {lesson.scholarship?.mcdowell?.attested && (
                <span className="inline-flex items-center rounded-full bg-[#e8f0f5] px-1.5 py-0.5 text-[10px] font-medium text-[#2a5a7e]">📖 McDowell ✓</span>
              )}
            </div>

            <div className="mt-2">
              <ProphecyTypeBadge type={lesson.prophecyType} size="xs" />
            </div>

            <p className="mt-4 text-sm leading-6 text-[#4a4338]">
              {lesson.summary}
            </p>

            <div className="mt-4 text-sm font-semibold text-[#7e622a]">
              Open lesson →
            </div>

          </Link>
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