import { describe, it, expect, vi, afterEach } from 'vitest'
import { NextRequest } from 'next/server'
import { POST } from '@/app/api/client-error/route'

afterEach(() => {
  vi.restoreAllMocks()
})

function makeRequest(body: unknown, method = 'POST'): NextRequest {
  return new NextRequest('http://localhost/api/client-error', {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
}

describe('POST /api/client-error', () => {
  it('returns { ok: true } for valid payload', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {})
    const req = makeRequest({
      message: 'Something broke',
      stack: 'Error: Something broke\n    at foo.ts:1',
      route: '/lessons/test',
      userAgent: 'Mozilla/5.0',
      timestamp: '1710000000000',
    })
    const res = await POST(req)
    const json = await res.json()
    expect(res.status).toBe(200)
    expect(json).toEqual({ ok: true })
  })

  it('logs to console.error with correct format', async () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {})
    const req = makeRequest({
      message: 'test error',
      stack: 'stack trace',
      route: '/quiz',
      userAgent: 'TestAgent/1.0',
      timestamp: '123456',
    })
    await POST(req)
    expect(spy).toHaveBeenCalledWith(
      expect.stringContaining('[CLIENT ERROR]'),
    )
    expect(spy).toHaveBeenCalledWith(
      expect.stringContaining('route=/quiz'),
    )
  })

  it('returns 400 when message is missing', async () => {
    const req = makeRequest({
      stack: 'trace',
      route: '/',
      userAgent: 'UA',
      timestamp: '123',
    })
    const res = await POST(req)
    expect(res.status).toBe(400)
  })

  it('returns 200 when stack is empty string', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {})
    const req = makeRequest({
      message: 'err',
      stack: '',
      route: '/',
      userAgent: 'UA',
      timestamp: '123',
    })
    const res = await POST(req)
    const json = await res.json()
    expect(res.status).toBe(200)
    expect(json).toEqual({ ok: true })
  })

  it('returns 400 when field is a number instead of string', async () => {
    const req = makeRequest({
      message: 'err',
      stack: 'trace',
      route: '/',
      userAgent: 'UA',
      timestamp: 12345,
    })
    const res = await POST(req)
    expect(res.status).toBe(400)
  })

  it('returns 400 for completely empty body', async () => {
    const req = new NextRequest('http://localhost/api/client-error', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: '{}',
    })
    const res = await POST(req)
    expect(res.status).toBe(400)
  })

  it('returns 400 for malformed JSON body', async () => {
    const req = new NextRequest('http://localhost/api/client-error', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: 'not json at all',
    })
    const res = await POST(req)
    expect(res.status).toBe(400)
  })
})
