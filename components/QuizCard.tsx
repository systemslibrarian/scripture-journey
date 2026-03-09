'use client'

import { useState } from 'react'

type QuizCardProps = {
  question: string
  choices: string[]
  answer: number
}

export default function QuizCard({
  question,
  choices,
  answer,
}: QuizCardProps) {
  const [selected, setSelected] = useState<number | null>(null)
  const [submitted, setSubmitted] = useState(false)

  const isCorrect = selected === answer

  return (
    <section className="rounded-3xl border bg-white p-6 shadow-sm">
      <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
        Quick Check
      </div>

      <h2 className="mt-2 text-xl font-bold text-slate-900">
        {question}
      </h2>

      <div className="mt-5 grid gap-3">
        {choices.map((choice, index) => {
          const isSelected = selected === index
          const showCorrect = submitted && index === answer
          const showWrong = submitted && isSelected && index !== answer

          return (
            <button
              key={`${choice}-${index}`}
              type="button"
              onClick={() => setSelected(index)}
              className={`rounded-2xl border px-4 py-3 text-left transition ${
                showCorrect
                  ? 'border-emerald-300 bg-emerald-50 text-emerald-900'
                  : showWrong
                  ? 'border-rose-300 bg-rose-50 text-rose-900'
                  : isSelected
                  ? 'border-slate-900 bg-slate-50 text-slate-900'
                  : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
              }`}
            >
              {choice}
            </button>
          )
        })}
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => setSubmitted(true)}
          disabled={selected === null}
          className="rounded-2xl bg-slate-900 px-5 py-3 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          Submit Answer
        </button>

        {submitted && (
          <div
            className={`rounded-2xl px-4 py-3 text-sm font-medium ${
              isCorrect
                ? 'bg-emerald-100 text-emerald-900'
                : 'bg-amber-100 text-amber-900'
            }`}
          >
            {isCorrect
              ? 'Correct — well done.'
              : 'Not quite. Review the lesson and try again.'}
          </div>
        )}
      </div>
    </section>
  )
}