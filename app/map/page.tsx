import ProphecyTimeline from '@/components/ProphecyTimeline';
import { prophecies } from '@/data/prophecies';

export default function MapPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <div className="glass-card rounded-[2rem] p-6">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#7e622a]">Signature View</p>
        <h1 className="mt-2 text-4xl font-semibold text-[#1b1a17]">Prophecy Map</h1>
        <p className="mt-3 max-w-3xl text-[#4a4338]">
          Scan promises, explicit prophecies, and recurring patterns together so you can see how Scripture forms one
          coherent witness to Christ.
        </p>
      </div>

      <div className="mt-8">
        <ProphecyTimeline entries={prophecies} />
      </div>
    </main>
  );
}
