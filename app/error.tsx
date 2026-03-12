'use client'

import { useEffect } from 'react'

function isChunkError(error: Error): boolean {
  if (error.name === 'ChunkLoadError') return true
  const msg = error.message ?? ''
  return msg.includes('Loading chunk') || msg.includes('Failed to fetch dynamically imported module')
}

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const isChunk = isChunkError(error)

  useEffect(() => {
    if (isChunk) return
    try {
      fetch('/api/client-error', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: error.message ?? 'Unknown error',
          stack: error.stack ?? '',
          route: window.location.pathname,
          userAgent: navigator.userAgent,
          timestamp: String(Date.now()),
          ...(error.digest ? { digest: error.digest } : {}),
        }),
      }).catch(() => {})
    } catch {
      // Reporting must never cause a secondary crash
    }
  }, [error, isChunk])

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center bg-[#fefcf8]">
      <h1 className="text-2xl font-bold text-[#1b1a17]">
        {isChunk ? 'Update available' : "Something didn't load"}
      </h1>
      <p className="mt-3 max-w-md text-sm text-[#4a4338]">
        {isChunk
          ? 'A new version of Scripture Journey is available. Reload to get the latest.'
          : 'An unexpected error occurred. You can try again, or refresh the page.'}
      </p>
      <p className="mt-3 max-w-md text-xs text-[#9a8e7e]">
        If you&apos;re inside Facebook, Instagram, or Messenger, try opening this in Safari or Chrome.
      </p>
      <button
        onClick={isChunk ? () => window.location.reload() : reset}
        className="mt-6 rounded-xl bg-[#1b1a17] px-6 py-3 text-sm font-semibold text-white hover:opacity-90 transition"
      >
        {isChunk ? 'Reload' : 'Try Again'}
      </button>
    </div>
  )
}
