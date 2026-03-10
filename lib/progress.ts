const STORAGE_KEY = "scripture_journey_progress"

function parseStoredProgress(raw: string | null): string[] {
  if (!raw) return []

  try {
    const parsed = JSON.parse(raw)

    if (!Array.isArray(parsed)) return []

    return Array.from(new Set(parsed.filter((entry): entry is string => typeof entry === "string")))
  } catch {
    return []
  }
}

export function getCompletedLessons(): string[] {
  if (typeof window === "undefined") return []

  return parseStoredProgress(localStorage.getItem(STORAGE_KEY))
}

export function markLessonComplete(slug: string) {
  if (typeof window === "undefined") return

  const completed = getCompletedLessons()

  if (!completed.includes(slug)) {
    completed.push(slug)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(completed))
    syncProgressToServer(slug, true)
  }
}

export function isLessonComplete(slug: string): boolean {
  return getCompletedLessons().includes(slug)
}

export function getCompletionCount(): number {
  return getCompletedLessons().length
}

export function getCompletionPercent(totalLessons: number): number {
  const safeTotal = Math.max(totalLessons, 1)
  return Math.round((getCompletionCount() / safeTotal) * 100)
}

export function clearProgress() {
  if (typeof window === "undefined") return
  localStorage.removeItem(STORAGE_KEY)
}

/* ── Quiz scoring ── */

const QUIZ_SCORE_KEY = "scripture_journey_quiz_scores"
const QUIZ_SESSION_KEY = "scripture_journey_quiz_sessions"
const STREAK_KEY = "scripture_journey_streak"

export interface QuizScore {
  multipleChoice: boolean
  fillInBlank?: boolean
  timestamp: number
}

function getScoreMap(): Record<string, QuizScore> {
  if (typeof window === "undefined") return {}
  try {
    const raw = localStorage.getItem(QUIZ_SCORE_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

export function saveQuizScore(slug: string, result: { multipleChoice: boolean; fillInBlank?: boolean }) {
  if (typeof window === "undefined") return
  const scores = getScoreMap()
  scores[slug] = { ...result, timestamp: Date.now() }
  localStorage.setItem(QUIZ_SCORE_KEY, JSON.stringify(scores))
  updateStreak(result.multipleChoice && (result.fillInBlank !== false))
  syncQuizToServer(slug, result)
}

export function getQuizScore(slug: string): QuizScore | null {
  return getScoreMap()[slug] ?? null
}

export function getQuizStats(): { total: number; perfect: number; attempted: number; sessions: number } {
  const scores = getScoreMap()
  const entries = Object.values(scores)
  const perfect = entries.filter(
    (s) => s.multipleChoice && s.fillInBlank !== false
  ).length
  const sessions = Math.max(getQuizSessions(), entries.length > 0 ? 1 : 0)
  return { total: entries.length, perfect, attempted: entries.length, sessions }
}

export function incrementQuizSessions() {
  if (typeof window === "undefined") return
  const current = getQuizSessions()
  localStorage.setItem(QUIZ_SESSION_KEY, String(current + 1))
}

function getQuizSessions(): number {
  if (typeof window === "undefined") return 0
  const raw = localStorage.getItem(QUIZ_SESSION_KEY)
  return raw ? parseInt(raw, 10) || 0 : 0
}

/* ── Streak tracking ── */

interface StreakData {
  current: number
  best: number
  lastDate: string
}

function getStreakData(): StreakData {
  if (typeof window === "undefined") return { current: 0, best: 0, lastDate: "" }
  try {
    const raw = localStorage.getItem(STREAK_KEY)
    return raw ? JSON.parse(raw) : { current: 0, best: 0, lastDate: "" }
  } catch {
    return { current: 0, best: 0, lastDate: "" }
  }
}

function todayStr(): string {
  return new Date().toISOString().slice(0, 10)
}

function updateStreak(correct: boolean) {
  if (typeof window === "undefined") return
  const data = getStreakData()
  const today = todayStr()
  if (data.lastDate === today) return // already counted today

  if (correct) {
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    const yStr = yesterday.toISOString().slice(0, 10)

    data.current = data.lastDate === yStr ? data.current + 1 : 1
    data.best = Math.max(data.best, data.current)
  } else {
    data.current = 0
  }
  data.lastDate = today
  localStorage.setItem(STREAK_KEY, JSON.stringify(data))
}

export function getStreak(): { current: number; best: number } {
  const data = getStreakData()
  const today = todayStr()
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  const yStr = yesterday.toISOString().slice(0, 10)

  // If lastDate is not today or yesterday, streak has been broken
  if (data.lastDate !== today && data.lastDate !== yStr) {
    return { current: 0, best: data.best }
  }
  return { current: data.current, best: data.best }
}

/* ── Server sync (fire-and-forget when logged in) ── */

function syncProgressToServer(slug: string, completed: boolean) {
  fetch('/api/progress', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ lessonSlug: slug, completed }),
  }).catch(() => {})
}

function syncQuizToServer(slug: string, result: { multipleChoice: boolean; fillInBlank?: boolean }) {
  fetch('/api/quiz-scores', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ lessonSlug: slug, mcCorrect: result.multipleChoice, fibCorrect: result.fillInBlank }),
  }).catch(() => {})
}

/** Call on login to merge localStorage ↔ server */
export async function syncOnLogin(): Promise<void> {
  if (typeof window === 'undefined') return

  const completedSlugs = getCompletedLessons()
  const quizScores = getScoreMap()
  const streakData = getStreakData()

  try {
    const res = await fetch('/api/sync', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        completedSlugs,
        quizScores: Object.fromEntries(
          Object.entries(quizScores).map(([slug, s]) => [
            slug,
            { multipleChoice: s.multipleChoice, fillInBlank: s.fillInBlank },
          ])
        ),
        streak: {
          currentStreak: streakData.current,
          bestStreak: streakData.best,
          lastActiveDate: streakData.lastDate || null,
        },
      }),
    })

    if (!res.ok) return
    const merged = await res.json()

    // Update localStorage with merged server state
    localStorage.setItem(STORAGE_KEY, JSON.stringify(merged.completedSlugs))

    const mergedScores: Record<string, QuizScore> = {}
    for (const [slug, s] of Object.entries(merged.quizScores)) {
      const score = s as { multipleChoice: boolean; fillInBlank?: boolean }
      mergedScores[slug] = {
        multipleChoice: score.multipleChoice,
        fillInBlank: score.fillInBlank,
        timestamp: quizScores[slug]?.timestamp ?? Date.now(),
      }
    }
    localStorage.setItem(QUIZ_SCORE_KEY, JSON.stringify(mergedScores))

    if (merged.streak) {
      localStorage.setItem(
        STREAK_KEY,
        JSON.stringify({
          current: merged.streak.currentStreak,
          best: merged.streak.bestStreak,
          lastDate: merged.streak.lastActiveDate ?? '',
        })
      )
    }
  } catch {
    // Sync failed silently — localStorage remains source of truth
  }
}