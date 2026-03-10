'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { getAllLessons } from '@/data/lessons'
import { getCompletedLessons, saveQuizScore } from '@/lib/progress'
import ProphecyTypeBadge from '@/components/ProphecyTypeBadge'
import type { Lesson } from '@/lib/types'

type QuizPhase = 'intro' | 'question' | 'feedback' | 'results'

interface QuizState {
  phase: QuizPhase
  questions: Lesson[]
  currentIndex: number
  selectedChoice: number | null
  results: boolean[]
}

function buildQuestionPool(): { questions: Lesson[]; completedCount: number } {
  const allLessons = getAllLessons()
  const completedSlugs = getCompletedLessons()

  let questionPool: Lesson[]

  if (completedSlugs.length >= 10) {
    questionPool = allLessons.filter(l => completedSlugs.includes(l.slug))
  } else if (completedSlugs.length > 0) {
    const completed = allLessons.filter(l => completedSlugs.includes(l.slug))
    const remaining = allLessons.filter(l => !completedSlugs.includes(l.slug))
    const shuffled = remaining.sort(() => Math.random() - 0.5)
    questionPool = [...completed, ...shuffled.slice(0, 10 - completed.length)]
  } else {
    questionPool = [...allLessons].sort(() => Math.random() - 0.5).slice(0, 10)
  }

  const questions = questionPool.sort(() => Math.random() - 0.5).slice(0, 10)
  return { questions, completedCount: completedSlugs.length }
}

function getScoreMessage(percent: number): string {
  if (percent === 100) return 'Perfect score! You know these prophecies deeply.'
  if (percent >= 80) return 'Excellent work. You have a strong grasp of the material.'
  if (percent >= 60) return 'Good effort. A few more reviews and you\'ll master these.'
  if (percent >= 40) return 'Keep studying — the connections will become clearer.'
  return 'Just getting started — every lesson you complete will sharpen your recall.'
}

export default function QuizPage() {
  const [state, setState] = useState<QuizState>({
    phase: 'intro',
    questions: [],
    currentIndex: 0,
    selectedChoice: null,
    results: [],
  })
  const [completedCount, setCompletedCount] = useState(0)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const { questions, completedCount: cc } = buildQuestionPool()
    setState(prev => ({ ...prev, questions }))
    setCompletedCount(cc)
    setReady(true)
  }, [])

  const currentLesson = state.questions[state.currentIndex]

  const handleStart = useCallback(() => {
    setState(prev => ({ ...prev, phase: 'question' }))
  }, [])

  const handleSelect = useCallback((choiceIndex: number) => {
    setState(prev => ({ ...prev, selectedChoice: choiceIndex }))
  }, [])

  const handleSubmit = useCallback(() => {
    if (state.selectedChoice === null || !currentLesson) return
    const isCorrect = state.selectedChoice === currentLesson.quiz.answer
    setState(prev => ({
      ...prev,
      phase: 'feedback',
      results: [...prev.results, isCorrect],
    }))
  }, [state.selectedChoice, currentLesson])

  const handleNext = useCallback(() => {
    if (state.currentIndex >= 9) {
      // Save all quiz scores
      state.questions.forEach((lesson, index) => {
        saveQuizScore(lesson.slug, {
          multipleChoice: state.results[index],
          fillInBlank: undefined,
        })
      })
      setState(prev => ({ ...prev, phase: 'results', selectedChoice: null }))
    } else {
      setState(prev => ({
        ...prev,
        phase: 'question',
        currentIndex: prev.currentIndex + 1,
        selectedChoice: null,
      }))
    }
  }, [state.currentIndex, state.questions, state.results])

  const handleRetake = useCallback(() => {
    const { questions, completedCount: cc } = buildQuestionPool()
    setState({
      phase: 'intro',
      questions,
      currentIndex: 0,
      selectedChoice: null,
      results: [],
    })
    setCompletedCount(cc)
  }, [])

  if (!ready) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-sm text-[#4a4338]">Loading quiz…</div>
      </div>
    )
  }

  // ── INTRO ──
  if (state.phase === 'intro') {
    return (
      <div className="mx-auto max-w-2xl space-y-8">
        <div className="rounded-[2rem] border border-[#d8ccb8] bg-white p-8 shadow-sm text-center">
          <div className="text-4xl">📖</div>
          <h1 className="mt-3 text-3xl font-bold text-[#1b1a17]">Quick Check</h1>
          <p className="mt-4 text-[#4a4338]">
            {completedCount === 0
              ? "You haven't completed any lessons yet — here are 10 random questions to get you started."
              : 'Test your knowledge of the prophecies you\'ve been studying.'}
          </p>
          <ul className="mt-6 inline-block text-left text-sm text-[#4a4338] space-y-1">
            <li>• 10 questions</li>
            <li>• Multiple choice</li>
            <li>• {completedCount > 0
              ? 'Based on your completed lessons'
              : 'Random lessons to get you started'}</li>
          </ul>
          <div className="mt-8">
            <button
              onClick={handleStart}
              className="rounded-xl bg-[#1b1a17] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#333]"
            >
              Start Quiz →
            </button>
          </div>
        </div>
      </div>
    )
  }

  // ── QUESTION / FEEDBACK ──
  if ((state.phase === 'question' || state.phase === 'feedback') && currentLesson) {
    const quiz = currentLesson.quiz
    const questionNum = state.currentIndex + 1
    const progressPercent = (questionNum / 10) * 100
    const isFeedback = state.phase === 'feedback'
    const lastResult = isFeedback ? state.results[state.results.length - 1] : null
    const isLastQuestion = state.currentIndex >= 9

    return (
      <div className="mx-auto max-w-2xl space-y-8">
        <div className="rounded-[2rem] border border-[#d8ccb8] bg-white p-8 shadow-sm">
          {/* Header */}
          <div className="text-sm font-semibold uppercase tracking-[0.22em] text-[#7e622a]">
            Quick Check
          </div>
          <div className="mt-1 text-sm text-[#4a4338]">
            Question {questionNum} of 10
          </div>

          {/* Progress bar */}
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#e8ddca]">
            <div
              className="h-full rounded-full bg-[#7e622a] transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* Badges */}
          <div className="mt-5 flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-[#d8ccb8] bg-[#fbf7ee] px-2.5 py-0.5 text-xs font-medium text-[#7e622a]">
              {currentLesson.category}
            </span>
            <ProphecyTypeBadge type={currentLesson.prophecyType} size="xs" />
          </div>

          {/* Question */}
          <h2 className="mt-4 text-lg font-bold text-[#1b1a17]">
            {quiz.question}
          </h2>
          <p className="mt-1 text-sm text-[#4a4338]">
            &ldquo;{currentLesson.title}&rdquo;
          </p>

          {/* Choices */}
          <div className="mt-6 space-y-3">
            {quiz.choices.map((choice, i) => {
              let classes = 'w-full rounded-xl border px-4 py-3 text-left text-sm transition'

              if (isFeedback) {
                if (i === quiz.answer) {
                  classes += ' bg-[#d1fae5] border-[#10b981] text-[#065f46]'
                } else if (i === state.selectedChoice && i !== quiz.answer) {
                  classes += ' bg-[#fee2e2] border-[#ef4444] text-[#991b1b]'
                } else {
                  classes += ' border-[#d8ccb8] text-[#4a4338] opacity-50'
                }
              } else if (state.selectedChoice === i) {
                classes += ' bg-[#fef3c7] border-[#f59e0b] text-[#92400e]'
              } else {
                classes += ' border-[#d8ccb8] text-[#4a4338] hover:border-[#7e622a] hover:bg-[#fbf7ee]'
              }

              return (
                <button
                  key={i}
                  onClick={() => !isFeedback && handleSelect(i)}
                  disabled={isFeedback}
                  className={classes}
                >
                  {choice}
                </button>
              )
            })}
          </div>

          {/* Feedback message */}
          {isFeedback && (
            <div className={`mt-4 rounded-xl px-4 py-3 text-sm ${
              lastResult
                ? 'bg-[#d1fae5] text-[#065f46]'
                : 'bg-[#fee2e2] text-[#991b1b]'
            }`}>
              {lastResult
                ? `✓ Correct! ${currentLesson.otReference} → ${currentLesson.ntReference}`
                : `✗ The answer was ${quiz.choices[quiz.answer]}. This lesson: ${currentLesson.title}`}
            </div>
          )}

          {/* Action button */}
          <div className="mt-6 text-center">
            {isFeedback ? (
              <button
                onClick={handleNext}
                className="rounded-xl bg-[#1b1a17] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#333]"
              >
                {isLastQuestion ? 'See Results →' : 'Next Question →'}
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={state.selectedChoice === null}
                className="rounded-xl bg-[#1b1a17] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#333] disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Submit Answer
              </button>
            )}
          </div>
        </div>
      </div>
    )
  }

  // ── RESULTS ──
  if (state.phase === 'results') {
    const correct = state.results.filter(Boolean).length
    const percent = Math.round((correct / 10) * 100)
    const message = getScoreMessage(percent)

    return (
      <div className="mx-auto max-w-2xl space-y-8">
        <div className="rounded-[2rem] border border-[#d8ccb8] bg-white p-8 shadow-sm">
          <div className="text-sm font-semibold uppercase tracking-[0.22em] text-[#7e622a]">
            Quiz Complete
          </div>

          <div className="mt-4 text-3xl font-bold text-[#1b1a17]">
            You scored {correct} / 10
          </div>

          {/* Score bar */}
          <div className="mt-3 flex items-center gap-3">
            <div className="h-3 flex-1 overflow-hidden rounded-full bg-[#e8ddca]">
              <div
                className="h-full rounded-full bg-[#7e622a] transition-all"
                style={{ width: `${percent}%` }}
              />
            </div>
            <span className="text-sm font-semibold text-[#4a4338]">{percent}%</span>
          </div>

          <p className="mt-4 text-[#4a4338]">{message}</p>

          {/* Results table */}
          <div className="mt-6 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#d8ccb8] text-left text-xs uppercase tracking-wider text-[#7e622a]">
                  <th className="pb-2 pr-3">#</th>
                  <th className="pb-2 pr-3">Lesson</th>
                  <th className="pb-2 pr-3">OT Reference</th>
                  <th className="pb-2 text-center">Result</th>
                </tr>
              </thead>
              <tbody>
                {state.questions.map((lesson, i) => (
                  <tr key={lesson.slug} className="border-b border-[#f0ebe0]">
                    <td className="py-2 pr-3 text-[#4a4338]">{i + 1}</td>
                    <td className="py-2 pr-3">
                      <Link href={`/lessons/${lesson.slug}`} className="text-[#7e622a] hover:underline">
                        {lesson.title}
                      </Link>
                    </td>
                    <td className="py-2 pr-3 text-[#4a4338]">{lesson.otReference}</td>
                    <td className="py-2 text-center">
                      {state.results[i]
                        ? <span className="text-emerald-600">✓</span>
                        : <span className="text-red-500">✗</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Action buttons */}
          <div className="mt-8 flex flex-wrap gap-3 justify-center">
            <button
              onClick={handleRetake}
              className="rounded-xl bg-[#1b1a17] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#333]"
            >
              Retake Quiz
            </button>
            <Link
              href="/map"
              className="rounded-xl border border-[#d8ccb8] px-6 py-3 text-sm font-semibold text-[#1b1a17] transition hover:bg-[#fbf7ee]"
            >
              Go to Map
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return null
}
