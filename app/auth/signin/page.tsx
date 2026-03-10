'use client'

import { signIn } from 'next-auth/react'
import { useState } from 'react'

export default function SignInPage() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    const trimmedEmail = email.trim()
    if (!trimmedEmail || isSubmitting) return

    setErrorMessage(null)
    setIsSubmitting(true)

    try {
      const result = await signIn('email', { email: trimmedEmail, redirect: false })
      if (result?.error || result?.ok === false) {
        setSent(false)
        setErrorMessage('We could not send the sign-in email. Please try again in a moment.')
        return
      }

      setSent(true)
    } catch {
      setSent(false)
      setErrorMessage('We could not send the sign-in email. Please try again in a moment.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="mx-auto max-w-md px-4 py-20">
      <h1 className="text-2xl font-bold text-[#1b1a17]">Sign In</h1>
      <p className="mt-2 text-sm text-[#4a4338]">
        Sign in to save your progress and quiz scores across devices. No password needed — just enter your email.
      </p>

      {sent ? (
        <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-center text-sm text-emerald-900">
          Check your email for a sign-in link.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {errorMessage ? (
            <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-900">
              {errorMessage}
            </div>
          ) : null}

          <label htmlFor="email" className="block text-sm font-semibold text-[#1b1a17]">
            Email address
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full rounded-xl border border-[#d8ccb8] bg-white px-4 py-3 text-sm text-[#1b1a17] focus:outline-none focus:ring-2 focus:ring-[#7e622a]"
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-xl bg-[#1b1a17] px-4 py-3 text-sm font-semibold text-white hover:bg-[#2c2a25] transition"
          >
            {isSubmitting ? 'Sending...' : 'Send Sign-In Link'}
          </button>
        </form>
      )}
    </main>
  )
}
