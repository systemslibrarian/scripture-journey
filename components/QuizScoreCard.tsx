'use client'

import { useEffect, useState } from 'react'
import { getQuizScore, saveQuizScore, type QuizScore } from '@/lib/progress'

type Props = {
  slug: string
}

export default function QuizScoreCard({ slug }: Props) {
  const [score, setScore] = useState<QuizScore | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setScore(getQuizScore(slug))

    function handleScoreSaved() {
      setScore(getQuizScore(slug))
    }
    window.addEventListener('quiz-score-saved', handleScoreSaved)
    return () => window.removeEventListener('quiz-score-saved', handleScoreSaved)
  }, [slug])

  if (!mounted || !score) return null

  const allCorrect = score.multipleChoice && score.fillInBlank !== false

  return (
    <div
      className={`rounded-[2rem] border p-6 shadow-sm ${
        allCorrect
          ? 'border-emerald-200 bg-emerald-50'
          : 'border-amber-200 bg-amber-50'
      }`}
      role="status"
      aria-label="Quiz score"
    >
      <div className="text-xs font-semibold uppercase tracking-[0.22em] text-[#7e622a]">
        Your Quiz Score
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2 text-sm">
          <span>{score.multipleChoice ? '✅' : '❌'}</span>
          <span className={score.multipleChoice ? 'text-emerald-900' : 'text-amber-900'}>
            Multiple Choice
          </span>
        </div>

        {score.fillInBlank !== undefined && (
          <div className="flex items-center gap-2 text-sm">
            <span>{score.fillInBlank ? '✅' : '❌'}</span>
            <span className={score.fillInBlank ? 'text-emerald-900' : 'text-amber-900'}>
              Fill In The Blank
            </span>
          </div>
        )}
      </div>

      {allCorrect && (
        <p className="mt-3 text-sm font-semibold text-emerald-900">
          🎉 Perfect score!
        </p>
      )}
    </div>
  )
}
