import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const scores = await prisma.quizScore.findMany({
    where: { userId: session.user.id },
    select: { lessonSlug: true, mcCorrect: true, fibCorrect: true },
  })

  return NextResponse.json(scores)
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await req.json()
  const { lessonSlug, mcCorrect, fibCorrect } = body

  if (typeof lessonSlug !== 'string' || typeof mcCorrect !== 'boolean') {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })
  }

  await prisma.quizScore.upsert({
    where: {
      userId_lessonSlug: {
        userId: session.user.id,
        lessonSlug,
      },
    },
    update: { mcCorrect, fibCorrect: fibCorrect ?? null },
    create: {
      userId: session.user.id,
      lessonSlug,
      mcCorrect,
      fibCorrect: fibCorrect ?? null,
    },
  })

  return NextResponse.json({ ok: true })
}
