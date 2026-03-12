'use client'

import { useEffect } from 'react'

function isChunkError(error: Error): boolean {
  if (error.name === 'ChunkLoadError') return true
  const msg = error.message ?? ''
  return msg.includes('Loading chunk') || msg.includes('Failed to fetch dynamically imported module')
}

export default function GlobalError({
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
        }),
      }).catch(() => {})
    } catch {
      // Reporting must never cause a secondary crash
    }
  }, [error, isChunk])

  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: 'system-ui, sans-serif', background: '#fefcf8' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '1.5rem', textAlign: 'center' }}>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1b1a17' }}>
            {isChunk ? 'Update available' : "Something didn't load"}
          </h1>
          <p style={{ marginTop: '0.75rem', maxWidth: '28rem', fontSize: '0.875rem', color: '#4a4338' }}>
            {isChunk
              ? 'A new version of Scripture Journey is available. Reload to get the latest.'
              : 'An unexpected error occurred. You can try again, or refresh the page.'}
          </p>
          <p style={{ marginTop: '0.75rem', maxWidth: '28rem', fontSize: '0.75rem', color: '#9a8e7e' }}>
            If you&apos;re inside Facebook, Instagram, or Messenger, try opening this in Safari or Chrome.
          </p>
          <button
            onClick={isChunk ? () => window.location.reload() : reset}
            style={{ marginTop: '1.5rem', borderRadius: '0.75rem', backgroundColor: '#1b1a17', padding: '0.75rem 1.5rem', fontSize: '0.875rem', fontWeight: 600, color: '#fff', border: 'none', cursor: 'pointer' }}
          >
            {isChunk ? 'Reload' : 'Try Again'}
          </button>
        </div>
      </body>
    </html>
  )
}
