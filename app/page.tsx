import { prophecies } from '@/data/prophecies';

export default function PropheciesPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-700">Top Prophecies</p>
        <h1 className="mt-2 text-3xl font-bold">Major Prophecies Fulfilled in Jesus</h1>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {prophecies.map((prophecy) => (
          <div key={prophecy.reference} className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold">{prophecy.title}</h2>
            <p className="mt-2 text-slate-600">{prophecy.reference}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
