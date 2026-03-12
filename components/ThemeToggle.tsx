'use client'

import { useTheme } from '@/components/ThemeProvider'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      className="rounded-full border border-[#d8ccb8] px-2.5 py-1.5 text-sm transition hover:bg-[#fbf7ee]"
    >
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  )
}
