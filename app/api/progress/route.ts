import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const progress = await prisma.progress.findMany({
    where: { userId: session.user.id },
    select: { lessonSlug: true, completedAt: true },
  })

  return NextResponse.json(progress)
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await req.json()
  const { lessonSlug, completed } = body

  if (typeof lessonSlug !== 'string') {
    return NextResponse.json({ error: 'Invalid lessonSlug' }, { status: 400 })
  }

  if (completed) {
    await prisma.progress.upsert({
      where: {
        userId_lessonSlug: {
          userId: session.user.id,
          lessonSlug,
        },
      },
      update: {},
      create: {
        userId: session.user.id,
        lessonSlug,
      },
    })
  } else {
    await prisma.progress.deleteMany({
      where: {
        userId: session.user.id,
        lessonSlug,
      },
    })
  }

  return NextResponse.json({ ok: true })
}
