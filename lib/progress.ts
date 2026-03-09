const STORAGE_KEY = "scripture_journey_progress"

export function getCompletedLessons(): string[] {
  if (typeof window === "undefined") return []

  const stored = localStorage.getItem(STORAGE_KEY)

  if (!stored) return []

  try {
    return JSON.parse(stored)
  } catch {
    return []
  }
}

export function markLessonComplete(slug: string) {
  if (typeof window === "undefined") return

  const completed = getCompletedLessons()

  if (!completed.includes(slug)) {
    completed.push(slug)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(completed))
  }
}

export function isLessonComplete(slug: string): boolean {
  const completed = getCompletedLessons()
  return completed.includes(slug)
}

export function getCompletionCount(): number {
  return getCompletedLessons().length
}

export function clearProgress() {
  if (typeof window === "undefined") return
  localStorage.removeItem(STORAGE_KEY)
}