import Hero from '@/components/Hero';
import Link from 'next/link';
import { tracks } from '@/data/tracks';

export default function HomePage() {
  return (
    <main className="mx-auto max-w-6xl px-4 pb-16">
      <Hero />
      <section className="mt-2 grid gap-4 md:grid-cols-3">
        {tracks.map((track, index) => (
          <Link
            key={track.slug}
            href={track.href}
            className="glass-card rise-in rounded-[1.7rem] p-5 transition hover:-translate-y-0.5"
            style={{ animationDelay: `${200 + index * 80}ms` }}
          >
            <p className="text-xs uppercase tracking-[0.2em] text-[#7e622a]">{track.totalSteps} steps</p>
            <h2 className="mt-2 text-2xl font-semibold text-[#1b1a17]">{track.title}</h2>
            <p className="mt-2 leading-7 text-[#4a4338]">{track.description}</p>
          </Link>
        ))}
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <article className="glass-card rounded-[2rem] p-6">
          <p className="text-sm uppercase tracking-[0.18em] text-[#7e622a]">How It Works</p>
          <h2 className="mt-2 text-3xl font-semibold text-[#1b1a17]">A clear path for beginners</h2>
          <ul className="mt-4 space-y-3 text-[#4a4338]">
            <li>Read one short Old Testament promise or prophecy.</li>
            <li>See the New Testament fulfillment in Jesus.</li>
            <li>Answer one quick question to strengthen retention.</li>
            <li>Track your progress and keep moving forward.</li>
          </ul>
        </article>
        <article className="rounded-[2rem] border border-[#dbcdb5] bg-[#fffaf0] p-6 shadow-[0_10px_28px_rgba(90,51,47,0.08)]">
          <p className="text-sm uppercase tracking-[0.18em] text-[#7e622a]">Scripture Focus</p>
          <blockquote className="mt-3 text-2xl font-semibold leading-tight text-[#1b1a17]">
            &ldquo;Beginning with Moses and all the Prophets, he interpreted to them in all the Scriptures the things concerning
            himself.&rdquo;
          </blockquote>
          <p className="mt-2 text-[#5f5548]">Luke 24:27</p>
          <Link
            href="/prophecies"
            className="mt-6 inline-flex rounded-xl border border-[#cab187] px-4 py-2.5 font-semibold text-[#5a332f] transition hover:bg-[#f4ead8]"
          >
            View Key Prophecies
          </Link>
        </article>
      </section>
    </main>
  );
}
