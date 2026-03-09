import { notFound } from "next/navigation"
import QuizCard from "@/components/QuizCard"
import ScriptureBlock from "@/components/ScriptureBlock"
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
    <main className="mx-auto max-w-4xl px-6 py-12">

      <div className="mb-8">

        <div className="text-sm uppercase tracking-wide text-amber-700 font-semibold">
          Lesson {lesson.id}
        </div>

        <h1 className="text-3xl font-bold mt-2">
          {lesson.title}
        </h1>

        <p className="mt-4 text-slate-600">
          {lesson.summary}
        </p>

      </div>

      <div className="space-y-6">

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

        <div className="rounded-3xl border p-6 bg-white shadow-sm">

          <div className="text-xs uppercase tracking-wide text-slate-500 font-semibold">
            Why This Matters
          </div>

          <p className="mt-3 text-slate-700 leading-relaxed">
            {lesson.whyItMatters}
          </p>

        </div>

        <QuizCard quiz={lesson.quiz} />

        <div className="rounded-3xl border p-6 bg-white shadow-sm">

          <div className="text-xs uppercase tracking-wide text-slate-500 font-semibold">
            Reflection
          </div>

          <p className="mt-3 text-slate-700 leading-relaxed">
            {lesson.reflection}
          </p>

        </div>

      </div>

    </main>
  )
}