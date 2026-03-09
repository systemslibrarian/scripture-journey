import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await req.json()
  const { completedSlugs, quizScores, streak } = body
  const userId = session.user.id

  // Merge completed lessons
  if (Array.isArray(completedSlugs)) {
    for (const slug of completedSlugs) {
      if (typeof slug === 'string') {
        await prisma.progress.upsert({
          where: { userId_lessonSlug: { userId, lessonSlug: slug } },
          update: {},
          create: { userId, lessonSlug: slug },
        })
      }
    }
  }

  // Merge quiz scores
  if (quizScores && typeof quizScores === 'object') {
    for (const [slug, score] of Object.entries(quizScores)) {
      const s = score as { multipleChoice?: boolean; fillInBlank?: boolean }
      if (typeof s.multipleChoice === 'boolean') {
        await prisma.quizScore.upsert({
          where: { userId_lessonSlug: { userId, lessonSlug: slug } },
          update: { mcCorrect: s.multipleChoice, fibCorrect: s.fillInBlank ?? null },
          create: {
            userId,
            lessonSlug: slug,
            mcCorrect: s.multipleChoice,
            fibCorrect: s.fillInBlank ?? null,
          },
        })
      }
    }
  }

  // Merge streak (keep the better values)
  if (streak && typeof streak.currentStreak === 'number') {
    const existing = await prisma.streak.findUnique({ where: { userId } })
    const best = Math.max(streak.bestStreak ?? 0, existing?.bestStreak ?? 0)
    const current = streak.currentStreak
    await prisma.streak.upsert({
      where: { userId },
      update: { currentStreak: current, bestStreak: best, lastActiveDate: streak.lastActiveDate ?? null },
      create: {
        userId,
        currentStreak: current,
        bestStreak: best,
        lastActiveDate: streak.lastActiveDate ?? null,
      },
    })
  }

  // Return merged server state
  const progress = await prisma.progress.findMany({
    where: { userId },
    select: { lessonSlug: true },
  })
  const scores = await prisma.quizScore.findMany({
    where: { userId },
    select: { lessonSlug: true, mcCorrect: true, fibCorrect: true },
  })
  const serverStreak = await prisma.streak.findUnique({
    where: { userId },
    select: { currentStreak: true, bestStreak: true, lastActiveDate: true },
  })

  return NextResponse.json({
    completedSlugs: progress.map((p: { lessonSlug: string }) => p.lessonSlug),
    quizScores: Object.fromEntries(
      scores.map((s: { lessonSlug: string; mcCorrect: boolean; fibCorrect: boolean | null }) => [s.lessonSlug, { multipleChoice: s.mcCorrect, fillInBlank: s.fibCorrect }])
    ),
    streak: serverStreak ?? { currentStreak: 0, bestStreak: 0, lastActiveDate: null },
  })
}
