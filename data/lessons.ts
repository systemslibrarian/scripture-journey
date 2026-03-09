import { prophecies } from '@/data/prophecies';
import type { Lesson } from '@/lib/types';

export const lessons: Lesson[] = prophecies;

export function getLessonBySlug(slug: string): Lesson | undefined {
  return lessons.find((lesson) => lesson.slug === slug);
}

export function getLessonSlugs() {
  return lessons
    .filter((lesson) => lesson.status !== 'coming-soon')
    .map((lesson) => ({
      slug: lesson.slug,
    }));
}

export function getAllLessons(): Lesson[] {
  return lessons;
}