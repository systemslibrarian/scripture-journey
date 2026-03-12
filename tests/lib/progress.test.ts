import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

// ── localStorage mock ──

function createStorageMock() {
  const store = new Map<string, string>()
  return {
    getItem: vi.fn((key: string) => store.get(key) ?? null),
    setItem: vi.fn((key: string, value: string) => { store.set(key, value) }),
    removeItem: vi.fn((key: string) => { store.delete(key) }),
    clear: vi.fn(() => store.clear()),
    get length() { return store.size },
    key: vi.fn((_i: number) => null),
    _store: store,
  }
}

let storageMock: ReturnType<typeof createStorageMock>

beforeEach(() => {
  storageMock = createStorageMock()
  vi.stubGlobal('localStorage', storageMock)
  vi.stubGlobal('window', { ...globalThis.window, localStorage: storageMock })
  vi.stubGlobal('document', globalThis.document ?? {})
  // Reset fetch to a no-op so sync calls don't throw
  vi.stubGlobal('fetch', vi.fn(() => Promise.resolve(new Response('{}', { status: 200 }))))
})

afterEach(() => {
  vi.restoreAllMocks()
  vi.resetModules()
})

async function loadModule() {
  return import('@/lib/progress')
}

// ── parseStoredProgress ──

describe('parseStoredProgress', () => {
  it('returns [] for null input', async () => {
    const { parseStoredProgress } = await loadModule()
    expect(parseStoredProgress(null)).toEqual([])
  })

  it('returns [] for empty string', async () => {
    const { parseStoredProgress } = await loadModule()
    expect(parseStoredProgress('')).toEqual([])
  })

  it('parses valid JSON array of strings', async () => {
    const { parseStoredProgress } = await loadModule()
    expect(parseStoredProgress('["a","b","c"]')).toEqual(['a', 'b', 'c'])
  })

  it('returns [] for invalid JSON', async () => {
    const { parseStoredProgress } = await loadModule()
    expect(parseStoredProgress('{not json')).toEqual([])
  })

  it('returns [] for non-array JSON (object)', async () => {
    const { parseStoredProgress } = await loadModule()
    expect(parseStoredProgress('{"a":1}')).toEqual([])
  })

  it('returns [] for non-array JSON (number)', async () => {
    const { parseStoredProgress } = await loadModule()
    expect(parseStoredProgress('42')).toEqual([])
  })

  it('filters out non-string entries', async () => {
    const { parseStoredProgress } = await loadModule()
    expect(parseStoredProgress('["a", 1, null, true, "b"]')).toEqual(['a', 'b'])
  })

  it('deduplicates slugs', async () => {
    const { parseStoredProgress } = await loadModule()
    expect(parseStoredProgress('["a","b","a","c","b"]')).toEqual(['a', 'b', 'c'])
  })
})

// ── getCompletedLessons / markLessonComplete / clearProgress ──

describe('getCompletedLessons', () => {
  it('returns [] when storage is empty', async () => {
    const { getCompletedLessons } = await loadModule()
    expect(getCompletedLessons()).toEqual([])
  })

  it('returns stored slugs', async () => {
    storageMock.setItem('scripture_journey_progress', '["lesson-1","lesson-2"]')
    const { getCompletedLessons } = await loadModule()
    expect(getCompletedLessons()).toEqual(['lesson-1', 'lesson-2'])
  })
})

describe('markLessonComplete', () => {
  it('adds a slug to progress', async () => {
    const { markLessonComplete, getCompletedLessons } = await loadModule()
    markLessonComplete('lesson-1')
    expect(getCompletedLessons()).toContain('lesson-1')
  })

  it('does not duplicate a slug', async () => {
    const { markLessonComplete, getCompletedLessons } = await loadModule()
    markLessonComplete('lesson-1')
    markLessonComplete('lesson-1')
    expect(getCompletedLessons().filter(s => s === 'lesson-1')).toHaveLength(1)
  })
})

describe('clearProgress', () => {
  it('removes all completed lessons', async () => {
    storageMock.setItem('scripture_journey_progress', '["lesson-1"]')
    const { clearProgress, getCompletedLessons } = await loadModule()
    clearProgress()
    expect(getCompletedLessons()).toEqual([])
  })
})

// ── getCompletionPercent ──

describe('getCompletionPercent', () => {
  it('returns 0 when no lessons completed', async () => {
    const { getCompletionPercent } = await loadModule()
    expect(getCompletionPercent(50)).toBe(0)
  })

  it('returns correct percentage', async () => {
    storageMock.setItem('scripture_journey_progress', '["a","b","c","d","e"]')
    const { getCompletionPercent } = await loadModule()
    expect(getCompletionPercent(10)).toBe(50)
  })

  it('handles totalLessons=0 without division by zero', async () => {
    const { getCompletionPercent } = await loadModule()
    expect(getCompletionPercent(0)).toBe(0) // uses Math.max(0,1) = 1
  })
})

// ── Quiz scoring ──

describe('getQuizStats', () => {
  it('returns zeros when no scores exist', async () => {
    const { getQuizStats } = await loadModule()
    const stats = getQuizStats()
    expect(stats).toEqual({ total: 0, perfect: 0, attempted: 0, sessions: 0 })
  })

  it('counts perfect scores (mc=true, fib=undefined counts as perfect)', async () => {
    storageMock.setItem('scripture_journey_quiz_scores', JSON.stringify({
      'l1': { multipleChoice: true, timestamp: 1 },
      'l2': { multipleChoice: true, fillInBlank: true, timestamp: 2 },
      'l3': { multipleChoice: true, fillInBlank: false, timestamp: 3 },
      'l4': { multipleChoice: false, timestamp: 4 },
    }))
    const { getQuizStats } = await loadModule()
    const stats = getQuizStats()
    expect(stats.total).toBe(4)
    // l1: mc=true, fib undefined (fib !== false → perfect)
    // l2: mc=true, fib=true (perfect)
    // l3: mc=true, fib=false (NOT perfect)
    // l4: mc=false (NOT perfect)
    expect(stats.perfect).toBe(2)
  })

  it('sessions is at least 1 when scores exist', async () => {
    storageMock.setItem('scripture_journey_quiz_scores', JSON.stringify({
      'l1': { multipleChoice: true, timestamp: 1 },
    }))
    const { getQuizStats } = await loadModule()
    expect(getQuizStats().sessions).toBe(1)
  })

  it('sessions respects stored session count when higher', async () => {
    storageMock.setItem('scripture_journey_quiz_scores', JSON.stringify({
      'l1': { multipleChoice: true, timestamp: 1 },
    }))
    storageMock.setItem('scripture_journey_quiz_sessions', '5')
    const { getQuizStats } = await loadModule()
    expect(getQuizStats().sessions).toBe(5)
  })
})

describe('incrementQuizSessions', () => {
  it('increments from 0', async () => {
    const { incrementQuizSessions } = await loadModule()
    incrementQuizSessions()
    expect(storageMock.getItem('scripture_journey_quiz_sessions')).toBe('1')
  })

  it('increments existing count', async () => {
    storageMock.setItem('scripture_journey_quiz_sessions', '3')
    const { incrementQuizSessions } = await loadModule()
    incrementQuizSessions()
    expect(storageMock.getItem('scripture_journey_quiz_sessions')).toBe('4')
  })
})

// ── Streak tracking ──

describe('getStreak', () => {
  function localDateStr(daysAgo: number): string {
    const d = new Date()
    d.setDate(d.getDate() - daysAgo)
    const yyyy = d.getFullYear()
    const mm = String(d.getMonth() + 1).padStart(2, '0')
    const dd = String(d.getDate()).padStart(2, '0')
    return `${yyyy}-${mm}-${dd}`
  }

  it('returns {current:0, best:0} when no streak data', async () => {
    const { getStreak } = await loadModule()
    expect(getStreak()).toEqual({ current: 0, best: 0 })
  })

  it('returns active streak when lastDate is today', async () => {
    storageMock.setItem('scripture_journey_streak', JSON.stringify({
      current: 5, best: 10, lastDate: localDateStr(0),
    }))
    const { getStreak } = await loadModule()
    expect(getStreak()).toEqual({ current: 5, best: 10 })
  })

  it('returns active streak when lastDate is yesterday', async () => {
    storageMock.setItem('scripture_journey_streak', JSON.stringify({
      current: 3, best: 7, lastDate: localDateStr(1),
    }))
    const { getStreak } = await loadModule()
    expect(getStreak()).toEqual({ current: 3, best: 7 })
  })

  it('returns broken streak (current=0) when lastDate is 3+ days ago', async () => {
    storageMock.setItem('scripture_journey_streak', JSON.stringify({
      current: 5, best: 5, lastDate: localDateStr(3),
    }))
    const { getStreak } = await loadModule()
    expect(getStreak()).toEqual({ current: 0, best: 5 })
  })

  it('preserves best streak after reset', async () => {
    storageMock.setItem('scripture_journey_streak', JSON.stringify({
      current: 2, best: 15, lastDate: localDateStr(10),
    }))
    const { getStreak } = await loadModule()
    expect(getStreak().best).toBe(15)
    expect(getStreak().current).toBe(0)
  })
})

describe('saveQuizScore (updateStreak integration)', () => {
  function localDateStr(daysAgo: number): string {
    const d = new Date()
    d.setDate(d.getDate() - daysAgo)
    const yyyy = d.getFullYear()
    const mm = String(d.getMonth() + 1).padStart(2, '0')
    const dd = String(d.getDate()).padStart(2, '0')
    return `${yyyy}-${mm}-${dd}`
  }

  it('first correct activity starts streak at 1', async () => {
    const { saveQuizScore, getStreak } = await loadModule()
    saveQuizScore('l1', { multipleChoice: true })
    expect(getStreak().current).toBe(1)
  })

  it('consecutive day extends streak', async () => {
    storageMock.setItem('scripture_journey_streak', JSON.stringify({
      current: 3, best: 3, lastDate: localDateStr(1),
    }))
    const { saveQuizScore, getStreak } = await loadModule()
    saveQuizScore('l1', { multipleChoice: true })
    expect(getStreak().current).toBe(4)
    expect(getStreak().best).toBe(4)
  })

  it('same day does not double-count', async () => {
    storageMock.setItem('scripture_journey_streak', JSON.stringify({
      current: 2, best: 2, lastDate: localDateStr(0),
    }))
    const { saveQuizScore, getStreak } = await loadModule()
    saveQuizScore('l1', { multipleChoice: true })
    expect(getStreak().current).toBe(2) // unchanged
  })

  it('missed day resets streak to 1 (not 0) on correct answer', async () => {
    storageMock.setItem('scripture_journey_streak', JSON.stringify({
      current: 5, best: 5, lastDate: localDateStr(3),
    }))
    const { saveQuizScore, getStreak } = await loadModule()
    saveQuizScore('l1', { multipleChoice: true })
    expect(getStreak().current).toBe(1)
    expect(getStreak().best).toBe(5) // preserved
  })

  it('incorrect answer resets streak to 0', async () => {
    storageMock.setItem('scripture_journey_streak', JSON.stringify({
      current: 3, best: 5, lastDate: localDateStr(1),
    }))
    const { saveQuizScore, getStreak } = await loadModule()
    saveQuizScore('l1', { multipleChoice: false })
    expect(getStreak().current).toBe(0)
    expect(getStreak().best).toBe(5) // preserved
  })

  it('tracks best streak correctly across multiple days', async () => {
    const { saveQuizScore, getStreak } = await loadModule()

    // Day 1: start
    saveQuizScore('l1', { multipleChoice: true })
    expect(getStreak().current).toBe(1)
    expect(getStreak().best).toBe(1)

    // Simulate day 2 by setting lastDate to yesterday
    storageMock.setItem('scripture_journey_streak', JSON.stringify({
      current: 1, best: 1, lastDate: localDateStr(1),
    }))

    // Need to reload to pick up new storage state
    vi.resetModules()
    const mod2 = await loadModule()
    mod2.saveQuizScore('l2', { multipleChoice: true })
    expect(mod2.getStreak().current).toBe(2)
    expect(mod2.getStreak().best).toBe(2)
  })
})
