'use client'

import { useState } from 'react'
import type { QuizData } from '@/lib/types'

type QuizCardProps = {
  quiz: QuizData
}

export default function QuizCard({ quiz }: QuizCardProps) {
  const { question, choices, answer, fillInBlank } = quiz
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null)
  const [choiceSubmitted, setChoiceSubmitted] = useState(false)
  const [blankValue, setBlankValue] = useState('')
  const [blankSubmitted, setBlankSubmitted] = useState(false)

  const normalizeAnswer = (value: string) =>
    value
      .trim()
      .toLowerCase()
      .replace(/[–—]/g, '-')
      .replace(/\s+/g, '')

  const isChoiceCorrect = selectedChoice === answer

  const acceptedBlankAnswers = fillInBlank
    ? [fillInBlank.answer, ...(fillInBlank.acceptableAnswers ?? [])]
    : []

  const isBlankCorrect =
    fillInBlank &&
    acceptedBlankAnswers
      .map((candidate) => normalizeAnswer(candidate))
      .includes(normalizeAnswer(blankValue))

  return (
    <section className="rounded-[2rem] border border-[#d8ccb8] bg-white p-6 shadow-sm">
      <div className="text-xs font-semibold uppercase tracking-[0.22em] text-[#7e622a]">
        Quick Check
      </div>

      <div className="mt-4 rounded-2xl border border-[#e6dccd] bg-[#fffdf8] p-4">
        <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[#7e622a]">
          Part 1 - Multiple Choice
        </div>

        <h2 className="mt-2 text-lg font-bold text-[#1b1a17]">
          {question}
        </h2>

        <div className="mt-4 grid gap-3">
          {choices.map((choice, index) => {
            const isSelected = selectedChoice === index
            const showCorrect = choiceSubmitted && index === answer
            const showWrong =
              choiceSubmitted && isSelected && index !== answer

            return (
              <button
                key={`${choice}-${index}`}
                type="button"
                onClick={() => setSelectedChoice(index)}
                className={`rounded-xl border px-4 py-3 text-left text-sm transition ${
                  showCorrect
                    ? 'border-emerald-300 bg-emerald-50 text-emerald-900'
                    : showWrong
                    ? 'border-rose-300 bg-rose-50 text-rose-900'
                    : isSelected
                    ? 'border-[#7e622a] bg-[#fbf7ee] text-[#1b1a17]'
                    : 'border-[#d8ccb8] bg-white text-[#4a4338] hover:bg-[#fbf7ee]'
                }`}
              >
                {choice}
              </button>
            )
          })}
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => setChoiceSubmitted(true)}
            disabled={selectedChoice === null}
            className="rounded-xl bg-[#1b1a17] px-4 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            Submit Multiple Choice
          </button>

          {choiceSubmitted && (
            <div
              className={`rounded-xl px-3 py-2 text-sm font-medium ${
                isChoiceCorrect
                  ? 'bg-emerald-100 text-emerald-900'
                  : 'bg-amber-100 text-amber-900'
              }`}
            >
              {isChoiceCorrect
                ? 'Correct - great job.'
                : 'Not quite. Review the references and try again.'}
            </div>
          )}
        </div>
      </div>

      {fillInBlank && (
        <div className="mt-4 rounded-2xl border border-[#e6dccd] bg-[#fffdf8] p-4">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[#7e622a]">
            Part 2 - Fill In The Blank
          </div>

          <p className="mt-2 text-sm font-semibold text-[#1b1a17]">
            {fillInBlank.prompt}
          </p>

          <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center">
            <input
              type="text"
              value={blankValue}
              onChange={(event) => {
                setBlankValue(event.target.value)
                if (blankSubmitted) {
                  setBlankSubmitted(false)
                }
              }}
              placeholder="Type your answer"
              className="w-full rounded-xl border border-[#d8ccb8] px-4 py-2 text-sm text-[#1b1a17] focus:outline-none focus:ring-2 focus:ring-[#7e622a]"
            />

            <button
              type="button"
              onClick={() => setBlankSubmitted(true)}
              disabled={blankValue.trim().length === 0}
              className="rounded-xl bg-[#1b1a17] px-4 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              Check Fill In
            </button>
          </div>

          {blankSubmitted && (
            <div
              className={`mt-3 rounded-xl px-3 py-2 text-sm font-medium ${
                isBlankCorrect
                  ? 'bg-emerald-100 text-emerald-900'
                  : 'bg-amber-100 text-amber-900'
              }`}
            >
              {isBlankCorrect
                ? 'Correct - nice work.'
                : `Not quite. Correct answer: ${fillInBlank.answer}`}
            </div>
          )}
        </div>
      )}
    </section>
  )
}