import Link from 'next/link';
import type { Lesson } from '@/data/lessons';

export default function LessonCard({ lesson }: { lesson: Lesson }) {
  return (
    <Link href={`/lessons/${lesson.slug}`} className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <p className="text-sm font-semibold text-slate-500">Lesson {lesson.id}</p>
      <h3 className="mt-2 text-xl font-bold">{lesson.title}</h3>
      <p className="mt-2 text-sm text-slate-600">{lesson.otReference} → {lesson.ntReference}</p>
      <p className="mt-4 text-sm leading-6 text-slate-700">{lesson.summary}</p>
    </Link>
  );
}
