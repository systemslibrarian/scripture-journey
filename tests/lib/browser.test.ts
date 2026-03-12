import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

beforeEach(() => {
  vi.resetModules()
})

afterEach(() => {
  vi.restoreAllMocks()
})

// ── isBrowser ──

describe('isBrowser', () => {
  it('returns true when window and document exist', async () => {
    vi.stubGlobal('window', {})
    vi.stubGlobal('document', {})
    const { isBrowser } = await import('@/lib/browser')
    expect(isBrowser()).toBe(true)
  })
})

// ── safeGetItem ──

describe('safeGetItem', () => {
  it('returns value when key exists', async () => {
    const mockStorage = {
      getItem: vi.fn(() => 'hello'),
      setItem: vi.fn(),
      removeItem: vi.fn(),
      clear: vi.fn(),
      length: 1,
      key: vi.fn(),
    }
    vi.stubGlobal('window', { localStorage: mockStorage })
    vi.stubGlobal('document', {})
    vi.stubGlobal('localStorage', mockStorage)
    const { safeGetItem } = await import('@/lib/browser')
    expect(safeGetItem('test-key')).toBe('hello')
    expect(mockStorage.getItem).toHaveBeenCalledWith('test-key')
  })

  it('returns null when key does not exist', async () => {
    const mockStorage = {
      getItem: vi.fn(() => null),
      setItem: vi.fn(),
      removeItem: vi.fn(),
      clear: vi.fn(),
      length: 0,
      key: vi.fn(),
    }
    vi.stubGlobal('window', { localStorage: mockStorage })
    vi.stubGlobal('document', {})
    vi.stubGlobal('localStorage', mockStorage)
    const { safeGetItem } = await import('@/lib/browser')
    expect(safeGetItem('missing')).toBeNull()
  })

  it('returns null when localStorage throws (blocked)', async () => {
    const mockStorage = {
      getItem: vi.fn(() => { throw new DOMException('blocked') }),
      setItem: vi.fn(),
      removeItem: vi.fn(),
      clear: vi.fn(),
      length: 0,
      key: vi.fn(),
    }
    vi.stubGlobal('window', { localStorage: mockStorage })
    vi.stubGlobal('document', {})
    vi.stubGlobal('localStorage', mockStorage)
    const { safeGetItem } = await import('@/lib/browser')
    expect(safeGetItem('test')).toBeNull()
  })
})

// ── safeSetItem ──

describe('safeSetItem', () => {
  it('writes to localStorage', async () => {
    const mockStorage = {
      getItem: vi.fn(),
      setItem: vi.fn(),
      removeItem: vi.fn(),
      clear: vi.fn(),
      length: 0,
      key: vi.fn(),
    }
    vi.stubGlobal('window', { localStorage: mockStorage })
    vi.stubGlobal('document', {})
    vi.stubGlobal('localStorage', mockStorage)
    const { safeSetItem } = await import('@/lib/browser')
    safeSetItem('key', 'val')
    expect(mockStorage.setItem).toHaveBeenCalledWith('key', 'val')
  })

  it('does not throw when storage is full', async () => {
    const mockStorage = {
      getItem: vi.fn(),
      setItem: vi.fn(() => { throw new DOMException('quota exceeded') }),
      removeItem: vi.fn(),
      clear: vi.fn(),
      length: 0,
      key: vi.fn(),
    }
    vi.stubGlobal('window', { localStorage: mockStorage })
    vi.stubGlobal('document', {})
    vi.stubGlobal('localStorage', mockStorage)
    const { safeSetItem } = await import('@/lib/browser')
    expect(() => safeSetItem('key', 'val')).not.toThrow()
  })
})

// ── safeRemoveItem ──

describe('safeRemoveItem', () => {
  it('calls removeItem on localStorage', async () => {
    const mockStorage = {
      getItem: vi.fn(),
      setItem: vi.fn(),
      removeItem: vi.fn(),
      clear: vi.fn(),
      length: 0,
      key: vi.fn(),
    }
    vi.stubGlobal('window', { localStorage: mockStorage })
    vi.stubGlobal('document', {})
    vi.stubGlobal('localStorage', mockStorage)
    const { safeRemoveItem } = await import('@/lib/browser')
    safeRemoveItem('key')
    expect(mockStorage.removeItem).toHaveBeenCalledWith('key')
  })
})

// ── safeCopyText ──

describe('safeCopyText', () => {
  it('returns true when clipboard.writeText resolves', async () => {
    vi.stubGlobal('navigator', {
      clipboard: { writeText: vi.fn(() => Promise.resolve()) },
      userAgent: '',
    })
    vi.stubGlobal('window', {})
    vi.stubGlobal('document', {})
    const { safeCopyText } = await import('@/lib/browser')
    const result = await safeCopyText('hello')
    expect(result).toBe(true)
  })

  it('falls back to execCommand when clipboard rejects', async () => {
    const execCommandMock = vi.fn(() => true)
    vi.stubGlobal('navigator', {
      clipboard: { writeText: vi.fn(() => Promise.reject(new Error('denied'))) },
      userAgent: '',
    })
    vi.stubGlobal('window', {})
    const mockBody = {
      appendChild: vi.fn(),
      removeChild: vi.fn(),
    }
    vi.stubGlobal('document', {
      hasFocus: vi.fn(() => true),
      createElement: vi.fn(() => ({
        value: '',
        style: {},
        select: vi.fn(),
      })),
      body: mockBody,
      execCommand: execCommandMock,
    })
    const { safeCopyText } = await import('@/lib/browser')
    const result = await safeCopyText('hello')
    expect(result).toBe(true)
    expect(execCommandMock).toHaveBeenCalledWith('copy')
  })

  it('returns false when clipboard is unavailable and no focus', async () => {
    vi.stubGlobal('navigator', { userAgent: '' })
    vi.stubGlobal('window', {})
    vi.stubGlobal('document', {
      hasFocus: vi.fn(() => false),
    })
    const { safeCopyText } = await import('@/lib/browser')
    const result = await safeCopyText('hello')
    expect(result).toBe(false)
  })

  it('returns false when both methods fail, without throwing', async () => {
    vi.stubGlobal('navigator', {
      clipboard: { writeText: vi.fn(() => Promise.reject(new Error('fail'))) },
      userAgent: '',
    })
    vi.stubGlobal('window', {})
    vi.stubGlobal('document', {
      hasFocus: vi.fn(() => true),
      createElement: vi.fn(() => { throw new Error('no DOM') }),
    })
    const { safeCopyText } = await import('@/lib/browser')
    const result = await safeCopyText('hello')
    expect(result).toBe(false)
  })
})

// ── isInAppBrowser ──

describe('isInAppBrowser', () => {
  function testUA(ua: string, expected: boolean, label: string) {
    it(`${label} → ${expected}`, async () => {
      vi.stubGlobal('navigator', { userAgent: ua })
      vi.stubGlobal('window', {})
      vi.stubGlobal('document', {})
      const { isInAppBrowser } = await import('@/lib/browser')
      expect(isInAppBrowser()).toBe(expected)
    })
  }

  testUA(
    'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 [FBAN/FBIOS;FBAV/380.0.0.0;FBBV/12345]',
    true,
    'Facebook iOS',
  )

  testUA(
    'Mozilla/5.0 (Linux; Android 12) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.0.0 Mobile Safari/537.36 Instagram 280.0.0.0',
    true,
    'Instagram Android',
  )

  testUA(
    'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) [FB_IAB/Messenger;FBAV/380.0]',
    true,
    'Messenger',
  )

  testUA(
    'Mozilla/5.0 (Linux; Android 12; SM-G991B Build/SP1A.210812.016; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/99.0.0.0 Mobile Safari/537.36',
    true,
    'Android WebView',
  )

  testUA(
    'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1',
    false,
    'Mobile Safari',
  )

  testUA(
    'Mozilla/5.0 (Linux; Android 12) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.0.0 Mobile Safari/537.36',
    false,
    'Chrome Android',
  )

  testUA('', false, 'empty UA')
})
