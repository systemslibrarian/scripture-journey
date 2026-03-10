'use client'

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { useEffect, useRef, useState } from 'react';
import { syncOnLogin, getStreak } from '@/lib/progress';

const links = [
  { href: '/', label: 'Home' },
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/map', label: 'Map' },
  { href: '/quiz', label: 'Quiz' },
  { href: '/sources', label: 'Sources' },
];

export default function Header() {
  const { data: session, status } = useSession();
  const hasSynced = useRef(false);
  const [streakCount, setStreakCount] = useState(0);

  useEffect(() => {
    setStreakCount(getStreak().current);
  }, []);

  useEffect(() => {
    if (session?.user && !hasSynced.current) {
      hasSynced.current = true;
      syncOnLogin();
    }
  }, [session]);

  return (
    <header className="sticky top-0 z-30 border-b border-[#d8ccb8] bg-[#fefcf8]/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-4">
        <Link href="/" className="rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7e622a]">
          <span className="block text-xs uppercase tracking-[0.26em] text-[#7e622a]">Scripture</span>
          <span className="block text-2xl font-semibold leading-none text-[#1b1a17]">Journey</span>
        </Link>
        <nav aria-label="Main navigation" className="flex flex-wrap items-center gap-2 text-sm text-[#4a4338] sm:gap-3">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full border border-transparent px-3 py-1.5 transition hover:border-[#d8ccb8] hover:bg-[#fbf7ee] hover:text-[#1b1a17]"
            >
              {link.label}
            </Link>
          ))}

          {streakCount > 0 && (
            <span className="rounded-full bg-[#fff3e0] px-2 py-1 text-xs font-semibold text-[#e65100]">
              🔥 {streakCount}
            </span>
          )}

          {status === 'loading' ? null : session?.user ? (
            <button
              onClick={() => signOut()}
              className="rounded-full border border-[#d8ccb8] px-3 py-1.5 text-xs font-medium text-[#7e622a] transition hover:bg-[#fbf7ee]"
            >
              Sign Out
            </button>
          ) : (
            <Link
              href="/auth/signin"
              className="rounded-full border border-[#7e622a] bg-[#7e622a] px-3 py-1.5 text-xs font-medium text-white transition hover:bg-[#5e4a1f]"
            >
              Save Progress
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
