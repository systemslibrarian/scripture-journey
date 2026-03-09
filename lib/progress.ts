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