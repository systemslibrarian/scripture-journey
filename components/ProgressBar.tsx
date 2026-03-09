export default function ProgressBar({ current, total }: { current: number; total: number }) {
  const safeTotal = Math.max(total, 1);
  const percent = Math.min(100, Math.round((current / safeTotal) * 100));

  return (
    <div>
      <div className="mb-2 flex justify-between text-sm text-[#5f5548]">
        <span>Progress</span>
        <span>{percent}%</span>
      </div>
      <div
        className="h-3 overflow-hidden rounded-full bg-[#e8ddca]"
        role="progressbar"
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${current} of ${total} lessons completed, ${percent}%`}
      >
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#7e622a] to-[#2f3e36] transition-all"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
