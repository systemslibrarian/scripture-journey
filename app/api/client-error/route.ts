import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { message, stack, route, userAgent, timestamp } = body

    if (
      typeof message !== 'string' || !message.trim() ||
      typeof stack !== 'string' || !stack.trim() ||
      typeof route !== 'string' || !route.trim() ||
      typeof userAgent !== 'string' || !userAgent.trim() ||
      typeof timestamp !== 'string' || !timestamp.trim()
    ) {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })
    }

    console.error(`[CLIENT ERROR] route=${route} ua=${userAgent} message=${message}`)

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })
  }
}
