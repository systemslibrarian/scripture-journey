import type { ProphecyType } from '@/lib/types';

const typeStyles: Record<ProphecyType, string> = {
  'Direct Prophecy':       'bg-[#fef3c7] text-[#92400e] border border-[#fde68a]',
  'Messianic Psalm':       'bg-[#dbeafe] text-[#1e40af] border border-[#bfdbfe]',
  'Typology':              'bg-[#d1fae5] text-[#065f46] border border-[#a7f3d0]',
  'Prophetic Pattern':     'bg-[#ede9fe] text-[#4c1d95] border border-[#ddd6fe]',
};

type Props = {
  type: ProphecyType;
  size?: 'sm' | 'xs';
};

export default function ProphecyTypeBadge({ type, size = 'sm' }: Props) {
  const textSize = size === 'xs' ? 'text-[10px]' : 'text-xs';
  return (
    <span className={`inline-flex items-center rounded-full px-2 py-0.5 font-medium ${textSize} ${typeStyles[type]}`}>
      {type}
    </span>
  );
}
