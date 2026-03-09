'use client'

import { useState } from "react"
import Link from "next/link"
import { prophecies } from "@/data/prophecies"
import CompletedIndicator from "@/components/CompletedIndicator"

export default function ProphecySearch() {

  const [query, setQuery] = useState("")
  const totalLessons = prophecies.length

  const normalizedQuery = query.trim().toLowerCase()

  const results = prophecies.filter((lesson) => {

    const text = `${lesson.title} ${lesson.otReference} ${lesson.ntReference} ${lesson.summary}`.toLowerCase()

    return text.includes(normalizedQuery)

  })

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