import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const streak = await prisma.streak.findUnique({
    where: { userId: session.user.id },
    select: { currentStreak: true, bestStreak: true, lastActiveDate: true },
  })

  return NextResponse.json(streak ?? { currentStreak: 0, bestStreak: 0, lastActiveDate: null })
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await req.json()
  const { currentStreak, bestStreak, lastActiveDate } = body

  if (typeof currentStreak !== 'number' || typeof bestStreak !== 'number') {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })
  }

  await prisma.streak.upsert({
    where: { userId: session.user.id },
    update: { currentStreak, bestStreak, lastActiveDate: lastActiveDate ?? null },
    create: {
      userId: session.user.id,
      currentStreak,
      bestStreak,
      lastActiveDate: lastActiveDate ?? null,
    },
  })

  return NextResponse.json({ ok: true })
}
