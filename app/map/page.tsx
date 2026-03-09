import Link from "next/link"
import { prophecies } from "@/data/prophecies"
import type { LessonCategory } from "@/lib/types"

const categoryOrder: LessonCategory[] = [
  "Identity",
  "Ministry",
  "Rejection",
  "Passion",
  "Resurrection",
]

const categoryColors: Record<LessonCategory, string> = {
  Identity: "border-amber-300 bg-amber-50",
  Ministry: "border-sky-300 bg-sky-50",
  Rejection: "border-rose-300 bg-rose-50",
  Passion: "border-purple-300 bg-purple-50",
  Resurrection: "border-emerald-300 bg-emerald-50",
}

const categoryDescriptions: Record<LessonCategory, string> = {
  Identity: "Prophecies about who the Messiah would be — his lineage, birthplace, and nature.",
  Ministry: "Prophecies about what the Messiah would do — healing, teaching, and his mission.",
  Rejection: "Prophecies about the Messiah being opposed, betrayed, and rejected.",
  Passion: "Prophecies about the suffering and death of the Messiah.",
  Resurrection: "Prophecies about the Messiah's victory over death, ascension, and eternal reign.",
}

export default function MapPage() {
  const grouped = categoryOrder.map((cat) => ({
    category: cat,
    lessons: prophecies.filter((l) => l.category === cat),
  }))

  return (
    <div className="space-y-8">
      <div className="rounded-[2rem] border border-[#d8ccb8] bg-white p-8 shadow-sm">
        <div className="text-sm font-semibold uppercase tracking-[0.22em] text-[#7e622a]">
          Prophecy Map
        </div>

        <h1 className="mt-2 text-3xl font-bold text-[#1b1a17]">
          A Visual Map of Scripture
        </h1>

        <p className="mt-4 max-w-2xl text-[#4a4338]">
          The story of Scripture unfolds through promises, patterns,
          and prophecies that Christians believe ultimately point to Jesus.
          Click any lesson to explore it in detail.
        </p>
      </div>

      <div className="space-y-6">
        {grouped.map(({ category, lessons }) => (
          <div
            key={category}
            className="rounded-[2rem] border border-[#d8ccb8] bg-white p-6 shadow-sm"
          >
            <h2 className="text-lg font-bold text-[#1b1a17]">{category}</h2>
            <p className="mt-1 text-sm text-[#4a4338]">
              {categoryDescriptions[category]}
            </p>

            <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {lessons.map((lesson) => (
                <Link
                  key={lesson.id}
                  href={`/lessons/${lesson.slug}`}
                  className={`rounded-xl border px-3 py-2 text-sm transition hover:shadow-md ${categoryColors[category]}`}
                >
                  <span className="font-semibold text-[#1b1a17]">
                    {lesson.id}. {lesson.title}
                  </span>
                  <span className="mt-0.5 block text-xs text-[#4a4338]">
                    {lesson.otReference} → {lesson.ntReference}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
