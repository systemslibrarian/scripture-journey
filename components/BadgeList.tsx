export default function BadgeList({ badges }: { badges: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {badges.map((badge) => (
        <span key={badge} className="rounded-full bg-amber-50 px-3 py-2 text-sm font-medium text-amber-900 ring-1 ring-amber-200">
          {badge}
        </span>
      ))}
    </div>
  );
}
