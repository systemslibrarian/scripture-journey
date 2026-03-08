import Link from 'next/link';
import type { Lesson } from '@/lib/types';

export default function LessonCard({ lesson }: { lesson: Lesson }) {
  return (
    <Link
      href={`/lessons/${lesson.slug}`}
      className="glass-card rounded-[2rem] p-6 transition hover:-translate-y-1 hover:shadow-[0_14px_30px_rgba(27,26,23,0.1)]"
    >
      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#7e622a]">Lesson {lesson.id}</p>
      <h3 className="mt-2 text-2xl font-semibold text-[#1b1a17]">{lesson.title}</h3>
      <p className="mt-2 text-sm text-[#5f5548]">
        {lesson.otReference} to {lesson.ntReference}
      </p>
      <p className="mt-4 text-sm leading-7 text-[#4a4338]">{lesson.summary}</p>
      <p className="mt-4 border-t border-[#e7dcc9] pt-3 text-sm font-medium text-[#2f3e36]">{lesson.durationMinutes} min read</p>
    </Link>
  );
}
