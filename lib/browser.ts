export function isBrowser(): boolean {
  return typeof window !== 'undefined' && typeof document !== 'undefined'
}

export function safeGetItem(key: string): string | null {
  if (!isBrowser()) return null
  try {
    return localStorage.getItem(key)
  } catch {
    return null
  }
}

export function safeSetItem(key: string, value: string): void {
  if (!isBrowser()) return
  try {
    localStorage.setItem(key, value)
  } catch {
    // localStorage may be unavailable (in-app browsers, private mode, quota exceeded)
  }
}

export function safeRemoveItem(key: string): void {
  if (!isBrowser()) return
  try {
    localStorage.removeItem(key)
  } catch {
    // localStorage may be unavailable
  }
}

export async function safeCopyText(text: string): Promise<boolean> {
  try {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      await navigator.clipboard.writeText(text)
      return true
    }
  } catch {
    // clipboard API failed — try fallback
  }

  try {
    if (!isBrowser()) return false
    if (!document.hasFocus()) return false
    const ta = document.createElement('textarea')
    ta.value = text
    ta.style.position = 'fixed'
    ta.style.opacity = '0'
    document.body.appendChild(ta)
    ta.select()
    const ok = document.execCommand('copy')
    document.body.removeChild(ta)
    return ok
  } catch {
    return false
  }
}

export function isInAppBrowser(): boolean {
  if (!isBrowser()) return false
  try {
    const ua = navigator.userAgent || ''
    return /FBAN|FBAV|Messenger|Instagram|; wv\)/.test(ua)
  } catch {
    return false
  }
}
