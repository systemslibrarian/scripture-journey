'use client'

import { useState } from "react"
import Link from "next/link"
import { prophecies } from "@/data/prophecies"

export default function ProphecySearch() {

  const [query, setQuery] = useState("")

  const results = prophecies.filter((lesson) => {

    const text = `${lesson.title} ${lesson.otReference} ${lesson.ntReference} ${lesson.summary}`.toLowerCase()

    return text.includes(query.toLowerCase())

  })

  return (
    <div className="space-y-6">

      <div className="rounded-2xl border border-[#d8ccb8] bg-white p-6 shadow-sm">

        <div className="text-sm font-semibold text-[#7e622a]">
          Search the 100 Prophecies
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

            <div className="text-sm font-semibold text-[#7e622a]">
              Lesson {lesson.id}
            </div>

            <h2 className="mt-2 text-xl font-bold text-[#1b1a17]">
              {lesson.title}
            </h2>

            <p className="mt-2 text-sm text-[#4a4338]">
              {lesson.otReference} → {lesson.ntReference}
            </p>

            <p className="mt-4 text-sm leading-6 text-[#4a4338]">
              {lesson.summary}
            </p>

            <div className="mt-4 text-sm font-semibold text-[#7e622a]">
              Open lesson →
            </div>

          </Link>

        ))}

      </div>

    </div>
  )
}