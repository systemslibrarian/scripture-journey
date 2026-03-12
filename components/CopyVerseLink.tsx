'use client'

import { useState } from 'react'
import { safeCopyText } from '@/lib/browser'
import type { Lesson } from '@/lib/types'

type Props = {
  lesson: Lesson
  size?: 'sm' | 'md'
}

export default function CopyVerseLink({ lesson, size = 'md' }: Props) {
  const [copied, setCopied] = useState(false)
  const [failed, setFailed] = useState(false)

  async function handleCopy(e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()

    const url = `https://www.scripturejourney.com/lessons/${lesson.slug}`
    const text = `${lesson.title}\n${lesson.otReference} → ${lesson.ntReference}\n${url}`

    const ok = await safeCopyText(text)
    if (ok) {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } else {
      setFailed(true)
      setTimeout(() => setFailed(false), 3000)
    }
  }

  const sizeClasses = size === 'sm' ? 'h-6 w-6 text-xs' : 'h-8 w-8 text-sm'

  return (
    <>
      <button
        onClick={handleCopy}
        aria-label={copied ? 'Copied!' : `Copy verse and link for ${lesson.title}`}
        title={copied ? 'Copied!' : 'Copy verse + link'}
        className={`inline-flex shrink-0 items-center justify-center rounded-full border border-[#d8ccb8] text-[#7e622a] transition hover:bg-[#fbf7ee] ${sizeClasses}`}
      >
        {copied ? '✓' : '📋'}
      </button>
      {failed && (
        <span className="ml-1 text-[10px] text-[#e65100] whitespace-nowrap">
          Can&apos;t copy — try long-pressing the link
        </span>
      )}
    </>
  )
}
