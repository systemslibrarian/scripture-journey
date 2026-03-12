'use client'

import { useEffect, useState } from 'react'
import { isInAppBrowser } from '@/lib/browser'

// Type for the beforeinstallprompt event
interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

export default function ServiceWorkerRegistration() {
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') return

    // Register service worker
    if ('serviceWorker' in navigator) {
      let reloaded = false

      navigator.serviceWorker
        .register('/sw.js')
        .then((reg) => {
          if (reg.waiting) {
            reg.waiting.postMessage({ type: 'SKIP_WAITING' })
          }

          navigator.serviceWorker.addEventListener('controllerchange', () => {
            if (!reloaded) {
              reloaded = true
              window.location.reload()
            }
          })
        })
        .catch(() => {
          // SW registration failed silently
        })
    }

    // Capture install prompt — suppress in in-app browsers
    if (isInAppBrowser()) return

    const handler = (e: Event) => {
      e.preventDefault()
      setInstallPrompt(e as BeforeInstallPromptEvent)
      setShowBanner(true)
    }

    window.addEventListener('beforeinstallprompt', handler)
    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  async function handleInstall() {
    if (!installPrompt) return
    installPrompt.prompt()
    const { outcome } = await installPrompt.userChoice
    if (outcome === 'accepted') {
      setShowBanner(false)
    }
    setInstallPrompt(null)
  }

  function handleDismiss() {
    setShowBanner(false)
  }

  if (!showBanner) return null

  return (
    <div
      className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-md rounded-2xl border border-[#d8ccb8] bg-white p-4 shadow-lg sm:left-auto sm:right-6"
      style={{ paddingBottom: 'calc(1rem + env(safe-area-inset-bottom))' }}
      role="alert"
      aria-label="Install app prompt"
    >
      <div className="flex items-start gap-3">
        <div className="flex-1">
          <p className="text-sm font-semibold text-[#1b1a17]">
            Install Scripture Journey
          </p>
          <p className="mt-1 text-xs text-[#4a4338]">
            Add to your home screen for offline access and a native app experience.
          </p>
        </div>
        <button
          onClick={handleDismiss}
          aria-label="Dismiss install prompt"
          className="text-[#9a8e7e] hover:text-[#1b1a17]"
        >
          ✕
        </button>
      </div>

      <div className="mt-3 flex gap-2">
        <button
          onClick={handleInstall}
          className="rounded-xl bg-[#1b1a17] px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
        >
          Install
        </button>
        <button
          onClick={handleDismiss}
          className="rounded-xl border border-[#d8ccb8] px-4 py-2 text-sm font-semibold text-[#4a4338] hover:bg-[#fbf7ee]"
        >
          Not Now
        </button>
      </div>
    </div>
  )
}
