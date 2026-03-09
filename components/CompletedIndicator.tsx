'use client'

import { useEffect, useState } from "react"
import { isLessonComplete } from "@/lib/progress"

type Props = {
  slug: string
  compact?: boolean
}

export default function CompletedIndicator({ slug, compact = false }: Props) {
  const [ready, setReady] = useState(false)
  const [complete, setComplete] = useState(false)

  useEffect(() => {
    setComplete(isLessonComplete(slug))
    setReady(true)
  }, [slug])

  if (!ready || !complete) return null

  if (compact) {
    return (
      <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-800">
        Completed
      </span>
    )
  }

  return (
    <span className="inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" aria-label="Completed lesson" />
  )
}
