import Link from 'next/link';

const links = [
  { href: '/', label: 'Home' },
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/story', label: 'Story' },
  { href: '/prophecies', label: 'Prophecies' },
  { href: '/map', label: 'Map' },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-[#d8ccb8] bg-[#fefcf8]/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-4">
        <Link href="/" className="rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7e622a]">
          <span className="block text-xs uppercase tracking-[0.26em] text-[#7e622a]">Scripture</span>
          <span className="block text-2xl font-semibold leading-none text-[#1b1a17]">Journey</span>
        </Link>
        <nav className="flex flex-wrap items-center gap-2 text-sm text-[#4a4338] sm:gap-3">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full border border-transparent px-3 py-1.5 transition hover:border-[#d8ccb8] hover:bg-[#fbf7ee] hover:text-[#1b1a17]"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
