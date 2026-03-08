export default function ProgressBar({ current, total }: { current: number; total: number }) {
  const percent = Math.round((current / total) * 100);
  return (
    <div>
      <div className="mb-2 flex justify-between text-sm text-slate-600">
        <span>Progress</span>
        <span>{percent}%</span>
      </div>
      <div className="h-4 overflow-hidden rounded-full bg-slate-100">
        <div className="h-full rounded-full bg-slate-900" style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}
