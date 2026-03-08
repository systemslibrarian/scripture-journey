import Link from "next/link";
import { Lesson } from "@/lib/types";

export function LessonCard({ lesson }: { lesson: Lesson }) {
  return (
    <Link href={`/lessons/${lesson.slug}`} className="card block p-6 transition hover:-translate-y-1 hover:shadow-lg">
      <div className="text-sm font-semibold text-slate-500">Lesson {lesson.id}</div>
      <h3 className="mt-3 text-xl font-bold">{lesson.title}</h3>
      <p className="mt-2 text-sm text-slate-600">{lesson.otReference} → {lesson.ntReference}</p>
      <p className="mt-4 text-sm leading-6 text-slate-600">{lesson.summary}</p>
    </Link>
  );
}
