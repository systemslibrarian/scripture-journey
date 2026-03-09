import { notFound } from "next/navigation"
import QuizCard from "@/components/QuizCard"
import ScriptureBlock from "@/components/ScriptureBlock"
import MarkCompleteButton from "@/components/MarkCompleteButton"
import CompletedIndicator from "@/components/CompletedIndicator"
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
          <div className="text-sm font-semibold uppercase tracking-[0.22em] text-[#7e622a]">
            Lesson {lesson.id}
          </div>

          <CompletedIndicator slug={lesson.slug} compact />
        </div>

        <h1 className="mt-2 text-3xl font-bold text-[#1b1a17]">
          {lesson.title}
        </h1>

        <p className="mt-4 max-w-2xl text-[#4a4338]">
          {lesson.summary}
        </p>

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

      <div className="rounded-[2rem] border border-[#d8ccb8] bg-white p-8 shadow-sm">
        <div className="text-sm font-semibold uppercase tracking-[0.22em] text-[#7e622a]">
          Why This Matters
        </div>

        <p className="mt-4 leading-7 text-[#4a4338]">
          {lesson.whyItMatters}
        </p>
      </div>

      <QuizCard quiz={lesson.quiz} />

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