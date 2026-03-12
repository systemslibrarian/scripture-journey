'use client'

import { useState } from 'react'
import type { Lesson } from '@/lib/types'

type Props = {
  lesson: Lesson
  size?: 'sm' | 'md'
}

export default function CopyVerseLink({ lesson, size = 'md' }: Props) {
  const [copied, setCopied] = useState(false)

  async function handleCopy(e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()

    const url = `https://www.scripturejourney.com/lessons/${lesson.slug}`
    const text = `${lesson.title}\n${lesson.otReference} → ${lesson.ntReference}\n${url}`

    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback for older browsers
      const ta = document.createElement('textarea')
      ta.value = text
      ta.style.position = 'fixed'
      ta.style.opacity = '0'
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const sizeClasses = size === 'sm' ? 'h-6 w-6 text-xs' : 'h-8 w-8 text-sm'

  return (
    <button
      onClick={handleCopy}
      aria-label={copied ? 'Copied!' : `Copy verse and link for ${lesson.title}`}
      title={copied ? 'Copied!' : 'Copy verse + link'}
      className={`inline-flex shrink-0 items-center justify-center rounded-full border border-[#d8ccb8] text-[#7e622a] transition hover:bg-[#fbf7ee] dark:border-[#555] dark:text-[#b5a27a] dark:hover:bg-[#333] ${sizeClasses}`}
    >
      {copied ? '✓' : '📋'}
    </button>
  )
}
