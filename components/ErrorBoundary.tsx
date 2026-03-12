"use client"

import { Component, ReactNode } from "react"

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(error: Error) {
    console.error("ErrorBoundary caught:", error)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center bg-[#fefcf8]">
          <h1 className="text-2xl font-semibold text-[#1b1a17] mb-4">
            Something didn&apos;t load correctly
          </h1>
          <p className="text-[#4a4338] mb-2">
            We&apos;re sorry for the trouble. Please try refreshing the page.
          </p>
          <p className="text-[#9a8e7e] text-sm mb-6">
            If you&apos;re opening this inside Facebook, Messenger, or Instagram,
            try opening it directly in Safari or Chrome for the best experience.
          </p>
          <button
            onClick={() => {
              this.setState({ hasError: false })
              if (typeof window !== "undefined") {
                window.location.reload()
              }
            }}
            className="rounded-xl bg-[#1b1a17] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#333]"
          >
            Refresh Page
          </button>
        </div>
      )
    }

    return this.props.children
  }
}
