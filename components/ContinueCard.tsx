'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { getCompletedLessons } from '@/lib/progress'
import { getAllLessons } from '@/data/lessons'

export default function ContinueCard() {
  const [state, setState] = useState<'loading' | 'none' | 'some' | 'all'>('loading')
  const [completedCount, setCompletedCount] = useState(0)
  const [lastCompletedTitle, setLastCompletedTitle] = useState('')
  const [nextSlug, setNextSlug] = useState('')
  const [nextTitle, setNextTitle] = useState('')

  const allLessons = getAllLessons()
  const total = allLessons.length

  useEffect(() => {
    const completedSlugs = getCompletedLessons()
    const count = completedSlugs.length
    setCompletedCount(count)

    if (count === 0) {
      setState('none')
      setNextSlug(allLessons[0]?.slug ?? '')
      setNextTitle(allLessons[0]?.title ?? '')
    } else if (count >= total) {
      setState('all')
    } else {
      setState('some')
      const lastSlug = completedSlugs[completedSlugs.length - 1]
      const lastLesson = allLessons.find(l => l.slug === lastSlug)
      setLastCompletedTitle(lastLesson?.title ?? lastSlug)

      const nextUnfinished = allLessons.find(l => !completedSlugs.includes(l.slug))
      if (nextUnfinished) {
        setNextSlug(nextUnfinished.slug)
        setNextTitle(nextUnfinished.title)
      }
    }
  }, [allLessons, total])

  if (state === 'loading') return null

  const percent = Math.round((completedCount / total) * 100)

  if (state === 'none') {
    return (
      <div className="rounded-[2rem] border-2 border-[#c8a84b] bg-[#fffdf5] p-8 shadow-sm">
        <h2 className="text-xl font-bold text-[#1b1a17]">Start your journey</h2>
        <p className="mt-2 text-[#4a4338]">{total} prophecies await. Begin with Lesson 1.</p>
        <Link
          href={`/lessons/${nextSlug}`}
          className="mt-4 inline-block rounded-xl bg-[#1b1a17] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#333]"
        >
          Start: {nextTitle} →
        </Link>
      </div>
    )
  }

  if (state === 'all') {
    return (
      <div className="rounded-[2rem] border-2 border-[#c8a84b] bg-[#fffdf5] p-8 shadow-sm">
        <h2 className="text-xl font-bold text-[#1b1a17]">✓ Journey Complete</h2>
        <p className="mt-2 text-[#4a4338]">You&apos;ve studied all {total} prophecies.</p>
        <Link
          href="/quiz"
          className="mt-4 inline-block rounded-xl bg-[#1b1a17] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#333]"
        >
          Take the Quiz →
        </Link>
      </div>
    )
  }

  return (
    <div className="rounded-[2rem] border-2 border-[#c8a84b] bg-[#fffdf5] p-8 shadow-sm">
      <h2 className="text-xl font-bold text-[#1b1a17]">Continue your journey</h2>
      <p className="mt-2 text-sm text-[#4a4338]">
        Last completed: <span className="font-semibold text-[#1b1a17]">{lastCompletedTitle}</span>
      </p>
      {nextSlug && (
        <Link
          href={`/lessons/${nextSlug}`}
          className="mt-2 inline-block text-sm font-semibold text-[#7e622a] hover:underline"
        >
          Up next: {nextTitle} →
        </Link>
      )}
      <div className="mt-4">
        <div className="h-1.5 overflow-hidden rounded-full bg-[#e8e0d0]">
          <div className="h-full rounded-full bg-[#7e622a] transition-all" style={{ width: `${percent}%` }} />
        </div>
        <p className="mt-1.5 text-xs text-[#4a4338]">
          {completedCount} / {total} complete ({percent}%)
        </p>
      </div>
    </div>
  )
}
