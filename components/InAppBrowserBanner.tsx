"use client"

import { useEffect, useState } from "react"
import { isInAppBrowser } from "@/lib/browser"

export function InAppBrowserBanner() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    setShow(isInAppBrowser())
  }, [])

  if (!show) return null

  return (
    <div className="border-b border-amber-200 bg-amber-50 px-4 py-2 text-sm text-amber-800 flex items-center justify-between dark:bg-amber-950/40 dark:border-amber-700 dark:text-amber-200">
      <span>
        For the best experience,{" "}
        <strong>open this page in Safari or Chrome</strong>.
      </span>
      <button
        onClick={() => setShow(false)}
        className="ml-4 text-amber-600 hover:text-amber-800 font-medium dark:text-amber-400 dark:hover:text-amber-200"
        aria-label="Dismiss browser notice"
      >
        ✕
      </button>
    </div>
  )
}
