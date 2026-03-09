import Link from "next/link"
import { firstTenLessons } from "@/data/prophecies"

export default function StoryPage() {

  return (
    <div className="space-y-8">

      <div className="rounded-[2rem] border border-[#d8ccb8] bg-white p-8 shadow-sm">

        <div className="text-sm font-semibold uppercase tracking-[0.22em] text-[#7e622a]">
          Story Mode
        </div>

        <h1 className="mt-2 text-3xl font-bold text-[#1b1a17]">
          The Story of Scripture
        </h1>

        <p className="mt-4 max-w-2xl text-[#4a4338]">
          These first ten lessons form a guided introduction to the story
          of the Bible and how Christians understand it as pointing to Jesus.
        </p>

      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">

        {firstTenLessons.map((lesson) => (

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