'use client'

import { useEffect, useState, useMemo } from "react"
import Link from "next/link"
import { getAllLessons } from "@/data/lessons"
import ProgressBar from "@/components/ProgressBar"
import { useSession } from 'next-auth/react'
import { getCompletedLessons, getCompletionCount, getQuizStats, getStreak, getLastCompletedSlug } from "@/lib/progress"
import type { LessonCategory, Lesson } from "@/lib/types"

const CATEGORIES: LessonCategory[] = [
  'Lineage', 'Identity', 'Ministry', 'Rejection', 'Passion', 'Resurrection', 'Kingdom'
]

export default function DashboardPage() {
  const { status } = useSession()

  const [completedSlugs, setCompletedSlugs] = useState<string[]>([])
  const [completed, setCompleted] = useState(0)
  const [quizStats, setQuizStats] = useState({ total: 0, perfect: 0, attempted: 0, sessions: 0 })
  const [streak, setStreak] = useState({ current: 0, best: 0 })
  const [lastSlug, setLastSlug] = useState<string | null>(null)

  useEffect(() => {
    const slugs = getCompletedLessons()
    setCompletedSlugs(slugs)
    setCompleted(slugs.length)
    setQuizStats(getQuizStats())
    setStreak(getStreak())
    setLastSlug(getLastCompletedSlug())
  }, [])

  const allLessons = useMemo(() => getAllLessons(), [])
  const total = allLessons.length
  const percent = Math.round((completed / Math.max(total, 1)) * 100)

  /* Smart resume: find next unfinished lesson */
  const nextLesson = useMemo(() => {
    if (completedSlugs.length === 0) return allLessons[0] ?? null
    return allLessons.find(l => !completedSlugs.includes(l.slug)) ?? null
  }, [completedSlugs, allLessons])

  const lastLesson = useMemo(() => {
    if (!lastSlug) return null
    return allLessons.find(l => l.slug === lastSlug) ?? null
  }, [lastSlug, allLessons])

  /* Category progress breakdown */
  const categoryProgress = useMemo(() => {
    return CATEGORIES.map(cat => {
      const catLessons = allLessons.filter(l => l.category === cat)
      const catCompleted = catLessons.filter(l => completedSlugs.includes(l.slug)).length
      const nextInCat = catLessons.find(l => !completedSlugs.includes(l.slug))
      return { category: cat, total: catLessons.length, completed: catCompleted, nextLesson: nextInCat }
    })
  }, [allLessons, completedSlugs])

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
          Track your progress through the {total} prophecy lessons that point to Jesus.
        </p>
      </div>

      {/* ── Resume Your Journey ── */}
      <div className="rounded-[2rem] border-2 border-[#c8a84b] bg-[#fffdf5] p-8 shadow-sm">
        <div className="text-sm font-semibold uppercase tracking-[0.22em] text-[#7e622a]">
          {completed === 0 ? 'Start Your Journey' : completed >= total ? 'Journey Complete' : 'Resume Your Journey'}
        </div>

        {completed > 0 && completed < total && lastLesson && (
          <p className="mt-2 text-sm text-[#4a4338]">
            Last completed: <span className="font-semibold text-[#1b1a17]">{lastLesson.title}</span>
          </p>
        )}

        {completed >= total ? (
          <div className="mt-3">
            <p className="text-[#4a4338]">
              You&apos;ve studied all {total} prophecies. Review any lesson or test yourself.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                href="/quiz"
                className="rounded-xl bg-[#1b1a17] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#333]"
              >
                Take the Quiz →
              </Link>
              <Link
                href="/prophecies"
                className="rounded-xl border border-[#d8ccb8] px-5 py-2.5 text-sm font-semibold text-[#1b1a17] transition hover:bg-[#fbf7ee]"
              >
                Browse All Lessons
              </Link>
            </div>
          </div>
        ) : nextLesson ? (
          <div className="mt-3">
            <h2 className="text-xl font-bold text-[#1b1a17]">{nextLesson.title}</h2>
            <p className="mt-1 text-sm text-[#4a4338]">
              Lesson {nextLesson.id} · {nextLesson.category} · {nextLesson.otReference} → {nextLesson.ntReference}
            </p>
            <Link
              href={`/lessons/${nextLesson.slug}`}
              className="mt-4 inline-block rounded-xl bg-[#1b1a17] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#333]"
            >
              {completed === 0 ? 'Start Lesson 1' : 'Continue'} →
            </Link>
          </div>
        ) : null}
      </div>

      {/* ── Stats Row ── */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <div className="rounded-2xl border border-[#d8ccb8] bg-white p-4 text-center">
          <div className="text-3xl font-bold text-[#1b1a17]">{streak.current}</div>
          <div className="text-xs uppercase tracking-wide text-[#7e622a]">Day Streak</div>
        </div>
        <div className="rounded-2xl border border-[#d8ccb8] bg-white p-4 text-center">
          <div className="text-3xl font-bold text-[#1b1a17]">{completed}</div>
          <div className="text-xs uppercase tracking-wide text-[#7e622a]">Completed</div>
        </div>
        <div className="rounded-2xl border border-[#d8ccb8] bg-white p-4 text-center">
          <div className="text-3xl font-bold text-[#1b1a17]">{quizStats.sessions}</div>
          <div className="text-xs uppercase tracking-wide text-[#7e622a]">Quizzes Taken</div>
        </div>
        <div className="rounded-2xl border border-[#d8ccb8] bg-white p-4 text-center">
          <div className="text-3xl font-bold text-[#1b1a17]">{streak.best}</div>
          <div className="text-xs uppercase tracking-wide text-[#7e622a]">Best Streak</div>
        </div>
      </div>

      {/* ── Overall Progress ── */}
      <div className="rounded-[2rem] border border-[#d8ccb8] bg-white p-6 shadow-sm">
        <div className="text-sm font-semibold text-[#7e622a]">
          Overall Progress
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
        {status === 'unauthenticated' && (
          <p className="mt-3 text-sm text-[#4a4338]">
            <Link href="/auth/signin" className="font-semibold text-[#7e622a]">Sign in</Link> to save your progress across devices.
          </p>
        )}
      </div>

      {/* ── Category Progress ── */}
      <div className="rounded-[2rem] border border-[#d8ccb8] bg-white p-6 shadow-sm">
        <div className="text-sm font-semibold text-[#7e622a]">
          Progress by Category
        </div>
        <div className="mt-4 space-y-4">
          {categoryProgress.map(({ category, total: catTotal, completed: catDone, nextLesson: catNext }) => {
            const catPercent = Math.round((catDone / Math.max(catTotal, 1)) * 100)
            return (
              <div key={category}>
                <div className="flex items-center justify-between">
                  <Link
                    href={`/map#${category.toLowerCase()}`}
                    className="text-sm font-semibold text-[#1b1a17] hover:text-[#7e622a]"
                  >
                    {category}
                  </Link>
                  <span className="text-xs text-[#7e622a]">
                    {catDone}/{catTotal}
                  </span>
                </div>
                <div className="mt-1 h-2 overflow-hidden rounded-full bg-[#e8ddca]">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#7e622a] to-[#2f3e36] transition-all"
                    style={{ width: `${catPercent}%` }}
                  />
                </div>
                {catDone < catTotal && catNext && (
                  <Link
                    href={`/lessons/${catNext.slug}`}
                    className="mt-0.5 block text-xs text-[#7e622a] hover:underline"
                  >
                    Next: {catNext.title} →
                  </Link>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* ── Quiz + Streak Row ── */}
      <div className="grid gap-6 md:grid-cols-2">

        <div className="rounded-[2rem] border border-[#d8ccb8] bg-white p-6 shadow-sm">
          <div className="text-sm font-semibold text-[#7e622a]">
            Quiz Performance
          </div>
          <div className="mt-3 grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-[#1b1a17]">{quizStats.sessions}</div>
              <div className="text-xs text-[#4a4338]">Quizzes Taken</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-emerald-700">{quizStats.perfect}</div>
              <div className="text-xs text-[#4a4338]">Questions Correct</div>
            </div>
          </div>
          {quizStats.total > 0 && (
            <div className="mt-4">
              <div className="mb-1 text-xs text-[#5f5548]">Accuracy ({quizStats.perfect} / {quizStats.total} questions)</div>
              <div
                className="h-3 overflow-hidden rounded-full bg-[#e8ddca]"
                role="progressbar"
                aria-valuenow={Math.round((quizStats.perfect / quizStats.total) * 100)}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`${quizStats.perfect} of ${quizStats.total} questions correct`}
              >
                <div
                  className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-700 transition-all"
                  style={{ width: `${Math.round((quizStats.perfect / quizStats.total) * 100)}%` }}
                />
              </div>
            </div>
          )}
          <Link
            href="/quiz"
            className="mt-4 inline-block text-sm font-semibold text-[#7e622a] hover:underline"
          >
            {quizStats.sessions > 0 ? 'Take Another Quiz →' : 'Take the Quiz →'}
          </Link>
        </div>

        <div className="rounded-[2rem] border border-[#d8ccb8] bg-white p-6 shadow-sm">
          <div className="text-sm font-semibold text-[#7e622a]">
            Study Streak
          </div>
          <div className="mt-3 grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-[#1b1a17]">
                {streak.current} {streak.current === 1 ? 'day' : 'days'}
              </div>
              <div className="text-xs text-[#4a4338]">Current Streak</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-[#7e622a]">
                {streak.best} {streak.best === 1 ? 'day' : 'days'}
              </div>
              <div className="text-xs text-[#4a4338]">Best Streak</div>
            </div>
          </div>
          {streak.current >= 3 && (
            <p className="mt-4 text-center text-sm font-semibold text-emerald-700">
              🔥 You&apos;re on fire! Keep the streak going!
            </p>
          )}
        </div>

      </div>

      {/* ── Explore ── */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Link
          href="/map"
          className="rounded-2xl border border-[#d8ccb8] bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
        >
          <div className="text-sm font-semibold text-[#7e622a]">Prophecy Map</div>
          <p className="mt-1 text-sm text-[#4a4338]">
            See all lessons organized by category — Lineage through Kingdom.
          </p>
        </Link>
        <Link
          href="/timeline"
          className="rounded-2xl border border-[#d8ccb8] bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
        >
          <div className="text-sm font-semibold text-[#7e622a]">Timeline</div>
          <p className="mt-1 text-sm text-[#4a4338]">
            Follow the messianic promise from Genesis through the Prophets.
          </p>
        </Link>
        <Link
          href="/prophecies"
          className="rounded-2xl border border-[#d8ccb8] bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
        >
          <div className="text-sm font-semibold text-[#7e622a]">Browse All</div>
          <p className="mt-1 text-sm text-[#4a4338]">
            Search and filter all {total} prophecy lessons.
          </p>
        </Link>
      </div>

    </div>
  )
}