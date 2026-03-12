'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import Fuse from 'fuse.js'
import { Command } from 'cmdk'
import { getAllLessons } from '@/data/lessons'
import type { Lesson } from '@/lib/types'
import CopyVerseLink from '@/components/CopyVerseLink'

const RECENT_KEY = 'sj-recent-lessons'
const MAX_RECENT = 5
const MAX_RESULTS = 8
const DEBOUNCE_MS = 300

function getRecentSlugs(): string[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(RECENT_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function addRecentSlug(slug: string) {
  if (typeof window === 'undefined') return
  try {
    const slugs = getRecentSlugs().filter(s => s !== slug)
    slugs.unshift(slug)
    localStorage.setItem(RECENT_KEY, JSON.stringify(slugs.slice(0, MAX_RECENT)))
  } catch {
    // localStorage may be unavailable in in-app browsers
  }
}

function highlightMatch(text: string, query: string): React.ReactNode {
  if (!query.trim()) return text
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const re = new RegExp(`(${escaped})`, 'gi')
  const parts = text.split(re)
  return parts.map((part, i) =>
    re.test(part) ? (
      <mark key={i} className="bg-[#fef08a] text-inherit rounded-sm">
        {part}
      </mark>
    ) : (
      part
    ),
  )
}

const typeBadgeStyles: Record<string, string> = {
  'Direct Prophecy': 'bg-[#fef3c7] text-[#92400e] border-[#fde68a]',
  'Messianic Psalm': 'bg-[#dbeafe] text-[#1e40af] border-[#bfdbfe]',
  'Typology': 'bg-[#d1fae5] text-[#065f46] border-[#a7f3d0]',
  'Prophetic Pattern': 'bg-[#ede9fe] text-[#4c1d95] border-[#ddd6fe]',
  'Applied Psalm': 'bg-[#f0f9ff] text-[#0c4a6e] border-[#bae6fd]',
}

export default function SearchAutocomplete() {
  const router = useRouter()
  const lessons = useMemo(() => getAllLessons(), [])
  const [query, setQuery] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')
  const [open, setOpen] = useState(false)
  const [recentLessons, setRecentLessons] = useState<Lesson[]>([])
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const fuse = useMemo(
    () =>
      new Fuse(lessons, {
        keys: [
          { name: 'title', weight: 0.4 },
          { name: 'otReference', weight: 0.2 },
          { name: 'ntReference', weight: 0.2 },
          { name: 'summary', weight: 0.1 },
          { name: 'category', weight: 0.05 },
          { name: 'prophecyType', weight: 0.05 },
        ],
        threshold: 0.4,
        includeScore: true,
        minMatchCharLength: 2,
      }),
    [lessons],
  )

  // Debounce query
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(query), DEBOUNCE_MS)
    return () => clearTimeout(timer)
  }, [query])

  // Load recent lessons
  useEffect(() => {
    const slugs = getRecentSlugs()
    const recent = slugs
      .map(s => lessons.find(l => l.slug === s))
      .filter((l): l is Lesson => !!l)
    setRecentLessons(recent)
  }, [lessons, open])

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const results = useMemo(() => {
    if (!debouncedQuery.trim()) return []
    return fuse.search(debouncedQuery).slice(0, MAX_RESULTS).map(r => r.item)
  }, [debouncedQuery, fuse])

  const selectLesson = useCallback(
    (lesson: Lesson) => {
      addRecentSlug(lesson.slug)
      setOpen(false)
      setQuery('')
      router.push(`/lessons/${lesson.slug}`)
    },
    [router],
  )

  const showRecent = open && !debouncedQuery.trim() && recentLessons.length > 0
  const showResults = open && debouncedQuery.trim().length > 0

  return (
    <div ref={containerRef} className="relative w-full">
      <Command shouldFilter={false} className="w-full">
        <div className="relative">
          <svg
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9a8e7e]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <Command.Input
            ref={inputRef}
            value={query}
            onValueChange={(v) => {
              setQuery(v)
              if (!open) setOpen(true)
            }}
            onFocus={() => setOpen(true)}
            placeholder="Search prophecy, verse, or topic…"
            className="w-full rounded-xl border border-[#d8ccb8] bg-white py-3 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#7e622a]"
          />
        </div>

        {(showRecent || showResults) && (
          <Command.List className="absolute left-0 right-0 top-[calc(100%+4px)] z-50 max-h-[420px] overflow-y-auto rounded-xl border border-[#d8ccb8] bg-white shadow-lg">
            {showRecent && (
              <Command.Group
                heading={
                  <span className="px-3 py-2 text-[10px] font-semibold uppercase tracking-wider text-[#9a8e7e]">
                    Recently Viewed
                  </span>
                }
              >
                {recentLessons.map((lesson) => (
                  <Command.Item
                    key={lesson.slug}
                    value={lesson.slug}
                    onSelect={() => selectLesson(lesson)}
                    className="flex cursor-pointer items-start gap-3 px-3 py-2.5 text-sm transition data-[selected=true]:bg-[#fbf7ee]"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-[#1b1a17]">
                          {lesson.title}
                        </span>
                        <span className={`inline-flex shrink-0 items-center rounded-full border px-1.5 py-0.5 text-[10px] font-medium ${typeBadgeStyles[lesson.prophecyType] ?? ''}`}>
                          {lesson.prophecyType}
                        </span>
                      </div>
                      <div className="mt-0.5 text-xs text-[#7e622a]">
                        {lesson.otReference} → {lesson.ntReference}
                      </div>
                    </div>
                    <CopyVerseLink lesson={lesson} size="sm" />
                  </Command.Item>
                ))}
              </Command.Group>
            )}

            {showResults && results.length > 0 && (
              <Command.Group
                heading={
                  <span className="px-3 py-2 text-[10px] font-semibold uppercase tracking-wider text-[#9a8e7e]">
                    Results
                  </span>
                }
              >
                {results.map((lesson) => (
                  <Command.Item
                    key={lesson.slug}
                    value={lesson.slug}
                    onSelect={() => selectLesson(lesson)}
                    className="flex cursor-pointer items-start gap-3 px-3 py-2.5 text-sm transition data-[selected=true]:bg-[#fbf7ee]"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-[#1b1a17]">
                          {highlightMatch(lesson.title, debouncedQuery)}
                        </span>
                        <span className={`inline-flex shrink-0 items-center rounded-full border px-1.5 py-0.5 text-[10px] font-medium ${typeBadgeStyles[lesson.prophecyType] ?? ''}`}>
                          {lesson.prophecyType}
                        </span>
                      </div>
                      <div className="mt-0.5 text-xs text-[#7e622a]">
                        {highlightMatch(lesson.otReference, debouncedQuery)} →{' '}
                        {highlightMatch(lesson.ntReference, debouncedQuery)}
                      </div>
                      <div className="mt-0.5 flex items-center gap-1.5">
                        <span className="rounded-full border border-[#d8ccb8] bg-[#fbf7ee] px-2 py-0.5 text-[10px] font-medium text-[#7e622a]">
                          {lesson.category}
                        </span>
                        <span className="text-[10px] text-[#9a8e7e]">
                          Lesson {lesson.id}
                        </span>
                      </div>
                    </div>
                    <CopyVerseLink lesson={lesson} size="sm" />
                  </Command.Item>
                ))}
              </Command.Group>
            )}

            {showResults && results.length === 0 && (
              <div className="px-3 py-6 text-center text-sm text-[#9a8e7e]">
                No matching prophecies found
              </div>
            )}
          </Command.List>
        )}
      </Command>
    </div>
  )
}
