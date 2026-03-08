import type { Badge } from '@/lib/types';

export default function BadgeList({ badges }: { badges: Badge[] }) {
  return (
    <div className="grid gap-3">
      {badges.map((badge) => (
        <article key={badge.id} className="rounded-2xl border border-[#d9ccb8] bg-[#fef8ec] p-3">
          <h3 className="text-sm font-semibold text-[#6f5424]">{badge.title}</h3>
          <p className="mt-1 text-xs text-[#5f5548]">{badge.description}</p>
        </article>
      ))}
    </div>
  );
}
