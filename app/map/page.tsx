import ProphecyTimeline from '@/components/ProphecyTimeline';

export default function MapPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-700">Signature Feature</p>
        <h1 className="mt-2 text-3xl font-bold">Prophecy Map</h1>
        <p className="mt-3 text-slate-600">A visual view of how Scripture develops through promise and fulfillment in Christ.</p>
      </div>
      <div className="mt-8">
        <ProphecyTimeline />
      </div>
    </main>
  );
}
