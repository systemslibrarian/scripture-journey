import Link from "next/link"
import type { Lesson } from "@/lib/types"
import { getTimelineEraMeta } from "@/lib/timeline"

type Props = {
  lesson: Lesson
  nextLesson: Lesson | null
}

export default function ContinueJourney({ lesson, nextLesson }: Props) {
  const categoryLessonsHref = `/map#${lesson.category.toLowerCase()}`
  const eraMeta = getTimelineEraMeta(lesson.timelineEra)

  return (
    <div className="rounded-[2rem] border border-[#d8ccb8] bg-[#fffdf8] p-8 shadow-sm">
      <div className="text-sm font-semibold uppercase tracking-[0.22em] text-[#7e622a]">
        Continue Your Journey
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {nextLesson && (
          <Link
            href={`/lessons/${nextLesson.slug}`}
            className="rounded-xl border border-[#d8ccb8] bg-white px-5 py-4 transition hover:border-[#c8a84b] hover:shadow-sm"
          >
            <span className="text-xs font-semibold text-[#7e622a]">Next Lesson</span>
            <span className="mt-1 block font-semibold text-[#1b1a17]">{nextLesson.title}</span>
            <span className="mt-0.5 block text-xs text-[#4a4338]">
              Lesson {nextLesson.id} · {nextLesson.category}
            </span>
          </Link>
        )}

        <Link
          href={categoryLessonsHref}
          className="rounded-xl border border-[#d8ccb8] bg-white px-5 py-4 transition hover:border-[#c8a84b] hover:shadow-sm"
        >
          <span className="text-xs font-semibold text-[#7e622a]">Explore Category</span>
          <span className="mt-1 block font-semibold text-[#1b1a17]">
            More {lesson.category} Lessons
          </span>
          <span className="mt-0.5 block text-xs text-[#4a4338]">
            See this prophecy in context on the map
          </span>
        </Link>

        <Link
          href="/timeline"
          className="rounded-xl border border-[#d8ccb8] bg-white px-5 py-4 transition hover:border-[#c8a84b] hover:shadow-sm"
        >
          <span className="text-xs font-semibold text-[#7e622a]">Timeline</span>
          <span className="mt-1 block font-semibold text-[#1b1a17]">
            {eraMeta.title}
          </span>
          <span className="mt-0.5 block text-xs text-[#4a4338]">
            {eraMeta.arcPhrase} · {eraMeta.dateRange}
          </span>
        </Link>

        <Link
          href="/quiz"
          className="rounded-xl border border-[#d8ccb8] bg-white px-5 py-4 transition hover:border-[#c8a84b] hover:shadow-sm"
        >
          <span className="text-xs font-semibold text-[#7e622a]">Quiz</span>
          <span className="mt-1 block font-semibold text-[#1b1a17]">
            Test What You&apos;ve Learned
          </span>
          <span className="mt-0.5 block text-xs text-[#4a4338]">
            10 questions from the lessons you&apos;ve studied
          </span>
        </Link>
      </div>
    </div>
  )
}
