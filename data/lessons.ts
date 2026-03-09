import { prophecies } from '@/data/prophecies';

export const lessons = prophecies;

export function getLessonBySlug(slug: string) {
  return lessons.find((lesson) => lesson.slug === slug);
}

export function getLessonSlugs() {
  return lessons.map((lesson) => ({ slug: lesson.slug }));
}