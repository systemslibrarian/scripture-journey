import type { Track } from '@/lib/types';

export const tracks: Track[] = [
  {
    slug: 'story',
    title: 'Story Path',
    description: 'Move from Genesis to Resurrection with short, connected lessons.',
    href: '/story',
    totalSteps: 10,
  },
  {
    slug: 'prophecies',
    title: 'Prophecy Path',
    description: 'Follow clear Old Testament prophecies and their New Testament fulfillment.',
    href: '/prophecies',
    totalSteps: 6,
  },
  {
    slug: 'map',
    title: 'Map Path',
    description: 'See covenant, king, servant, lamb, and resurrection themes in one view.',
    href: '/map',
    totalSteps: 5,
  },
];
