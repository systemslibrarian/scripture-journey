import Link from "next/link"
import { prophecies } from "@/data/prophecies"

const categories = [
  "Identity",
  "Ministry",
  "Rejection",
  "Passion",
  "Resurrection",
] as const

export default function PropheciesPage() {
  return (
    <div className="mx-auto max-w-7xl">
      <div className="rounded-3xl border bg-white p-8 shadow-sm">
        <div className="text-sm font-semibold uppercase tracking-wide text-amber-700">
          Top 100 Prophecies
        </div>

        <h1 className="mt-2 text-4xl font-bold text-slate-900">
          100 Lessons That Point to Jesus
        </h1>

        <p className="mt-4 max-w-3xl text-slate-600">
          Explore 100 prophecy-centered lessons that help show how the Bible’s
          promises, patterns, and prophetic hope point forward to Jesus Christ.
        </p>

        <div className="mt-6 inline-flex rounded-full bg-amber-100 px-4 py-2 text-sm font-semibold text-amber-900">
          {prophecies.length} lessons loaded
        </div>
      </div>

      <div className="mt-10 space-y-12">
        {categories.map((category) => {
          const items = prophecies.filter((lesson) => lesson.category === category)

          return (
            <section key={category}>
              <div className="mb-5 flex items-center justify-between gap-4">
                <h2 className="text-2xl font-bold text-slate-900">{category}</h2>
                <div className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700">
                  {items.length} lessons
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {items.map((lesson) => (
                  <Link
                    key={lesson.slug}
                    href={`/lessons/${lesson.slug}`}
                    className="rounded-3xl border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="text-sm font-semibold text-slate-500">
                        Lesson {lesson.id}
                      </div>

                      <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-900">
                        {lesson.category}
                      </span>
                    </div>

                    <h3 className="mt-3 text-xl font-bold text-slate-900">
                      {lesson.title}
                    </h3>

                    <p className="mt-2 text-sm font-medium text-slate-600">
                      {lesson.otReference} → {lesson.ntReference}
                    </p>

                    <p className="mt-4 text-sm leading-6 text-slate-600">
                      {lesson.summary}
                    </p>

                    <div className="mt-5 text-sm font-semibold text-slate-900">
                      Open lesson →
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )
        })}
      </div>
    </div>
  )
}