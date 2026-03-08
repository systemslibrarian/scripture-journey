export default function ProphecyTimeline() {
  const columns = [
    ['Torah', ['Genesis 3:15', 'Abraham', 'Passover']],
    ['Kings', ['Davidic Covenant']],
    ['Psalms', ['Psalm 22', 'Psalm 16']],
    ['Prophets', ['Isaiah 7', 'Isaiah 53', 'Micah 5']],
    ['Gospels', ['Birth', 'Cross', 'Resurrection']],
  ] as const;

  return (
    <div className="grid gap-6 lg:grid-cols-5">
      {columns.map(([era, items], idx) => (
        <div key={era} className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">{era}</p>
          <div className="mt-4 space-y-3">
            {items.map((item) => (
              <div key={item} className={`rounded-2xl px-4 py-3 text-sm font-medium ${idx === 4 ? 'bg-amber-100 text-amber-900' : 'bg-slate-50 text-slate-700'}`}>
                {item}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
