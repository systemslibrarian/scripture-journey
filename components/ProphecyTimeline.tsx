import type { Prophecy } from '@/lib/types';

export default function ProphecyTimeline({ entries }: { entries: Prophecy[] }) {
  const columns = [
    { label: 'Promise', category: 'Promise' as const },
    { label: 'Prophecy', category: 'Prophecy' as const },
    { label: 'Pattern', category: 'Pattern' as const },
  ];

  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {columns.map((column, idx) => (
        <div key={column.label} className="glass-card rise-in rounded-[2rem] p-5" style={{ animationDelay: `${idx * 120}ms` }}>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#7e622a]">{column.label}</p>
          <div className="mt-4 space-y-3">
            {entries
              .filter((entry) => entry.category === column.category)
              .map((entry) => (
                <article key={entry.id} className="rounded-2xl border border-[#dfd2be] bg-[#fef9ef] px-4 py-3">
                  <p className="text-sm font-semibold text-[#1b1a17]">{entry.title}</p>
                  <p className="mt-1 text-xs text-[#5f5548]">{entry.otReference} to {entry.ntReference}</p>
                </article>
              ))}
            {entries.filter((entry) => entry.category === column.category).length === 0 && (
              <p className="text-sm text-[#5f5548]">No entries yet.</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
