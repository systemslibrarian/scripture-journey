import { useState, useMemo, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { prophecies } from "@/data/prophecies"
import { getCompletedLessons } from "@/lib/progress"
import type { ProphecyType, Lesson } from "@/lib/types"

export type SortOption = 'default' | 'category' | 'completed-first' | 'not-completed-first';
export type ScholarFilter = 'all' | 'payne' | 'edersheim' | 'mcdowell';

export const ALL_TYPES: ProphecyType[] = [
  'Direct Prophecy',
  'Messianic Psalm',
  'Typology',
  'Prophetic Pattern',
];

export const typeActiveStyles: Record<ProphecyType, string> = {
  'Direct Prophecy':        'bg-[#fef3c7] border-[#f59e0b] text-[#92400e]',
  'Messianic Psalm':        'bg-[#dbeafe] border-[#3b82f6] text-[#1e40af]',
  'Typology':               'bg-[#d1fae5] border-[#10b981] text-[#065f46]',
  'Prophetic Pattern':      'bg-[#ede9fe] border-[#8b5cf6] text-[#4c1d95]',
};

export const scholarActiveStyles: Record<Exclude<ScholarFilter, 'all'>, string> = {
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

export function useLessonFilters() {
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

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'category') return a.category.localeCompare(b.category) || a.id - b.id;
    if (sortBy === 'completed-first') {
      return (completedSlugs.includes(b.slug) ? 1 : 0) - (completedSlugs.includes(a.slug) ? 1 : 0);
    }
    if (sortBy === 'not-completed-first') {
      return (completedSlugs.includes(a.slug) ? 1 : 0) - (completedSlugs.includes(b.slug) ? 1 : 0);
    }
    return a.id - b.id;
  })

  return {
    query, setQuery,
    activeType, setActiveType,
    sortBy, setSortBy,
    scholarFilter, setScholarFilter,
    completedSlugs,
    scholarCounts,
    filtered,
    sorted,
    totalLessons: prophecies.length,
  }
}
