import { describe, it, expect } from 'vitest'
import { matchesScholar } from '@/hooks/useLessonFilters'
import type { Lesson } from '@/lib/types'

function makLesson(overrides: Partial<Lesson> = {}): Lesson {
  return {
    id: 1,
    slug: 'test-lesson',
    title: 'The Seed of the Woman',
    category: 'Lineage',
    otReference: 'Genesis 3:15',
    otText: 'And I will put enmity...',
    ntReference: 'Galatians 4:4',
    ntText: 'But when the fullness of the time came...',
    summary: 'The first Messianic prophecy.',
    whyItMatters: 'Because it is the foundation.',
    reflection: 'Reflect on how this connects.',
    quiz: { question: 'Q?', choices: ['A', 'B'], answer: 0 },
    prophecyType: 'Direct Prophecy',
    timelineEra: 'Beginnings',
    timelineOrder: 1,
    ...overrides,
  }
}

// ── matchesScholar ──

describe('matchesScholar', () => {
  it('filter "all" always returns true', () => {
    expect(matchesScholar(makLesson(), 'all')).toBe(true)
    expect(matchesScholar(makLesson({ scholarship: undefined }), 'all')).toBe(true)
  })

  it('filter "payne" returns true when payne attested', () => {
    const lesson = makLesson({
      scholarship: {
        payne: {
          attested: true,
          work: 'Encyclopedia',
          encyclopediaNumber: 1,
          prophecyReference: 'Gen 3:15',
          note: '',
        },
      },
    })
    expect(matchesScholar(lesson, 'payne')).toBe(true)
  })

  it('filter "payne" returns false when payne not attested', () => {
    const lesson = makLesson({
      scholarship: {
        payne: {
          attested: false,
          work: 'Encyclopedia',
          encyclopediaNumber: 1,
          prophecyReference: 'Gen 3:15',
          note: '',
        },
      },
    })
    expect(matchesScholar(lesson, 'payne')).toBe(false)
  })

  it('filter "payne" returns false when scholarship is undefined', () => {
    expect(matchesScholar(makLesson({ scholarship: undefined }), 'payne')).toBe(false)
  })

  it('filter "payne" returns false when payne field missing from scholarship', () => {
    const lesson = makLesson({
      scholarship: {
        edersheim: {
          attested: true,
          work: 'Life and Times',
          appendix: 'IX',
          note: '',
        },
      },
    })
    expect(matchesScholar(lesson, 'payne')).toBe(false)
  })

  it('filter "edersheim" returns true when edersheim attested', () => {
    const lesson = makLesson({
      scholarship: {
        edersheim: {
          attested: true,
          work: 'Life and Times',
          appendix: 'IX',
          note: '',
        },
      },
    })
    expect(matchesScholar(lesson, 'edersheim')).toBe(true)
  })

  it('filter "mcdowell" returns true when mcdowell attested', () => {
    const lesson = makLesson({
      scholarship: {
        mcdowell: {
          attested: true,
          work: 'Evidence',
          prophecyNumber: 1,
          prophecyTitle: 'Seed',
          note: '',
        },
      },
    })
    expect(matchesScholar(lesson, 'mcdowell')).toBe(true)
  })

  it('filter "mcdowell" returns false when mcdowell not attested', () => {
    const lesson = makLesson({
      scholarship: {
        mcdowell: {
          attested: false,
          work: 'Evidence',
          prophecyNumber: 1,
          prophecyTitle: 'Seed',
          note: '',
        },
      },
    })
    expect(matchesScholar(lesson, 'mcdowell')).toBe(false)
  })
})

// ── Filter search logic (pure extraction from hook) ──

describe('filter search logic', () => {
  const lessons = [
    makLesson({ id: 1, slug: 's1', title: 'The Seed of the Woman', category: 'Lineage', otReference: 'Genesis 3:15', ntReference: 'Galatians 4:4', summary: 'First Messianic prophecy.' }),
    makLesson({ id: 2, slug: 's2', title: 'Born of a Virgin', category: 'Identity', otReference: 'Isaiah 7:14', ntReference: 'Matthew 1:22-23', summary: 'The virgin birth.' }),
    makLesson({ id: 3, slug: 's3', title: 'Triumphal Entry', category: 'Ministry', otReference: 'Zechariah 9:9', ntReference: 'Matthew 21:1-5', summary: 'The king rides on a donkey.' }),
  ]

  function filterLessons(query: string): typeof lessons {
    const normalizedQuery = query.trim().toLowerCase()
    return lessons.filter((lesson) => {
      const text = `${lesson.title} ${lesson.otReference} ${lesson.ntReference} ${lesson.summary} ${lesson.category}`.toLowerCase()
      return text.includes(normalizedQuery)
    })
  }

  it('empty query returns all', () => {
    expect(filterLessons('')).toHaveLength(3)
  })

  it('matches on title', () => {
    const result = filterLessons('Seed')
    expect(result).toHaveLength(1)
    expect(result[0].slug).toBe('s1')
  })

  it('matches on otReference', () => {
    const result = filterLessons('Isaiah')
    expect(result).toHaveLength(1)
    expect(result[0].slug).toBe('s2')
  })

  it('matches on ntReference', () => {
    const result = filterLessons('Matthew 21')
    expect(result).toHaveLength(1)
    expect(result[0].slug).toBe('s3')
  })

  it('matches on category', () => {
    const result = filterLessons('Ministry')
    expect(result).toHaveLength(1)
    expect(result[0].slug).toBe('s3')
  })

  it('case-insensitive match', () => {
    expect(filterLessons('SEED')).toHaveLength(1)
    expect(filterLessons('seed')).toHaveLength(1)
    expect(filterLessons('SeEd')).toHaveLength(1)
  })

  it('no match returns empty', () => {
    expect(filterLessons('Revelation')).toHaveLength(0)
  })
})

// ── Sort logic (pure extraction from hook) ──

describe('sort logic', () => {
  const lessons = [
    makLesson({ id: 3, slug: 's3', category: 'Ministry' }),
    makLesson({ id: 1, slug: 's1', category: 'Lineage' }),
    makLesson({ id: 2, slug: 's2', category: 'Identity' }),
  ]

  type SortOption = 'default' | 'category' | 'completed-first' | 'not-completed-first'

  function sortLessons(items: typeof lessons, sortBy: SortOption, completedSlugs: string[]) {
    return [...items].sort((a, b) => {
      if (sortBy === 'category') return a.category.localeCompare(b.category) || a.id - b.id
      if (sortBy === 'completed-first') {
        return (completedSlugs.includes(b.slug) ? 1 : 0) - (completedSlugs.includes(a.slug) ? 1 : 0)
      }
      if (sortBy === 'not-completed-first') {
        return (completedSlugs.includes(a.slug) ? 1 : 0) - (completedSlugs.includes(b.slug) ? 1 : 0)
      }
      return a.id - b.id
    })
  }

  it('default sorts by id ascending', () => {
    const result = sortLessons(lessons, 'default', [])
    expect(result.map(l => l.id)).toEqual([1, 2, 3])
  })

  it('category sorts alphabetically with id tiebreak', () => {
    const result = sortLessons(lessons, 'category', [])
    expect(result.map(l => l.category)).toEqual(['Identity', 'Lineage', 'Ministry'])
  })

  it('completed-first puts completed at top', () => {
    const result = sortLessons(lessons, 'completed-first', ['s3'])
    expect(result[0].slug).toBe('s3')
  })

  it('completed-first works when completedSlugs is empty', () => {
    const result = sortLessons(lessons, 'completed-first', [])
    // All equal — should preserve relative order from default sort perspective
    expect(result).toHaveLength(3)
  })

  it('not-completed-first puts incomplete at top', () => {
    const result = sortLessons(lessons, 'not-completed-first', ['s1', 's2'])
    expect(result[0].slug).toBe('s3') // only incomplete
  })
})
