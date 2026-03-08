import Link from 'next/link';

export default function Hero() {
  return (
    <section className="grid gap-8 py-16 lg:grid-cols-2 lg:items-center">
      <div>
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-amber-700">Scripture Journey</p>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Discover how the whole Bible points to Jesus</h1>
        <p className="mt-5 max-w-xl text-lg text-slate-700">
          Learn God&apos;s story through promises, prophecies, and fulfillment—one short lesson at a time.
        </p>
        <div className="mt-8 flex gap-3">
          <Link href="/story" className="rounded-2xl bg-slate-900 px-5 py-3 font-semibold text-white">
            Start the Journey
          </Link>
          <Link href="/map" className="rounded-2xl border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-800">
            Explore the Map
          </Link>
        </div>
      </div>
      <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="rounded-[1.5rem] bg-slate-900 p-6 text-white">
          <p className="text-sm uppercase tracking-[0.2em] text-amber-200">Lesson Preview</p>
          <h2 className="mt-3 text-2xl font-bold">The First Promise</h2>
          <div className="mt-5 rounded-2xl bg-white/10 p-4">
            <p className="text-xs uppercase tracking-wide text-amber-100">Old Testament</p>
            <p className="mt-2 font-semibold">Genesis 3:15</p>
            <p className="mt-2 text-sm text-slate-100">“He will crush your head, and you will strike his heel.”</p>
          </div>
        </div>
      </div>
    </section>
  );
}
