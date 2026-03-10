'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { prophecies } from '@/data/prophecies'
import { getCompletedLessons } from '@/lib/progress'
import ProphecyTypeBadge from '@/components/ProphecyTypeBadge'
import type { LessonCategory } from '@/lib/types'

const categoryConfig = [
  {
    name: "Lineage" as LessonCategory,
    description: "The covenant chain that narrows from Eve to Abraham to Judah to David — the genealogical promises that identify exactly who the Messiah would descend from.",
    keyVerse: "\"A record of the genealogy of Jesus the Messiah the son of David, the son of Abraham.\" — Matthew 1:1",
  },
  {
    name: "Identity" as LessonCategory,
    description: "Prophecies about the divine nature, titles, and character of the Messiah — not merely where he came from, but who he is.",
    keyVerse: "\"You are my Son; today I have become your Father.\" — Psalm 2:7",
  },
  {
    name: "Ministry" as LessonCategory,
    description: "Prophecies about what the Messiah would do — healing, teaching, proclaiming good news, and his Spirit-anointed mission to the world.",
    keyVerse: "\"The Spirit of the Lord is on me, because he has anointed me to proclaim good news to the poor.\" — Isaiah 61:1",
  },
  {
    name: "Rejection" as LessonCategory,
    description: "Prophecies about the Messiah being opposed, betrayed, and rejected by the very people he came to save.",
    keyVerse: "\"He came to that which was his own, but his own did not receive him.\" — John 1:11",
  },
  {
    name: "Passion" as LessonCategory,
    description: "Prophecies about the suffering and death of the Messiah — the specific events of his trial, crucifixion, and the atonement they accomplished.",
    keyVerse: "\"He was pierced for our transgressions, he was crushed for our iniquities.\" — Isaiah 53:5",
  },
  {
    name: "Resurrection" as LessonCategory,
    description: "Prophecies about the Messiah's victory over death, his ascension to God's right hand, and his present intercession for his people.",
    keyVerse: "\"You will not abandon me to the realm of the dead, nor will you let your faithful one see decay.\" — Psalm 16:10",
  },
  {
    name: "Kingdom" as LessonCategory,
    description: "Prophecies about the eternal reign of the Messiah, the outpouring of his Spirit, the gathering of all nations, and the new creation that will never end.",
    keyVerse: "\"Of the greatness of his government and peace there will be no end.\" — Isaiah 9:7",
  },
]

const categoryColors: Record<LessonCategory, string> = {
  Lineage: "border-amber-400 bg-amber-50",
  Identity: "border-amber-300 bg-amber-50",
  Ministry: "border-sky-300 bg-sky-50",
  Rejection: "border-rose-300 bg-rose-50",
  Passion: "border-purple-300 bg-purple-50",
  Resurrection: "border-emerald-300 bg-emerald-50",
  Kingdom: "border-indigo-300 bg-indigo-50",
}

export default function MapCategoryCards() {
  const [completedSlugs, setCompletedSlugs] = useState<string[]>([])

  useEffect(() => {
    setCompletedSlugs(getCompletedLessons())
  }, [])

  const grouped = categoryConfig.map((cfg) => ({
    ...cfg,
    lessons: prophecies.filter((l) => l.category === cfg.name),
  }))

  return (
    <div className="space-y-6">
      {grouped.map(({ name, description, keyVerse, lessons }) => {
        const completedCount = lessons.filter(l => completedSlugs.includes(l.slug)).length
        const totalCount = lessons.length
        const percent = Math.round((completedCount / totalCount) * 100)

        return (
          <div
            key={name}
            id={name.toLowerCase()}
            className="rounded-[2rem] border border-[#d8ccb8] bg-white p-6 shadow-sm"
          >
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-[#1b1a17]">{name}</h2>
              {completedCount === totalCount && completedCount > 0 && (
                <span className="text-sm font-semibold text-[#7e622a]">✓</span>
              )}
            </div>
            <p className="mt-1 text-sm text-[#4a4338]">{description}</p>
            <p className="mt-1 text-xs italic text-[#7e622a]">{keyVerse}</p>

            <div className="mt-2 flex items-center gap-3">
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-[#e8e0d0]">
                <div
                  className="h-full rounded-full bg-[#7e622a] transition-all"
                  style={{ width: `${percent}%` }}
                />
              </div>
              <span className="text-xs text-[#9a8e7e] whitespace-nowrap">
                {completedCount} / {totalCount}
              </span>
            </div>

            <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {lessons.map((lesson) => (
                <Link
                  key={lesson.id}
                  href={`/lessons/${lesson.slug}`}
                  className={`relative rounded-xl border px-3 py-2 text-sm transition hover:shadow-md ${categoryColors[name]}`}
                >
                  <span className="font-semibold text-[#1b1a17]">
                    {lesson.id}. {lesson.title}
                  </span>
                  <span className="mt-0.5 block text-xs text-[#4a4338]">
                    {lesson.otReference} → {lesson.ntReference}
                  </span>
                  <span className="mt-1 block">
                    <ProphecyTypeBadge type={lesson.prophecyType} size="xs" />
                  </span>
                  {completedSlugs.includes(lesson.slug) && (
                    <span className="absolute right-2 top-2 inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" aria-label="Completed" />
                  )}
                </Link>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
