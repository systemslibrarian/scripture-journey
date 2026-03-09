'use client'

import { useEffect, useState } from "react"
import { markLessonComplete, isLessonComplete } from "@/lib/progress"

type Props = {
  slug: string
}

export default function MarkCompleteButton({ slug }: Props) {

  const [complete, setComplete] = useState(false)

  useEffect(() => {
    const done = isLessonComplete(slug)
    setComplete(done)
  }, [slug])

  function handleClick() {
    markLessonComplete(slug)
    setComplete(true)
  }

  if (complete) {
    return (
      <div className="rounded-xl bg-emerald-100 px-4 py-3 text-sm font-semibold text-emerald-900" role="status">
        ✓ Lesson Completed
      </div>
    )
  }

  return (
    <button
      onClick={handleClick}
      aria-label="Mark this lesson as complete"
      className="rounded-xl bg-[#1b1a17] px-5 py-3 text-sm font-semibold text-white hover:opacity-90"
    >
      Mark Lesson Complete
    </button>
  )
}