import Link from 'next/link';
import BadgeList from '@/components/BadgeList';
import ProgressBar from '@/components/ProgressBar';
import { badges } from '@/data/badges';
import { tracks } from '@/data/tracks';

export default function DashboardPage() {
  const completedLessons = 3;

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <section className="space-y-6">
          <div className="glass-card rounded-[2rem] p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#7e622a]">Welcome back</p>
            <h1 className="mt-2 text-4xl font-semibold text-[#1b1a17]">Continue your journey through Scripture</h1>
            <p className="mt-3 text-[#4a4338]">Learn how the Bible's promises, prophecies, and patterns point to Jesus Christ.</p>
          </div>

          <div className="glass-card rounded-[2rem] p-6">
            <h2 className="text-2xl font-semibold text-[#1b1a17]">Current Lesson Progress</h2>
            <div className="mt-4">
              <ProgressBar current={completedLessons} total={6} />
            </div>
            <p className="mt-3 text-sm text-[#5f5548]">{completedLessons} of 6 starter lessons complete</p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {tracks.map((track) => (
              <Link key={track.slug} href={track.href} className="rounded-2xl border border-[#d8ccb8] bg-[#fef9ef] p-4 transition hover:bg-[#f7efdf]">
                <p className="text-xs uppercase tracking-[0.16em] text-[#7e622a]">Path</p>
                <h3 className="mt-1 text-lg font-semibold text-[#1b1a17]">{track.title}</h3>
                <p className="mt-1 text-sm leading-6 text-[#5f5548]">{track.description}</p>
              </Link>
            ))}
          </div>
        </section>

        <aside className="space-y-6">
          <div className="glass-card rounded-[2rem] p-6">
            <p className="text-sm font-semibold text-[#5f5548]">Current Streak</p>
            <p className="mt-2 text-4xl font-semibold text-[#1b1a17]">5 days</p>
            <p className="mt-2 text-sm text-[#5f5548]">Keep opening one lesson each day.</p>
          </div>

          <div className="glass-card rounded-[2rem] p-6">
            <p className="text-sm font-semibold text-[#5f5548]">Latest Badges</p>
            <div className="mt-4">
              <BadgeList badges={badges} />
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
