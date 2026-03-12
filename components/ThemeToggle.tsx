'use client'

import { useTheme } from '@/components/ThemeProvider'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-[#d8ccb8] text-sm transition hover:bg-[#fbf7ee] md:min-h-0 md:min-w-0 md:px-2.5 md:py-1.5"
    >
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  )
}
