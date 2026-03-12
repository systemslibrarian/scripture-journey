import Link from "next/link"
import type { Lesson } from "@/lib/types"
import ProphecyTypeBadge from "@/components/ProphecyTypeBadge"
import CompletedIndicator from "@/components/CompletedIndicator"
import CopyVerseLink from "@/components/CopyVerseLink"

type Props = {
  lesson: Lesson
}

export default function LessonCard({ lesson }: Props) {
  return (
    <Link
      href={`/lessons/${lesson.slug}`}
      aria-label={`Lesson ${lesson.id}: ${lesson.title}`}
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

      <h3 className="mt-2 text-xl font-bold text-[#1b1a17] overflow-wrap-anywhere">
        {lesson.title}
      </h3>

      <p className="mt-2 text-sm text-[#4a4338] overflow-wrap-anywhere">
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

      <div className="mt-2">
        <ProphecyTypeBadge type={lesson.prophecyType} size="xs" />
      </div>

      <p className="mt-4 text-sm leading-6 text-[#4a4338]">
        {lesson.summary}
      </p>

      <div className="mt-4 flex items-center justify-between">
        <span className="text-sm font-semibold text-[#7e622a]">
          Open lesson →
        </span>
        <CopyVerseLink lesson={lesson} size="sm" />
      </div>
    </Link>
  )
}