import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/#lessons", label: "Lessons" },
  { href: "/map", label: "Map" }
];

export function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-white/85 backdrop-blur">
      <div className="container-shell flex items-center justify-between py-4">
        <Link href="/" className="block">
          <div className="text-xs font-semibold uppercase tracking-[0.24em] text-gold">Scripture Journey</div>
          <div className="text-sm text-slate-600">Discover how the whole Bible points to Jesus</div>
        </Link>
        <nav className="hidden gap-2 md:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="rounded-full px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100">
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
