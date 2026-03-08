import BadgeList from '@/components/BadgeList';
import ProgressBar from '@/components/ProgressBar';
import { badges } from '@/data/badges';

export default function DashboardPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <section className="space-y-6">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-700">Welcome back</p>
            <h1 className="mt-2 text-3xl font-bold">Continue your journey through Scripture</h1>
            <p className="mt-3 text-slate-600">Learn how the Bible’s promises, prophecies, and patterns point to Jesus Christ.</p>
          </div>
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold">Top 100 Prophecies Progress</h2>
            <div className="mt-4">
              <ProgressBar current={3} total={100} />
            </div>
          </div>
        </section>
        <aside className="space-y-6">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold text-slate-500">Current Streak</p>
            <p className="mt-2 text-4xl font-bold">5 days</p>
          </div>
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold text-slate-500">Latest Badges</p>
            <div className="mt-4">
              <BadgeList badges={badges} />
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
