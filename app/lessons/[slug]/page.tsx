import { notFound } from "next/navigation"
import Link from "next/link"
import ScriptureBlock from "@/components/ScriptureBlock"
import MarkCompleteButton from "@/components/MarkCompleteButton"
import CompletedIndicator from "@/components/CompletedIndicator"
import ScholarCredits from "@/components/ScholarCredits"
import QuizCard from "@/components/QuizCard"
import QuizScoreCard from "@/components/QuizScoreCard"
import { getLessonBySlug, getLessonSlugs } from "@/data/lessons"

export function generateStaticParams() {
  return getLessonSlugs()
}

type Props = {
  params: {
    slug: string
  }
}

export default function LessonPage({ params }: Props) {
  const lesson = getLessonBySlug(params.slug)

  if (!lesson) {
    notFound()
  }

  return (
    <div className="space-y-8">
      <div className="rounded-[2rem] border border-[#d8ccb8] bg-white p-8 shadow-sm">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold uppercase tracking-[0.22em] text-[#7e622a]">
              Lesson {lesson.id}
            </span>
            <Link
              href={`/map#${lesson.category.toLowerCase()}`}
              className="rounded-full border border-[#d8ccb8] bg-[#fbf7ee] px-2.5 py-0.5 text-xs font-medium text-[#7e622a] transition hover:bg-[#f0e8d8]"
            >
              {lesson.category}
            </Link>
          </div>

          <CompletedIndicator slug={lesson.slug} compact />
        </div>

        <h1 className="mt-2 text-3xl font-bold text-[#1b1a17]">
          {lesson.title}
        </h1>

        <p className="mt-4 max-w-2xl text-[#4a4338]">
          {lesson.summary}
        </p>

        <div className="mt-3 flex flex-wrap gap-2">
          {lesson.scholarship?.payne?.attested && (
            <span className="inline-flex items-center rounded-full bg-[#efe8fb] px-2 py-1 text-xs font-medium text-[#5f3a8a]">
              📘 Payne ✓
            </span>
          )}
          {lesson.scholarship?.edersheim?.attested && (
            <span className="inline-flex items-center rounded-full bg-[#f5f0e5] px-2 py-1 text-xs font-medium text-[#7e622a]">
              📚 Edersheim ✓
            </span>
          )}
          {lesson.scholarship?.mcdowell?.attested && (
            <span className="inline-flex items-center rounded-full bg-[#e8f0f5] px-2 py-1 text-xs font-medium text-[#2a5a7e]">
              📖 McDowell ✓
            </span>
          )}
        </div>

        <div className="mt-6">
          <MarkCompleteButton slug={lesson.slug} />
        </div>
      </div>

      <ScriptureBlock
        label="Old Testament"
        reference={lesson.otReference}
        text={lesson.otText}
      />

      <ScriptureBlock
        label="New Testament"
        reference={lesson.ntReference}
        text={lesson.ntText}
      />

      <ScholarCredits scholarship={lesson.scholarship} />

      <QuizCard quiz={lesson.quiz} lessonSlug={lesson.slug} />

      <QuizScoreCard slug={lesson.slug} />

      <div className="rounded-[2rem] border border-[#d8ccb8] bg-white p-8 shadow-sm">
        <div className="text-sm font-semibold uppercase tracking-[0.22em] text-[#7e622a]">
          Why This Matters
        </div>

        <p className="mt-4 leading-7 text-[#4a4338]">
          {lesson.whyItMatters}
        </p>
      </div>

      <div className="rounded-[2rem] border border-[#d8ccb8] bg-white p-8 shadow-sm">
        <div className="text-sm font-semibold uppercase tracking-[0.22em] text-[#7e622a]">
          Reflection
        </div>

        <p className="mt-4 leading-7 text-[#4a4338]">
          {lesson.reflection}
        </p>
      </div>
    </div>
  )
}